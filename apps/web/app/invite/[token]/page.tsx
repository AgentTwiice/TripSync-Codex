import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { acceptInviteAction } from "@/modules/trips/actions";
import { hashInviteToken, isInviteValid } from "@tripsync/domain";
import { Button, Surface } from "@tripsync/ui";
import Link from "next/link";

export default async function InvitePage({ params }: { params: { token: string } }) {
  const { token } = params;
  const session = await auth();
  const invite = await prisma.tripInvite.findUnique({
    where: {
      tokenHash: hashInviteToken(token)
    },
    include: {
      trip: true
    }
  });

  const isValid = invite ? isInviteValid(invite) : false;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-6 md:px-6">
      <Surface className="w-full space-y-5 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-ink/45">Trip invite</p>
        <h1 className="font-display text-4xl">
          {invite ? `Join ${invite.trip.name}` : "Invite not found"}
        </h1>
        <p className="text-sm leading-6 text-ink/65">
          {isValid
            ? "This invite is active. Accept it to join the trip workspace with the assigned role."
            : "This invite has expired, was revoked, or has already been used."}
        </p>
        {isValid ? (
          session?.user ? (
            <form action={acceptInviteAction.bind(null, token)}>
              <Button type="submit">Accept invite</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Sign in to accept</Link>
            </Button>
          )
        ) : null}
      </Surface>
    </main>
  );
}

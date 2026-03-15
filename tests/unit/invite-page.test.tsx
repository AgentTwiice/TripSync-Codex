import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";

const authMock = vi.fn();
const findUniqueMock = vi.fn();
const isInviteValidMock = vi.fn();
const hashInviteTokenMock = vi.fn((token: string) => `hash:${token}`);

vi.mock("@/auth", () => ({
  auth: authMock
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    tripInvite: {
      findUnique: findUniqueMock
    }
  }
}));

vi.mock("@/modules/trips/actions", () => ({
  acceptInviteAction: vi.fn()
}));

vi.mock("@tripsync/domain", () => ({
  hashInviteToken: hashInviteTokenMock,
  isInviteValid: isInviteValidMock
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>
}));

vi.mock("@tripsync/ui", () => ({
  Surface: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Button: ({ children, asChild }: { children: ReactNode; asChild?: boolean }) =>
    asChild ? <>{children}</> : <button type="button">{children}</button>
}));

describe("Invite page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows recovery actions for invalid invites", async () => {
    authMock.mockResolvedValue({ user: { id: "u1" } });
    findUniqueMock.mockResolvedValue(null);
    isInviteValidMock.mockReturnValue(false);

    const { default: InvitePage } = await import("../../apps/web/app/invite/[token]/page");
    render(await InvitePage({ params: { token: "bad-token" } }));

    expect(screen.getByText("Invite not found")).toBeInTheDocument();
    expect(screen.getByText("Request a new invite")).toBeInTheDocument();
    expect(screen.getByText("Back to home")).toBeInTheDocument();
  });

  it("shows sign in guidance with callback url when invite is valid for signed-out users", async () => {
    authMock.mockResolvedValue(null);
    findUniqueMock.mockResolvedValue({ trip: { name: "Portugal" } });
    isInviteValidMock.mockReturnValue(true);

    const { default: InvitePage } = await import("../../apps/web/app/invite/[token]/page");
    render(await InvitePage({ params: { token: "abc123" } }));

    expect(screen.getByText("Sign in to accept")).toBeInTheDocument();
    expect(screen.getByText("1. Sign in or create an account. 2. Return here automatically to accept.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in to accept" })).toHaveAttribute(
      "href",
      "/login?callbackUrl=%2Finvite%2Fabc123"
    );
  });
});

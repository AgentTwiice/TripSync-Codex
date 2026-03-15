import Link from "next/link";
import { fallbackTrip } from "@/lib/fallback-data";
import { Button, MetricCard, SectionHeading, Surface } from "@tripsync/ui";

export default function DemoPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-6">
      <section
        className="overflow-hidden rounded-[32px] border border-line/70 bg-cover bg-center p-5 text-sand shadow-lift sm:p-6 md:p-8"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 28, 0.26) 0%, rgba(15, 23, 28, 0.58) 52%, rgba(15, 23, 28, 0.78) 100%), url('${fallbackTrip.coverImageUrl}')`
        }}
      >
        <div className="space-y-5 md:space-y-6">
          <p className="text-xs uppercase tracking-[0.18em] text-sand/70">Seeded demo trip</p>
          <h1 className="max-w-[18ch] font-display text-[clamp(2rem,8vw,3.5rem)] leading-[1.05] sm:max-w-2xl">{fallbackTrip.name}</h1>
          <p className="max-w-2xl text-sm leading-6 text-sand/78">{fallbackTrip.destination.heroHeadline}</p>
          <Button asChild className="w-fit" variant="secondary">
            <Link href="/trips/demo-trip">Open full workspace</Link>
          </Button>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard hint="Comfort preset across 5 nights" label="Total estimate" value={`¥${Math.round(fallbackTrip.budget.totalMinor / 100).toLocaleString()}`} />
        <MetricCard hint="Server-calculated" label="Per person" value={`¥${Math.round(fallbackTrip.budget.perPersonMinor / 100).toLocaleString()}`} />
        <MetricCard hint={`${fallbackTrip.savedPlaces.length} saved ideas`} label="Shortlist" value="Live votes" />
      </div>
      <Surface>
        <SectionHeading
          eyebrow="Preview"
          title="Everything from shortlist to itinerary lives in the same trip."
          description="Use the demo workspace to inspect explore cards, budget presets, comments, and the day-by-day plan."
        />
      </Surface>
    </main>
  );
}

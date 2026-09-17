import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { SAMPLE_DASHBOARD as D } from "@/data/sampleDashboard";
import { LINKS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Owner dashboard preview",
  description: "A preview of the owner dashboard: monthly reports, card taps, replacement cards, and reviews awaiting a reply.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper pb-20">
        <div className="border-b border-line bg-paper-2">
          <Container className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
            <div className="text-ink-2">
              Preview of the owner dashboard, filled with sample data for a fictional restaurant. Yours activates when your cards ship.
            </div>
            <Button href={`${LINKS.order}`} size="sm">
              Order cards and report
            </Button>
          </Container>
        </div>
        <Container className="pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Owner dashboard</Eyebrow>
              <h1 className="font-display mt-3 text-4xl leading-none sm:text-5xl">{D.restaurant}</h1>
              <div className="mt-2 text-sm text-muted">
                {D.plan} · Next report {D.nextReport} · Signed in as {D.owner}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <DashboardClient />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

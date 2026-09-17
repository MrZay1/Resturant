import { CreditCard, Smartphone, FileText, Check, Mail } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { BRAND, PRICING } from "@/lib/brand";

export const metadata = {
  title: "Book a demo",
  description: `See ${BRAND.name} work on your own phone. We build a demo card for your restaurant, you tap it, and we walk through a sample report with your name on it.`,
};

const steps = [
  {
    icon: CreditCard,
    title: "We build a demo card for your restaurant before we visit",
    body: "It has your name on it and links to your real Google review page. Nothing to set up on your end.",
  },
  {
    icon: Smartphone,
    title: "You tap it and land on your own Google review page",
    body: "Same thing your guests will see. No app, no QR code, no typing. It takes about two seconds.",
  },
  {
    icon: FileText,
    title: "We walk through a sample report with your name on it",
    body: "What guests love, what they complain about, which servers get named, which dishes come up. Then the actions we would take.",
  },
];

const reassurance = [
  "No contract. The report is month to month and you can cancel anytime.",
  "Cards are yours to keep. Buy once, use them for years.",
  `Subscribers get ${PRICING.freeReplacementCardsPerMonth} free replacement cards each month.`,
  "The demo takes about fifteen minutes, at your restaurant or on a call.",
];

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-14 sm:pt-20">
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-24">
              <div className="max-w-xl">
                <Eyebrow>Book a demo</Eyebrow>
                <Heading as="h1" size="xl" className="mt-5">
                  See it work on your own phone
                </Heading>
                <Lede className="mt-6">
                  The fastest way to understand {BRAND.name} is to tap a card yourself. We bring one
                  made for your restaurant. You tap it, your review page opens, and it clicks.
                </Lede>

                <div className="mt-12">
                  <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                    What happens in a demo
                  </h2>
                  <ol className="mt-6 divide-y divide-line border-y border-line">
                    {steps.map((s, i) => (
                      <li key={s.title} className="flex gap-5 py-6">
                        <div className="flex shrink-0 flex-col items-center gap-2">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                            <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                          </span>
                          <span className="font-display text-sm text-muted">0{i + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium leading-snug text-ink">{s.title}</h3>
                          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-10 rounded-2xl border border-line bg-white p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Good to know
                  </div>
                  <ul className="mt-4 space-y-3">
                    {reassurance.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-2">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-8 flex items-center gap-2 text-sm text-muted">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    Prefer email?{" "}
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                    >
                      {BRAND.email}
                    </a>
                  </span>
                </p>
              </div>

              <div className="lg:pt-2">
                <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-24">
                  <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">Tell us where to bring the card</h2>
                  <p className="mt-2 text-sm text-muted">Takes about a minute. We reply within one business day.</p>
                  <div className="mt-7 border-t border-line pt-7">
                    <LeadForm kind="demo" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

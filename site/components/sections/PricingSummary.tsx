import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { LINKS, PRICING } from "@/lib/brand";
import { Check } from "lucide-react";

export function PricingSummary() {
  const plans = [
    {
      name: "Cards",
      price: `$${PRICING.cardPrice}`,
      unit: "per card, one time",
      blurb: "Custom printed, NFC and QR, yours to keep.",
      features: ["Your logo or one of four designs", "Printed both sides", "Digital design preview before printing", "Ships in about 10 business days"],
      cta: { label: "Order cards", href: LINKS.order, variant: "secondary" as const },
    },
    {
      name: "Cards + monthly report",
      price: `$${PRICING.monthlyReport}`,
      unit: "per month, per location",
      blurb: "Everything above, plus the report and free replacement cards.",
      features: [
        "Every Google review read and summarized monthly",
        "Servers and dishes mentioned by name",
        "Priority actions and drafted replies",
        `${PRICING.freeReplacementCardsPerMonth} free replacement cards every month`,
        "Cancel anytime",
      ],
      cta: { label: "Start with cards + report", href: `${LINKS.order}?report=1`, variant: "primary" as const },
      highlight: true,
    },
  ];
  return (
    <Section id="pricing" tone="white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <Heading className="mt-4">Simple enough to explain to your accountant.</Heading>
          <Lede className="mt-5">Cards are a one-time purchase. The report is a monthly subscription you can cancel any time.</Lede>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${p.highlight ? "border-ink bg-paper shadow-lift" : "border-line bg-white"}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Most restaurants pick this
                </span>
              )}
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl leading-none">{p.price}</span>
                <span className="text-sm text-muted">{p.unit}</span>
              </div>
              <p className="mt-3 text-[15px] text-ink-2">{p.blurb}</p>
              <ul className="mt-6 space-y-3 text-[15px]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href={p.cta.href} variant={p.cta.variant} className="w-full">
                  {p.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Most restaurants start with {PRICING.starterKitCards} cards, one per server, plus the report: $
          {PRICING.starterKitCards * PRICING.cardPrice + PRICING.monthlyReport} today, then ${PRICING.monthlyReport} a month.{" "}
          <a href={LINKS.pricing} className="underline underline-offset-4">
            Full pricing details
          </a>
        </p>
      </Container>
    </Section>
  );
}

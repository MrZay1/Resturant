import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { LINKS, PRICING } from "@/lib/brand";
import { Check } from "lucide-react";
import { ORDER_PLANS } from "@/lib/orderPlans";

export function PricingSummary() {
  const plans = [
    {
      name: ORDER_PLANS.starter.name,
      price: `$${ORDER_PLANS.starter.setup}`,
      unit: "one-time",
      blurb: "10 custom tap cards, QR backup, setup and a Google profile check.",
      features: ORDER_PLANS.starter.features,
      cta: { label: "Choose Review Starter", href: `${LINKS.order}?plan=starter`, variant: "secondary" as const },
      highlight: false,
    },
    {
      name: ORDER_PLANS.regulars.name,
      price: `$${ORDER_PLANS.regulars.monthly}`,
      unit: `per month + $${ORDER_PLANS.regulars.setup} setup`,
      blurb: "Everything in Review Starter, plus a managed text club and monthly results.",
      features: ORDER_PLANS.regulars.features,
      cta: { label: "Choose Regulars Program", href: `${LINKS.order}?plan=regulars`, variant: "primary" as const },
      highlight: true,
    },
  ];
  return (
    <Section id="pricing" tone="white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <Heading className="mt-4">Simple enough to explain to your accountant.</Heading>
          <Lede className="mt-5">Two options: review cards with no monthly fee, or managed texts and monthly results.</Lede>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${p.highlight ? "border-ink bg-paper shadow-lift" : "border-line bg-white"}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Managed service
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
          Regulars Program with {PRICING.starterKitCards} cards: ${ORDER_PLANS.regulars.setup + ORDER_PLANS.regulars.monthly} today, then ${ORDER_PLANS.regulars.monthly} a month.{" "}
          <a href={LINKS.pricing} className="underline underline-offset-4">
            Full pricing details
          </a>
        </p>
      </Container>
    </Section>
  );
}

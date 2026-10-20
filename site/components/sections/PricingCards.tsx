import { Check } from "lucide-react";
import { PRICING, LINKS } from "@/lib/brand";
import { INCLUDED_CARDS, ORDER_PLANS, type OrderPlan } from "@/lib/orderPlans";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { CardEstimator } from "@/components/sections/CardEstimator";

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function PricingCards() {
  return (
    <Section tone="paper">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <Heading as="h1" size="xl" className="mt-5">More reviews. More regulars.</Heading>
          <Lede className="mt-6">Start with custom review cards, or add a managed text club that helps bring guests back.</Lede>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {(Object.keys(ORDER_PLANS) as OrderPlan[]).map((key) => {
            const plan = ORDER_PLANS[key];
            return (
              <div key={key} className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:p-9">
                <h2 className="font-display text-3xl">{plan.name}</h2>
                <p className="mt-4 font-display text-5xl">{formatPrice(plan.setup)}</p>
                <p className="mt-2 text-muted">{plan.monthly ? `setup + ${formatPrice(plan.monthly)}/month per location` : "one-time. No monthly fee."}</p>
                {plan.monthly > 0 && <p className="mt-2 text-sm text-muted">{formatPrice(plan.setup + plan.monthly)} due today, including the first month. Cancel anytime.</p>}
                <ul className="my-7 space-y-3 border-t border-line pt-6">
                  {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-ink-2"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{feature}</li>)}
                </ul>
                <Button href={`${LINKS.order}?plan=${key}`} variant={key === "regulars" ? "primary" : "secondary"} className="mt-auto w-full">Choose {plan.name}</Button>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-sm text-muted">Both packages include {INCLUDED_CARDS} cards, setup and a Google profile check. Extra cards are {formatPrice(PRICING.cardPrice)} each. US shipping included; applicable tax is shown at checkout.</p>
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Find your fit</Eyebrow>
            <Heading size="md" className="mt-4">Enough cards for your floor</Heading>
            <p className="mt-4 text-muted">Estimate your card count and see the full first payment and monthly cost before you order.</p>
            <p className="mt-4 text-sm text-muted">Regulars Program includes text club signup, a welcome offer, win-back and birthday texts, specials and slow-night promotions, and a monthly results report. We coordinate setup and offers with you after checkout.</p>
          </div>
          <CardEstimator />
        </div>
      </Container>
    </Section>
  );
}

import { ChevronDown } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { PricingCards, formatPrice } from "@/components/sections/PricingCards";
import { PRICING, LINKS } from "@/lib/brand";

export const metadata = {
  title: "Pricing",
  description: `Tap-to-review cards are ${formatPrice(PRICING.cardPrice)} each, one time. The monthly AI review report is ${formatPrice(PRICING.monthlyReport)} a month per location and includes ${PRICING.freeReplacementCardsPerMonth} free replacement cards. Cancel any time.`,
};

const questions: { q: string; a: string }[] = [
  {
    q: "Do we need a card for every table?",
    a: "No. Most restaurants order one card per server on the floor. The server carries it and drops it with the check, then picks it up on the way back. If you would rather leave a card at every table, that works too, you just order more.",
  },
  {
    q: "What counts as a replacement card?",
    a: `Lost or damaged cards. Subscribers get up to ${PRICING.freeReplacementCardsPerMonth} replacements a month at no charge. Adding tables or servers is a new order, not a replacement, so you would buy those at ${formatPrice(PRICING.cardPrice)} each.`,
  },
  {
    q: "We have more than one location. How does that work?",
    a: `Each location is its own subscription at ${formatPrice(PRICING.monthlyReport)} a month, because each has its own Google listing and its own report. Cards are printed per location. If you run three or more, ask us about a bundle.`,
  },
  {
    q: "What about sales tax and shipping?",
    a: "Shipping inside the US is included on every card order. Sales tax is added at checkout where your state requires it, and the total is shown before you pay. Card orders ship in about 10 business days after you approve the design preview.",
  },
  {
    q: "What is the refund policy?",
    a: "Printed cards are custom, so there are no refunds once you approve the digital design preview. If a card arrives damaged, we replace it. The report subscription can be cancelled any time and stays active until the end of the current billing period.",
  },
];

function PricingQuestions() {
  return (
    <Section tone="white">
      <Container size="narrow">
        <Eyebrow>Questions about pricing</Eyebrow>
        <Heading size="md" className="mt-4">
          The things owners ask before they order
        </Heading>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {questions.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-ink [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section tone="dark" className="grain">
      <Container className="relative text-center">
        <Eyebrow tone="inverse" className="justify-center">
          Ready when you are
        </Eyebrow>
        <Heading size="lg" className="mx-auto mt-5 max-w-2xl text-paper">
          Cards on the table by next month
        </Heading>
        <Lede className="mx-auto mt-5 max-w-xl text-paper/70">
          Order today and approve your design preview this week. Or book fifteen minutes and we will walk you
          through a sample report for a restaurant like yours.
        </Lede>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={LINKS.order} variant="inverse" size="lg">
            Order cards
          </Button>
          <Button
            href={LINKS.demo}
            variant="ghost"
            size="lg"
            className="text-paper hover:bg-white/10"
          >
            Book a demo
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PricingCards />
        <PricingQuestions />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

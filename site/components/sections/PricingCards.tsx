import { Check, Minus } from "lucide-react";
import { PRICING, LINKS } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { CardEstimator } from "@/components/sections/CardEstimator";

/** Whole-dollar USD, e.g. 15 -> "$15". */
export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

type Plan = {
  id: string;
  name: string;
  price: number;
  unit: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    id: "cards",
    name: "Cards",
    price: PRICING.cardPrice,
    unit: "per card",
    cadence: "One-time",
    blurb: "Printed NFC cards your servers drop at the table. Buy as many as you need.",
    features: [
      "Custom printed on both sides",
      "Your logo, or one of four ready designs",
      "NFC chip and QR code on every card",
      "Digital design preview before anything prints",
      "Ships in about 10 business days",
      "Yours to keep, no subscription required",
    ],
    cta: "Order cards",
    href: LINKS.order,
  },
  {
    id: "report",
    name: "Monthly report",
    price: PRICING.monthlyReport,
    unit: "per month, per location",
    cadence: "Subscription",
    blurb: "Every new Google review, read and turned into a short report you can act on.",
    features: [
      "Every Google review read and summarized monthly",
      `${PRICING.freeReplacementCardsPerMonth} free replacement cards every month`,
      "What guests love and what they complain about",
      "Servers and dishes mentioned by name",
      "Month-over-month trend",
      "Priority action list",
      "Drafted replies for negative reviews",
      "Cancel any time",
    ],
    cta: "Start with cards + report",
    href: `${LINKS.order}?report=1`,
    highlighted: true,
    badge: "Most restaurants pick this",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-7 shadow-card sm:p-9",
        plan.highlighted ? "border-transparent ring-2 ring-accent" : "border-line"
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3.5 left-7 inline-flex items-center rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-paper sm:left-9">
          {plan.badge}
        </span>
      )}
      <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">{plan.cadence}</div>
      <h2 className="font-display mt-2 text-3xl">{plan.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{plan.blurb}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-6xl leading-none tabular-nums">{formatPrice(plan.price)}</span>
        <span className="text-sm text-muted">{plan.unit}</span>
      </div>

      <ul className="mt-8 space-y-3 border-t border-line pt-7">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px] text-ink-2">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                plan.highlighted ? "bg-accent text-paper" : "bg-accent-soft text-accent"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        <Button href={plan.href} variant={plan.highlighted ? "primary" : "secondary"} size="lg" className="w-full">
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}

function StarterKit() {
  const kitCards = PRICING.starterKitCards;
  const firstMonth = kitCards * PRICING.cardPrice + PRICING.monthlyReport;
  return (
    <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      <div className="rounded-2xl border border-line bg-paper-2 p-7 sm:p-9">
        <Eyebrow>Starter kit</Eyebrow>
        <h2 className="font-display mt-4 text-3xl leading-tight">
          Most restaurants start with {kitCards} cards, one per server, plus the report.
        </h2>
        <p className="mt-4 text-lg text-ink-2">
          First month: <span className="font-semibold text-ink">{formatPrice(firstMonth)}</span> today, then{" "}
          <span className="font-semibold text-ink">{formatPrice(PRICING.monthlyReport)}</span> a month.
        </p>
        <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-muted">
              {kitCards} cards at {formatPrice(PRICING.cardPrice)}
            </dt>
            <dd className="tabular-nums">{formatPrice(kitCards * PRICING.cardPrice)}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-muted">Monthly report, first month</dt>
            <dd className="tabular-nums">{formatPrice(PRICING.monthlyReport)}</dd>
          </div>
          <div className="flex justify-between py-3 font-medium">
            <dt>Due today</dt>
            <dd className="tabular-nums">{formatPrice(firstMonth)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-muted">
          Bigger floor or more servers? Move the slider and we will suggest a card count.
        </p>
      </div>
      <CardEstimator />
    </div>
  );
}

type Row = {
  label: string;
  cardsOnly: string | boolean;
  withReport: string | boolean;
};

const rows: Row[] = [
  { label: "Custom design, both sides", cardsOnly: true, withReport: true },
  { label: "NFC + QR code", cardsOnly: true, withReport: true },
  {
    label: "Replacement cards",
    cardsOnly: `${formatPrice(PRICING.cardPrice)} each`,
    withReport: `${PRICING.freeReplacementCardsPerMonth} free every month`,
  },
  { label: "Monthly AI report", cardsOnly: false, withReport: true },
  { label: "Staff mentions", cardsOnly: false, withReport: true },
  { label: "Drafted replies", cardsOnly: false, withReport: true },
  { label: "Support", cardsOnly: "Email", withReport: "Email, priority" },
];

function Cell({ value, strong = false }: { value: string | boolean; strong?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2 text-ink">
        <Check className={cn("h-4 w-4 text-accent", strong && "text-accent-2")} strokeWidth={2.5} />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-line-strong">
        <Minus className="h-4 w-4" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className={cn("text-sm", strong ? "text-ink" : "text-ink-2")}>{value}</span>;
}

function Comparison() {
  return (
    <div className="mt-24">
      <div className="max-w-2xl">
        <Eyebrow>What&apos;s included</Eyebrow>
        <Heading size="md" className="mt-4">
          Side by side
        </Heading>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-paper text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              <th scope="col" className="px-5 py-4 font-semibold sm:px-7">
                Feature
              </th>
              <th scope="col" className="px-5 py-4 font-semibold sm:px-7">
                Cards only
              </th>
              <th scope="col" className="px-5 py-4 font-semibold text-accent sm:px-7">
                Cards + report
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="px-5 py-4 text-[15px] font-medium text-ink sm:px-7">
                  {r.label}
                </th>
                <td className="px-5 py-4 sm:px-7">
                  <Cell value={r.cardsOnly} />
                </td>
                <td className="bg-accent-soft/40 px-5 py-4 sm:px-7">
                  <Cell value={r.withReport} strong />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <Section tone="paper">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <Heading as="h1" size="xl" className="mt-5">
            Simple enough to explain to your accountant
          </Heading>
          <Lede className="mt-6">
            Cards are a one-time purchase. The report is a monthly subscription you can cancel any time.
          </Lede>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        <StarterKit />
        <Comparison />
      </Container>
    </Section>
  );
}

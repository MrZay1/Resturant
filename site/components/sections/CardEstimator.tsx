"use client";

import { useId, useState } from "react";
import { PRICING, LINKS } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const MIN_TABLES = 4;
const MAX_TABLES = 60;

/** Rule of thumb: about one card for every two tables, so several checks can go down at once. */
export function suggestCards(tables: number) {
  return Math.max(PRICING.minCards, Math.ceil(tables / 2));
}

function usd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CardEstimator({ className }: { className?: string }) {
  const [tables, setTables] = useState(24);
  const [report, setReport] = useState(true);
  const sliderId = useId();
  const toggleId = useId();

  const cards = suggestCards(tables);
  const cardsTotal = cards * PRICING.cardPrice;
  const monthly = report ? PRICING.monthlyReport : 0;
  const today = cardsTotal + monthly;
  const pct = ((tables - MIN_TABLES) / (MAX_TABLES - MIN_TABLES)) * 100;

  const orderHref = `${LINKS.order}?cards=${cards}${report ? "&report=1" : ""}`;

  return (
    <div className={cn("rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={sliderId} className="text-sm font-medium text-ink">
          Tables on your floor
        </label>
        <span className="font-display text-3xl leading-none tabular-nums">{tables}</span>
      </div>

      <input
        id={sliderId}
        type="range"
        min={MIN_TABLES}
        max={MAX_TABLES}
        step={1}
        value={tables}
        onChange={(e) => setTables(Number(e.target.value))}
        aria-valuemin={MIN_TABLES}
        aria-valuemax={MAX_TABLES}
        aria-valuenow={tables}
        aria-valuetext={`${tables} tables`}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-accent"
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--line) ${pct}%, var(--line) 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{MIN_TABLES}</span>
        <span>{MAX_TABLES}</span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-paper px-4 py-3">
        <div>
          <div className="text-sm font-medium text-ink">Suggested cards</div>
          <div className="text-xs text-muted">About one card for every two tables</div>
        </div>
        <div className="font-display text-3xl leading-none tabular-nums">{cards}</div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <label htmlFor={toggleId} className="text-sm text-ink-2">
          Include the monthly report
        </label>
        <button
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={report}
          onClick={() => setReport((v) => !v)}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
            report ? "bg-accent" : "bg-line-strong"
          )}
        >
          <span
            className={cn(
              "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
              report ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Today</dt>
          <dd className="mt-1 font-display text-3xl leading-none tabular-nums">{usd(today)}</dd>
          <dd className="mt-1 text-xs text-muted">
            {cards} cards at {usd(PRICING.cardPrice)}
            {report ? ` plus first month` : ""}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Then monthly</dt>
          <dd className="mt-1 font-display text-3xl leading-none tabular-nums">{usd(monthly)}</dd>
          <dd className="mt-1 text-xs text-muted">
            {report ? "Cancel any time" : "No subscription"}
          </dd>
        </div>
      </dl>

      <Button href={orderHref} className="mt-6 w-full">
        {report ? "Order cards + report" : "Order cards"}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">US shipping included. Sales tax added at checkout where required.</p>
    </div>
  );
}

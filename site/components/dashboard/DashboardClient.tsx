"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LogoutButton } from "@/components/customer/LogoutButton";
import { TEMPLATE_META, type CardTemplate } from "@/components/card/cardSpec";
import type { Order } from "@/lib/orders";
import { BRAND, LINKS, PRICING } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { FileText, Link2, Mail, RefreshCw, Package, Clock } from "lucide-react";

const inputCls =
  "h-10 w-full rounded-xl border border-line-strong bg-white px-3 text-[14px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

function isTemplate(v: string): v is CardTemplate {
  return v in TEMPLATE_META;
}

function templateName(v: string): string {
  return isTemplate(v) ? TEMPLATE_META[v].name : v || "Custom";
}

function Panel({
  title,
  icon: Icon,
  children,
  className,
  action,
}: {
  title: string;
  icon: typeof FileText;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-white p-5 sm:p-6", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold">
          <Icon className="h-4 w-4 text-accent" /> {title}
        </h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function DashboardClient({ orders, email }: { orders: Order[]; email: string }) {
  const latest = orders[0];
  const totalCards = orders.reduce((sum, o) => sum + o.cards, 0);
  const hasReport = orders.some((o) => o.has_report);
  const linkedOrder = orders.find((o) => o.google_review_link);

  const [replQty, setReplQty] = useState(Math.min(4, PRICING.freeReplacementCardsPerMonth));
  const [replNote, setReplNote] = useState("");
  const [replState, setReplState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function requestReplacements() {
    setReplState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "replacement",
          name: latest.contact_name || email,
          restaurant: latest.restaurant_name,
          email,
          message: `Replacement request: ${replQty} cards. ${replNote}`,
        }),
      });
      setReplState(res.ok ? "sent" : "error");
    } catch {
      setReplState("error");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* stat tiles */}
      <div className="grid gap-3 sm:grid-cols-4 lg:col-span-3">
        {[
          { l: "Cards ordered", v: String(totalCards) },
          { l: "Current status", v: <StatusBadge status={latest.status} /> },
          { l: "Monthly report", v: hasReport ? "Included" : "Not included" },
          { l: "Free replacements", v: hasReport ? `${PRICING.freeReplacementCardsPerMonth}/month` : "—" },
        ].map((t) => (
          <div key={t.l} className="rounded-2xl border border-line bg-white p-4">
            <div className="text-xs text-muted">{t.l}</div>
            <div className="mt-1.5 text-2xl font-semibold tracking-tight">{t.v}</div>
          </div>
        ))}
      </div>

      {/* orders */}
      <Panel title="Your orders" icon={Package} className="lg:col-span-2">
        <ul className="divide-y divide-line">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div>
                <div className="font-medium text-ink">
                  {o.restaurant_name} <span className="font-normal text-muted">· {templateName(o.template)}</span>
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  {o.cards} cards · placed {new Date(o.created_at).toLocaleDateString()}
                </div>
              </div>
              <StatusBadge status={o.status} />
            </li>
          ))}
        </ul>
      </Panel>

      {/* report - honest placeholder, the generator does not exist yet */}
      <Panel
        title="Your monthly report"
        icon={FileText}
        action={
          <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-semibold text-muted">
            Coming soon
          </span>
        }
      >
        <p className="text-sm leading-relaxed text-ink-2">
          We&apos;re building the piece that reads your Google reviews each month and puts a report
          together automatically. Once it launches, it will show up here and you&apos;ll get an
          email &mdash; nothing you need to do in the meantime.
        </p>
        <div className="mt-4">
          <Button href={LINKS.report} variant="secondary" size="sm">
            See a sample report
          </Button>
        </div>
      </Panel>

      {/* google link */}
      <Panel title="Where your cards point" icon={Link2}>
        {linkedOrder ? (
          <>
            <div className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-accent" /> Connected to {linkedOrder.restaurant_name}
            </div>
            <div className="mt-2 truncate rounded-xl bg-paper px-3 py-2 font-mono text-xs text-ink-2">
              {linkedOrder.google_review_link}
            </div>
            <p className="mt-2 text-xs text-muted">
              If your listing ever changes, we re-point it and the cards keep working.
            </p>
          </>
        ) : (
          <div className="flex items-start gap-2 text-sm text-muted">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              We don&apos;t have your Google review link on file yet. Reply to your confirmation
              email with it and we&apos;ll connect it within one business day.
            </p>
          </div>
        )}
        <div className="mt-3">
          <Button href={`mailto:${BRAND.email}?subject=Update%20our%20Google%20link`} variant="secondary" size="sm">
            Ask us to update it
          </Button>
        </div>
      </Panel>

      {/* replacements */}
      <Panel title="Request replacement cards" icon={RefreshCw}>
        {replState === "sent" ? (
          <p className="text-sm text-accent">Request received. Replacements ship with the same design within a few days.</p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={99}
                value={replQty}
                onChange={(e) => setReplQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                className={cn(inputCls, "w-20")}
                aria-label="Number of replacement cards"
              />
              <span className="text-xs text-muted">
                {hasReport ? `of ${PRICING.freeReplacementCardsPerMonth} free this month` : "cards"}
              </span>
            </div>
            <input
              className={inputCls}
              value={replNote}
              onChange={(e) => setReplNote(e.target.value.slice(0, 200))}
              placeholder="Lost, damaged, new location…"
              aria-label="Reason"
            />
            <Button size="sm" onClick={requestReplacements} disabled={replState === "sending"}>
              {replState === "sending" ? "Sending" : "Send request"}
            </Button>
            {replState === "error" && <p className="text-xs text-[#9a3a12]">Could not send. Email {BRAND.email} instead.</p>}
          </div>
        )}
      </Panel>

      {/* account */}
      <Panel title="Account" icon={Mail} className="lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-ink-2">Signed in as {email}</span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${BRAND.email}?subject=Billing`} className="text-muted underline-offset-2 hover:text-ink hover:underline">
              Manage billing
            </a>
            <LogoutButton />
          </div>
        </div>
      </Panel>
    </div>
  );
}

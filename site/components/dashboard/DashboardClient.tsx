"use client";

import { useState } from "react";
import { Columns } from "@/components/report/charts";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { SAMPLE_DASHBOARD as D } from "@/data/sampleDashboard";
import { SAMPLE_REPORT as R } from "@/data/sampleReport";
import { BRAND, PRICING } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { FileText, CreditCard, Link2, Users, RefreshCw, Download, MessageSquare, Check, Copy } from "lucide-react";

const inputCls =
  "h-10 w-full rounded-xl border border-line-strong bg-white px-3 text-[14px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

function Panel({ title, icon: Icon, children, className, action }: { title: string; icon: typeof FileText; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
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

export function DashboardClient() {
  const s = R.summary;
  const [staffNames, setStaffNames] = useState(true);
  const [replQty, setReplQty] = useState(2);
  const [replNote, setReplNote] = useState("");
  const [replState, setReplState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState<number | null>(null);

  async function requestReplacements() {
    setReplState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "replacement", name: D.owner, restaurant: D.restaurant, email: D.recipients[0], message: `Replacement request: ${replQty} cards. ${replNote}` }),
      });
      setReplState(res.ok ? "sent" : "error");
    } catch {
      setReplState("error");
    }
  }

  function copyDraft(i: number, text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* stat tiles */}
      <div className="grid gap-3 sm:grid-cols-4 lg:col-span-3">
        {[
          { l: "Card taps this month", v: String(s.cardTaps), d: "up 38% vs July" },
          { l: "New reviews", v: String(s.reviews), d: `+${s.reviews - s.reviewsPrev} vs July` },
          { l: "Average rating", v: s.avgRating.toFixed(1), d: `+${(s.avgRating - s.avgRatingPrev).toFixed(1)} vs July` },
          { l: "Reviews awaiting reply", v: String(D.awaitingReply.length), d: "drafts ready below" },
        ].map((t) => (
          <div key={t.l} className="rounded-2xl border border-line bg-white p-4">
            <div className="text-xs text-muted">{t.l}</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">{t.v}</div>
            <div className="mt-1 text-xs font-medium text-accent">{t.d}</div>
          </div>
        ))}
      </div>

      {/* this month's report */}
      <Panel title="This month's report" icon={FileText} className="lg:col-span-2" action={<span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">Ready</span>}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{R.period}</div>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{R.headline}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button href="/sample-report" size="sm">
              Read the report
            </Button>
            <Button href="/print/report-onepager" variant="secondary" size="sm">
              <Download className="h-4 w-4" /> One-page PDF
            </Button>
          </div>
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Past reports</div>
          <ul className="mt-2 divide-y divide-line">
            {D.reports.slice(1).map((r) => (
              <li key={r.period} className="flex items-center justify-between py-2.5 text-sm">
                <a href={r.href} className="font-medium underline-offset-4 hover:underline">
                  {r.period}
                </a>
                <span className="flex items-center gap-3 text-muted">
                  <span>{r.reviews} reviews</span>
                  <span className="flex items-center gap-1">
                    <Stars value={r.rating} size="h-3 w-3" /> {r.rating.toFixed(1)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      {/* taps */}
      <Panel title="Card taps by week" icon={RefreshCw}>
        <Columns data={D.tapsByWeek} highlightIndex={D.tapsByWeek.length - 1} ariaLabel="Card taps per week in August" />
        <p className="mt-2 text-xs text-muted">
          {Math.round((s.reviews / s.cardTaps) * 100)}% of taps became a posted review. Taps count on your short link {D.shortLink}.
        </p>
      </Panel>

      {/* awaiting reply */}
      <Panel title="Reviews awaiting your reply" icon={MessageSquare} className="lg:col-span-2">
        <ul className="space-y-3">
          {D.awaitingReply.map((r, i) => (
            <li key={r.excerpt} className="rounded-xl border border-line bg-paper p-4">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-2">
                  <Stars value={r.stars} size="h-3 w-3" /> {r.stars}-star · {r.when}
                </span>
              </div>
              <p className="mt-2 text-sm italic text-ink-2">“{r.excerpt}”</p>
              <div className="mt-3 rounded-lg bg-white p-3 text-sm leading-relaxed">{r.draft}</div>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => copyDraft(i, r.draft)} className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-3 py-1.5 text-xs font-medium hover:border-ink">
                  {copied === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied === i ? "Copied" : "Copy draft"}
                </button>
                <a href={D.googleLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-muted hover:text-ink">
                  Open in Google
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {/* cards + replacements */}
      <Panel title="Your cards" icon={CreditCard}>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["In service", D.cards.inService],
            ["Replaced this month", D.cards.replacedThisMonth],
            ["Free replacements left", D.cards.freeReplacementsLeft],
            ["Reported lost", D.cards.lost],
          ].map(([k, v]) => (
            <div key={String(k)} className="rounded-xl bg-paper p-3">
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="mt-0.5 text-xl font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 border-t border-line pt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Request replacement cards</div>
          {replState === "sent" ? (
            <p className="mt-2 text-sm text-accent">Request received. Replacements ship with the same design within a few days.</p>
          ) : (
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input type="number" min={1} max={PRICING.freeReplacementCardsPerMonth} value={replQty} onChange={(e) => setReplQty(Math.max(1, Math.min(PRICING.freeReplacementCardsPerMonth, Number(e.target.value) || 1)))} className={cn(inputCls, "w-20")} aria-label="Number of replacement cards" />
                <span className="text-xs text-muted">of {PRICING.freeReplacementCardsPerMonth} free this month</span>
              </div>
              <input className={inputCls} value={replNote} onChange={(e) => setReplNote(e.target.value.slice(0, 200))} placeholder="Lost, damaged, new server…" aria-label="Reason" />
              <Button size="sm" onClick={requestReplacements} disabled={replState === "sending"}>
                {replState === "sending" ? "Sending" : "Send request"}
              </Button>
              {replState === "error" && <p className="text-xs text-[#9a3a12]">Could not send. Email {BRAND.email} instead.</p>}
            </div>
          )}
        </div>
      </Panel>

      {/* google link */}
      <Panel title="Where your cards point" icon={Link2}>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-accent" /> Connected to {D.restaurant}
        </div>
        <div className="mt-2 truncate rounded-xl bg-paper px-3 py-2 font-mono text-xs text-ink-2">{D.googleLink}</div>
        <p className="mt-2 text-xs text-muted">Every card and QR code goes through {D.shortLink}. If your listing ever changes, we re-point it and the cards keep working.</p>
        <div className="mt-3">
          <Button href={`mailto:${BRAND.email}?subject=Update%20our%20Google%20link`} variant="secondary" size="sm">
            Ask us to update it
          </Button>
        </div>
      </Panel>

      {/* settings */}
      <Panel title="Report settings" icon={Users}>
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Report goes to</div>
        <ul className="mt-2 space-y-1 text-sm">
          {D.recipients.map((r) => (
            <li key={r} className="rounded-lg bg-paper px-3 py-1.5">{r}</li>
          ))}
        </ul>
        <label className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span>
            Name servers in the report
            <span className="block text-xs text-muted">Only when guests name them. Off keeps it to “a server”.</span>
          </span>
          <button type="button" role="switch" aria-checked={staffNames} onClick={() => setStaffNames((v) => !v)} className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", staffNames ? "bg-accent" : "bg-line-strong")}>
            <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform", staffNames ? "translate-x-5.5" : "translate-x-0.5")} />
          </button>
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button href={`/print/staff-guide?name=${encodeURIComponent(D.restaurant)}`} variant="secondary" size="sm">
            <Download className="h-4 w-4" /> Staff guide
          </Button>
          <Button href={`mailto:${BRAND.email}?subject=Billing`} variant="secondary" size="sm">
            Manage billing
          </Button>
        </div>
      </Panel>
    </div>
  );
}

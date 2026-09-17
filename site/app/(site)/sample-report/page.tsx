import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { CTA } from "@/components/sections/CTA";
import { Columns, Line, Bars, StackedBars, VIZ } from "@/components/report/charts";
import { SAMPLE_REPORT as R } from "@/data/sampleReport";
import { BRAND, LINKS } from "@/lib/brand";
import { ArrowUpRight, Quote, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sample monthly report",
  description: `A real example of the monthly AI review report ${BRAND.name} sends restaurant owners.`,
};

function Delta({ value, suffix = "" }: { value: number; suffix?: string }) {
  const up = value >= 0;
  return (
    <span className={`text-xs font-medium ${up ? "text-accent" : "text-[#b4441b]"}`}>
      {up ? "+" : ""}
      {value}
      {suffix}
    </span>
  );
}

function SectionTitle({ n, children, sub }: { n: string; children: string; sub?: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-xs text-accent">{n}</span>
      <div>
        <h2 className="font-display text-3xl leading-tight">{children}</h2>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
    </div>
  );
}

export default function SampleReportPage() {
  const s = R.summary;
  const dist = [
    { label: "5 stars", value: s.fiveStar, color: VIZ.series },
    { label: "4 stars", value: s.fourStar, color: VIZ.series },
    { label: "3 stars", value: s.threeStar, color: VIZ.negative },
    { label: "2 stars", value: s.twoStar, color: VIZ.negative },
    { label: "1 star", value: s.oneStar, color: VIZ.negative },
  ];
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* banner */}
        <div className="border-b border-line bg-paper-2">
          <Container className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
            <div className="text-ink-2">
              This is a sample report for a fictional restaurant. Yours will use your real Google reviews.
            </div>
            <Button href={`${LINKS.order}?report=1`} size="sm">
              Get this for my restaurant
            </Button>
          </Container>
        </div>

        {/* report header */}
        <section className="pt-14 pb-10">
          <Container size="narrow">
            <Eyebrow>Monthly review report</Eyebrow>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-5xl leading-none sm:text-6xl">{R.restaurant}</h1>
                <div className="mt-3 text-muted">
                  {R.period} · Generated {R.generatedOn} · Prepared by {BRAND.name}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm">
                <Stars value={s.lifetimeRating} size="h-3.5 w-3.5" />
                <span>{s.lifetimeRating.toFixed(1)} lifetime · {s.lifetimeReviews} reviews</span>
              </div>
            </div>

            {/* hero number + tiles */}
            <div className="mt-10 grid gap-4 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-sm text-muted">New reviews in {R.period.split(" ")[0]}</div>
                <div className="mt-1 text-5xl font-semibold tracking-tight">{s.reviews}</div>
                <div className="mt-1">
                  <Delta value={s.reviews - s.reviewsPrev} /> <span className="text-xs text-muted">vs July ({s.reviewsPrev})</span>
                </div>
              </div>
              {[
                { l: "Average rating", v: s.avgRating.toFixed(1), d: <Delta value={Number((s.avgRating - s.avgRatingPrev).toFixed(1))} />, note: "vs July" },
                { l: "Card taps", v: String(s.cardTaps), d: <span className="text-xs text-accent font-medium">{Math.round((s.reviews / s.cardTaps) * 100)}%</span>, note: "became reviews" },
                { l: "Owner reply rate", v: `${s.replyRate}%`, d: <span className="text-xs text-[#b4441b] font-medium">goal 80%</span>, note: "of new reviews" },
              ].map((t) => (
                <div key={t.l} className="rounded-2xl border border-line bg-white p-5">
                  <div className="text-sm text-muted">{t.l}</div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight">{t.v}</div>
                  <div className="mt-1">
                    {t.d} <span className="text-xs text-muted">{t.note}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* headline */}
            <div className="mt-8 rounded-2xl border-l-4 border-accent bg-white p-6 shadow-card">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">The one-paragraph version</div>
              <p className="mt-2 text-lg leading-relaxed text-ink">{R.headline}</p>
            </div>
          </Container>
        </section>

        {/* trend */}
        <section className="py-10">
          <Container size="narrow">
            <SectionTitle n="01" sub="Six-month view. August is the first full month with cards on every table.">
              Trend
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-sm font-medium">Reviews per month</div>
                <Columns
                  className="mt-3"
                  ariaLabel="Reviews per month, March to August"
                  data={R.trend.map((t) => ({ label: t.month, value: t.reviews }))}
                  highlightIndex={R.trend.length - 1}
                />
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-sm font-medium">Average rating of new reviews</div>
                <Line
                  className="mt-3"
                  ariaLabel="Average rating per month, March to August"
                  data={R.trend.map((t) => ({ label: t.month, value: t.rating }))}
                  min={4.0}
                  max={5.0}
                />
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-line bg-white p-5">
              <div className="text-sm font-medium">Rating distribution, {R.period}</div>
              <Bars
                className="mt-4"
                ariaLabel="Distribution of star ratings in August"
                data={dist}
              />
            </div>
          </Container>
        </section>

        {/* wins */}
        <section className="py-10">
          <Container size="narrow">
            <SectionTitle n="02" sub="What guests praised most, ranked by how often it came up.">
              What is working
            </SectionTitle>
            <div className="space-y-4">
              {R.wins.map((w) => (
                <div key={w.title} className="rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{w.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{w.detail}</p>
                      {w.quotes.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {w.quotes.map((q) => (
                            <div key={q} className="flex items-start gap-2 rounded-xl bg-paper px-4 py-3 text-sm text-ink-2">
                              <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                              <span className="italic">“{q}”</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* issues */}
        <section className="py-10">
          <Container size="narrow">
            <SectionTitle n="03" sub="Grouped by cause, not by review. Each one comes with a fix you can start tomorrow.">
              What is costing you stars
            </SectionTitle>
            <div className="space-y-4">
              {R.issues.map((it) => (
                <div key={it.title} className="rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`mt-1 h-5 w-5 shrink-0 ${it.severity === "high" ? "text-[#d9622b]" : "text-gold-2"}`} />
                    <div className="w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight">{it.title}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                            it.severity === "high" ? "bg-[#fbe7dd] text-[#9a3a12]" : it.severity === "medium" ? "bg-[#fbf1d9] text-[#7a5a12]" : "bg-paper-2 text-muted"
                          }`}
                        >
                          {it.severity} priority
                        </span>
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{it.detail}</p>
                      <div className="mt-4 rounded-xl border border-accent/20 bg-accent-soft/60 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Suggested fix</div>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink">{it.action}</p>
                      </div>
                      {it.quotes.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {it.quotes.map((q) => (
                            <div key={q} className="flex items-start gap-2 rounded-xl bg-paper px-4 py-3 text-sm text-ink-2">
                              <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d9622b]" />
                              <span className="italic">“{q}”</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* staff + dishes */}
        <section className="py-10">
          <Container size="narrow">
            <SectionTitle n="04" sub="Who and what guests mention by name. Staff naming can be turned off in your settings.">
              People and plates
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-sm font-medium">Staff mentioned</div>
                <table className="mt-3 w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 text-right font-medium">Mentions</th>
                      <th className="pb-2 pl-3 font-medium">Tone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {R.staff.map((p) => (
                      <tr key={p.name} className="border-t border-line align-top">
                        <td className="py-2.5 pr-2 font-medium">{p.name}</td>
                        <td className="py-2.5 text-right" style={{ fontVariantNumeric: "tabular-nums" }}>{p.mentions}</td>
                        <td className="py-2.5 pl-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs ${p.sentiment === "positive" ? "text-accent" : "text-[#9a3a12]"}`}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.sentiment === "positive" ? VIZ.series : VIZ.negative }} />
                            {p.sentiment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 space-y-2 border-t border-line pt-4 text-[13px] text-muted">
                  {R.staff.map((p) => (
                    <p key={p.name}>
                      <span className="font-medium text-ink">{p.name}:</span> {p.note}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-sm font-medium">Dishes mentioned</div>
                <div className="mt-1 text-xs text-muted">Mentions, with the share that were positive</div>
                <Bars
                  className="mt-4"
                  ariaLabel="Dishes mentioned in August reviews"
                  data={R.dishes.map((d) => ({
                    label: d.name,
                    value: d.mentions,
                    note: `${d.sentiment}%`,
                    color: d.sentiment < 80 ? VIZ.negative : VIZ.series,
                  }))}
                />
                <div className="mt-6 text-sm font-medium">Themes</div>
                <StackedBars
                  className="mt-3"
                  ariaLabel="Review themes split by positive and negative mentions"
                  data={R.themes.map((t) => ({ label: t.name, positive: t.positive, negative: t.mentions - t.positive }))}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* actions */}
        <section className="py-10">
          <Container size="narrow">
            <SectionTitle n="05" sub="In order. The first two cost nothing.">
              This month, do these
            </SectionTitle>
            <ol className="space-y-3">
              {R.recommendations.map((r) => (
                <li key={r.priority} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm text-paper">{r.priority}</span>
                  <p className="text-[15px] leading-relaxed">{r.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* replies */}
        <section className="py-10 pb-20">
          <Container size="narrow">
            <SectionTitle n="06" sub="Copy, edit, post. Replies are public and future guests read them.">
              Drafted replies
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {R.repliesToWrite.map((r) => (
                <div key={r.excerpt} className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <Stars value={r.stars} size="h-3.5 w-3.5" />
                    <span className="text-xs text-muted">{r.stars}-star review</span>
                  </div>
                  <p className="mt-3 text-sm italic text-ink-2">“{r.excerpt}”</p>
                  <div className="mt-4 rounded-xl bg-paper p-4 text-[15px] leading-relaxed">{r.draft}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-paper-2 p-6">
              <div>
                <div className="font-display text-2xl">Want this for your restaurant?</div>
                <div className="mt-1 text-sm text-muted">Cards from $15. The report is $50 a month, cancel anytime.</div>
              </div>
              <Button href={`${LINKS.order}?report=1`}>
                Order cards and report <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}

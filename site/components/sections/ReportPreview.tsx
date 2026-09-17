import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { SAMPLE_REPORT as R } from "@/data/sampleReport";
import { LINKS } from "@/lib/brand";
import { Stars } from "@/components/ui/Stars";
import { ArrowUpRight, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { firstSentences } from "@/lib/text";

export function ReportPreview() {
  const s = R.summary;
  return (
    <Section id="report" tone="dark" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 40% at 80% 0%, rgba(230,180,85,0.12), transparent 70%)" }}
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div>
            <Eyebrow tone="inverse">The monthly report</Eyebrow>
            <Heading className="mt-4 text-paper">What your guests are actually saying.</Heading>
            <Lede className="mt-5 text-paper/70">
              On the first business day of every month, our AI reads every new Google review and writes you a report
              a good general manager would be proud of. Not a star average. The reasons behind it.
            </Lede>
            <ul className="mt-8 space-y-4 text-[15px] text-paper/85">
              {[
                [TrendingUp, "What guests love, ranked by how often it comes up"],
                [AlertTriangle, "Complaints grouped by cause, each with a fix"],
                [Users, "Servers and dishes mentioned by name"],
                [ArrowUpRight, "Priority actions and drafted replies to negative reviews"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof TrendingUp;
                return (
                  <li key={String(text)} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <I className="h-3.5 w-3.5" />
                    </span>
                    {String(text)}
                  </li>
                );
              })}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={LINKS.report} variant="inverse" size="lg">
                Read the full sample report
              </Button>
              <a href="/dashboard" className="text-sm text-paper/80 underline-offset-4 hover:underline">
                Preview the owner dashboard
              </a>
            </div>
          </div>

          {/* report mock */}
          <div className="rounded-3xl border border-white/10 bg-paper p-6 text-ink shadow-lift sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{R.period} report</div>
                <div className="font-display mt-1 text-2xl">{R.restaurant}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Stars value={s.avgRating} size="h-3.5 w-3.5" /> {s.avgRating.toFixed(1)}
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{R.headline}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { v: s.reviews, l: "reviews", d: `+${s.reviews - s.reviewsPrev} vs ${"July"}` },
                { v: s.avgRating.toFixed(1), l: "avg rating", d: `+${(s.avgRating - s.avgRatingPrev).toFixed(1)}` },
                { v: s.cardTaps, l: "card taps", d: "first full month" },
              ].map((t) => (
                <div key={t.l} className="rounded-xl border border-line bg-white p-3">
                  <div className="text-2xl font-semibold tracking-tight">{t.v}</div>
                  <div className="text-xs text-muted">{t.l}</div>
                  <div className="mt-1 text-[11px] font-medium text-accent">{t.d}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Top win</div>
                <div className="mt-1.5 text-[15px] font-semibold leading-snug">{R.wins[0].title}</div>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">{firstSentences(R.wins[0].detail)}</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">Fix first</div>
                <div className="mt-1.5 text-[15px] font-semibold leading-snug">{R.issues[0].title}</div>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">{firstSentences(R.issues[0].action)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {R.staff.slice(0, 3).map((p) => (
                <span key={p.name} className="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink-2">
                  {p.name} · named {p.mentions}×
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

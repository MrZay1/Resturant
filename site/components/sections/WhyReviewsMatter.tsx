import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Star } from "@/components/ui/Stars";
import { MapPin, ArrowUp } from "lucide-react";

const stats = [
  { value: "97%", label: "of consumers read online reviews for local businesses", source: "BrightLocal, Local Consumer Review Survey 2026" },
  { value: "74%", label: "look for reviews written in the last three months", source: "BrightLocal, 2026" },
  { value: "47%", label: "will not use a business with fewer than 20 reviews", source: "BrightLocal, 2026" },
  { value: "5 to 9%", label: "more revenue per extra star, for independent restaurants", source: "Harvard Business School, Yelp data" },
];

export type MapRow = { name: string; rating: number; count: number; note: string; you?: boolean };

export function MapPack({
  youName = "Lucia's Trattoria",
  query = "italian dinner near me",
  rows: rowsIn,
  caption,
  label,
  arrow = true,
}: {
  youName?: string;
  query?: string;
  rows?: MapRow[];
  caption?: string;
  /** Plain heading instead of the search pill. Use when the list is real data, not an illustrated search. */
  label?: string;
  /** The up arrow on the "you" badge implies a rank change; turn it off for factual lists. */
  arrow?: boolean;
}) {
  const rows: MapRow[] = rowsIn ?? [
    { name: "Trattoria on Fifth", rating: 4.3, count: 58, note: "Last review 3 months ago", you: false },
    { name: youName, rating: 4.6, count: 612, note: "87 reviews last month", you: true },
    { name: "Nonna's Kitchen", rating: 4.4, count: 131, note: "Last review 5 weeks ago", you: false },
  ];
  return (
    <div className="rounded-3xl border border-line bg-white p-4 shadow-card sm:p-5" aria-hidden="true">
      {label ? (
        <div className="px-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</div>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {query}
        </div>
      )}
      <div className="mt-4 divide-y divide-line">
        {rows.map((r) => (
          <div key={r.name} className={`flex items-center gap-4 py-3.5 ${r.you ? "-mx-2 rounded-xl bg-accent-soft/60 px-2" : ""}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${r.you ? "bg-accent text-white" : "bg-paper-2 text-muted"}`}>
              <MapPin className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`truncate text-[15px] ${r.you ? "font-semibold text-ink" : "text-ink-2"}`}>{r.name}</span>
                {r.you && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {arrow && <ArrowUp className="h-3 w-3" />} you
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                <span className="font-medium text-ink">{r.rating.toFixed(1)}</span>
                <span className="inline-flex text-gold">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3" filled={i <= Math.round(r.rating)} />
                  ))}
                </span>
                <span>({r.count})</span>
                <span>·</span>
                <span>{r.note}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted">{caption ?? "Illustration. Positions on the map depend on relevance, distance and prominence."}</p>
    </div>
  );
}

export function WhyReviewsMatter() {
  return (
    <Section id="why-reviews" tone="dark" className="relative overflow-hidden texture-lines mesh-dark">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow tone="inverse">Why reviews matter</Eyebrow>
            <Heading className="mt-4">More reviews. Higher on the map. More walk-ins.</Heading>
            <Lede className="mt-5 text-paper/70">
              When someone searches “dinner near me”, Google ranks the results by relevance, distance and
              prominence. In Google’s own words, “more reviews and positive ratings can help your business’s local
              ranking.” Fresh, steady reviews are how a small restaurant earns one of the three spots people actually
              tap.
            </Lede>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.map((s) => (
                <div key={s.value + s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="font-display text-4xl leading-none text-gold">{s.value}</div>
                  <div className="mt-2 text-[15px] leading-snug text-paper/85">{s.label}</div>
                  <div className="mt-2 text-[11px] text-paper/45">{s.source}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-paper/45">
              Sources: Google Business Profile Help, “How to improve your local ranking on Google”; BrightLocal Local
              Consumer Review Survey 2026 (US consumer survey); Luca, “Reviews, Reputation, and Revenue,” Harvard Business
              School working paper, based on Yelp ratings for independent restaurants. The revenue study is about ratings,
              not a guarantee for any one restaurant.
            </p>
          </div>
          <MapPack />
        </div>
      </Container>
    </Section>
  );
}

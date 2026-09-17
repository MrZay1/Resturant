"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CardFace } from "@/components/card/CardFace";
import { DEFAULT_DESIGN, TEMPLATE_META, type CardDesign, type CardTemplate } from "@/components/card/cardSpec";
import { MapPack, type MapRow } from "@/components/sections/WhyReviewsMatter";
import { ReportThumb } from "@/components/sections/HowItWorks";
import { TapMark } from "@/components/ui/Logo";
import { BRAND, PRICING } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { loadProfiles, newProfile, profileFromParams, type PitchProfile } from "@/lib/pitch";
import { ChevronLeft, ChevronRight, Maximize2, Printer, X, Check, Ban, LayoutGrid, Play } from "lucide-react";
import QRCode from "qrcode";

const TEMPLATES: CardTemplate[] = ["classic", "noir", "brand", "logo"];

/** "today, about 10 in the last 4 days" -> ["Today", "about 10 in the last 4 days"] so the tile has one big value. */
function splitStat(v: string): [string, string] {
  if (!v) return ["—", ""];
  const i = v.indexOf(",");
  if (i > 0 && i <= 18) return [v.slice(0, i).replace(/^./, (c) => c.toUpperCase()), v.slice(i + 1).trim()];
  const words = v.split(" ");
  if (words.length <= 3) return [v, ""];
  return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
}

const DEFAULT_BENCHMARKS: Array<{ name: string; detail: string; perMonth: number; basis?: string }> = [];
const DEFAULT_TODAY = [
  "The ask depends on which server remembers to make it",
  "Nobody reads the reviews all the way through each month",
];

function slugify(name: string) {
  return name.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 18) || "yourname";
}

/** Resolves the profile once, on the client: ?id= from local storage, else URL params, else the sample restaurant. */
function resolveProfile(): PitchProfile {
  const sample: PitchProfile = { ...newProfile(), name: "Lucia's Trattoria", owner: "Lucia", rating: "4.4", reviewCount: "525", lastReview: "3 weeks ago" };
  if (typeof window === "undefined") return sample;
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  if (id) {
    const found = loadProfiles().find((x) => x.id === id);
    if (found) return found;
  }
  const fromParams = profileFromParams(sp);
  return Object.keys(fromParams).length ? { ...sample, ...fromParams } : sample;
}

function Slide({ children, tone = "paper", className }: { children: React.ReactNode; tone?: "paper" | "dark"; className?: string }) {
  return (
    <div className={cn("slide relative flex h-full w-full flex-col overflow-hidden", tone === "dark" ? "bg-dark text-paper" : "bg-paper text-ink", className)}>
      {children}
    </div>
  );
}

function Foot({ tone = "paper", name }: { tone?: "paper" | "dark"; name: string }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 flex items-center justify-between px-14 pb-8 text-[13px]", tone === "dark" ? "text-paper/50" : "text-muted")}>
      <span className="flex items-center gap-2">
        <span className={cn("grid h-5 w-5 place-items-center rounded-md", tone === "dark" ? "bg-paper text-ink" : "bg-ink text-paper")}>
          <TapMark className="h-3 w-3" />
        </span>
        {BRAND.name}
      </span>
      <span>Prepared for {name}</span>
    </div>
  );
}

export function Deck() {
  const router = useRouter();
  const [p, setP] = useState<PitchProfile>(resolveProfile);
  const [reviewMode, setReviewMode] = useState(
    () => (typeof window === "undefined" ? false : new URLSearchParams(window.location.search).get("view") === "all")
  );
  const [i, setI] = useState(0);

  // ?pack=<slug> loads a generated pitch pack from disk (external system, so an effect is right).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("pack");
    if (!slug) return;
    let alive = true;
    fetch(`/api/pitch-packs/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((prof) => {
        if (alive && prof && prof.name) setP((prev) => ({ ...prev, ...prof }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  const [qr, setQr] = useState<string>();
  const name = p.name || "Your Restaurant";
  const design: CardDesign = useMemo(
    () => ({ ...DEFAULT_DESIGN, restaurantName: name, headline: p.headline || DEFAULT_DESIGN.headline, subline: p.subline ?? DEFAULT_DESIGN.subline, brandColor: p.brandColor, logoDataUrl: p.logoDataUrl, template: p.template, showStars: false, shortUrl: `${BRAND.shortLinkHost}/r/${slugify(name)}`, qrDataUrl: qr }),
    [p, name, qr]
  );
  useEffect(() => {
    QRCode.toDataURL(`https://${BRAND.shortLinkHost}/r/${slugify(name)}?s=qr`, { margin: 0, color: { dark: "#15130f", light: "#00000000" } }).then(setQr);
  }, [name]);

  const slides = [
    // 1 cover
    <Slide key="cover" tone="dark">
      <div className="grid h-full grid-cols-[1.05fr_1fr] items-center gap-10 px-14 pb-16 pt-14">
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">For {name}{p.city ? ` · ${p.city}` : ""}</div>
          <h1 className="font-display mt-6 text-[64px] leading-[1.0] tracking-[-0.01em]">
            The review your guests <em className="text-gold">meant</em> to leave.
          </h1>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-paper/70">A card your servers drop with the check. A monthly report on what guests are saying. Nothing for you to run.</p>
        </div>
        <div className="rotate-[-4deg] overflow-hidden rounded-[6%/9.5%] shadow-lift ring-1 ring-white/10">
          <CardFace design={{ ...design, template: "logo" }} side="front" id="deck-cover" />
        </div>
      </div>
      <Foot tone="dark" name={name} />
    </Slide>,
    // 2 today
    <Slide key="today">
      <div className="px-14 pt-14">
        <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">{name} on Google today</div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {[
            ["Rating", p.rating || "—", ""],
            ["Reviews", p.reviewCount || "—", ""],
            ["Most recent review", ...splitStat(p.lastReview)],
          ].map(([l, v, sub]) => (
            <div key={l} className="flex flex-col rounded-3xl border border-line bg-white p-8">
              <div className="text-sm text-muted">{l}</div>
              <div className="font-display mt-2 text-[56px] leading-none">{v}</div>
              {sub && <div className="mt-2 text-[15px] leading-snug text-muted">{sub}</div>}
            </div>
          ))}
        </div>
        <h2 className="font-display mt-12 max-w-4xl text-[40px] leading-[1.1]">{p.hook || "Only the delighted and the furious leave reviews on their own. Everyone else walks out with your best feedback."}</h2>
        <p className="mt-5 max-w-3xl text-xl text-muted">{p.hook ? "Only the delighted and the furious leave reviews on their own. Everyone else walks out with your best feedback." : "Most of your regulars have never written a word about you. Not because they would not, but because nobody asked at the right moment."}</p>
      </div>
      <Foot name={name} />
    </Slide>,
    // 2b what guests already say (research-driven)
    ...(p.praise && p.praise.length
      ? [
          <Slide key="guests">
            <div className="px-14 pt-14">
              <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">What your guests already say</div>
              <h2 className="font-display mt-4 text-[44px] leading-[1.05]">We read your last reviews before we came in.</h2>
              <div className="mt-9 grid grid-cols-3 gap-6">
                <div className="rounded-3xl border border-line bg-white p-7">
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent"><Check className="h-4 w-4" /> Guests praise</div>
                  <ul className="mt-4 space-y-2.5 text-[17px]">{p.praise.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="rounded-3xl border border-line bg-white p-7">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#9a3a12]"><Ban className="h-4 w-4" /> Comes up more than once</div>
                  <ul className="mt-4 space-y-2.5 text-[17px]">{(p.complaints || []).slice(0, 4).map((x) => <li key={x}>{x}</li>)}{!(p.complaints && p.complaints.length) && <li className="text-muted">Nothing recurring. Good sign.</li>}</ul>
                </div>
                <div className="rounded-3xl border border-line bg-white p-7">
                  <div className="text-sm font-semibold text-ink">Dishes people name</div>
                  <ul className="mt-4 space-y-2.5 text-[17px]">{(p.dishes || []).slice(0, 5).map((x) => <li key={x}>{x}</li>)}{!(p.dishes && p.dishes.length) && <li className="text-muted">Few dishes named yet. More reviews fix that.</li>}</ul>
                </div>
              </div>
              <p className="mt-6 text-[15px] text-muted">This is a hand read of public Google reviews. The monthly report does this for every review, every month, with counts and fixes.</p>
            </div>
            <Foot name={name} />
          </Slide>,
        ]
      : []),
    // 3 why
    <Slide key="why">
      <div className="grid h-full grid-cols-[1.1fr_1fr] items-center gap-12 px-14 pb-16 pt-14">
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">Why it matters</div>
          <h2 className="font-display mt-4 text-[48px] leading-[1.05]">More reviews. Higher on the map. More walk-ins.</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">Google says it plainly: “More reviews and positive ratings can help your business’s local ranking.” Fresh, steady reviews are how you earn one of the three spots people actually tap.</p>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {[
              ["97%", "of consumers read reviews for local businesses"],
              ["74%", "look for reviews from the last three months"],
              ["47%", "skip businesses with fewer than 20 reviews"],
            ].map(([v, l]) => (
              <div key={v} className="rounded-2xl border border-line bg-white p-4">
                <div className="font-display text-4xl leading-none">{v}</div>
                <div className="mt-2 text-[13px] leading-snug text-ink-2">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-muted">Google Business Profile Help; BrightLocal Local Consumer Review Survey 2026.</div>
        </div>
        {p.competitors && p.competitors.length ? (
          <MapPack
            youName={name}
            label="Nearby on Google, by review count"
            arrow={false}
            rows={[
              ...p.competitors.slice(0, 3).map((c): MapRow => ({ name: c.name, rating: c.rating, count: c.count, note: c.note, you: false })),
              { name, rating: Number(p.rating) || 0, count: Number(String(p.reviewCount).replace(/[^0-9.]/g, "")) || 0, note: p.lastReview ? `Last review ${p.lastReview}` : "", you: true },
            ].sort((a, b) => b.count - a.count)}
            caption="Not a ranking. Ratings and review counts read from Google before this visit."
          />
        ) : (
          <MapPack youName={name} query={p.query || `${(p.cuisine || p.city || "dinner").toLowerCase()} near me`} />
        )}
      </div>
      <Foot name={name} />
    </Slide>,
    // 4b side by side: the restaurants people keep finding, versus here
    <Slide key="gap">
      <div className="px-14 pt-11">
        <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">The gap</div>
        <h2 className="font-display mt-3 text-[40px] leading-[1.05]">{p.gapTitle || "The rooms you compete with are getting more reviews."}</h2>
        <div className="mt-6 grid grid-cols-2 gap-6">
          {/* them */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">Restaurants people keep finding</div>
            <div className="mt-4 space-y-3">
              {(p.benchmarks && p.benchmarks.length ? p.benchmarks : DEFAULT_BENCHMARKS).slice(0, 3).map((b) => (
                <div key={b.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="truncate text-[17px] font-semibold text-ink">{b.name}</div>
                    <div className="text-[12px] text-muted">{b.detail}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-[30px] leading-none text-accent">{b.perMonth.toLocaleString()}</div>
                    <div className="text-[11px] text-muted">reviews a month</div>
                  </div>
                </div>
              ))}
            </div>
            {p.benchmarkNote && <p className="mt-4 text-[12px] leading-snug text-muted">{p.benchmarkNote}</p>}
          </div>
          {/* you */}
          <div className="rounded-3xl border-2 border-ink bg-paper-2 p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">{name} today</div>
            <div className="mt-4 flex items-baseline gap-3 border-b border-line-strong pb-3">
              <div className="font-display text-[52px] leading-none">{p.reviewsPerMonth || "about 50"}</div>
              <div className="text-[13px] leading-snug text-muted">
                reviews a month
                {p.reviewsPerMonthBasis ? <span className="block">{p.reviewsPerMonthBasis}</span> : null}
              </div>
            </div>
            <ul className="mt-4 space-y-2.5 text-[16px] leading-snug text-ink-2">
              {(p.todayFacts && p.todayFacts.length ? p.todayFacts : DEFAULT_TODAY).map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d9622b]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* the bridge */}
        <div className="mt-6 rounded-3xl bg-dark px-7 py-5 text-paper">
          <div className="flex items-center gap-6">
            <div className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">What changes</div>
            <div className="grid flex-1 grid-cols-3 gap-6 text-[15px] leading-snug">
              <div>Every table gets the same ask, on the guest’s own phone, at the moment they are happiest.</div>
              <div>Every new review read and summarized once a month, with the complaints counted.</div>
              <div>Replies drafted for the reviews that need one, so none of them sit unanswered.</div>
            </div>
          </div>
        </div>
      </div>
      <Foot name={name} />
    </Slide>,
    // 4 how
    <Slide key="how">
      <div className="px-14 pt-14">
        <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">How it works</div>
        <h2 className="font-display mt-4 text-[48px] leading-[1.05]">Three steps. One new habit.</h2>
        <div className="mt-10 grid grid-cols-3 gap-8">
          {[
            ["01", "Server drops the card with the check", "It lives in the check presenter. One optional line, then walk away."],
            ["02", "Guest taps, the review screen opens", "iPhone or Android, no app. A link pops up, they tap it, your Google review form opens. About a minute."],
            ["03", "You get the report every month", "Every new review read and summarized: what guests love, what to fix, who got named, drafted replies."],
          ].map(([n, t, b]) => (
            <div key={n} className="rounded-3xl border border-line bg-white p-7">
              <div className="font-mono text-sm text-accent">{n}</div>
              <div className="font-display mt-3 text-[28px] leading-tight">{t}</div>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{b}</p>
            </div>
          ))}
        </div>
      </div>
      <Foot name={name} />
    </Slide>,
    // 5 your card
    <Slide key="card">
      <div className="px-14 pt-12">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">Your card</div>
            <h2 className="font-display mt-3 text-[44px] leading-[1.05]">Looks like it belongs on your table.</h2>
          </div>
          <div className="max-w-sm text-right text-[15px] text-muted">Credit-card size, printed both sides, NFC inside and a QR code on the back. Pick one, or send us your own idea.</div>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-5">
          {TEMPLATES.map((t) => (
            <figure key={t}>
              <div className="overflow-hidden rounded-[6%/9.5%] shadow-card ring-1 ring-black/10">
                <CardFace design={{ ...design, template: t }} side="front" id={`deck-${t}`} />
              </div>
              <figcaption className="mt-2 text-center text-xs text-muted">{TEMPLATE_META[t].name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-[1fr_2fr] items-center gap-6">
          <div className="overflow-hidden rounded-[6%/9.5%] shadow-card ring-1 ring-black/10">
            <CardFace design={design} side="back" id="deck-back" />
          </div>
          <p className="text-[17px] leading-relaxed text-ink-2">The back explains the tap for iPhone and Android and carries a QR code for anyone without NFC. Every card points to a short link we manage, so if your Google listing ever changes, the cards keep working.</p>
        </div>
      </div>
      <Foot name={name} />
    </Slide>,
    // 6 report
    <Slide key="report" tone="dark">
      <div className="grid h-full grid-cols-[1fr_1fr] items-center gap-12 px-14 pb-16 pt-14">
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">The monthly report</div>
          <h2 className="font-display mt-4 text-[48px] leading-[1.05]">What your guests are actually saying.</h2>
          <ul className="mt-7 space-y-3 text-lg text-paper/85">
            {["What guests love, ranked by how often it comes up", "Complaints grouped by cause, each with a fix", "Servers and dishes mentioned by name", "Priority actions and drafted replies to negative reviews", `${PRICING.freeReplacementCardsPerMonth} free replacement cards every month`].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="scale-[1.35] origin-center">
          <ReportThumb
            eyebrow="Sample from your reviews"
            headline="What your guests said this month."
            rating={Number(p.rating) || undefined}
            stats={[
              [String(p.reviewCount || "—"), "reviews on Google"],
              [String(p.rating || "—"), "avg rating"],
              [String((p.dishes || []).length || "—"), "dishes named"],
            ]}
            bullets={[
              ...(p.praise || []).slice(0, 2).map((t) => ({ text: t, tone: "good" as const })),
              ...(p.complaints || []).slice(0, 1).map((t) => ({ text: t, tone: "bad" as const })),
            ]}
            caption="Built by hand from your public Google reviews. The monthly report does this for every review, with counts and drafted replies."
          />
        </div>
      </div>
      <Foot tone="dark" name={name} />
    </Slide>,
    // 7b the full report the owner receives
    <Slide key="report-full" tone="paper">
      <div className="grid h-full grid-cols-[1fr_1.15fr] items-center gap-10 px-14 pb-16 pt-12">
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">In your inbox</div>
          <h2 className="font-display mt-3 text-[42px] leading-[1.05]">This is what arrives on the first of the month.</h2>
          <ul className="mt-6 space-y-3 text-[17px] text-ink-2">
            {[
              "One page you can read standing up, plus the full report",
              "Every new review read, grouped by what guests kept saying",
              "Each complaint with a fix, ranked by what costs you most",
              "Dishes and servers guests named, counted",
              "Replies drafted for the reviews that need one",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] leading-relaxed text-muted">
            Example from another restaurant, so you can see the format. Yours is built from your own Google reviews.
          </p>
        </div>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/_samples/report-onepager.png"
            alt=""
            className="max-h-[520px] w-auto rounded-lg shadow-lift ring-1 ring-black/10"
          />
        </div>
      </div>
      <Foot name={name} />
    </Slide>,
    // 8 pricing
    <Slide key="pricing">
      <div className="px-14 pt-14">
        <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">Pricing</div>
        <h2 className="font-display mt-4 text-[48px] leading-[1.05]">Simple enough to explain to your accountant.</h2>
        <div className="mt-9 grid grid-cols-2 gap-6">
          <div className="rounded-3xl border border-line bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Cards</div>
            <div className="mt-3 flex items-baseline gap-2"><span className="font-display text-[64px] leading-none">${PRICING.cardPrice}</span><span className="text-muted">per card, one time</span></div>
            <p className="mt-3 text-[17px] text-ink-2">Your logo or one of four designs. Printed both sides. Yours to keep.</p>
          </div>
          <div className="rounded-3xl border-2 border-accent bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Monthly report</div>
            <div className="mt-3 flex items-baseline gap-2"><span className="font-display text-[64px] leading-none">${PRICING.monthlyReport}</span><span className="text-muted">per month, cancel anytime</span></div>
            <p className="mt-3 text-[17px] text-ink-2">Every review read and summarized. {PRICING.freeReplacementCardsPerMonth} free replacement cards every month.</p>
          </div>
        </div>
        <div className="mt-7 rounded-2xl bg-accent-soft px-6 py-4 text-[19px] text-ink">{p.offer}</div>
      </div>
      <Foot name={name} />
    </Slide>,
    // 9 next
    <Slide key="next" tone="dark">
      <div className="grid h-full grid-cols-[1fr_1fr] items-center gap-12 px-14 pb-16 pt-14">
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">Next step</div>
          <h2 className="font-display mt-4 text-[56px] leading-[1.02]">Tap this card with your phone{p.owner ? `, ${p.owner}` : ""}.</h2>
          <p className="mt-6 text-xl leading-relaxed text-paper/70">That is the whole guest experience. If it feels right, we can have cards with your logo on your tables in about three weeks.</p>
          <div className="mt-8 text-lg text-paper/85">
            <div>{BRAND.founderName} · {BRAND.name}</div>
            <div className="text-paper/60">{BRAND.email}{BRAND.phone ? ` · ${BRAND.phone}` : ""}</div>
          </div>
        </div>
        <div className="rotate-[3deg] overflow-hidden rounded-[6%/9.5%] shadow-lift ring-1 ring-white/10">
          <CardFace design={{ ...design, template: "logo" }} side="front" id="deck-next" />
        </div>
      </div>
      <Foot tone="dark" name={name} />
    </Slide>,
  ];

  const n = slides.length;
  const go = useCallback((d: number) => setI((x) => Math.min(n - 1, Math.max(0, x + d))), [n]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "g") { setReviewMode((v) => !v); return; }
      if (reviewMode) return;
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) { e.preventDefault(); go(1); }
      if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      if (e.key === "Escape") router.push("/pitch");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, router, reviewMode]);

  return (
    <div className="deck fixed inset-0 bg-[#0a0d0b]">
      <style>{`
        .deck .stage { width: min(100vw, calc(100vh * 16 / 9)); height: min(100vh, calc(100vw * 9 / 16)); }
        .deck .frame { width: 1280px; height: 720px; transform-origin: top left; }
        @media print {
          .deck { position: static !important; background: white !important; }
          .deck .stage { width: 1280px !important; height: 720px !important; }
          .deck .frame { transform: none !important; }
          .deck .chrome { display: none !important; }
          .deck .print-slide { width: 1280px; height: 720px; page-break-after: always; break-after: page; overflow: hidden; }
          @page { size: 1280px 720px; margin: 0; }
        }
      `}</style>
      {/* screen view */}
      {reviewMode ? (
        <ReviewView slides={slides} name={name} />
      ) : (
        <div className="print:hidden flex h-full w-full items-center justify-center">
          <div className="stage relative">
            <Scaled>{slides[i]}</Scaled>
            <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="chrome absolute inset-y-0 left-0 w-1/5 cursor-w-resize opacity-0" />
            <button type="button" aria-label="Next slide" onClick={() => go(1)} className="chrome absolute inset-y-0 right-0 w-4/5 cursor-e-resize opacity-0" />
          </div>
        </div>
      )}
      {/* chrome */}
      <div className="chrome fixed inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-xs text-paper/60 print:hidden">
        <div className="flex items-center gap-2">
          <a href="/pitch" className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"><X className="h-3.5 w-3.5" /> Back to prep</a>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"><Printer className="h-3.5 w-3.5" /> Save as PDF</button>
          <button type="button" onClick={() => document.documentElement.requestFullscreen?.()} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"><Maximize2 className="h-3.5 w-3.5" /> Fullscreen</button>
          <button type="button" onClick={() => setReviewMode((v) => !v)} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">
            {reviewMode ? <><Play className="h-3.5 w-3.5" /> Present</> : <><LayoutGrid className="h-3.5 w-3.5" /> Review all slides</>}
          </button>
        </div>
        {reviewMode ? (
          <span className="text-paper/50">Scroll through all {n} slides, circle anything wrong</span>
        ) : (
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous" onClick={() => go(-1)} className="rounded-full bg-white/10 p-1.5 hover:bg-white/20"><ChevronLeft className="h-4 w-4" /></button>
            <span className="tabular-nums">{i + 1} / {n}</span>
            <button type="button" aria-label="Next" onClick={() => go(1)} className="rounded-full bg-white/10 p-1.5 hover:bg-white/20"><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}
      </div>
      {/* print view: all slides */}
      <div className="hidden print:block">
        {slides.map((s, k) => (
          <div key={k} className="print-slide">
            <div className="frame">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Scales a fixed 1280x720 frame to fit its parent (.stage). */
function Scaled({ children }: { children: React.ReactNode }) {
  const [k, setK] = useState(1);
  useEffect(() => {
    const calc = () => {
      const w = Math.min(window.innerWidth, (window.innerHeight * 16) / 9);
      setK(w / 1280);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return (
    <div className="frame absolute left-0 top-0" style={{ transform: `scale(${k})` }}>
      {children}
    </div>
  );
}

/**
 * Review view: every slide stacked on one scrollable page at a readable size, each numbered.
 * Made for marking up: open it in a browser, screenshot or annotate, and say "slide 4".
 */
function ReviewView({ slides, name }: { slides: React.ReactNode[]; name: string }) {
  const [w, setW] = useState(1040);
  useEffect(() => {
    const calc = () => setW(Math.min(1120, window.innerWidth - 80));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const k = w / 1280;
  return (
    <div className="print:hidden h-full overflow-y-auto pb-24">
      <div className="mx-auto flex flex-col items-center gap-10 px-6 py-10" style={{ width: w + 80 }}>
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Review copy</div>
          <div className="mt-2 text-lg text-paper">Pitch deck for {name}</div>
          <div className="mt-1 text-xs text-paper/50">All {slides.length} slides. Circle anything wrong and type what to change.</div>
        </div>
        {slides.map((s, idx) => (
          <figure key={idx} className="relative" style={{ width: w }}>
            <figcaption className="mb-2 flex items-center gap-2 text-xs text-paper/60">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 font-mono text-[11px] text-paper">{idx + 1}</span>
              Slide {idx + 1} of {slides.length}
            </figcaption>
            <div className="overflow-hidden rounded-xl ring-1 ring-white/10" style={{ width: w, height: w * (720 / 1280) }}>
              <div className="frame" style={{ transform: `scale(${k})`, transformOrigin: "top left" }}>
                {s}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}


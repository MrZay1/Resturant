import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { PhoneMock } from "@/components/illustrations/PhoneMock";
import { CardFace } from "@/components/card/CardFace";
import { DEFAULT_DESIGN } from "@/components/card/cardSpec";
import { Stars } from "@/components/ui/Stars";

function CheckPresenter() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]" aria-hidden="true">
      <div className="rounded-xl bg-[#2b221b] p-4 shadow-lift ring-1 ring-black/30">
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] text-muted"><span>Cacio e pepe</span><span>24.00</span></div>
            <div className="flex justify-between text-[9px] text-muted"><span>Osso buco</span><span>38.00</span></div>
            <div className="flex justify-between text-[9px] text-muted"><span>Tiramisu</span><span>11.00</span></div>
            <div className="mt-2 border-t border-line pt-1.5 flex justify-between text-[10px] font-semibold text-ink"><span>Total</span><span>73.00</span></div>
          </div>
        </div>
        <div className="-mt-3 ml-6 w-[72%] rotate-[-4deg] overflow-hidden rounded-[6%/9.5%] shadow-card ring-1 ring-black/10">
          <CardFace design={DEFAULT_DESIGN} side="front" />
        </div>
      </div>
    </div>
  );
}

export type ReportThumbData = {
  eyebrow?: string;
  headline?: string;
  rating?: number;
  stats?: Array<[string, string]>;
  bullets?: Array<{ text: string; tone?: "good" | "bad" }>;
  caption?: string;
};

/** The little report card. Defaults show the fictional sample; the pitch deck passes the prospect's own data. */
export function ReportThumb({ eyebrow, headline, rating, stats, bullets, caption }: ReportThumbData = {}) {
  const s = stats ?? ([["87", "reviews"], ["4.6", "avg rating"], ["+46", "vs July"]] as Array<[string, string]>);
  const b =
    bullets ?? [
      { text: "Patio mentioned in 31 reviews", tone: "good" as const },
      { text: "Marco named 14 times", tone: "good" as const },
      { text: "Weekend waits: fix the quote", tone: "bad" as const },
    ];
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-line bg-white p-4 text-ink shadow-card" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow ?? "August report"}</div>
        <Stars size="h-3 w-3" value={rating ?? 4.6} />
      </div>
      <div className="mt-2 font-display text-lg leading-tight">{headline ?? "Best review month on record."}</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {s.map(([v, l]) => (
          <div key={l} className="rounded-lg bg-paper p-2">
            <div className="text-base font-semibold">{v}</div>
            <div className="text-[9px] leading-tight text-muted">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {b.map((x) => (
          <div key={x.text} className="flex items-start gap-2 text-[10px] leading-snug">
            <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${x.tone === "bad" ? "bg-[#c2410c]" : "bg-accent"}`} />
            {x.text}
          </div>
        ))}
      </div>
      {caption && <div className="mt-3 border-t border-line pt-2 text-[9px] leading-snug text-muted">{caption}</div>}
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Server drops the card with the check",
    body: "It lives in the check presenter. No QR hunting, no receipt fine print, no app. The ask happens while the tiramisu is still on the table.",
    visual: <CheckPresenter />,
  },
  {
    n: "02",
    title: "Guest taps, the review screen opens",
    body: "The guest holds their phone to the card, taps the link that pops up, and lands on your Google review form. The review gets written while the memory is fresh, before they leave the table.",
    visual: (
      <div className="w-full self-start -mt-1">
        <PhoneMock
          filled={5}
          text="Sat on the patio under the lights and forgot we were in the middle of the city. Ask for Marco."
          width={236}
        />
      </div>
    ),
  },
  {
    n: "03",
    title: "Every month, you get the report",
    body: "Our AI reads every new review and tells you what guests love, what they complain about, which servers get named, and what to do about it.",
    visual: <ReportThumb />,
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="white">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <Heading className="mt-4">Three steps. One new habit.</Heading>
          <Lede className="mt-5">
            Only the delighted and the furious leave reviews on their own. Everyone else walks out
            with your best feedback. The card catches them at the table.
          </Lede>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col">
              <div className="flex h-[300px] items-center overflow-hidden rounded-3xl bg-paper p-6">{s.visual}</div>
              <div className="mt-6 font-mono text-xs text-accent">{s.n}</div>
              <h3 className="mt-2 font-display text-2xl leading-tight">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

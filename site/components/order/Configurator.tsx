"use client";

import { useEffect, useMemo, useState } from "react";
import { Card3D } from "@/components/card/Card3D";
import { DEFAULT_DESIGN, TEMPLATE_META, qrColorsFor, type CardDesign, type CardTemplate } from "@/components/card/cardSpec";
import { Button } from "@/components/ui/Button";
import { PRICING, LINKS, BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { Minus, Plus, Upload, X, Check, Lock } from "lucide-react";
import QRCode from "qrcode";

const HEADLINES = [
  "Tap to review us on Google",
  "Tap to leave a review",
  "Tap to tell Google how it went",
  "Tap here to rate your meal",
];
const SUBLINES = ["Hold your phone here", "Takes about a minute", "iPhone: top edge. Android: back of phone", ""];
const COLORS = ["#1f4d3a", "#7a2e2e", "#1e3a5f", "#3b2f2f", "#b45309", "#111111", "#4c1d95", "#0f766e"];
const TEMPLATES: CardTemplate[] = ["classic", "noir", "brand", "logo"];

function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

const GENERIC_ERROR = "Could not start checkout. Please try again or email us.";
const FIELD_LABELS: Record<string, string> = {
  "design.headline": "headline",
  "design.restaurantName": "restaurant name",
  "design.subline": "small line under the headline",
  googleReviewLink: "Google review link",
  "contact.name": "your name",
  "contact.email": "email",
  "contact.phone": "phone number",
  notes: "notes",
  cards: "card count",
};

export function Configurator({
  initialReport,
  initialTemplate,
  initialCards = PRICING.starterKitCards,
}: {
  initialReport: boolean;
  initialTemplate?: CardTemplate;
  initialCards?: number;
}) {
  const [design, setDesign] = useState<CardDesign>({
    ...DEFAULT_DESIGN,
    template: initialTemplate ?? "classic",
    restaurantName: "",
  });
  const [side, setSide] = useState<"front" | "back">("front");
  const [cards, setCards] = useState(initialCards);
  const [cardsText, setCardsText] = useState(String(initialCards));
  const [report, setReport] = useState(initialReport);
  const [googleLink, setGoogleLink] = useState("");
  const [linkMode, setLinkMode] = useState<"find" | "have">("find");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<{ state: "idle" | "loading" | "error" | "fallback" | "fallback-sent"; message?: string }>({ state: "idle" });
  // once checkout reports 503 the order-by-email panel stays visible even after a send error
  const [fallbackMode, setFallbackMode] = useState(false);
  const [logoName, setLogoName] = useState<string>("");

  const shortUrl = useMemo(() => {
    const slug = design.restaurantName
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 18);
    return `${BRAND.shortLinkHost}/r/${slug || "yourname"}`;
  }, [design.restaurantName]);
  const [qrDataUrl, setQrDataUrl] = useState<string | undefined>(undefined);

  const preview: CardDesign = useMemo(
    () => ({ ...design, shortUrl, qrDataUrl, restaurantName: design.restaurantName || "Your Restaurant" }),
    [design, shortUrl, qrDataUrl]
  );

  // QR for the back preview (async external API, so an effect is appropriate)
  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(`https://${shortUrl}?s=qr`, {
      margin: 0,
      errorCorrectionLevel: "M",
      color: qrColorsFor({ template: design.template, brandColor: design.brandColor }),
    }).then((url) => {
      if (alive) setQrDataUrl(url);
    });
    return () => {
      alive = false;
    };
  }, [shortUrl, design.template, design.brandColor]);

  const today = cards * PRICING.cardPrice + (report ? PRICING.monthlyReport : 0);
  const linkTooLong = linkMode === "have" && googleLink.trim().length > 500;
  const canSubmit =
    design.restaurantName.trim().length > 1 &&
    design.headline.trim().length > 0 &&
    contact.name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    !linkTooLong;

  function clampCards(n: number) {
    return Math.min(PRICING.maxCards, Math.max(PRICING.minCards, Math.round(n)));
  }
  function commitCards(n: number) {
    const c = clampCards(Number.isFinite(n) ? n : PRICING.minCards);
    setCards(c);
    setCardsText(String(c));
  }

  function onLogo(file: File | undefined) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setStatus({ state: "error", message: "Logo must be under 2 MB. PNG or SVG with a transparent background works best." });
      return;
    }
    if (!/^image\/(png|jpeg|svg\+xml)$/.test(file.type)) {
      setStatus({ state: "error", message: "Please upload a PNG, JPEG or SVG." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDesign((d) => ({ ...d, logoDataUrl: String(reader.result) }));
      setLogoName(file.name);
      setStatus({ state: "idle" });
    };
    reader.readAsDataURL(file);
  }

  async function submit() {
    setStatus({ state: "loading" });
    const payload = {
      cards: clampCards(cards),
      report,
      design: {
        template: design.template,
        restaurantName: design.restaurantName.trim(),
        headline: design.headline.trim(),
        subline: design.subline,
        brandColor: design.brandColor,
        showStars: design.showStars,
        hasLogo: Boolean(design.logoDataUrl),
      },
      googleReviewLink: linkMode === "have" ? googleLink.trim().slice(0, 500) : "",
      address: address.trim().slice(0, 200),
      linkMode,
      contact: { name: contact.name.trim().slice(0, 80), email: contact.email.trim(), phone: contact.phone.trim().slice(0, 40) },
      notes,
    };
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (res.status === 503) {
        setFallbackMode(true);
        setStatus({ state: "fallback" });
        return;
      }
      const data = (await res.json().catch(() => null)) as { url?: string; error?: string; issues?: Array<{ path?: Array<string | number> }> } | null;
      if (res.status === 400 && Array.isArray(data?.issues) && data.issues.length) {
        const path = (data.issues[0].path ?? []).join(".");
        throw new Error(FIELD_LABELS[path] ? `Please check the ${FIELD_LABELS[path]} field and try again.` : "Please check the form and try again.");
      }
      if (!res.ok || !data?.url) throw new Error(data?.error ?? GENERIC_ERROR);
      window.location.href = data.url;
    } catch (e) {
      setStatus({ state: "error", message: e instanceof Error ? e.message : GENERIC_ERROR });
    }
  }

  async function sendFallback() {
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: contact.name.trim().slice(0, 80),
          restaurant: design.restaurantName.trim(),
          email: contact.email.trim(),
          phone: contact.phone.trim().slice(0, 40),
          message: `ORDER REQUEST: ${clampCards(cards)} cards (${design.template}, headline "${design.headline.trim()}", color ${design.brandColor}, logo ${design.logoDataUrl ? "yes" : "no"}), report: ${report}. Google link: ${linkMode === "have" ? googleLink.trim() || "n/a" : "find it for us"}. Address: ${address.trim() || "n/a"}. Notes: ${notes}`.slice(0, 1000),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Could not send. Please email us instead.");
      }
      setStatus({ state: "fallback-sent" });
    } catch (e) {
      setStatus({ state: "error", message: e instanceof Error ? e.message : "Could not send. Please email us instead." });
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
      {/* MOBILE: compact sticky preview so changes are visible while editing */}
      <div className="sticky top-16 z-10 -mx-5 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="w-[150px] shrink-0">
            <Card3D design={preview} side={side} interactive={false} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Live preview</div>
              <div className="inline-flex rounded-full border border-line p-0.5 text-xs">
                {(["front", "back"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setSide(s)} className={cn("rounded-full px-2.5 py-0.5 capitalize", side === s ? "bg-ink text-paper" : "text-muted")}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted">Due today</div>
            <div className="text-xl font-semibold tracking-tight">{money(today)}</div>
          </div>
        </div>
      </div>

      {/* LEFT: steps */}
      <div className="space-y-10">
        <Step n="1" title="Pick a design">
          <div className="grid gap-2 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDesign((d) => ({ ...d, template: t }))}
                aria-pressed={design.template === t}
                className={cn(
                  "rounded-xl border p-3.5 text-left transition-all",
                  design.template === t ? "border-ink bg-white shadow-card" : "border-line bg-white/60 hover:border-line-strong"
                )}
              >
                <div className="text-[15px] font-semibold">{TEMPLATE_META[t].name}</div>
                <div className="mt-0.5 text-[13px] leading-snug text-muted">{TEMPLATE_META[t].blurb}</div>
              </button>
            ))}
          </div>
        </Step>

        <Step n="2" title="Make it yours">
          <Field label="Restaurant name" hint="As it should appear on the card">
            <input
              className={inputCls}
              value={design.restaurantName}
              onChange={(e) => setDesign((d) => ({ ...d, restaurantName: e.target.value.slice(0, 32) }))}
              placeholder="Lucia's Trattoria"
              maxLength={32}
            />
          </Field>
          <Field label="Headline">
            <div className="flex flex-wrap gap-2">
              {HEADLINES.map((h) => (
                <Chip key={h} active={design.headline === h} onClick={() => setDesign((d) => ({ ...d, headline: h }))}>
                  {h}
                </Chip>
              ))}
            </div>
            <input
              className={cn(inputCls, "mt-2")}
              value={design.headline}
              onChange={(e) => setDesign((d) => ({ ...d, headline: e.target.value.slice(0, 40) }))}
              maxLength={40}
              aria-label="Custom headline"
            />
          </Field>
          <Field label="Small line under the headline">
            <div className="flex flex-wrap gap-2">
              {SUBLINES.map((s) => (
                <Chip key={s || "none"} active={design.subline === s} onClick={() => setDesign((d) => ({ ...d, subline: s }))}>
                  {s || "None"}
                </Chip>
              ))}
            </div>
          </Field>
          <Field label="Brand color" hint={design.template === "brand" ? "Fills the card" : "Used for the tap mark"}>
            <div className="flex flex-wrap items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Color ${c}`}
                  onClick={() => setDesign((d) => ({ ...d, brandColor: c }))}
                  className={cn("h-8 w-8 rounded-full ring-offset-2 transition-transform", design.brandColor === c ? "ring-2 ring-ink scale-110" : "hover:scale-105")}
                  style={{ background: c }}
                />
              ))}
              <label className="ml-1 inline-flex items-center gap-2 text-sm text-muted">
                <input
                  type="color"
                  value={design.brandColor}
                  onChange={(e) => setDesign((d) => ({ ...d, brandColor: e.target.value }))}
                  className="h-8 w-8 cursor-pointer rounded-full border border-line bg-transparent p-0"
                  aria-label="Custom color"
                />
                Custom
              </label>
            </div>
          </Field>
          <Field label="Logo" hint="Optional. PNG or SVG, transparent background, under 2 MB. Shows on every design.">
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-medium hover:border-ink">
                <Upload className="h-4 w-4" /> Upload logo
                <input
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg"
                  className="sr-only"
                  onChange={(e) => {
                    onLogo(e.target.files?.[0]);
                    // reset so picking the same file again (after removal or a rejection) fires change
                    e.target.value = "";
                  }}
                />
              </label>
              {design.logoDataUrl && (
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent">
                  <Check className="h-3.5 w-3.5" /> {logoName || "Logo added"}
                  <button
                    type="button"
                    aria-label="Remove logo"
                    onClick={() => {
                      setDesign((d) => ({ ...d, logoDataUrl: undefined }));
                      setLogoName("");
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
              <span className="text-xs text-muted">No logo? We design a clean type-only card for you.</span>
            </div>
          </Field>
          <p className="text-xs text-muted">
            No star graphics on the card, on purpose. Google treats stars next to a review ask as soliciting a rating. The card asks for an honest review, nothing more.
          </p>
        </Step>

        <Step n="3" title="How many cards">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-line-strong bg-white">
              <button type="button" aria-label="Fewer cards" className="grid h-11 w-11 place-items-center" onClick={() => commitCards(cards - 1)}>
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={PRICING.minCards}
                max={PRICING.maxCards}
                value={cardsText}
                onChange={(e) => {
                  const v = e.target.value;
                  setCardsText(v);
                  const n = Number(v);
                  if (v !== "" && Number.isFinite(n) && n >= PRICING.minCards && n <= PRICING.maxCards) setCards(Math.round(n));
                }}
                onBlur={() => commitCards(Number(cardsText) || PRICING.minCards)}
                className="w-14 bg-transparent text-center text-lg font-semibold outline-none"
                aria-label="Number of cards"
              />
              <button type="button" aria-label="More cards" className="grid h-11 w-11 place-items-center" onClick={() => commitCards(cards + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-muted">
              Rule of thumb: two cards per server on the floor, so nobody waits when several tables close at once. Minimum {PRICING.minCards}.
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[10, 20, 30, 50].map((n) => (
              <Chip key={n} active={cards === n} onClick={() => commitCards(n)}>
                {n} cards
              </Chip>
            ))}
          </div>
        </Step>

        <Step n="4" title="Your monthly report">
          <button
            type="button"
            onClick={() => setReport((r) => !r)}
            aria-pressed={report}
            className={cn("flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all", report ? "border-ink bg-white shadow-card" : "border-line bg-white/60")}
          >
            <span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border", report ? "border-ink bg-ink text-paper" : "border-line-strong bg-white")}>
              {report && <Check className="h-4 w-4" />}
            </span>
            <span>
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[15px] font-semibold">Monthly AI review report</span>
                <span className="text-sm text-muted">
                  {report ? "Included" : "Not included"} · {money(PRICING.monthlyReport)}/month, cancel anytime
                </span>
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">
                Every new Google review read and summarized on the first business day of the month: wins, issues with fixes, staff and dish mentions, priority actions,
                drafted replies. Includes {PRICING.freeReplacementCardsPerMonth} free replacement cards every month.
              </span>
            </span>
          </button>
        </Step>

        <Step n="5" title="Where should the card send guests?">
          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                { key: "find", title: "Set it up for me", body: "Give us your restaurant name and address. We find your Google listing and point every card at its review page." },
                { key: "have", title: "I have my Google review link", body: "Paste your g.page review link or Place ID and we use that." },
              ] as const
            ).map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => setLinkMode(o.key)}
                aria-pressed={linkMode === o.key}
                className={cn(
                  "rounded-xl border p-3.5 text-left transition-all",
                  linkMode === o.key ? "border-ink bg-white shadow-card" : "border-line bg-white/60 hover:border-line-strong"
                )}
              >
                <div className="text-[15px] font-semibold">{o.title}</div>
                <div className="mt-0.5 text-[13px] leading-snug text-muted">{o.body}</div>
              </button>
            ))}
          </div>
          {linkMode === "find" ? (
            <Field label="Restaurant address" hint="Street, city and state">
              <input
                className={inputCls}
                value={address}
                onChange={(e) => setAddress(e.target.value.slice(0, 200))}
                maxLength={200}
                placeholder="123 Main St, Springfield, IL"
                autoComplete="street-address"
              />
            </Field>
          ) : (
            <>
              <input
                className={inputCls}
                value={googleLink}
                onChange={(e) => setGoogleLink(e.target.value.slice(0, 500))}
                maxLength={500}
                placeholder="https://g.page/r/.../review or a Place ID"
              />
              <p className="mt-2 text-xs text-muted">
                Not sure where to find it? <a className="underline underline-offset-4" href="/guides/google-review-link">Two-minute guide</a>. Cards point to a short link we can update any time.
              </p>
            </>
          )}
        </Step>

        <Step n="6" title="Where to send your design preview">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Your name">
              <input className={inputCls} value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value.slice(0, 80) }))} maxLength={80} autoComplete="name" />
            </Field>
            <Field label="Email">
              <input className={inputCls} type="email" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value.slice(0, 254) }))} maxLength={254} autoComplete="email" />
            </Field>
            <Field label="Phone" hint="Optional">
              <input className={inputCls} type="tel" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value.slice(0, 40) }))} maxLength={40} autoComplete="tel" />
            </Field>
            <Field label="Notes for the designer" hint="Optional">
              <input className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 300))} placeholder="Match our menu font, use the round logo…" />
            </Field>
          </div>
        </Step>
      </div>

      {/* RIGHT: sticky preview + summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Live preview</div>
            <div className="inline-flex rounded-full border border-line p-0.5 text-xs">
              {(["front", "back"] as const).map((s) => (
                <button key={s} type="button" onClick={() => setSide(s)} className={cn("rounded-full px-3 py-1 capitalize", side === s ? "bg-ink text-paper" : "text-muted")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-5 max-w-[460px]">
            <Card3D design={preview} side={side} />
          </div>
          <p className="mt-4 text-center text-xs text-muted">Preview is close, not exact. You approve a design preview before we print.</p>

          <div className="mt-7 space-y-2.5 border-t border-line pt-5 text-sm">
            <Row label={`${cards} cards × ${money(PRICING.cardPrice)}`} value={money(cards * PRICING.cardPrice)} />
            {report && <Row label="Monthly report, first month" value={money(PRICING.monthlyReport)} />}
            <Row label="US shipping" value="included" muted />
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <span className="font-semibold">Due today</span>
              <span className="text-2xl font-semibold tracking-tight">{money(today)}</span>
            </div>
            {report && <div className="text-right text-xs text-muted">then {money(PRICING.monthlyReport)}/month, cancel anytime</div>}
          </div>

          {fallbackMode ? (
            <div className="mt-6 rounded-2xl bg-paper p-4 text-sm">
              {status.state === "fallback-sent" ? (
                <p>Got it. We will email you a secure payment link within one business day and a design preview within 2 business days.</p>
              ) : (
                <>
                  <p className="text-ink-2">Online checkout is being set up. Send us the order and we will email you a design preview and a secure payment link.</p>
                  <Button className="mt-3 w-full" onClick={sendFallback} disabled={!canSubmit || status.state === "loading"}>
                    {status.state === "loading" ? "Sending" : "Send order request"}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              <Button className="mt-6 w-full" size="lg" onClick={submit} disabled={!canSubmit || status.state === "loading"}>
                <Lock className="h-4 w-4" /> {status.state === "loading" ? "Opening secure checkout…" : "Continue to secure checkout"}
              </Button>
              {!canSubmit && !linkTooLong && (
                <p className="mt-2 text-center text-xs text-muted">Add your restaurant name, a headline, your name and email to continue.</p>
              )}
              {linkTooLong && (
                <p className="mt-2 text-center text-xs text-muted">The Google link is too long. Paste the short g.page link or the Place ID instead.</p>
              )}
            </>
          )}
          {status.state === "error" && <p className="mt-3 text-sm text-[#9a3a12]">{status.message}</p>}
          <p className="mt-4 text-center text-xs text-muted">
            Payments by Stripe. Design preview within 2 business days. Cards typically ship in 10 business days.{" "}
            <a href={LINKS.pricing} className="underline underline-offset-4">Pricing details</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line-strong bg-white px-3.5 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

function Step({ n, title, children, optional }: { n: string; title: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-xs text-paper">{n}</span>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {optional && <span className="text-xs text-muted">optional</span>}
      </div>
      <div className="mt-4 space-y-4 pl-0 sm:pl-10">{children}</div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline gap-2">
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn("rounded-full border px-3 py-1.5 text-[13px] transition-colors", active ? "border-ink bg-ink text-paper" : "border-line-strong bg-white text-ink-2 hover:border-ink")}
    >
      {children}
    </button>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={cn("flex justify-between", muted && "text-muted")}>
      <span>{label}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

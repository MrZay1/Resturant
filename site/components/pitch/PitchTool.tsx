"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { CardFace } from "@/components/card/CardFace";
import { DEFAULT_DESIGN, TEMPLATE_META, type CardDesign, type CardTemplate } from "@/components/card/cardSpec";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { DEFAULT_OFFER, importProfile, loadCurrentId, loadProfiles, newProfile, paramsFromProfile, saveCurrentId, saveProfiles, type PitchProfile } from "@/lib/pitch";
import QRCode from "qrcode";
import { Plus, Trash2, Upload, Download, Presentation, Link as LinkIcon, Check, X, FileJson, LayoutGrid, PackageOpen } from "lucide-react";

const COLORS = ["#1f4d3a", "#7a2e2e", "#1e3a5f", "#3b2f2f", "#b45309", "#111111", "#4c1d95", "#0f766e"];
const HEADLINES = ["Tap to review us on Google", "Tap to leave a review", "Tap to tell Google how it went", "Tap here to rate your meal"];
const TEMPLATES: CardTemplate[] = ["classic", "noir", "brand", "logo"];
const inputCls = "h-10 w-full rounded-xl border border-line-strong bg-white px-3 text-[14px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

function slug(name: string) {
  return name.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 18) || "yourname";
}

export function PitchTool() {
  // This component only renders on the client (see PitchToolLoader), so storage can be read in the initializer.
  const [profiles, setProfiles] = useState<PitchProfile[]>(() => {
    const list = loadProfiles();
    return list.length ? list : [newProfile()];
  });
  const [currentId, setCurrentId] = useState<string | null>(() => {
    const list = loadProfiles();
    const cur = loadCurrentId();
    if (!list.length) return null;
    return cur && list.some((x) => x.id === cur) ? cur : list[0].id;
  });
  const [qr, setQr] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [packs, setPacks] = useState<Array<{ slug: string; name: string; city: string }>>([]);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Packs prepared by scripts/pitch-pack.mjs (read from disk by the API).
  useEffect(() => {
    let alive = true;
    fetch("/api/pitch-packs")
      .then((r) => (r.ok ? r.json() : { packs: [] }))
      .then((d) => {
        if (alive && Array.isArray(d.packs)) setPacks(d.packs);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  function loadPack(slug: string) {
    fetch(`/api/pitch-packs/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((prof) => {
        if (!prof) return;
        const imported = importProfile(prof);
        setProfiles((l) => [imported, ...l.filter((x) => x.name !== imported.name)]);
        setCurrentId(imported.id);
      })
      .catch(() => alert("Could not load that pack."));
  }

  // persist to storage (external system) whenever state changes
  useEffect(() => {
    saveProfiles(profiles);
    if (currentId) saveCurrentId(currentId);
  }, [profiles, currentId]);

  const p = useMemo(() => profiles.find((x) => x.id === currentId) ?? profiles[0], [profiles, currentId]);

  function update(patch: Partial<PitchProfile>) {
    if (!p) return;
    setProfiles((list) => list.map((x) => (x.id === p.id ? { ...x, ...patch, updatedAt: Date.now() } : x)));
  }

  const design: CardDesign = useMemo(
    () => ({
      ...DEFAULT_DESIGN,
      restaurantName: p?.name || "Your Restaurant",
      headline: p?.headline || DEFAULT_DESIGN.headline,
      subline: p?.subline ?? DEFAULT_DESIGN.subline,
      brandColor: p?.brandColor || DEFAULT_DESIGN.brandColor,
      logoDataUrl: p?.logoDataUrl,
      template: p?.template || "classic",
      showStars: false,
      shortUrl: `${BRAND.shortLinkHost}/r/${slug(p?.name || "")}`,
      qrDataUrl: qr,
    }),
    [p, qr]
  );

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(`https://${design.shortUrl}?s=qr`, { margin: 0, errorCorrectionLevel: "M", color: { dark: "#15130f", light: "#00000000" } }).then((u) => alive && setQr(u));
    return () => {
      alive = false;
    };
  }, [design.shortUrl]);

  function onLogo(file: File | undefined) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert("Logo must be under 2 MB.");
    const r = new FileReader();
    r.onload = () => update({ logoDataUrl: String(r.result) });
    r.readAsDataURL(file);
  }

  async function saveSheet() {
    if (!sheetRef.current) return;
    setSaving(true);
    try {
      const url = await toPng(sheetRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: "#f7f4ee" });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug(p?.name || "cards")}-card-preview.png`;
      a.click();
    } catch (e) {
      alert("Could not render the image: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function copyLink() {
    if (!p) return;
    const url = `${window.location.origin}/pitch/deck?${paramsFromProfile(p)}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  if (!p) return <div className="py-20 text-center text-sm text-muted">Loading your restaurants…</div>;

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      {/* restaurant list */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Restaurants</div>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-white px-2.5 py-1 text-xs font-medium hover:border-ink"
            onClick={() => {
              const n = newProfile();
              setProfiles((l) => [n, ...l]);
              setCurrentId(n.id);
            }}
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>
        <ul className="mt-3 space-y-1">
          {profiles
            .slice()
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((x) => (
              <li key={x.id} className="group flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentId(x.id)}
                  className={cn("flex-1 truncate rounded-lg px-3 py-2 text-left text-sm", x.id === p.id ? "bg-ink text-paper" : "hover:bg-paper-2")}
                >
                  {x.name || "Untitled"}
                  {x.city && <span className={cn("block text-[11px]", x.id === p.id ? "text-paper/70" : "text-muted")}>{x.city}</span>}
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${x.name || "untitled"}`}
                  className="hidden rounded-md p-1.5 text-muted hover:bg-paper-2 hover:text-ink group-hover:block"
                  onClick={() => {
                    if (!confirm(`Delete ${x.name || "this restaurant"}?`)) return;
                    setProfiles((l) => {
                      const next = l.filter((y) => y.id !== x.id);
                      if (next.length === 0) {
                        const n = newProfile();
                        setCurrentId(n.id);
                        return [n];
                      }
                      if (x.id === currentId) setCurrentId(next[0].id);
                      return next;
                    });
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
        </ul>
        {packs.length > 0 && (
          <div className="mt-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Prepared packs</div>
            <ul className="mt-2 space-y-1">
              {packs.map((k) => (
                <li key={k.slug}>
                  <button
                    type="button"
                    onClick={() => loadPack(k.slug)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-paper-2"
                  >
                    <PackageOpen className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="truncate">
                      {k.name}
                      {k.city && <span className="block text-[11px] text-muted">{k.city}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">Researched packs on this machine. Loading one fills the form below.</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-1.5">
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong bg-white px-3 py-1.5 text-xs font-medium hover:border-ink">
            <FileJson className="h-3.5 w-3.5" /> Import profile JSON
            <input
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                f.text().then((t) => {
                  try {
                    const prof = importProfile(JSON.parse(t));
                    setProfiles((l) => [prof, ...l]);
                    setCurrentId(prof.id);
                  } catch {
                    alert("That file is not a valid profile JSON.");
                  }
                });
              }}
            />
          </label>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-3 py-1.5 text-xs font-medium hover:border-ink"
            onClick={() => {
              if (!p) return;
              const blob = new Blob([JSON.stringify(p, null, 2)], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `${slug(p.name)}-profile.json`;
              a.click();
            }}
          >
            <Download className="h-3.5 w-3.5" /> Export current
          </button>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">Saved on this device only. Logos stay in your browser.</p>
      </aside>

      <div className="space-y-8">
        {/* form */}
        <div className="grid gap-4 rounded-2xl border border-line bg-white p-5 sm:grid-cols-2 sm:p-6">
          <label className="block">
            <span className="text-sm font-medium">Restaurant name</span>
            <input className={cn(inputCls, "mt-1.5")} value={p.name} onChange={(e) => update({ name: e.target.value.slice(0, 40) })} placeholder="Lucia's Trattoria" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">City or neighborhood</span>
            <input className={cn(inputCls, "mt-1.5")} value={p.city} onChange={(e) => update({ city: e.target.value.slice(0, 60) })} placeholder="Downtown" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Owner or manager first name</span>
            <input className={cn(inputCls, "mt-1.5")} value={p.owner} onChange={(e) => update({ owner: e.target.value.slice(0, 40) })} placeholder="Lucia" />
          </label>
          <div className="block">
            <span className="text-sm font-medium">Logo</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-medium hover:border-ink">
                <Upload className="h-4 w-4" /> Upload
                <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" className="sr-only" onChange={(e) => { onLogo(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
              {p.logoDataUrl && (
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm text-accent">
                  <Check className="h-3.5 w-3.5" /> Logo added
                  <button type="button" aria-label="Remove logo" onClick={() => update({ logoDataUrl: undefined })}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
              <span className="text-xs text-muted">Grab it from their website or Google listing. PNG with transparency looks best.</span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <span className="text-sm font-medium">Brand color</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {COLORS.map((c) => (
                <button key={c} type="button" aria-label={`Color ${c}`} onClick={() => update({ brandColor: c })} className={cn("h-8 w-8 rounded-full ring-offset-2 transition-transform", p.brandColor === c ? "ring-2 ring-ink scale-110" : "hover:scale-105")} style={{ background: c }} />
              ))}
              <label className="ml-1 inline-flex items-center gap-2 text-sm text-muted">
                <input type="color" value={p.brandColor} onChange={(e) => update({ brandColor: e.target.value })} className="h-8 w-8 cursor-pointer rounded-full border border-line bg-transparent p-0" aria-label="Custom color" />
                Custom
              </label>
            </div>
          </div>
          <div className="sm:col-span-2">
            <span className="text-sm font-medium">Headline</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {HEADLINES.map((h) => (
                <button key={h} type="button" onClick={() => update({ headline: h })} aria-pressed={p.headline === h} className={cn("rounded-full border px-3 py-1.5 text-[13px]", p.headline === h ? "border-ink bg-ink text-paper" : "border-line-strong bg-white text-ink-2 hover:border-ink")}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <span className="text-sm font-medium">Lead design for the deck cover</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {TEMPLATES.map((t) => (
                <button key={t} type="button" onClick={() => update({ template: t })} aria-pressed={p.template === t} className={cn("rounded-full border px-3 py-1.5 text-[13px]", p.template === t ? "border-ink bg-ink text-paper" : "border-line-strong bg-white text-ink-2 hover:border-ink")}>
                  {TEMPLATE_META[t].name}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 grid gap-3 rounded-xl bg-paper p-4 sm:grid-cols-3">
            <div className="sm:col-span-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Their Google listing today (look it up before you go)</div>
            <label className="block">
              <span className="text-sm">Rating</span>
              <input className={cn(inputCls, "mt-1")} value={p.rating} onChange={(e) => update({ rating: e.target.value.slice(0, 4) })} placeholder="4.3" inputMode="decimal" />
            </label>
            <label className="block">
              <span className="text-sm">Review count</span>
              <input className={cn(inputCls, "mt-1")} value={p.reviewCount} onChange={(e) => update({ reviewCount: e.target.value.slice(0, 6) })} placeholder="58" inputMode="numeric" />
            </label>
            <label className="block">
              <span className="text-sm">Most recent review</span>
              <input className={cn(inputCls, "mt-1")} value={p.lastReview} onChange={(e) => update({ lastReview: e.target.value.slice(0, 30) })} placeholder="3 months ago" />
            </label>
          </div>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium">Your offer (last slide)</span>
            <input className={cn(inputCls, "mt-1.5")} value={p.offer} onChange={(e) => update({ offer: e.target.value.slice(0, 160) })} placeholder={DEFAULT_OFFER} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium">Notes for you</span>
            <textarea className={cn(inputCls, "mt-1.5 h-20 py-2")} value={p.notes} onChange={(e) => update({ notes: e.target.value.slice(0, 600) })} placeholder="Best time to visit, who to ask for, what they said last time…" />
          </label>
        </div>

        {(p.hook || (p.praise && p.praise.length) || (p.competitors && p.competitors.length)) && (
          <div className="rounded-2xl border border-line bg-white p-5 text-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Research on file</div>
            {p.hook && <p className="mt-2 text-[15px] text-ink">“{p.hook}”</p>}
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              {p.praise && p.praise.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted">Guests praise</div>
                  <ul className="mt-1 list-disc pl-4 text-ink-2">{p.praise.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              )}
              {p.complaints && p.complaints.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted">Recurring complaints</div>
                  <ul className="mt-1 list-disc pl-4 text-ink-2">{p.complaints.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              )}
              {p.competitors && p.competitors.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-muted">Ahead on the map</div>
                  <ul className="mt-1 list-disc pl-4 text-ink-2">{p.competitors.map((c) => <li key={c.name}>{c.name}: {c.rating.toFixed(1)} ({c.count})</li>)}</ul>
                </div>
              )}
            </div>
            {p.talkingPoints && p.talkingPoints.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-semibold text-muted">Talking points</div>
                <ol className="mt-1 list-decimal pl-4 text-ink-2">{p.talkingPoints.map((x) => <li key={x}>{x}</li>)}</ol>
              </div>
            )}
            {p.likelyObjection && <p className="mt-3 text-ink-2"><span className="font-semibold">Likely objection:</span> {p.likelyObjection}</p>}
          </div>
        )}

        {/* actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button href={`/pitch/deck?id=${p.id}`} size="md">
            <Presentation className="h-4 w-4" /> Open pitch deck
          </Button>
          <Button href={`/pitch/deck?id=${p.id}&view=all`} variant="secondary">
            <LayoutGrid className="h-4 w-4" /> Review all slides
          </Button>
          <Button variant="secondary" onClick={saveSheet} disabled={saving}>
            <Download className="h-4 w-4" /> {saving ? "Rendering…" : "Save preview as image"}
          </Button>
          <Button variant="ghost" onClick={copyLink}>
            {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />} {copied ? "Copied" : "Copy deck link for my phone"}
          </Button>
          <span className="text-xs text-muted">The link carries everything except the logo. For the logo, save the image and AirDrop it.</span>
        </div>

        {/* the sheet */}
        <div ref={sheetRef} className="rounded-3xl bg-paper p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {p.logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logoDataUrl} alt="" className="h-10 w-auto max-w-[140px] object-contain" />
              ) : null}
              <div>
                <div className="font-display text-2xl leading-none">{p.name || "Your Restaurant"}</div>
                <div className="mt-1 text-xs text-muted">Tap-to-review card designs · prepared {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
              </div>
            </div>
            <Logo />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <figure key={t}>
                <div className="overflow-hidden rounded-[6%/9.5%] shadow-lift ring-1 ring-black/10">
                  <CardFace design={{ ...design, template: t }} side="front" id={`sheet-${t}`} />
                </div>
                <figcaption className="mt-2 text-center text-xs text-muted">{TEMPLATE_META[t].name}</figcaption>
              </figure>
            ))}
            <figure className="sm:col-span-2 sm:mx-auto sm:w-1/2">
              <div className="overflow-hidden rounded-[6%/9.5%] shadow-lift ring-1 ring-black/10">
                <CardFace design={{ ...design, template: p.template }} side="back" id="sheet-back" />
              </div>
              <figcaption className="mt-2 text-center text-xs text-muted">Back, same on every design</figcaption>
            </figure>
          </div>
          <div className="mt-6 text-center text-[11px] text-muted">
            ${"15"} per card, one time · Monthly report ${"50"} · 10 free replacement cards a month · {BRAND.email}
          </div>
        </div>
      </div>
    </div>
  );
}

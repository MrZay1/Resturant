import type { CardTemplate } from "@/components/card/cardSpec";

/** A restaurant you are about to pitch. Stored in localStorage on the device you prep on. */
export type PitchProfile = {
  id: string;
  name: string;
  city: string;
  logoDataUrl?: string;
  brandColor: string;
  template: CardTemplate;
  headline: string;
  subline: string;
  rating: string; // e.g. "4.3"
  reviewCount: string; // e.g. "58"
  lastReview: string; // e.g. "3 months ago"
  owner: string; // owner or GM first name
  offer: string;
  notes: string;
  updatedAt: number;
  // Research fields (optional). Filled by the pitch-pack generator; the deck uses them when present.
  address?: string;
  website?: string;
  cuisine?: string;
  query?: string; // the map search a guest would type, e.g. "italian restaurant riverside"
  hook?: string; // one opening line for this restaurant
  competitors?: Array<{ name: string; rating: number; count: number; note: string }>;
  praise?: string[]; // what guests already praise, from public reviews
  complaints?: string[]; // recurring complaints, from public reviews
  dishes?: string[]; // dishes named in reviews
  talkingPoints?: string[];
  likelyObjection?: string;
  /** How many new Google reviews the restaurant gets a month, and how that was worked out. */
  reviewsPerMonth?: string;
  reviewsPerMonthBasis?: string;
  /** Well-known restaurants with far higher review velocity, for the side-by-side slide. */
  benchmarks?: Array<{ name: string; detail: string; perMonth: number; basis?: string }>;
  benchmarkNote?: string;
  gapTitle?: string;
  /** Short facts about how this restaurant handles reviews today (the "you" column). */
  todayFacts?: string[];
};

export const PITCH_KEY = "tn.pitch.profiles.v1";
export const PITCH_CURRENT_KEY = "tn.pitch.current.v1";

export const DEFAULT_OFFER = "Start with 10 cards and the monthly report: $200 today, then $50 a month. Cancel anytime.";

export function newProfile(): PitchProfile {
  return {
    id: Math.random().toString(36).slice(2, 10),
    name: "",
    city: "",
    brandColor: "#1f4d3a",
    template: "classic",
    headline: "Tap to review us on Google",
    subline: "Hold your phone here",
    rating: "",
    reviewCount: "",
    lastReview: "",
    owner: "",
    offer: DEFAULT_OFFER,
    notes: "",
    updatedAt: Date.now(),
  };
}

export function loadProfiles(): PitchProfile[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PITCH_KEY);
    const list = raw ? (JSON.parse(raw) as PitchProfile[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveProfiles(list: PitchProfile[]) {
  try {
    window.localStorage.setItem(PITCH_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save pitch profiles (storage full?)", e);
  }
}

export function loadCurrentId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PITCH_CURRENT_KEY);
}

export function saveCurrentId(id: string) {
  window.localStorage.setItem(PITCH_CURRENT_KEY, id);
}

/** Profile from URL params (cross-device sharing without the logo). */
export function profileFromParams(sp: URLSearchParams): Partial<PitchProfile> {
  const out: Partial<PitchProfile> = {};
  const map: Array<[keyof PitchProfile, string]> = [
    ["name", "name"], ["city", "city"], ["brandColor", "color"], ["template", "template"], ["headline", "headline"],
    ["rating", "rating"], ["reviewCount", "count"], ["lastReview", "last"], ["owner", "owner"], ["offer", "offer"],
  ];
  for (const [k, q] of map) {
    const v = sp.get(q);
    if (v) (out as Record<string, string>)[k] = v;
  }
  return out;
}

/** Import a profile JSON (from the pitch-pack generator or an export). Returns a fresh id. */
export function importProfile(json: unknown): PitchProfile {
  const base = newProfile();
  if (!json || typeof json !== "object") return base;
  const j = json as Partial<PitchProfile>;
  const out: PitchProfile = { ...base, ...j, id: base.id, updatedAt: Date.now() };
  if (!["classic", "noir", "brand", "logo"].includes(out.template)) out.template = "classic";
  if (!/^#[0-9a-fA-F]{6}$/.test(out.brandColor)) out.brandColor = base.brandColor;
  return out;
}

export function paramsFromProfile(p: PitchProfile): string {
  const sp = new URLSearchParams();
  if (p.name) sp.set("name", p.name);
  if (p.city) sp.set("city", p.city);
  sp.set("color", p.brandColor);
  sp.set("template", p.template);
  if (p.headline) sp.set("headline", p.headline);
  if (p.rating) sp.set("rating", p.rating);
  if (p.reviewCount) sp.set("count", p.reviewCount);
  if (p.lastReview) sp.set("last", p.lastReview);
  if (p.owner) sp.set("owner", p.owner);
  if (p.offer) sp.set("offer", p.offer);
  return sp.toString();
}

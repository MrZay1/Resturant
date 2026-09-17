/**
 * Card geometry (millimetres). CR80 = 85.60 x 53.98 mm, corner radius ~3.18 mm.
 * Print files add 3 mm bleed on every side (verify against your supplier's template).
 */
export const CARD = {
  w: 85.6,
  h: 53.98,
  radius: 3.18,
  bleed: 3,
  safe: 3, // keep text/logos at least this far from the trim edge
};

export type CardTemplate = "classic" | "noir" | "logo" | "brand";
export type CardSide = "front" | "back";

export type CardDesign = {
  template: CardTemplate;
  restaurantName: string;
  headline: string; // e.g. "Tap to review us on Google"
  subline: string; // e.g. "Hold your phone here"
  logoDataUrl?: string; // optional PNG/SVG data URL
  brandColor: string; // hex; used by "brand" template and accents
  textOnBrand: "light" | "dark";
  showStars: boolean;
  backNote: string; // small print on the back
  shortUrl: string; // printed on the back, e.g. tblnt.co/r/lucias
  qrDataUrl?: string; // optional QR (back side)
};

export const DEFAULT_DESIGN: CardDesign = {
  template: "classic",
  restaurantName: "Lucia's Trattoria",
  headline: "Tap to review us on Google",
  subline: "Hold your phone here",
  brandColor: "#1f4d3a",
  textOnBrand: "light",
  showStars: false, // star graphics on the card read as soliciting a rating under Google policy; keep them off
  backNote: "Thank you for dining with us. Your review helps our small team more than you know.",
  shortUrl: "tblnt.co/r/lucias",
};

export const TEMPLATE_META: Record<CardTemplate, { name: string; blurb: string }> = {
  classic: { name: "Classic", blurb: "Warm paper white, serif headline, green tap mark. Fits any dining room." },
  noir: { name: "Noir", blurb: "Deep charcoal with a gold tap mark. Premium, reads well at candlelight." },
  logo: { name: "Logo forward", blurb: "Your logo takes the front. The tap prompt sits quietly below." },
  brand: { name: "Brand color", blurb: "A solid field of your brand color with a crisp tap prompt." },
};

export function relativeLuminance(hex: string) {
  const c = hex.replace("#", "");
  const n = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** QR module colours that stay scannable on the template's actual background. */
export function qrColorsFor(design: Pick<CardDesign, "template" | "brandColor">) {
  void design; // template no longer changes the QR colours
  // Always dark modules on a light field. Dark templates draw a paper plate behind the QR
  // (see CardFace) because inverted light-on-dark QR codes scan unreliably.
  return { dark: "#15130f", light: "#00000000" };
}

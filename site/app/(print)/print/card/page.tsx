import { CardFace } from "@/components/card/CardFace";
import { CARD, DEFAULT_DESIGN, qrColorsFor, type CardDesign, type CardSide, type CardTemplate } from "@/components/card/cardSpec";
import QRCode from "qrcode";

/**
 * Print page: renders one card side at exact physical size with bleed.
 * Used by scripts/export-cards.ts via Playwright to produce PDF/PNG.
 * Query params: template, side, name, headline, subline, color, url, qr=1
 */
export const dynamic = "force-dynamic";

export default async function PrintCardPage({ searchParams }: PageProps<"/print/card">) {
  const sp = await searchParams;
  const get = (k: string, d = "") => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v) ?? d;
  };
  const side = (get("side", "front") as CardSide) === "back" ? "back" : "front";
  const template = (["classic", "noir", "logo", "brand"].includes(get("template")) ? get("template") : "classic") as CardTemplate;
  const design: CardDesign = {
    ...DEFAULT_DESIGN,
    template,
    restaurantName: get("name", DEFAULT_DESIGN.restaurantName).slice(0, 40),
    headline: get("headline", DEFAULT_DESIGN.headline).slice(0, 40),
    subline: get("subline", DEFAULT_DESIGN.subline).slice(0, 40),
    brandColor: get("color", DEFAULT_DESIGN.brandColor),
    shortUrl: get("url", DEFAULT_DESIGN.shortUrl),
    showStars: get("stars", "0") === "1",
    logoDataUrl: get("logo") || undefined,
  };
  if (side === "back") {
    design.qrDataUrl = await QRCode.toDataURL(`https://${design.shortUrl}?s=qr`, {
      margin: 0,
      errorCorrectionLevel: "M",
      color: qrColorsFor(design),
    });
  }
  const wmm = CARD.w + 2 * CARD.bleed;
  const hmm = CARD.h + 2 * CARD.bleed;
  return (
    <>
        <style>{`@page { size: ${wmm}mm ${hmm}mm; margin: 0; } html, body { margin: 0; padding: 0; }`}</style>
        <div id="card" style={{ width: `${wmm}mm`, height: `${hmm}mm`, overflow: "hidden" }}>
          <CardFace design={design} side={side} bleed guides={get("guides") === "1"} id="print" />
        </div>
    </>
  );
}

import { CardFace } from "@/components/card/CardFace";
import { CARD, DEFAULT_DESIGN, qrColorsFor, type CardDesign, type CardSide, type CardTemplate } from "@/components/card/cardSpec";
import QRCode from "qrcode";

/**
 * Print page: renders one card side (or both, one per page) at exact
 * physical size with bleed.
 * Used by scripts/export-cards.ts via Playwright to produce PDF/PNG - that
 * script always asks for a single side, so the side=front/back path (and the
 * #card id it screenshots) is unchanged. side=both is for a human printing
 * straight from the browser: one Print > Save as PDF captures a two-page
 * file, front then back.
 * Query params: template, side (front|back|both), name, headline, subline, color, url, qr=1
 */
export const dynamic = "force-dynamic";

async function withQr(design: CardDesign): Promise<CardDesign> {
  return {
    ...design,
    qrDataUrl: await QRCode.toDataURL(`https://${design.shortUrl}?s=qr`, {
      margin: 0,
      errorCorrectionLevel: "M",
      color: qrColorsFor(design),
    }),
  };
}

export default async function PrintCardPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const get = (k: string, d = "") => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v) ?? d;
  };
  const sideParam = get("side", "front");
  const side: CardSide | "both" = sideParam === "back" ? "back" : sideParam === "both" ? "both" : "front";
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
  const wmm = CARD.w + 2 * CARD.bleed;
  const hmm = CARD.h + 2 * CARD.bleed;
  const guides = get("guides") === "1";

  if (side === "both") {
    const backDesign = await withQr(design);
    return (
      <>
        <style>{`
          @page { size: ${wmm}mm ${hmm}mm; margin: 0; }
          html, body { margin: 0; padding: 0; }
          .sheet { width: ${wmm}mm; height: ${hmm}mm; overflow: hidden; break-after: page; }
          .sheet:last-child { break-after: auto; }
        `}</style>
        <div className="sheet">
          <CardFace design={design} side="front" bleed guides={guides} id="print-front" />
        </div>
        <div className="sheet">
          <CardFace design={backDesign} side="back" bleed guides={guides} id="print-back" />
        </div>
      </>
    );
  }

  if (side === "back") design.qrDataUrl = (await withQr(design)).qrDataUrl;

  return (
    <>
        <style>{`@page { size: ${wmm}mm ${hmm}mm; margin: 0; } html, body { margin: 0; padding: 0; }`}</style>
        <div id="card" style={{ width: `${wmm}mm`, height: `${hmm}mm`, overflow: "hidden" }}>
          <CardFace design={design} side={side} bleed guides={guides} id="print" />
        </div>
    </>
  );
}

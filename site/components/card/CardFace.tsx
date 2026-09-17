import { CARD, type CardDesign, type CardSide, relativeLuminance } from "./cardSpec";

/**
 * Pure SVG card renderer. Used for the live configurator on the website and
 * for print export (rendered with Chromium at exact physical size).
 * Coordinates are in millimetres. viewBox is expanded when `bleed` is true.
 */

const PALETTE = {
  paper: "#f7f4ee",
  ink: "#15130f",
  muted: "#6f6a62",
  gold: "#e6b455",
  noir: "#141414",
  noirText: "#f3efe6",
};

// Average advance per glyph (em) measured from the rendered fonts: Instrument Serif
// about 0.36, Geist about 0.55 (0.66 for uppercase at weight 600).
const MIN_SCALE = 0.45;
function estimateWidth(text: string, size: number, family: "sans" | "display" = "sans", letterSpacing = 0) {
  const n = text.length;
  const upper = family === "sans" && /[A-Z]/.test(text) && text === text.toUpperCase();
  const em = family === "display" ? 0.36 : upper ? 0.66 : 0.55;
  return em * size * n + letterSpacing * Math.max(0, n - 1);
}

function TapGlyph({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  // concentric ripple + dot, centred at (x,y); size = outer diameter in mm
  const r = size / 2;
  const sw = size * 0.075;
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <circle r={r * 0.16} fill={color} stroke="none" />
      <path d={`M ${-r * 0.5} ${-r * 0.5} A ${r * 0.7} ${r * 0.7} 0 0 0 ${-r * 0.5} ${r * 0.5}`} />
      <path d={`M ${r * 0.5} ${-r * 0.5} A ${r * 0.7} ${r * 0.7} 0 0 1 ${r * 0.5} ${r * 0.5}`} />
      <path d={`M ${-r * 0.78} ${-r * 0.78} A ${r * 1.1} ${r * 1.1} 0 0 0 ${-r * 0.78} ${r * 0.78}`} opacity={0.5} />
      <path d={`M ${r * 0.78} ${-r * 0.78} A ${r * 1.1} ${r * 1.1} 0 0 1 ${r * 0.78} ${r * 0.78}`} opacity={0.5} />
    </g>
  );
}

function StarRow({ x, y, size, color, gap = 0.9 }: { x: number; y: number; size: number; color: string; gap?: number }) {
  const path =
    "M12 2.5l2.94 6.26 6.86.78-5.08 4.7 1.36 6.78L12 17.6l-6.08 3.42 1.36-6.78-5.08-4.7 6.86-.78L12 2.5z";
  const s = size / 24;
  return (
    <g transform={`translate(${x} ${y})`} fill={color}>
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={i} d={path} transform={`translate(${i * (size + gap)} 0) scale(${s})`} />
      ))}
    </g>
  );
}

function Text({
  x,
  y,
  children,
  size,
  color,
  family = "sans",
  weight = 500,
  anchor = "start",
  italic = false,
  letterSpacing,
  opacity,
  maxWidth,
}: {
  x: number;
  y: number;
  children: string;
  size: number; // mm (cap-ish); font-size in user units
  color: string;
  family?: "sans" | "display";
  weight?: number;
  anchor?: "start" | "middle" | "end";
  italic?: boolean;
  letterSpacing?: number;
  opacity?: number;
  /** mm; shrink the font so the line never exceeds this width */
  maxWidth?: number;
}) {
  const est = estimateWidth(children, size, family, letterSpacing);
  // letter spacing is fixed in mm, so solve for the glyph size that fits the remaining width
  const spacing = (letterSpacing ?? 0) * Math.max(0, children.length - 1);
  const fitted =
    maxWidth && est > maxWidth
      ? Math.max((size * Math.max(maxWidth - spacing, 0)) / Math.max(est - spacing, 0.001), size * MIN_SCALE)
      : size;
  // hard backstop if the estimate is off and the floor was hit: force the text into the zone
  const forceLength = Boolean(maxWidth) && fitted === size * MIN_SCALE && estimateWidth(children, fitted, family, letterSpacing) > (maxWidth as number);
  return (
    <text
      x={x}
      y={y}
      fontSize={fitted}
      textLength={forceLength ? maxWidth : undefined}
      lengthAdjust={forceLength ? "spacingAndGlyphs" : undefined}
      fill={color}
      fontFamily={family === "display" ? "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif" : "var(--font-geist-sans), Geist, Inter, system-ui, sans-serif"}
      fontWeight={weight}
      textAnchor={anchor}
      fontStyle={italic ? "italic" : "normal"}
      letterSpacing={letterSpacing}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

function splitHeadline(h: string, maxWidth: number, size: number): [string, string] {
  // Try to split "Tap to review us on Google" into two lines at " on " or the midpoint
  const idx = h.indexOf(" on ");
  if (idx > 0) return [h.slice(0, idx), h.slice(idx + 1)];
  const words = h.split(" ");
  if (words.length < 4 && estimateWidth(h, size, "display") <= maxWidth) return [h, ""];
  if (words.length < 2) return [h, ""];
  const mid = Math.ceil(words.length / 2);
  const byMid: [string, string] = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  if (estimateWidth(byMid[0], size, "display") <= maxWidth && estimateWidth(byMid[1], size, "display") <= maxWidth) return byMid;
  // long custom headline: greedily fill line 1 up to maxWidth so both lines stay large
  let cut = 1;
  while (cut < words.length - 1 && estimateWidth(words.slice(0, cut + 1).join(" "), size, "display") <= maxWidth) cut++;
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
}

export function CardFace({
  design,
  side,
  bleed = false,
  guides = false,
  className,
  id,
}: {
  design: CardDesign;
  side: CardSide;
  bleed?: boolean;
  /** draw the magenta trim line (for proofs only, never for print files) */
  guides?: boolean;
  className?: string;
  id?: string;
}) {
  const b = bleed ? CARD.bleed : 0;
  const W = CARD.w;
  const H = CARD.h;
  const viewBox = `${-b} ${-b} ${W + 2 * b} ${H + 2 * b}`;

  // colour scheme per template
  const isBrand = design.template === "brand";
  const isNoir = design.template === "noir";
  const brandIsLight = relativeLuminance(design.brandColor) > 0.5;
  const bg = isNoir ? PALETTE.noir : isBrand ? design.brandColor : PALETTE.paper;
  const fg = isNoir ? PALETTE.noirText : isBrand ? (brandIsLight ? PALETTE.ink : "#ffffff") : PALETTE.ink;
  const sub = isNoir ? "rgba(243,239,230,0.7)" : isBrand ? (brandIsLight ? "rgba(21,19,15,0.7)" : "rgba(255,255,255,0.75)") : PALETTE.muted;
  const gold = isBrand && !brandIsLight ? "#f2c96b" : PALETTE.gold;
  const accent = isNoir ? gold : isBrand ? fg : design.brandColor;
  const darkBg = isNoir || (isBrand && !brandIsLight);

  // text zones (mm): the front glyph's outer arc reaches about W - 15 - 8.8, so text
  // starting at x = 6 gets 54 mm; centred rows keep CARD.safe + 3 mm on each side.
  const frontMax = 54;
  const centredMax = W - 2 * (CARD.safe + 3);
  const qrX = W - 27;
  const backMax = qrX - 6 - 2;
  const [h1, h2] = splitHeadline(design.headline, frontMax, 9.2);

  return (
    <svg
      id={id}
      viewBox={viewBox}
      width="100%"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${design.restaurantName} review card, ${side}`}
      style={{ display: "block" }}
    >
      <defs>
        <clipPath id={`clip-${side}-${id ?? "card"}`}>
          <rect x={-b} y={-b} width={W + 2 * b} height={H + 2 * b} rx={bleed ? 0 : CARD.radius} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${side}-${id ?? "card"})`}>
        <rect x={-b} y={-b} width={W + 2 * b} height={H + 2 * b} fill={bg} />

        {side === "front" && design.template !== "logo" && (
          <>
            {/* restaurant logo or name, top-left */}
            {design.logoDataUrl ? (
              // On dark backgrounds the logo is knocked out to a paper-colored silhouette so dark marks stay visible.
              <image
                href={design.logoDataUrl}
                x={6}
                y={4.5}
                width={34}
                height={10}
                preserveAspectRatio="xMinYMid meet"
                style={darkBg ? { filter: "brightness(0) invert(0.93)" } : undefined}
              />
            ) : (
              <Text x={6} y={9.2} size={3.1} color={sub} weight={600} letterSpacing={0.35} maxWidth={frontMax}>
                {design.restaurantName.toUpperCase()}
              </Text>
            )}
            {design.showStars && <StarRow x={6} y={13.5} size={4.2} color={gold} />}
            {/* headline */}
            <Text x={6} y={h2 ? 29 : 31} size={9.2} color={fg} family="display" maxWidth={frontMax}>
              {h1}
            </Text>
            {h2 && (
              <Text x={6} y={38.5} size={9.2} color={fg} family="display" italic maxWidth={frontMax}>
                {h2}
              </Text>
            )}
            {/* subline */}
            <Text x={6} y={47.5} size={2.9} color={sub} weight={500} maxWidth={frontMax}>
              {design.subline}
            </Text>
            {/* tap glyph, right side, vertically centred */}
            <TapGlyph x={W - 15} y={H / 2 + 4} size={16} color={accent} />
          </>
        )}

        {side === "front" && design.template === "logo" && (
          <>
            {design.logoDataUrl ? (
              <image
                href={design.logoDataUrl}
                x={W / 2 - 24}
                y={8}
                width={48}
                height={25}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : (
              <Text x={W / 2} y={24} size={8.5} color={fg} family="display" anchor="middle" maxWidth={centredMax}>
                {design.restaurantName}
              </Text>
            )}
            {design.showStars && <StarRow x={W / 2 - 12.5} y={33.5} size={4} color={gold} />}
            <Text x={W / 2} y={42.8} size={3.6} color={fg} weight={600} anchor="middle" maxWidth={centredMax}>
              {design.headline}
            </Text>
            {/* y = H - 7 keeps the glyph outside the 3 mm safe zone */}
            <TapGlyph x={W / 2} y={H - 7} size={7} color={accent} />
          </>
        )}

        {side === "back" && (
          <>
            <Text x={6} y={9.2} size={3.1} color={sub} weight={600} letterSpacing={0.35} maxWidth={backMax}>
              {design.restaurantName.toUpperCase()}
            </Text>
            {/* instructions */}
            <Text x={6} y={18} size={3.4} color={fg} weight={600}>
              How to leave a review
            </Text>
            <Text x={6} y={23.5} size={2.6} color={sub}>
              iPhone: top edge on the card.
            </Text>
            <Text x={6} y={27.8} size={2.6} color={sub}>
              Android: back of your phone on the card.
            </Text>
            <Text x={6} y={32.1} size={2.6} color={sub}>
              No tap? Scan the code or visit:
            </Text>
            <Text x={6} y={40} size={2.8} color={fg} weight={600} maxWidth={50}>
              {design.shortUrl}
            </Text>
            {/* thank-you note */}
            <foreignObject x={6} y={42.5} width={50} height={9}>
              <div
                // @ts-expect-error xmlns is valid on foreignObject children for SVG serialization
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  fontFamily: "var(--font-geist-sans), Geist, Inter, system-ui, sans-serif",
                  fontSize: "2.35px",
                  lineHeight: 1.3,
                  color: sub,
                }}
              >
                {design.backNote}
              </div>
            </foreignObject>
            {/* QR */}
            {(isNoir || (isBrand && !brandIsLight)) && (
              <rect x={qrX - 2} y={11} width={25} height={25} rx={1.5} fill={PALETTE.paper} />
            )}
            {design.qrDataUrl ? (
              <image href={design.qrDataUrl} x={qrX} y={13} width={21} height={21} />
            ) : (
              <rect x={qrX} y={13} width={21} height={21} fill="none" stroke={sub} strokeDasharray="1 1" strokeWidth={0.3} />
            )}
            <Text x={qrX + 10.5} y={39.8} size={2.3} color={sub} anchor="middle">
              Scan to review
            </Text>
            <TapGlyph x={qrX + 10.5} y={H - 7} size={7} color={sub} />
          </>
        )}
      </g>
      {/* trim guide for proofs only (supplier trims here) */}
      {guides && (
        <rect x={0} y={0} width={W} height={H} rx={CARD.radius} fill="none" stroke="#ff00ff" strokeWidth={0.15} strokeDasharray="1.5 1" opacity={0.6} />
      )}
    </svg>
  );
}

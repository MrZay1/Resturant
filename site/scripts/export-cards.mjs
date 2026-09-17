#!/usr/bin/env node
/**
 * Export print-ready card artwork (PDF + 300 dpi PNG) for every template x side.
 *
 * Requires the Next.js dev server to be running (npm run dev) so that
 * /print/card can render each side at exact physical size with bleed.
 *
 * Usage:
 *   node scripts/export-cards.mjs                 # default designs
 *   node scripts/export-cards.mjs designs.json    # custom list of designs
 *   BASE_URL=http://localhost:3111 node scripts/export-cards.mjs
 *
 * Custom designs JSON: an array of
 *   { slug, template, name, headline, subline, color, url, stars, logo? }
 *   template: classic | noir | logo | brand   (omit to export all four)
 *   stars:    1 | 0 | true | false
 *   logo:     optional logo: a file path, an http(s) URL, or a data URL (PNG/JPEG/SVG/WebP); shown on every template
 *
 * Output: ../cards/exports/<slug>/<template>-<side>.pdf and .png
 */

import { chromium } from "playwright";
import { mkdir, readFile, writeFile, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Geometry (keep in sync with components/card/cardSpec.ts)
// ---------------------------------------------------------------------------
const CARD_W_MM = 85.6;
const CARD_H_MM = 53.98;
const BLEED_MM = 3;
const BLEED_W_MM = CARD_W_MM + 2 * BLEED_MM; // 91.6
const BLEED_H_MM = CARD_H_MM + 2 * BLEED_MM; // 59.98

const CSS_PX_PER_IN = 96;
const MM_PER_IN = 25.4;
const TARGET_DPI = 300;

const mmToCssPx = (mm) => (mm / MM_PER_IN) * CSS_PX_PER_IN;
// Chromium needs an integer viewport. Round to nearest CSS px; #card keeps its
// exact mm size regardless, and we screenshot the element, not the viewport.
const VIEWPORT = {
  width: Math.round(mmToCssPx(BLEED_W_MM)), // 346
  height: Math.round(mmToCssPx(BLEED_H_MM)), // 227
};
const DEVICE_SCALE = TARGET_DPI / CSS_PX_PER_IN; // 3.125

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const TEMPLATES = ["classic", "noir", "logo", "brand"];
const SIDES = ["front", "back"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = path.resolve(__dirname, "..");
const OUT_ROOT = path.resolve(SITE_DIR, "..", "cards", "exports");

const SAMPLE = {
  name: "Lucia's Trattoria",
  headline: "Tap to review us on Google",
  subline: "Hold your phone here",
  color: "#1f4d3a",
  url: "tblnt.co/r/lucias",
  stars: 0,
};

const DEFAULT_DESIGNS = [
  ...TEMPLATES.map((template) => ({ slug: `lucias-${template}`, template, ...SAMPLE })),
  {
    slug: "demo-your-restaurant",
    template: "classic",
    name: "Your Restaurant",
    headline: "Tap to review us on Google",
    subline: "Hold your phone here",
    color: "#1f4d3a",
    url: "tblnt.co/r/demo",
    stars: 0,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "card";
}

function normaliseDesign(d, i) {
  if (!d || typeof d !== "object") throw new Error(`design #${i} is not an object`);
  const template = d.template ? String(d.template) : undefined;
  if (template && !TEMPLATES.includes(template)) {
    throw new Error(`design #${i}: unknown template "${template}" (expected ${TEMPLATES.join("|")})`);
  }
  const stars = d.stars === undefined ? 0 : d.stars === 0 || d.stars === "0" || d.stars === false ? 0 : 1;
  return {
    slug: slugify(d.slug || d.name || `design-${i + 1}`),
    template, // undefined = export all templates
    name: d.name ?? SAMPLE.name,
    headline: d.headline ?? SAMPLE.headline,
    subline: d.subline ?? SAMPLE.subline,
    color: d.color ?? SAMPLE.color,
    url: d.url ?? SAMPLE.url,
    stars,
    logo: d.logo || undefined,
  };
}

async function loadDesigns(argPath) {
  if (!argPath) return DEFAULT_DESIGNS.map(normaliseDesign);
  const abs = path.resolve(process.cwd(), argPath);
  const raw = await readFile(abs, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error(`${abs} must contain a JSON array of designs`);
  return parsed.map(normaliseDesign);
}

/**
 * Logos are served to the print page as same-origin static files (public/_logos/*), never as data URLs
 * in the query string: Node caps request URLs at about 16 KB, which most logos exceed once base64-encoded.
 * Accepts a file path, an http(s) URL, or a data URL. Returns the URL path to put in ?logo= and the staged file.
 */
async function stageLogo(logo, slug) {
  if (!logo) return { param: undefined, staged: null };
  const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "_logos");
  await mkdir(publicDir, { recursive: true });
  let buf, ext = "png";
  if (/^data:/.test(logo)) {
    const m = logo.match(/^data:(image\/(png|jpeg|jpg|svg\+xml|webp));base64,(.+)$/);
    if (!m) throw new Error("logo data URL must be base64 PNG, JPEG, SVG or WebP");
    ext = m[2] === "svg+xml" ? "svg" : m[2] === "jpeg" || m[2] === "jpg" ? "jpg" : m[2];
    buf = Buffer.from(m[3], "base64");
  } else if (/^https?:\/\//.test(logo)) {
    const res = await fetch(logo);
    if (!res.ok) throw new Error(`logo fetch failed: ${res.status}`);
    buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") || "";
    ext = ct.includes("svg") ? "svg" : ct.includes("jpeg") ? "jpg" : ct.includes("webp") ? "webp" : "png";
  } else {
    const abs = path.resolve(process.cwd(), logo);
    await stat(abs);
    buf = await readFile(abs);
    ext = path.extname(abs).replace(".", "").toLowerCase() || "png";
    if (ext === "jpeg") ext = "jpg";
  }
  const name = `${slug}-${createHash("sha1").update(buf).digest("hex").slice(0, 10)}.${ext}`;
  const file = path.join(publicDir, name);
  await writeFile(file, buf);
  return { param: `/_logos/${name}`, staged: file };
}

function buildUrl(design, template, side) {
  const u = new URL("/print/card", BASE_URL);
  u.searchParams.set("template", template);
  u.searchParams.set("side", side);
  u.searchParams.set("name", design.name);
  u.searchParams.set("headline", design.headline);
  u.searchParams.set("subline", design.subline);
  u.searchParams.set("color", design.color); // URLSearchParams encodes "#" as %23
  u.searchParams.set("url", design.url);
  u.searchParams.set("stars", String(design.stars));
  if (design.logo) u.searchParams.set("logo", design.logo);
  return u.toString();
}

async function checkServer() {
  try {
    const res = await fetch(`${BASE_URL}/print/card?side=front`, { redirect: "manual" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    throw new Error(
      `Cannot reach ${BASE_URL}/print/card (${err.message}). Start the dev server first: npm run dev` +
        (BASE_URL.includes(":3000") ? "" : ` (BASE_URL=${BASE_URL})`)
    );
  }
}

// Pixel size of the bleed box at TARGET_DPI, floored so the target never exceeds the
// rendered box (a ceil left a 1 px white column/row on the right and bottom edges).
const PNG_W = Math.floor((BLEED_W_MM / MM_PER_IN) * TARGET_DPI); // 1081
const PNG_H = Math.floor((BLEED_H_MM / MM_PER_IN) * TARGET_DPI); // 708

let sharpModule = null;
async function loadSharp() {
  if (sharpModule !== null) return sharpModule;
  try {
    sharpModule = (await import("sharp")).default;
  } catch {
    sharpModule = false;
    console.warn("  (sharp not available: PNG left as captured, without a 300 dpi tag)");
  }
  return sharpModule;
}

/**
 * Chromium rounds the element box to whole CSS pixels before scaling, so the
 * capture can be a pixel or two larger than the exact bleed box. Trim it to
 * the exact size (from the top-left) and stamp 300 dpi into the PNG metadata so prepress
 * tools read the correct physical size. Falls back to writing the raw capture.
 */
async function finalisePng(buffer, outPath) {
  const sharp = await loadSharp();
  if (!sharp) {
    await writeFile(outPath, buffer);
    return;
  }
  const img = sharp(buffer);
  const meta = await img.metadata();
  const w = meta.width ?? PNG_W;
  const h = meta.height ?? PNG_H;
  let pipeline = img;
  if (w >= PNG_W && h >= PNG_H && (w !== PNG_W || h !== PNG_H)) {
    // crop from the top-left: the element starts at 0,0 so sub-pixel slop is always on the right/bottom edge
    pipeline = pipeline.extract({ left: 0, top: 0, width: PNG_W, height: PNG_H });
  } else if (w < PNG_W || h < PNG_H) {
    console.warn(`  (capture ${w}x${h} is smaller than expected ${PNG_W}x${PNG_H}; kept as is)`);
  }
  await pipeline.withMetadata({ density: TARGET_DPI }).png({ compressionLevel: 9 }).toFile(outPath);
}

/**
 * The Next.js dev server injects a floating <nextjs-portal> (route indicator,
 * issue badge). It is position: fixed and would land inside the capture, so
 * remove it and keep it hidden in case it re-mounts before the screenshot.
 */
async function hideDevOverlay(page) {
  await page.addStyleTag({
    content: "nextjs-portal, [data-nextjs-toast], [data-next-badge-root] { display: none !important; }",
  });
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal, [data-nextjs-toast], [data-next-badge-root]").forEach((el) => el.remove());
  });
}

async function exportSide(context, design, template, side, outDir) {
  const page = await context.newPage();
  try {
    const url = buildUrl(design, template, side);
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res || !res.ok()) throw new Error(`GET ${url} -> ${res ? res.status() : "no response"}`);

    const card = page.locator("#card");
    await card.waitFor({ state: "visible", timeout: 15000 });
    await hideDevOverlay(page);
    await page.evaluate(() => document.fonts.ready);
    // Give any <image href="data:..."> (QR, logo) a moment to decode.
    await page.evaluate(
      () =>
        Promise.all(
          Array.from(document.images).map((img) =>
            img.complete ? Promise.resolve() : new Promise((r) => img.addEventListener("load", r, { once: true }))
          )
        )
    );

    const base = path.join(outDir, `${template}-${side}`);

    // Vector PDF at the exact @page size declared by the print page.
    const pdfPath = `${base}.pdf`;
    await page.pdf({
      path: pdfPath,
      preferCSSPageSize: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log(`  wrote ${pdfPath}`);

    // Raster PNG at 300 dpi (deviceScaleFactor = 300 / 96).
    const pngPath = `${base}.png`;
    const raw = await card.screenshot({ omitBackground: false, type: "png" });
    await finalisePng(raw, pngPath);
    console.log(`  wrote ${pngPath}`);

    return { pdfPath, pngPath };
  } finally {
    await page.close();
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const designs = await loadDesigns(process.argv[2]);
  await checkServer();

  console.log(`Exporting ${designs.length} design(s) from ${BASE_URL}`);
  console.log(`Output root: ${OUT_ROOT}`);
  console.log(
    `Viewport ${VIEWPORT.width}x${VIEWPORT.height} css px @ ${DEVICE_SCALE}x -> ~${Math.round(
      mmToCssPx(BLEED_W_MM) * DEVICE_SCALE
    )}x${Math.round(mmToCssPx(BLEED_H_MM) * DEVICE_SCALE)} px PNG (${TARGET_DPI} dpi)`
  );

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
  });

  const summary = { ok: 0, failed: 0, files: [] };

  try {
    for (const design of designs) {
      const templates = design.template ? [design.template] : TEMPLATES;
      const outDir = path.join(OUT_ROOT, design.slug);
      console.log(`\n${design.slug}  (${design.name}; templates: ${templates.join(", ")})`);
      let staged = null;
      try {
        await mkdir(outDir, { recursive: true });
        const logo = await stageLogo(design.logo, design.slug);
        staged = logo.staged;
        const withLogo = { ...design, logo: logo.param };
        for (const template of templates) {
          for (const side of SIDES) {
            const files = await exportSide(context, withLogo, template, side, outDir);
            summary.files.push(files.pdfPath, files.pngPath);
          }
        }
        summary.ok += 1;
      } catch (err) {
        summary.failed += 1;
        console.error(`  FAILED ${design.slug}: ${err && err.message ? err.message : err}`);
      } finally {
        if (staged) await rm(staged, { force: true });
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  console.log(`\nDone. ${summary.ok} design(s) exported, ${summary.failed} failed, ${summary.files.length} files.`);
  if (summary.failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});

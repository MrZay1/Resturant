/**
 * Pitch-pack generator: turns a research JSON into everything needed for one restaurant.
 *
 *   node scripts/pitch-pack.mjs research/<slug>.json
 *
 * Input JSON fields (all optional except name):
 *   name, city, owner, address, website, cuisine, rating, reviewCount, lastReview, query, hook,
 *   competitors: [{name, rating, count, note}], praise: [], complaints: [], dishes: [],
 *   talkingPoints: [], likelyObjection, offer, headline, subline, template,
 *   logo: "https://..." or "path/to/logo.png",  brandColor: "#rrggbb" (derived from the logo when omitted)
 *
 * Output: cards/pitch/<slug>/
 *   profile.json            import into /pitch (logo embedded)
 *   cards/*.png|pdf         all four designs with the logo, front and back
 *   pitch-deck-<slug>.pptx  filled PowerPoint
 *   brief.md                one-page pre-visit brief
 *   preview-sheet.png       all designs on one image for your phone (rendered from /pitch/sheet)
 * Requires the dev server running at BASE_URL (default http://localhost:3000).
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const base = process.env.BASE_URL || "http://localhost:3000";
const inFile = process.argv[2];
if (!inFile) {
  console.error("usage: node scripts/pitch-pack.mjs research/<slug>.json");
  process.exit(1);
}
const R = JSON.parse(fs.readFileSync(inFile, "utf8"));
if (!R.name) throw new Error("research JSON needs a name");
const slug = R.name.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24);
const root = path.resolve(process.cwd(), "..");
const outDir = path.join(root, "cards", "pitch", slug);
fs.mkdirSync(outDir, { recursive: true });

// 1. logo -> PNG on disk + data URL
let logoPath = null;
let logoDataUrl;
if (R.logo) {
  let buf;
  if (/^https?:\/\//.test(R.logo)) {
    const res = await fetch(R.logo, { headers: { "user-agent": "Mozilla/5.0 (pitch-pack)" } });
    if (!res.ok) throw new Error(`logo fetch failed: ${res.status}`);
    buf = Buffer.from(await res.arrayBuffer());
  } else {
    buf = fs.readFileSync(path.resolve(R.logo));
  }
  // normalise to PNG; if the logo sits on a white background (JPG, screenshot), knock the white out
  let work = sharp(buf).ensureAlpha();
  {
    const { data, info } = await work.raw().toBuffer({ resolveWithObject: true });
    const px = (x, y) => { const i = (y * info.width + x) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };
    const nearWhite = ([r, g, b, a]) => a > 250 && r > 240 && g > 240 && b > 240;
    const corners = [px(0, 0), px(info.width - 1, 0), px(0, info.height - 1), px(info.width - 1, info.height - 1)];
    if (corners.every(nearWhite)) {
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238) data[i + 3] = 0;
      }
      work = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
    }
  }
  // trim transparent borders, cap size
  const png = await work.png().toBuffer().then((b) => sharp(b).trim({ threshold: 12 }).resize({ width: 1200, height: 600, fit: "inside", withoutEnlargement: true }).png().toBuffer());
  logoPath = path.join(outDir, "logo.png");
  fs.writeFileSync(logoPath, png);
  logoDataUrl = `data:image/png;base64,${png.toString("base64")}`;
}

// 2. brand color: given, else dominant saturated color from the logo, else default
let brandColor = R.brandColor;
if (!brandColor && logoPath) {
  const { data, info } = await sharp(logoPath).resize(64, 64, { fit: "inside" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const buckets = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 200) continue;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    if (sat < 0.25 || lum > 0.85 || lum < 0.08) continue; // skip greys, whites, blacks
    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    const e = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    e.n++; e.r += r; e.g += g; e.b += b;
    buckets.set(key, e);
  }
  const best = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
  if (best) {
    const hex = (v) => Math.round(v / best.n).toString(16).padStart(2, "0");
    brandColor = `#${hex(best.r)}${hex(best.g)}${hex(best.b)}`;
  }
}
brandColor = brandColor || "#1f4d3a";

// 3. profile JSON for /pitch
const profile = {
  name: R.name,
  city: R.city || "",
  owner: R.owner || "",
  brandColor,
  template: R.template || (logoDataUrl ? "logo" : "classic"),
  headline: R.headline || "Tap to review us on Google",
  subline: R.subline ?? "Hold your phone here",
  rating: String(R.rating ?? ""),
  reviewCount: String(R.reviewCount ?? ""),
  lastReview: R.lastReview || "",
  offer: R.offer || "Start with 10 cards and the monthly report: $200 today, then $50 a month. Cancel anytime.",
  notes: R.notes || "",
  address: R.address || "",
  website: R.website || "",
  cuisine: R.cuisine || "",
  query: R.query || "",
  hook: R.hook || "",
  competitors: R.competitors || [],
  praise: R.praise || [],
  complaints: R.complaints || [],
  dishes: R.dishes || [],
  talkingPoints: R.talkingPoints || [],
  likelyObjection: R.likelyObjection || "",
  reviewsPerMonth: R.reviewsPerMonth || "",
  reviewsPerMonthBasis: R.reviewsPerMonthBasis || "",
  gapTitle: R.gapTitle || "",
  benchmarks: R.benchmarks || [],
  benchmarkNote: R.benchmarkNote || "",
  todayFacts: R.todayFacts || [],
  logoDataUrl,
};
fs.writeFileSync(path.join(outDir, "profile.json"), JSON.stringify(profile, null, 2));

// 4. card artwork with the logo (all four templates)
const designs = [{ slug: `pitch-${slug}`, name: R.name, headline: profile.headline, subline: profile.subline, color: brandColor, url: `${R.shortLinkHost || "tblnt.co"}/r/${slug.slice(0, 18)}`, stars: false, ...(logoPath ? { logo: logoPath } : {}) }];
const designFile = path.join(outDir, "designs.json");
fs.writeFileSync(designFile, JSON.stringify(designs, null, 2));
execFileSync("node", ["scripts/export-cards.mjs", designFile], { stdio: "inherit", env: { ...process.env, BASE_URL: base } });
const exported = path.join(root, "cards", "exports", `pitch-${slug}`);
const cardsDir = path.join(outDir, "cards");
fs.rmSync(cardsDir, { recursive: true, force: true });
fs.renameSync(exported, cardsDir);

// 5. PowerPoint: point the builder at the exported cards (it expects a folder under cards/exports)
const linkDir = path.join(root, "cards", "exports", `pitch-${slug}`);
fs.mkdirSync(linkDir, { recursive: true });
for (const f of fs.readdirSync(cardsDir)) fs.copyFileSync(path.join(cardsDir, f), path.join(linkDir, f));
execFileSync("node", ["scripts/build-pitch-deck.cjs", "--profile", path.join(outDir, "profile.json"), "--cards", `pitch-${slug}`], { stdio: "inherit" });
const built = path.join(root, "deck", `pitch-deck-${slug}.pptx`);
if (fs.existsSync(built)) fs.renameSync(built, path.join(outDir, `pitch-deck-${slug}.pptx`));

// 6. pre-visit brief
const li = (xs) => (xs && xs.length ? xs.map((x) => `- ${x}`).join("\n") : "- (none found)");
const comp = (profile.competitors || []).map((c) => `| ${c.name} | ${Number(c.rating).toFixed(1)} | ${c.count} | ${c.note || ""} |`).join("\n");
const brief = `# Pre-visit brief: ${R.name}${R.city ? ` (${R.city})` : ""}

${R.address ? `Address: ${R.address}  ` : ""}${R.website ? `\nWebsite: ${R.website}  ` : ""}${R.cuisine ? `\nCuisine: ${R.cuisine}  ` : ""}
Owner or manager: ${R.owner || "unknown, ask the host"}

## Their Google listing today

| Rating | Reviews | Most recent review |
|---|---|---|
| ${profile.rating || "?"} | ${profile.reviewCount || "?"} | ${profile.lastReview || "?"} |

## Opening line

> ${profile.hook || "I looked at your Google page this morning before I came in."}

## Talking points

${li(profile.talkingPoints)}

## What their guests already say

Praise:
${li(profile.praise)}

Recurring complaints:
${li(profile.complaints)}

Dishes named:
${li(profile.dishes)}

## Review volume: them versus the rooms they compete with

| Restaurant | New reviews a month |
|---|---|
${(profile.benchmarks || []).map((b) => `| ${b.name} | ${b.perMonth} |`).join("\n")}
| **${R.name}** | **${profile.reviewsPerMonth || "?"}** |

${profile.benchmarkNote || ""}

## Who is ahead of them on the map (${profile.query || "search"})

| Restaurant | Rating | Reviews | Note |
|---|---|---|---|
${comp || "| (none researched) | | | |"}

## Likely objection

${profile.likelyObjection || "See the objections list in docs/05-sales-playbook.md."}

## Offer

${profile.offer}

## Before you walk in

${(profile.notes || "").split(/(?<=[.!?])\s+/).filter(Boolean).map((x) => `- ${x}`).join("\n") || "- (no notes)"}

## Links

- Present: ${base}/pitch/deck?pack=${slug}
- Review all slides (for markup): ${base}/pitch/deck?pack=${slug}&view=all
- Prep and edit: ${base}/pitch (click "${R.name}" under Prepared packs)

## Kit for this visit

- Phone: the present link above, plus the preview sheet image
- 2 printed sample cards, 1 blank encoded card, 1 holder
- Staff guide and sample report one-pager
`;
fs.writeFileSync(path.join(outDir, "brief.md"), brief);

// 7. preview sheet image (via the site's sheet renderer)
try {
  const { chromium } = await import("playwright");
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 2 });
  await pg.goto(`${base}/pitch`, { waitUntil: "networkidle" });
  await pg.evaluate((prof) => {
    const id = "pack-" + Math.random().toString(36).slice(2, 8);
    const list = JSON.parse(localStorage.getItem("tn.pitch.profiles.v1") || "[]");
    list.unshift({ ...prof, id, updatedAt: Date.now() });
    localStorage.setItem("tn.pitch.profiles.v1", JSON.stringify(list));
    localStorage.setItem("tn.pitch.current.v1", id);
  }, profile);
  await pg.reload({ waitUntil: "networkidle" });
  await pg.addStyleTag({ content: "header { visibility: hidden !important; }" });
  await pg.waitForTimeout(800);
  const sheet = pg.locator("div.rounded-3xl.bg-paper").last();
  await sheet.screenshot({ path: path.join(outDir, "preview-sheet.png") });
  await b.close();
} catch (e) {
  console.warn("preview sheet skipped:", e.message);
}

console.log(`\nPitch pack ready: ${outDir}`);
for (const f of fs.readdirSync(outDir)) console.log("  " + f);
console.log(`\nPresent:  ${base}/pitch/deck?pack=${slug}`);
console.log(`Review:   ${base}/pitch/deck?pack=${slug}&view=all`);

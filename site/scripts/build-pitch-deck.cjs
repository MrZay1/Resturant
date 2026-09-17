/* eslint-disable @typescript-eslint/no-require-imports */
/* Builds an editable PowerPoint pitch deck template.
 * Usage: node scripts/build-pitch-deck.cjs [--name "Blue Door Bistro" --city "Riverside" --owner "Dana" --rating 4.2 --count 63 --last "2 months ago" --offer "..."]
 * Output: ../deck/pitch-deck-<slug>.pptx (template uses bracketed placeholders when no name is given)
 */
const pptxgen = require("pptxgenjs");
const path = require("node:path");
const fs = require("node:fs");

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
// Optional: --profile path.json (from the pitch-pack generator or the /pitch export) fills every field below.
const PROFILE = get("profile") ? JSON.parse(fs.readFileSync(get("profile"), "utf8")) : {};
const NAME = get("name", PROFILE.name || "[Restaurant Name]");
const CITY = get("city", PROFILE.city || "[City]");
const OWNER = get("owner", PROFILE.owner || "");
const RATING = get("rating", PROFILE.rating || "[4.3]");
const COUNT = get("count", PROFILE.reviewCount || "[58]");
const LAST = get("last", PROFILE.lastReview || "[3 months ago]");
const OFFER = get("offer", PROFILE.offer || "Start with 10 cards and the monthly report: $200 today, then $50 a month. Cancel anytime.");
const HOOK = PROFILE.hook || "";
const QUERY = PROFILE.query || "";
const COMPETITORS = Array.isArray(PROFILE.competitors) ? PROFILE.competitors.slice(0, 3) : [];
const PRAISE = Array.isArray(PROFILE.praise) ? PROFILE.praise.slice(0, 4) : [];
const COMPLAINTS = Array.isArray(PROFILE.complaints) ? PROFILE.complaints.slice(0, 4) : [];
const DISHES = Array.isArray(PROFILE.dishes) ? PROFILE.dishes.slice(0, 5) : [];
// Optional: --cards <folder under cards/exports> with <template>-front.png and classic-back.png (e.g. a restaurant's own logo set)
const CARDS = get("cards", "your-restaurant");
const PER_MONTH = PROFILE.reviewsPerMonth || "";
const PER_MONTH_BASIS = PROFILE.reviewsPerMonthBasis || "";
const GAP_TITLE = PROFILE.gapTitle || "The rooms you compete with are getting more reviews.";
const BENCHMARKS = Array.isArray(PROFILE.benchmarks) ? PROFILE.benchmarks.slice(0, 3) : [];
const BENCHMARK_NOTE = PROFILE.benchmarkNote || "";
const TODAY_FACTS = Array.isArray(PROFILE.todayFacts) ? PROFILE.todayFacts.slice(0, 3) : [];
const BRAND = "Tablenote";
const EMAIL = "hello@tablenote.co";
const FOUNDER = "Zay";
const slug = NAME.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "template";

const C = { ink: "15130F", paper: "F7F4EE", paper2: "EFE9DF", white: "FFFFFF", accent: "1F4D3A", accentSoft: "E2ECE5", gold: "E6B455", dark: "0F1A14", muted: "605B54", line: "E2DCCF", red: "9A3A12" };
const HEAD = "Cambria";
const BODY = "Calibri";
const exportsDir = path.resolve(__dirname, "..", "..", "cards", "exports");
const img = (rel) => path.join(exportsDir, rel.replace(/^your-restaurant\//, `${CARDS}/`));

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
pres.author = BRAND;
pres.title = `${BRAND} pitch: ${NAME}`;

const W = 13.33, H = 7.5, M = 0.7;

function bg(slide, color) { slide.background = { color }; }
function foot(slide, dark) {
  slide.addText(BRAND, { x: M, y: H - 0.55, w: 3, h: 0.3, fontFace: BODY, fontSize: 11, color: dark ? "8A9A90" : C.muted, isTextBox: true, margin: 0 });
  slide.addText(`Prepared for ${NAME}`, { x: W - M - 5, y: H - 0.55, w: 5, h: 0.3, fontFace: BODY, fontSize: 11, color: dark ? "8A9A90" : C.muted, align: "right", isTextBox: true, margin: 0 });
}
function eyebrow(slide, text, y, dark) {
  slide.addText(text.toUpperCase(), { x: M, y, w: 8, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 3, color: dark ? C.gold : C.accent, isTextBox: true, margin: 0 });
}
function title(slide, text, y, opts = {}) {
  slide.addText(text, { x: M, y, w: opts.w ?? 8.2, h: opts.h ?? 1.3, fontFace: HEAD, fontSize: opts.size ?? 38, color: opts.color ?? C.ink, isTextBox: true, margin: 0, valign: "top" });
}
function card(slide, x, y, w, h, fill = C.white, line = C.line) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: fill }, line: { color: line, width: 0.75 }, rectRadius: 0.18, shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.08 } });
}

// 1 cover
{
  const s = pres.addSlide(); bg(s, C.dark);
  eyebrow(s, `For ${NAME} · ${CITY}`, 1.4, true);
  s.addText([{ text: "The review your guests ", options: { color: C.paper } }, { text: "meant", options: { color: C.gold, italic: true } }, { text: " to leave.", options: { color: C.paper } }], { x: M, y: 1.85, w: 6.2, h: 2.4, fontFace: HEAD, fontSize: 46, isTextBox: true, margin: 0, valign: "top" });
  s.addText("A card your servers drop with the check. A monthly report on what guests are saying. Nothing for you to run.", { x: M, y: 4.4, w: 5.6, h: 1.2, fontFace: BODY, fontSize: 18, color: "B9C2BC", isTextBox: true, margin: 0, valign: "top" });
  s.addImage({ path: img("your-restaurant/logo-front.png"), x: 7.3, y: 1.6, w: 5.4, h: 5.4 * (59.98 / 91.6), rotate: -4, shadow: { type: "outer", color: "000000", blur: 18, offset: 8, angle: 90, opacity: 0.45 } });
  foot(s, true);
  s.addNotes(`HOW TO EDIT THIS DECK: replace the bracketed placeholders on slides 1, 2 and 9 ([Restaurant Name], [City], [Owner], [4.3], [58], [3 months ago]). To show their own logo on the cards, open the Pitch prep page on the website (/pitch), upload their logo, click "Save preview as image", and paste that image over the card pictures on slides 1, 5 and 9.\n\nTALK TRACK: "Most of your guests never write a review. Not because they wouldn't, but because nobody asks at the right moment. This is the card that asks."`);
}
// 2 today
{
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, `${NAME} on Google today`, 0.75);
  const tiles = [["Rating", RATING], ["Reviews", COUNT], ["Most recent review", LAST]];
  tiles.forEach(([l, v], i) => {
    const x = M + i * 4.05, y = 1.3, w = 3.75, h = 2.2;
    card(s, x, y, w, h);
    s.addText(l, { x: x + 0.35, y: y + 0.3, w: w - 0.7, h: 0.35, fontFace: BODY, fontSize: 14, color: C.muted, isTextBox: true, margin: 0 });
    s.addText(v, { x: x + 0.35, y: y + 0.75, w: w - 0.7, h: 1.2, fontFace: HEAD, fontSize: 48, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  });
  s.addText(HOOK || "Only the delighted and the furious leave reviews on their own. Everyone else walks out with your best feedback.", { x: M, y: 3.95, w: 11.5, h: 1.5, fontFace: HEAD, fontSize: 30, color: C.ink, isTextBox: true, margin: 0, valign: "top" });
  s.addText(HOOK ? "Only the delighted and the furious leave reviews on their own. Everyone else walks out with your best feedback." : "Most of your regulars have never written a word about you. Not because they would not, but because nobody asked at the right moment.", { x: M, y: 5.5, w: 10.5, h: 1, fontFace: BODY, fontSize: 17, color: C.muted, isTextBox: true, margin: 0, valign: "top" });
  foot(s);
  s.addNotes("Fill the three numbers from their Google listing before the visit. Say the most recent review date out loud; it is usually the moment they lean in.");
}
// 2b what guests already say (only with research)
if (PRAISE.length) {
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, "What your guests already say", 0.75);
  title(s, "We read your last reviews before we came in.", 1.1, { size: 34, h: 1, w: 11 });
  const cols = [["Guests praise", C.accent, PRAISE, "2713"], ["Comes up more than once", C.red, COMPLAINTS.length ? COMPLAINTS : ["Nothing recurring. Good sign."], "2717"], ["Dishes people name", C.ink, DISHES.length ? DISHES : ["Few dishes named yet. More reviews fix that."], "25A0"]];
  cols.forEach(([h, col, list, code], i) => {
    const x = M + i * 4.05, y = 2.4, w = 3.75, hh = 3.4;
    card(s, x, y, w, hh);
    s.addText(h, { x: x + 0.35, y: y + 0.3, w: w - 0.7, h: 0.35, fontFace: BODY, fontSize: 13, bold: true, color: col, isTextBox: true, margin: 0 });
    s.addText(list.map((t, k) => ({ text: t, options: { bullet: { code }, breakLine: k < list.length - 1, paraSpaceAfter: 6 } })), { x: x + 0.35, y: y + 0.8, w: w - 0.7, h: hh - 1, fontFace: BODY, fontSize: 14, color: C.ink, isTextBox: true, margin: 0, valign: "top" });
  });
  s.addText("A hand read of public Google reviews. The monthly report does this for every review, every month, with counts and fixes.", { x: M, y: 6.0, w: 11.5, h: 0.4, fontFace: BODY, fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
  foot(s);
  s.addNotes("Quote one praise line back to them in their own guests' words. Then the complaint, gently: 'this came up three times in the last two months; the report would have flagged it in week one.'");
}
// 3 why
{
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, "Why it matters", 0.75);
  title(s, "More reviews. Higher on the map. More walk-ins.", 1.1, { w: 6.6, size: 34, h: 1.6 });
  s.addText("Google says it plainly: “More reviews and positive ratings can help your business’s local ranking.” Fresh, steady reviews are how you earn one of the three spots people actually tap.", { x: M, y: 2.8, w: 6.4, h: 1.3, fontFace: BODY, fontSize: 15, color: "3A3631", isTextBox: true, margin: 0, valign: "top" });
  const stats = [["97%", "of consumers read reviews for local businesses"], ["74%", "look for reviews from the last three months"], ["47%", "skip businesses with fewer than 20 reviews"]];
  stats.forEach(([v, l], i) => {
    const x = M + i * 2.2, y = 4.3, w = 2.0, h = 1.75;
    card(s, x, y, w, h);
    s.addText(v, { x: x + 0.2, y: y + 0.2, w: w - 0.4, h: 0.7, fontFace: HEAD, fontSize: 30, color: C.ink, isTextBox: true, margin: 0 });
    s.addText(l, { x: x + 0.2, y: y + 0.9, w: w - 0.4, h: 0.8, fontFace: BODY, fontSize: 11, color: "3A3631", isTextBox: true, margin: 0, valign: "top" });
  });
  s.addText("Google Business Profile Help; BrightLocal Local Consumer Review Survey 2026.", { x: M, y: 6.2, w: 6.6, h: 0.3, fontFace: BODY, fontSize: 9, color: C.muted, isTextBox: true, margin: 0 });
  // map pack
  const px = 7.7, py = 1.5, pw = 4.95, ph = 4.3;
  card(s, px, py, pw, ph);
  s.addShape(pres.ShapeType.roundRect, { x: px + 0.3, y: py + 0.3, w: pw - 0.6, h: 0.45, fill: { color: C.paper }, line: { color: C.line, width: 0.75 }, rectRadius: 0.22 });
  s.addText(QUERY || `${CITY === "[City]" ? "dinner" : CITY.toLowerCase()} near me`, { x: px + 0.55, y: py + 0.3, w: pw - 1, h: 0.45, fontFace: BODY, fontSize: 12, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
  const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
  const rows = COMPETITORS.length
    ? [...COMPETITORS.map((c) => [c.name, `${Number(c.rating).toFixed(1)}  ${stars(c.rating)}  (${c.count})  ·  ${c.note || ""}`, false]), [NAME, `${RATING}  ${stars(Number(RATING) || 0)}  (${COUNT})  ·  Last review ${LAST}`, true]]
    : [["Trattoria on Fifth", "4.3  ★★★★☆  (58)  ·  Last review 3 months ago", false], [NAME, "4.6  ★★★★★  (612)  ·  87 reviews last month", true], ["Nonna's Kitchen", "4.4  ★★★★☆  (131)  ·  Last review 5 weeks ago", false]];
  const step = rows.length > 3 ? 0.78 : 0.95;
  rows.forEach(([n, d, you], i) => {
    const y = py + 1.0 + i * step;
    if (you) s.addShape(pres.ShapeType.roundRect, { x: px + 0.2, y: y - 0.1, w: pw - 0.4, h: 0.9, fill: { color: C.accentSoft }, line: { color: C.accentSoft, width: 0 }, rectRadius: 0.12 });
    s.addShape(pres.ShapeType.ellipse, { x: px + 0.35, y: y + 0.12, w: 0.45, h: 0.45, fill: { color: you ? C.accent : C.paper2 }, line: { color: you ? C.accent : C.paper2, width: 0 } });
    s.addText(n, { x: px + 0.95, y: y, w: pw - 1.3, h: 0.35, fontFace: BODY, fontSize: 13, bold: !!you, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    if (you) {
      s.addShape(pres.ShapeType.roundRect, { x: px + 0.95 + Math.min(3.0, n.length * 0.095) + 0.15, y: y + 0.05, w: 0.6, h: 0.26, fill: { color: C.accent }, line: { color: C.accent, width: 0 }, rectRadius: 0.13 });
      s.addText("YOU", { x: px + 0.95 + Math.min(3.0, n.length * 0.095) + 0.15, y: y + 0.05, w: 0.6, h: 0.26, fontFace: BODY, fontSize: 8, bold: true, color: C.white, align: "center", isTextBox: true, margin: 0, valign: "middle" });
    }
    s.addText(d, { x: px + 0.95, y: y + 0.36, w: pw - 1.2, h: 0.3, fontFace: BODY, fontSize: 10, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
  });
  s.addText(COMPETITORS.length ? "Ratings and counts from Google, checked before this visit. Map position also depends on relevance and distance." : "Illustration. Positions on the map depend on relevance, distance and prominence.", { x: px + 0.3, y: py + ph - 0.45, w: pw - 0.6, h: 0.3, fontFace: BODY, fontSize: 8, color: C.muted, isTextBox: true, margin: 0 });
  foot(s);
  s.addNotes("Do not promise revenue. The Google sentence is a direct quote from Google's help page on local ranking. The map is an illustration.");
}
// 3b the gap: rooms they compete with, side by side
if (BENCHMARKS.length) {
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, "The gap", 0.7);
  title(s, GAP_TITLE, 1.05, { size: 32, h: 0.9, w: 11.5 });
  const colW = 5.95, colY = 2.15, colH = 3.35;
  // left: the benchmarks
  card(s, M, colY, colW, colH);
  s.addText("RESTAURANTS PEOPLE KEEP FINDING", { x: M + 0.35, y: colY + 0.28, w: colW - 0.7, h: 0.3, fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1.5, color: C.muted, isTextBox: true, margin: 0 });
  BENCHMARKS.forEach((b, i) => {
    const y = colY + 0.72 + i * 0.78;
    s.addText(b.name, { x: M + 0.35, y, w: colW - 2.0, h: 0.28, fontFace: BODY, fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
    s.addText(b.detail || "", { x: M + 0.35, y: y + 0.27, w: colW - 2.0, h: 0.25, fontFace: BODY, fontSize: 10.5, color: C.muted, isTextBox: true, margin: 0 });
    s.addText(String(b.perMonth), { x: M + colW - 1.6, y: y - 0.05, w: 1.25, h: 0.4, fontFace: HEAD, fontSize: 26, color: C.accent, align: "right", isTextBox: true, margin: 0 });
    s.addText("reviews a month", { x: M + colW - 1.9, y: y + 0.33, w: 1.55, h: 0.22, fontFace: BODY, fontSize: 9, color: C.muted, align: "right", isTextBox: true, margin: 0 });
    if (i < BENCHMARKS.length - 1) s.addShape(pres.ShapeType.line, { x: M + 0.35, y: y + 0.62, w: colW - 0.7, h: 0, line: { color: C.line, width: 0.75 } });
  });
  if (BENCHMARK_NOTE) s.addText(BENCHMARK_NOTE, { x: M + 0.35, y: colY + colH - 0.75, w: colW - 0.7, h: 0.6, fontFace: BODY, fontSize: 9.5, color: C.muted, isTextBox: true, margin: 0, valign: "top" });
  // right: them today
  const rx = M + colW + 0.4;
  card(s, rx, colY, colW, colH, C.paper2, C.ink);
  s.addText(`${NAME.toUpperCase()} TODAY`, { x: rx + 0.35, y: colY + 0.28, w: colW - 0.7, h: 0.3, fontFace: BODY, fontSize: 10.5, bold: true, charSpacing: 1.5, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(PER_MONTH || "—", { x: rx + 0.35, y: colY + 0.6, w: 2.4, h: 0.75, fontFace: HEAD, fontSize: 40, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(`reviews a month${PER_MONTH_BASIS ? "\n" + PER_MONTH_BASIS : ""}`, { x: rx + 2.75, y: colY + 0.6, w: colW - 3.1, h: 0.75, fontFace: BODY, fontSize: 10, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
  s.addShape(pres.ShapeType.line, { x: rx + 0.35, y: colY + 1.45, w: colW - 0.7, h: 0, line: { color: C.lineStrong || "CFC7B6", width: 0.75 } });
  s.addText(TODAY_FACTS.map((t, i) => ({ text: t, options: { bullet: { code: "25CF" }, breakLine: i < TODAY_FACTS.length - 1, paraSpaceAfter: 7 } })), { x: rx + 0.35, y: colY + 1.6, w: colW - 0.7, h: colH - 1.85, fontFace: BODY, fontSize: 12.5, color: "3A3631", isTextBox: true, margin: 0, valign: "top" });
  // bridge
  const by = colY + colH + 0.3;
  s.addShape(pres.ShapeType.roundRect, { x: M, y: by, w: W - 2 * M, h: 1.15, fill: { color: C.dark }, line: { color: C.dark, width: 0 }, rectRadius: 0.18 });
  s.addText("WHAT CHANGES", { x: M + 0.4, y: by, w: 1.5, h: 1.15, fontFace: BODY, fontSize: 10, bold: true, charSpacing: 1.5, color: C.gold, isTextBox: true, margin: 0, valign: "middle" });
  [
    "Every table gets the same ask, on the guest\u2019s own phone, at the moment they are happiest.",
    "Every new review read and summarized once a month, with the complaints counted.",
    "Replies drafted for the reviews that need one, so none of them sit unanswered.",
  ].forEach((t, i) => {
    s.addText(t, { x: M + 2.1 + i * 3.45, y: by, w: 3.25, h: 1.15, fontFace: BODY, fontSize: 11.5, color: "D9DED9", isTextBox: true, margin: 0, valign: "middle" });
  });
  foot(s);
  s.addNotes("Read the three numbers on the left, then their own. If they say those rooms are bigger, agree: part of the gap is seats. The card is the lever a smaller room controls, because it raises the share of guests who leave a review.");
}
// 4 how
{
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, "How it works", 0.75);
  title(s, "Three steps. One new habit.", 1.1, { size: 36, h: 1 });
  const steps = [["01", "Server drops the card with the check", "It lives in the check presenter. One optional line, then walk away."], ["02", "Guest taps, the review screen opens", "iPhone or Android, no app. A link pops up, they tap it, your Google review form opens. About a minute."], ["03", "You get the report every month", "Every new review read and summarized: what guests love, what to fix, who got named, drafted replies."]];
  steps.forEach(([n, t, b], i) => {
    const x = M + i * 4.05, y = 2.4, w = 3.75, h = 3.6;
    card(s, x, y, w, h);
    s.addText(n, { x: x + 0.35, y: y + 0.3, w: 1, h: 0.3, fontFace: "Courier New", fontSize: 12, color: C.accent, isTextBox: true, margin: 0 });
    s.addText(t, { x: x + 0.35, y: y + 0.7, w: w - 0.7, h: 1.2, fontFace: HEAD, fontSize: 22, color: C.ink, isTextBox: true, margin: 0, valign: "top" });
    s.addText(b, { x: x + 0.35, y: y + 1.95, w: w - 0.7, h: 1.5, fontFace: BODY, fontSize: 14, color: C.muted, isTextBox: true, margin: 0, valign: "top" });
  });
  foot(s);
  s.addNotes("If they ask about older iPhones: iPhone 7, 8 and X need the NFC reader in Control Center; the QR code on the back covers everyone else.");
}
// 5 your card
{
  const s = pres.addSlide(); bg(s, C.white);
  eyebrow(s, "Your card", 0.65);
  title(s, "Looks like it belongs on your table.", 0.95, { size: 32, h: 0.9, w: 7.5 });
  s.addText("Credit-card size, printed both sides, NFC inside and a QR code on the back. Pick one, or send us your own idea.", { x: 8.6, y: 0.95, w: 4.05, h: 0.9, fontFace: BODY, fontSize: 12, color: C.muted, align: "right", isTextBox: true, margin: 0, valign: "top" });
  const cw = 2.85, ch = cw * (59.98 / 91.6);
  ["classic", "noir", "brand", "logo"].forEach((t, i) => {
    const x = M + i * (cw + 0.2);
    s.addImage({ path: img(`your-restaurant/${t}-front.png`), x, y: 2.1, w: cw, h: ch, rounding: false, shadow: { type: "outer", color: "000000", blur: 10, offset: 4, angle: 90, opacity: 0.2 } });
    s.addText(["Classic", "Noir", "Brand color", "Logo forward"][i], { x, y: 2.1 + ch + 0.1, w: cw, h: 0.3, fontFace: BODY, fontSize: 11, color: C.muted, align: "center", isTextBox: true, margin: 0 });
  });
  s.addImage({ path: img("your-restaurant/classic-back.png"), x: M, y: 4.55, w: 3.6, h: 3.6 * (59.98 / 91.6), shadow: { type: "outer", color: "000000", blur: 10, offset: 4, angle: 90, opacity: 0.2 } });
  s.addText("The back explains the tap for iPhone and Android and carries a QR code for anyone without NFC. Every card points to a short link we manage, so if your Google listing ever changes, the cards keep working.", { x: 4.7, y: 4.7, w: 7.9, h: 1.6, fontFace: BODY, fontSize: 15, color: "3A3631", isTextBox: true, margin: 0, valign: "top" });
  foot(s);
  s.addNotes("To show their logo: open /pitch on the website, upload the logo, Save preview as image, and paste that image over these card pictures. Hand them a printed sample card here.");
}
// 6 report
{
  const s = pres.addSlide(); bg(s, C.dark);
  eyebrow(s, "The monthly report", 0.75, true);
  title(s, "What your guests are actually saying.", 1.1, { size: 34, color: C.paper, w: 5.8, h: 1.6 });
  const items = ["What guests love, ranked by how often it comes up", "Complaints grouped by cause, each with a fix", "Servers and dishes mentioned by name", "Priority actions and drafted replies to negative reviews", "10 free replacement cards every month"];
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "25A0" }, breakLine: i < items.length - 1, paraSpaceAfter: 8 } })), { x: M, y: 2.9, w: 5.6, h: 3.2, fontFace: BODY, fontSize: 15, color: "D9DED9", isTextBox: true, margin: 0, valign: "top" });
  s.addImage({ path: img("print/sample-report-onepager.png"), x: 7.0, y: 0.55, w: 5.65, h: 5.65 * (11 / 8.5), shadow: { type: "outer", color: "000000", blur: 16, offset: 6, angle: 90, opacity: 0.5 } });
  foot(s, true);
  s.addNotes("Hand over the printed one-page sample here. Point at the staff section and the priority actions.");
}
// 6b the full report the owner receives
{
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, "In your inbox", 0.75);
  title(s, "This is what arrives on the first of the month.", 1.1, { size: 32, h: 1.3, w: 6.2 });
  const items = ["One page you can read standing up, plus the full report", "Every new review read, grouped by what guests kept saying", "Each complaint with a fix, ranked by what costs you most", "Dishes and servers guests named, counted", "Replies drafted for the reviews that need one"];
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "25A0" }, breakLine: i < items.length - 1, paraSpaceAfter: 7 } })), { x: M, y: 2.6, w: 5.9, h: 2.9, fontFace: BODY, fontSize: 13.5, color: "3A3631", isTextBox: true, margin: 0, valign: "top" });
  s.addText("Example from another restaurant, so you can see the format. Yours is built from your own Google reviews.", { x: M, y: 5.6, w: 5.9, h: 0.6, fontFace: BODY, fontSize: 10.5, color: C.muted, isTextBox: true, margin: 0, valign: "top" });
  s.addImage({ path: img("print/sample-report-onepager.png"), x: 7.2, y: 0.6, w: 5.5, h: 5.5 * (11 / 8.5), shadow: { type: "outer", color: "000000", blur: 14, offset: 5, angle: 90, opacity: 0.25 } });
  foot(s);
  s.addNotes("Hand them the printed one-pager here and let them hold it while you talk.");
}
// 8 pricing
{
  const s = pres.addSlide(); bg(s, C.paper);
  eyebrow(s, "Pricing", 0.75);
  title(s, "Simple enough to explain to your accountant.", 1.1, { size: 34, h: 1, w: 10 });
  const plans = [["Cards", "$15", "per card, one time", "Your logo or one of four designs. Printed both sides. Yours to keep.", false], ["Monthly report", "$50", "per month, cancel anytime", "Every review read and summarized. 10 free replacement cards every month.", true]];
  plans.forEach(([n, pr, u, b, hi], i) => {
    const x = M + i * 6.1, y = 2.3, w = 5.85, h = 2.75;
    card(s, x, y, w, h, C.white, hi ? C.accent : C.line);
    s.addText(String(n).toUpperCase(), { x: x + 0.4, y: y + 0.3, w: w - 0.8, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2, color: hi ? C.accent : C.muted, isTextBox: true, margin: 0 });
    s.addText(pr, { x: x + 0.4, y: y + 0.65, w: 2.2, h: 1.1, fontFace: HEAD, fontSize: 54, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(u, { x: x + 2.6, y: y + 0.65, w: w - 3, h: 1.1, fontFace: BODY, fontSize: 13, color: C.muted, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(b, { x: x + 0.4, y: y + 1.85, w: w - 0.8, h: 0.8, fontFace: BODY, fontSize: 14, color: "3A3631", isTextBox: true, margin: 0, valign: "top" });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 5.35, w: W - 2 * M, h: 0.85, fill: { color: C.accentSoft }, line: { color: C.accentSoft, width: 0 }, rectRadius: 0.15 });
  s.addText(OFFER, { x: M + 0.35, y: 5.35, w: W - 2 * M - 0.7, h: 0.85, fontFace: BODY, fontSize: 16, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  foot(s);
  s.addNotes("Edit the offer line for this restaurant. Do the math with their own numbers: $50 a month against what one extra table a week is worth to them.");
}
// 9 next
{
  const s = pres.addSlide(); bg(s, C.dark);
  eyebrow(s, "Next step", 1.4, true);
  s.addText(OWNER ? `Tap this card with your phone, ${OWNER}.` : "Tap this card with your phone.", { x: M, y: 1.85, w: 6.2, h: 2.2, fontFace: HEAD, fontSize: 42, color: C.paper, isTextBox: true, margin: 0, valign: "top" });
  s.addText("That is the whole guest experience. If it feels right, we can have cards with your logo on your tables in about three weeks.", { x: M, y: 4.2, w: 5.8, h: 1.1, fontFace: BODY, fontSize: 17, color: "B9C2BC", isTextBox: true, margin: 0, valign: "top" });
  s.addText(`${FOUNDER} · ${BRAND}\n${EMAIL}`, { x: M, y: 5.5, w: 5.8, h: 0.9, fontFace: BODY, fontSize: 15, color: "D9DED9", isTextBox: true, margin: 0, valign: "top" });
  s.addImage({ path: img("your-restaurant/logo-front.png"), x: 7.3, y: 1.6, w: 5.4, h: 5.4 * (59.98 / 91.6), rotate: 3, shadow: { type: "outer", color: "000000", blur: 18, offset: 8, angle: 90, opacity: 0.45 } });
  foot(s, true);
  s.addNotes("Hand them the demo card and let them tap it with their own phone. Then stop talking.");
}

const out = path.resolve(__dirname, "..", "..", "deck", `pitch-deck-${slug}.pptx`);
fs.mkdirSync(path.dirname(out), { recursive: true });
pres.writeFile({ fileName: out }).then((f) => console.log("wrote", f));

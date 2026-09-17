import { chromium } from "playwright";
const base = process.env.BASE_URL || "http://localhost:3000";
const routes = ["/", "/sample-report", "/order", "/pricing", "/faq", "/demo", "/how-it-works", "/guides/google-review-link", "/legal/privacy", "/legal/terms", "/legal/review-policy", "/contact", "/order/success", "/dashboard"];
const browser = await chromium.launch();
for (const w of [1280, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
  for (const r of routes) {
    const name = (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "_")) + `_${w}`;
    try {
      const res = await page.goto(base + r, { waitUntil: "networkidle", timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      // trigger lazy/motion: scroll through
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(400);
      await page.screenshot({ path: `/tmp/shots/${name}.png`, fullPage: true });
      const h = await page.evaluate(() => document.body.scrollHeight);
      console.log(`${res?.status()} ${r} @${w} height=${h}`);
    } catch (e) { console.log(`ERR ${r} @${w}: ${e.message.slice(0, 120)}`); }
  }
  if (errors.length) console.log(`console errors @${w}:`, [...new Set(errors)].slice(0, 10));
  await ctx.close();
}
await browser.close();

import { chromium } from "playwright";
const base = process.env.BASE_URL || "http://localhost:3000";
const route = process.argv[2] || "/";
const width = Number(process.argv[3] || 390);
const chunks = Number(process.argv[4] || 4);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(base + route, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
const name = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
for (let i = 0; i < chunks; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * 844);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/shots/chunk_${name}_${width}_${i}.png` });
}
await browser.close();
console.log("done");

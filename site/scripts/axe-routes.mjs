// Runs axe-core accessibility checks on every route. Usage: node scripts/axe-routes.mjs
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
const base = process.env.BASE_URL || "http://localhost:3000";
const routes = ["/", "/sample-report", "/order", "/pricing", "/faq", "/demo", "/how-it-works", "/guides/google-review-link", "/legal/privacy", "/legal/terms", "/legal/review-policy", "/contact", "/order/success", "/dashboard"];
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
let total = 0;
for (const r of routes) {
  await page.goto(base + r, { waitUntil: "networkidle" });
  const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"]).analyze();
  const v = res.violations.filter((x) => x.impact !== "minor");
  total += v.length;
  console.log(`${r}: ${v.length} violations`);
  for (const x of v) console.log(`  [${x.impact}] ${x.id}: ${x.help} (${x.nodes.length} nodes) e.g. ${x.nodes[0]?.target?.join(" ")}`);
}
await browser.close();
console.log(`TOTAL ${total}`);

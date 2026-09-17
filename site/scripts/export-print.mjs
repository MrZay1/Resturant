// Exports letter-size PDFs (staff guide, report one-pager) from the running dev server.
// Usage: node scripts/export-print.mjs [--name "Restaurant Name"]   (BASE_URL env optional)
import { chromium } from "playwright";
import { mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";

const base = process.env.BASE_URL || "http://localhost:3000";
const args = process.argv.slice(2);
const nameIdx = args.indexOf("--name");
const name = nameIdx >= 0 ? args[nameIdx + 1] : "";
const outDir = path.resolve(process.cwd(), "..", "cards", "exports", "print");
mkdirSync(outDir, { recursive: true });

const pages = [
  { slug: "staff-guide", url: `/print/staff-guide${name ? `?name=${encodeURIComponent(name)}` : ""}` },
  { slug: "sample-report-onepager", url: "/print/report-onepager" },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const p of pages) {
  await page.goto(base + p.url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(outDir, `${p.slug}${name ? "-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : ""}.pdf`);
  await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  const png = file.replace(/\.pdf$/, ".png");
  // Screenshot the .page element, not the viewport: the page is 8.5in wide and a
  // fullPage shot leaves a wide white margin that shows up in the pitch deck.
  const el = await page.$(".page");
  if (el) await el.screenshot({ path: png });
  else await page.screenshot({ path: png, fullPage: true });
  console.log("wrote", file);
  // The pitch deck shows the report one-pager, so keep a servable copy in public/.
  if (p.slug === "sample-report-onepager") {
    const pub = path.resolve(process.cwd(), "public", "_samples");
    mkdirSync(pub, { recursive: true });
    copyFileSync(png, path.join(pub, "report-onepager.png"));
    console.log("wrote", path.join(pub, "report-onepager.png"));
  }
}
await browser.close();

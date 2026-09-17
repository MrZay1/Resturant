// Decodes the QR code in exported card-back PNGs to prove they scan. Usage: node scripts/verify-qr.mjs
import sharp from "sharp";
import jsQR from "jsqr";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
const root = path.resolve(process.cwd(), "..", "cards", "exports");
const files = [];
for (const d of readdirSync(root)) {
  const dir = path.join(root, d);
  if (!statSync(dir).isDirectory()) continue;
  for (const f of readdirSync(dir)) if (f.endsWith("-back.png")) files.push(path.join(dir, f));
}
let bad = 0;
for (const f of files) {
  const meta = await sharp(f).metadata();
  // Decode the QR region only (right side of the card back), the way a phone camera framed on the code would.
  const region = { left: Math.round(meta.width * 0.6), top: Math.round(meta.height * 0.12), width: Math.round(meta.width * 0.36), height: Math.round(meta.height * 0.55) };
  const { data, info } = await sharp(f).extract(region).flatten({ background: "#ffffff" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const res = jsQR(new Uint8ClampedArray(data.buffer, data.byteOffset, data.length), info.width, info.height, { inversionAttempts: "dontInvert" });
  console.log(`${path.relative(root, f)}: ${res ? "OK -> " + res.data : "NOT DECODED"}`);
  if (!res) bad++;
}
process.exit(bad ? 1 : 0);

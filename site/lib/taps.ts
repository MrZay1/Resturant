/**
 * Tap recording. Serverless file systems are read-only, so taps are forwarded
 * to a webhook if TAP_WEBHOOK_URL is set (Airtable automation, Zapier, Make,
 * Google Apps Script, or your own endpoint). Otherwise they are logged.
 */
export type TapEvent = {
  slug: string;
  ts: string;
  ua: string;
  referer: string;
  source: string; // "card" | "qr" | "unknown"
  counter?: string; // NTAG counter mirror, if enabled on the card
};

export async function recordTap(ev: TapEvent) {
  const url = process.env.TAP_WEBHOOK_URL;
  if (!url) {
    console.log("[tap]", JSON.stringify(ev));
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...(process.env.TAP_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.TAP_WEBHOOK_SECRET}` } : {}) },
      body: JSON.stringify(ev),
      // bounded so a hung webhook cannot hold the function open indefinitely
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    console.warn("[tap] webhook failed", (e as Error).message);
  }
}

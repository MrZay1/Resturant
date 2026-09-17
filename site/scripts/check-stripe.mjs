// Confirms the key in .env.local works, without touching anything in the account.
// Usage: node scripts/check-stripe.mjs
import { readFileSync } from "node:fs";
import Stripe from "stripe";

let key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    key = env.match(/^STRIPE_SECRET_KEY=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!key) {
  console.log("No STRIPE_SECRET_KEY in .env.local yet. Paste it after the = sign and run this again.");
  process.exit(1);
}
const mode = key.startsWith("sk_live_") ? "LIVE" : key.startsWith("sk_test_") ? "test" : "unknown";
try {
  const stripe = new Stripe(key);
  const acct = await stripe.accounts.retrieve();
  const name = acct.settings?.dashboard?.display_name || acct.business_profile?.name || acct.id;
  console.log(`Connected to Stripe account "${name}" in ${mode} mode.`);
  console.log(`Charges enabled: ${acct.charges_enabled ? "yes" : "no"}. Payouts enabled: ${acct.payouts_enabled ? "yes" : "no"}.`);
  if (mode === "test") console.log("Test card for checkout: 4242 4242 4242 4242, any future date, any CVC.");
} catch (e) {
  console.log("Stripe rejected the key:", e.message);
  process.exit(1);
}

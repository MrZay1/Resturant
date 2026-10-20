// Offline billing checks. No Stripe calls, emails, or database writes.
const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const base = path.resolve(__dirname, "..");
// Do not inherit external delivery destinations from the developer's shell.
const deliveryKeys = ["ORDER_EMAIL_TO", "ORDER_WEBHOOK_URL", "LEAD_WEBHOOK_URL", "BLOB_READ_WRITE_TOKEN"];
const deliveryEnv = Object.fromEntries(deliveryKeys.map((key) => [key, process.env[key]]));
for (const key of deliveryKeys) delete process.env[key];
after(() => {
  for (const [key, value] of Object.entries(deliveryEnv)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

function load(file, mocks = {}) {
  const filename = path.join(base, file);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  new Function("require", "module", "exports", code)((name) => {
    if (name in mocks) return mocks[name];
    if (name.startsWith("@/")) return load(name.slice(2) + ".ts", mocks);
    if (name.startsWith(".")) return load(path.relative(base, path.resolve(path.dirname(filename), name)) + ".ts", mocks);
    return require(name);
  }, mod, mod.exports);
  return mod.exports;
}
const { priceOrder, orderLineItems } = load("lib/orderPlans.ts");
test("all package quantities match Stripe totals; only $79 service renews", () => {
  for (const plan of ["starter", "regulars"]) {
    for (let cards = 10; cards <= 200; cards++) {
      const amounts = priceOrder(plan, cards);
      const items = orderLineItems(plan, cards, "test artwork");
      assert.equal(amounts.today, 149 + (cards - 10) * 15 + (plan === "regulars" ? 79 : 0));
      assert.equal(items.reduce((n, i) => n + i.quantity * i.price_data.unit_amount, 0), amounts.today * 100);
      const renewals = items.filter((i) => i.price_data.recurring);
      assert.equal(renewals.length, plan === "regulars" ? 1 : 0);
      if (renewals.length) {
        assert.equal(renewals[0].quantity, 1);
        assert.equal(renewals[0].price_data.unit_amount, 7900);
        assert.equal(renewals[0].price_data.recurring.interval, "month");
      }
    }
  }
});
test("invalid package quantities fail", () => {
  for (const cards of [0, 9, 201, 10.5, NaN, Infinity]) assert.throws(() => priceOrder("starter", cards));
  assert.throws(() => priceOrder("bogus", 10));
});
const validBody = {
  cards: 10, plan: "starter",
  design: { template: "classic", restaurantName: "Test Restaurant", headline: "Tap to review", subline: "", brandColor: "#123456", showStars: false, hasLogo: false },
  contact: { name: "Test Owner", email: "owner@example.com" },
};
test("checkout validates package and controls price, mode, and metadata", async () => {
  const captured = [];
  const { POST } = load("app/api/checkout/route.ts", {
    "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) }, after: () => {} },
    "@vercel/blob": { put: () => { throw Error("Unexpected upload"); } },
    "@/lib/stripe": { getStripe: () => ({ checkout: { sessions: { create: async (params) => { captured.push(params); return { id: "cs_test_offline", url: "https://checkout.stripe.com/offline" }; } } } }) },
    "@/lib/apiGuard": { guard: () => null },
    "@/lib/email": { sendEmail: () => { throw Error("Unexpected email"); }, parseDataUrl: () => null, extensionFor: () => "png" },
    "@/lib/designEmail": { renderDesignEmail: () => ({}) },
  });
  for (const plan of ["starter", "regulars"]) {
    const res = await POST(new Request("http://localhost/api/checkout", { method: "POST", body: JSON.stringify({ ...validBody, plan, cards: 20, today: 1, monthly: 1, report: false }) }));
    assert.equal(res.status, 200);
    const params = captured.at(-1);
    assert.equal(params.mode, plan === "regulars" ? "subscription" : "payment");
    assert.equal(params.metadata.plan, plan);
    assert.equal(params.metadata.monthly_amount, plan === "regulars" ? "79" : "0");
    assert.equal(params.metadata.report, String(plan === "regulars"));
    assert.equal(params.line_items.reduce((n, i) => n + i.quantity * i.price_data.unit_amount, 0), plan === "regulars" ? 37800 : 29900);
    assert.match(params.cancel_url, new RegExp(`plan=${plan}&cards=20`));
    assert.deepEqual(plan === "regulars" ? params.subscription_data.metadata : params.payment_intent_data.metadata, params.metadata);
  }
  for (const body of [{ ...validBody, plan: "free" }, { ...validBody, cards: 9 }, { ...validBody, cards: 201 }, { ...validBody, cards: 10.5 }, { cards: 10, report: true }]) {
    assert.equal((await POST(new Request("http://localhost/api/checkout", { method: "POST", body: JSON.stringify(body) }))).status, 400);
  }
  assert.equal(captured.length, 2);
});
test("new and historical order emails keep the correct service and price", () => {
  const { renderOrderEmail } = load("lib/orderEmail.ts", { "@/components/card/cardSpec": { TEMPLATE_META: {} } });
  const order = { ts: "2026-10-20T12:00:00Z", restaurant: "Test", cards: 10, amount_total: 228, report: true, shipping: null, link_mode: "find", restaurant_address: "", plan: "regulars", monthly_amount: 79 };
  assert.match(renderOrderEmail(order).text, /Regulars Program, \$79.00\/month/);
  assert.match(renderOrderEmail({ ...order, plan: null, monthly_amount: null }).text, /Monthly report, \$50.00\/month/);
  assert.match(renderOrderEmail({ ...order, plan: "starter", report: false, monthly_amount: 0 }).text, /No subscription/);
});

test("webhook persists package snapshots and retries failed storage; legacy orders remain legacy", async () => {
  const previous = process.env.STRIPE_WEBHOOK_SECRET;
  process.env.STRIPE_WEBHOOK_SECRET = "offline-signing-secret";
  try {
    for (const plan of ["starter", "regulars", null]) {
      let saved;
      let failStorage = false;
      const event = { type: "checkout.session.completed", data: { object: {
        id: "cs_test_offline", amount_total: 22800, currency: "usd", mode: "subscription",
        metadata: { restaurant: "Test", cards: "10", report: String(plan !== "starter"), ...(plan ? { plan, monthly_amount: plan === "regulars" ? "79" : "0" } : {}) },
      } } };
      const { POST } = load("app/api/stripe/webhook/route.ts", {
        "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
        "@/lib/stripe": { getStripe: () => ({ webhooks: { constructEvent: () => event } }) },
        "@/lib/orders": { upsertOrderFromStripe: async (input) => { if (failStorage) throw Error("offline simulated outage"); saved = input; } },
        "@/lib/email": { sendEmail: async () => ({ ok: true }) },
        "@/lib/orderEmail": { renderOrderEmail: () => ({}) },
      });
      const previousLog = console.log;
      console.log = () => {};
      let response;
      try { response = await POST(new Request("http://localhost/webhook", { method: "POST", body: "offline fixture" })); }
      finally { console.log = previousLog; }
      assert.equal(response.status, 200);
      assert.equal(saved.plan, plan);
      assert.equal(saved.monthlyAmount, plan === "regulars" ? 79 : plan === "starter" ? 0 : null);
      failStorage = true;
      const previousError = console.error;
      console.error = () => {};
      try { response = await POST(new Request("http://localhost/webhook", { method: "POST", body: "offline fixture" })); }
      finally { console.error = previousError; }
      assert.equal(response.status, 500);
    }
  } finally {
    if (previous === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
    else process.env.STRIPE_WEBHOOK_SECRET = previous;
  }
});

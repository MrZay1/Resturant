#!/usr/bin/env node
// Inserts one realistic sample order so you can see how it looks in /admin
// without needing Stripe wired up yet. Safe to run more than once — each run
// makes a new row with its own fake stripe_session_id.
//
// Usage: node --env-file=.env.local scripts/seed-test-order.mjs

import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Run with:");
  console.error("  node --env-file=.env.local scripts/seed-test-order.mjs");
  process.exit(1);
}

const sql = postgres(url, { ssl: "require", max: 1 });

const fakeSessionId = "cs_test_seed_" + Date.now();

const order = {
  stripeSessionId: fakeSessionId,
  stripeSubscriptionId: "sub_test_seed_" + Date.now(),
  stripeCustomerId: "cus_test_seed",
  restaurantName: "Nonna's Trattoria",
  restaurantAddress: "482 Ponce De Leon Ave NE, Atlanta, GA 30308",
  cards: 250,
  hasReport: true,
  amountTotal: 299.0,
  template: "classic",
  headline: "Loved dinner?",
  subline: "Tell the world in 10 seconds.",
  brandColor: "#7a2e2e",
  showStars: true,
  hasLogo: true,
  logoUrl: "https://placehold.co/400x400/7a2e2e/ffffff.png?text=NT",
  logoFilename: "nonnas-logo.png",
  linkMode: "direct",
  googleReviewLink: "https://g.page/r/example-review-link/review",
  contactName: "Maria Rossi",
  contactEmail: "maria@nonnastrattoria.com",
  contactPhone: "(404) 555-0142",
  shipping: {
    line1: "482 Ponce De Leon Ave NE",
    line2: "",
    city: "Atlanta",
    state: "GA",
    postal_code: "30308",
    country: "US",
  },
  notes: "Please rush — we open in 2 weeks and want cards on every table for opening night.",
};

const rows = await sql`
  insert into orders (
    stripe_session_id, stripe_subscription_id, stripe_customer_id,
    restaurant_name, restaurant_address, cards, has_report, amount_total,
    template, headline, subline, brand_color, show_stars, has_logo, logo_url, logo_filename,
    link_mode, google_review_link,
    contact_name, contact_email, contact_phone,
    shipping_line1, shipping_line2, shipping_city, shipping_state, shipping_postal_code, shipping_country,
    notes
  ) values (
    ${order.stripeSessionId}, ${order.stripeSubscriptionId}, ${order.stripeCustomerId},
    ${order.restaurantName}, ${order.restaurantAddress}, ${order.cards}, ${order.hasReport}, ${order.amountTotal},
    ${order.template}, ${order.headline}, ${order.subline}, ${order.brandColor}, ${order.showStars}, ${order.hasLogo}, ${order.logoUrl}, ${order.logoFilename},
    ${order.linkMode}, ${order.googleReviewLink},
    ${order.contactName}, ${order.contactEmail}, ${order.contactPhone},
    ${order.shipping.line1}, ${order.shipping.line2}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.postal_code}, ${order.shipping.country},
    ${order.notes}
  )
  returning id, restaurant_name
`;

console.log(`Inserted test order #${rows[0].id} for "${rows[0].restaurant_name}".`);
console.log("Go look at it at /admin/orders");

await sql.end();

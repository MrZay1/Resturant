#!/usr/bin/env node
// One-off dev helper: creates a test customer login + a linked test order so
// the dashboard has something real to show while testing. Not part of the
// app - safe to delete after testing (run scripts/_dev-cleanup-test-account.mjs
// or just delete the two rows by email).
//
// Usage: node --env-file=.env.local scripts/_dev-seed-test-account.mjs

import bcrypt from "bcryptjs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const TEST_EMAIL = "test-dashboard@tblnt.dev";
const TEST_PASSWORD = "TestPass123!";

const sql = postgres(url, { ssl: "require", max: 1 });
const hash = await bcrypt.hash(TEST_PASSWORD, 12);

try {
  const [customer] = await sql`
    insert into customers (email, password_hash)
    values (${TEST_EMAIL}, ${hash})
    on conflict (email) do update set password_hash = excluded.password_hash
    returning id
  `;

  await sql`
    insert into orders (
      stripe_session_id, status, restaurant_name, restaurant_address, cards, has_report,
      amount_total, template, contact_name, contact_email, google_review_link, customer_id
    ) values (
      ${"cs_test_dev_seed_" + customer.id}, 'active', 'Test Bistro', '123 Main St, Stonecrest, GA', 25, true,
      425.00, 'noir', 'Test Owner', ${TEST_EMAIL}, 'https://search.google.com/local/writereview?placeid=TEST123', ${customer.id}
    )
    on conflict (stripe_session_id) do update set customer_id = excluded.customer_id
  `;

  console.log(`Test account ready.`);
  console.log(`  Email:    ${TEST_EMAIL}`);
  console.log(`  Password: ${TEST_PASSWORD}`);
  console.log(`Sign in at /login once npm run dev is running.`);
} catch (err) {
  console.error("Failed to seed test account:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}

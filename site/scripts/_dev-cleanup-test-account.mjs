#!/usr/bin/env node
// Removes the test customer/order created by _dev-seed-test-account.mjs.
// Usage: node --env-file=.env.local scripts/_dev-cleanup-test-account.mjs

import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const TEST_EMAIL = "test-dashboard@tblnt.dev";
const sql = postgres(url, { ssl: "require", max: 1 });

try {
  await sql`delete from orders where contact_email = ${TEST_EMAIL}`;
  await sql`delete from customers where email = ${TEST_EMAIL}`;
  console.log("Test account and order removed.");
} catch (err) {
  console.error("Failed to clean up test account:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}

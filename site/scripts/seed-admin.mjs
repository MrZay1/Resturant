#!/usr/bin/env node
// Creates (or updates the password for) the single admin account used to log
// into /admin. Reads ADMIN_EMAIL and ADMIN_PASSWORD from the environment.
//
// Usage: node --env-file=.env.local scripts/seed-admin.mjs

import bcrypt from "bcryptjs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}
if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (in .env.local or the shell) before running this.");
  process.exit(1);
}

const sql = postgres(url, { ssl: "require", max: 1 });
const hash = await bcrypt.hash(password, 12);

try {
  await sql`
    insert into admin_users (email, password_hash)
    values (${email.toLowerCase().trim()}, ${hash})
    on conflict (email) do update set password_hash = excluded.password_hash
  `;
  console.log(`Admin account ready for ${email}. You can log in at /admin/login now.`);
} catch (err) {
  console.error("Failed to seed admin account:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}

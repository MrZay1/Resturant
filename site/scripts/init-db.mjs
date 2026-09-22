#!/usr/bin/env node
// Runs db/schema.sql against DATABASE_URL. Safe to run more than once -
// every statement in schema.sql is a `create table/index if not exists`.
//
// Usage: DATABASE_URL=postgres://... node scripts/init-db.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import postgres from "postgres";

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(here, "..", "db", "schema.sql");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Export it or put it in site/.env.local and re-run with:");
  console.error("  node --env-file=.env.local scripts/init-db.mjs");
  process.exit(1);
}

const schema = readFileSync(schemaPath, "utf8");
const sql = postgres(url, { ssl: "require", max: 1 });

try {
  await sql.unsafe(schema);
  console.log("Database schema is up to date.");
} catch (err) {
  console.error("Failed to apply schema:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}

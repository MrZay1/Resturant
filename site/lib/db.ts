import postgres from "postgres";

/**
 * A single shared Postgres connection pool. Works with any Postgres provider
 * (Vercel Postgres, Neon, Supabase, Railway, self-hosted) - just needs
 * DATABASE_URL. Kept on globalThis so Next.js dev-mode hot reload does not
 * open a new pool on every file save.
 */
declare global {
  var __tablenoteDb: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Provision a Postgres database and add its connection string " +
        "as DATABASE_URL in your environment (see .env.example)."
    );
  }
  return postgres(url, { ssl: "require", max: 5 });
}

export const sql = globalThis.__tablenoteDb ?? createClient();
if (process.env.NODE_ENV !== "production") globalThis.__tablenoteDb = sql;

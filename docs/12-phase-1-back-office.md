# Phase 1 — Back office setup

What's new: a database-backed order record (created automatically when a Stripe checkout
completes), a `/admin` back office to see and manage every order, and logo files stored
in Blob storage so they're downloadable instead of only existing as an email attachment.

No ORM, no migration framework - just plain SQL in `db/schema.sql` and the lightweight
`postgres` driver, the same one Corey's used on other projects. `DATABASE_URL` is the
only thing that has to point at your actual database; the driver works with any
Postgres provider.

## 1. Get a Postgres database

Any of these work - pick whichever is easiest to manage:

- **Vercel Postgres** (Storage tab in your Vercel project → Create Database → Postgres).
  Vercel fills in `DATABASE_URL` for you automatically when you do this from inside the
  project.
- **Neon** (neon.tech, generous free tier) or **Supabase** (supabase.com) - create a
  project, copy the connection string it gives you.

Either way, you end up with one `DATABASE_URL` value like
`postgres://user:password@host/dbname`.

## 2. Get a Blob store (for logo files)

In your Vercel project: Storage tab → Create Database → Blob. This gives you a
`BLOB_READ_WRITE_TOKEN`. Optional, but without it uploaded logos won't be saved for the
back office (checkout still works fine either way - the "Artwork" email still carries
the logo as an attachment regardless).

## 3. Set environment variables

In Vercel (Project → Settings → Environment Variables) and in `site/.env.local` for
local development, add:

```
DATABASE_URL=...
SESSION_SECRET=...        # generate with: openssl rand -base64 32
BLOB_READ_WRITE_TOKEN=... # from step 2
ADMIN_EMAIL=you@tblnt.com
ADMIN_PASSWORD=...        # a real password - only used once, to seed your login
```

## 4. Create the database tables and your login

Run these once (locally, pointed at the real `DATABASE_URL`, or from Vercel's CLI):

```bash
cd site
node --env-file=.env.local scripts/init-db.mjs      # creates the tables
node --env-file=.env.local scripts/seed-admin.mjs   # creates your admin login
```

`init-db.mjs` is safe to re-run any time - it only creates things that don't already
exist. `seed-admin.mjs` is also safe to re-run: running it again with a new
`ADMIN_PASSWORD` just resets your password.

## 5. Log in

Deploy, then go to `https://<your domain>/admin/login` and sign in with `ADMIN_EMAIL` /
`ADMIN_PASSWORD`. From there:

- `/admin/orders` - every order, searchable by restaurant name, filterable by status
- Click an order to see everything: design choices, the logo (downloadable), contact
  info, shipping address, where the card points, and your own private notes
- Change status with the dropdown (new → design sent → approved → printing → shipped →
  active) - nothing about status changes emails or notifies anyone, it's just your own
  tracking

## What this does not do yet

This is Phase 1 only. It does not touch the card designer, the AI pitch generator, the
customer-facing dashboard, or the AI report engine - those are separate phases. Adding
restaurant-owner login (Phase 5) will reuse the same `admin_users`-style pattern with a
second role, not a rewrite.

## One repo housekeeping note

`site/.git.scaffold-backup` looks like a renamed `.git` folder from an earlier scaffolding
step, sitting next to the real repo history. Worth a look before anyone pushes more
history-rewriting operations, just so nothing gets confused with the real `.git`.

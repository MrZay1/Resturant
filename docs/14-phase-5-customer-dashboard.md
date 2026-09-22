# Phase 5 — Customer login and dashboard

What's new: restaurant owners can create a login right after checkout and sign back in
at `/login` to see a real dashboard at `/dashboard` - their orders, status, Google review
link, and a working "request replacement cards" form. No new environment variables and
no new infrastructure - it reuses the same database, the same session-cookie pattern as
`/admin`, and the same `postgres`/`bcryptjs`/`jose` stack as Phase 1.

## How the account gets created

There is no public "sign up" page anywhere on the site, on purpose. An account always
starts from a real, completed order:

1. A customer finishes checkout and lands on `/order/success`.
2. If Stripe is configured, that page verifies the checkout session is real and complete,
   then shows a "Create your dashboard login" form pre-filled with the email from
   checkout - they just pick a password.
3. Submitting it creates a row in a new `customers` table and links that specific order
   to it immediately. It also links any other past orders that share the same contact
   email, in case the same restaurant had ordered before without an account.
4. They're signed in right away and redirected to `/dashboard`.

If someone skips that step, they can come back later, go to `/login`, and... there's
intentionally no self-serve recovery path yet - see "What this does not do yet" below.

## What the dashboard actually shows

Everything on `/dashboard` is real data pulled from the `orders` table for that signed-in
account - order status, cards ordered, which design, and the Google review link on file.
The "request replacement cards" form is the same working form Phase 1 already had
elsewhere on the site; it emails/webhooks a real lead, it is not a placeholder.

**The monthly AI report panel is intentionally a "coming soon" placeholder.** The report
generator and the Google review pull that would feed it don't exist yet (that was
build-item #4, and it's on hold - see the note below). The dashboard says exactly that
rather than showing fake numbers. Once the report pipeline is built, that panel is the
only piece that needs replacing.

## Database changes

Two additions to `db/schema.sql`, applied the same idempotent way as Phase 1:

```bash
cd site
node --env-file=.env.local scripts/init-db.mjs
```

- A `customers` table (id, email, password_hash) - the same shape as `admin_users`, just
  a second role instead of a second column on the same table, so an owner account can
  never accidentally get admin access.
- An `orders.customer_id` column (nullable, set once an account claims that order).

No new environment variables. Customer sessions reuse `SESSION_SECRET`, just in a
separate cookie (`tn_customer_session`) so an owner session and an admin session never
collide, and `middleware.ts` now gates `/dashboard/*` the same edge-safe way it already
gated `/admin/*`.

## What this does not do yet

- **No password reset.** If an owner forgets their password, the only path right now is
  emailing you. A "forgot password" email flow is a reasonable next addition once this is
  live and someone actually hits it.
- **No self-serve signup outside the post-checkout flow.** That's deliberate - it keeps
  every account tied to a real order - but it does mean a manually-created order (phone
  order, etc.) needs its owner to either go through a checkout session or be created by
  hand.
- **The report panel is a placeholder**, as above - that's build-item #4, currently on
  hold per your call to have your own bot pull the public Google data instead of using
  this site's Google Places integration.

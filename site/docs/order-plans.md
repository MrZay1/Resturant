# Order packages

- Review Starter: $149 once, including 10 cards, setup, QR backup and Google profile check.
- Regulars Program: same $149 package plus $79/month; first month is collected at checkout ($228 for 10 cards).
- Additional cards: $15 each, up to 200 total. US shipping included; existing tax/promotion settings still apply.
- Only the $79 service is recurring. Setup and additional cards appear on the first invoice only.
- The Regulars Program is fulfilled as a managed service after checkout. This release does not implement SMS signup pages, consent storage, or campaign delivery.

## Release

1. Apply `db/migrations/20261020-order-plans.sql` to the target database before deploying. It is additive and idempotent; no historical rows are changed. `db/schema.sql` also includes the columns for fresh installs.
2. Run `node scripts/test-order-plans.cjs`, `npx tsc --noEmit`, and `npm run build`.
3. Deploy the app through the existing GitHub/hosting workflow. No new Stripe credentials or dashboard products are required: checkout builds server-controlled price data in the existing Stripe account.
4. Validate both offers in Stripe test mode before accepting live orders. Verify the one-time Starter payment, $228 initial Regulars invoice, $79 renewal, and a purchase with extra cards. Existing webhook configuration stays the same.

New orders store explicit plan and monthly-price snapshots in Stripe metadata, order records and forwarded payloads. Existing report-only orders retain their original meaning and $50 pricing. Checkout does not modify existing subscriptions. Failed order persistence returns 500 so Stripe retries.

Query links: `/order?plan=starter`, `/order?plan=regulars`, optional `cards=20`. Old `report=1` links select Regulars; `report=0` selects Starter.

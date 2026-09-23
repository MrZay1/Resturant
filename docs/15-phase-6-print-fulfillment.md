# Phase 6 — Print and fulfillment handoff

What's new: from an order's page in `/admin/orders/<id>`, a "Print & fulfillment" panel with:

- **Open front for print** / **Open back for print** - opens `/print/card` filled in with that
  order's real design (template, headline, logo, brand color, QR), at exact size with 3mm bleed.
  This is the same page `scripts/export-cards.mjs` already used to generate PDFs, just pointed at
  a real order instead of a sample design. Print → Save as PDF from there for the file to drop
  into your card supplier's upload form.
- **Ship to** - to you (hand-delivery) or straight to the restaurant. Saved on the order.
- **Supplier order #** - free text. There's no supplier API, so this is just a place to keep their
  confirmation number next to the order instead of in a separate spreadsheet.
- **Mark shipped & email customer** - sets the order to "shipped," stamps the date, and emails the
  customer that their cards are on the way (mentioning hand-delivery or direct shipping,
  whichever you picked above). If the email fails to send, the order still gets marked
  shipped - it just adds a note flagging that the email didn't go out.

## One thing this doesn't fully close

The QR/NFC redirect (`/r/<slug>`) reads from `data/links.json`, not from the orders table - that's
existing behavior from before this phase, not something this changes. The print panel builds the
QR using a slug from the restaurant's name, but it won't actually resolve to the right review link
until that slug is added to `data/links.json` and redeployed. Worth deciding whether to keep that
manual step or move the redirect list into the database in a later pass - flagging it here so it
doesn't get missed.

## Database changes

Three additions to `orders`, applied the same way as before:

```bash
cd site
node --env-file=.env.local scripts/init-db.mjs
```

- `ship_to` (`'to_me' | 'direct'`, defaults to `'to_me'`)
- `supplier_order_ref` (free text)
- `shipped_at` (set once, the first time an order is marked shipped)

No new environment variables - the shipped email reuses the same Resend setup as every other
email this app sends.

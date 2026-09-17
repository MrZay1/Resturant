# Demo card order pack

Everything needed to get sample cards in your hands for pitching. Prices and lead times come from `01-ordering-guide.md` (checked 2026-09-04); that guide has the depth, this page is the checklist.

## What the demo kit is for

Three things happen at a pitch: the owner taps a card with their own phone, they see a card that looks like it belongs on their table, and they see what the monthly report looks like. The kit covers all three:

| Item | Purpose | Qty |
|---|---|---|
| Printed sample cards (a fictional restaurant, several designs) | The look and feel. Hand them over, let them keep one. | 25 |
| Blank white NTAG213 cards you encode at home | A working tap on day one, and spares for testing phones | 25 |
| Acrylic card holders | Show the card standing on a counter or host stand | 10 |
| Printed staff guide and sample report one-pager | Leave-behinds | 10 each |
| Pitch prep tool on your laptop or phone (`/pitch`) | Their own logo on all four designs, plus the personalized deck | |

## Before you order anything (this gates the cards)

The chip URL and the QR code on the back both carry your domain. Once printed, the QR cannot change, and once a chip is locked, neither can the chip. So:

- [ ] Pick the name (see `research/naming-shortlist.md`) and buy the domain. One domain is enough: the short links can live at `yourdomain.com/r/<slug>`. Set `BRAND.domain` and `BRAND.shortLinkHost` in `site/lib/brand.ts`.
- [ ] Deploy the site (Vercel, `README.md`) and confirm `https://<yourdomain>/r/demo` redirects. That slug is what the demo cards carry.
- [ ] Re-export the artwork so the printed URL and QR match: `cd site && node scripts/export-cards.mjs`.

If you want cards in hand before the name is final, order only the blanks now (they carry nothing) and encode them with any URL; you can rewrite them later.

## Order 1: printed sample cards

**Recommended for demo cards: Tagstand Custom Small Batch (California).** No minimum, printed and encoded in the US, about one week, so you can split 25 cards across designs and they look like real restaurant cards.

- Product: Custom Small Batch NFC Card, NTAG213 or NTAG215, printed two sides. Order form tiers at 25 cards were about $3.08 each two-sided ($77 for 25); free USPS shipping over $50. Confirm on the order form.
- Split: 10 × Lucia's Trattoria Classic, 5 × Noir, 5 × Brand color, 5 × Logo forward. If the form charges per design tier, do 25 of Classic instead.
- Files to upload, one front and one back per design, from `cards/exports/`:
  - `lucias-classic/classic-front.pdf` and `classic-back.pdf`
  - `lucias-noir/noir-front.pdf` and `noir-back.pdf`
  - `lucias-brand/brand-front.pdf` and `brand-back.pdf`
  - `lucias-logo/logo-front.pdf` and `logo-back.pdf`
  - PDFs are 91.6 × 59.98 mm (CR80 plus 3 mm bleed), no crop marks, RGB. If a form insists on PNG, the 300 dpi PNGs sit next to each PDF.
- Encoding: one URL record, `https://<yourdomain>/r/demo?s=card`. Leave the tags **unlocked** on demo cards so you can rewrite them if anything changes. (Production cards for a paying restaurant get locked.)
- Finish: matte if offered. No foil, no metallic ink.
- Chip: NTAG213 is enough. NTAG215 is fine too.

**Alternative: My Plastic Business Card (California).** 25 cards of one design, offset printed both sides, $4.95 each plus $10 shipping ($133.75), digital preview within 24 hours, about 2 weeks total. Pick this if you want to test the production supplier's process now. Use the `lucias-classic` files. Choose "Permanent URL" encoding with the same demo URL. Ask them for the chip part number in the order notes.

## Order 2: blank cards for tonight

- GoToTags, "NFC PVC Card, NTAG213", white, 25 pieces at about $0.30 each plus shipping. https://store.gototags.com/nfc-pvc-card-ntag213/
- Encode with the free NFC Tools app (iPhone or Android): Write > Add a record > URL > `https://<yourdomain>/r/demo?s=card` > Write. Full procedure and locking rules in `02-nfc-tech-spec-and-encoding.md`.
- Test on at least one iPhone and one Android before you rely on a card in a pitch. iPhone: top edge, screen on. Android: back of the phone, screen unlocked, NFC on.

## Order 3: holders

- Marketing Holders vertical acrylic business-card holder, pocket 2.25 in, about $0.95 each, 10 pieces plus flat shipping. https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand

## Print at home or at a copy shop

With the dev server running (`cd site && npm run dev`):

```bash
cd "site" && node scripts/export-print.mjs
```

That writes `cards/exports/print/staff-guide.pdf` and `sample-report-onepager.pdf`, both letter size. Print 10 of each; laminate a couple of staff guides.

## When the cards arrive

1. Tap every printed card with your phone. Any card that does not open the redirect goes back to the supplier.
2. Check `site/data/links.json`: the `demo` slug should point where you want a tapping owner to land. Two good options: the sample report (`/sample-report`), or, for a specific visit, that restaurant's own Google review page (set it before you walk in, redeploy, change it back after). See `09-order-to-report-process.md`, stage 0.
3. Build the kit: 6 printed cards, 2 blanks, 2 holders, 3 staff guides, 3 one-pagers, and your phone with the pitch deck open. Everything else stays in the car.

## Budget

| Line | Cost |
|---|---|
| 25 printed sample cards (Tagstand) | about $77 |
| 25 blank NTAG213 cards (GoToTags) | about $8 plus shipping |
| 10 acrylic holders | about $20 delivered |
| Domain, first year | $12 to $32 |
| Printing leave-behinds | under $20 |
| **Total** | **about $150** |

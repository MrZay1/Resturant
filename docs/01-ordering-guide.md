# Ordering guide: demo cards, blanks, stands and the first production run

Prepared 2026-09-04 for Zay (Tablenote, working name); revised 2026-09-05. Prices were read from supplier pages on 2026-09-04 by the research workflow in `research/suppliers.md` and `research/nfc_tech.md`. Where the fact-check or the gap-fill found a supplier page saying something different from the first draft, this guide uses the corrected figure. The My Plastic Business Card order form and contact page were read again on 2026-09-05 for section 8.5. Anything not read directly from a supplier page is marked as an estimate or unverified. Add sales tax to every US purchase; none of the prices below include it.

## 0. Positions this guide takes (and that docs 02, 06 and 07 and the site copy must match)

- **Chip.** The card uses a genuine NXP NTAG213 or NTAG215. Both are NFC Forum Type 2 tags with the same command set, lock bytes and config-page layout; the only difference that matters here is user memory (144 versus 504 bytes), and the encoded URL is about 35 characters (NXP datasheet https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf). The demo and small-batch suppliers in this guide (MPBC, Tagstand) sell NTAG215 cards; GoToTags blanks and printed cards are NTAG213. Every purchase order asks the vendor for the IC manufacturer and part number, and every delivery is checked with NFC Tools > Read, which names the IC. Reject anything that is not NXP. The site copy line and `docs/02` section 1 should read "NXP NTAG213 or NTAG215"; "NTAG21x" is not used anywhere. "Buy from GoToTags or Tagstand" in doc 02 applies to blanks; printed cards come from MPBC or Tagstand with the IC confirmed as above.
- **Locking.** Password-protect the 25 demo cards (NFC Tools > Other > Password protection, `docs/02` section 3 step 9) so they can be re-encoded if the short domain changes. Lock only cards shipped to a paying restaurant. Locking is platform-neutral: NFC Tools "Lock tag" on either iPhone or Android, then confirm in the memory dump that page 02h bytes 2 and 3 read `FF FF` and page 28h bytes 0 and 1 are non-zero, then send the CFGLCK command `A2:2A:40:00:00:00` from Other > Advanced NFC commands and power-cycle the card (`research/nfc_tech.md` gap-fill section 1; wakdev https://www.wakdev.com/en/knowledge-base/videos/how-to-protect-your-nfc-tags.html). No Android phone is required.

## 1. Decision summary: what to order this week

The demo kit needs three parcels. Total: about $161 plus GoToTags shipping and sales tax; budget $175. Cards in hand in roughly two weeks if the proof is approved the day it arrives.

| Order | Supplier | What | Cost | Lead time | Source |
|---|---|---|---|---|---|
| 1 | My Plastic Business Card (La Habra, CA) | 25 custom-printed NFC cards, full color both sides, matte, chip "NFC 215" (IC part number to be confirmed, section 8.5), your URL encoded as a Permanent URL, using the `demo-your-restaurant` artwork | 25 x $4.95 = $123.75 + $10 flat FedEx Ground = $133.75 | Digital proof within 24 h (Mon to Fri), 5 business days production, FedEx Ground | https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ and https://myplasticbusinesscard.com/faq/ |
| 2 | GoToTags (Seattle, WA) | 25 blank white NTAG213 PVC cards for encoding practice, locking tests and phone-compatibility tests | 25 x $0.30 = $7.50 + shipping (rate not published; economy USPS/UPS Ground) | Ships immediately | https://store.gototags.com/nfc-pvc-card-ntag213/ and https://gototags.com/store/shipping/usa |
| 3 | Marketing Holders (FL) | 10 clear acrylic vertical business-card holders (pocket 2.25 in wide, fits a 2.125 in CR80 card) | 10 x $0.95 = $9.50 + flat shipping (the fact-check saw $10 flat; the gap-fill found no published rate; confirm at checkout) = about $19.50 | Stock, ships from Florida | https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand and https://marketingholders.com/pages/flat-rate-shipping |
| | | **Total** | **about $161 + GoToTags shipping + tax** | **about 2 weeks** | |

Upgrade option: 50 cards from the same supplier cost $198 ($3.96 each) instead of $123.75. If you expect to pitch more than 20 restaurants before the production run, take the 50.

Cheaper and faster option for order 1: Tagstand Custom Small Batch, 25 cards printed two sides, encoded, $77.00 ($3.08 each), free USPS shipping on orders over $50, about 1 week (section 6, Variant C). This guide keeps MPBC for the demo order because MPBC is the production supplier for pooled runs and the demo order is the cheapest way to test its proof process, print quality and IC before the first paid restaurant order. If the calendar or the budget is the constraint, take Variant C.

Why this combination:

- My Plastic Business Card (MPBC) publishes prices from 1 card to 1,000, prints offset in full color on both sides, and proofs every order. Its order form has a "Permanent URL" encoding option, so the card points at `tblnt.com/r/demo?s=card` with no vendor dependency (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/).
- The blanks let you practise writing, password protection, locking and the CFGLCK config lock before you touch a printed card. At $0.30 each a mistake costs nothing.
- The $0.95 holder turns a loose card into a counter display for the pitch. Skip the branded $27 to $81 NFC stands until a customer asks.

Before you order, three things must be true. Details are in section 8.

- [ ] The redirect host is live at the domain you will encode. Today `tblnt.com` is a placeholder in `site/lib/brand.ts`. Register it (or whatever the real short domain is) and deploy the site before you approve the proof, because MPBC burns the URL into the chip at production time and the printed QR is part of the artwork.
- [ ] The `demo` slug in `site/data/links.json` points somewhere useful for a pitch (today it points at `/sample-report`).
- [ ] You have re-exported the artwork with the final short URL if the domain changes: `cd site && node scripts/export-cards.mjs` (see `site/scripts/README.md`).

## 2. Supplier shortlist: custom-printed CR80 NFC cards

Per-card prices at the quantities the supplier publishes. "n/a" means the supplier does not sell that quantity; "not listed" means the quantity falls between published tiers. EUR converted at 1 EUR = 1.162 USD (ECB via Frankfurter, 2026-09-04, https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP).

| Supplier | Country | Chip | 25 | 50 | 100 | 250 | 500 | 1,000 | MOQ | Print | Encode and lock | Proof and turnaround | Shipping to US | Notes | URL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| My Plastic Business Card | US (CA) | "NFC 215" (NXP not stated; ask for the part number) | $4.95 | $3.96 | $2.20 | not listed (200 = $1.65, 300 = $1.54) | $1.26 | $1.16 | 1 | Offset, full color both sides, matte, rounded corners | Order form offers "I Will Encode Myself", "Permanent URL", "Contact Card" or "Editable URL"; choose Permanent URL. Ships unlocked (FAQ says change it later with NFC Tools). Lock yourself. Per-card unique URLs are not confirmed: the FAQ says variable data is not offered on Quick cards, and on Standard cards it is printed or stamped text (`research/suppliers.md` gap-fill section 2 and Corrections). | Digital proof within 24 h Mon to Fri; 5 business days; 24 h and 48 h rush offered, surcharge not published | $10 flat FedEx Ground, continental US | 1 card = $49.50; 150 = $2.04; 400 = $1.43. "No split fee if each person orders 50pcs or more" (multiple designs in one order). Free generic samples on request. | https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ |
| Tagstand Custom Small Batch | US (CA) | NTAG215 (691 in stock on the product page on 2026-09-04; confirm the plain white CR80 SKU in the cart, not the lanyard-slot variant) | one-sided $1.84 / two-sided $3.08 | $1.70 / $2.80 | $1.56 / $2.60 | not listed (priced between the 100 and 500 tiers) | $1.44 one-sided (two-sided not captured) | factory custom only, quote | none | UV inkjet, "velvet texture", one-sided or two-sided printing selected on the order form | Encoded in California. Order form offers "none", "Encode" or "Encode and Lock"; selecting Encode and Lock did not change the total (free). | Lead time about 1 week; artwork goes through their online editor, vector PDF or AI preferred | Free USPS First Class over $50; under $50 a $2 handling fee plus postage (shipping page last indexed 2024, verify at checkout) | One-sided tiers: 1 = $15.45; 2 = $8.31; 3 = $5.93; 4 = $4.74; 5 = $4.02; 10 = $2.59; 25 = $1.84; 50 = $1.70; 100 = $1.56; 500 = $1.44. Two-sided totals seen on the form: 10 = $45.60; 25 = $77.00; 50 = $140.00; 100 = $260.00. Site warns of tariff-driven price increases. | https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/ and https://www.tagstand.com/shipping-and-payment/ |
| Tap Tag | US | NTAG215 | by inquiry | by inquiry | by inquiry | n/a | n/a | n/a | 1 | 600 dpi both sides, laminated | Dynamic redirect by default; hard-program your own URL by pasting it in the cart note. Ships unlocked. | 1 business day for up to 100 items (order by 1 PM ET); 100 to 350 about 72 h | Free tracked US shipping on orders over $30 | 1 = $29.95; 2 = $49.00; 5 = $119.95; 10 = $195.00 ($19.50 each). Fastest option in the country, too expensive above 10. | https://taptag.shop/products/custom-printed-plastic-nfc-cards |
| Plastic Printers | US (MN) | Not stated ("NTAG" and "Mifare" mentioned generically) | n/a | $5.36 | $5.36 | $2.86 | $1.94 | $1.31 | 50 | In-house, full color | Includes their own redirect software; whether you can hard-code your own URL is not published. Lock not stated. Call 1-800-808-7472. | Free proof, free samples; "most orders ship in a few days" | Not published | 50 = $268; 250 = $716; 500 = $972; 1,000 = $1,314. BBB accredited since 2020. | https://shop.plasticprinters.com/products/custom-nfc-business-cards and https://www.plasticprinters.com/templates-for-designers |
| GoToTags Printed PVC NFC Card | US (WA); custom cards list China as shipment origin | NXP NTAG213 | $2.85 (display only) | $2.40 (display only) | $2.00 (display only) | $1.65 | $1.35 | $1.05 | 500 stated on the page | Digital or offset, full bleed; 2-sided +$1.80 (the page does not say whether per card or per order) | Separate encoding service: $0.23 at 50, $0.19 at 100, $0.06 at 1,000; permanent read-only lock at no surcharge; variable data by file upload; only for tags bought from GoToTags | Quote within 1 business day; lead time 3 weeks (category page: 15 to 20 business days) | Four US service levels, rates not published; sales tax in some states | 5,000 = $0.65; 10,000+ = $0.55. Quote-based custom card "$1.89 down to $0.33", MOQ 500, PMS matching, frosted and metallic options. One-year warranty, 98% tag yield. | https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ , https://store.gototags.com/custom-nfc-pvc-card/ , https://store.gototags.com/nfc-tag-encoding-service/ |
| Seritag | UK | NTAG213 or NTAG215 | n/a | n/a | $2.54 (213) / $2.59 (215) | $1.56 / $1.76 (200 to 299 tier) | $0.98 / $1.03 | $0.78 / $0.85 | 100 | Full color both sides, laminated gloss, matt or crystal matt, 0.82 to 0.88 mm | Single or variable encoding, locked or unlocked, no charge for locking; per-card QR from your spreadsheet | PDF proof usually within 24 h; production estimated at 4 weeks | 10% US surcharge plus admin fees since 2026-02-25; duty prepayment offered | Prices in USD ex VAT. 2,000 = $0.69; 5,000 = $0.63. | https://seritag.com/nfc-tags/cp-cards-ntag213 , https://seritag.com/nfc-tags/cp-cards-ntag215 , https://seritag.com/delivery |
| ShopNFC Express Printing | Italy | NTAG213, NTAG216 or MIFARE | EUR 1.79 ($2.08) | EUR 1.61 ($1.87) | EUR 1.43 ($1.66) | EUR 1.43 | EUR 1.25 ($1.45) | EUR 1.25 | 10 | Retransfer, UV or offset (ShopNFC chooses), one or two sides | Encoding EUR 0.09 per card; lock status not stated | Graphic confirmation by email; express color 2 to 5 working days | Express only, from EUR 9.90, customs charged to recipient | EUR 10 graphic change per design, 10-piece minimum per design. Offset line: EUR 0.99 under 1,000, MOQ 500, 15 days. | https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html and https://www.shopnfc.com/en/content/1-shipping |
| NFC.CARDS | EU | NTAG213 | EUR 3.95 | EUR 3.89 | EUR 3.69 | EUR 3.69 | EUR 3.59 | EUR 3.49 | 10 | Retransfer 600 dpi | Not stated | 1 to 5 days | "Shipments to the United States are temporarily paused" | Not usable today. | https://nfc.cards/en/content/1-delivery |
| Shenzhen ZD Technology (Alibaba) | China | NTAG213 or NTAG215 | n/a | n/a | $0.12 to $0.27 | same range | same range | same range | 100 | Offset or digital, by quote | By quote | Sample round first; no RFQ was sent | DHL Express roughly $9 to $16 per kg, 2 to 5 business days transit | Verified supplier, 12 years on platform. Add 37.5% duty, brokerage and a sample round (section 5). | https://www.alibaba.com/premium/custom_nfc_card.html |

Not shortlisted: Vistaprint (NFC card locks to VistaConnect, 100 scans per month cap, per a third-party comparison at https://wavecnct.com/blogs/vistaprint-vs-wave-nfc-business-cards), ID Cards Direct (custom card unavailable, ships from outside the US), NFC Tagify (GBP 15 to 23 per card, UK), iPOS Supply ($44.99 per card), Printleaf and CardLogix (quote only, no published price).

Two things the table cannot tell you and the founder must ask:

- Whether MPBC's "NFC 215" is a genuine NXP NTAG215. The page quotes "roughly 200 characters" of capacity, which is far below the NTAG215's 504 bytes, so the figure may be a UI limit or a non-NXP part (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/). A `tblnt.com/r/<slug>?s=card` URL is under 40 characters, so it fits either way, but clones may lack the originality signature. Ask for the IC part number in the order notes, and check the IC name in NFC Tools > Read when the cards arrive.
- Whether MPBC can encode a different URL on each card. Not needed for a restaurant batch (all of a restaurant's cards share one slug), but needed if you ever want per-card slugs from MPBC rather than GoToTags or Seritag. Ask; the FAQ suggests no (section 0).

The chip position for the site copy, doc 02 and this guide is "NXP NTAG213 or NTAG215" (section 0).

## 3. Blanks for prototyping

Plain white PVC cards, NDEF pre-formatted where stated, for the kitchen-table encoding run described in `research/nfc_tech.md` section 10. Most blanks are not inkjet printable; they need a retransfer or dye-sub card printer (https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC5GWP9).

| Source | Chip | Price per card | MOQ | Notes | URL |
|---|---|---|---|---|---|
| GoToTags | NTAG213 | $0.30 at 10; $0.29 at 100; $0.27 at 1,000 | 10 | 85.5 x 54 x 0.9 mm, pre NDEF formatted, "Normally Stocked". Quantities between tiers are priced at the lower tier, so 25 cards cost $0.30 each. | https://store.gototags.com/nfc-pvc-card-ntag213/ and https://gototags.com/store/pricing |
| GoToTags | NTAG215 | $0.48 at 10; $0.35 at 100; $0.33 at 1,000 | 10 | Same card body; 200-pack $49.98. Antenna 70 x 40 mm. | https://store.gototags.com/nfc-pvc-card-ntag215/ |
| GoToTags | NTAG216 | $0.62 at 10; $0.61 at 100 | 10 | Not needed for this product. | https://store.gototags.com/nfc-pvc-card-ntag216/ |
| Tagstand | NTAG213 | $0.55 single; $0.52 at 25; $0.50 at 50; $0.44 at 100; $0.40 at 500; $0.39 at 1,000 | 1 | 1,335 in stock on 2026-09-04. The 25-pack ($12.50) and 100-pack ($45) were sold out. | https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/ |
| Tagstand | NTAG215 | $0.63 single; $0.61 at 25; $0.59 at 50; $0.52 at 100 | 1 | | https://www.tagstand.com/products/ntag215-pvc-card-blank/ |
| Tagstand | NTAG215, inkjet-coated | $1.10 single; $0.91 at 25; $0.88 at 50; $0.84 at 100 | 1 | Only blank that a home inkjet with a card tray can print. | https://www.tagstand.com/products/inkjet-printable-pvc-card-ntag215/ |
| TagTix RFID | NTAG215 | $30 per 50 ($0.60) | 50 | Free 3-day US shipping via Amazon fulfilment. | https://tagtixrfid.com/products/nfc-card-ntag215 |
| Amazon (MINDRFID, TimesKey, Tagstand packs) | NTAG213 or NTAG215 | Unverified; pages blocked automated fetching | 10 to 100 | Check in the Amazon app before relying on a price. ASINs: B0B5ZX9QND, B075CL71FK, B06ZZWVZ3B, B07CLLD7XB, B07CLCH92T, B0CDC3DGLJ. | https://www.amazon.com/dp/B0CDC3DGLJ |

Optional desk hardware, only if you move encoding off the phone: ACS ACR1252U USB reader $44.32 at GoToTags (cheaper than the end-of-life ACR122U at $49.59) and the GoToTags Desktop App at about $0.05 per encode after the free 100-credit pack (https://store.gototags.com/acs-acr1252u-nfc-usb-reader/ , https://gototags.com/software/credits). Not needed for 25 cards.

## 4. Stands, holders and table tents that fit a CR80 card

A CR80 card is 85.6 x 53.98 mm (3.375 x 2.125 in). Anything made for a 3.5 x 2 in business card holds it upright; the fit is arithmetic, not something the holder pages state.

| Item | Price | Fit and notes | URL |
|---|---|---|---|
| Marketing Holders vertical single-pocket countertop holder, clear acrylic | $0.95 each plus flat shipping per order (the fact-check saw $10 flat; the gap-fill found no published rate for direct orders; confirm at checkout) | 2.5 in W x 3.5 in H x 1.75 in D, pocket 2.25 x 0.75 in. Card stands portrait; phone reads through about 1/8 in of acrylic at the front wall. Also sold on Amazon: 6-pack $18.99 with free shipping, 4-pack $15.99, 12-pack $20.99 (B0771KY3W1). 30-day returns with 20% restocking fee. | https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand , https://www.amazon.com/Marketing-Holders-Vertical-Business-Counter/dp/B0771KY3W1 and https://marketingholders.com/pages/shipping-returns |
| Marketing Holders other single-pocket styles | Horizontal clear $0.50; horizontal white $0.32; horizontal black $0.32; trough $0.35; single-pocket acrylic $0.44; 3.5 x 2 in slant-back landscape sign holder $1.39; open-sides holder $3.59 | Same flat shipping per order. The slant-back holder presents the card face-up at an angle, which is the easiest position for a guest to tap. | https://marketingholders.com/collections/single-pocket-business-and-gift-card-holders |
| Azar Displays clear acrylic vertical business card holder, 10-pack | $8.74 at Home Depot | Cheapest per unit if you pick up in store or qualify for free same-day delivery on $25+ orders (Home Depot press release 2026-08-18). | https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573 and https://ir.homedepot.com/news-releases/2026/08-18-2026-130244681 |
| Displays and Holders 5 x 3.5 in two-sided side-load table tent | Price not shown on page; imprint minimum 50 | Holds a printed insert; a CR80 card sits in the pocket in front of the insert. Quote by phone. | https://www.displaysandholders.com/acrylic-table-tents-h42-0535-ip.html |
| Branded NFC stands (chip built into the stand, no card) | Etsy custom-logo acrylic stands about $27 to $32; nfc-tag-shop.de EUR 34.90; PhoneTapify $81.40 (stand + card combo $98.99); Seritag 140 x 90 mm NFC table cards $5.33 at 100, $2.64 at 250 with optional acrylic stand; Alibaba PVC NFC table stands $1.20 to $3.00 at MOQ 100 | A counter-top upsell, not part of the card product. Buy one Etsy stand only if a prospect asks for a fixed display. | https://www.etsy.com/listing/4367372120/custom-logo-google-review-stand-nfc-qr , https://www.nfc-tag-shop.de/en/Google-review-NFC-stand-acrylic-110-x-150-mm-white-glossy/17241 , https://phonetapify.com/products/google-review-nfc-table-stand , https://seritag.com/nfc-tags/nfc-table-top-cards |
| Non-metal check presenters (for restaurants that hand the card with the bill) | WebstaurantStore vinyl 5 x 9 in $2.89; leather-like with clip $8.19; wood block $13.49. Avoid stainless steel ($32.29). | A card lying on metal does not read; a 3 mm gap restores it (Seritag on-metal test). The vinyl or leatherette folder gives only 1 to 3 mm of standoff on a metal table, so the guest still has to pick the card up. | https://www.webstaurantstore.com/search/check-presenter.html and https://seritag.com/learn/using-nfc/on-metal-nfc-tags |

Keep one card per pocket. No source was found on stacking NFC cards in one holder; stacked antennas can detune each other, so treat this as a practical caution rather than a tested fact.

## 5. Import and tariff notes for non-US suppliers

Primary sources are the USITC tariff database and the Federal Register. Confirm the stack with a customs broker before wiring money to a factory; the research did not run an entry through a broker.

- The $800 de minimis exemption ended for all origins on 2025-08-29, so every imported parcel now gets a formal entry with ad valorem duty and a carrier brokerage fee that starts around $30 (https://www.tariffstool.com/guides/de-minimis-exemption-ended-2026 , https://www.nbclosangeles.com/news/national-international/tariff-exemptions-end-friday-what-online-shoppers-need-to-know/3769979/).
- Classification: chip cards fall under HTS 8523.52.00 "smart cards", general rate Free (https://hts.usitc.gov/reststop/search?keyword=8523.52 ; CBP ruling NY N083108 at https://www.customsmobile.com/rulings/docview?doc_id=NY+N083108). GoToTags lists 8523.52.10 on its own card page.
- China (verified): 0% MFN + 25% Section 301 List 3 (heading 9903.88.03) + 12.5% under the July 24, 2026 Section 301 action (heading 9903.05.31) = 37.5% of the goods value (https://hts.usitc.gov/reststop/search?keyword=9903.88.03 , https://hts.usitc.gov/reststop/search?keyword=9903.05.31 , https://www.federalregister.gov/documents/2026/07/28/2026-15181/notice-of-actions-in-section-301-investigations-of-acts-policies-and-practices-of-various-economies , https://www.honigman.com/alert-3462). The IEEPA tariffs were struck down on 2026-02-20 and the Section 122 10% tariff expired on 2026-07-23, so there is no extra layer today (https://www.hklaw.com/en/insights/publications/2026/07/and-the-tariff-beat-goes-on).
- UK (Seritag), not verified: the July 2026 notice imposes country-level Section 301 duties of 10% or 12.5% on about 60 economies, and the research did not confirm which rate applies to the UK, or whether the UK is on the list at all (`research/suppliers.md` gap-fill section 11; `research/policy_legal.md` gap-fill section 12). Treat the UK rate as 10% or 12.5% on top of MFN Free until a broker confirms, or take the figure Seritag shows when you select duty prepayment at checkout. Seritag also adds its own 10% US surcharge plus admin fees (https://seritag.com/delivery).
- EU (ShopNFC, NFC.CARDS), not verified: same notice, same 10% or 12.5% uncertainty. ShopNFC bills customs to the recipient, so you will see the real figure on the carrier's invoice (https://www.shopnfc.com/en/content/1-shipping).
- Not sourced: the CBP merchandise processing fee on a formal entry. Budget a small extra line.

Worked landed estimates for 500 cards (goods value only for duty; freight and brokerage are estimates from the research):

| Route | Goods | Surcharges and duty | Freight and brokerage | Landed | Per card | Time |
|---|---|---|---|---|---|---|
| Seritag UK, 500 NTAG213 | $490 | 10% Seritag surcharge $49 + admin fee (checkout) + duty at 10% or 12.5%, about $49 to $61 (UK rate not verified) | Shipping shown at checkout + brokerage about $30 | about $620 to $680 before Seritag shipping and admin fee | about $1.24 to $1.36 | 4 weeks production + transit |
| Alibaba (Shenzhen ZD), 500 at $0.27 | $135 | 37.5% duty about $51 | DHL about $50 + brokerage about $30 | about $266 plus any paid sample | about $0.53 | sample round + 2 to 3 weeks |
| ShopNFC express, 500 NTAG213 | EUR 625 ($726) + EUR 45 encoding ($52) + EUR 10 per design | duty at 10% or 12.5%, about $78 to $97 (EU rate not verified) | from EUR 9.90 ($11.50) + brokerage about $30 | about $900 to $930 | about $1.80 to $1.86 | 2 to 5 working days + transit |

The China route saves roughly $370 on 500 cards against MPBC but adds a sample round, a formal entry, colour-matching risk and no recourse on print defects. At a $15 retail price per card the difference is about 5% of the card revenue on that run ($7,500). Revisit at 2,000+ cards per order.

## 6. Demo-kit shopping list, three variants

All variants buy the same blanks and holders. They differ only in how the printed cards are made. Sales tax is extra in every line.

### Variant A: fastest (cards in hand in about 4 business days)

| Item | Supplier | Qty | Unit | Subtotal | Source |
|---|---|---|---|---|---|
| Custom printed NFC cards, NTAG215, 600 dpi both sides, laminated, your URL hard-programmed via the cart note | Tap Tag | 10 | $19.50 | $195.00, free tracked US shipping | https://taptag.shop/products/custom-printed-plastic-nfc-cards |
| Blank NTAG213 cards | GoToTags | 25 | $0.30 | $7.50 + shipping (not published) | https://store.gototags.com/nfc-pvc-card-ntag213/ |
| Vertical acrylic holders, 10-pack, in-store pickup | Azar via Home Depot | 1 | $8.74 | $8.74 | https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573 |
| **Total** | | | | **$211.24 + GoToTags shipping + tax** | |

Order by 1 PM Eastern and Tap Tag ships the same or next business day; 3-day free shipping on 10+ items (https://taptag.shop/pages/custom-bulk-orders). The cards arrive unlocked with Tap Tag's dynamic redirect unless you paste your URL in the cart note; then password-protect them yourself (section 8). If you only need 2 cards for a pitch this week, 2 = $49.00.

### Variant B: offset print from the production supplier (about 2 weeks)

| Item | Supplier | Qty | Unit | Subtotal | Source |
|---|---|---|---|---|---|
| Custom printed NFC cards, offset, both sides, matte, your URL encoded as a Permanent URL | My Plastic Business Card | 25 | $4.95 | $123.75 + $10 FedEx Ground = $133.75 | https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ |
| Blank NTAG213 cards | GoToTags | 25 | $0.30 | $7.50 + shipping | https://store.gototags.com/nfc-pvc-card-ntag213/ |
| Vertical acrylic holders | Marketing Holders | 10 | $0.95 | $9.50 + flat shipping (about $10, confirm at checkout) = about $19.50 (or Azar 10-pack $8.74 if a Home Depot is nearby) | https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand |
| **Total** | | | | **about $160.75 + GoToTags shipping + tax ($150 with the Azar pack)** | |

### Variant C: cheapest two-sided printed cards (about 1 week)

| Item | Supplier | Qty | Unit | Subtotal | Source |
|---|---|---|---|---|---|
| Custom Small Batch NFC card, NTAG215, two-sided UV inkjet, "Encode" selected (not "Encode and Lock", because demo cards are password-protected, section 0) | Tagstand | 25 | $3.08 | $77.00, free USPS shipping (order is over $50) | https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/ and https://www.tagstand.com/shipping-and-payment/ |
| Blank NTAG213 cards | GoToTags | 25 | $0.30 | $7.50 + shipping | https://store.gototags.com/nfc-pvc-card-ntag213/ |
| Vertical acrylic holders, 10-pack | Azar via Home Depot | 1 | $8.74 | $8.74 | https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573 |
| **Total** | | | | **$93.24 + GoToTags shipping + tax** | |

Other Tagstand quantities from the same order form: 10 two-sided = $45.60 ($4.56); 50 two-sided = $140.00 ($2.80); 10 one-sided = $25.90 ($2.59); 25 one-sided = $46.00 ($1.84). One-sided is not suitable for this product because the QR fallback lives on the back.

Head-to-head for the 25 demo cards:

| | MPBC (Variant B) | Tagstand (Variant C) |
|---|---|---|
| Cost delivered | $133.75 | $77.00 |
| Lead time | about 2 weeks (proof 24 h, 5 business days, FedEx Ground 2 to 5 days) | about 1 week |
| Print | offset, matte, both sides, digital proof on every order | UV inkjet "velvet texture", both sides, designed in their online editor; no proof step is described |
| Encoding | Permanent URL on the order form; ships unlocked | Encode, or Encode and Lock (free); the lock option removes the in-house lock step for cards going to a paying restaurant |
| Chip | "NFC 215", IC unconfirmed | NTAG215; ask for the IC part number the same way |
| Why choose it | Tests the production supplier's proof, colour and IC before the first paid order; offset finish matches what restaurants will get | $57 cheaper, a week faster; the same supplier later prints 5 to 50 card restaurant batches and replacement cards (section 7) |

Verdict: this guide plans Variant B so the MPBC questions in section 7 get answered on a $134 order rather than a $640 one. Choose Variant C if you need cards within a week or want to keep the demo spend under $100. Either way, buy the blanks and holders.

Do not bother with: Sticker Mule labels on blanks (50 labels at the 2 x 1 in size are $53, so a labelled card costs more than a Tagstand printed card, https://www.stickermule.com/products/rectangle-labels), or a local badge shop (no shop was found that publishes a price for printing on customer-supplied NFC blanks; AlphaCard warns that direct-to-card printers cannot print over the chip and recommends retransfer, https://www.alphacard.com/learning-center/understanding-smart-cards/can-i-print-on-smart-cards/).

## 7. Primary and backup supplier for a 250 to 500 card production run

First, the number that matters. The production run is not one design. Each restaurant gets its own name, colour and slug, and orders of 5 to 200 cards at a time (the site caps an order at 200, `site/lib/brand.ts`), typically 10 to 50, with 10 free replacements per month for subscribers. So the real question is what a 25 or 50 card single-design batch costs, and whether several designs can share a price tier.

| Vendor | Multi-design rule (published) | 25-card single-restaurant batch | 50-card batch | Source |
|---|---|---|---|---|
| MPBC | "No split fee if each person orders 50pcs or more"; the general FAQ for non-NFC cards says 500 per design | $123.75 + $10 = $133.75 ($5.35 per card) | $198 + $10 = $208 ($4.16 per card); ten 50-card designs in one order may price at the 500 tier ($1.26), which is implied but not explicit | https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ and https://myplasticbusinesscard.com/faq/ |
| Tagstand small batch | Per-card tiers on the order form, one design per order line; no setup fee | two-sided $77.00 ($3.08 per card), free shipping over $50, encode and lock included | two-sided $140.00 ($2.80 per card), encode and lock included | https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/ |
| Plastic Printers | Nothing published | not possible (min 50) | $268 | https://shop.plasticprinters.com/products/custom-nfc-business-cards |
| GoToTags | Tiers per SKU per order; the printed card page lists 25 = $2.85 but states MOQ 500 | not orderable online | not orderable online | https://gototags.com/store/pricing and https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ |
| Seritag | Not published; MOQ 100 | not possible | not possible | https://seritag.com/nfc-tags/cp-cards-ntag213 |

The website promises cards ship about 10 business days after proof approval. Only MPBC (5 business days plus FedEx Ground), Tap Tag (1 to 3 days) and Tagstand (about 1 week) fit that promise. GoToTags (3 weeks) and Seritag (4 weeks) do not, so they can only serve pre-stocked or pooled orders.

Where the crossover sits: Tagstand two-sided is cheaper than MPBC at 25 ($77 versus $133.75) and at 50 ($140 versus $208), and MPBC is cheaper at 100 ($230 delivered versus $260) and above. So:

**Primary for single-restaurant batches of 5 to 50 cards and for replacement cards: Tagstand Custom Small Batch, two-sided, "Encode and Lock".** Against a $15 card price, COGS is 21% at 25 ($3.08) and 19% at 50 ($2.80). Ten replacement cards two-sided cost $45.60 plus $2 handling and postage (under the $50 free-shipping floor), which is most of a $50 monthly report fee; so define the 10 free replacements as "up to 10 on request" and fill them from overprinted stock where possible (`research/suppliers.md` gap-fill section 9). Tagstand's lock is applied at encoding, so those cards skip the in-house Lock tag step; still run the memory-dump check in section 8.4 on a sample and send the CFGLCK command, because the form does not say whether its lock covers the config pages.

**Primary for pooled runs of 100 or more: My Plastic Business Card.** Landed cost for a pooled 500-card order made up of restaurant batches of 50 or more, if the "no split fee" rule holds:

| Line | Amount | Basis |
|---|---|---|
| 500 cards at the 500 tier | $630.00 | $1.26 per card |
| FedEx Ground | $10.00 | Flat rate, continental US |
| Sales tax | California rate if delivered in CA, otherwise possibly none | Not published; MPBC is a California vendor |
| Locking | $0 | Do it yourself with NFC Tools on either phone (section 8.4) |
| **Landed, 500** | **$640 + tax ($1.28 per card)** | |
| **Landed, 300** | **$472 + tax ($1.57 per card)** | 300 tier is $1.54 |

Against a $15 card price, COGS is 9% to 11% at those tiers and 36% for a stand-alone 25-card restaurant order at $5.35 landed (21% if that order goes to Tagstand instead). Order a buffer of 10 to 20 extra cards per restaurant inside the batch so that free replacement cards come out of stock at the tier price rather than as a small reorder.

Get these four answers from MPBC in writing before the first production order (channel and wording in section 8.5): (1) that two or more 50-card designs in one order are priced at the combined-quantity tier; (2) the exact IC in the "NFC 215" card (manufacturer and part number); (3) whether they will deliver the cards locked read-only on request, and if so whether that is a hard lock (lock bits set) rather than an NDEF soft lock; (4) whether they can encode a different URL on each card from a spreadsheet (per-card variable URL encoding), since the FAQ says variable data is not offered on Quick cards.

**Backup 1 for restaurant batches: Plastic Printers (US).** 50 = $268 ($5.36) and 250 = $716 ($2.86), in-house in Minnesota, free proof and free samples, "most orders ship in a few days" (https://www.plasticprinters.com/plastic-business-cards). Two unknowns to close by phone: the chip part, and whether the NFC record can be your own URL rather than their hosted redirect (https://www.plasticprinters.com/nfc-cards). About 50% more expensive than MPBC at 500 ($972 versus $630).

**Backup 2 for pooled runs of 500 or more: GoToTags Printed PVC NFC Card NTAG213.** 500 x $1.35 = $675, plus the two-sided charge of $1.80 (per card or per order, confirm), plus encoding with permanent lock at $0.19 per card for quantities between 100 and 999 ($95 at 500) since between-tier quantities take the lower tier's price. Landed about $780 to $800 plus shipping and tax, 3 weeks. Worth it once you want unique per-card slugs pre-encoded and hard-locked by the vendor (https://store.gototags.com/nfc-tag-encoding-service/), and GoToTags is the natural supplier at 1,000+ where its price drops to $1.05 and the quote-based custom card goes down to $0.33.

**Backup 3: Seritag (UK).** 500 NTAG213 = $490, locked encoding and per-card QR from your spreadsheet included, crystal-matt lamination, about $620 to $680 landed before Seritag's own shipping charge and admin fee (UK duty rate not verified, section 5), 5 weeks or more. Use only if both US options fail on capacity or quality.

## 8. Artwork submission spec

### 8.1 Your files

Print-ready artwork already exists. Regenerate it after any change to the short URL or copy with `cd site && node scripts/export-cards.mjs` with the dev server running (`site/scripts/README.md`). Each design folder contains a vector PDF (preferred) and a 300 dpi PNG for each side.

| Design | Use | Files |
|---|---|---|
| Generic Tablenote demo card ("Your Restaurant", classic template, URL `tblnt.com/r/demo`) | Demo kit order | `/Users/zaycameron/resturant idea /cards/exports/demo-your-restaurant/classic-front.pdf` and `classic-back.pdf` (plus `.png` of each) |
| Lucia's Trattoria samples (fictional restaurant, four templates) | Show prospects the four looks; do not print for a real restaurant | `/Users/zaycameron/resturant idea /cards/exports/lucias-classic/`, `lucias-noir/`, `lucias-logo/`, `lucias-brand/` |
| Staff guide and sample-report one-pager (letter size) | Include in the onboarding pack; produced by `node scripts/export-print.mjs` | `/Users/zaycameron/resturant idea /cards/exports/print/staff-guide.pdf` and `sample-report-onepager.pdf` |

For a real restaurant, write a JSON design list with the restaurant's name, colour, slug URL and optional logo data URL, then run `node scripts/export-cards.mjs my-designs.json`. Leave `stars` at 0. The template defaults keep stars off because star graphics read as soliciting a rating under Google's policy, and the card must not carry a Google logo; the word "Google" appears only as plain text in "Tap to review us on Google" (https://about.google/brand-resource-center/guidance/).

### 8.2 Specification to put on every order

| Item | Value | Why |
|---|---|---|
| Trim size | CR80, 85.6 x 53.98 mm (3.375 x 2.125 in), corner radius 3.18 mm | Standard credit card; `site/components/card/cardSpec.ts` |
| Bleed | 3 mm each side already included; file page size 91.6 x 59.98 mm | Tagstand requires 3 mm (https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/). MPBC and Plastic Printers work to the industry 1/8 in (3.175 mm) convention (https://www.plasticprinters.com/templates-for-designers , https://plastekcards.com/artwork/templates/). The 0.175 mm shortfall is well inside the 1.0 mm print shift some vendors quote; state it in the order notes and ask them to confirm on the proof rather than rejecting the file. ShopNFC wants 2 mm and NFC.CARDS 1 mm; they will accept the larger bleed. |
| Safe zone | All text and logos at least 3 mm inside trim | Matches Tagstand 3 mm and the US 1/8 in convention |
| Resolution | PDF is vector; PNG is 300 dpi, about 1082 x 709 px | Plastic Printers asks 300 dpi, 1200 for line art; Seritag asks vector or high-res |
| Colour mode | Files are RGB. Ask the printer to convert to CMYK and send a proof; expect the green and gold to shift slightly | Vendors print CMYK; GoToTags asks for CMYK vector (https://store.gototags.com/custom-nfc-pvc-card/); MPBC's artwork guidelines ask for CMYK with outlined fonts at 300 dpi (https://myplasticbusinesscard.com/artwork-guidelines/) |
| Fonts | Embedded as subsets by Chromium (Geist, Instrument Serif). If the vendor's prepress needs outlines, ask them to outline in prepress or convert before sending | `site/scripts/README.md` |
| File types | Send the PDF per side. MPBC accepts .ai, .pdf, .cdr, .eps, .psd, .jpg, .png, .gif, .bmp with a proof; Plastic Printers accepts PDF, AI, EPS, TIF, PSD, JPG; Tagstand wants vector PDF or AI; GoToTags ai, pdf, eps, svg; Seritag PDF or images up to 8 MB; ShopNFC JPG, PNG, PDF, SVG | Section 11 and gap-fill section 2 of `research/suppliers.md` |
| Finish | Matte (crystal matt at Seritag). No hot foil, no metallic or conductive inks, no metal core | Metallised foil over the coil attenuates the signal (https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8393547); matte hides sanitizer haze |
| Trim guide | The dashed magenta trim rectangle is a proof guide that only renders when `guides` is on; it is not in the exported files. If it ever appears, tell the vendor to ignore it | `site/components/card/CardFace.tsx` |
| QR code | 21 mm square on the back, right side (x = 60.6 to 81.6 mm, y = 13 to 34 mm from the top-left trim corner), encoding the same short URL as the chip | `CardFace.tsx`; 20 to 22 mm with a 4-module quiet zone is the practical floor (https://www.qrcode.com/en/howto/code.html) |

### 8.3 Where the chip and antenna sit

NFC PVC cards carry a copper coil around the whole perimeter with the chip at one corner or edge; printed cards can show a dip of about 5 x 5 mm at the chip corner where ink lays unevenly (https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html , https://seritag.com/nfc-tags/cards). Which corner depends on the inlay the vendor uses, so ask for the chip and antenna position map with the proof. If the chip corner lands under the QR code or the restaurant logo, move the element in the design (the QR sits on the right side of the back; the logo template centres the logo on the front) and re-export.

### 8.4 Encoding and locking language for the purchase order

- Encode one NDEF URI record, `https://` prefix, with exactly the URL you supply. For the demo kit that is `https://tblnt.com/r/demo?s=card`. For a restaurant batch it is one URL per design, `https://tblnt.com/r/<slug>?s=card`, because every card for that restaurant shares the slug. Only when you want a different slug on each card do you need a spreadsheet with one row per card (card number, URL, QR file name); GoToTags and Seritag support that, MPBC has not confirmed it (section 7, question 4). The `?s=card` parameter is how the redirect layer (`site/app/r/[slug]/route.ts`) tells a card tap from a QR scan; QR codes in your artwork encode the same URL without the parameter change.
- Do not add the vendor's own redirect or dynamic QR. MPBC's "Editable URL" encoding and its "New QR Code" option use their hosted redirection; choose "Permanent URL" and ask them to print the QR that is in your back artwork instead.
- State lock preference explicitly. If the vendor offers a hard lock (GoToTags "permanently read-only", Seritag "Locked", Tagstand "Encode and Lock"), take it for cards going to a paying restaurant. If not (MPBC, Tap Tag), say "deliver unlocked; we lock in-house". Demo cards are never locked: password-protect them instead (section 0).
- In-house lock procedure, same on iPhone and Android: after a tap test on one iPhone and one Android, NFC Tools > Other > Erase, format & protect > Lock tag. Re-read, then open the memory dump and confirm page 02h bytes 2 and 3 read `FF FF` (static lock bits) and page 28h bytes 0 and 1 are non-zero (dynamic lock bits); that dump is the acceptance test, because wakdev does not document which bits "Lock tag" sets. Then send the config-lock command `A2:2A:40:00:00:00` from Other > Advanced NFC commands so the configuration pages cannot be password-protected by a prankster later, take the card off the phone (CFGLCK activates after a power cycle) and re-read page 2Ah to confirm `40` (`research/nfc_tech.md` gap-fill section 1; NXP datasheet https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf). Core NFC exposes raw NTAG commands, so the Advanced NFC commands step works from an iPhone (`research/nfc_tech.md` gap-fill section 9). Locking is irreversible, so the short domain and slug must be live and tested first. Do the same dump check and CFGLCK step on a sample of any vendor-locked batch.
- A locked card cannot be re-pointed at the chip. That is fine: the destination lives in `site/data/links.json`, and the server answers with a 302 and `Cache-Control: no-store`, so you re-point a card by editing the file and redeploying.

### 8.5 How to place the MPBC order, and where to ask the four questions

MPBC sells through a web checkout with artwork upload, not by email order. Contact channels for questions, from https://myplasticbusinesscard.com/contact-us (read 2026-09-05): sales@myplasticbusinesscard.com, phone 714.213.8155, Monday to Friday 9 am to 5 pm Pacific, 511 S. Harbor Blvd, Ste. Q, La Habra, CA 90631. The FAQ is at https://myplasticbusinesscard.com/faq/ and free generic samples are requested at https://myplasticbusinesscard.com/request-samples/.

Billing note: `isiah@tblnt.com` does not exist until Google Workspace is set up (doc 07, Week 1). Use your current personal address for the first order and for the questions below; switch the account email once the mailbox is live.

Order steps, from the product page https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ (order form read 2026-09-05):

- [ ] Quantity: 25 (or 50). The dropdown runs 1, 25, 50, 100, 150, 200, 300, 400, 500, 1,000.
- [ ] NFC Encoding: choose **Permanent URL** and enter `https://tblnt.com/r/demo?s=card`. Do not choose "Editable URL" (that is MPBC's redirect, and the FAQ line "you can update or change the information at any point after your order" refers to it) and do not choose "I Will Encode Myself" unless you want to write 25 cards by hand.
- [ ] QR code: the back artwork already contains the QR. Do not add a "New QR Code"; if the form insists on a QR option, supply your own as a URL pointing at the same short URL, and repeat in Notes that the printed QR must be the one in the artwork.
- [ ] Upload Image: `classic-front.pdf` and `classic-back.pdf` from `cards/exports/demo-your-restaurant/`. Leave the variable data upload (.xls or .xlsx) empty; every demo card carries the same URL.
- [ ] Notes: paste the text below.
- [ ] Shipping: FedEx Ground, $10 flat, to your address. Pay by card at checkout.
- [ ] After checkout, send the four questions to sales@myplasticbusinesscard.com with the order number in the subject, or call 714.213.8155.

Notes text for the order form:

> Artwork: two vector PDFs, page size 91.6 x 59.98 mm = 85.6 x 53.98 mm trim plus 3 mm bleed each side; text and logos at least 3 mm inside trim; fonts embedded; files are RGB, please convert to CMYK and send the digital proof before production. NFC: one Permanent URL record, `https://tblnt.com/r/demo?s=card`, on every card; no hosted or dynamic redirect on the chip. QR: print the QR already in the back artwork, not an editable QR. Lock: if you can deliver the cards permanently read-only (lock bits set) please say so; otherwise deliver unlocked and I will lock in-house. Chip: please confirm the NFC IC manufacturer and part number (for example NXP NTAG215). Please send the chip and antenna position on the card with the proof.

Questions email, after the order is placed:

Subject: Order [number], four questions before a production order

Hello,

I placed order [number] today for 25 Quick Plastic NFC Business Cards. Before a larger order I need four answers in writing:

1. If I order several designs of 50 cards each in one order, is the price tier set by the combined quantity, as the product page's "no split fee if each person orders 50pcs or more" suggests?
2. What is the exact NFC IC in the "NFC 215" card (manufacturer and part number)?
3. Can you deliver cards locked read-only on request, and if so is that a hard lock (static and dynamic lock bits set) rather than an NDEF soft lock?
4. Can you encode a different URL on each card from a spreadsheet (per-card variable URL encoding)? Your FAQ says variable data is not offered on Quick cards, so please confirm for both the Quick and the Standard NFC card.

Thank you,
Zay
Tablenote, [CITY]

For a GoToTags or Seritag quote, use their quote forms (https://store.gototags.com/custom-nfc-pvc-card/ , https://seritag.com/nfc-tags/cp-cards-ntag213) with the product line "Printed PVC NFC Card, NTAG213, 500 pcs, two sides, matte, with encoding service: variable URL per card from the attached spreadsheet, permanent read-only lock: Yes" and attach the CSV of slugs. For Tagstand, the whole order (printing sides, Encode and Lock, artwork) is configured on the product page's order form and online editor; there is no email step.

## 9. Timeline from order to cards in hand

Assumes you place the demo-kit order on a Monday and answer the proof the same day it arrives. MPBC: proof within 24 h Mon to Fri, 5 business days production, FedEx Ground 2 to 5 days (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ , https://myplasticbusinesscard.com/faq/).

| Day | Step | Owner |
|---|---|---|
| Day 0, before ordering | Register the short domain, deploy the site, set the `demo` slug destination, test `https://tblnt.com/r/demo?s=card` on a phone. Re-export artwork if anything changed. | Zay |
| Day 0 (Mon) | Place the MPBC order on the product page (section 8.5), then the GoToTags and Marketing Holders orders. Email the four questions to sales@myplasticbusinesscard.com. | Zay |
| Day 1 (Tue) | MPBC proof arrives. Check trim, safe zone, colour, QR readability at 20 cm from the on-screen proof, chip position versus QR. Approve or request a revision. | Zay |
| Day 2 to 4 | GoToTags blanks arrive (economy). Run the kitchen-table encoding procedure from `research/nfc_tech.md` section 10 on 10 blanks: write, read back, native tap test on iPhone and Android, password-protect two, lock and config-lock two (blanks only), memory-dump check, re-read. | Zay |
| Day 2 to 8 | MPBC production, 5 business days from proof approval. | MPBC |
| Day 5 to 7 | Marketing Holders parcel arrives from Florida. | |
| Day 10 to 13 | MPBC cards arrive by FedEx Ground. Tap-test every card on two phones, check the IC name in NFC Tools > Read, password-protect the 25 demo cards (do not lock them; lock only cards shipped to a paying restaurant), label the box. | Zay |
| Day 13 to 14 | Assemble 10 demo sets: card, holder, staff guide, sample-report one-pager. Start pitching. | Zay |

If you need cards inside a week, add Tap Tag (Variant A): order by 1 PM ET Monday, cards ship Tuesday, arrive by Friday with free 3-day shipping. Or take Variant C (Tagstand, about 1 week, $77).

Production run timing to match the website promise of about 10 business days after proof approval: MPBC 5 business days plus 2 to 5 days FedEx Ground fits; add the 24 h or 48 h rush (surcharge unpublished, ask) for late orders. Tagstand at about 1 week fits for single-restaurant batches. GoToTags at 3 weeks and Seritag at 4 weeks do not fit and should only be used for stock you hold ahead of orders.

## 10. Checklist for this week

- [ ] Register the short domain and deploy; confirm `https://<domain>/r/demo?s=card` returns a 302 to the intended page.
- [ ] Re-export the demo artwork if the domain or copy changed: `cd site && node scripts/export-cards.mjs`.
- [ ] Order 25 (or 50) MPBC cards on the product page following section 8.5: Permanent URL, own QR, PDFs from `cards/exports/demo-your-restaurant/`, notes text pasted. (Or Variant C: 25 Tagstand two-sided, "Encode", $77.)
- [ ] Order 25 GoToTags NTAG213 blanks.
- [ ] Order 10 Marketing Holders vertical holders at https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand (confirm the flat shipping charge at checkout), or one Azar 10-pack from Home Depot.
- [ ] Install NFC Tools on the iPhone (and on an Android if you have one for tap tests). Either phone can write, password-protect, lock and send the CFGLCK command.
- [ ] Approve the MPBC proof within 24 h; check chip position against the QR.
- [ ] Email sales@myplasticbusinesscard.com (or call 714.213.8155) the four production questions: split-tier pricing at 50 per design, exact IC part number, hard-lock on request, per-card variable URL encoding.
- [ ] Phone Plastic Printers (1-800-808-7472) for their chip part and own-URL encoding; request their free sample pack.
- [ ] Request a GoToTags quote for 500 and 1,000 two-sided NTAG213 cards with variable-URL encoding and permanent lock, to hold as the pooled-run backup.
- [ ] Change the site copy chip line and `docs/02` section 1 to "NXP NTAG213 or NTAG215" (section 0), and make sure docs 06 and 07 name the same chip position, the same Tagstand tiers and the same demo-card password rule.

## Sources

- My Plastic Business Card product page and order form: https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/
- My Plastic Business Card FAQ (shipping, splits, samples, variable data): https://myplasticbusinesscard.com/faq/
- My Plastic Business Card contact page (email, phone, hours): https://myplasticbusinesscard.com/contact-us
- My Plastic Business Card artwork guidelines: https://myplasticbusinesscard.com/artwork-guidelines/
- My Plastic Business Card sample request: https://myplasticbusinesscard.com/request-samples/
- My Wholesale Business Card (same product): https://mywholesalebusinesscard.com/product/quick-plastic-nfc-business-cards/
- GoToTags blank NTAG213 card: https://store.gototags.com/nfc-pvc-card-ntag213/
- GoToTags blank NTAG215 card: https://store.gototags.com/nfc-pvc-card-ntag215/
- GoToTags blank NTAG216 card: https://store.gototags.com/nfc-pvc-card-ntag216/
- GoToTags printed PVC NFC card: https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/
- GoToTags custom NFC PVC card: https://store.gototags.com/custom-nfc-pvc-card/
- GoToTags encoding service: https://store.gototags.com/nfc-tag-encoding-service/
- GoToTags pricing rules: https://gototags.com/store/pricing
- GoToTags US shipping: https://gototags.com/store/shipping/usa
- GoToTags sales tax: https://gototags.com/store/pricing/tax
- GoToTags warranty: https://gototags.com/store/returns/warranty
- GoToTags ACR1252U reader: https://store.gototags.com/acs-acr1252u-nfc-usb-reader/
- GoToTags Desktop App credits: https://gototags.com/software/credits
- Tagstand small batch category: https://www.tagstand.com/product-categories/custom-online-order/custom-small-batch-fast-no-minimums/
- Tagstand small batch NTAG215 card (tiered one-sided and two-sided prices, Encode and Lock option, read from the order form): https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/
- Tagstand shipping and payment: https://www.tagstand.com/shipping-and-payment/
- Tagstand blank NTAG213: https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/
- Tagstand blank NTAG215: https://www.tagstand.com/products/ntag215-pvc-card-blank/
- Tagstand inkjet-printable NTAG215: https://www.tagstand.com/products/inkjet-printable-pvc-card-ntag215/
- Tagstand custom order info (lock service, setup fees): https://www.tagstand.com/custom-order-info/
- Tap Tag custom cards: https://taptag.shop/products/custom-printed-plastic-nfc-cards
- Tap Tag bulk: https://taptag.shop/pages/custom-bulk-orders
- Plastic Printers NFC cards: https://shop.plasticprinters.com/products/custom-nfc-business-cards
- Plastic Printers templates: https://www.plasticprinters.com/templates-for-designers
- Plastic Printers NFC software: https://www.plasticprinters.com/nfc-cards
- Plastic Printers turnaround: https://www.plasticprinters.com/plastic-business-cards
- Seritag NTAG213 cards: https://seritag.com/nfc-tags/cp-cards-ntag213
- Seritag NTAG215 cards: https://seritag.com/nfc-tags/cp-cards-ntag215
- Seritag delivery and US surcharge: https://seritag.com/delivery
- Seritag encoding and locking: https://seritag.com/advice/encoding
- Seritag on-metal tags: https://seritag.com/learn/using-nfc/on-metal-nfc-tags
- Seritag card chip dip: https://seritag.com/nfc-tags/cards
- Seritag table cards: https://seritag.com/nfc-tags/nfc-table-top-cards
- wakdev (NFC Tools) on lock versus password protection: https://www.wakdev.com/en/knowledge-base/videos/how-to-protect-your-nfc-tags.html
- wakdev advanced NFC commands (Android and iOS): https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-use-advanced-nfc-commands.html
- ShopNFC express printing: https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html
- ShopNFC shipping: https://www.shopnfc.com/en/content/1-shipping
- ShopNFC PVC card construction: https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html
- NFC.CARDS delivery pause: https://nfc.cards/en/content/1-delivery
- Alibaba custom NFC card listings: https://www.alibaba.com/premium/custom_nfc_card.html
- DHL China to US rates: https://vantageforwarding.com/dhl-shipping-rates-per-kg-2026-complete-pricing-guide/
- TagTix NTAG215: https://tagtixrfid.com/products/nfc-card-ntag215
- Amazon NTAG213 30-pack (price not captured): https://www.amazon.com/dp/B0CDC3DGLJ
- Amazon note on non-printable blanks: https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC5GWP9
- Marketing Holders vertical holder (live product page): https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand
- Marketing Holders 6-pack on Amazon: https://www.amazon.com/Marketing-Holders-Vertical-Business-Counter/dp/B0771KY3W1
- Marketing Holders single-pocket collection: https://marketingholders.com/collections/single-pocket-business-and-gift-card-holders
- Marketing Holders flat-rate shipping: https://marketingholders.com/pages/flat-rate-shipping
- Marketing Holders returns: https://marketingholders.com/pages/shipping-returns
- Azar 10-pack at Home Depot: https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573
- Home Depot same-day delivery: https://ir.homedepot.com/news-releases/2026/08-18-2026-130244681
- Displays and Holders table tent: https://www.displaysandholders.com/acrylic-table-tents-h42-0535-ip.html
- Etsy custom NFC stand: https://www.etsy.com/listing/4367372120/custom-logo-google-review-stand-nfc-qr
- nfc-tag-shop.de stand: https://www.nfc-tag-shop.de/en/Google-review-NFC-stand-acrylic-110-x-150-mm-white-glossy/17241
- PhoneTapify stand: https://phonetapify.com/products/google-review-nfc-table-stand
- WebstaurantStore check presenters: https://www.webstaurantstore.com/search/check-presenter.html
- Sticker Mule labels: https://www.stickermule.com/products/rectangle-labels
- AlphaCard on printing smart cards: https://www.alphacard.com/learning-center/understanding-smart-cards/can-i-print-on-smart-cards/
- Plastek CR80 template: https://plastekcards.com/artwork/templates/
- USITC HTS 8523.52: https://hts.usitc.gov/reststop/search?keyword=8523.52
- USITC 9903.88.03: https://hts.usitc.gov/reststop/search?keyword=9903.88.03
- USITC 9903.05.31: https://hts.usitc.gov/reststop/search?keyword=9903.05.31
- Federal Register Section 301 notice, July 28 2026: https://www.federalregister.gov/documents/2026/07/28/2026-15181/notice-of-actions-in-section-301-investigations-of-acts-policies-and-practices-of-various-economies
- Honigman on the 37.5% China stack: https://www.honigman.com/alert-3462
- Holland and Knight on IEEPA and Section 122: https://www.hklaw.com/en/insights/publications/2026/07/and-the-tariff-beat-goes-on
- De minimis ended: https://www.tariffstool.com/guides/de-minimis-exemption-ended-2026
- Carrier brokerage fees: https://www.nbclosangeles.com/news/national-international/tariff-exemptions-end-friday-what-online-shoppers-need-to-know/3769979/
- CBP smart card ruling: https://www.customsmobile.com/rulings/docview?doc_id=NY+N083108
- Vistaprint comparison: https://wavecnct.com/blogs/vistaprint-vs-wave-nfc-business-cards
- NXP NTAG213/215/216 datasheet: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- Foil over antenna patent: https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8393547
- Denso Wave QR quiet zone: https://www.qrcode.com/en/howto/code.html
- Google brand guidance: https://about.google/brand-resource-center/guidance/
- ECB FX rates via Frankfurter: https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP

# Research: suppliers

_Generated 2026-09-04 by a research workflow. Fact-check verdicts and gap-fill findings are appended below the main report._

# Supplier Research: Custom-Printed NFC "Tap to Review" Cards (CR80 PVC) for a US Buyer — September 2026

Scope: where to buy custom-printed credit-card-size (CR80, 85.6 x 54 mm) NFC cards at 25 / 50 / 100 / 250 / 500 / 1,000 units, plus blank NTAG215 prototyping cards, small-batch demo options, table stands, and wood/bamboo/metal alternatives. All prices were read directly from supplier pages on 2026-09-04 unless noted. Where a supplier does not publish a price, this report says so rather than guessing. Non-USD prices are shown in the supplier's currency (GBP/EUR); Seritag publishes USD.

---

## 0. Executive summary (read this first)

| Need | Best option found | Price evidence | Why |
|---|---|---|---|
| 10 blank NTAG215 cards for prototyping | GoToTags "NFC PVC Card – NTAG215" (US, MOQ 10) | $0.48/card at 10 units, $0.35 at 100 (https://store.gototags.com/nfc-pvc-card-ntag215/) | Cheapest published US price with a 10-unit MOQ; ships immediately |
| 25–50 custom-printed demo cards, fast, premium look | My Plastic Business Card "Quick Plastic NFC Business Cards" (US) | 25 = $4.95 ea, 50 = $3.96 ea; NTAG215; full color both sides; 5-business-day production; proof in 24 h (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/) | Only US vendor with a published price table from 1 to 1,000 cards, offset print, pre-programmed URL |
| Cheapest small batch with no minimum | Tagstand "Custom Small Batch NFC Card – NTAG215" (California) | $2.60/card, no MOQ, printed and encoded in the USA, ~1 week (https://www.tagstand.com/product-categories/custom-online-order/custom-small-batch-fast-no-minimums/) | UV-inkjet "velvet texture" print — good for mock-ups, less premium than offset |
| First production run 250–500 (primary) | My Plastic Business Card | 300 = $1.54 ea, 500 = $1.26 ea, 1,000 = $1.16 ea | US-made, 5-day turnaround, no import duties, proof-based workflow |
| Production backup | GoToTags Custom NFC PVC Card (Seattle) | "$1.89 down to $0.33", MOQ 500, 3-week lead, quote within 1 business day (https://store.gototags.com/custom-nfc-pvc-card/) | In-house encoding + permanent lock service, offset/digital full bleed, more chip options |
| Cheap table stands | Marketing Holders vertical acrylic business-card holder | $0.95 each (https://marketingholders.com/.../vertical-business-card-holder-countertop-plastic-display-stand/); Azar 10-pack $8.74 at Home Depot | Pocket is 2.25" wide, so a 2.125"-wide CR80 card stands upright in it |

Demo-kit budget (Section 9): roughly **$150–$330** depending on the print route chosen. First production run of 500 (Section 10): roughly **$630–$700 landed** from the US primary supplier, versus ~$490 + shipping + US duty + 4 weeks from Seritag (UK) or ~$60–$250 + freight + ~37.5% China tariff stack + broker fees + sampling risk from Alibaba.

---

## 1. Technical background that affects supplier choice

**Chip choice (NTAG213 vs 215 vs 216).** NTAG213 has 144 bytes of user memory but only 137 bytes of usable NDEF space; NTAG215 has 504 bytes; NTAG216 has 888 bytes (Tagstand cheat-sheet: https://www.tagstand.com/nfc-chip-cheatsheet/; NXP datasheet: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf). In practice an NTAG213 holds a URL of roughly 130–137 characters after NDEF overhead (https://proudtek.com/products/rfid-labels/ntag213-nfc-sticker/, https://nfcore.app/guides/nfc-tag-data-capacity-by-chip). One manufacturer documents a real case where a 190-character Google review URL would not fit an NTAG213 and needed a shortener or an NTAG215 (https://proudtek.com/products/rfid-labels/ntag213-nfc-sticker/).

Google's long-form review link (`https://search.google.com/local/writereview?placeid=ChIJ...`) is usually ~90–110 characters; the `g.page/r/<code>/review` short form is ~30–45 characters (https://whitespark.ca/google-review-link-generator/, https://webpunch.com/google-review-short-urls/). goo.gl links stopped working on 2025-08-25, so do not rely on them (https://en.wikipedia.org/wiki/Google_URL_Shortener).

**Recommendation:** encode a short redirect URL on your own domain (e.g., `https://<brand>.co/r/ab12cd`) rather than the raw Google link. It fits NTAG213 with room to spare, lets you swap the destination later without re-issuing cards, and gives you per-card tap analytics that feed the monthly report product. With a redirect URL, NTAG213 is sufficient and is the cheapest and most widely stocked chip; NTAG215 costs a few cents more and is the safe choice if you ever want to encode the raw Google link directly.

**Locking.** A review card left on a restaurant table can be rewritten by any Android phone unless the tag is set read-only. GoToTags' encoding service offers "Yes: NFC tags will be permanently read-only" or "No" at no extra charge (https://store.gototags.com/nfc-tag-encoding-service/). Seritag offers "Single Encoding (Locked)" or "(Unlocked)" (https://seritag.com/nfc-tags/cp-cards-ntag213). My Plastic Business Card states the URL "can be updated later via NFC Tools app," which implies unlocked delivery — ask them to lock, or lock the cards yourself with the free NFC Tools app before handing them out (locking is irreversible).

**Printing on PVC.** Standard "quick" direct-to-card thermal printing on stock PVC cards cannot print full bleed ("PVC cards do not support full-bleed printing" — https://gototags.com/store/printing). Edge-to-edge, photo-quality artwork requires either retransfer printing (nfc.cards, ShopNFC express), UV inkjet (Tagstand, NFC Tagify), or offset/digital sheet printing then die-cut (My Plastic Business Card, Plastic Printers, GoToTags custom, Seritag, ShopNFC offset). Retransfer has a known weakness with large solid-color areas (https://nfc.cards/en/content/11-prints).

**US import rules (matter for UK/EU/China suppliers).** The $800 de minimis exemption ended for China/Hong Kong goods on 2025-05-02 and for all countries on 2025-08-29; the temporary postal flat-fee option ended 2026-02-28, so every parcel now gets a formal entry with ad valorem duty (https://www.tariffstool.com/guides/de-minimis-exemption-ended-2026, https://www.china-fulfillment.com/us-de-minimis-ended-2026-china-sellers-guide.html). A 12.5% Section 301 "forced labor" tariff on Chinese goods took effect 2026-07-24, bringing the aggregate Section 301 rate on List 3 Chinese goods to 37.5% on top of the MFN rate (https://globalimportblog.bakermckenzie.com/2026/07/24/united-states-new-10-to-12-5-section-301-forced-labor-tariffs-on-over-60-countries-take-effect-july-24-2026-replacing-current-10-section-122-duties/). Carriers add brokerage fees that "start at $30 or more" (https://www.nbclosangeles.com/news/national-international/tariff-exemptions-end-friday-what-online-shoppers-need-to-know/3769979/). Seritag now applies "a 10% surcharge plus admin fees" on US deliveries and offers duty prepayment (https://seritag.com/delivery); ShopNFC dropped free US shipping and charges from €9.90 with duties billed to the recipient (https://www.shopnfc.com/en/content/1-shipping). Chip-bearing cards are classified under HTS 8523.52 "smart cards" (CBP ruling NY N083108: https://www.customsmobile.com/rulings/docview?doc_id=NY+N083108). The exact current effective rate for 8523.52 from China was not confirmed in this research — verify with a broker before relying on landed-cost estimates.

---

## 2. US-based suppliers (detailed)

### 2.1 GoToTags (Seattle, WA) — store.gototags.com
The most complete US NFC supply house: blank stock, quick printing, custom made-to-order cards, and an encoding/locking service.

**Blank cards (in stock, immediate lead time, MOQ 10):**
- NFC PVC Card – NTAG213: $0.30 @10, $0.29 @100, $0.27 @1,000, $0.23 @10,000, $0.20 @50,000 (https://store.gototags.com/nfc-pvc-card-ntag213/). Also sold as a 200-pack.
- NFC PVC Card – NTAG215: $0.48 @10, $0.35 @100, $0.33 @1,000, $0.27 @10,000; 85.5 x 54 x 0.9 mm; "Pre NDEF Formatted"; 200-pack $49.98 (https://store.gototags.com/nfc-pvc-card-ntag215/, https://store.gototags.com/nfc-tags/nfc-tags-by-use/nxp-ntag215-nfc-tags/).
- Pricing rules: tiers apply per SKU per order; two SKUs cannot be combined to reach a tier; quantities between tiers are priced at the lower tier (https://gototags.com/store/pricing).

**Quick printing (on stock white PVC, fast, not full bleed, no overlay):**
- "Printed PVC NFC Card – NTAG213" is listed at "$11.99, as low as $0.55" on the custom-cards category page (https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/); the individual product page returned 404 during this research, so confirm on the live store.
- Black Thermal Transfer Printing service: $0.77 @50, $0.47 @100, $0.16 @500, $0.13 @1,000, $0.09 @5,000; min 50; +$0.02/unit variable data; lead 1–7 days; files ai/pdf/eps/svg (https://store.gototags.com/black-thermal-transfer-printing/). The page describes this for inlays/stickers; confirm applicability to cards.
- Color Inkjet Printing service: $0.24 @250, $0.22 @500, $0.18 @1,000, $0.15 @5,000; min 250; +$0.02 variable data; +$0.02 full bleed; single side; lead 1–7 days; template on GoToTags GitLab; files ai/pdf/eps/svg (https://store.gototags.com/color-inkjet-printing/). Also described as for white stickers.
- Print spec page: B&W = thermal/inkjet black only; color = direct-to-card thermal on cards; "No full bleed printing on cards; suitable for simple art, logos, text, or barcodes"; no PMS matching on standard; custom orders get full bleed and PMS at extra cost (https://gototags.com/store/printing).

**Custom NFC PVC Card (premium, made to order):**
- "Typical prices range from $1.89 down to $0.33 depending on quantity, customizations, and market conditions"; MOQ 500; lead 3 weeks (category page says 15–20 business days); digital and offset printing, full bleed, CMYK and black, glossy or matte; frosted, metallic gold/silver backgrounds, hot stamping, UV clear coat available; pre-NDEF-formatted chips; artwork templates via GitLab; quote within 1 business day (https://store.gototags.com/custom-nfc-pvc-card/, https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/).
- Artwork: "vector artwork in CMYK format for best print results." Materials: white PVC, colored PVC, metal ("layered composite, scannable from non-metal side only"), wood ("scannable from both sides"), paper. Silkscreen limited to 1–2 PMS colors.

**Encoding service:** $0.23 @50, $0.19 @100, $0.06 @1,000, $0.05 @50,000, $0.04 @100,000; MOQ 30; permanent read-only lock option (Yes/No) at no listed surcharge; correlated encoding +$0.01; lead 1–7 days; only for tags bought from GoToTags (https://store.gototags.com/nfc-tag-encoding-service/). Self-encoding via the free GoToTags Desktop App is the alternative.

**Bamboo card:** see Section 7. **Proofs/samples:** not stated on the pages fetched — ask when requesting a quote.

### 2.2 Tagstand (California) — tagstand.com
- Custom Small Batch NFC Card – NTAG215: **$2.60/card, no minimum order**; "Full bleed, color printing on a white PVC card"; UV inkjet with a "velvet texture"; "Printed and encoded in the USA"; "Typical Production Lead Time: 1 week"; customized in California (https://www.tagstand.com/product-categories/custom-online-order/custom-small-batch-fast-no-minimums/, https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/).
- Artwork spec (same page): 300 dpi or higher; 3 mm bleed beyond the edge; 3 mm safe spacing from the edge; 8 pt font or larger; line weight 0.05 mm or greater. File types not listed. Lock status not stated — ask.
- Blank NTAG215 PVC Card: $0.63 (1–24), $0.61 (25–49), $0.59 (50–99), $0.52 (100+) (https://www.tagstand.com/products/ntag215-pvc-card-blank/).
- Inkjet Printable PVC Card – NTAG215 (DIY with a home inkjet that has a card tray): $1.10 (1–24), $0.91 (25–49), $0.88 (50–99), $0.84 (100–499), $0.75 (500–999), $0.70 (1,000+) (https://www.tagstand.com/products/inkjet-printable-pvc-card-ntag215/).
- Site notice: "the current tariff situation will cause restocking delays and necessary price increases" (https://www.tagstand.com/product-categories/ntag215/nfc/).
- Tagstand-brand 25/50/100 blank NTAG215 packs are also sold on Amazon (B06ZZWVZ3B, B07CLLD7XB, B07CLCH92T) — Amazon pages could not be fetched, so no live price was captured.

### 2.3 My Plastic Business Card (Southern California; phone 714 area) — myplasticbusinesscard.com
**Quick Plastic NFC Business Cards** (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/):
- 1 = $49.50; 25 = $4.95 ea; 50 = $3.96 ea; 100 = $2.20 ea; 150 = $2.04 ea; 200 = $1.65 ea; 300 = $1.54 ea; 400 = $1.43 ea; 500 = $1.26 ea; 1,000 = $1.16 ea.
- CR80 3.375 x 2.125", 0.76 mm PVC, matte both sides, full color both sides included, die-cut rounded corners; embedded "NFC 215" chip; pre-programmed URL included; QR code with editable URL included; variable data via Excel.
- Standard production 5 business days; 24- or 48-hour expedite available; FedEx Ground; digital proof within 24 h (Mon–Fri) with revisions until approved; design service $60; clear sleeves available.
- Same product is sold at mywholesalebusinesscard.com (https://mywholesalebusinesscard.com/product/quick-plastic-nfc-business-cards/).
- Artwork template not published; industry-standard CR80 file (3.625 x 2.375" with 1/8" bleed, 300 DPI, CMYK, 1/8" safe zone) will pass; they proof every order (https://plastekcards.com/artwork/templates/, https://www.plasticprinters.com/templates-for-designers).

### 2.4 Plastic Printers (Hastings, MN) — plasticprinters.com
- Custom NFC Business Cards: 50 = $268 ($5.36 ea); 100 = $536 ($5.36 ea); 250 = $716 ($2.86 ea); 500 = $972 ($1.94 ea); 1,000 = $1,314 ($1.31 ea) (Shopify variant data at https://shop.plasticprinters.com/products/custom-nfc-business-cards.json; product page https://shop.plasticprinters.com/products/custom-nfc-business-cards).
- Includes a fallback QR code and their own redirect software ("change the information your cards shares or where your card directs visitors anytime"); production starts after proof approval. Chip type not stated on the page — ask.
- Artwork templates: trim 3.375 x 2.125", 0.125" corner radius, bleed "no less than 1/8"", 300 DPI (1200 for line art), vector .eps/.ai preferred; accepts TIF, EPS, BMP, PSD, AI, PDF, JPG, ID, PUB; PDF templates downloadable (https://www.plasticprinters.com/templates-for-designers).
- Made in-house in the USA; most orders ship in a few days; standard shipping 3–5 days (https://www.plasticprinters.com/plastic-business-cards). Sample pack available via their NFC page (https://www.plasticprinters.com/nfc-cards).

### 2.5 Tap Tag (US) — taptag.shop
- Custom Plastic Tap Card: 1 = $29.95; 2 = $49.00; 5 = $119.95; 10 = $195.00 (Shopify variants at https://taptag.shop/products/custom-printed-plastic-nfc-cards.json). NTAG215, 600 DPI edge-to-edge both sides, laminated; "One business day for up to 100 items"; same-day ship by 1 PM ET; free tracked US shipping on $30+; any file format; human designers review files; 60-day refund (https://taptag.shop/products/custom-printed-plastic-nfc-cards).
- Bulk: "Tier discounts starting at just five or more"; 5–100 items ≈ 24 h, 100–350 ≈ 72 h; free 3-day US shipping on 10+; tier prices only by inquiry form (https://taptag.shop/pages/custom-bulk-orders).
- Stock Tap Review Card (Google/Trustpilot/TripAdvisor): $19.95 (reg. $24.95); 3 = -12%, 5 = -15%, 10 = -20%; Custom Tap Review Card with your logo "From $29.95"; NTAG213; dynamic dashboard by default, or hard-program a URL by pasting it in cart notes (https://taptag.shop/products/tap-review-card).
- Verdict: excellent for 1–10 urgent demo cards, too expensive above that.

### 2.6 iPOS Supply "Tap 2 Review" (US) — ipossupply.com
- Custom NFC tap card, upload your own front/back design: sale price $44.99; ships within 72 h; accepts bmp/gif/jpg/png/tiff/pdf; no subscription; chip and print method not stated (https://ipossupply.com/tap-to-review-custom-nfc-tap-cards/).

### 2.7 PhoneTapify (US) — phonetapify.com
- Google Review NFC Table Stand: $81.40 (2 = $146.52; 4 = $276.76; 10 = $610.50); acrylic or ABS; custom logo printing available; ships from the US in 1–2 days processing + 5–7 days; free shipping over $49 (https://phonetapify.com/products/google-review-nfc-table-stand).
- Stand + Card combo: $98.99; stand 85 x 145 mm bent at 190 mm; card 85.5 x 54 mm (https://phonetapify.com/products/google-review-nfc-table-stand-card-combo.json).

### 2.8 ID Cards Direct (US phone 1-800-711-5771; ships from outside the US)
- Custom printed NTAG213 card: $11.00 reference price (single-sided color, one design, URL encoded); "currently unavailable"; blank NTAG213 100-pack $185 ($1.85 ea); custom cards "shipped from outside of the US, so may be subject to import taxes" (https://www.idcardsdirect.com/products/custom-printed-ntag213-rfid-nfc-card-13-56mhz). Not competitive.

### 2.9 Other US names checked
- **Vistaprint:** the US NFC page fetched shows only QR-code cards; a third-party comparison (Feb 2026) reports the VistaConnect NFC card at $32.99 with a 100-scan/month cap and links only to VistaConnect (https://wavecnct.com/blogs/vistaprint-vs-wave-nfc-business-cards). Not usable for a custom Google-review URL product.
- **Printleaf (NYC):** custom NFC tags are quote-only; no published prices (https://www.printleaf.com/custom-nfc-tags/).
- **CardLogix (Irvine, CA):** sells NTAG215 cards and CardPresso encoding software; quote-based (https://www.cardlogix.com/product/nxp-ntag-215-nfc-card-tag/).
- **TagTix RFID:** blank NTAG215 50-pack $30 ($0.60 ea), 3-day free US shipping via Amazon fulfillment, custom printing by chat quote (https://tagtixrfid.com/products/nfc-card-ntag215).
- **ID Card Group:** no NFC card listing found under that name; nearest match is ID Cards Direct above.
- **CardsPlus:** the company found is South African (cardsplus.co.za), no MOQ, quote-based; not relevant for a US buyer (https://cardsplus.co.za/plastic-cards/).
- **Tapmate / Tapkit:** tapmate.io is a subscription NFC platform and tapmate.net is UK; neither publishes card prices (https://tapmate.io/, https://www.tapmate.net/). Nothing named "Tapkit" surfaced.

---

## 3. UK / EU suppliers (ship to US; duties and surcharges apply)

### 3.1 Seritag (UK) — seritag.com (prices published in USD, ex-VAT)
- Custom PVC Card NTAG213: 100–199 = $2.54; 200–299 = $1.56; 300–499 = $1.24; 500–999 = $0.98; 1,000–1,999 = $0.78; 2,000–4,999 = $0.69; 5,000–9,999 = $0.63; MOQ 100 (https://seritag.com/nfc-tags/cp-cards-ntag213).
- Custom PVC Card NTAG215: $2.59 / $1.76 / $1.32 / $1.03 / $0.85 / $0.75 / $0.64 at the same tiers; MOQ 100 (https://seritag.com/nfc-tags/cp-cards-ntag215).
- "Full colour double sided custom print"; finishes Gloss, Matt, Crystal Matt; options: spot gloss, signature strip, edge varnish, slots; thickness 0.82–0.88 mm; encoding: self (free app), Seritag single encoding locked/unlocked, variable encoding.
- Proof: "We will quickly generate a pdf proof for you to check before we go to print," typically within 24 h. Production: "estimated at 4 weeks." Artwork: vector or high-res image; upload images/pdf up to 8 MB; "Graphics Guidelines" PDF and card template linked from each product page.
- US delivery: "all deliveries to the US now attract a 10% surcharge plus admin fees" (from 2026-02-25); duty prepayment option recommended; stock orders under 5,000 placed before 1 PM ship same day (https://seritag.com/delivery).
- NFC Table Cards 140 x 90 mm PVC (a larger "table talker" format, optional acrylic stand): $5.33 @100–249; $2.64 @250–499; $1.82 @500–999; $1.60 @1,000; MOQ 100; 4 weeks; NTAG213/215/424/ICODE (https://seritag.com/nfc-tags/nfc-table-top-cards).

### 3.2 ShopNFC (Italy) — shopnfc.com (EUR)
- NFC Cards in PVC NTAG213: €1.29 @10 (MOQ), €1.15 @50, €0.78 @200, €0.54 @800, €0.42 @2,000, €0.37 @8,000; black thermal print 1–2 days; color print 1 or 2 sides standard 7–15 working days, express 2–5 (https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html).
- NTAG216 cards: €1.49 @50, €0.99 @100, €0.75 @500, €0.60 @1,000; MOQ 10 (https://shopnfc.com/en/nfc-cards/107-497-white-ntag216-nfc-cards.html).
- Custom NFC Cards – Express Printing (retransfer, NTAG213/216/MIFARE): €1.79 base, €1.61 @50, €1.43 @100, €1.25 @500; MOQ 10; production 1–4 days; one- or two-sided (https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html).
- Custom Printed NFC Cards – Offset: €0.99 (<1,000), €0.89 @1,000, €0.69 @5,000; MOQ 500; 15 days; CMYK offset both sides with protective layer; vector PDF/AI/CDR with 1 mm bleed; email "Graphic confirmation" before production; serials/QR/UID printing free (https://shopnfc.com/en/nfc-cards/80-43-offset-printed-nfc-cards.html).
- Add-ons: NFC encoding €0.09/card; UID reading €0.05/card; graphics change €10; variable printing free.
- Artwork spec (express/retransfer): JPG/PNG/PDF/SVG, 300 DPI min, 2 mm bleed each side (file ≈ 89.6 x 58 mm), 2 mm safe margin, no crop marks.
- Shipping to the US: express 3–5 working days, "from € 9.90 upwards," DHL/UPS/FedEx; free US shipping discontinued; customs charged to recipient (https://www.shopnfc.com/en/content/1-shipping).

### 3.3 NFC.CARDS (EU) — nfc.cards (EUR)
- Custom NFC Card NTAG213, front and back: €3.99 (1–19), €3.95 @20, €3.89 @50, €3.69 @100, €3.59 @500, €3.49 @1,000; MOQ 10; retransfer 600 DPI; "manufactured within 1 to 5 days" (https://nfc.cards/en/front-and-back-printing/61-custom-nfc-card-ntag213-front-and-back-printing.html). NTAG216 variant also offered.
- Print guide: 600 DPI; PNG/JPG/PDF; 1 mm bleed (file 87.5 x 56 mm or 2067 x 1323 px); flatten images, outline fonts, no printer marks, do not round corners in the file; large solid-color areas not recommended (retransfer); online designer at design.nfc.cards; send designs to print@nfc.cards with the order number (https://nfc.cards/en/content/11-prints). US shipping cost not published.

### 3.4 NFC Tagify (UK) — nfctagify.com (GBP)
- Customised Coloured PVC Digital Card: £22.99, with 15% off at 2+, 20% at 5+, 24% at 10+, 30% at 25+, 34% at 50+ (≈ £15.17); NXP NTAG213; industrial UV print with white ink, optional spot gloss; 54 x 86 mm, 0.76 mm; 11 colors (https://nfctagify.com/products/customized-coloured-pvc-digital-cards). No MOQ; custom items delivered in 2–3 weeks; bulk over a few hundred by email (https://nfctagify.com/blogs/news/bulk-nfc-ordering-simplified). Stock blanks: coloured PVC £4.99, wooden £9.99, metal £24.99 (https://nfctagify.com/collections/stock-digital-business-cards). Too expensive per card for a restaurant program.

### 3.5 nfc-tag-shop.de (Germany)
- Google review NFC acrylic stand 110 x 150 mm, 2.7 mm white glossy acrylic, NTAG213, pre-coded and write-protected: €34.90; worldwide shipping (https://www.nfc-tag-shop.de/en/Google-review-NFC-stand-acrylic-110-x-150-mm-white-glossy/17241).

---

## 4. China / Alibaba options (realistic landed cost)

**Indicative unit prices and MOQs (Alibaba listings, Sept 2026):**
- Shenzhen ZD Technology: custom printable NTAG213/215 PVC card $0.12–0.27, MOQ 100 (https://www.alibaba.com/premium/custom_nfc_card.html).
- Shenzhen Prostek Card: hologram NFC business card $0.18–0.35, MOQ 100; PVC NFC restaurant table stand $1.20–3.00, MOQ 100 (same page).
- Shenzhen Xinye Intelligence Card: $0.12–0.28, MOQ 500; Shenzhen Sunlanrfid: $0.15–0.50, MOQ 100; Guangzhou Jiezhong: $0.11–0.23, MOQ 500; Shenzhen Chuangxinjia: $0.09–0.45, MOQ 500; Shenzhen Yintongshang: $0.08–0.70, MOQ 100 (https://www.accio.com/plp/nfc-card-alibaba).
- Chuangxinjia direct (nfctagfactory.com): printed NTAG213 PVC card 85.5 x 54 x 0.84 mm, MOQ 500, samples "available" (category page says free samples), 200 pcs/box, ships by express/air/sea; price by quote (https://www.nfctagfactory.com/products/Printed-Ntag213-NFC-PVC-Card.html, https://www.nfctagfactory.com/products/nfc-card.htm).
- ZFCards: minimum order $45; proof sample $45 (refunded on 10,000+ orders); samples in 1–7 working days; production 3–7 working days after proof approval (5–7 days for 5,000); CDR/AI/PDF accepted; free design; EXW/FOB/CNF/DDU/CIF (https://www.zfcards.com/1356mhz-ntag-213215216-pvc-nfc-card.html).
- Xinyetong (asiarfid.com): silk-screen, offset, digital printing, hot foil, embossing, spot UV, matte; free-sample program on stickers; quote-based (https://www.asiarfid.com/nfc-print-card-with-ntag213-chip.html).

**Freight and duty:** DHL Express China→US via forwarders runs roughly $9–16/kg with 2–5 business-day transit; DHL raised base rates 5.9% on 2026-01-01 and now updates fuel surcharges weekly (https://vantageforwarding.com/dhl-shipping-rates-per-kg-2026-complete-pricing-guide/, https://deefreight.com/dhl-shipping-from-china-to-usa/). 500 CR80 cards weigh roughly 3 kg with packaging (a single card is ~5.2 g per NFC Tagify's spec). Add US duty on HTS 8523.52 at the current China stack (Section 301 List 3 25% + 12.5% forced-labor tariff = 37.5% on top of MFN; verify), plus carrier brokerage ($30+).

**Worked landed estimate, 500 cards at $0.30 (mid-range quote):** goods $150 + proof sample ~$45 + DHL ~$50 + duty ~$56 (37.5% of $150) + brokerage ~$35 ≈ **$336 (~$0.67/card)**, 2–3 weeks door-to-door including a sample round. At 1,000+ cards the per-unit advantage widens; at 250–500 the savings over a US supplier are roughly $300 and come with sampling delay, color-matching risk, and no recourse on print defects.

---

## 5. Blank white NTAG215 cards for fast prototyping

| Source | Pack | Price | Notes |
|---|---|---|---|
| GoToTags | 10+ | $0.48 ea @10, $0.35 @100 | Pre-NDEF formatted; immediate; US (https://store.gototags.com/nfc-pvc-card-ntag215/) |
| Tagstand | 1+ | $0.63 ea; $0.61 @25; $0.59 @50; $0.52 @100 | California (https://www.tagstand.com/products/ntag215-pvc-card-blank/) |
| TagTix RFID | 50 | $30.00 ($0.60 ea) | Free 3-day US shipping via Amazon fulfillment (https://tagtixrfid.com/products/nfc-card-ntag215) |
| Walmart marketplace | 50 / 100 | $13.46 / $23.99 (as surfaced in a search snippet; verify live) | (https://www.walmart.com/c/kp/ntag215) |
| Amazon | 10 / 25 / 50 / 100 | Not captured — Amazon pages blocked the fetch | MINDRFID 10-pk B0B5ZX9QND; TimesKey 10-pk B075CL71FK; Tagstand 25-pk B06ZZWVZ3B, 50-pk B07CLLD7XB, 100-pk B07CLCH92T |

Note that most blank PVC NFC cards are NOT inkjet printable; they need a dye-sublimation/retransfer ID-card printer (https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC5GWP9). For home printing use Tagstand's inkjet-coated NTAG215 card ($0.91 @25).

---

## 6. Small-batch options for 10–25 demo cards with a custom logo

1. **My Plastic Business Card** — 25 cards $123.75 ($4.95 ea), offset full color both sides, matte, NTAG215, pre-programmed, proof in 24 h, 5-day production (24 h rush available). Best print quality per dollar at this size.
2. **Tagstand Custom Small Batch** — any quantity at $2.60 ea (10 = $26; 25 = $65), UV inkjet full bleed, 1-week lead, encoded in the US. Best for quick iteration on several designs.
3. **Tap Tag** — 10 custom cards $195 ($19.50 ea) with next-day turnaround and free 3-day shipping. Use only if you need cards in 3–4 days.
4. **iPOS Supply** — single custom review card $44.99, ships within 72 h.
5. **NFC.CARDS (EU)** — 10 cards at €3.99–3.95 with 600 DPI retransfer in 1–5 days, but EU shipping plus US duty/brokerage make it uneconomic for 10 cards.
6. **DIY**: GoToTags blank NTAG215 ($0.48) + a local ID-badge shop with a retransfer printer (Zebra ZXP 9 / HID Fargo HDP class — retransfer "can print onto cards with uneven surfaces such as smart cards" and edge-to-edge: https://www.idwholesaler.com/retransfer-printers.html). No national service explicitly prints on customer-supplied cards; ID Wholesaler and AlphaCard on-demand printing have 100-card minimums on their own stock (https://www.idwholesaler.com/id-card-printing-service.html, https://www.alphacard.com/id-cards-on-demand). Ask local badge/print shops directly.

---

## 7. Wood, bamboo and metal NFC cards

**Bamboo/wood:**
- GoToTags Bamboo Wood NFC Business Card NTAG213: $19.98 @1, $10.19 @10, $10.10 @100; laser engraving, silkscreen, UV options; immediate for stock (https://store.gototags.com/wood-nfc-business-card-ntag213-bamboo/).
- ShopNFC bamboo NTAG213: €1.50 (1–99), €1.35 @100+; MOQ 10; 85.5 x 54 x 1.4 mm; natural, laser engraving, or UV color print (1–5 days) (https://shopnfc.com/en/nfc-cards/453-wooden-nfc-cards-in-bamboo-ntag213-customizable.html).
- Seritag Wooden Card: MOQ 200; $2.54 @200–499; $1.63 @500–999; $1.58 @1,000; single-color laser etch (double-sided optional); NTAG213/215; 4 weeks; currently order by contact only (https://seritag.com/nfc-tags/wooden-card).
- GoToTags notes wood cards are "scannable from both sides" and need longer lead times and higher MOQs on custom runs (https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/).

**Metal — yes, metal cards need special construction:**
- Ordinary NFC tags "normally do not work when they are on or near metal surfaces"; metal cards work only with an on-metal (shielded) tag that "has an extra layer of ferrite (a ceramic metal) built in" (https://metaliccards.com/en/metal-nfc-business-cards). MetalicCards: no MOQ, express 2–5 business days, regular 3–4 weeks, NTAG213 default; price by quote.
- Consequence: metal cards read from one side only. GoToTags: metal is a "layered composite, scannable from non-metal side only" (https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/). ShopNFC's hybrid metal/PVC NTAG213 card: €14.90, €13.41 @5, €11.92 @10; "only readable from the PVC side"; laser engraving 3–4 weeks; UV print 1–3 weeks (https://www.shopnfc.com/en/nfc-cards/719-1425-metal-nfc-cards-ntag213-customizable.html).
- Rock Design (US): black or gold stainless, 0.5 mm, "NFC tag 215," UV CMYK + white ink, 2–3 business days + transit; price shown only at checkout; 10+ by quote (https://www.rockdesign.com/quick-business-cards/nfc-metal-business-cards).
- Ferrite on-metal tag component pricing for reference: ShopNFC ferrite-only on-metal tags €0.25 (MOQ 20) down to €0.20 @1,000 (https://shopnfc.com/en/6-on-metal-nfc-tags).
- Verdict: metal is a premium upsell ($10–25 per card cost) with a one-sided read that confuses guests; not recommended for the table-drop use case. Bamboo at $1.35–2.54 is a plausible "eco" variant later.

---

## 8. Acrylic stands, card holders and table tents that fit a CR80 card

A CR80 card is 2.125 x 3.375" (53.98 x 85.6 mm). Any holder designed for 2 x 3.5" business cards fits it upright.

- **Marketing Holders vertical single-pocket countertop holder:** $0.95 each; overall 2.5"W x 3.5"H x 1.75"D; pocket 2.25"W x 0.75"D; clear acrylic (https://marketingholders.com/business-and-gift-card-holders/countertop-business-and-gift-card-holders/single-pocket-business-and-gift-card-holders/vertical-business-card-holder-countertop-plastic-display-stand/). Also sold on Amazon in 5- and 6-packs (B0791HMTHZ, B0771KY3W1; live price not captured).
- **Azar Displays clear acrylic vertical business card holder, 10-pack:** $8.74 at Home Depot (https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573).
- **Displays and Holders 5 x 3.5" two-sided side-load table tent** (styrene, acrylic or PETG; full-color imprint from 50 pcs): price not shown on page (https://www.displaysandholders.com/acrylic-table-tents-h42-0535-ip.html). Holds a printed insert; a CR80 card can sit in the pocket in front of an insert.
- **Branded NFC stands (chip built in, no card needed):** Etsy custom-logo acrylic NFC review stands typically $25–50 (e.g., listings at $27.36 and $32.14; https://www.etsy.com/market/nfc_acrylic_stand, https://www.etsy.com/listing/4367372120/custom-logo-google-review-stand-nfc-qr); nfc-tag-shop.de €34.90; PhoneTapify $81.40; Review Highway on Amazon (4.3 x 2.7" glossy acrylic; https://www.amazon.com/Google-Review-Stand-Reusable-Business/dp/B0D9BXZHBL; price not captured); Seritag 140 x 90 mm NFC table cards from $5.33 @100 with optional acrylic stand; Alibaba Prostek PVC NFC table stands $1.20–3.00, MOQ 100.
- **V1CE NFC table tent** sizes 110 x 110 x 150 mm and 190 x 100 x 230 mm, acrylic with UV print, quote-based (https://v1ce.co/product/customizable-nfc-table-tent).

For the demo, the $0.95 Marketing Holders pocket is the practical choice: the server can leave the card in the holder at the table or drop the card alone.

---

## 9. Recommended DEMO-KIT purchase plan

Goal: 25–50 branded demo cards, 10 blank NTAG215 cards, a few stands, ready in ~1–2 weeks.

| Item | Supplier | Qty | Unit | Subtotal |
|---|---|---|---|---|
| Custom-printed NFC review cards (offset, full color both sides, matte, NTAG215, pre-programmed) | My Plastic Business Card | 50 | $3.96 | $198.00 (or 25 @ $4.95 = $123.75) |
| Quick iteration cards with 1–2 alternative designs | Tagstand Custom Small Batch NTAG215 | 10 | $2.60 | $26.00 |
| Blank NTAG215 cards for encoding tests / hand-written prototypes | GoToTags | 10 | $0.48 | $4.80 |
| Acrylic vertical card holders | Marketing Holders (or Azar 10-pk $8.74) | 10 | $0.95 | $9.50 |
| One premium branded stand to show a "counter" option | Etsy custom NFC acrylic stand | 1 | ~$27–50 | ~$35 |
| Shipping (three domestic parcels; MPBC FedEx Ground, Tagstand, GoToTags, Marketing Holders) | — | — | — | ~$40–60 |
| **Total (50-card version)** | | | | **≈ $315–$335** |
| **Total (25-card version, no premium stand)** | | | | **≈ $200–$220** |

Design deliverables to prepare before ordering: a CR80 file at 3.625 x 2.375" (1/8" bleed), 300 DPI, CMYK, text inside a 1/8" safe zone, exported as PDF with fonts outlined; for Tagstand supply the same art with 3 mm bleed/3 mm safe. Put a QR code on the back as a fallback for phones without NFC. Encode a short branded redirect URL (Section 1) and lock the tags (ask MPBC to lock, or lock with NFC Tools before the demo).

Timeline: MPBC proof within 24 h, 5 business days production, FedEx Ground 2–5 days (≈ 2 weeks; 24-h rush available). Tagstand ≈ 1 week. GoToTags blanks ship immediately.

---

## 10. Recommended suppliers for a first production run of 250–500 cards

**Primary: My Plastic Business Card (US).** 300 cards = $462 ($1.54 ea); 500 = $630 ($1.26 ea); 1,000 = $1,160 ($1.16 ea). Reasons: the only US vendor with transparent tier pricing from 25 to 1,000; offset print, full color both sides, NTAG215; 5-business-day production with proof; no import duty, no customs delay, no tariff exposure; pre-programming and variable data (unique URL per card from an Excel sheet — exactly what per-restaurant redirect codes require). At a $15 sale price, COGS of $1.26–1.54 leaves ample margin, so the ~$0.60/card China saving is not worth the risk at this volume. Confirm two things by email: (1) that they will lock the NTAG215 read-only, and (2) their exact bleed/safe-zone template.

**Backup #1: GoToTags Custom NFC PVC Card (Seattle, US).** MOQ 500, "$1.89 down to $0.33," 3-week lead, offset/digital full bleed, gloss or matte, in-house encoding with permanent lock ($0.06/card at 1,000; $0.19 at 100), NTAG213/215/216 and other chips, PMS matching available. Request a quote for 500 and 1,000 cards, NTAG213 and NTAG215, double-sided CMYK matte, with locked encoding. GoToTags is also the natural long-term supplier once volumes reach 1,000+ per order, and its blank cards + encoding service can cover the 10 free replacement cards per month.

**Backup #2: Seritag (UK).** 500 NTAG213 cards at $0.98 = $490 (or NTAG215 $1.03 = $515), full-color double-sided with gloss/matt/crystal-matt finishes, locked encoding, PDF proof within a day — but 4-week production plus a 10% US surcharge, admin fees and US duty, so budget ≈ $600–650 landed and 5+ weeks. Use if the US options have a capacity or quality problem.

**Plastic Printers** (500 = $972, $1.94 ea) is a solid US alternative if you want their bundled redirect software and sample pack, but it is ~50% more expensive than MPBC at 500.

**China (Alibaba) at 250–500:** ≈ $0.67/card landed on the worked example above, but requires a $45 proof sample round, 2–3 weeks, a customs entry at the current 37.5% China tariff stack (verify HTS 8523.52 treatment with a broker), and carries print-quality risk. Revisit at 2,000+ cards per order, when GoToTags custom pricing (down to $0.33) and Chinese factories ($0.09–0.28) both become compelling.

---

## 11. Artwork spec cheat-sheet (by supplier)

| Supplier | Trim | Bleed | Safe zone | DPI | Color | Files | Template |
|---|---|---|---|---|---|---|---|
| My Plastic Business Card | 3.375 x 2.125" | industry 1/8" (not published) | 1/8" | 300 | CMYK | proof-based; any | email sales@ for template |
| Plastic Printers | 3.375 x 2.125", 0.125" radius | ≥ 1/8" | not stated | 300 (1200 line art) | vector preferred | TIF EPS BMP PSD AI PDF JPG ID PUB | PDF templates on site |
| Tagstand small batch | 85.6 x 54 mm | 3 mm | 3 mm; 8 pt min font; 0.05 mm min line | ≥300 | — | not stated | on product page |
| GoToTags custom | CR80 | full bleed on custom only | — | — | CMYK vector | ai pdf eps svg zip | GoToTags GitLab |
| Seritag | 54 x 85.6 mm | per Graphics Guidelines PDF | per PDF | vector/high-res | — | images, PDF ≤ 8 MB | Graphics Guidelines + card template on product page |
| ShopNFC | 85.6 x 53.98 mm | 2 mm (file 89.6 x 58 mm); offset 1 mm | 2 mm | 300 | CMYK | JPG PNG PDF SVG; offset PDF/AI/CDR | on product page |
| NFC.CARDS | 85.6 x 54 mm | 1 mm (87.5 x 56 mm / 2067 x 1323 px) | avoid edge frames | 600 | — | PNG JPG PDF | PNG template; design.nfc.cards |

---

## Sources
- GoToTags NTAG213 blank card: https://store.gototags.com/nfc-pvc-card-ntag213/
- GoToTags NTAG215 blank card: https://store.gototags.com/nfc-pvc-card-ntag215/
- GoToTags NTAG215 category: https://store.gototags.com/nfc-tags/nfc-tags-by-use/nxp-ntag215-nfc-tags/
- GoToTags custom NFC PVC card: https://store.gototags.com/custom-nfc-pvc-card/
- GoToTags custom NFC cards category: https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/
- GoToTags encoding service: https://store.gototags.com/nfc-tag-encoding-service/
- GoToTags color inkjet printing: https://store.gototags.com/color-inkjet-printing/
- GoToTags black thermal printing: https://store.gototags.com/black-thermal-transfer-printing/
- GoToTags printing specs: https://gototags.com/store/printing
- GoToTags pricing rules: https://gototags.com/store/pricing
- GoToTags bamboo card: https://store.gototags.com/wood-nfc-business-card-ntag213-bamboo/
- Tagstand small batch category: https://www.tagstand.com/product-categories/custom-online-order/custom-small-batch-fast-no-minimums/
- Tagstand small batch card: https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/
- Tagstand blank NTAG215: https://www.tagstand.com/products/ntag215-pvc-card-blank/
- Tagstand inkjet NTAG215: https://www.tagstand.com/products/inkjet-printable-pvc-card-ntag215/
- Tagstand NTAG215 category (tariff notice): https://www.tagstand.com/product-categories/ntag215/nfc/
- Tagstand chip cheat-sheet: https://www.tagstand.com/nfc-chip-cheatsheet/
- My Plastic Business Card NFC cards: https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/
- My Wholesale Business Card: https://mywholesalebusinesscard.com/product/quick-plastic-nfc-business-cards/
- Plastic Printers NFC cards (JSON variants): https://shop.plasticprinters.com/products/custom-nfc-business-cards.json
- Plastic Printers NFC cards: https://shop.plasticprinters.com/products/custom-nfc-business-cards
- Plastic Printers templates: https://www.plasticprinters.com/templates-for-designers
- Plastic Printers NFC page: https://www.plasticprinters.com/nfc-cards
- Plastic Printers business cards: https://www.plasticprinters.com/plastic-business-cards
- Tap Tag custom card: https://taptag.shop/products/custom-printed-plastic-nfc-cards
- Tap Tag variants: https://taptag.shop/products/custom-printed-plastic-nfc-cards.json
- Tap Tag bulk: https://taptag.shop/pages/custom-bulk-orders
- Tap Tag review card: https://taptag.shop/products/tap-review-card
- iPOS Supply custom review cards: https://ipossupply.com/tap-to-review-custom-nfc-tap-cards/
- PhoneTapify stand: https://phonetapify.com/products/google-review-nfc-table-stand
- PhoneTapify combo: https://phonetapify.com/products/google-review-nfc-table-stand-card-combo.json
- ID Cards Direct: https://www.idcardsdirect.com/products/custom-printed-ntag213-rfid-nfc-card-13-56mhz
- TagTix NTAG215: https://tagtixrfid.com/products/nfc-card-ntag215
- Vistaprint comparison: https://wavecnct.com/blogs/vistaprint-vs-wave-nfc-business-cards
- Printleaf: https://www.printleaf.com/custom-nfc-tags/
- CardLogix: https://www.cardlogix.com/product/nxp-ntag-215-nfc-card-tag/
- Seritag NTAG213 custom card: https://seritag.com/nfc-tags/cp-cards-ntag213
- Seritag NTAG215 custom card: https://seritag.com/nfc-tags/cp-cards-ntag215
- Seritag delivery: https://seritag.com/delivery
- Seritag table cards: https://seritag.com/nfc-tags/nfc-table-top-cards
- Seritag wooden card: https://seritag.com/nfc-tags/wooden-card
- ShopNFC NTAG213 card: https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html
- ShopNFC NTAG216 card: https://shopnfc.com/en/nfc-cards/107-497-white-ntag216-nfc-cards.html
- ShopNFC express custom: https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html
- ShopNFC offset custom: https://shopnfc.com/en/nfc-cards/80-43-offset-printed-nfc-cards.html
- ShopNFC bamboo: https://shopnfc.com/en/nfc-cards/453-wooden-nfc-cards-in-bamboo-ntag213-customizable.html
- ShopNFC metal: https://www.shopnfc.com/en/nfc-cards/719-1425-metal-nfc-cards-ntag213-customizable.html
- ShopNFC on-metal tags: https://shopnfc.com/en/6-on-metal-nfc-tags
- ShopNFC shipping: https://www.shopnfc.com/en/content/1-shipping
- NFC.CARDS NTAG213 card: https://nfc.cards/en/front-and-back-printing/61-custom-nfc-card-ntag213-front-and-back-printing.html
- NFC.CARDS print guide: https://nfc.cards/en/content/11-prints
- NFC Tagify PVC card: https://nfctagify.com/products/customized-coloured-pvc-digital-cards
- NFC Tagify stock cards: https://nfctagify.com/collections/stock-digital-business-cards
- NFC Tagify bulk: https://nfctagify.com/blogs/news/bulk-nfc-ordering-simplified
- nfc-tag-shop.de stand: https://www.nfc-tag-shop.de/en/Google-review-NFC-stand-acrylic-110-x-150-mm-white-glossy/17241
- MetalicCards on-metal explanation: https://metaliccards.com/en/metal-nfc-business-cards
- Rock Design metal NFC: https://www.rockdesign.com/quick-business-cards/nfc-metal-business-cards
- Alibaba custom NFC card listings: https://www.alibaba.com/premium/custom_nfc_card.html
- Accio Alibaba supplier roundup: https://www.accio.com/plp/nfc-card-alibaba
- Chuangxinjia printed card: https://www.nfctagfactory.com/products/Printed-Ntag213-NFC-PVC-Card.html
- Chuangxinjia card category: https://www.nfctagfactory.com/products/nfc-card.htm
- ZFCards: https://www.zfcards.com/1356mhz-ntag-213215216-pvc-nfc-card.html
- Xinyetong: https://www.asiarfid.com/nfc-print-card-with-ntag213-chip.html
- DHL China→US rates 2026: https://vantageforwarding.com/dhl-shipping-rates-per-kg-2026-complete-pricing-guide/
- DHL China→US transit: https://deefreight.com/dhl-shipping-from-china-to-usa/
- De minimis ended: https://www.tariffstool.com/guides/de-minimis-exemption-ended-2026
- De minimis China guide: https://www.china-fulfillment.com/us-de-minimis-ended-2026-china-sellers-guide.html
- Section 301 forced-labor tariffs: https://globalimportblog.bakermckenzie.com/2026/07/24/united-states-new-10-to-12-5-section-301-forced-labor-tariffs-on-over-60-countries-take-effect-july-24-2026-replacing-current-10-section-122-duties/
- Plastics HTS example: https://tariff.gatewaylines.com/examples/other-plastic-articles-3926-90-99-89-from-china
- Smart card CBP ruling: https://www.customsmobile.com/rulings/docview?doc_id=NY+N083108
- Carrier brokerage fees: https://www.nbclosangeles.com/news/national-international/tariff-exemptions-end-friday-what-online-shoppers-need-to-know/3769979/
- Marketing Holders vertical holder: https://marketingholders.com/business-and-gift-card-holders/countertop-business-and-gift-card-holders/single-pocket-business-and-gift-card-holders/vertical-business-card-holder-countertop-plastic-display-stand/
- Azar 10-pack at Home Depot: https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573
- Displays and Holders table tent: https://www.displaysandholders.com/acrylic-table-tents-h42-0535-ip.html
- Etsy NFC stands: https://www.etsy.com/market/nfc_acrylic_stand
- Etsy custom logo stand: https://www.etsy.com/listing/4367372120/custom-logo-google-review-stand-nfc-qr
- Review Highway stand (Amazon): https://www.amazon.com/Google-Review-Stand-Reusable-Business/dp/B0D9BXZHBL
- V1CE NFC table tent: https://v1ce.co/product/customizable-nfc-table-tent
- ID Wholesaler retransfer: https://www.idwholesaler.com/retransfer-printers.html
- ID Wholesaler on-demand printing: https://www.idwholesaler.com/id-card-printing-service.html
- AlphaCard on-demand: https://www.alphacard.com/id-cards-on-demand
- NTAG URL capacity: https://proudtek.com/products/rfid-labels/ntag213-nfc-sticker/
- NTAG capacity guide: https://nfcore.app/guides/nfc-tag-data-capacity-by-chip
- NXP NTAG datasheet: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- Google review link generator: https://whitespark.ca/google-review-link-generator/
- Google review short URLs: https://webpunch.com/google-review-short-urls/
- goo.gl shutdown: https://en.wikipedia.org/wiki/Google_URL_Shortener
- Amazon NTAG213 printable card note: https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC5GWP9
- Walmart NTAG215 category: https://www.walmart.com/c/kp/ntag215
- Plastek CR80 template: https://plastekcards.com/artwork/templates/



---

## Fact-check verdicts

- **confirmed**: My Plastic Business Card Quick Plastic NFC Business Cards (NTAG215, full color both sides, matte, pre-programmed) cost $4.95 ea at 25, $3.96 at 50, $2.20 at 100, $1.65 at 200, $1.54 at 300, $1.26 at 500 and $1.16 at 1,000, with 5-business-day standard production and a digital proof within 24 hours.  
  Correction: All tiers match the live page exactly (also lists 1 card $49.50, 150 $2.04, 400 $1.43). Page says 'NFC 215 chip', 'Full Color Printed (both sides)', 'Matte Finish (both sides)', URL programming included, 5 business days standard after artwork approval (24h/48h rush available), digital proof 'within 24 hours (Monday through Friday)'.  
  Source: https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/
- **confirmed**: Tagstand's Custom Small Batch NFC Card (NTAG215, full-bleed UV inkjet, printed and encoded in California) is $2.60 per card with no minimum order and a typical 1-week production lead time; artwork must be 300 dpi with 3 mm bleed and 3 mm safe zone.  
  Correction: $2.60 confirmed on the Tagstand NFC Cards category listing ('Custom Small Batch NFC Card – white PVC plastic – NTAG215' $2.60). Product page: 'UV inkjet printing', 'Printed and encoded in the USA', 'no minimum order quantity requirement', '300 dpi or higher', 3 mm safe zone and 3 mm bleed; category page: 'Typical Production Lead Time: 1 week', 'customized in California, USA'. Caveat: Tagstand's NTAG215 page warns tariffs will cause 'necessary price increases'.  
  Source: https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/
- **confirmed**: GoToTags blank NFC PVC Card NTAG215 costs $0.48 each at 10 units, $0.35 at 100, $0.33 at 1,000 and $0.27 at 10,000 with a 10-unit MOQ and immediate lead time.  
  Correction: Live page matches: $0.48/10, $0.35/100, $0.33/1,000, $0.27/10,000; 'Minimum Order Quantity: 10'; 'Normally Stocked', lead time 'Immediate'.  
  Source: https://store.gototags.com/nfc-pvc-card-ntag215/
- **confirmed**: GoToTags Custom NFC PVC Cards run 'from $1.89 down to $0.33' per card with a 500-unit MOQ and a 3-week lead time; digital or offset full-bleed CMYK printing in glossy or matte, quotes answered within 1 business day.  
  Correction: Page states 'typical prices range from $1.89 down to $0.33 depending on quantity, customizations, and market conditions', MOQ 500, lead time 3 weeks, 'Digital, Offset', 'CMYK, Black', glossy/matte finishes, response 'within 1 business day'. Note these are indicative; final price requires a quote.  
  Source: https://store.gototags.com/custom-nfc-pvc-card/
- **confirmed**: GoToTags NFC tag encoding service is $0.23/tag at 50, $0.19 at 100, $0.06 at 1,000 and $0.05 at 50,000, MOQ 30, with a permanent read-only lock option and only for tags purchased from GoToTags.  
  Correction: Matches live page ($0.23/50, $0.19/100, $0.06/1,000, $0.05/50,000, $0.04/100,000), MOQ 30, 'Permanently lock NFC chip? Yes: NFC tags will be permanently read-only', 'This service is only available if you purchased your NFC tags from GoToTags.'  
  Source: https://store.gototags.com/nfc-tag-encoding-service/
- **confirmed**: Plastic Printers Custom NFC Business Cards are priced $268 for 50, $536 for 100, $716 for 250, $972 for 500 and $1,314 for 1,000.  
  Correction: Shopify JSON variants: 50 $268.00, 100 $536.00, 250 $716.00, 500 $972.00, 1000 $1,314.00. Note the 100-qty tier ($5.36/card) is exactly double the 50-qty price, so there is no volume discount until 250 ($2.86/card).  
  Source: https://shop.plasticprinters.com/products/custom-nfc-business-cards.json
- **confirmed**: Seritag Custom PVC Card NTAG213 costs $2.54 at 100-199, $1.56 at 200-299, $1.24 at 300-499, $0.98 at 500-999 and $0.78 at 1,000-1,999 (USD, ex-VAT), MOQ 100, full-colour double-sided, PDF proof, production about 4 weeks; US deliveries carry a 10% surcharge plus admin fees since Feb 25 2026.  
  Correction: Product page shows exactly those tiers, MOQ 100, 'Full colour double sided custom print', PDF proof, 'Current production time is estimated at 4 weeks.' The US surcharge is NOT on the product page but on seritag.com/delivery: '25th February 2026 : Due to the recent changes in Trump import tariffs to the US, all deliveries to the US now attract a 10% surcharge plus admin fees.' Seritag is a UK company (TabDesk Ltd); USD prices are a currency display and can move with FX.  
  Source: https://seritag.com/delivery
- **confirmed**: ShopNFC (Italy) NTAG213 PVC cards are €1.29 at 10, €0.78 at 200 and €0.54 at 800; NFC encoding is €0.09 per card; express custom-printed retransfer cards are €1.61 at 50 and €1.25 at 500 with 1-4 day production; US shipping is express 3-5 working days from €9.90 with duties charged to the recipient.  
  Correction: Category page: NTAG213 cards start at €1.29, min. 10 pcs; product page tiers €1.15/50, €0.78/200, €0.54/800; encoding €0.09. Express custom-print page: base €1.79, €1.61 at 50, €1.43 at 100, €1.25 at 500, production '1-4 days', min 10. Delivery page: USA express only, '3-5 works days', 'from € 9.90 upwards', 'Customs charges are charged to the recipient.' Note express-print cards offer NTAG213/NTAG216 chips, not NTAG215.  
  Source: https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html
- **confirmed**: Tap Tag custom printed plastic NFC cards cost $29.95 for 1, $49.00 for 2, $119.95 for 5 and $195.00 for 10 (NTAG215, 600 DPI, one-business-day turnaround, free US shipping over $30).  
  Correction: Shopify JSON variants match ($29.95/1, $49.00/2, $119.95/5, $195.00/10; lanyard versions cost more). HTML page: 'NFC Chip: NTAG215', '600 DPI HD Print', 'One business day for up to 100 items ordered', 'Free tracked US shipping for orders $30+'.  
  Source: https://taptag.shop/products/custom-printed-plastic-nfc-cards
- **confirmed**: Alibaba listings show custom printable NTAG213/215 PVC cards at $0.12-0.27 per piece with a 100-piece MOQ (Shenzhen ZD Technology); ZFCards charges a $45 proof-sample fee and quotes 3-7 working days production after proof approval.  
  Correction: Alibaba premium page lists Shenzhen ZD Technology 'Custom Printable 13.56mhz NTAG213 NTAG215 ... PVC Matt Black NFC Card' at '$0.12-0.27', MOQ '100 pieces'. ZFCards (zfcards.com, not Alibaba) FAQ: 'For proof sample, sample fee $45 is required', proof sample takes '3~5 working days', and '3-7 working days after the card proof approval' for production; 5,000 pcs '5-7 working days'. Alibaba prices are listing ranges, not firm quotes, and exclude shipping/duties.  
  Source: https://www.zfcards.com/1356mhz-ntag-213215216-pvc-nfc-card.html
- **partially_correct**: A 12.5% Section 301 forced-labor tariff on Chinese goods took effect July 24 2026, bringing the aggregate Section 301 rate on List 3 Chinese goods to 37.5% on top of MFN duty; the US de minimis exemption was eliminated for all countries on Aug 29 2025.  
  Correction: The facts check out but not from the cited source. USTR final action (effective 12:01 a.m. ET July 24, 2026; CBP CSMS #69326983) applies 12.5% to China. Honigman states: 'Products of China will pay a 12.5% Section 301 tariff, which, when combined with the existing 25% Section 301 tariff on Chinese goods, brings the aggregate Section 301 tariff on Chinese imports to 37.5%.' The Baker McKenzie article cited does not mention China's rate, 37.5%, List 3, or de minimis. The 25% applies to Lists 1-3 (List 4A is 7.5%, so those goods aggregate to 20%), so 'List 3' is a narrow framing; the base rate depends on the card's HTS code. De minimis suspension for all countries effective Aug 29, 2025 is confirmed by CBP CSMS #66065494 / EO 14324. Also note Section 232 (50%) and AD/CVD can stack, and the new tariffs are under court challenge.  
  Source: https://www.honigman.com/alert-3462
- **confirmed**: Marketing Holders' clear acrylic vertical countertop business card holder (2.5"W x 3.5"H x 1.75"D, pocket 2.25"W) costs $0.95 each and fits a CR80 card upright; metal NFC cards require a ferrite-shielded on-metal tag and read from one side only.  
  Correction: Live product page (now at marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand; the cited URL timed out): 'Regular price $0.95 USD', '2.5"W x 3.5"H x 1.75"D', pocket '2.25"W x .75"D', 'Clear acrylic', 'Fits 2"W x 3.5"H cards' (a 2.125" CR80 card fits the 2.25" pocket). Site charges a flat $10 shipping. Ferrite/one-sided read is confirmed by Seritag's on-metal guide and ShopNFC's NFC guide ('Anti-metal Tags can only be read from the side where there is no metal').  
  Source: https://marketingholders.com/products/vertical-business-card-holder-countertop-plastic-display-stand

### Fact-checker notes
## Fact-check summary: supplier claims

11 of 12 claims confirmed against primary sources fetched today; 1 partially correct.

**Confirmed exactly:** My Plastic Business Card tiers/lead times; Tagstand $2.60 + artwork specs (300 dpi, 3 mm bleed/safe zone); all three GoToTags pages; Plastic Printers JSON; Seritag tiers and 4-week production; ShopNFC card, encoding, express-print and US shipping figures; Tap Tag variants and specs; Alibaba/ZFCards; Marketing Holders $0.95 holder and the ferrite/one-side metal-card behavior.

**Partially correct (claim 11):** The numbers (12.5% on China effective 2026-07-24; 37.5% aggregate with the existing 25%; de minimis ended 2025-08-29) are right, but the cited Baker McKenzie post does not contain the China-specific rate, the 37.5% figure, "List 3", or de minimis. Proper sources: Honigman alert-3462 (37.5% aggregate), USTR final action / CBP CSMS #69326983 (12.5%), CBP CSMS #66065494 (de minimis). "List 3" is a narrowing: the 25% applies to Lists 1-3; List 4A goods carry 7.5%.

**Source-location corrections:** Seritag's US surcharge lives at seritag.com/delivery, not the product page. The ZFCards $45 sample fee and 3-7 day production are from zfcards.com, not Alibaba. The Marketing Holders URL cited returned a 504; the product is live at the /products/ path with the same $0.95 price.

**Practical caveats found:** Tagstand warns of tariff-driven price increases; ShopNFC express-print cards are NTAG213/216 (not 215); Plastic Printers' 100-qty price has no discount vs 50; Marketing Holders charges $10 flat shipping.


## Completeness critic

- Amazon coverage is essentially absent even though the brief explicitly asked for it: no live price per 10 or per 50 for blank NTAG215 cards (MINDRFID, TimesKey, Tagstand packs are listed by ASIN only with 'price not captured'), and no Amazon sellers of custom-printed NFC cards were identified at all. The founder still cannot answer 'what does a 10-pack cost on Amazon today?'
- The primary recommended supplier (My Plastic Business Card) has the most unverified operational details: whether they will lock the NTAG215 read-only, whether 'variable data via Excel' applies to NFC encoding (unique URL per card) or only to printed text, whether the pre-programmed record is written as a URL record, whether NTAG213 or gloss finish is available, and no published artwork template. All of these are deferred to 'email them' rather than answered.
- No price at the 250-unit tier for My Plastic Business Card (tiers jump 200 -> 300) and the report does not say whether a 250 order is billed at the 200-tier price ($1.65) or requires a quote. The brief asked for 25/50/100/250/500/1000 at every supplier; GoToTags custom (MOQ 500) and Seritag (MOQ 100) also leave several requested tiers unanswered.
- GoToTags Custom NFC PVC Card, the recommended backup, has no actual quote: only the range '$1.89 down to $0.33'. No price at 500 or 1,000, no setup/plate fee, no proof or physical-sample policy, and no confirmation of what 'market conditions' surcharge currently applies. The founder cannot compare it to MPBC without requesting a quote.
- Setup fees were not explicitly confirmed (zero or otherwise) for any supplier. The brief asked for 'any setup fees'; the report only mentions MPBC's optional $60 design service and ZFCards' $45 proof sample, and never states 'no setup fee' for MPBC, Plastic Printers, Tagstand, Seritag, or ShopNFC.
- Shipping costs are never quantified for any domestic supplier. The demo-kit line '~$40-60 for three parcels' and the production-run '$630-$700 landed' figure have no source; MPBC's FedEx Ground rate for 50 or 500 cards, Tagstand shipping, GoToTags shipping, and Marketing Holders shipping are all unknown.
- Plastic Printers: chip type (NTAG213/215/216) not stated, lock status not stated, and it is unclear whether the founder can hard-code his own redirect URL instead of using Plastic Printers' redirect software (and whether that software has an ongoing subscription cost). Turnaround for NFC cards specifically is also not given.
- Tagstand Custom Small Batch ($2.60): the report does not say whether printing is one- or two-sided, which file types are accepted, whether the encoded URL is locked, whether a QR fallback is printed, or whether the $2.60 flat price holds at 100+ or a cheaper bulk product exists. It is nevertheless placed in the demo kit.
- Replacement-card economics for the '10 free replacement cards per month' offer were not worked out: MPBC's 1-card price is $49.50 and 25 is $123.75, so small reorders matching the original design are expensive; the report only vaguely says GoToTags blanks + encoding 'can cover' replacements without costing it or addressing how to reprint 10 cards in the restaurant's design.
- Local small-batch printing (brief item b) was covered only as 'ask local badge/print shops'; no concrete local or national walk-in option, price, or list of retransfer-equipped shops was found. The founder's city is unknown, but the report should say so and give a search recipe (e.g., 'ID badge printing' + city, Zebra ZXP 9 / Fargo HDP5000 owners) plus an expected per-card price for printing on customer-supplied blanks.
- Landed cost for overseas suppliers rests on unverified duty assumptions: the effective rate for HTS 8523.52 from China (MFN, Section 301, forced-labor tariff, and any IEEPA/reciprocal tariffs) was not confirmed, Seritag's 'admin fees' amount and duty-prepayment cost are not stated, and no Alibaba supplier was actually quoted (only listing ranges). The $336 China and $600-650 Seritag landed figures are therefore estimates without a verified duty line.
- NFC Tagify 'US' (named in the brief) was only examined as a UK/GBP site; the report does not say whether NFC Tagify has a US store, US warehouse, or USD pricing, nor what US shipping/duty would add.
- Table tents / holders: no priced table tent that fits a CR80 card was found (Displays and Holders price 'not shown'), Amazon Marketing Holders pack prices were not captured, and the report never states whether a card can be tapped while sitting in an acrylic holder or whether the demo card should be designed portrait vs landscape to match the chosen holder pocket (2.25" vertical pocket vs 3.5" landscape pocket).
- Vistaprint was not checked directly; the conclusion that it cannot hard-code a custom Google review URL relies on a competitor's blog post (wavecnct.com) rather than Vistaprint's own product page or terms.
- ShopNFC pricing for full-color custom cards at 25/50/100 is ambiguous: the €1.29-€1.15 tiers are for cards with black thermal print, and the 'Express Printing €1.79 base, €1.61 @50' line does not make clear whether that is the all-in card price or a print add-on on top of the card, nor what the 1- vs 2-sided color surcharge is.

### Critic notes
## Internal contradictions and weak reasoning

1. **Demo-kit budget mismatch.** The executive summary says the demo kit is "roughly $150–$330", but Section 9's own tables total $200–220 (25-card version) and $315–335 (50-card version). The $150 floor appears nowhere in the detailed plan.

2. **Production-run "landed" figure has no basis.** The summary states "$630–$700 landed" for 500 cards from MPBC. Section 10 gives $630 for the cards alone and never quantifies FedEx Ground shipping, tax, or locking; the $700 ceiling is unexplained.

3. **Seritag landed estimate is arithmetic on unknowns.** $490 + 10% surcharge = $539; the report then adds unstated "admin fees" and unconfirmed US duty to arrive at "$600–650". Neither component is sourced.

4. **Chip recommendation is disconnected from the supplier recommendation.** Section 1 argues NTAG213 is sufficient and cheapest with a redirect URL, but the primary supplier (MPBC) is only shown with "NFC 215" and no NTAG213 option or price delta, so the chip analysis has no purchasing consequence for the recommended path.

5. **Lock status of MPBC is inferred, not confirmed.** The report infers "unlocked delivery" from a marketing line about updating the URL via NFC Tools, then builds the demo plan on "ask MPBC to lock, or lock yourself". Given this is the primary supplier for a tamper-exposed table card, this should have been verified before recommending.

6. **China duty math is inconsistent with its own caveat.** The worked example applies a flat 37.5% and then says the effective 8523.52 rate "was not confirmed"; 8523.52 is MFN-free, and whether IEEPA/reciprocal tariffs stack on top is not discussed, so the $56 duty line could be materially wrong in either direction. The $0.30 unit price used is also above every listed Alibaba range ($0.08–0.28 at the low ends), making the comparison conservative without saying so.

7. **GoToTags print services applied to cards by assumption.** The Black Thermal Transfer and Color Inkjet service prices are cited from pages the report itself notes "describe this for inlays/stickers"; the Printed PVC NFC Card page returned 404. These numbers should not be relied on for cards.

8. **Minor numeric slip.** Section 1 says NTAG213 has "137 bytes of usable NDEF space" and then that it holds a "130–137 character" URL; the NDEF record header consumes some of those bytes, so the URL capacity is closer to ~130 characters, not 137.

9. **Walmart and Etsy prices are from search snippets / market pages**, not product pages, and are flagged only lightly. The Etsy "~$35" stand line in the demo kit is a guess between two listings.

10. **Section 8 generalization.** "Any holder designed for 2 x 3.5" business cards fits" a CR80 card is true for landscape pockets (3.375" wide card in a 3.5" pocket) but the vertical pocket cited is 2.25" wide vs a 2.125" card, which is a 1/16" margin on each side; orientation of the card artwork must match the holder, which the report never raises.

11. **Brief items not addressed at all:** Amazon custom-NFC-card sellers, NFC Tagify US, and concrete local plastic-card printers. The report substitutes "not found" or "ask locally" without a search method or fallback.


---

## Gap-fill research
# Gap-Fill: Supplier Research for Custom NFC "Tap to Review" Cards (verified 2026-09-04)

Method notes: every price below was read live on 2026-09-04 from the supplier's own page (WebFetch) or, for Amazon and interactive order forms, from the page rendered in a browser session (Amazon showed a default Atlanta 30360 delivery ZIP). Where a supplier does not publish a figure, this report says "not published" rather than estimating. The web-search budget ran out near the end, so a few items (noted) rely on direct page fetches only.

---

## 1. Amazon coverage: blank NTAG215 packs and custom-printed cards

**Blank NTAG215 CR80 PVC cards on Amazon (live prices, 2026-09-04)**

| Pack | Listing / ASIN | Price | Per card | Status |
|---|---|---|---|---|
| 10 | TimesKey "10pcs NFC Cards Blank NTAG215" B075CL71FK (sold by TimesKey-US, ships from Amazon) | **$6.99** | $0.70 | In stock; size options 10/20/50/100/200 (https://www.amazon.com/dp/B075CL71FK) |
| 10 | LESSBLE 10-pack NTAG215 CR80 | $6.99 | $0.70 | In stock, "only 8 left" (https://www.amazon.com/s?k=ntag215+nfc+cards+blank+pvc) |
| 10 | MINDRFID 10-pack B0B5ZX9QND | — | — | **"Currently unavailable"** (https://www.amazon.com/MINDRFID-Ntag215-Compatible-Enabled-Devices/dp/B0B5ZX9QND) |
| 12 | "12pcs NFC Card NTAG215 ... CR80" | $6.99 | $0.58 | In stock (search page above) |
| 20 | TimesKey 20-pack | $7.99 (another 20-pack listing $8.59; one showed list $11.99, sale $9.99) | $0.40–0.50 | In stock (search page above) |
| 25 | "25pcs NFC Card NTAG215 ... CR80" | $9.99 | $0.40 | In stock (search page above) |
| 25 | Tagstand 25-pack B06ZZWVZ3B | — | — | **"Currently unavailable"** (https://www.amazon.com/Bulk-Blank-NTAG215-PVC-Cards/dp/B06ZZWVZ3B) |
| 50 | Origin-Joy 50 PCS NTAG215 85.5 x 54 mm | $13.99 | $0.28 | Shown as an available alternative on the Tagstand page above |
| 50 | Tagstand 50-pack B07CLLD7XB | — | — | **"Currently unavailable"** (https://www.amazon.com/NTAG215-Bulk-PVC-Card-Pack/dp/B07CLLD7XB) |
| 100 | "100pcs White NFC Cards NTAG215" | $20.99 | $0.21 | In stock (search page) |
| 100 | "100pcs Programmable NTAG215 NFC Tags" (Amazon's Choice) | $24.99 | $0.25 | In stock (search page) |
| 100 | Tagstand 100-pack B07CLCH92T | — | — | **"Currently unavailable"** (https://www.amazon.com/NTAG215-Bulk-Card-Pack-count/dp/B07CLCH92T) |
| 200 | "200pcs White NFC Cards NTAG215" | $33.99 | $0.17 | In stock (search page) |
| 300 | "300pcs White NFC Cards NTAG215" | $44.99 | $0.15 | In stock (search page) |

Shipping: "FREE delivery ... on orders shipped by Amazon over $35" or free with Prime; a lone $6.99 10-pack would otherwise carry a shipping charge (TimesKey page above). TimesKey's listing states the chip "has a read-write lock function ... Tags cannot be edited or reset once they are set as read-only" and the cards are 54 x 85.5 x 0.8 mm PVC (https://www.amazon.com/dp/B075CL71FK). MINDRFID's listing (when stocked) notes the cards suit "photo ID card printers like DataCard, Zebra, Fargo, Magicard, Evolis, Badgy" and are "Not for use with inkjet printers."

**Answer to "what does a 10-pack cost on Amazon today?": $6.99 ($0.70/card), in stock from TimesKey; 100-packs run $20.99–$24.99 ($0.21–0.25/card).** All three Tagstand-brand Amazon packs and the MINDRFID pack are out of stock, consistent with Tagstand's tariff/restocking notice (Section 17).

**Custom-printed NFC cards on Amazon:** a search for "custom printed nfc cards logo" returned 177 results, but every "Customize now" item found is a single digital-business-card product tied to a profile platform, not a bulk custom-print service: Upgraving customizable black metal NFC card $49.99; VTAG.ID NFC digital business card $19.99; a generic "Customizable Digital Business Card ... Custom NFC Card Logo" at $13.99; another at $34.99 (https://www.amazon.com/s?k=custom+printed+nfc+cards+logo). No Amazon seller was found offering 25–1,000 custom-printed NTAG cards with published tiers and a hard-coded URL. Conclusion: Amazon is useful for blanks only; custom printing should go to the direct suppliers below.

---

## 2. My Plastic Business Card (MPBC): operational details now verified from their pages

Product page (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/), FAQ (https://myplasticbusinesscard.com/faq/) and artwork guidelines (https://myplasticbusinesscard.com/artwork-guidelines/):

- **Chip:** "NFC 215 chip" only; "data limit is roughly 200 characters." No NTAG213 option is offered on either the Quick or Standard NFC card.
- **Locking:** Cards ship **unlocked**. The page says you can "re-write your NFC chip later" with the free NFC Tools app; no lock service is mentioned anywhere on the product page or FAQ. Plan to lock the cards yourself with NFC Tools (irreversible) before deployment, or ask by email whether they will lock at encoding.
- **Record type:** "Our pricing includes programming the URL of your choice into each NFC chip"; the standard method is a URL record (alternative vCard-type links via vCard.Link / linktr.ee are offered for contact cards).
- **Variable data / unique URL per card:** The FAQ states "we do not offer this process on these Quick Plastic Cards, you can order our standard cards which allow for unique names/numbers." The order builder nonetheless shows an "Upload Variable Data" field requiring ".xls or .xlsx". On the Standard card the FAQ describes variable data as "applied using either a printing or stamping process" (i.e., printed text/numbers), and NFC encoding options are "Permanent URL, Contact Card, or Editable URL." **Unique NFC-encoded URL per card is not confirmed for either product**; treat variable data as printed data until MPBC confirms otherwise.
- **Finish:** Quick NFC cards are "Matte Finish (both sides)" only ("similar to a satin paper"). The Standard "Plastic NFC Business Cards" offer Glossy, Matte, Clear, Translucent (https://myplasticbusinesscard.com/product/plastic-nfc-business-cards/).
- **Artwork template:** published. File types ".ai, .pdf, .cdr, .eps, .psd, .jpg, .png, .gif, .bmp"; "Artwork must be designed in CMYK with outlined/rasterized fonts and strokes at 300 DPI"; templates downloadable in Illustrator, PDF, CorelDraw and EPS for Plastic Business Cards (https://myplasticbusinesscard.com/artwork-guidelines/). Bleed/safe-zone numbers are not stated in the text; use the template.
- **Setup fee:** none listed; the only extra is the optional $60 design service. Digital proof within 24 h (Mon–Fri), unlimited revisions until approval.
- **Samples:** "Free generic samples available via request form" (FAQ).
- **Shipping (answers Section 6):** "all orders receive $10 flat rate shipping via FedEx Ground to addresses in the continental USA," 4–5 business days from Southern California (FAQ).
- **Site discrepancy to exploit:** the twin site mywholesalebusinesscard.com now lists higher Quick NFC prices (25 = $5.25, 50 = $4.25, 100 = $2.50, 200 = $2.00, 300 = $1.92, 400 = $1.83, 500 = $1.75, 1,000 = $1.67) than myplasticbusinesscard.com (25 = $4.95, 50 = $3.96, 100 = $2.20, 200 = $1.65, 300 = $1.54, 400 = $1.43, 500 = $1.26, 1,000 = $1.16) (https://mywholesalebusinesscard.com/product/quick-plastic-nfc-business-cards/ vs https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/). Order from myplasticbusinesscard.com.

---

## 3. Missing quantity tiers (250 at MPBC; GoToTags and Seritag gaps)

- **MPBC Quick NFC card:** the quantity dropdown contains 1, 25, 50, 100, 150, 200, 300, 400, 500, 1,000; **250 is not orderable**. Nearest choices: 200 cards = $330 ($1.65) or 300 cards = $462 ($1.54). Buying 300 costs $132 more than 200 for 100 extra cards ($1.32 marginal), which is the sensible "250" substitute (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/).
- **MPBC Standard Plastic NFC card (2–3 week product):** does have a 250 tier: 100 = $3.83, 200 = $2.66, **250 = $2.51**, 500 = $1.48, 1,000 = $1.23, 5,000 = $0.85; gloss or matte; "general production time is 2-3 weeks" (https://myplasticbusinesscard.com/product/plastic-nfc-business-cards/). More expensive than Quick at every tier; only worth it for gloss or variable printed data.
- **GoToTags custom card:** MOQ 500, so 25/50/100/250 are not offered; 500 and 1,000 are quote-only (Section 4). GoToTags' rule for quantities between tiers on stock items: "Orders that fall between published tiers ... are priced at the lower tier" (https://gototags.com/store/pricing).
- **Seritag:** MOQ 100, so 25 and 50 are unavailable; 250 falls in the 200–299 tier ($1.56 NTAG213 / $1.76 NTAG215) and 500 in the 500–999 tier ($0.98 / $1.03) (https://seritag.com/nfc-tags/cp-cards-ntag213, https://seritag.com/nfc-tags/cp-cards-ntag215).
- **Tagstand small batch (new, fills 25/50/100/500):** see Section 8 for a full one- and two-sided tier table from the live order form.

---

## 4. GoToTags Custom NFC PVC Card: what is and is not obtainable without a quote

- No per-quantity prices exist on the page; only "typical prices range from $1.89 down to $0.33 depending on quantity, customizations, and market conditions," MOQ 500, 3-week lead, "A quote will be created once the specific chip type and all customizations are known," response "within 1 business day" (https://store.gototags.com/custom-nfc-pvc-card/). Obtaining a number requires submitting the quote form with contact details, which was not done in this research; the founder should submit it (spec: 500 and 1,000, NTAG213 and NTAG215, CMYK both sides matte, encode + lock).
- **Setup fees:** "Custom product pricing includes setup costs; therefore, small quantity orders will have a significantly higher unit price." Unit prices exclude "encoding, taxes and shipping fees" (https://gototags.com/store/pricing).
- **Samples/proofs:** GoToTags advises accepting "samples from existing production runs rather than requesting custom samples to avoid delays and additional costs," and recommends testing NFC and QR on sample materials before full production (custom product pages, e.g., https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/). Physical pre-production samples of your own design therefore cost extra and add time; no fee is published.
- **Shipping:** no rates published; "Customers are responsible for shipping charges, customs duties, and import fees"; ships from the US, Canada and China with international orders mostly EXW (https://gototags.com/store/shipping). Ask in the quote whether the custom cards ship from Seattle or China (affects duty).
- **"Market conditions" surcharge:** not quantified on any page.

---

## 5. Setup fees, supplier by supplier (explicit statements)

| Supplier | Setup fee | Source |
|---|---|---|
| My Plastic Business Card | None listed; optional $60 design service | https://myplasticbusinesscard.com/faq/ |
| Plastic Printers | None listed on product or business-card pages; proof included ("All designs and orders are sent to you for your approval") | https://www.plasticprinters.com/plastic-business-cards |
| Tagstand small batch | None; price is purely per-card (order form). Note: Tagstand's *factory* custom orders (MOQ 1,000) carry "Typical tooling charges range from $300 to $500" for custom shapes | https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/, https://www.tagstand.com/custom-order-info |
| GoToTags custom | Included in unit price (see Section 4) | https://gototags.com/store/pricing |
| Seritag | None mentioned; PDF proof included; sample encoded tag exchanged only for non-standard encoding | https://seritag.com/faq, https://seritag.com/nfc-tags/cp-cards-ntag213 |
| ShopNFC | None; "Graphics Change" €10 is the only artwork charge; encoding €0.09/card; UID reading €0.05/card | https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html |
| ZFCards (China) | $45 proof sample, refunded on 10,000+ | https://www.zfcards.com/1356mhz-ntag-213215216-pvc-nfc-card.html |

Caveat: "not listed" is not the same as "confirmed zero"; only Tagstand (form) and GoToTags (policy page) are explicit.

---

## 6. Shipping costs, quantified where published

- **MPBC:** $10 flat FedEx Ground, continental US, 4–5 business days; applies to 50 or 500 cards alike (https://myplasticbusinesscard.com/faq/).
- **Tagstand:** free USPS First Class for US orders over $50; under $50 or international: "$2 handling fee + the cost of postage based on the weight of your order"; FedEx expedited 1–4 business days (https://www.tagstand.com/shipping-and-payment/, as summarized in search; page last indexed 2024, verify at checkout).
- **GoToTags:** not published; customer pays carrier rate (https://gototags.com/store/shipping).
- **Plastic Printers:** not published; "Standard shipping times average between 3-5 days" (https://www.plasticprinters.com/plastic-business-cards).
- **Marketing Holders via Amazon:** 6-pack $18.99 with "FREE Shipping"; 4-pack $15.99; 12-pack $20.99 ($1.75 each) (https://www.amazon.com/Marketing-Holders-Vertical-Business-Counter/dp/B0771KY3W1). Direct-site shipping for the $0.95 holder is not published.
- **Amazon blanks:** free over $35 or with Prime (Section 1).
- **Seritag:** 10% US surcharge plus unpublished admin fees; duty prepay option "You will see exact costs during the checkout process" (https://seritag.com/delivery).
- **ShopNFC:** express to US "from € 9.90 upwards," duties billed to recipient (https://www.shopnfc.com/en/content/1-shipping).
- **NFC Tagify:** cost not published; US standard 5 working days, DHL Express 2–4 working days, after 2–3 days processing (https://nfctagify.com/pages/shipment-and-returns).

Revised demo-kit shipping line: MPBC $10 + Tagstand $0 (if over $50) or ~$2 + postage + Amazon $0 (over $35) = roughly **$10–$20**, not $40–60.

---

## 7. Plastic Printers: chip, lock, URL control, software cost, turnaround

- Chip type: **not stated** on the product page, NFC page, BitSignal page, or Shopify JSON (https://shop.plasticprinters.com/products/custom-nfc-business-cards.json, https://www.plasticprinters.com/nfc-cards, https://www.plasticprinters.com/bitsignal-nfc-cards).
- Lock status: not stated.
- URL control: the card is "Programmed with custom data of your choice," but the selling point is "With our exclusive built in software you can change the information your cards shares or where your card directs visitors anytime!" — i.e., the chip points at their redirect platform. Whether you can opt out and hard-code your own URL is not stated; ask.
- Software cost: no subscription price or "free" statement anywhere on the pages; treat as an open question.
- Turnaround: "Production time begins following your final proof/artwork approval" (NFC product); company-wide "We get most orders out in a few days ... Standard shipping times average between 3-5 days" (https://www.plasticprinters.com/plastic-business-cards).
- Pricing reconfirmed: 50 = $268, 100 = $536, 250 = $716, 500 = $972, 1,000 = $1,314 (Shopify JSON above). See Section 19.

---

## 8. Tagstand Custom Small Batch: full option and price detail from the live order form

The product page's order form (read in a browser session) exposes options the static page hides (https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/):

- **Printing:** "One-sided Printing" or "Two-sided Printing."
- **Chip Encoding:** "none," "Encode," or **"Encode and Lock"** — locking is offered, and selecting it did not change the total (free).
- **Published tier table (one-sided):** 1 = $15.45; 2 = $8.31; 3 = $5.93; 4 = $4.74; 5 = $4.02; 10 = $2.59; 25 = $1.84; 50 = $1.70; 100 = $1.56; 500 = $1.44.
- **Totals observed when toggling the form:** 100 one-sided = $156.00 ($1.56); 100 two-sided = $260.00 ($2.60); 10 one-sided = $25.90 ($2.59); 10 two-sided = $45.60 ($4.56); 25 two-sided = $77.00 ($3.08); 50 two-sided = $140.00 ($2.80). So the "$2.60" in the original report is the **two-sided price at 100**, not a flat price; one-sided is far cheaper, and two-sided at 10 is $4.56.
- Artwork: 3 mm bleed, 3 mm safe margin, 8 pt minimum type, 0.05 mm minimum line, 300 dpi; designed in their online editor ("Configure your order with the drop-down lists and then design with the online editor"). The custom-order info page adds "Vector files preferred such as .AI or .PDF" (https://www.tagstand.com/custom-order-info). A QR code can be placed in the artwork ("your own logo, QR code, and encoding"); it is not auto-generated.
- Lead time 1 week; 691 units in stock at time of reading.
- Cheaper bulk product: Tagstand's factory custom cards (MOQ 1,000, 3–4 weeks, tooling $300–500 for non-standard shapes) are quote-only (https://www.tagstand.com/custom-order-info).

---

## 9. Replacement-card economics for "10 free replacement cards per month"

Cost to reprint 10 cards in a restaurant's own design (US options, from published prices):

| Route | 10 cards | Per card | Lead | Source |
|---|---|---|---|---|
| Tagstand small batch, one-sided, encode+lock | $25.90 (+ ~$2 + postage, under the $50 free-ship floor) | $2.59 | ~1 week | Section 8 |
| Tagstand small batch, two-sided | $45.60 | $4.56 | ~1 week | Section 8 |
| MPBC Quick (minimum practical tier 25) | $123.75 + $10 ship | $4.95 (25 cards) | 5 days + 4–5 ship | https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ |
| Tap Tag custom | $195 + free ship | $19.50 | 1–2 days | https://taptag.shop/products/custom-printed-plastic-nfc-cards.json |

Implications for a $50/month subscription: fulfilling 10 two-sided custom reprints monthly via Tagstand ($45.60) would consume 91% of the fee; one-sided ($25.90) consumes 52%. Two workable designs:

1. **Overprint at the initial run.** Order each restaurant's cards at the 100 tier from MPBC ($2.20, $220) instead of 25–50: the extra 50–75 cards cost $1.32–$2.20 each and cover 5–7 months of the 10/month allowance at ~$13–22/month. At 200+ per restaurant the cost drops to $1.65 (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/).
2. **Generic-branded replacement stock.** Print one company-branded "Tap to review us on Google" design in a 500-run ($1.26 at MPBC, or Tagstand 500 one-sided $1.44) and encode each replacement to the restaurant's redirect code yourself with NFC Tools; cost per 10 replacements ≈ $12.60–$14.40 plus a stamp. This requires the restaurant to accept generic-brand cards for replacements, which should be stated in the offer.

Either way, "10 free cards" should be defined as "up to 10 on request," not automatically shipped.

---

## 10. Local small-batch printing on your own blank NTAG215 cards

The founder's city is not known, so no specific shop can be named. What the research established:

- **No national walk-in chain prints CR80 PVC cards.** FedEx Office's badge products are marketplace items with "7-10 business days plus shipping" and are name badges, not PVC cards (https://www.office.fedex.com/default/name-tags-badges.html).
- **Mail-order small-batch ID-card printers (their own blank stock, no NFC):** IDSuperShop 10-pack "$7 per card," 1–2 days, 30-mil glossy PVC, "dye sublimation printing with direct-to-card or high definition retransfer printers for edge-to-edge printing" (https://idsupershop.com/custom-printed-plastic-id-cards/); idcards.com 1 = $15, 10 = $7, 25 = $5.50, 50 = $5, 100 = $4, 5–8 business days with proof (https://idcards.com/small-batch-custom-pvc-cards/); InstantCard $7.80/card, same-day for orders before 4 PM ET, +$0.95 for color back (https://instantcard.net/pricing/). None of these advertise printing on customer-supplied NFC cards.
- **Search recipe:** search Google Maps for "ID badge printing," "photo ID cards," "employee badge printing," "access control cards," or "membership card printing" plus your city; also "sign shop" and "trophy/engraving shop" (many own card printers). Ask two questions: (1) "Do you have a retransfer card printer (Zebra ZXP Series 9, HID Fargo HDP5000/HDP6600, Evolis Avansia, Magicard Prima, Matica XID)?" — retransfer is needed for edge-to-edge print over the chip bump (https://www.idwholesaler.com/retransfer-printers.html); (2) "Will you print on customer-supplied NTAG215 PVC cards?" Bring the Amazon 10-pack ($6.99) and a 300 DPI CR80 file (3.375 x 2.125", 1013 x 638 px, with 1/8" bleed).
- **Expected price:** using the mail-order small-batch benchmarks ($4–8/card at 10–25 units, which include the blank), a reasonable expectation for print-only on your blanks is a similar or slightly lower per-card charge, often with a $20–40 minimum; this is an inference, not a quoted price.
- Given Tagstand prints, encodes and locks on its own NTAG215 stock for $2.59 (one-sided) with no minimum, local printing only makes sense for same-day needs.

---

## 11 and 16. Landed-cost duty line for Chinese PVC NFC cards (HTS 8523.52)

- **Classification:** CBP rulings NY N083108 and NY N303172 classify PVC smart cards from China under **8523.52.00**, general duty **"Free,"** with Section 301 subheading **9903.88.03** (List 3) (https://www.customsmobile.com/rulings/docview?doc_id=NY+N303172, https://www.customsmobile.com/rulings/docview?doc_id=NY+N083108). The 10% figure in N303172 dates from 2019; List 3 rose to 25% on May 10, 2019 and remains 25% (https://www.akingump.com/en/insights/alerts/ustr-increases-section-301-tariffs-on-list-3-products-and, https://gatewaylines.com/press-releases/complete-guide-to-section-301-china-tariffs-in-2026). So 8523.52 is List 3 at 25%, not List 4A at 7.5%, and not 3926 plastics.
- **Forced-labor Section 301 (effective 12:01 a.m. ET July 24, 2026):** CBP CSMS #69326983 — "9903.05.31: Except for products described in headings 9903.05.85–9903.05.92, articles the product of China will be assessed an additional ad valorem rate of duty of 12.5%" (https://content.govdelivery.com/accounts/USDHSCBP/bulletins/421d887). The attached "Section 301 Forced Labor HTS List" (exemption list under 9903.05.86) includes **8523.51.00** (solid-state storage) but **not 8523.52.00**; smart cards are therefore covered (https://content.govdelivery.com/attachments/USDHSCBP/2026/07/23/file_attachments/3723786/Forced%20Labor%20HTS%20LIST.pdf, text extracted and searched).
- **Section 122 10% surcharge:** ended when the forced-labor duties took effect ("immediately after the expiration of Section 122 10% tariffs on all countries") (https://www.honigman.com/alert-3462). IEEPA "reciprocal/fentanyl" tariffs were invalidated by the Supreme Court on Feb 20, 2026 (Learning Resources v. Trump) (https://gingercontrol.com/blog/importing-from-china-tariff-guide).
- **Section 232 semiconductors:** 8523.51 appeared in the April 2025 semiconductor exclusion list, but 8523.52 was not found in it (https://www.cassidylevy.com/news/semiconductor-exclusion-from-ieepa-reciprocal-tariffs-expanded-section-232-investigation-announced/); the Jan 14, 2026 Section 232 proclamation targets "certain advanced computing chips" (https://kpmg.com/us/en/taxnewsflash/news/2026/01/united-states-imposes-tariff-advanced-computing-chips.html). Smart cards do not appear to be a 232 article, so the 232 exemption from forced-labor duty does not apply; a broker should confirm.
- **Total ad valorem duty on Chinese NFC cards today: 0% MFN + 25% (9903.88.03) + 12.5% (9903.05.31) = 37.5%**, plus the merchandise processing fee and carrier brokerage ($30+). Reworked 500-card example at $0.30: goods $150 + duty $56.25 + DHL ~$50 + brokerage ~$35 + proof sample $45 ≈ $336 — the original estimate stands, now with a verified duty line. Litigation risk: Honigman notes "It is reasonable to expect litigation against these Section 301 tariffs."
- **Seritag (UK origin):** MFN Free; whether the UK is among the 60 economies at 10% or 12.5% forced-labor duty was not verified here (search budget exhausted); Seritag's page says "Except for the US, the vast majority of countries do not charge duty on RFID/NFC products," implying US duty applies (https://seritag.com/delivery). Admin fee amount is not published; it is shown only at checkout.

---

## 12. NFC Tagify "US"

NFC Tagify has **no US store or warehouse**: registered address 11 Walton Way, London W3 0AW; return address London; the Shopify site offers a GBP/EUR/USD currency selector (converted display prices, not a US price list). US delivery after 2–3 working days processing: standard "5 working days," DHL Express "2 to 4 working days." "We do not charge or collect any local taxes or VAT for international orders"; duties are the recipient's responsibility; shipping cost is not published on the policy page (https://nfctagify.com/pages/shipment-and-returns, https://nfctagify.com/pages/about-us). At £22.99 list (£15.17 at 50+) plus shipping and US duty, it remains uncompetitive.

---

## 13. Table tents / holders that fit a CR80 card; tapping through acrylic; orientation

- **Marketing Holders vertical single-pocket (Amazon):** 6-pack **$18.99** ($3.17 each) free shipping; 4-pack $15.99; 12-pack $20.99 ($1.75 each); "Pocket Dimensions: 2.25"W x .75"D. Overall Dimensions: 2.5"W x 3.5"H x 1.75"D" (https://www.amazon.com/Marketing-Holders-Vertical-Business-Counter/dp/B0771KY3W1). Direct price $0.95 + unpublished shipping.
- **Azar 252011 10-pack:** Home Depot $8.74/box (from the retailer listing captured in search; the page returned 403 to direct fetch today), Staples $32.79, Amazon listing "Currently unavailable"; opening 2.3125" x 0.75" (https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573, https://www.amazon.com/Azar-252011-Business-Holder-Count/dp/B0037W5BKM).
- **Displays and Holders table tents (priced):** "Business Card Tent 3.5 x 2" — horizontal — **from $2.58**; "Photo Strip Table Tent 2 x 6" vertical from $2.48; 5 x 3.5" horizontal from $2.68 (https://www.displaysandholders.com/products/sign-holders-ad-frames/multi-panel-table-tents/double-sided-table-tents.html). The 3.5 x 2 tent is side-load, single-sided, styrene/acrylic/PETG, custom imprint from 50 pcs (https://www.displaysandholders.com/product/small-acrylic-table-tent.html). No vertical 2 x 3.5 tent was found.
- **Branded NFC stand benchmark:** Review Highway NFC Tap Stand, acrylic, 5" x 3.5" portrait, **$29.90** for one, "no subscription" (https://www.amazon.com/Google-Review-Stand-Reusable-Business/dp/B0D9BXZHBL).
- **Can a card be tapped in an acrylic holder?** Yes. Only metal blocks NFC ("you can never put NFC tags behind metal") (https://seritag.com/learn/using-nfc/buying-nfc-tags); commercial review stands embed the tag inside 2.7 mm acrylic and work (https://www.nfc-tag-shop.de/en/Google-review-NFC-stand-acrylic-110-x-150-mm-white-glossy/17241). A holder's front wall is 1/8" (3 mm) or thinner, well inside the 1–4 cm read range of a card-size antenna, so guests can tap the card in the pocket from the front.
- **Orientation:** the affordable holders (Marketing Holders, Azar) have 2.25–2.31" wide **vertical** pockets, so the card stands portrait with its short edge down; design the demo card **portrait** if it will live in these holders. Use landscape only if you pick the 3.5 x 2 horizontal tent ($2.58+). Since MPBC and Tagstand print either orientation at the same price, portrait is the safer default.

---

## 14. Vistaprint checked directly

The US NFC product URL (https://www.vistaprint.com/business-cards/nfc-business-cards-with-vistaconnect) now **redirects to the generic business-cards page** (https://www.vistaprint.com/business-cards); the rendered page contains zero mentions of "NFC" or "VistaConnect" (browser check, 2026-09-04). Vistaprint US currently lists only QR-code business cards ("From $10.00 / 50 units") and, unrelated, clear acrylic card holders "From $8.99" each. Vistaprint's own FAQ (India site, same platform) describes VistaConnect as a hosted "online experience" you edit, with external links placed *inside* that page (https://www.vistaprint.in/business-cards/nfc-visiting-cards). Conclusion from Vistaprint's own pages: no US NFC card is currently sold, and the platform model routes taps to a VistaConnect page rather than a customer-controlled URL. The 100-scan/month cap and $32.99 price remain competitor-reported only (https://wavecnct.com/blogs/vistaprint-vs-wave-nfc-business-cards).

---

## 15. ShopNFC full-color pricing clarified

- The €1.29 (10) / €1.15 (50) / €0.78 (200) tiers on "NFC Cards in PVC NTAG213" are for **blank, unprinted** cards; black thermal print and 1- or 2-side color print are dropdown options whose surcharges are not displayed (quote required) (https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html).
- "Custom NFC Cards – Express Printing" is the **all-in price (card + full-color retransfer print)**: €1.79 base, 50 = €1.61 (10% off), 100 = €1.43 (20%), 500 = €1.25 (30%); "On one side" and "On both sides" are listed at the **same price**; NTAG213, NTAG216, MIFARE Classic 1K and Fudan F08 chips all at the same base price; production 1–4 days; add-ons: encoding €0.09/card, UID reading €0.05, graphics change €10 (https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html). Thus 25 two-sided color NTAG213 cards ≈ 25 x €1.79 + €0.09 encoding = ~€47 before €9.90+ shipping and US duty.

---

## 17. Tagstand tariff warning

Tagstand's NTAG215 category still displays "the current tariff situation will cause restocking delays and necessary price increases" (https://www.tagstand.com/product-categories/ntag215/nfc/). Evidence that it is biting: all three Tagstand-brand NTAG215 Amazon packs are "Currently unavailable" (Section 1). The small-batch card showed 691 in stock on 2026-09-04; lock in demo pricing by ordering now.

---

## 18. Seritag FX and surcharge modelling

Seritag displays a GBP/EUR/USD selector and publishes a USD price list; whether the card is settled in USD or converted from GBP at checkout is not stated on the FAQ or delivery page (https://seritag.com/faq, https://seritag.com/delivery). Model a 500-card NTAG213 order as: $490 list + 10% US surcharge ($49) + admin fee (unpublished; visible at checkout) + US duty (see Section 11; UK rate unverified) + carriage + a ±5% FX buffer if billed in GBP. The original "$600–650 landed" is plausible only if the UK forced-labor rate and admin fee are modest; get a checkout screenshot with "pre-pay duties" selected before relying on it.

---

## 19. Plastic Printers tier anomaly

50 = $268 ($5.36) and 100 = $536 ($5.36): no discount at 100; 250 = $716 ($2.86) is the first real break, 500 = $972 ($1.94), 1,000 = $1,314 ($1.31) (https://shop.plasticprinters.com/products/custom-nfc-business-cards.json). Never buy 100 here; buy 50 for demos or 250+ for production.

---

## Revised demo-kit and production numbers

- Demo kit (portrait design, 25 MPBC cards $123.75 + $10 ship; 10 Tagstand one-sided encode+lock $25.90 + ~$5 ship; 10 Amazon blanks $6.99; Marketing Holders 6-pack $18.99; Review Highway stand $29.90) ≈ **$221**. Two-sided Tagstand adds $19.70.
- Production 500 at MPBC: $630 + $10 shipping = **$640 landed**, 5 business days + 4–5 days FedEx Ground.

---

## Corrections

- **Tariff stack (corrected sourcing and scope):** The 12.5% Section 301 forced-labor duty on Chinese goods took effect 12:01 a.m. ET July 24, 2026 under heading 9903.05.31 (CBP CSMS #69326983), replacing the expired Section 122 10% duty. Honigman states it "brings the aggregate Section 301 tariff on Chinese imports to 37.5%" when combined with the existing 25% (https://www.honigman.com/alert-3462). That 37.5% applies to List 1–3 goods; List 4A goods aggregate to 20%. For this product the base rate is verified: PVC NFC cards are HTS 8523.52.00 (MFN Free), List 3 / 9903.88.03 at 25%, and 8523.52 is not on the forced-labor exemption list, so 37.5% is the correct figure. The Baker McKenzie post previously cited does not contain the China-specific numbers and should be replaced by the Honigman alert and CBP CSMS #69326983. De minimis elimination for all countries on Aug 29, 2025 (EO 14324 / CSMS #66065494) is confirmed. Section 232 (50% on steel/aluminum/copper etc.) and AD/CVD can stack but do not appear to apply to PVC smart cards; the forced-labor tariffs are expected to face litigation.
- **Tagstand "$2.60 flat" (corrected):** $2.60 is the two-sided price at 100 units; the product is tiered from $15.45 (1) to $1.44 (500) one-sided, with two-sided roughly $4.56 at 10 and $2.60 at 100, and "Encode and Lock" free.
- **Demo-kit shipping (corrected):** ~$10–20, not $40–60, given MPBC's $10 flat rate and free-shipping thresholds at Tagstand ($50) and Amazon ($35).
- **MPBC locking (clarified):** cards are delivered unlocked and MPBC offers no lock service on its pages; lock with NFC Tools before deployment.
- **MPBC variable data (clarified):** not offered on Quick cards per the FAQ; on Standard cards it is printed/stamped data, and per-card unique NFC URLs remain unconfirmed.

## Sources
- Amazon TimesKey 10-pack: https://www.amazon.com/dp/B075CL71FK
- Amazon NTAG215 search: https://www.amazon.com/s?k=ntag215+nfc+cards+blank+pvc
- Amazon custom NFC search: https://www.amazon.com/s?k=custom+printed+nfc+cards+logo
- Amazon MINDRFID: https://www.amazon.com/MINDRFID-Ntag215-Compatible-Enabled-Devices/dp/B0B5ZX9QND
- Amazon Tagstand 25/50/100: https://www.amazon.com/Bulk-Blank-NTAG215-PVC-Cards/dp/B06ZZWVZ3B, https://www.amazon.com/NTAG215-Bulk-PVC-Card-Pack/dp/B07CLLD7XB, https://www.amazon.com/NTAG215-Bulk-Card-Pack-count/dp/B07CLCH92T
- Amazon Marketing Holders 6-pack: https://www.amazon.com/Marketing-Holders-Vertical-Business-Counter/dp/B0771KY3W1
- Amazon Azar 10-pack: https://www.amazon.com/Azar-252011-Business-Holder-Count/dp/B0037W5BKM
- Amazon Review Highway stand: https://www.amazon.com/Google-Review-Stand-Reusable-Business/dp/B0D9BXZHBL
- Home Depot Azar: https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573
- Displays and Holders tents: https://www.displaysandholders.com/products/sign-holders-ad-frames/multi-panel-table-tents/double-sided-table-tents.html, https://www.displaysandholders.com/product/small-acrylic-table-tent.html
- MPBC Quick NFC: https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/
- MPBC Standard NFC: https://myplasticbusinesscard.com/product/plastic-nfc-business-cards/
- MPBC FAQ: https://myplasticbusinesscard.com/faq/
- MPBC artwork guidelines: https://myplasticbusinesscard.com/artwork-guidelines/
- My Wholesale Business Card: https://mywholesalebusinesscard.com/product/quick-plastic-nfc-business-cards/
- GoToTags custom card: https://store.gototags.com/custom-nfc-pvc-card/
- GoToTags pricing rules: https://gototags.com/store/pricing
- GoToTags shipping: https://gototags.com/store/shipping
- GoToTags custom cards category: https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/
- Tagstand small batch card (order form): https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/
- Tagstand custom order info: https://www.tagstand.com/custom-order-info
- Tagstand shipping: https://www.tagstand.com/shipping-and-payment/
- Tagstand NTAG215 tariff notice: https://www.tagstand.com/product-categories/ntag215/nfc/
- Plastic Printers JSON: https://shop.plasticprinters.com/products/custom-nfc-business-cards.json
- Plastic Printers NFC: https://www.plasticprinters.com/nfc-cards
- Plastic Printers BitSignal: https://www.plasticprinters.com/bitsignal-nfc-cards
- Plastic Printers business cards: https://www.plasticprinters.com/plastic-business-cards
- Tap Tag variants: https://taptag.shop/products/custom-printed-plastic-nfc-cards.json
- IDSuperShop: https://idsupershop.com/custom-printed-plastic-id-cards/
- idcards.com small batch: https://idcards.com/small-batch-custom-pvc-cards/
- InstantCard pricing: https://instantcard.net/pricing/
- FedEx Office name badges: https://www.office.fedex.com/default/name-tags-badges.html
- ID Wholesaler retransfer: https://www.idwholesaler.com/retransfer-printers.html
- Seritag delivery: https://seritag.com/delivery
- Seritag FAQ: https://seritag.com/faq
- Seritag buying guide: https://seritag.com/learn/using-nfc/buying-nfc-tags
- Seritag custom cards: https://seritag.com/nfc-tags/cp-cards-ntag213, https://seritag.com/nfc-tags/cp-cards-ntag215
- ShopNFC NTAG213 cards: https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html
- ShopNFC express print: https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html
- ShopNFC shipping: https://www.shopnfc.com/en/content/1-shipping
- NFC Tagify shipping/returns: https://nfctagify.com/pages/shipment-and-returns
- NFC Tagify about: https://nfctagify.com/pages/about-us
- nfc-tag-shop.de acrylic stand: https://www.nfc-tag-shop.de/en/Google-review-NFC-stand-acrylic-110-x-150-mm-white-glossy/17241
- Vistaprint (redirect target): https://www.vistaprint.com/business-cards
- Vistaprint India NFC FAQ: https://www.vistaprint.in/business-cards/nfc-visiting-cards
- Wave Connect comparison: https://wavecnct.com/blogs/vistaprint-vs-wave-nfc-business-cards
- CBP ruling NY N303172: https://www.customsmobile.com/rulings/docview?doc_id=NY+N303172
- CBP ruling NY N083108: https://www.customsmobile.com/rulings/docview?doc_id=NY+N083108
- CBP CSMS #69326983: https://content.govdelivery.com/accounts/USDHSCBP/bulletins/421d887
- CBP forced-labor HTS list PDF: https://content.govdelivery.com/attachments/USDHSCBP/2026/07/23/file_attachments/3723786/Forced%20Labor%20HTS%20LIST.pdf
- Honigman alert: https://www.honigman.com/alert-3462
- Akin List 3 to 25%: https://www.akingump.com/en/insights/alerts/ustr-increases-section-301-tariffs-on-list-3-products-and
- Gateway Lines Section 301 guide: https://gatewaylines.com/press-releases/complete-guide-to-section-301-china-tariffs-in-2026
- GingerControl import guide: https://gingercontrol.com/blog/importing-from-china-tariff-guide
- Cassidy Levy semiconductor exclusion: https://www.cassidylevy.com/news/semiconductor-exclusion-from-ieepa-reciprocal-tariffs-expanded-section-232-investigation-announced/
- KPMG Section 232 chips: https://kpmg.com/us/en/taxnewsflash/news/2026/01/united-states-imposes-tariff-advanced-computing-chips.html
- ZFCards: https://www.zfcards.com/1356mhz-ntag-213215216-pvc-nfc-card.html


## Open questions
- Live Amazon prices for blank NTAG215 10/25/50/100-packs (MINDRFID B0B5ZX9QND, Tagstand B06ZZWVZ3B/B07CLLD7XB/B07CLCH92T) and for the Review Highway NFC stand could not be fetched; check them manually (GoToTags at $0.48/card with MOQ 10 is the verified fallback).
- Does My Plastic Business Card deliver NTAG215 cards locked read-only on request, and what is their exact bleed/safe-zone template? (Their page implies cards ship rewritable via NFC Tools.)
- GoToTags' 'Printed PVC NFC Card – NTAG213' product page returned 404; confirm the live quick-print card price (category page shows '$11.99, as low as $0.55') and whether the $0.77-0.06 thermal / $0.24-0.15 inkjet print services apply to PVC cards or only to stickers/inlays.
- Plastic Printers does not state which NTAG chip its NFC business cards use, or whether its redirect software can be bypassed with a hard-coded URL.
- Exact current US duty rate for HTS 8523.52 smart cards of Chinese origin (MFN believed Free under ITA plus Section 301 List 3 25% plus 12.5% forced-labor tariff = ~37.5%) should be verified with a customs broker before ordering from Alibaba.
- Seritag's Graphics Guidelines PDF (bleed/safe-zone numbers) and GoToTags' GitLab artwork templates could not be opened; download them from the product pages before preparing final art.
- Tagstand small-batch cards: confirm accepted file types, whether encoding is delivered locked, and current shipping cost; the site warns of tariff-driven price increases.
- Whether a local ID-badge shop with a retransfer (Zebra ZXP 9 / Fargo HDP) printer will print on customer-supplied NTAG215 cards for 10-25 pieces — no national service advertises this; ID Wholesaler/AlphaCard on-demand printing has a 100-card minimum on their own stock.
- Alibaba factory quotes (Chuangxinjia, Xinyetong, ZD Technology, Prostek) for 500/1,000 double-sided CMYK NTAG213/215 cards with locked encoding, sample cost, and DDP-to-US shipping were not obtained; request by email if pursuing the China route.
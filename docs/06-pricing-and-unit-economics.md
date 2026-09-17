# Pricing, unit economics and Stripe setup

Working name: Tablenote. Prices on the site today: $15 per card one-time, $50 per month per location for the AI report, 10 free replacement cards per month for subscribers, minimum order 5 cards, starter kit 10 cards + report = $200 today then $50 per month. Everything below is built on those numbers so the site, the terms page and this document agree. Prices were read from supplier and vendor pages on 2026-09-04. Anything marked (assumption) is a planning figure to replace with a real quote or with measured data.

Where the supplier research (`research/suppliers.md`) and the unit-economics research (`research/unit_economics.md`) disagree on card cost, this document uses the supplier research. The unit-economics report priced cards at $2.60 / $1.90 / $1.45 / $0.95 for 100 / 250 / 500 / 1,000; only its 100-qty figure was a real quote (UPrinting $2.44) and its fact-check flagged the rest as assumptions. The supplier research has verified price tables from US printers, so those are used here.

## 1. Card COGS at 25 / 100 / 250 / 500 / 1,000

### 1.1 The fact that changes everything: each restaurant is its own print run

Every card carries the restaurant's name, the founder's chosen template and a QR code to that restaurant's own short link, so a "production run" is really many small runs of one design each. Bulk tier prices only apply when one artwork is printed in that quantity. My Plastic Business Card (MPBC) is the only vendor with a published rule for pooling designs into one tier: "there is no split fee if each person orders 50pcs or more" (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/). Below 50 cards per design, each restaurant order is priced at the small-quantity tier.

### 1.2 One design, printed and encoded, per card (before packaging and postage)

Primary supplier: My Plastic Business Card, La Habra CA. CR80 PVC, full colour both sides, matte, "NFC 215" chip, one URL programmed, QR included, digital proof within 24 hours, 5 business days production, $10 flat FedEx Ground in the continental US (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/, https://myplasticbusinesscard.com/faq/).

| Qty | MPBC list price | Inbound shipping ($10 flat / qty) | Card COGS (planning) | Order total | Verified alternatives at this quantity |
|---|---|---|---|---|---|
| 25 | $4.95 | $0.40 | **$5.35** | $133.75 | Tagstand small batch at 25: $1.84 one-sided ($46.00), $3.08 two-sided ($77.00), UV inkjet, encode and lock free, no minimum (order form, https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/, `research/suppliers.md` gap-fill section 8). Tap Tag 10 for $195 (https://taptag.shop/products/custom-printed-plastic-nfc-cards) |
| 100 | $2.20 | $0.10 | **$2.30** | $230.00 | UPrinting $2.44 (https://www.uprinting.com/nfc-business-cards.html); Seritag UK $2.54 plus 10% US surcharge, 10% duty and brokerage (https://seritag.com/nfc-tags/cp-cards-ntag213, https://seritag.com/delivery) |
| 250 | No 250 tier. 200 = $1.65, 300 = $1.54. Order 300. | $0.03 | **$1.57** | $472.00 for 300 | Plastic Printers 250 = $2.86 (https://shop.plasticprinters.com/products/custom-nfc-business-cards.json); GoToTags lists $1.65 at 250 but states MOQ 500 (https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/) |
| 500 | $1.26 | $0.02 | **$1.28** | $640.00 | GoToTags $1.35, MOQ 500, 3 weeks, ships from China; Seritag $0.98 which lands at roughly $1.24 to $1.32 after surcharge, duty and brokerage and takes 5+ weeks; Alibaba about $0.53 landed after 37.5% duty, freight and brokerage, with sample and quality risk (`research/suppliers.md` gap-fill sections 3 and 9) |
| 1,000 | $1.16 | $0.01 | **$1.17** | $1,170.00 | GoToTags $1.05 (two-sided print is listed as an add-on; confirm whether it is per card); Seritag $0.78, about $0.97 landed |

Notes.
- MPBC's chip is described as "NFC 215" with "roughly 200 characters" capacity; the page never says NXP. The card spec in this project is NTAG213, and the encoded URL `https://tblnt.co/r/<slug>?s=card` is about 35 characters, so either chip works. Ask MPBC for the IC part number before the first paid order.
- MPBC ships cards unlocked (their FAQ says the URL can be changed later with the NFC Tools app). Locking is done in-house with an Android phone; iOS apps only soft-lock (https://seritag.com/news/can-iphones-lock-nfc-tags).
- Tagstand's small-batch card prints one or two sides and offers "Encode and Lock" at no extra charge. Tiers from the live order form (`research/suppliers.md` gap-fill section 8, https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/):

| Qty | One-sided, per card | One-sided, total | Two-sided, per card | Two-sided, total |
|---|---|---|---|---|
| 1 | $15.45 | $15.45 | not captured | not captured |
| 5 | $4.02 | $20.10 | not captured | not captured |
| 10 | $2.59 | $25.90 | $4.56 | $45.60 |
| 25 | $1.84 | $46.00 | $3.08 | $77.00 |
| 50 | $1.70 | $85.00 | $2.80 | $140.00 |
| 100 | $1.56 | $156.00 | $2.60 | $260.00 |
| 500 | $1.44 | $720.00 | not captured | not captured |

  The "$2.60, no minimum" figure quoted in the older research is the two-sided price at 100, not a flat price. Print is UV inkjet with a velvet texture, less premium than MPBC's offset, so order a sample before using Tagstand for customer cards. Orders over $50 ship free by USPS First Class; under $50 pay about $2 handling plus postage (https://www.tagstand.com/shipping-and-payment/, summarised from search results, verify at checkout). Tagstand's NTAG215 category warns of tariff-driven price increases (https://www.tagstand.com/product-categories/ntag215/nfc/).
- California vendors charge California sales tax on California deliveries; budget the [CITY] rate on top of the numbers above.

### 1.3 What a real restaurant order costs at launch

MPBC publishes 1 = $49.50 and 25 = $4.95, nothing for 5 or 10. A 10-card starter kit therefore means ordering 25 of that restaurant's design ($133.75 delivered): 10 go in the kit, 15 stay on the shelf as that restaurant's replacement stock. That is the right way to run it anyway, because replacements must match the restaurant's card.

| Order | Cheapest way to fill it | Cash out | Cards left in stock |
|---|---|---|---|
| 5 cards, no report (site minimum) | Tagstand 5 one-sided at $4.02 = $20.10 plus about $2 handling and postage (QR moves to the front), or Tagstand 10 two-sided = $45.60 with 5 spares, or MPBC 25 at $133.75 | $22 to $134 | 0, 5 or 20 |
| 10-card starter kit | MPBC 25 at $4.95 (offset, primary supplier). Tagstand 10 two-sided is $45.60 and 25 two-sided is $77.00, cheaper but UV inkjet; sample first | $133.75 (MPBC) or $45.60 to $77.00 (Tagstand) | 15 (MPBC), 0 or 15 (Tagstand) |
| 25-card order | MPBC 25 at $4.95 (or 50 at $3.96 = $198 + $10 to hold 25 spares) | $133.75 or $208 | 0 or 25 |
| 50-card order | MPBC 50 at $3.96, or pool with other 50-card designs into the 100 / 500 tier | $208 or less | depends on pooling |

The 5-card minimum with no subscription is a cash loser at MPBC prices ($75 revenue against $133.75 of cards). At Tagstand, 5 one-sided cards cost $20.10 plus about $2 handling and postage, and 10 two-sided cards cost $45.60. A 5-card order routed to Tagstand one-sided clears about $40 after Stripe ($2.48), inbound shipping and outbound postage ($8.69), or about $14 on 10 two-sided cards with 5 spares. Either route 5-card orders to Tagstand, raise the minimum to 10, or ask MPBC for a 10-card price (see open items).

### 1.4 Packaging and postage

| Item | Cost | Source |
|---|---|---|
| Bubble mailer 4 x 8 in (#000), self-seal | $0.19 (Uline S-5631 white, $93 per case of 500 = $0.186; S-9984 kraft $84 per 500 = $0.168). The $0.50 S-11482 figure in the unit-economics report was corrected by its fact-check | https://www.uline.com/Product/Detail/S-5631/Self-Seal-Bubble-Mailers/Uline-Self-Seal-White-Bubble-Mailers-000-4-x-8 |
| USPS Ground Advantage, commercial, 4 oz | $6.93 zone 1 to $8.40 zone 8, effective July 12, 2026 | https://pe.usps.com/text/dmm300/Notice123.htm |
| USPS Ground Advantage, retail | from $7.90 | https://www.usps.com/business/prices.htm |
| First-Class Mail nonmachinable letter, 1 to 5 replacement cards in a #10 envelope | $1.31 (1 oz) to $1.60 (2 oz): $0.82 letter, $1.11 at 2 oz, plus the $0.49 nonmachinable surcharge, because DMM 101 treats rigid pieces as nonmachinable (verified, `research/unit_economics.md` gap-fill section 19). Up to 5 cards stay under the 1/4 inch letter thickness; the 5.5 g per card weight is an assumption. A 10-card pack is too thick and rigid for a letter and must go as a parcel | https://pe.usps.com/text/dmm300/Notice123.htm ; https://pe.usps.com/text/dmm300/101.htm |
| Printed insert | $0.10 per pack (assumption) | |
| Hand delivery in [CITY] | $0, and it is a sales visit | |

A 10-card pack weighs well under 4 oz. Mailed anywhere in the US: $0.19 + $6.93 to $8.40 = $7.12 to $8.59 mailer and postage (the fact-check's $7.10 to $8.59 uses the kraft mailer at the low end), plus the $0.10 insert = **$7.22 to $8.69 per pack, about $0.87 per card at zone 8**. One to five replacement cards go as a nonmachinable letter for $1.31 to $1.60, so a typical 2-card replacement costs $1.31, not a parcel. The site includes US shipping in the card price, so this comes out of margin.

### 1.5 Stripe fees

Stripe charges 2.9% + 30 cents per domestic card transaction plus 0.7% of Billing volume for pay-as-you-go subscriptions; the 0.7% applies to invoices generated by Billing, including one-time line items on the first subscription invoice (https://stripe.com/pricing, https://stripe.com/billing/pricing). Stripe Tax adds 0.5% per transaction on no-code Checkout and Billing, only where Tablenote is registered to collect tax (50 cents per transaction via the API instead) (https://stripe.com/tax/pricing).

| Charge | Fee | Effective rate | With Stripe Tax (0.5%) where registered |
|---|---|---|---|
| $200 starter kit (subscription mode, first invoice) | $5.80 + $0.30 + $1.40 = **$7.50** | 3.75% | + $1.00 = $8.50 |
| $50 monthly renewal | $1.45 + $0.30 + $0.35 = **$2.10** | 4.2% | + $0.25 = $2.35 |
| $75 five-card order, payment mode (no Billing fee) | $2.18 + $0.30 = **$2.48** | 3.3% | + $0.38 = $2.86 |
| $150 ten-card order, payment mode | $4.35 + $0.30 = **$4.65** | 3.1% | + $0.75 = $5.40 |

Section 2 leaves the Stripe Tax fee out because at launch it applies only to customers in the home state of Tablenote LLC; add $0.25 per subscription-month for those customers.

## 2. COGS per restaurant-month

| Line | Launch (replacement stock at $5.35, 2 replacements a month, mailed monthly as a nonmachinable letter) | Launch, hand-delivered | Scale (pooled 500-tier cards at $1.28, mailed monthly as a letter) | Zero replacements | Full allowance used, 10-card parcel monthly, launch cost | Full allowance used, scale cost |
|---|---|---|---|---|---|---|
| Stripe on $50 | $2.10 | $2.10 | $2.10 | $2.10 | $2.10 | $2.10 |
| AI report (Opus 5, two passes, about 100 reviews) | $0.30 | $0.30 | $0.30 | $0.30 | $0.30 | $0.30 |
| Review data (Outscraper after free tier, or GBP API at $0) | $0.30 | $0.30 | $0.30 | $0.30 | $0.30 | $0.30 |
| Email + PDF | $0.02 | $0.02 | $0.02 | $0.02 | $0.02 | $0.02 |
| Replacement cards | 2 x $5.35 = $10.70 | $10.70 | 2 x $1.28 = $2.56 | $0 | 10 x $5.35 = $53.50 | 10 x $1.28 = $12.80 |
| Replacement postage | $1.31 (2 cards, 1 oz letter) | $0 | $1.31 | $0 | $8.59 (10-card parcel, zone 8; two 5-card letters would be $3.20) | $8.59 |
| **Variable cost** | **$14.73** | **$13.42** | **$6.59** | **$2.72** | **$64.81** | **$24.11** |
| **Contribution** | **$35.27** | **$36.58** | **$43.41** | **$47.28** | **($14.81)** | **$25.89** |
| **Gross margin** | **71%** | **73%** | **87%** | **95%** | **negative** | **52%** |

Arithmetic behind the AI line: Claude Opus 5 is $5 per million input tokens and $25 per million output tokens; Sonnet 5 is $2 / $10 and that price is now permanent; the Batch API halves both (https://platform.claude.com/docs/en/about-claude/pricing). A 100-review month is about 17,600 input tokens and 3,000 output tokens per pass (60-word review at 0.75 words per token, plus 30% for the newer tokenizer, plus prompt and last month's report): 17,600 x $5 / 1,000,000 = $0.088 plus 3,000 x $25 / 1,000,000 = $0.075, so $0.16 per pass and about $0.30 for two passes. Sonnet 5 would be under $0.10. AI is not where the margin goes.

Review data: the Google Business Profile API is free ("available to registered users at no charge") but the founder's own project must be approved, which requires managing a GBP that has been verified and active for 60+ days and having a website (https://developers.google.com/my-business/content/pricing, https://developers.google.com/my-business/content/prereqs). Outscraper is free for the first 500 reviews per 30 days, then $3 per 1,000 (https://outscraper.com/pricing/); Apify's Google Maps Reviews Scraper is $0.60 per 1,000 on Free, $0.45 on the $19 Starter plan, with a $5 monthly free credit (Apify API, 2026-09-04, https://apify.com/compass/google-maps-reviews-scraper). Google Maps terms prohibit bulk download of content (https://www.google.com/help/terms_maps/), so scrapers are a demo-phase tool and the paid product should move to the GBP API with owner consent.

Fixed platform cost, not in the table: Vercel Pro $20 (Hobby is non-commercial), Supabase $0 to $25, Resend free up to 3,000 emails a month, PDF rendered server-side at $0 (PDFShift $9 as fallback), domain $1 to $3 a month (https://vercel.com/pricing, https://supabase.com/pricing, https://resend.com/pricing, https://pdfshift.io/pricing, https://porkbun.com/products/domains). Planning figure **$50 per month**. Per restaurant that is $5.00 at 10 restaurants, $2.00 at 25, $1.00 at 50.

Founder time is also not in the table: 15 to 20 minutes of QA per report (assumption) is $7.50 to $10 per restaurant-month at $30 an hour and is the largest non-hardware cost once past 20 restaurants.

The planning contribution used for the rest of this document is **$35.27 per restaurant-month at launch** and **$43.41 at scale**.

## 3. Gross margins

### 3.1 Cards at $15, sold in a 10-card kit, mailed

| Card cost basis | Card | Mailer + postage share (zone 8, / 10) | Insert share | Stripe share ($5.40 kit card fees / 10) | Total cost | Gross profit | Margin |
|---|---|---|---|---|---|---|---|
| 25 per design, $5.35 | $5.35 | $0.86 | $0.01 | $0.54 | $6.76 | $8.24 | **55%** |
| 100, $2.30 | $2.30 | $0.86 | $0.01 | $0.54 | $3.71 | $11.29 | 75% |
| 300, $1.57 | $1.57 | $0.86 | $0.01 | $0.54 | $2.98 | $12.02 | 80% |
| 500, $1.28 | $1.28 | $0.86 | $0.01 | $0.54 | $2.69 | $12.31 | 82% |
| 1,000, $1.17 | $1.17 | $0.86 | $0.01 | $0.54 | $2.58 | $12.42 | 83% |

Hand delivery adds $0.86 per card of margin. On a cash basis the launch kit is thinner: $150 of card revenue against $133.75 of cards ordered, $8.69 of shipping and insert and $5.40 of Stripe leaves $2.16, with 15 spare cards on the shelf worth $80.25 at cost. Those spares are what the replacement allowance is paid from, so the kit is really pre-buying seven months of expected replacements.

### 3.2 Subscription at $50

From the table in section 2: 71% at launch with expected replacements mailed monthly as a letter, 73% hand-delivered, 87% at scale, 95% with no replacements, negative if a restaurant draws all 10 cards every month at launch card cost. Every cost other than replacement cards adds up to $2.72, or 5.4% of price. Replacement policy is the only lever that matters for subscription margin.

## 4. The 10 free replacement cards liability

### 4.1 Expected versus worst case

A 15-table room needs 15 to 20 cards in circulation. Cards walk off in pockets, get wet, or go out with the check presenter. Expected loss is 1 to 3 cards per location per month (assumption; measure it in the pilot). As an illustration (my own assumption, no research source): a 40-table room doing 2,000 table drops a month would lose 10 cards a month at a 0.5% walk-off rate and 20 to 40 at 1 to 2%, so the allowance is realistic only if the card is collected with the payment, not left as a take-home.

| Case | Cards | Postage | Cost per restaurant-month | Share of $50 | At 25 restaurants | At 50 restaurants |
|---|---|---|---|---|---|---|
| Expected, launch stock ($5.35), mailed monthly as a letter | 2 x $5.35 = $10.70 | $1.31 | **$12.01** | 24% | $300 | $601 |
| Expected, hand-delivered | $10.70 | $0 | $10.70 | 21% | $268 | $535 |
| Expected, scale stock ($1.28) | $2.56 | $1.31 | $3.87 | 8% | $97 | $194 |
| Worst case, launch stock, 10-card parcel monthly | 10 x $5.35 = $53.50 | $8.59 | **$62.09** | 124% | $1,552 | $3,105 |
| Worst case, scale stock | $12.80 | $8.59 | $21.39 | 43% | $535 | $1,070 |

Worst case at 50 restaurants also means 500 cards a month of inventory across 50 designs. It will not happen everywhere, but one or two restaurants treating the allowance as free inventory for new tables is enough to erase the margin on ten good ones.

### 4.2 Recommended fair-use wording

The terms page already says "up to 10 replacement cards per month at no charge, subject to fair use", limits replacements to cards that are lost, stolen, worn out or damaged, says unused allowances do not roll over, and reserves the right to ask for a photo and to decline requests that exceed fair use. Keep that. Add the two operational clauses below to the terms and to the pricing FAQ so the shipping cost is controlled and the "new tables" loophole is closed in plain language.

> Replacement cards are for cards already in service at your location. We send replacements in one shipment per calendar month, or hand them over on our next visit. Adding tables, servers or locations is a new order at $15 per card, not a replacement. The allowance is a courtesy for active subscribers; we may adjust it with 30 days' notice.

Why each clause: one shipment a month caps postage at $1.31 to $1.60 for up to 5 cards as a letter and $8.59 at most for a 10-card parcel, and only when used; "already in service" stops a new three-location group using the allowance as free inventory; "no roll-over" (already in the terms) prevents a 120-card claim at month 12; "may adjust" gives an exit without breaking contracts. Extra cards stay at $15 to match the site; the unit-economics research suggested an $8 subscriber overage price, which is not adopted here because it would undercut the card price on the pricing page.

Operationally: order 25 cards per restaurant on the first run, ship 10, hold 15. Log every replacement (section 8.7). If a restaurant burns through 15 in under five months, call them before reordering; it usually means cards are being handed out to take home.

## 5. Break-even for a solo founder

Assumptions: pre-tax owner draw as the target, fixed platform cost $50 a month, contribution per restaurant-month from section 2, card sales excluded (they roughly wash at launch, see 3.1), founder QA time excluded.

| Monthly income target | Launch contribution $35.27: N = (target + $50) / 35.27 | Scale contribution $43.41 | Founder QA hours at 15 to 20 min per report |
|---|---|---|---|
| $2,000 | 2,050 / 35.27 = 58.1 → **59 restaurants** | 47.2 → **48** | 15 to 20 hrs / month |
| $5,000 | 5,050 / 35.27 = 143.2 → **144** | 116.3 → **117** | 36 to 48 hrs / month |
| $10,000 | 10,050 / 35.27 = 285.0 → **285** | 231.5 → **232** | 71 to 95 hrs / month |

Two things the table hides. At 5% monthly churn, holding 144 restaurants steady means closing about 7 new ones every month, which is a part-time sales job on top of the reports. And at $10,000 the QA hours alone are a half-time job, which is the argument for automating report QA and for pooling card designs before passing 100 locations. Sensitivity: with zero replacements ($47.28) the $5,000 target needs 107 restaurants; if every restaurant draws the full allowance at scale cost ($25.89) it needs 196.

## 6. LTV, churn, CAC and payback

### 6.1 Churn

| Source | Figure | URL |
|---|---|---|
| Cobloom citing Baremetrics | "a typical 'good' churn rate for SaaS companies that target small businesses is 3-5% monthly" | https://www.cobloom.com/blog/churn-rate-how-high-is-too-high |
| Baremetrics Academy | SaaS churn "ideally around 5-7%"; new businesses "up to 15% during their initial year" | https://baremetrics.com/academy/churn |
| Recurly benchmarks | SaaS 3.22%, Travel/Hospitality 3.91%; annual figures per the page ("All figures are annual churn rates"), so not comparable to monthly SMB churn and not used | https://www.recurly.com/research/churn-rate-benchmarks/ |

Restaurants close, change hands and have seasonal cash squeezes, so: base case **5% a month** (expected lifetime 1 / 0.05 = 20 months), optimistic 3% (33 months), pessimistic 8% (12.5 months). No restaurant-specific closure statistic was found; treat 5% as an assumption to replace with measured data after six months.

### 6.2 LTV (contribution, launch cost basis)

Recurring contribution $35.27 a month plus the kit's contribution of $82 ($150 card revenue less $53.50 for 10 cards at $5.35, $8.69 shipping and insert, $5.40 Stripe).

| Scenario | Months | Recurring | Kit | **LTV (contribution)** | LTV (revenue: $50 x months + $150) |
|---|---|---|---|---|---|
| Fixed 6-month retention | 6 | $211.62 | $82 | **$294** | $450 |
| Fixed 12-month retention | 12 | $423.24 | $82 | **$505** | $750 |
| Fixed 24-month retention | 24 | $846.48 | $82 | **$928** | $1,350 |
| 8% churn (pessimistic) | 12.5 | $440.88 | $82 | $523 | $775 |
| 5% churn (base) | 20 | $705.40 | $82 | **$787** | $1,150 |
| 3% churn (optimistic) | 33.3 | $1,174.49 | $82 | $1,256 | $1,815 |

The unit-economics research quoted $950 at 5% churn; its own fact-check found that figure ignored replacement cards and postage and expected $600 to $800 once full variable cost was included. $787 is consistent with that correction. At scale contribution ($43.41) the base-case LTV rises to $950.

### 6.3 Door-to-door CAC

No published benchmark for in-person restaurant selling was found. HubSpot's compiled statistics give cold-call success at about 2 to 3% and say 80% of successful sales take five or more follow-ups (https://blog.hubspot.com/sales/sales-statistics). Every figure below is an assumption to validate on the first 40 visits.

| Assumption | Base | Good |
|---|---|---|
| Visits per 4-hour afternoon block (2 to 4 pm lull) | 8 | 8 |
| Owner or GM present | 50% | 50% |
| Close rate when the decision-maker is present, after up to two follow-ups | 10% | 20% |
| Visits per close | 20 | 10 |
| Founder hours per close | 10 | 5 |
| Founder time at $30 / hour | $300 | $150 |
| Demo cards left behind (2 x $5.35) plus fuel and parking | about $30 | about $15 |
| **CAC** | **about $330** | **about $165** |
| LTV : CAC at 5% churn ($787) | 2.4x | 4.8x |
| Payback: (CAC less $82 kit contribution) / $35.27 | 7.0 months | 2.4 months |

The kit is what makes door-to-door work: it recovers a quarter to a half of CAC on day one. Do not give the first 10 cards away free. If the pilot close rate lands near the base case, the fix is not a lower price but a second channel (referrals from the first ten owners, a POS reseller) before 100 locations.

## 7. Pricing recommendation for launch

**Keep $15 per card and $50 per month.** The site, the checkout code, the terms and the sample report all use these numbers; changing them costs a week and buys nothing until there are real reports to justify a change. Do not switch to $49: the economics are identical and every page would need editing.

### 7.1 What buyers can compare against

Hardware (single custom or stock Google review cards, USD, prices as displayed 2026-09-04):

| Seller | Single card | 10 cards | Custom logo | Subscription | URL |
|---|---|---|---|---|---|
| Tap Tag | $15.95 to $19.95 sale (reg $24.95); custom-logo from $29.95 | 20% off at 10; custom 10 = $195 | Yes | None required; optional Review+ $19/mo sells review filtration (gating) | https://taptag.shop/products/tap-review-card, https://taptag.shop/products/custom-printed-plastic-nfc-cards |
| TapFive | $19.95 | $99.95 ($10 each); 20 = $147.95 ($7.40) | No | None; 90-day money-back | https://shop.tapfive.com/ |
| TAPro | Standard card $24.90 (reg $29.99); 3 for $49; 5 for $69; premium Onyx $34.95 single only | $95.90 ($9.59 each) | No | None | https://taprocard.com/products/nfc-google-review-card-deal-sale, https://taprocard.com/products/g-series-onyx-google-review-card |
| Revuzee | from $14.99; custom logo from $19.99 | 5-packs on Amazon | Yes | None | https://revuzee.com/ |
| Tapping Tags | cards $18.90 to $98.90 | bulk not published | No | None | https://tappingtags.com/product/google-review-nfc-and-qr-code/ |
| Ninja Pop | $9.97 | packs on Amazon; wholesale 40% off at $400 | No | None | https://ninjapop.io/products/ninja-pop-google-review-card-contactless-review-card |
| Reviews Card (UK) | £16 ($21.63) | £7.90 each ($10.68) | Custom from £25 ($33.79) | None | https://www.reviewscard.com/products/google-tap-to-review-cards |

At $15 with a custom design, both sides printed, QR fallback and a managed redirect, Tablenote is below every custom-logo card and above the stock 10-packs. That is the right place: no seller found offers ongoing free replacements, and "no subscription" is table stakes for hardware, so the monthly fee must visibly buy the report and the replacements, never "keeping the card working". The terms already say cards keep working after cancellation; keep saying it.

Software (per location per month unless noted):

| Product | Price | Contract | Named-staff analysis | Confidence | URL |
|---|---|---|---|---|---|
| Reputation.com | $80 / $115 / $150 | not stated on official page | not documented | high | https://reputation.com/pricing |
| GatherUp | $99 single; $60 per location for 2 to 10; 20% off annual | 14-day trial | not documented | high | https://gatherup.com/pricing/ |
| NiceJob Reviews | $75 | monthly | no | high | https://get.nicejob.com/pricing |
| Marqii Pro | $145 (AI review summaries); Base $90 has no reviews | annual | not documented | high | https://marqii.com/pricing |
| Tattle | $125 for 5 to 10 units, down to $65 at 51 to 200 | annual | unverified | high on price | https://get.tattleapp.com/pricing |
| Birdeye | about $299 / $349 / $449 | 12 months | marketing copy only | low, third-party estimate | https://birdeye.com/pricing/ (quote only), https://costbench.com/software/review-management/birdeye/ |
| Podium | quote only; third-party $399 / $599 | annual | no | low | https://www.podium.com/pricing |
| Local Falcon AI Reviews Analysis | $19 per location per report, monthly schedule available | credits | yes | high | https://www.localfalcon.com/features/reviews-analysis |
| Review Report | $30 flat; vendor site returned 503 on 2026-09-04 | monthly | "Menu & Staff Analytics" listed | low, possibly dormant | https://www.capterra.com/p/10036627/ReviewReport/ |
| Google Business Profile AI summaries | $0 | | no | third-party rollout figure | https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026 |

$50 sits between the DIY summary tools ($19 to $30) and every restaurant suite ($80 to $449 on annual contracts). It holds only if the report is operational: which dishes to feature, which volunteered staff names to praise at pre-shift, what changed month over month, three actions. A sentiment pie chart will lose to Google's free summary.

### 7.2 Packs, prepay and tiers

Launch statement: $15 per card and $50 per location per month, exactly as the pricing page, `site/lib/brand.ts` (`PRICING.cardPrice = 15`) and the checkout route say today. Every row below except the first and the founding-restaurant coupon is a future option. Each one needs a site change before it is sold: the price in `brand.ts`, a checkout branch or Dashboard price, `PricingCards.tsx` and the pricing FAQ. Do not quote any of them to a restaurant until that change has shipped.

| Option | Recommendation | Why |
|---|---|---|
| 10-card starter kit, $200 then $50/mo | Keep as the default offer (live today) | Simplest close; recovers CAC; fills a 10 to 15 table room |
| Full-room kit: 25 cards + report | Future option, not at launch: **$350** ($300 cards at $12 each + first month). Until the code change (a kit SKU in `PRICING` plus a checkout branch), the only way to sell it is a Stripe coupon on the card line of a 25-card order | A 20 to 40 table room needs 25 to 50 cards; $15 x 25 = $375 up front is where sales stall. Fill it from a 50-card MPBC order at $3.96 ($208 delivered): 25 in the kit, 25 spares. Kit cards cost $104, contribution about $180. Note that $12 is the floor in the next row and is below the $15 the pricing page shows, so the page must explain the kit price when it goes live |
| Discounting below $12 a card | Do not | Cuts card contribution, weakens CAC recovery, and still does not answer "I can get these for $2.60 at 100" |
| Annual prepay | Offer **$500 a year** (two months free) from month 3, not at launch | Locks 12 months against an expected 20-month life; cheap insurance. Stripe fee on $500 is $14.50 + $0.30 + $3.50 = $18.30. Wait until there are three real monthly reports to show, or the prepay ask will sink the close |
| Higher tier: Pro at $99 | Design now, sell after 10 paying Core customers | Weekly digest, same-day email on any 1 or 2 star review, AI-drafted owner reply. Extra cost is about $0.04 of AI, $1.75 of Stripe and 4x more frequent review pulls; SMS alerts would add A2P registration and per-message fees that were not priced |
| Additional locations | Future option: $40 a month each for the second and later locations. Today the pricing page says each location is its own $50 subscription and to ask about a bundle at three or more; keep that wording until `PricingCards.tsx` and the FAQ are changed | Mirrors GatherUp's $99 to $60 step; small groups are the door-to-door sweet spot because one owner buys for all |
| Founding-restaurant offer | 50% off the report for 3 months, first 20 local customers | Stripe coupon, `duration=repeating`, `duration_in_months=3`, `max_redemptions=20`; promotion codes are already enabled in checkout |
| Free trial | No | The report needs a month of data. Charge on day one and deliver a baseline report from the last 90 days of reviews within 48 hours instead |

## 8. Stripe setup for the existing account

### 8.1 Second account or same account

Stripe lets one login own several accounts; the note in `site/.env.example` assumes this and it should be confirmed on the Dashboard before relying on it (not fetched in research).

| | Same account as the photo and water business | Second account for Tablenote |
|---|---|---|
| Pros | Zero setup; already verified; payouts already flow | Clean books and a separate 1099-K; statement descriptor "TABLENOTE" instead of the other business; own Stripe Tax registrations; own customer portal branding; separable if the business is sold or gets a partner; Radar and dispute history do not mix with street sales |
| Cons | Mixed revenue in reports and tax forms; one statement descriptor for two businesses; Stripe Tax settings apply to both; card orders and subscriptions land in the same payout as street sales | Needs the LLC's EIN and a business bank account to activate; a second set of settings to maintain; new account starts with no processing history |

Recommendation: build and test in the existing account's **test mode** this week (test mode keys are free and touch nothing live). Create the second account for Tablenote LLC as soon as the LLC and its bank account exist, activate it, and move the live keys there before the first paid order. The terms page already names Tablenote LLC and needs the state of formation filled in before launch.

### 8.2 Dashboard products versus the current price_data approach

The checkout route (`site/app/api/checkout/route.ts`) builds every line with `price_data` and `product_data`, reading amounts from `PRICING` in `site/lib/brand.ts`. It creates one Checkout Session in `subscription` mode with the one-time card line plus the recurring report line when the report is selected, and in `payment` mode for cards only. Stripe's API reference confirms the mixed cart: in subscription mode, "Line items with one-time Prices will be on the initial invoice only" and up to 20 of each type are allowed (https://docs.stripe.com/api/checkout/sessions/create).

| | Keep price_data (current) | Dashboard Products and Prices |
|---|---|---|
| Setup | None; already works | Create products and prices once, copy price IDs into env vars |
| Price changes | Edit `brand.ts`, redeploy | Create a new Price in the Dashboard, update the env var |
| Reporting | Each session creates its own ad hoc Product and Price object, so "revenue by product" in the Dashboard is cluttered (verify in test mode by running two checkouts and opening Products) | Clean revenue by product, and the customer portal can show plan names |
| Coupons | Work either way with `allow_promotion_codes` | Same, plus product-restricted coupons |
| Annual plan, Pro tier, extra locations | Would need more `price_data` branches in code | Just more price IDs; the portal can handle plan switches |

Recommendation: launch on `price_data` as built. Switch to Dashboard prices when adding the annual plan or Pro tier. When that day comes, create:

| Product | Price | Type |
|---|---|---|
| Tablenote tap-to-review card | $15.00 one-time (quantity adjustable 5 to 200) | one-time |
| Tablenote monthly review report | $50.00 / month | recurring |
| Tablenote review report, annual | $500.00 / year | recurring |
| Tablenote Pro report | $99.00 / month | recurring |
| Additional location (only if the $40 option in 7.2 is adopted) | $40.00 / month, quantity = extra locations | recurring |

### 8.3 Tax settings

- [ ] Physical cards are tangible goods and taxable in most states; the report is software or a service and is taxed state by state. Register for sales tax in the home state of Tablenote LLC ([STATE]) before the first live sale; the site already tells buyers tax is added at checkout where required.
- [ ] Activate Stripe Tax in the Dashboard, then set `STRIPE_AUTOMATIC_TAX=1` so the checkout route passes `automatic_tax: { enabled: true }`. Stripe Tax costs 0.5% per transaction on Checkout and Billing where Tablenote is registered to collect (about $0.25 on a $50 invoice, $1.00 on the $200 kit); the API route is 50 cents per transaction instead (https://stripe.com/tax/pricing).
- [ ] Give the card product a tangible-goods tax code and the report a SaaS tax code in Stripe Tax so each line is taxed correctly. With `price_data` this means adding `tax_code` to `product_data` in the checkout route: cards `txcd_99999999` (General - Tangible Goods), report `txcd_10103001` (SaaS, business use); if a shipping line is ever added it is `txcd_92010001` (https://docs.stripe.com/tax/tax-codes, https://docs.stripe.com/payments/during-payment/charge-shipping.md?payment-ui=stripe-hosted).
- [ ] Shipping is included in the card price, so there is no separate shipping line to tax. Keep it that way; it also keeps the pricing page honest.
- [ ] Outside the home state, Stripe Tax only collects where a registration is added. Watch the Dashboard's threshold monitoring as sales spread.

### 8.4 Customer portal for cancel-anytime

- [ ] Dashboard: Settings, Billing, Customer portal. Turn on cancel subscription, set cancellation to take effect at the end of the billing period (the terms promise the report stays active until the end of the current period and that partial months are not refunded), and turn on payment method updates and invoice history.
- [ ] Leave plan switching off until Dashboard prices exist.
- [ ] Add a "Manage subscription" link on the site that creates a portal session with the customer ID saved from the Checkout Session (`checkout.session.completed` webhook, store `customer` and `subscription`), or use the portal's no-code login link for now and put it in the welcome email. Promotion codes can also be applied in the portal (https://docs.stripe.com/billing/subscriptions/coupons.md).
- [ ] Email cancellations still count; the terms allow cancellation by email, so cancel manually in the Dashboard when someone writes in.

### 8.5 Invoice and receipt text

- [ ] Statement descriptor: TABLENOTE (or TABLENOTE.CO). Set on the account, not per charge, so it must be the Tablenote account, not the shared one.
- [ ] Invoice footer (Settings, Billing, Invoice template): "Includes the monthly AI review report and up to 10 replacement cards per month for cards in service, subject to fair use. Cancel any time at tablenote.co or by emailing hello@tablenote.co. Printed cards are not refundable after proof approval."
- [ ] Line item names come from `product_data.name` in the checkout route: "Tablenote tap-to-review card" and "Tablenote monthly review report", with the design template and restaurant name in the description. Keep the restaurant name there; owners reconcile invoices by it.
- [ ] Turn on email receipts for successful payments and failed-payment emails (Smart Retries under Billing, Subscriptions and emails) so involuntary churn from expired cards is caught without hand work.

### 8.6 Free replacement cards live outside Stripe

Do not model the allowance in Stripe. It is an entitlement, not a product.

- [ ] Keep a replacement log with one row per shipment: restaurant, month, cards sent, reason (lost, worn, damaged), sent via (mail or visit), cost of postage, spares remaining. A spreadsheet or the same Airtable the lead webhook posts to is enough at launch.
- [ ] Keep a per-restaurant stock line: cards printed, cards shipped in the kit, spares on hand. Reorder from MPBC when spares fall below 5.
- [ ] The allowance is active only while the Stripe subscription status is `active`. Listen to `customer.subscription.updated` and `customer.subscription.deleted`, or simply check the Dashboard before sending cards; at launch volume a manual check is fine.
- [ ] Requests above the allowance or for new tables are a normal card order on the site at $15 each.
- [ ] Review the log after 90 days of pilot data and set the allowance from the measured loss rate.

### 8.7 Test mode checklist

- [ ] Copy `site/.env.example` to `site/.env.local`; put the test secret key (`sk_test_...`) in `STRIPE_SECRET_KEY`; set `SITE_URL=http://localhost:3000`.
- [ ] Order 10 cards plus report with test card 4242 4242 4242 4242. Confirm the session is `subscription` mode, the first invoice is $200.00, and the subscription shows $50.00 recurring monthly.
- [ ] Order 5 cards with no report. Confirm `payment` mode and $75.00 total.
- [ ] Try 4 cards and 201 cards; the API should reject both (minimum 5, maximum 200 in `PRICING`).
- [ ] Check that the shipping address is collected, phone is collected, and only US addresses are allowed.
- [ ] Apply a test promotion code and confirm it applies to the report line only, not the cards, if that is the intent.
- [ ] Turn on `STRIPE_AUTOMATIC_TAX=1` with Stripe Tax active in test mode; check a taxable state address adds tax and shows it before payment.
- [ ] Open the Dashboard Products list after two test checkouts and note how many ad hoc products were created; decide whether that clutter is acceptable.
- [ ] Open the customer portal for the test customer; cancel; confirm the subscription ends at period end and the terms wording matches.
- [ ] Use a test card that fails on renewal (4000 0000 0000 0341) to see the failed-payment email and the Smart Retry schedule.
- [ ] Confirm the success page at `/order/success?session_id=...` renders with the session ID and the cancel page returns to `/order?canceled=1`.
- [ ] Check `subscription_data.metadata` and `payment_intent_data.metadata` in the Dashboard carry the restaurant name, template, colours and Google review link, since that metadata is the proof brief.
- [ ] Repeat the first two orders on the live account with a real card for $1 minimum test amounts if needed, then refund, before the first customer order.

## 9. Monthly P&L template

Assumptions: every restaurant subscribes; expected replacements (2 cards a month at $5.35, mailed monthly as a nonmachinable letter); 5% churn replaced by new starter kits (0.5, 1.25 and 2.5 kits a month); kit cards costed at 10 x $5.35 with the 15 spares feeding the replacement line; fixed platform $50. Replace the assumption rows with measured numbers each month.

| Line | 10 restaurants | 25 restaurants | 50 restaurants | How it is calculated |
|---|---|---|---|---|
| Subscription revenue | $500.00 | $1,250.00 | $2,500.00 | $50 x N |
| Card revenue (new kits) | $75.00 | $187.50 | $375.00 | $150 x 0.05 N |
| **Revenue** | **$575.00** | **$1,437.50** | **$2,875.00** | |
| Stripe fees | $23.70 | $59.25 | $118.50 | $2.10 x N + $5.40 x kits |
| AI reports | $3.00 | $7.50 | $15.00 | $0.30 x N |
| Review data | $3.00 | $7.50 | $15.00 | $0.30 x N (often $0 inside Outscraper's free tier or on the GBP API) |
| Email and PDF | $0.20 | $0.50 | $1.00 | $0.02 x N |
| Replacement cards | $107.00 | $267.50 | $535.00 | 2 x $5.35 x N |
| Replacement postage | $13.10 | $32.75 | $65.50 | $1.31 x N ($0 if hand-delivered) |
| New-kit cards | $26.75 | $66.88 | $133.75 | 10 x $5.35 x kits |
| New-kit shipping and insert | $4.35 | $10.86 | $21.73 | $8.69 x kits |
| **Cost of sales** | **$181.10** | **$452.74** | **$905.48** | |
| **Gross profit** | **$393.90** | **$984.76** | **$1,969.52** | 69% |
| Platform (Vercel, Supabase, email, domain) | $50.00 | $50.00 | $50.00 | planning figure |
| LLC fees, insurance, accounting software | [fill] | [fill] | [fill] | founder to supply |
| **Operating profit before founder time** | **$343.90** | **$934.76** | **$1,919.52** | |
| Memo: founder QA time at 15 to 20 min per report, $30 / hr | $75 to $100 | $188 to $250 | $375 to $500 | not a cash cost, but it is the founder's evening |
| Memo: cash tied up in spares (15 x $4.95 x N) | $743 | $1,856 | $3,713 | paid up front with each kit order |

Two levers show up immediately in this table. Hand-delivering replacements in [CITY] removes the postage line entirely. Pooling designs at 50 cards each into MPBC's 500 tier drops the replacement card line from $5.35 to $1.28 a card, which at 50 restaurants is $407 a month.

## Open decisions for the founder

- [ ] Confirm in writing with MPBC: price for a 10-card single-design order, whether the "classic" template with only the restaurant name and QR varying counts as one design for tier pricing, the IC part number behind "NFC 215", and whether they will lock cards on request.
- [ ] Decide what to do with 5-card, no-report orders: route to Tagstand (5 one-sided at $20.10, or 10 two-sided at $45.60 with 5 spares), raise the site minimum to 10, or accept the loss as a lead cost.
- [ ] State of formation for Tablenote LLC, the EIN and bank account, which gate the second Stripe account and the sales tax registration.
- [ ] Measure the real replacement rate and the door-to-door close rate in the pilot; both drive every number in sections 5 and 6.

## Sources

- My Plastic Business Card pricing, shipping and FAQ: https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ ; https://myplasticbusinesscard.com/faq/
- Tagstand small batch (order form tiers), shipping and tariff notice: https://www.tagstand.com/product-categories/custom-online-order/custom-small-batch-fast-no-minimums/ ; https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/ ; https://www.tagstand.com/shipping-and-payment/ ; https://www.tagstand.com/product-categories/ntag215/nfc/
- GoToTags printed card and encoding: https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ ; https://store.gototags.com/custom-nfc-pvc-card/ ; https://store.gototags.com/nfc-tag-encoding-service/
- Plastic Printers: https://shop.plasticprinters.com/products/custom-nfc-business-cards.json
- Seritag pricing and US delivery surcharge: https://seritag.com/nfc-tags/cp-cards-ntag213 ; https://seritag.com/delivery ; iPhone locking: https://seritag.com/news/can-iphones-lock-nfc-tags
- UPrinting: https://www.uprinting.com/nfc-business-cards.html
- Tap Tag: https://taptag.shop/products/tap-review-card ; https://taptag.shop/products/custom-printed-plastic-nfc-cards ; https://taptag.shop/pages/tap-tag-pricing
- TapFive: https://shop.tapfive.com/ ; TAPro: https://taprocard.com/products/nfc-google-review-card-deal-sale ; https://taprocard.com/products/g-series-onyx-google-review-card ; Revuzee: https://revuzee.com/ ; Tapping Tags: https://tappingtags.com/product/google-review-nfc-and-qr-code/ ; Ninja Pop: https://ninjapop.io/products/ninja-pop-google-review-card-contactless-review-card ; Reviews Card: https://www.reviewscard.com/products/google-tap-to-review-cards
- Software pricing: https://reputation.com/pricing ; https://gatherup.com/pricing/ ; https://get.nicejob.com/pricing ; https://marqii.com/pricing ; https://get.tattleapp.com/pricing ; https://birdeye.com/pricing/ ; https://costbench.com/software/review-management/birdeye/ ; https://www.podium.com/pricing ; https://www.localfalcon.com/features/reviews-analysis ; https://www.capterra.com/p/10036627/ReviewReport/ ; https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026
- Postage and packaging: https://pe.usps.com/text/dmm300/Notice123.htm ; https://pe.usps.com/text/dmm300/101.htm ; https://www.usps.com/business/prices.htm ; https://www.uline.com/Product/Detail/S-5631/Self-Seal-Bubble-Mailers/Uline-Self-Seal-White-Bubble-Mailers-000-4-x-8
- Stripe fees, Tax and Checkout: https://stripe.com/pricing ; https://stripe.com/billing/pricing ; https://stripe.com/tax/pricing ; https://docs.stripe.com/tax/tax-codes ; https://docs.stripe.com/payments/during-payment/charge-shipping.md?payment-ui=stripe-hosted ; https://docs.stripe.com/api/checkout/sessions/create ; https://docs.stripe.com/payments/checkout/how-checkout-works.md?payment-ui=stripe-hosted ; https://docs.stripe.com/billing/subscriptions/coupons.md
- AI pricing: https://platform.claude.com/docs/en/about-claude/pricing
- Review data: https://developers.google.com/my-business/content/pricing ; https://developers.google.com/my-business/content/prereqs ; https://outscraper.com/pricing/ ; https://apify.com/compass/google-maps-reviews-scraper ; https://www.google.com/help/terms_maps/
- Platform costs: https://vercel.com/pricing ; https://supabase.com/pricing ; https://resend.com/pricing ; https://pdfshift.io/pricing ; https://porkbun.com/products/domains
- Churn: https://www.cobloom.com/blog/churn-rate-how-high-is-too-high ; https://baremetrics.com/academy/churn ; https://www.recurly.com/research/churn-rate-benchmarks/
- Sales statistics: https://blog.hubspot.com/sales/sales-statistics
- Import duty stack for Chinese cards (HTS 8523.52, 9903.88.03, 9903.05.31): https://hts.usitc.gov/reststop/search?keyword=8523.52 ; https://www.federalregister.gov/documents/2026/07/28/2026-15181/notice-of-actions-in-section-301-investigations-of-acts-policies-and-practices-of-various-economies
- FX rates used for GBP prices (2026-09-04): https://open.er-api.com/v6/latest/USD

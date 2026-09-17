# Research: unit_economics

_Generated 2026-09-04 by a research workflow. Fact-check verdicts and gap-fill findings are appended below the main report._

# Unit Economics: NFC Tap-to-Review Cards + Monthly AI Review Report for Independent Restaurants

Date of analysis: 2026-09-04. All prices are USD unless noted. Every number that comes from a source is cited inline; numbers labelled **(assumption)** are mine and should be replaced with real quotes before launch.

**Note on research method:** the web-search budget for this session was exhausted before the research began, so all sourcing was done by fetching known pricing/documentation URLs directly. A handful of supplier pages (GoToTags, Seritag, Alibaba, Amazon, Etsy) blocked or 404'd; I substituted other primary sources and say so where a number is thin.

---

## 0. Executive summary

| Question | Answer |
|---|---|
| Gross margin on a $15 card (mailed, 10-pack) | **71% at 100-qty COGS ($2.60), 82% at 1,000-qty COGS ($0.95)** |
| Gross margin on the $50/month report | **~95% before replacement cards; ~83% with expected replacement usage; ~48% if the "10 free cards/month" is fully used and mailed every month** |
| AI cost per restaurant-month | **$0.02–$0.46 single pass depending on model; plan on $0.30 (Claude Opus 5, 2-pass pipeline). It is not a material cost.** |
| Biggest hidden cost | **Postage on replacement cards ($6.93–$8.40 per USPS Ground Advantage package) — not the cards themselves.** Cap replacements to one batched shipment per quarter, or hand-deliver. |
| Break-even restaurants (solo founder, recurring only) | **$2k/mo → 50; $5k/mo → 122; $10k/mo → 243** (44 / 107 / 212 if steady-state card sales are counted) |
| LTV (contribution) at 6/12/24 months | **$370 / $619 / $1,116** including the initial 10-card pack; expected LTV at 5%/month churn ≈ **$950** |
| Door-to-door CAC (founder's own time at $30/hr) | **~$165–$330 per closed restaurant**, LTV:CAC ≈ 3–6x, payback ≈ 1–5 months |
| Is $15/card right? | **It is in the right zone.** Retail single tap-review cards sell for $19.95 (generic) and $29.95 (custom logo) with no subscription, so $15 is *below* retail while being 6–15x COGS. Sell packs (10 for $129, 25 for $275) rather than lowering the unit price. |
| Is $50/month right? | **Slightly under market.** NiceJob charges $75/mo and GatherUp $99/mo for review software; recommend launching at $49 "Core" with a $99 "Pro (weekly alerts)" tier and $490/yr annual. |
| Stripe structure | One-time Price for cards + recurring Price for the report, sold in **one Checkout Session in `subscription` mode with a mixed cart** (Stripe bills one-time line items on the first invoice only). Free replacement cards live in your own database as an entitlement, not in Stripe. |

---

## 1. Cost inputs (sourced)

### 1.1 AI report generation — Claude API list prices (Anthropic, fetched 2026-09-04)

Source: https://platform.claude.com/docs/en/about-claude/pricing (and https://claude.com/pricing)

| Model | Input $/MTok | Output $/MTok | Batch input | Batch output | Cache read |
|---|---|---|---|---|---|
| Claude Fable 5.1 | $10 | $50 | $5 | $25 | $0.25 |
| Claude Opus 5 | $5 | $25 | $2.50 | $12.50 | $0.50 |
| Claude Sonnet 5 | $2 | $10 | $1 | $5 | $0.20 |
| Claude Haiku 4.5 | $1 | $5 | $0.50 | $2.50 | $0.10 |

Relevant notes from the same page: the Batch API gives "a 50% discount on both input and output tokens"; "Claude 4.7 and later models ... use a newer tokenizer ... produces approximately 30% more tokens for the same text"; Sonnet 5's $2/$10 introductory price "is now the standard price"; rough rule "1 token is approximately 4 characters or 0.75 words in English."

**Token model per restaurant-month (my assumptions, derived from the 0.75 words/token rule + 30% tokenizer uplift):**

| Item | Tokens |
|---|---|
| One 60-word review: 60 / 0.75 = 80 tokens × 1.3 = 104, plus ~30 tokens of metadata (stars, date, reviewer, JSON keys) | ~135 |
| 30 / 100 / 200 reviews | 4,050 / 13,500 / 27,000 |
| Fixed input: system prompt + instructions (~1,500) + last month's report for trend comparison (~2,600) | 4,100 |
| **Total input** at 30 / 100 / 200 reviews | **8,150 / 17,600 / 31,100** |
| Output: 1,500-word report = 2,000 × 1.3 = 2,600, plus ~400 tokens structured JSON | **3,000** |

**Cost per restaurant-month, single pass, standard (non-batch) pricing:**

| Model | 30 reviews | 100 reviews | 200 reviews | Arithmetic (200-review case) |
|---|---|---|---|---|
| Haiku 4.5 | $0.023 | $0.033 | $0.046 | 31,100×$1/M = $0.031 + 3,000×$5/M = $0.015 |
| Sonnet 5 | $0.046 | $0.065 | $0.092 | 31,100×$2/M = $0.062 + 3,000×$10/M = $0.030 |
| Opus 5 | $0.116 | $0.163 | $0.231 | 31,100×$5/M = $0.156 + 3,000×$25/M = $0.075 |
| Fable 5.1 | $0.232 | $0.326 | $0.461 | 31,100×$10/M = $0.311 + 3,000×$50/M = $0.150 |

Batch API halves every number above (reports are not latency-sensitive, so use it). A safer engineering design is two passes (pass 1: extract structured facts per review; pass 2: write the narrative), which roughly doubles cost. **Planning figure: $0.30 per restaurant-month** (Opus 5, ~100 reviews, two passes, no batch discount). At 100 restaurants that is $30/month. AI cost is 0.6% of the $50 price — it is not where the margin goes.

A "weekly alerts" tier adds four small calls per month (~2,000 input + 500 output tokens each on Sonnet 5 ≈ $0.009 each) — roughly **+$0.04/month**.

### 1.2 Review data acquisition

| Route | Cost | Source / notes |
|---|---|---|
| Google Business Profile API (`accounts.locations.reviews.list`) | "available to registered users at no charge" | https://developers.google.com/my-business/content/pricing |
| GBP API access requirements | Must "Manage a Google Business Profile that is verified and active for 60+ days" and have a website; approval via contact form; approved projects get "300 QPM" | https://developers.google.com/my-business/content/prereqs and https://developers.google.com/my-business/content/limits |
| GBP API review fields | reviewId, comment, reviewer, starRating, createTime, reviewReply; paginated with pageSize/pageToken | https://developers.google.com/my-business/content/review-data |
| Places API (New) — **not usable** for this | "A maximum of 5 reviews can be returned" | https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places |
| Outscraper Google Maps Reviews | "Free for the first 500 reviews"; "$3/1,000 reviews" from 501–100,000; "$1/1,000" after 100,000 | https://outscraper.com/pricing/ |
| Apify Google Maps Reviews Scraper | "from $0.30 / 1,000 scraped reviews"; platform Free plan "$5" credit/month; Starter "$19"/month | https://apify.com/compass/google-maps-reviews-scraper and https://apify.com/pricing |

Per restaurant-month at 200 new reviews: Outscraper $0.60; Apify $0.06 (the free $5 credit covers ~16,000 reviews/month, i.e. ~80 restaurants at 200 reviews each before you need the $19 plan). **Planning figure: $0.30/month** (Outscraper at ~100 reviews, the more reliable option; Apify as the cheap fallback). The GBP API is free but each restaurant must grant your app OAuth access to its profile, and your own developer project needs Google approval, which takes time — start with a scraper for the demo phase, migrate to the GBP API once you have 10+ paying customers.

### 1.3 Payments (Stripe)

Source: https://stripe.com/pricing — "2.9% + 30¢ per successful transaction for domestic cards"; Stripe Billing pay-as-you-go "0.7% of Billing volume".

| Transaction | Card fee | Billing fee | Total | Effective |
|---|---|---|---|---|
| $50 monthly subscription | 0.029×50 + 0.30 = $1.75 | 0.007×50 = $0.35 | **$2.10** | 4.2% |
| $15 single card (separate charge) | 0.029×15 + 0.30 = $0.735 | — | **$0.74** | 4.9% |
| $150 10-pack (separate charge) | 4.35 + 0.30 = $4.65 | — | **$4.65** | 3.1% |
| $200 launch invoice (sub + 10 cards, one Checkout) | 5.80 + 0.30 = $6.10 | 0.007×200 = $1.40 | **$7.50** | 3.75% |

### 1.4 Card COGS — what suppliers actually publish

| Source | What it is | Price | URL |
|---|---|---|---|
| UPrinting (US print shop) | Custom NFC business cards, 30pt PVC, full-color both sides, "NFC chip programmed to a URL", 8-day turnaround | **100 cards $244.21 ($2.44 each)**; 250/500/1,000 available in dropdown but not shown in static HTML | https://www.uprinting.com/nfc-business-cards.html |
| UPrinting | Same size plastic card, no NFC (for comparison — NFC adds ~$1.44/card at 100) | 100 for $100.05 | https://www.uprinting.com/plastic-business-cards.html |
| NFC-Tag-Shop (Germany) | Blank white PVC CR80 cards | NTAG213 "from €0.43", NTAG215 "from €0.55", NTAG216 "from €0.65"; printed variants "from €0.57" | https://www.nfc-tag-shop.de/en/nfc-cards/ |
| NFC.cards (Switzerland) | Standard NFC card items | €0.69–€1.89; custom print by quote | https://www.nfc.cards/en/ |
| Tagstand (US) | NFC PVC card badge NTAG213 | $0.55 (sold out at fetch time); custom by quote | https://www.tagstand.com/ |
| Made-in-China listings | "Custom NFC Google Review Card with QR Code" | US$0.88–1.50, MOQ 500 | https://www.made-in-china.com/products-search/hot-china-products/Custom_NFC_Card.html |
| Made-in-China listings | "Custom Logo PVC RFID Google Review Business Card NFC" | US$0.12–0.18, MOQ 500 | same |
| Made-in-China listings | "Custom NFC Card with Your Logo" glossy/matt | US$0.11–0.23, MOQ 1,000 | same |
| NFC Tagify (UK) | Single custom PVC digital card (retail) | £22.99–£24.99 | https://nfctagify.com/ |

**Planning COGS per card** (landed at your door; includes freight/duty and 2 minutes of encode/QC labor where the supplier ships blank):

| Order qty | Basis | Landed COGS (planning) |
|---|---|---|
| 100 | UPrinting $2.44 + ~$0.16 inbound shipping **(assumption)** | **$2.60** |
| 250 | No public 250-qty quote found; midpoint between domestic short-run and offshore MOQ-500 **(assumption — get a UPrinting/GoToTags quote)** | **$1.90** |
| 500 | Offshore printed review card $0.88–1.50 + ~$0.20 freight/duty **(assumption)** or EU blank €0.43–0.65 + own print | **$1.45** |
| 1,000 | Offshore $0.12–0.88 printed + freight/duty + QC/encoding labor **(assumption)** | **$0.95** |

For the **demo run**, order 100 from UPrinting (or similar US printer) at $2.44: no MOQ, US turnaround, programmed to your redirect URL. Do **not** hard-code each restaurant's Google review URL into the chip. Encode a short redirect URL you control (e.g. `https://yourdomain.co/r/abc123`) so any card can be re-pointed to any restaurant, replacement cards are interchangeable, and you can count taps.

### 1.5 Packaging and shipping

| Item | Price | Source |
|---|---|---|
| Uline self-seal bubble mailer 4×8" #000 (S-11482) | $0.50 each (1 case of 100), down to $0.42 at 10+ cases | https://www.uline.com/Product/Detail/S-11482/Bubble-Mailers/Uline-Self-Seal-Bubble-Mailers-4-x-8-000 |
| USPS Ground Advantage commercial, 4 oz or 8 oz | Zone 1 $6.93, Zone 2 $6.94, Zone 8 $8.40 (prices effective July 12, 2026) | https://pe.usps.com/text/dmm300/Notice123.htm |
| USPS Ground Advantage retail / commercial "from" | $7.90 retail; $6.93 commercial | https://www.usps.com/business/prices.htm |
| First-Class Mail 1 oz letter / 1 oz flat | $0.82 / $1.69 | https://pe.usps.com/text/dmm300/Notice123.htm |
| Printed insert/instruction card | ~$0.10 **(assumption)** | — |

A 10-card pack (10 × ~6 g PVC + mailer) weighs well under 4 oz, so the cost of mailing a pack anywhere in the US is **$0.50 + $6.93–$8.40 ≈ $7.43–$8.90**. A single replacement card in a flat envelope may go as First-Class Mail (rigid PVC in a #10 envelope may be surcharged as non-machinable — verify at the counter), i.e. roughly $1–2. **Local hand delivery is $0 postage and is also a sales touchpoint; use it for the demo phase.**

### 1.6 Website, hosting, email, PDF, domain

| Item | Price | Source |
|---|---|---|
| Vercel Hobby | $0 but "for personal, non-commercial use" | https://vercel.com/pricing |
| Vercel Pro | $20/mo (10M edge requests, 1 TB transfer, cron jobs included) | https://vercel.com/pricing |
| Supabase Free / Pro | $0 (500 MB DB, "paused after 1 week of inactivity") / $25/mo (8 GB, no pausing) | https://supabase.com/pricing |
| Resend (transactional email) | Free: 3,000 emails/mo, "limited to 100 emails per day"; Pro $20/mo for 50,000 | https://resend.com/pricing |
| PDFShift (hosted HTML→PDF) | Free 50 credits/mo; Starter $9 for 500; Boost $24 for 2,500 | https://pdfshift.io/pricing |
| Porkbun domains | .com $11.08/yr; .co $31.20/yr; .cards $31.41 renewal ($2.57 first year); .reviews $49.95 renewal ($4.63 first year); .app $14.93 | https://porkbun.com/products/domains |
| Cloudflare Registrar | "does not mark up domain prices at all" — at-cost renewals | https://www.cloudflare.com/products/registrar/ |

**Fixed platform cost at launch:** Vercel Pro $20 + Supabase $0–25 + Resend $0 + PDF $0 (render server-side with an open-source library; PDFShift $9 is the fallback) + domain ~$1–3/mo ≈ **$21–$48/month. Planning figure: $50/month.** A short premium .com will cost far more than $11 — no aftermarket price was fetched, so budget separately.

---

## 2. Deliverable 1 — COGS tables

### 2.1 Per card, sold at $15, shipped in 10-packs

| Line | 100-qty | 250-qty | 500-qty | 1,000-qty |
|---|---|---|---|---|
| Card landed COGS | $2.60 | $1.90 | $1.45 | $0.95 |
| Share of mailer + Ground Advantage zone 8 ($8.90 ÷ 10) | $0.89 | $0.89 | $0.89 | $0.89 |
| Insert | $0.10 | $0.10 | $0.10 | $0.10 |
| Stripe fee (single-card charge, worst case) | $0.74 | $0.74 | $0.74 | $0.74 |
| **Total cost per card** | **$4.33** | **$3.63** | **$3.18** | **$2.68** |
| **Gross profit per card** | **$10.67** | **$11.37** | **$11.82** | **$12.32** |
| **Gross margin** | **71.1%** | **75.8%** | **78.8%** | **82.1%** |

If sold in a 10-pack in one charge, Stripe is $0.47/card instead of $0.74; if hand-delivered, drop the $0.89. Best case (1,000-qty, hand-delivered, pack charge): $15 − 0.95 − 0.10 − 0.47 = **$13.48 (89.9%)**.

### 2.2 Per restaurant-month (subscription at $50)

| Line | Expected usage | Zero replacements | Full replacement liability (10 cards mailed monthly) |
|---|---|---|---|
| Stripe (2.9% + 30¢ + 0.7% Billing) | $2.10 | $2.10 | $2.10 |
| AI report (Opus 5, 2-pass, ~100 reviews) | $0.30 | $0.30 | $0.30 |
| Review data (Outscraper ~100 reviews) | $0.30 | $0.30 | $0.30 |
| Email + PDF | $0.02 | $0.02 | $0.02 |
| Replacement cards — cards (2/mo × $1.45 vs 10 × $1.45) | $2.90 | $0 | $14.50 |
| Replacement cards — shipping (quarterly batch $8.90 ÷ 3 vs monthly $8.90) | $2.97 | $0 | $8.90 |
| **Variable cost** | **$8.59** | **$2.72** | **$26.12** |
| **Contribution per restaurant-month** | **$41.41** | **$47.28** | **$23.88** |
| **Gross margin** | **82.8%** | **94.6%** | **47.8%** |
| Fixed platform cost share at 20 / 100 restaurants | $2.50 / $0.50 | same | same |

---

## 3. Deliverable 2 — Gross margins

- **Cards:** 71–82% mailed, up to ~90% hand-delivered (table 2.1). The $15 price is 6x COGS at 100-qty and 16x at 1,000-qty.
- **Subscription:** 95% before replacement cards; 83% at expected replacement usage; **48% if a restaurant fully exercises 10 free mailed cards every month.** Every operating cost other than replacement cards combined is $2.72 (5.4% of price). Replacement-card policy is the single lever that determines subscription margin.

---

## 4. Deliverable 3 — The "10 free replacement cards/month" liability

**What it costs if fully used:** 10 × $1.45 = $14.50 in cards + $0.50 mailer + $6.93–$8.40 postage = **$21.93–$23.40 per restaurant-month, 44–47% of revenue.** Across 100 restaurants that would be $2,200–$2,340/month and 1,000 cards/month of inventory — you would need to hold ~3,000 cards in stock. At 100-qty domestic COGS ($2.60), full usage costs $34.90–$36.40, i.e. **more than 70% of the subscription.**

Reality check: a restaurant with 15 tables needs ~15–20 cards in circulation. Loss is real (cards walk away in guests' pockets, get wet, get thrown out with the check presenter) but 10/month per location is far above a plausible steady state; **expected loss is ~1–3 cards/month per location (assumption — measure it during the demo run).**

**Recommended policy (the "credit" model, not the "free cards" model):**

> **Replacement cards included.** Your subscription includes up to **10 replacement cards per month** for cards that are lost, damaged, or worn. Replacements are shipped together with your monthly report, up to **one shipment per calendar month** (or delivered on our next visit), and unused allowances do not roll over. Replacements are for cards already in service at your location; adding tables or locations, ordering custom-branded reprints, or exceeding the monthly allowance is billed at our standard card price (currently $15, or $8 per card when added to an existing subscription order). We may ask you to return worn cards for recycling. This allowance is provided as a courtesy and may be adjusted with 30 days' notice.

Why each clause: **batched shipping** cuts postage from up to $8.40/month to at most $8.40/month only when actually used (and $0 if delivered on a visit); **non-cumulative** prevents a 120-card claim at month 12; **"already in service"** stops a new 3-location group using the allowance as free inventory; **"may be adjusted"** gives you an exit without breaking contracts. The **$8 overage price** still carries 82% margin at 1,000-qty COGS and makes the perk feel generous rather than legalistic.

Alternative to consider: change the marketing line to "**free replacements, forever**" with a fair-use footnote (up to 10/month, batched). Same economics, better sales copy.

---

## 5. Deliverable 4 — Break-even for a solo founder

Assumptions: contribution $41.41/restaurant-month (expected replacement usage), fixed platform $50/month, income targets are pre-tax owner draw.

| Monthly income target | Recurring-only: N = (target + $50) ÷ $41.41 | With steady-state card sales* | Founder selling hours to reach N** |
|---|---|---|---|
| $2,000 | (2,050 ÷ 41.41) = 49.5 → **50 restaurants** | 2,050 ÷ 47.50 = 43.2 → **44** | ~500 hrs (≈ 3 months full-time) |
| $5,000 | (5,050 ÷ 41.41) = 121.9 → **122** | 5,050 ÷ 47.50 = 106.3 → **107** | ~1,220 hrs |
| $10,000 | (10,050 ÷ 41.41) = 242.7 → **243** | 10,050 ÷ 47.50 = 211.6 → **212** | ~2,430 hrs |

\* Card sales at steady state: with 5%/month churn, 5% of the base is replaced by new restaurants each month; each new restaurant buys a 10-pack at $150 with contribution 150 − 4.65 (Stripe) − 14.50 (cards) − 8.90 (ship) − 0.10 = **$121.85**; 0.05 × 121.85 = **$6.09** per existing restaurant-month → $47.50 effective contribution.
\*\* Using the CAC assumption in section 6 (≈10 founder-hours per close). Note that at 5% churn, holding 243 restaurants steady requires closing ~12 new restaurants every month — that is a full-time sales job by itself, which is the argument for an annual plan and for a second sales channel (referrals, POS-reseller partnerships) before you pass ~100 locations.

Sensitivity: if replacement usage is zero (contribution $47.28) the $5k target needs 107 restaurants; if every restaurant fully uses the allowance (contribution $23.88) it needs 212.

---

## 6. Deliverable 5 — LTV, churn, and door-to-door CAC

### 6.1 Churn assumption

| Source | Figure | URL |
|---|---|---|
| Cobloom, citing Baremetrics Academy | "a typical 'good' churn rate for SaaS companies that target small businesses is 3-5% monthly"; enterprise "< 1% monthly" | https://www.cobloom.com/blog/churn-rate-how-high-is-too-high |
| Baremetrics Academy | SaaS churn "ideally around 5-7%"; new businesses "up to 15% during their initial year" | https://baremetrics.com/academy/churn |
| Recurly benchmarks (July 2026 data) | SaaS 3.22%, Business & Professional Services 3.44%, Travel/Hospitality 3.91% — the page describes these as median annual churn rates, which conflicts with the monthly SMB figures above; treat Recurly's numbers as a floor for well-run subscription businesses, not as a restaurant-SMB expectation | https://www.recurly.com/research/churn-rate-benchmarks/ |

Restaurants churn worse than the average SMB (closures, ownership changes, seasonal cash squeezes), so: **base case 5%/month (expected lifetime 20 months), optimistic 3% (33 months), pessimistic 8% (12.5 months).** Expected lifetime = 1 ÷ monthly churn.

### 6.2 LTV (contribution, not revenue)

| Scenario | Months | Recurring contribution (× $41.41) | + initial 10-pack ($121.85) | **LTV** | Revenue-basis LTV (× $50 + $150) |
|---|---|---|---|---|---|
| Fixed 6-month retention | 6 | $248.46 | $121.85 | **$370** | $450 |
| Fixed 12-month retention | 12 | $496.92 | $121.85 | **$619** | $750 |
| Fixed 24-month retention | 24 | $993.84 | $121.85 | **$1,116** | $1,350 |
| 8%/mo churn (pessimistic) | 12.5 | $517.63 | $121.85 | **$639** | $775 |
| 5%/mo churn (base) | 20 | $828.20 | $121.85 | **$950** | $1,150 |
| 3%/mo churn (optimistic) | 33.3 | $1,380.33 | $121.85 | **$1,502** | $1,817 |

### 6.3 CAC for door-to-door selling (founder's own time)

No published benchmark for in-person restaurant sales was found; HubSpot's compiled statistics give "the average success rate for cold calls is about 2-3% in 2025" and "80% of successful sales take five or more follow-up calls" (https://blog.hubspot.com/sales/sales-statistics). In-person with a physical demo card converts far better than a cold call, but owners/GMs are only reachable in the 2–4 pm lull.

| Assumption | Base | Good |
|---|---|---|
| Visits per 4-hour afternoon block | 8 | 8 |
| Owner/GM present and available | 50% | 50% |
| Close rate when decision-maker is present (after ≤2 follow-ups) | 10% | 20% |
| Visits per close | 20 | 10 |
| Founder hours per close (20 visits ÷ 2 per hour) | 10 hrs | 5 hrs |
| Founder time at $30/hr **(assumption)** | $300 | $150 |
| Demo cards left behind (2 × $2.60) + fuel/parking (~$10 per block) | ~$30 | ~$15 |
| **CAC** | **~$330** | **~$165** |
| LTV:CAC at 5% churn ($950) | 2.9x | 5.8x |
| Payback (CAC − $121.85 pack contribution) ÷ $41.41 | 5.0 months | 1.0 month |

The initial card pack is what makes door-to-door viable: it recovers a third to three-quarters of CAC on day one. This is a strong argument for **not** giving the first 10 cards away free.

---

## 7. Deliverable 6 — Pricing alternatives and the $15/$50 stress test

### 7.1 What buyers can compare you against

| Competitor / reference | Price | Notes | URL |
|---|---|---|---|
| Tap Tag — "Tap Google Review Card" | $19.95 sale (reg. $24.95) single; 3-pack save 12%, 5-pack 15%, 10-pack 20%; "No subscription required" | Generic design, free dashboard, dynamic redirect | https://taptag.shop/products/tap-review-card |
| Tap Tag — custom logo review card | $29.95 sale (reg. $39.95) | Custom logo upload, bulk 10+ by inquiry | https://taptag.shop/products/custom-tap-review-card-upload-logo |
| Tap Tag — paper handout review cards | $74.95 for 500/1,000 pack | QR only — the paper alternative to NFC | https://taptag.shop/ |
| Tap Tag — sticky counter plate / standup sign | $24.95 / $29.95 | Alternative form factors you should also offer | https://taptag.shop/ |
| Tapni custom NFC card | $29.90 (bamboo $59.90) | Digital business card, one-time | https://www.tapni.com/products/google-review-card |
| UPrinting custom NFC card (wholesale reference) | $2.44 at 100 | What a savvy owner could self-source | https://www.uprinting.com/nfc-business-cards.html |
| NiceJob "Reviews" plan | $75/month (Pro $125) | Automated SMS/email review requests, monitoring, AI replies | https://get.nicejob.com/pricing |
| GatherUp Small Business | $99/month per location; multi-location $60/location | Requests, monitoring, NPS, QR codes, AI responses | https://www.gatherup.com/pricing/ |
| Podium, Birdeye, Ovation | Quote-only (no public prices) | Enterprise-style sales motion; not the indie-restaurant buyer | https://www.podium.com/pricing, https://birdeye.com/pricing/, https://ovationup.com/pricing |

### 7.2 Perceived value anchors (for the pitch, and for justifying price)

BrightLocal's 2026 Local Consumer Review Survey (https://www.brightlocal.com/research/local-consumer-review-survey/): "97% of consumers read reviews for local businesses"; "83% of people asked to leave a review went on to leave one"; "31% of consumers will only use a business with 4.5+ stars" (up from 17%); "74% seek reviews written in the last three months"; Google usage for reviews fell "from 83% in 2025 to 71%" while AI tools rose to 45% — a talking point: AI assistants summarise Google reviews, so review volume and recency now feed AI recommendations too.

### 7.3 Is $15/card too high or too low?

- Versus retail single cards ($19.95–$29.95 with no subscription), **$15 is cheap**, especially since yours are branded to the restaurant.
- Versus COGS ($0.95–$2.60), $15 is a 6–16x markup; owners who Google "custom NFC card" will find $2–3 wholesale, so the card must be positioned as part of a *system* (redirect link you manage, tap analytics, replacement program, report), not as a piece of plastic.
- The real risk is not the unit price but **order size**: 10 cards is too few for a 20-table restaurant, and $15 × 20 = $300 up front is where sales stall. Solve with pack pricing, not a lower unit price.

**Verdict: keep $15 as the list/à-la-carte price; sell packs.** 10-pack $129 ($12.90/card, 14% off), 25-pack $275 ($11/card, 27% off). Even the 25-pack at 500-qty COGS keeps $11 − 1.45 − 0.36 (Stripe share) − 0.36 (ship share) = $8.83 (80%) per card.

### 7.4 Is $50/month too high or too low?

Review-request software for one location is $75–$99/month (NiceJob, GatherUp). Your report is a different product (analysis rather than request automation) but sits in the same budget line. **$50 is under market**; the question is whether the monthly report alone justifies $50 when the cards keep working without it. It does if the report is *operational*: named-server praise/complaints (ties to tips and scheduling), dish-level mentions (ties to menu engineering), and month-over-month star trend. Recommend $49 Core (psychological pricing; identical economics) and a $99 Pro tier so that $49 is the "cheap" option.

### 7.5 Alternatives compared

| Option | Price | First-invoice cash | Monthly contribution | Comment |
|---|---|---|---|---|
| A. Status quo: $15/card à la carte + $50/mo | $150 + $50 | $200 | $41.41 | Fine, but 10 cards is under-provisioned for most rooms |
| B. **Launch Kit**: 10 cards + first month + setup | $199 (vs $200 separate — no discount, "kit" framing) | $199 | $41.41 | Simplest; bundling removes a decision. Cost: $14.50 cards + $8.90 ship + $7.50 Stripe = $30.90 → $168 contribution on day one |
| C. Launch Kit 20: 20 cards + first month | $299 | $299 | $41.41 | Better fit for 15–25 tables; card contribution $299 − 50 − 29 − 8.90 − 11 (Stripe) = $200 |
| D. Annual prepay | $490/yr (2 months free, 18% off) or $540 (10% off) | $490 + cards | $40.83/mo equivalent at $490 minus Stripe ($14.51 + $3.43) ÷ 12 | Removes churn risk for 12 months; expected LTV at 5% churn is 20 months, so a 2-month discount to lock 12 is cheap insurance. Cap at 2 months free. |
| E. Per-location tiers | 1st location $49; 2–5 locations $39 each; 6+ $29 each | — | $32–41 | Mirrors GatherUp's $99 → $60 multi-location step; small groups (2–4 units) are the sweet spot for door-to-door because one owner buys for all |
| F. **Pro tier with weekly alerts** | $99/mo | — | ≈ $39.50 higher-tier delta minus ~$0.10 extra AI/Stripe → ~$88 contribution | Weekly digest + same-day email/SMS alert on any 1–2-star review + AI-drafted owner reply + quarterly PDF. Extra cost ≈ $0.04 AI + $0.35 Stripe + SMS (not priced here). The cheapest margin you will ever add. |
| G. Lower card price ($10) | $10/card | $150 for 15 cards | — | Not recommended: cuts card contribution 33%, weakens CAC recovery, and is still 4x COGS so it doesn't remove the "I can get these for $2.44" objection |
| H. Free cards with annual plan | $0 cards + $490/yr | $490 | — | Good closing tool for hesitant owners: cards cost you $14.50 + shipping, less than one month's fee |

---

## 8. Deliverable 7 — Recommended launch price list and Stripe structure

### 8.1 Price list

| SKU | Price | Notes |
|---|---|---|
| Tap Card (branded) | **$15 each** | à la carte; adjustable quantity 1–50 at checkout |
| Tap Card 10-pack | **$129** | $12.90/card |
| Tap Card 25-pack | **$275** | $11.00/card |
| Counter plate / table tent (add later) | ~$25–30 | Tap Tag sells these at $24.95–$29.95; source before pricing |
| **Core report** | **$49/month** | Monthly AI report (PDF + email), tap analytics, up to 10 replacement cards/month batched with the report (fair-use wording in section 4) |
| Core annual | **$490/year** | 2 months free |
| **Pro report** | **$99/month** ($990/yr) | Everything in Core + weekly digest + same-day negative-review alert + AI-drafted replies |
| Additional location | **$39/month** (Core) / $79 (Pro) | Same account, separate report |
| Launch Kit | **$199** | 10 cards + first month Core + setup (redirect link, Google review link verification, staff one-pager). Implemented as a Checkout mixed cart, not a separate product |
| Replacement card beyond fair use | **$8** | one-time price, payment link |
| Founding-restaurant offer (first 20 local customers) | 50% off Core for 3 months | Stripe coupon `duration=repeating`, `duration_in_months=3`, `max_redemptions=20` |

### 8.2 Stripe object model

Stripe's own guidance is that Checkout in `subscription` mode supports a "Mixed cart: Recurring purchases with one-time purchases" — "set the `mode` parameter to `subscription` and include the Price IDs ... for each line_item" (https://docs.stripe.com/payments/checkout/how-checkout-works.md?payment-ui=stripe-hosted). The API reference adds: "For `subscription` mode, there is a maximum of 20 line items with recurring Prices and 20 line items with one-time Prices. Line items with one-time Prices will be on the initial invoice only." (https://docs.stripe.com/api/checkout/sessions/create). Checkout also supports adjustable quantities, optional items, promotion codes, and shipping-address collection (same page's feature table).

**Products and Prices to create (Dashboard → Products):**

| Product | Price object | Type |
|---|---|---|
| Tap Card | `price_card_15` — $15.00 USD, one-time | one-time |
| Tap Card 10-pack | `price_card_pack10` — $129.00, one-time | one-time |
| Tap Card 25-pack | `price_card_pack25` — $275.00, one-time | one-time |
| Report — Core | `price_core_monthly` — $49.00 / month; `price_core_annual` — $490.00 / year | recurring |
| Report — Pro | `price_pro_monthly` — $99.00 / month; `price_pro_annual` — $990.00 / year | recurring |
| Additional location | `price_addl_location_core` — $39.00 / month (quantity = extra locations) | recurring |
| Replacement card (overage) | `price_replacement_8` — $8.00, one-time | one-time |

**Checkout flow for the website (one session, one payment):**

```
POST /v1/checkout/sessions
  mode=subscription
  line_items[0][price]=price_core_monthly   line_items[0][quantity]=1
  line_items[1][price]=price_card_15        line_items[1][quantity]=10
  line_items[1][adjustable_quantity][enabled]=true  [minimum]=5  [maximum]=50
  optional_items[0][price]=price_pro_monthly  (or offer Pro as the primary with Core as downgrade)
  shipping_address_collection[allowed_countries][]=US
  allow_promotion_codes=true
  phone_number_collection[enabled]=true
  subscription_data[metadata][restaurant_name]=...
  success_url=https://yourdomain/welcome?session_id={CHECKOUT_SESSION_ID}
```

First invoice = $49 + 10 × $15 = $199; every later invoice = $49. Stripe fee on the first invoice ≈ $7.50, then $1.72 + $0.34 = $2.06/month at $49.

**Handling the free replacement cards:** do not model them in Stripe. Keep a `replacement_allowance` table in your database (restaurant_id, month, cards_shipped) that resets monthly and is only active while the Stripe subscription status is `active` or `trialing` (listen to `customer.subscription.updated` / `customer.subscription.deleted` webhooks). Ship replacements at $0 and log them; when a restaurant exceeds the allowance, send a payment link for `price_replacement_8` × quantity. If you want the perk visible on invoices, add a $0 invoice item named "Replacement cards (10 included)" — optional.

**Trial vs. no trial:** skip a free trial. The report needs a month of data, so a 14-day trial would lapse before value is shown. Instead, charge on day one and deliver a **baseline report within 48 hours** using the restaurant's existing last-90-days reviews (Outscraper's free first 500 reviews covers this). That is the "aha" moment and it costs you ~$0.30.

**Annual plan mechanics:** `price_core_annual` in the same mixed-cart session; cards still on the first invoice. Consider "annual plan → 10 cards free" as a closing tool (section 7.5 H).

**Sales tax:** physical cards are generally taxable goods in most US states while the SaaS report is taxed differently state by state; enable Stripe Tax (feature listed on the Checkout page; fee not fetched here) or set tax rates manually before selling outside your home state.

**Customer portal:** enable the Stripe customer portal for cancellations and card updates so you are not doing it by hand; Stripe notes promotion codes can also be applied there (https://docs.stripe.com/billing/subscriptions/coupons.md).

---

## 9. Demo-run budget (what it costs to test locally)

| Item | Cost | Source |
|---|---|---|
| 100 custom NFC cards, US-printed, programmed | $244.21 | https://www.uprinting.com/nfc-business-cards.html |
| 100 bubble mailers | $50 | https://www.uline.com/Product/Detail/S-11482/Bubble-Mailers/Uline-Self-Seal-Bubble-Mailers-4-x-8-000 |
| Domain (.com, 1 yr) | $11.08 | https://porkbun.com/products/domains |
| Vercel Pro, 3 months | $60 | https://vercel.com/pricing |
| Supabase Free, Resend Free, Apify Free | $0 | pricing pages above |
| Anthropic API for ~10 demo reports (Opus 5, generous) | < $5 | https://platform.claude.com/docs/en/about-claude/pricing |
| Outscraper for 10 demo restaurants (first 500 reviews free, then $3/1,000) | ~$0–15 | https://outscraper.com/pricing/ |
| **Total to put demo cards in hand and run 10 real reports** | **≈ $370–$385** | |

Selling 3 Launch Kits ($199 each, $504 contribution after ~$93 in costs) pays for the entire demo run.

---

## 10. Sources

- Anthropic pricing: https://platform.claude.com/docs/en/about-claude/pricing ; https://claude.com/pricing
- Outscraper: https://outscraper.com/pricing/
- Apify: https://apify.com/compass/google-maps-reviews-scraper ; https://apify.com/pricing
- Google Business Profile API: https://developers.google.com/my-business/content/pricing ; https://developers.google.com/my-business/content/prereqs ; https://developers.google.com/my-business/content/limits ; https://developers.google.com/my-business/content/review-data
- Google Places API reviews cap: https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
- Google review link/QR: https://support.google.com/business/answer/16816815
- Stripe fees: https://stripe.com/pricing
- Stripe Checkout mixed cart: https://docs.stripe.com/payments/checkout/how-checkout-works.md?payment-ui=stripe-hosted ; https://docs.stripe.com/api/checkout/sessions/create ; coupons: https://docs.stripe.com/billing/subscriptions/coupons.md ; pricing models: https://docs.stripe.com/products-prices/pricing-models.md
- NFC card suppliers: https://www.uprinting.com/nfc-business-cards.html ; https://www.uprinting.com/plastic-business-cards.html ; https://www.nfc-tag-shop.de/en/nfc-cards/ ; https://www.nfc.cards/en/ ; https://www.tagstand.com/ ; https://www.made-in-china.com/products-search/hot-china-products/Custom_NFC_Card.html ; https://nfctagify.com/
- Competitor review cards/software: https://taptag.shop/ ; https://taptag.shop/products/tap-review-card ; https://taptag.shop/products/custom-tap-review-card-upload-logo ; https://www.tapni.com/products/google-review-card ; https://get.nicejob.com/pricing ; https://www.gatherup.com/pricing/ ; https://www.podium.com/pricing ; https://birdeye.com/pricing/ ; https://ovationup.com/pricing
- Shipping/packaging: https://pe.usps.com/text/dmm300/Notice123.htm ; https://www.usps.com/business/prices.htm ; https://www.uline.com/Product/Detail/S-11482/Bubble-Mailers/Uline-Self-Seal-Bubble-Mailers-4-x-8-000
- Hosting/email/PDF/domain: https://vercel.com/pricing ; https://supabase.com/pricing ; https://resend.com/pricing ; https://pdfshift.io/pricing ; https://porkbun.com/products/domains ; https://www.cloudflare.com/products/registrar/
- Churn: https://www.cobloom.com/blog/churn-rate-how-high-is-too-high ; https://baremetrics.com/academy/churn ; https://www.recurly.com/research/churn-rate-benchmarks/
- Consumer review behaviour: https://www.brightlocal.com/research/local-consumer-review-survey/
- Sales statistics: https://blog.hubspot.com/sales/sales-statistics



---

## Fact-check verdicts

- **confirmed**: Claude Opus 5 API pricing is $5/$25 per MTok; Sonnet 5 $2/$10; Haiku 4.5 $1/$5; Fable 5.1 $10/$50; Batch API 50% discount; 4.7+ models' tokenizer produces ~30% more tokens.  
  Correction: All figures match the official pricing page as of today. Note the page adds that Sonnet 5's $2/$10 'introductory' price is now permanent (the planned Sept 1, 2026 increase to $3/$15 was cancelled), and that batch and prompt-caching discounts stack (cache reads 0.1x input; 0.025x on Fable 5.1).  
  Source: https://platform.claude.com/docs/en/about-claude/pricing
- **confirmed**: Outscraper Google Maps reviews: free for first 500 reviews, then $3 per 1,000 (501–100,000) and $1 per 1,000 after 100,000.  
  Source: https://outscraper.com/pricing/
- **confirmed**: Apify Google Maps Reviews Scraper from $0.30 per 1,000 scraped reviews; Apify Free plan includes $5 usage credit/month; Starter is $19/month.  
  Correction: Actor page states 'from $0.30 / 1,000 scraped reviews' (pay-per-event). Apify pricing page: Free $0 with $5 included usage/month; Starter $19/month ($17/month annual) with $19 included usage.  
  Source: https://apify.com/pricing
- **confirmed**: GBP API is free ('available to registered users at no charge') but requires approval; must manage a GBP verified and active 60+ days; approved projects get 300 QPM. Places API returns max 5 reviews per place.  
  Correction: All parts verified, but across three pages, not the one cited: the 'no charge' sentence is on the GBP pricing page (https://developers.google.com/my-business/content/pricing, updated 2025-08-28), the 60+ day and 0 vs 300 QPM rule is on the prereqs page, and the 5-review cap is in Place Details docs ('A JSON array of up to five reviews' legacy; 'A maximum of 5 reviews can be returned' in Places API (New) Place resource).  
  Source: https://developers.google.com/my-business/content/pricing
- **confirmed**: Stripe charges 2.9% + 30 cents per successful domestic card transaction plus 0.7% of Billing volume (pay-as-you-go); a $50 subscription costs about $2.10 in fees.  
  Correction: Arithmetic checks: 0.029×50 + 0.30 + 0.007×50 = $2.10. Note the 0.7% is the Billing pay-as-you-go rate; Stripe also sells a flat-fee Billing 'Scale' option, and fees are higher for international/AmEx cards or manually entered cards.  
  Source: https://stripe.com/pricing
- **confirmed**: Stripe Checkout subscription mode supports mixed recurring + one-time Prices; one-time items appear on the initial invoice only; limit 20 recurring and 20 one-time line items.  
  Source: https://docs.stripe.com/api/checkout/sessions/create
- **confirmed**: UPrinting NFC business cards (30pt PVC, chip programmed to a URL) $244.21 for 100 ($2.44 each) vs $100.05 for 100 non-NFC plastic cards.  
  Correction: Verified today: NFC cards $244.21/100 on 30 pt. white PVC with a 'Permanent URL' encoding option (URL ≤200 chars, or 'I will encode myself'). Plastic business cards default $100.05/100, but note those are 20 pt. plastic, not 30 pt., so it is not a like-for-like material comparison. Online-configurator prices can change with options.  
  Source: https://www.uprinting.com/nfc-business-cards.html
- **partially_correct**: Offshore custom NFC 'Google review' cards US$0.88–1.50 (MOQ 500); generic custom-logo PVC NFC cards US$0.11–0.23 (MOQ 500–1,000); EU blank NTAG213 PVC cards start at €0.43.  
  Correction: Made-in-China listings today do show Google-review NFC cards at US$0.88–1.50, but with MOQs of 100–500 (not uniformly 500), and other Made-in-China/Alibaba listings price plain PVC Google-review cards far lower (US$0.17 at 500–4,999 pcs; US$0.10–0.30 at MOQ 500 on Alibaba), so the $0.88–1.50 band is one listing type, not the market floor. Generic custom-logo PVC NFC cards on the cited page span US$0.09–2.18 (MOQ 100–500); $0.11–0.23 is a plausible sub-range but not what the page states. The '€0.43' EU blank NTAG213 price could not be found: Shop NFC lists its NTAG213 PVC card at €1.29 (min 10) falling to €0.37/pc only at 8,000+ pieces. Marketplace prices are volatile and exclude freight/samples.  
  Source: https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html
- **confirmed**: Tap Tag generic Google review NFC card $19.95 (regular $24.95); custom-logo version $29.95 (regular $39.95); no subscription required; Tapni custom NFC card $29.90.  
  Correction: Tap Tag's all-products listing shows Google Review Tap Card $19.95 (reg. $24.95) and Custom Tap Review Card – Upload Logo from $29.95 (reg. $39.95); the homepage/'All Tap Review Items' page shows the generic card 'from $15.95' via quantity pricing, so $15.95–19.95 is the current range. 'No subscription required' is stated on-site (optional Review+ upgrade $19). Tapni shop lists Custom NFC Card at $29.90 (metal $99.90).  
  Source: https://taptag.shop/collections/all
- **confirmed**: NiceJob Reviews plan $75/month; GatherUp Small Business $99/month per location ($60/location multi-location); Podium, Birdeye and Ovation do not publish prices.  
  Correction: NiceJob pricing page: Reviews $75/mo, Pro $125/mo. GatherUp: Small Business (1 location) $99/mo, Multi-Location $60/mo per location, 20% off annual. Podium.com/pricing, birdeye.com/pricing and ovationup.com/pricing all show only 'contact sales'/quote forms (Ovation shows '$···' placeholders). Third-party estimates put Podium ~$399–599/mo, Birdeye ~$299–449/mo/location and Ovation ~$79–259/mo/location, but none are vendor-published.  
  Source: https://get.nicejob.com/pricing
- **partially_correct**: USPS Ground Advantage commercial price for 4 oz or 8 oz is $6.93 (Zone 1) to $8.40 (Zone 8), effective July 12, 2026; a Uline 4x8 self-seal bubble mailer costs $0.50 each per case of 100; mailing a 10-card pack costs ~$7.43–$8.90.  
  Correction: USPS portion confirmed (Notice 123, effective July 12, 2026: 4 oz and 8 oz commercial Ground Advantage $6.93 Zone 1/2 ... $8.40 Zone 8). The Uline figure is wrong: Uline's 4x8 (#000) self-seal bubble mailers are sold 500 per case, S-5631 white at $93/case ($0.186 each) and S-9984 gold kraft at $84/case ($0.168 each), not $0.50 each per case of 100. Corrected per-pack mailing cost is roughly $7.10–$8.59 (postage + mailer), or lower with a stamped/letter-rate option for a few cards. Also note commercial rates require a business account/online postage; retail counter rates are higher.  
  Source: https://www.uline.com/Product/Detail/S-5631/Self-Seal-Bubble-Mailers/Uline-Self-Seal-White-Bubble-Mailers-000-4-x-8
- **partially_correct**: A 'good' monthly churn rate for SMB-targeted SaaS is 3–5% (Baremetrics via Cobloom); implied lifetime at 5%/month is 20 months, giving LTV of roughly $950 contribution per restaurant.  
  Correction: The 3–5% monthly benchmark is stated in the Cobloom article (citing Baremetrics), and the same article notes Buffer/Baremetrics/ConvertKit actually ran at 5–8%. The 20-month figure is just 1/0.05 and the $950 LTV is the report's own derivation (≈$47.50/mo contribution × 20), not a sourced number; it depends on unstated assumptions about AI/scraping/replacement-card costs and ignores that new, unproven B2B products for restaurants typically churn above the benchmark (restaurant closure rates alone are high). Treat as an illustrative estimate, not a fact.  
  Source: https://www.cobloom.com/blog/churn-rate-how-high-is-too-high
- **partially_correct**: Vercel Pro $20/month (Hobby non-commercial only); Supabase Free $0 (paused after 1 week inactivity) and Pro $25/month; Resend Free 3,000 emails/month (100/day); Porkbun .com $11.08/year; fixed platform cost ~$21–48/month.  
  Correction: Every component price is confirmed on the vendor pages (Vercel Hobby $0 'personal, non-commercial use', Pro $20/mo per member; Supabase Free $0 with pausing after 1 week of inactivity, Pro from $25/mo; Resend Free 3,000/mo and 100/day; Porkbun .com $11.08/yr). The summed range is slightly off: $20 + $0 + $0 + $0.92 ≈ $21/mo at the low end and $20 + $25 + $0.92 ≈ $46/mo at the high end, not $48, unless an unnamed extra is included. Also, Vercel Pro is billed per team member and Supabase Pro is 'from' $25 (usage overages apply).  
  Source: https://vercel.com/pricing

### Fact-checker notes
## Fact-check summary (verified 2026-09-04)

**Confirmed (9):** Claude API pricing (incl. Sonnet 5 $2/$10 now permanent), Outscraper tiers, Apify actor/plan pricing, GBP API free/60-day/300 QPM + Places 5-review cap, Stripe 2.9%+$0.30 and 0.7% Billing, Stripe Checkout mixed cart limits, UPrinting $244.21/100 NFC vs $100.05/100 plastic (note: 30 pt vs 20 pt), Tap Tag/Tapni retail prices (generic card also shows 'from $15.95' with quantity pricing), NiceJob/GatherUp prices and the no-published-pricing status of Podium/Birdeye/Ovation.

**Partially correct (4):**
- **Offshore NFC cards** — Google-review card band $0.88–1.50 exists but MOQs are 100–500 and plain PVC review cards are listed as low as $0.10–0.30 at MOQ 500; the '€0.43' EU NTAG213 price was not found (Shop NFC: €1.29 at 10 pcs, €0.37 only at 8,000+).
- **Mailing cost** — USPS numbers are right, but Uline 4x8 mailers are 500/case at ~$0.17–0.19 each, not $0.50 per unit in a 100-case; pack cost ≈ $7.10–8.59.
- **Churn/LTV** — 3–5% benchmark is sourced; 20 months and $950 are the report's own arithmetic with unstated cost assumptions.
- **Platform stack** — all vendor prices correct; the range sums to ~$21–46/mo, not $48.

**Refuted:** none outright. No price was invented; the weakest sourcing is the Made-in-China/EU NFC card claim (marketplace listings, volatile) and the Uline unit price.


## Completeness critic

- Card COGS at 250/500/1,000 quantities is entirely assumed: the only real quote is UPrinting at 100 ($2.44). No 250-qty price from any supplier, no UPrinting 500/1,000 dropdown price captured, and the brief's 'at least 3 sources' for tiered pricing was not met (NFC-Tag-Shop and Tagstand are blank/unprinted cards; Made-in-China is a listing range with MOQ, not a quote). Founder still needs actual quotes for 250/500/1,000 printed+encoded cards from at least two US/EU vendors (e.g., GoToTags, Seritag, NFC Tagify bulk, Vistaprint/4over, Alibaba supplier RFQ).
- Landed cost from China is hand-waved as '+$0.20 freight/duty'. No HTS code, no US tariff/Section 301 rate on PVC/NFC cards from China, no DHL/FedEx express vs sea freight quote, no lead time (typically 3-6 weeks). The $0.95 1,000-qty figure also claims to include '2 minutes of encode/QC labor' but at the report's own $30/hr founder rate that is $1.00/card by itself, which exceeds the whole $0.95 figure.
- NFC hardware/phone compatibility is never addressed: which chip (NTAG213 vs 215/216) is needed for a short URL, whether iPhone background tag reading works on the lock screen (iOS 14+ / iPhone XS and later) or needs the phone unlocked, that Android requires NFC enabled and screen on, the share of guests on old iPhones (7/8/X need an app), and whether a printed QR code fallback must be on every card. This directly affects card design and supplier spec for the demo order.
- How the card is encoded and what URL it points to: report recommends a founder-owned redirect (good) but never shows how to build a restaurant's Google 'write a review' link (Place ID / search.google.com/local/writereview?placeid= or g.page/r/.../review), what encoding tool/equipment is needed if buying blank cards (NFC Tools app vs USB encoder), whether the supplier will encode each card to a unique URL, and whether the URL record should be locked (read-only) to prevent tampering.
- What happens to the cards when a restaurant cancels the subscription: do redirects keep working (free hosting liability forever) or stop (cards become dead plastic, reputational/legal risk, 'hostage' perception)? This is a key policy/pricing decision and it is absent.
- Legal/compliance risk of the product is not covered: Google's review policy on solicitation (allowed, but no review gating or incentives), the FTC Trade Regulation Rule on Consumer Reviews and Testimonials (effective Oct 2024, penalties for incentivized/suppressed reviews), and that scraping Google reviews via Outscraper/Apify is against Google's Terms of Service (a risk to the whole report pipeline until GBP API access is granted). Founder needs to know whether to warn restaurants not to hand cards only to happy guests.
- Google Business Profile API access realism: approval for the API is famously slow and often denied to small developers; the report says 'takes time' but gives no expected duration, no fallback if denied, and does not explain the OAuth flow the restaurant owner must complete (Google account with owner/manager role on the listing). Also no mention that Google now provides its own AI review summaries in Business Profile / Maps, which competes with the $50 report.
- Stripe costs are incomplete: Stripe Tax fee (0.5% per transaction in the US) was not fetched, sales-tax treatment of physical cards vs SaaS in the founder's (unknown) home state is unresolved, no shipping_options/shipping charge decision for card packs (is $129 shipped-included?), no chargeback/refund policy, no Stripe Billing 'Starter vs Scale' verification of the 0.7% figure, and no handling of refunds/proration for annual plans when a restaurant closes mid-year.
- Pro tier ($99 weekly alerts) economics are incomplete: SMS cost (Twilio ~$0.0079-0.0083 per segment plus A2P 10DLC brand/campaign registration fees) is explicitly 'not priced', and weekly review fetching quadruples scraper calls (Outscraper $3/1,000 is per review fetched, so re-fetching the same reviews weekly multiplies cost) - not modeled.
- Perceived value is not quantified in dollar terms: the brief asked for $15/card 'versus the perceived value'. No revenue-impact figure for reviews (e.g., Harvard Business School/Luca Yelp study: one-star increase ~5-9% revenue; Womply/other studies on review count vs revenue) and no estimate of how many extra reviews a card generates per month per table, which is the number an owner will ask for.
- Competitor coverage skipped the cheapest reference points: Amazon and Etsy NFC Google review cards/plaques commonly retail around $5-15 per card or $10-20 per stand (report says these pages 404'd and never substituted). Also no comparison to AI review-analysis competitors (Birdeye/Podium AI insights, Yelp/Google built-in summaries, or an owner pasting reviews into free ChatGPT), which is the real threat to the $50 report.
- Churn assumption is not restaurant-specific: no restaurant closure/survival statistic (e.g., BLS business survival data or the ~17% first-year restaurant failure rate literature), and the Recurly benchmark is misread/unsure (report guesses they are annual figures; Recurly publishes monthly churn). A restaurant-SaaS or local-SMB churn source (e.g., Toast/SpotOn disclosures, Womply) is needed.
- Founder labor beyond selling is unpriced: reviewing/editing each AI report before it goes out, encoding and packing cards, onboarding (Google link verification, staff one-pager), and support. At 100-243 restaurants the break-even table assumes zero hours for these, and no self-employment tax (~15.3%), health insurance, LLC/insurance costs are applied to the $2k/$5k/$10k targets.
- Cash-flow / working capital plan is missing: how many cards to buy up front (report implies ~3,000 in stock at 100 restaurants), reorder point, cash tied up, and a month-by-month cash model from the ~$385 demo budget through the first 20 founding customers at 50% off. Also no card design/artwork or proof costs, and no per-restaurant branded-print setup cost (each restaurant's logo card is a separate print run with its own minimum).
- How many cards a restaurant actually needs and how fast they are lost: '15-20 cards in circulation' and '1-3 lost per month' are unsourced guesses that drive the replacement-liability and 10-pack sizing conclusions; report should propose how to measure this in the demo (tap counts per card ID, monthly card census) and what evidence exists from Tap Tag / plaque vendors.

### Critic notes
## Internal contradictions and weak reasoning

1. **Replacement-shipping policy contradicts the numbers.** Executive summary says "cap replacements to one batched shipment per quarter"; the recommended policy wording in Section 4 allows "one shipment per calendar month"; the "expected usage" column in Table 2.2 assumes quarterly batching ($8.90 / 3 = $2.97). Pick one - if monthly shipments are allowed, expected shipping cost is up to $8.90/month, not $2.97, and contribution drops to ~$35.

2. **"Shipped together with your monthly report" makes no sense** - the report is a PDF/email, so there is nothing physical to batch replacements with. The clause should say "shipped once per month/quarter" or "delivered on our next visit".

3. **Arithmetic slip in Section 4:** full usage at 100-qty COGS is 10 x $2.60 + $0.50 + $6.93-$8.40 = **$33.43-$34.90**, not "$34.90-$36.40" as stated.

4. **Arithmetic slip in Section 7.5 row D:** $490 annual minus Stripe fees ($14.51 + $3.43) divided by 12 = **$39.34/month**, not $40.83 ($40.83 is simply $490/12 with no fees). That column also excludes the variable costs used in every other contribution figure, so it is not comparable.

5. **The 1,000-qty COGS of $0.95 "includes 2 minutes of encode/QC labor"**, but the report values founder time at $30/hr elsewhere, which makes labor alone $1.00/card. Either the labor is not actually in the number or the offshore cards must arrive pre-encoded (and the quote must say so).

6. **Card-margin headline uses the wrong price.** The 71%/82% margins are computed at $15 with worst-case single-card Stripe fee and zone-8 postage, but the recommended launch SKU is a $129 10-pack ($12.90/card). At demo COGS ($2.60) the 10-pack margin is closer to 69%. The final price list never gets its own margin table.

7. **Positioning argument is weakened by the report's own evidence.** Section 7.3 says the card must be sold as "a system (redirect link you manage, tap analytics, replacement program)", yet Table 7.1 shows Tap Tag already bundles a free dashboard and dynamic redirect with a $19.95 card and no subscription. The differentiation is really the AI report and the restaurant branding, not the redirect.

8. **Recurly churn benchmark is interpreted as annual with a hedge**; Recurly's benchmark pages report monthly churn. If they are monthly, the 3.2-3.9% figures support a ~3-4% base case rather than 5% - the report should either confirm or drop the source.

9. **Break-even table says founder selling hours are "~500 hrs (approx. 3 months full-time)"** for 50 restaurants but then notes that 5% churn requires ~12 new closes a month (120 hrs/month at 10 hrs/close) just to hold 243 steady. The break-even numbers therefore understate the ongoing labor: at the $10k target the founder would spend roughly 75% of a full-time schedule on replacement selling alone, leaving little time for report QA and support (also unpriced).

10. **Steady-state card-sales column assumes every churned restaurant is replaced by a new full-price 10-pack buyer**, while the recommended closing tools (Launch Kit at no discount, "free cards with annual plan", 50% founding offer) all reduce that day-one contribution. The two scenarios are not reconciled.

11. **AI cost section double-hedges:** planning figure is "Opus 5, 2-pass, no batch discount" ($0.30) while the text recommends using the Batch API. Fine as conservatism, but the baseline "last-90-days" report for onboarding (potentially 500+ reviews, i.e. ~70k+ input tokens) is quoted at "~$0.30" without arithmetic; at Opus 5 single-pass it is closer to $0.40-0.45 and $0.80+ with two passes.

12. **Research method caveat undermines the brief's sourcing requirement:** the web-search budget was exhausted before starting, so several key sources (GoToTags, Seritag, Amazon, Etsy, Alibaba) were never checked. The report is transparent about this, but the 250/500/1,000 COGS rows, the postage-for-single-card estimate ($1-2, "verify at the counter"), and the demo-phase card-loss rate are all unsourced assumptions that feed directly into the headline margin, liability and break-even conclusions.


---

## Gap-fill research
# Unit Economics — Gap-Fill Report (NFC tap-to-review cards + $50/mo AI review report)

Date: 2026-09-04. Web-search budget was exhausted, so every fact below was fetched directly from a primary URL (vendor store pages, USITC HTS lookups, USPS DMM, IRS, BLS, FTC/CFR mirrors, Google developer/help pages, Stripe docs, Twilio help center). Pages that blocked fetching (Amazon 503, eBay/Etsy/SSRN 403, Walmart CAPTCHA, ecfr.gov/federalregister.gov redirect to an "unblock" page, Seritag/Vistaprint 404) are named where they matter. Items marked **(assumption)** are mine.

---

## 1. Card COGS at 250 / 500 / 1,000 — real published tier prices

The biggest gap is now closed: **GoToTags (US) publishes a full tier table for custom-printed, pre-encoded NTAG213 PVC cards.**

| Vendor (country) | Product | 100 | 250 | 500 | 1,000 | Notes | URL |
|---|---|---|---|---|---|---|---|
| **GoToTags (US)** | Printed PVC NFC Card, NTAG213, CMYK full-bleed, 0.84–0.86 mm | $2.00 | **$1.65** | **$1.35** | **$1.05** | Full ladder: 1 $11.99 · 5 $8.50 · 10 $7.95 · 25 $2.85 · 50 $2.40 · 100 $2.00 · 250 $1.65 · 500 $1.35 · 1,000 $1.05 · 5,000 $0.65 · 10,000+ $0.55. "2 Sides + $1.80" (adder; confirm whether per card or per order). Encoding: "Bulk: all tags printed with same data" included; "Variable Text … + $0.02"; "Variable Barcode (1D, QR…) + $0.04". Page states "Minimum Order: 500" and "Lead Time: 3 Weeks" | https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ |
| GoToTags (US) | Custom NFC cards (quote) | — | — | — | — | "lead times of 15 to 20 business days"; "GoToTags can pre-encode cards during production"; "NTAG213 is the default for most applications" | https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/ |
| GoToTags (US) | Blank white PVC NFC card, 200-pack | — | $0.24/card ($47.98/200) | — | — | 0.9 mm, "printable with select card printers"; unprinted, unencoded | https://store.gototags.com/nfc-pvc-card-ntag213-200-pack/ |
| GoToTags (US) | Encoding service (if you buy blanks) | $0.19/tag | — | — | $0.06/tag | Min 30 tags; "Variable" mode = "all tags have different data; must upload encoding file"; option "Permanently lock NFC chip? Yes: NFC tags will be permanently read-only" | https://store.gototags.com/nfc-tag-encoding-service/ |
| UPrinting (US) | 30 pt PVC NFC business card, full color both sides, "Permanent URL" encoding | $2.44 ($244.21/100) | dropdown only | dropdown only | dropdown only | Quantities offered "1, 25, 50, 100, 150, 200, 300, 400, 500, 1,000"; 8 business days; URL "should not exceed 200 characters"; one URL per order | https://www.uprinting.com/nfc-business-cards.html |
| Shop NFC (Italy) | Blank NTAG213 PVC 0.76 mm CR80 | €1.15 (50) / €0.78 (200) | — | €0.78 (200–799) | €0.54 (800+) | Ladder: 1–49 €1.29 · 50 €1.15 · 200 €0.78 · 800 €0.54 · 2,000 €0.42 · 8,000 €0.37. Encoding €0.09/card; UID reading €0.05; color print "between 7 and 15 working days"; "Variable Printing … at no extra charge" | https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html |
| Shop NFC (Italy) | 100 printed NFC business cards, both sides | €1.79 | — | — | — | €179 per 100 | https://shopnfc.com/en/nfc-for-marketing/58-128-100-nfc-business-cards.html |
| Shop NFC (Italy) | PETG cards NTAG213/216, 0.8 mm | — | — | — | €0.99 (min 1,000) | | https://shopnfc.com/en/nfc-cards/236-655-nfc-cards-in-petg.html |
| Made-in-China (CN) | "Custom NFC Google Review Card" (Fortune Smart Tag) | US$0.88–1.50 (MOQ 100) | — | US$0.88–1.50 (MOQ 500) | — | Acrylic NTAG213 stand US$0.60–0.70 (MOQ 50, Jianhe). No lead time or sample policy shown | https://www.made-in-china.com/products-search/hot-china-products/Custom_NFC_Card.html |
| AliExpress (CN retail) | Programmable "Google review" NFC cards | $0.33–$1.33 each; "$0.99 for 10 pieces" | | | | Generic art, unencoded, no support | https://www.aliexpress.com/w/wholesale-nfc-google-review-card.html |

Vendors that could not be quoted: Seritag (store pages 404), Vistaprint NFC (404), Alibaba (410), NFC Tagify bulk (404), Plasticprinters (quote-only, 1-800-808-7472).

**Revised planning COGS (single-sided print, same-URL bulk encode, delivered in the US):**

| Qty | Basis | Card COGS |
|---|---|---|
| 100 | UPrinting $2.44 (no MOQ, 8 days) | **$2.44** + inbound ship |
| 250 | GoToTags $1.65 (if the 500 MOQ can be waived; otherwise UPrinting dropdown quote) | **$1.65–2.00** |
| 500 | GoToTags $1.35 (+$0.02 for unique per-card URL text) | **$1.37** |
| 1,000 | GoToTags $1.05 (+$0.02) | **$1.07** |
| 1,000 offshore | Made-in-China $0.88–1.50 + duties/freight (section 2) | **$1.15–1.95** — no longer cheaper than GoToTags at 1,000 |

Conclusion: the report's old $0.95 at 1,000 is not achievable domestically ($1.05–1.07) and only marginally offshore after 2025–26 tariffs. Use **$1.35 (500) / $1.07 (1,000)** in the models; the gross-margin conclusions barely move ($15 price is still 11–14x COGS).

---

## 2. Landed cost from China — HTS, tariffs, freight, lead time, and the labor error

| Item | Finding | URL |
|---|---|---|
| HTS classification | **8523.52.00 "Smart cards"** (8523.52.00.10 unrecorded / .90 other); general column-1 rate **"Free"** | https://hts.usitc.gov/reststop/search?keyword=8523.52 |
| IEEPA China ("fentanyl") tariff | Heading 9903.01.24: "articles the product of China and Hong Kong … The duty provided in the applicable subheading + 10%" | https://hts.usitc.gov/reststop/search?keyword=9903.01.24 |
| IEEPA reciprocal tariff | Heading 9903.01.25: "Articles the product of any country … + 10%" | https://hts.usitc.gov/reststop/search?keyword=9903.01.25 |
| Section 301 | List 4A heading 9903.88.15 = "+ 7.5%" (U.S. note 20(r)/(s)). Whether 8523.52.00 sits on List 3 (25%) or 4A (7.5%) could not be confirmed (USTR list pages 404; Federal Register blocked). **Ask the broker; budget 7.5–25%.** | https://hts.usitc.gov/reststop/search?keyword=9903.88.15 |
| De minimis | Duty-free $800 de minimis suspended for all countries "12:01 a.m. eastern daylight time on August 29, 2025" — a $500 card sample order is now dutiable | https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/ |
| Express freight | "at about $5 per kilo, express freight is the cheapest shipping mode for packages or small shipments up to about 150 kg"; "allow three days"; air freight "8-10 days"; sea "30-40 days" door-to-door (page updated Sept 2026) | https://www.freightos.com/shipping-routes/shipping-from-china-to-the-united-states/ |
| Production lead time (proxy) | GoToTags custom cards 15–20 business days; Shop NFC color print 7–15 working days | URLs above |

**Worked landed cost, 1,000 cards at $1.00 FOB (assumption: 6 g/card → 6 kg):**
- Duties: 10% + 10% + 7.5% (or 25%) = 27.5–45% → $0.275–0.45/card. Plus CBP merchandise-processing/brokerage fees (not fetched; typically a fixed fee per entry — **(assumption)** ~$30–60 → $0.03–0.06/card).
- Express: 6 kg × $5 = $30 → $0.03/card (+ fuel/remote surcharges).
- **Landed ≈ $1.34–1.55/card**, before any encoding labor, and 3–6 weeks total lead time (production + transit + customs). Samples: no supplier sample price was published; treat one paid sample run (~$50–100 incl. express, **assumption**) as a line item.

**The labor error:** at the report's own $30/hr founder rate, 2 minutes of encode/QC per card is $1.00/card — larger than the whole old $0.95 figure. Fixes: (a) require the supplier to encode and lock (GoToTags includes bulk encoding; variable per-card URL +$0.02); (b) if encoding blanks yourself, a USB reader (ACS ACR122U $49.59; ACR1252U $44.32 at https://store.gototags.com/hardware/nfc-hardware/) with NFC Tools PC/Mac (supports ACR122U, writes URL records: https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html) gets a practiced operator to ~15–20 s/card **(assumption)** = $0.13–0.17/card labor; (c) GoToTags encoding service at $0.06/tag (1,000) if the cards are shipped through them.

---

## 3. NFC hardware and phone compatibility (drives card spec)

| Question | Finding | URL |
|---|---|---|
| iPhone background reading | "models from iPhone XS onwards support background reading, without a specific application being open"; "Can read NFC Tags with the screen locked"; iPhone 7/7 Plus/8/8 Plus/X need an app that is open; iOS 13+ for full support; "Tags must be NDEF formatted" | https://www.shopnfc.com/en/content/20-nfc-iphone |
| Android | "Android-powered devices are usually looking for NFC tags when the screen is unlocked, unless NFC is disabled in the device's Settings menu." Android 16: http/https tags trigger ACTION_VIEW (browser opens); "Beginning with Android 17, scanning such a tag surfaces an 'open link' notification, requiring explicit user interaction" | https://developer.android.com/develop/connectivity/nfc/nfc |
| Vendor compatibility claim | Tap Tag: "iOS13+ & Android 5.0+ (any smartphone since 2017)"; chip lifespan "roughly 100,000 taps"; card carries a "Dynamic QR code" | https://taptag.shop/products/tap-review-card |
| Share of guests on incompatible phones | StatCounter US iOS, Aug 2026: iOS 26.6 41.37%, 26.5 35.89%, 18.7 9.62%, oldest listed 18.6 1.27% → iOS version is a non-issue; hardware (pre-XS iPhones, 2017 and older) share is not published — treat as low single digits **(assumption)** | https://gs.statcounter.com/ios-version-market-share/mobile/united-states-of-america |
| Chip choice | NTAG213/215/216: "144, 504 or 888 bytes freely available user Read/Write area"; "7-byte serial number"; "Data retention time of 10 years"; "Write endurance 100,000 cycles"; "Field programmable read-only locking function per page" | https://www.nxp.com/products/rfid-nfc/nfc-hf/ntag-for-tags-and-labels/ntag-213-215-216-nfc-forum-type-2-tag-compliant-ic-with-144-504-888-bytes-user-memory:NTAG213_215_216 |

Spec for the demo order: **NTAG213, 0.76–0.86 mm PVC CR80, one NDEF URI record ≤ ~40 characters (e.g. `https://yourdomain/r/AB12CD`), record locked read-only, printed QR code of the same URL on the face, and a 3–5 word instruction ("Tap or scan to review us on Google").** A 144-byte NTAG213 comfortably holds a URL of ~130 characters; you do not need NTAG215/216. The QR fallback is mandatory: it covers pre-XS iPhones, Android phones with NFC off, and Android 17's extra confirmation tap.

---

## 4. How the card is encoded and what URL it points to

- **Getting the restaurant's review link:** In Business Profile, "Select Read Reviews then Get more reviews", then copy the link or download the QR (https://support.google.com/business/answer/16816815). Programmatically, the GBP API Location `metadata.newReviewUri` is "A link to the page on Google Search where a customer can leave a review for the location" and `metadata.placeId` is populated "If this location appears on Google Maps" (https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations). Place IDs "may change over time"; refresh "if they are more than 12 months old" at no charge; place IDs "are exempt from the caching restrictions" so you may store them (https://developers.google.com/maps/documentation/places/web-service/place-id). The commonly used `search.google.com/local/writereview?placeid=…` form could not be confirmed on a Google page in this session; use the owner's copied link or `newReviewUri` as the source of truth.
- **Architecture:** chip → `https://yourdomain/r/{cardId}` → your server logs the tap and 302-redirects to the restaurant's current review link. One code per card (GoToTags "Variable Text … + $0.02") gives per-card tap counts and lets you spot lost cards.
- **Who encodes:** GoToTags pre-encodes during production and offers "Permanently lock NFC chip? Yes" (https://store.gototags.com/nfc-tag-encoding-service/); UPrinting offers "Permanent URL" or "I will encode myself" with a 200-character limit (https://www.uprinting.com/nfc-business-cards.html). If you self-encode: NFC Tools phone app or NFC Tools PC/Mac + ACR122U ($49.59).
- **Lock it:** lock the NDEF pages (NTAG213 "read-only locking function per page") so a guest cannot rewrite the card to a rival's link or a malicious URL. Because the chip only holds *your* redirect, locking costs you no flexibility.

---

## 5. What happens to the cards when a restaurant cancels

No vendor publishes a "post-cancel" policy, but the market reference is **no-subscription cards whose redirect is editable forever**: Tap Tag — "No Subscriptions, just a one-time purchase", "Dynamic tap & QR can be changed in realtime from any computer" (https://taptag.shop/products/tap-review-card); Tapni custom card $29.90 one-time (https://www.tapni.com/products/google-review-card). Restaurants will benchmark you against that.

Cost of honoring redirects forever is negligible: each tap is one edge request; Vercel Pro includes 10M edge requests/month (https://vercel.com/pricing). Recommended policy, to write into the ToS and the checkout page:

1. Cards are **sold, not licensed**; the tap link keeps working after cancellation (removes the "hostage" objection and any FTC/UDAP risk from bricking paid hardware).
2. After cancellation the redirect continues to the last verified review link; tap analytics, link changes, and replacements stop. Re-subscribing restores them.
3. If the restaurant closes or the listing disappears, the redirect falls back to a neutral "This business is no longer accepting reviews here" page.
4. Reserve the right to retire the redirect domain with 12 months' notice.

---

## 6 & 16. Legal / compliance: Google policy, FTC rule, scraping

| Rule | Exact requirement | URL |
|---|---|---|
| Google Maps UGC policy — allowed | "Solicit or encourage the posting of content that does represent a genuine experience, without offering incentives to do so or attempting to influence the rating or the contents of the review." | https://support.google.com/contributionpolicy/answer/7400114 |
| Google — prohibited | "Offer incentives – such as payment, discounts, free goods and/or services - in exchange for posting any review"; "Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers"; "Merchants should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included." Sanctions range "from suspending the account privileges to account termination." | same |
| Google Business Profile help | "Offering incentives … in exchange for reviews is considered fake engagement and is strictly prohibited." Approved distribution: receipts, thank-you emails, QR code in store | https://support.google.com/business/answer/16816815 |
| FTC Consumer Reviews and Testimonials Rule (16 CFR 465) | Announced Aug 14, 2024, effective 60 days after Federal Register publication (Oct 21, 2024). §465.4: unlawful "to provide compensation or other incentives in exchange for, or conditioned expressly or by implication on, the writing or creation of consumer reviews expressing a particular sentiment". §465.7: unlawful to "use an unfounded or groundless legal threat, a physical threat, intimidation, or a public false accusation in response to a consumer review" or to "materially misrepresent … that the consumer reviews … represent most or all the reviews submitted" | https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials ; https://www.law.cornell.edu/cfr/text/16/465.4 ; https://www.law.cornell.edu/cfr/text/16/465.7 |
| FTC civil penalty | 16 CFR 1.98: Section 5(m)(1)(A) and (B) "$53,088" per violation, effective January 17, 2025 | https://www.law.cornell.edu/cfr/text/16/1.98 |
| Google Maps Terms — scraping | Users may not "mass download or create bulk feeds of the content", "use Google Maps to create or augment any other mapping-related dataset (including … business listings database …)", or "copy the content" beyond permitted uses | https://www.google.com/help/terms_maps/ |

What this means for the founder:
- **Tell restaurants to drop the card on every table**, never only for happy guests; the card text must not say "if you enjoyed your meal". "Selective solicitation" is a Google policy violation that can get the *restaurant's* listing penalized; incentives ("free dessert for a review") violate both Google policy and FTC §465.4 with a $53,088-per-violation exposure. Put this in the staff one-pager and in your ToS.
- **Pressure on premises**: the card is a passive prompt; do not have servers stand over the guest or ask for 5 stars. That also protects the "silent middle" positioning.
- **Scraping (Outscraper/Apify) for the report** conflicts with the Google Maps Terms; the practical risk is to your data pipeline (blocking, provider shutdown) more than to the restaurant. Use it only for the demo phase and migrate to the GBP API (section 7). Disclose in the ToS that reviews are obtained "from Google via the restaurant's authorized Business Profile connection or public listing".

---

## 7. Google Business Profile API access realism

| Fact | Source |
|---|---|
| "Requests are reviewed within 14 days." You must demonstrate a "legal business reason" via a business email on your domain and a live website; approved projects get "a standard default quota for all seven APIs"; further quota increases "might be denied" if usage < 70% of current quota | https://developers.google.com/my-business/content/faq |
| "The Google My Business API is only visible in the Google Cloud console to users who submit and receive approval"; "There's no Sandbox environment"; every request needs an OAuth 2.0 token; Workspace orgs must have GBP turned on or you get "error 403 - PERMISSION DENIED" | https://developers.google.com/my-business/content/basic-setup |
| Prerequisites (from original report): profile "verified and active for 60+ days", website, 300 QPM | https://developers.google.com/my-business/content/prereqs |
| Roles: Owners "can add or remove users"; "Managers … have mostly the same access to the profile as owners. The only exception is they can't add or remove users or remove the profile"; both can "Respond to reviews" | https://support.google.com/business/answer/3403100 |

Plan: (1) Apply now with the launch domain and live site — the clock is ~14 days, and denials are usually for missing website/business email. (2) The restaurant onboarding step is either an OAuth consent screen signed in by a Google account that is Owner or Manager of the listing, or the owner adds your Google account as a **Manager** (no API needed to read/respond to reviews in the dashboard). (3) Fallback if denied: Manager access + scraper for the demo cohort, reapply after 60 days with real customers. (4) Competitive note: Google's own AI review summaries in Maps/Search could not be sourced from a Google page in this session (blog and help pages fetched did not surface it) — flagged as an open question; the defensible differentiators remain per-server mentions, dish-level trends, month-over-month comparison, and recommendations, none of which a generic summary offers.

---

## 8. Stripe costs — complete stack

| Item | Fact | URL |
|---|---|---|
| Card processing | 2.9% + 30¢ (original report) | https://stripe.com/pricing |
| Stripe Billing | "0.7% of Billing volume", "no recurring fees" (pay-as-you-go); the page no longer uses "Starter/Scale" names; paid tiers start at "$620 per month" for up to $100k/month — irrelevant at this scale | https://stripe.com/billing/pricing |
| Stripe Tax | No-code (Checkout/Billing/Invoicing/Payment Links): "0.5% per transaction, where you're registered to collect taxes"; API: "50¢ per transaction … where you're registered" | https://stripe.com/tax/pricing |
| Disputes | "$15.00 for each dispute you receive"; a further "$15.00 for each dispute you respond to manually. You get this fee back for won disputes." | https://stripe.com/pricing |
| Refunds | "The payment processing … fees from the original transaction are not returned." | https://stripe.com/pricing |
| Shipping in Checkout | "Only Checkout Sessions in payment mode support shipping options"; shipping rates are "fixed amount values for the entire order"; shipping tax code `txcd_92010001` | https://docs.stripe.com/payments/during-payment/charge-shipping.md?payment-ui=stripe-hosted |
| Prorations / annual refunds | "Stripe calculates prorations down to the second"; "Negative prorations aren't automatically refunded"; Dashboard cancel offers "refund for a prorated amount, refund the last payment in full, or … no refund"; `cancel_at_period_end=true` lets a customer finish paid time | https://docs.stripe.com/billing/subscriptions/prorations ; https://docs.stripe.com/billing/subscriptions/cancel |
| Tax codes | SaaS business use `txcd_10103001`; "General - Tangible Goods" `txcd_99999999` | https://docs.stripe.com/tax/tax-codes |

Decisions and numbers:
- **Per $49 invoice:** $1.72 (card) + $0.34 (Billing) + $0.25 (Tax, once registered) = **$2.31**, i.e. 4.7%. On the $199 Launch Kit: $6.07 + $1.39 + $1.00 = **$8.46**.
- **Shipping:** because the mixed cart runs in `subscription` mode, `shipping_options` is unavailable. Either build shipping into the pack price (10-pack "$129 shipped") or add a one-time line item "Shipping $8". Recommendation: **shipped-included** for packs; replacement shipments are covered by the allowance policy.
- **Sales tax:** state-level SaaS taxability guides (TaxJar, Avalara, Anrok, Sales Tax Institute, Tax Foundation) all 404'd in this session; the founder's home state is unknown, so this remains unresolved. What is certain: the cards are tangible goods (`txcd_99999999`) and taxable in nearly every state with a sales tax; tag the report `txcd_10103001` and let Stripe Tax decide per state once you register in your home state.
- **Chargeback/refund policy (write into ToS):** cards non-refundable once encoded/branded except defects (30 days); monthly plan cancel anytime at period end, no proration; annual plan refundable pro-rata (per-second proration via Dashboard) minus the 2 free months' value if cancelled in the first 6 months; if a restaurant closes, refund unused annual months in full as goodwill (costs you nothing but the non-returned Stripe fee, ~$17 on $490).

---

## 9. Pro tier ($99, weekly alerts) — SMS and re-fetch costs

| Item | Fact | URL |
|---|---|---|
| Twilio SMS | "SMS starts at $0.0083. Price per outbound message sent to U.S. long codes"; carrier pass-through per segment: AT&T $0.0035, T-Mobile $0.0045, Verizon $0.0045 outbound; failed-message fee $0.001 | https://www.twilio.com/en-us/sms/pricing/us |
| A2P 10DLC (EIN business) | Low Volume Standard brand "$4.50 one-time"; "US A2P Campaign use case registration fees: $15 vetting fee"; monthly campaign: "Low-volume mixed use case $1.50/month" or Standard "$10/month"; vetting "takes up to 5 business days"; $15 "non-refundable" | https://help.twilio.com/articles/1260803965530 ; https://help.twilio.com/articles/11587910480155 |

Per Pro restaurant-month: 4 weekly digests + ~5 negative-review alerts ≈ 9 messages × 2 segments × ($0.0083 + $0.0045) ≈ **$0.23**; fixed: $19.50 one-time + $1.50/month campaign + a phone number (price not fetched; **assumption** ~$1.15/mo). Email (Resend free tier) is $0, so make SMS opt-in.

Re-fetch multiplier: Outscraper bills "$3/1,000 reviews" *returned* (https://outscraper.com/pricing/). If a weekly job pulls the newest 100 reviews each time, cost is 4 × 100 = 400 reviews = **$1.20/month vs $0.30** for a monthly pull. Mitigate by requesting only reviews newer than the last fetched timestamp (Outscraper exposes a cutoff parameter — verify in their API docs; not fetched here) or by using Apify at "$0.30 / 1,000" (https://apify.com/compass/google-maps-reviews-scraper), where 4× re-fetch is $0.12. With the GBP API the marginal cost is $0.

---

## 10. Perceived value in dollars

- **Rating → revenue:** Luca (HBS Working Paper 12-016): "a one-star increase in Yelp rating leads to a 5-9 percent increase in revenue", and "this effect is driven by independent restaurants; ratings do not affect restaurants with chain affiliation" (https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf). For a $1.0M/yr independent, that is **$50k–$90k per star**; even a 0.2-star lift is $10k–18k/yr against $588/yr of subscription.
- **Volume/recency anchors:** "83% of people asked to leave a review went on to leave one"; "31% of consumers will only use a business with 4.5+ stars"; "74% seek reviews written in the last three months" (BrightLocal 2026, https://www.brightlocal.com/research/local-consumer-review-survey/). Baseline: "local businesses have 39 Google reviews" on average (BrightLocal 2018 Google Reviews Study, https://www.brightlocal.com/research/google-reviews-study/).
- **Reviews per card per month — no vendor publishes this; it must be measured in the demo.** Illustrative model **(assumption)**: 40 parties/day × 26 days × 2% tap-to-review conversion ≈ **21 reviews/month**, versus a typical unprompted 2–5/month. Because every card carries a unique redirect code, the demo will produce the real number (taps per card per day, and reviews-after-tap by comparing review timestamps with tap logs). Sell the demo restaurants on "we will tell you exactly how many reviews the cards generated."

---

## 11. Cheapest reference points and AI-report substitutes

| Reference | Price | URL |
|---|---|---|
| AliExpress programmable "Google review" NFC cards | $0.33–$1.33 each; "$0.99 for 10 pieces"; stands $1.33 | https://www.aliexpress.com/w/wholesale-nfc-google-review-card.html |
| Tap Tag single card / custom logo | $19.95 / $29.95, no subscription, dynamic QR+NFC, free dashboard | https://taptag.shop/products/tap-review-card |
| Tapni custom card | $29.90 (bamboo $59.90) | https://www.tapni.com/products/google-review-card |
| Amazon / eBay / Etsy / Walmart | Blocked (503/403/403/CAPTCHA) — not substituted; the AliExpress prices above are the floor those marketplaces resell from | — |
| Birdeye Insights AI | "analyzes reviews, surveys, and listings across locations to surface what's working, what's broken, and what to fix first"; "plain-English summaries for every report"; no public price | https://birdeye.com/insights-ai/ |
| Podium Reviews | "AI Reputation Specialist intelligently crafts review invites and replies"; "Automate textable review invites"; pricing gated | https://www.podium.com/product/reviews |
| ChatGPT free tier | Pricing page blocked (403); the threat is real: an owner can paste 50 reviews into a free chatbot. Your moat is automation (no pasting), per-server/per-dish structure, month-over-month memory, and the tap-attribution data no chatbot has |

Pricing implication: the $15 card is defensible only as part of the managed system (unique redirect, tap counts, lost-card detection, replacements). Say so on the site; do not compete with $0.33 plastic.

---

## 12. Churn — restaurant-specific evidence and the Recurly correction

- **Recurly figures are annual, not monthly:** "All figures are annual churn rates" (July 2026 data); SaaS 3.22% (voluntary 2.16%, involuntary 1.06%); "2% to 4% annual churn is the range where most well-run subscription businesses operate" (https://www.recurly.com/research/churn-rate-benchmarks/). They describe mature, mostly consumer/enterprise subscriptions and are not a benchmark for a new restaurant SMB product.
- **Restaurant closures (BLS BED, NAICS 72 Accommodation & Food Services):** establishments born year-ended March 2024: 85.3% survived 1 year; March 2023 cohort: 86.7% at 1 yr, 76.4% at 2 yrs; March 2022 cohort: 86.2% / 76.3% / 68.2% at 1/2/3 yrs (https://www.bls.gov/bdm/us_age_naics_72_table7.txt). That is ~14% closure in year 1 and ~10–12%/yr thereafter → **~1.0–1.3%/month of churn from closures alone**, before any voluntary cancellation.
- **SMB SaaS voluntary churn:** Cobloom/Baremetrics "3-5% monthly" for SMB SaaS, with Buffer/Baremetrics/ConvertKit at 5–8% (https://www.cobloom.com/blog/churn-rate-how-high-is-too-high); Baremetrics "up to 15% during their initial year" for new businesses (https://baremetrics.com/academy/churn).
- **Revised base case:** 4% voluntary + 1% closure = **5%/month** (lifetime 20 months) — the original number survives, but now with a restaurant-specific basis; pessimistic 8% (year one), optimistic 3% (annual-plan mix ≥ 40%).

---

## 13. Founder labor and personal overhead in the break-even

| Item | Fact | URL |
|---|---|---|
| Self-employment tax | "The self-employment tax rate is 15.3%" (12.4% Social Security + 2.9% Medicare) on net earnings (× 92.35%) | https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes |
| Health insurance (proxy) | Average 2025 employer single-coverage premium "$9,325" ($777/month); family "$26,993" | https://www.kff.org/health-costs/report/2025-employer-health-benefits-survey/ |
| General liability insurance | "45% of our customers pay $45 or less per month" | https://www.nextinsurance.com/general-liability-insurance/cost/ |
| LLC formation/annual fees | Not fetched; varies by state **(assumption $50–500/yr)** |

Per-restaurant-month founder hours **(assumptions, to be timed in the demo)**: review/edit AI report 15 min; support 10 min; replacement packing 3 min; onboarding 60 min once (amortized over 20 months = 3 min) → **~0.5 h = $15 at $30/hr**. Contribution falls from $41.41 to **~$26.50** (also reflecting Stripe Tax +$0.25 and $1.35 card COGS).

Revised break-even (owner draw is *after* SE tax, plus $777 health + $45 GL + $50 platform):

| Net target | Gross needed ÷ (1 − 0.141) + $872 fixed | Restaurants at $26.50 | Old figure |
|---|---|---|---|
| $2,000 | $2,328 + $872 = $3,200 | **121** | 50 |
| $5,000 | $5,820 + $872 = $6,692 | **253** | 122 |
| $10,000 | $11,641 + $872 = $12,513 | **472** | 243 |

If the founder skips health insurance and stops hand-editing reports (automated QA), contribution returns to ~$38 and the counts fall to 61 / 153 / 306. Either way, the honest solo-founder break-even is roughly **double** the original table — which argues for the $99 Pro tier and multi-location pricing.

---

## 14. Cash-flow / working-capital plan (demo → 20 founding customers)

Inputs: UPrinting 100 @ $2.44 (https://www.uprinting.com/nfc-business-cards.html); GoToTags 500 @ $1.35 + $0.02 variable, MOQ 500, 3-week lead (https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/); Uline #000 mailers $0.168–0.186 (https://www.uline.com/Product/Detail/S-5631/Self-Seal-Bubble-Mailers/Uline-Self-Seal-White-Bubble-Mailers-000-4-x-8); USPS Ground Advantage $6.93–8.40, letters $0.82 + $0.49 nonmachinable (https://pe.usps.com/text/dmm300/Notice123.htm); founding offer 50% off Core for 3 months; Launch Kit $199 → $174.50 with the discount on the $49 line.

| Month | Cash out | Cash in | Cumulative | Notes |
|---|---|---|---|---|
| 0 | $244 cards (100) + $93 mailers (case of 500) + $11 domain + $20 Vercel + ~$50 USB reader = **$418** | $0 | −$418 | Demo stock: 100 generic-front cards, unique codes, locked |
| 1 | $20 Vercel + $10 AI/scraper + ~$40 fuel | 5 kits × $174.50 − Stripe $37 = $835 | +$347 | 50 cards consumed |
| 2 | $70 + **$685 GoToTags 500-card reorder (placed month 1, arrives month 2)** | 7 kits $1,169 + 5 renewals × $24.50 − fees ≈ $1,240 | +$832 | Reorder point: stock < (3-week lead × 12 cards/week) + 30 safety ≈ **70 cards** |
| 3 | $70 | 8 kits $1,336 + 12 renewals $294 − fees ≈ $1,560 | +$2,322 | 20 founding customers reached; ~230 cards in field |
| 4–6 | $70/mo + replacements (2/mo/restaurant × $1.37 + batched letters) ≈ $130/mo | 20 × $49 − fees ≈ $933/mo | +$4,700 by month 6 | Full price begins month 4 for cohort 1 |

Cash tied up in inventory never exceeds ~$700; the demo is self-funding after the first 3 kits (confirming the original report). Design/proof costs: UPrinting offers PDF proof (free) or hard-copy proof (price not shown); budget one paid sample run per vendor **(assumption $30–60)**. **Per-restaurant branded cards are the trap:** GoToTags printed cards carry a 500 MOQ and UPrinting's 25-qty price was not captured, so a "your logo on the card" SKU at 10–20 cards per restaurant cannot be produced economically. Offer instead: generic front + restaurant name printed via variable text (+$0.02/card, Shop NFC does variable printing "at no extra charge"), or a printed adhesive label; make true full-logo runs a 100-card ($2.44) or 500-card ($1.35) add-on priced at $6–8/card.

---

## 15. How many cards a restaurant needs and how fast they are lost

No vendor publishes loss rates (Tap Tag only states chip life "roughly 100,000 taps"). Proposal for the demo:
- **Sizing rule (assumption):** cards = tables × 1.2 + 2 spares (a 15-table room → 20 cards), because a card is on a table for the whole dessert/check window and servers carry a few.
- **Measure:** every card has a unique code; log every tap with timestamp. A card with zero taps in 14 days is "presumed lost"; run a monthly census (server counts cards, 2 minutes) for 10 demo restaurants for 3 months. Report: taps/card/day, reviews attributable (tap → review within 24 h), cards lost/month, and lost-card cost. That yields the real replacement liability behind the "10 free cards/month" promise; until then keep the 1–3/month assumption and the batched-shipment policy.

---

## 17. Cost of the AI report per restaurant (LTV cost basis)

Per-restaurant-month cost stack behind the LTV (all sources in the original report plus this one): Stripe $2.31 (incl. Tax) · AI $0.30 (Opus 5 two-pass, ~100 reviews, from https://platform.claude.com/docs/en/about-claude/pricing) · review data $0.30 (Outscraper) → $0 on GBP API · email/PDF $0.02 · replacements 2 × $1.37 = $2.74 + batched letter postage ~$1.31/quarter ÷ 3 = $0.44 (5 cards fit a nonmachinable letter) · founder labor ~$15 (section 13). Contribution **$41.89 before labor / ~$26.90 after labor**; 20-month LTV = **$838 / $538** plus the initial pack ($129 − $1.37×10 − $8.46 Stripe − $8.59 postage = **$98**). The old "$950" therefore becomes ~$935 (no labor) or ~$636 (labor priced).

---

## 19. Shipping small card packs — letters vs parcels

USPS Notice 123 (effective July 12, 2026): stamped letter 1 oz **$0.82**, 2 oz $1.11, 3.5 oz $1.69 (metered $0.78/$1.07/$1.65); "$0.49 nonmachinable surcharge"; large envelope 1 oz $1.69 (https://pe.usps.com/text/dmm300/Notice123.htm). DMM 101: letters "Not more than 1/4-inch thick"; a piece "too rigid" is nonmachinable; flats may be up to 3/4 inch thick but must be "Flexible", and rigid flat-size pieces "are considered parcels and must pay the applicable parcel prices" (https://pe.usps.com/text/dmm300/101.htm).

- **1–5 cards** (≤ 4.3 mm, ≤ ~1.2 oz with a #10 envelope; ~5.5 g/card **(assumption)**): nonmachinable letter **$1.31 (1 oz) / $1.60 (2 oz)** — not $6.93. Use this for replacements.
- **10-card pack** (8.4–8.6 mm = 0.34 in): exceeds letter thickness and is rigid → **parcel**, Ground Advantage $6.93–8.40 + $0.17–0.19 mailer ≈ **$7.10–8.59**. Alternative: two 5-card letters ($2.62–3.20). Hand delivery in the demo phase remains $0.

---

## Corrections (restated with verified facts)

1. **Offshore/EU card pricing.** Made-in-China "Google review" NFC cards are US$0.88–1.50 at MOQ **100 or 500** (Fortune Smart Tag), with acrylic NTAG213 stands at US$0.60–0.70 (MOQ 50); AliExpress retail sells programmable review cards at $0.33–1.33 each. The "€0.43" EU blank price was not found: **Shop NFC's NTAG213 PVC card is €1.29 (1–49) falling to €0.78 (200), €0.54 (800), €0.42 (2,000) and €0.37 (8,000)**, plus €0.09/card encoding. Domestic printed+encoded cards are now the best-documented option: **GoToTags $1.65 (250) / $1.35 (500) / $1.05 (1,000)**. After the 10% IEEPA + 10% reciprocal + 7.5–25% Section 301 stack and the end of de minimis, Chinese cards land at roughly $1.15–1.95 and are no longer clearly cheaper.
2. **Mailing a 10-pack.** USPS portion confirmed ($6.93 Zone 1/2 to $8.40 Zone 8, 4 oz/8 oz commercial Ground Advantage, effective July 12, 2026). Uline #000 4×8 self-seal bubble mailers are **500 per case: S-5631 white $93/case ($0.186 each), S-9984 kraft $84/case ($0.168 each)**, not $0.50 each per 100. Corrected 10-pack cost **$7.10–$8.59**; 1–5 replacement cards go as a nonmachinable letter for **$1.31–1.60**. Commercial rates require online postage; retail counter Ground Advantage starts at $7.90.
3. **Churn/LTV.** The 3–5% monthly SMB figure is Cobloom citing Baremetrics; Recurly's 3.22% (SaaS) and 3.44% (Business Services) are **annual** medians and do not apply. The $950 LTV was a derivation; with restaurant closure rates (BLS: ~14% first-year, ~10–12%/yr after) and priced founder labor, the 20-month LTV is roughly **$636–935** depending on whether labor is charged. Treat 5%/month as base case, 8% pessimistic.
4. **Platform cost.** Vercel Hobby $0 (non-commercial), Pro $20/month per member; Supabase Free $0 (paused after 1 week inactivity), Pro from $25; Resend Free 3,000/month, 100/day; Porkbun .com $11.08/yr. Corrected fixed platform range **$21–46/month** (not $48); add Stripe Tax at 0.5% of volume and, for Pro, $1.50/month 10DLC campaign fee.

---

## Sources (new in this report)
- GoToTags printed card tiers: https://store.gototags.com/printed-pvc-nfc-card-ntag213-nfc-tag/ · custom cards: https://store.gototags.com/nfc-tags/nfc-cards/custom-nfc-cards/ · encoding service: https://store.gototags.com/nfc-tag-encoding-service/ · blank 200-pack: https://store.gototags.com/nfc-pvc-card-ntag213-200-pack/ · readers: https://store.gototags.com/hardware/nfc-hardware/
- UPrinting: https://www.uprinting.com/nfc-business-cards.html
- Shop NFC: https://shopnfc.com/en/nfc-cards/11-493-nfc-cards-in-pvc-ntag213.html ; https://shopnfc.com/en/nfc-for-marketing/58-128-100-nfc-business-cards.html ; https://shopnfc.com/en/nfc-cards/236-655-nfc-cards-in-petg.html ; iPhone: https://www.shopnfc.com/en/content/20-nfc-iphone
- Made-in-China: https://www.made-in-china.com/products-search/hot-china-products/Custom_NFC_Card.html · AliExpress: https://www.aliexpress.com/w/wholesale-nfc-google-review-card.html
- NXP NTAG213/215/216: https://www.nxp.com/products/rfid-nfc/nfc-hf/ntag-for-tags-and-labels/ntag-213-215-216-nfc-forum-type-2-tag-compliant-ic-with-144-504-888-bytes-user-memory:NTAG213_215_216
- Android NFC: https://developer.android.com/develop/connectivity/nfc/nfc · StatCounter iOS: https://gs.statcounter.com/ios-version-market-share/mobile/united-states-of-america
- NFC Tools PC/Mac: https://www.wakdev.com/en/apps/nfc-tools-pc-mac.html
- Tariffs: https://hts.usitc.gov/reststop/search?keyword=8523.52 ; https://hts.usitc.gov/reststop/search?keyword=9903.01.24 ; https://hts.usitc.gov/reststop/search?keyword=9903.01.25 ; https://hts.usitc.gov/reststop/search?keyword=9903.88.15 ; de minimis: https://www.whitehouse.gov/presidential-actions/2025/07/suspending-duty-free-de-minimis-treatment-for-all-countries/ ; freight: https://www.freightos.com/shipping-routes/shipping-from-china-to-the-united-states/
- USPS: https://pe.usps.com/text/dmm300/Notice123.htm ; https://pe.usps.com/text/dmm300/101.htm · Uline: https://www.uline.com/Product/Detail/S-5631/Self-Seal-Bubble-Mailers/Uline-Self-Seal-White-Bubble-Mailers-000-4-x-8
- Google: https://support.google.com/business/answer/16816815 ; https://support.google.com/business/answer/7035772 ; https://support.google.com/contributionpolicy/answer/7400114 ; https://support.google.com/business/answer/3403100 ; https://www.google.com/help/terms_maps/ ; https://developers.google.com/my-business/content/faq ; https://developers.google.com/my-business/content/basic-setup ; https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations ; https://developers.google.com/maps/documentation/places/web-service/place-id
- FTC: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials ; https://www.law.cornell.edu/cfr/text/16/465.4 ; https://www.law.cornell.edu/cfr/text/16/465.7 ; https://www.law.cornell.edu/cfr/text/16/1.98
- Stripe: https://stripe.com/tax/pricing ; https://stripe.com/billing/pricing ; https://stripe.com/pricing ; https://docs.stripe.com/payments/during-payment/charge-shipping.md?payment-ui=stripe-hosted ; https://docs.stripe.com/billing/subscriptions/prorations ; https://docs.stripe.com/billing/subscriptions/cancel ; https://docs.stripe.com/tax/tax-codes
- Twilio: https://www.twilio.com/en-us/sms/pricing/us ; https://help.twilio.com/articles/1260803965530 ; https://help.twilio.com/articles/11587910480155
- Value/churn/labor: https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf ; https://www.brightlocal.com/research/google-reviews-study/ ; https://www.brightlocal.com/research/local-consumer-review-survey/ ; https://www.recurly.com/research/churn-rate-benchmarks/ ; https://www.bls.gov/bdm/us_age_naics_72_table7.txt ; https://www.cobloom.com/blog/churn-rate-how-high-is-too-high ; https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes ; https://www.kff.org/health-costs/report/2025-employer-health-benefits-survey/ ; https://www.nextinsurance.com/general-liability-insurance/cost/
- Competitors: https://taptag.shop/products/tap-review-card ; https://www.tapni.com/products/google-review-card ; https://birdeye.com/insights-ai/ ; https://www.podium.com/product/reviews ; https://vercel.com/pricing


## Open questions
- Actual NFC card COGS at 250/500/1,000 from a US or trusted offshore supplier: UPrinting only displays the 100-qty price ($2.44) in static HTML; GoToTags, Seritag, Alibaba and Amazon pages could not be fetched. Get 3 written quotes (UPrinting, GoToTags, one Alibaba/Made-in-China supplier with samples) before committing to the $1.90 / $1.45 / $0.95 planning figures.
- Real replacement-card loss rate per restaurant per month — the whole subscription margin (83% vs 48%) hinges on this. Track it during the demo run and revisit the 10-card allowance after 90 days.
- Whether the Recurly churn benchmarks (SaaS 3.22%) are monthly or annual — the fetched page was internally inconsistent; the model uses 3–5% monthly from Baremetrics/Cobloom as the base case.
- Google Business Profile API approval timeline for a brand-new business (requires a GBP verified 60+ days and a live website), and the OAuth UX for getting each restaurant to grant access; until then Outscraper/Apify are the data path and their terms-of-service risk should be reviewed.
- Price of a short, brandable .com on the aftermarket (not fetched) — budget separately from the $11.08 standard registration.
- Sales-tax treatment of physical cards vs. the SaaS report in the founder's state and Stripe Tax fees (not fetched).
- In-person close rate for restaurant owners with a physical demo card — the CAC model assumes 10–20% when the decision-maker is present; validate on the first 40 visits.
- Whether rigid PVC cards in a #10 envelope qualify for First-Class Mail letter/flat rates or incur non-machinable surcharges (would change single-card replacement postage from ~$1–2 to ~$7).
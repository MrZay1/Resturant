# Launch checklist: the next 30 days

One ordered list, grouped by week. Each item names the document or file that has the detail. Do the items in order inside each week; the cross-week dependencies that matter are called out. Prices and lead times are from the research folder as of 2026-09-04 and carry their source. Anything the research could not verify is marked.

Working assumptions: brand name Tablenote (placeholder), domain tablenote.co, short link host tblnt.co, founder Zay, city [CITY], home state [STATE]. Change `site/lib/brand.ts` if any of these change; everything on the site reads from it (`README.md`).

## Critical path

Three things gate everything else. Do them first.

1. The name and the short domain must be final, registered and resolving before you re-export the artwork and before you place the printed-card order. The chip URL, the printed URL and the QR all hardcode `tblnt.co` (`site/scripts/export-cards.mjs` DEFAULT_DESIGNS; `docs/01-ordering-guide.md` section 8.5). The supplier burns `https://tblnt.co/r/<slug>?s=card` into the chip at production time and the QR is part of the artwork, and there is no refund on printed cards after proof approval. A name change after the order scraps every card (`docs/01-ordering-guide.md` section 1; `docs/02-nfc-tech-spec-and-encoding.md` section 2.1). Note for `docs/01-ordering-guide.md` section 1: its three preconditions do not yet list the name decision; treat it as the fourth.
2. The founder's own Google Business Profile must be created and verified this week. Google's API access application requires a profile "verified and active for 60+ days" plus a website, so every day of delay pushes the review-pull pipeline out a day (https://developers.google.com/my-business/content/prereqs).
3. `LEAD_WEBHOOK_URL` and `TAP_WEBHOOK_URL` must point at something that stores rows before cards go out. Without them the lead form returns 503 in production and taps are lost on Vercel (`site/.env.example`; `docs/02-nfc-tech-spec-and-encoding.md` section 2.4).

## Week 1 (days 1 to 7): name, entity, domain, site, Stripe, orders

Order of operations inside the week: name (day 1 to 2), domains registered the same day, site deployed on both domains, artwork re-exported, then the printed-card order on day 7 at the earliest. Blanks and holders can be ordered on day 1 because they carry no name or URL.

### Name and domains (days 1 to 2)

- [ ] Decide the name. Tablenote is a placeholder. Before committing: the name and domain must not contain "Google" or a G lookalike (https://about.google/brand-resource-center/guidance/); check the state entity register and the domain for availability; keep "review card" and "Google" out of the product name (`docs/04-compliance-and-policy.md` section 4.2). Update `BRAND.name`, `legalName`, `domain`, `shortLinkHost`, `email` in `site/lib/brand.ts` the same day. This decision gates the printed-card order below; do not order cards on a placeholder name.
- [ ] Buy the main domain and the short domain the same day the name is decided. Porkbun prices: .co $31.20 per year; .com $11.08 per year; .link $7.72 per year (https://porkbun.com/tld/co ; https://porkbun.com/products/domains ; https://porkbun.com/tld/link). A first-year discount on .co may exist but is not in the research; check https://porkbun.com/tld/co at purchase. Cloudflare Registrar sells at registry cost with no markup (https://www.cloudflare.com/products/registrar/). A short premium .com costs far more and was not priced. If tblnt.co is taken, a .link is the cheapest fallback. Register now so the domain ages before cards ship (`research/google_review_mechanics.md` gap-fill section 5).
- [ ] Set up business email on the domain. Google Workspace Business Starter is $7.00 per user per month list (https://workspace.google.com/pricing). Any new-customer promotional price is unverified; re-check on the pricing page before buying. One seat. This address must be the Cloud project owner, the Manager on every client profile, the contact on Google's API form, and a Search Console owner of the domain (`docs/03-google-reviews-and-report-pipeline.md` section 3.4).

### Business basics

- [ ] Form the entity. `site/lib/brand.ts` says "Tablenote LLC" and `BRAND.state` is empty; the terms' governing-law section depends on it (`docs/04-compliance-and-policy.md` section 5.4). Formation fees were not researched.
- [ ] Get an EIN from the IRS if the entity is not a sole proprietorship, and open a business bank account for the new Stripe account. Not covered by the research; both are free or cheap and take under a day.
- [ ] Register for a seller's permit in [STATE]. Physical presence creates sales-tax nexus on day one, so the pilot restaurants' card sales are taxable from the first invoice (https://taxfoundation.org/data/all/state/sales-tax-rates/ ; `docs/04-compliance-and-policy.md` section 6). Ask a CPA how [STATE] classifies the $50 report (SaaS, information service, or data processing) before the first invoice (`research/policy_legal.md` gap-fill section 12).
- [ ] Get a resale certificate so card stock is bought tax-free, and plan to self-assess use tax on cards you pull for demos and giveaways (https://www.cdtfa.ca.gov/formspubs/pub103/ is California's rule; other states follow the same principle).
- [ ] Pick a business mailing address. It goes in the terms, the privacy policy, every marketing email (CAN-SPAM requires "a valid physical postal address", https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) and the Google Business Profile below.

### Google Business Profile and Cloud project

- [ ] Create and verify a Google Business Profile for Tablenote at the [CITY] address today. The 60-day clock starts after verification. Google reviews a video verification in "up to 5 business days" (https://support.google.com/business/answer/14271705); practitioners report 24 hours to 5 business days typical and 14 or more days if flagged for manual review (https://www.reinstatelabs.com/blogs/gbp-video-verification-time ; https://boomcycle.com/blog/google-business-profile-verification-expert-tips-2026/ ; `research/google_review_mechanics.md` gap-fill section 8). A service-area video must show location proof, business existence (tools, business cards, branded apparel) and management proof such as a permit, invoice or utility bill; minimum 30 seconds, unedited, recorded live in the app (same Google page). Fill the profile completely and add the website once it is live. Whether a home address qualifies or needs to be hidden as a service-area business was not researched; check Google's help when you create it.
- [ ] Create a Google Cloud project with the Workspace account, note the Project Number, and add the domain to Search Console. Both are prerequisites for the API application and OAuth verification (https://developers.google.com/my-business/content/prereqs ; https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification). Do not submit the API form yet; quota shows 0 QPM until approved and 300 QPM when approved.

### Deploy the website

- [ ] Vercel Pro at $20 per month; the Hobby plan is "for personal, non-commercial use" (https://vercel.com/pricing). Import the `site/` folder as the project root (`README.md`, Deploy).
- [ ] Add the environment variables from `site/.env.example`:

| Variable | Set it to | Why |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Live key from the new Stripe account (test key until the $1 test passes) | Without it checkout returns 503 and the order form falls back to an email request (`site/app/api/checkout/route.ts`) |
| `SITE_URL` | `https://tablenote.co` | Stripe success and cancel redirects; never derived from the request |
| `STRIPE_AUTOMATIC_TAX` | `1` only after Stripe Tax is activated in the Dashboard | Sends `automatic_tax: { enabled: true }` on Checkout |
| `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` | Airtable or form-tool webhook (next section) | Required in production; the lead endpoint returns 503 without it (`site/app/api/lead/route.ts`) |
| `TAP_WEBHOOK_URL` and `TAP_WEBHOOK_SECRET` | Airtable or form-tool webhook | Taps are only logged otherwise, and Vercel does not keep them (`site/lib/taps.ts`) |

- [ ] Point both domains at the Vercel project. The short domain must serve the same app so `/r/<slug>` resolves on it.
- [ ] Test the redirect with a real GET and a mobile user agent: `https://tblnt.co/r/demo?s=card` must return 302 with `Cache-Control: no-store`. HEAD requests return 200 regardless, so do not use them (`docs/02-nfc-tech-spec-and-encoding.md` section 2.5).
- [ ] Publish the privacy policy and terms at `/legal` with the founder-only facts from `docs/04-compliance-and-policy.md` section 5.4: entity name, state, address, tax registration number, AI provider, hosting provider, log retention, support email. The privacy policy must live on the same domain and be linked from the OAuth consent screen later (https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification).
- [ ] Keep "more 5-star reviews" and "boost your rating" off the site. Stripe's underwriters read the site when activating, and the FTC treats those as unsubstantiated performance claims (https://stripe.com/legal/restricted-businesses ; https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business).

### Lead capture and tap storage

- [ ] Create an Airtable base with two tables, Leads and Taps, or use Zapier, Make, or Formspree. The lead payload is `name, restaurant, email, phone, city, message, kind, ts`; the tap payload is `slug, ts, ua, referer, source, counter` (`site/app/api/lead/route.ts`; `site/lib/taps.ts`). An Airtable automation with a "when webhook received" trigger is enough for the pilot. Airtable pricing was not researched.
- [ ] Submit the demo form on the live site and tap the demo link once. Confirm one row in each table. Add the consent text from `docs/04-compliance-and-policy.md` section 8.3 under the form if the phone field stays.

### Stripe

- [ ] Create a second Stripe account under the existing login so statements, tax, and risk profile stay separate from the photo and water business (`site/.env.example`; `docs/04-compliance-and-policy.md` section 7.3). Describe the business as "Printed NFC cards and monthly guest-feedback analytics software for restaurants."
- [ ] Activate Stripe Tax and add the [STATE] registration; assign product tax codes (physical goods for cards; the report's code after the CPA decision). Then set `STRIPE_AUTOMATIC_TAX=1` (`docs/04-compliance-and-policy.md` section 6.2).
- [ ] Add `consent_collection.terms_of_service = "required"` and `custom_text.terms_of_service_acceptance` to `site/app/api/checkout/route.ts` so the renewal terms sit next to the checkbox: "$50/month per location, renews monthly until you cancel. Cancel anytime from your account or by emailing hello@tablenote.co." ROSCA requires the material terms before billing details and a simple way to stop charges (https://www.law.cornell.edu/uscode/text/15/8403 ; https://docs.stripe.com/payments/checkout/custom-components.md?platform=web&payment-ui=stripe-hosted).
- [ ] Enable the Stripe Customer Portal and put a "Manage subscription" link on the order-success page and in receipts. A contact form is not a compliant cancellation path (https://docs.stripe.com/customer-management).
- [ ] Run the $1 test. First, in test mode, place a full starter-kit order on the live site with Stripe's test card and confirm the first invoice shows two lines: $150 of cards and $50 recurring, never one $200 line (`docs/04-compliance-and-policy.md` section 6.1). Second, in live mode, charge $1 through a Dashboard payment link to your own card, confirm the payout lands in the right bank account, then refund it. Expected fees on real orders: 2.9% plus 30 cents per card transaction and 0.7% of Billing volume, about $2.10 on a $50 invoice (https://stripe.com/pricing ; `research/unit_economics.md` section 1.3). Never type a customer's card details yourself; open the order page and hand over the phone, or send the link (`docs/05-sales-playbook.md` section 5).

### Order blanks and stands (day 1; no name dependency)

- [ ] Order 25 blank NTAG213 cards from GoToTags at $0.30 each, MOQ 10, ships immediately, shipping rate not published (https://store.gototags.com/nfc-pvc-card-ntag213/).
- [ ] Order 10 vertical acrylic holders: Marketing Holders at $0.95 each plus $15 flat shipping (https://marketingholders.com/pages/flat-rate-shipping), or an Azar 10-pack at $8.74 from Home Depot (https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573).

### Order printed cards (day 7 at the earliest, or the start of Week 2)

Full detail in `docs/01-ordering-guide.md` sections 1, 6 and 8. Gate: every box below is ticked before the order goes in. MPBC burns the URL into the chip and prints the QR from your artwork, and there is no refund on printed cards after proof approval, so cards ordered on a placeholder name are scrap if the name changes.

- [ ] Name decided and `site/lib/brand.ts` updated (Name and domains, above).
- [ ] Both domains registered and resolving to the Vercel project; `https://<short domain>/r/demo?s=card` returns the 302 (Deploy the website, above).
- [ ] The `demo` slug in `site/data/links.json` points somewhere useful (`/sample-report` is safe until the Tablenote profile is verified).
- [ ] Artwork re-exported with the final short URL: `cd site && node scripts/export-cards.mjs` (`site/scripts/README.md`). The default designs in `site/scripts/export-cards.mjs` hardcode `tblnt.co`; change them if the short domain changed, then open the exported PDFs and read the printed URL and the QR with a phone before attaching them.
- [ ] Order 25 custom-printed cards from My Plastic Business Card: 25 x $4.95 = $123.75 plus $10 flat FedEx Ground, proof within 24 hours Monday to Friday, 5 business days production (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ ; https://myplasticbusinesscard.com/faq/). Attach the PDFs from `cards/exports/demo-your-restaurant/` and the email in `docs/01-ordering-guide.md` section 8.5. Take 50 at $3.96 each if you expect more than 20 pitches before the production run.
- [ ] If you must pitch inside a week and the name is final: Tap Tag, 10 custom cards for $195, ships next business day if ordered by 1 PM Eastern, free 3-day US shipping on 10 or more (https://taptag.shop/products/custom-printed-plastic-nfc-cards). Paste your URL in the cart note or the cards arrive on Tap Tag's dynamic redirect. Same gate applies.
- [ ] Approve the proof the day it arrives. Check trim, 3 mm safe zone, QR readability on screen from 20 cm, chip position versus the QR, the URL matches the live short domain character for character, no stars, no Google logo (`docs/01-ordering-guide.md` section 9; `docs/04-compliance-and-policy.md` section 4.2).
- [ ] Email MPBC the three production questions: split-tier pricing at 50 cards per design, exact IC part number, hard-lock on request (`docs/01-ordering-guide.md` section 10).

## Week 2 (days 8 to 14): encode, test, print, target list, paperwork

### Encode and lock

- [ ] Encode 10 blanks in one evening following `docs/02-nfc-tech-spec-and-encoding.md` section 3. One NDEF URI record, `https://tblnt.co/r/<slug>?s=card`, slugs from `site/data/links.json`.
- [ ] Lock with an Android phone. NFC Tools on iOS uses the system lock command, which only soft-locks; Seritag recommends "using an Android phone or asking Seritag to encode and lock the tags" for tags in public places (https://seritag.com/news/can-iphones-lock-nfc-tags). Locking is irreversible. Demo cards get password protection instead so they can be re-pointed (`docs/02-nfc-tech-spec-and-encoding.md` section 1).
- [ ] When the MPBC cards arrive (about day 15 to 19 if ordered on day 7: proof next business day, 5 business days production, then FedEx Ground; `docs/01-ordering-guide.md` section 9): tap-test every card on two phones, lock the production cards with the Android phone, apply the config lock, label the box. Until they arrive, pitch with encoded blanks in a holder.

### Test on four or more phones

- [ ] Run the matrix in `docs/02-nfc-tech-spec-and-encoding.md` section 6: a current iPhone, an older background-reading iPhone (11, 12 or SE 2nd gen), a Pixel on Android 16, a Galaxy on One UI, and an iPhone 8 or X if you can borrow one. Basis: US mobile share is iOS 60.68 percent, Android 39.29 percent (https://gs.statcounter.com/os-market-share/mobile/united-states-of-america).
- [ ] Pass criteria: 5 of 5 taps give a banner or notification within 2 seconds in hand; the redirect lands on Google's review dialog when signed in and on the sign-in page then the dialog when signed out. Do not submit a review. Test lock screen, Camera app open, Airplane mode, MagSafe wallet, card on metal (Apple lists the states where background reading is off: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading).
- [ ] Confirm every native tap produced a row at `TAP_WEBHOOK_URL` with the right slug and `source=card`.
- [ ] Record the two-step reality for the script: iPhone XS and later show a banner the guest must tap; Android 17 surfaces an "open link" notification requiring explicit interaction; iPhone 7, 8 and X need Control Center's NFC reader; QR on the back is the fallback (https://developer.android.com/develop/connectivity/nfc/nfc ; `docs/02-nfc-tech-spec-and-encoding.md` section 5).

### Print

- [ ] Export the letter-size staff guide and sample-report one-pager: `cd site && node scripts/export-print.mjs --name "Restaurant Name"`. Files land in `cards/exports/print/` (`README.md`; `site/scripts/README.md`).
- [ ] Print 10 one-pagers on heavy paper and 10 staff guides (laminate them). Before printing, put one guest instruction in every document: "iPhone: top edge on the card. Android: middle of the back on the card, phone unlocked. Or scan the QR." The iPhone reader is along the top back edge (Serialio, `research/nfc_tech.md` section 2.3 and gap-fill section 18); the Android antenna is at the centre of the back (Seritag, `research/sales_demo_playbook.md` gap-fill section 17). Today `docs/04-compliance-and-policy.md` section 3.3 says "flat on the card", `docs/05-sales-playbook.md` sections 3.2 and 3.3 say "top edge" with nothing for Android, and the printed guide (`site/app/(print)/print/staff-guide/page.tsx`) says "Android: the reader is on the back, usually the upper half". Change all three to the sentence above before printing.
- [ ] Blocked until drafted: the one-page leave-behind and the pilot agreement half-sheet are "not yet in the repo" (`docs/05-sales-playbook.md` section 7). Draft text for both, plus the review-access authorization and the client compliance covenant, is in Appendix A of this document. Paste each into a word processor, add your phone, email and the QR, print 10 leave-behinds and 5 pilot-sheet pairs. Adding `/print/leave-behind` and `/print/pilot-sheet` pages to `site/scripts/export-print.mjs` is the durable fix and is listed under "What is not built yet".
- [ ] Assemble 10 demo sets: card in holder, staff guide, one-pager, leave-behind, a cheap black check presenter with a card tucked in (`docs/05-sales-playbook.md` section 7).

### Target list for [CITY]

- [ ] Build the 50-restaurant sheet with the three sheets in `docs/05-sales-playbook.md` section 8.1 (Targets, Touches, Pilots) and its weekly scorecard. Targets columns at minimum: ID, name, neighborhood, cuisine, POS, Google rating, review count, newest-review date, rating gap, owner replies, Place ID, demo slug, decision-maker, best day and time, stage, last touch, next action, objection heard. Pick the 50 with the signals in section 8.3. Group rows by neighborhood for routing.
- [ ] Prioritize single-unit, owner-on-premises restaurants; 7 in 10 US restaurants are single-unit operations (https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/).
- [ ] Check each restaurant's Popular times and note the lull between lunch and dinner (https://support.google.com/business/answer/6263531). Plan Tuesday to Thursday afternoons, 8 to 10 walk-ins per afternoon. The 2 to 4 pm window is convention, not a sourced statistic.
- [ ] Record each target's Place ID with the Place ID Finder (https://developers.google.com/maps/documentation/places/web-service/place-id) for onboarding only. Never encode a real restaurant's Place ID on a card you hand out; a test review on a live profile violates Google's policy (https://support.google.com/contributionpolicy/answer/7400114 ; `docs/04-compliance-and-policy.md` section 4.5).

### Paperwork for pilots

None of the first three existed as text before this document; drafts are in Appendix A. Print from the drafts this week and move them into `export-print.mjs` later.

- [ ] Half-page pilot sheet, two copies per pilot: restaurant, decision-maker, start and end date, cards issued and slug, day-0 baseline (rating, count, newest-review date), what you deliver, what you ask in return, the price after the pilot (fields from `docs/05-sales-playbook.md` section 7; success criteria from section 5). Draft: Appendix A.2.
- [ ] Signed authorization to read and analyze the restaurant's public Google reviews, naming third-party data providers as a fallback and the AI provider as a subprocessor (`docs/03-google-reviews-and-report-pipeline.md` section 2; `docs/04-compliance-and-policy.md` section 5.3). Draft: Appendix A.3.
- [ ] Client compliance covenant (`docs/04-compliance-and-policy.md` section 5.3). Draft: Appendix A.4. The one-paragraph written notice to staff already has text in `docs/04-compliance-and-policy.md` section 3.4; print it on the back of the covenant.
- [ ] Draft the API application text now so it is ready the day a profile qualifies: entity type, website, Project Number, contact email, and the use case from `docs/03-google-reviews-and-report-pipeline.md` section 3.3.

## Week 3 (days 15 to 21): first 10 visits, first pilots

- [ ] Run the first 10 visits Tuesday to Thursday afternoons. Host-stand script, 60-second pitch, and 3-minute demo are in `docs/05-sales-playbook.md` sections 2.3, 3.2 and 3.3. Lead with the tap, not the pitch. Warn the owner not to submit the review on the demo screen; an owner reviewing their own business is a conflict of interest (https://support.google.com/contributionpolicy/answer/7400114).
- [ ] Pitch numbers to use, all from BrightLocal 2026: 97 percent read reviews for local businesses; 74 percent want reviews from the last three months; 83 percent of people asked for a review left one (https://www.brightlocal.com/research/local-consumer-review-survey/). Do not cite a tap-to-review conversion rate; none exists yet.
- [ ] Decide the pilot offer before the first visit. The playbook proposes a free 30-day pilot with 5 cards and one report (`docs/05-sales-playbook.md` section 5). The pricing doc argues against giving the first 10 cards away because the starter kit's $82 contribution recovers a quarter to a half of door-to-door CAC on day one (CAC about $330 base, about $165 good case; `docs/06-pricing-and-unit-economics.md` section 6.3). The two are compatible if the pilot uses 5 generic cards from demo stock and the branded 10-card kit is paid at conversion. Pick one and write it on the pilot sheet. Cap simultaneous pilots at 10 and never extend past 30 days.
- [ ] Log every touch in the sheet before leaving the parking lot. Cadence: day 0 walk-in, day 2 text or email only if they gave it, day 7 second walk-in, day 14 call, day 30 final touch (`docs/05-sales-playbook.md` section 8.2). Cold email needs a physical address and a working unsubscribe; automated texts to a mobile need prior express written consent (`docs/04-compliance-and-policy.md` section 8).
- [ ] Onboard each pilot in one 20-minute sitting (`docs/03-google-reviews-and-report-pipeline.md` section 2; `docs/05-sales-playbook.md` section 9):
  - Owner opens business.google.com, Read Reviews, Get more reviews, copies the link (https://support.google.com/business/answer/16816815). Extract the Place ID from it.
  - Owner adds the Tablenote Workspace email as Manager (Owner if they agree) under People and access (https://support.google.com/business/answer/3403100). Unofficial reports say API applications from manager-level accounts get bounced, so Owner is better on the first pilot (`docs/03-google-reviews-and-report-pipeline.md` section 3.4).
  - Signed authorization, staff notice acknowledged, staff roster of first names, menu photo, report recipients, staff-name handling choice.
  - Day-0 screenshot of rating, review count and newest-review date.
- [ ] Add a slug per pilot to `site/data/links.json` with `to` set to `https://search.google.com/local/writereview?placeid=<PLACE_ID>`, redeploy, then test with a mobile GET: a signed-out phone must land on `accounts.google.com/ServiceLogin?continue=...writereview?placeid=<same ID>` (`docs/02-nfc-tech-spec-and-encoding.md` section 2.5).
- [ ] Re-point the pilot's demo cards to its slug, or hand over production cards if they have arrived. One card per check presenter plus 20 percent spares.
- [ ] Five-minute pre-shift training with the laminated guide: card goes in the check presenter, one neutral sentence, walk away, no names, no stars, no incentives, no staff reviews, guests use their own data (`docs/04-compliance-and-policy.md` section 3.3). Roll cards out over weeks, not all tables on night one; "unusual volumes or patterns" is a stated removal ground (https://support.google.com/contributionpolicy/answer/7400114).
- [ ] Apply for Basic API Access as soon as the first pilot's profile makes you eligible (verified 60 or more days, live website, application from the owner or manager email): https://support.google.com/business/contact/api_default. Google's FAQ says requests are reviewed within 14 days; third-party reports run 4 days to 6 weeks (https://developers.google.com/my-business/content/faq ; `research/google_review_mechanics.md` section 2.2).

## Week 4 (days 22 to 30): sign 3 to 5 pilots, first report by hand

- [ ] Keep the visit rhythm: 24 to 30 touches a week. Target 3 to 5 signed pilots by day 30. Objection responses are in `docs/05-sales-playbook.md` section 4.
- [ ] Deliver a baseline report to each pilot within 48 hours of signing, built from the last 90 days of reviews. This is the "aha" moment and costs under a dollar (`research/unit_economics.md` section 8.2). Use the manual process below.
- [ ] Set up the manual report process and run it once per pilot. Detail in `docs/03-google-reviews-and-report-pipeline.md` sections 3.8, 4, 5 and 6:
  1. Pull. Either read reviews in the Business Profile dashboard as Manager and copy them out (zero code, fully within Google's rules), or export with Outscraper (free for the first 500 reviews per 30 days, then $3 per 1,000, `sort=newest` with a cutoff; https://outscraper.com/pricing/) or Apify's compass actor ($0.60 per 1,000 on the free plan; https://apify.com/compass/google-maps-reviews-scraper). Scrapers conflict with Google Maps Platform's no-scraping clause, so use them only for restaurants that signed the authorization, strip reviewer names, and do not call the Places API in the same product while scraping (https://cloud.google.com/maps-platform/terms ; `research/google_review_mechanics.md` gap-fill section 18).
  2. Clean. Split "(Translated by Google)" and "(Original)" blocks; drop reviewer display names and photos; keep stars, date, text, owner reply.
  3. Pass 1 in Claude: extract per-review JSON (themes with sentiment, dishes, person mentions against the roster, quotable lines). Pass 2: write the narrative from the aggregated counts. Aggregate in a spreadsheet, not in the model. Planning cost about $0.30 per restaurant-month on Opus 5 at API prices (https://platform.claude.com/docs/en/about-claude/pricing ; `research/unit_economics.md` section 1.1). Use the API, not a consumer chat app; Anthropic's commercial terms incorporate its DPA and do not train on customer content (https://www.anthropic.com/legal/commercial-terms).
  4. Human review: numbers match the table, no reviewer names, staff section uses the "Guest comments that mention team members" heading and the standing disclaimer, no hallucinated dish or person, draft replies contain no personal information (`docs/03-google-reviews-and-report-pipeline.md` section 6).
  5. Lay it out in the sample-report shape and export a letter PDF, or a plain document for the first two; deliver by email between the 3rd and 5th of the month because Google's moderation can lag by days (https://support.google.com/business/answer/4596773).
  6. Purge raw review text within 30 days; keep the report and the summary metrics. Business Profile API content "must be stored temporarily for no more than 30 calendar days" (https://developers.google.com/my-business/content/policies).
- [ ] Turn on "Customer activity" notifications on the Manager account so 1-star reviews reach you by email within the hour (https://support.google.com/business/answer/7198436).
- [ ] Start measuring the three numbers no one has: taps versus new reviews (conversion), cards lost per restaurant per month (on verified card costs the subscription margin is 67 percent at launch with 2 replacements a month mailed quarterly, 84 percent at scale, 51 percent if a restaurant draws all 10 cards a month at scale cost, and negative if it does so on launch stock at $5.35 a card; `docs/06-pricing-and-unit-economics.md` section 2), and sign-in drop-off on iPhone Safari (`research/google_review_mechanics.md` gap-fill section 2).
- [ ] Prepare OAuth sensitive-scope verification once the consent screen, privacy policy and Search Console verification exist: demo video, per-scope justification, "typically takes 3-5 business days" (https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification). Testing mode expires authorizations after 7 days, which is fine for your own Manager account and not for restaurant owners (https://support.google.com/cloud/answer/15549945).
- [ ] Ask every pilot at day 30, not day 0, for a testimonial, logo permission and two introductions. Any quoted pilot that received free cards or a free report needs a visible "received free cards and a free trial" line next to the quote (https://www.law.cornell.edu/cfr/text/16/255.5).

## Days 31 to 45: first full monthly report, then automate

- [ ] Run the first full monthly report for each pilot by hand, hold the day-30 conversion meeting with the before and after numbers, and open the order page for the owner to pay (`docs/05-sales-playbook.md` section 5).
- [ ] When the API is approved (quota 300 QPM), re-pull the previous month from the API so "vs last month" is API-to-API; a scraper baseline against an API month is meaningless (`docs/03-google-reviews-and-report-pipeline.md` section 5.3).
- [ ] Automate in this order: database and tap ingest, Manager-access sync, normalizer, pass 1 and aggregator, pass 2, renderer, review queue, email, purge job. Then the link health checker and Place ID refresh, an afternoon each (`docs/03-google-reviews-and-report-pipeline.md` section 7).
- [ ] Request GoToTags and MPBC production quotes for 300 to 500 cards once three pilots convert (`docs/01-ordering-guide.md` section 7).

## Budget for the 30 days

| Item | Cost | Source |
| --- | --- | --- |
| Domain .co | $31.20 per year (a first-year discount is unverified; check at purchase) | https://porkbun.com/tld/co |
| Short domain (.link fallback) | $7.72 per year | https://porkbun.com/tld/link |
| Google Workspace, one seat | $7.00 per month list (promotional pricing unverified) | https://workspace.google.com/pricing |
| Vercel Pro | $20 per month | https://vercel.com/pricing |
| MPBC 25 printed cards plus shipping | $133.75 | https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ ; https://myplasticbusinesscard.com/faq/ |
| GoToTags 25 blanks | $7.50 plus unpublished shipping | https://store.gototags.com/nfc-pvc-card-ntag213/ |
| Holders | $8.74 (Azar) or $24.50 (Marketing Holders) | see Week 1 |
| Outscraper, Apify, Anthropic API for 5 pilot reports | under $20 | https://outscraper.com/pricing/ ; https://apify.com/pricing ; https://platform.claude.com/docs/en/about-claude/pricing |
| Printing and lamination, entity formation, sales tax | not researched | |
| Total, excluding the unresearched lines | about $235 to $255 plus tax (Azar holders to Marketing Holders, plus up to $20 of data and model cost) | |

## What is not built yet

The website ships a static sample report. None of the following exists; specs are in `docs/03-google-reviews-and-report-pipeline.md` section 7.

- The review-pull pipeline: OAuth client for `business.manage`, encrypted token storage, `reviews.list` sync with the stop-one-page-past rule and weekly full re-list, scraper adapter behind the same interface for the bridge period.
- The report generator: normalizer, pass 1 and pass 2 model jobs with JSON schemas, code aggregator producing the `SAMPLE_REPORT` shape in `site/data/sampleReport.ts`, review queue, PDF renderer using `components/report` and Playwright.
- The customer dashboard: taps by table and weekday, report archive, staff-name redaction toggle, cancel link. Not needed for the pilot; email the PDF.
- Email delivery: Resend or similar with the PDF attached; Resend Free covers 3,000 emails per month, 100 per day (https://resend.com/pricing).
- Tap analytics storage: today `TAP_WEBHOOK_URL` forwards each tap and nothing stores it unless you point it at Airtable; a taps table in Supabase (Free $0, paused after a week idle; Pro $25 per month, https://supabase.com/pricing) is the next step. Runtime re-pointing of slugs also does not exist; `links.json` is read at build time, so every change is a redeploy (`docs/02-nfc-tech-spec-and-encoding.md` section 2.5).
- Print pages for the one-page leave-behind and the pilot agreement half-sheet: add `/print/leave-behind` and `/print/pilot-sheet` next to the existing print pages and extend `site/scripts/export-print.mjs`, using the text in Appendix A. Until then, print from a word processor.
- Also missing: the 1-star alert path, the daily link health checker, the yearly Place ID refresh, the purge job, and the `consent_collection` and Customer Portal changes to checkout listed under Week 1.

## Appendix A: paperwork drafts to print this week

Plain-text drafts of the four documents Week 2 and Week 3 need and no other file contains. Fields follow `docs/05-sales-playbook.md` section 7; clauses follow `docs/04-compliance-and-policy.md` section 5.3. Replace the bracketed fields, paste into a word processor, print. Not legal advice; have a lawyer read A.3 and A.4 before the first paying customer.

### A.1 One-page leave-behind

**Tablenote. Tap to review us on Google.**

What it is

- A card your server drops with the check. The guest holds a phone on it and their Google review page for your restaurant opens. No app, no typing, no QR hunt (the QR is on the back for older phones).
- Once a month, a two-page report built from your new Google reviews: what guests praise, what costs you stars, which dishes and staff get mentioned by name, and three things to fix.
- Nothing that breaks Google's rules. No incentives, no filtering of unhappy guests, no pressure at the table, no staff quotas.

Pricing

| Item | Price |
| --- | --- |
| Cards, one-time | $15 each, minimum 5 |
| Monthly report, per location | $50 per month, includes 10 free replacement cards a month, cancel anytime |
| Starter kit | 10 cards with your logo plus the report: $200 today, then $50 per month |

US shipping included. Sales tax added at checkout where required. Full refund if you cancel before proof approval.

Pilot offer

Free 30-day pilot: five cards, a laminated staff guide, a five-minute pre-shift training, and one full monthly report at the end. No card on file, no contract, no charge. Ten pilot slots in [CITY].

Four numbers (BrightLocal Local Consumer Review Survey 2026, https://www.brightlocal.com/research/local-consumer-review-survey/)

- 97 percent of consumers read reviews for local businesses.
- 74 percent want to see reviews from the last three months.
- 83 percent of people who were asked to leave a review did.
- People write about good experiences twice as often as bad ones: 60 percent versus 29 percent.

Zay, [PHONE], hello@tablenote.co. See a sample report: tablenote.co/demo [QR]

Google is a trademark of Google LLC. Tablenote is not affiliated with, sponsored by, or endorsed by Google.

### A.2 Pilot agreement half-sheet (two copies, both sign)

**Tablenote 30-day pilot**

| Field | |
| --- | --- |
| Restaurant | |
| Decision-maker, role | |
| Pilot start date | |
| Pilot end date (30 days, not extended) | |
| Cards issued, slug | [N] cards, slug `[slug]` |
| Day-0 baseline | Rating [X.X], reviews [N], newest review dated [date] |
| Target at day 30 | New reviews since day 0: [your number]. There is no published tap-to-review benchmark; write a modest number |

What Tablenote delivers: [N] cards pointed at your official Google review link, staff guide, five-minute pre-shift training, twice-weekly check-in by text or visit, one full monthly report at day 30, and a 15-minute feedback visit at day 30.

What the restaurant does: one card in every check presenter every service, a manager spot-check twice a week, guests use their own phones, and the rules on the staff guide (no incentives, no naming servers, no staff reviews).

What we ask in return: honest feedback at day 30; if it worked, a one or two sentence quote with name and title, permission to show your logo, and two introductions.

Price: no charge during the pilot. If you continue, the starter kit is 10 cards with your logo plus the report, $200 today, then $50 a month with 10 free replacement cards, cancel anytime. If not, we collect the cards on day 30 and part friends. This sheet is a memory aid, not a contract.

Restaurant: ______________________ Date: ________ Tablenote: ______________________ Date: ________

### A.3 Authorization to read and analyze Google reviews

[RESTAURANT LEGAL NAME], [ADDRESS] ("the Restaurant"), authorizes [TABLENOTE LEGAL NAME] ("Tablenote") as follows.

1. Access. Tablenote may read the Restaurant's public Google reviews for the location(s) listed below through Manager access on the Restaurant's Google Business Profile, or through Google's Business Profile API with the Restaurant's consent given on tablenote.co.
2. Fallback. Until that access is in place, Tablenote may obtain the same public reviews through a third-party data provider. Tablenote will not use a scraper for a location that has not signed this authorization.
3. Processing. Tablenote uses an AI provider (currently Anthropic, under its commercial terms, https://www.anthropic.com/legal/commercial-terms) as a subprocessor to produce the monthly report. Reviewer display names and photos are removed before processing and are not printed in reports.
4. Replies. Tablenote will not post a reply to any review on the Restaurant's behalf without the Restaurant's written approval of that reply (Google: "If you respond to reviews on behalf of your end-client, you must receive their authorization first," https://developers.google.com/my-business/content/policies).
5. Retention. Raw review text is kept no more than 30 calendar days (https://developers.google.com/my-business/content/policies). Reports and summary metrics are kept for the life of the subscription and are delivered only to the recipients the Restaurant names below.
6. Ending access. On cancellation Tablenote removes its Manager access, revokes any tokens, deletes raw review content immediately, and keeps reports downloadable for 90 days, then deletes them.

Location(s) and Place ID(s): ______________________. Report recipients: ______________________. Staff-name handling (circle one): full first names / first name and initial / anonymized with manager-only appendix / praise by name and criticism anonymized.

Signed for the Restaurant: ______________________ Name, title: ______________________ Date: ________

### A.4 Client compliance covenant (print the staff notice from `docs/04-compliance-and-policy.md` section 3.4 on the back)

The Restaurant agrees that, for as long as it uses Tablenote cards or reports, it will not:

- offer money, discounts, gifts or anything of value for a review;
- show the card only to guests it expects to be happy, or send unhappy guests to a different form or page;
- press a guest to leave a review while on the premises, wait at the table, or handle the guest's phone;
- set review targets, count taps per server, or reward staff for reviews;
- ask a guest to name a server in a review;
- give cards to staff, family or friends to review the Restaurant;
- use a house phone or tablet for guests to write reviews.

The Restaurant acknowledges that Google may remove reviews or restrict its Business Profile if these rules are broken (https://support.google.com/contributionpolicy/answer/7400114 ; https://support.google.com/business/answer/3474122), and that the FTC's Consumer Review Rule, 16 CFR Part 465, prohibits buying reviews (https://www.law.cornell.edu/cfr/text/16/465.4) and suppressing negative ones (https://www.law.cornell.edu/cfr/text/16/465.7). The Restaurant will not use the monthly report to set pay, tips, scheduling or discipline, and will give each staff member the written notice on the back of this page. Tablenote may end service without refund of the current month if the Restaurant breaks this covenant.

Signed for the Restaurant: ______________________ Name, title: ______________________ Date: ________

## Sources

- Google Business Profile video verification: https://support.google.com/business/answer/14271705
- Practitioner verification timing: https://www.reinstatelabs.com/blogs/gbp-video-verification-time ; https://boomcycle.com/blog/google-business-profile-verification-expert-tips-2026/
- Google Business Profile API prerequisites: https://developers.google.com/my-business/content/prereqs
- Google Business Profile API FAQ (14-day review): https://developers.google.com/my-business/content/faq
- Google Business Profile API access form: https://support.google.com/business/contact/api_default
- Google Business Profile API policies (30-day storage): https://developers.google.com/my-business/content/policies
- Sensitive-scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
- OAuth testing mode limits: https://support.google.com/cloud/answer/15549945
- Google brand guidance: https://about.google/brand-resource-center/guidance/
- Maps user-contributed content policy: https://support.google.com/contributionpolicy/answer/7400114
- Review link from Business Profile: https://support.google.com/business/answer/16816815
- Owners and managers: https://support.google.com/business/answer/3403100
- Notifications: https://support.google.com/business/answer/7198436
- Popular times: https://support.google.com/business/answer/6263531
- Reviews missing or removed: https://support.google.com/business/answer/4596773
- Place IDs and Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
- Google Maps Platform Terms (no scraping): https://cloud.google.com/maps-platform/terms
- Apple background tag reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Android NFC (Android 16 and 17 behavior): https://developer.android.com/develop/connectivity/nfc/nfc
- Seritag on iPhone locking: https://seritag.com/news/can-iphones-lock-nfc-tags
- Seritag on Android antenna position: https://seritag.com/learn/tech/how-to-read-nfc-tags-with-an-android
- Serialio on iPhone antenna position: https://serialio.com/serialio-news/blog/iphone-read-tiny-nfc-tag/
- Google Business Profile review solicitation help: https://support.google.com/business/answer/3474122
- FTC Consumer Review Rule, 16 CFR 465.4 and 465.7: https://www.law.cornell.edu/cfr/text/16/465.4 ; https://www.law.cornell.edu/cfr/text/16/465.7
- StatCounter US mobile OS share: https://gs.statcounter.com/os-market-share/mobile/united-states-of-america
- Porkbun domain prices: https://porkbun.com/tld/co ; https://porkbun.com/tld/link ; https://porkbun.com/products/domains
- Cloudflare Registrar: https://www.cloudflare.com/products/registrar/
- Google Workspace pricing: https://workspace.google.com/pricing
- Vercel pricing: https://vercel.com/pricing
- Supabase pricing: https://supabase.com/pricing
- Resend pricing: https://resend.com/pricing
- Stripe pricing: https://stripe.com/pricing
- Stripe Checkout consent and custom text: https://docs.stripe.com/payments/checkout/custom-components.md?platform=web&payment-ui=stripe-hosted
- Stripe Customer Portal: https://docs.stripe.com/customer-management
- Stripe Restricted Businesses: https://stripe.com/legal/restricted-businesses
- ROSCA, 15 U.S.C. 8403: https://www.law.cornell.edu/uscode/text/15/8403
- CAN-SPAM guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- FTC advertising substantiation: https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business
- 16 CFR 255.5 material connections: https://www.law.cornell.edu/cfr/text/16/255.5
- Tax Foundation state sales tax rates: https://taxfoundation.org/data/all/state/sales-tax-rates/
- CDTFA Pub. 103 resale certificates: https://www.cdtfa.ca.gov/formspubs/pub103/
- My Plastic Business Card: https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ ; https://myplasticbusinesscard.com/faq/
- GoToTags NTAG213 blanks: https://store.gototags.com/nfc-pvc-card-ntag213/
- Marketing Holders shipping: https://marketingholders.com/pages/flat-rate-shipping
- Azar holders at Home Depot: https://www.homedepot.com/p/Azar-Displays-Clear-Acrylic-Vertical-Business-Card-Holder-Display-for-Counter-10-Pack-252011/305102573
- Tap Tag custom cards: https://taptag.shop/products/custom-printed-plastic-nfc-cards
- Outscraper pricing: https://outscraper.com/pricing/
- Apify reviews scraper and pricing: https://apify.com/compass/google-maps-reviews-scraper ; https://apify.com/pricing
- Anthropic pricing and commercial terms: https://platform.claude.com/docs/en/about-claude/pricing ; https://www.anthropic.com/legal/commercial-terms
- BrightLocal Local Consumer Review Survey 2026: https://www.brightlocal.com/research/local-consumer-review-survey/
- National Restaurant Association statistics: https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/

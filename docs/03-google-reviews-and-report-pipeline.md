# Google review links, Business Profile access, and the monthly report pipeline

Working brand: Tablenote. Short-link host: tblnt.com. Site: tblnt.com. Founder: Zay. City: [CITY].

This document covers the Google side of the product: the link the card opens, how Tablenote gets read access to a restaurant's reviews, where the review data comes from while Google approval is pending, and how the monthly report is produced. Everything here is drawn from the research reports in `research/` (google_review_mechanics.md, unit_economics.md, policy_legal.md). Where the fact-check marked a claim as partially correct, the corrected version is used. Items marked "unverified" have not been confirmed on a real device or from a primary source.

What already exists in code: the redirect route (`site/app/r/[slug]/route.ts`), the slug table (`site/data/links.json`), tap forwarding to a webhook (`site/lib/taps.ts`, env `TAP_WEBHOOK_URL`), a static sample report (`site/data/sampleReport.ts`, rendered at `/sample-report`), and the public guide at `/guides/google-review-link`. The pipeline that turns real reviews into a real report does not exist yet. Section 7 lists what to build.

---

## 1. The review link

### 1.1 Two formats, one destination

| Format | Example | Who can get it | Notes |
|---|---|---|---|
| Place-ID link | `https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4` | Anyone with the Place ID; no profile access needed | Opens the write-a-review dialog directly. This is the format Tablenote redirects to. |
| Google short link | `https://g.page/r/CTW9H70cPgDuEBM/review` | Only an owner or manager of a verified profile, from the "Get more reviews" button | Google generates a QR code on the same screen. Permanent. |

The two are the same destination. A curl probe on 2026-09-04 showed the g.page link is a two-hop 302 chain (trailing slash added, then redirect) ending at `search.google.com/local/writereview?placeid=<ID>&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2` for phone user agents. A bare `Mozilla/5.0` user agent is sent to a `google.com/maps/place/...` URL instead, which on iPhone opens the Maps app. Source: fact-check of https://g.page/r/CTW9H70cPgDuEBM/review in research/google_review_mechanics.md.

Decision: Tablenote's redirect goes straight to the bare `writereview?placeid=` URL. No g.page hop, no `source=`, `laa=` or UTM parameters. The g.page link is kept on file only to confirm the Place ID. Never use `maps.app.goo.gl` or `google.com/maps/place` links on a card; they land on the listing and the guest still has to find "Write a review" (https://www.truereview.co/post/how-to-find-google-review-link).

### 1.2 How an owner finds their link (exact clicks)

Desktop, per Google Business Profile Help (https://support.google.com/business/answer/16816815):

1. Sign in to the Google Account that owns or manages the profile and go to business.google.com, or search the restaurant name on Google while signed in.
2. Click **Read Reviews**, then **Get more reviews**.
3. Click **Copy** to copy the link. To save the QR code, right-click it and choose "Save image as". Google says the QR code can only be generated in a computer browser, not on mobile.

The button label rotates between "Get more reviews", "Share review form" and "Ask for reviews" (https://wpsocialninja.com/google-review-link-generator/). On the Google Maps app: profile picture, then Your Business Profiles, then "Get more reviews" or "Share profile" (https://wiserreview.com/blog/google-review-link/). If the button is missing, the profile is not verified or the wrong account is signed in (https://www.favecard.co/en/blog/google-review-link/).

### 1.3 Finding a Place ID without owner access

- **Place ID Finder**: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder. Type the restaurant name, click the pin, copy the `ChIJ...` ID. One place at a time.
- **Expand the owner's g.page link**: `curl -s -o /dev/null -w '%{redirect_url}\n' -A 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1' 'https://g.page/r/<code>/review/'` (note the trailing slash and the real mobile UA). The Location header contains `placeid=`.
- **Places API (New)**: Place Details with only the `id` field is the free "IDs Only" tier (https://developers.google.com/maps/billing-and-pricing/pricing).
- Place IDs can change. Google recommends refreshing IDs older than 12 months; a Place Details request with only the `id` field refreshes at no charge, and Place IDs are exempt from the Places caching restriction so they may be stored indefinitely (https://developers.google.com/maps/documentation/places/web-service/place-id).
- The Apify scraper accepts only 27-character IDs starting `ChIJ` or `GhIJ`; some Google IDs are longer (https://apify.com/compass/google-maps-reviews-scraper). Capture the ID from the owner's own g.page link where possible.

### 1.4 What actually happens when a guest opens the link (empirical)

| Fact | Status | Source |
|---|---|---|
| A signed-out GET on the writereview URL returns 302 to `accounts.google.com/ServiceLogin?continue=<review URL>`; after sign-in Google returns the guest to the write-review page. | Verified by curl, 2026-09-04 | research/google_review_mechanics.md fact-check; https://support.google.com/maps/answer/6230175 |
| A HEAD request returns 200, not 302. Link checkers must use GET with a real mobile UA. | Verified 2026-09-04 | same |
| A Google Account is required to post; a non-Gmail email works. | Google help | https://support.google.com/business/answer/3474122 |
| No iOS app can claim `search.google.com` as a Universal Link (Apple's AASA CDN returns 404). On iPhone the link renders in the default browser. | Verified | research/google_review_mechanics.md gap-fill section 1 |
| On Android, `search.google.com/.well-known/assetlinks.json` names the Maps app, but whether Maps or Chrome opens the URL is unresolved. | Unverified; needs a real phone | same |
| Whether the star sheet auto-opens after the sign-in bounce on Safari. | Unverified; needs a real phone | same |
| US mobile share: iOS 60.68 percent (August 2026, in research/google_review_mechanics.md gap-fill). Browsers: Safari 52.84 percent, Chrome 41.17 percent (August 2026; fetched from the StatCounter page on 2026-09-05, not yet recorded in the research files). Safari's cookies are separate from the Gmail, Maps and Google apps, so the sign-in wall is mostly an iPhone-with-Safari problem; Chrome on iOS normally carries a Google session. | Statistic | https://gs.statcounter.com/os-market-share/mobile/united-states-of-america ; https://gs.statcounter.com/browser-market-share/mobile/united-states-of-america ; https://support.google.com/chrome/answer/185277 |
| Fraction of Safari users signed in to Google in Safari. | No public data. Measure it in the pilot: taps versus new reviews. | same |
| Android 16 opens NFC web links directly; Android 17 shows an "open link" notification that needs a tap, like iPhone. Android 16 and newer were 22.3 percent of Android devices and Android 17 was 0 percent in April 2026 (StatCounter via apilevels.com, research/nfc_tech.md gap-fill), so the Android 17 step matters more in 2027 than now. | Android docs; Statistic | https://developer.android.com/develop/connectivity/nfc/nfc ; https://apilevels.com/ |
| A redirect to a search page means Google cannot match the Place ID (profile merged, suspended or moved). | Practitioner | https://www.clickgrow.ai/blog/how-to-get-google-review-link/ |

Test on real phones before any card order: iPhone Safari (signed in and out), iPhone with Chrome as default, Android 14/15, Android 16/17, Android with and without the Maps app.

### 1.5 What goes in links.json

`site/data/links.json` maps a slug to a destination. The route lowercases the slug and strips anything outside `a-z0-9-_`, returns 302 with `cache-control: no-store`, and forwards a tap event (slug, timestamp, user agent, referer, `s=` source, optional NTAG counter) to `TAP_WEBHOOK_URL`. Cards are encoded with `https://tblnt.com/r/<slug>?s=card`; the QR on the back uses the same URL (see `site/scripts/README.md`). Changing the file requires a redeploy.

Rules for entries:

- `to` is the bare Place-ID URL: `https://search.google.com/local/writereview?placeid=<PLACE_ID>`. Nothing appended.
- One slug per restaurant location, not per card. Every card for that location carries the same URL, so replacement cards are interchangeable and the printed short link and QR on the back match the chip. This matches the artwork: `scripts/export-cards.mjs` takes one `url` per design, and the Configurator on `/order` derives one slug from the restaurant name (for example `tblnt.com/r/blue-door-bistro`). Taps are reported by weekday and time of day only, never by table or by server. Per-table slugs would need variable-data artwork and encoding that no script produces today (see section 7 if wanted later). Per-server tracking is a policy problem (section 6).
- The slug shown on the customer's proof preview must be the slug that goes into `links.json`. Today the Configurator slug is not saved anywhere at checkout (it is not in the Stripe `metadata` set in `site/app/api/checkout/route.ts` and not written to `links.json`), so the onboarding checklist in section 2 records it by hand and it is added to `links.json` before proof approval. Section 7 lists the code fix.
- Use `note` to record the g.page link, the Place ID source, and the date the link was last tested.
- Demo cards point at Tablenote's own verified Business Profile Place ID once it exists, never at a real restaurant. Until then they point at `/sample-report` as they do now.
- A 302, not a 301: a 301 can be cached by the phone and defeat re-pointing (https://www.locafy.com/blog/google-reviews-link-generator). The route already does this.

Example:

```json
"bluedoor": {
  "name": "Blue Door Bistro",
  "to": "https://search.google.com/local/writereview?placeid=ChIJ...",
  "note": "Place ID from owner's g.page/r/XXXX/review on 2026-09-10. Link tested iPhone+Android 2026-09-10. Slug matches the proof preview."
}
```

Daily link health check (to build): GET each destination with a mobile UA, follow at most one redirect, treat "302 to accounts.google.com with `continue=` containing `writereview?placeid=<expected ID>`" as healthy, and alert on a 302 to `google.com/search` or `maps/place`. It costs nothing.

---

## 2. Restaurant onboarding checklist

Collect all of this before cards go to proof. Most of it fits in one call.

Identity and link
- [ ] Legal business name and the exact name shown on the Google Business Profile; address; phone; website.
- [ ] Owner's name and the Google Account email that manages the profile.
- [ ] Confirmation the profile is verified and not suspended (the "Get more reviews" button only appears on verified profiles).
- [ ] The g.page review link from Read Reviews > Get more reviews > Copy, and the Place ID (from the link or the Place ID Finder). Store both. Open the writereview URL on a signed-in phone and confirm five empty stars appear.
- [ ] Multi-location: one Place ID, one slug, and one report per location.
- [ ] If the owner does not control the profile (common after an agency or ex-manager set it up): the owner runs Request Access at business.google.com/add from their own account. The current owner has 3 days to respond; after that the claim option may appear but "isn't always available" (https://support.google.com/business/answer/4566671). Cards can still ship because the link needs only the Place ID; only the report is blocked.

Cards
- [ ] Number of cards (minimum 5; starter kit is 10) and which template (classic, noir, logo, brand).
- [ ] Logo files: vector (SVG, PDF or EPS) preferred, otherwise PNG at least 1,000 px wide with transparent background.
- [ ] Brand colors as hex values.
- [ ] Table count, for sizing the order only. All cards share the location's single slug; do not map cards to tables or to servers.
- [ ] The slug: the one shown on the proof preview (Configurator auto-slug from the restaurant name, or the slug agreed in the pilot). Add it to `site/data/links.json` with the Place-ID URL and deploy before proof approval, then test `https://tblnt.com/r/<slug>?s=card` on an iPhone and an Android.
- [ ] Who receives replacement cards and the shipping address.

Access for the report
- [ ] Access choice: (B) owner adds Tablenote's Google Workspace email as **Manager** (Business Profile settings > People and access > Add > enter email > role Manager > Invite; Tablenote accepts the emailed invite), or (A) owner clicks "Connect Google" on tblnt.com once OAuth verification is done (section 3.6). The site FAQ currently describes option B, which is the pilot default.
- [ ] Record `accountId` and `locationId` after the first API call.
- [ ] Signed authorization in the subscription agreement covering reading and analyzing the restaurant's public Google reviews, use of a third-party data provider as a fallback, and the AI provider as a subprocessor.

Report preferences
- [ ] Who receives the monthly report (name, email) and whether they want a same-day alert on 1-star and 2-star reviews.
- [ ] Staff-naming preference: include first-name mentions, or redact staff names. Default is include, with the HR-safe wording in section 6.
- [ ] Staff roster of first names and nicknames, for matching mentions. Refresh when staff change.
- [ ] Owner confirms staff have been given the one-paragraph notice in section 6.3.
- [ ] Staff guidance acknowledged: no incentives, no quotas, no "mention me", no standing over the guest, no house tablet, one card for every table regardless of how the meal went.
- [ ] Wi-Fi note: tell guests to use their own mobile data, and never log in to the Business Profile from the guest Wi-Fi. Practitioners report reviews filtered when many come from one IP; Google has not confirmed IP filtering, so treat this as conservative practice, not a Google rule (https://whitespark.ca/blog/google-remove-reviews/).

Baseline
- [ ] Snapshot at signup: current `rating` and `userRatingCount`, plus a backfill of historical reviews for the first "vs last month" comparison (section 5.3 explains why the baseline must come from the same source as the current month).
- [ ] Stripe customer ID and subscription status, so the report and the replacement allowance stop when the subscription does.

---

## 3. Google Business Profile API access

### 3.1 Which API

Reviews live on the legacy host `https://mybusiness.googleapis.com/v4/`. `GET .../accounts/{accountId}/locations/{locationId}/reviews` (`pageSize` max 50, `orderBy=updateTime desc`) returns every review with `reviewId`, `reviewer.displayName` (only if not anonymous), `starRating`, `comment`, `createTime`, `updateTime` and `reviewReply`, plus `averageRating` and `totalReviewCount` (https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list). `batchGetReviews` covers multi-location owners (https://developers.google.com/my-business/content/review-data). The call only works for verified locations. The API is free: "available to registered users at no charge" (https://developers.google.com/my-business/content/pricing), and reviews are not on the deprecation schedule (https://developers.google.com/my-business/content/sunset-dates).

Why not the Places API: it returns "A maximum of 5 reviews", sorted by relevance, with no pagination, and the `reviews` field bills at $25.00 per 1,000 requests (https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places ; https://developers.google.com/maps/billing-and-pricing/pricing). Use it only for the monthly `rating` and `userRatingCount` sanity check (Pro SKU, $17.00 per 1,000, 5,000 free per month, so $0 at pilot scale).

### 3.2 Prerequisites (https://developers.google.com/my-business/content/prereqs)

- A Google Cloud project; note its Project Number.
- The applicant must "Manage a Google Business Profile that is verified and active for 60+ days" and "Have a website representing the business listed on the GBP". The profile can belong to a client the applicant manages.
- Apply from an email listed as owner or manager on that profile. The FAQ adds: "Use a valid business email address that is tied to your business domain" and keep the website live (https://developers.google.com/my-business/content/faq).
- Status signal: quota 0 QPM means not approved; 300 QPM means approved. Do not file a quota increase while at 0.

### 3.3 The application form

URL: https://support.google.com/business/contact/api_default. Choose "Application for Basic API Access". Third-party reports say the form asks for entity type, company website (live, with a privacy policy, on the same domain as the contact email), Project Number, contact email, and a written use case (https://slashpost.ai/blogs/google-business-profile/google-business-profile-api-documentation-2026).

Paste this as the use case, filling the brackets:

> Tablenote provides independent restaurants with a monthly written analysis of their own public Google reviews. Each restaurant authorizes us either by granting OAuth consent to our application or by adding our business account as a Manager on its Business Profile. We need read access to reviews (Google My Business API, accounts.locations.reviews.list), account and location listing (My Business Account Management API and My Business Business Information API), and NEW_REVIEW notifications (My Business Notifications API) for [N] verified client locations. We do not post replies without the client's written approval, we do not store API content for more than 30 days, and we do not aggregate content across clients. Project Number: [PROJECT NUMBER]. Website: https://tblnt.com. Privacy policy: https://tblnt.com/legal/privacy.

After approval, enable the seven APIs on the basic-setup page: Google My Business API, My Business Account Management, My Business Business Information, My Business Notifications, My Business Verifications, My Business Place Actions, My Business Lodging (https://developers.google.com/my-business/content/basic-setup). There is no sandbox.

### 3.4 The founder-specific blocker and two workarounds

Tablenote has no verified Business Profile, so it has no 60-day-old profile to apply with, and Zay's current Gmail address is not a business-domain email.

| Workaround | What to do | Timing |
|---|---|---|
| A. Create Tablenote's own profile now | Create and verify a Business Profile for Tablenote at the [CITY] address. The 60-day clock starts after verification, and verification itself can take days to weeks. Also gives demo cards a safe Place ID to open. | 60 or more days after verification |
| B. Apply through a pilot restaurant | The first pilot restaurant adds Tablenote's Workspace email as **Manager** on its already-verified profile. If that profile is 60 or more days old and its website is live, it qualifies immediately. Google's prerequisite says owner or manager, and that the profile can "belong to one of the clients they manage" (https://developers.google.com/my-business/content/prereqs). Unofficial reports say applications from a manager-level account sometimes get bounced (unverified). Apply as Manager first; only if Google rejects the application on that ground, consider asking for Owner under the conditions below. | As soon as a pilot restaurant signs |

Do both. Email: buy Google Workspace Business Starter on tblnt.com. One seat. The pricing page (https://workspace.google.com/pricing, fetched 2026-09-05; this figure is not in the research files, re-check before paying) showed $7.00 per user per month on the annual plan, with a promotion of 30 percent off for three months ($4.90 per user per month) for new customers between Sep 19 and Dec 19, 2026. The same address must be the Cloud project owner, the Manager on every client profile, the contact on the API form, and a Search Console owner of tblnt.com.

**If Owner access is ever requested.** Default is Manager. An Owner (or Primary owner) can delete the profile, add and remove other owners and managers, and transfer primary ownership; a Manager cannot (https://support.google.com/business/answer/3403100). A pilot restaurant on a free trial is being asked to hand that power to a vendor on the strength of unofficial reports, so do not ask for it unless Google actually bounces a Manager-level application. If it comes to that, the request goes in writing and the pilot authorization (doc 05, pilot agreement) gets this paragraph: Tablenote will hold Owner access only to satisfy Google's API application requirement; it will use the access only to read reviews and account or location identifiers; it will not edit the profile, reply to reviews, add or remove users, or transfer ownership; and the restaurant removes Tablenote, or downgrades it to Manager, on the day the pilot ends or the API is approved, whichever is first. The owner keeps Primary owner at all times.

### 3.5 OAuth and sensitive-scope verification

- The APIs reject API keys. They need OAuth 2.0 with scope `https://www.googleapis.com/auth/business.manage` (https://developers.google.com/my-business/content/basic-setup).
- Google does not publish a per-scope sensitivity list; the classification appears in the Cloud Console scope picker. Treat `business.manage` as Sensitive (likely, unverified) and confirm in the console. It is not on the Restricted list, so no third-party security assessment is needed (https://support.google.com/cloud/answer/13464321).
- Sensitive-scope verification needs: domain ownership in Search Console, a privacy policy on the same domain linked from the consent screen, a demo video of the consent flow, and a written justification per scope. "The sensitive scope verification process typically takes 3-5 business days" (https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification).
- Unverified apps in production are capped at 100 new users in total (https://support.google.com/cloud/answer/7454865).
- Testing mode: up to 100 test users, and test-user authorizations expire seven days after consent (https://support.google.com/cloud/answer/15549945). That is workable for one founder account re-consenting weekly during a pilot. It is not workable for restaurant owners.

### 3.6 Two access patterns

| Pattern | Who signs in | Restaurant does | Trade-offs |
|---|---|---|---|
| A. Owner OAuth | The owner, on tblnt.com | Clicks Connect Google, grants `business.manage` | Cleanest consent, revocable. Needs a verified consent screen. Token dies if the owner changes password or leaves. |
| B. Manager access (pilot default) | Tablenote's Workspace account | Adds Tablenote as Manager | One token for all clients. Managers "have mostly the same access to the profile as owners" except adding or removing users or deleting the profile. New managers wait 7 days only for deleting the profile, removing other managers, or transferring primary ownership; Google documents no hold on reading reviews (https://support.google.com/business/answer/3403100). Exposes Tablenote's account to policy trouble on any client profile. |

Sequence: run the pilot on B with the founder's token, submit sensitive-scope verification in parallel, and offer A on the website only after the app is In production and verified.

### 3.7 Quotas and timeline

Approved projects get 300 QPM for most Business Profile APIs; increases are denied unless the project consistently hits the limit (https://developers.google.com/my-business/content/limits). At 50 reviews per page this is far more than a local pilot needs.

| Step | Time | Source |
|---|---|---|
| Verify Tablenote's own profile | Days to weeks (unverified estimate) | research/google_review_mechanics.md gap-fill section 3 |
| 60-day profile age | 60 days after verification, or 0 days via a pilot restaurant | https://developers.google.com/my-business/content/prereqs |
| API access review | "Requests are reviewed within 14 days" per Google; third-party reports 7 to 10 business days typical, outliers 4 days to 6 weeks | https://developers.google.com/my-business/content/faq ; https://xovionlabs.com/blog/google-business-profile-api-hidden-gate/ |
| Sensitive-scope verification | 3 to 5 business days | https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification |

Plan on the API not being usable for the first two or three monthly reports. Section 4 covers the bridge.

### 3.8 Zero-code fallback

As a Manager, Zay can read reviews in the Business Profile dashboard and paste them into the report tooling by hand each month. This is the standard data path for every pilot and paying restaurant until the API is approved, not just a fallback: slower, but fully within Google's rules for a 5 to 10 restaurant pilot (research/policy_legal.md section 5.2). At about 40 new reviews per restaurant per month it is 10 to 20 minutes of copying per restaurant (assumption). Also as a Manager, turning on "Customer activity" notifications (Business Profile > More > Notifications) sends a "New review" email per review; useful for 1-star alerts and as a completeness check, not as a data source (https://support.google.com/business/answer/7198436).

---

## 4. Fallback data sources

Policy, stated once and used in doc 05 section 9D and doc 07 Week 4 as well: Tablenote does not scrape Google Maps for a pilot or paying restaurant. Every restaurant's data comes from Manager access (manual copy from the Business Profile dashboard, section 3.8) until the Business Profile API is approved, then from the API. The scrapers below are documented only as an emergency fallback: used only if Manager access is lost or the API errors for two nights in a row, only for a restaurant that signed the authorization, with reviewer names and photos stripped on ingest, and never from a Google account or Cloud project that also calls the Places API.

All four re-implement Google Maps' undocumented endpoints and break when Google changes markup. Prices verified on vendor pages 2026-09-04.

| Provider | Input | Newest-first and date cutoff | Price | Limits | Terms-of-service posture |
|---|---|---|---|---|---|
| Apify, compass/google-maps-reviews-scraper | `placeIds[]` (27-char ChIJ/GhIJ) or Maps URLs | `reviewsSort=newest`, `reviewsStartDate` | $0.0006 per review on Free ($0.60 per 1,000), $0.00045 on Starter $19/month, plus $0.00005 per actor start. Free plan gives $5 credit renewed monthly, no card required. https://apify.com/compass/google-maps-reviews-scraper ; https://apify.com/pricing | 5 concurrent runs on Free; unnamed datasets expire after 7 days. The status page showed 99.86 percent 90-day uptime for Actors when fetched on 2026-09-05 (https://status.apify.com/); the research gap-fill found no published uptime history for the Google Maps reviews actor itself, so treat this as platform-wide, not actor-specific | Input schema has a `personalData` toggle with a GDPR warning; readme assigns legal responsibility to the user |
| Outscraper Google Maps Reviews API | query, URL, Google ID or Place ID | `sort=newest`, `cutoff` timestamp | Free for the first 500 reviews, $3 per 1,000 from 501 to 100,000, $1 per 1,000 after. Tiers reset every 30 days. https://outscraper.com/pricing/ | About 20 queries per second, 25 queries per batch (https://outscraper.com/faq/). No uptime figure obtained. | Standard scraper terms |
| DataForSEO Google Reviews API | `keyword`, `place_id` or `cid` | `sort_by=newest`; task-based (POST then poll) | $0.00075 per 10 reviews standard ($75 per 1M), $0.0015 per 10 priority. Minimum deposit $50. https://dataforseo.com/pricing/business-data/google-reviews-api ; https://dataforseo.com/pricing | Depth max 4,490 per task; 100 tasks per POST; results kept 30 days (https://docs.dataforseo.com/v3/business_data-google-reviews-task_post/) | Standard scraper terms |
| SerpApi Google Maps Reviews | `place_id` or `data_id` | `sort_by=newestFirst`; first page always 8 results, later pages 1 to 20 | Free 250 searches/month, Starter $25 per 1,000, Developer $75 per 5,000, Production $150 per 15,000. Each page is one search. https://serpapi.com/pricing ; https://serpapi.com/google-maps-reviews-api | Contributor endpoint was recently capped at 200 results after a Google change | "U.S. Legal Shield" up to $2 million applies to Production and above, not Free, Starter or Developer (https://serpapi.com/legal) |

Cost per restaurant: a one-time backfill of 1,000 reviews costs $0.60 on Apify Free, $0 to $1.50 on Outscraper (depends on how many restaurants share the 500-free window), $0.075 on DataForSEO, and about 50 searches on SerpApi. A monthly delta of 40 reviews is $0.02 on Apify, $0 to $0.12 on Outscraper, $0.003 on DataForSEO. Data cost is negligible against $50 per month on every provider; choose on reliability and legal posture (research/google_review_mechanics.md section 4).

The legal problem: the current Google Maps Platform Terms (last modified August 26, 2026), section 3.2.3(a) "No Scraping", bar the Customer from "export, extract, or otherwise scrape Google Maps Content", including "copy and save business names, addresses, or user reviews" (https://cloud.google.com/maps-platform/terms). Those Terms bind any Maps Platform customer, so calling the Places API from the same Google account that also scrapes puts the whole Maps Platform account at risk. Scrapers also collect reviewer names and photos. hiQ v. LinkedIn lowered CFAA risk for public data but hiQ still lost on breach of contract (https://thunderbit.com/blog/is-scraping-google-maps-legal). The realistic consequence for a small operator is a silently broken pipeline, not a lawsuit.

Recommendation:

| Situation | Use |
|---|---|
| Pilot and first paying restaurants, API access pending | Manager access plus manual copy (section 3.8). No scraper. If the restaurant count outgrows manual copy before the API is approved, that is the signal to push the API application, not to start scraping. |
| API approved and the restaurant has granted access | The Business Profile API. Migrate each restaurant the day it connects. |
| Emergency only: Manager access removed or API failing two nights in a row | Outscraper (free 500 per 30 days) with Apify Free as the second provider, `personalData: false` on Apify and reviewer identities stripped on ingest. Run from an account with no Places API usage. Log the incident, tell the owner, and stop the moment access is restored. |
| Nightly scraper job at 20 to 100 restaurants | Not adopted. Listed here only because the research costed it (DataForSEO would be cheapest). It conflicts with the Maps Platform Terms quoted above and with the policy in doc 05 section 9D. |
| SerpApi "U.S. Legal Shield" at $150 per month | Not adopted. Only revisit if the API path stalls for months and counsel agrees. |

---

## 5. The monthly pipeline

### 5.1 Architecture

```
[Card tap] tblnt.com/r/<slug>?s=card --302--> search.google.com/local/writereview?placeid=...
     |
     +--> tap event (slug, ts, ua, source) --> TAP_WEBHOOK_URL --> taps table

[Nightly once the API is approved; until then, manual copy from the dashboard before each report]
  Source 1  GBP Reviews API (Manager token or owner OAuth)
            GET .../reviews?pageSize=50&orderBy=updateTime desc, stop one page past last sync
  Source 1b Manual copy from the Business Profile dashboard as Manager (section 3.8), pasted into the same raw_reviews shape
  Source 2  Scraper (Outscraper / Apify), sort newest, cutoff = last sync
            emergency only (section 4), never in the same account as Source 3
  Source 3  Places Place Details fields=id,rating,userRatingCount (monthly sanity check, free tier)
  Source 4  "New review" emails to the Manager account (alerts and completeness only)
     |
     v
  raw_reviews (30-day cache)  --dedupe, strip translation markers-->  normalized reviews

[Monthly, in the first week of the month: target the 3rd to 5th]
  Pass 1  LLM extracts structured facts per review (JSON)
  Code    aggregates facts into summary metrics; joins taps by restaurant slug and weekday
  Pass 2  LLM writes the narrative from metrics + last month's stored metrics
  Human   Zay reviews and edits
  Render  HTML report -> PDF (same components as /sample-report)
  Email   PDF + summary to the owner; store the report and the metrics
  Purge   raw review text and reviewer names older than 30 days
```

### 5.2 Steps

1. **Pull.** Nightly, per location: `reviews.list` ordered by `updateTime desc`, page size 50, stopping one page past the last sync time; once a week a full re-list to catch edits and removals. Store `reviewId`, stars, comment, both timestamps, the reply, `isAnonymous`, and (30 days only) `displayName`. Keep `ignoreRatingOnlyReviews=false`. Google does not say whether an owner reply bumps `updateTime`, so treat a row as changed when stars, comment hash, reply hash or either timestamp differs. Rows copied by hand from the dashboard are marked `source=manual` and carry the stars, text, reply and the date shown. In the emergency scraper case only, run the same job with `sort=newest` and `cutoff=last sync`, marked `source=scrape`.

2. **Dedupe.** API rows dedupe on `reviewId`. Scraper rows never carry it, so match on (location, reviewer name, stars, `createTime` rounded to the minute, first 64 characters of text); rating-only reviews match on (name, stars, date). An API match overwrites the scrape row and keeps the `reviewId`. Any `reviewId` absent from a full re-list gets `removed_at`; monthly counts use "visible at month end", and taps-to-reviews conversion uses `createTime`. Reviews Google blocks at submission never appear anywhere; Google's 2025 Trust and Safety report says 292 million policy-violating reviews were blocked or removed in 2025 (https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/, via research/policy_legal.md). So taps will always exceed visible new reviews.

3. **Strip translation markers.** Foreign-language reviews arrive with both "(Translated by Google)" and "(Original)" blocks in varying order; an undocumented `Accept-Language` header sets the translation language (https://ambience.sk/google-business-profiles-api-reviews-without-translation/). Split on the markers, keep the English block as `text`, the original as `text_original`, and record `language`, before anything reaches the model.

4. **Pass 1: extract facts per review.** One call per batch, strict JSON per review: stars, visit context if stated, themes with sentiment (food, service, atmosphere, wait, noise, value, cleanliness), dishes with sentiment, person mentions with role guess and sentiment, complaints with a one-line quote, printable praise quotes, and whether the owner replied. Match person mentions against the roster; unmatched names go to a "possible staff mentions" list for the owner. Rating-only reviews skip this pass.

5. **Aggregate in code, not in the model.** Counts by star, theme and dish mentions with sentiment, staff mentions by first name, top complaints, reply rate, taps by weekday, taps versus new reviews. This produces the `summary`, `themes`, `dishes`, `staff` and `trend` shapes in `site/data/sampleReport.ts`. Deltas come from last month's stored metrics. Cross-check the month's count against the Places `userRatingCount` delta and flag gaps.

6. **Pass 2: write the report.** One call with the aggregates, last month's metrics, the printable quotes and the roster. Output fills the rest of the sample shape: `headline`, `wins`, `issues` with severity and a concrete action, `recommendations`, and `repliesToWrite` for 1 to 3 star reviews. Instruct the model to quote rather than characterize, to use "guests mentioned" language, and never to rank or score staff.

7. **Human review.** Zay reads every report before it goes out. Checklist: numbers match the aggregate table; no reviewer names; the staff section uses the section 6 wording; every named dish or person appears in pass-1 output; draft replies contain no personal information and no promises the restaurant did not make; the disclaimer is present. Budget 15 to 20 minutes of QA per report (assumption, matching docs 05 and 06); at 100 restaurants that is 25 to 33 hours a month, the real cost of this step.

8. **PDF.** Render the report with the existing `components/report` components in a print route and export with Playwright, which the repo already uses for `scripts/export-print.mjs`. Letter size. Fallback: PDFShift, free for 50 credits per month, $9 for 500 (https://pdfshift.io/pricing).

9. **Email.** Send the PDF plus a five-line summary to the owner's address on file. Resend Free covers 3,000 emails per month, limited to 100 per day (https://resend.com/pricing). Deliver in the first week of the month, targeting the 3rd to 5th, not the 1st, because Google's own moderation can lag by days (https://support.google.com/business/answer/4596773 says evaluation of flagged reviews "typically takes several days"). Customer-facing wording everywhere is "in the first week of each month"; the internal target is the 3rd to 5th. Doc 07 Week 4 already says 3rd to 5th. Still to align to "in the first week of each month": `site/data/faq.ts` (answers at lines 55, 111 and 126), `site/app/(site)/how-it-works/page.tsx` (lines 56 and 134), `site/components/ReportPreview.tsx` (line 24), the Configurator (line 394), the order success page step 5, and doc 05 lines 141 and 426. While there is no dashboard, those same site strings should say replacement requests and questions go "by replying to any report email", not "from your dashboard".

10. **Purge and store.** Delete raw review text, reviewer names and photos older than 30 calendar days. Keep the report, the summary metrics, and the short quotes that were actually printed. Business Profile API content "must be stored temporarily for no more than 30 calendar days" and "cannot be manipulated or aggregated in any way"; the report is the deliverable the API policy allows a third party to produce for a listing it is authorized on (https://developers.google.com/my-business/content/policies). Whether an AI summary counts as "aggregation" is an open question for counsel; the conservative design above keeps raw content ephemeral. Never build cross-restaurant benchmarks from API content.

### 5.3 First-month baseline

The baseline must come from the same source as the current month or the delta is meaningless (manual copy, scrapers and the API differ on translated text, anonymous reviewers and removed reviews). On the first API-backed month, re-pull the previous month from the API too and compute "vs last month" API-to-API. For the first report, the 12-month narrative comes from the dashboard as Manager (copy the last 12 months once at onboarding) or from the API once approved; no scraper backfill, per section 4.

### 5.4 AI cost

Claude API list prices (https://platform.claude.com/docs/en/about-claude/pricing, fetched 2026-09-04): Opus 5 $5 input / $25 output per million tokens, Sonnet 5 $2 / $10, Haiku 4.5 $1 / $5; the Batch API halves both. Assuming about 135 tokens per review plus roughly 4,100 tokens of fixed input and 3,000 tokens of output, a single pass at 100 reviews costs about $0.033 on Haiku 4.5, $0.065 on Sonnet 5, and $0.163 on Opus 5. The two-pass design roughly doubles that.

Planning figure: **$0.30 per restaurant-month** (Opus 5, about 100 reviews, two passes, no batch discount). That is 0.6 percent of the $50 price. At 100 restaurants, $30 per month (research/unit_economics.md section 1.1). Reports are not latency-sensitive, so the Batch API is a free halving once volume justifies the plumbing. A 90-day baseline report on several hundred reviews will cost a few times more once; budget it, it is still under $2.

Use the API tier only, never a consumer chat product. Anthropic deletes API inputs and outputs within 30 days absent a zero-retention agreement, does not train on customer content, and incorporates its Data Processing Addendum into the commercial terms (https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data ; https://www.anthropic.com/legal/commercial-terms). That 30-day default fits inside Google's 30-day cap. Name the provider in the privacy policy and the restaurant agreement.

---

## 6. Privacy and HR-safe wording

### 6.1 Reviewer names

Do not print reviewer display names or photos in the report. Write "a 4-star reviewer (Aug 12)" and the quote. It adds nothing analytically, and it avoids re-publishing an identity into a document that gets forwarded around a restaurant. Keep `reviewId` and `displayName` in the 30-day cache only. If a reviewer asks to be removed, purge the cache, redact stored reports, and confirm in writing within 30 days (research/policy_legal.md gap-fill section 6). Public review content is excluded from "personal information" under CCPA (https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1798.140.&lawCode=CIV) and Virginia's CDPA (https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-575/), and neither law's thresholds apply at Tablenote's size; the rule above stands regardless.

Quoting reviews inside the client's own report is internal analysis. Quoting them on the restaurant's website or in ads needs the reviewer's consent (https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/).

Tap logs: keep timestamp, slug and coarse device family. Drop or hash the IP. Rotate at 30 days. Cover the redirect in the privacy policy and print the domain on the card (research/policy_legal.md gap-fill section 2).

### 6.2 Staff mentions

Google bars merchants from "requesting that staff solicit reviews that include specific content, including content that identifies a staff member" and from staff quotas (https://support.google.com/contributionpolicy/answer/7400114; first observed on or about April 17, 2026, https://www.seroundtable.com/google-reviews-policy-staff-mentions-solicitations-41175.html). It does not bar a restaurant from reading what guests wrote unprompted. So the feature is "the times guests mention your team on their own", never "find out which servers earn 5 stars". No per-server slugs, leaderboards, scores or trends.

State the accuracy limits: first names collide with dishes and places, nicknames and misspellings, guests naming another guest, translated reviews, rating-only reviews with no text. Report "based on N reviews that mentioned a person"; never rank staff on fewer than about 5 mentions; surface negative mentions only as a private note to the owner.

The employment risks are real: discipline based on unverified reviews, NLRA protected concerted activity if a "review" is really a staff complaint, tip or pay deductions tied to reviews (https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa), and Illinois's AI-in-employment notice law in force since Jan 1, 2026 (https://natlawreview.com/article/illinois-anti-discrimination-law-address-ai-goes-effect-1-january-2026). Position the report as a guest-experience report, not a performance tool.

### 6.3 Boilerplate (from research/policy_legal.md section 3.3)

Section title: "Guest comments that mention team members" (not "Server performance" or "Staff rankings"). Present counts and verbatim quotes: "Guests mentioned 'Maria' in 6 reviews this month (5 positive, 1 negative). Sample: '...'"

Standing disclaimer printed on every report:

> "This section summarizes public guest comments on Google. Reviews are unverified, may be mistaken about who served the table, and are not an assessment of any employee's performance. Please verify with your own observations and your HR process before taking any personnel action. This report should not be used to determine pay, tips, scheduling, or discipline."

Written notice the restaurant gives its staff at onboarding:

> "We use a service that reads our public Google reviews and produces a monthly summary. Guest comments that mention team members by name are included so we can share praise and address service issues. This summary is not used to set pay or tips and is never the sole basis for discipline."

Offer an opt-out toggle: "Redact staff names in my report". Put a covenant in the restaurant agreement that the report will not be used for pay, tip or discipline decisions.

Note on the sample report: `site/data/sampleReport.ts` uses a `staff` section with counts and notes. Keep the counts and quotes; rename the section heading to the wording above, add the disclaimer, and drop any "third month running" style trend framing before a real report ships.

---

## 7. What to build next

The website ships a sample report from static data. Nothing below exists yet.

| Component | What it does | Notes |
|---|---|---|
| Database | Restaurants, locations (accountId, locationId, Place ID), card slugs, taps, raw_reviews (30-day TTL), monthly_metrics, reports, replacement allowance, staff roster and redaction flag | Supabase Free $0 (paused after a week idle) or Pro $25 per month (https://supabase.com/pricing). `links.json` can stay as the redirect source until slugs live in the database. |
| Tap ingest | Endpoint or webhook target for `TAP_WEBHOOK_URL` that writes to the taps table | Today taps are only forwarded or logged (`site/lib/taps.ts`). |
| GBP API client | OAuth client for `business.manage`, token storage encrypted at rest, account and location discovery, `reviews.list` sync with the stop-one-page-past rule and weekly full re-list | Pattern B first; add the "Connect Google" button for pattern A after OAuth verification. |
| Manual-copy intake | A paste form or CSV template that writes dashboard reviews into `raw_reviews` with `source=manual` | The standard path until the API is approved (section 3.8). Build this before anything scraper-related. |
| Scraper adapter | Outscraper and Apify behind one interface with the dedupe key from section 5.2 | Emergency fallback only (section 4). Lowest priority; do not build for the pilot. |
| Normalizer | Translation-marker split, language tag, removed_at handling | Section 5.2 step 3. |
| Pass 1 and pass 2 jobs | Anthropic API calls with JSON schemas; batch mode later | Section 5.2 steps 4 and 6. |
| Aggregator | Code that produces the `SAMPLE_REPORT` shape from pass-1 output plus taps | Section 5.2 step 5. |
| Report renderer and PDF | Print route using `components/report`, Playwright export, letter size | The one-pager exporter in `scripts/export-print.mjs` is the pattern. |
| Review queue | A page where Zay approves or edits each report before sending | Section 5.2 step 7. |
| Email delivery | Resend (or similar) with the PDF attached and a plain-text summary | Section 5.2 step 9. |
| Monthly scheduler | Cron on the 3rd of the month (delivery window 3rd to 5th) plus nightly sync | Vercel Pro includes cron jobs at $20 per month (https://vercel.com/pricing). |
| Link health checker | Daily GET per destination with a mobile UA; alert on a bad redirect | Section 1.5. |
| Place ID refresh | Yearly IDs-only Place Details call per location | https://developers.google.com/maps/documentation/places/web-service/place-id |
| 1-star alerts | Notifications API `NEW_REVIEW` via Pub/Sub after API approval; Manager-account email parser before | https://developers.google.com/my-business/content/notification-setup |
| Owner dashboard | Taps by weekday and time of day, report archive, staff-name toggle, replacement-card request, cancel link | Not needed for the pilot; email the PDF. Until it exists, replacement requests and questions come in by replying to any report email, and the site copy must say so rather than "from your dashboard". |
| Slug in checkout | Add the Configurator-generated slug to the Stripe Checkout `metadata` in `site/app/api/checkout/route.ts` and to the order confirmation email, so the slug the customer saw on the proof preview is the one added to `links.json` before proof approval | Small change; do it before the first paid order. Until then the section 2 checklist records the slug by hand. |
| Per-table slugs (later, optional) | A variable-data mode in `scripts/export-cards.mjs` that takes one URL per card and emits one back-side artwork per card, plus a per-card spreadsheet for the vendor's encoding service | Not planned for launch. Only if a restaurant asks for taps by table, and only after checking it adds nothing that looks like per-server tracking (section 6). |
| Purge job | Delete raw content older than 30 days; redact quotes from removed reviews | Section 5.2 step 10. |

Order of work for a first paying restaurant: database and tap ingest, Manager-access sync (or manual copy), normalizer, pass 1 and aggregator, pass 2, renderer, review queue, email, purge. The link health checker and Place ID refresh are an afternoon each and protect every card in the field.

---

## Sources

Google policy, help and APIs
- Maps user-contributed content policy: https://support.google.com/contributionpolicy/answer/7400114
- Get reviews on Google: https://support.google.com/business/answer/3474122
- Create a review link or QR code: https://support.google.com/business/answer/16816815
- Owners and managers: https://support.google.com/business/answer/3403100
- Manage notifications: https://support.google.com/business/answer/7198436
- Request ownership of a profile: https://support.google.com/business/answer/4566671
- Flagged review evaluation timing: https://support.google.com/business/answer/4596773
- Add reviews on Maps (sign-in required): https://support.google.com/maps/answer/6230175
- GBP API prerequisites: https://developers.google.com/my-business/content/prereqs
- GBP API FAQ: https://developers.google.com/my-business/content/faq
- GBP API basic setup: https://developers.google.com/my-business/content/basic-setup
- GBP API pricing: https://developers.google.com/my-business/content/pricing
- GBP API quotas: https://developers.google.com/my-business/content/limits
- GBP API policies (30-day storage): https://developers.google.com/my-business/content/policies
- GBP API review data guide: https://developers.google.com/my-business/content/review-data
- reviews.list reference: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
- Review resource: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews
- Deprecation schedule: https://developers.google.com/my-business/content/sunset-dates
- Notifications setup: https://developers.google.com/my-business/content/notification-setup
- API access form: https://support.google.com/business/contact/api_default
- Sensitive-scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
- Unverified apps and 100-user cap: https://support.google.com/cloud/answer/7454865
- OAuth publishing status and test users: https://support.google.com/cloud/answer/15549945
- Restricted scopes list: https://support.google.com/cloud/answer/13464321
- Places resource (5-review max): https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
- Maps Platform pricing: https://developers.google.com/maps/billing-and-pricing/pricing
- Place IDs: https://developers.google.com/maps/documentation/places/web-service/place-id
- Place ID Finder: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
- Maps Platform Terms (No Scraping, 3.2.3(a)): https://cloud.google.com/maps-platform/terms
- Android NFC (Android 16/17 link handling): https://developer.android.com/develop/connectivity/nfc/nfc
- Chrome sign-in: https://support.google.com/chrome/answer/185277
- Google Workspace pricing (fetched 2026-09-05; not yet in research/): https://workspace.google.com/pricing
- Customer reviews brand use case: https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/

Policy reporting and practitioners
- Search Engine Roundtable, Apr 17 2026 additions: https://www.seroundtable.com/google-reviews-policy-staff-mentions-solicitations-41175.html
- PPC Land, Trust and Safety numbers: https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/
- Whitespark, why reviews get filtered: https://whitespark.ca/blog/google-remove-reviews/
- Ambience, translated review text: https://ambience.sk/google-business-profiles-api-reviews-without-translation/
- Xovion Labs, approval experience: https://xovionlabs.com/blog/google-business-profile-api-hidden-gate/
- Slashpost, form contents: https://slashpost.ai/blogs/google-business-profile/google-business-profile-api-documentation-2026
- TrueReview, link guide: https://www.truereview.co/post/how-to-find-google-review-link
- Wiserreview: https://wiserreview.com/blog/google-review-link/
- WP Social Ninja (button names): https://wpsocialninja.com/google-review-link-generator/
- Favecard (missing button): https://www.favecard.co/en/blog/google-review-link/
- Clickgrow (broken links): https://www.clickgrow.ai/blog/how-to-get-google-review-link/
- Locafy (302 vs 301): https://www.locafy.com/blog/google-reviews-link-generator
- Thunderbit, scraping legality: https://thunderbit.com/blog/is-scraping-google-maps-legal

Data providers
- Apify actor: https://apify.com/compass/google-maps-reviews-scraper ; pricing: https://apify.com/pricing ; status (fetched 2026-09-05; platform-wide figure, not in research/): https://status.apify.com/
- Outscraper pricing: https://outscraper.com/pricing/ ; FAQ: https://outscraper.com/faq/
- DataForSEO pricing: https://dataforseo.com/pricing/business-data/google-reviews-api ; minimum: https://dataforseo.com/pricing ; docs: https://docs.dataforseo.com/v3/business_data-google-reviews-task_post/
- SerpApi pricing: https://serpapi.com/pricing ; reviews API: https://serpapi.com/google-maps-reviews-api ; legal shield: https://serpapi.com/legal

Costs and infrastructure
- Anthropic pricing: https://platform.claude.com/docs/en/about-claude/pricing
- Anthropic retention: https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data ; commercial terms: https://www.anthropic.com/legal/commercial-terms
- Supabase: https://supabase.com/pricing
- Resend: https://resend.com/pricing
- PDFShift: https://pdfshift.io/pricing
- Vercel: https://vercel.com/pricing
- StatCounter US mobile OS (in research) and browsers (fetched 2026-09-05; not yet in research/): https://gs.statcounter.com/os-market-share/mobile/united-states-of-america ; https://gs.statcounter.com/browser-market-share/mobile/united-states-of-america
- Android version distribution: https://apilevels.com/

Privacy and employment
- CCPA definitions: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1798.140.&lawCode=CIV
- Virginia CDPA definitions: https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-575/
- DOL tipped employees: https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa
- Illinois HB 3773: https://natlawreview.com/article/illinois-anti-discrimination-law-address-ai-goes-effect-1-january-2026

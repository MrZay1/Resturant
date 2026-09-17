# Research: google_review_mechanics

_Generated 2026-09-04 by a research workflow. Fact-check verdicts and gap-fill findings are appended below the main report._

# Google Review Mechanics for an NFC "Tap to Review" Card + Monthly AI Review Report (as of 2026-09-04)

## 0. Executive summary (what to build)

1. **Card payload:** encode ONE plain `https://` URL on the NFC chip and print the same URL as a QR code on the card. The URL must be the founder's own short link (e.g. `https://brand.link/r/<card-token>`), which 302-redirects to Google's write-a-review URL for that restaurant. Never hard-code the Google URL on the chip: you lose tap counting and the ability to re-point the card if the Place ID changes or the profile is merged/suspended.
2. **Google destination:** `https://search.google.com/local/writereview?placeid=<PLACE_ID>`. Google's own "Get more reviews" short link (`https://g.page/r/<code>/review`) is just a 302 to that same URL; I verified this empirically (see 1.2).
3. **Guest experience reality:** Google requires the guest to be signed in to a Google Account to post a review; if not signed in, the link 302s to `accounts.google.com/ServiceLogin?continue=<review URL>` (verified). The link is *not* a documented Google Maps app deep link, so on phones it opens in the default browser (Safari/Chrome) and shows the star-rating dialog there. Test on real iPhones and Androids before printing anything.
4. **Policy:** Google's Maps user-generated content policy (updated Feb 20, 2026 and Apr 17, 2026) now explicitly bans review kiosks/shared devices, pressuring guests to review "while on the premises", staff quotas, and asking for reviews that name a staff member. A card dropped with the check is a passive invitation on the guest's own device, which is the pattern Google explicitly still allows ("Use a QR code that links directly to your Google review page, placed in your physical location"), but card wording and server scripts must be neutral: no incentives, no "mention your server", no quotas, no gating.
5. **Monthly review pull (primary):** the official Google Business Profile Reviews API (`mybusiness.googleapis.com/v4/accounts/{a}/locations/{l}/reviews`, pageSize 50, `orderBy=updateTime desc`). It returns every review with reviewer display name (unless anonymous), star rating, text, owner reply, createTime/updateTime. It requires (a) a one-time Google approval of the founder's Cloud project ("Application for Basic API Access", 60-day-old verified profile + website; Google's FAQ says reviewed within 14 days), (b) OAuth verification for the sensitive `business.manage` scope (3-5 business days), and (c) the restaurant either OAuth-consenting to the founder's app or adding the founder's Google account as a **Manager** on the profile.
6. **Fallback:** a third-party scraper with a date cutoff (Outscraper: first 500 reviews free then $3/1,000; Apify compass actor: $0.60/1,000 on Free, $0.45/1,000 on the $19 Starter plan; DataForSEO: $0.075/1,000 standard queue, $50 minimum deposit; SerpApi: $25/month for 1,000 searches with 8 reviews per first page). Scrapers contradict Google Maps Platform's "No Scraping" clause and collect personal data, so treat them as a bridge (during the approval wait, and as a backup if the API breaks), not the foundation.
7. **Tertiary/sanity check:** Places API (New) Place Details with `rating`, `userRatingCount` (Pro SKU, $17/1,000, 5,000 free/month) for the monthly review count and average; the `reviews` field there returns max 5 reviews and costs $25/1,000 (Enterprise + Atmosphere), so it cannot feed the report.

---

## 1. Sending a phone straight to the "write a review" screen

### 1.1 The two link formats

| Format | Example | Where it comes from | Notes |
|---|---|---|---|
| Place-ID link | `https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4` | Anyone can construct it from a Place ID; no profile access needed | Opens the write-a-review dialog directly (wiserreview.com; truereview.co) |
| GBP short link | `https://g.page/r/CTW9H70cPgDuEBM/review` | Only the profile owner/manager can see it, via "Get more reviews / Ask for reviews / Share review form" in Search, Maps or business.google.com | Permanent; Google also generates a QR code on the same screen (wiremo.co; favecard.co; Google help 16816815) |

**Empirical check (2026-09-04):** fetching `https://g.page/r/CTW9H70cPgDuEBM/review` returned `302 Found` to `https://search.google.com/local/writereview?placeid=ChIJz9AXqSK2qQERNb0fvRw-AO4&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2`. So the two formats are the same destination; the g.page version merely adds Google's own attribution parameters (`source=`, `laa=`). Google itself therefore uses a redirect layer for review links, which is the best evidence that redirecting to the review URL is acceptable.

Do not use `maps.app.goo.gl/...` or a `google.com/maps/place/...` link on the card: those land on the listing, where the guest must still find "Write a review" ("one extra click of friction", truereview.co).

### 1.2 What the guest sees (sign-in, app vs browser, desktop)

- **Sign-in is mandatory.** Google Maps Help: "Sign in to your Google account" is step one for writing a review; reviews are public and anonymous posting is not allowed (support.google.com/maps/answer/6230175). A Google Account does not have to be Gmail; it can be created with any email (Reviewflowz help article). Reviewflowz's conclusion: "The thing that actually stops people leaving a review is... the sign-in screen."
- **Empirical check:** fetching `https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&utm_source=nfc_card&utm_medium=tap` with no Google cookies returned `302 Found` to `https://accounts.google.com/ServiceLogin?continue=https://search.google.com/local/writereview?placeid%3D...%26utm_source%3Dnfc_card%26utm_medium%3Dtap`. Two takeaways: (1) unauthenticated visitors are bounced to sign-in with the review URL as the `continue` target; (2) extra query parameters (UTMs) survive the bounce inside `continue=`, but Google does not surface them anywhere you can measure (see section 6).
- **Desktop:** Firefox issue #16767 (Nov 2020) describes the flow that still applies: the link "will redirect to google sign-in page. On successful authentication, webpage will show a popup where users can rate/review it." Works in Chrome, Firefox desktop, Chrome Android; Firefox Android showed a 404 unless "Request desktop site" was used (marked wontfix).
- **iPhone / Android, app vs browser:** Google's Maps URLs documentation lists only four documented URL actions (search, directions, display map, street view) at `https://www.google.com/maps/...?api=1`, and says those "launch Google Maps in the Maps app" when installed (developers.google.com/maps/documentation/urls/get-started). The `search.google.com/local/writereview` URL is not on that list; Reviewflowz notes "Google doesn't document any app behaviour at all" for it. Practical expectation: an NFC tap or QR scan opens the phone's default browser (Safari on iPhone, Chrome on Android), which shows Google's mobile web review dialog (stars + text box) if the browser session is signed in to Google, otherwise the sign-in page first. Historic caveat: Mike Blumenthal (2016) found the link flaky in Safari because of "Safari's poor handling of redirects", and Reviewflowz cites Birdeye reporting sign-in prompts for already-signed-in users. This is exactly why per-device testing is required before ordering cards.
- **Failure modes:** unverified profiles have no working writereview URL; if the link "redirects to a search page, that means Google can't match your Place ID — usually because your profile was merged, suspended, or moved" (clickgrow.ai). Service-area businesses without an address may not work with the Place ID Finder (reputation.com). Google closed the old URL hacks that pre-selected a star rating; "any link that attempts to pre-fill ratings or review content violates Google's policies" (sociallycheap.com).

### 1.3 How the restaurant owner finds their link (for onboarding)

Google Business Profile Help 16816815: go to business.google.com (or search the business name in Google while signed in as owner/manager), open **Read Reviews** then **Get more reviews**; select **Copy** to copy the link; QR code: "Right-click the QR code. Select Save image as..." and "reviews QR codes can only be generated on a computer browser, not on mobile devices." Google suggests putting the link on receipts, thank-you emails, and "printed and displayed in-store". Button labels rotate between "Get more reviews", "Share review form", and "Ask for reviews" (wpsocialninja.com). Mobile: Google Maps app > profile picture > Your Business Profiles > "Get more reviews" / "Share profile" (wiserreview.com). If the button is missing, the profile is unverified or the wrong account is signed in (favecard.co).

### 1.4 Finding the Place ID (no owner access required)

- **Place ID Finder:** https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder (type the restaurant name, click the pin, copy the `ChIJ...` ID). Google notes it "doesn't allow you to retrieve the place ID of multiple stores at once" (Skeepers). 
- **Places API (New) Text Search / Place Details:** returns `id`; Place Details with only the `id` field is the free "IDs Only" tier (developers.google.com/maps/billing-and-pricing/pricing).
- **Place IDs can change** ("Place IDs may change over time", obsolete if the business closes/moves). Google recommends refreshing IDs older than 12 months, and "You can refresh Place IDs at no charge by making a Place Details request" with only the `id` field (developers.google.com/maps/documentation/places/web-service/place-id). Build a monthly refresh job.
- Place IDs are exempt from the Places API caching restriction, so storing them indefinitely is allowed (Places API policies page).
- Apify's actor accepts only 27-character IDs starting with `ChIJ` or `GhIJ`; some Google IDs are longer (e.g. `Eicx...` address-style IDs), which is one more reason to capture the ID from the owner's own g.page link where possible.

### 1.5 Google's review-solicitation policy as it applies to a table card (2026)

From the Maps user-contributed content policy (support.google.com/contributionpolicy/answer/7400114): businesses may "Solicit or encourage the posting of content that does represent a genuine experience, without offering incentives"; they must not "selectively solicit positive reviews", "Discourage or prohibit negative reviews", offer "payment, discounts, free goods and/or services", nor "require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included"; and (added Apr 17, 2026 per Search Engine Roundtable) "Merchants requesting that staff solicit a certain number of reviews" and "Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member" are prohibited. Coverage of the Feb 20, 2026 change says shared tablets/kiosks are now explicitly a violation and Google's automated enforcement removes reviews silently; one agency reported three locations disappearing from Maps after running an in-shop kiosk (launchcodex.com; kukui.com). Google's 2025 Trust & Safety report cites 292 million policy-violating reviews blocked or removed (ppc.land).

Implications for the product:
- Card copy: "Tap to review us on Google" is fine. Avoid "Leave us 5 stars", "Mention your server", "Show this review for a free dessert".
- Staff training in the onboarding kit: drop the card, do not stand over the guest, no quotas, no leaderboards, no naming.
- Never route unhappy guests to a private form instead of Google (review gating). One destination for everyone.
- The monthly report can still analyze which servers are praised by name (guests naming staff unprompted is allowed); the restaurant must not *ask* guests to name staff.
- Make this policy summary part of the restaurant agreement so the founder is not blamed for suspensions.

---

## 2. Reading reviews programmatically: Google Business Profile (GBP) APIs

### 2.1 Which API, and is it still alive?

Reviews live on the legacy host `https://mybusiness.googleapis.com/v4/...` ("Google My Business API" in the Cloud API Library); they were never migrated to a v1 service. Google's deprecation schedule (last updated Aug 28, 2026) lists Q&A (discontinued Nov 3, 2025), Business Calls, Insights and health-provider methods, but **not** reviews; the v4 reference was updated to expose policy-violation reasons for rejected replies, i.e. it is still maintained (developers.google.com/my-business/content/sunset-dates; slashpost.ai May 2026 guide).

Endpoints (developers.google.com/my-business/content/review-data and the v4 reference):
- `GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews` — query params `pageSize` ("The maximum pageSize is 50"), `pageToken`, `orderBy` ("rating", "rating desc", "updateTime desc"). Response: `reviews[]`, `averageRating`, `totalReviewCount`, `nextPageToken`.
- `POST .../accounts/{accountId}/locations:batchGetReviews` (multi-location; `locationNames`, `pageSize`, `pageToken`, `orderBy`, `ignoreRatingOnlyReviews`).
- `PUT .../reviews/{reviewId}/reply` and `DELETE .../reply` (only if the founder later adds "AI-drafted replies").
- To find IDs: `GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts` then `GET https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{accountId}/locations?readMask=name,title` (basic-setup page).

Review resource fields (v4 `accounts.locations.reviews`): `name`, `reviewId` ("The encrypted unique identifier"), `reviewer.displayName` ("Only populated with the reviewer's real name if isAnonymous is false"), `reviewer.profilePhotoUrl`, `reviewer.isAnonymous`, `starRating` (`ONE`..`FIVE`), `comment` ("The body of the review as plain text with markups"), `createTime`, `updateTime` (RFC 3339), `reviewReply.comment` (max 4,096 bytes) and `reviewReply.updateTime`. So yes: full history, name, stars, text, reply, timestamps. Rating-only reviews (no text) are included unless you set `ignoreRatingOnlyReviews`.

Gotcha: for reviews written in another language the `comment` string contains both "(Translated by Google)" and "(Original)" blocks, in varying order; an undocumented `Accept-Language` header controls the translation language (ambience.sk). Strip or split these before sending to the LLM.

### 2.2 Access approval (the gate everyone hits)

Official prerequisites (developers.google.com/my-business/content/prereqs):
- Create a Cloud project; note the **Project Number**.
- Submit the GBP API contact form (`https://support.google.com/business/contact/api_default`), choose **"Application for Basic API Access"**, "provide all requested information", and use "an email address that is listed as an owner/manager on your business's GBP".
- Applicant must "Manage a Google Business Profile that is verified and active for 60+ days" (can be the applicant's own office or a client's), "Have a website representing the business listed on the GBP", and keep the profile "fully complete and kept up-to-date". The FAQ adds: "Use a valid business email address that is tied to your business domain" and "Ensure that the business website is updated and live"; agencies should "Register for a GBP Organization account as an agency".
- Status check: quota **0 QPM = not approved; 300 QPM = approved**. Do not file a quota-increase request while at 0.
- Timing: the FAQ says "Requests are reviewed within 14 days". Third-party reports: 7-10 business days typical, outliers 4 days to 6 weeks (xovionlabs.com; localith.ai: 5-7 business days; testimonial.to: 3-10 business days). Approval is per Cloud project. Blog reports (unofficial) say submitting from a manager-level rather than owner account gets bounced.
- Form content reported by third parties: entity type (agency / software developer / business), company website (live, with privacy policy, matching the email domain), Project Number, contact email, and a written use case (legalclarity.org; slashpost.ai). Suggested use-case text: "We provide a monthly review-analysis report to independent restaurants that authorize us (OAuth or Manager access). We need read access to reviews (Reviews API), account/location listing (Account Management + Business Information APIs) and NEW_REVIEW notifications (Notifications API) for N verified client locations."
- **Founder-specific blocker:** the founder's own business "has no name yet" and no 60-day-old verified GBP. Options: (a) create the founder's GBP now (it will only count after 60 days of verified activity), or (b) apply using a pilot restaurant's profile where the founder has been added as Manager/Owner and use that restaurant's website; Google explicitly allows the qualifying GBP to "belong to one of the clients they manage". Get the domain + website live first because the form checks it.
- After approval, enable all seven APIs listed on the basic-setup page: Google My Business API (reviews), My Business Account Management API, My Business Business Information API, My Business Notifications API, My Business Verifications API, My Business Place Actions API, My Business Lodging API. There is "no Sandbox environment".

### 2.3 OAuth flow and consent-screen verification

- The APIs reject API keys; they require OAuth 2.0 with scope `https://www.googleapis.com/auth/business.manage` (the older `plus.business.manage` is deprecated). One scope covers reviews, account, location and notification APIs (basic-setup page; unified.to).
- `business.manage` is classified **Sensitive**, so a public app must pass Google's sensitive-scope verification: verify domain ownership in Search Console, publish a privacy policy that discloses "the manner in which your application accesses, uses, stores, or shares Google user data", record "a video that fully demonstrates how a user initiates and grants access to the requested scopes", and give "a detailed justification for each requested sensitive scope". "The sensitive scope verification process typically takes 3-5 business days" (developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification). Unverified apps in production are capped at "100 new users in total, after the app presents the unverified app screen" (support.google.com/cloud/answer/7454865). Brand verification reportedly takes 2-3 business days (singhamandeep.com, unofficial).
- For a local pilot (a handful of restaurants) you can run in **Testing** mode with the restaurant owners added as test users, but refresh-token lifetime is limited in testing mode, so verify before charging subscriptions.
- Consent screen must show the real product name/logo; until verified it shows a scary "unverified app" warning and the domain inferred from the redirect URI (unified.to).

### 2.4 Does the restaurant have to add the founder as a manager?

Two workable patterns; the API only returns locations the authenticated Google user can access.

| Pattern | Who signs in | What the restaurant does | Pros / cons |
|---|---|---|---|
| A. Owner OAuth | The restaurant owner clicks "Connect Google" on the founder's site and grants `business.manage` | Nothing else | Cleanest legally (explicit consent, revocable); requires verified consent screen; the token dies if the owner changes password / revokes / leaves |
| B. Manager access | The founder's own Google account | Owner opens Business Profile settings > People and access > Add > enters founder's email > role **Manager** > Invite; founder accepts the email invite | Founder controls one token for all clients; Managers "have mostly the same access to the profile as owners" except adding/removing users or deleting the profile; all roles can "Respond to reviews"; new managers "have to wait 7 days" for some features (support.google.com/business/answer/3403100). Business owners may hesitate; also exposes the founder's account to Google's policy-suspension risk if any user on the profile violates guidelines (getcito.com) |

Recommendation: offer A as default on the website ("Connect your Google Business Profile in 30 seconds"), keep B as the manual fallback for owners who prefer to invite an email. In both cases record `accountId` and `locationId` at onboarding.

### 2.5 Quotas

Default 300 QPM per project for most Business Profile APIs; Business Information edits are "10 per minute per Google Business Profile (cannot be increased)"; quota increases are denied unless you "consistently reach the current QPM limit" (developers.google.com/my-business/content/limits). At 50 reviews/page and 300 QPM, one project can pull ~15,000 reviews/minute, far beyond a local pilot.

### 2.6 Real-time notifications (official)

My Business Notifications API: `PATCH https://mybusinessnotifications.googleapis.com/v1/accounts/{accountId}/notificationSetting?updateMask=...` with `pubsubTopic` and `notificationTypes` including `NEW_REVIEW` ("A new review has been added to the location") and `UPDATED_REVIEW`; grant `mybusiness-api-pubsub@system.gserviceaccount.com` publish permission on the topic (developers.google.com/my-business/content/notification-setup; NotificationSetting reference). Nice-to-have for "alert the owner within minutes of a 1-star review"; not required for the monthly report.

---

## 3. Places API (New) `reviews` field: why it cannot power the report

- Place resource: "List of reviews about this place, sorted by relevance. A maximum of 5 reviews can be returned." (places reference). Google's Issue Tracker request for more than 5 (issue 35825957) has been open since 2015.
- Sorted by relevance, not newest; no pagination; so month-over-month deltas are impossible.
- Billing: `reviews` triggers **Place Details Enterprise + Atmosphere** at $25.00 per 1,000 requests (1,000 free per month); `googleMapsLinks` (which includes `writeAReviewUri`, "A link to write a review for this place on Google Maps", and `reviewsUri`) is Pro at $17.00/1,000 (5,000 free); Essentials $5.00/1,000 (10,000 free); IDs Only is free (developers.google.com/maps/billing-and-pricing/pricing; places reference).
- Legit uses in this product: validate/refresh Place IDs (free), pull `rating` + `userRatingCount` monthly as the headline numbers and as a cross-check that the API/scraper pull captured everything, and optionally fetch `googleMapsLinks.writeAReviewUri` as Google's own canonical write-review URL for the restaurant.
- Policy: Places content may not be cached beyond exceptions (Place ID is exempt), reviews must be shown with author attribution, and results on a map must be on a Google Map (Places policies page). Google Maps Platform Terms 3.2.4(a) "No Scraping": "Customer will not extract, export, scrape, or cache Google Maps Content for use outside the Services... (iii) copy business names, addresses, or user reviews" (cloud.google.com/maps-platform/terms).

---

## 4. Third-party review data providers (fallback path)

| Provider | Identifier | Full history? | Newest-first / date cutoff | Price (verified on vendor page 2026-09-04) | Notes |
|---|---|---|---|---|---|
| **Apify — Google Maps Reviews Scraper** (`compass/google-maps-reviews-scraper`, actor id `Xb8osYTtOjlsgI6k9`) | `placeIds[]` (27-char ChIJ/GhIJ) or Maps URLs | Yes: `maxReviews` default 10,000,000 ("remove the prefilled value" to get all) | `reviewsSort` newest/mostRelevant/highestRanking/lowestRanking; `reviewsStartDate` absolute or relative ("3 months") | Pay-per-event "Scraped review": $0.0006 on Free ($0.60/1k), $0.00045 Bronze ($0.45/1k), $0.0004 Silver, $0.0003 Gold, $0.0002 Platinum, $0.00015 Diamond; plus $0.00005 per actor start; no separate platform usage charge. Plans: Free $0 ($5 credit), Starter $19/mo (Bronze), Scale $199 (Silver), Business $999 (Gold) | 54,880 users, 6,450 monthly, 4.87/5 from 196 ratings, listing claims 99.5% success; `personalData` toggle with a GDPR warning; output: text, stars, publishedAtDate, owner response, reviewer name/photo/local-guide, review URL |
| **Outscraper Google Maps Reviews API** | query, URL, Google ID or Place ID | Yes ("Not limited to the official Google API limit of 5 reviews per a place") | `sort=newest`, `cutoff` (timestamp), `reviewsLimit`, `ignoreEmpty`, `language` | Free for first 500 reviews; $3/1,000 from 501 to 100k; $1/1,000 after 100k; no monthly fee, credits do not expire; API on all tiers | "response time for fetching 1-10 reviews is less than 3s"; fields author_title, review_rating, review_text, review_datetime_utc, owner_answer, review_link, author_id, review_likes |
| **SerpApi Google Maps Reviews API** (`engine=google_maps_reviews`) | `place_id` or `data_id` | Yes, via `next_page_token` | `sort_by=newestFirst`; first page always 8 results, later pages `num` 1-20 | Subscription only: Free 250 searches/mo, Starter $25/1,000, Developer $75/5,000, Production $150/15,000, Big Data $275/30,000, Searcher $725/100,000; each page = 1 search; cached repeats within 1h free | "U.S. Legal Shield": for recurring plans except Free, Starter and Developer, "SerpApi will assume the liabilities of scraping and parsing search engine results... with up to $2 million in coverage" (serpapi.com/legal). Also returns food/service/atmosphere sub-ratings |
| **DataForSEO Google Reviews API** (`business_data/google/reviews/task_post`) | `keyword`, `place_id` or `cid` | Up to `depth` max 4,490 | `sort_by=newest`; task-based (POST, then poll or postback) | Standard queue $0.00075 per 10 reviews ($75/1M, up to 45 min); Priority $0.0015/10 ($150/1M, up to 1 min); overcharge for shallow results refunded; Extended endpoint $112.5/1M standard; minimum payment $50; results kept 30 days | Cheapest per review; fields profile_name, rating, review_text, timestamp, time_ago, owner_answer, review_id |

**Cost for this business, per restaurant:** assume a one-time backfill of 1,000 reviews and ~40 new reviews per month pulled with a cutoff.
- Backfill: Apify $0.60 (Free) / $0.45 (Starter); Outscraper $0 (within first 500) then $3/1k; DataForSEO $0.075; SerpApi ~50 searches ≈ $1.25 of a $25 plan.
- Monthly delta of 40: Apify ≈ $0.02; Outscraper ≈ $0.12; DataForSEO ≈ $0.003; SerpApi ≈ 3-5 searches. At $50/month subscription price, data cost is negligible on every provider; choose on reliability and legal posture, not price.

**Reliability:** all four re-implement Google Maps' undocumented endpoints and break when Google changes markup (Apify's README warns "scraping maps.google.com has many variables"; SerpApi's contributor endpoint was recently capped at 200 results after a Google change). Expect occasional multi-day outages; the monthly pull should retry across two providers.

**Terms-of-service / legal posture:**
- Google Maps Platform Terms forbid Customers from copying "user reviews" outside the Services; Google's general ToS (effective July 30, 2026) bans automated access that violates robots.txt. Scrapers also collect personal data (reviewer names, photos) that is protected under GDPR/CCPA; Apify's own input schema says "You should not scrape personal data unless you have a legitimate reason to do so"; every Apify actor readme assigns legal responsibility to the user.
- US case law (hiQ v. LinkedIn, 9th Cir. 2022; Van Buren 2021) reduces CFAA risk for public data, but hiQ still lost on breach-of-contract and ended with a permanent injunction; realistic consequences for a small operator are IP blocks and a silently broken pipeline rather than a lawsuit (thunderbit.com; iblead.com).
- Mitigations if you use a scraper: (1) only for restaurants that have contractually authorized you to analyze their public reviews; (2) `personalData: false` or strip reviewer identities, keep only first name + rating + text + date + owner reply; (3) never republish reviews verbatim outside the client's own report; (4) prefer SerpApi's Production plan ($150/mo) if you want the $2M legal shield; (5) migrate each restaurant to the official API as soon as it is connected.

---

## 5. Google's own notification tools (email fallback)

- Business Profile Help "Manage your notifications" (support.google.com/business/answer/7198436): on desktop, Business Profile > More > Notifications; on mobile, Google Maps app > Business > Notifications. The **Customer activity** category = "Alerts when customers leave new reviews or add photos". Notifications arrive via email, Search and Maps from the same panel; settings are per user account, not per profile team (replyonthefly.com). A 2021 report says accounts managing more than 100 listings stop receiving review emails (sterlingsky.ca; may be outdated). Users report Google silently resetting the toggle and emails landing in Promotions/spam (bragly.io).
- Fallback design: as a Manager on the profile, the founder's own Google account can turn on Customer activity and receive "New review" emails for every client; an inbox parser (or a Gmail filter forwarding to a webhook) gives a near-real-time stream of new reviews with reviewer name, stars and text. Email is not an authoritative data source (no reviewId, delivery gaps), so use it only for (a) alerting owners to 1-star reviews within the hour and (b) a completeness check against the monthly API/scraper pull.
- The official Notifications API (section 2.6) is the robust version of the same thing once API access is approved.

---

## 6. Redirect layer design (brand.link/r/xyz)

**Why:** NFC chips cannot count taps; only a redirect you control can (nfctagify.com; taptag.shop: "If you hard-program the Google URL directly onto the card, you will not have analytics, or the ability to login to redirect your tag"). A redirect also lets you swap the destination when a Place ID changes, when a restaurant churns (point the card at a generic page), or if Google changes the writereview format (Google "occasionally updates URL formats, which can break older links", clickgrow.ai).

**Spec:**
1. Domain: a short, brandable domain on HTTPS (e.g. `brand.link`); short domains keep the NDEF payload tiny so any NTAG chip works and the QR stays low-density (version 1-3, larger modules; qrlynx.com).
2. Path: `/r/<card_token>` where the token identifies the individual card (so you know which table/server's card got tapped), mapped in your DB to restaurant → Place ID → destination URL. Cards for a restaurant can share a token if per-card analytics are not needed, but per-card tokens cost nothing and support the "10 free replacement cards" flow.
3. Response: **302 Found** (not 301) to `https://search.google.com/local/writereview?placeid=<PLACE_ID>`. A 301 may be cached by the phone browser and defeat later re-pointing (locafy.com); one blog argues 301 for reliability, but Google's own g.page link uses 302 (verified), so 302 is safe.
4. Logging: timestamp, card token, restaurant, user agent (iOS/Android/desktop), referrer, and a hashed IP for de-duplication. Never log or place personal data in query strings.
5. UTM parameters: they technically survive (Google carried `utm_source=nfc_card&utm_medium=tap` through into the sign-in `continue=` URL in my probe) but they are useless because search.google.com is Google's page, not yours; Google Analytics only records UTMs on pages where your tag runs. Count taps in the redirect log instead. Do not add unknown parameters to the Google URL "just in case"; keep it exactly as Google issues it to avoid any future breakage.
6. Google policy: nothing in the Business Profile or Maps UGC policies restricts shortening/redirecting the review link; shorteners and custom-domain redirects are standard practice (417marketing.com; starfish.reviews), and Google's own short link is a redirect. What is prohibited is pre-filled ratings/content, gating, incentives, and on-premises pressure. So: the redirect must go straight to the blank Google form for every guest, no interstitial "How was your meal? (happy → Google, unhappy → private form)" page.
7. Optional interstitial ONLY for non-NFC/edge cases: a lightweight landing page is acceptable if it shows a single "Continue to Google" button for all guests equally (e.g., to explain that a Google Account is needed), but every extra tap costs conversions; the default should be an instant 302.
8. Reporting metric for the monthly report: taps (from the redirect log) vs. new reviews (from the API) = conversion rate per restaurant, per card, per weekday.

**NFC encoding:** write a single NDEF URI record with the full `https://brand.link/r/<token>` as the first record; iPhone XS/XR and later (iOS 11+) read such tags in the background without an app and show a banner the guest taps (seritag.com; gototags.com). Android reads NDEF URL records identically; estimate 80-90% of Android guests have NFC, budget phones often do not (proudtek.com). Use rewritable chips only if you plan to re-encode in the field; with the redirect layer you never need to.

---

## 7. QR code fallback

Print the same short URL as a QR on the card face (and back) for guests whose phones lack NFC or who do not know to tap. Guidance from 2026 sizing guides (uniqode.com; qrlynx.com; qr-insights.com):
- Minimum 2 cm x 2 cm; comfortable 2.5-3 cm on a credit-card-size (85.6 x 54 mm) card; the 10:1 rule (code width ≥ 1/10 of scan distance) means 2.5 cm covers a 25-30 cm arm's-length scan.
- Error correction level M by default; H only if a logo overlay (≤10-15% of area) is used, accepting a denser code.
- Quiet zone of at least 4 modules on all sides; export SVG or 300 DPI; black modules on matte white; test a printed proof with 3-5 phones, including older models.
- Because the URL is short (~28 characters), the QR stays at a low version with large modules, which is exactly what makes a small card-size code reliable.
- Google's own QR (from "Get more reviews") points at the g.page link; do not use it, because you lose counting and re-pointing. Use your redirect URL for both NFC and QR.

---

## 8. Recommended architecture for the monthly review pull

```
[Onboarding form] -> Place ID resolved (Places API IDs-only, free) -> card tokens minted -> cards encoded (NFC + QR) -> brand.link/r/<token> 302 -> search.google.com/local/writereview?placeid=...

[Data layer]
  Source 1 (primary): GBP Reviews API via OAuth (owner consent) or founder-as-Manager
      - nightly: GET .../reviews?pageSize=50&orderBy=updateTime desc, stop when updateTime < last sync
      - store: reviewId, starRating, comment (split Translated/Original), createTime, updateTime, reviewReply, reviewer.displayName, isAnonymous
      - optional: Notifications API NEW_REVIEW via Pub/Sub for instant alerts
  Source 2 (fallback while API access pending, or if Source 1 errors 2 nights in a row):
      - Outscraper reviews-v3 (sort=newest, cutoff=last_sync) ; second fallback Apify compass actor (reviewsSort=newest, reviewsStartDate=<last sync>)
      - dedupe by (author, date, text hash); mark rows source="scrape"
  Source 3 (sanity check, every month): Places API Place Details fields=id,rating,userRatingCount (Pro SKU, within 5,000 free/month)
      - if userRatingCount - stored count > 0 after the pull, re-run Source 1/2 and flag
  Source 4 (alerting only): "New review" emails to the founder's Manager account -> parser

[Monthly job, 1st of month]
  - assemble last month's reviews + previous month for trend
  - join with redirect-log taps (conversion per card/table/day)
  - LLM report: themes, complaints, staff mentioned, menu items, deltas, recommendations
  - deliver PDF/email; store summary
```

Sequencing for the pilot (next 60 days): (1) register the founder's domain, website with privacy policy, and Google Cloud project today; (2) create the founder's own GBP now so it starts the 60-day clock, and in parallel get added as Manager on the first pilot restaurant; (3) submit "Application for Basic API Access" as soon as a qualifying 60-day-old verified profile with a website is available; (4) submit OAuth sensitive-scope verification (3-5 business days) once the consent screen, domain and privacy policy exist; (5) run the first monthly reports on Outscraper/Apify with a signed authorization from each pilot restaurant; (6) cut over to the API per restaurant as each connects.

---

## 9. Onboarding checklist (collect from each restaurant)

1. Legal business name and the exact name as shown on the Google Business Profile; address; phone; website; owner's name and email (the Google Account email that manages the profile).
2. Confirmation the profile is **verified** and not suspended (the "Get more reviews" button appears only for verified profiles).
3. The restaurant's own review link from **Read Reviews > Get more reviews > Copy** (g.page/r/... form) and, separately, the **Place ID** (from the Place ID Finder or by expanding the g.page link, which 302s to `writereview?placeid=`). Store both; verify that opening the writereview URL on a signed-in phone shows the star dialog.
4. Access choice: (a) owner connects via OAuth on the founder's site, or (b) owner adds the founder's Google email as **Manager** (Business Profile settings > People and access > Add > Manager > Invite); record `accountId` and `locationId` after the first API call.
5. Signed authorization in the subscription agreement covering: reading and analyzing the restaurant's public Google reviews, use of third-party data providers as a fallback, and storage of reviewer display names in reports.
6. Card details: number of cards, card design (logo file, brand colors), tables/servers to map to card tokens, replacement-card contact.
7. Staff guidance acknowledgement (no incentives, no quotas, no "mention me", no standing over the guest, one card for every table regardless of how the meal went).
8. Notification preferences: who receives the monthly report; whether they want instant 1-star alerts (email/SMS).
9. Optional: Stripe customer ID/subscription status so replacement cards and the report are tied to the subscription.
10. Baseline snapshot at signup: current `rating`, `userRatingCount`, and a full backfill of historical reviews (needed for the first month's "vs last month" comparison).

---

## 10. Sources

- Google Business Profile Help, "Get reviews on Google": https://support.google.com/business/answer/3474122
- Google Business Profile Help, create a link or QR code to request reviews: https://support.google.com/business/answer/16816815
- Google Business Profile Help, owners and managers: https://support.google.com/business/answer/3403100
- Google Business Profile Help, manage notifications: https://support.google.com/business/answer/7198436
- Google Maps Help, add reviews (iPhone): https://support.google.com/maps/answer/6230175?hl=en&co=GENIE.Platform%3DiOS
- Maps user-contributed content policy: https://support.google.com/contributionpolicy/answer/7400114
- Search Engine Roundtable, Apr 17, 2026 policy additions: https://www.seroundtable.com/google-reviews-policy-staff-mentions-solicitations-41175.html
- Launchcodex, April 2026 policy summary (kiosks, quotas): https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/
- KUKUI, kiosk enforcement anecdote: https://www.kukui.com/google-changed-the-rules-on-reviews
- PPC Land, policy + Trust & Safety numbers: https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/
- GBP API prerequisites: https://developers.google.com/my-business/content/prereqs
- GBP API basic setup (APIs to enable, OAuth scope, ID endpoints): https://developers.google.com/my-business/content/basic-setup
- GBP API FAQ (14-day review, agencies): https://developers.google.com/my-business/content/faq
- GBP API quotas: https://developers.google.com/my-business/content/limits
- GBP API review data guide: https://developers.google.com/my-business/content/review-data
- v4 reviews.list reference: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
- v4 Review resource: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews
- GBP API deprecation schedule: https://developers.google.com/my-business/content/sunset-dates
- Notifications setup: https://developers.google.com/my-business/content/notification-setup
- NotificationSetting / NotificationType: https://developers.google.com/my-business/reference/notifications/rest/v1/NotificationSetting
- GBP API access form: https://support.google.com/business/contact/api_default
- Sensitive scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
- Unverified apps / 100-user cap: https://support.google.com/cloud/answer/7454865
- Xovion Labs, approval experience: https://xovionlabs.com/blog/google-business-profile-api-hidden-gate/
- Slashpost, 2026 API status: https://slashpost.ai/blogs/google-business-profile/google-business-profile-api-documentation-2026
- Ambience, translated review text workaround: https://ambience.sk/google-business-profiles-api-reviews-without-translation/
- Places API (New) Place resource (5-review max, googleMapsLinks): https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
- Places API Place Details (New): https://developers.google.com/maps/documentation/places/web-service/place-details
- Google Maps Platform pricing: https://developers.google.com/maps/billing-and-pricing/pricing
- Places API policies (caching, attribution): https://developers.google.com/maps/documentation/places/web-service/policies
- Place IDs (change/refresh): https://developers.google.com/maps/documentation/places/web-service/place-id
- Place ID Finder: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
- Google Maps URLs (documented app actions): https://developers.google.com/maps/documentation/urls/get-started
- Google Maps Platform Terms (No Scraping clause): https://cloud.google.com/maps-platform/terms/index-20181001 and https://cloud.google.com/maps-platform/terms
- Issue Tracker, more than 5 reviews: https://issuetracker.google.com/issues/35825957
- Apify actor: https://apify.com/compass/google-maps-reviews-scraper (pricing/input schema also read via Apify API)
- Apify pricing plans: https://apify.com/pricing
- Outscraper pricing: https://outscraper.com/pricing/
- Outscraper reviews API: https://outscraper.com/google-maps-reviews-api/
- Outscraper Python SDK: https://github.com/outscraper/outscraper-python
- SerpApi pricing: https://serpapi.com/pricing
- SerpApi Google Maps Reviews API: https://serpapi.com/google-maps-reviews-api
- SerpApi legal shield: https://serpapi.com/legal
- DataForSEO Google Reviews pricing: https://dataforseo.com/pricing/business-data/google-reviews-api
- DataForSEO reviews task_post docs: https://docs.dataforseo.com/v3/business_data-google-reviews-task_post/
- DataForSEO pricing (minimum $50): https://dataforseo.com/pricing
- Thunderbit, scraping legality overview: https://thunderbit.com/blog/is-scraping-google-maps-legal
- iblead, hiQ explanation: https://iblead.com/en/blog/scrape-google-maps-legal
- Reviewflowz, iPhone behavior: https://help.reviewflowz.com/en/articles/13130336-how-to-get-your-google-review-link-and-qr-code-and-what-it-does-on-an-iphone
- Firefox Android issue (desktop flow description): https://github.com/mozilla-mobile/fenix/issues/16767
- Blumenthal 2016 Safari flakiness: https://blumenthals.com/blog/2016/07/09/new-google-help-page-to-create-a-link-for-customers-to-write-reviews-but-it-doesnt-work/
- Wiserreview, link guide: https://wiserreview.com/blog/google-review-link/
- TrueReview, link guide: https://www.truereview.co/post/how-to-find-google-review-link
- Wiremo / WP Social Ninja / Favecard (g.page link, button names): https://wiremo.co/blog/how-to-get-your-google-review-link/ , https://wpsocialninja.com/google-review-link-generator/ , https://www.favecard.co/en/blog/google-review-link/
- Clickgrow (broken-link causes): https://www.clickgrow.ai/blog/how-to-get-google-review-link/
- SociallyCheap (no pre-filled stars, short links): https://sociallycheap.com/blog/google-review-link-generator-tips
- Locafy (302 vs 301): https://www.locafy.com/blog/google-reviews-link-generator
- 417 Marketing / Starfish Reviews (branded redirects): https://www.417marketing.com/how-to-create-a-short-url-for-google-reviews/ , https://starfish.reviews/google-review-link/
- Tap Tag (dashboard vs hard-coded URL): https://taptag.shop/blogs/how-tos/how-to-redirect-your-tap-tag-to-a-new-website-and-un-redirect
- NFC Tagify (URL shorteners for NFC): https://nfctagify.com/blogs/news/url-shorteners-for-nfc
- Seritag, iPhone background reading: https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone
- GoToTags, iOS background reading: https://gototags.com/help/ios/nfc/reading/background
- Proud Tek, Android NFC coverage: https://proudtek.com/guides/nfc-tag-programming-android-guide/
- QR sizing: https://www.uniqode.com/blog/qr-code-best-practices/how-to-perfectly-size-your-qr-codes , https://qrlynx.com/blog/qr-code-size-guide-print , https://www.qr-insights.com/blog/2026-02-24-qr-code-size-guide-minimum-dimensions
- Sterling Sky, >100 listings email limit: https://www.sterlingsky.ca/how-to-get-review-notifications-when-you-manage-over-100-google-my-business-listings/
- ReplyOnTheFly, notification settings: https://www.replyonthefly.com/blog/google-review-notifications



---

## Fact-check verdicts

- **partially_correct**: Google's own 'Get more reviews' short link g.page/r/<code>/review is a 302 redirect to https://search.google.com/local/writereview?placeid=<PLACE_ID>&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2  
  Correction: Re-fetched 2026-09-04. The redirect target is user-agent dependent and there is an extra hop. g.page/r/CTW9H70cPgDuEBM/review first 302s to the same URL with a trailing slash (/review/). With a mobile (iPhone Safari) UA, /review/ then 302s to https://search.google.com/local/writereview?placeid=ChIJz9AXqSK2qQERNb0fvRw-AO4&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2 (exact query string confirmed). With a desktop Chrome UA, /review/ instead 302s to https://www.google.com/maps/place//data=!4m3!3m2!1s0x1a9b622a917d0cf:0xee003e1cbd1fbd35!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2 (HTTP 200, Maps page with review dialog), never touching search.google.com/local/writereview. For NFC cards (always phones) the mobile path is what matters, so the practical conclusion holds, but 'is a 302 to writereview' is not universally true.  
  Source: https://g.page/r/CTW9H70cPgDuEBM/review
- **confirmed**: An unauthenticated visit to search.google.com/local/writereview?placeid=... returns 302 to accounts.google.com/ServiceLogin?continue=<review URL>; a Google Account sign-in is required to post a review  
  Correction: Verified by direct GET on 2026-09-04: HTTP/2 302, Location: https://accounts.google.com/ServiceLogin?continue=https://search.google.com/local/writereview?placeid%3D... (then a second 302 to accounts.google.com/v3/signin/identifier). Note a HEAD request returns 200, so use GET when testing. Google's help page lists 'Sign in to your Google account' as step 1 and states anonymous reviews cannot be added.  
  Source: https://support.google.com/maps/answer/6230175?hl=en&co=GENIE.Platform%3DiOS
- **confirmed**: GBP Reviews API: GET mybusiness.googleapis.com/v4/accounts/{a}/locations/{l}/reviews, max pageSize 50, orderBy rating | rating desc | updateTime desc, returns averageRating, totalReviewCount and reviews with reviewer.displayName (only if not anonymous), starRating, comment, createTime, updateTime, reviewReply  
  Correction: Reference page confirms GET https://mybusiness.googleapis.com/v4/{parent=accounts/*/locations/*}/reviews, pageSize max 50, orderBy values 'rating', 'rating desc', 'updateTime desc', response fields reviews[], averageRating, totalReviewCount, nextPageToken. Review resource has reviewer{profilePhotoUrl, displayName, isAnonymous}, starRating (ONE..FIVE enum), comment, createTime, updateTime, reviewReply, plus reviewMediaItems and reviewReplyUrl; displayName is 'Only populated with the reviewer's real name if isAnonymous is false.'  
  Source: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
- **confirmed**: GBP API access requires the 'Application for Basic API Access' form from an owner/manager email, a verified GBP active 60+ days with a website; quota 0 QPM = not approved, 300 QPM = approved; FAQ says requests are reviewed within 14 days  
  Correction: Prereqs page (fetched 2026-09-04): 'submit your request using our GBP API contact form. Select "Application for Basic API Access" from the drop-down menu', 'using an email address that is listed as an owner/manager on your business's GBP', 'Manage a Google Business Profile that is verified and active for 60+ days', 'Have a website representing the business listed on the GBP', 'If your quota is 0 QPM ... not yet been approved. If your quota is set to 300 QPM, your project is approved.' FAQ page states 'Requests are reviewed within 14 days.' Community reports of 4 days to 6 weeks in practice.  
  Source: https://developers.google.com/my-business/content/prereqs
- **partially_correct**: The business.manage OAuth scope is Sensitive; sensitive-scope verification typically takes 3-5 business days and needs domain verification, privacy policy, demo video and justification; unverified production apps are capped at 100 new users  
  Correction: The 3-5 business days, Search Console domain verification, hosted privacy policy, demo video and per-scope justification are all confirmed verbatim on the cited page. The 100-user cap is confirmed but on a different page (support.google.com/cloud/answer/7454865: '100 new users in total, after the app presents the unverified app screen'). The 'Sensitive' classification of business.manage is NOT stated anywhere on Google's developer docs (not on the scopes list, implement-oauth, basic-setup, or the cited page); it appears only in third-party sources, and a July 2026 Google Developer forum thread reports the Auth Platform console labelling business.manage as non-sensitive while the backend still blocks external users pending verification. Treat classification as 'check the label in your own Cloud Console Data Access page'.  
  Source: https://support.google.com/cloud/answer/7454865
- **confirmed**: Places API (New) reviews field: 'A maximum of 5 reviews can be returned', sorted by relevance; it bills at Place Details Enterprise + Atmosphere, $25.00 per 1,000 requests with 1,000 free per month (Pro $17/1k, Essentials $5/1k)  
  Correction: Place resource reference: 'List of reviews about this place, sorted by relevance. A maximum of 5 reviews can be returned.' Place Details doc lists reviews under the Enterprise + Atmosphere SKU. Pricing page: Enterprise + Atmosphere $25.00/1k (1,000 free events/month), Enterprise $20.00/1k (1,000 free), Pro $17.00/1k (5,000 free), Essentials $5.00/1k (10,000 free); volume discounts above 100k.  
  Source: https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
- **confirmed**: Apify compass/google-maps-reviews-scraper (actor Xb8osYTtOjlsgI6k9) charges per scraped review: $0.0006 Free, $0.00045 Bronze ($19 Starter plan), $0.0004 Silver, $0.0003 Gold, plus $0.00005 per actor start; supports placeIds, maxReviews, reviewsSort=newest and reviewsStartDate  
  Correction: Apify API (fetched 2026-09-04): actor id Xb8osYTtOjlsgI6k9, PAY_PER_EVENT; 'Scraped review' FREE $0.0006, BRONZE $0.00045, SILVER $0.0004, GOLD $0.0003 (also PLATINUM $0.0002, DIAMOND $0.00015); 'Actor Start' $0.00005 per GB of memory (min one event). Input schema has placeIds, maxReviews, reviewsSort enum [newest, mostRelevant, highestRanking, lowestRanking] default newest, reviewsStartDate (absolute or relative). Store page ties the $19/month Starter plan to ~42,000 reviews/month.  
  Source: https://apify.com/compass/google-maps-reviews-scraper
- **confirmed**: Outscraper Google Maps Reviews: free for the first 500 reviews, $3 per 1,000 from 501 to 100k, $1 per 1,000 after 100k; supports sort=newest and cutoff timestamp  
  Correction: Pricing page: 'Free for the first 500 reviews', '$3/1,000 reviews' for 501-100k, '$1/1,000 reviews' after 100k. Outscraper's official Python SDK README shows google_maps_reviews(place_id, sort='newest', cutoff=<unix timestamp>, reviews_limit=100). The app.outscraper.com/api-docs page is a JS app that could not be parsed, so the full sort enum was verified only via the SDK example.  
  Source: https://outscraper.com/pricing/
- **confirmed**: DataForSEO Google Reviews API: $0.00075 per 10 reviews standard queue ($75 per 1M), $0.0015 per 10 priority; depth max 4,490; minimum payment $50  
  Correction: Pricing page: Standard $0.00075 per 10 reviews / $75 per 1M, up to 45 min; Priority $0.0015 per 10 / $150 per 1M. task_post docs: depth default 10, maximum 4490, billed per SERP of up to 10 results; sort_by newest|highest_rating|lowest_rating|relevant. General pricing page: 'the minimum payment amount is $50.'  
  Source: https://dataforseo.com/pricing/business-data/google-reviews-api
- **confirmed**: SerpApi: Free 250 searches/month, Starter $25/1,000, Developer $75/5,000, Production $150/15,000, Big Data $275/30,000; Google Maps Reviews engine returns 8 reviews on the first page and up to 20 per subsequent page; Legal US Shield (up to $2M) applies only to plans above Developer  
  Correction: Pricing page: Free $0/250, Starter $25/1,000, Developer $75/5,000, Production $150/15,000, Big Data $275/30,000 (higher tiers Searcher $725/100k etc.). 'U.S. Legal Shield provides up to $2 million in coverage' on Production, Big Data, Searcher, Volume, Infrastructure and Cloud plans only. Google Maps Reviews API docs: initial page 'always returns 8 results'; num parameter 'ranges from 1 to 20', default 10, on next_page_token pages.  
  Source: https://serpapi.com/pricing
- **partially_correct**: Google Maps Platform Terms 'No Scraping' clause: Customer will not extract, export, scrape, or cache Google Maps Content, e.g. 'copy business names, addresses, or user reviews'  
  Correction: The quoted wording is from the archived October 1, 2018 version (index-20181001), which Google labels 'not the current version'. The current Terms (last modified August 26, 2026), section 3.2.3(a) No Scraping, read: 'Customer will not export, extract, or otherwise scrape Google Maps Content for use outside the Services. For example, Customer will not: ... (iii) copy and save business names, addresses, or user reviews'. Same substance, but cite the current URL and wording.  
  Source: https://cloud.google.com/maps-platform/terms
- **partially_correct**: Google's Maps UGC policy (updated Apr 17, 2026) prohibits merchants requesting staff solicit a certain number of reviews or reviews that include specific content identifying a staff member, and merchants must not pressure users to review while on the premises (basis for the 2026 kiosk ban)  
  Correction: Current policy text confirmed verbatim: 'merchants should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included. This includes: Merchants requesting that staff solicit a certain number of reviews, Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member.' However the dating is off: the 'while on the premises' sentence was reported by Search Engine Roundtable on February 20, 2026 (article 40962), and only the two staff-related bullets were added April 17, 2026 (article 41175). The policy page shows no 'last updated' date and never uses the word 'kiosk'; the 'kiosk ban' is an industry interpretation of the on-premises clause, not Google's wording.  
  Source: https://support.google.com/contributionpolicy/answer/7400114

### Fact-checker notes
## Fact-check notes (verified 2026-09-04)

**Method:** every claim was re-checked against the primary page (WebFetch or curl) rather than the report's summary. Redirect claims were tested live with both a mobile and a desktop user agent. Apify pricing was pulled from the Apify API (actor Xb8osYTtOjlsgI6k9) rather than the store page.

**Score:** 8 confirmed, 4 partially correct, 0 refuted, 0 unverifiable.

### Where the report was off
1. **Claim 1 (g.page redirect):** correct for phones, wrong for desktop. There is an extra trailing-slash hop, and desktop UAs go to a `google.com/maps/place//data=...!12e1` URL instead of `search.google.com/local/writereview`. Since NFC taps are always phones, the practical conclusion survives, but the wording should say 'on mobile'.
2. **Claim 5 (business.manage is Sensitive):** Google's docs never say this; only third-party blogs do, and a mid-2026 Google forum thread reports the console labelling it non-sensitive. The 3-5 day, video, privacy-policy, domain-verification and 100-user-cap facts are all confirmed (the cap lives at support.google.com/cloud/answer/7454865, not the cited page).
3. **Claim 11 (No Scraping clause):** report quoted the archived 2018 Terms. Current Terms (last modified Aug 26, 2026), 3.2.3(a), say 'export, extract, or otherwise scrape' and 'copy and save business names, addresses, or user reviews'. Substance unchanged; citation should be updated.
4. **Claim 12 (UGC policy dating):** the 'while on the premises' clause surfaced Feb 20, 2026; the two staff-related bullets were added Apr 17, 2026. Google's policy does not use the word 'kiosk'.

### Confirmed with exact figures
- GBP v4 reviews.list: pageSize max 50; orderBy rating / rating desc / updateTime desc; averageRating, totalReviewCount returned.
- GBP API access: 'Application for Basic API Access' via GBP contact form, owner/manager email, GBP verified 60+ days with website, 0 QPM vs 300 QPM, FAQ 'reviewed within 14 days'.
- Places API (New): max 5 reviews sorted by relevance; Enterprise + Atmosphere $25/1k, 1,000 free; Pro $17/1k (5,000 free); Essentials $5/1k (10,000 free).
- Apify compass scraper: $0.0006 / $0.00045 / $0.0004 / $0.0003 per review (Free/Bronze/Silver/Gold; Platinum $0.0002, Diamond $0.00015), $0.00005 per actor start per GB.
- Outscraper: first 500 free, $3/1k to 100k, $1/1k after; SDK supports sort='newest' and cutoff timestamp.
- DataForSEO: $0.00075 per 10 reviews standard, $0.0015 priority, depth max 4490, $50 minimum payment.
- SerpApi: Free 250, Starter $25/1k, Developer $75/5k, Production $150/15k, Big Data $275/30k; Legal Shield ($2M) from Production up; Maps Reviews returns 8 on page 1, 1-20 (default 10) afterwards.
- Unauthenticated writereview GET returns 302 to accounts.google.com/ServiceLogin (HEAD returns 200, so test with GET).

### Biggest gap in the report
The on-premises solicitation clause is a direct risk to the tap-card product itself and deserves its own section (see missing_topics).


## Completeness critic

- No empirical mobile test of the writereview link. The brief's core question (does it open the Google Maps app on iPhone/Android and land on the star sheet?) is answered only as a 'practical expectation' from desktop curl probes and a 2020 Firefox bug. Needs an actual iPhone (Safari, signed-out and signed-in), Android (Chrome), and 'Google app installed' test with screenshots, including whether the Google/Maps app intercepts search.google.com links via App Links/Universal Links, and whether the sign-in 'continue=' round-trip lands back on the review dialog on mobile.
- Conversion economics are absent: no benchmark for taps -> completed reviews, no estimate of what share of iPhone guests are signed in to Google in Safari (the dominant drop-off), and no mitigation options (e.g. whether an interstitial 'sign in with Google' hint or a Maps-app route helps). The founder needs this number to price the $15 card and for the sales pitch.
- NFC hardware/security details are missing: which chip (NTAG213 vs 215/216) and byte capacity vs. URL length; whether to lock/write-protect tags so a guest cannot re-encode a table card to a malicious URL; the iPhone background-reading preconditions (unlocked once since boot, camera closed, no Apple Pay session, airplane mode off); Android requirement that the screen be on/unlocked; what iPhone 7/8/X users see (they need a reader app).
- Redirect-layer implementation is unspecified: no comparison or pricing for hosting the 302 service (Cloudflare Workers, Vercel, Dub.co, Short.io, Bitly custom domain), no domain cost, no guidance on filtering bot/prefetch hits (iMessage link previews, Safari prefetch, security scanners) that inflate tap counts, and no note that the iOS NFC banner displays the founder's domain rather than google.com (trust/branding decision).
- Internal inconsistency on the exact Google destination URL: section 1.1/6.3 recommend the bare placeid URL, while 6.5 says 'keep it exactly as Google issues it'; Google issues the g.page link with source=g.page.m.ia. and laa=nmx-review-solicitation-ia2 parameters. The founder needs a clear decision on whether to 302 to the owner's g.page/r link or to the placeid URL, and whether stripping Google's attribution params has any effect.
- Google trademark/brand-guideline compliance for card artwork ('Review us on Google', the G logo, Google Maps pin, star colors) is not covered; Google's brand permissions page (partnermarketinghub.withgoogle.com) governs what can be printed on a commercial card and this affects the demo-card design immediately.
- GBP API cost is never stated (Google's pricing page says the API is available at no charge); the report should say it explicitly for the founder's unit economics.
- Founder's own Google Business Profile path is vague: no explanation of how a business with no name, no storefront and no customers gets a verified profile (video verification, address/service-area requirements, typical verification time), which is the gating item for the 60-day clock; no concrete calendar (e.g. verified by mid-Sept -> eligible mid-Nov -> approval early Dec) so the founder knows the report will run on scrapers for roughly the first 3 months.
- OAuth details missing: the exact refresh-token lifetime in Testing mode (7 days), the 100-test-user cap, what happens to stored tokens when an owner revokes access or removes the founder as Manager, and whether the API must be re-authorized per location. Also no statement that the 7-day new-manager restriction does not affect reading reviews (verified: it only affects deleting profiles/removing users/transferring ownership).
- Data-model issues for the monthly report are not addressed: reviews deleted by Google or the reviewer disappear from the API (delta must handle removals); createTime vs updateTime for defining 'new this month' vs 'edited'; rating-only reviews (no text) share and how the LLM report treats them; new reviews can take days to become visible; review photos are not returned by the Reviews API.
- Scraper data-quality gaps: Google's UI exposes only relative dates ('2 weeks ago'), so the precision of Apify publishedAtDate / Outscraper review_datetime_utc at month boundaries is unknown; the proposed dedupe key (author, date, text hash) breaks when a review is edited; no evidence on whether scrapers return rating-only reviews or the same review IDs as the official API for cross-source dedupe; no uptime/SLA data behind 'occasional multi-day outages'.
- Outscraper cost estimate contradicts its own pricing: the 500 free reviews reset each 30-day billing period, so the '~$0.12/month for 40 reviews' figure is wrong (it would be $0 for a small pilot); the report should state whether the free tier is per month or lifetime for each provider (also unclear for Apify's $5 credit).
- Google 'New review' email fallback is under-specified: whether the email contains the full review text or a truncated snippet, whether it includes a stable link/review ID, and how the founder would parse it (Gmail API vs Apps Script vs forwarding to a webhook).
- Demo-card workflow for the local pilot is not covered: how to re-point a demo card to the prospect's own restaurant on the spot (resolve their Place ID during the pitch, update the token mapping), and what the demo card should point to before a prospect is chosen.
- Privacy/legal specifics are thin: no template language for the privacy policy required by Google's sensitive-scope review, no statement on whether reviewer display names may appear in the delivered PDF (GBP API vs Places API attribution rules differ), no CCPA/state-law note for storing reviewer names, and no advice on data-retention period for review text and hashed IPs in the redirect log.

### Critic notes
## Notes on contradictions and weak reasoning

- **Destination URL inconsistency.** Section 1.1 and 6.3 tell the founder to 302 to the bare `search.google.com/local/writereview?placeid=...` URL, but 6.5 says to "keep it exactly as Google issues it." Google issues the g.page link, which redirects with `source=` and `laa=` attribution parameters. Pick one and say why.
- **Outscraper cost math.** Table says first 500 reviews free (vendor confirms this resets every 30 days), yet the per-restaurant monthly estimate charges $0.12 for 40 reviews. For a local pilot, Outscraper is effectively free until ~12 restaurants x 40 reviews/month.
- **Mobile behaviour is asserted, not tested.** Every empirical probe was a server-side fetch; the one thing the brief most needed (real iPhone/Android behaviour, sign-in round trip, Maps-app interception) is labeled "practical expectation" and delegated back to the founder. The 2016 Blumenthal Safari note and 2020 Firefox issue are too old to carry the claim.
- **Manager 7-day wait presented ambiguously.** Verified: it only restricts deleting profiles, removing users, and transferring ownership. It does not delay reading reviews, so it is not an onboarding blocker; the report should say so.
- **Approval-time framing.** Executive summary leads with Google's "within 14 days," while section 2.2 cites up to 6 weeks; the timeline in section 8 never converts this into a calendar for the founder, and ignores that the founder's own GBP must first be *verified* (video verification for a nameless business with no premises is itself uncertain).
- **Scraper reliability claims are unsourced.** "Expect occasional multi-day outages" and "retry across two providers" are reasonable but no incident data or status pages are cited.
- **Legal section overstates protection.** SerpApi's "Legal Shield" is recommended as a mitigation, but the report also notes it only applies to Production ($150/mo) and above, which is 3x the restaurant's subscription price; the recommendation and the pricing table are not reconciled.
- **Verified prices (2026-09-04):** Apify Free/Starter $19/Scale $199/Business $999 and Outscraper $3/1k and $1/1k match vendor pages. GBP API is free per Google's pricing page (not stated in the report).


---

## Gap-fill research
# Gap-fill: Google review mechanics for the NFC tap card + monthly AI report (researched 2026-09-04/05)

Scope note: no physical iPhone/Android was available to this research session, so topic 1 and 17 are answered with (a) server-side probes run today (Universal Link / App Link manifests, redirect chains by user agent) and (b) Apple/Google platform documentation, plus a device test protocol the founder must run before printing cards. Everything else is sourced from primary pages fetched today; vendor conversion claims are labelled as such.

---

## 1. Mobile behaviour of the writereview link (what the probes establish, what still needs a phone)

### 1.1 iOS: the writereview URL can only open in the browser (no Universal Link exists for it)

- `https://search.google.com/.well-known/apple-app-site-association` and `https://search.google.com/apple-app-site-association` both return HTTP 404 (probed 2026-09-05). Apple's background tag reading routes a URL record to an app only if it is a Universal Link; otherwise "the system opens the link in Safari" (https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading). Therefore any `search.google.com/local/writereview?...` URL, whether encoded on the chip or reached by 302, opens in Safari (or whatever the default browser is), never in the Google Maps app.
- By contrast, `https://www.google.com/apple-app-site-association` (HTTP 200, 48 KB) lists `EQHXZ8M8AV.com.google.Maps` (Google Maps for iOS) with paths including `/maps/place/*`, `/maps/reviews/*`, `/maps/contrib/*`. That means the desktop-style review URL Google uses for desktop UAs, `https://www.google.com/maps/place//data=!4m3!3m2!1s<hex>!12e1`, IS a Universal Link into the Maps app on iPhone, but only when the user taps it directly (NFC banner, Notes, Messages). `maps.app.goo.gl` also has an AASA that hands `/*` to Maps.
- Redirect caveat: Safari does not open an app when a Universal Link is reached via an HTTP 302 from another domain; it renders the page with, at best, an "Open in app" banner (Flutter issue #153555 https://github.com/flutter/flutter/issues/153555; Apple forums thread 131194 https://developer.apple.com/forums/thread/131194; AppsFlyer: redirects only open the app when the tapped URL is on the same domain as the redirected URL https://www.appsflyer.com/use-cases/customer-experience-deep-linking/universal-linking-challenges-ios-10-3/). So with the recommended `brand.link/r/<token>` layer, iPhones will always land in Safari, regardless of which Google URL you 302 to.
- Sign-in round-trip: with an iPhone Safari UA and no cookies, `g.page/r/<code>/review` chains through 4 redirects to `https://accounts.google.com/v3/signin/identifier?continue=https://search.google.com/local/writereview?placeid=...&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2&flowName=GlifWebSignIn&flowEntry=ServiceLogin` (probed 2026-09-05). The `continue=` target is the review dialog URL itself, so after sign-in Google returns the user to the star sheet; the same chain occurs with an Android Chrome UA. Whether Safari preserves this after a passkey/2FA hop is the one thing that must be confirmed on a real phone.
- Signed-in likelihood on iPhone: Google's own help page states "When you sign in to a Google app or third-party product with your Google Account, you automatically sign in to your Google Account in Safari" (https://support.google.com/accounts/answer/6390156). So a guest who is signed in to Gmail, YouTube or Google Maps on their iPhone is normally already signed in in Safari and will see the stars immediately. No public statistic for the share of iPhone Safari sessions signed in to Google was found (searched; Google/Apple do not publish it).

### 1.2 Android: Google Maps is a verified App Links handler for search.google.com

- `https://search.google.com/.well-known/assetlinks.json` returns HTTP 200 and contains exactly one target: `com.google.android.apps.maps` with `delegate_permission/common.handle_all_urls` (probed 2026-09-05). Android's App Links verification requires this file plus an `android:autoVerify="true"` intent filter in the app's manifest (https://developer.android.com/training/app-links/verify-android-applinks). The manifest's path filters for the Maps app are not public, so whether `/local/writereview` specifically is claimed must be checked on a device; the assetlinks evidence makes it likely that Maps can open the writereview URL directly on Android.
- NFC dispatch on Android changed recently: "Starting in Android 16, scanning NFC tags that store web links ... triggers the ACTION_VIEW intent instead of the ACTION_NDEF_DISCOVERED intent. Beginning with Android 17, scanning such a tag surfaces an 'open link' notification, requiring explicit user interaction" (https://developer.android.com/develop/connectivity/nfc/nfc). ACTION_VIEW on an https URL resolves against verified App Links, so on Android 16+ a card holding a search.google.com URL could open the Maps app straight from the tag, while a `brand.link` URL opens Chrome, which then follows the 302.
- Chrome and redirects: Chrome refuses to launch an external app when "The Intent URI is redirected from a typed in URL" or "initiated without user gesture" (https://developer.chrome.com/docs/android/intents); a tag tap is a user gesture and an immediate 302 in that navigation is allowed (Paul Kinlan, Chrome team: "An immediate HTTP 302 redirect to an intent: URL will resolve the intent" https://paul.kinlan.me/deep-app-linking-on-android-and-chrome/). Expect Android to be the platform where the app route may work through the redirect layer; iOS is the platform where it will not.

### 1.3 Device test protocol (run before ordering cards)

Print one proof card per URL variant and test each on: iPhone (Safari signed-out, Safari signed-in, Google Maps app installed vs not), Android 14/15 (Chrome signed-in), Android 16+ if available, and an iPhone 8/X (needs a reader app, see section 3). For each, record: what the NFC banner says, which app opens, whether the star sheet is visible without further taps, and whether sign-in returns to the star sheet. Variants: (A) `brand.link/r/<token>` 302 to writereview placeid URL; (B) same but 302 to the owner's g.page/r/.../review; (C) Google URL encoded directly on the chip (no redirect) as a control. Also verify the redirect log records exactly one hit per tap on each device (see section 4 for prefetch noise).

---

## 2. Conversion economics (taps to published reviews)

### 2.1 What exists

- Independent baseline: BrightLocal's 2026 Local Consumer Review Survey (1,002 US adults) reports "78% of consumers were asked to leave feedback for a business" in the last 12 months and "83% of people asked to leave a review went on to leave one this year", with 28% saying they "always" write one when asked (https://www.brightlocal.com/research/local-consumer-review-survey/). These are self-reported intentions, not measured tap funnels.
- Vendor claims (self-reported, no methodology): Ampli5 Pulse says "In testing, NFC card taps convert to published reviews at 60-70%", with QR 40-55%, review link 35-50%, in-person ask 25-40%, email 15-25%, measured by correlating tap events with reviews received (https://www.ampli5pulse.com/google-review-card.html). TapSticky claims NFC 40-60% vs QR 15-25%, verbal 2-5%, SMS 10-20%, printed URL 1-3%, and "200-400" reviews/month at 100 customers/day (https://tapsticky.in/blogs/news/nfc-google-review-cards-restaurants). Treat these as ceilings from sellers.
- Platform mix (US, Aug 2026): iOS 60.68%, Android 39.29% (https://gs.statcounter.com/os-market-share/mobile/united-states-of-america). The sign-in wall matters mostly on the iOS 61%.

### 2.2 Planning model (assumptions, not sourced facts)

Use two funnels and instrument both from day one (redirect log taps vs. API review count):
- Guests who tap when a card is dropped: plan on 5-15% of covers (no independent source; vendor pages imply 30-50% best case).
- Taps that become a published review: plan on 20-35% (roughly Ampli5's email/in-person band, discounted for the Safari sign-in wall and Google's spam filter); vendor best case 40-70%.
- Example: 1,500 covers/month x 10% taps = 150 taps x 25% = ~38 reviews/month, i.e. roughly 5-10x a typical unassisted rate (TapSticky's own 2-3% organic baseline). At $15/card for 10 cards ($150) plus $50/month, the restaurant's cost per incremental review in month one is about $5, falling to about $1.30 thereafter; these figures are arithmetic on the assumptions above, not measured.
- Sales pitch: quote the BrightLocal 83% "when asked" figure and the founder's own pilot numbers once 2-3 restaurants have run for a month; do not quote vendor 60-70% claims.

### 2.3 Mitigations for the iPhone sign-in drop-off

1. Card copy: add a small line "Works with your Google account (Gmail, YouTube, Maps)"; it costs nothing and sets expectation. Do not add an interstitial page by default; every added tap is a drop-off and it adds nothing for the ~majority already signed in.
2. Maps-app route on iOS is only possible by encoding Google's `www.google.com/maps/place//data=...!12e1` URL directly on the chip (Universal Link from the NFC banner), which sacrifices tap counting and re-pointing; a 302 from your domain will not open the app (section 1.1). Recommended: keep the redirect layer, and instead offer the Maps-app URL as an opt-in "no-analytics" variant only if device tests show materially better completion.
3. Android: the redirect layer probably still reaches the Maps app (section 1.2); verify.
4. Measure per-platform conversion from user agent in the redirect log and report it; if iOS conversion is far below Android, revisit option 2.

---

## 3. NFC hardware and security

- Chip choice: NTAG213/215/216 have "144, 504 or 888 bytes freely available user Read/Write area" (https://www.nxp.com/products/NTAG213_215_216); Tagstand lists max NDEF message sizes of 137 / 496 / 868 bytes (https://www.tagstand.com/nfc-chip-cheatsheet/). A URI record for `https://brand.link/r/abc12345` (~30 chars, `https://` compressed to a 1-byte prefix code) needs roughly 40-60 bytes, so NTAG213 is sufficient and cheapest; NTAG215/216 buy nothing for a URL-only card (https://proudtek.com/compare/ntag213-vs-ntag215-vs-ntag216/).
- Write-protect: NXP documents a "Field programmable read-only locking function per page for the first 16 pages" plus per double page (NTAG213) or per 16 pages (215/216), and "Configurable password protection with an optional limit of unsuccessful attempts" (32-bit PWD/16-bit PACK) (https://www.nxp.com/products/NTAG213_215_216; datasheet https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf). Recommendation: after encoding, set the tag read-only (irreversible lock bits) so a guest cannot re-encode a table card to a phishing URL; because the redirect layer handles all re-pointing, you never need to rewrite the chip. Password protection is the reversible alternative if you insist on field re-encoding.
- iPhone background reading preconditions (Apple, verbatim list): unavailable when "The device has never been unlocked. A Core NFC reader session is in progress. Apple Pay Wallet is in use. The camera is in use. Airplane mode is enabled." Supported on "iPhone XS and later"; if the phone is locked "the system prompts the user to unlock the phone before providing the tag data" (https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading). Only the first URI record is used, and text records are ignored, so encode a single URI record.
- iPhone 7/8/X: they have Core NFC but no background reading, so they need a reader app; a developer reports "my iPhone 8 requires an app to read NFC, otherwise it goes to Apple Wallet" (https://developer.apple.com/forums/thread/707907). The printed QR code is the fallback for these users.
- Android: "Android-powered devices are usually looking for NFC tags when the screen is unlocked, unless NFC is disabled" (https://developer.android.com/develop/connectivity/nfc/nfc); Android 17 adds an "open link" notification step (see 1.2), so on the newest phones a tap becomes banner-then-tap, like iOS.
- Wallet interception: developers report that with a card in Apple Wallet, background scans sometimes trigger Wallet instead of the URL (https://developer.apple.com/forums/thread/692720); train servers to say "hold the top edge of your phone on the card".

---

## 4. Redirect-layer implementation

### 4.1 Hosting options (prices verified 2026-09-04/05)

| Option | Cost | Notes |
|---|---|---|
| Cloudflare Workers (self-built, recommended) | Free plan 100,000 requests/day, 10 ms CPU; Paid $5/month for 10M requests (https://developers.cloudflare.com/workers/platform/pricing/) | Full control of logging, bot filtering and 302 semantics; pair with Workers KV/D1 for the token map |
| Vercel | Hobby free (1M function invocations, 1M edge requests) but "for personal, non-commercial use"; Pro $20/month (https://vercel.com/pricing) | Fine if the Next.js site already lives there; must be on Pro for commercial use |
| Dub.co | Free: 25 links/month, 1,000 events, 3 custom domains; Pro $25/month (1,000 links, 50k events) (https://dub.co/help/article/how-to-add-custom-domain; https://linklyhq.com/review/dub) | Managed, API, QR; 25 links/month on Free is too few for per-card tokens |
| Short.io | Free: 1,000 links, 50,000 tracked clicks/month, 5 custom domains, commercial use allowed; Hobby $5, Pro $18 (https://short.io/pricing) | Cheapest managed option with a custom domain |
| Bitly | Free plan has no custom domain and interstitial ads; custom domain from Core $10/month per Bitly's blog, or Growth $29-35/month per third parties (https://bitly.com/blog/bitly-free-plan/; https://linklyhq.com/blog/bitly-enterprise-pricing) | Not recommended: ads on free links, retention limits |

Domain cost at Cloudflare Registrar (at-cost, updated 2026-09-04): .com $10.46, .link $7.20, .app $14.20, .co $30.00, .cards $30.20, .tips $24.20, .reviews $48.20 per year (https://cfdomainpricing.com/); the .com wholesale rises to $10.97 on Nov 1, 2026 (https://tldprice.org/registrar/cloudflare).

### 4.2 Filtering prefetch/bot hits

- iMessage fetches every HTTPS link for a preview the moment it is sent, using a User-Agent that impersonates `Twitterbot`/`Facebot` (https://medium.com/@siggi/apples-imessage-impersonates-twitter-facebook-bots-when-scraping-cef85b2cbb7d). Slack, WhatsApp, Outlook SafeLinks and security scanners do the same with their own UAs. For an NFC tap the only request is the phone's real navigation, so bot noise only appears when the link is shared or emailed.
- Rule set for the Worker: (1) do not count requests whose UA contains `bot`, `Facebot`, `Twitterbot`, `facebookexternalhit`, `Slackbot`, `WhatsApp`, `Discordbot`, `LinkedInBot`, `curl`, `python`, `Go-http-client`; (2) do not count HEAD requests or requests with `Purpose: prefetch` / `Sec-Purpose: prefetch` headers; (3) still return the 302 to everyone (so previews render), but write `counted=false`; (4) de-duplicate by (token, hashed IP + UA, 10-minute window) so a double tap counts once; (5) log platform (iOS/Android/other) for per-platform conversion.

### 4.3 The NFC banner shows YOUR domain

iOS shows a "Website NFC Tag" banner offering to open only the domain (not the full URL) in Safari, and there is no way for the user to see the full URL first (https://developer.apple.com/forums/thread/717558; https://powerusers.codidact.com/posts/294323/294370). Guests will therefore see e.g. `Open "yourbrand.link" in Safari`, not google.com. Choose a domain that reads as trustworthy and matches the card face (the card can say "Tap to review us on Google" and, in small type, the domain), and never use a generic shortener domain.

---

## 5. Which Google URL to 302 to (decision)

Empirical facts (2026-09-04/05): `g.page/r/<code>/review` 302s to `/review/`, which for mobile UAs 302s to `https://search.google.com/local/writereview?placeid=<ID>&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2`, and for desktop UAs to `https://www.google.com/maps/place//data=...!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2`. A bare `writereview?placeid=<ID>` behaves identically for signed-out phones (302 to `accounts.google.com/ServiceLogin?continue=...`), and extra parameters survive inside `continue=`.

Decision: 302 to the bare `https://search.google.com/local/writereview?placeid=<PLACE_ID>` and store the owner's g.page link only as a second field for Place-ID recovery. Rationale: (1) the g.page link adds a Google-side hop and UA-dependent branching you cannot control; (2) the `source=`/`laa=` values are Google's own attribution for its "Get more reviews" feature and have no documented effect on the reviewer's experience or on the business (no Google documentation mentions them; they are absent from Google's help page https://support.google.com/business/answer/16816815); (3) the placeid URL can be constructed for any verified business without owner access, which is what the demo workflow needs. Keeping Google's params is harmless but not necessary; this resolves the contradiction between sections 1.1/6.3 and 6.5 of the original report: "keep it exactly as Google issues it" should read "do not add your own parameters".

---

## 6. Google trademark compliance for the card artwork

- Google's official "Review us on Google" sticker kit no longer exists: `marketingkit.withgoogle.com` now 302s to `business.google.com/us/business-profile/` (probed 2026-09-05); LocalImpact reports "The Marketing Kit site went offline in 2024" (https://localimpact.com/blog/review-us-on-google-sticker).
- Rules that apply to a commercial card: Google's Brand Resource Center allows referring to Google "in an informational context in plain text ... as long as you follow our Trademark Rules", prohibits use "in any way that implies affiliation, endorsement, or sponsorship", and routes product icons (the Maps pin) to separate icon guidelines that may require permission (https://about.google/brand-resource-center/guidance/). The Partner Marketing Hub trademark rules require the trademark be used "only as an adjective", "Use only Google-approved artwork when using Google's logos", and no alteration (https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/trademark-guidelines-for-proper-usage/); the Hub's FAQ says everything beyond instructional/educational use requires requesting permission, and its guidance says "Don't use the Google logo in marketing materials for a business", never use Google's brand colors or fonts, and never make Google brand features the most prominent element (https://partnermarketinghub.withgoogle.com/faq/; https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/). Any granted use must carry a trademark notice (https://about.google/brand-resource-center/brand-terms/).
- Practical design rule for the demo cards: plain text "Tap to review us on Google" (referential, Google as adjective-like modifier of "review"), restaurant's own logo and colours dominant, generic star glyphs in the restaurant's palette (not Google's four colours), no G logo, no Maps pin, no Google font. If the founder wants the G icon later, submit the artwork through Partner Marketing Hub for approval and add the trademark notice; approval time is not published. A Local Search Forum thread reaches the same conclusion for review links: plain URL or generic icon (https://localsearchforum.com/threads/am-i-safe-including-googles-logo-in-my-website-for-review-link-purposes.55032/).

---

## 7. GBP API cost

"The Google My Business API is available to registered users at no charge." (page last updated 2026-08-28, https://developers.google.com/my-business/content/pricing). Gmail API, if used for the email fallback, is likewise "available at no additional cost" up to 80,000,000 quota units/day per project (https://developers.google.com/workspace/gmail/api/reference/quota). Unit economics per restaurant: API $0; Places API IDs-only calls $0 (unlimited free, SKU 5C36-E272-E88F and 635D-A9DD-C520, https://developers.google.com/maps/billing-and-pricing/pricing); Place Details Pro (rating + count) $17/1,000 after 5,000 free/month; Cloudflare Worker $0-5/month total; scrapers as in section 12.

---

## 8. Founder's own Google Business Profile: path and calendar

- Eligibility: "If your business either has a physical location that customers can visit, or travels to customers where they are, you can create a Business Profile on Google"; service-area businesses "should hide your business address"; virtual offices are "not eligible" (https://support.google.com/business/answer/3038177). The founder visits restaurants in person to install cards and train staff, so a service-area business (home address hidden, service area = the metro, within "about 2 hours of driving time") is the eligible framing. A pure online SaaS with no in-person contact would not be.
- Verification: video verification "works for" storefront, service-area and hybrid businesses; a service-area video must show location proof (street signs, landmarks), business existence (tools, equipment, business cards, branded apparel) and management proof (performing services or documents such as "a business permit, invoice, or utility bill"); minimum 30 seconds, unedited, recorded live in the app; Google reviews it in "up to 5 business days" (https://support.google.com/business/answer/14271705). Practitioners report 24 hours to 5 business days typical, 14+ days if flagged for manual review (https://www.reinstatelabs.com/blogs/gbp-video-verification-time; https://boomcycle.com/blog/google-business-profile-verification-expert-tips-2026/).
- Prerequisites before creating the profile: a real business name (the profile name must match signage/documents), a live website on the founder's domain with a privacy policy, business cards/branded shirt for the video, and a business-domain email (the API form expects one).
- Calendar (assumes the founder creates the profile the week of Sept 8, 2026): video submitted ~Sept 10; verified by ~Sept 15-17; 60 days verified and active reaches ~Nov 14-16; "Application for Basic API Access" submitted that day, "reviewed within 14 days" per Google's FAQ (https://developers.google.com/my-business/content/faq) gives approval ~Nov 28-Dec 5; OAuth sensitive-scope verification (3-5 business days) can run in parallel in November. Consequence: the September, October and November monthly reports (delivered early Oct/Nov/Dec) run on scrapers, the Manager-email route, or a pilot restaurant that adds the founder as Manager; the first API-backed report is the December report delivered in early January 2027. Shortcut: if a pilot restaurant's verified profile with a website is available now and the owner submits the API form (Google allows the qualifying profile to be a client's), the clock starts immediately.

---

## 9. OAuth details

- Testing mode: "Projects configured with a publishing status of Testing are limited to up to 100 test users" and "Authorizations by a test user will expire seven days from the time of consent. If your OAuth client requests an offline access type and receives a refresh token, that token will also expire" (https://support.google.com/cloud/answer/15549945). Only `userinfo.email`, `userinfo.profile`, `openid` are exempt; `business.manage` is not. Unverified apps in Production hit "100 new users in total, after the app presents the unverified app screen", a lifetime cap (same page; https://support.google.com/cloud/answer/7454865).
- Token death causes (Google OAuth docs): "The user has revoked your app's access"; "The refresh token has not been used for six months"; password change only matters if Gmail scopes are included; max 100 live refresh tokens per user per client; admin restrictions (https://developers.google.com/identity/protocols/oauth2#expiration). Design: refresh monthly at minimum (the report job does), store one token per Google user, and treat `invalid_grant` as "reconnect required" with an owner email.
- Revocation vs. removal: revoking the app at myaccount.google.com kills the refresh token (`invalid_grant`). Removing the founder (or the owner) as Manager does not kill the token; the token stays valid but calls against that location fail with 403 `PERMISSION_DENIED`, which must not be retried (https://developers.google.com/my-business/content/basic-setup; https://bundle.social/google-business-profile-api/errors). Authorization is per Google user, not per location: one owner consent covers every location that user can access, and `accounts/{a}/locations` re-lists what is currently accessible; re-authorization is only needed if the user revokes, the token ages out, or scopes change.
- The 7-day new-manager restriction only blocks "Delete or undelete a profile", "Remove other owners or managers" and "Transfer primary ownership"; managers can "Respond to reviews" immediately (https://support.google.com/business/answer/3403100). Reading reviews via the API works from day one of Manager access.

---

## 10. Monthly-report data model

- Deleted reviews: `reviews.get` "Returns NOT_FOUND if the review does not exist, or has been deleted" (https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/get) and deleted reviews simply vanish from `list`. Delta logic: each month re-list at least the trailing 13 months (50 per page, `orderBy=updateTime desc`), mark any stored `reviewId` missing from the fresh list as `removed_at = now`, and report "reviews removed by Google/reviewer" as its own line, because a sudden removal wave is itself a spam-filter signal.
- Timestamps: `createTime` = "The timestamp for when the review was written", `updateTime` = "The timestamp for when the review was last modified" (https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews). Define "new this month" as `createTime` within the month; "edited" as `updateTime` in the month with `createTime` earlier, and store both versions so the LLM can say "rating changed from 2 to 4 after the owner reply". A 2019 community thread reports the two fields being identical in practice (https://support.google.com/business/thread/11899438), so verify on live data and fall back to text/rating diffs.
- Rating-only reviews: the API returns them unless `ignoreRatingOnlyReviews` is set; their share is not published anywhere and varies by business, so compute it per restaurant and show it as "X of Y reviews had no text". The LLM prompt should count them in the average and distribution but exclude them from theme extraction.
- Visibility lag: no official Google figure; practitioner guides report most reviews appear within 24-72 hours, 3-7 days if held by spam filters, and never for removed ones (https://praising.ai/blog/how-long-google-reviews-take-to-show-up; https://wiremo.co/business/google-review-not-showing-up/). Run the monthly pull on the 3rd-5th of the month, and re-scan the previous month once more the following month.
- Photos: correction to the gap list. The v4 Review resource does include `reviewMediaItems[]` ("Output only. The media items associated with the review") with `thumbnailUrl`, `thumbnailLabel` and `videoUrl` (verified on https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews). Thumbnails, not full-resolution images; store the URLs and let the report note "N reviews included photos".
- Translated reviews: split "(Translated by Google)" / "(Original)" blocks before analysis (original report section 2.1).

---

## 11. Scraper data quality

- Timestamps are exact, not relative: Apify `compass/google-maps-reviews-scraper` returns `publishedAtDate` as ISO 8601 with milliseconds (e.g. `2025-09-05T04:56:59.605Z`) alongside the relative `publishAt`, plus `reviewId` and `reviewUrl` (https://apify.com/compass/google-maps-reviews-scraper); Outscraper returns `review_timestamp` (Unix seconds) and `review_datetime_utc` plus `review_id`, `author_id`, `review_link` (https://github.com/outscraper/outscraper-python/blob/master/examples/Google%20Maps%20Reviews.md; https://outscraper.com/google-maps-reviews-api/). Both come from Google's internal data, so month-boundary precision is not a problem; the "2 weeks ago" string is only what the UI shows.
- Dedupe key: use the review ID, not (author, date, text hash). Apify `reviewId` and Outscraper `review_id` are Google's native identifiers and should match each other; whether they equal the GBP API's "encrypted unique identifier" `reviewId` is unverified and must be tested on one restaurant before cross-source dedupe is trusted. As a fallback key use `author_id` + `createTime` (both stable across edits); text hash only as a tiebreaker.
- Rating-only reviews: Outscraper exposes an `ignoreEmpty` parameter, meaning empty (rating-only) reviews are returned by default; Apify's schema does not document the behaviour, so test it.
- Uptime/SLA: neither Apify's actor page nor Outscraper publishes an SLA or uptime history for Google Maps reviews; the "occasional multi-day outages" statement remains anecdotal. Mitigate with two providers and a Places API `userRatingCount` cross-check.

---

## 12. Scraper free tiers (per provider, verified)

- Outscraper: "Free for the first 500 reviews", then "$3/1,000 reviews" for 501-100k, "$1/1,000" after 100k, and the tiers "reset every 30 days" per billing period (https://outscraper.com/pricing/; billing-period mechanics https://outscraper.com/outscraper-pricing-explained/). Correction: a pilot pulling ~40 new reviews per restaurant per month costs $0 up to about 12 restaurants (500/40), not "$0.12/month".
- Apify: the Free plan shows "$5" as "Included usage / month" and unused credits "expire at the end of the billing cycle", i.e. recurring monthly, not lifetime (https://apify.com/pricing). Starter is $19/month with $19 prepaid usage.
- DataForSEO: no free tier, $50 minimum deposit (original report). SerpApi: Free 250 searches per month, recurring (original report).

---

## 13. "New review" email fallback

- Sender and subjects (Claire Carlile's GBP support reference): sender `businessprofile-noreply@google.com`; subjects "Amy left a review for YourBusinessName" and "YourBusinessName, you got N new reviews" (https://www.clairecarlilemarketing.com/resources/gbp-support). The email body template is not documented anywhere public; capture samples from the founder's own Manager inbox before writing a parser. Reliability is poor: emails can lag by hours, some reviews never trigger one, and Google resets the toggle (https://bragly.io/blog/google-review-notifications/).
- Parsing options: (1) Gmail API `users.watch` + Pub/Sub on the founder's account, free within 80M quota units/day (https://developers.google.com/workspace/gmail/api/reference/quota); (2) Apps Script time trigger scanning `from:businessprofile-noreply@google.com`; (3) Gmail filter auto-forward to an inbound-parse webhook (SendGrid/Postmark style). Use the email only for alerts and completeness checks, never as the report's source of truth (no reviewId, possible truncation).
- Alternative bridge: Zapier's Google Business Profile integration has a "New Review" trigger that "Triggers when a new review is created" for a chosen Location (https://zapier.com/apps/google-business-profile/integrations). Because Zapier holds its own approved API access, a pilot owner who connects their Google account in Zapier gives the founder structured review events before the founder's own API approval; output fields are not documented on the page and must be checked in a Zap.

---

## 14. Demo-card workflow for the local pilot

- Before a prospect is chosen: point demo tokens at a founder-hosted "demo" destination, not at a random restaurant's review form (a stray review posted during a pitch is a policy problem). Best default: the founder's own writereview URL once the founder's profile is verified (a prospect tapping sees a real Google star sheet for the founder's business), or a short landing page that says "This card will send your guests here:" with a live mock of the Google form.
- During the pitch (no owner access needed): in the admin panel, type the restaurant name into a Places Text Search (New) request with the IDs Only field mask (unlimited free, SKU 635D-A9DD-C520, https://developers.google.com/maps/billing-and-pricing/pricing) or use Google's Place ID Finder, confirm the pin, and save the Place ID against the demo token; the Worker's KV map updates in seconds, and the next tap of the same card lands on the prospect's own review form. No re-encoding of the chip is ever needed, which is the practical argument for the redirect layer.
- After the pitch: re-point the demo token back to the default so the card is never left pointing at a restaurant that did not sign.
- Sanity check on the spot: open the resolved `writereview?placeid=` URL on the founder's phone; if it lands on a search page instead of the star sheet, the profile is unverified/merged (original report section 1.2) and that is itself a useful conversation with the owner.

---

## 15. Privacy and legal specifics

- Google's requirements for the OAuth privacy policy: it must be "hosted within the same domain as your application's home page", linked on the consent screen, and must "disclose the manner in which your application accesses, uses, stores, or shares Google user data" (https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification). Google accepts a public statement such as: "[App]'s use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements." (https://support.google.com/cloud/answer/13463817). The User Data Policy requires "a privacy policy that fully documents how your application interacts with user data" and prohibits transferring or selling user data to ad platforms/data brokers or using it for ads or credit decisions; it does not set a retention period (https://developers.google.com/terms/api-services-user-data-policy).
- Template paragraph for the founder's policy (draft, to be reviewed by counsel): "When a restaurant connects its Google Business Profile, we access the profile's public reviews (reviewer display name and photo URL, star rating, review text, review media thumbnails, timestamps and owner replies) and basic account/location identifiers using the business.manage scope. We use this data solely to produce review-analysis reports for that restaurant. We store review data for up to 13 months to support month-over-month and year-over-year comparisons, then delete it. We do not sell or share it with advertisers or data brokers, and we do not use it to train general-purpose AI models. Restaurant owners can disconnect at any time from their Google Account permissions page or by emailing us, after which we delete their stored review data within 30 days. Our use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements."
- Reviewer names in the PDF: the GBP API returns `displayName` "only ... if isAnonymous is false" and Google documents no display-attribution rule for GBP API data; the restaurant owner already sees the same names in their dashboard, so including them in a report delivered only to that owner is consistent with the Limited Use principle. Places API (New) data is different: "You must always credit the author when displaying photos or reviews" with avatar, name and profile link, and content may not be cached beyond the Place ID (https://developers.google.com/maps/documentation/places/web-service/policies); never mix Places-API review text into the report.
- CCPA/CPRA: applies only to for-profit businesses meeting one threshold: revenue above $26,625,000 (effective Jan 1, 2025, next adjustment Jan 2027), or 100,000+ California consumers/households, or 50%+ of revenue from selling/sharing personal information (https://www.cppa.ca.gov/regulations/cpi_adjustment.html; https://www.clym.io/blog/ccpa-applicability-guide). A local pilot is far below all three, but reviewer names are personal information under any state law, so write the policy as if covered: disclose categories, purpose, retention, and a deletion contact.
- Retention recommendation: review text and names 13 months (needed for the "vs last year" section), then purge; redirect logs with hashed IP 90 days, aggregate counts kept indefinitely; raw email samples deleted after parsing. These are the researcher's recommendations, not legal requirements.

---

## 16. Policy risk of an on-table card

- Current policy text (fetched 2026-09-05): merchants "should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included", with the two staff bullets added April 17, 2026; explicitly allowed is to "Solicit or encourage the posting of content that does represent a genuine experience, without offering incentives" (https://support.google.com/contributionpolicy/answer/7400114). Google's own "Get reviews" help still says "you can ask customers to visit a Google link or scan a QR code" (https://support.google.com/business/answer/3474122). Search Engine Roundtable's Feb 20, 2026 report of the on-premises sentence contains no mention of kiosks; "kiosk ban" is an industry reading (https://www.seroundtable.com/google-business-profile-review-policies-updated-40962.html).
- Where the line is: the prohibited act is requiring or pressuring; a card is a passive invitation. Keep it on the "ask" side with these product rules, printed in the onboarding kit: the card is dropped with the check and the server walks away; scripts are limited to "If you'd like to leave us a Google review, this card takes you straight there, whenever you have a minute" (no "before you go", no "do it now", no watching); the card is take-home-able and the QR/URL works from home; no incentives, no mention of servers by name, no different treatment of unhappy guests; card copy "Tap to review us on Google" only. Put the same rules into the restaurant agreement so responsibility for staff behaviour sits with the restaurant.
- Same-IP/Wi-Fi filter risk: industry sources report Google's filter suppressing clusters of reviews from one IP, including guest Wi-Fi, and warn that QR-at-the-table reviews can look suspicious for that reason (https://www.ignitingbusiness.com/blog/how-google-business-profile-reviews-are-collected-and-filtered-for-spam; https://localsearchforum.com/threads/google-reviews-coming-from-same-ip.53116/). Mitigations: guest Wi-Fi is usually not what phones use for a 10-second tap (cellular is default unless the guest joined the Wi-Fi), so do not promote Wi-Fi for reviewing; keep velocity natural (cards at every table, no blasts); track removed reviews monthly (section 10) and, if removals spike, advise the restaurant to have the card say "at your convenience" and lean on take-home usage.

---

## 17. Direct-encoded writereview URL vs. g.page on the chip

- Encoding `search.google.com/local/writereview?placeid=...` directly on the chip: iOS opens Safari (no AASA on search.google.com, section 1.1) and hits the sign-in wall when not signed in; Android 16+ fires ACTION_VIEW and may open the Maps app if the Maps manifest claims that path (assetlinks present, section 1.2). Encoding `g.page/r/.../review` directly: g.page has no AASA or assetlinks (both 404, probed 2026-09-05), so both platforms open the browser first and then follow Google's UA-dependent redirect; Safari again will not open the Maps app after the cross-domain 302. Encoding `www.google.com/maps/place//data=...!12e1` directly: Universal Link into Maps on iOS when tapped from the NFC banner, but no tap counting and the `data=` blob must be captured from the desktop-UA redirect of the owner's g.page link.
- Conclusion: none of the direct-encode options beat the redirect layer except for the iOS Maps-app case, and that case is unverified for completion rate. Keep `brand.link/r/<token>` on the chip; accept the browser path on iOS; verify the Android app path on a device.

---

## 18. business.manage classification in the Cloud Console (2026)

- The July 23, 2026 developer-forum thread reports the Data Access page labelling business.manage "non-sensitive" with no "Submit for verification" path, while external users get "Access blocked: [domain] has not completed the Google verification process. The app is currently being tested, and can only be accessed by developer-approved testers." No Google staff replied; a second developer reported the identical problem on August 17, 2026 (https://discuss.google.dev/t/oauth-business-manage-shown-as-non-sensitive-in-auth-platform-but-backend-blocks-all-external-users-with-error-403-access-denied-no-submit-for-verification-path-exists/384175). Google's scope list and setup pages never state the classification (https://developers.google.com/identity/protocols/oauth2/scopes; https://developers.google.com/my-business/content/basic-setup); third parties (e.g. https://unified.to/blog/how_to_set_up_google_business_profile_api_access_and_get_oauth_2_credentials) call it Sensitive.
- Action: after enabling the seven APIs and adding the scope on the Data Access page, screenshot the label in the founder's project. If it says Sensitive, submit verification immediately (3-5 business days). If it says non-sensitive and the "Submit for verification" button is missing, keep the app in Testing with pilot owners as test users (7-day re-consent, section 9) or use the founder-as-Manager pattern, and open a Cloud Console support case citing the thread. Budget the possibility that owner-OAuth is not viable for the pilot and Manager access is the only route.

---

## Corrections (restated)

1. g.page redirect: `g.page/r/<code>/review` first 302s to `/review/`; for mobile UAs it then 302s to `https://search.google.com/local/writereview?placeid=<ID>&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2`; for desktop UAs it 302s instead to `https://www.google.com/maps/place//data=!4m3!3m2!1s<hex>!12e1?source=...&laa=...` (200, Maps page with review dialog). Re-confirmed 2026-09-05 with iPhone Safari and Android Chrome UAs; the signed-out chain ends at `accounts.google.com/v3/signin/identifier?continue=<writereview URL with the two params>`. The statement "is a 302 to writereview" is true only for mobile UAs.
2. business.manage: Google's documentation nowhere labels it Sensitive; the 3-5 business day timing, Search Console domain verification, privacy policy, demo video and per-scope justification are confirmed on the sensitive-scope page; the 100-user cap is on https://support.google.com/cloud/answer/7454865 and https://support.google.com/cloud/answer/15549945. The July 2026 forum thread shows the console can label it non-sensitive while the backend still blocks external users. Check the label in your own project.
3. Maps Platform Terms: cite the current Terms (last modified August 26, 2026), section 3.2.3(a) "No Scraping": "Customer will not export, extract, or otherwise scrape Google Maps Content for use outside the Services. For example, Customer will not: ... (iii) copy and save business names, addresses, or user reviews" (https://cloud.google.com/maps-platform/terms). The previously quoted wording is from the archived 2018 version.
4. UGC policy dating: the "while on the premises" sentence was reported February 20, 2026 (Search Engine Roundtable 40962); the two staff-related bullets were added April 17, 2026 (article 41175). The policy page shows no last-updated date and does not use the word "kiosk".
5. Additional correction to the gap list itself: the v4 Reviews API does return review media (`reviewMediaItems[]` thumbnails/video URLs), so the report should not say photos are unavailable.
6. Outscraper cost: $0/month for the pilot (500 free reviews per 30-day billing period), not $0.12.

---

## Sources (new in this gap-fill)

- Apple background tag reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Apple AASA files probed: https://www.google.com/apple-app-site-association ; https://maps.app.goo.gl/.well-known/apple-app-site-association ; (404) https://search.google.com/.well-known/apple-app-site-association ; (404) https://g.page/.well-known/apple-app-site-association
- Android assetlinks probed: https://search.google.com/.well-known/assetlinks.json ; https://www.google.com/.well-known/assetlinks.json
- Android App Links verification: https://developer.android.com/training/app-links/verify-android-applinks
- Android NFC (screen unlocked, Android 16/17 change): https://developer.android.com/develop/connectivity/nfc/nfc
- Chrome intents/redirect rules: https://developer.chrome.com/docs/android/intents ; https://paul.kinlan.me/deep-app-linking-on-android-and-chrome/
- Universal Links after 302: https://github.com/flutter/flutter/issues/153555 ; https://developer.apple.com/forums/thread/131194 ; https://www.appsflyer.com/use-cases/customer-experience-deep-linking/universal-linking-challenges-ios-10-3/
- iOS NFC banner shows domain only: https://developer.apple.com/forums/thread/717558 ; https://powerusers.codidact.com/posts/294323/294370 ; Wallet interception https://developer.apple.com/forums/thread/692720 ; iPhone 8 needs app https://developer.apple.com/forums/thread/707907
- Safari auto sign-in with Google apps: https://support.google.com/accounts/answer/6390156
- US mobile OS share: https://gs.statcounter.com/os-market-share/mobile/united-states-of-america
- BrightLocal 2026 survey: https://www.brightlocal.com/research/local-consumer-review-survey/
- Vendor conversion claims: https://www.ampli5pulse.com/google-review-card.html ; https://tapsticky.in/blogs/news/nfc-google-review-cards-restaurants
- NTAG specs and locking: https://www.nxp.com/products/NTAG213_215_216 ; https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf ; https://www.tagstand.com/nfc-chip-cheatsheet/ ; https://proudtek.com/compare/ntag213-vs-ntag215-vs-ntag216/
- Redirect hosting: https://developers.cloudflare.com/workers/platform/pricing/ ; https://vercel.com/pricing ; https://dub.co/help/article/how-to-add-custom-domain ; https://linklyhq.com/review/dub ; https://short.io/pricing ; https://bitly.com/blog/bitly-free-plan/ ; https://linklyhq.com/blog/bitly-enterprise-pricing
- Domain prices: https://cfdomainpricing.com/ ; https://tldprice.org/registrar/cloudflare
- iMessage preview UA: https://medium.com/@siggi/apples-imessage-impersonates-twitter-facebook-bots-when-scraping-cef85b2cbb7d
- Google brand rules: https://about.google/brand-resource-center/guidance/ ; https://about.google/brand-resource-center/brand-terms/ ; https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/trademark-guidelines-for-proper-usage/ ; https://partnermarketinghub.withgoogle.com/faq/ ; https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/ ; https://localimpact.com/blog/review-us-on-google-sticker ; https://localsearchforum.com/threads/am-i-safe-including-googles-logo-in-my-website-for-review-link-purposes.55032/
- GBP API pricing: https://developers.google.com/my-business/content/pricing ; Gmail API quota: https://developers.google.com/workspace/gmail/api/reference/quota ; Places pricing: https://developers.google.com/maps/billing-and-pricing/pricing
- GBP eligibility and video verification: https://support.google.com/business/answer/3038177 ; https://support.google.com/business/answer/14271705 ; https://www.reinstatelabs.com/blogs/gbp-video-verification-time ; https://boomcycle.com/blog/google-business-profile-verification-expert-tips-2026/
- OAuth: https://support.google.com/cloud/answer/15549945 ; https://support.google.com/cloud/answer/7454865 ; https://developers.google.com/identity/protocols/oauth2#expiration ; https://support.google.com/business/answer/3403100 ; https://bundle.social/google-business-profile-api/errors ; https://support.google.com/cloud/answer/13463817 ; https://developers.google.com/terms/api-services-user-data-policy ; https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
- business.manage thread: https://discuss.google.dev/t/oauth-business-manage-shown-as-non-sensitive-in-auth-platform-but-backend-blocks-all-external-users-with-error-403-access-denied-no-submit-for-verification-path-exists/384175 ; https://unified.to/blog/how_to_set_up_google_business_profile_api_access_and_get_oauth_2_credentials
- Reviews API: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews ; https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/get ; https://support.google.com/business/thread/11899438
- Review visibility lag: https://praising.ai/blog/how-long-google-reviews-take-to-show-up ; https://wiremo.co/business/google-review-not-showing-up/
- Scrapers: https://apify.com/compass/google-maps-reviews-scraper ; https://apify.com/pricing ; https://outscraper.com/pricing/ ; https://outscraper.com/outscraper-pricing-explained/ ; https://outscraper.com/google-maps-reviews-api/ ; https://github.com/outscraper/outscraper-python/blob/master/examples/Google%20Maps%20Reviews.md
- Email fallback: https://www.clairecarlilemarketing.com/resources/gbp-support ; https://bragly.io/blog/google-review-notifications/ ; https://zapier.com/apps/google-business-profile/integrations
- Policy: https://support.google.com/contributionpolicy/answer/7400114 ; https://support.google.com/business/answer/3474122 ; https://www.seroundtable.com/google-business-profile-review-policies-updated-40962.html ; https://www.ignitingbusiness.com/blog/how-google-business-profile-reviews-are-collected-and-filtered-for-spam ; https://localsearchforum.com/threads/google-reviews-coming-from-same-ip.53116/
- Places policies (attribution/caching): https://developers.google.com/maps/documentation/places/web-service/policies
- CCPA thresholds: https://www.cppa.ca.gov/regulations/cpi_adjustment.html ; https://www.clym.io/blog/ccpa-applicability-guide
- Maps Platform Terms (current): https://cloud.google.com/maps-platform/terms


## Open questions
- Exact on-device behavior of the writereview link from an NFC tap on current iOS (Safari) and Android (Chrome) — whether the star dialog appears immediately for signed-in users and whether the Google Maps app ever intercepts it — must be tested on real phones; Google documents no app deep-link for this URL and historic Safari flakiness is reported.
- Whether Google will approve the founder's Basic API Access request before the founder has his own 60-day-old verified GBP; the fallback is applying with a pilot restaurant's profile where the founder is Owner/Manager, but the reported requirement to apply from an owner-level (not manager) account is unofficial.
- Whether Google treats a card dropped with the check as 'pressure to review while on the premises'; the policy text allows in-store QR codes on the guest's own device, but enforcement is automated and undocumented, so card wording and staff behavior should be conservative and this risk should be disclosed to restaurants.
- Current Apify tier mapping for Platinum/Diamond per-review prices (the actor exposes them, but apify.com/pricing only lists Free/Starter/Scale/Business).
- Whether reviewer display names returned by the official API may be reproduced in the restaurant's monthly report under Google's API terms — the Places API requires author attribution for displayed reviews; the GBP API terms should be reviewed by counsel before naming reviewers in reports.
- NTAG213/215/216 URL capacity could not be verified from a vendor page during this session; with a ~28-character short URL any standard NTAG chip is sufficient, but confirm with the card supplier.
- UTM parameters survive into Google's sign-in continue URL, but whether any downstream Google system records them is unknown and irrelevant if tap counting is done in the redirect log.
# Field sales and demo playbook

Working brand: Tablenote (placeholder). Founder: Zay. Market: [CITY]. Written 2026-09-04, revised 2026-09-05, from the research in `research/sales_demo_playbook.md`, `research/competitors_pricing.md`, `research/suppliers.md` and `research/design_inspiration.md`, using the fact-check corrections in each file.

What we sell, in the words used on the site: a credit-card-size NFC card that opens the restaurant's Google review screen when a guest taps it, and a monthly AI report that reads every new review and says what to fix. Cards are $15 each, one time. The report is $50 per month per location and includes 10 free replacement cards a month. Minimum order 5 cards. Starter kit is 10 cards plus the report: $200 today, then $50 a month. Cancel anytime.

Every number in this document has a URL next to it. Anything without a source is marked unverified. Do not quote unverified numbers to an owner.

Two rules that this document shares with docs 02, 03, 04, 06 and 07, word for word:

- **Demo cards.** Never encode a real restaurant's review page on a demo card. Demo cards point only at `/sample-report` or at Tablenote's own verified Business Profile; a restaurant's own review page goes on a card only after that restaurant has ordered.
- **Pilots.** There is no free trial. A pilot is one of the first 10 paying starter-kit restaurants: charged on day one, baseline report from the last 90 days of reviews within 48 hours, founding-restaurant discount on the report, 30-day check-in.

---

## 1. The 90-second version

1. Walk in Tuesday to Thursday, mid-afternoon, and ask for the owner or GM by name. Check the listing's Popular times on Google Maps first and go during the lowest bar between lunch and dinner (https://support.google.com/business/answer/6263531). The 2 to 4 pm window is vendor convention, not a sourced fact.
2. Lead with the demo, not the pitch. Hand over a generic demo card and let them tap it with their own phone. Then open their own Google review page in the browser on your phone and hand that over too.
3. The tap is two steps on every phone: hold the phone to the card, then tap the banner (iPhone XS and newer) or the notification (Android). iPhone 7, 8 and X need the NFC reader in Control Center. The QR on the back of a production card opens the same link.
4. Sell the starter kit on day one, not a free trial: 10 cards with their logo plus the report, $200 today, then $50 a month, cancel anytime. The first 10 restaurants are your pilots: baseline report within 48 hours, 50 percent off the report for three months, loaner cards on the tables until their printed cards arrive. Ask for a testimonial, logo permission and two introductions at day 30.
5. Stay inside Google's rules: no incentives, no gating, no pressure on the premises, no staff quotas, no per-server tap tracking, never ask a guest to name a server, no house tablets (https://support.google.com/contributionpolicy/answer/7400114). FTC 16 CFR 465 applies to incentives and suppression (https://www.law.cornell.edu/cfr/text/16/465.4).
6. Never let the owner submit a review of their own restaurant during the demo. Owner reviews are a conflict of interest under Google policy and an undisclosed insider review under 16 CFR 465.5 (https://www.law.cornell.edu/cfr/text/16/465.5).
7. Track 50 targets in one sheet with a Day 0 / 2 / 7 / 14 / 30 cadence. Sort by "next action date" every morning.
8. Close on the spot or at day 7 with the sample report in hand and the order page open on your phone. The owner enters their own card details. You never type them.

---

## 2. Who decides, when to visit, and the host-stand script

### 2.1 Who decides

7 in 10 US restaurants are single-unit operations (https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/). The buyer is usually a person you can meet in the building.

| Restaurant type | Decides a $200 starter kit and $50/month | Notes |
|---|---|---|
| Single unit, owner on premises daily | Owner | Often in the building mid-afternoon doing orders and books |
| Single unit, semi-absentee owner | GM can often approve the $200 kit; the owner approves the recurring charge | Demo to the GM, ask the GM to bring you to the owner within the week |
| Chef-owner | Chef-owner, before 3 pm only | Lead with the dish-level section of the report |
| 2 to 5 unit local group | Owner or operating partner | Longer cycle; ask the GM who handles marketing vendors |

This table is practitioner convention, not a sourced statistic (unverified). Validate it in your first 10 visits by asking "who would normally make a call on something like this?" and recording the answer in the sheet.

Never pitch the host, a bartender or a server beyond asking who the right person is and when they are in. Treat them well. They will be dropping the cards.

### 2.2 When to visit

- Tuesday to Thursday, after the lunch turn clears and before pre-shift. Check each listing's Popular times and live busyness before you walk in; Google builds the graph from aggregated, anonymized Location History data (https://support.google.com/business/answer/6263531).
- Avoid Friday to Sunday, Mondays (many independents are closed or the owner is off), 11:30 am to 1:30 pm, anything after 4:30 pm, the first and last days of the month, and game days.
- Breakfast and lunch-only spots: 10 to 11 am. Dinner-only spots: 3 to 4 pm, when the owner or chef arrives.

### 2.3 Host-stand script

Walk-in, to whoever greets you:

> "Hi. I'm not here to eat. My name's Zay, I run a small local company called Tablenote. Is [owner first name, if known] or the manager around for two minutes? I've got something for the restaurant I'd rather show than explain. Hold a phone to it, tap the banner, done."

If they ask what it is about:

> "It's a card that gets your guests to leave Google reviews right at the table. I just want to show it to whoever handles that. If now's bad, what time is usually calmest for them?"

If the decision-maker is not in:

> "No problem. Could I leave this for them?" (hand over the leave-behind with a generic demo card clipped to it; it opens our sample report, never their review page) "What's their name, and is there a day and time they're usually here and not slammed? I'll come back then rather than call."

Always leave with three things: the decision-maker's name, the best day and time, and a phone or email if they offer it. Write it in the sheet before you drive to the next stop. Do not lean on the host stand, step aside when a guest arrives, and leave immediately if a rush starts.

---

## 3. The 60-second pitch and the 3-minute demo

### 3.1 Prepare the demo kit the night before

**The rule.** Never encode a real restaurant's review page on a demo card. Demo cards point only at `/sample-report` or at Tablenote's own verified Business Profile; a restaurant's own review page goes on a card only after that restaurant has ordered. A card on a host stand that opens the restaurant's live review form invites staff to tap and post, which is a conflict-of-interest review under Google's policy (https://support.google.com/contributionpolicy/answer/7400114) and an undisclosed insider review under 16 CFR 465.5 (https://www.law.cornell.edu/cfr/text/16/465.5). The same rule is in `docs/02-nfc-tech-spec-and-encoding.md` section 2.5, `docs/03-google-reviews-and-report-pipeline.md` section 1.5, `docs/04-compliance-and-policy.md` section 4.5 and `docs/07-launch-checklist.md` Week 2.

**What the demo card opens.** Today the `demo` slug in `site/data/links.json` points at `/sample-report`. Once Tablenote has its own verified Business Profile, point `demo` at `https://search.google.com/local/writereview?placeid=<Tablenote's Place ID>` so the prospect sees the real Google review screen; tell everyone not to submit (`docs/04-compliance-and-policy.md` section 4.5). Either way the card is generic, and the prospect's own page is shown from your phone.

**Step 1. The prospect's own review page, in your phone's browser (about 3 minutes per target)**

1. Find the restaurant's Place ID with Google's Place ID Finder (https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder). Google recommends refreshing stored Place IDs older than 12 months (https://developers.google.com/maps/documentation/places/web-service/place-id).
2. Build the review URL: `https://search.google.com/local/writereview?placeid=<PLACE_ID>`. Google's help pages do not document this format; the fact-check confirmed it responds with a redirect to Google sign-in carrying the write-review page, so treat it as working but undocumented. Open it on your phone. It must land on the "write a review" sheet for that restaurant, not the listing.
3. Save it in Notes under the target's ID, with today's rating, review count and newest-review date. At the table you hand the owner your phone with this page open and say "don't post".
4. Record the Place ID in the sheet. It goes into `links.json` only after the restaurant orders (Section 9A).

**Step 2. Generic demo cards (printed, about one week lead)**

Carry at least three cards on the `demo` slug plus the four Lucia's Trattoria sample designs. Export the artwork with two terminals, as `site/scripts/README.md` describes:

```
# terminal 1, leave it running
cd site && npm run dev

# terminal 2
cd site && node scripts/export-cards.mjs
```

The default run writes `cards/exports/demo-your-restaurant/` and `cards/exports/lucias-*/`, each with front and back PDFs at 3 mm bleed. Use `"stars": 0` (no star graphics on any Tablenote card) and `"headline": "Tap to review us on Google"`. Send the demo card and one or two Lucia's designs to My Plastic Business Card, Quick Plastic NFC Business Cards: 25 for $123.75 ($4.95 each) plus $10 flat FedEx Ground, full color both sides so the QR on the back matches the chip, proof within 24 hours, 5 business days production (https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/ ; https://myplasticbusinesscard.com/faq/). That is $5.35 a card landed, the figure `docs/06-pricing-and-unit-economics.md` section 1.2 uses. Ask them to encode `https://tblnt.com/r/demo?s=card` and to leave demo cards unlocked so you can re-point them as loaners later.

Cheaper alternative if you only need a handful: Tagstand Custom Small Batch, about 1 week, printed and encoded in California. The live order form prices two-sided cards at 10 for $45.60 ($4.56), 25 for $77 ($3.08), 50 for $140 ($2.80) and 100 for $260 ($2.60); one-sided at 10 for $25.90 ($2.59). The "$2.60, no minimum" figure quoted elsewhere is the two-sided price at 100, not a flat price (`research/suppliers.md` gap-fill section 8; https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215/). `docs/01-ordering-guide.md` section 2 and `docs/06-pricing-and-unit-economics.md` section 1.2 recorded the in-stock SKU as a one-sided portrait card with a lanyard slot; check the printing option and the card shape in the cart before you pay, and if only one-sided is available there is no QR on the back.

**Step 3. Blanks for loaner cards (after a restaurant orders)**

Keep 10 blank white NTAG213 CR80 cards (GoToTags $0.30 each at 10, https://store.gototags.com/nfc-pvc-card-ntag213/) and the free NFC Tools app. When a restaurant signs and pays, its printed cards are about two weeks out (proof within 2 business days, shipping about 10 business days after approval). Bridge the gap with up to 5 loaner cards: generic demo cards or blanks written to the restaurant's own slug.

1. Add the slug to `site/data/links.json` as in Section 9A, deploy, and confirm `https://tblnt.com/r/<slug>?s=card` redirects on your phone. Slugs may contain only lowercase letters, digits, hyphen and underscore; `site/lib/links.ts` strips everything else, and `links.json` is imported at build time so a new slug is live only after the next deploy.
2. Write the chip with NFC Tools: Write, Add a record, URL, paste `https://tblnt.com/r/<slug>?s=card`, Write, hold the top edge of the phone on the card until it confirms (https://www.wakdev.com/en/apps/nfc-tools-ios.html). The URL is about 35 characters; NTAG213 holds roughly 130 (https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf).
3. Test on an iPhone XS or newer and on an Android: banner or notification, tap, review sheet. Do not post a review.
4. Do not lock loaner cards. Locking is permanent (NXP datasheet, above). Loaners come back when the printed cards arrive and get re-pointed to the next restaurant. Only production cards get locked, after testing.
5. A blank has no QR, so for older iPhones the restaurant uses the QR on the printed cards once they arrive. Put a small paper label on the back: "Tablenote loaner, [restaurant], return to Zay".
6. If `TAP_WEBHOOK_URL` is set in the site's environment, every tap on the slug is logged with a timestamp and source (see `site/app/r/[slug]/route.ts`). That is the restaurant's first proof of use.

**Phone facts to have ready.** iPhone XS and later read a URL tag in the background with no app and show a banner the guest taps. Reading works only when the phone is in use; if the phone is locked, iOS asks the user to unlock before opening the link. It does not work before the first unlock after a restart, while the Camera or Wallet is open, or in Airplane mode (https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading). iPhone 7, 7 Plus, 8, 8 Plus and X need the NFC Tag Reader turned on in Control Center; Apple's own support page lists the models (https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios). Android reads tags when NFC is on and the screen is unlocked; Android 17 shows an "open link" notification that needs a tap (https://developer.android.com/develop/connectivity/nfc/nfc). Guests must be signed into a Google Account to post (https://support.google.com/business/answer/7035772).

### 3.2 The 60-second pitch (owner is standing)

> "Thanks for the minute. Quick version. Guests decide where to eat by reading Google reviews. 97 percent of people read reviews for local businesses now, and about three quarters look for reviews from the last three months. So it is not just your star rating. It is whether you have fresh reviews every week.
>
> Here is the problem. The people who write reviews on their own are the ones who were thrilled or furious. The normal happy table never gets asked. So I made this."
>
> (Hand them the demo card.) "Wake your phone and hold the top edge on it. Then tap the banner."
>
> (Their phone opens the Tablenote review screen, or the sample report until Tablenote's profile exists.) "That is the Google review screen for our own listing. No app, no scanning, no typing a link. Don't post anything. Yours would look like this." (Hand them your phone with their own review page open.) "That is your review page. Don't post, that would be you reviewing yourself. Your cards point there. Your server drops one with the check and the guest taps while the meal is still fresh.
>
> Then once a month our AI reads every new review you got and sends you a two-page report: what people love, what they complain about, which dishes get mentioned, what guests said about the team on their own, and what changed since last month.
>
> Cards are $15 each, one time. The report is $50 a month and includes ten free replacement cards a month. The starter kit is ten cards with your logo plus the report, $200 today, then $50 a month, cancel anytime. I'm signing my first ten local restaurants this month: you get a baseline report from your last 90 days of reviews within two days, and half off the report for the first three months. Worth trying here?"

Numbers in the pitch: 97 percent read reviews; 74 percent look for reviews from the last three months; both from the BrightLocal Local Consumer Review Survey 2026, US consumers, n=1,002 (https://www.brightlocal.com/research/local-consumer-review-survey/). These are "local business" figures; BrightLocal publishes no restaurant-only cut that we could confirm. The founding-restaurant discount (50 percent off the report for 3 months, first 20 local customers, Stripe coupon) is defined in `docs/06-pricing-and-unit-economics.md` section 7.2.

### 3.3 The 3-minute demo (owner sits down or leans in)

**Minute 1. Let the tap do the talking.**

> "Before I explain anything, take out your phone. Wake it. Hold the top edge on this card. Now tap the banner."

Say nothing while they tap.

> "That is the Google review box, on our own listing. Nothing to download, nothing to scan. Don't submit, that would be a fake review and Google bans it. Now here is yours." (Hand over your phone with their review page open.) "That is [restaurant]'s own review box. Same thing, don't submit. But that is the whole guest experience: tap, stars, a sentence, done."

Until Tablenote's own profile exists, the card opens the sample report instead; say "the real card opens the Google review box, this one opens the report so you can see what you get" and move straight to your phone.

Older iPhone: "Swipe down to Control Center and tap the NFC reader, or use the QR on the back of the real card." Android that does nothing: NFC is off in Settings. Keep going. The tech is not the story.

**Minute 2. Show the report on paper.**

Hand them the printed one-pager from `cards/exports/print/sample-report-onepager.pdf`.

> "This is what you get on the first of every month. Top: what is working. Then what is costing you stars, with the actual quotes. Then every dish guests mentioned and whether the mention was good or bad. Then a section called 'Guest comments that mention team members', only what guests wrote on their own. If four people wrote 'Maria was amazing', you see the quotes. If someone wrote 'our server disappeared for twenty minutes', you see that too, without reading sixty reviews yourself. It is a guest-experience report, not a staff scorecard; nobody gets ranked. The last section is three things to do this month."

Tie it to their listing. You looked it up this morning:

> "You're at [X.X] stars with [N] reviews, and your newest review is [Y] weeks old. That gap is what this fixes. A third of consumers now want to see a review from the last two weeks." (32 percent, https://www.brightlocal.com/research/local-consumer-review-survey/)

**Minute 3. The rules, then the offer.**

> "Two things I say up front because owners always ask. One: Google's own help center says you can ask customers to visit a Google link or scan a QR code. What Google bans is paying or discounting for reviews, pressuring people while they're at the table, and giving staff review numbers to hit. We stay on the right side of all of it and I leave you a one-page staff guide that keeps it that way.
>
> Two: there's no contract. The starter kit is ten cards with your logo plus the report, $200 today, then $50 a month, cancel anytime. Nothing prints until you approve the proof, and if you cancel before that you get every dollar back. Within two days of signing you get a baseline report built from your last 90 days of reviews, so you see what the report does before a single card is on a table. While your cards print, I put five loaner cards in your check presenters. And because you're one of my first ten, the report is half price for three months. What I ask in return is honest feedback, and if it works, a sentence I can quote and permission to show your logo. Fair?"

Then stop talking.

If yes, open the order page on your phone, let them enter their own payment details, and run the onboarding checklist (Section 9) right there or book a 20-minute visit within 48 hours. Sources for the rules quoted: https://support.google.com/business/answer/3474122 and https://support.google.com/contributionpolicy/answer/7400114. Refund terms are those on the site: full refund if cancelled before proof approval, no refund on printed cards after approval.

---

## 4. Ten objections with evidence-backed answers

**1. "We already have a QR code on the receipt."**

> "Keep it. Two differences. The receipt goes to the one person paying, after they've mentally left. The card sits in front of the whole table while they're still talking about the meal. And a QR needs the camera opened and focused. On any iPhone from the XS up, the card just needs to touch the phone, then one tap on the banner. Let's run both for 30 days and count which one produces reviews."

Background reading on iPhone XS and later: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading. Of people asked to leave a review, 83 percent did (https://www.brightlocal.com/research/local-consumer-review-survey/).

**2. "Doesn't Google penalize asking for reviews?"**

> "No. Google's help center says, quoting, 'To leave reviews, you can ask customers to visit a Google link or scan a QR code.' What Google bans is incentives, discouraging negative reviews, pressuring people on the premises, and staff review quotas. Our staff guide is built around those four lines."

Sources: https://support.google.com/business/answer/3474122; https://support.google.com/contributionpolicy/answer/7400114. Contrast Yelp, which says businesses should not ask for reviews at all (https://biz.yelp.com/support-center/Reviews/Best_Practices/Don-t-Ask-for-Reviews/en-US). That is why the card points at Google only and we will never make a Yelp card.

**3. "My servers won't do it."**

> "They won't do anything that adds a step. This adds none. The card lives in the check presenter, so it's on the table the moment the check is. The only thing they say is one sentence, once. I train the floor in five minutes at pre-shift and leave a laminated guide by the POS. And when guests praise the team on their own, the report quotes them, so the floor hears the good stuff every month. Nobody gets ranked, and staff never ask to be named."

Then show the laminated staff guide (Section 7). The staff section never scores or ranks anyone (`docs/03-google-reviews-and-report-pipeline.md` section 6.2).

**4. "I don't want to invite bad reviews."**

> "You're already getting them. The angry guest doesn't need an invitation. Consumers write about positive experiences twice as often as negative ones, 60 percent versus 29 percent, so asking everyone shifts the mix toward the good night. The negative ones come with detail you can fix, and the report surfaces the pattern. And 80 percent of consumers say they're likely to use a business that responds to every review. The report tells you which three to answer first."

Source: https://www.brightlocal.com/research/local-consumer-review-survey/. Never promise to remove or filter reviews. Google removes only policy-violating content; negative reviews alone are not grounds for removal (https://support.google.com/business/answer/4596773). Suppressing reviews is prohibited under 16 CFR 465.7 (https://www.law.cornell.edu/cfr/text/16/465.7).

**5. "$50 a month for a PDF?"**

> "It's $50 for every review you get read, every month, with a list of what changed: which dish is slipping, which complaint showed up three times, which three reviews to answer first. If you already read every review, you don't need it. Most owners skim the one-stars and miss the pattern. The $50 also includes ten replacement cards a month, and there's no contract. You get a baseline report from your last 90 days within two days of signing. Judge that report, not the price. If it's not useful, cancel."

Do not use a revenue-per-star multiplier to justify the price; this product mainly raises review count and recency, not necessarily the star rating. If pressed for economics: the best causal work is Yelp-era. A half-star gain took the chance of selling out at peak from 13 to 34 percent, and the effect was strongest for lesser-known restaurants (Anderson and Magruder, Economic Journal 2012, via https://news.berkeley.edu/2012/09/04/yelp-reviews-boost-restaurant-business/). A one-star gain was worth 5 to 9 percent of revenue for independents, not chains (Luca, HBS Working Paper 12-016, https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf). Say plainly that both are Yelp studies from a decade ago.

**6. "I saw these cards for $10 on Amazon."**

> "You did, and some are fine. Ninja Pop is $9.97, TapFive is $19.95, TAPro is $34.95. What they sell is a chip. What we sell is the card with your logo, pointed at a link we maintain and can fix if Google changes your listing, plus the ritual, the staff training, ten free replacements a month when cards walk off, and the report. Nobody else replaces cards for free. And several of the cheap ones bundle a filter that hides low ratings, which breaks Google's rules and can get all your reviews removed."

Prices: Ninja Pop $9.97 (https://ninjapop.io/products/ninja-pop-google-review-card-contactless-review-card); TapFive $19.95 (https://shop.tapfive.com/); TAPro G-Series Onyx $34.95 (https://taprocard.com/products/g-series-onyx-google-review-card). Gating products: Tap Tag Review+ $19/month with "Review Filtration" (https://taptag.shop/pages/tap-tag-pricing); Taps Reviews "Review Filtration Plus+" $9.99/month (https://tapsreviews.com/products/review-filtration); GrowSEO routes only 5-star ratings to Google (https://growseo.com/review-cards/google-reviews-card.php). Google prohibits selectively soliciting positive reviews (https://support.google.com/contributionpolicy/answer/7400114). No seller in the research offers ongoing free replacements; the best are 30 to 90 day refunds and defect warranties.

**7. "We already use Toast / OpenTable / Popmenu / Yelp."**

> "Keep them. None of those puts a card in front of the whole table at the table, and none writes you a monthly narrative with dishes by name and what guests said about the team. Yelp's own policy says don't ask for reviews, so Yelp isn't a place you can build. Google is where 71 percent of consumers look and where asking is allowed. This sits on top of what you have."

Google share 71 percent: https://www.brightlocal.com/research/local-consumer-review-survey/. Yelp policy: https://biz.yelp.com/support-center/Reviews/Best_Practices/Don-t-Ask-for-Reviews/en-US. Toast's review-request features could not be verified (their product pages blocked fetches); do not describe what Toast does until you have checked it yourself. Popmenu Premier $499/month includes AI review replies and OpenTable Pro $499/month adds post-dining surveys, both third-party reported (https://restauranttools.ai/tools/popmenu, https://restauranttools.ai/tools/opentable).

**8. "Won't a burst of reviews look fake and get filtered? Everyone's on my Wi-Fi."**

> "A burst would. This isn't a burst. It's a few reviews a night, every night, from real guests on their own phones, and the server says 'now or whenever', so plenty post from home. Steady flow is what local search experts rank as a signal: sustained reviews over time rather than bursts. Google's filter does occasionally remove real reviews. If it happens, there's an appeal path and I'll help."

Whitespark ranks "sustained influx of reviews over time rather than bursts" #14 among local pack factors, an expert survey, not a Google list (https://whitespark.ca/local-search-ranking-factors/). Google states its automated spam detection can mistakenly remove legitimate reviews (https://support.google.com/business/answer/4596773). Agency guidance after the February 2026 policy update warns against collecting reviews over the business Wi-Fi at scale (https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/); Google has not confirmed same-network filtering, so present it as a precaution. Never run a captive portal that pushes the review link, never have staff hold the guest's phone. The card itself says "Tap to review us on Google", "Hold your phone here" and a thank-you note on the back (`site/components/card/cardSpec.ts`); "now or whenever" is the server's line from the staff guide, not card copy.

**9. "I already have 4.7 stars and 600 reviews."**

> "Then you have the most to lose from going quiet. Three quarters of consumers look for a review from the last three months and a third want one from the last two weeks. Your rating is a trophy. Your recency is a heartbeat. Cards keep it going without you thinking about it, and the report tells you if something starts slipping before it shows in the stars."

74 percent and 32 percent: https://www.brightlocal.com/research/local-consumer-review-survey/. Recency of reviews ranks #11 in Whitespark's 2026 factors (https://whitespark.ca/local-search-ranking-factors/).

**10. "I need to talk to my partner" or "I'm too busy right now."**

> "Fair. I'll leave this one-pager and a demo card. Have your partner tap it. It's the fastest way to explain it. When are you both usually here? I'll come back then for ten minutes, and if it's a no, it's a no."

The card you leave is a generic `demo` card. Log the follow-up date before you leave the parking lot.

**Short answers you will also need**

- "Is it legal to ask?" Yes. The FTC rule bans compensation conditioned on a review's sentiment, undisclosed insider reviews and review suppression (https://www.law.cornell.edu/cfr/text/16/465.4, 465.5, 465.7). A neutral "tap to review us" card is none of those.
- "Do guests need an app?" No. iPhone XS and later and Android phones with NFC on read the card natively. Guests do need a Google Account to post (https://support.google.com/business/answer/7035772).
- "Cards will walk off." They will. Subscribers get 10 free replacements a month. Start with one card per check presenter plus spares in the POS drawer.
- "I read my reviews myself." 45 percent of consumers now use ChatGPT or similar tools to find local businesses and 82 percent read AI review summaries. Your reviews are what those tools read (https://www.brightlocal.com/research/local-consumer-review-survey/).
- "Can I try it free first?" No. "The report needs a month of your reviews to be worth anything, so instead of a trial you get a baseline report from the last 90 days within two days, and you can cancel anytime. If you cancel before you approve the card proof, you get a full refund."

---

## 5. The pilot offer (paid starter kit) and what to ask for in return

There is no free trial. `docs/06-pricing-and-unit-economics.md` section 7.2 rules it out ("Charge on day one and deliver a baseline report from the last 90 days of reviews within 48 hours instead") and section 6.3 shows why: the starter kit recovers a quarter to a half of acquisition cost on day one. A "pilot" is one of the first 10 paying restaurants. What makes it a pilot is the extra attention and the founding discount, not a lower price on cards.

**The offer, in one breath:**

> "Starter kit: ten cards with your logo plus the monthly report, $200 today, then $50 a month, cancel anytime. Because you're one of my first ten, the report is half price for three months. You get a baseline report from your last 90 days within two days, five loaner cards on the tables until yours arrive, the staff guide, a five-minute pre-shift training, and a 30-minute check-in at day 30. If it isn't useful, cancel; nothing prints until you approve the proof, and before that you get every dollar back."

**Mechanics**

| Item | Rule |
|---|---|
| Charge | Day one, on the order page, by the owner. One Stripe session: cards as a one-time line, report as the recurring line (`site/app/api/checkout/route.ts`). Sales tax added where required; US shipping included |
| Founding discount | 50 percent off the report for 3 months, first 20 local customers, Stripe coupon with `duration=repeating`, `duration_in_months=3`, `max_redemptions=20` (`docs/06-pricing-and-unit-economics.md` section 7.2). Never extended. Extension teaches the owner that price is negotiable |
| Baseline report | Within 48 hours of signing, from the last 90 days of reviews, by the manual process in `docs/07-launch-checklist.md` Week 4. Model cost under $1 (https://platform.claude.com/docs/en/about-claude/pricing); your QA time of 15 to 20 minutes is the real cost (unverified planning figure) |
| Loaner cards | Up to 5 generic Tablenote-design cards from demo stock, each written to the restaurant's own slug (Section 3.1 step 3), on the tables until the printed cards arrive, then collected and re-pointed. Never given away |
| Cost to you per pilot | Loaners that come back cost nothing beyond the demo stock. A loaner that is lost costs $5.35 (MPBC 25-card tier, landed, `docs/06-pricing-and-unit-economics.md` section 1.2) or $4.56 (Tagstand two-sided at 10, `research/suppliers.md` gap-fill section 8). Budget 2 lost cards per pilot, about $11, plus the discount: 3 x $25 = $75 of forgone report revenue |
| Cap | 10 simultaneous pilots. You still have to write the reports by hand |
| Cancellation | Cancel anytime from the Stripe customer portal. Full refund if cancelled before proof approval; no refund on printed cards after approval. Collect the loaners and delete or re-point the slug in `links.json` on the next deploy so a left-behind card does not keep working |
| Zero reviews at day 30 | Check the tap log first. Taps but no reviews means sign-in friction or filtering; talk through it. No taps means cards were not on tables; do a manager spot-check together and a second pre-shift, once |

**Success criteria you write on the pilot sheet on day 0**

- Baseline screenshot: rating, total reviews, date of newest review.
- Target: a modest number of new reviews in 30 days. There is no published tap-to-review conversion benchmark. The research assumed 1 to 2 percent of covers as a hypothesis (unverified); replace it with your own data after three pilots. Vendor claims such as TAPro's 60 to 70 percent tap completion are marketing and should not be repeated (https://taprocard.com/blogs/article/reddit-nfc-google-review-cards).
- Process: card in every check presenter, manager spot-check twice a week.

**What you ask for in return** (verbal on day 0, written at day 30)

- [ ] A 30-minute check-in at day 30 with the first full monthly report.
- [ ] If happy: a one or two sentence quotable testimonial with name, title and restaurant.
- [ ] Permission to show their logo and name on the site and one-pager.
- [ ] A short before/after case study (review count, rating, newest-review age over 30 days) that they approve before use.
- [ ] Two introductions to owners they respect. Ask at day 30, not day 0.

**Testimonial disclosure.** 16 CFR 255.5 requires disclosure of any connection that might affect the weight of an endorsement, including "free or discounted products" (https://www.law.cornell.edu/cfr/text/16/255.5; `docs/04-compliance-and-policy.md` section 2.3). Every quoted pilot that took the founding discount or kept a loaner card gets a visible line next to the quote, not in a footer: "[Restaurant] received a discount on the report as a founding customer." Do not claim "more reviews" or a percentage lift on the site until pilot data exists.

**Day 30 check-in line**

> "Here's your first full report, and here's the before and after: [N] to [N+k] reviews, newest review now [x] days old instead of [y] weeks. Two months left at half price, then $50. Anything you want the report to track that it doesn't? And if you know two owners who'd want this, I'd be grateful for the introduction."

---

## 6. Server adoption that stays inside Google policy

### 6.1 The lines you design around

From Google's Maps user-contributed content policy, Rating Manipulation section (https://support.google.com/contributionpolicy/answer/7400114): merchants "should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included." Prohibited examples include staff soliciting "a certain number of reviews" and reviews "that include specific content, including content that identifies a staff member." Also prohibited: discouraging negative reviews, selectively soliciting positive ones, and offering payment, discounts or free goods.

| Practice | Status |
|---|---|
| Card in every check presenter; server says one neutral sentence and walks away | Allowed. Google permits asking via a link or QR (https://support.google.com/business/answer/3474122) |
| "Do it before you go" or hovering while they tap | Not allowed: pressure on the premises |
| "Mention me by name" | Not allowed: content identifying a staff member |
| "If it was good, review us; if not, tell the manager" | Not allowed: gating |
| Free dessert or discount for a review | Not allowed by Google; illegal if tied to sentiment (https://www.law.cornell.edu/cfr/text/16/465.4) |
| Per-server review quotas, per-tap bonuses, per-server tap tracking, leaderboards | Do not do it. A per-tap bonus is a quota in disguise. Tablenote cards are per restaurant, never per server |
| A house tablet or kiosk for reviews | Do not do it. Third-party summaries of the 2026 update treat shared devices as violations (https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/) |
| Owner, manager or staff reviewing the restaurant | Not allowed: conflict of interest; insider review under 16 CFR 465.5 |

The research suggested a team reward for card placement compliance (not review counts) might be acceptable. That is an interpretation, not Google text. Skip it for now. Recognition, not rewards.

### 6.2 The habit

1. **The card lives in the check presenter.** Where the check goes, the card goes. No new step. Spares in the POS drawer.
2. **One line, once, then walk away.** The printed staff guide already carries it: "If you'd like to leave us an honest review on Google, just tap your phone on this. Now or whenever." Then leave the table. No second ask, no watching.
3. **Pre-shift, five minutes, once.** You attend the first pre-shift. Demo the tap on two staff phones. Hand out the laminated guide. Answer the discount question: "We never offer one. It's against Google's rules and can get the restaurant's reviews removed."
4. **Manager spot-check, twice a week.** Open three check presenters at random. Card present, yes or no. That is the only staff metric.
5. **Monthly read-out, no winner.** When the report lands, the owner reads a few guest quotes about the team aloud at pre-shift, as guest comments about the whole floor, without naming a winner or counting mentions per person, and repeats every time: "Guests said this on their own. We never ask anyone to mention a name." Naming a monthly winner would give servers a standing reason to ask for name mentions, which is the content solicitation Google bans (https://support.google.com/contributionpolicy/answer/7400114; `docs/03-google-reviews-and-report-pipeline.md` section 6.2).
6. **Taps by day and shift, never by server.** The redirect logs taps per restaurant slug. Show "taps by day of week" in the report to spot "cards not on tables Sunday brunch". Never rank servers.

The staff guide text is in `site/app/(print)/print/staff-guide/page.tsx` and exports to `cards/exports/print/staff-guide.pdf`. Its "never say" list is: "Only if it's five stars," "I'll take something off the bill," "Mention my name," and "Could you do it before you go?"

---

## 7. Demo kit packing list and how to produce each item

Carry it in a slim folio. You should look like a guest who wandered in, not a delivery.

| Item | Quantity | How to produce it from this repo or where to buy |
|---|---|---|
| Generic demo cards on the `demo` slug | 5 | Export `cards/exports/demo-your-restaurant/` (default run of `node scripts/export-cards.mjs`, two terminals, Section 3.1 step 2) and print at My Plastic Business Card (25 for $123.75 plus $10 shipping, both sides, 5 business days, https://myplasticbusinesscard.com/product/quick-plastic-nfc-business-cards/). Never pointed at a prospect's review page |
| Finished-design sample cards (Lucia's Trattoria templates: classic, noir, logo, brand) | 1 each | Same default export produces `cards/exports/lucias-*/`; print in the same MPBC order (or Tagstand two-sided at the tiers in Section 3.1). These let the owner hold the real thing and pick a direction |
| Check presenter with a card tucked in | 1 | WebstaurantStore vinyl 5 x 9 in $2.89, or leather-like with clip $8.19; avoid stainless steel, a card lying on metal does not read (https://www.webstaurantstore.com/search/check-presenter.html and https://seritag.com/learn/using-nfc/on-metal-nfc-tags, via `docs/01-ordering-guide.md` section 4). Makes the "no new step" argument in two seconds |
| Acrylic table tent or stand with a card | 1 | Any 4 x 6 in two-sided acrylic tent from WebstaurantStore (https://www.webstaurantstore.com/search/table-tent.html). Price unverified: no research file records a tent price; the only sourced tent (Displays and Holders) is quote-only (`docs/01-ordering-guide.md` section 4). Note the price you paid and the date. Shows the counter option for cafes |
| Printed staff guide, laminated | 3 | `cd site && node scripts/export-print.mjs` writes `cards/exports/print/staff-guide.pdf`. Add `--name "Restaurant Name"` for a personalized copy at onboarding. Laminate at any print shop |
| Sample report one-pager, color, heavy paper | 10 | Same script writes `cards/exports/print/sample-report-onepager.pdf`. Fictional restaurant, labeled as a sample |
| One-page leave-behind | 10 | Not yet in the repo. Contents: three bullets on what it is, the pricing table ($15 per card, $50 a month with 10 replacements, starter kit $200 then $50), the founding offer (baseline report in 48 hours, half-price report for 3 months, cancel anytime), four sourced stats (97 percent read reviews, 74 percent look for reviews from the last three months, 83 percent of those asked leave one, 60 vs 29 positive vs negative, all https://www.brightlocal.com/research/local-consumer-review-survey/), your phone, email and Tablenote's physical postal address, a QR to tblnt.com/demo. Suggested: add a `/print/leave-behind` page next to the existing print pages and extend `export-print.mjs` |
| Pilot sheet, two copies | 5 sets | Not yet in the repo. Fields: restaurant, decision-maker, order date, loaner cards issued and slug, day-0 baseline, baseline report due date, what you deliver, what you ask in return, "starter kit $200 today then $50 a month, report half price for 3 months, cancel anytime; full refund if cancelled before proof approval." Both sign. It is a memory aid, not a contract; the Stripe receipt is the record of sale |
| Business cards | 20 | Local print shop. Plain text; no Google logo, no Google colors (https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/) |
| Your phone | 1 | Order page open, Place ID Finder bookmarked, `links.json` in the GitHub app, Google Maps, and today's targets' review URLs in Notes (Section 3.1 step 1). This is how the owner sees their own review page |
| A second phone (Android) | 1 if you can borrow one | Answers "does it work on Android?" on the spot |
| Blank NTAG213 cards, paper labels, screen wipe, pen | 10, 10, 1, 1 | Loaner cards for a restaurant that signs on the spot (Section 3.1 step 3). Never written to a prospect's page before they order |

Kit cost, order of magnitude: 25 printed cards at MPBC $133.75 delivered (or 50 at $3.96 plus $10 shipping, $208), presenter $2.89 to $8.19, tent unpriced, laminating and report prints from a local shop (unpriced). Roughly $150 to $230 before print-shop costs. This total is arithmetic on the sourced card and presenter prices above, not a figure from the research.

---

## 8. Tracking sheet and the first 50 targets

### 8.1 Sheet 1: Targets (one row per restaurant)

| Column | Notes |
|---|---|
| ID | T001 to T050 |
| Restaurant name | |
| Neighborhood | Group rows by neighborhood for route planning |
| Cuisine / service style | Full table service with check presenters is the fit. Counter service needs the stand |
| Est. covers per night | Your guess; refine after signing |
| POS / platform | Toast, Square, Clover, OpenTable, Popmenu. Shapes objection 7 |
| Google rating (day 0) | From Maps |
| Google review count (day 0) | |
| Newest review date (day 0) | The staleness hook |
| Rating gap | Rating of the two closest comparable restaurants minus theirs |
| Owner replies to reviews? | Y/N. Either answer is a hook |
| Place ID | For the review URL in Notes and for onboarding. Refresh if older than 12 months (https://developers.google.com/maps/documentation/places/web-service/place-id) |
| Slug | Assigned only after the restaurant orders, e.g. `bluedoor-t01` (`docs/03-google-reviews-and-report-pipeline.md` section 1.5) |
| Decision-maker name / role | Owner, GM, chef-owner |
| Best day and time | From the host or Popular times |
| Phone / email | Only if offered. Do not pull numbers off the listing for texting |
| Stage | Not visited, Visited (no DM), Pitched, Paying (pilot), Paying, Lost, Parked |
| Last touch date | |
| Next action and date | The only column you sort by each morning |
| Objection heard | 1 to 10 from Section 4. Tells you what to fix in the pitch |
| Order date / loaners out / printed cards delivered | |
| Cards issued | |
| Taps logged | From the tap webhook, weekly |
| Testimonial? / Logo OK? | Y/N |
| Notes | |

**Sheet 2: Touches.** Date, target ID, type (walk-in, call, text, email), who you spoke to, outcome, next step.

**Sheet 3: Pilots.** Day-0 rating, count, newest-review date; day-30 rating, count, newest-review date; taps logged; new reviews; still subscribed at day 30 Y/N; testimonial text; disclosure line needed Y/N.

**Weekly scorecard at the top:** walk-ins, decision-maker conversations, demos performed, kits sold, pilots active, paying total, MRR.

### 8.2 Cadence

| Day | Action |
|---|---|
| 0 | Walk in. Demo if the decision-maker is present; leave-behind plus a generic demo card if not. Log it |
| 2 | Short text or email, only if they gave it: "Thanks for the minute Tuesday. The card I left opens our sample report, worth a tap to see what the monthly report looks like. I'll swing by [day] at [time]." |
| 7 | Second walk-in at the time the host told you. Bring the sample report again and the order page |
| 14 | Call, or a third walk-in if no phone. One question: "Is the hesitation the cards, the report, or the timing?" |
| 30 | Final touch: "Last check-in from me. I've got [N] founding slots left this month. If it's not a fit, no hard feelings." Mark Lost or Parked (re-approach in 90 days) |

Email and text rules: every email carries Tablenote's physical postal address and a working unsubscribe, per CAN-SPAM (`docs/04-compliance-and-policy.md` section 8.1; https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business). Texts are typed by hand, only to a number the owner gave you, after checking the number against the Do-Not-Call list if it could be personal; no automated or scheduled texts without prior express written consent (`docs/04-compliance-and-policy.md` section 8.2; https://www.law.cornell.edu/cfr/text/47/64.1200). Until the leave-behind with the address exists, put the address in your email signature.

Weekly rhythm: Tuesday, Wednesday and Thursday afternoons, 8 to 10 walk-ins each, grouped by neighborhood. Monday morning: look up the week's targets, save their review URLs in Notes, and refresh the sheet. Friday morning: write baseline and monthly reports, send day-2 messages.

### 8.3 Picking the first 50 targets in [CITY] from Google Maps signals

Budget two hours. Pick three or four neighborhoods with dense independent dining so a Tuesday afternoon covers 8 to 10 doors on foot. In each, search "restaurants" on Google Maps, open every listing, and record rating, review count, newest review date and Popular times.

Score each restaurant on these signals:

| Signal | What to look for | Why |
|---|---|---|
| Review count | 20 to about 400 | 47 percent of consumers will not use a business with fewer than 20 reviews, so under 20 is a strong hook if the owner is established; over 500 gets objection 9 (https://www.brightlocal.com/research/local-consumer-review-survey/) |
| Recency | Newest review older than 14 days | 32 percent want a review from the last two weeks; 74 percent look for one from the last three months (same source). This is the line you quote at the table |
| Rating gap | 3.8 to 4.5 stars while comparable places nearby sit at 4.5 or higher | 68 percent require at least 4 stars (same source). The Yelp studies found the effect strongest for lesser-known restaurants (https://news.berkeley.edu/2012/09/04/yelp-reviews-boost-restaurant-business/) |
| Service style | Full table service, check presenters | The card-with-the-check ritual is the product. Counter service is a later stand product |
| Ownership | Independent, one to three units | 7 in 10 restaurants are single-unit (https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/) |
| Lull | Popular times shows a clear afternoon dip | You need a time when the owner can sit for three minutes (https://support.google.com/business/answer/6263531) |
| Owner replies | Replies to reviews | Shows they care and read reviews; the report saves them time. No replies is also a hook: 42 percent are unlikely to use a business that ignores reviews (BrightLocal, same source) |

Exclude: chains and franchises, anything under 3.5 stars (more reviews will not fix the kitchen and you do not want your name on it), listings marked temporarily closed, and places visibly for sale. Rank the rest by recency gap first, then rating gap, and take the top 50. Log the 51st to 80th as "Parked" so you have a bench.

---

## 9. Onboarding checklist for a signed restaurant

Do it in one 20-minute sitting with the decision-maker and email a copy the same day.

**A. The Google review link (most important)**

- [ ] Owner opens Business Profile, Read reviews, Get more reviews, and copies the link (https://support.google.com/business/answer/16816815). It looks like `https://g.page/r/<code>/review`. Paste it into the slug's `note` in `site/data/links.json` for provenance, with today's date.
- [ ] Extract the Place ID from that link: `curl -s -o /dev/null -w '%{redirect_url}\n' -A 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1' 'https://g.page/r/<code>/review/'` (trailing slash and a real mobile user agent; `docs/03-google-reviews-and-report-pipeline.md` section 1.3). The `placeid=` in the redirect is the ID. Check it matches the one in your sheet.
- [ ] Set `to` to the bare URL `https://search.google.com/local/writereview?placeid=<PLACE_ID>`, nothing appended. Never set `to` to the g.page link: it is a two-hop redirect that sends desktop user agents to a Maps listing instead of the review form (`docs/03-google-reviews-and-report-pipeline.md` section 1.1). One slug per card, `<restaurant>-t01`, `<restaurant>-t02`; never a server's name.
- [ ] If they cannot access the profile (lost login, ex-manager owns it): use the Place ID from the Place ID Finder for now, note "profile access = No", and help them claim it. A complete, accurate profile also matters for ranking (https://support.google.com/business/answer/7091).
- [ ] Record the Place ID and today's date. Re-verify the link every 12 months.
- [ ] Deploy. Test `https://tblnt.com/r/<slug>?s=card` on an iPhone and an Android: a signed-out phone must land on `accounts.google.com/ServiceLogin?continue=...writereview?placeid=<same ID>`.

**B. Order and artwork**

- [ ] Place the order on the order page (starter kit 10 cards plus report, $200 today then $50 a month; extra cards $15; minimum 5). Apply the founding-restaurant promotion code. The owner enters payment. Confirm the billing email and shipping address.
- [ ] Collect the logo: SVG or PDF preferred, otherwise PNG at least 1,000 px wide. Brand color as hex if they have one.
- [ ] Card front choice: plain "Tap to review us on Google" or logo plus the same prompt. No stars, no Google logo, no incentive wording. Approved prompts only.
- [ ] Send the digital proof within 2 business days. Get written approval. Remind them: full refund if cancelled before proof approval; no refund on printed cards after approval.
- [ ] Cards ship about 10 business days after proof approval, US shipping included. Encode `https://tblnt.com/r/<slug>?s=card`, test, then lock read-only.
- [ ] Write up to 5 loaner cards to the slug (Section 3.1 step 3) and put them in the check presenters today. Collect them when the printed cards arrive.

**C. Floor facts**

- [ ] Number of tables and check presenters. Cards to issue: one per presenter plus about 20 percent spares.
- [ ] Counter or host-stand placement wanted? Add a stand.
- [ ] Pre-shift day and time for the five-minute training. Number of servers.
- [ ] Which manager does the twice-weekly spot-check.
- [ ] Print a personalized staff guide: `node scripts/export-print.mjs --name "Restaurant Name"`. Laminate two copies.

**D. Report settings**

- [ ] Recipient emails (owner plus GM; ask if the chef wants the dish section).
- [ ] Baseline report due within 48 hours of today, from the last 90 days of reviews. Then the first of the month by default.
- [ ] How the report gets their reviews. The sanctioned route is the owner adding your Google account as a Manager on the profile (Owner is better for the first pilot, `docs/03-google-reviews-and-report-pipeline.md` section 3.4), or OAuth consent through the Business Profile API once your own API access is approved (https://developers.google.com/my-business/content/prereqs). Signed authorization on file. Scrapers are a temporary bridge, used only for restaurants that signed the authorization, until the Business Profile API is approved; never alongside Places API calls from the same Google account (https://cloud.google.com/maps-platform/terms; `docs/03-google-reviews-and-report-pipeline.md` section 4).
- [ ] Staff-name handling. Two options, per `docs/03-google-reviews-and-report-pipeline.md` section 6: include first names as guests wrote them, or redact staff names ("Redact staff names in my report" toggle). Either way negative mentions go only as a private note to the owner, the section is headed "Guest comments that mention team members" with the standing disclaimer, and the restaurant agrees in writing not to use the report for pay, tips, scheduling or discipline. Hand over the written staff notice from section 6.3. Confirm the report never asks guests to name staff.
- [ ] Menu list (a photo of the menu is enough) so dish mentions match.
- [ ] Anything they want tracked specifically (parking, brunch wait times).
- [ ] Who replies to reviews. The report will include "reply to these three first".

**E. Admin**

- [ ] Contact for replacement cards; explain 10 free per calendar month while subscribed, on request, no rollover, extras $15 each.
- [ ] Cancel-anytime terms confirmed in writing.
- [ ] Day-0 screenshot of rating, count and newest-review date saved to the Pilots sheet.
- [ ] Add the restaurant to the tap webhook dashboard (`TAP_WEBHOOK_URL` in `site/.env.example`).

---

## 10. Positioning: five angles and the prices to quote

### 10.1 Five messaging angles, each tied to a competitor gap

| # | Angle | Competitor gap it exploits | Source |
|---|---|---|---|
| 1 | "Every table, every night. Not a stand by the register." | Almost every card seller ships a counter stand. Owner threads summarized by vendors say passive placement fails and the card must be handed over at the happy moment. We sell the ritual, the script and the training | https://prosperqr.com/blog/google-review-cards-worth-it-reddit |
| 2 | "Your reviews, read for you every month, with the names your guests actually mention." | Staff-level insight is rare. Local Falcon sells a $19 per-report SEO tool with staff mentions; Tattle starts at $125 per location for 5 to 10 units (its team-member filter is unverified); Birdeye is a third-party-estimated $299 and up per location. Say clearly that we never ask guests to name staff and never rank them | https://www.localfalcon.com/features/reviews-analysis; https://get.tattleapp.com/pricing; https://birdeye.com/pricing/ |
| 3 | "Straight to Google's real review screen. No filters, no gating, no tricks." | Tap Tag Review+ ($19/month), Taps Reviews Review Filtration Plus+ ($9.99/month) and GrowSEO sell gating that violates Google's policy and the FTC rule. A compliance page quoting the policy is a differentiator | https://taptag.shop/pages/tap-tag-pricing; https://tapsreviews.com/products/review-filtration; https://growseo.com/review-cards/google-reviews-card.php; https://support.google.com/contributionpolicy/answer/7400114 |
| 4 | "Cards walk away. We replace them free, ten a month." | No seller found offers ongoing free replacements; the best are 30 to 90 day refunds and defect warranties (TapFive 90-day, Review Highway lifetime warranty, Reviews Card lifetime warranty) | https://shop.tapfive.com/; https://reviewhighway.com/google-review-devices-faq/; https://www.reviewscard.com/products/google-tap-to-review-cards |
| 5 | "$50 a month. No annual contract. No onboarding fee. Cancel anytime." | Restaurant suites run $80 to $449 per location per month, mostly on annual terms: Reputation.com $80 to $150 (official), Marqii $90 to $180 per location on annual contract (official), Birdeye about $299 to $449 (third-party estimate), Tattle $125 per location for 5 to 10 units | https://reputation.com/pricing; https://marqii.com/pricing; https://birdeye.com/pricing/; https://get.tattleapp.com/pricing |

Bonus angle for the FAQ: "A link we maintain, on a domain we own." Hosted-redirect vendors go dark and cards die with them (Tap 2 on Trustpilot: https://ca.trustpilot.com/review/tap-2.com). Offer hard-coding the Google link on request, as Tap Tag does (https://taptag.shop/products/tap-review-card).

Do not claim to be the cheapest card. Ninja Pop is $9.97. Claim fair: $15 with a logo sits below Tap Tag ($15.95 to $19.95 on sale), TapFive ($19.95), TAPro ($34.95) and Reviews Card's custom card (£25, about $33.79 at 2026-09-04 rates, https://open.er-api.com/v6/latest/USD).

### 10.2 Exact competitor prices to quote if asked

Hardware (prices as displayed on 2026-09-04; sale prices where shown):

| Seller | Single card | Packs | Subscription | Source |
|---|---|---|---|---|
| Ninja Pop | $9.97 | 2 cards $19.99 on Amazon | None | https://ninjapop.io/products/ninja-pop-google-review-card-contactless-review-card |
| Revuzee | Plain from $14.99 (reg $29.99); custom logo from $19.99 (reg $39.99); $14.95 on Amazon | Stand 10-pack $99.99 | None | https://revuzee.com/ |
| Tapping Tags | $18.90 | 10 for $98.90 ($9.89 each) | None | https://tappingtags.com/product/google-review-nfc-and-qr-code/ |
| Tap Tag | $15.95 to $19.95 sale (reg $24.95) | 10 cards 20 percent off | Optional Review+ $19/month (includes gating) | https://taptag.shop/products/tap-review-card; https://taptag.shop/pages/tap-tag-pricing |
| TapFive | $19.95; stand $49.95 | 10 cards $99.95 ($10 each); 20 for $147.95 | None; 90-day money-back | https://shop.tapfive.com/ |
| TAPro G-Series Onyx | $34.95 (reg $39) | 5 for $129; 10 for $199; 100 for $1,299 ($12.99 each) | None; no dashboard, reprogram with NFC Tools | https://taprocard.com/products/g-series-onyx-google-review-card |
| Popcard | From $39.90 (reg $79.90) | Not published | None | https://popcard.io/ |
| Review Highway | $39.90; stand $49.90 (Amazon stand $29.90) | 3 cards $49.90; 5 for $59.90 | None | https://reviewhighway.com/shop/ |
| Reviews Card (UK) | £16 sale (about $21.63); custom £25 (about $33.79) | 10 for £7.90 each | None | https://www.reviewscard.com/products/google-tap-to-review-cards |

Software and reports:

| Product | Price | Confidence | Source |
|---|---|---|---|
| Local Falcon AI Reviews Analysis | $19 per location per report; can be scheduled monthly | High (feature page) | https://www.localfalcon.com/features/reviews-analysis |
| GLocal by Wiremo | From $29.99/month | Medium | https://wiremo.co/google-review-management/ |
| Reputation.com | $80 / $115 / $150 per location per month | High for prices; contract term unverified | https://reputation.com/pricing |
| Marqii | $90 Base / $145 Pro (adds review monitoring and AI summaries) / $180 per location, annual | High (official) | https://marqii.com/pricing |
| GatherUp | $99 single location; $60 per location for 2 to 10; 14-day trial | High (official) | https://gatherup.com/pricing/ |
| Tattle | $125 per location for 5 to 10 units, down to $65 at 51 to 200 | High for prices; "5-location minimum" is an inference | https://get.tattleapp.com/pricing |
| Yext Listings | $199 / $449 / $499 / $999 per year per location; review monitoring only in Premium | High (official) | https://www.yext.com/plans |
| Owner.com | $249/month plus 5 percent per order, or $499/month flat | High (official) | https://www.owner.com/pricing |
| Popmenu | Premier $499/month ($449 annual) includes AI review replies | Third-party | https://restauranttools.ai/tools/popmenu |
| OpenTable | $149 / $299 / $499 per month plus per-cover fees | Third-party, July 2026 | https://restauranttools.ai/tools/opentable |
| Birdeye | About $299 / $349 / $449 per location per month, annual | Third-party estimate (Costbench, Aug 2026); official site is quote-only. Do not cite an onboarding fee | https://birdeye.com/pricing/ |
| Podium | Quote-only | Do not quote a dollar figure | https://www.podium.com/pricing |
| Google Business Profile | Free AI review summaries inside the profile | Rollout share is third-party; say "Google shows free summaries" and stop there | https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026 |

Leave Review Report ($30/month) out of any comparison until its site responds; it returned 503 on 2026-09-04 (https://alternativeto.net/software/review-report/about).

One-line version for the table: "Cards elsewhere run $10 to $40 each with no logo and no replacements. Restaurant reputation software runs $80 to $450 a location a month on annual contracts. We're $15 a card and $50 a month, month to month."

# From order to report: the operating process

One page on how a restaurant moves from a pitch to receiving monthly reports, who does what, and which tool handles each step. Depth lives in the numbered docs referenced at each stage.

## What exists today, and what still has to be built

| Stage | Exists now | Still to build |
|---|---|---|
| Pitch | `/pitch` prep tool, personalized deck, demo cards, sample report, demo dashboard | |
| Order | Online checkout (Stripe, cards + subscription), order-by-email fallback, Stripe webhook that posts each order to your tracker | Your tracker itself (an Airtable base or a Google Sheet behind `ORDER_WEBHOOK_URL`) |
| Design preview | Export scripts produce print files from name, logo, color | Email sending (today you email the preview yourself) |
| Links | Redirect layer `/r/<slug>`, tap counting to `TAP_WEBHOOK_URL` | A runtime slug store if you want to change links without a redeploy |
| Printing | Supplier shortlist, artwork spec, encoding and lock instructions | |
| Onboarding | Staff guide PDF, review policy page, Google link guide | |
| Monthly report | Report layout and one-pager (with sample data) | Review pull (Google API or Apify), the AI generator, PDF and email delivery |
| Dashboard | Demo dashboard | Real login, per-restaurant data |

## Stage 0. Pitch

1. Look up the restaurant on Google. Note rating, review count, and date of the most recent review.
2. Open `/pitch` on your laptop. Add the restaurant, upload the logo from their website or Google listing, pick a color, enter the three Google numbers and the owner's first name. Save the preview image to your phone, or copy the deck link.
3. Optional, for a strong prospect: point the `demo` slug at their real review page for the visit. Edit `site/data/links.json` (`"demo": { "to": "https://search.google.com/local/writereview?placeid=<their Place ID>" }`), deploy, and change it back afterwards. Find the Place ID with Google's Place ID Finder (`03-google-reviews-and-report-pipeline.md`, section 1).
4. Walk in Tuesday to Thursday, mid-afternoon. Scripts, objections and the pilot offer are in `05-sales-playbook.md`.

## Stage 1. Order (day 0)

Two ways an order arrives:

- **Online.** The owner uses `/order`. Stripe charges cards today and starts the subscription. Stripe calls `/api/stripe/webhook`, which emails the order to `ORDER_EMAIL_TO` and, if `ORDER_WEBHOOK_URL` is set, also posts it as JSON to an Airtable webhook, Zapier, or Make so every order becomes a row.
- **By email.** If checkout is not configured, the order form sends an order request to `LEAD_WEBHOOK_URL`. You reply with a Stripe payment link (Dashboard > Payment links: one link for cards, one for cards plus subscription).

### The two emails one online order sends

| | Sent when | Subject starts | What is in it |
|---|---|---|---|
| **Artwork** | They reach the Stripe payment page | `Artwork:` | A picture of the card front as they built it, the logo shown on white, **the logo file attached at full size**, and every design setting. |
| **New order** | Their payment clears | `New order:` | What they paid, quantity, shipping address, where the cards should point, notes, and the next steps. |

Why two: the logo lives only in their browser until they submit, and Stripe metadata caps at 500 characters per value, far too small for an image. `/api/checkout` therefore sends the artwork while it is still holding the file, using Next's `after()` so the payment page is never delayed. An artwork email with no matching order means someone designed a card and did not pay — worth a phone call.

Preview both at `/print/order-email` on the dev server.

Same day: send a one-line confirmation. "Got your order. Your design preview arrives within 2 business days. Reply with your logo if you did not upload one."

## Stage 2. Design preview (day 1 to 2)

1. Put their logo at `site/designs/<slug>/logo.png` (any folder works; the export script takes a path).
2. Create a design list file, for example `site/designs/<slug>.json`:

```json
[{ "slug": "blue-door", "template": "brand", "name": "Blue Door Bistro", "color": "#1e3a5f", "headline": "Tap to review us on Google", "subline": "Hold your phone here", "url": "yourdomain.com/r/blue-door", "logo": "designs/blue-door/logo.png" }]
```

3. Export: `cd site && node scripts/export-cards.mjs designs/blue-door.json`. Files land in `cards/exports/blue-door/`.
4. Email the front and back PNGs. Ask for a written yes. No printing before that reply (terms, section 5).

## Stage 3. Google link and slug (day 1 to 3)

1. If the owner gave you a review link or Place ID, use it. If they chose "set it up for me", find the listing with the Place ID Finder and build `https://search.google.com/local/writereview?placeid=<ID>`. Test it in a private browser window: it should open the review dialog (after Google sign-in).
2. Add the slug to `site/data/links.json` and deploy. Test `https://<yourdomain>/r/<slug>?s=card` on your phone.
3. Record slug, Place ID, and review URL in the tracker row.

## Stage 4. Print (day 3 to about day 13)

1. Order from the production supplier (`01-ordering-guide.md`, section 7). Quantity: what they ordered, plus 10 for you to hold as their replacement stock.
2. Encoding string for the order: `https://<yourdomain>/r/<slug>?s=card`, one URL record per card, **locked read-only**. If the supplier cannot lock, lock them yourself on arrival (`02-nfc-tech-spec-and-encoding.md`, section 4).
3. When cards arrive: tap five at random on an iPhone and an Android. Scan the QR on two.

## Stage 5. Deliver and onboard (about day 14 to 20)

1. Print the staff guide with their name: `node scripts/export-print.mjs --name "Blue Door Bistro"`. Laminate three.
2. Deliver in person if they are local. Fifteen minutes with the servers: the one optional line, walk away, never mention stars, never offer anything. The guide says the same thing.
3. Confirm with the owner: who receives the report (emails), whether server names appear in it, and the Google access route for the review pull (`03`, section 3): either they add your business email as a Manager on the Business Profile, or they connect through OAuth once your app is verified.
4. Tracker row: delivery date, card count, recipients, staff-naming preference, Google access status.

## Stage 6. The month in service

- Weekly: glance at taps per restaurant in the tap sheet (`TAP_WEBHOOK_URL`). A restaurant with zero taps for a week has a training problem, not a card problem; call the manager.
- Replacement requests come from the dashboard form or email. Ship from the spare stock within a few days; log the count against the 10 per month allowance.
- Reply drafts for negative reviews are a service, not a policy requirement; offer them when a low-star review appears.

## Stage 7. Month end: the report (1st to 5th of the month)

Until the automated pipeline is built, this is a manual run. Each step maps to a piece of `03-google-reviews-and-report-pipeline.md`.

1. **Pull the month's reviews.** Preferred: Google Business Profile API (`accounts/{a}/locations/{l}/reviews`), which you can call once Google approves your project and you have Manager access or OAuth consent. Bridge until then: the Apify Google Maps Reviews scraper with a date cutoff. Save the raw reviews as JSON per restaurant per month.
2. **Generate the draft** with the Claude API using the report prompt in doc 03 (sections and rules: wins, issues with fixes, staff and dish mentions only when guests name them, priority actions, drafted replies, no invented facts, no policy-violating suggestions). Cost per restaurant is cents (`06-pricing-and-unit-economics.md`, section 1).
3. **Human check, ten minutes.** Every number traceable to a review. Names only where a guest wrote them. Tone matches the sample. Remove anything that reads as a promise.
4. **Deliver.** Email the PDF and the one-page summary between the 3rd and the 5th, with the three priority actions in the email body. Update the dashboard when the real one exists.
5. **Log it.** Tracker row: reviews this month, rating, taps, delivery date.

## Stage 8. Billing and retention

- Stripe renews the subscription monthly. Failed payments: Stripe emails the owner and retries; if it fails for a week, pause the report and call.
- After report 2, ask the owner for a testimonial and permission to use the logo.
- Upsell only when taps show cards are short: "you had 300 taps on 10 cards; a second set for the patio would cost $150."

## Stage 9. Cancellation

Cards stay theirs. The redirect stays live for as long as you operate the service, whether or not they subscribe (terms, section 2), so the cards keep working. Free replacement cards stop with the subscription.

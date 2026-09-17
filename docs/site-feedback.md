# Site feedback session, 2026-09-05

Notes taken from the founder's annotated screenshots. Status column updated as items ship.

| # | Page | Feedback | Decision | Status |
|---|---|---|---|---|
| 1 | /order | After uploading a logo the live preview looks stuck (brand color no longer changes anything; other templates hide the logo) | Show the logo on every template; brand color drives the tap mark on all templates | done |
| 2 | /order | Remove the "5 cards" quick pick; we want bigger orders | Quick picks 10/20/30/50; minimum order raised to 10 (PRICING.minCards) | done |
| 3 | /order | Report should be opted in by default; the report is where the money is | Report on by default, small "remove" link to opt out | done |
| 4 | /order | Rule of thumb should suggest more cards (several tables close at once) | "Two cards per server on the floor" | done |
| 5 | site-wide | Stop using the word "proof" | Replace with "design preview" | done |
| 6 | /pricing estimator | Suggested cards too low (24 tables gave 6) | One card per two tables, minimum 10 | done |
| 7 | /pricing | Move "10 free replacement cards every month" to the second bullet of the report card | Reorder bullets | done |
| 8 | /order | Google link step: first option should be "tell us the restaurant name and address, we set it up"; self-service link second | Two-option step, address field added, link field secondary | done |
| 9 | home | Show that more reviews mean higher Google ranking and more foot traffic | New "Why reviews matter" section with sourced stats and a map-ranking illustration | done |
| 10 | new | Is there a dashboard for subscribers? | Not yet. Build a demo owner dashboard at /dashboard (reports, taps, cards, replacements, Google link, billing); real login comes with the report pipeline | done |
| 11 | new | Order demo cards | Cannot purchase on the founder's behalf; wrote docs/08-demo-card-order-pack.md with supplier, files, options and budget | done |
| 12 | new | Preview custom cards with a restaurant's logo before a visit | Built /pitch (per-restaurant profiles, logo, four designs, save as image, deck link) | done |
| 13 | new | Process from purchase to report | Wrote docs/09-order-to-report-process.md; added Stripe webhook /api/stripe/webhook posting orders to ORDER_WEBHOOK_URL | done |
| 18 | deck | Fifty a month is not good: show top steak and seafood rooms; slide 5 as side-by-side, not a table; crop white space from the report one-pager | Researched and verified velocity (STK 219, Atlanta Fish Market 119, Fogo 94 vs about 70); rebuilt slide 5; export now crops to the page | done |
| 17 | deck | Cover uses logo-forward card; drop "more than any steakhouse near the mall"; remove the Google-rules slide; add a review-impact graph; add the full monthly report example | Applied to the web deck and the PowerPoint builder; rules content moved to the brief talking points | done |
| 16 | new | Mark up the pitch deck like the website | Added /pitch/deck?pack=&view=all review view (all slides stacked, numbered) plus /api/pitch-packs so any browser can load a pack by slug | done |
| 15 | new | Per-restaurant pitch pack from a name | Built scripts/pitch-pack.mjs + research JSON schema (docs/10-pitch-pack.md); deck gained "what guests say" and real map-ranking slides; /pitch imports profile JSON | done |
| 14 | new | Simple, editable pitch deck | Web deck at /pitch/deck (personalized, PDF export) and PowerPoint template deck/pitch-deck-template.pptx (scripts/build-pitch-deck.cjs) | done |

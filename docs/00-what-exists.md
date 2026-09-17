# What exists, in one page

Everything built for the launch as of 2026-09-05, and what still needs you. Working name: Tablenote (one line to change in `site/lib/brand.ts`).

## The website (`site/`)

Run it: `cd site && npm run dev`, then open http://localhost:3000.

| Page | What it does |
|---|---|
| Home | Hero with the card, how it works, why reviews matter (sourced stats, map illustration), the card designs, the report preview, pricing summary, FAQ, book-a-demo call to action |
| How it works | The three-step story, the first 30 days timeline |
| Sample report | Full fictional monthly report with charts, staff and dish mentions, priority actions, drafted replies |
| Pricing | Cards vs cards-plus-report, table-count estimator, comparison table, pricing FAQ |
| Order | Card configurator with live front and back preview, logo upload, quantity, report included by default, "find my Google listing for me" option, Stripe Checkout |
| Order success | Reads the Stripe session and shows what happens next |
| FAQ | 30 questions in six groups |
| Book a demo, Contact | Lead forms |
| Find your Google review link | Guide for owners plus a link builder |
| Dashboard | Demo of the owner dashboard with sample data: taps, reviews awaiting reply, past reports, replacement cards, settings |
| Legal | Privacy, terms, review policy |
| Pitch prep (`/pitch`) | Internal. Per-restaurant profiles, logo, four designs, save preview as image, prepared packs |
| Pitch deck (`/pitch/deck`) | Internal. Personalized 11-slide deck; `?pack=<slug>` loads a pack, `&view=all` stacks every slide for markup, `g` toggles |

Behind the pages: Stripe Checkout (`/api/checkout`), a Stripe webhook that posts each order to your tracker (`/api/stripe/webhook`), lead capture (`/api/lead`), the NFC redirect layer (`/r/<slug>`, destinations in `site/data/links.json`), and the pitch-pack API.

Verified: type-check, lint, and an accessibility scan with zero violations on every route; card QR codes machine-decoded; four-lens QA review with 49 fixes applied.

## Card artwork (`cards/`)

- Four designs: Classic, Noir, Brand color, Logo forward. Front and back, print-ready PDF plus 300 dpi PNG, 3 mm bleed. No star graphics, no Google logo, by policy.
- Any restaurant's logo drops onto every design; dark designs knock it out to a paper silhouette.
- `cards/exports/print/`: letter-size staff guide and the sample report one-pager.
- Regenerate: `cd site && node scripts/export-cards.mjs` and `node scripts/export-print.mjs`.

## Pitch packs (`cards/pitch/<slug>/`)

Give a restaurant name and city in chat; the research runs, then `node scripts/pitch-pack.mjs research/<slug>.json` produces: `brief.md` (numbers, opening line, talking points, what guests say, competitors, benchmarks, objection, 20 pre-visit notes), `profile.json`, `preview-sheet.png`, `cards/`, and a filled PowerPoint.

Done so far: Dominique's (Stonecrest), plus a fictional test restaurant.

## Pitch deck (11 slides, web and PowerPoint)

Cover with their Logo forward card, their Google numbers today, what their guests already say, why it matters with the real nearby comparison, the gap (three verified Atlanta steak and seafood rooms at 94 to 219 reviews a month beside their ~70), how it works, their card designs, the monthly report built from their reviews, the full one-page report example, pricing, next step.

Template: `deck/pitch-deck-template.pptx`. Generator: `site/scripts/build-pitch-deck.cjs`.

## Research (`research/`)

Eight fact-checked reports with sources: suppliers and pricing, Google review mechanics and API, policy and legal, competitors, NFC tech, design, sales playbook, unit economics. Plus the naming shortlist with domain checks.

## Docs (`docs/`)

| # | Doc |
|---|---|
| 01 | Ordering guide: supplier shortlist, demo kit, production run, artwork spec |
| 02 | NFC tech spec and "encode 10 cards tonight" procedure |
| 03 | Google reviews and the monthly report pipeline |
| 04 | Compliance and policy (Google 2026 rules, FTC, trademarks) |
| 05 | Sales playbook: scripts, objections, pilot offer |
| 06 | Pricing and unit economics, Stripe setup |
| 07 | Launch checklist, 30 days |
| 08 | Demo card order pack |
| 09 | Order-to-report process |
| 10 | Pitch pack workflow |
| — | `site-feedback.md`: every change from your annotation sessions |

## Decisions already made

Minimum order 10 cards. Report included by default. No star graphics on cards. "Design preview," never "proof." Estimator suggests one card per two tables. Order flow's first option is "we find your Google listing." Review-volume comparisons use the busiest rooms in the same metro, never famous national names.

## What still needs you

1. **Pick the name and buy the domain.** Everything prints and encodes the domain, so this gates the cards. Shortlist: `research/naming-shortlist.md`.
2. **Stripe key.** Paste your secret key into `site/.env.local`, then `node scripts/check-stripe.mjs`. Test mode works on localhost today; no domain needed.
3. **Order the demo kit.** `docs/08-demo-card-order-pack.md`. About $150.
4. **Create your Google Business Profile now.** The review API needs it verified for 60 days.
5. **Deploy** to Vercel when the name is set. A vercel.app address works before the custom domain.

## Not built yet

The automated review pull and AI report generator (specified in doc 03), real dashboard logins, email delivery. The site, cards, decks, and process are ready; the monthly report is currently a hand-run process.

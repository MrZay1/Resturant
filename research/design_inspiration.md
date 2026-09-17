# Research: design_inspiration

_Generated 2026-09-04 by a research workflow. Fact-check verdicts and gap-fill findings are appended below the main report._

# Design Direction Research: NFC "Tap to Review" Cards + Monthly AI Report for Independent Restaurants

Research date: 2026-09-04. All prices/quotes are as found on the cited pages on that date; where a price could not be verified on the vendor's own site, this is stated.

---

## 0. Executive summary (what to do)

1. **Website look:** Do NOT copy the dark "developer-tool" aesthetic (Linear/Vercel) wholesale. Your buyer is a restaurant owner on a phone between shifts. Use the **Stripe cadence** instead: a warm off-white base, a single dark "proof" section, one saturated accent, one display face with personality (a soft serif) paired with a neutral sans, and real photography of the physical card on real tables. Dark-dominant pages are now >60% of SaaS/AI landings ([Landdding 2026](https://landdding.com/state-of-landing-pages-2026)), so a warm light page will actually stand out in the restaurant-tech category and photograph better with food.
2. **Homepage structure** (proven across Owner.com, Ovation, Blinq, WHOOP): outcome headline → physical product hero with the phone-tap moment → 3-step "how it works" → the report as the second hero (show a real page of it) → numbers/testimonials → pricing summary → "Order demo cards" CTA → FAQ. Full copy skeleton in Section A5.
3. **Pricing page:** treat it like Oura, not WHOOP: hardware is a one-time purchase, subscription is a clearly-separated recurring line, and the checkout shows "Today you pay $X / then $50 a month". Stripe Checkout supports one-time + recurring prices in a single `mode: 'subscription'` session and up to 10 `optional_items` add-ons ([Stripe docs](https://docs.stripe.com/payments/checkout/optional-items)).
4. **Configurator:** none of the NFC card incumbents (Popl, Mobilo, V1CE) actually offer a true live-preview builder for the *physical* card; they use templates + designer proofs ([Mobilo](https://www.mobilocard.com/design-process/2-how-to-design-your-personal-card), [V1CE](https://v1ce.co/pages/how-do-i-design-my-card)). A real browser-side live preview (SVG/canvas, front/back flip, exports a 300-DPI print PDF with bleed) is a genuine differentiator. Flow in Section A7.
5. **Card design:** four directions specified in Section B5. Legally, the safest card copy is plain-text **"Review us on Google"** / **"Tap to review us on Google"** with an unmodified official Google "G" or wordmark, no stars next to the G, no "Google Reviews" badge lockups, no Google colors/fonts as your own brand palette ([Google customer-reviews guidance](https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/), [How to show Google's brand](https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/)).
6. **NFC symbol:** license the N-Mark free via click-through at [nfc-forum.org/build/branding](https://nfc-forum.org/build/branding); minimum 3 mm high, clear space = half its height, your own logo must be at least as prominent, and the attribution line "The N-Mark is a trademark or registered trademark of NFC Forum, Inc. in the United States and in other countries." must appear on the card or an insert ([N-Mark Usage Guidelines PDF](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf)).

---

## PART A — WEBSITE

### A1. Reference landing pages (teardowns)

| # | Site | Category | Hero headline (as fetched 2026-09-04) | Primary CTA | What to steal |
|---|---|---|---|---|---|
| 1 | [Popl](https://popl.co/) | NFC cards → event lead capture | "Your AI GTM platform for in-person events" | "Get Started Now" / "Book a Demo" | Stat strip early ("4M+ professionals… 90% of Fortune 500"); integrations row. Note: Popl has pivoted to B2B software and sells NFC hardware only on Amazon now ([DBC pricing breakdown](https://www.digitalbusinesscard.com/blog/popl-pricing)). |
| 2 | [Blinq](https://blinq.me/) | Digital + NFC business cards | "Share who you are and remember who you meet" | "Get started" (+ "For teams") | Hero shows the physical red NFC card next to the app; "4.9/5 on 200K ratings" + G2 badges directly under the hero; 8-option "ways to share" carousel; enterprise trust row (SOC 2, GDPR, SSO). Physical NFC card sells for $19.99 per Blinq's own blog ([Blinq blog](https://blinq.me/blog/comparing-costs-of-digital-business-card-platforms)). |
| 3 | [dot.cards](https://dot.cards/) | Hardware-first NFC cards | Title tag: "The Ultimate Digital Business Card Solution" (page body is JS-rendered; not fetchable) | n/a | One-time purchase model: cards from $30, custom cards $61, 4.8/5 across 4,000+ reviews per third parties ([DBC](https://www.digitalbusinesscard.com/blog/dot-card-pricing), [Wave Connect](https://wavecnct.com/blogs/wave-vs-dot)). Lesson: "pay once, no subscription" as a headline value. |
| 4 | [Linq](https://linqapp.com/) | Was NFC cards; now messaging APIs | "APIs for iMessage, RCS, SMS, and Voice built for Agents" | "Try Sandbox" | Not a useful NFC reference anymore. Its old metal card was $99 with optional $5/mo ([Samantha Brandon](https://samanthabrandon.com/best-metal-digital-business-cards)). Skip. |
| 5 | [Owner.com](https://www.owner.com) | Restaurant marketing SaaS | "The AI platform restaurants use to grow online discovery." | "Get my AI report" (after selecting your restaurant from a dropdown) | **Best model for you.** The hero CTA is an interactive lookup of the visitor's own restaurant. 16 owner case studies with dollar figures; Capterra #1 + G2 badges; 25+ owner testimonials with headshots; video case studies. Pricing not on homepage; plans are $249/mo (+5% per order) or $499/mo flat ([Sauce](https://www.getsauce.com/post/owner-com-pricing-fees), [G2](https://www.g2.com/products/owner-com/pricing)). |
| 6 | [Ovation](https://ovationup.com/) | Restaurant guest feedback | "Turn guest experience into restaurant performance" | "SCHEDULE DEMO" | Hero image is a dashboard with live-looking numbers (7,862 surveys, 99% response rate, 4.6 rating); "Trusted by thousands of restaurants" logo wall; six feature blocks each with a screenshot + "Learn more"; exec testimonials with photos ("24x more feedback"). Pricing is quote-only; Capterra lists $99/mo starting ([RestaurantTools.ai](https://restauranttools.ai/tools/ovation)). Feedback page shows dashboard, survey mockup, heatmap of incident categories, SMS thread ([Ovation feedback](https://ovationup.com/platform/feedback/)). |
| 7 | [Tattle](https://get.tattleapp.com/) | Restaurant feedback + AI | "Know where your guest experience is falling short and how to fix it. Powered by real guest feedback and AI." | Demo | Item-level feedback dashboards and "team member mentions" are exactly the content of your monthly report; shows the concept sells ([Tattle item-level](https://get.tattleapp.com/features/item-level-feedback/), [RestaurantNews AI Coach](https://www.restaurantnews.com/tattle-unveils-upcoming-ai-coach-to-turn-guest-feedback-into-immediate-action-items-for-restaurants-121124/)). |
| 8 | [Birdeye](https://birdeye.com/) | Reviews / reputation | "AI Agents for Multi-location Brands" | "Watch Demo" / "See Enterprise Pricing" | 22-logo wall, three named AI "coworkers", 9 vertical tabs, metric testimonials (+400%, +86%), five compliance badges, G2 leader badges. Too enterprise for you, but the "results in numbers" block is worth copying. |
| 9 | [Podium](https://www.podium.com/) | Local-business reviews/AI | "The #1 converting AI Employee for local businesses" | "Watch a demo" | "60,000+ businesses trust Podium"; Before/After comparison table ("45% higher conversion, 36 seconds to respond"). Copy the before/after table for "reviews per month before / after cards". |
| 10 | [Toast](https://pos.toasttab.com/) | Restaurant POS (hardware + software) | "A community of the best operators. Real innovation. No hype, all follow-through." with "Start for $0 / Compare Plans" | "Start for $0" | Price-anchored hero CTA with fine print ("$0 applies to first device hardware only…"); outcome stat "Revenue at Toast restaurants is on average more than 47% greater…"; 171,000+ locations. Lesson: lead with a price anchor and a restaurant-outcome stat. |
| 11 | [WHOOP membership](https://www.whoop.com/us/en/membership/) | Hardware bundled into subscription | Tier pages: One $199/yr, Peak $239/yr, Life $359/yr, hardware included; "Begin with a Peak free trial" | Free trial | Three-column tier cards with a "what's in the box" strip per tier; FAQ answering "do I need to return the device if I switch?" ([WHOOP One](https://www.whoop.com/us/en/one/), [Peak](https://www.whoop.com/us/en/peak/), [Life](https://www.whoop.com/us/en/life/)). |
| 12 | [Oura Ring 4](https://ouraring.com/product/rings) | Hardware purchase + optional membership | Finish carousel (6 finishes), "Choose your Oura Ring"; membership "$5.99 USD/month or $69.99 USD/year", "New members get their first month free", "FSA or HSA eligible" | "Shop Now" | **Best pricing pattern for you:** configurator → one-time hardware → membership as a clearly labelled secondary line with a free first month. Ring is $349 (Silver/Black) per third-party 2026 reporting ([BetterVitals](https://www.bettervitals.com/learn/oura-ring-price-2026)). |
| 13 | [Linear](https://linear.app/) | Premium SaaS craft benchmark | As of mid-2026 the hero slot holds a documentary episode picker instead of a screenshot ([Medium teardown](https://medium.com/the-teardown/cro-teardown-linear-put-a-documentary-where-the-product-screenshot-usually-goes-b30b74f89ff6)) | — | Token-level lessons: Inter Variable at weights 300-590, display sizes 72/64/48 px with -1.0 to -1.6 px letter-spacing, near-black #08090a, borders rgba(255,255,255,0.05), one accent (#5e6ad2 / #7170ff) ([OpenDesign Linear](https://open-design.ai/plugins/design-system-linear-app/), [awesome-design-md](https://github.com/voltagent/awesome-design-md/blob/main/design-md/linear.app/DESIGN.md)). |
| 14 | [Stripe](https://stripe.com/) | Premium light-mode benchmark | — | — | White #ffffff base, surface #f8fafd, alternating dark brand sections #1c1e54, headings in deep navy #061b31 (not black), brand purple #533afd, chromatic (blue-gray) shadows rgba(50,50,93,0.25), single variable font (Söhne) ([DesignMD Stripe](https://designmd.cc/benchmarks/stripe)). |

Cross-cutting patterns worth noting:
- Every restaurant-SaaS site (Owner, Ovation, Tattle, Toast) uses **owner testimonials with headshots and hard numbers**, not abstract illustrations.
- Every hardware+software site (Blinq, Oura, WHOOP, Toast) puts **the physical object in the hero**, and the software in the second screen.
- Pricing is hidden behind "book a demo" on the enterprise tools (Ovation, Birdeye, Popl) but public on the self-serve ones (Blinq, Dot, Oura, WHOOP, Toast). You are self-serve; publish prices.
- The "one clear CTA" rule: pages with 5+ CTAs convert 23% lower than single-CTA pages, and reducing form fields from 11 to 4 raised conversions 120% ([SaaSHero 2026](https://www.saashero.net/design/landing-page-design-inspiration-2026/)).

### A2. 2026 typography, color and motion trends that read as "premium"

- **Typography is the biggest differentiator.** High-craft 2026 landings used "oversized display serifs and custom sans families (PP Neue Montreal, GT Super, Aeonik, Inter)"; other named faces: Migra, Söhne, ABC Diatype, JetBrains Mono ([Landdding 2026](https://landdding.com/state-of-landing-pages-2026)). Bold serif headlines are back; keep supporting copy tight ([SaaSFrame](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)).
- **Color:** >60% of SaaS/AI landings are dark-dominant (near-blacks #0a0b0c–#121317) with one saturated accent (electric blue, burnt orange, lime, saturated pink); gradients now "surgical" (one hero element or CTA only) ([Landdding](https://landdding.com/state-of-landing-pages-2026)). Because your category and buyer are different, use dark as an *accent section*, not the base.
- **Layout:** 67% of the top 100 Product Hunt SaaS sites use bento grids, correlated with higher dwell time and CTR ([Mockflow](https://mockflow.com/blog/saas-website-design-trends)). Use one bento grid for the "what's in the report" section.
- **Motion:** "one or two tuned reveals per page, measured easing curves, minimal bounce"; GSAP / Framer Motion dominant; 3D via React Three Fiber or Spline with lazy-loading and mobile fallbacks ([Landdding](https://landdding.com/state-of-landing-pages-2026)). Declining: glassmorphism, generic stock illustration, static AI screenshots.
- **Premium craft rules (Stripe/Linear/Vercel):** one family at 4-6 sizes max; neutrals + one accent; every interactive element needs default/hover/focus/active/disabled/loading states; 0.5-1 px low-alpha borders; designed focus rings; designed empty states ([Mantlr](https://mantlr.com/blog/stripe-linear-vercel-premium-ui)).
- **Platform:** Framer overtook Webflow for design-forward work; Webflow still leads SaaS; Next.js/Astro for engineering-led sites ([Landdding](https://landdding.com/state-of-landing-pages-2026)). For a live configurator you will want React (Next.js) or Framer code components; Webflow needs custom code for a live-preview upload ([search summary of Framer Visa Card Builder](https://www.framer.com/marketplace/components/visa-card-builder/)).

### A3. Recommended design system for the founder's site (concrete tokens)

Brand name is TBD; tokens below are name-agnostic.

**Type (all Google Fonts, OFL, free for commercial web + print; see B6):**
- Display: **Fraunces** (variable; set `font-variation-settings: "SOFT" 30, "WONK" 0` for a crisp, corporate-friendly cut) — sizes 64/48/36 px, weight 500-600, letter-spacing -0.02em, line-height 1.05.
- UI/body: **Inter** (variable) — 16-18 px body, line-height 1.5, weight 400; labels 13 px weight 500 uppercase tracking +0.06em.
- Numerals in stats and pricing: Inter with `font-feature-settings: "tnum"` (tabular), as Vercel does for engineering-grade numbers ([DesignSystems.one Vercel](https://www.designsystems.one/design-systems/vercel-geist)).
- Alternative pairing if you want a cooler, more "tech" feel: **Instrument Serif** display + **Geist** body (both OFL on Google Fonts: [Geist specimen](https://fonts.google.com/specimen/Geist), [Instrument Serif specimen](https://fonts.google.com/specimen/Instrument%2BSerif)).

**Color (light base, Stripe-style cadence):**
- Canvas: #FBFAF7 (warm off-white); Surface: #F3F1EC; Ink (headings): #14181F (not pure black); Body text: #3A3F47; Muted: #6B7280.
- Dark proof section: #101418 with text #F4F4F2 and borders rgba(255,255,255,0.08).
- Accent (one only): burnt orange #E4572E for primary CTA, links, the "tap" ring animation. Do not use Google's blue/red/yellow/green — Google prohibits using its brand colors/fonts in your work ([How to show Google's brand](https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/)).
- Success: #1F8A5B; Warning: #B7791F.
- Shadows: chromatic, e.g., 0 8px 24px rgba(20,24,31,0.10).
- Radius: 8 px controls, 16 px cards, 24 px hero card renders. Spacing on a 4 px grid, section padding 96-128 px desktop / 64 px mobile.

**Imagery:** 
- Hero: a photograph (or photoreal 3D render) of the card on a real restaurant table with a check presenter, a hand holding a phone tapping it, and a phone screen showing the Google "write a review" sheet. Landdding notes hero photography with "brand-world imagery dominates physical products" ([Landdding](https://landdding.com/state-of-landing-pages-2026)).
- Report: show an actual page of a sample monthly report as a device-free, paper-like document (PDF page mock), with three callouts: "Servers praised by name", "Top complaint this month", "Trend vs last month".

**Motion:** one hero reveal (card slides in, phone taps, concentric "interaction rings" pulse once, Google review sheet appears); scroll-fade on section headers only; card 3D flip on hover in the configurator. Nothing else.

### A4. Homepage section order (recommended)

1. Nav: Logo · How it works · The report · Pricing · Demo cards · [Order demo cards] (sticky primary CTA; action-focused labels per [SaaSFrame](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)).
2. Hero (product photo right, copy left; on mobile photo first).
3. Proof strip (3 numbers + 2 logos/testimonials; use real local pilots once you have them).
4. How it works (3 steps, one image each).
5. The card (bento: materials, tap + QR fallback, replacement policy, works with iPhone/Android, no app).
6. The monthly report (second hero; sample page; 6-tile bento of what it contains).
7. Why the "silent middle" matters (before/after table, Podium-style).
8. Pricing summary (two cards, links to /pricing).
9. Demo-cards CTA ("See it on your own table").
10. FAQ (8 questions; includes Google-policy compliance).
11. Footer with N-Mark attribution line and "Google is a trademark of Google LLC" line.

### A5. Copy skeleton (draft, ready to edit)

**Hero**
- Eyebrow: FOR INDEPENDENT RESTAURANTS
- H1 (Fraunces 64): "Turn every table into a Google review."
- Sub (Inter 18): "Drop the card with the check. Guests tap their phone and land on your Google review screen in two seconds. Then, every month, an AI reads every new review and tells you exactly what to fix."
- CTA primary: "Order demo cards" · CTA secondary: "See a sample report"
- Micro-trust under CTAs: "No app for guests · Works with iPhone and Android · Cards ship pre-programmed"

**Proof strip** (placeholders until pilot data exists; never invent numbers): "[N] reviews collected across [N] pilot restaurants" · "[Restaurant], [City]: '[quote]'" · Star rating on Google shown as "4.7 on Google as of Sept 2026" (Google requires the "on Google" phrasing and an as-of date, and forbids stars next to the Google logo: [customer-reviews guidance](https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/)).

**How it works**
1. "Serve the check, drop the card." (photo: card in check presenter)
2. "Guest taps. Review screen opens." (photo: phone on card, Google write-review sheet)
3. "On the 1st of the month, your report arrives." (report page)

**The card** (bento tiles): "Credit-card size, 0.76 mm PVC" · "Tap (NFC) + scan (QR) on the same card" · "Your logo, your colors" · "10 free replacements every month while subscribed" · "Locked link: guests can't rewrite it" · "Arrives programmed and tested".

**The report** (H2: "Your reviews, read for you."): tiles: "What guests loved" · "What they complained about" · "Servers mentioned by name" · "Menu items mentioned" · "This month vs last month" · "Three things to do next". Caption: "Every review, every month, summarized by AI and checked for accuracy."

**Before/after table**: Rows: "Who leaves reviews" (only the thrilled and the furious → everyone you hand a card to), "When" (days later, if ever → at the table, while it's fresh), "What you learn" (a star count → a named list of praise, complaints and fixes).

**Pricing summary**: "Cards $15 each, one-time. Monthly report $50/month, includes 10 free replacement cards every month. Cancel anytime."

**FAQ** (suggested): Does this follow Google's rules? (yes: cards go to every guest, no incentives, no gating; cite policy) · Do guests need an app? · Which phones work? · What if the card is lost? · Can I put my own logo on it? · How is the report made? · What does the first charge look like? · Can I cancel?

### A6. Pricing page structure (one-time hardware + monthly subscription)

Pattern: Oura (hardware bought, membership shown as separate recurring line with free first month) rather than WHOOP (hardware hidden inside a tiered subscription) ([Oura](https://ouraring.com/product/rings), [WHOOP membership](https://www.whoop.com/us/en/membership/)). Best practices: 3-4 tiers max, "recommended" badge on the middle option, "Everything in X, plus…" inheritance, and full transparency on any extra fees ([Webstacks](https://www.webstacks.com/blog/saas-pricing-page-design), [Eleken](https://www.eleken.co/blog-posts/saas-pricing-page-design-8-best-practices-with-examples)). Reviewers of hardware+subscription products consistently reframe cost as total cost of ownership, so show it proactively ([Eight Sleep cost breakdown](https://altprotein.com/eight-sleep-cost-breakdown/)).

Layout:
1. H1: "Simple pricing. Cards you own, insights you rent."
2. Two plan cards side by side:
   - **Cards only** — "$15 per card, one-time." Quantity stepper (1-50). Includes: custom design, NFC + QR, programmed and tested, free reprogramming. CTA: "Build my cards".
   - **Cards + Monthly Report** (badge: Recommended) — "$50/month + $15 per card". Includes everything in Cards only, plus: monthly AI report, 10 free replacement cards every month, cancel anytime. CTA: "Start with the report".
3. Live "What you pay" calculator beneath the cards: "Today: 10 cards × $15 = $150 + first month $50 = $200. Then $50/month." (Pattern from Oura's "first month free, then $5.99/month" and Toast's fine-print price anchor.) Consider offering the first month free like Oura to reduce friction.
4. Comparison table (3 rows of differences only).
5. FAQ: replacement policy details (are the 10 free cards cumulative? shipping?), what happens to cards if the subscription is cancelled (they keep working; be explicit, as WHOOP's FAQ is), taxes and shipping, annual option (optional: $500/yr).
6. Trust row: Stripe-secured checkout, US-based, cancel anytime.

Stripe implementation (you already have Stripe):
- Create three Prices: `card_onetime` ($15, no `recurring`), `report_monthly` ($50/month), optional `report_annual`.
- Checkout Session `mode: 'subscription'` with `line_items` containing both the one-time card price (quantity N) and the recurring price; the one-time line lands on the first invoice ([Stripe subscriptions guide](https://stripe.com/docs/billing/subscriptions/checkout), [Stripe setup-fee modeling](https://dev.to/stripe/modeling-saas-setup-fees-and-one-time-fees-pcm)).
- For "Cards only", use `mode: 'payment'` and offer the report as an `optional_items` upsell; note "Doesn't support recurring optional items in `payment` mode", so put the upsell the other way round: in subscription mode offer extra cards as an optional one-time item with `adjustable_quantity` (min 0, max 10); max 10 optional items per session ([Stripe optional items](https://docs.stripe.com/payments/checkout/optional-items)).
- Collect shipping address (`shipping_address_collection`) and listen to `checkout.session.completed` / `invoice.paid` to trigger card production.

### A7. "Order demo cards / Build your card" configurator flow

Goal: a restaurant owner (or you, on their behalf during a local pitch) produces a print-ready, correctly-programmed card in under three minutes, with a live preview at every step. Competitors do not offer this for physical cards ([Mobilo: "we don't have a live editor"](https://www.mobilocard.com/design-process/2-how-to-design-your-personal-card); [V1CE: proof after purchase](https://v1ce.co/product/original-nfc-business-card)).

Steps (single page, left = form, right = sticky live preview with front/back flip):
1. **Find your restaurant.** Google Places autocomplete → captures Place ID → auto-generates the review URL `https://search.google.com/local/writereview?placeid=<PLACE_ID>` ([ReviewTrackers](https://www.reviewtrackers.com/blog/google-review-link/)). Show "Test this link" button that opens it in a new tab. (Owner.com's hero uses the same restaurant-lookup pattern.) Alternative: paste the `g.page/r/XXXX/review` short link from Business Profile → "Read reviews → Get more reviews" ([Google Help](https://support.google.com/business/answer/16816815?hl=en)).
2. **Pick a direction.** 4 template cards (B5): Clean / Noir / Logo-forward / Playful. Thumbnail flips on hover.
3. **Brand it.** Upload logo (SVG/PDF preferred; PNG ≥ 1000 px wide, transparent). Auto-extract 2 dominant colors; user can override with hex. Contrast checker warns if the N-Mark or QR contrast falls below the guideline minimums (B2).
4. **Choose the prompt.** Dropdown of pre-approved, policy-safe copy only (B4): "Tap to review us on Google" · "Review us on Google" · "Tell us how we did — on Google" · "Enjoyed your meal? Leave a review on Google". No free-text on the front (prevents "5 stars please" copy that violates policy). Optional free-text thank-you line on the back, with a linter that blocks "5-star", "discount", "free", "positive".
5. **Back side.** Auto-composed: QR (min 0.8 in / 20 mm, error correction M or H) + short fallback URL + N-Mark + one line "No app needed. Tap with your phone or scan the code." QR guidance: min 1 in on business cards, error correction Medium/High, test with 3 phones ([Review Glow](https://www.review-glow.com/blog/google-review-card)).
6. **Quantity + material.** Demo pack: 5 or 10 cards (matte PVC). Live price.
7. **Proof.** "Download proof PDF" renders the exact print file: 3.625 × 2.375 in canvas (3.375 × 2.125 in trim + 0.125 in bleed), 0.125 in safe zone, 300 DPI, no crop marks ([CardPrinting.com](https://www.cardprinting.com/product/plastic-card/plastic-card-cr80), [Colourfast template](https://colourfast.com/templates/cr-80-card-template/)). Checkbox: "I approve this proof."
8. **Checkout** (Stripe). Confirmation page shows the programmed URL and the ship date.

Internal "demo run" mode for the founder: same flow, but you enter the target restaurant's Place ID and logo yourself, mark the order as "demo/no charge", and batch-export print PDFs plus a CSV of `card_id, restaurant, review_url` for the NFC encoder.

Technical notes for the live preview: render front/back as SVG in React; use `<foreignObject>`-free layouts so the same SVG can be rasterized server-side (e.g., resvg/Puppeteer) into the PDF. Ask your printer whether they want CMYK or RGB — Shop NFC's retransfer workflow accepts only RGB, while V1CE prints CMYK only ([Shop NFC express](https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html), [V1CE design guidelines](https://v1ce.co/pages/how-do-i-design-my-card)).

---

## PART B — THE CARD

### B1. Physical specs to design against

- Size: CR80 / ISO 7810 ID-1: 85.60 × 53.98 × 0.76 mm (3.375 × 2.125 in), ~3 mm corner radius; NFC cards are slightly thicker due to chip + antenna ([imgkilo CR80 guide](https://imgkilo.com/guides/id-card-and-badge-sizes), [Shop NFC NTAG213 card](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html)).
- Bleed/safe: US printers: 0.125 in bleed (canvas 3.625 × 2.375 in) and 0.125 in safe zone ([CardPrinting.com](https://www.cardprinting.com/product/plastic-card/plastic-card-cr80)); NFC vendors: 2 mm bleed (file ~89.6 × 58 mm), 2 mm inner safe margin, no crop marks, JPG/PNG/PDF/SVG at ≥300 DPI ([Shop NFC printed card, €15](https://www.shopnfc.com/en/nfc-cards/708-nfc-card-in-pvc-printed-in-color-front-and-back.html)).
- Direct-to-card printers leave a ~1-2 mm unprinted border (so full-bleed designs need retransfer or offset); avoid thick ink over the chip area and keep a 3 mm zone around the chip clear of dense QR blocks ([LINQS printing guide via search](https://shop.linqs.in/guides/printing-nfc-cards)).
- Antenna: in a standard PVC card the antenna is a loop around the perimeter and "you can tap the card at any place"; only metal cards have a localized chip on the back ([Cryptnox](https://cryptnox.com/phones-antennae-nfc/)). Mobilo's metal cards fix the QR on the back because "the code covers and protects the NFC antenna" ([Mobilo specs](https://www.mobilocard.com/design-process/design-specifications)). Black PVC prints white elements only (no color) at Mobilo — relevant to the "Noir" direction.
- Phone side: iPhone NFC antenna is at the top-back (often upper-right, beside the cameras), 1-4 cm range; Android is usually back-center/top and varies by model ([Cryptnox](https://cryptnox.com/phones-antennae-nfc/), [Apple Community](https://discussions.apple.com/thread/254490956)). Implication: put the tap symbol at the card's center so an iPhone's top edge naturally lands on the card body regardless of chip location.
- Chip: NTAG213 (144 bytes user memory, ~130-character URL) is the standard for review cards; NTAG215 (504 B) / NTAG216 (888 B) only if you need multiple records ([RFID MFG](https://www.rfidmfg.com/guides/ntag213-vs-215-vs-216/), [LINQS capacity](https://shop.linqs.in/articles/nfc-tag-data-storage-capacity)). Encode a plain NDEF URI record with `https://`, no title/Smart Poster, no text record, or iPhone background reading will ignore it; background reading works on iPhone XS/XR/11 and newer ([GoToTags](https://gototags.com/help/ios/nfc/reading/background), [Seritag](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)). Do not lock the tag until the link is tested ([DTB NFC](https://www.dtbnfc.com/blogs/nfc-vs-qr-code-for-restaurants-which-is-better/)). Chips are rated 100,000 write cycles / 10-year retention.
- Finish: matte or soft-touch matte (reduces glare for QR scans); avoid high gloss ([Review Glow](https://www.review-glow.com/blog/google-review-card)). Wave Connect reports matte black PVC as the most responsive NFC cards they tested ([Wave Connect](https://wavecnct.com/blogs/best-nfc-business-cards)).
- Placement in service: the bill moment is the strongest placement; combine NFC + QR on the same card because NFC depends on phone model, settings, case thickness and antenna position ([DTB NFC](https://www.dtbnfc.com/blogs/nfc-vs-qr-code-for-restaurants-which-is-better/), [QR Code Chimp](https://www.qrcodechimp.com/google-review-qr-code-for-restaurants/)).

### B2. NFC marks: official rules and where to download

**N-Mark (the classic "N" symbol)** — free click-through license, no membership needed: [license form](https://www.cognitoforms.com/NFCForum/LicenseAgreementNMark) linked from [nfc-forum.org/build/branding](https://nfc-forum.org/build/branding); guidelines PDF: [NFC_N_Mark_Guidelines.pdf](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf). Key rules from the PDF (v09.2021):
- Four versions; Version 1 (bare N) recommended for limited space. Minimum height: 3 mm (Versions 1-2), 4 mm (V4), 10 mm (V3 with letters). On screen minimum 16 × 16 px.
- Clear space on all four sides = half the N-Mark's height. Exception: "interaction rings" (concentric circles) may touch it.
- Colors: black #000000, 50% grey #939598, white #ffffff, or NFC blue #002e5f (Pantone 7463 coated / 2965 uncoated). Minimum tints: 30% white on black, 25% black on white, 40% white on the blue, 50% white on grey.
- Don'ts: never box it, outline it, rotate it, add drop shadows, recolor, add words/lettering, condense, redraw.
- Your own trademark must be present and at least as prominent; the N-Mark must never dominate and must not be locked up with your logo as a single mark.
- Use ® in registered jurisdictions (US is not in the 2012 registered list in the PDF; Canada, EU, etc. are), ™ elsewhere; may omit if under 5 mm high.
- Mandatory attribution on packaging/promo: "The N-Mark is a trademark or registered trademark of NFC Forum, Inc. in the United States and in other countries." May go on an insert if the card has no room.
- On tags, "the N-Mark must be the touchpoint indicator" — place it where the user should tap.

**Wayfinding Marks (2021 system)** — the modern alternative, also free for members and non-members via [license form](https://www.cognitoforms.com/NFCForum/LicenseAgreementCertificationMark); guidelines: [NFC_Wayfinding_Mark_Guidelines_111622.pdf](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_Wayfinding_Mark_Guidelines_111622.pdf). Variants: Directional (best for tags, shows the precise tap location), Simplified, Instructional (for low-awareness users; literal phone-tapping pictogram), Charging (reserved). Clear space = half the mark's height. Minimum heights: 5 mm / 20 px (Simplified), 8 mm / 30 px (Directional), 14 mm / 42 px (Instructional). Any color as long as contrast is clear. Must not be altered or associated with a secondary logo.

Recommendation: use the **Directional Wayfinding mark at 8-10 mm** on the front as the tap target for guests unfamiliar with NFC, and the classic N-Mark at 4 mm on the back next to the QR. Either way, license both (free) and keep the executed license PDFs.

### B3. Google branding: what is legally safe on the card and site

Official sources: [Customer reviews guidance](https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/), [How to show Google's brand](https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/), [Brand Resource Center guidance](https://about.google/brand-resource-center/guidance/), [trademark rules](https://about.google/brand-resource-center/rules/).

Allowed without asking:
- Plain-text references: "Review us on Google", "Leave a review on Google" (informational plain text is explicitly permitted; links/QR codes to Google content are permitted).
- For directing customers to review you, Google's own guidance says DO "Include one of our logos (either the Google G or full Google wordmark)" using official files, and keep it the same size as other companies' logos if grouped. Use the newest gradient-color G, full color, on white or black backgrounds only, with clear space equal to the G's width; never recolor, alter, or combine with your logo.
- Describe ratings as "on Google" with an "as of [date]"; get reviewer consent before quoting reviews in marketing.

Not allowed:
- "Don't add stars by the Google name or logos." No "Google-rated"/"Google rating" wording. No unofficial "Google Reviews" badges or lockups (icon sites like Iconscout/StickPNG are not safe sources).
- Don't use Google's brand colors or fonts as your own design system; don't imply endorsement; don't put Google marks in your business name, domain, or slogan; no Google brand elements on merchandise.
- The Partner Marketing Hub version of the reviews page prompts for a (free) account to download logo files, so register there to get the official G/wordmark assets.
- The old Google "Marketing Kit" (marketingkit.withgoogle.com) with official "Review us on Google" stickers went offline in 2024 and now redirects to google.com/business ([LocalImpact](https://localimpact.com/blog/review-us-on-google-sticker), [Yesweblog](https://yesweblog.fr/en/google-marketing-kit-no-longer-available/)); don't rely on it.

Practical card rule set: front = your customer's restaurant logo (dominant) + plain-text prompt + small official G (≈5-6 mm, full color, on a white or black field) + NFC mark; back = QR + short URL + N-Mark + attribution lines. Footer of the website: "Google is a trademark of Google LLC. [Brand] is not affiliated with or endorsed by Google."

### B4. Google review-policy constraints that shape card copy and the sales pitch

From Google's Maps user-contributed content policy ([policy](https://support.google.com/contributionpolicy/answer/7400114)) and Business Profile help ([tips](https://support.google.com/business/answer/3474122), [create a link/QR](https://support.google.com/business/answer/16816815?hl=en)):
- No incentives of any kind (payment, discounts, free goods/services) for posting, changing or removing reviews.
- Merchants "may solicit or encourage the posting of content that does represent a genuine experience, without offering incentives."
- Cannot "discourage or prohibit negative reviews, or selectively solicit positive reviews" (no review gating).
- Cannot "require or pressure users to leave ratings or write reviews while on the premises," nor request specific content, nor set staff review quotas or solicit reviews naming a specific employee.
- Third-party summaries of an April 2026 update say review kiosks/shared tablets and naming-a-staff-member requests are now explicitly banned ([Launchcodex](https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/), [Three Chapter Media](https://www.threechaptermedia.com/blog/google-review-policy-2026)). Google reported blocking/removing 292M+ policy-violating reviews in a year ([Birdeye](https://birdeye.com/blog/google-review-policy/)).

Consequences for your product:
- Card copy must be neutral: no "5 stars", no "positive", no offer. Approved phrases: "Tap to review us on Google", "Tell us how we did", "Share your experience on Google" ([QR Code Chimp](https://www.qrcodechimp.com/google-review-cards/)).
- Sales script and website must say the card goes to **every** table (no gating), guests review **on their own phone, on their own time** (no pressure on premises), and the AI report's "servers praised by name" feature is derived from what guests wrote spontaneously — never a prompt to name a server.
- Add a "Compliance" FAQ on the site and a one-paragraph staff card ("Hand the card with the check; say 'if you have a minute, we'd love your honest review on Google'; don't ask for stars or names").

### B5. Four card design directions (front / back specs)

Common to all four: CR80 matte PVC, 0.76 mm, NTAG213, QR + NFC on the same card, 0.125 in bleed, safe zone 0.125 in, corners 3 mm, min text size 6 pt (≈2.1 mm cap height) for legibility, NFC mark ≥ 4 mm with clear space = half its height, official Google G ≥ 5 mm on white or black field only. All fonts are Google Fonts under OFL (commercial print permitted; see B6). Grid: 12 columns, 3 mm margins inside trim.

**Direction 1 — "Clean": minimal white with a single G**
- Audience: cafés, bakeries, modern bistros; also your default demo card because it photographs well against wood.
- Front: canvas #FFFFFF. Top-left: restaurant logo (max 22 × 10 mm, mono #14181F). Center: Directional Wayfinding mark 9 mm in #14181F, with a 1-pt hairline ring at 14 mm diameter (interaction ring). Below it, one line in Inter Medium 8 pt tracking +0.02em: "Tap to review us on Google". Bottom-right: official full-color Google G at 5.5 mm on white. Bottom-left in 5.5 pt Inter Regular #6B7280: "or scan the code on the back".
- Back: white. Left: QR 22 mm (error correction H, quiet zone 4 modules). Right column: "Enjoyed your visit? Scan or tap to tell us how we did." (Fraunces Regular 9 pt), short URL (Inter 6.5 pt), N-Mark V1 4 mm with "™", and the two attribution lines in 4.5 pt: NFC Forum attribution + "Google is a trademark of Google LLC." Card number "No. 007" in Inter 5 pt for replacement tracking.
- Type pairing: Fraunces (display) + Inter (text).
- Why it works: mirrors the neutral, high-contrast "premium" grammar of Stripe/Linear; nothing competes with the tap target.

**Direction 2 — "Noir": dark premium, metallic-look type**
- Audience: steakhouses, cocktail bars, fine dining.
- Front: black PVC (#0B0B0C) — note some vendors print white only on black stock, so design in one tint ([Mobilo](https://www.mobilocard.com/design-process/design-specifications)); if you want a champagne/gold look, order white PVC printed full-bleed near-black with the type in a warm metallic tint #C9A961 (or ask for foil/spot UV on the logo only). Restaurant logo centered top in white or gold, 26 × 12 mm max. Center-bottom: N-Mark V1 at 6 mm in white (≥30% white on black is required), with a 2-pt spot-gloss ring at 16 mm. Copy in Instrument Serif Italic 11 pt, gold: "A moment for your thoughts?" Then Inter Medium 7 pt white, tracking +0.08em, uppercase: "TAP TO REVIEW US ON GOOGLE". Google G must sit on a black field: place the full-color G at 5.5 mm bottom-right directly on the black background (allowed: "Stick to white or black backgrounds").
- Back: same black. QR must remain dark-on-light for reliable scanning ([Review Glow](https://www.review-glow.com/blog/google-review-card)), so drop a white rounded rectangle 26 × 26 mm containing a 22 mm QR at left; right column white text: "Scan or tap. No app needed." + short URL + attribution lines in 4.5 pt at 60% white.
- Type: Instrument Serif + Inter. Alternative: Cormorant Garamond + Manrope.

**Direction 3 — "House": restaurant-logo-forward with a small tap prompt**
- Audience: family restaurants and neighborhood institutions with strong brand equity; also the version customers will most often pick in the configurator.
- Front: full-bleed background in the restaurant's primary brand color (auto-extracted from the logo; enforce ≥4.5:1 contrast with the logo). Logo centered, up to 40 × 18 mm. Bottom strip (10 mm tall) in white or near-black: left, Simplified Wayfinding mark 5 mm + "Tap to review us on Google" in Inter Medium 7 pt; right, Google G 5 mm on a white 8 × 8 mm chip (the G must be on white/black, never on a brand color).
- Back: white. Top: "Thank you for dining with us." (Fraunces 10 pt in brand color). Left: QR 22 mm. Right: "Tap the card with your phone or scan the code to leave an honest review on Google. It takes about a minute." (Inter 7 pt). Bottom: N-Mark 4 mm + attribution lines.
- Type: Fraunces + Inter, or Bricolage Grotesque (display, has ink-trap personality) + Inter.

**Direction 4 — "Playful": illustrated, warm, for casual concepts**
- Audience: taquerias, pizza, brunch spots, food halls.
- Front: cream #FBF3E4 background with a single-color line illustration (dish, chef's hat, or a hand tapping a phone) in the brand accent (e.g., #E4572E or #1F8A5B) occupying the upper 60%; illustration must keep 7 mm clear around the tap mark. Headline in Bricolage Grotesque ExtraBold 13 pt: "Loved it? Tell Google." (safe: neutral about rating) — or "How'd we do?" Tap target: Instructional Wayfinding mark (phone pictogram) at 14 mm minimum, which suits low-NFC-awareness guests. Google G 5 mm on a white circle 8 mm at bottom-right.
- Back: cream; "Tap your phone here, or scan the code." + QR 22 mm on a white square + short URL + "Takes about a minute. Every review helps a small kitchen." + N-Mark 4 mm + attribution lines.
- Type: Bricolage Grotesque + DM Sans; alternative: Fraunces (SOFT 100, WONK 1) + Manrope.

Placement of the tap symbol relative to the antenna, for all four: the PVC antenna loop runs around the card perimeter ([Cryptnox](https://cryptnox.com/phones-antennae-nfc/)), so any location reads; place the mark at the optical center (or in the lower-center for logo-forward cards) so that when a guest lays the **top-back of an iPhone** on the symbol the phone body covers the card. If you later offer metal cards, the mark must move to the back over the chip window, and the QR will sit on top of it (as Mobilo does).

Physical presentation for the demo pitch: bring each of the four directions printed with the prospect's own logo (Direction 3) plus the three generic versions; hand them over in a matte black card sleeve; pre-encode each to the prospect's actual review URL so the tap works in the meeting. Benchmarks for what buyers already see: TAPro "G-Series Onyx" NFC+QR card at $34.95 ([TAPro](https://taprocard.com/collections/google-review-cards)); Reviews Card UK single card £16 (custom £25) ([Reviews Card](https://www.reviewscard.com/products/google-tap-to-review-cards), [custom](https://www.reviewscard.com/products/custom-google-review-card-tap-or-scan)); Blinq standard NFC card $19.99 ([Blinq](https://blinq.me/blog/comparing-costs-of-digital-business-card-platforms)); Shop NFC printed PVC NFC card €15 ([Shop NFC](https://www.shopnfc.com/en/nfc-cards/708-nfc-card-in-pvc-printed-in-color-front-and-back.html)). Your $15 sits at the low end of retail for a single custom card; the report subscription is where the margin lives.

### B6. Google Fonts pairings (free for commercial print)

Google Fonts are open source and may be used commercially "including in logos, print, websites, apps," under OFL, Apache or Ubuntu licenses ([Google Fonts FAQ via search](https://developers.google.com/fonts/faq); [Made Good Designs summary](https://madegooddesigns.com/google-fonts-commercial-use/)). The OFL permits use "in books, posters, artwork, logos, and on websites… no acknowledgement is required"; the only restriction is you cannot sell the font files themselves ([openfontlicense.org](https://openfontlicense.org/)). Recommended pairings (all on fonts.google.com):

| Use | Display | Text | Notes |
|---|---|---|---|
| Brand default (site + cards) | Fraunces | Inter | "Design-conscious B2B brands wanting personality without whimsy"; dial SOFT axis down for corporate reads ([Made Good Designs pairings](https://madegooddesigns.com/best-google-font-pairings/)) |
| Noir cards | Instrument Serif | Inter or Geist | High-contrast condensed display serif intended for large sizes ([specimen](https://fonts.google.com/specimen/Instrument%2BSerif)); Geist is OFL on Google Fonts ([specimen](https://fonts.google.com/specimen/Geist)) |
| Playful cards | Bricolage Grotesque | DM Sans | Ink-trap grotesque with optical sizes ([Adobe/Google listing](https://fonts.adobe.com/fonts/bricolage-grotesque)) |
| Neutral SaaS alternative | Manrope | Inter | "Workhorse for SaaS products… approachable without sacrificing professionalism" ([Made Good Designs](https://madegooddesigns.com/best-google-font-pairings/)) |
| Report PDF | Source Serif 4 (body) + Inter (tables, tabular numerals) | — | Calm reading serif for long text ([Made Good Designs](https://madegooddesigns.com/best-google-font-pairings/)) |

Embed fonts (outline text) in the print PDF so the printer does not substitute.

### B7. Pre-print and pre-pitch checklist

1. Generate the review URL from Place ID; open it on iPhone and Android; confirm it lands on the "write a review" sheet, not the listing ([Favecard tip via search](https://www.favecard.co/en/blog/google-review-link/)).
2. Encode NTAG213 with a plain URI record (https://), no title; test background tap on iPhone XS-or-newer and two Androids; only then lock.
3. Print one card per direction at 100% scale; test QR with 3 phones under warm restaurant lighting; wipe with sanitizer 20 times and re-test tap and scan.
4. Check every card carries: your logo (≥ as prominent as the N-Mark), N-Mark ≥ 3-4 mm with clear space, NFC Forum attribution, official Google G on white/black only, no stars near the G, neutral copy.
5. Keep signed copies of the NFC Forum N-Mark and Wayfinding license click-throughs and a Partner Marketing Hub account for Google assets.

---

## Sources

- Popl homepage — https://popl.co/
- Popl pricing breakdown 2026 — https://www.digitalbusinesscard.com/blog/popl-pricing
- Blinq homepage — https://blinq.me/
- Blinq cost comparison (NFC card $19.99) — https://blinq.me/blog/comparing-costs-of-digital-business-card-platforms
- Blinq plans — https://support.blinq.me/en/articles/76752-blinq-plans-overview-free-premium-business-enterprise
- dot.cards — https://dot.cards/ ; pricing — https://www.digitalbusinesscard.com/blog/dot-card-pricing ; https://wavecnct.com/blogs/wave-vs-dot
- Linq — https://linqapp.com/
- Owner.com — https://www.owner.com ; pricing — https://www.getsauce.com/post/owner-com-pricing-fees ; https://www.g2.com/products/owner-com/pricing
- Ovation — https://ovationup.com/ ; https://ovationup.com/platform/feedback/ ; pricing — https://restauranttools.ai/tools/ovation
- Tattle — https://get.tattleapp.com/ ; https://get.tattleapp.com/features/item-level-feedback/
- Birdeye — https://birdeye.com/ ; Birdeye review policy summary — https://birdeye.com/blog/google-review-policy/
- Podium — https://www.podium.com/
- Toast — https://pos.toasttab.com/ ; https://pos.toasttab.com/products/point-of-sale
- WHOOP — https://www.whoop.com/us/en/membership/ ; https://www.whoop.com/us/en/one/ ; https://www.whoop.com/us/en/peak/ ; https://www.whoop.com/us/en/life/
- Oura — https://ouraring.com/product/rings ; https://www.bettervitals.com/learn/oura-ring-price-2026
- Linear teardown — https://medium.com/the-teardown/cro-teardown-linear-put-a-documentary-where-the-product-screenshot-usually-goes-b30b74f89ff6 ; tokens — https://open-design.ai/plugins/design-system-linear-app/ ; https://github.com/voltagent/awesome-design-md/blob/main/design-md/linear.app/DESIGN.md
- Stripe design tokens — https://designmd.cc/benchmarks/stripe ; Vercel Geist — https://www.designsystems.one/design-systems/vercel-geist
- Premium UI principles — https://mantlr.com/blog/stripe-linear-vercel-premium-ui
- Landing trends — https://landdding.com/state-of-landing-pages-2026 ; https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples ; https://mockflow.com/blog/saas-website-design-trends ; https://www.saashero.net/design/landing-page-design-inspiration-2026/ ; https://www.moburst.com/blog/landing-page-design-trends-2026/
- Pricing page practice — https://www.webstacks.com/blog/saas-pricing-page-design ; https://www.eleken.co/blog-posts/saas-pricing-page-design-8-best-practices-with-examples ; https://altprotein.com/eight-sleep-cost-breakdown/
- Stripe Checkout — https://docs.stripe.com/payments/checkout/optional-items ; https://stripe.com/docs/billing/subscriptions/checkout ; https://dev.to/stripe/modeling-saas-setup-fees-and-one-time-fees-pcm
- Configurator references — https://www.mobilocard.com/design-process/2-how-to-design-your-personal-card ; https://www.mobilocard.com/design-process/design-specifications ; https://v1ce.co/pages/how-do-i-design-my-card ; https://v1ce.co/product/original-nfc-business-card ; https://www.framer.com/marketplace/components/visa-card-builder/
- NFC Forum branding — https://nfc-forum.org/build/branding ; N-Mark guidelines PDF — https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf ; Wayfinding guidelines PDF — https://nfc-forum.org/uploads/Branding-and-Marks/NFC_Wayfinding_Mark_Guidelines_111622.pdf ; N-Mark license — https://www.cognitoforms.com/NFCForum/LicenseAgreementNMark ; Seritag on NFC logos — https://seritag.com/learn/using-nfc/nfc-logos
- Google brand — https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/ ; https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/ ; https://about.google/brand-resource-center/guidance/ ; https://about.google/brand-resource-center/rules/
- Google review link/policy — https://support.google.com/business/answer/16816815?hl=en ; https://support.google.com/business/answer/3474122 ; https://support.google.com/contributionpolicy/answer/7400114 ; https://www.reviewtrackers.com/blog/google-review-link/ ; https://www.reviewtrackers.com/blog/google-review-stickers/ ; marketing kit retired — https://localimpact.com/blog/review-us-on-google-sticker ; https://yesweblog.fr/en/google-marketing-kit-no-longer-available/
- 2026 review policy summaries — https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/ ; https://www.threechaptermedia.com/blog/google-review-policy-2026
- Card specs — https://imgkilo.com/guides/id-card-and-badge-sizes ; https://www.cardprinting.com/product/plastic-card/plastic-card-cr80 ; https://colourfast.com/templates/cr-80-card-template/ ; https://plastekcards.com/artwork/templates/ ; https://www.shopnfc.com/en/nfc-cards/708-nfc-card-in-pvc-printed-in-color-front-and-back.html ; https://shopnfc.com/en/nfc-cards/27-custom-nfc-cards-express-print.html ; https://shop.linqs.in/guides/printing-nfc-cards
- NFC antenna / phones — https://cryptnox.com/phones-antennae-nfc/ ; https://discussions.apple.com/thread/254490956 ; https://gototags.com/help/ios/nfc/reading/background ; https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone
- Chips — https://www.rfidmfg.com/guides/ntag213-vs-215-vs-216/ ; https://shop.linqs.in/articles/nfc-tag-data-storage-capacity ; https://www.dtbnfc.com/blogs/nfc-vs-qr-code-for-restaurants-which-is-better/
- Review-card design references — https://www.review-glow.com/blog/google-review-card ; https://www.qrcodechimp.com/google-review-cards/ ; https://www.qrcodechimp.com/google-review-qr-code-for-restaurants/ ; https://taprocard.com/collections/google-review-cards ; https://www.reviewscard.com/products/google-tap-to-review-cards ; https://www.reviewscard.com/products/custom-google-review-card-tap-or-scan ; https://wavecnct.com/blogs/best-nfc-business-cards
- Fonts — https://fonts.google.com/specimen/Geist ; https://fonts.google.com/specimen/Instrument%2BSerif ; https://fonts.google.com/specimen/Onest ; https://fonts.adobe.com/fonts/bricolage-grotesque ; https://madegooddesigns.com/best-google-font-pairings/ ; https://madegooddesigns.com/google-fonts-commercial-use/ ; https://openfontlicense.org/ ; https://developers.google.com/fonts/faq


---

## Fact-check verdicts

- **confirmed**: NFC N-Mark: free click-through license, no membership; minimum height 3 mm (Versions 1-2), clear space = half the mark's height; licensee's own logo must be at least as prominent; mandatory attribution 'The N-Mark is a trademark or registered trademark of NFC Forum, Inc. in the United States and in other countries.'  
  Correction: Verified directly in the PDF text (N-Mark Usage Guidelines, Version 09.2021). p.17: click-through license, 'There is no cost associated with the N-Mark, and you do not need to be a member of NFC Forum to use it.' p.7: 3 mm minimum for Versions 1 and 2 (Version 3 = 10 mm, Version 4 = 4 mm). p.8: clear space = half the height. p.6: licensee marks 'at least as prominent'; exact attribution sentence matches. Additional rule not in the claim: the ® (registered jurisdictions, incl. USA) or ™ symbol must sit to the upper right of the mark and may be omitted only if the mark is under 5 mm tall (p.6).  
  Source: https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf
- **confirmed**: NFC Wayfinding Marks: free for members and non-members; minimum heights 5 mm (Simplified), 8 mm (Directional), 14 mm (Instructional); clear space = half height; any color if contrast is clear; must not be altered or associated with a secondary logo.  
  Correction: PDF p.12 (rendered) shows 5 mm/20 px for the Simplified mark (same rule applies to the N height of the Charging variation), 8 mm/30 px for Directional, 14 mm/42 px for both Instructional variations. p.11 clear space = 1/2 height; p.13 any color combination with proper contrast; p.14 'cannot be edited, altered or distorted... Nor can they be associated with any secondary logo.' The 'free for members and non-members' wording is not in the PDF itself (it only says a click-through license must be executed) but is stated on nfc-forum.org/build/branding: 'Available at no charge and to members and non-members alike'.  
  Source: https://nfc-forum.org/build/branding
- **confirmed**: Google's customer-reviews guidance: DO include the official Google G or wordmark when directing customers to review; DON'T add stars by the Google name or logos; DON'T use 'Google-rated'/'Google rating'; DON'T use unofficial logos, badges or lockups; describe ratings as 'on Google'.  
  Correction: All five points appear verbatim on the page. Two additional rules omitted from the claim: include an 'as of' date when quoting an overall rating/review count, and get reviewer consent before reusing reviews in marketing.  
  Source: https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/
- **confirmed**: Google G icon must be the newest full-color version on white or black backgrounds only, with clear space equal to its width; never use Google's brand colors or fonts in your own work; product icons require your brand to be more prominent.  
  Correction: Page states: 'Only use the newest version of the Google G (the one with blended gradient colors)'; 'Always use the full-color Google G. Stick to white or black backgrounds'; 'Use the width of the Google G to determine the minimum amount of clear space on all sides'; 'Don't use Google's brand colors in your work'; 'Don't use or mimic Google's brand font'; 'Make sure your brand is more prominent than Google's product icon.'  
  Source: https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/
- **confirmed**: Google Maps policy: merchants may solicit genuine reviews without incentives; cannot offer incentives, discourage negative reviews, selectively solicit positive reviews, pressure users to review on premises, request specific content, or set staff review quotas.  
  Correction: Policy text confirms each item, including 'require or pressure users to leave ratings or write reviews while on the premises', staff quotas ('solicit a certain number of reviews'), and staff soliciting reviews 'that include specific content, including content that identifies a staff member'. Note for the founder: the last point is directly relevant to the 'servers praised by name' report feature - the restaurant must not ask guests to name staff.  
  Source: https://support.google.com/contributionpolicy/answer/7400114
- **partially_correct**: Review link is generated in Business Profile via Read Reviews > Get more reviews (link or QR; QR only on desktop); the Place-ID format is https://search.google.com/local/writereview?placeid=<PLACE_ID>.  
  Correction: The Google help article confirms the Read Reviews > Get more reviews flow and that 'reviews QR codes can only be generated on a computer browser, not on mobile devices.' However, the article does NOT document the search.google.com/local/writereview?placeid= format; that pattern is community-documented (e.g., Local Search Forum, EmbedSocial) and works, but is unofficial and some users report it opening the profile instead of the review form on iOS/Safari. Google's own generated link is a short g.page/r/.../review URL, which is the safer one to encode on the NFC chip.  
  Source: https://localsearchforum.com/threads/how-to-find-a-direct-link-to-leave-a-google-review-for-your-business.54662/
- **confirmed**: Stripe Checkout supports up to 10 optional_items with adjustable_quantity; recurring optional items are not supported in payment mode and their interval must match the recurring line items; one-time and recurring prices can be combined in subscription mode.  
  Correction: Optional-items doc: 'You can offer up to 10 optional items on a single Checkout Session'; adjustable_quantity supported; 'Doesn't support recurring optional items in payment mode'; billing interval 'must match the interval of the recurring line items'. Mixed cart (recurring + one-time line_items with mode=subscription) confirmed in the How Checkout Works doc. Extra limitation worth knowing: recurring optional items are not supported if a line item has a subscription upsell configured, and Product-catalog cross-sells will not appear when optional_items are passed.  
  Source: https://docs.stripe.com/payments/checkout/optional-items
- **confirmed**: CR80 card artwork: trim 3.375 x 2.125 in; with 1/8 in bleed the canvas is 3.625 x 2.375 in; keep a 0.125 in safe zone; NFC vendors like Shop NFC use 2 mm bleed (~89.6 x 58 mm) and 2 mm safe margin, 300 DPI, no crop marks; Shop NFC printed PVC NFC card lists at EUR 15.  
  Correction: Shop NFC product page: EUR 15.00, 85.60 x 53.98 x 0.76 mm, '2mm bleed on each side' giving ~89.6 x 58 mm, 2 mm inner safe area, at least 300 DPI, 'Do not insert the crop marks'. CR80 US-inch figures (3.375 x 2.125 trim, 3.625 x 2.375 bleed canvas, 0.125 in safe / 3.125 x 1.875 live area) confirmed by Duracard's CR80 template PDF and 4over4's guide.  
  Source: https://www.shopnfc.com/en/nfc-cards/708-nfc-card-in-pvc-printed-in-color-front-and-back.html
- **confirmed**: NTAG213 has 144 bytes user memory (about 130-character URL) and is the standard choice for single-URL review cards; NTAG215 = 504 B, NTAG216 = 888 B.  
  Correction: 144/504/888 bytes user memory confirmed by NXP's product page. Tagstand's cheat sheet lists max NDEF message size of 137 bytes for NTAG213 (496 for NTAG215, 868 for NTAG216), so a ~130-137 character URL is the practical limit. A writereview?placeid= URL is ~80 characters and a g.page/r short link is shorter, so NTAG213 is sufficient; 'standard choice' is an industry characterization rather than a documented fact.  
  Source: https://www.nxp.com/products/NTAG213_215_216
- **partially_correct**: iPhone background NFC tag reading requires iPhone XS/XR/11 or newer and a plain NDEF URI record (no title/Smart Poster, no text record); the iPhone NFC antenna is at the top-back of the device with a 1-4 cm range; in a standard PVC card the antenna loop runs around the perimeter so any spot works.  
  Correction: Device and encoding parts are correct: background reading arrived with iOS 12 on iPhone XS/XS Max/XR (GoToTags: 'only supported on the iPhone XS and newer'), only a plain URI record with a supported scheme is read, and Seritag confirms that adding a title (Smart Poster) or using a Text record means 'the iPhone will not respond'. The cited Cryptnox page only supports the antenna location (top-back). The '1-4 cm' range is not stated in any source found: Seritag says 'within a few centimetres or an inch', Serialio measured ~65 mm for an 85x54 mm card antenna, and an ST engineer cites ~8-10 cm for card-size antennas under ideal conditions. 'Any spot works' is oversimplified: the coil is around the card perimeter, but the iPhone must be positioned with its top edge over the card, so demo instructions should say 'hold the top of your iPhone against the card'.  
  Source: https://seritag.com/news/apple-adds-iphone-background-nfc-tag-reading-in-core-nfc
- **partially_correct**: Competitor retail price points for comparable NFC review/business cards: TAPro G-Series Onyx $34.95 (sale), Blinq standard NFC card $19.99, Reviews Card UK GBP 16 single / GBP 25 custom, dot.cards from $30 (custom $61).  
  Correction: TAPro G-Series Onyx $34.95 sale (regular $39.00) confirmed on taprocard.com. Blinq Classic $19.99 confirmed on blinq.me/nfc-business-card (custom Classic $60). Reviews Card (reviewscard.com): Google NFC Review Card £16.00 (sale, from £26.67) and Custom Google Review NFC & QR Card £25.00 confirmed. dot.cards standard card is $30.00 (confirmed via dotcards.net products.json), but the custom card is NOT $61: dotcards.net's own product data lists dot.card - custom at $50.00, and the collection page says 'From $55/card... Minimum order of 5 cards'. The $61 figure comes from a third-party (V1CE) comparison.  
  Source: https://dotcards.net/products/dot-cards-custom
- **confirmed**: Over 60% of new SaaS/AI landing pages in 2026 use dark-dominant palettes; premium pages use display serifs/custom sans (PP Neue Montreal, GT Super, Aeonik, Inter), single saturated accents, and one or two tuned motion reveals per page.  
  Correction: The Landdding 'State of Landing Pages 2026' post (April 16, 2026) does state 'over 60%' dark-dominant palettes (roughly double 2023), names PP Neue Montreal, Aeonik, GT Super, Migra, Söhne, ABC Diatype and Inter, describes saturated single accents, and 'one or two tuned reveals per page'. Caveat: the methodology is a hand review of pages submitted to Landdding with 'qualitative' typeface observations, i.e., a self-selected design-gallery sample, not a representative survey. Treat the 60% as a directional trend, not a market statistic.  
  Source: https://landdding.com/state-of-landing-pages-2026

### Fact-checker notes
## Verification notes

**Method:** Fetched every cited primary source. Both NFC Forum PDFs were downloaded and text-extracted with pypdf (the N-Mark PDF is version 09.2021; the Wayfinding PDF is dated September 2021 despite the 111622 filename); page 12 of the Wayfinding PDF was rendered to an image to confirm which mark each minimum height applies to.

**Confirmed (9/12):** Claims 1, 2, 3, 4, 5, 7, 8, 9, 12 match their primary sources. Claim 2's "free for non-members" wording lives on https://nfc-forum.org/build/branding rather than in the PDF. Claim 12 is accurately quoted but the underlying study is a self-selected gallery sample.

**Partially correct (3/12):**
- Claim 6: GBP flow and desktop-only QR are correct; the `writereview?placeid=` URL format is not in Google's help article - it is a community pattern. Google's own generated link is a `g.page/r/.../review` short URL.
- Claim 10: device list and NDEF rules are right, but the cited Cryptnox page does not support the range or the "any spot works" statement; sourced ranges span ~2.5-10 cm depending on tag antenna size, and iPhones need the top edge over the card.
- Claim 11: all prices verified except dot.cards custom. dotcards.net lists custom at $50 (product JSON) / "from $55/card, 5-card minimum" (collection page), not $61.

**Relevance to the founder's $15/card price:** verified competitor single-card retail prices are Blinq $19.99, Reviews Card £16 (sale) / £25 custom, dot.card $30, TAPro Onyx $34.95 (sale), Shop NFC blank printed PVC card EUR 15 - so $15 sits at or below the bottom of the retail market, which is fine for a bundled B2B offer but leaves little margin if cards are sourced at retail-like unit costs.

**Compliance flags surfaced while verifying:**
- Google Maps policy bars asking staff to solicit reviews that name a staff member, and bars pressuring guests to review "while on the premises" - card copy and server scripts should be neutral ("Tap to leave a review") and the AI report's "servers by name" section should be framed as passive analysis, not something to solicit.
- Google brand rules: only the current gradient G, on white or black only, clear space = G width, no Google colours/fonts elsewhere on the card, restaurant/your brand more prominent.
- N-Mark: include ® at upper right (US is a registered jurisdiction) unless the mark is under 5 mm; attribution line must appear on packaging/literature.


## Completeness critic

- Google trademark permission for a THIRD PARTY: the report never resolves whether the founder (a reseller, not the restaurant) may print Google's G/wordmark on cards he sells for profit. Google's trademark rules reference prior approval and forbid anything implying affiliation; the Partner Marketing Hub gates assets behind a partner application ('Please complete your application'). Needs a clear answer plus a fallback design where the front carries only plain text 'on Google' and no logo.
- Google sign-in wall: the report never mentions that Google requires a signed-in Google account to post a review (no guest reviews). This changes hero copy ('two seconds'), the demo pitch, expected conversion, and the back-of-card text (e.g., 'Sign in with any Google account').
- iPhone/Android tap mechanics for the guest: does the screen need to be on, does the phone need to be unlocked, does the guest have to tap a banner, which iPhones (7/8/X need an app), do Androids need NFC enabled, do thick cases matter. Only 'XS or newer' is stated; no FAQ copy for 'Which phones work?' is actually answered.
- US supplier and price for demo-quantity custom NFC cards: no US vendor, no price at qty 5/10/100/250, no lead time, no MOQ, no encoding/locking service, no artwork-template links. Only EU (Shop NFC €15) and retail competitors are cited. Candidates such as Tagstand (US, no MOQ, online designer) and GoToTags (US, printed NTAG213 PVC card, artwork templates) are absent, and no 250-qty unit cost is given to validate the $15 price/margin.
- Antenna/inlay verification: the 'tap anywhere' claim rests on one source; vendors note the chip sits in a corner (5x5 mm dip) and small-coil inlays have a localized sweet spot. Report should specify: ask vendor for inlay drawing, keep QR and heavy ink away from the chip corner, and how the Directional Wayfinding mark location is chosen per vendor.
- Direct Google URL vs. a founder-controlled redirect: the report encodes the raw writereview URL, which gives zero tap analytics, cannot be re-pointed if the Place ID changes, and conflicts with both 'Locked link' and 'free reprogramming' claims. Needs a decision (short redirect domain per card, e.g. brand.link/c/007), its dependency on the still-unchosen brand/domain, and privacy/tracking disclosure.
- Monthly AI report design spec is missing even though the brief asked how to 'show the software/report': no page layout, section order, chart types, length, cover, typography beyond fonts, or how to render a convincing sample page for the website before real data exists.
- Configurator technical inputs not specified: Google Places Autocomplete API cost/key setup and whether Place IDs can change; logo-file handling (raster to CMYK, low-res rejection thresholds, non-transparent PNGs, max upload size); how brand-color extraction resolves to print-safe CMYK; what happens if the auto-extracted color fails the 4.5:1 contrast rule.
- Entitlement and fulfilment logic for '10 free replacement cards every month': Stripe does not track this; the report gives no design for the customer portal flow (request replacements, do unused cards roll over, shipping cost, who pays postage, cap on abuse). Also missing: sales tax on physical cards (Stripe Tax), shipping-fee line in the calculator, and what 'demo/no charge' means in Stripe (100% coupon vs. no session).
- Auto-renewal / cancellation legal copy: no mention of US auto-renewal disclosure requirements (state ARLs such as California, FTC negative-option status in 2026) that dictate what the pricing/checkout page must state and how 'cancel anytime' must be implemented.
- Reference sites explicitly requested but not covered: Ring and Bentobox are absent; dot.cards body was not fetched; Linq and Popl are now irrelevant. Per-site 'section order', 'how the software is shown' and 'social proof placement' are only given for a few sites, and the fonts actually used by Owner, Toast, Blinq, Ovation, Podium are not identified.
- Existing 'tap to review' card designs and hotel/restaurant table-card formats were not visually researched: no description of what TAPro, Reviews Card, Amazon/Etsy best-sellers actually look like (layouts, sizes, materials), and no coverage of table tents, check-presenter inserts, or stand formats as alternatives/companions to a loose card.
- Hero imagery sourcing: report recommends photography or photoreal 3D of the card on a table but gives no path (photo shoot cost, mockup PSD/Blender/Spline templates, vendor-supplied renders, AI image tools) or a shot list.
- Minimum legible type and attribution placement: report sets 6 pt minimum but specifies 4.5-5.5 pt for attribution lines, and Tagstand advises 8 pt or larger for UV inkjet; needs a resolved minimum per print method and an insert/packaging plan if the NFC Forum attribution cannot fit legibly.
- Brand-name and domain constraints: nothing on clearing a name against existing NFC review-card marks (TAPro, Tapt, Reviews Card), USPTO search, or that the redirect domain, footer disclaimers and card back all depend on the name being chosen first.

### Critic notes
## Internal contradictions and weak reasoning

1. **Locked tag vs. reprogramming.** The card bento promises "Locked link: guests can't rewrite it" while the pricing page promises "free reprogramming". A locked NTAG213 is permanently read-only. The only way to have both is a founder-owned redirect URL, which the report never proposes (it encodes the raw Google writereview URL).

2. **Minimum type size.** B5 says "min text size 6 pt" for all directions, then specifies 5.5 pt, 5 pt and 4.5 pt for attribution lines, short URLs and card numbers. Tagstand's UV-inkjet guidance says 8 pt or larger. The attribution line plan is therefore probably illegible on a PVC card and should move to an insert or sleeve.

3. **QR minimum size.** B5 uses 22 mm QR (about 0.87 in) while A7 cites "min 1 in on business cards" from the same source (Review Glow). Pick one and state the tested minimum for a 130-character URL at error-correction H.

4. **Google logo on a resold product.** The report recommends the full-color G on every direction and treats "register at the Partner Marketing Hub" as a formality. The reviews guidance it cites is written for businesses soliciting their own customers; the trademark page requires no implication of affiliation and references Google's prior approval and written requirements. The hub itself says "Please complete your application to access brand resources." The founder is a third party printing Google's mark on merchandise he sells, which the report's own B3 summary says is disallowed ("no Google brand elements on merchandise"). This is the single biggest unresolved legal question and the report presents it as settled.

5. **"Two seconds" hero claim vs. real flow.** iPhone background reading shows a banner that must be tapped, prompts for unlock if locked, and Google then demands a signed-in account. The report's copy and "How it works" step 2 ("Guest taps. Review screen opens.") oversell the friction reduction, which matters because the founder will demo this live.

6. **"Tap anywhere" antenna claim** is based on a single source (Cryptnox) and generalized to all four card directions; vendor pages note the chip sits in a corner and some cards use small inlays. The recommendation to use a *Directional* Wayfinding mark (which promises a precise tap point) sits awkwardly with a "tap anywhere" assumption.

7. **Invented pricing options.** The report floats "first month free" and an "annual option $500/yr" without labeling them as untested suggestions; the founder's stated pricing has neither.

8. **Reference set drift.** The brief asked for 8-12 useful teardowns; two of the fourteen listed (Popl, Linq) are self-declared irrelevant, dot.cards was not fetched, and Ring/Bentobox were skipped, so the usable set is thinner than it looks. Per-site section order, software presentation and social-proof placement (all explicitly requested) are captured only in fragments.

9. **NFC Forum trademark status.** The report says the US is "not in the 2012 registered list" and advises TM rather than R; a 2012 list is stale and should be re-checked before printing a symbol on thousands of cards.

10. **Design tokens are name-agnostic but everything downstream depends on the name**: footer disclaimers, redirect domain, card back URL, sleeve, and the "[Brand] is not affiliated with Google" line. The report should have flagged naming as the blocking dependency for finalizing card artwork.


---

## Gap-fill research
# Gap-fill research: design_inspiration (NFC tap-to-review cards + monthly AI report)

Research date: 2026-09-04. Web search quota was exhausted for this session, so every finding below comes from directly fetched primary pages (vendor sites, Google/Apple/Android/Stripe documentation, statutes, court opinion PDFs) or from live HTTP tests run with curl. Where a price or fact could not be verified, it is stated as not found.

---

## 1. Google trademark permission for a third-party reseller (and a logo-free fallback)

**What Google's own pages say**

- Google's trademark guidelines (the Brand Resource Center "rules" page now 301-redirects to the Partner Marketing Hub) are written for parties that already have approval: they refer to "written requirements" Google provides "at the time of our approval", and they prohibit displaying "Google Brand Features in any manner that implies a relationship with, affiliation with, sponsorship by, or endorsement by Google" and incorporating "Google Brand Features into your own product names, service names, trademarks, logos, or company names" ([Trademark guidelines for proper usage](https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/trademark-guidelines-for-proper-usage/)).
- The Brand Resource Center guidance adds "Don't use any Google brand elements on merchandise such as shirts, mugs, posters, etc." and gives no public permission form: "If you have an existing sponsorship deal or business relationship with Google, reach out to your Google contact" ([Brand guidance](https://about.google/brand-resource-center/guidance/)).
- The "Customer reviews" use-case page is addressed to "businesses with Google Business Profiles" referencing their own ratings; its DOs include "Include one of our logos (either the Google G or full Google wordmark)" ([Customer reviews guidance](https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/)).
- The Partner Marketing Hub itself is gated: "Partners and agencies can create accounts" with corporate email, and the hub states "Please complete your application to access brand resources"; assets go through an "Asset approval" process ([Partner Marketing Hub](https://partnermarketinghub.withgoogle.com/)).

**Answer.** There is no public licence that lets a reseller print Google's G or wordmark on cards it sells for profit. The permission that exists is for the *business itself* (the restaurant) to include a Google logo when telling its customers where to review it. A reseller's card is closer to "merchandise" and to a use that could "imply affiliation". Competitors do print Google branding anyway and rely on disclaimers (Reviews Card: "Reviews Card products cards are not affiliated with any of the platforms or third party companies listed on our site such as Google, Trustpilot etc." — [reviewscard.com](https://www.reviewscard.com/products/google-tap-to-review-cards)), but that is risk-taking, not permission.

**Recommended policy (two tiers, decided by counsel later):**

1. **Default (safe) front:** plain text only — "Tap to review us on Google" — with the restaurant's logo dominant, the NFC wayfinding mark as the tap target, and no Google G, no Google colours, no "Google Reviews" lockup. Back of card: "Google is a trademark of Google LLC. [Brand] is not affiliated with or endorsed by Google." Site footer carries the same line. Plain-text, informational references are the only category Google's guidance clearly leaves open (medium confidence; the guidance page prohibits implied affiliation but does not forbid naming the service in text).
2. **Optional "customer-supplied logo" tier:** only if the restaurant itself supplies the G from its own Partner Hub/Business Profile materials and signs a line in the order form stating the artwork is its own review-solicitation material. This is still a grey area because the reseller is the printer; get a lawyer's opinion before offering it, and never use the G in your own marketing, hero imagery or product name.

**Fallback design spec (logo-free "Clean" front):** white canvas; restaurant logo top-left (max 22 x 10 mm); Directional wayfinding mark 9 mm at optical centre with a 14 mm hairline ring; "Tap to review us on Google" in Inter Medium 8 pt below the mark; bottom-left "or scan the code on the back" 8 pt (see Section 14 for why 8 pt, not 5.5 pt); no G at bottom-right. This keeps the layout of Direction 1 from the original report unchanged except for the removed logo, so both variants can share one template.

---

## 2. The Google sign-in wall

- Google's help page says the first step is "Sign in to your Google account" (mobile) / "sign in to Google Maps" (desktop) and states outright: "You're unable to add an anonymous review" ([Write reviews — iPhone & iPad](https://support.google.com/maps/answer/6230175?co=GENIE.Platform%3DiOS), [desktop](https://support.google.com/maps/answer/6230175)).
- Live test (curl, iPhone Safari user agent): `https://search.google.com/local/writereview?placeid=<ID>` returned **302 → accounts.google.com/ServiceLogin?continue=…** for a non-signed-in client. A guest who is not signed into Google in their browser lands on a sign-in page, not the review sheet.

**Consequences and copy changes**

- Hero sub-copy: replace "land on your Google review screen in two seconds" with "Guests tap their phone and go straight to your Google review page. If they use Gmail or Maps, they're already signed in." (Most Android users are signed in by default because the OS account is a Google account; iPhone users in Safari often are not.)
- Demo pitch: demonstrate on your own phone, signed in, and say so; then show what a not-signed-in guest sees (one extra Google sign-in screen) so the owner isn't surprised.
- Expected conversion: assume a meaningful share of iPhone-Safari taps stop at the sign-in screen; track this via the redirect (Section 6) so you can report tap-to-review ratios honestly instead of promising numbers.
- Back-of-card line: "Sign in with any Google account to post. No app needed."
- FAQ entry: "Do guests need an account? Yes — Google only accepts reviews from signed-in Google accounts (no anonymous reviews). Most people already have one."

---

## 3. iPhone/Android tap mechanics for the guest (FAQ-ready)

**iPhone (from Apple's Core NFC documentation)** ([Adding support for background tag reading](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)):
- "iPhone XS and later support background tag reading."
- "the system reads tags in the background only when the user's iPhone is in use" — the screen must be on. It is unavailable if "The device has never been unlocked [since restart]. A Core NFC reader session is in progress. Apple Pay Wallet is in use. The camera is in use. Airplane mode is enabled."
- "The system displays a pop-up notification each time it reads a new tag. After the user taps the notification, the system delivers the tag data" — the guest must tap the banner. "If the iPhone is locked, the system prompts the user to unlock the phone before providing the tag data."
- Only the **first URI record** is used; supported schemes include HTTPS website URLs; with no associated app installed, "the system opens the link in Safari".
- iPhone 7, 8 and X can read tags only through an app ("Require an app (such as Seritag Encoder App)"); XS/XR and newer need "no additional Apps" ([Seritag](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)). Seritag's user instruction: "hold the top area of your phone over an NFC tag, a notification will appear", "within a few centimetres".

**Android** ([Android NFC basics](https://developer.android.com/develop/connectivity/nfc/nfc)):
- "Android-powered devices are usually looking for NFC tags when the screen is unlocked, unless NFC is disabled in the device's Settings menu." So: unlocked screen, NFC toggle on (it is on by default on most phones but can be switched off; the doc does not state a default).
- Android 16: http/https tags trigger `ACTION_VIEW` (open in browser); "Beginning with Android 17, scanning such a tag surfaces an 'open link' notification, requiring explicit user interaction" — so newer Androids also need one tap on a banner.
- Seritag: "the device must be unlocked", "hold the centre of the of your phone at the back over an NFC tag", no app needed ([Seritag Android](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-android)).

**Cases and surfaces:** no vendor page quantified case thickness; Seritag notes "normal NFC tags don't work on metal surfaces", which matters for metal check presenters and metal tables (the card must be lifted off the metal). Ask guests with thick wallet/battery cases to use the QR code.

**FAQ copy — "Which phones work?"**
> Any iPhone from the XS (2018) onward and any Android phone with NFC turned on. Wake the phone, hold the top edge of an iPhone (or the middle of the back of an Android) on the card, then tap the banner that appears. iPhone 7, 8 and X need an app to read tags, so those guests scan the QR code instead. Thick or metal cases and metal tables can block the tap — the QR code always works.

---

## 4. US supplier and price for demo-quantity custom NFC cards

| Vendor (US) | What is published | Price found | MOQ / lead time | Encoding / locking | Artwork |
|---|---|---|---|---|---|
| **Tagstand** (Santa Clara, CA) — Custom Small Batch PVC Card, NTAG215, white | "Printed and encoded in the USA"; "Cards are printed using UV inkjet printing"; "For text, use 8 pt font or larger"; 300 dpi; 3 mm bleed and 3 mm safe zone | Base price in page data: **$2.60 per card at quantity 1** (site's dynamic calculator; volume tiers not exposed in HTML) | "no minimum order quantity"; small-batch lead time not stated ("Larger volume orders may require extra time"). Factory custom orders: MOQ "1000 pieces", "3 to 4 weeks… additional 3 to 5 days for shipping", custom-shape tooling "$300 to $500" | Encoding services list: URL, NDEF, "Lock Tags", "Match printed with encoded data", "Match QR Code with NFC Data" | CR80 PDF/AI templates ([artwork templates](https://www.tagstand.com/custom-artwork-template-files/)) |
| Tagstand — Custom Small Batch PVC Card, NTAG213, lanyard slot | Same specs; "velvet texture"; lines "0.05mm or greater" | Out of stock at fetch time; no price | no MOQ | — | — |
| **GoToTags** (US, +1 844-632-8247) — blank NFC PVC Card NTAG213, 200-pack | "85.5 mm (L) x 54 mm (W) x 0.9 mm (H)", **antenna 70 mm x 40 mm**, "printable with select card printers" | **$47.98 / 200 = $0.24 per card** (blank) | 1 pack | Encoding service: "minimum 50" units; lock option "Yes: Data is permanently fixed" or "No" | Vector only (".ai, .eps, .pdf, .svg"); templates on the public GoToTags GitLab |
| GoToTags — custom printed cards | "minimum order quantity of 500 units and a lead time of approximately 3 weeks"; setup fees and encoding "not included in unit prices" | Quote only | 500 / ~3 weeks | as above | as above |
| Plastek Cards (Las Vegas, NV) | NFC cards, chip "selected based on your system requirements" | Quote only | not published | not stated | free templates |
| Plastic Printers (US) | NFC business/loyalty cards | Quote only | not published | not stated | templates |

Sources: [Tagstand small-batch NTAG215 card](https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215), [Tagstand NTAG213 lanyard card](https://www.tagstand.com/products/custom-small-batch-pvc-card-white-lanyard-slot-portrait-ntag213), [Tagstand lead times & order info](https://www.tagstand.com/custom-order-info/), [Tagstand custom online order](https://www.tagstand.com/product-categories/custom-online-order/), [GoToTags PVC card 200-pack](https://store.gototags.com/nfc-pvc-card-ntag213-200-pack/), [GoToTags NFC tags store](https://store.gototags.com/nfc-tags/), [GoToTags encoding service](https://gototags.com/store/encoding/service), [GoToTags artwork](https://gototags.com/store/printing/artwork), [GoToTags pricing policy](https://gototags.com/store/pricing), [Plastek Cards NFC](https://plastekcards.com/plastic-cards/nfc-cards/), [Plastic Printers NFC](https://www.plasticprinters.com/nfc-cards).

EU reference for blank-card cost curve (not US): Shop NFC NTAG213 PVC card €1.29 (1–49), €1.15 (50), €0.78 (200), €0.54 (800), €0.42 (2,000), minimum 10 ([Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html)).

**What this means for the $15 price.** At the only published US small-batch price ($2.60/card printed and encoded, Tagstand, qty 1), a $15 card carries roughly $12 gross before shipping, packaging and your time — comfortable for demo runs. A 250-unit custom-printed unit cost from a US vendor is **not published anywhere fetched**; GoToTags' 500-MOQ quote and Tagstand's dynamic calculator are the two quotes to request. A DIY path for demos also exists: GoToTags blank cards at $0.24 plus a desktop card printer, or blank cards plus a local plastic-card printer, encoded yourself with an NFC-writing phone app.

**Demo-run plan:** order 10 Tagstand small-batch cards (no MOQ, US-printed, UV inkjet, encoded) in two designs; at the same time request 250/500 quotes from Tagstand factory and GoToTags custom with "match QR with NFC data" and "lock tags" line items so the unit economics at scale are known before the website promises "10 free replacements a month".

---

## 5. Antenna/inlay verification and where the tap mark goes

- Vendors disagree in wording: Shop NFC says "The antenna runs along the entire perimeter of the card" ([Shop NFC](https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html)); GoToTags specifies a **70 x 40 mm antenna inside an 85.5 x 54 mm card** ([GoToTags](https://store.gototags.com/nfc-pvc-card-ntag213-200-pack/)) — i.e. a coil inset roughly 7 mm from each edge, not literally the perimeter; Tagstand's card template "is not marked" with any chip location. Read distance scales with antenna size: "A larger antenna can harvest more energy so you can hold the phone further away"; a 38 mm tag "should get 5-6cm" on a good Android, a card "might perform a little better", a 12 x 19 mm tag "around 2cm" ([Seritag scan distance](https://seritag.com/learn/using-nfc/nfc-tag-scan-distance-explained)).
- NFC Forum's placement rule: the Directional variation "guides users to the precise location of the NFC antenna, ensuring an optimal connectivity experience" ([Wayfinding Mark Guidelines PDF](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_Wayfinding_Mark_Guidelines_111622.pdf), p.5 and Placement Guidelines pp.8–10). So the mark's position must be chosen from the vendor's inlay, not from taste.

**Procedure to put in the vendor brief and the pre-print checklist**
1. Ask each vendor for the **inlay drawing** (antenna outline and chip/module position) for the exact SKU; request it as a PDF overlay on the CR80 template.
2. Place the Directional mark at the **centroid of the antenna loop** (for a 70 x 40 mm inset coil this is the card centre). If the chip module sits in a corner (many inlays have a small chip "dip" there), keep the QR block, heavy solid ink and any foil/spot-UV at least 3 mm away from that corner and do not put the QR over the chip on the back.
3. On the back, position the QR on the side opposite the chip corner.
4. Sample test: print 3 cards, tap each with an iPhone (top edge) and an Android (centre-back) at the mark and at all four corners; record which positions read; if any corner fails, that corner is the chip/module corner and the mark placement is confirmed.
5. Lock the template per vendor; a change of vendor means re-running steps 1–4.

---

## 6. Direct Google URL vs. a founder-controlled redirect

**Why the raw URL on the chip is the wrong choice**
- Google's own behaviour changed under our test: the `writereview?placeid=` URL now 302s to a sign-in page for non-signed-in clients (Section 2), and it is community-documented, not an official format; Local Search Forum notes the Place-ID method "does not seem to work for SABs or if the utility can't find your business" ([Local Search Forum](https://localsearchforum.com/threads/how-to-find-a-direct-link-to-leave-a-google-review-for-your-business.54662/)).
- Place IDs "may change over time" and "It is possible for the same place or location to have multiple different place IDs"; Google recommends refreshing IDs older than 12 months (free) and returns `NOT_FOUND` when obsolete ([Place ID docs](https://developers.google.com/maps/documentation/places/web-service/place-id)).
- A locked chip with a raw URL cannot be re-pointed; a locked chip with a redirect can. This resolves the "Locked link" vs. "free reprogramming" contradiction: **lock the chip, keep the destination editable server-side.**

**Decision: per-card short redirect under the brand domain**
- Encode `https://<branddomain>/c/<cardId>` (e.g. `brand.link/c/007`) as a plain NDEF URI record; the server 302s to the restaurant's current review link (Google's generated `g.page/r/…/review` link where available, `writereview?placeid=` as fallback). Keep the encoded URL short (well under NTAG213's ~130-character budget) so a short domain is preferable.
- This yields tap counts per card, per restaurant, per day (taps, not reviews — Google gives no review-attribution), lets you swap the destination if the Place ID changes or the owner moves to a new profile, and lets the free replacement cards inherit the same `cardId`.
- Hosted alternatives are expensive for this use (Dub Business is $90/month, 10K new links/month, 100 custom domains — [Dub pricing](https://dub.co/pricing)); the site is already Next.js, so a route handler that logs `{cardId, timestamp, userAgent family, country}` and redirects is a few dozen lines.
- **Dependency:** this needs the brand domain, which needs the brand name (Section 15). Until then, demo cards can be encoded to the raw Google link and re-encoded later (do not lock demo cards).
- **Privacy/tracking disclosure:** the redirect sees IP, user agent and time. Publish a short privacy notice at `/privacy` and on the card back ("Tap counts are recorded to help your restaurant; no personal data is stored"); do not set cookies or fingerprint; keep only aggregate counts after 30 days. California's ARL and CCPA questions belong in the same legal review as Section 10.

---

## 7. Monthly AI report — design spec and how to fake a convincing sample

No vendor page was needed; this is a specification derived from the original brief and the reference sites' patterns (Tattle's item-level and team-member mention dashboards, Ovation's KPI-first layout).

**Format:** US Letter PDF, portrait, 6–8 pages, emailed on the 1st and viewable in the browser; typography Source Serif 4 (body 10.5/15 pt) + Inter (labels, tables, tabular numerals); 3-column grid, 0.75 in margins; brand accent only for callouts; charts in one accent + neutrals; no stock imagery.

**Page order**
1. **Cover:** restaurant name/logo, "September 2026 Review Report", four hero numbers (new reviews, average rating this month vs last, % of reviews via tap cards if measurable, response rate), one-sentence AI headline ("Service speed complaints doubled after the patio opened").
2. **At a glance:** rating trend line (13 months), review-volume bars (this month vs last, tap-card vs organic if the redirect data supports it), sentiment split (positive/neutral/negative stacked bar).
3. **What guests loved:** top 5 praise themes with counts and 2 anonymised quotes each; a small horizontal bar chart.
4. **What guests complained about:** top 5 complaint themes, same layout, plus "new this month" tag.
5. **Menu items mentioned:** table (item, mentions, sentiment score, sample quote); heat-strip for sentiment.
6. **Team mentions:** table of staff names that guests wrote spontaneously (praise/criticism counts), with the compliance note printed on the page ("Names appear only when guests volunteer them; we never ask guests to name staff" — see Section 18).
7. **Trends vs last month:** small-multiples (6 mini line charts: rating, volume, service, food, ambience, value).
8. **Three things to do next:** three numbered recommendations, each with evidence (quotes/counts) and a "how to measure it next month" line; footer with method note ("AI-generated from N public Google reviews dated …; quotes lightly trimmed; reviews used with reviewer consent in marketing only").

**Rendering the sample page before real data exists:** build the report as a React/HTML template (same design tokens as the site) fed by a JSON fixture; generate the fixture from a synthetic but realistic dataset (invent a demo restaurant "Marrow & Vine"; do not use real reviews or real staff names); render to PDF with Playwright/Chromium; export page 1 and page 6 as PNG for the homepage's second hero with three callouts ("Servers praised by name", "Top complaint this month", "Trend vs last month"). Label it "Sample report, demo data" on the page itself. Charts: bar/line only, 1 accent + 3 greys, labelled directly (no legends) for legibility at 50% scale on the website.

---

## 8. Configurator technical inputs

**Google Places**
- API key requires a Google Cloud project with a billing account; "Google strongly recommends restricting your API keys" (HTTP-referrer restriction for the browser key; API restriction to Places API (New)) ([Get API key](https://developers.google.com/maps/documentation/places/web-service/get-api-key)).
- Pricing (Places API New, Essentials tier): **Autocomplete Requests 10,000 free events/month, then $2.83 per 1,000** (falling to $0.21 at very high volume); **Place Details Essentials 10,000 free/month, then $5.00 per 1,000**; the "Autocomplete Session Usage" SKU is listed as unlimited free, and the Places UI Kit "Autocomplete Per Session" SKU has 10,000 free then $10.00 per 1,000 ([Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing)). At demo volumes the configurator is free; request only the `id`, `displayName`, `formattedAddress` fields to stay in the Essentials SKU.
- Place IDs can change (Section 6): store the Place ID plus the original query, refresh IDs >12 months old (free with an ID-only Place Details request), and handle `NOT_FOUND` by re-running the stored query ([Place ID docs](https://developers.google.com/maps/documentation/places/web-service/place-id)).

**Logo file handling (rules derived from vendor artwork requirements)**
- Accept SVG/PDF/EPS first; GoToTags accepts vector only (".ai, .eps, .pdf, .svg") and warns that files with embedded rasters are "not usable"; Tagstand requires "300 dpi or higher" ([GoToTags artwork](https://gototags.com/store/printing/artwork), [Tagstand card page](https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215)).
- Raster fallback: PNG/JPG accepted only if the logo will print at >= 300 dpi at its placed size — for a 40 mm-wide logo that is >= 473 px wide; reject below 400 px with the message "Logo is too small to print sharply; upload an SVG, PDF or a PNG at least 1000 px wide." Max upload 10 MB. Non-transparent PNG/JPG: detect a uniform background colour and offer "remove background (solid colour)" or place the logo on a white chip; never auto-cut complex backgrounds.
- Print colour: keep the working file in sRGB for the on-screen preview; export the print PDF in the colour space the chosen vendor asks for (Tagstand/GoToTags did not publish a CMYK/RGB requirement — ask; Shop NFC's retransfer is RGB-only, V1CE is CMYK-only per the original report). For CMYK output, `sharp`'s `toColourspace('cmyk')` exists but ICC handling is undocumented on the API page ([sharp colour API](https://sharp.pixelplumbing.com/api-colour)); safer to rasterise/convert with Ghostscript or the vendor's own prepress and embed a named profile (e.g. GRACoL/SWOP) only when the vendor asks.

**Brand-colour extraction and contrast fallback**
- Extract two dominant colours from the logo (vector: parse fills; raster: quantise). Snap each to the nearest "print-safe" swatch from a curated 48-colour palette that you have proofed on a real card, rather than trusting arbitrary hex-to-CMYK conversion; show the swatch name in the UI.
- Contrast rule (4.5:1 for text and the wayfinding mark, per the original report's B2 and the NFC Forum's "clearly defined visual separation" requirement, [Wayfinding PDF p.13](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_Wayfinding_Mark_Guidelines_111622.pdf)): if the extracted colour fails against the chosen text colour, (1) automatically switch text/mark to whichever of near-black or white passes; (2) if neither passes (mid-tone brand colours), darken or lighten the background swatch until 4.5:1 is reached and show "adjusted for print legibility"; (3) if the user overrides, block the proof download until a passing combination is chosen. QR always renders dark-on-white inside its own white panel regardless of brand colour.

---

## 9. Entitlement and fulfilment logic for "10 free replacement cards every month"

Stripe stores none of this; the design lives in your database keyed to the Stripe subscription ID.

**Entitlement rules (recommended, to be printed in Terms and the pricing FAQ)**
- Allowance accrues on each paid `invoice.paid` for the report subscription: +10 replacement credits; **credits do not roll over** beyond a cap of 20 (so two months' worth can accumulate, no more) — say so explicitly.
- A replacement request consumes credits; replacement cards reuse the restaurant's approved design and, if the redirect is in place, the same `cardId` range. Any cards beyond credits are charged at $15.
- Shipping: replacements ship in batches; standard USPS letter/flat-rate shipping is included ("free" means free), expedited shipping is charged; state that in the Terms.
- Abuse cap: max one replacement request per calendar month; requests above 20 cards/quarter require a short note; you can decline for suspected resale.
- Cancellation: unused credits expire at period end; cards already delivered keep working (the chip points at your redirect, which you keep alive for cancelled accounts for a defined period, e.g. 12 months, then redirect to the raw Google link so cards never die — say this in the FAQ).

**Customer-portal flow**
- Use Stripe's hosted customer portal for billing (update card, invoices, "Cancel subscriptions immediately or at the end of the current billing period", optional cancellation reasons/coupon) ([Stripe customer portal](https://docs.stripe.com/customer-management)). Note a portal limitation: subscriptions with multiple products can be cancelled but not updated in the portal, so keep the subscription to the single $50 price and bill card add-ons as one-time invoice items.
- Build your own `/account` page for non-billing actions: credits balance, "Request replacements" (quantity, reason, ship-to), order history, download print proof, edit review destination. Fulfilment emails: requested → printed → shipped (tracking).

**Stripe specifics found**
- Shipping rates: "Only Checkout Sessions in payment mode support shipping options" ([Stripe shipping](https://docs.stripe.com/payments/during-payment/charge-shipping.md?payment-ui=stripe-hosted)). For the "Cards + Report" subscription-mode session, add shipping as a separate one-time line item (a `price` called "Shipping") or ship free; for "Cards only" (payment mode) use `shipping_options` with `shipping_rate_data` and `shipping_address_collection[allowed_countries][0]=US`.
- Sales tax on physical cards: enable Stripe Tax with `automatic_tax[enabled]=true`; set the card product's tax code to a tangible-goods code and the report to a SaaS code; use shipping tax code `txcd_92010001` so shipping is taxed only where states tax it; "Without a registration in the customer's location, the calculation returns zero tax" ([Stripe Tax set-up](https://docs.stripe.com/tax/set-up)). Cost: Tax Basic is "0.5% per transaction" no-code or "50¢ per transaction" via API, where you are registered; Tax Complete from $90/month ([Stripe Tax pricing](https://stripe.com/tax/pricing)). Register in your home state first; watch the Dashboard monitoring tool for other-state thresholds.
- "Demo / no charge" in Stripe: for founder-run demos, do **not** create a Checkout Session at all — create the order in your own database with `source: demo` and no Stripe object; if you want the customer record and the fulfilment pipeline to be identical, create a subscription with a `percent_off=100` coupon (`duration=once` for a free first month, `forever` for a permanent comp): Stripe can create a subscription "when a customer doesn't have a stored payment method if no immediate payment is required" ([Stripe subscription coupons](https://docs.stripe.com/billing/subscriptions/coupons)). For a self-serve free first month, use `subscription_data[trial_period_days]=30`; use `payment_method_collection=if_required` only if you accept trials without a card, with `trial_settings[end_behavior][missing_payment_method]=cancel` ([Stripe free trials](https://docs.stripe.com/payments/checkout/free-trials.md?payment-ui=stripe-hosted)).
- Calculator line on the pricing page should therefore read: "Today: 10 cards x $15 = $150 + first month $50 + shipping $X + tax (calculated at checkout) = …; then $50/month."

---

## 10. Auto-renewal / cancellation legal copy (US, as of Sept 2026)

- **Federal:** the FTC's 2024 "Click-to-Cancel" Negative Option Rule was **vacated** by the Eighth Circuit on **July 8, 2025** in *Custom Communications, Inc. v. FTC*, Nos. 24-3137/24-3388: "Concluding that the Commission failed to follow procedural requirements under § 22 of the Federal Trade Commission Act… we grant the petitions for review and vacate the Rule" ([opinion PDF](https://ecf.ca8.uscourts.gov/opndir/25/07/243137P.pdf)). The FTC opened a new Advance Notice of Proposed Rulemaking on **March 13, 2026** on its prenotification negative-option rule ([FTC rule page](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule)), so a replacement rule is possible but not in force. ROSCA (15 U.S.C. 8401-8405) still applies to online negative-option sales: clearly disclose all material terms and obtain "express informed consent" before charging, with a simple way to stop recurring charges ([FTC ROSCA page](https://www.ftc.gov/legal-library/browse/statutes/restore-online-shoppers-confidence-act)); the FTC also still enforces its 16 CFR 425 prenotification rule ([16 CFR 425.1](https://www.law.cornell.edu/cfr/text/16/425.1)).
- **California (Bus. & Prof. Code 17602, amended by AB 2863, effective July 1, 2025)** — the strictest state law and the practical national template: present offer terms "in a clear and conspicuous manner before the subscription or purchasing agreement is fulfilled and in visual proximity… to the request for consent"; obtain "express affirmative consent"; send an "acknowledgment that includes the automatic renewal offer terms… cancellation policy, and information regarding how to cancel"; allow cancellation "exclusively online, at will" through "a prominently located direct link or button"; send renewal notice "at least 15 days and not more than 45 days before" renewal for certain terms; and an annual reminder for annual plans ([AB 2863 text](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2863), [BPC 17602](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17602)). Other states (e.g. New York, Illinois, Colorado, Minnesota) have comparable ARLs; design to the California standard and you cover them.

**What the pricing and checkout pages must therefore state (draft):**
- Next to the plan price and the consent checkbox (not only in Terms): "The Monthly Report is $50/month plus applicable tax, billed automatically to your card on the same day each month until you cancel. Cancel anytime online from your account page; cancellation takes effect at the end of the current billing period. 10 replacement-card credits are added each paid month and expire at the cap described in our Terms."
- An unchecked checkbox: "I agree to the automatic renewal terms above."
- Post-purchase email (the acknowledgment) repeating terms, price, renewal date, and a cancel link.
- Implement "cancel anytime" as a literal button on `/account` that opens the Stripe portal cancellation page (no phone call, no chat, no retention wall longer than one optional "reason" screen).
- Reminder emails: 15–45 days before renewal for any annual plan; annual reminder for annual plans; for monthly plans, a monthly receipt with a cancel link.
- Have a lawyer review the final copy; the vacated federal rule means state law and FTC enforcement of ROSCA now carry the risk.

---

## 11. Reference sites requested but not covered

| Site | Status / section order | How software is shown | Social proof placement | Fonts (detected from live CSS/HTML) |
|---|---|---|---|---|
| **Ring** ([ring.com](https://ring.com/)) | Hero: "Get Labor Day deals up to 40% off" + "Shop Now" → featured deals → category nav → "where to put it" setup guide → AI recommendation tool → **Ring Protect plans** → "Only on Ring.com" benefits → footer | Hardware first; the subscription appears as a plan block after products, with "Free 30-day Ring Plan trial"; plan page uses a comparison table (Solo $4.99/mo or $49.99/yr, Multi $9.99/$99.99, Pro $19.99/$199.99, Virtual Security Guard $99/mo), "Plans auto-renew until canceled", and "After you set up your Ring device… you are eligible to purchase a Ring Protect Plan" ([Protect plans](https://ring.com/protect-plans)) | Star ratings on product cards (some "Ratings Unavailable"); no testimonial block on the homepage; subscription "positioned as enhancements rather than requirements" in FAQ ([doorbells](https://ring.com/doorbell-cameras)) | not analysed (not a typography reference) |
| **BentoBox** ([getbento.com](https://getbento.com/)) | Now a transition page: "BentoBox is now Clover" with "Learn more" → customer access (Help Center, Dashboard login) → FAQ | No product screenshots | None | n/a — **drop as a reference**; Clover's restaurant page is JS-rendered and could not be fetched |
| **dot.cards** ([dotcards.net](https://dotcards.net/)) | Shopify storefront: colour-bundle carousel → "$50 away from free shipping" → cart → "Labor Day Flash Sale 25% off" countdown → "Customers also added" | Physical card colours only; profile app not shown in fetched body | No ratings/reviews visible in fetched content; product data: dot.card $30, dot.metal $50, dot.card-custom $50, dot.metal-custom $75 ([products.json](https://dotcards.net/products.json)) | Shopify theme; not a typography reference |
| **Owner.com** | (covered before) | | | **STK Bureau Sans** (Regular/Medium/SemiBold woff2) with **PP Neue Montreal Mono** for mono accents ([owner.com](https://www.owner.com)) |
| **Toast** | (covered before) | | | HTML ships a `system-ui, -apple-system, BlinkMacSystemFont…` stack; no custom web font detected in the served HTML/CSS (brand font, if any, is loaded by JS and could not be confirmed) ([pos.toasttab.com](https://pos.toasttab.com)) |
| **Blinq** | (covered before) | | | **Antique Legacy** (headings) + a custom family named **"Inq"** (Thin/Light/Medium/Bold/Italic woff) ([Blinq CSS](https://cdn.prod.website-files.com/617ac0d059899a9a3c8216e9/css/blinq-app.shared.b5090b211.min.css)) |
| **Ovation** | (covered before) | | | **Poppins** (primary) + Assistant ([ovationup.com](https://ovationup.com)) |
| **Podium** | (covered before) | | | **Graphik** (Regular/Medium/Semibold) with Inter and DM Mono in Framer components ([podium.com](https://www.podium.com)) |

Takeaways: the restaurant-tech sites use geometric/grotesque sans families (Graphik, STK Bureau Sans, Poppins); none uses a serif display. Your Fraunces + Inter pairing will read as more premium and more distinct in this category, which supports the original recommendation. Ring's page is the best model for "hardware first, plan block after, trial badge, auto-renew sentence on the plan page".

---

## 12. What existing tap-to-review cards and table formats actually look like

**TAPro (US, taprocard.com — Shopify product data)** ([products.json](https://taprocard.com/products.json))
- Google Review Tap Card, white, NFC + QR: 1 card $27, 3 for $49, 5 for $69; NFC+QR bundles 2 for $39, 3 for $52, 5 for $70; G-Series Onyx black card $34.95 (regular $39). Chip on the dashboard-linked card: **NTAG215**; activation through "app.taprocard.com" in "about 30 seconds"; the copy stresses "No customer app… No battery… No monthly TAPro subscription", and includes a compliance paragraph ("The card does not write a review, choose a star rating…").
- Formats beyond the card: **round 3-inch adhesive plaque** with 3M adhesive ($35 single, 10 for $169), **countertop stands** in white or black ($31–$38 single, 10 for $169–$179). Design language: white or black card, "Google Review" wording, QR on the face, NFC icon; their own copy uses the phrase "instant 5-star feedback" on one bundle — exactly the wording your product must avoid.

**Reviews Card (UK, reviewscard.com)** ([products.json](https://www.reviewscard.com/products.json), [tap card](https://www.reviewscard.com/products/google-tap-to-review-cards), [custom card](https://www.reviewscard.com/products/custom-google-review-card-tap-or-scan), [stands](https://www.reviewscard.com/collections/stands))
- Card 85 x 55 mm, white or black, "high-end finish", pre-programmed, dynamic QR; single £16 (bulk: 5 at £9.60, 10 at £7.90); custom-logo card £25 (10 at £9.90), "no minimum order quantity", 24-hour processing. Blue variant £20.
- Companion formats: freestanding **NFC & QR stand** £36–£60, **plates** £31–£48, **table tag** £26 (TripAdvisor/TikTok/Facebook variants), **keyring** £18, **badge reel** card £30, bundles (stand + 2 cards £50–£100). Disclaimer of non-affiliation with Google.

**Amazon and Etsy best-sellers:** both sites blocked automated fetching (Amazon returned a bot page; Etsy 403), so no verified listing data — note as an open item to check manually.

**Table and counter formats to offer alongside the loose card**
- **Table tent** (paper): UPrinting 4.25 x 6 in (most popular), 4 x 8 in, 7 x 5 in, 10–16 pt cardstock, 25 for $95.81 ($3.83 each), 6 business days ([UPrinting table tents](https://www.uprinting.com/table-tent-printing.html)). Use as a printed companion carrying the QR only (no chip), or glue an NFC sticker inside.
- **Check presenter insert:** standard presenters are 5 x 9 in vinyl/leatherette ($2.89–$13.99 each) and many have a "Credit Card Pocket" ([WebstaurantStore check presenters](https://www.webstaurantstore.com/search/check-presenter.html)) — your CR80 card slides into that pocket, which is the strongest argument for keeping the card credit-card size rather than inventing a new format.
- **Counter stand / plaque:** the incumbents sell these at $31–$60; consider them a second SKU after the pilot, using the same artwork with a 14 mm Instructional wayfinding mark.

---

## 13. Hero imagery sourcing

- **Photo shoot cost:** the three pricing pages tried (Thumbtack, Fash, Peerspace) blocked fetching, so no verified US day-rate is available; Snappr has pivoted to AI product imagery ($499/month "Standard", $833/month Enterprise; free tier 54 credits ≈ 3 images) ([Snappr pricing](https://www.snappr.com/pricing)) and is not a fit. Get two quotes from local product photographers for a half-day at a friendly restaurant.
- **Mockup PSDs (free):** mockups-design.com lists free 85 x 55 mm business-card scene PSDs including "Business Card on Wood Panels", "Marble Surface", "Outdoor Shadow" and "Leather Sofa" sets with 3–5 PSD scenes each ([mockups-design business-card tag](https://mockups-design.com/tag/business-card/)); confirm the licence on each download page before commercial use.
- **3D:** Spline Free (web exports carry a watermark), Hobby $15/month, Pro $30/month, Max $70/month ([Spline pricing](https://spline.design/pricing)); Blender is free. A single card model with a PVC material and a phone model is a one-day job for a freelancer.
- **AI image generation:** this environment already exposes image-generation tools (Qwen-Image, FLUX Krea, Z-Image) that can produce the table scenes for comps; Midjourney's pricing page could not be fetched (404), so no price is quoted. Use AI for comps and social posts; for the hero, composite the real printed card (photographed or rendered) so the card face is pixel-accurate and never shows a Google logo you are not licensed to use.

**Shot list (hero + sections):**
1. Card in a black check presenter on a wood table, receipt visible, 3/4 angle, shallow depth (hero).
2. Hand holding an iPhone with the top edge on the card, review sheet visible on screen (compose the screen in post from a real screenshot of the sign-in/review flow with names blurred).
3. Card alone, straight-down, both sides (configurator thumbnails; needs exact-colour proof).
4. Server placing the card with the bill (how-it-works step 1).
5. Report page on a tablet next to a coffee cup at a host stand (report section).
6. Stack of 10 cards fanned in the matte sleeve (demo-pack CTA).

---

## 14. Minimum legible type and attribution placement

- Tagstand (UV inkjet small batch): "For text, use 8 pt font or larger", lines "0.05mm or greater", 300 dpi ([Tagstand](https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215)). GoToTags publishes no minimum text size but requires vector artwork ([GoToTags artwork](https://gototags.com/store/printing/artwork)).
- NFC Forum permits moving the attribution off the product: "In the event that the placement of the trademark attribution is not commercially feasible, you may include the trademark attribution on printed matter distributed together with the product, provided that the trademark attribution language is clearly visible and prominently displayed" ([N-Mark Guidelines PDF, p.6](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf)).

**Resolved minimums**
| Print method | Minimum type | Minimum line |
|---|---|---|
| UV inkjet / direct-to-card (Tagstand small batch, most demo runs) | **8 pt** for any text; 7 pt only for the card number if tested | 0.05 mm (use 0.1 mm to be safe) |
| Offset / retransfer / factory litho (500+ runs) | 6 pt after a physical proof at 100% | 0.1 mm |

Consequence: the 4.5–5.5 pt attribution lines in the original Directions 1–4 will not survive UV inkjet. **Move all attribution to an insert**: a 3.375 x 2.125 in card-stock slip in the sleeve/envelope with (a) the N-Mark attribution sentence, (b) "Google is a trademark of Google LLC. [Brand] is not affiliated with or endorsed by Google.", (c) the privacy line, and (d) the two-line staff script. Keep on the card back only: short URL (8 pt), "No app needed. Tap or scan. Sign in with any Google account." (8 pt), N-Mark 4 mm (no ® needed under 5 mm), and card number (7–8 pt).

---

## 15. Brand-name and domain constraints (everything else depends on this)

- Google prohibits its marks in "your brand name, product name, business name, trade name, website domain, or slogan" ([Brand guidance](https://about.google/brand-resource-center/guidance/)), so no "Google" in the name or domain.
- The N-Mark may be used only when "the licensee's own trademark is present" and your marks must be "at least as prominent" ([N-Mark PDF p.6](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf)) — the card back needs your name before it can carry the N-Mark.
- Existing marks in the space to clear against: TAPro (uses ® on "TAPro" in its copy), Reviews Card, Tapt, Blinq, Popl, dot.cards, Linq, Ovation, Tattle. Search at the USPTO Trademark Search system, https://tmsearch.uspto.gov/, and follow the "Clearance searching" guidance ("Comprehensive clearance search for similar trademarks") before buying the domain ([USPTO trademark search](https://www.uspto.gov/trademarks/search)); an attorney-run clearance is worth it because you will print the name on thousands of physical cards.
- Name criteria: two syllables, spellable when said aloud in a noisy dining room, no "tap"/"review"/"card" collisions with the marks above, available as a short `.link`/`.co`/`.com` for the redirect (`brand.link/c/007` must fit in the NTAG213 payload), and not implying Google, Yelp or NFC Forum.
- **Dependency chain:** name → USPTO clearance → domain → redirect URLs on chips → card back copy → footer disclaimers → privacy notice → Stripe product names and portal branding → N-Mark licence (the click-through asks for the licensee name). Demo cards can proceed without the name only if they are encoded to the raw Google link and left unlocked.

---

## 16. N-Mark ®/™ placement rule (and a correction on US registration)

Exact text ([N-Mark Guidelines PDF, p.6](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf)): "In jurisdictions where the N-Mark is registered, the N-Mark must always be accompanied by the registered trademark ® symbol. Elsewhere, it must appear with the trademark ™ symbol… position the ® or ™ symbol to the upper right of the N-Mark in a size visible to the naked eye. If the N-Mark is smaller than 5mm in height, or if the means of display makes it infeasible to render the ™ or ® symbol legibly, the ™ or ® symbol may be omitted."

Page 17 of the same PDF lists the registered jurisdictions "As of March 14, 2012" and **includes "United States of America"** — the original report's statement that the US is not in the registered list is wrong. Practical rule for the card: at 3–4.9 mm, omit the symbol; at 5 mm or more in the US, add ® at the upper right; the licence zip contains versions "with and without the TM and ® marks".

---

## 17. Which review link to encode: g.page short link vs writereview?placeid=

- Google's help documents only the flow ("Select Read Reviews and then Get more reviews", copy link or download QR; "reviews QR codes can only be generated on a computer browser") and does not document either URL format ([Google help](https://support.google.com/business/answer/16816815?hl=en)).
- Live test: the `writereview?placeid=` URL responded **302 to accounts.google.com/ServiceLogin** for a non-signed-in iPhone-Safari client; it is a community-documented pattern (Local Search Forum: obtain the Place ID via the Places API and append it; "This method does not seem to work for SABs") ([Local Search Forum](https://localsearchforum.com/threads/how-to-find-a-direct-link-to-leave-a-google-review-for-your-business.54662/)). A g.page URL could not be tested without a real profile code (a guessed code simply landed on google.com).
- **Decision:** encode your redirect (Section 6); point the redirect at the **Google-generated "Get more reviews" link** copied from the restaurant's Business Profile, and keep the Place-ID URL as the automatic fallback in the configurator for restaurants that have not yet generated their link. Test both on a signed-out iPhone (Safari) and a signed-in Android before locking anything, and log which destination each restaurant uses.

---

## 18. Google's ban on soliciting content that identifies a staff member

Exact policy text: prohibited practices include "Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member" and "Merchants requesting that staff solicit a certain number of reviews"; merchants "should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included" ([Maps user-contributed content policy](https://support.google.com/contributionpolicy/answer/7400114)).

**Implications**
- Card copy: never "Mention your server", never a server-name field or per-server card naming that guests can see. (TAPro markets per-employee card naming for tracking; keep any such tracking internal via the `cardId`, never on the card face.)
- Marketing the report: change "Servers praised by name" to "**Team mentions** — names guests volunteer on their own" and add the sentence "We never ask guests to name staff or leave a rating; the card only opens Google's review page" to the report page, the FAQ and the sales script.
- Staff script printed on the insert: "Hand the card with the check and say: 'If you have a minute later, we'd love your honest review on Google.' Don't ask for stars, don't ask them to mention you, and don't ask them to do it at the table."
- Do not sell review-count targets ("50 reviews a month") to owners; sell "every guest gets the card".

---

## 19. Calling the product a "Google review card"

- "Don't incorporate Google Brand Features into your own product names, service names, trademarks, logos, or company names" and "Use the trademark only as an adjective – never as a noun or verb" followed by a generic descriptor ([Trademark guidelines](https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/trademark-guidelines-for-proper-usage/)); Google's list treats "Google Business Profile™ business listing service" and "Google Maps™ mapping service" as marks ([Google trademarks list](https://about.google/brand-resource-center/trademark-list/)).
- So: product name = "[Brand] Tap Card"; descriptive copy may say "a tap-to-review card that opens your Google Business Profile review page" or "collect reviews on Google". Avoid "Google Review Card", "Google NFC card" or "GoogleTap" as names, page titles, SKUs or Stripe product names; the incumbents (TAPro "Google Review Tap Card", Reviews Card "Google Review NFC & QR Card") do exactly what the guideline forbids.
- SEO note: you can still target the phrase in body text ("Looking for a Google review card? Here's how the [Brand] Tap Card works") because that is descriptive, adjectival use.

---

## 20. Practical read-range guidance for demo instructions

- Apple: background reading works on iPhone XS and later only while the phone is in use; a notification appears and must be tapped ([Apple Core NFC](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)). Seritag: "hold the top area of your phone over an NFC tag… You will need to be within a few centimetres" ([Seritag iPhone](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)).
- Android: "hold the centre of the of your phone at the back over an NFC tag… within a few centimetres"; phone must be unlocked ([Seritag Android](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-android)).
- Distances: a 38 mm tag with a good Android reads at "5-6cm"; a card antenna "might perform a little better"; small 12 x 19 mm tags "around 2cm" ([Seritag scan distance](https://seritag.com/learn/using-nfc/nfc-tag-scan-distance-explained)). Plan on **touching the card** in demos; the 1–4 cm figure in the original report is not sourced, so the safe instruction is "touch, then wait one second".

**Demo card script (print on the insert and say it in meetings):**
"Wake your phone. iPhone: rest the top edge of the phone on the card. Android: rest the middle of the phone's back on the card. Wait a second, then tap the banner. Not working? Lift the card off any metal surface, or scan the code on the back."

---

## Corrections (restated)

1. **Review-link generation and URL format.** Confirmed: Business Profile → Read Reviews → Get more reviews; "reviews QR codes can only be generated on a computer browser, not on mobile devices" ([Google help](https://support.google.com/business/answer/16816815?hl=en)). The `https://search.google.com/local/writereview?placeid=<PLACE_ID>` pattern is **not documented by Google**; it is community-documented ([Local Search Forum](https://localsearchforum.com/threads/how-to-find-a-direct-link-to-leave-a-google-review-for-your-business.54662/)) and, in a live test, redirects signed-out clients to a Google sign-in page. Encode a founder-controlled redirect that points to Google's own generated link, with the Place-ID URL as fallback.

2. **iPhone background reading / antenna / range.** Confirmed: iPhone XS and later, plain URI record (first URI record only, HTTPS supported), screen on and phone in use, user taps a notification ([Apple](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading)); iPhone 7/8/X need an app ([Seritag](https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone)). The "1–4 cm" range is unsourced; sources say "within a few centimetres" and 5–6 cm for a 38 mm tag on a good Android ([Seritag](https://seritag.com/learn/using-nfc/nfc-tag-scan-distance-explained)). "Any spot works" is oversimplified: GoToTags' card carries a 70 x 40 mm antenna inset from the edges ([GoToTags](https://store.gototags.com/nfc-pvc-card-ntag213-200-pack/)); instruct "hold the top of your iPhone against the card" and place the wayfinding mark at the antenna centroid confirmed from the vendor's inlay drawing.

3. **Competitor prices.** TAPro G-Series Onyx $34.95 (regular $39) confirmed; TAPro's white Tap Card is $27 single / $49 for 3 / $69 for 5 and NFC+QR bundles start at 2 for $39 ([TAPro products.json](https://taprocard.com/products.json)). Blinq Classic $19.99 stands (from prior verification). Reviews Card: £16 single (10 at £7.90 each), custom £25 (10 at £9.90) ([Reviews Card](https://www.reviewscard.com/products/custom-google-review-card-tap-or-scan)). dot.cards: standard card $30, **custom card $50** (not $61) per dotcards.net product data ([products.json](https://dotcards.net/products.json)); the collection page's "From $55/card, minimum 5" and the $61 figure come from other pages/third parties.

4. **Additional correction found in this pass — N-Mark registration in the US.** The original report said the US was not in the 2012 registered list; the guideline's own list on p.17 includes "United States of America" ([N-Mark PDF](https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf)). Use ® (upper right) when the mark is 5 mm or taller; omit below 5 mm.

5. **Additional correction — attribution type sizes.** The 4.5–5.5 pt attribution lines specified in the original card directions are below Tagstand's 8 pt minimum for UV inkjet; move attribution to an insert (Section 14).

---

## Sources

- Google trademark guidelines (Partner Marketing Hub): https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/trademark-guidelines-for-proper-usage/
- Google customer-reviews guidance: https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/
- Google Brand Resource Center guidance: https://about.google/brand-resource-center/guidance/
- Google trademark list: https://about.google/brand-resource-center/trademark-list/
- Partner Marketing Hub (application gating): https://partnermarketinghub.withgoogle.com/
- Google Maps "Write reviews" (sign-in, no anonymous reviews): https://support.google.com/maps/answer/6230175 and https://support.google.com/maps/answer/6230175?co=GENIE.Platform%3DiOS
- Google review link / QR help: https://support.google.com/business/answer/16816815?hl=en
- Google Business Profile review tips: https://support.google.com/business/answer/3474122
- Maps user-contributed content policy: https://support.google.com/contributionpolicy/answer/7400114
- Local Search Forum review-link thread: https://localsearchforum.com/threads/how-to-find-a-direct-link-to-leave-a-google-review-for-your-business.54662/
- Apple Core NFC background tag reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Android NFC basics: https://developer.android.com/develop/connectivity/nfc/nfc
- GoToTags iOS background reading: https://gototags.com/help/ios/nfc/reading/background
- Seritag iPhone: https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-iphone ; Android: https://seritag.com/learn/using-nfc/how-to-read-nfc-tags-with-an-android ; scan distance: https://seritag.com/learn/using-nfc/nfc-tag-scan-distance-explained
- Tagstand: https://www.tagstand.com/ ; https://www.tagstand.com/products/custom-small-batch-pvc-card-white-ntag215 ; https://www.tagstand.com/products/custom-small-batch-pvc-card-white-lanyard-slot-portrait-ntag213 ; https://www.tagstand.com/custom-order-info/ ; https://www.tagstand.com/custom-artwork-template-files/ ; https://www.tagstand.com/product-categories/custom-online-order/ ; https://www.tagstand.com/nfc-chip-chooser/
- GoToTags: https://store.gototags.com/nfc-pvc-card-ntag213-200-pack/ ; https://store.gototags.com/nfc-tags/ ; https://gototags.com/store/encoding/service ; https://gototags.com/store/printing/artwork ; https://gototags.com/store/pricing
- Shop NFC NTAG213 card: https://shopnfc.com/en/nfc-cards/11-nfc-cards-in-pvc-ntag213.html
- Plastek Cards: https://plastekcards.com/plastic-cards/nfc-cards/ ; Plastic Printers: https://www.plasticprinters.com/nfc-cards
- NFC Forum N-Mark guidelines: https://nfc-forum.org/uploads/Branding-and-Marks/NFC_N_Mark_Guidelines.pdf ; Wayfinding guidelines: https://nfc-forum.org/uploads/Branding-and-Marks/NFC_Wayfinding_Mark_Guidelines_111622.pdf
- Google Places: pricing https://developers.google.com/maps/billing-and-pricing/pricing ; Place IDs https://developers.google.com/maps/documentation/places/web-service/place-id ; API key https://developers.google.com/maps/documentation/places/web-service/get-api-key
- Stripe: shipping https://docs.stripe.com/payments/during-payment/charge-shipping.md?payment-ui=stripe-hosted ; Tax set-up https://docs.stripe.com/tax/set-up ; Tax pricing https://stripe.com/tax/pricing ; one-time discounts https://docs.stripe.com/payments/checkout/discounts.md?payment-ui=stripe-hosted ; subscription coupons https://docs.stripe.com/billing/subscriptions/coupons ; free trials https://docs.stripe.com/payments/checkout/free-trials.md?payment-ui=stripe-hosted ; customer portal https://docs.stripe.com/customer-management
- Eighth Circuit opinion vacating the FTC rule: https://ecf.ca8.uscourts.gov/opndir/25/07/243137P.pdf ; FTC Negative Option Rule page: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule ; ROSCA: https://www.ftc.gov/legal-library/browse/statutes/restore-online-shoppers-confidence-act ; 16 CFR 425.1: https://www.law.cornell.edu/cfr/text/16/425.1
- California AB 2863: https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2863 ; BPC 17602: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17602
- Ring: https://ring.com/ ; https://ring.com/protect-plans ; https://ring.com/doorbell-cameras
- BentoBox: https://getbento.com/ ; dot.cards: https://dotcards.net/ ; https://dotcards.net/products.json ; https://dotcards.net/products/dot-cards-custom
- Fonts: https://www.owner.com ; https://pos.toasttab.com ; https://cdn.prod.website-files.com/617ac0d059899a9a3c8216e9/css/blinq-app.shared.b5090b211.min.css ; https://ovationup.com ; https://www.podium.com
- TAPro: https://taprocard.com/products.json ; https://taprocard.com/collections/google-review-cards
- Reviews Card: https://www.reviewscard.com/products.json ; https://www.reviewscard.com/products/google-tap-to-review-cards ; https://www.reviewscard.com/products/custom-google-review-card-tap-or-scan ; https://www.reviewscard.com/collections/stands
- UPrinting table tents: https://www.uprinting.com/table-tent-printing.html ; WebstaurantStore check presenters: https://www.webstaurantstore.com/search/check-presenter.html
- Imagery: https://mockups-design.com/tag/business-card/ ; https://spline.design/pricing ; https://www.snappr.com/pricing
- USPTO trademark search: https://www.uspto.gov/trademarks/search ; Dub pricing: https://dub.co/pricing ; sharp colour API: https://sharp.pixelplumbing.com/api-colour


## Open questions
- Which card printer/encoder will be used? This determines RGB vs CMYK artwork (Shop NFC retransfer wants RGB; V1CE prints CMYK only) and whether full-bleed is possible (direct-to-card printers leave a 1-2 mm unprinted border).
- Does Google's Partner Marketing Hub grant a small business a free account to download the official G/wordmark files, or must the founder use the general Brand Resource Center assets? (The reviews page prompts for an application; this was not tested.)
- Is the N-Mark currently registered as a trademark in the United States? The 2021 guidelines list registered jurisdictions as of 2012 (US not listed), which affects whether to print (R) or TM on the card.
- Exact replacement-card policy mechanics for the $50/month plan (do unused free replacements roll over; who pays shipping) need a decision before the pricing page and Stripe products are built.
- Whether Direction 2 (black PVC) should be printed as white-only on black stock or as full-bleed near-black on white stock with metallic-tint type; depends on the chosen printer's black-card capabilities.
- Whether the founder will use Google Places API (billable) in the configurator for restaurant lookup and Place-ID capture, or ask customers to paste their g.page/r/.../review short link.
- No official 2026 Google page could be fetched that documents the reported April 2026 review-policy update (review kiosks, staff-name requests); the policy page fetched does prohibit staff quotas and specific-content requests, but the kiosk rule was only found in third-party summaries.
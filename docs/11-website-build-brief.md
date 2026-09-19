# Tablenote — build brief

What I want built, what already exists, and answers to your discovery checklist.

Prepared 2026-09-19. Live site: https://www.tblnt.com

---

## Read this first

Your checklist assumes a Squarespace site that needs improving. That is not what this is,
so a few of the questions answer themselves:

- The site is a **custom application**, not a Squarespace page. Next.js 16 (React), Tailwind,
  TypeScript, deployed on **Vercel**, source on GitHub at `MrZay1/Resturant` (private).
- **Squarespace only holds the domain and DNS.** The nameservers are Squarespace's; the `www`
  record points at Vercel. Nothing about the site itself lives in Squarespace, and there is
  nothing to migrate off.
- So the "platform decision" is already made. What I need is **new capability added to an
  existing app**, not a rebuild.

The business: I sell restaurants an NFC card the server drops at the table. The guest taps it
with their phone and it opens that restaurant's Google review page. $15 per card, one time.
Then $50 a month for an AI report that reads all their new Google reviews and tells the owner
what guests actually said. Cards are $15 each with a 10-card minimum, so a starter order is
$200 on day one and $50 a month after.

---

## Part 1 — Your checklist, answered

### Access and current setup

| Question | Answer |
|---|---|
| Where is the domain registered? | Squarespace. Nameservers are `nsc1–4.squarespacedns.com`. |
| Do I have registrar + Squarespace logins? | Yes, both. |
| Is the domain pointed anywhere? | Yes. `www.tblnt.com` resolves to Vercel and serves the live app. Apex `tblnt.com` 308-redirects to `www`. |
| Is business email on the domain and working? | Yes. Google Workspace (MX records are Google). `isiah@tblnt.com` is live. Transactional mail sends through **Resend** from `orders@tblnt.com`; domain is verified there. |
| HTTPS? | Yes, Vercel handles the certificate. |

### Goals and pain points

**What isn't working:** nothing is broken visually — the site is finished and reviewed. The
problem is that **everything behind it is manual**. I have no way to see my orders except email,
no login for customers, and the $50/month report that customers are paying for is something I
would write by hand today. The site sells a product that isn't automated yet.

**Main job for the site:** direct sales. A restaurant owner should be able to land, understand
it in under a minute, design their card, and pay — without talking to me. It also has to carry
credibility, because I'm one person walking into restaurants and the site is the proof I'm real.

**Typical visitor — there are three, and they want different things:**

1. **A restaurant owner I just pitched in person.** Already sold. Needs to order fast.
2. **An owner or manager who saw the card at another restaurant** and looked up the domain on
   the back. Knows nothing. Needs "what is this, what does it cost, how do I get it."
3. **An existing paying customer** who wants this month's report.

Right now the site serves #1 well, #2 poorly, and #3 not at all.

### Content and brand

- Keep what's there. Colors, type, and card templates are done and I like them.
- Real photos: I have none yet. The site currently uses illustration and rendered card mockups
  rather than stock photos, on purpose. Once I have real restaurants using the cards I want real
  photos of cards on real tables.
- Copy: keep. It's written and legally reviewed. **Do not rewrite the review-related copy without
  asking me** — there are Google policy rules about what I'm allowed to claim (no promising more
  reviews, no incentives, no filtering out bad reviews) and the wording is deliberate.

### Platform decision

Staying custom. Not moving to Squarespace. Not moving off Vercel.

### Functionality needs

E-commerce: yes, already built (Stripe Checkout, one-time + subscription in one transaction).
Contact forms: yes, already built, they email me.
CRM / email marketing: none yet, and I'd like your opinion on whether I need one.
Social accounts: none yet.
**Analytics: none installed.** I'd like something simple — I want to know how many people land
on the site from a card versus from me pitching them.

### Ongoing ownership

I want to be able to change prices, copy, and add restaurants myself without calling you.
Interested in a maintenance arrangement — let's talk about what that looks like.

### Logistics

- **Deadline:** no hard date, but I'm pitching local restaurants now and every week without the
  back office is a week I'm doing this by hand.
- **Budget:** to discuss.
- **Prepaid/contract:** Squarespace domain registration only. Vercel and Resend are on free tiers.

---

## Part 2 — What already exists (please don't rebuild this)

Live and working:

| Area | What's there |
|---|---|
| Public site | Home, How it works, Pricing, Sample report, FAQ, Book a demo, Contact, Google review link guide |
| Legal | Terms, Privacy, Review policy — written and specific to this business |
| Order flow | `/order` — card designer with 4 templates, brand color picker, logo upload, live preview, quantity estimator, then Stripe Checkout |
| Payments | Stripe Checkout, mixing the one-time card charge and the $50/mo subscription in a single session. Built and tested end to end in test mode. Live keys go in this week. |
| Order notification | Two emails per order, via Resend: **Artwork** (card picture + the uploaded logo attached at full size) when they reach the payment page, then **New order** (amount, quantity, shipping address, notes) when payment clears |
| Lead capture | Demo and contact forms email me, reply-to the sender |
| Card artwork | Scripts that render print-ready card fronts and backs at exact physical size (CR80, 85.6 × 53.98 mm, 3 mm bleed) as PDF and 300 dpi PNG, with machine-verified QR codes |
| Redirect layer | `/r/<slug>` — the card's chip points here, and I map it to the restaurant's Google review link. Means a restaurant can change its link without reprinting cards. |
| Pitch tools | `/pitch` (build a per-restaurant profile) and `/pitch/deck` (an 11-slide deck personalized to that restaurant, exportable to PDF) |
| Demo dashboard | `/dashboard` — looks right, but it is **sample data only**. No login, no real data behind it. |
| Print pages | Staff guide card, report one-pager — both print-ready |

**Stack:** Next.js 16 App Router, React, Tailwind v4, TypeScript, Stripe, Resend, Vercel.
Brand settings (name, domain, email, all pricing) are centralized in one file, `site/lib/brand.ts`.

---

## Part 3 — What I want built

Six things, roughly in the order they matter to me.

### 1. Back office — one place to see every order

Today an order arrives as an email and that's the only record. I want to log in and see every
customer, what they ordered, their card design choices, their logo file, their Google review
link, their shipping address, and where that order is in the process.

- A list of all orders with status: new → design sent → approved → printing → shipped → active
- Click an order and see everything, including the uploaded logo, downloadable
- Edit fields and add my own notes
- Search by restaurant name

This is the thing I need most. Everything else in this list depends on having real records.

### 2. A better card designer

The designer works but feels rigid. I want it fluid and obvious — the kind of thing an owner
plays with for thirty seconds and says "yeah, that one."

- Upload a logo and have the card just look right, without them fighting it
- Pull their brand colors automatically from the logo, with manual override
- Live preview of front and back that feels immediate
- A clear "just design it for me" option — a lot of these owners do not want to do this at all
- Must work well on a phone. I will be standing next to them holding my laptop, or they'll be
  doing it on their phone after I leave.

### 3. Make the site work for someone who found it on a card

An owner eats at a restaurant that uses my cards, flips one over, sees `tblnt.com`, and types it
in. Right now they land on a homepage written for someone who already knows what I sell.

- A fast, plain explanation: what the card is, what the report is, what it costs
- An obvious path to order, and an obvious path to log in if they're already a customer
- One constraint to respect: **the card's tap link must keep going straight to the restaurant's
  Google review page.** I cannot route guests through a sales page — that breaks Google's rules
  and it's not what the restaurant paid for. The discovery path has to be the printed domain on
  the back of the card, not the tap.

### 4. AI design + pitch generator in the back office

Right now, preparing to pitch one restaurant takes me real time. I want to type a restaurant's
name and have the system do the rest.

- I enter the restaurant name and location
- It finds their public information — review count, rating, what guests mention, who their
  busiest local competitors are
- It generates several card designs using their logo and colors, good enough to show the owner
- It builds the personalized pitch deck (this part partly exists — `/pitch/deck`)
- If the owner points at a design and says "that one," I turn it into an order on the spot
  without re-entering anything

### 5. Customer dashboard with real login

This is what justifies $50 a month. Right now the owner gets a report by email and it's buried
by the following week.

- Restaurant owner logs in with their own account
- Every monthly AI report, archived, newest first, readable on a phone
- How reviews are trending — count per month, average rating over time
- The actual reviews from the last month, with the ones that need a reply flagged
- Their card order history and a button to request replacement cards
- Honest note: **the AI report generator itself does not exist yet.** Neither does the Google
  review pull that feeds it. Those are real work and they're the actual product. The dashboard
  is the container; the report is the thing inside it.

### 6. Print and fulfillment handoff

Once a customer approves their design, I want getting it printed to be nearly automatic.

- One click produces the print-ready file, correct size, correct bleed, correct QR, both sides
- Packaged so I can drag and drop it straight into the card supplier's upload form
- Stores which supplier order belongs to which customer
- Handles both shipping modes: to me (so I hand-deliver, which is how I want to start) or
  direct to the restaurant
- Marks the order shipped and tells the customer

The file generation already works. What's missing is making it one click from an order record,
and tracking what happened after.

---

## Part 4 — Things all six have in common

Worth flagging, because none of these exist today and most of my list is blocked on them:

1. **User accounts and login.** There is no auth anywhere in the app right now. Items 1, 3, and
   5 all need it, and it needs two kinds of user — me, and restaurant owners.
2. **A database.** Today the only record of a customer is a Stripe payment and an email in my
   inbox. There's no place to store an order, a design, a logo file, or a report.
3. **File storage.** Logos currently reach me only as an email attachment. They need to live
   somewhere the app can read.
4. **The review pull and the AI report generator.** This is the product I'm charging $50 a month
   for and it is the single biggest unbuilt piece. Getting Google review data has its own
   approval process that takes time — worth starting early even if the dashboard isn't ready.

If you think the sensible order is different from how I listed them, tell me. You build these
for a living and I don't.

---

## Part 5 — What I still owe you

- Budget range
- Whether I'm hiring you for all six or starting with one
- Whether you want access to the GitHub repo, the Vercel project, or both
- My LLC status — the site currently names "Tablenote LLC" and I need to make that real or
  change it before I take live payments

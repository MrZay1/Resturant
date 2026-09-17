# Research: sales_demo_playbook

_Generated 2026-09-04 by a research workflow. Fact-check verdicts and gap-fill findings are appended below the main report._

# Field Sales & Demo Playbook: NFC Tap-to-Review Cards + Monthly AI Review Report for Independent Restaurants

Prepared 2026-09-04 for a solo founder selling door-to-door in a local US market. Product: NFC "tap to review us on Google" cards ($15 one-time each) plus a $50/month AI-written review report (10 free replacement cards/month while subscribed). Business name TBD; scripts below use "[Company]".

Every number in this document has a URL next to it. Items I could not verify are marked **[UNVERIFIED]** so you do not repeat them to an owner as fact.

---

## 0. The 90-second version of this playbook

1. Walk in Tue–Thu, mid-afternoon, ask for the owner or GM by name, never during a rush. Check Google "Popular times" before you go (https://support.google.com/business/answer/6263531).
2. Lead with the demo, not the pitch: hand the owner a card pre-programmed to THEIR Google review page, ask them to tap it with their own phone. Watch their face.
3. Sell the pilot, not the subscription: 30 days free, 5 cards, one real report at the end. Ask for a testimonial and logo permission in return.
4. Stay inside the lines: asking for Google reviews is allowed; incentivizing reviewers, pressuring guests on-premises, staff review quotas, asking guests to name a server, and gating negative reviews are all prohibited by Google (https://support.google.com/contributionpolicy/answer/7400114) and, for incentives conditioned on sentiment, by the FTC (https://www.law.cornell.edu/cfr/text/16/465.4).
5. Track 50 targets in one spreadsheet with a Day 0 / 2 / 7 / 14 / 30 cadence.

---

## 1. Who decides, when to visit, how to get past the host stand

### 1.1 Who decides at an independent restaurant

Context: 7 in 10 US restaurants are single-unit operations (https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/). That is your market, and it means the buyer is usually a person you can physically meet.

| Restaurant type | Likely decision-maker for a $50/mo + one-time card purchase | Notes |
|---|---|---|
| Single-unit, owner on premises daily (most neighborhood spots, family restaurants, ethnic restaurants, cafes) | **Owner** | GM/chef may influence, but the owner signs. Owner is often in the building 2–5 pm doing books, ordering, or prepping. |
| Single-unit, absentee/semi-absentee owner | **GM** can approve a pilot; owner approves recurring spend | Get the GM to run the free pilot; ask GM to bring you to the owner for the paid conversion. |
| Chef-owner restaurant | **Chef-owner**, but only before service (pre-3 pm) | Talk food quality data ("which dishes get named in reviews") — that is what a chef-owner cares about. |
| 2–5 unit local group | **Owner/operating partner**, sometimes a "director of ops" | Bigger prize; longer cycle. Ask the GM who handles "marketing vendors." |

Practical rule: **never pitch the host, bartender, or a server** beyond asking who the right person is and when they are in. But do treat them well — they will be dropping your cards on tables if you win.

Note: I could not find a primary-source survey on restaurant purchasing authority; the table above is practitioner convention **[UNVERIFIED as a statistic]**. Confirm it locally in your first 10 visits by simply asking, "Who would normally make a call on something like this?"

### 1.2 Best days and times

- **Target window: Tuesday–Thursday, roughly 2:00–4:00 pm** (after the lunch turn is cleared, before dinner prep and pre-shift meetings). This is the standard convention among restaurant vendors; I could not open a primary source article confirming exact rush windows in this session, so treat the window as a heuristic **[UNVERIFIED]** and validate it with the tool below.
- **Use Google's Popular times before every visit.** Google states the graph shows "how busy your location typically is during different times of the day," computed from "aggregated and anonymized data from users who have opted in to Google Location History," and that "live visit data" showing "how active your location is right now" is available (https://support.google.com/business/answer/6263531). Open the restaurant on Google Maps, look for the lowest bar between lunch and dinner, and go then. Check the live indicator as you walk up.
- **Avoid:** Friday–Sunday entirely; Monday (many independents are closed or the owner is off); 11:30 am–1:30 pm; anything after 4:30 pm; the first and last days of the month (payroll/rent); major sports events.
- **Bonus slots:** 10:00–11:00 am for breakfast/lunch-only spots that open at 11; 3:00–4:00 pm for dinner-only spots, which is when the owner/chef arrives.

### 1.3 Getting past the host stand politely

You are not "getting past" anyone; you are respecting their gatekeeping and giving them an easy yes.

Walk-in script (host or whoever greets you):

> "Hi — I'm not here to eat, sorry! My name's [Name], I run a small local company called [Company]. Is [Owner first name, if known] or the manager around for literally two minutes? I've got something for the restaurant I'd rather show than explain — it takes one tap on a phone."

If they ask what it's about:

> "It's a card that gets your guests to leave Google reviews right at the table — I made one for [Restaurant name] specifically. I just want to show it to whoever handles that. If now's bad, what time is usually calmest for them?"

If the owner is not in:

> "No problem. Could I leave this for them?" (hand the leave-behind with the demo card clipped to it) "What's their name, and is there a day and time they're usually here and not slammed? I'll come back then rather than bug them by phone."

Always get: decision-maker's name, best day/time, and (if offered) an email or phone. Write it in your CRM in the car before the next stop.

Manners that matter: never lean on the host stand; step aside if a guest arrives; do not hand out cards to servers unsolicited; if you see a walk-in rush start, leave and say you'll come back.

---

## 2. The 60-second pitch and the 3-minute demo

### 2.1 Demo card logistics (do this before you walk in)

You have two options; use both.

**Option A – Pre-built card per target restaurant (highest impact).** For each of your 50 targets:
1. Find the restaurant's Google Place ID with Google's Place ID Finder on the Places documentation page (https://developers.google.com/maps/documentation/places/web-service/place-id). Google notes Place IDs can become obsolete if a business closes or moves and recommends refreshing IDs stored more than 12 months (same URL).
2. Build the "write a review" URL. The commonly used format is `https://search.google.com/local/writereview?placeid=<PLACE_ID>` **[UNVERIFIED: Google's own help pages I fetched do not print the URL format; test every link by tapping it yourself before the visit]**. The official, verifiable route for a business that controls its profile is Business Profile → **Read Reviews** → **Get more reviews**, then copy the link or download the QR code (https://support.google.com/business/answer/16816815). You will use that official route at onboarding; for cold demos you need the Place ID route.
3. **Encode a redirect on your own domain, not the raw Google URL**, e.g. `https://[yourdomain]/r/AB12`. The redirect target is the Google review link. Benefits: you can fix a broken/changed Place ID without re-writing the chip, you can re-point the same demo card to a different restaurant, and every tap is counted (this is your "taps per shift" metric later).
4. Write the tag, test on an iPhone and an Android, and put a small printed label on the back: "[Restaurant name] demo".

**Option B – Generic demo card.** One card that redirects to a sample restaurant's review screen (use your own test Business Profile or a friend's restaurant with permission). Use it when a restaurant was not on your list or you ran out of pre-built cards.

**Phone compatibility you will be asked about:** iPhone XS and newer read NFC tags in the background with no app open and "can read NFC Tags with the screen locked"; iPhone 7–X need the NFC Tag Reader in Control Center (iOS 14+) (https://shopnfc.com/en/content/20-nfc-iphone). The reader is at the top edge of an iPhone — tell people to touch the top of the phone to the card, not the middle **[antenna position is practitioner knowledge, UNVERIFIED from a primary source]**. Most Android phones read tags when unlocked **[UNVERIFIED]**. Always carry a QR fallback (printed on the back of the card) so the demo never dies.

### 2.2 The 60-second pitch (owner is standing, you have one shot)

> "Thanks for the minute. Quick version: guests decide where to eat by reading Google reviews — 97% of people read reviews for local businesses now, and almost three-quarters only trust reviews from the last three months. So it's not just your star rating, it's whether you've got fresh reviews every week.
>
> Here's the problem: the people who write reviews on their own are the ones who were thrilled or furious. The happy, normal middle — most of your dining room — never gets asked. So I made this."
>
> (Hand them the card.) "Tap the top of your phone on it."
>
> (Their phone opens their own restaurant's Google review box.) "That's your review page. No app, no QR, no typing. Your server drops this on the table with the check; the guest taps while the meal is still fresh in their head.
>
> Then once a month, our AI reads every new review you got and sends you a two-page report: what people love, what they complain about, which dishes get mentioned, which servers get praised by name, and what changed since last month.
>
> Cards are $15 each, one time. The monthly report is $50 and includes ten free replacement cards a month. I'm looking for a handful of local restaurants to run a free 30-day pilot — five cards, no charge, and you get the first report free. Would that be worth trying here?"

Sources for the numbers in the pitch: 97% read reviews; 74% look for reviews from the last 3 months; 60% wrote about positive experiences vs 29% negative — all BrightLocal Local Consumer Review Survey 2026 (https://www.brightlocal.com/research/local-consumer-review-survey/).

### 2.3 The 3-minute demo script (owner sits down or leans in)

**Minute 1 – Let the tap do the talking**

> "Before I explain anything — take out your phone. Unlock it. Now tap the top edge of it on this card."
>
> (Wait. Do not talk while they tap.)
>
> "That's [Restaurant name]'s own Google review box. Nothing to download, nothing to scan. That's the whole guest experience: tap, stars, a sentence, done. A guest can do it in the time it takes the server to bring back the card."

If they have an older iPhone: "Swipe down to Control Center, tap the NFC reader — or just point your camera at the QR on the back." (Keep going; do not let the tech be the story.)

**Minute 2 – Show the report, on paper**

> "Here's a sample of the monthly report." (Hand them the printed one-page sample — see Section 8.) "This is what you'd get on the 1st of every month. Top: how many new reviews, your rating trend. Middle: the three things guests praised most, the three things they complained about, with the actual quotes. Here: every menu item mentioned, and whether the mention was good or bad. Here: staff. If guests write 'Maria was amazing' four times, you'll see that. If someone writes 'our server disappeared for 20 minutes' you'll see that too, without having to read 60 reviews yourself.
>
> And the last section is recommendations — two or three concrete things to fix or double down on. Reading the reviews is the easy part; this is the part nobody has time for."

Tie to something you noticed on their profile before you walked in (do this homework):

> "I looked at your profile this morning. You're at [X.X] stars with [N] reviews, and your most recent one is [Y] weeks old. That gap is what this fixes — 32% of consumers now say they want reviews from the last two weeks." (https://www.brightlocal.com/research/local-consumer-review-survey/)

**Minute 3 – Rules, then the pilot**

> "Two things I'll say up front because owners always ask. One: Google explicitly allows you to ask guests for reviews with a link or QR — it's in their own help center. What they ban is paying or discounting for reviews, pressuring people, and asking staff to hit review quotas. We stay on the right side of every one of those, and I'll give you a one-page staff guide that keeps it that way.
>
> Two: I'm not going to ask you to sign anything today. I'd like to put five cards in your check presenters for 30 days, free. At the end you get one real report built from your reviews. If it's useful, it's $50 a month and you keep getting ten free replacement cards. If it's not, you hand back the cards and we're square. What I ask in return is honest feedback, and if it works, a sentence I can quote and permission to show your logo. Fair?"

Then stop talking. Silence closes.

If yes: run the onboarding checklist (Section 8) right there on your phone, or book a 20-minute onboarding visit within 48 hours.

---

## 3. Evidence bank (memorize the six starred ones)

| # | Claim | Number | Source |
|---|---|---|---|
| 1★ | Consumers read online reviews for local businesses | 97% | https://www.brightlocal.com/research/local-consumer-review-survey/ |
| 2★ | Recency matters: look for reviews from the last 3 months / last 2 weeks / last week | 74% / 32% / 18% | same |
| 3 | Won't use a business with fewer than 20 reviews | 47% | same |
| 4★ | Minimum rating demanded: at least 4 stars / 4.5+ stars | 68% / 31% | same |
| 5 | Google is the most-used review platform; ChatGPT/AI tools now 3rd | Google 71%; AI tools 45% (up from 6% in 2025) | same |
| 6★ | Asking works: were asked for a review in the past year / of those asked, left one | 78% / 83% | same |
| 7 | Reviews written about positive vs negative experiences | 60% vs 29% | same |
| 8 | Likely to use a business that responds to every review / unlikely to use one that ignores reviews | 80% / 42% | same |
| 9 | Read AI-generated review summaries / would rely solely on them | 82% / 23% | same |
| 10★ | One-star increase in Yelp rating → revenue increase; effect driven by independent restaurants, not chains | 5–9% | Luca, "Reviews, Reputation, and Revenue: The Case of Yelp.com," HBS Working Paper 12-016, https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf |
| 11★ | Half-star Yelp improvement → chance of selling out at peak rises from 13% to 34%; effect strongest for lesser-known restaurants | +19 pts | Anderson & Magruder, Economic Journal 2012, via UC Berkeley: https://news.berkeley.edu/2012/09/04/yelp-reviews-boost-restaurant-business/ |
| 12 | Responding to reviews → higher ratings and more reviews (hotels) | +0.12 stars; +12% review volume | Proserpio & Zervas, Marketing Science 2017, https://ideas.repec.org/a/inm/ormksc/v36y2017i5p645-665.html |
| 13 | Google: "More reviews and positive ratings can help your business's local ranking." | — | https://support.google.com/business/answer/7091 |
| 14 | Local pack ranking factors 2026: high Google ratings (#6), quantity of Google reviews with text (#9), recency of reviews (#11), sustained influx "rather than bursts" (#14) | — | https://whitespark.ca/local-search-ranking-factors/ |
| 15 | 2025 BrightLocal: only 4% "never" read reviews; 96% are "open to writing your business a review" but only 29% wrote one in the past year | — | https://www.brightlocal.com/research/local-consumer-review-survey-2025/ |
| 16 | 7 in 10 US restaurants are single-unit operations | 70% | https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/ |

Caveats to state honestly if pressed: the Luca and Anderson/Magruder studies are Yelp-based and from 2011–2016 data, not Google 2026; the Proserpio/Zervas study is hotels. Owners respect you more when you say "the best causal studies are on Yelp a decade ago, but the mechanism — ratings drive demand for independents more than chains — is exactly your situation."

Things I could not verify and you should NOT cite: any "Google says complete profiles get 7x more clicks / 2.7x more reputable" figure (Google's current Business Profile page carries no such statistics: https://business.google.com/us/business-profile/); the Womply revenue-by-review-count study (site now only carries PPP litigation content); TripAdvisor "Power of Reviews" numbers.

---

## 4. The 10 most common objections, with evidence-backed responses

**1. "We already have a QR code on the receipt."**

> "Great — keep it. Two differences. The receipt only goes to the one person paying, usually after they've mentally left; a card sits in front of the whole table while they're still talking about the meal. And a QR needs the camera opened, focused, and a banner tapped; on any iPhone from the XS up, the card just needs to touch the phone — no app, screen can even be locked. Same link, less friction, more of the table. Let's run both for 30 days and count which one produces reviews."

Source for background NFC reading: https://shopnfc.com/en/content/20-nfc-iphone. Asking → 83% comply: https://www.brightlocal.com/research/local-consumer-review-survey/.

**2. "Doesn't Google penalize asking for reviews?"**

> "No — Google's own help center says, and I'm quoting, 'To leave reviews, you can ask customers to visit a Google link or scan a QR code.' What Google bans is offering incentives, discouraging negative reviews, pressuring people while they're on premises, and telling staff to hit a number of reviews. Our staff guide is built around exactly those rules. You'll actually be safer with a script than you are winging it."

Sources: https://support.google.com/business/answer/3474122 (asking allowed; incentives prohibited); https://support.google.com/contributionpolicy/answer/7400114 (Rating Manipulation section). Contrast: Yelp says "Businesses are not permitted to ask their customers for reviews" (https://trust.yelp.com/) — so the card points to Google, not Yelp.

**3. "My servers won't do it."**

> "They won't do anything that adds steps. This adds zero: the card lives in the check presenter, so it's on the table the moment the check is. The only line they say is one sentence. I'll train the floor in five minutes at pre-shift, leave a laminated card by the POS, and you'll see in the monthly report which servers guests are praising by name — that's the part servers actually like."

Then show the laminated guide (Section 6).

**4. "What about bad reviews? I don't want to invite them."**

> "You're already getting them — the angry guest doesn't need an invitation. Who isn't reviewing you is the 80% in the middle who had a good night. When you ask everyone, the ratio shifts: consumers write about positive experiences twice as often as negative ones (60% vs 29%). And the ones that are negative come with detail you can fix, and the report will surface the pattern. One more thing: responding to reviews measurably helps — 80% of consumers say they're likely to use a business that responds to every review — and the report tells you which ones to respond to first."

Sources: https://www.brightlocal.com/research/local-consumer-review-survey/; https://ideas.repec.org/a/inm/ormksc/v36y2017i5p645-665.html. Do NOT promise to remove or filter negative reviews: Google only removes policy-violating content and "negative reviews alone aren't grounds for removal" (https://support.google.com/business/answer/4596773); the FTC rule prohibits review suppression and misrepresenting that displayed reviews represent all reviews (https://www.law.cornell.edu/cfr/text/16/465.7).

**5. "$50 a month for a PDF?"**

> "It's $50 for someone to read every review you get, every month, and tell you what changed — which dish is slipping, which server is carrying Friday nights, which complaint showed up three times. If you read every review yourself already, you don't need it. Most owners tell me they skim the 1-stars and miss the pattern. And the $50 includes ten replacement cards a month, so the card side is basically free after month one.
>
> Here's the math I'd do: Harvard's study of independent restaurants found each extra star of rating is worth 5–9% of revenue. Take whatever number that is for you and compare it to $600 a year. And honestly — the pilot is free; judge the first report, not the price."

Source: https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf. Do not invent an ROI; make them plug in their revenue.

**6. "We use Toast / Yelp already."**

> "Keep them. Yelp's own policy says businesses are not permitted to ask customers for reviews — so Yelp is not a place you can actively build. Google is where 71% of consumers look and where you're allowed to ask. On Toast: if you're using their email or text marketing to request reviews after a digital receipt, that only reaches guests who gave an email or phone, hours later. This catches the whole table at the table. They're complementary, not competing."

Sources: https://trust.yelp.com/; https://www.yelp.com/guidelines ("Businesses should never ask customers to write reviews."); Google share https://www.brightlocal.com/research/local-consumer-review-survey/. **[UNVERIFIED: I could not load Toast's product pages this session to confirm the exact review-request feature in Toast Marketing; before your first visit, check what Toast actually offers and adjust the line.]**

**7. "Won't a burst of reviews look fake and get filtered?"**

> "A burst would — which is why this isn't a burst. It's a few reviews a night, every night, from real guests on their own phones. That steady trickle is literally what local SEO experts rank as a top signal: 'sustained influx of reviews over time rather than bursts.' Google's spam filter does occasionally remove legitimate reviews, and if that happens there's an appeal path — I'll help you with it."

Sources: https://whitespark.ca/local-search-ranking-factors/; https://support.google.com/business/answer/4596773.

**8. "I already have 4.7 stars and 600 reviews."**

> "Then you're the restaurant that has the most to lose from going quiet. Nearly three-quarters of consumers want reviews from the last three months, and a third want them from the last two weeks. Your rating is a trophy; your recency is a heartbeat. Cards keep the heartbeat going without you thinking about it — and the report tells you if anything starts slipping before it shows up in the stars."

Source: https://www.brightlocal.com/research/local-consumer-review-survey/ (74% / 32%).

**9. "Cards will walk off / get lost / get wet."**

> "They will. That's why the subscription includes ten free replacement cards every month. Start with roughly one card per check presenter plus a few spares in the POS drawer, and tell me when you're low."

**10. "I need to talk to my partner / I'm too busy right now."**

> "Totally fair. I'll leave this one-pager and the demo card — have your partner tap it with their phone, it's the fastest way to explain it. When are you both usually here? I'll come back then for ten minutes, and if it's a no, it's a no."

Log the follow-up date before you leave the parking lot.

Bonus objections you will hear:

- **"Is it legal to ask for reviews?"** Yes. The FTC's 2024 rule prohibits compensation "conditioned expressly or by implication on" reviews "expressing a particular sentiment" (https://www.law.cornell.edu/cfr/text/16/465.4), insider reviews without disclosure (https://www.law.cornell.edu/cfr/text/16/465.5), and suppression (https://www.law.cornell.edu/cfr/text/16/465.7). A neutral "tap here to review us" card is none of those.
- **"I read my own reviews; I don't need AI."** "45% of consumers now use ChatGPT or similar tools to find local businesses, and 82% read AI review summaries. Your reviews are what those tools read. The report shows you what the machines are saying about you." (https://www.brightlocal.com/research/local-consumer-review-survey/)
- **"Guests will be annoyed."** "The card sits silently. The server says one sentence and never asks twice. Google's policy actually requires that we not pressure guests on premises, and the script is written so nobody ever feels pushed."

---

## 5. Pilot offer structure

**The offer (say it in one breath):**

> "Free 30-day pilot: five cards, our staff guide, a five-minute pre-shift training, and one full monthly report at the end. No card, no contract, no charge. If it's useful, it's $50 a month from day 31 with ten free replacement cards monthly, and you can cancel any time. If it isn't, I collect the cards and we part friends."

**What you ask for in return (get verbal agreement at signup, written at conversion):**

1. A 15-minute feedback call or visit at day 30 (this is also your close meeting).
2. If they are happy: a 1–2 sentence quotable testimonial with name, title, and restaurant.
3. Permission to display their logo and name on your website and one-pager ("as seen at").
4. A short written case study (their before/after review count and rating over 30 days — you compute it from public Google data, they approve it).
5. Two introductions to other local owners they respect (ask at day 30, not day 0).

**Pilot success criteria you set on day 0 (write them on the pilot sheet):**

- Baseline: rating, total reviews, date of most recent review (screenshot on day 0).
- Target: X new Google reviews in 30 days (set it modestly using their covers: e.g., 200 covers/week × ~4 weeks × a 1–2% tap-to-review rate = 8–16 reviews **[the 1–2% conversion assumption is UNVERIFIED — set it as a hypothesis and replace with real data after your first three pilots]**).
- Process: card in every check presenter (manager spot-check twice a week).

**Conversion meeting at day 30:**

> "Here's your report, and here's the before/after: you went from [N] to [N+k] reviews, your newest review is now [x] days old instead of [y] weeks. Ready to keep it going? It's $50 a month starting today, cancel anytime, ten replacement cards included."

Have the Stripe payment link ready on your phone; you already have a Stripe account. **Never** type the owner's card details yourself — hand them your phone or send the link.

**Pilot limits:** cap it at 10 simultaneous pilots (you still have to produce reports); do not extend pilots beyond 30 days — extension teaches the owner that free is negotiable.

---

## 6. Server adoption: making the card drop a habit (and staying inside Google's rules)

### 6.1 The policy lines you must design around

From Google's Maps User Generated Content Policy, "Rating Manipulation" section (https://support.google.com/contributionpolicy/answer/7400114):

- "When soliciting reviews, merchants should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included."
- Prohibited examples include "Merchants requesting that staff solicit a certain number of reviews" and "Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member."
- Also prohibited: "Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers," and offering "payment, discounts, free goods and/or services" for reviews.

From Google Business Profile Help (https://support.google.com/business/answer/3474122): asking via a link or QR code is allowed; incentives to customers are "strictly prohibited" as fake engagement.

**Consequences for your program design:**

| Practice | Status | Why |
|---|---|---|
| Card on every table with the check; server says one neutral sentence | Allowed | "Ask customers to visit a Google link" is explicitly sanctioned |
| Server says "leave it now before you go" or hovers while they tap | Not allowed | On-premises pressure |
| "Mention me by name in the review!" | Not allowed | Requesting content that identifies a staff member |
| "If you had a good time, review us; if not, tell the manager" | Not allowed | Selective solicitation / gating |
| Free dessert / discount for a review | Not allowed (Google) and, if tied to sentiment, illegal (FTC 465.4) | Incentivized review |
| Per-review or per-tap bonus paid to servers; review quotas per shift | **Do not do it** | Google's example of prohibited conduct is "requesting that staff solicit a certain number of reviews"; a per-tap bonus is a quota in disguise and will push servers into pressuring guests |
| Team-level reward for **process compliance** (card in 100% of check presenters on spot-checks), not tied to review counts | Acceptable in my reading, since it rewards placement, not solicitation numbers **[this is an interpretation, not Google text]** | Keeps the incentive off the guest interaction |
| Owner/manager/staff writing reviews of their own restaurant | Not allowed (Google conflict of interest; FTC 465.5 insider reviews) | https://www.law.cornell.edu/cfr/text/16/465.5 |

Bottom line for the founder: **the reviewer must never be incentivized, and the staff must never be given review numbers to hit.** Track taps for the owner's information, not for staff bonuses.

### 6.2 The habit design

1. **Put the card in the check presenter, permanently.** The card goes where the check goes. No new step. Spares live in the POS drawer.
2. **Tie it to the existing closing line.** Servers already say something when they drop the check. Replace it with:

   > "Here's your check whenever you're ready — and that card, if you tap your phone on it, takes you straight to our Google page. Only if you've got a second. Thanks for coming in."

   One sentence, once, no follow-up ask. Phones down, walk away.
3. **Pre-shift training: five minutes, once.** Founder attends the first pre-shift. Demo the tap on two staff phones. Hand out the laminated guide. Answer "what if they ask about a discount?" ("We never offer one — it's against Google's rules and it can get the restaurant's reviews removed.")
4. **Manager spot-check.** Twice a week the manager opens three check presenters at random. Card present = yes/no. That is the only staff metric.
5. **Monthly recognition, not monthly quotas.** When the report lands, the owner reads the "staff praised by name" section aloud at pre-shift. This is the recognition loop that makes servers care, and it costs nothing and breaks no rule (guests named them unprompted).
6. **Taps per shift.** Your redirect domain logs each tap with a timestamp. Show the owner a simple "taps by day of week / by shift" chart in the report. Use it to spot "cards not on tables on Sunday brunch," never to rank servers.

### 6.3 Laminated 1-page staff guide (copy this text)

> **[Restaurant] — Tap-to-Review Card**
>
> **What it is:** A card that opens our Google review page when a guest taps it with their phone.
>
> **Where it lives:** In every check presenter. Spares in the POS drawer. If a card walks, replace it — we get free replacements.
>
> **What to say (once, when you drop the check):**
> "That card — if you tap your phone on it, it goes straight to our Google page. Only if you've got a second. Thanks for coming in."
>
> **Then walk away.** Never watch them tap. Never ask twice. Never ask them to do it before they leave.
>
> **If they ask how:** "Touch the top of your phone to it. Older iPhone? Swipe down to Control Center and hit the NFC reader — or point your camera at the QR on the back."
>
> **Never say:**
> - "Give us 5 stars" / "Mention my name"
> - "If it wasn't good, tell the manager instead"
> - "You'll get a dessert / discount for a review"
>
> These break Google's rules and can get all our reviews removed.
>
> **If a guest complains:** get the manager, in person, now. That's the best review strategy there is.

---

## 7. CRM and tracking for 50 target restaurants

Use one Google Sheet (or Airtable). Keep it stupid simple; you are the only user.

### 7.1 Sheet 1 – "Targets" (one row per restaurant)

| Column | Notes |
|---|---|
| ID | T001–T050 |
| Restaurant name | |
| Address / neighborhood | Group rows by neighborhood for route planning |
| Cuisine / type | |
| Est. covers/day | Your guess; refine at pilot |
| POS system | Toast / Square / Clover / other — shapes objection #6 |
| Google rating | From Maps on day 0 |
| Google review count | day 0 |
| Date of most recent review | day 0 — the "staleness" hook |
| Yelp rating (optional) | |
| Place ID | For the demo card; refresh if >12 months old (https://developers.google.com/maps/documentation/places/web-service/place-id) |
| Demo card ID | e.g., AB12 (your redirect slug) |
| Decision-maker name / role | Owner / GM / chef-owner |
| Best day/time | From the host or Popular times |
| Phone / email | Only if offered |
| Stage | Not visited → Visited (no DM) → Pitched → Pilot → Paying → Lost → Parked |
| Last touch date | |
| Next action + date | The only column you sort by every morning |
| Objection heard | Pick from list #1–#10; this tells you what to fix in the pitch |
| Pilot start / end | |
| Cards issued | |
| Testimonial? / Logo OK? | Y/N |
| Notes | |

### 7.2 Sheet 2 – "Touches" (one row per visit/call/text)

Date, Target ID, type (walk-in / call / text / email), who you spoke to, outcome, next step. This keeps Sheet 1 clean.

### 7.3 Sheet 3 – "Pilots" (one row per pilot)

Day-0 rating / count / newest-review date; day-30 rating / count / newest-review date; taps logged; new reviews; converted (Y/N); testimonial text.

### 7.4 Follow-up cadence

| Day | Action |
|---|---|
| 0 | Walk-in. Demo if DM present; leave-behind + demo card if not. Log. |
| 2 | Short text or email (only if they gave it): "Thanks for the minute Tuesday. The card I left is programmed to your actual Google page — worth a tap. I'll swing by [day] at [time]." |
| 7 | Second walk-in at the time the host told you. Bring the printed sample report again. |
| 14 | Call (or third walk-in if no phone). Ask a single question: "Is the hesitation the cards, the report, or the timing?" |
| 30 | Final touch: "Last check-in from me — I've got [N] pilot slots left this month. If it's not a fit, no hard feelings." Then mark Lost or Parked (re-approach in 90 days). |

Weekly rhythm: Tue/Wed/Thu afternoons = 8–10 walk-ins per afternoon, grouped by neighborhood (24–30 touches/week). Monday mornings = build demo cards for the week's targets and refresh the sheet. Friday mornings = write reports for pilots and paying customers, send day-2 texts.

Simple weekly scorecard (top of the sheet): walk-ins, DM conversations, demos performed, pilots started, pilots converted, paying total, MRR.

---

## 8. Demo kit (what goes in the bag)

1. **Pre-built demo cards** for that day's targets (labelled on the back) plus 3 generic demo cards. Each carries a QR fallback on the back.
2. **Two spare "product" cards in the finished design** (front: "Tap to review us on Google" with a placeholder logo; back: QR + small "Powered by [Company]") so the owner can hold the real thing.
3. **A small acrylic or wood card stand** with one card in it, to show the counter/host-stand placement option.
4. **A check presenter** (a cheap black one) with a card tucked in — this makes the "no new step" argument visually in two seconds.
5. **Printed one-page sample report** (color, on heavy paper): use a fictional restaurant or your own test data; sections: headline numbers and trend, top 3 praises, top 3 complaints with quotes, menu items mentioned, staff praised (first names only), taps by day of week, three recommendations. Bring 10 copies.
6. **Laminated staff guide** (Section 6.3) — show it; it defuses "servers won't do it."
7. **One-page leave-behind** with: what it is (3 bullets), the six starred stats with sources, pricing ($15/card; $50/month incl. 10 replacement cards), the pilot offer, your phone/email/website, and a QR to your site. Clip a demo card to it.
8. **Business cards.**
9. **Pilot agreement sheet** (half-page, two copies): restaurant, DM, start/end date, cards issued, day-0 baseline, what you'll deliver, what you ask in return, "no charge during pilot; $50/month after if you choose to continue; cancel anytime." Both sign; it is not a contract, it is a memory aid.
10. **Your own phone** with: the Stripe payment link, the Place ID Finder page bookmarked, your redirect admin page (to create/re-point slugs on the spot), and Google Maps open.
11. **A second phone (Android)** if you can borrow one — for the "does it work on Android?" question.
12. **Screen wipe and a pen.**

Keep the kit in a slim folio, not a backpack; you should look like a guest who wandered in, not a delivery.

---

## 9. Onboarding checklist for a signed (or pilot) restaurant

Do this in one 20-minute sitting with the decision-maker, on your phone or tablet, and email a copy the same day.

**A. Google review link (the most important item)**

1. Ask the owner to open their Business Profile (business.google.com) → **Read Reviews** → **Get more reviews** → copy the link (https://support.google.com/business/answer/16816815). This is the official link and is the one you should encode behind the redirect for the production cards.
2. If they cannot access the profile (lost login, ex-manager owned it): fall back to the Place ID (https://developers.google.com/maps/documentation/places/web-service/place-id) and note "profile access = No" so you can help them claim it — a claimed, complete profile also matters for ranking ("Businesses with complete and accurate info are more likely to show up in local search results," https://support.google.com/business/answer/7091).
3. Record the Place ID and the date; plan to re-verify links every 12 months.
4. Test-tap the production link on an iPhone and an Android before the cards go on tables.

**B. Brand assets**
- Logo: vector (SVG/AI/PDF) preferred; otherwise PNG at least 300 dpi. Ask for both light-background and dark-background versions if they exist.
- Brand colors as hex codes (or you sample them from the logo and confirm).
- Card front choice: (a) "Tap to review us on Google" generic, or (b) their logo + short tap prompt. Get approval on a PDF proof by email before ordering.

**C. Floor facts**
- Number of tables and check presenters → cards to issue (rule of thumb: one per presenter + 20% spares).
- Counter/host-stand placement wanted? (stand)
- Number of servers and the pre-shift day/time when you can train.
- Manager who will do the twice-weekly spot-check.

**D. Report settings**
- Recipient emails (owner + GM; ask if the chef should get the menu section).
- Delivery day (1st of the month default).
- **Server-name handling — pick one:** (1) full first names as written by guests; (2) first name + initial; (3) anonymized ("Server A") in the main report with a manager-only appendix listing names; (4) praise only by name, criticism anonymized. Recommend option 4 as default: it keeps the recognition loop and avoids the report being used as a disciplinary document based on a single review. Also confirm: the report may quote reviews verbatim (they are public), and the report never instructs staff to ask for names in reviews (Google policy).
- Menu item list (photo of the menu is enough) so the AI can match item mentions.
- Anything they want tracked specifically ("parking complaints," "brunch wait times").
- Who is responsible for replying to reviews; you may include a "reply first to these three" list.

**E. Admin**
- Contact for card replacements; count of free replacements used this month.
- Stripe: send the payment link; the owner enters their own card. Confirm the billing email.
- Pilot: day-0 screenshot of rating, count, and newest-review date saved to the Pilots sheet.

---

## 10. Compliance guardrails (one paragraph you can put in your terms and your one-pager)

"[Company] cards link guests directly to the restaurant's public Google review form. We never offer guests anything in exchange for a review, never filter or route reviews based on sentiment, never ask staff to meet review quotas or to request specific review content, and never write reviews on a restaurant's behalf. Restaurants using our cards agree to the same." Grounding: Google Maps UGC policy (https://support.google.com/contributionpolicy/answer/7400114); Google Business Profile Help (https://support.google.com/business/answer/3474122); FTC Rule on Consumer Reviews and Testimonials, 16 CFR 465.4, 465.5, 465.7 (https://www.law.cornell.edu/cfr/text/16/465.4; https://www.law.cornell.edu/cfr/text/16/465.5; https://www.law.cornell.edu/cfr/text/16/465.7; FTC announcement https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials).

---

## 11. What I could not verify this session (check before you rely on it)

- Toast's exact review-request functionality and pricing (pos.toasttab.com returned 403).
- A primary source for the "2–4 pm Tue–Thu" lull (use Google Popular times per restaurant instead).
- The exact `search.google.com/local/writereview?placeid=` URL format (widely used; Google's help pages I opened do not print it). Test each link.
- NFC antenna location on iPhone (top edge) and Android background-read behavior.
- Any tap-to-review conversion rate. Treat 1–2% as a hypothesis until your first three pilots report.
- HBS Working Knowledge and HBR article pages returned 403; the Luca finding is taken directly from the working paper PDF, and the Proserpio/Zervas figures from the RePEc abstract.

---

## Sources

- BrightLocal, Local Consumer Review Survey 2026 — https://www.brightlocal.com/research/local-consumer-review-survey/
- BrightLocal, Local Consumer Review Survey 2025 — https://www.brightlocal.com/research/local-consumer-review-survey-2025/
- BrightLocal, Google Reviews Study (2018) — https://www.brightlocal.com/research/google-reviews-study/
- Luca, M., "Reviews, Reputation, and Revenue: The Case of Yelp.com," HBS Working Paper 12-016 — https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf
- UC Berkeley News on Anderson & Magruder (Economic Journal, 2012) — https://news.berkeley.edu/2012/09/04/yelp-reviews-boost-restaurant-business/
- Proserpio & Zervas, "Online Reputation Management," Marketing Science 36(5), 2017 — https://ideas.repec.org/a/inm/ormksc/v36y2017i5p645-665.html
- Google Maps User Generated Content Policy: Prohibited & restricted content — https://support.google.com/contributionpolicy/answer/7400114
- Google Business Profile Help: Get reviews on Google — https://support.google.com/business/answer/3474122
- Google Business Profile Help: Create a Google link or QR code to request reviews — https://support.google.com/business/answer/16816815
- Google Business Profile Help: How to improve your local ranking on Google — https://support.google.com/business/answer/7091
- Google Business Profile Help: Popular times — https://support.google.com/business/answer/6263531
- Google Business Profile Help: Reviews missing / removed — https://support.google.com/business/answer/4596773
- Google Maps Platform: Place IDs (incl. Place ID Finder) — https://developers.google.com/maps/documentation/places/web-service/place-id
- Whitespark, Local Search Ranking Factors 2026 — https://whitespark.ca/local-search-ranking-factors/
- Yelp Trust & Safety — https://trust.yelp.com/
- Yelp Content Guidelines — https://www.yelp.com/guidelines
- FTC press release, final rule banning fake reviews (Aug 14, 2024) — https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- 16 CFR 465.4 / 465.5 / 465.7 (Cornell LII) — https://www.law.cornell.edu/cfr/text/16/465.4 ; https://www.law.cornell.edu/cfr/text/16/465.5 ; https://www.law.cornell.edu/cfr/text/16/465.7
- National Restaurant Association, national statistics — https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/
- ShopNFC, NFC and iPhone (background tag reading by model) — https://shopnfc.com/en/content/20-nfc-iphone
- TouchBistro 2025 American Diner Trends Report — https://www.touchbistro.com/blog/diner-trends-report/
- Google Business Profile marketing page (checked; carries no quantified stats) — https://business.google.com/us/business-profile/



---

## Fact-check verdicts

- **confirmed**: 97% of consumers read online reviews for local businesses; 74% look for reviews from the last 3 months, 32% from the last 2 weeks; 68% require at least 4 stars and 31% require 4.5+; 47% won't use a business with fewer than 20 reviews (BrightLocal 2026).  
  Correction: All figures match the BrightLocal Local Consumer Review Survey 2026 (published Feb 11, 2026; n=1,002 US adults). Note the survey is a self-reported consumer survey, not behavioral data.  
  Source: https://www.brightlocal.com/research/local-consumer-review-survey/
- **confirmed**: 78% of consumers were asked for a review in the past year and 83% of those asked left one; 60% wrote about positive experiences vs 29% negative; Google is the top review platform at 71%, AI tools now 45% (BrightLocal 2026).  
  Correction: All figures appear on the page. Minor nuance: the 45% for ChatGPT/AI tools is framed as a 'source of business recommendations' (up from 6% the prior year), ranked third behind Google (71%) and Facebook, rather than strictly a 'review platform'. A separate 65% figure on the same page refers to consumers who wrote a review after being asked over the past 12 months; the 83% is the conversion figure for 'this year'.  
  Source: https://www.brightlocal.com/research/local-consumer-review-survey/
- **confirmed**: A one-star increase in Yelp rating leads to a 5-9% increase in restaurant revenue, and the effect is driven by independent restaurants, not chains (Luca, HBS Working Paper 12-016).  
  Correction: Verified directly from the PDF abstract: '(1) a one-star increase in Yelp rating leads to a 5-9 percent increase in revenue, (2) this effect is driven by independent restaurants; ratings do not affect restaurants with chain affiliation.' Data is Washington State restaurants (Seattle area) circa 2003-2009, so it is dated (paper copyright 2011/2016).  
  Source: https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf
- **confirmed**: Moving from 3 to 3.5 Yelp stars raises a restaurant's chance of selling out at peak times from 13% to 34%; effect strongest for lesser-known restaurants (Anderson & Magruder, Economic Journal 2012).  
  Correction: UC Berkeley news release confirms the 13% to 34% figure, the Economic Journal publication, and that restaurants already rated in guidebooks/newspaper rankings showed no statistically significant effect. Study is based on San Francisco Bay Area reservation data from 2012; dated.  
  Source: https://news.berkeley.edu/2012/09/04/yelp-reviews-boost-restaurant-business/
- **confirmed**: Google explicitly allows businesses to ask customers for reviews via a link or QR code, but prohibits offering incentives (free or discounted goods/services) for reviews as fake engagement.  
  Correction: Page says businesses can 'ask customers to visit a Google link or scan a QR code' and that offering incentives 'like free or discounted goods or services' for posting, changing, or removing reviews 'is considered fake & misleading content and is strictly prohibited.'  
  Source: https://support.google.com/business/answer/3474122
- **confirmed**: Google's Rating Manipulation policy says merchants should not require or pressure users to leave reviews while on the premises, should not request staff solicit a certain number of reviews, and should not request reviews that include content identifying a staff member; discouraging negative reviews or selectively soliciting positive ones is prohibited.  
  Correction: All five points verified verbatim in the Maps user contributed content policy (Rating Manipulation section). Important for this product: the 'should not require or pressure users to leave ratings or write reviews while on the premises' clause means table-drop cards must be framed as an optional invitation, not pressure, and the 'content that identifies a staff member' clause means the card/server should not ask guests to name the server.  
  Source: https://support.google.com/contributionpolicy/answer/7400114
- **confirmed**: FTC 16 CFR 465.4 prohibits providing compensation or incentives conditioned expressly or by implication on reviews expressing a particular sentiment; 465.5 requires disclosure for insider (officer/manager/employee) reviews; 465.7 prohibits review suppression.  
  Correction: 465.4 ('Buying positive or negative consumer reviews') text matches. 465.5 ('Insider consumer reviews and consumer testimonials') requires clear and conspicuous disclosure of material relationship for officer/manager reviews and employee/agent testimonials, and bars officers/managers soliciting relatives/employees without disclosure. 465.7 ('Review suppression') bars unfounded legal/physical threats and intimidation to prevent/remove reviews and bars misrepresenting that displayed reviews represent all reviews when negative ones are suppressed. Note 465.4 permits incentives for reviews that are NOT conditioned on sentiment; combined with Google's stricter policy, the practical rule is no incentives at all for Google reviews.  
  Source: https://www.law.cornell.edu/cfr/text/16/465.4
- **confirmed**: Google states 'More reviews and positive ratings can help your business's local ranking' and that businesses with complete and accurate info are more likely to show in local search results.  
  Correction: Both quotes verified verbatim on Google's 'How to improve your local ranking on Google' help page.  
  Source: https://support.google.com/business/answer/7091
- **confirmed**: Whitespark 2026 Local Search Ranking Factors ranks high Google ratings #6, quantity of Google reviews with text #9, recency of reviews #11, and sustained influx of reviews over time rather than bursts #14 for local pack rankings.  
  Correction: 2026 edition (published Nov 6, 2025) local pack/finder table: #6 High Numerical Google Ratings (4-5), #9 Quantity of Native Google Reviews (w/text), #11 Recency of Reviews, #14 Sustained Influx of Reviews Over Time. This is an expert-opinion survey of local SEO practitioners, not a Google statement.  
  Source: https://whitespark.ca/local-search-ranking-factors/
- **confirmed**: Yelp's policy states businesses are not permitted to ask their customers for reviews, so review-solicitation cards should target Google, not Yelp.  
  Correction: trust.yelp.com states verbatim: 'Under Yelp's policies, businesses are not permitted to ask their customers for reviews.' The 'target Google not Yelp' part is the report's own inference, which is reasonable.  
  Source: https://trust.yelp.com/
- **confirmed**: Hotels that respond to reviews see a 0.12-star rating increase and 12% more review volume (Proserpio & Zervas, Marketing Science 2017).  
  Correction: Abstract states 'a 0.12-star increase in ratings and a 12% increase in review volume for responding hotels.' Study is hotels on TripAdvisor, not restaurants on Google, so treat as analogous evidence only.  
  Source: https://ideas.repec.org/a/inm/ormksc/v36y2017i5p645-665.html
- **partially_correct**: iPhone XS and newer read NFC tags in the background without an app, even with the screen locked; iPhone 7-X require the Control Center NFC Tag Reader (iOS 14+).  
  Correction: Apple's own support page lists automatic NFC Tag Reader support on iPhone SE (2nd gen and later), XR, XS, XS Max, 11 series and later, and requires the Control Center toggle on iPhone 7, 7 Plus, 8, 8 Plus, and X (iOS 14 introduced this). The 'screen locked' detail comes only from the ShopNFC vendor page (which says XS/XR 'can read NFC Tags with the screen locked'); Apple's developer docs could not be fetched to confirm. Practical caveats from GoToTags: the iPhone must have been unlocked at least once since restart, and background reading does not work in Airplane Mode, while the camera is in use, or during an Apple Pay/Core NFC session. In practice the screen must be awake (lit), not off. Also note for demo cards: the tag must be NDEF-encoded with a URL, otherwise iPhones do nothing.  
  Source: https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios
- **confirmed**: The official Google review link/QR is obtained via Business Profile > Read Reviews > Get more reviews; Google Place IDs should be refreshed if stored more than 12 months.  
  Correction: Both parts verified, but they come from different Google pages. The 'Read Reviews > Get more reviews' steps (copy link or right-click to save the QR image) are on support.google.com/business/answer/16816815. The 12-month guidance is in the Places API docs: 'Google recommends refreshing place IDs if they are more than 12 months old' (refresh is free via a Place Details request with only the place ID field). The cited Business Profile page does not mention Place IDs; cite the Places doc for that part.  
  Source: https://developers.google.com/maps/documentation/places/web-service/place-id
- **confirmed**: 7 in 10 US restaurants are single-unit operations (National Restaurant Association).  
  Correction: Verbatim on the NRA 'Restaurant Industry Facts at a Glance' section: '7 in 10 restaurants are single-unit operations'; also '9 in 10 restaurants have fewer than 50 employees.'  
  Source: https://restaurant.org/research-and-media/research/industry-statistics/national-statistics/

### Fact-checker notes
## Verification notes

**Method:** Opened every cited primary source directly (BrightLocal survey page, HBS PDF via local text extraction, UC Berkeley news release, Google Business Profile and Maps policy pages, Cornell LII for 16 CFR 465.4/465.5/465.7, Whitespark 2026 report, trust.yelp.com, RePEc abstract, ShopNFC, Google Business Profile review-link page, Google Places API docs, NRA statistics page, Apple support NFC model list).

**Results:** 13 confirmed, 1 partially correct, 0 refuted, 0 unverifiable.

**Items worth fixing in the report:**
1. **Claim 12 (iPhone NFC):** Apple's own list of models with automatic NFC tag reading is SE (2nd gen+), XR, XS, XS Max, 11+ — so "XS and newer" is close but omits XR/SE. The "even with the screen locked" statement is only supported by the ShopNFC vendor page; Apple's Core NFC developer page could not be retrieved. Operational caveats (phone must have been unlocked once since restart; no reading in Airplane Mode, with camera open, or during Apple Pay) should be added because they affect demo reliability. Recommend citing Apple's support page rather than ShopNFC.
2. **Claim 13 (Place ID refresh):** Correct, but the 12-month refresh recommendation is in the Places API `place-id` documentation, not the Business Profile help article that was cited. Cite both.
3. **Claim 2:** BrightLocal's page contains both an 83% and a 65% "wrote a review after being asked" figure; the report's 83% is the headline "this year" figure and is correct, but sales copy should quote one and not both.
4. **Age of academic evidence:** Luca (WA State data, paper 2011/2016) and Anderson-Magruder (2012) are Yelp studies, over a decade old. Proserpio-Zervas is hotels on TripAdvisor. They remain the standard citations but should be framed as analogous evidence, not Google-specific results.

**Policy observations relevant to the product design (not errors in the report):** Google's Rating Manipulation policy explicitly bars pressuring guests on premises, staff review quotas, and soliciting content that identifies a staff member. The tap-card mechanic and the "which servers get praised by name" feature of the monthly report sit close to these lines; the playbook should include compliant scripting for servers and should not encourage restaurants to prompt guests to name staff.


## Completeness critic

- How the AI report actually gets the review data. The report never says where the monthly reviews come from. The official Google Business Profile API requires (a) Google approving the founder's Cloud project (applicant must manage a verified profile active 60+ days; review takes ~14 business days, with 2026 forum reports of longer delays) and (b) the restaurant owner granting OAuth consent with the business.manage scope (https://developers.google.com/my-business/content/prereqs, https://developers.google.com/my-business/content/review-data, https://discuss.google.dev/t/business-profile-api-reviews-endpoint-mybusiness-googleapis-com-cant-be-enabled-basic-access-pending-10-business-days/389462). Scraping Maps is a ToS risk; third-party review APIs (Outscraper, SerpApi, etc.) cost money. The onboarding checklist (Section 9) does not ask for Business Profile manager access or OAuth consent at all, and the pilot promises a 'real report' in 30 days that the founder may have no compliant way to build.
- Upfront card economics at conversion. A 25-table restaurant needs ~30 cards (Section 9C rule: one per presenter + 20% spares) = ~$450 at $15 each, yet the pilot gives 5 free cards and the day-30 conversion script only mentions '$50 a month.' The playbook never scripts the card purchase, never anticipates the 'I have to spend $450 before the $50 starts?' objection, and never addresses the loophole that 10 free replacement cards/month lets a restaurant fill its floor for free within 2-3 months instead of buying cards.
- Demo failure modes on the owner's phone are not covered: the reviewer must be signed into a Google account (owners on iPhone with no Google account, or logged into a Workspace/business account, will hit a sign-in wall); basement/back-office dead zones with no cellular data mean the tap opens nothing; iPhone background tag reading does not fire when the display is off, Camera/Wallet is open, or Airplane Mode is on (the report cites only a reseller page, not Apple). No fallback script for 'nothing happened when I tapped.'
- Risk that the owner accidentally submits a review of their own restaurant during the demo. The demo deliberately opens the owner's own 'write a review' form; the report separately says owner reviews violate Google's conflict-of-interest rule and FTC 465.5 but never tells the founder to say 'do not submit this' or to use a screenshot/back-out step.
- The NFC hardware and encoding decisions the founder needs before building 50 demo cards are absent: chip type (NTAG213/215/216, memory needed for a short URL), NDEF URI record format, which writing app/tool to use (e.g., NFC Tools on iOS/Android), whether tags should be write-locked, how long a rewrite takes, and how many blank cards to buy for 50 targets plus spares. No supplier or per-card cost for demo cards is given, and no lead time is estimated.
- The redirect/tap-tracking system is assumed but never specified: whether it is a route on the founder's Next.js site or a link shortener, what is logged per tap (timestamp only vs. slug + user agent), whether production cards get per-card slugs (needed for the 'taps by table/shift' promise in Section 6.2 step 6) or one slug per restaurant, and how the founder will show taps in the report.
- How to build and qualify the 50-target list is not covered: selection criteria (review count under X, rating 3.8-4.6, newest review older than 30 days, cuisine, distance), a data source for pulling rating/count/last-review date at scale, and a route-planning method. Section 7 tells the founder what columns to record but not how to fill the first 50 rows.
- Restaurant-specific review statistics were requested but not delivered. The brief asked how many consumers read reviews before choosing a restaurant and for Google's own review-count/click data; the report only supplies generic local-business numbers (BrightLocal) and states it could not find Google click data. The TouchBistro 2025 Diner Trends report is listed in Sources but no figure from it is used anywhere in the text.
- Objection 6 (Toast/Yelp) is left unverified and the broader competitive set is missing entirely: Ovation, Birdeye, Podium, Yelp Guest Manager, Google's own free QR code in the 'Get more reviews' panel (https://support.google.com/business/answer/16816815), and generic Amazon 'Google review' NFC cards/plaques. No competitor prices and no answer to 'why not the free Google QR code on a table tent?' which is the most damaging version of objection 1.
- Counter-service, fast-casual, cafe, and bar formats have no check presenter; the entire habit design (Section 6.2) and the '20% spares per presenter' math assume full-service. No placement, script, or card count is given for counter pickup, QR-on-table-tent competitors, or bars where the tab closes at the rail.
- Commercial terms the owner will ask about at conversion are missing: cancellation notice, refund policy on unused cards, who owns the cards, what happens to the redirect links if they cancel (cards on tables go dead or keep working?), sales tax on the physical cards (taxable goods in most states, unlike the subscription in many), and whether a written terms-of-service/pilot agreement template exists beyond the half-page 'memory aid.'
- Realism of the weekly cadence. Section 7.4 prescribes 8-10 walk-ins per afternoon inside a 2:00-4:00 pm window (about 12-15 minutes per stop including driving, waiting for the DM, and a 3-minute demo). No travel-time budget, no neighborhood clustering math, and no fallback for when the DM asks you to wait 20 minutes.
- Server-name handling in the AI report is decided (option 4 default) but the privacy/employment angle is not: whether quoting a review that names and criticizes an employee, and forwarding it to the owner, creates any obligation (e.g., state privacy or labor considerations), whether the founder should offer a 'no staff names ever' option, and how the AI will disambiguate two servers with the same first name. Also no sample of the actual report layout/page count, which the founder must produce before the first pilot.
- Language and staffing realities: no Spanish (or other) version of the staff guide or server script, no guidance for owners whose first language is not English, and no note on high server turnover (the 'train once at pre-shift' plan breaks when half the floor changes in 60 days).

### Critic notes
## Internal contradictions and weak reasoning

- **Report length flip-flops.** The 60-second pitch promises a "two-page report"; the demo kit (Section 8) and the brief specify a "printed one-page sample report." Pick one before printing.
- **Locked vs. unlocked.** Objection 1 says on iPhone XS+ "screen can even be locked," while the 3-minute demo script says "Unlock it." The reseller source (shopnfc.com) is the only citation; Apple's own conditions (display must be on, not in Camera/Wallet, not Airplane Mode) are not cited. The demo should just say "wake the screen and hold the top edge to the card."
- **Paraphrase drift on the headline stat.** The pitch says "almost three-quarters only trust reviews from the last three months." The evidence table (and BrightLocal) says 74% *look for* reviews from the last 3 months. "Only trust" is stronger than the source.
- **Invented number in objection 4.** "The 80% in the middle who had a good night" has no source; every other figure in the doc is cited, so an owner who checks will find this one hollow. Replace with the 60%/29% positive-vs-negative stat that is cited.
- **The 78%/83% 'asking works' figures** (evidence #6) are real but appear in third-party summaries of the 2026 BrightLocal survey (e.g., https://www.pinmeto.com/news/brightlocal-local-consumer-review-survey-2026/); the founder should confirm they appear on the primary page before putting them on the leave-behind. Note also that a BrightLocal 2026 summary reports 69% wrote a review in the last 12 months, whereas the report's row #15 (from the 2025 survey) says 29% -- the two editions should not be mixed on one slide without labeling the year.
- **Card revenue model undermines itself.** $15/card one-time plus 10 free replacements per month means a paying restaurant's incremental card revenue after month one is roughly zero, and the free-replacement stream can be used to avoid ever buying a full floor set. The pilot section says "extension teaches the owner that free is negotiable" but the pricing itself teaches the same lesson for cards.
- **Pilot report promise vs. data access.** Section 5 promises "one real report built from your reviews" at day 30 and Section 2.3 says "our AI reads every new review," but nowhere does the document explain how reviews are obtained. Official API access needs Google project approval plus owner OAuth consent (https://developers.google.com/my-business/content/prereqs); this can take weeks and is a hard dependency for the first pilot. The onboarding checklist should be adding a "grant Business Profile manager access / connect Google" step, and the founder should decide now between official API, a third-party review API, or manual copy-paste for the first 3-5 pilots.
- **Tap-tracking claims outrun the design.** Section 6.2 promises "taps by day of week / by shift" and Section 5 uses taps as a pilot metric, but the demo-card design uses one redirect slug per restaurant. Per-shift/per-table insight requires per-card slugs (and knowing which card sits at which table), which is never specified.
- **Place ID route is doing a lot of work while marked UNVERIFIED.** The whole cold-demo plan depends on `search.google.com/local/writereview?placeid=...`; the report flags it as unverified but also says "you need the Place ID route." A five-minute test on the founder's phone should have resolved this before the playbook was written. The official help page (https://support.google.com/business/answer/16816815) confirms the owner-side copy-link path but prints no URL format.
- **"2-4 pm Tue-Thu" is both prescribed and flagged unverified**; the Popular-times workaround is sound, but the "avoid first and last day of the month" and "avoid major sports events" rules are unsourced conventions stated as rules.
- **Team-level process-compliance reward** (Section 6.1 table) is labeled an interpretation, which is honest, but it is still a staff incentive tied to the review program; a cautious owner may treat any money attached to the cards as risk. The playbook should give the founder a no-incentive default and present the reward idea only if asked.
- **Weekly volume math is optimistic**: 24-30 touches/week in three 2-hour windows implies a stop every ~12-15 minutes with no travel or waiting time, which is unlikely for a solo founder who also needs to write reports on Fridays and build cards on Mondays.


---

## Gap-fill research
# Gap-Fill Addendum: Sales & Demo Playbook (NFC Tap-to-Review + Monthly AI Report)

Prepared 2026-09-04. This addendum covers the 18 missing topics and re-examines the one correction. Every number carries a URL. Items marked **[UNVERIFIED]** could not be confirmed from a primary source this session (the web-search budget was exhausted partway through; remaining items were pulled directly from primary URLs). Things I could not find are stated as such rather than guessed.

---

## 1. Where the AI report gets the review data (the hidden dependency)

**The problem is real.** The playbook promises a "real report" at day 30 but never says how the founder obtains the reviews. There are five routes; only two are both compliant and available on day 1.

| Route | Compliant? | Available now? | Cost | Notes |
|---|---|---|---|---|
| A. Official Business Profile API (`accounts.locations.reviews.list`) | Yes | **No** – needs Google approval first | Free | Gated; see below |
| B. Restaurant adds founder as a **Manager** on its Business Profile; founder reads/exports reviews from the GBP dashboard by hand | Yes | Yes | Free, ~15–30 min/restaurant/month | Recommended for pilots |
| C. Places API (New) Place Details, `reviews` field | Yes | Yes | Enterprise SKU, $35/1k requests, 1,000 free/month | Returns only a handful of reviews per call (not the full month) – **insufficient for the report** |
| D. Third-party review extractors (Outscraper, SerpApi) | Grey – scraping Maps is a Google ToS risk | Yes | Outscraper: first 500 reviews free, then $3 per 1,000 reviews; SerpApi from $25/mo for 1,000 searches | Do not build the paid product on this |
| E. Owner forwards Google's "new review" notification emails to a report inbox | Yes | Yes | Free | Fragile (owners forget); use as backup to B |

**Route A details (official API):**
- Prerequisites, quoted from Google: the applicant must "Manage a Google Business Profile that is verified and active for 60+ days", "Have a website representing the business listed on the GBP", and apply from an email listed as owner/manager on that GBP. Approval is signaled by quota: "If your quota is 0 QPM (Queries Per Minute), your project has not yet been approved"; "If your quota is set to 300 QPM, your project is approved." No approval timeframe is stated. (https://developers.google.com/my-business/content/prereqs)
- Required OAuth scope: `https://www.googleapis.com/auth/business.manage`; "The Google My Business API is only visible in the Google Cloud console to users who submit and receive approval for their Google Account through the access request form." (https://developers.google.com/my-business/content/basic-setup)
- Review endpoints live on the **legacy v4** API (`mybusiness.googleapis.com`): `accounts.locations.reviews.list`, `reviews.get`, `batchGetReviews`; fields include reviewer, star rating, comment, create time, reply. (https://developers.google.com/my-business/content/review-data)
- Real-world timeline (Aug 2026 forum thread, no Google response): developers waited 10+ business days with 0 QPM, resubmitted 2026-08-12 for another 7–10 day window, one filed three requests (Aug 3, 18, 27) with no acknowledgment, and several could not enable `mybusiness.googleapis.com` at all ("Service ... is not available to this consumer") even after basic access. Whether v4 reviews access is a separate allowlist is unanswered. (https://discuss.google.dev/t/business-profile-api-reviews-endpoint-mybusiness-googleapis-com-cant-be-enabled-basic-access-pending-10-business-days/389462)

**Implication for the founder:** the founder's own company needs a verified Google Business Profile with a website, and it must be 60+ days old before the founder can even apply. Create the company's GBP **this week** (business name is required, so naming is now on the critical path). Realistically the API is a Q1 2027 capability, not a pilot capability.

**What to add to the onboarding checklist (Section 9A, new items):**
1. Owner opens business.google.com → Business Profile settings → People and access → Add → founder's email → role **Manager**. Record the date.
2. Owner agrees in the pilot sheet: "[Company] may read and quote my public Google reviews to produce the monthly report."
3. Owner turns on review notification emails and adds reports@[yourdomain] as a forward (backup).
4. When the API is approved later: owner clicks one OAuth consent link (scope `business.manage`); record consent date.

**Report production for pilots (manual but honest):** on the 1st of the month, open each pilot's reviews in the GBP dashboard, copy the month's reviews (text, stars, date, reviewer first name) into the AI prompt, generate, edit, send. At 10 pilots this is a half-day. Say this plainly to owners: "For the pilot I read them as your profile manager; the automated connection comes when Google approves our API access."

---

## 2. Upfront card economics at conversion

**The math the owner will do in their head:** 25 tables → ~30 cards (one per presenter + 20% spares) × $15 = **$450 up front**, plus $50/month. The pilot gives 5 free cards and the day-30 script mentions only "$50 a month." That is a bait-and-switch feeling, even if unintentional.

**The loophole:** 10 free replacement cards/month means a subscriber who buys zero cards has 5 (pilot) + 10 + 10 + 10 = **35 cards by the end of month 3** – a full floor for $150 of subscription. Rational owners will notice; the ones who do not will feel tricked when they figure it out.

**Cost basis reality check:** blank NTAG213 PVC cards cost $0.29 each at 100 units (GoToTags, https://store.gototags.com/nfc-pvc-card-ntag213/) to $0.44–0.55 each (Tagstand, https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/); custom-printed cards are $2.54 each at 100 units, minimum order 100, 4-week production (Seritag, https://seritag.com/nfc-tags/cp-cards-ntag213). So a $15 card carries roughly $12 of margin, and "10 free replacements" costs the founder $3–25/month depending on printing. The card price is not where the business lives; the subscription is.

**Three ways to fix it (pick one before the first pilot):**

| Option | How it works | Pros | Cons |
|---|---|---|---|
| **A. Cards included, owned by [Company] (recommended)** | $50/mo includes up to N cards on loan (N = presenters + 20%, capped at 40). Extra cards $15 each. Lost/damaged replaced free up to 10/mo. Cards returned (or re-pointed) on cancel. | Zero up-front objection; "10 free replacements" stops being a loophole because the fleet is already included; you keep control of the hardware | Founder fronts $10–100 of hardware per restaurant; needs a return/re-point policy (Section 11) |
| B. Starter kit pricing | "$50/mo + one-time $199 starter kit (30 cards)" | Still monetizes hardware | $199 is the new objection; only ~$6.60/card |
| C. Replacement = replacement | Keep $15/card; free replacements only against returned damaged cards or reported losses, capped at 1/3 of cards purchased per month | Closes loophole | Feels petty; owners will not mail back wet cards |

**Scripted card purchase + objection (only needed if you keep Option B/C):**

> "The report is $50 a month. Cards are one-time – you've got 25 tables, so 30 cards is $450. After that, replacements are free, ten a month, so you never buy cards again."
>
> **"I have to spend $450 before the $50 even starts?"** – "Fair. Two ways to do it: buy the 30 today, or start with the five pilot cards plus this month's ten free ones – that's 15, enough for your busiest section – and I'll add ten more each month until you're full. Most owners just buy the floor and forget it."

With Option A the whole exchange disappears, which is the point.

---

## 3. Demo failure modes on the owner's phone (and the fallback script)

| Failure | Why it happens | What you see | Fix / script |
|---|---|---|---|
| **Sign-in wall** | Google reviews require a signed-in Google Account; users who are logged out, in incognito, or in a restricted work/school (Workspace) account will not get the "Write a review" button (https://wiserreview.com/blog/why-cant-i-leave-a-google-review/). The Google Maps help page itself starts with "sign in to Google Maps" (https://support.google.com/maps/answer/6230175). A Workspace admin thread on exactly this exists: "Users can't post reviews with Workspace account" (https://support.google.com/a/thread/201861133) | Tap works, page loads, then a Google sign-in prompt | "That's Google asking you to sign in – your guests are almost all signed in on their own phones already. Sign in or just watch mine." Then tap with **your** phone, signed into a personal Gmail. |
| **No data (basement office, walk-in cooler side, back-of-house)** | NFC works; the URL cannot load | Phone vibrates/banner appears, then a blank page or "no connection" | "Hold that thought – the tap worked, it's the Wi-Fi back here. Let's step to the front." Or ask for the restaurant Wi-Fi. Never run the demo in the office if the dining room is available. |
| **iPhone: screen off / Camera or Wallet open / Airplane Mode / never unlocked since restart** | Apple's automatic reading needs the phone awake; practitioner sources say it does not fire in Airplane Mode, while the camera is in use, or during an Apple Pay/Core NFC session, and not until the phone has been unlocked once since restart **[GoToTags page could not be fetched this session; treat as practitioner knowledge]** | Nothing happens | "Wake the screen, close the camera, tap the **top** edge of the phone to the card." |
| **iPhone 7/8/X** | Needs the NFC Tag Reader control in Control Center (https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios) | Nothing happens | "Swipe into Control Center, tap NFC Tag Reader, then hold it to the card – or point your camera at the QR on the back." |
| **Android: NFC off or screen locked** | Android "devices are usually looking for NFC tags when the screen is unlocked, unless NFC is disabled in the device's Settings menu" (https://developer.android.com/develop/connectivity/nfc/nfc); "the device must be unlocked to scan a tag" (https://seritag.com/learn/tech/how-to-read-nfc-tags-with-an-android) | Nothing happens | "Unlock it, hold the middle of the back of the phone on the card. If still nothing, Settings → search NFC → on." Then QR fallback. |
| **Tag not NDEF-formatted or empty** | Your own encoding error | Nothing on any phone | Test every card on both platforms Monday morning; carry 3 known-good generic cards. |

**The universal fallback line ("nothing happened when I tapped"):**

> "No problem – phones are picky about where the antenna is. Flip the card over and point your camera at the QR. Same link. On the table, guests use whichever works; that's why both are on the card."

Rule: never spend more than 20 seconds debugging in front of the owner. Move to QR, then to your own phone, then to the printed report.

---

## 4. Preventing the owner from submitting a review of their own restaurant during the demo

The demo deliberately opens the owner's "write a review" form. Owners tap stars reflexively. An owner review violates Google's conflict-of-interest rules (https://support.google.com/contributionpolicy/answer/7400114) and, if it reads as a customer review without disclosure, the FTC's insider-review provision (https://www.law.cornell.edu/cfr/text/16/465.5). Add this line **before** the tap, every time:

> "You're about to see your own review box. Don't tap the stars or post anything – owners aren't allowed to review their own place, Google's rules and the FTC's. Just look, then hit back."

Belt-and-braces option: build the **demo** redirect slugs to land on the restaurant's Google **Maps listing** (place page) rather than the write-review form, and show the write-review form only on your own phone (where you obviously do not submit). For production cards, of course, the redirect goes to the write-review form.

If the owner does post accidentally: have them delete it immediately from their Google Maps contributions (Your contributions → Reviews → menu → Delete review). Log it in the Touches sheet.

---

## 5. NFC hardware and encoding decisions for the 50 demo cards

**Chip:** NTAG213. User memory 144 bytes (NTAG215: 504; NTAG216: 888), per the NXP datasheet (https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf); Tagstand lists 137 bytes of available NDEF message memory on its NTAG213 cards (https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/). A redirect URL like `https://yourdomain.com/r/AB12` is ~30 characters, so NTAG213 has 4x headroom. Do not pay for 215/216. All three chips "support password protection and permanent locking" and share the same phone compatibility (https://www.rfidcard.com/nfc-card-types-explained-how-to-choose-between-ntag213-ntag215-ntag216-and-ntag424-dna/).

**NDEF record:** one NDEF **URI record** (type "U"). The URI prefix byte (e.g., `https://` or `https://www.`) is stored as a single byte, so keep your redirect domain short and use `https://` (no `www`). Seritag's encoding note: include "http://" or "https://" in the data (https://seritag.com/nfc-tags/cp-cards-ntag213). iPhones only react to NDEF-formatted tags containing a URL; a blank or text-only tag does nothing on iPhone (see Corrections).

**Writing tool:** **NFC Tools** (wakdev) on iOS and Android – free; writes "a link to a website" and can "Wipe, reformat, lock or password-protect your NFC tags" (https://www.wakdev.com/en/apps/nfc-tools-ios.html). Workflow per card: Write → Add a record → URL → paste slug URL → Write → hold card to top of iPhone. Rewrite takes a few seconds per card **[timing is practitioner experience, UNVERIFIED]**; 50 cards is under an hour including labeling.

**Locking:** locking is permanent and one-way. Because your cards carry a redirect slug (not the Google URL), **you never need to rewrite the chip** – you re-point the slug server-side. Therefore: **lock production cards** (prevents a prankster from rewriting a table card to a malicious URL) and lock demo cards too. Only leave a card unlocked if you might want to change its slug ID itself.

**How many blanks to buy:** 50 targets + 15% encoding/loss spares + 3 generic demo cards + 5 "finished product" samples = ~70. Buy **100** (unit cost drops at 100 and you will want spares for pilots).

**Suppliers and per-card cost (blank white PVC, CR80, NTAG213):**

| Supplier | Price | Stock / lead time | Source |
|---|---|---|---|
| GoToTags (US/Canada stock) | $0.30 (10), **$0.29 (100)**, $0.27 (1,000) | "Immediate", "Normally Stocked"; printable Direct-to-Card/Retransfer/UV; offers a printing service | https://store.gototags.com/nfc-pvc-card-ntag213/ |
| Tagstand (US) | $0.55 (1–24), $0.50 (50–99), **$0.44 (100–499)**, $0.39 (1,000+); 100-pack listed at $45 but **out of stock** at time of check | Single-card SKU shows 1,335 in stock | https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/ ; https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/ |
| Seritag (UK, custom full-colour printed, encoded) | **$2.54/card at 100–199**, $1.56 at 200–299, $0.98 at 500; min order 100; "Current production time is estimated at 4 weeks"; offers single or variable (per-card) encoding, locked or unlocked, and per-card QR printing | 4 weeks | https://seritag.com/nfc-tags/cp-cards-ntag213 |
| Amazon 30-pack NTAG213 printable cards | Price not retrievable this session **[UNVERIFIED]** | 1–2 days | https://www.amazon.com/NTAG213-Printable-Writable-Compatible-NFC-Enabled/dp/B0CDC3DGLJ |

**Demo-card build plan (this week):** order 100 blanks from GoToTags (~$29 + shipping, immediate). Print the card face on **adhesive vinyl labels** (front: "Tap to review [Restaurant] on Google"; back: QR + "[Restaurant] demo") – blank PVC "can't support inkjet printer" (Amazon listing note in the same search) so do not try to print PVC at home. For the finished product, order 100–250 custom-printed cards from Seritag/GoToTags once you have a name and logo; budget 4 weeks lead time, so the pilot cards will be labeled blanks, and that is fine – say so.

---

## 6. The redirect / tap-tracking system (specify it now)

**Where it lives:** a route in the founder's existing Next.js site: `app/r/[slug]/route.ts`. On GET: look up slug → target URL, insert a tap row, return HTTP 302 to the Google write-review URL. No link-shortener SaaS (you need the data and the re-pointing control, and a third-party domain on a card looks cheap).

**Data model (minimum):**
- `cards`: `slug` (6–8 chars, unguessable), `restaurant_id`, `card_no` (1..N within restaurant), `label` (e.g., "Table section A" or "Bar"), `target_url`, `status` (demo / active / cancelled), `created_at`.
- `taps`: `id`, `slug`, `ts`, `user_agent` (truncated), `platform` (derived: iOS/Android/other), `referrer` (nullable). **Do not store IP** (no need, avoids privacy questions); store a coarse country/region only if you must.

**One slug per card, not per restaurant.** Per-card slugs cost nothing and are what makes "taps by section / bar vs floor" possible (Section 6.2 step 6). Map card_no → physical location at onboarding (card 1–12 = dining room presenters, 13–14 = bar, 15 = host stand). Do **not** map cards to individual servers; the metric is placement, never people (Google policy on staff quotas).

**What the report shows:** total taps, taps by day of week, taps by hour band (lunch/dinner/late), taps by card group (floor/bar/counter/takeout), iOS vs Android share, and "cards with zero taps in 14 days" (probably missing from the presenter). State plainly on the report: "Taps are opens of the review page, not reviews. Google does not report which reviews came from the card."

**Guardrail (see Section 16):** the redirect goes straight to Google. No interstitial, no rating question, no branching by sentiment.

---

## 7. Building and qualifying the first 50-target list

**Selection criteria (write them at the top of the Targets sheet):**
1. Independent full-service or fast-casual with table service; not a chain of 6+.
2. Google rating **3.8–4.6** (below 3.8 the problem is not review volume; above 4.6 with 500+ reviews the owner feels no pain).
3. Review count **30–400** (under 30 they may have profile-claiming problems; over 400 the marginal review matters less – though "recency" still sells, see Section 4 objection 8).
4. **Newest review older than 21 days** – the staleness hook.
5. Within a ~2-mile cluster (two clusters of 25 each) so afternoons are walkable/drivable.
6. Bonus: owner-operated per Maps "from the business" text / website "about" page; POS visible in photos.

**Data source at scale (three options):**

| Tool | Gives you | Cost for 50–200 targets | Source |
|---|---|---|---|
| Google Places API (New) Text Search / Place Details, **Enterprise SKU** | `rating`, `userRatingCount`, `websiteUri`, phone, hours; `reviews` (newest few, with dates → newest-review date) | Text Search Enterprise $35 per 1,000 requests with **1,000 free requests/month**; Place Details Enterprise similar structure → **$0 for your list** | https://developers.google.com/maps/billing-and-pricing/pricing ; field-to-SKU mapping https://developers.google.com/maps/documentation/places/web-service/place-details |
| Outscraper Google Maps scraper | Rating, review count, category, website, phone per place; reviews scraper gives dated reviews | "Free for the first 500 businesses"; then $3/1,000; reviews "Free for the first 500 reviews", then $3/1,000 | https://outscraper.com/pricing/ |
| Manual (Google Maps on a laptop) | Same fields, plus Popular times | 3–4 min per restaurant → ~3 hours for 50 | https://support.google.com/business/answer/6263531 |

Practical path: run one Places Text Search per neighborhood ("restaurants in [neighborhood]", `includedType=restaurant`), request `id, displayName, formattedAddress, rating, userRatingCount, websiteUri, businessStatus`, then Place Details with `reviews` for the shortlist to get the newest-review date. The Place ID you get here is also what the demo card redirect needs. (Note: Places API reviews are a sample, not the full set – fine for "newest review date," not for the monthly report.)

**Route planning:** Google Maps lets you add multiple destinations to a driving route (the help page states a limit of 9 stops including the final destination and that you reorder by dragging) (https://support.google.com/maps/answer/144339). That is exactly one afternoon's cluster. Build one saved route per cluster on Monday; visit in geographic order, not priority order.

---

## 8. Restaurant-specific review statistics (what exists, what does not)

**Honest status:** I could not find, from a 2025–2026 primary source, a clean "X% of diners read reviews before choosing a restaurant" figure, and Google publishes no review-count/click data for Business Profiles (its marketing page carries no such stats, as the original report noted). What is verifiable and restaurant-specific:

| Stat | Figure | Source |
|---|---|---|
| Timing expectation for food & drink review requests | "48% of consumers expect to receive the prompt by the following day, with 24% of that figure opting for the same day" | BrightLocal 2025, https://www.brightlocal.com/research/local-consumer-review-survey-2025/ |
| Same, 2024 edition | 24% expect to be asked the same day; 48% within two to three days | https://www.brightlocal.com/research/local-consumer-review-survey-2024/ |
| Diners likely to leave feedback when a restaurant directly asks | 52% "at least somewhat likely" | Toast survey, https://pos.toasttab.com/blog/data/restaurant-feedback-insights (page returned 403 on re-fetch; figure taken from search excerpt) **[medium confidence]** |
| Most-cited motivator for leaving a review (do NOT use – incentives are prohibited) | 33% cite loyalty incentives | same |
| TouchBistro 2025 American Diner Trends (1,500 US diners, Harris Poll, Oct 15–25 2024) | Lists "Bad online reviews (i.e. bad Google reviews, etc)" among reasons diners avoid a restaurant; no percentage in the public excerpt; no "read reviews before choosing" figure in the press release or blog | https://www.touchbistro.com/blog/diner-trends-report/ ; https://www.touchbistro.com/press-releases/touchbistro-2025-american-diner-trends-report-shows-resilience-in-consumer-habits-signaling-optimism-for-restaurants/ |
| TouchBistro 2025 **Canadian** report | 88% "will always or occasionally check out the restaurant on social media before deciding" | https://www.touchbistro.com/press-releases/touchbistro-2025-canadian-diner-trends-report-shows-plateau-in-dining-demand-cost-sensitivity-at-the-forefront/ |

**Action:** remove TouchBistro from the Sources list unless you download the full US PDF and pull a figure from it. The one restaurant-specific line worth putting in the pitch is the BrightLocal timing stat: "half of diners expect to be asked for a review by the next day – the card asks at the table, which is the only channel that can do that." Keep the 97%/74%/83% numbers as "local businesses," not "restaurants."

---

## 9. Competitive set and the free-Google-QR objection

| Competitor | What it is | Price (2026) | Source | How to position |
|---|---|---|---|---|
| **Google's own "Get more reviews" link/QR** | Business Profile → Read Reviews → Get more reviews → copy link or download QR (QR "can only be generated on a computer browser") | **Free** | https://support.google.com/business/answer/16816815 | See script below |
| Generic Amazon "Google review" NFC cards / plaques / stands | Pre-encoded NTAG cards and acrylic stands, often with a static QR | Typically low double-digit dollars **[UNVERIFIED – Amazon returned 503 this session]** | https://www.amazon.com/ntag213/s?k=ntag213 | "Those are the same chip. They don't come with a redirect you control, tap data, replacements, or the report." |
| **Birdeye** | Multi-location reputation platform | Third-party sources converge on $299 (Starter) / $349 / $449 per location per month, annual contracts, plus add-ons; Birdeye does not publish prices | https://costbench.com/software/review-management/birdeye/ ; https://wiserreview.com/blog/birdeye-pricing/ | 6–9x your price; built for multi-location |
| **Podium** | Messaging + reviews | Core reported at $399–459/mo, Pro $599–689/mo; 12-month contracts; BBB D- rating cited | https://www.socialpilot.co/reviews/blogs/podium-pricing ; https://wiserreview.com/blog/podium-pricing/ | Same |
| **Ovation** | SMS two-question surveys + review routing, restaurant-specific | Custom quote only, no published price | https://restauranttools.ai/tools/ovation ; https://ovationup.com/platform/feedback/ | Needs guest phone numbers; you catch the whole table |
| **Toast Guest Feedback** | Thumbs up/down on Toast Go handheld after payment and on digital receipts; internal feedback, "no mention of linking to Google reviews" | Included with Toast | https://support.toasttab.com/en/article/Guest-Feedback | "Keep it – it's private feedback. Ours is public reviews. Different job." Toast's own blog recommends QR cards to the Google page (https://pos.toasttab.com/blog/on-the-line/google-restaurant-reviews) |
| **Yelp Guest Manager** | Waitlist/reservations; Yelp prohibits asking for reviews | Pricing page not retrievable **[UNVERIFIED]** | https://trust.yelp.com/ | Not a review-collection competitor by Yelp's own rules |
| Third-party review-request automations tied to Toast (e.g., Reviewflowz) | Email/SMS review request after order close | Not verified | https://www.reviewflowz.com/for/toast | Reaches only guests who gave contact info, hours later |

**Objection 1b – "Why not Google's free QR on a table tent?" (the most damaging version):**

> "Do it – seriously, it's free and it's the same link ours goes to. Here's what I'd add. A tent gets cleared with the plates; a card in the check presenter is in front of the guest at the exact moment they're deciding whether to bother. A QR takes camera-open-focus-tap; on most phones the card is one touch, and the QR is on the back anyway. And the tent can't tell you anything – our cards log every tap so you know if Sunday brunch is dead because nobody's putting cards out. Honestly, the report is the product; the cards are how we make sure there's something in it. Run the tent and the cards for 30 days and count."

---

## 10. Counter-service, fast-casual, cafe, and bar formats

No check presenter → no "drop with the check" habit. Placement and counts by format:

| Format | Where the card lives | Script | Card count |
|---|---|---|---|
| **Counter order / pickup** | Acrylic stand at each register and at the pickup counter; one card taped face-up at the order-number tent stack | Cashier, handing the receipt: "If you've got a sec later, tapping that card reviews us on Google. Thanks." | 1 stand per register + 2 at pickup + 3 spares |
| **Table-number tents (fast casual)** | Card slipped into the tent holder on every table, front/back with the number | Runner, dropping food: nothing – the card speaks | 1 per table + 20% |
| **Cafe** | Stand at the register; card on the pastry case; card in the loyalty-card holder | Barista: "Tap that if you liked it" is too close to selective solicitation – use "That card reviews us on Google, only if you have a moment." | 2 stands + 3 spares |
| **Bar (tab closes at the rail)** | Card in the bar check presenter or clipped to the card-reader stand; stand at each well | Bartender, returning the card/receipt: same one-liner as servers | 1 per well + 1 per bar presenter |
| **Takeout / delivery** | NFC does not work in a bag. Print the **QR** on a bag sticker or receipt insert pointing to the same slug so taps still count | none | Stickers, not cards |

Spot-check rule for counter formats: manager checks that stands are upright and cards present at open and at shift change (2x/day instead of 2x/week). Counter formats generate fewer taps per cover because the guest is not seated with the card; set pilot targets at roughly half the full-service hypothesis **[assumption, UNVERIFIED]**.

---

## 11. Commercial terms the owner will ask about at conversion

Draft these into a one-page **Terms of Service + Pilot Agreement** (replace the half-page memory aid). Suggested positions:

| Question | Recommended term | Basis / note |
|---|---|---|
| Cancellation notice | Month-to-month; cancel any time from the Stripe customer portal, effective end of the current billing period; no refunds of the current month | Stripe's customer portal lets customers "Cancel subscriptions immediately or at the end of the current billing period" and update payment methods, at no extra cost (https://docs.stripe.com/customer-management) |
| Refunds on unused cards | Generic (non-logo) cards: returnable within 30 days, unused, for refund minus shipping. Custom-printed cards: non-refundable once the proof is approved | Custom printing runs $2.54/card at 100 with a 4-week lead (https://seritag.com/nfc-tags/cp-cards-ntag213) |
| Who owns the cards | If sold at $15: the restaurant. If Option A (Section 2): [Company] owns them and they are returned or deactivated on cancel | Put it in writing either way |
| What happens to redirect links on cancel | **Do not brick cards.** On cancellation, re-point the restaurant's slugs directly to their Google review link and stop logging; keep them live for 12 months; owner can request deletion at any time | A dead card on a table is a reputational hit for you; re-pointing costs nothing and is the single best goodwill term you can offer |
| Data | Tap logs are the restaurant's data; you keep aggregate, anonymized stats; no IP addresses stored | Section 6 design |
| Sales tax | **Cards are tangible personal property** and taxable in every state with a sales tax (only NH, OR, MT, AK, DE have none). The subscription is taxable in ~26 states (e.g., NY, TX at 80% of the charge, WA; exempt in FL; CA begins taxing software 2027-01-01) | https://taxcloud.com/blog/saas-sales-tax-by-state/ ; https://www.anrok.com/saas-sales-tax-by-state |
| How to collect it | Turn on Stripe Tax; assign product tax codes: cards = `txcd_99999999` "General - Tangible Goods"; report = `txcd_10103001` "Software as a service (SaaS) - business use" | https://docs.stripe.com/tax/tax-codes |
| Report use | The report is management information compiled from public reviews; not employment advice; owner is responsible for how it is used with staff | Section 13 |
| Compliance clause | Section 10 paragraph from the original report | — |

Practical note: since you are selling only in your local market at first, you have nexus in your home state regardless of volume; register for a sales-tax permit before the first paid card sale.

---

## 12. Realism of the weekly cadence

Section 7.4 prescribes 8–10 walk-ins in a 2:00–4:00 pm window = 12–15 minutes per stop including driving, waiting for the DM, and the demo. That does not survive contact with a real afternoon.

**Time budget per stop (realistic):**
- Park/walk in/greet host: 3 min
- Wait for DM (if present): 5–10 min
- Demo + pitch + logging: 8–10 min (if DM present) or 3 min (leave-behind)
- Drive to next stop within a cluster (≤1 mile): 5–7 min

→ ~25 min per stop with a DM present, ~12 min without. In a 2:00–4:30 pm window you get **5–7 stops**, not 8–10. Weekly target: **15–20 walk-ins**, of which maybe 6–9 reach a DM. Change the scorecard accordingly; the original 24–30 will make the founder feel like a failure by week two.

**Clustering math:** choose clusters so that all stops are inside a 15-minute walking radius (about 0.75 mile). Walk, do not drive, inside the cluster – parking is the hidden 5 minutes per stop. Build the cluster route in Google Maps (multi-stop, max 9 stops per route per the help page, https://support.google.com/maps/answer/144339).

**"Can you wait 20 minutes?" fallback:**
- If the DM is confirmed on-site: wait, but use the time – sit at the bar, open the CRM, pre-write the day-2 text, look at their reviews.
- If uncertain: "I'll do the two places down the street and come back at [time] – does that work?" Then actually come back; that reliability is itself the pitch.
- Never wait more than once per afternoon; a second wait means you are now below 4 stops.

**Window extension:** for dinner-only restaurants, 3:30–5:00 pm is when the chef-owner arrives; run one cluster of those on Thursdays as a late slot.

---

## 13. Server names in the report: privacy, employment angle, disambiguation, sample layout

**Legal exposure (US, plain reading, not legal advice):**
- The reviews are public statements by third parties on a public platform; quoting them to the business they are about creates no new disclosure. The CCPA – the strictest general state privacy law – applies only to businesses with over $25 million in revenue, or that handle data of 100,000+ California residents, or derive 50%+ of revenue from selling personal information; none applies to a solo founder (https://oag.ca.gov/privacy/ccpa). Note the CCPA's stated "publicly available" exclusion is framed around government records, so do not rely on that exclusion – rely on the thresholds.
- Employment: no federal law prevents an employer from reading public reviews naming staff. The real risk is **how the owner uses it**: disciplining someone off a single anonymous review is a management problem (and in some states could feed a wrongful-termination claim if discriminatory motives are alleged). That is why option 4 (praise by name, criticism anonymized) is the right default and why the report should carry a footer: "Guest comments are unverified individual opinions. Do not use this report as the sole basis for any employment decision."

**Offer a "no staff names ever" setting** at onboarding (it costs nothing, and some owners – unionized, or with a bad prior experience – will want it). Three choices on the form: Names (praise only) / Names (praise and criticism, manager-only appendix) / No names.

**Disambiguation of two servers with the same first name:** at onboarding collect a **roster**: first name, initial, section/shift pattern (e.g., "Maria R – dinner Fri/Sat, patio"). The AI matches on name + review date + any context ("our server Maria on the patio"). Rules: if two roster entries match and context does not resolve it, the report says "Maria (2 on roster – could not attribute)". Never guess. Ask the owner to keep the roster current (this is also where turnover is captured, Section 14).

**Sample report layout (2 pages, produce before the first pilot):**

*Page 1 – Headline*
1. Header: restaurant, month, prepared by [Company]
2. Numbers strip: new reviews this month vs last; average stars this month; lifetime rating and count; newest-review age; taps this month
3. "What guests loved" – top 3 themes, each with one verbatim quote
4. "What guests complained about" – top 3 themes, each with one quote, and how many reviews mentioned it
5. "Do these three things this month" – recommendations, one line each

*Page 2 – Detail*
6. Menu items mentioned: table (item, mentions, sentiment, sample quote)
7. Staff praised by name (per settings): name, count, quote
8. Service/operations issues (anonymized): wait times, noise, parking, cleanliness
9. Taps: by day of week; by card group; cards with zero taps
10. Reviews to reply to first (3 links) and a suggested reply for each
11. Method footer: source (Google reviews read as profile manager / via API), review count analyzed, names policy, the employment-use disclaimer above

Build it once in a Google Doc or as a Next.js page → PDF; fill with fictional data for the demo kit.

---

## 14. Language and staffing realities

**Turnover:** BLS JOLTS 2025 annual averages – accommodation and food services **total separations rate 5.5% per month** versus 3.3% for all industries; **quits 4.2%/month vs 2.0%** (https://www.bls.gov/news.release/jolts.t20.htm ; https://www.bls.gov/news.release/jolts.t22.htm). Summed over twelve months that is roughly two-thirds of the floor turning over in a year. "Train once at pre-shift" therefore fails within one quarter. Redesign:
1. The **laminated guide at the POS is the training** – the pre-shift visit is a launch event, not the system.
2. Add a **QR to a 60-second video** (you, on your phone, showing the drop, the line, and the three never-says) on the laminated card; new hires watch it during POS training.
3. The monthly report includes a one-line "New on the floor? The card guide is by the POS" reminder for the manager to read at pre-shift.
4. Ask the manager to add "card guide" to their new-hire checklist (most have one).

**Spanish version of the staff guide (copy this text; have a native speaker check it):**

> **[Restaurante] — Tarjeta de reseñas ("Tap to Review")**
>
> **Qué es:** Una tarjeta que abre nuestra página de reseñas de Google cuando el cliente la toca con su teléfono.
>
> **Dónde va:** En cada carpeta de la cuenta. Las de repuesto están en el cajón del POS. Si una se pierde, pon otra; nos las reponen gratis.
>
> **Qué decir (una sola vez, al entregar la cuenta):**
> "Esa tarjeta, si la toca con su teléfono, lo lleva directo a nuestra página de Google. Solo si tiene un momento. Gracias por venir."
>
> **Luego, retírate.** Nunca mires cómo la usan. Nunca lo pidas dos veces. Nunca pidas que lo hagan antes de irse.
>
> **Si preguntan cómo:** "Toque la parte de arriba del teléfono a la tarjeta. ¿iPhone viejo? Abra el Centro de Control y toque el lector NFC, o apunte la cámara al código QR de atrás."
>
> **Nunca digas:**
> - "Dénos 5 estrellas" / "Mencione mi nombre"
> - "Si no le gustó, mejor dígale al gerente"
> - "Le damos un postre o descuento por la reseña"
>
> Esto rompe las reglas de Google y puede hacer que borren todas nuestras reseñas.
>
> **Si un cliente se queja:** llama al gerente, en persona, ahora mismo. Esa es la mejor estrategia de reseñas que existe.

**Owners whose first language is not English:** lead with the tap (it needs no language), bring the leave-behind in English and Spanish (add other languages by neighborhood – Vietnamese, Chinese, Korean – using a translated one-pager, not machine-translated live), and ask "Who should I email this to?" – often an adult child or bookkeeper handles vendors. Stripe's customer portal and receipts localize automatically, including Spanish (es, es-419) (https://docs.stripe.com/customer-management).

---

## 15. Google's on-premises rule: exact wording for the card and the staff

Google's policy: "When soliciting reviews, merchants should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included." Prohibited examples include "Merchants requesting that staff solicit a certain number of reviews" and "requesting that staff solicit reviews that include specific content, including content that identifies a staff member." (https://support.google.com/contributionpolicy/answer/7400114). Asking via a link or QR code is explicitly allowed; incentives are "strictly prohibited" (https://support.google.com/business/answer/16816815 ; https://support.google.com/business/answer/3474122).

The card mechanic is an **invitation left on the table**, not a request made while the guest is captive. Keep it that way with wording:

**On the card face:** "Tap to review us on Google" – not "Tap to leave a 5-star review," not "Tell Google how we did today," not "Review us before you go."

**On the card back:** QR + "Reviews are optional and can be left any time. Please be honest." That sentence is the compliance artifact.

**Server line (the only sanctioned sentence):** "That card, if you tap your phone on it, goes to our Google page – only if you've got a second. Thanks for coming in." Note what it lacks: no "now," no "before you leave," no "if you liked it," no name, no stars.

**Training rules to state out loud at pre-shift (and print on the guide):**
1. One mention, once, at the check drop. If the guest does not react, it is over.
2. Never watch, hover, return, or ask "did you do it?"
3. Never say your own name in connection with the card, and if a guest asks "should I mention you?" answer "Only if you want to – whatever you write is up to you."
4. Never mention stars, ratings, or "good."
5. No counting. Managers do not ask "how many reviews did you get tonight?" – the only question is "were the cards in the presenters?"

---

## 16. Google's short review link vs a self-hosted redirect (and the no-gating rule)

**Official link:** Business Profile → Read Reviews → Get more reviews → copy link / download QR (https://support.google.com/business/answer/16816815). The exact short-link format is not printed on Google's help page; the report's `search.google.com/local/writereview?placeid=` route remains **[UNVERIFIED]** and must be tested per restaurant.

**Decision:** encode a **self-hosted redirect** on the chip, with the official Google link (from the owner's dashboard) as the target. Reasons: tap analytics (Section 6), re-pointing if Google changes link formats or the Place ID rotates, and card reuse. Cost: one extra 302 hop (~100–300 ms).

**Hard rule, put it in the terms and the code:** the redirect must send every tap straight to the Google write-review form with **no interstitial, no rating question, no "how was it?" screen, no branching, no delay**. Any sentiment pre-screen is "review gating" – Google prohibits "selectively solicit positive reviews from customers" and "Discourage or prohibit negative reviews" (https://support.google.com/contributionpolicy/answer/7400114), and the FTC rule prohibits review suppression and misrepresenting that displayed reviews represent all reviews (https://www.law.cornell.edu/cfr/text/16/465.7). Owners will ask for the "unhappy guests go to a private form" feature by name because competitors sell it; the answer is no, and the reason is in Section 4 objection 4.

Trust detail for the owner: the redirect domain is yours, so print it small on the card back ("link by [yourdomain]") so a guest who inspects the URL is not alarmed.

---

## 17. Android NFC behavior and the QR fallback

- Google's developer documentation: "Android-powered devices are usually looking for NFC tags when the screen is unlocked, unless NFC is disabled in the device's Settings menu"; the tag dispatch system opens the URL "without asking the user what application to use" (https://developer.android.com/develop/connectivity/nfc/nfc). No app is needed; Seritag confirms "You don't need an app," the antenna is at the **centre of the back** of the phone, and "the device must be unlocked to scan a tag" (https://seritag.com/learn/tech/how-to-read-nfc-tags-with-an-android).
- Screen-off and lock-screen reading generally do not work on stock Samsung/Pixel firmware (user reports: https://us.community.samsung.com/t5/A-Series-Other-Mobile/Galaxy-M34-5G-Phone-with-NFC-can-scan-NFC-tag-only-with-screen/m-p/2610176 ; https://community.home-assistant.io/t/reading-nfc-tags-on-android-with-locked-off-screen/794891).
- Some users have NFC switched off (the setting exists under Connected devices / Connections); budget phones may lack NFC entirely.

**Therefore every card carries a QR on the back** pointing to the **same slug** (so taps and scans are both counted; add `?m=qr` to distinguish). Guide text: "iPhone: tap the top edge. Android: tap the middle of the back, phone unlocked. Or scan the QR." QR should be at least 20 mm, high contrast, with the restaurant name under it.

---

## 18. Flagging the age and platform of the causal studies

Luca (HBS Working Paper 12-016; Yelp, Seattle restaurants, 2003–2009 data; +5–9% revenue per star, driven by independents) (https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf) and Anderson & Magruder (Economic Journal 2012; Yelp; half-star → +19 points chance of selling out) (https://news.berkeley.edu/2012/09/04/yelp-reviews-boost-restaurant-business/) are 10–15 years old and Yelp-based. I did not find an equivalent published causal study for **Google** reviews in this session, and the founder should assume none exists that they can cite.

**Sales-copy rule:** never write "Google reviews increase revenue 5–9%." Permitted framing on the website and one-pager:

> "The best causal research on restaurant ratings (Harvard Business School, Yelp data) found each extra star was worth 5–9% in revenue for independent restaurants. Google is a bigger platform today, and 71% of consumers use it for reviews (BrightLocal 2026), but no equivalent study exists for Google – so treat this as the mechanism, not a guarantee."

What you **can** cite as Google-specific: Google's own statement that "More reviews and positive ratings can help your business's local ranking" (https://support.google.com/business/answer/7091), and Whitespark's practitioner ranking-factor survey (https://whitespark.ca/local-search-ranking-factors/) – both are about visibility, not revenue.

---

## Corrections

**iPhone NFC background reading (restated correctly):**
- Apple's own support page: "The following iPhone models automatically support NFC Tag Reader": iPhone SE (2nd generation and later), iPhone XR, XS, XS Max, iPhone 11 series, 12 series, 13 series (and later). "On the following iPhone models, turn on NFC Tag Reader in Control Center": iPhone 7, 7 Plus, 8, 8 Plus, and iPhone X. (https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios)
- The "screen locked" claim in the original report comes only from the ShopNFC vendor page (https://shopnfc.com/en/content/20-nfc-iphone); Apple's developer documentation page on background tag reading could not be fetched (JavaScript-rendered) and the GoToTags page 404'd at the URLs tried, so the practical caveats – the phone must have been unlocked at least once since restart; background reading does not run in Airplane Mode, while the camera is in use, or during an Apple Pay/Core NFC session; the display must be **awake**, not off – remain **practitioner knowledge [UNVERIFIED from Apple]**. Use "screen awake, phone unlocked once since restart, no camera open" as the demo instruction instead of "works with the screen locked."
- Tags must be **NDEF-formatted with a URI record**; an unformatted or text-only tag does nothing on iPhone (consistent with vendor guidance and the NFC Tools/Seritag encoding notes above).
- Objection-1 script in the original ("screen can even be locked") should be softened to: "on any iPhone from the XR/XS up, you just touch the top of the phone to the card – no app, no camera."

---

## Sources (new in this addendum)

- Google Business Profile API prerequisites — https://developers.google.com/my-business/content/prereqs
- Google Business Profile API basic setup (OAuth scope) — https://developers.google.com/my-business/content/basic-setup
- Google Business Profile API review data — https://developers.google.com/my-business/content/review-data
- Google developer forum thread on reviews endpoint / approval delays (Aug 2026) — https://discuss.google.dev/t/business-profile-api-reviews-endpoint-mybusiness-googleapis-com-cant-be-enabled-basic-access-pending-10-business-days/389462
- Google Maps Platform pricing — https://developers.google.com/maps/billing-and-pricing/pricing
- Places API (New) Place Details field/SKU mapping — https://developers.google.com/maps/documentation/places/web-service/place-details
- Google Maps Help, multiple destinations — https://support.google.com/maps/answer/144339
- Google Maps Help, write reviews — https://support.google.com/maps/answer/6230175
- Google Workspace Admin Community thread — https://support.google.com/a/thread/201861133
- Android Developers, NFC basics — https://developer.android.com/develop/connectivity/nfc/nfc
- Apple Support, NFC Tag Reader models — https://support.apple.com/en-euro/guide/iphone/aside/asd-nfc-reader/15.0/ios
- NXP NTAG213/215/216 datasheet — https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- RFIDcard.com NTAG comparison — https://www.rfidcard.com/nfc-card-types-explained-how-to-choose-between-ntag213-ntag215-ntag216-and-ntag424-dna/
- NFC Tools for iOS (wakdev) — https://www.wakdev.com/en/apps/nfc-tools-ios.html
- GoToTags NTAG213 PVC card — https://store.gototags.com/nfc-pvc-card-ntag213/
- Tagstand NTAG213 PVC card / 100-pack — https://www.tagstand.com/products/blank-nfc-pvc-card-ntag213/ ; https://www.tagstand.com/products/bulk-pvc-cards-pack-of-100/
- Seritag custom printed NTAG213 cards — https://seritag.com/nfc-tags/cp-cards-ntag213
- Seritag, reading NFC tags on Android — https://seritag.com/learn/tech/how-to-read-nfc-tags-with-an-android
- Outscraper pricing — https://outscraper.com/pricing/
- SerpApi pricing — https://serpapi.com/pricing
- Wiserreview, why can't I leave a Google review — https://wiserreview.com/blog/why-cant-i-leave-a-google-review/
- BrightLocal 2025 / 2024 surveys — https://www.brightlocal.com/research/local-consumer-review-survey-2025/ ; https://www.brightlocal.com/research/local-consumer-review-survey-2024/
- Toast, restaurant feedback survey — https://pos.toasttab.com/blog/data/restaurant-feedback-insights
- Toast, Guest Feedback support article — https://support.toasttab.com/en/article/Guest-Feedback
- Toast blog on Google reviews — https://pos.toasttab.com/blog/on-the-line/google-restaurant-reviews
- TouchBistro 2025 reports — https://www.touchbistro.com/blog/diner-trends-report/ ; https://www.touchbistro.com/press-releases/touchbistro-2025-canadian-diner-trends-report-shows-plateau-in-dining-demand-cost-sensitivity-at-the-forefront/
- Birdeye pricing (third-party) — https://costbench.com/software/review-management/birdeye/ ; https://wiserreview.com/blog/birdeye-pricing/
- Podium pricing (third-party) — https://www.socialpilot.co/reviews/blogs/podium-pricing ; https://wiserreview.com/blog/podium-pricing/
- Ovation pricing — https://restauranttools.ai/tools/ovation
- BLS JOLTS annual separations and quits rates — https://www.bls.gov/news.release/jolts.t20.htm ; https://www.bls.gov/news.release/jolts.t22.htm
- TaxCloud / Anrok SaaS sales tax by state — https://taxcloud.com/blog/saas-sales-tax-by-state/ ; https://www.anrok.com/saas-sales-tax-by-state
- Stripe tax codes — https://docs.stripe.com/tax/tax-codes
- Stripe customer portal — https://docs.stripe.com/customer-management
- California AG, CCPA — https://oag.ca.gov/privacy/ccpa



## Open questions
- What exactly does Toast Marketing offer for review requests today (feature, pricing, channel)? pos.toasttab.com blocked fetches; verify before using objection #6 wording.
- Is the `https://search.google.com/local/writereview?placeid=` URL format still reliable for opening the review dialog directly on iOS and Android? Google's help pages do not print the format; test on both platforms.
- What tap-to-review conversion rate do cards actually achieve per cover? No published data found; the 1-2% figure in the pilot targets is a hypothesis to replace after the first three pilots.
- Is a team-level reward for card-placement compliance (not review counts) acceptable under Google's 'staff solicit a certain number of reviews' clause? The playbook treats it as acceptable, but it is an interpretation, not Google text.
- Do many reviews submitted from the restaurant's own Wi-Fi/location in a short window trigger Google's automated spam filter? Widely reported anecdotally; no official confirmation found.
- A primary source for typical restaurant lull hours (2-4 pm Tue-Thu) was not reachable this session; validate per restaurant with Google Popular times.
- Whether the BrightLocal 2026 survey includes a restaurant-specific breakdown of review reading was not confirmed on the summary page fetched.
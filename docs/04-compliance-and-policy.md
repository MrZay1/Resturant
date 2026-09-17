# Compliance: Google review policy, FTC rule, trademarks, privacy, tax

Working name: Tablenote. Founder: Zay. Date: September 4, 2026. This is a working document built from the research in `research/policy_legal.md` and `research/competitors_pricing.md`. It is not legal advice. Items marked "confirm with counsel" or "confirm with a CPA" carry real money or account-suspension risk.

How to use it this week: sections 3 and 4 go straight into the onboarding guide and card artwork. Section 5 is the checklist for the legal pages. Sections 6 to 8 are the things to set up in Stripe and on the lead form before the first paid order.

---

## 1. Google's review rules in plain English

### 1.1 The three documents that matter

| Document | What it controls | URL |
| --- | --- | --- |
| Maps User Generated Content policy, "Prohibited and restricted content" | What reviews Google removes and what merchants may and may not do to get them. This is the controlling text. The page shows no last-updated date. | https://support.google.com/contributionpolicy/answer/7400114 |
| Business Profile help, "Tips to get more reviews" | Google's own advice to merchants. Confirms links and QR codes are the approved way to ask. | https://support.google.com/business/answer/3474122 |
| "Business Profile restrictions for policy violations" | What happens to a restaurant that breaks the rules. | https://support.google.com/business/answer/14114287 |

### 1.2 What merchants may do (verbatim)

Google allows merchants to "Solicit or encourage the posting of content that does represent a genuine experience, without offering incentives to do so or attempting to influence the rating or the contents of the review." (https://support.google.com/contributionpolicy/answer/7400114)

The help page adds: "To leave reviews, you can ask customers to visit a Google link or scan a QR code." and "Customers must be signed into a Google Account to leave a review." (https://support.google.com/business/answer/3474122)

A Tablenote card is a link the guest opens on their own phone. That is the permitted activity.

### 1.3 What merchants may not do (verbatim)

From the same policy page (https://support.google.com/contributionpolicy/answer/7400114), merchants may not:

- "Offer incentives – such as payment, discounts, free goods and/or services - in exchange for posting any review or revision or removal of a negative review"
- "Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers" (this is the review-gating ban)
- "Require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included. This includes:
  - Merchants requesting that staff solicit a certain number of reviews
  - Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member"

Content Google removes as Rating Manipulation includes "Content that is based on a conflict of interest. A conflict of interest may include current or former employment, a contractual or consultory relationship, or other professional or personal affiliations that demonstrate a conflict of interest (such as industry competitors, familial relationships, etc.)" So staff, owners, family and suppliers must never review the restaurant. Google also removes "Content that has been posted from multiple accounts by or at the request of one person" and "Content exhibiting unusual volumes or patterns of review contributions that are indicative of efforts to manipulate a place's rating."

The help page is blunter on incentives: "Offering incentives, like free or discounted goods or services, in exchange for customers to post reviews, change reviews, or remove negative reviews is considered fake & misleading content and is strictly prohibited." (https://support.google.com/business/answer/3474122)

### 1.4 The 2026 additions and how to date them

| When | What changed | Source and confidence |
| --- | --- | --- |
| Reported Feb 19 to 20, 2026 | The "should not require or pressure users to leave ratings or write reviews while on the premises, nor should they request that specific content be included" wording appeared. Search Engine Roundtable documented mass removals the same week (one restaurant lost 76 reviews; one business lost 100 of 260 in a day). | https://www.seroundtable.com/google-reviews-being-removed-again-40950.html ; https://www.replyonthefly.com/blog/google-review-policy-update-2026 (secondary sources) |
| First observed on or about Apr 17, 2026 | The two sub-bullets banning staff review quotas and staff-identifying content. The text is live on the policy page today. The date comes only from ppc.land reporting a Google Product Expert's LinkedIn post; Google publishes no changelog and no effective date. | https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/ (secondary); verified verbatim at https://support.google.com/contributionpolicy/answer/7400114 |
| Apr 16, 2026 | Google's 2025 Trust and Safety report: 292 million policy-violating reviews blocked or removed in 2025, plus new Gemini-based detection. | https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/ (secondary) |
| Reported June 5, 2026 | Google Maps shows in-app surveys asking users whether the business offered rewards for reviews; "yes" answers have triggered retroactive deletions. | https://ppc.land/google-maps-is-now-asking-users-if-businesses-paid-for-their-reviews/ (secondary) |

Always write "first observed on or about April 17, 2026" in customer-facing material, never "effective April 17."

### 1.5 The on-premises clause and a card on the table

This is the one open interpretation in the whole product. The policy targets "require or pressure," not the medium. The help page still says to ask via a link or QR code. The fact-checker's read: "a card left on the table without pressure is not by itself prohibited, but this is a real compliance edge for the product" (research/competitors_pricing.md, verdict on the policy claim). No Google ruling on table-drop cards exists. Treat this as an interpretation with residual risk, and design everything around it: the card is an invitation the guest controls, copy says "now or later," the server walks away, and there is no house device. Consider a short policy review with counsel before scaling past the pilot.

### 1.6 What enforcement looks like

Per https://support.google.com/business/answer/14114287, Google may apply any of:

- "Business Profile will not be able to receive new reviews or ratings for set period of time"
- "Business Profile's existing reviews or ratings will be unpublished for set period of time"
- "Business Profile will display a warning to let consumers know that fake reviews were removed"

Google says "We will notify business owners via email if we plan to apply a restriction to their profile" and appeals are possible. Guests see a banner "to let you know that suspicious reviews were removed" and may be blocked from reviewing the place for a time (https://support.google.com/contributionpolicy/answer/15178562).

Shared Wi-Fi and IP: Google does not publish its filter signals. Practitioners report reviews being filtered when many come from one IP, a business Wi-Fi, a kiosk, or staff devices (https://whitespark.ca/blog/google-remove-reviews/, published Oct 2024). A forum thread quotes a Google representative denying IP tracking (https://localsearchforum.com/threads/google-reviews-coming-from-same-ip.53116/). Treat mobile data as conservative practice, not a Google rule, and say so in training.

### 1.7 Yelp

Yelp's policy is "Don't ask anyone to review your business, be it customers, mailing list subscribers, friends, family, etc." and "our automated software may not recommend reviews that seem to be prompted or encouraged by the business" (https://biz.yelp.com/support-center/Reviews/Best_Practices/Don-t-Ask-for-Reviews/en-US). Tablenote cards are Google-only. If an owner asks for a Yelp card, explain the policy and decline.

---

## 2. The FTC Consumer Review Rule and the Endorsement Guides

### 2.1 The Rule (16 CFR Part 465, effective Oct 21, 2024)

| Section | What it bans | Why it matters here | Source |
| --- | --- | --- | --- |
| 465.2 Fake or false reviews | Writing, creating or selling a review that misrepresents that the reviewer exists, had the experience, or what the experience was. 465.2(c) covers reviews procured from "officers, managers, employees, or agents, or any of their immediate relatives." | Safe harbor 465.2(d): the ban does not apply to reviews "that resulted from a business making generalized solicitations to purchasers." A card handed to every table is a generalized solicitation to purchasers. | https://www.law.cornell.edu/cfr/text/16/465.2 |
| 465.4 Buying positive or negative reviews | "to provide compensation or other incentives in exchange for, or conditioned expressly or by implication on, the writing or creation of consumer reviews expressing a particular sentiment" | "Tap for 5 stars" is an implied condition. Never use it. | https://www.law.cornell.edu/cfr/text/16/465.4 |
| 465.5 Insider reviews | Officers and managers may not review the business, or solicit reviews from "immediate relatives, employees, or agents," without clear disclosure of the relationship. | A manager handing a card to a server, a server's spouse, or a supplier is not a generalized solicitation. Cards go to guests only. | https://www.law.cornell.edu/cfr/text/16/465.5 |
| 465.6 Company-controlled review sites | Misrepresenting that a site you control "provides independent reviews or opinions." | Only relevant if Tablenote ever publishes a "best local restaurants" list that includes clients. Disclose control if so. | https://www.law.cornell.edu/cfr/text/16/465.6 |
| 465.7 Review suppression | Unfounded legal threats, intimidation, or false accusations to remove a review; misrepresenting that displayed reviews are all the reviews when negative ones are hidden. | If a restaurant or Tablenote ever displays reviews on a website, show them all or label the curation. | https://www.law.cornell.edu/cfr/text/16/465.7 |
| 465.8 Fake indicators of influence | Selling or buying fake followers, likes, or similar. | Not triggered by the product, but marketing must never read as "buy reviews" or "boost your rating." | https://www.law.cornell.edu/cfr/text/16/465.8 |

Penalty: "up to $53,088 per violation" (16 CFR 1.98, current through August 2026 and still showing the January 17, 2025 amounts, https://www.ecfr.gov/current/title-16/chapter-I/subchapter-A/part-1/subpart-L/section-1.98 ; https://www.law.cornell.edu/cfr/text/16/1.98 ; FTC press release https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-warns-10-companies-about-possible-violations-agencys-new-consumer-review-rule). There was no 2026 inflation adjustment: OMB Memorandum M-26-11 (April 17, 2026) cancelled the government-wide 2026 adjustment because the October 2025 CPI-U was never produced during the shutdown, so the FTC left 16 CFR 1.98 unchanged (`research/policy_legal.md`, fact-check verdict on claim 5). Do not cite the July 7, 2026 Federal Register "No Adjustment" notice for this; that notice is the SEC's, not the FTC's. Note: `research/competitors_pricing.md` cites $51,744 from a vendor blog; that figure is stale. Use $53,088.

Gating under the Rule: the FTC's FAQ says of asking only happy customers, "The rule does not contain a specific prohibition against such conduct. But this practice could violate the FTC Act." (https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers). The Endorsement Guides FAQ says "Only asking for reviews from customers who you think are more likely to be happy with your product would be misleading if it substantially skews the favorability of the reviews." (https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking). Endorsement Guides 255.2(e) Example 11 describes exactly the competitor gating pattern (invite positive feedback givers to post, thank the rest) and calls it potentially "unfair or deceptive" (https://www.law.cornell.edu/cfr/text/16/255.2).

Enforcement climate: in December 2025 the FTC sent warning letters to 10 companies; its template cites, as an example, compensating employees for 5-star reviews from friends and family (https://www.ftc.gov/system/files/ftc_gov/pdf/2025-Fake-Review-Warning-Template.pdf). July 15, 2026: TruHeight final order, $4M judgment suspended on payment of $750,000, for employee-written reviews and free product for 5-star reviews (https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-approves-final-order-against-truheight-deceptive-unsubstantiated-advertising-supplements-kids). May 11, 2026: FTC and Illinois AG suit against Premium Home Service for fake listings and employee reviews (https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-illinois-take-action-stop-deceptive-conduct-company-created-thousands-business-listings-fake).

### 2.2 How the Rule applies to Tablenote (the vendor)

The FTC FAQ confirms that "advertising agencies, public relations firms, review brokers, or reputation management companies ... are not immune from liability under the rule" (https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers). Tablenote is a review-solicitation vendor. The safe harbor in 465.2(d) protects the restaurant's generalized ask; Tablenote's exposure comes from two places:

1. Any feature that induces a violation: server leaderboards, per-server cards, "mention your server" templates, a filtration page. Do not build them.
2. Marketing claims. Never promise "more 5-star reviews," "boost your rating," or a review count.

### 2.3 Tablenote's own testimonials and case studies

- Substantiation. "The law requires that advertisers have proof before the ad runs" and a reasonable basis "means objective evidence that supports the claim" (https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business). "More reviews" or "X% more reviews" are performance claims that need pilot data first. Until then, describe the mechanism ("makes it easy for every guest to leave a Google review"), not the outcome.
- Typicality. Testimonials must "reflect the typical experience of consumers who use the product, not the experience of just a few satisfied customers," or the ad must "clearly disclose either what consumers can expect their results to be or the limited applicability of the endorser's experience" (same FTC page).
- Material connection. 16 CFR 255.5 requires disclosure of any connection "that might materially affect the weight or credibility of the endorsement," and that includes "the provision of free or discounted products ... regardless of whether the advertiser requires an endorsement in return" (https://www.law.cornell.edu/cfr/text/16/255.5). Every pilot restaurant that received free cards or a free report and is quoted on the site gets a visible line next to the quote, not in a footer: "[Restaurant] received free cards and a free trial of the report."
- Reviewer consent. Google requires consent before using a customer's review in marketing: "Get consent from reviewers to use their reviews in your marketing" (https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/). Never quote a guest's Google review on tblnt.com without written consent from that guest.

---

## 3. Restaurant onboarding: DO and DON'T, and the staff card

Every item below is tied to quoted policy text in sections 1 and 2. Put this list in the onboarding guide word for word.

### 3.1 DO

- [ ] Offer the card to every table, every time, however the meal went. A universal ask cannot be gating.
- [ ] Present it as optional and unhurried. Script: "If you'd like to leave us an honest review on Google, just tap your phone on this, now or whenever." Then leave the table.
- [ ] Let guests use their own phone, their own Google account, and their own mobile data.
- [ ] Keep a private feedback channel (email or a form) for everyone, offered alongside the Google card, never instead of it.
- [ ] Reply to every review, positive and negative, politely and without personal details about the reviewer.
- [ ] Give staff the one-paragraph written notice that public reviews are summarized monthly and that name mentions are shared for praise and coaching only (text in 3.4).
- [ ] Treat the monthly report's staff-mention section as guest opinion. Verify before acting on anything in a review.
- [ ] Roll cards out over weeks. A sudden spike after months of nothing matches "unusual volumes or patterns."
- [ ] Keep Business Profile logins off the guest Wi-Fi.
- [ ] Use "Google" in plain text only. Never alter, recolor, or combine Google's name or logo with your own.

### 3.2 DON'T

- [ ] No incentives of any kind: discount, free dessert, drink, raffle, loyalty points, "show us your review" perks. Google removes them and can restrict the profile ("Offer incentives ... in exchange for posting any review" is prohibited).
- [ ] No gating: do not ask only happy guests, and do not send unhappy guests to a private form first ("Discourage or prohibit negative reviews, or selectively solicit positive reviews").
- [ ] No pressure: do not wait at the table, hover, or say "could you do it before you go?" ("Require or pressure users to leave ratings or write reviews while on the premises").
- [ ] No quotas, contests, or leaderboards for servers ("Merchants requesting that staff solicit a certain number of reviews").
- [ ] Never ask a guest to mention a server by name ("content that identifies a staff member"). If a guest names someone on their own, that is fine.
- [ ] No house tablet or phone, and staff never tap the card with their own device for the guest ("posted from multiple accounts by or at the request of one person").
- [ ] Staff, owners, family, friends, suppliers never review the restaurant ("conflict of interest ... current or former employment ... familial relationships"). Managers never hand a card to staff, relatives, or vendors (16 CFR 465.5).
- [ ] Never ask a reviewer to delete or change a negative review. Fix the problem and invite them to add an update (FTC: "asking them to change or delete their initial negative reviews could mislead readers").
- [ ] No threats or accusations in replies (16 CFR 465.7).
- [ ] Never dock tips, pay, or shifts based on reviews or the monthly report (DOL Fact Sheet 15, https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa).
- [ ] No "5-star," "Google-rated," or star graphics on anything that refers to Google.

### 3.3 Staff training card (the letter-size staff guide)

The guide is built in `site/app/(print)/print/staff-guide/page.tsx` and exported to `cards/exports/print/staff-guide.pdf` by `cd site && node scripts/export-print.mjs --name "Restaurant Name"`. What the page says today, as built (checked September 5, 2026):

- Headline: "The card goes down with the check. Every table, every time."
- Three numbered steps: "Drop it with the check" (with the script "If you'd like to leave us an honest review on Google, just tap your phone on this. Now or whenever."), "Show, don't explain" ("Hold the top of your iPhone on it," or "the back of your Android"), and "Pick it up with the check."
- A "Say this" list (the script, "A link pops up, you tap it, and the review page opens," then leave the table) and a "Never say this" list: "Only if it's five stars," "I'll take something off the bill," "Mention my name," "Could you do it before you go?"
- An "If the tap does not work" box (iPhone reader at the top edge, screen on and unlocked, iPhone 7, 8 and X need Control Center; Android reader on the back; lift the card off metal tables; QR code on the back) and a "Card care" box (wipe it, do not bend it, replacements included).

The "Never say this" list already covers incentives, gating, staff names and on-premises pressure, which are the four Google rules from section 1.3. Three compliance items from sections 1.3 and 2.1 are still missing from the page, and the tap wording differs from the two-step flow the card back and the site describe. Make these edits in `page.tsx` and re-run the export before laminating anything. This is a code task; it belongs in the Week 2 "Print" list of `docs/07-*.md` and is not there yet.

- [ ] Step 2 wording: replace "Hold the top of your iPhone on it" with "Hold your phone flat on the card. On iPhone, tap the banner that pops up. On Android, tap the notification. It opens our Google page." Keep the QR fallback line.
- [ ] Add one line to "Never say this" or to a new "House rules" line: "You, your friends and your family do not review us on Google. It is against Google's rules and gets real reviews deleted." (Google: "conflict of interest ... current or former employment ... familial relationships"; 16 CFR 465.5.)
- [ ] Add: "Guests use their own phone and their own data, not our Wi-Fi." (Conservative practice, not a Google rule; see 1.6.)
- [ ] Add: "If a guest complains, fix it now and tell a manager. Do not steer them away from the card." (This is the gating line; "Discourage or prohibit negative reviews" is prohibited.)
- [ ] Re-export: `cd site && node scripts/export-print.mjs --name "Restaurant Name"`, then check `cards/exports/print/staff-guide.pdf` still fits one page.

Until those edits ship, do not describe the guide to a restaurant as covering staff reviews or Wi-Fi; hand them section 3.1 and 3.2 of this document instead.

Phone facts behind the tap wording: "iPhone XS and later support background tag reading"; the phone must have been unlocked since restart and the screen on; the user "must tap the notification" before the link opens (https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading). Android reads tags "when the screen is unlocked, unless NFC is disabled"; from Android 17 an "open link" notification requires a tap (https://developer.android.com/develop/connectivity/nfc/nfc).

### 3.4 Written notice to restaurant staff (give at onboarding)

"We use a service that reads our public Google reviews and produces a monthly summary. Guest comments that mention team members by name are included so we can share praise and address service issues. This summary is not used to set pay or tips and is never the sole basis for discipline."

Why: Illinois HB 3773 (in force Jan 1, 2026) requires notice when AI is used in decisions about "discharge, discipline, tenure" or conditions of employment (https://natlawreview.com/article/illinois-anti-discrimination-law-address-ai-goes-effect-1-january-2026). Colorado's SB 26-189 takes effect Jan 1, 2027 with an exemption for employers of 40 or fewer (https://www.skadden.com/insights/publications/2026/06/colorado-repeals-and-replaces-its-ai-act). Whether a vendor-produced report triggers either law is unresolved; the notice is a precaution. Every report also carries: "This section summarizes public guest comments on Google. Reviews are unverified, may be mistaken about who served the table, and are not an assessment of any employee's performance. This report should not be used to determine pay, tips, scheduling, or discipline."

---

## 4. Trademarks: "Google," the G logo, stars, the Maps pin, the N-Mark

### 4.1 The rules

| Element | Rule | Source |
| --- | --- | --- |
| The word "Google" in plain text | Allowed without permission: you may "refer to Google or our products in an informational context in plain text" and link to Google content "using hyperlinks, embeds, or QR codes." | https://about.google/brand-resource-center/guidance/ |
| The Google G or wordmark | Documented use case for "Review us on Google": "Include one of our logos (either the Google G or full Google wordmark)." Must be the official file, full color, newest gradient G, clear space equal to the width of the G, on white or black. "Don't combine your logo with the Google G or modify the Google G in any way." | https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/ ; https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/ |
| Trademark notice | "Any use of the Google Brand Features must be accompanied by a notice that clearly indicates that the Google Brand Features are trademarks or distinctive brand features of Google LLC." Permission "is limited to the approved materials" and Google may revoke it. | https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/terms-and-conditions/ |
| Stars | "Don't add stars by the Google name or logos." Also a policy problem: "Tap for 5 stars" solicits a sentiment (16 CFR 465.4). | https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/ |
| "Google-rated," "Google rating" | Banned: "Don't imply that ratings come from Google." Say "our rating on Google." | same |
| Unofficial badges, lockups | "Don't use any unofficial logos, badges, or lockups." | same |
| Maps red pin | Listed as a Google trademark; Google holds design patents on the teardrop marker. Never print it. | https://about.google/brand-resource-center/products-and-services/geo-guidelines/ ; https://www.avvo.com/legal-answers/google-maps-pin-3165791.html |
| Google in your own name or domain | Never "use, incorporate, or combine any of our trademarks (names or logos) into your brand name, product name, business name, trade name, website domain, or slogan." Tablenote and tblnt.com are clear. | https://about.google/brand-resource-center/guidance/ |
| Merchandise | Do not use Google brand elements "on merchandise or in contests." A printed card sold by a third party is arguably merchandise. | same |

### 4.2 What Tablenote prints (decided)

The card uses no Google logo and no stars. Front: the restaurant's name or logo, "Tap to review us on Google," and the subline "Hold your phone here." Back, as built in `site/components/card/CardFace.tsx` and `site/components/card/cardSpec.ts`: the restaurant name, a three-line "How to leave a review" instruction, "No tap? Scan the code or visit:" with the short link `tblnt.com/r/<slug>` in text, the QR code for the same `https://tblnt.com/r/<slug>?s=card` link, and the `backNote` thank-you line ("Thank you for dining with us. Your review helps our small team more than you know."). This is plain-text informational use and needs no permission (https://about.google/brand-resource-center/guidance/).

Decision on the trademark notice: the card does not carry one. Google's notice requirement attaches to use of "the Google Brand Features," meaning the logos and other distinctive marks (https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/terms-and-conditions/); the card uses the word in plain text only. The notice lives where a reader can find it: the site footer ("Google and Google Maps are trademarks of Google LLC. Tablenote is not affiliated with or endorsed by Google.", `site/components/ui/Footer.tsx`) and the terms page section 12 (`site/app/(site)/legal/terms/page.tsx`). None of the files under `cards/exports/` contain a trademark line, and that is correct for the first print run; send the existing exports to MPBC as they are. If a G-logo version is ever printed under written permission (4.3), the notice becomes mandatory on that artwork: at that point change `backNote` in `cardSpec.ts` (or add a line inside the 3 mm safe zone in `CardFace.tsx`) to read "Google is a trademark of Google LLC. Not affiliated with Google.", re-run `cd site && node scripts/export-cards.mjs`, and treat it as a new proof.

Do not use: "Google-rated," "5-star restaurant," "Tap for 5 stars," "Google review card" as a product name, the red pin, star rows, any recolored G.

Code check: `components/card/CardFace.tsx` still has a `showStars` toggle and `site/scripts/README.md` shows `"stars": 1` in its example. Keep it at 0 for every export, and consider removing the toggle so no configurator user can turn it on.

### 4.3 The permission path (only if a G-logo version is ever wanted)

google.com/permissions now redirects to the Brand Resource Center (https://partnermarketinghub.withgoogle.com/brands/google/overview/), which publishes no response time and does not promise a reply. If a restaurant insists on the G, submit the exact card template through the site's contact form, keep the plain-text card as the default, and only add the logo version if written permission arrives. Print nothing with the G before then.

### 4.4 The NFC Forum N-Mark

The N-Mark is the NFC Forum's trademark for tap points; using it is subject to the NFC Forum's own license terms. This was not researched in the policy files and is unverified here. Tablenote sidesteps it: the card uses Tablenote's own tap glyph (concentric arcs) and the words "Hold your phone here." Do not add the N-Mark without reading the NFC Forum license.

### 4.5 Demo cards

Never print a real restaurant's name or logo before that restaurant has ordered or given written consent (an email is enough). Never point a demo card at a real restaurant's Place ID. Today `site/data/links.json` points `demo` and `lucias` at `/sample-report`, which is safe. When a Tablenote Google Business Profile exists, a demo card may point at `https://search.google.com/local/writereview?placeid=<Tablenote's Place ID>` so prospects see the real Google screen; tell everyone at demos not to submit a review, since a review of Tablenote by a prospect or friend is a conflict-of-interest review (https://developers.google.com/maps/documentation/places/web-service/place-id).

---

## 5. Privacy policy and terms: what they must cover

The site already has `/legal/privacy`, `/legal/terms`, and `/legal/review-policy`. This section is the audit list for those pages.

### 5.1 Why they are required

- CalOPPA applies to "An operator of a commercial Web site or online service that collects personally identifiable information through the Internet about individual consumers residing in California," with no size threshold and a 30-day cure period (https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575).
- Stripe: "Business Users are required to provide all necessary notices and obtain all necessary rights and consents from their End Customers to enable Stripe to lawfully collect, use, retain and disclose the Personal Data" (https://stripe.com/legal/privacy-center). Stripe's website checklist also requires a refund policy, shipping policy, cancellation policy, business address, and a customer-service contact other than a form (https://docs.stripe.com/get-started/checklist/website).
- Google OAuth verification (for the Business Profile API later) requires the privacy policy "hosted within the same domain as your application's home page" (https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification).
- CCPA's full obligations do not apply below $26,625,000 revenue or 100,000 consumers (https://getuptocode.com/guides/ccpa-state-privacy-small-business). Virginia-style state laws start at 100,000 consumers (https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-575/).

### 5.2 Privacy policy must cover

- [ ] Lead-form and order data (name, email, phone, restaurant, shipping address, logo, review link). Already covered.
- [ ] Payments via Stripe; Tablenote never sees full card numbers. Include Stripe's suggested paragraph and a link to https://stripe.com/privacy. Already covered in substance.
- [ ] Tap redirect logging on tblnt.com: timestamp, card serial, coarse device family; IP processed only to serve the redirect and not stored; no cookies. Already covered. Keep the server configured to match (drop or truncate IPs; rotate logs at 30 days). This is the lowest-risk configuration under Cal. Penal Code 638.51 because nothing tracks an individual (https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=638.51.&lawCode=PEN).
- [ ] A guest-facing notice reachable from the card: host a short privacy note at the root of tblnt.com and at tblnt.com/privacy, since guests never see tblnt.com.
- [ ] Review data for the report: public reviews read with the restaurant's authorization; raw review content kept no more than 30 days (Google API policy: "stored temporarily for no more than 30 calendar days," https://developers.google.com/my-business/content/policies); reports delivered only to the subscribing restaurant; reviewer display names not printed in reports.
- [ ] Name the AI model provider as a subprocessor and state that review text is sent to it only to produce the report and is not used for training. Anthropic's Commercial Terms: "Anthropic may not train models on Customer Content from Services" and inputs are deleted "within 30 days" (https://www.anthropic.com/legal/commercial-terms ; https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data). OpenAI API: "not used to train or improve OpenAI models" by default, abuse logs kept "up to 30 days" (https://developers.openai.com/api/docs/guides/your-data). The current privacy page says "our model provider" without naming it. Fill in the name.
- [ ] Hosting provider named as a service provider if it keeps its own logs (Vercel, Cloudflare, or whichever is used).
- [ ] Email marketing with unsubscribe (section 8).
- [ ] Contact email, effective date, change notice, no cookies banner needed but analytics cookies disclosed, not directed to children.
- [ ] Reviewer removal requests: purge from cache, redact from stored reports, confirm in writing within 30 days.

### 5.3 Terms of service must cover

- [ ] What is sold: $15 per card one-time, minimum 5 cards, $50 per month per location for the report, 10 free replacement cards per month while subscribed, extra cards $15 each, US shipping included, sales tax added at checkout where required. Already covered.
- [ ] Proof within 2 business days; cards ship about 10 business days after proof approval; full refund if cancelled before proof approval; no refunds on printed cards after approval; defective cards reprinted. Already covered.
- [ ] Auto-renewal: renews monthly until cancelled, cancel anytime from the Stripe Customer Portal or by email, cancellation at end of period, cards keep working after cancellation. Already covered. See section 7 for the checkout-side gap.
- [ ] Price changes: the terms promise "at least 30 days notice." California BPC 17602(g)(2), verified by fetching the statute page on September 5, 2026 (the research files quote only the 15-to-45-day renewal-notice window from 17602(h), not this subsection): "In the case of a change in the fee charged under an existing automatic renewal or continuous service offer that has been accepted by a consumer in this state, including changes the consumer affirmatively consented to in an existing plan or arrangement, the business shall provide, no less than 7 days and no more than 30 days before the fee change takes effect, the consumer with both of the following" (https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17602.&lawCode=BPC). Change the terms wording to "between 7 and 30 days before the change takes effect" so the promise cannot conflict with the statute. Read the two items that follow "both of the following" (the notice content requirements) on the statute page before rewriting the paragraph; they were not captured in the research.
- [ ] No-guarantee clause: no promise of any number of reviews, any rating, or that Google will publish a review. Already covered.
- [ ] Client compliance covenant: the restaurant agrees not to offer incentives, gate, pressure guests on premises, set staff quotas, ask guests to name staff, hand cards to staff or relatives, or use a house device, and acknowledges Google may restrict its profile if it does. Add: the restaurant will not use the report to set pay, tips, scheduling, or discipline.
- [ ] Authorization to read the restaurant's reviews (Manager access or OAuth); replies never posted without approval (Google: "If you respond to reviews on behalf of your end-client, you must receive their authorization first," https://developers.google.com/my-business/content/policies).
- [ ] AI disclaimer and the staff-mention disclaimer from 3.4.
- [ ] Logo license: the restaurant grants a license to print its name and logo and represents it owns them.
- [ ] Trademark statement: "Google, Google Maps and Google Business Profile are trademarks of Google LLC. Tablenote is not affiliated with, sponsored by, or endorsed by Google." Already present in section 12 and the footer.
- [ ] Data lifecycle on cancellation: revoke tokens, remove Manager access, delete raw review content immediately, keep reports downloadable for 90 days then delete; breach notice within 72 hours of confirming unauthorized access to tokens or reports (all 50 states have breach-notice laws, https://www.ncsl.org/technology-and-communication/security-breach-notification-laws).
- [ ] Limitation of liability, governing law, venue, dispute resolution.

### 5.4 Facts only the founder can fill in

- [ ] Legal entity name. `site/lib/brand.ts` says "Tablenote LLC" as a placeholder. Confirm the entity is formed, or change the name to the real one.
- [ ] State of formation and governing law. `BRAND.state` is empty and the terms' section 16 depends on it. Fill in [STATE].
- [ ] Business mailing address for the terms, the privacy policy, and every marketing email (CAN-SPAM requires "a valid physical postal address").
- [ ] Sales-tax registration number for the home state (section 6).
- [ ] Name of the AI model provider and the hosting provider.
- [ ] Retention period for website server logs (state a number; 30 days matches the rest of the pipeline).
- [ ] A support email that is read daily (isiah@tblnt.com is the placeholder) and, ideally, a phone number, since Stripe's checklist asks for contact "besides contact forms."

### 5.5 Accessibility

There is no federal web-accessibility rule for private businesses, but 3,117 federal web-accessibility suits were filed in 2025 (up 27%), courts use WCAG 2.1 AA as the benchmark, and there is no small-business exemption (https://www.adatitleiii.com/2026/03/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025/). Overlay widgets are not a defense (https://www.inclusiveweb.co/accessibility-resources/how-to-protect-your-business-from-ada-website-lawsuits-in-2026). Run axe or Lighthouse on the order flow before launch; keyboard-navigable forms, labeled inputs, 4.5:1 contrast, alt text, an accessibility statement page.

---

## 6. Sales tax: cards versus the subscription

Home state is the single most important input and is not yet known. Everything below flips by state. Confirm with a CPA before the first invoice.

| Item | Treatment | Source |
| --- | --- | --- |
| Printed cards ($15 each) | Tangible personal property. Taxable in all 45 sales-tax states (none in AK, DE, MT, NH, OR). Physical presence in the home state creates nexus on day one: register for a seller's permit and collect on every in-state sale, including the pilot restaurants. | https://taxfoundation.org/data/all/state/sales-tax-rates/ |
| Cards shipped to other states | Economic nexus only after crossing the threshold, usually $100,000 of sales into the state over 12 months ($500,000 in CA, NY, TX; $250,000 in AL, MS). Below that, no collection duty there. | https://taxcloud.com/blog/sales-tax-nexus-by-state/ ; https://www.taxjar.com/sales-tax/economic-nexus |
| The $50/month report | Taxable in some form in roughly two dozen jurisdictions per industry trackers (NY as an information service; TX as data processing on 80% of the charge; PA, MA, WA, OH, CT at 1% for business use, MD in some cases). Exempt in others (FL, GA, IL, NJ, VA, CA until 2027). Trackers disagree on several states. | https://taxcloud.com/blog/saas-sales-tax-by-state/ ; https://www.anrok.com/saas-sales-tax-by-state |
| California from Jan 1, 2027 | SB 122 adds Rev. and Tax. Code 6016.1: prewritten software "transferred electronically, or accessed remotely" is a taxable digital product. | https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB122 |
| Colorado from Jan 1, 2027 | HB26-1223 taxes software "available for repeated sale and license" but does not name SaaS or remote access. Unresolved pending Department of Revenue guidance. | https://leg.colorado.gov/bills/hb26-1223 |
| Shipping | "Sales tax follows the product" in most states. Separately stated common-carrier shipping is exempt in CA, VA, MA, KS, UT and taxable in TX, NY, PA, CT when the goods are taxable. Tablenote includes shipping in the card price, so it is simply part of the taxable card charge. | https://www.avalara.com/blog/en/north-america/2018/11/how-to-handle-sales-tax-on-shipping-a-state-by-state-guide.html |
| Card stock bought from the supplier | Buy with a resale certificate. Self-assess use tax on the supplier cost of every card withdrawn for demos, samples, and giveaways. Conservative reading: also self-assess on the free replacement cards. | https://www.cdtfa.ca.gov/formspubs/pub103/ (California's rule; other states follow the same principle) |

### 6.1 The bundling trap

If an invoice shows one price for cards plus report, many states tax the whole bundle at the tangible-goods rate. The checkout already itemizes: one line for cards, one recurring line for the report (`site/app/api/checkout/route.ts`), and the pricing page prints the $150 plus $50 table under the total (`site/components/sections/PricingCards.tsx`). Keep it that way everywhere: Stripe invoices, email quotes, the pitch, and the starter-kit description. The wording to use is "$200 today ($150 for 10 cards plus $50 for the first month), then $50 a month"; the $200 total is fine as long as the two lines are itemized next to it. List the 10 free replacement cards as a no-charge line so there is no separate consideration to tax.

### 6.2 Stripe Tax setup

- [ ] Activate Stripe Tax in the Dashboard and add the home-state registration.
- [ ] Set `STRIPE_AUTOMATIC_TAX=1` in `site/.env.local` (the route then sends `automatic_tax: { enabled: true }`).
- [ ] Give each line item a product tax code. The card is physical goods. For the report, pick between "SaaS, business use" and an information or data-processing service code after the CPA decides the home-state classification; Stripe's default code will not know the deliverable is a human-readable report rather than a software login.
- [ ] Watch the out-of-state threshold report in Stripe Tax and register in a second state only when it says so.

---

## 7. Auto-renewal law and how Stripe handles it

### 7.1 The rules

| Law | Applies to | Requirements | Source |
| --- | --- | --- | --- |
| ROSCA, 15 U.S.C. 8403 | All online negative-option sales, not limited to consumers | Disclose "all material terms of the transaction before obtaining the consumer's billing information"; obtain "express informed consent before charging"; provide "simple mechanisms for a consumer to stop recurring charges." | https://www.law.cornell.edu/uscode/text/15/8403 |
| California ARL, Bus. and Prof. Code 17600 to 17606 (as amended July 1, 2025) | "Consumer" means an individual buying for "personal, family, or household purposes." A restaurant buying a business subscription is not one on the statute's face, but sole proprietors paying with a personal card blur the line. Build to this standard anyway. | Terms "in visual proximity" to the consent; "express affirmative consent"; online cancellation "exclusively online, at will, without engaging any further steps that obstruct or delay" via "a prominently located direct link or button"; price-change notice 7 to 30 days before; annual reminder for annual plans only. | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17601.&lawCode=BPC ; https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17602.&lawCode=BPC |
| New York GBL 527, 527-a | Same consumer definition | Clear pre-consent disclosure; affirmative consent; a post-sale acknowledgment "capable of being retained by the consumer"; cancellation "as easy to use as the mechanism that the consumer used to provide consent"; renewal notice only for terms of a year or longer. | https://www.nysenate.gov/legislation/laws/GBS/527 ; https://www.nysenate.gov/legislation/laws/GBS/527-A |
| FTC Click-to-Cancel rule | Vacated in litigation; FTC opened a new rulemaking in March 2026. Not in force. | ROSCA still applies. | https://www.ftc.gov/legal-library/browse/rules/negative-option-rule |

A month-to-month plan avoids the annual-reminder and pre-renewal-notice duties in both states.

### 7.2 What Stripe does and does not do

Stripe covers: a terms checkbox on Checkout when `consent_collection.terms_of_service = "required"`, with text customizable via `custom_text.terms_of_service_acceptance` (https://docs.stripe.com/payments/checkout/custom-components.md?platform=web&payment-ui=stripe-hosted); receipts that serve as the retainable acknowledgment; and a Customer Portal where customers "Cancel subscriptions immediately or at the end of the current billing period" (https://docs.stripe.com/customer-management).

Gaps the founder must close:

- [ ] `site/app/api/checkout/route.ts` does not yet set `consent_collection` or `custom_text`. Add both so that the renewal terms sit next to the checkbox: "$50/month per location, renews monthly until you cancel. Cancel anytime from your account or by emailing isiah@tblnt.com. Cards ship about 10 business days after you approve the proof." Link the Terms and Privacy pages in the same block.
- [ ] Enable the Stripe Customer Portal and put a "Manage subscription" link in the order-success page, the account email, and every monthly receipt. A contact form is not a compliant cancellation path.
- [ ] Price-change notices are manual. Send them 7 to 30 days ahead, by email, and update the terms wording as noted in 5.3.

### 7.3 Stripe account eligibility

Stripe's Restricted Businesses list has no entry for reviews or reputation management. The nearest entries are "Sales of online traffic or engagement," "No-value-added services," and "Negative option marketing ... with unclear or hidden pricing" (https://stripe.com/legal/restricted-businesses). Describe the business in the Dashboard as "Printed NFC cards and monthly guest-feedback analytics software for restaurants." Keep "boost your rating" and "more 5-star reviews" off the site before Stripe's underwriting reviews it. The existing Stripe account from the photo and water business can host a second account under the same login (see `site/.env.example`); use a separate account so statements, tax, and risk profile stay clean.

---

## 8. Selling: CAN-SPAM and TCPA for Zay's own outreach

### 8.1 Cold email to restaurant owners (CAN-SPAM)

"The law makes no exception for business-to-business email" (https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business). Cold email is legal if every message has:

- [ ] Accurate header and from address, from a real Tablenote sending domain.
- [ ] A non-deceptive subject line.
- [ ] "a valid physical postal address" of the business (see 5.4).
- [ ] A working opt-out that stays live "at least 30 days after you send your message," honored "within 10 business days."
- [ ] Identification as an advertisement where the recipient has not opted in.

Penalty: "up to $53,088" per email. The sender stays liable for anything a vendor or tool sends.

### 8.2 Calls and texts (TCPA, 47 CFR 64.1200)

There is no business-number exception for cell phones: the autodialer and prerecorded-voice rules apply to "any telephone number assigned to a ... cellular telephone service" (https://www.law.cornell.edu/cfr/text/47/64.1200). A restaurant owner's mobile is protected.

- Manually dialed, live sales calls to a business number are outside the autodialer rule. Check the Do-Not-Call list for any number that could be personal.
- Any automated or AI-voice call or marketing text needs "prior express written consent" that discloses the automated technology and that consent "is not required ... as a condition of purchasing." A checkbox counts as a signature.
- Call only between 8 a.m. and 9 p.m. local time. Honor STOP or any reasonable revocation within ten business days.
- One consent naming Tablenote is enough; the FCC's one-to-one consent rule was vacated (Insurance Marketing Coalition v. FCC, 11th Cir., Jan 24, 2025, https://media.ca11.uscourts.gov/opinions/pub/files/202410277.pdf).

### 8.3 Text to put under the website lead form

Unchecked checkbox, separate from the submit button:

"By checking this box, I agree that Tablenote may call and text me at the number above, including with automated technology, about its products. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out. See our Privacy Policy."

Under the email field, no checkbox: "We'll email you about Tablenote. Unsubscribe anytime."

The lead endpoint posts to `LEAD_WEBHOOK_URL` (`site/.env.example`). The record stored there is the "signed agreement," so it must hold the timestamp, the IP, and the exact consent text shown. As built, `site/app/api/lead/route.ts` sends only `name, restaurant, email, phone, city, message, kind, ts`; there is no consent field, no IP, and `site/components/forms/LeadForm.tsx` has a phone field but no checkbox. That is a code change, not a webhook setting, and it is not on any task list yet (it belongs in Week 1 of `docs/07-*.md`). Pick one before the first campaign that texts or auto-dials a lead:

- [ ] Option A, keep the phone field: add an unchecked `smsConsent` boolean and a `consentText` string (the exact paragraph above) to the zod schema and the form; forward the request IP from the `x-forwarded-for` header with the payload; store it all at the webhook. Only then use the number for automated texts or calls.
- [ ] Option B, until texting is actually used: drop the phone field and the checkbox. Manually dialed live calls to a business number do not need this consent (8.2), so nothing is lost for the pilot.

Either way, do not text a lead with automated tools until the consent record exists.

---

## 9. Why competitors' gating products are a liability (use this in sales)

Several hardware sellers upsell a "filtration" page that asks the guest for a rating first and sends only happy guests to Google.

| Competitor | Product | Price | What it does | Source |
| --- | --- | --- | --- | --- |
| Tap Tag | Review+ | $19/month or $190/year | "review filtration, custom review page" | https://taptag.shop/pages/tap-tag-pricing |
| Taps Reviews | Review Filtration Plus+ | Price not published on the pages checked (homepage, /collections/all; /pages/pricing returns 404). Sold as a yearly plan with "$100 of Free Products." | Yearly filtration plan; the research describes it as gating (unhappy guests routed to private feedback) but the product page itself was not captured, so treat the quoted mechanism as unverified | https://tapsreviews.com/collections/all (`research/competitors_pricing.md`, gap-fill section 6) |
| GrowSEO | Google Reviews Card | $50 CAD single, $35 CAD at 20+ | "only 5-star ratings are directed to your public Google Business Reviews, while ratings of 1-4 stars initiate a private conversation" | https://growseo.com/review-cards/google-reviews-card.php |

That is review gating by Google's definition: merchants may not "Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers" (https://support.google.com/contributionpolicy/answer/7400114). It is the exact pattern the FTC's Endorsement Guides call out in Example 11 (https://www.law.cornell.edu/cfr/text/16/255.2), and the FTC says it "could violate the FTC Act" (https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers). Google now surveys reviewers in Maps about whether the business influenced them, and has removed reviews retroactively (https://ppc.land/google-maps-is-now-asking-users-if-businesses-paid-for-their-reviews/). A restaurant that pays $19 a month (Tap Tag Review+) or $35 to $50 CAD a card (GrowSEO) for a filter is paying to build the evidence that gets its reviews unpublished. Reddit summaries collected by a competitor describe the filter bundlers as "sketchy" (https://prosperqr.com/blog/google-review-cards-worth-it-reddit).

Tablenote's line, backed by the redirect code in `site/app/r/[slug]/route.ts`: the card goes straight to Google's own write-a-review screen. No rating question, no filter, no interstitial. Every guest gets the same link. The same applies to the report: it reads what guests already posted publicly; it never decides who gets to post.

What a compliant landing page would need if one is ever added: identical for every guest, no rating or "how was it?" question before the buttons, the Google button first and not smaller, a private-feedback button labeled honestly ("Send a private note to the manager"), and no Yelp button (Yelp filters solicited reviews). The direct 302 is cleaner; keep it.

---

## Sources

Google policy and help
- Maps UGC policy: https://support.google.com/contributionpolicy/answer/7400114
- Incentivized or biased reviews glossary: https://support.google.com/contributionpolicy/answer/16597558
- Tips to get more reviews: https://support.google.com/business/answer/3474122
- Profile restrictions: https://support.google.com/business/answer/14114287
- Consumer alerts: https://support.google.com/contributionpolicy/answer/15178562
- ppc.land on staff names and quotas: https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/
- ppc.land on Maps surveys: https://ppc.land/google-maps-is-now-asking-users-if-businesses-paid-for-their-reviews/
- Search Engine Roundtable, Feb 2026 removals: https://www.seroundtable.com/google-reviews-being-removed-again-40950.html
- Launchcodex on the April 2026 update: https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/
- Whitespark on filtered reviews: https://whitespark.ca/blog/google-remove-reviews/
- Local Search Forum, same-IP thread: https://localsearchforum.com/threads/google-reviews-coming-from-same-ip.53116/
- Yelp, don't ask for reviews: https://biz.yelp.com/support-center/Reviews/Best_Practices/Don-t-Ask-for-Reviews/en-US

Google API and brand
- Business Profile API policies: https://developers.google.com/my-business/content/policies
- API prerequisites: https://developers.google.com/my-business/content/prereqs
- OAuth sensitive-scope verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
- Place IDs: https://developers.google.com/maps/documentation/places/web-service/place-id
- Customer reviews brand use case: https://partnermarketinghub.withgoogle.com/brands/google/use-cases/customer-reviews/
- Brand guidance: https://about.google/brand-resource-center/guidance/
- Logo rules: https://partnermarketinghub.withgoogle.com/brands/google/branding-guidelines/how-to-show-googles-brand/
- Brand terms and conditions: https://partnermarketinghub.withgoogle.com/brands/google/trademarks-and-terms/terms-and-conditions/
- Geo guidelines (Maps pin): https://about.google/brand-resource-center/products-and-services/geo-guidelines/
- Maps pin design patents: https://www.avvo.com/legal-answers/google-maps-pin-3165791.html
- Brand Resource Center (permissions): https://partnermarketinghub.withgoogle.com/brands/google/overview/

FTC
- 16 CFR 465.2, 465.4, 465.5, 465.6, 465.7, 465.8: https://www.law.cornell.edu/cfr/text/16/465.2 ; https://www.law.cornell.edu/cfr/text/16/465.4 ; https://www.law.cornell.edu/cfr/text/16/465.5 ; https://www.law.cornell.edu/cfr/text/16/465.6 ; https://www.law.cornell.edu/cfr/text/16/465.7 ; https://www.law.cornell.edu/cfr/text/16/465.8
- Civil penalty amounts, 16 CFR 1.98 (eCFR, current through August 2026): https://www.ecfr.gov/current/title-16/chapter-I/subchapter-A/part-1/subpart-L/section-1.98 ; https://www.law.cornell.edu/cfr/text/16/1.98 ; no 2026 adjustment: OMB Memorandum M-26-11, April 17, 2026 (cited in `research/policy_legal.md` fact-check; memo URL not captured in the research)
- Rule Q&A: https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
- Endorsement Guides 255.2 and 255.5: https://www.law.cornell.edu/cfr/text/16/255.2 ; https://www.law.cornell.edu/cfr/text/16/255.5
- Endorsement Guides FAQ: https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
- Advertising FAQ (substantiation, testimonials): https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business
- Warning letters, Dec 2025: https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-warns-10-companies-about-possible-violations-agencys-new-consumer-review-rule ; template: https://www.ftc.gov/system/files/ftc_gov/pdf/2025-Fake-Review-Warning-Template.pdf
- TruHeight: https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-approves-final-order-against-truheight-deceptive-unsubstantiated-advertising-supplements-kids
- Premium Home Service: https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-illinois-take-action-stop-deceptive-conduct-company-created-thousands-business-listings-fake
- CAN-SPAM guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- Negative Option Rule page: https://www.ftc.gov/legal-library/browse/rules/negative-option-rule

TCPA
- 47 CFR 64.1200: https://www.law.cornell.edu/cfr/text/47/64.1200
- Insurance Marketing Coalition v. FCC: https://media.ca11.uscourts.gov/opinions/pub/files/202410277.pdf

Employment
- Illinois HB 3773: https://natlawreview.com/article/illinois-anti-discrimination-law-address-ai-goes-effect-1-january-2026
- Colorado SB 26-189: https://www.skadden.com/insights/publications/2026/06/colorado-repeals-and-replaces-its-ai-act
- DOL tipped employees: https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa

Privacy, Stripe, accessibility
- CalOPPA, B&P 22575: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575
- Cal. Penal Code 638.51: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=638.51.&lawCode=PEN
- CCPA thresholds: https://getuptocode.com/guides/ccpa-state-privacy-small-business
- Virginia CDPA: https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-575/
- Stripe Privacy Center: https://stripe.com/legal/privacy-center ; website checklist: https://docs.stripe.com/get-started/checklist/website ; Checkout consent and custom text: https://docs.stripe.com/payments/checkout/custom-components.md?platform=web&payment-ui=stripe-hosted ; Customer Portal: https://docs.stripe.com/customer-management ; Restricted Businesses: https://stripe.com/legal/restricted-businesses
- Anthropic terms and retention: https://www.anthropic.com/legal/commercial-terms ; https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-personal-data
- OpenAI API data: https://developers.openai.com/api/docs/guides/your-data
- Breach notification laws: https://www.ncsl.org/technology-and-communication/security-breach-notification-laws
- ADA web suits 2025: https://www.adatitleiii.com/2026/03/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025/ ; overlays: https://www.inclusiveweb.co/accessibility-resources/how-to-protect-your-business-from-ada-website-lawsuits-in-2026

Auto-renewal
- ROSCA: https://www.law.cornell.edu/uscode/text/15/8403
- California B&P 17601, 17602: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17601.&lawCode=BPC ; https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17602.&lawCode=BPC
- New York GBL 527, 527-a: https://www.nysenate.gov/legislation/laws/GBS/527 ; https://www.nysenate.gov/legislation/laws/GBS/527-A

Sales tax
- Tax Foundation 2026 rates: https://taxfoundation.org/data/all/state/sales-tax-rates/
- Economic nexus: https://taxcloud.com/blog/sales-tax-nexus-by-state/ ; https://www.taxjar.com/sales-tax/economic-nexus
- SaaS taxability trackers: https://taxcloud.com/blog/saas-sales-tax-by-state/ ; https://www.anrok.com/saas-sales-tax-by-state
- California SB 122: https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB122
- Colorado HB26-1223: https://leg.colorado.gov/bills/hb26-1223
- Shipping taxability: https://www.avalara.com/blog/en/north-america/2018/11/how-to-handle-sales-tax-on-shipping-a-state-by-state-guide.html
- Resale certificates and self-use: https://www.cdtfa.ca.gov/formspubs/pub103/

Phones
- Apple background tag reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Android NFC: https://developer.android.com/develop/connectivity/nfc/nfc

Competitors
- Tap Tag pricing: https://taptag.shop/pages/tap-tag-pricing
- Taps Reviews (plan price not published on pages checked): https://tapsreviews.com/collections/all
- GrowSEO card: https://growseo.com/review-cards/google-reviews-card.php
- ProsperQR Reddit summary: https://prosperqr.com/blog/google-review-cards-worth-it-reddit

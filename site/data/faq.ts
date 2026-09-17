import { BRAND, PRICING } from "@/lib/brand";

export type FaqItem = {
  q: string;
  a: string;
  group: string;
};

export const FAQ_GROUPS = [
  "The cards",
  "Guests and phones",
  "Google and the rules",
  "The monthly report",
  "Pricing and billing",
  "Getting started",
] as const;

export type FaqGroup = (typeof FAQ_GROUPS)[number];

export const FAQ: FaqItem[] = [
  // The cards
  {
    group: "The cards",
    q: "What is the card, exactly?",
    a: `A credit-card-size PVC card with an NFC chip inside and your restaurant's name on the front. Your server sets it on the table with the check. The guest taps it with their phone and lands on your Google review screen. There is nothing to install and nothing to charge.`,
  },
  {
    group: "The cards",
    q: "What is the card made of, and how do we clean it?",
    a: `Cards are printed on durable PVC, the same material as a gift card. Wipe them with sanitizer or a damp cloth like anything else on the table. They survive spills, pockets and dishwashing-adjacent chaos. If one does get damaged, subscribers get replacements free as part of their monthly allowance, and anyone can reorder singles at $${PRICING.cardPrice} each.`,
  },
  {
    group: "The cards",
    q: "Can we change where the card points later?",
    a: `Yes. Each card points to a short link on ${BRAND.shortLinkHost} that we control. If your Google listing changes, you move locations, or you want the card to go somewhere else for a while, we update the link and every card you own follows. No reprinting.`,
  },
  {
    group: "The cards",
    q: "Can we use our own QR code as well?",
    a: `Yes. The back of every card carries a QR code that opens the same review link, so guests who prefer to scan can. If you already have a QR code you like, we can print that one instead.`,
  },
  {
    group: "The cards",
    q: "We do not have a logo. Can we still order?",
    a: `Of course. Most independent restaurants do not have a polished logo file. We design a type-only card using your restaurant's name, set in a typeface that suits the room. Many owners prefer it. If you have a logo later, we can refresh the design.`,
  },
  {
    group: "The cards",
    q: "Our tables are metal. Will the cards still work?",
    a: `Yes. The card works when a guest holds their phone to it, and that works fine on a metal table. What you should not do is stick the card permanently to a metal surface, because the metal blocks the signal. Keep the cards loose, or use a small wooden or acrylic holder.`,
  },
  {
    group: "The cards",
    q: "How do replacement cards work?",
    a: `Cards go missing. Guests pocket them, servers lose them. Subscribers get ${PRICING.freeReplacementCardsPerMonth} free replacement cards every month. Request them from your dashboard or reply to any report email and we ship them out. If you need more than that in a month, extra cards are $${PRICING.cardPrice} each.`,
  },

  // Guests and phones
  {
    group: "Guests and phones",
    q: "Which phones work with the card?",
    a: `Nearly all of them. iPhone XS and newer read the tag with no app: hold the top of the phone near the card, a banner appears, and the guest taps it. Older iPhones from the 7 to the X need the NFC Tag Reader in Control Center, which takes one extra tap. Almost every Android phone sold in the last several years reads NFC as long as the screen is on and unlocked; newer Android versions show an open-link notification to tap. Every card also has a QR code on the back as a fallback.`,
  },
  {
    group: "Guests and phones",
    q: "Does the guest need the Google app?",
    a: `No. The link opens in the phone's browser, straight to your Google review box. Google requires reviewers to be signed in to a Google account, and most guests already are on their phone. If not, Google asks them to sign in and then returns them to your review box. No app to download, nothing to install.`,
  },
  {
    group: "Guests and phones",
    q: "How does the server introduce the card?",
    a: `Simply. One optional line, then walk away: "If you'd like to leave us an honest review on Google, just tap your phone on this. Now or whenever." The guest decides on their own phone, in their own time. We include a one-page staff guide with the same script in every order.`,
  },
  {
    group: "Guests and phones",
    q: "What happens if the guest taps but does not finish the review?",
    a: `Nothing bad. Google keeps their draft for a little while, and many guests finish it later from their phone. We never nag guests, collect their contact details, or follow up on your behalf. The card is an invitation, not a funnel.`,
  },

  // Google and the rules
  {
    group: "Google and the rules",
    q: "Is asking guests for reviews allowed?",
    a: `Yes. Google allows businesses to ask customers for reviews, as long as you ask everyone the same way. Putting a card on every table is exactly that. What Google does not allow is review gating, where you screen guests and only send the happy ones to Google, and incentives, where you offer a discount or gift in exchange for a review. ${BRAND.name} does neither, and our cards are built so you cannot either.`,
  },
  {
    group: "Google and the rules",
    q: "What if a guest leaves a bad review?",
    a: `It will happen, because the card asks everyone. That is what makes the reviews credible. Your monthly report reads every review, including the rough ones, and tells you what caused it and what to do next. We also draft a calm, specific reply for you to post. You cannot delete a review, but if one breaks Google's policies (spam, a competitor, someone who never visited) you can flag it, and we show you how.`,
  },
  {
    group: "Google and the rules",
    q: `Is ${BRAND.name} affiliated with Google?`,
    a: `No. We are an independent company. We use "Google" as a plain word to describe where the reviews live. Google and Google Maps are trademarks of Google LLC.`,
  },
  {
    group: "Google and the rules",
    q: "Can the card send guests to Yelp or another site instead?",
    a: `The card points to a link we control, so technically yes. We recommend Google because it is where most guests search and where the report reads from. If you have a good reason to point elsewhere for a while, ask us.`,
  },

  // The monthly report
  {
    group: "The monthly report",
    q: "How does the report get our reviews?",
    a: `We read your public Google reviews, the same ones anyone can see on your listing. To pull your full history and let us draft replies, you add ${BRAND.name} as a manager on your Google Business Profile. It takes about two minutes and we walk you through it on a call or by email. You can remove us at any time.`,
  },
  {
    group: "The monthly report",
    q: "What is actually in the report?",
    a: `Every new review from the month, read and sorted. What guests love. What they complain about. Which dishes get mentioned, and how. Which servers are named, and what guests say about them. How this month compares to the last few. And a short list of concrete actions, written for an owner who has ten minutes on a Tuesday.`,
  },
  {
    group: "The monthly report",
    q: "Does the report name our servers?",
    a: `Yes, when guests name them. If a review says "Maria was wonderful" the report credits Maria. Many owners read that part aloud at pre-shift. If you would rather keep names out of it, turn it off from your settings and the report will refer to "a server" instead.`,
  },
  {
    group: "The monthly report",
    q: "Is the report written by a person or by AI?",
    a: `The reading and sorting is done by AI, which is what makes it affordable at $${PRICING.monthlyReport} a month. A person on our team checks each report before it goes out. If something looks off, reply to the email and a human answers.`,
  },
  {
    group: "The monthly report",
    q: "When does the report arrive?",
    a: `On the first business day of each month, by email, covering the previous month. If you have a busy weekend and want to see what came in, your dashboard shows new reviews as they land.`,
  },
  {
    group: "The monthly report",
    q: "Can we get the report without the cards, or the cards without the report?",
    a: `Yes to both. Some restaurants already get plenty of reviews and only want them read. Others just want the cards. The two work best together, because the cards make it easy for every guest to leave a review and the report tells you what they say, but there is no bundle requirement.`,
  },

  // Pricing and billing
  {
    group: "Pricing and billing",
    q: "How much does it cost?",
    a: `Cards are $${PRICING.cardPrice} each, one time, with a minimum order of ${PRICING.minCards}. Most restaurants start with ${PRICING.starterKitCards}, one per server on the floor plus a couple of spares. The monthly report is $${PRICING.monthlyReport} per location and includes ${PRICING.freeReplacementCardsPerMonth} free replacement cards a month. No setup fee.`,
  },
  {
    group: "Pricing and billing",
    q: "Can we cancel anytime?",
    a: `Yes. The report is month to month. Cancel from your dashboard or by emailing ${BRAND.email} and you will not be charged again. The cards are yours and keep working after you cancel.`,
  },
  {
    group: "Pricing and billing",
    q: "We have more than one location. How does that work?",
    a: `Each location gets its own cards, its own link and its own report, because each has its own Google listing and its own kitchen. Ask us about multi-location pricing when you order and we will put together a rate that makes sense for your group.`,
  },
  {
    group: "Pricing and billing",
    q: "What about shipping and sales tax?",
    a: `Shipping inside the US is included on every card order. Sales tax is added at checkout where your state requires it, and the total is shown before you pay. Replacement cards ship free.`,
  },
  {
    group: "Pricing and billing",
    q: "How do we pay?",
    a: `By card at checkout. The monthly report is billed to the same card on the same day each month, and you get a receipt by email you can hand to your bookkeeper.`,
  },

  // Getting started
  {
    group: "Getting started",
    q: "How long does it take to get cards?",
    a: `You typically see a digital design preview within 2 business days of ordering. Once you approve it, cards typically ship in about 10 business days. We email you tracking the day they leave.`,
  },
  {
    group: "Getting started",
    q: "What do you need from us to get started?",
    a: `Your restaurant name, the Google listing you want reviews on, and a logo if you have one. That is it. We find your review link, design the card, and send you a design preview. If you would like the report too, we send a two-minute guide for adding us as a manager on your Business Profile.`,
  },
  {
    group: "Getting started",
    q: "Do you work with cafes, bars and food trucks?",
    a: `Yes. Anywhere a guest sits for a while and pays at the end works well: cafes, bars, bakeries, food trucks with a window, breweries, even barbershops. If your guests have a phone and a moment, the card works.`,
  },
  {
    group: "Getting started",
    q: "Can we see a report before we commit?",
    a: `Yes. There is a full sample report on this site for a fictional restaurant, so you can see the format and depth. Or book a short demo and we will show you what yours could look like.`,
  },
];

/** Six questions shown on the home page. */
export const HOME_FAQ: FaqItem[] = [
  "Which phones work with the card?",
  "Does the guest need the Google app?",
  "Is asking guests for reviews allowed?",
  "What if a guest leaves a bad review?",
  "How does the report get our reviews?",
  "Can we cancel anytime?",
].map((q) => FAQ.find((f) => f.q === q)!);

export function faqByGroup(items: FaqItem[] = FAQ): Array<{ group: string; items: FaqItem[] }> {
  const groups = new Map<string, FaqItem[]>();
  for (const item of items) {
    const list = groups.get(item.group) ?? [];
    list.push(item);
    groups.set(item.group, list);
  }
  const ordered: Array<{ group: string; items: FaqItem[] }> = [];
  for (const g of FAQ_GROUPS) {
    const list = groups.get(g);
    if (list) ordered.push({ group: g, items: list });
    groups.delete(g);
  }
  for (const [group, list] of groups) ordered.push({ group, items: list });
  return ordered;
}

/**
 * Fictional sample report used on /sample-report and in the demo kit.
 * Lucia's Trattoria does not exist. Numbers are illustrative.
 */
export const SAMPLE_REPORT = {
  restaurant: "Lucia's Trattoria",
  period: "August 2026",
  generatedOn: "September 1, 2026",
  summary: {
    reviews: 87,
    reviewsPrev: 41,
    avgRating: 4.6,
    avgRatingPrev: 4.4,
    lifetimeRating: 4.5,
    lifetimeReviews: 612,
    fiveStar: 63,
    fourStar: 15,
    threeStar: 5,
    twoStar: 2,
    oneStar: 2,
    cardTaps: 214,
    replyRate: 38,
  },
  headline:
    "Best review month on record. Guests are talking about the new patio and the tiramisu, and three servers are getting named praise. Two fixable issues are costing you stars: weekend wait-time communication and the noise level in the back room.",
  wins: [
    {
      title: "The patio is your summer story",
      detail: "31 of 87 reviews mention the patio, and 29 of them are five stars. Guests use words like 'string lights', 'quiet', and 'felt like Italy'. Lead with it in September while the weather holds.",
      quotes: [
        "Sat on the patio under the lights and forgot we were in the middle of the city.",
        "Ask for the patio. Trust me.",
      ],
    },
    {
      title: "Tiramisu is the most-named dish, again",
      detail: "Mentioned 24 times, never negatively. It is your signature by popular vote. Consider a 'tiramisu to go' line on the check presenter.",
      quotes: ["We came back a week later just for the tiramisu."],
    },
    {
      title: "Service is warm and personal",
      detail: "42 reviews praise service. The pattern is servers remembering names, checking on the table without hovering, and helping with wine picks.",
      quotes: ["Our server treated my mom like she was his own."],
    },
  ],
  issues: [
    {
      title: "Weekend waits feel longer than they are",
      severity: "high",
      detail:
        "9 reviews (all Friday or Saturday) complain about waiting. 6 of the 9 say they were told 20 minutes and waited 40+. The complaint is the gap between the quote and the reality, not the wait itself.",
      action: "Quote 10 minutes longer than you expect on weekends, and send a text when the table is ready so guests can walk the block.",
      quotes: ["Told 20 min, seated after 45. Food was great but we were hangry by then."],
    },
    {
      title: "Back room noise",
      severity: "medium",
      detail:
        "5 reviews mention not being able to hear across the table, all seated in the back room, all on Saturday nights. Two of the five 3-star reviews this month cite it.",
      action: "Acoustic panels on the back-room ceiling, or a slightly lower music level after 7:30 pm. Ask the host to seat older guests and larger groups in the main room first.",
      quotes: ["Loved the food, could not hear my husband."],
    },
    {
      title: "Chicken parm portion inconsistency",
      severity: "low",
      detail: "3 reviews say the chicken parm was smaller than last time. Worth a quick portion check on the line.",
      action: "Re-weigh the cutlet spec with the kitchen and confirm on both shifts.",
      quotes: [],
    },
  ],
  staff: [
    { name: "Marco", mentions: 14, sentiment: "positive", note: "Most-named server for the third month running. Praised for wine recommendations and pacing." },
    { name: "Dani", mentions: 9, sentiment: "positive", note: "Guests call out warmth with kids and remembering regulars' orders." },
    { name: "Priya", mentions: 6, sentiment: "positive", note: "New this summer and already named. Two reviews mention her dessert pitch." },
    { name: "Host stand (unnamed)", mentions: 7, sentiment: "mixed", note: "Most wait-time complaints reference the host stand. This is a process issue, not a person." },
  ],
  dishes: [
    { name: "Tiramisu", mentions: 24, sentiment: 100 },
    { name: "Cacio e pepe", mentions: 19, sentiment: 95 },
    { name: "Burrata", mentions: 15, sentiment: 93 },
    { name: "Osso buco", mentions: 11, sentiment: 91 },
    { name: "Chicken parm", mentions: 10, sentiment: 70 },
    { name: "House red", mentions: 8, sentiment: 88 },
  ],
  themes: [
    { name: "Food quality", mentions: 71, positive: 67 },
    { name: "Service", mentions: 48, positive: 42 },
    { name: "Atmosphere / patio", mentions: 39, positive: 36 },
    { name: "Wait time", mentions: 12, positive: 3 },
    { name: "Noise", mentions: 6, positive: 1 },
    { name: "Value", mentions: 14, positive: 11 },
  ],
  trend: [
    { month: "Mar", reviews: 22, rating: 4.3 },
    { month: "Apr", reviews: 26, rating: 4.4 },
    { month: "May", reviews: 31, rating: 4.3 },
    { month: "Jun", reviews: 38, rating: 4.4 },
    { month: "Jul", reviews: 41, rating: 4.4 },
    { month: "Aug", reviews: 87, rating: 4.6 },
  ],
  recommendations: [
    { priority: 1, text: "Fix the weekend wait-time quote. It is the single biggest drag on your rating and it costs nothing." },
    { priority: 2, text: "Put the patio in your Google Business Profile photos and description this week. Guests are already selling it for you." },
    { priority: 3, text: "Reply to the 4 negative reviews with a specific fix. Replies were read by other guests: 2 reviews this month mention that you 'clearly listen'." },
    { priority: 4, text: "Tell Marco, Dani and Priya they were named. Named praise is the cheapest retention tool you have." },
    { priority: 5, text: "Test acoustic treatment in the back room before the holiday party season." },
  ],
  repliesToWrite: [
    {
      stars: 2,
      excerpt: "Told 20 min, seated after 45.",
      draft:
        "You are right, and I am sorry. We under-quoted your wait on Saturday and that is on us. We have changed how the host stand quotes weekend waits and now text guests when the table is ready. I would love to have you back. Please ask for Lucia and I will seat you myself.",
    },
    {
      stars: 3,
      excerpt: "Loved the food, could not hear my husband.",
      draft:
        "Thank you for the kind words about the food, and I hear you on the back room. We are adding acoustic panels there this fall. Next time, ask for the main room or the patio and we will make sure you get it.",
    },
  ],
};

export type SampleReport = typeof SAMPLE_REPORT;

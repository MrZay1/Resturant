import { SAMPLE_REPORT } from "./sampleReport";

/** Fictional dashboard data for the demo owner dashboard. */
export const SAMPLE_DASHBOARD = {
  restaurant: SAMPLE_REPORT.restaurant,
  plan: "Cards + monthly report",
  nextReport: "October 1, 2026",
  owner: "Lucia Romano",
  recipients: ["lucia@luciastrattoria.com", "gm@luciastrattoria.com"],
  googleLink: "https://search.google.com/local/writereview?placeid=ChIJ...Ew",
  shortLink: "tblnt.com/r/lucias",
  cards: { inService: 12, replacedThisMonth: 2, freeReplacementsLeft: 8, lost: 1 },
  tapsByWeek: [
    { label: "Aug 3", value: 41 },
    { label: "Aug 10", value: 52 },
    { label: "Aug 17", value: 58 },
    { label: "Aug 24", value: 63 },
  ],
  reports: [
    { period: "August 2026", reviews: 87, rating: 4.6, status: "ready", href: "/sample-report" },
    { period: "July 2026", reviews: 41, rating: 4.4, status: "ready", href: "/sample-report" },
    { period: "June 2026", reviews: 38, rating: 4.4, status: "ready", href: "/sample-report" },
    { period: "May 2026", reviews: 31, rating: 4.3, status: "ready", href: "/sample-report" },
  ],
  awaitingReply: [
    { stars: 2, when: "3 days ago", excerpt: "Told 20 min, seated after 45. Food was great but we were hangry by then.", draft: SAMPLE_REPORT.repliesToWrite[0].draft },
    { stars: 3, when: "6 days ago", excerpt: "Loved the food, could not hear my husband.", draft: SAMPLE_REPORT.repliesToWrite[1].draft },
    { stars: 5, when: "1 day ago", excerpt: "Ask for the patio. Trust me.", draft: "Thank you. The patio is our favorite spot too. See you under the lights again soon." },
  ],
};

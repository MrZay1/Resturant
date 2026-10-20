// Central brand configuration. Change the name here and it updates everywhere.
export const BRAND = {
  name: "Tablenote",
  legalName: "Tablenote LLC",
  domain: "tblnt.com",
  shortLinkHost: "tblnt.com",
  tagline: "Every table, every review.",
  email: "isiah@tblnt.com",
  phone: "",
  city: "Stonecrest",
  state: "Georgia", // Governing law and venue, Terms section 16. Change if the LLC is formed in another state.
  founderName: "Isiah Cameron",
};

export const PRICING = {
  cardPrice: 15, // USD, one-time, per card
  monthlyReport: 50, // Legacy report-only subscriptions; new order packages live in orderPlans.ts
  freeReplacementCardsPerMonth: 10,
  minCards: 10,
  maxCards: 200,
  starterKitCards: 10,
  shipBusinessDays: 10, // cards typically ship this many business days after design approval
};

export const LINKS = {
  order: "/order",
  pricing: "/pricing",
  demo: "/demo",
  report: "/sample-report",
  howItWorks: "/how-it-works",
  faq: "/faq",
  login: "/login",
  about: "/about",
};

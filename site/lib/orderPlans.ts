import { BRAND, PRICING } from "./brand";
import type Stripe from "stripe";

export const INCLUDED_CARDS = 10;
export const ORDER_PLANS = {
  starter: {
    name: "Review Starter",
    setup: 149,
    monthly: 0,
    features: [`${INCLUDED_CARDS} custom tap cards with QR backup`, "Google profile check", "Design preview before printing", "No monthly fee"],
  },
  regulars: {
    name: "Regulars Program",
    setup: 149,
    monthly: 79,
    features: ["Everything in Review Starter", "Text club signup and welcome offer", "Win-back and birthday texts", "Specials and slow-night promotions", "Monthly results report"],
  },
} as const;

export type OrderPlan = keyof typeof ORDER_PLANS;
export function isOrderPlan(value: unknown): value is OrderPlan {
  return value === "starter" || value === "regulars";
}

/** Shared by the preview and checkout. Amounts are whole USD; Stripe uses cents. */
export function priceOrder(plan: OrderPlan, cards: number) {
  if (!isOrderPlan(plan) || !Number.isInteger(cards) || cards < PRICING.minCards || cards > PRICING.maxCards) {
    throw new Error("Invalid order");
  }
  const offer = ORDER_PLANS[plan];
  const extraCards = Math.max(0, cards - INCLUDED_CARDS);
  const extras = extraCards * PRICING.cardPrice;
  return { setup: offer.setup, extraCards, extras, monthly: offer.monthly, today: offer.setup + extras + offer.monthly };
}

/** One-time charges occur only on the first invoice; only the service renews. */
export function orderLineItems(plan: OrderPlan, cards: number, description: string): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const totals = priceOrder(plan, cards);
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
    quantity: 1,
    price_data: {
      currency: "usd", unit_amount: totals.setup * 100,
      product_data: { name: `${BRAND.name} ${ORDER_PLANS[plan].name} setup`, description: `${INCLUDED_CARDS} custom tap cards, QR backup and Google profile check. ${description}` },
    },
  }];
  if (totals.extraCards) items.push({
    quantity: totals.extraCards,
    price_data: { currency: "usd", unit_amount: PRICING.cardPrice * 100, product_data: { name: `${BRAND.name} additional tap-to-review card`, description } },
  });
  if (totals.monthly) items.push({
    quantity: 1,
    price_data: {
      currency: "usd", unit_amount: totals.monthly * 100, recurring: { interval: "month" },
      product_data: { name: `${BRAND.name} Regulars Program`, description: "Text club signup, welcome offers, win-back and birthday texts, promotions and monthly results report" },
    },
  });
  return items;
}

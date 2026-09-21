import { sql } from "@/lib/db";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orderStatus";

export { ORDER_STATUSES, type OrderStatus };

export type Order = {
  id: number;
  stripe_session_id: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  status: OrderStatus;
  restaurant_name: string;
  restaurant_address: string;
  cards: number;
  has_report: boolean;
  amount_total: string; // numeric comes back as string from postgres.js
  template: string;
  headline: string;
  subline: string;
  brand_color: string;
  show_stars: boolean;
  has_logo: boolean;
  logo_url: string | null;
  logo_filename: string | null;
  link_mode: string;
  google_review_link: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  shipping_line1: string;
  shipping_line2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type OrderNote = { id: number; order_id: number; body: string; created_at: string };

/** New order data as it comes off a completed Stripe checkout session. */
export type NewOrderInput = {
  stripeSessionId: string;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  restaurantName: string;
  restaurantAddress: string;
  cards: number;
  hasReport: boolean;
  amountTotal: number;
  template: string;
  headline: string;
  subline: string;
  brandColor: string;
  showStars: boolean;
  hasLogo: boolean;
  logoUrl: string | null;
  logoFilename: string | null;
  linkMode: string;
  googleReviewLink: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  shipping: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
  notes: string;
};

/**
 * Insert or update the order for this Stripe session. Upsert on
 * stripe_session_id so a Stripe webhook retry never creates a duplicate row.
 */
export async function upsertOrderFromStripe(input: NewOrderInput): Promise<Order> {
  const s = input.shipping;
  const rows = await sql<Order[]>`
    insert into orders (
      stripe_session_id, stripe_subscription_id, stripe_customer_id,
      restaurant_name, restaurant_address, cards, has_report, amount_total,
      template, headline, subline, brand_color, show_stars, has_logo, logo_url, logo_filename,
      link_mode, google_review_link,
      contact_name, contact_email, contact_phone,
      shipping_line1, shipping_line2, shipping_city, shipping_state, shipping_postal_code, shipping_country,
      notes
    ) values (
      ${input.stripeSessionId}, ${input.stripeSubscriptionId}, ${input.stripeCustomerId},
      ${input.restaurantName}, ${input.restaurantAddress}, ${input.cards}, ${input.hasReport}, ${input.amountTotal},
      ${input.template}, ${input.headline}, ${input.subline}, ${input.brandColor}, ${input.showStars}, ${input.hasLogo}, ${input.logoUrl}, ${input.logoFilename},
      ${input.linkMode}, ${input.googleReviewLink},
      ${input.contactName}, ${input.contactEmail}, ${input.contactPhone},
      ${s?.line1 ?? ""}, ${s?.line2 ?? ""}, ${s?.city ?? ""}, ${s?.state ?? ""}, ${s?.postal_code ?? ""}, ${s?.country ?? ""},
      ${input.notes}
    )
    on conflict (stripe_session_id) do update set
      restaurant_name = excluded.restaurant_name,
      amount_total = excluded.amount_total,
      updated_at = now()
    returning *
  `;
  return rows[0];
}

export async function listOrders(opts: { search?: string; status?: OrderStatus } = {}): Promise<Order[]> {
  const { search, status } = opts;
  if (search && status) {
    return sql<Order[]>`
      select * from orders
      where status = ${status} and restaurant_name ilike ${"%" + search + "%"}
      order by created_at desc
    `;
  }
  if (search) {
    return sql<Order[]>`
      select * from orders where restaurant_name ilike ${"%" + search + "%"} order by created_at desc
    `;
  }
  if (status) {
    return sql<Order[]>`select * from orders where status = ${status} order by created_at desc`;
  }
  return sql<Order[]>`select * from orders order by created_at desc`;
}

export async function getOrder(id: number): Promise<Order | null> {
  const rows = await sql<Order[]>`select * from orders where id = ${id} limit 1`;
  return rows[0] ?? null;
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<void> {
  await sql`update orders set status = ${status}, updated_at = now() where id = ${id}`;
}

export async function listNotes(orderId: number): Promise<OrderNote[]> {
  return sql<OrderNote[]>`select * from order_notes where order_id = ${orderId} order by created_at desc`;
}

export async function addNote(orderId: number, body: string): Promise<void> {
  await sql`insert into order_notes (order_id, body) values (${orderId}, ${body})`;
}

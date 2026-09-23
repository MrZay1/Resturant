"use server";

import { revalidatePath } from "next/cache";
import { updateOrderStatus, addNote, updateShipTo, updateSupplierOrderRef, markOrderShipped, type ShipTo } from "@/lib/orders";
import type { OrderStatus } from "@/lib/orderStatus";
import { sendEmail } from "@/lib/email";
import { renderShippedEmail } from "@/lib/shippedEmail";
import { BRAND } from "@/lib/brand";

export async function setStatus(orderId: number, status: OrderStatus) {
  await updateOrderStatus(orderId, status);
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function addOrderNote(orderId: number, body: string) {
  if (!body.trim()) return;
  await addNote(orderId, body.trim());
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function setShipTo(orderId: number, shipTo: ShipTo) {
  await updateShipTo(orderId, shipTo);
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function setSupplierOrderRef(orderId: number, ref: string) {
  await updateSupplierOrderRef(orderId, ref.trim().slice(0, 200));
  revalidatePath(`/admin/orders/${orderId}`);
}

/**
 * Marks the order shipped and, if email is configured, tells the customer.
 * A failed email never blocks the status change - the order is shipped
 * either way, it just gets a note so it's not silently missed.
 */
export async function markShippedAndNotify(orderId: number) {
  const order = await markOrderShipped(orderId);
  if (order?.contact_email) {
    const mail = renderShippedEmail({ restaurant: order.restaurant_name, cards: order.cards, shipTo: order.ship_to });
    const sent = await sendEmail({ to: order.contact_email, subject: mail.subject, html: mail.html, text: mail.text, replyTo: BRAND.email });
    if (!sent.ok) await addNote(orderId, `Marked shipped, but the customer email failed to send: ${sent.detail}`);
  }
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

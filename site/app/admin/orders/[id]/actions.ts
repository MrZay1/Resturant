"use server";

import { revalidatePath } from "next/cache";
import { updateOrderStatus, addNote } from "@/lib/orders";
import type { OrderStatus } from "@/lib/orderStatus";

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

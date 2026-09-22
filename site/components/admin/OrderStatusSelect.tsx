"use client";

import { useTransition } from "react";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orderStatus";
import { setStatus } from "@/app/(site)/admin/orders/[id]/actions";

export function OrderStatusSelect({ orderId, current }: { orderId: number; current: OrderStatus }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={current}
      disabled={pending}
      onChange={(e) => startTransition(() => setStatus(orderId, e.target.value as OrderStatus))}
      className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm font-medium outline-none focus:border-accent disabled:opacity-60"
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

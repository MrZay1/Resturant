"use client";

import { useTransition } from "react";
import type { ShipTo } from "@/lib/orders";
import { setShipTo } from "@/app/(site)/admin/orders/[id]/actions";

const OPTIONS: { value: ShipTo; label: string }[] = [
  { value: "to_me", label: "To me (hand-deliver)" },
  { value: "direct", label: "Direct to restaurant" },
];

export function ShipToSelect({ orderId, current }: { orderId: number; current: ShipTo }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={current}
      disabled={pending}
      onChange={(e) => startTransition(() => setShipTo(orderId, e.target.value as ShipTo))}
      className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-accent disabled:opacity-60"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

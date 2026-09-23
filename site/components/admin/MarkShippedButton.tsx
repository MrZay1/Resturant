"use client";

import { useState, useTransition } from "react";
import { markShippedAndNotify } from "@/app/(site)/admin/orders/[id]/actions";

export function MarkShippedButton({ orderId, shippedAt }: { orderId: number; shippedAt: string | null }) {
  const [pending, startTransition] = useTransition();
  const [justShipped, setJustShipped] = useState(false);

  if (shippedAt || justShipped) {
    return (
      <p className="text-sm text-accent">
        Shipped {new Date(shippedAt ?? new Date()).toLocaleDateString()}
        {justShipped ? " — customer emailed." : "."}
      </p>
    );
  }

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await markShippedAndNotify(orderId);
          setJustShipped(true);
        })
      }
      className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-accent-2 disabled:opacity-60"
    >
      {pending ? "Marking shipped…" : "Mark shipped & email customer"}
    </button>
  );
}

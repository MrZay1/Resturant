"use client";

import { useRef, useTransition } from "react";
import { setSupplierOrderRef } from "@/app/(site)/admin/orders/[id]/actions";

export function SupplierRefForm({ orderId, current }: { orderId: number; current: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => setSupplierOrderRef(orderId, ref.current?.value ?? ""));
      }}
      className="flex gap-2"
    >
      <input
        ref={ref}
        defaultValue={current}
        placeholder="e.g. supplier confirmation #"
        className="flex-1 rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <button
        disabled={pending}
        className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm font-medium hover:border-ink disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

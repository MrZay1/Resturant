"use client";

import { useRef, useTransition } from "react";
import { addOrderNote } from "@/app/admin/orders/[id]/actions";

export function NoteForm({ orderId }: { orderId: number }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const body = ref.current?.value ?? "";
        startTransition(async () => {
          await addOrderNote(orderId, body);
          if (ref.current) ref.current.value = "";
        });
      }}
      className="flex gap-2"
    >
      <textarea
        ref={ref}
        rows={2}
        placeholder="Add a note for yourself…"
        className="flex-1 rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <button
        disabled={pending}
        className="self-end rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-accent-2 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add"}
      </button>
    </form>
  );
}

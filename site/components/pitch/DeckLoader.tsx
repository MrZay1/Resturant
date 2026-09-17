"use client";

import dynamic from "next/dynamic";

const Deck = dynamic(() => import("./Deck").then((m) => m.Deck), {
  ssr: false,
  loading: () => <div className="fixed inset-0 grid place-items-center bg-[#0a0d0b] text-sm text-paper/60">Loading deck…</div>,
});

export function DeckLoader() {
  return <Deck />;
}

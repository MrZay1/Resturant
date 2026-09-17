"use client";

import dynamic from "next/dynamic";

// Client-only: the tool reads localStorage in its initial state.
const PitchTool = dynamic(() => import("./PitchTool").then((m) => m.PitchTool), {
  ssr: false,
  loading: () => <div className="py-20 text-center text-sm text-muted">Loading your restaurants…</div>,
});

export function PitchToolLoader() {
  return <PitchTool />;
}

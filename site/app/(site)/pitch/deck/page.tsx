import type { Metadata } from "next";
import { DeckLoader } from "@/components/pitch/DeckLoader";

export const metadata: Metadata = {
  title: "Pitch deck",
  robots: { index: false, follow: false },
};

export default function DeckPage() {
  return <DeckLoader />;
}

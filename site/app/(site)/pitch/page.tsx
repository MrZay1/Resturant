import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { PitchToolLoader } from "@/components/pitch/PitchToolLoader";

export const metadata: Metadata = {
  title: "Pitch prep",
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pb-24 pt-10">
        <Container size="wide">
          <Eyebrow>Internal · pitch prep</Eyebrow>
          <h1 className="font-display mt-3 text-4xl leading-none sm:text-5xl">Show them their own card before you walk in.</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Add the restaurant, drop in their logo, and you get all four designs with their name on them, a personalized deck, and an image you can pull up on your phone at the table.
          </p>
          <div className="mt-10">
            <PitchToolLoader />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

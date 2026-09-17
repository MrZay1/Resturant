import type { Metadata } from "next";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Configurator } from "@/components/order/Configurator";
import type { CardTemplate } from "@/components/card/cardSpec";
import { PRICING } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Design and order your cards",
  description: "Design your tap-to-review card, choose a quantity, add the monthly report, and check out securely.",
};

export default async function OrderPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  // The report is included by default; ?report=0 removes it.
  const report = !(sp.report === "0" || sp.report === "false");
  const t = Array.isArray(sp.template) ? sp.template[0] : sp.template;
  const template = (["classic", "noir", "logo", "brand"].includes(t ?? "") ? t : undefined) as CardTemplate | undefined;
  const canceled = sp.canceled === "1";
  const c = Array.isArray(sp.cards) ? sp.cards[0] : sp.cards;
  const n = Number(c);
  const initialCards =
    c !== undefined && Number.isInteger(n) ? Math.min(PRICING.maxCards, Math.max(PRICING.minCards, n)) : PRICING.starterKitCards;
  return (
    <>
      <Nav />
      <main className="flex-1 pb-24 pt-12">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Order</Eyebrow>
            <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Design your card. See it as you go.</h1>
            <p className="mt-4 text-lg text-muted">
              Pick a design, add your name and logo, choose how many. You get a digital design preview before anything prints.
            </p>
            {canceled && (
              <p className="mt-4 rounded-xl bg-paper-2 px-4 py-3 text-sm text-ink-2">
                Checkout was canceled. Your design is still here whenever you are ready.
              </p>
            )}
          </div>
          <div className="mt-12">
            <Configurator initialReport={report} initialTemplate={template} initialCards={initialCards} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

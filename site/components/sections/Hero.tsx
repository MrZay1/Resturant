import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { HeroVisual } from "./HeroVisual";
import { LINKS, PRICING } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 20%, rgba(230,180,85,0.18) 0%, rgba(230,180,85,0) 70%), radial-gradient(45% 45% at 15% 80%, rgba(31,77,58,0.10) 0%, rgba(31,77,58,0) 70%)",
        }}
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="max-w-xl">
          <Eyebrow>For independent restaurants</Eyebrow>
          <h1 className="font-display text-balance mt-5 text-[2.9rem] leading-[0.98] tracking-[-0.015em] sm:text-6xl lg:text-[4.6rem]">
            The review your guests <em className="text-accent">meant</em> to leave.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
            A tap-to-review card your servers drop with the check, and a monthly AI report that tells
            you exactly what guests are saying. More Google reviews. Clearer decisions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={LINKS.order} size="lg">
              Order your cards
            </Button>
            <Button href={LINKS.report} variant="secondary" size="lg">
              Read a sample report
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">
            ${PRICING.cardPrice} per card, one time. Report ${PRICING.monthlyReport}/month, cancel anytime.
            Works with iPhone and Android.
          </p>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Card3D } from "@/components/card/Card3D";
import { DEFAULT_DESIGN, TEMPLATE_META, type CardTemplate } from "@/components/card/cardSpec";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { LINKS } from "@/lib/brand";
import { cn } from "@/lib/cn";

const ORDER: CardTemplate[] = ["classic", "noir", "brand", "logo"];

export function CardShowcase() {
  const [active, setActive] = useState<CardTemplate>("classic");
  const [side, setSide] = useState<"front" | "back">("front");
  const design = { ...DEFAULT_DESIGN, template: active, brandColor: "#7a2e2e" };

  return (
    <Section id="cards" tone="paper">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Eyebrow>The card</Eyebrow>
          <Heading className="mt-4">Looks like it belongs on your table.</Heading>
          <Lede className="mt-5">
            Credit-card size, printed both sides, NFC inside and a QR code on the back. Pick a design
            or send us your logo. You approve a design preview before anything prints.
          </Lede>
          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {ORDER.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all",
                  active === t ? "border-ink bg-white shadow-card" : "border-line bg-transparent hover:border-line-strong"
                )}
                aria-pressed={active === t}
              >
                <div className="text-[15px] font-semibold">{TEMPLATE_META[t].name}</div>
                <div className="mt-1 text-[13px] leading-snug text-muted">{TEMPLATE_META[t].blurb}</div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={LINKS.order}>Design your card</Button>
            <button
              onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
              className="text-sm text-ink-2 underline-offset-4 hover:underline"
            >
              {side === "front" ? "See the back" : "See the front"}
            </button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[560px]">
          <Card3D design={design} side={side} />
          <p className="mt-6 text-center text-xs text-muted">
            Actual size: 85.6 × 54 mm. Works with iPhone XS and newer, and nearly every Android phone.
          </p>
        </div>
      </Container>
    </Section>
  );
}

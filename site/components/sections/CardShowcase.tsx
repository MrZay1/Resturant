"use client";

import { useState } from "react";
import { CardFace } from "@/components/card/CardFace";
import { DEFAULT_DESIGN, TEMPLATE_META, type CardTemplate } from "@/components/card/cardSpec";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { LINKS } from "@/lib/brand";
import { cn } from "@/lib/cn";

const ORDER: CardTemplate[] = ["classic", "noir", "brand", "logo"];

/**
 * Compact by design: a row of clickable, real thumbnails IS the preview, so
 * this doesn't need a separate large live card render to make its point.
 * Keeps the "try a design" interactivity without adding much page height.
 */
export function CardShowcase() {
  const [active, setActive] = useState<CardTemplate>("classic");

  return (
    <Section id="cards" tone="paper">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">The card</Eyebrow>
          <Heading className="mt-4">Looks like it belongs on your table.</Heading>
          <Lede className="mt-5">
            Credit-card size, printed both sides, NFC inside and a QR code on the back. Pick a
            design or send us your logo &mdash; you approve a preview before anything prints.
          </Lede>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {ORDER.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              aria-pressed={active === t}
              className={cn(
                "group overflow-hidden rounded-xl2 border p-2 text-left transition-all",
                active === t ? "border-ink bg-white shadow-card" : "border-line bg-white/60 hover:border-line-strong"
              )}
            >
              <div className="overflow-hidden rounded-md ring-1 ring-black/5">
                <CardFace design={{ ...DEFAULT_DESIGN, template: t, brandColor: "#7a2e2e" }} side="front" />
              </div>
              <div
                className={cn(
                  "mt-2 text-center text-[13px] font-medium transition-colors",
                  active === t ? "text-ink" : "text-muted group-hover:text-ink-2"
                )}
              >
                {TEMPLATE_META[t].name}
              </div>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <Button href={LINKS.order}>Design your card</Button>
          <p className="mt-4 text-xs text-muted">
            Actual size: 85.6 × 54 mm. Works with iPhone XS and newer, and nearly every Android phone.
          </p>
        </div>
      </Container>
    </Section>
  );
}

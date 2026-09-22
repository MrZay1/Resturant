"use client";

import { motion } from "motion/react";
import { Card3D } from "@/components/card/Card3D";
import { DEFAULT_DESIGN } from "@/components/card/cardSpec";
import { Stars } from "@/components/ui/Stars";

/**
 * The homepage hero visual: two cards staged like a print ad rather than a
 * floating app screenshot — a grounded backdrop, a bold corner slogan tag,
 * and a review chip for social proof.
 */
export function HeroVisual() {
  const noir = { ...DEFAULT_DESIGN, template: "noir" as const };
  return (
    <div className="relative mx-auto w-full max-w-[620px] px-3 sm:px-0">
      {/* grounding stage: suggests the cards are sitting on a surface, not floating in an app */}
      <div
        className="pointer-events-none absolute inset-x-[-6%] top-6 bottom-10 -z-10 rounded-[3rem]"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 35%, rgba(31,77,58,0.10) 0%, rgba(31,77,58,0) 65%), linear-gradient(180deg, rgba(21,19,15,0.05) 0%, rgba(21,19,15,0) 40%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-[8%] bottom-6 h-16 rounded-[100%] bg-ink/10 blur-2xl" />

      {/* back card */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -9 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-12 w-[80%]"
      >
        <Card3D design={noir} interactive={false} />
      </motion.div>

      {/* front card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative ml-auto mt-10 w-[88%]"
      >
        <Card3D design={DEFAULT_DESIGN} />
      </motion.div>

      {/* bold corner slogan, staged like a print-ad callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 6 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-3 right-1 z-10 rounded-2xl bg-gold px-4 py-2.5 shadow-lift sm:right-4 sm:px-5 sm:py-3"
      >
        <p className="font-display text-[15px] italic leading-tight text-ink sm:text-lg">
          Take your restaurant
          <br />
          to the next level.
        </p>
      </motion.div>

      {/* review chip */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-6 left-2 w-[300px] rounded-2xl border border-line bg-white p-4 shadow-card sm:-left-6"
      >
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-semibold">New review · just now</div>
          <Stars size="h-3.5 w-3.5" />
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-ink-2">
          “Sat on the patio under the lights and forgot we were in the middle of the city. Ask for
          Marco.”
        </p>
      </motion.div>
      <div className="h-24" />
    </div>
  );
}

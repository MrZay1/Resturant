"use client";

import { motion } from "motion/react";
import { Card3D } from "@/components/card/Card3D";
import { DEFAULT_DESIGN } from "@/components/card/cardSpec";
import { Stars } from "@/components/ui/Stars";

export function HeroVisual() {
  const noir = { ...DEFAULT_DESIGN, template: "noir" as const };
  return (
    <div className="relative mx-auto w-full max-w-[560px] px-3 sm:px-0">
      {/* back card */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -7 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-10 w-[78%]"
      >
        <Card3D design={noir} interactive={false} />
      </motion.div>
      {/* front card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative ml-auto mt-8 w-[86%]"
      >
        <Card3D design={DEFAULT_DESIGN} />
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

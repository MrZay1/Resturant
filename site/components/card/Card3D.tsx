"use client";

import { useRef, useState } from "react";
import { CardFace } from "./CardFace";
import type { CardDesign, CardSide } from "./cardSpec";
import { cn } from "@/lib/cn";

/** A physical-looking card with a subtle tilt on hover. */
export function Card3D({
  design,
  side = "front",
  className,
  interactive = true,
}: {
  design: CardDesign;
  side?: CardSide;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent) {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 10, ry: px * 12 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      className={cn("relative aspect-[85.6/53.98] w-full [perspective:1200px]", className)}
    >
      <div
        className="absolute inset-0 rounded-[6%/9.5%] shadow-lift transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[6%/9.5%] ring-1 ring-black/10">
          <CardFace design={design} side={side} />
          {/* glossy sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.22) 48%, rgba(255,255,255,0) 60%)",
              transform: `translateX(${t.ry * 2}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

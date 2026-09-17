import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

/** The tap mark: a phone-tap ripple. Used as favicon, on cards, and in the wordmark. */
export function TapMark({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <circle cx="16" cy="16" r="3.2" fill={color} />
      <path d="M9.6 9.6a9 9 0 0 0 0 12.8" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22.4 9.6a9 9 0 0 1 0 12.8" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M5.2 5.2a15.3 15.3 0 0 0 0 21.6" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
      <path d="M26.8 5.2a15.3 15.3 0 0 1 0 21.6" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", inverse ? "text-paper" : "text-ink", className)}>
      <span className={cn("grid h-8 w-8 place-items-center rounded-lg", inverse ? "bg-paper text-ink" : "bg-ink text-paper")}>
        <TapMark className="h-5 w-5" />
      </span>
      <span className="font-display text-[1.45rem] leading-none tracking-tight">{BRAND.name}</span>
    </span>
  );
}

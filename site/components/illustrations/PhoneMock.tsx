import { Star } from "@/components/ui/Stars";
import { cn } from "@/lib/cn";

/** A neutral phone frame showing a simplified "write a review" sheet. No Google branding. */
export function PhoneMock({
  restaurant = "Lucia's Trattoria",
  className,
  filled = 0,
  text,
  width = 260,
}: {
  restaurant?: string;
  className?: string;
  filled?: number;
  text?: string;
  width?: number;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] rounded-[2.6rem] bg-ink p-2 shadow-lift ring-1 ring-black/40",
        className
      )}
      style={{ width, maxWidth: "100%" }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[2.1rem] bg-white">
        <div className="h-9" />
        <div className="flex items-center gap-2 px-4 pb-2">
          <div className="h-2 w-2 rounded-full bg-ink/20" />
          <div className="h-2 w-16 rounded bg-ink/10" />
        </div>
        <div className="mx-3 mt-2 rounded-2xl border border-line bg-paper p-3">
          <div className="text-[11px] font-semibold text-ink">{restaurant}</div>
          <div className="mt-0.5 text-[9px] text-muted">Posting publicly</div>
          <div className="mt-3 flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("h-6 w-6", i < filled ? "text-gold" : "text-line-strong")} filled />
            ))}
          </div>
          <div className="mt-3 min-h-16 rounded-lg border border-line bg-white p-2 text-[9px] leading-snug text-ink-2">
            {text ?? <span className="text-muted">Share details of your own experience at this place</span>}
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <div className="rounded-full px-3 py-1 text-[9px] text-muted">Cancel</div>
            <div className="rounded-full bg-accent px-3 py-1 text-[9px] font-semibold text-white">Post</div>
          </div>
        </div>
        <div className="mt-auto mb-2 h-1 w-24 self-center rounded-full bg-ink/20" />
      </div>
    </div>
  );
}

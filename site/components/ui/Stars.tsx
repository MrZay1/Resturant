import { cn } from "@/lib/cn";

export function Star({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2.5l2.94 6.26 6.86.78-5.08 4.7 1.36 6.78L12 17.6l-6.08 3.42 1.36-6.78-5.08-4.7 6.86-.78L12 2.5z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Stars({
  count = 5,
  value = 5,
  className,
  size = "h-4 w-4",
}: {
  count?: number;
  value?: number;
  className?: string;
  size?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-0.5 text-gold", className)} role="img" aria-label={`${value} out of ${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={size} filled={i < Math.round(value)} />
      ))}
    </div>
  );
}

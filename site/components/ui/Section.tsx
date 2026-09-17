import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "paper-2" | "dark" | "white";
}) {
  const tones = {
    paper: "bg-paper text-ink",
    "paper-2": "bg-paper-2 text-ink",
    white: "bg-white text-ink",
    dark: "bg-dark text-paper",
  };
  return (
    <section id={id} className={cn("py-20 sm:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em]",
        tone === "inverse" ? "text-gold" : "text-accent",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone === "inverse" ? "bg-gold" : "bg-accent")} />
      {children}
    </div>
  );
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md" | "sm";
}) {
  const sizes = {
    xl: "text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]",
    lg: "text-4xl leading-[1.05] sm:text-5xl",
    md: "text-3xl leading-[1.1] sm:text-4xl",
    sm: "text-2xl leading-[1.15] sm:text-3xl",
  };
  return (
    <Tag className={cn("font-display text-balance", sizes[size], className)}>{children}</Tag>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-lg leading-relaxed text-muted sm:text-xl", className)}>{children}</p>
  );
}

import { Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Readable long-form typography for legal and guide pages.
 * No typography plugin is installed, so element styles are applied
 * with arbitrary child selectors.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-[17px] leading-[1.7] text-ink-2",
        // Headings
        "[&_h2]:font-display [&_h2]:text-[1.9rem] [&_h2]:leading-[1.15] [&_h2]:text-ink [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-24",
        "[&_h3]:text-[1.05rem] [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-2",
        // Paragraphs and emphasis
        "[&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-ink",
        // Links
        "[&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-[3px] hover:[&_a]:decoration-accent",
        // Lists
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_li]:pl-1 [&_li::marker]:text-muted",
        // Tables
        "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px]",
        "[&_th]:border-b [&_th]:border-line-strong [&_th]:py-2.5 [&_th]:pr-4 [&_th]:text-left [&_th]:text-[12px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:text-muted",
        "[&_td]:border-b [&_td]:border-line [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top",
        // Hairline rule
        "[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-line",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Small note box for callouts inside Prose (e.g. "This is a draft"). */
export function ProseNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-line bg-white p-5 text-[15px] leading-relaxed text-ink-2 shadow-card">
      {children}
    </div>
  );
}

/** Shared header block for legal pages: eyebrow, serif title, last-updated line. */
export function LegalHeader({
  title,
  updated,
  intro,
}: {
  title: string;
  updated: string;
  intro?: ReactNode;
}) {
  return (
    <header className="border-b border-line pb-10">
      <Eyebrow>Legal</Eyebrow>
      <Heading as="h1" size="lg" className="mt-4">
        {title}
      </Heading>
      <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
      {intro ? <Lede className="mt-6">{intro}</Lede> : null}
    </header>
  );
}

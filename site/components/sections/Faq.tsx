"use client";

import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lede, Section } from "@/components/ui/Section";
import { LINKS } from "@/lib/brand";
import { cn } from "@/lib/cn";

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function FaqAccordion({
  items,
  defaultOpen,
  className,
}: {
  items: FaqItem[];
  defaultOpen?: number;
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          id={slug(item.q)}
          open={defaultOpen === i ? true : undefined}
          className="group scroll-mt-24"
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left",
              "text-[17px] font-medium leading-snug text-ink transition-colors hover:text-accent",
              "[&::-webkit-details-marker]:hidden"
            )}
          >
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong bg-white",
                "transition-transform duration-300 ease-out group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-paper"
              )}
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </span>
          </summary>
          <div className="pb-6 pr-10 text-[15.5px] leading-relaxed text-ink-2 sm:pr-16">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({
  items,
  title = "Questions, answered.",
  eyebrow = "FAQ",
  lede,
  showAllLink = false,
  tone = "paper",
  id,
}: {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  lede?: string;
  showAllLink?: boolean;
  tone?: "paper" | "paper-2" | "white";
  id?: string;
}) {
  return (
    <Section tone={tone} id={id}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading size="lg" className="mt-4">
              {title}
            </Heading>
            <Lede className="mt-5 max-w-md">
              {lede ??
                "Plain answers to what owners ask before they order. If yours is not here, email us and a person replies."}
            </Lede>
            {showAllLink && (
              <Button href={LINKS.faq} variant="secondary" className="mt-8">
                See all questions
              </Button>
            )}
          </div>
          <FaqAccordion items={items} />
        </div>
      </Container>
    </Section>
  );
}

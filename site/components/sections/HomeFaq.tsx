// Thin wrapper so the home page does not depend on the FAQ component's exact API.
import { FaqSection } from "@/components/sections/Faq";
import { HOME_FAQ } from "@/data/faq";

export function HomeFaq() {
  return (
    <FaqSection
      items={HOME_FAQ}
      eyebrow="Questions"
      title="Things owners ask us first."
      showAllLink
    />
  );
}

import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lede, Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/Faq";
import { FAQ, faqByGroup } from "@/data/faq";
import { BRAND, LINKS } from "@/lib/brand";

export const metadata = {
  title: "FAQ",
  description: `Plain answers about ${BRAND.name} tap-to-review cards, which phones work, Google's rules on asking for reviews, the monthly report, pricing and getting started.`,
};

function groupId(group: string) {
  return group.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function FaqPage() {
  const groups = faqByGroup(FAQ);

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pb-12 sm:pb-16">
          <Container size="narrow">
            <Eyebrow>FAQ</Eyebrow>
            <Heading as="h1" size="xl" className="mt-5">
              Everything owners ask before they order.
            </Heading>
            <Lede className="mt-6 max-w-2xl">
              Short, honest answers about the cards, the phones, Google&apos;s rules, the monthly
              report and what it all costs. If your question is not here, email{" "}
              <a href={`mailto:${BRAND.email}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                {BRAND.email}
              </a>{" "}
              and a person replies.
            </Lede>
            <nav aria-label="FAQ sections" className="mt-10 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a
                  key={g.group}
                  href={`#${groupId(g.group)}`}
                  className="rounded-full border border-line-strong bg-white px-4 py-2 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink"
                >
                  {g.group}
                </a>
              ))}
            </nav>
          </Container>
        </Section>

        <Section tone="white" className="pt-12 sm:pt-16">
          <Container>
            <div className="space-y-20 sm:space-y-24">
              {groups.map((g) => (
                <div
                  key={g.group}
                  id={groupId(g.group)}
                  className="grid gap-8 scroll-mt-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
                >
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <Heading as="h2" size="md">
                      {g.group}
                    </Heading>
                    <p className="mt-3 text-sm text-muted">
                      {g.items.length} {g.items.length === 1 ? "question" : "questions"}
                    </p>
                  </div>
                  <FaqAccordion items={g.items} />
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section tone="paper-2">
          <Container size="narrow" className="text-center">
            <Heading size="md">Still have a question?</Heading>
            <Lede className="mx-auto mt-4 max-w-xl">
              Book a fifteen minute demo, or order a starter kit and see the cards on your own tables.
            </Lede>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={LINKS.demo} variant="secondary">
                Book a demo
              </Button>
              <Button href={LINKS.order}>Order cards</Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

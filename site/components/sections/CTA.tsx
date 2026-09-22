import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Section";
import { LINKS, BRAND } from "@/lib/brand";

export function CTA({
  title = "See it work on your own phone.",
  body = `We will build a demo card for your restaurant before we visit. You tap it, your Google review page opens, and we walk through a sample report with your name on it.`,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden texture-lines mesh-dark py-24 text-paper">
      <Container className="relative text-center">
        <Heading className="mx-auto max-w-3xl text-paper" size="lg">
          {title}
        </Heading>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/70">{body}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={LINKS.demo} variant="gold" size="lg">
            Book a demo
          </Button>
          <Button href={LINKS.order} variant="inverse" size="lg">
            Order cards
          </Button>
        </div>
        <p className="mt-6 text-sm text-paper/50">
          Or email {BRAND.email}. {BRAND.name} is built by a small team that answers its own email.
        </p>
      </Container>
    </section>
  );
}

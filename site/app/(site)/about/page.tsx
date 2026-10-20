import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Isiah Cameron",
  description: `Meet Isiah Cameron, the person behind ${BRAND.name}. Questions about cards, plans or an existing order? Email ${BRAND.email}.`,
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-14 sm:pt-20">
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div className="max-w-xl">
                <Eyebrow>The person behind {BRAND.name}</Eyebrow>
                <Heading as="h1" size="xl" className="mt-5">Hi, I&rsquo;m Isiah Cameron.</Heading>
                <Lede className="mt-6">I help restaurant owners turn a great meal into a review&mdash;and a first visit into a reason to come back.</Lede>
                <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-2 sm:text-lg">
                  <p>{BRAND.name} brings together custom tap-to-review cards and a Regulars Program for staying in touch with guests. The idea is simple: make it easy for guests to share their experience and keep your restaurant in mind.</p>
                  <p>Have a question before you order, need help with your card design, or want to check on an existing order? You can reach me directly at the email below.</p>
                </div>
              </div>
              <aside aria-labelledby="contact-isiah" className="min-w-0 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-9">
                <div aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-2xl bg-accent font-display text-3xl text-paper">IC</div>
                <h2 id="contact-isiah" className="font-display mt-6 text-3xl">Let&rsquo;s talk.</h2>
                <p className="mt-3 leading-relaxed text-muted">For questions about {BRAND.name}, your order, or which plan fits your restaurant, email me directly.</p>
                <a href={`mailto:${BRAND.email}`} className="mt-6 flex w-fit max-w-full items-center gap-3 text-lg font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent sm:text-xl">
                  <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="break-all">{BRAND.email}</span>
                </a>
                <Button href={`mailto:${BRAND.email}`} className="mt-7 w-full">Email Isiah <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Button>
                <p className="mt-4 text-sm leading-relaxed text-muted">If the button doesn&rsquo;t open your email app, copy the address above into your email service. For an existing order, include your restaurant name so I can find it.</p>
              </aside>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

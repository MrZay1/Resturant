import { Mail } from "lucide-react";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Section, Eyebrow, Heading, Lede } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { BRAND, LINKS } from "@/lib/brand";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description: `Questions about ${BRAND.name} cards or the monthly report? Send us a note and we will reply within one business day.`,
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pt-14 sm:pt-20">
          <Container size="wide">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 xl:gap-24">
              <div className="max-w-lg">
                <Eyebrow>Contact</Eyebrow>
                <Heading as="h1" size="xl" className="mt-5">
                  Ask us anything
                </Heading>
                <Lede className="mt-6">
                  Questions about the cards, the report, or whether this fits your restaurant. Send a
                  note and a person will reply within one business day.
                </Lede>

                <div className="mt-10 space-y-6 border-t border-line pt-8 text-[15px] leading-relaxed text-ink-2">
                  <p className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      Prefer email?{" "}
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                      >
                        {BRAND.email}
                      </a>
                    </span>
                  </p>
                  <p className="text-muted">
                    Want to see it work first?{" "}
                    <Link href={LINKS.demo} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                      Book a demo
                    </Link>{" "}
                    and we will bring a card made for your restaurant. Quick answers may already be in the{" "}
                    <Link href={LINKS.faq} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                      FAQ
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
                  <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">Send a message</h2>
                  <p className="mt-2 text-sm text-muted">We read every one.</p>
                  <div className="mt-7 border-t border-line pt-7">
                    <LeadForm kind="contact" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

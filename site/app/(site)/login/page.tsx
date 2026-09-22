import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lede, Section } from "@/components/ui/Section";
import { BRAND, LINKS } from "@/lib/brand";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Restaurant login",
  description: `Sign in to your ${BRAND.name} dashboard to see your monthly AI review report.`,
};

/**
 * Placeholder for the restaurant-owner dashboard (reports, review history).
 * That product isn't built yet, so this page is honest about it rather than
 * a dead link or a login form with nothing behind it. Swap this out once the
 * dashboard ships.
 */
export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section tone="paper" className="pb-20 sm:pb-28">
          <Container size="narrow" className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink text-paper">
              <Lock className="h-6 w-6" />
            </div>
            <Eyebrow className="mt-6">Restaurant login</Eyebrow>
            <Heading as="h1" size="xl" className="mt-5">
              Your dashboard is on the way.
            </Heading>
            <Lede className="mx-auto mt-6 max-w-lg">
              We&apos;re building an online dashboard where you&apos;ll be able to sign in and see your
              monthly AI review report, past reports, and your card order history. It isn&apos;t live
              yet &mdash; for now, your report is emailed directly to you every month.
            </Lede>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={`mailto:${BRAND.email}`} size="lg">
                Email us for your report
              </Button>
              <Button href={LINKS.order} variant="secondary" size="lg">
                Order cards
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

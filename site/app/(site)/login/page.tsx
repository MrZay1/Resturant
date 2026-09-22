import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lede, Section } from "@/components/ui/Section";
import { LoginForm } from "@/components/customer/LoginForm";
import { BRAND } from "@/lib/brand";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Restaurant login",
  description: `Sign in to your ${BRAND.name} dashboard to see your monthly AI review report.`,
  robots: { index: false, follow: false },
};

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
              Welcome back.
            </Heading>
            <Lede className="mx-auto mt-6 max-w-lg">
              Sign in to see your card order status, your Google review link, and request
              replacement cards. Your account was created right after checkout &mdash; check the
              order confirmation email if you can&apos;t remember your login.
            </Lede>
            <LoginForm />
            <p className="mt-6 text-sm text-muted">
              Trouble signing in? Email{" "}
              <a href={`mailto:${BRAND.email}`} className="font-medium text-ink underline-offset-4 hover:underline">
                {BRAND.email}
              </a>
              .
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

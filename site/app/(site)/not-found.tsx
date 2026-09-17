import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { LINKS } from "@/lib/brand";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Container size="narrow" className="py-32 text-center">
          <Eyebrow className="justify-center">404</Eyebrow>
          <h1 className="font-display mt-4 text-5xl">This table is empty.</h1>
          <p className="mt-4 text-lg text-muted">The page you tapped does not exist. Try one of these.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/">Home</Button>
            <Button href={LINKS.report} variant="secondary">Sample report</Button>
            <Button href={LINKS.order} variant="secondary">Order cards</Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

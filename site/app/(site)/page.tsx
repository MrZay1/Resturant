import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyReviewsMatter } from "@/components/sections/WhyReviewsMatter";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { ReportPreview } from "@/components/sections/ReportPreview";
import { WhyItWorks } from "@/components/sections/WhyItWorks";
import { PricingSummary } from "@/components/sections/PricingSummary";
import { CTA } from "@/components/sections/CTA";
import { HomeFaq } from "@/components/sections/HomeFaq";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhyReviewsMatter />
        <CardShowcase />
        <ReportPreview />
        <WhyItWorks />
        <PricingSummary />
        <HomeFaq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

import { HeroNav } from "@/features/marketing/components/hero-nav";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { PainPointSection } from "@/features/marketing/components/pain-point-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { TestimonialsSection } from "@/features/marketing/components/testimonials-section";
import { ComparisonSection } from "@/features/marketing/components/comparison-section";
import { FoundersQuoteSection } from "@/features/marketing/components/founders-quote-section";
import { FooterV2 } from "@/features/marketing/components/site-footer-v2";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroNav />
      <main className="relative z-0">
        <HeroSection />
        <PainPointSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ComparisonSection />
        <FoundersQuoteSection />
      </main>
      <FooterV2 />
    </div>
  );
}

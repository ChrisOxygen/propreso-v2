import { HeroNav } from "@/features/marketing/components/hero-nav";
import { FooterV2 } from "@/features/marketing/components/site-footer-v2";
import { PricingPlansSection } from "@/features/marketing/components/pricing-plans-section";
import { PricingComparisonSection } from "@/features/marketing/components/pricing-comparison-section";
import { PricingFaqSection } from "@/features/marketing/components/pricing-faq-section";

export const metadata = {
  title: "Pricing — Propreso",
  description:
    "Simple, transparent pricing. Start free with 10 proposals. Upgrade to Pro for $6/month when you're ready to scale.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <HeroNav />
      <main className="relative z-0">
        <PricingPlansSection />
        <PricingComparisonSection />
        <PricingFaqSection />
      </main>
      <FooterV2 />
    </div>
  );
}

import { HeroNav } from "@/features/marketing/components/hero-nav";
import { AboutHeroSection } from "@/features/marketing/components/about-hero-section";
import { AboutFounderSection } from "@/features/marketing/components/about-founder-section";
import { AboutValuesSection } from "@/features/marketing/components/about-values-section";
import { AboutStatsSection } from "@/features/marketing/components/about-stats-section";
import { AboutContactSection } from "@/features/marketing/components/about-contact-section";
import { FooterV2 } from "@/features/marketing/components/site-footer-v2";

export const metadata = {
  title: "About — Propreso",
  description:
    "Propreso was built by a freelancer, for freelancers. Learn the story behind the tool, our mission, and what we believe.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroNav />
      <main className="relative z-0">
        <AboutHeroSection />
        <AboutFounderSection />
        <AboutValuesSection />
        <AboutStatsSection />
        <AboutContactSection />
      </main>
      <FooterV2 />
    </div>
  );
}

import { HeroNav } from "@/features/marketing/components/hero-nav";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { PainPointSection } from "@/features/marketing/components/pain-point-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroNav />
      <main>
        <HeroSection />
        <PainPointSection />
        <HowItWorksSection />
      </main>
    </div>
  );
}

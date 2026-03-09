import { HeroNav } from "@/features/marketing/components/hero-nav";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { PainPointSection } from "@/features/marketing/components/pain-point-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroNav />
      <main>
        <HeroSection />
        <PainPointSection />
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { HeroNav } from "@/features/marketing/components/hero-nav";
import { ContactSection } from "@/features/marketing/components/contact-section";
import { FooterV2 } from "@/features/marketing/components/site-footer-v2";

export const metadata: Metadata = {
  title: "Contact — Propreso",
  description:
    "Have a question about Propreso? Reach out — we read every message and reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroNav />
      <main>
        <ContactSection />
      </main>
      <FooterV2 />
    </div>
  );
}

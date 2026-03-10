import type { Metadata } from "next";
import {
  LegalPageWrapper,
  LegalSection,
  LegalSubSection,
  LegalList,
  LegalDisclaimer,
} from "@/features/marketing/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Terms of Service — Propreso",
  description:
    "Read the terms and conditions governing your use of Propreso.",
};

const TOC = [
  { id: "acceptance", number: "1", title: "Acceptance of Terms" },
  { id: "eligibility", number: "2", title: "Eligibility" },
  { id: "description", number: "3", title: "Description of Service" },
  { id: "account-registration", number: "4", title: "Account Registration" },
  { id: "subscriptions", number: "5", title: "Subscriptions and Payments" },
  { id: "acceptable-use", number: "6", title: "Acceptable Use" },
  { id: "ai-content", number: "7", title: "AI-Generated Content" },
  { id: "intellectual-property", number: "8", title: "Intellectual Property" },
  { id: "third-party", number: "9", title: "Third-Party Services" },
  { id: "privacy", number: "10", title: "Privacy" },
  { id: "disclaimer", number: "11", title: "Disclaimer of Warranties" },
  { id: "liability", number: "12", title: "Limitation of Liability" },
  { id: "indemnification", number: "13", title: "Indemnification" },
  { id: "termination", number: "14", title: "Termination" },
  { id: "governing-law", number: "15", title: "Governing Law" },
  { id: "changes", number: "16", title: "Changes to These Terms" },
  { id: "contact", number: "17", title: "Contact" },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageWrapper
      title="Terms of Service"
      dateLabel="Effective Date"
      date="March 10, 2026"
      toc={TOC}
      sibling={{ href: "/privacy-policy", label: "Privacy Policy" }}
    >
      {/* 1. Acceptance of Terms */}
      <LegalSection id="acceptance" number="1" title="Acceptance of Terms">
        <p>
          By accessing or using propreso.com (&ldquo;Propreso&rdquo;,
          &ldquo;the Service&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;), you agree to be bound by these Terms of Service
          (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not
          use the Service. These Terms constitute a legally binding agreement
          between you and Chris Okafor, the individual operating Propreso as a
          sole proprietor under the laws of the Federal Republic of Nigeria.
        </p>
      </LegalSection>

      {/* 2. Eligibility */}
      <LegalSection id="eligibility" number="2" title="Eligibility">
        <p>
          You must be at least 18 years of age to use Propreso. By using the
          Service, you represent and warrant that:
        </p>
        <LegalList
          items={[
            "You are at least 18 years old;",
            "You have the legal capacity to enter into a binding agreement;",
            "You are not barred from using the Service under any applicable law.",
          ]}
        />
      </LegalSection>

      {/* 3. Description of Service */}
      <LegalSection
        id="description"
        number="3"
        title="Description of Service"
      >
        <p>
          Propreso is an AI-powered proposal generation platform designed for
          freelancers and independent contractors. The Service allows users to
          create, manage, and send professional proposals to prospective
          clients. Features include AI-assisted writing, template management,
          proposal tracking, and subscription-based access to premium
          capabilities.
        </p>
      </LegalSection>

      {/* 4. Account Registration */}
      <LegalSection
        id="account-registration"
        number="4"
        title="Account Registration"
      >
        <p>
          To access certain features of the Service, you must register for an
          account. You agree to:
        </p>
        <LegalList
          items={[
            "Provide accurate, current, and complete information during registration;",
            "Maintain and promptly update your account information;",
            "Keep your password confidential and not share access with third parties;",
            <>
              Notify us immediately at{" "}
              <span className="text-primary font-medium">
                hello@propreso.com
              </span>{" "}
              if you suspect unauthorised access to your account;
            </>,
            "Accept responsibility for all activity that occurs under your account.",
          ]}
        />
      </LegalSection>

      {/* 5. Subscriptions and Payments */}
      <LegalSection
        id="subscriptions"
        number="5"
        title="Subscriptions and Payments"
      >
        <LegalSubSection number="5.1" title="Plans">
          <p>
            Propreso offers free and paid subscription plans. Paid plans are
            billed on a recurring basis (monthly or annually) as indicated at
            the time of purchase.
          </p>
        </LegalSubSection>

        <LegalSubSection number="5.2" title="Billing">
          <p>
            Payments are processed securely by Stripe. By subscribing to a paid
            plan, you authorise Propreso to charge your payment method on a
            recurring basis until you cancel. All fees are stated in United
            States Dollars (USD) unless otherwise specified.
          </p>
        </LegalSubSection>

        <LegalSubSection number="5.3" title="No Refund Policy">
          <p>
            All subscription fees are non-refundable. This includes partial
            billing periods, unused features, and situations where you choose to
            cancel before your current billing period ends. Upon cancellation,
            you will retain access to paid features until the end of your
            current billing cycle, after which your account will revert to the
            free tier. We do not offer pro-rated refunds for any reason.
          </p>
        </LegalSubSection>

        <LegalSubSection number="5.4" title="Cancellation">
          <p>
            You may cancel your subscription at any time from your account
            settings. Cancellation takes effect at the end of the current
            billing period. We reserve the right to modify pricing with
            reasonable advance notice.
          </p>
        </LegalSubSection>
      </LegalSection>

      {/* 6. Acceptable Use */}
      <LegalSection id="acceptable-use" number="6" title="Acceptable Use">
        <p>You agree not to use the Service to:</p>
        <LegalList
          items={[
            "Violate any applicable local, national, or international law or regulation;",
            "Transmit unsolicited communications (spam) or harass any person;",
            "Upload or transmit viruses, malware, or any other harmful code;",
            "Attempt to gain unauthorised access to any part of the Service or its infrastructure;",
            "Reproduce, duplicate, copy, sell, or resell any part of the Service without express written permission;",
            "Use automated means (bots, scrapers) to extract data from the Service;",
            "Impersonate any person or entity or misrepresent your affiliation.",
          ]}
        />
      </LegalSection>

      {/* 7. AI-Generated Content */}
      <LegalSection id="ai-content" number="7" title="AI-Generated Content">
        <p>
          Propreso uses artificial intelligence to assist in generating proposal
          content. You acknowledge that:
        </p>
        <LegalList
          items={[
            "AI-generated content is provided as a starting point and may require review, editing, and verification before use;",
            "You are solely responsible for reviewing all AI-generated content before sending it to any third party;",
            "Propreso does not warrant the accuracy, completeness, or suitability of any AI-generated output;",
            "Your use of AI-generated content for any purpose is entirely at your own risk.",
          ]}
        />
      </LegalSection>

      {/* 8. Intellectual Property */}
      <LegalSection
        id="intellectual-property"
        number="8"
        title="Intellectual Property"
      >
        <LegalSubSection number="8.1" title="Your Content">
          <p>
            You retain full ownership of all content you input into Propreso,
            including business information, proposal text, and client data
            (&ldquo;Your Content&rdquo;). By using the Service, you grant
            Propreso a limited, non-exclusive, royalty-free licence to process
            and store Your Content solely to the extent necessary to provide the
            Service.
          </p>
        </LegalSubSection>

        <LegalSubSection number="8.2" title="Our Content">
          <p>
            The Propreso brand, logo, website design, software, and all related
            intellectual property are the exclusive property of Chris Okafor.
            Nothing in these Terms transfers any ownership rights to you.
          </p>
        </LegalSubSection>
      </LegalSection>

      {/* 9. Third-Party Services */}
      <LegalSection id="third-party" number="9" title="Third-Party Services">
        <p>
          Propreso integrates with third-party services including Stripe
          (payments), Supabase (database), OpenRouter (AI inference), PostHog
          (analytics), and Sentry (error monitoring). Your use of these services
          is subject to their respective terms and privacy policies. Propreso is
          not responsible for the acts or omissions of any third-party provider.
        </p>
      </LegalSection>

      {/* 10. Privacy */}
      <LegalSection id="privacy" number="10" title="Privacy">
        <p>
          Your use of the Service is also governed by our Privacy Policy,
          available at{" "}
          <span className="text-primary font-medium">
            propreso.com/privacy
          </span>
          , which is incorporated into these Terms by reference.
        </p>
      </LegalSection>

      {/* 11. Disclaimer of Warranties */}
      <LegalSection
        id="disclaimer"
        number="11"
        title="Disclaimer of Warranties"
      >
        <LegalDisclaimer>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, express or implied,
            including but not limited to warranties of merchantability, fitness
            for a particular purpose, or non-infringement. Propreso does not
            warrant that the Service will be uninterrupted, error-free, or free
            of viruses or other harmful components.
          </p>
        </LegalDisclaimer>
      </LegalSection>

      {/* 12. Limitation of Liability */}
      <LegalSection
        id="liability"
        number="12"
        title="Limitation of Liability"
      >
        <LegalDisclaimer>
          <p>
            To the maximum extent permitted by applicable law, Chris Okafor
            (operating as Propreso) shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss
            of profits, revenue, data, or goodwill, arising out of or in
            connection with your use of the Service, even if advised of the
            possibility of such damages. Our total liability to you for any
            claims arising from your use of the Service shall not exceed the
            total amount you paid to Propreso in the three (3) months preceding
            the claim.
          </p>
        </LegalDisclaimer>
      </LegalSection>

      {/* 13. Indemnification */}
      <LegalSection id="indemnification" number="13" title="Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Chris Okafor
          (operating as Propreso) and any affiliated persons from and against
          any claims, liabilities, damages, losses, and expenses (including
          reasonable legal fees) arising out of or in connection with: (a) your
          use of the Service; (b) your violation of these Terms; or (c) your
          violation of any third-party rights.
        </p>
      </LegalSection>

      {/* 14. Termination */}
      <LegalSection id="termination" number="14" title="Termination">
        <p>
          We may suspend or terminate your account at any time, with or without
          notice, for conduct that we believe violates these Terms or is harmful
          to other users, us, or third parties, or for any other reason at our
          sole discretion. Upon termination, your right to use the Service
          ceases immediately. Provisions of these Terms that by their nature
          should survive termination shall survive.
        </p>
      </LegalSection>

      {/* 15. Governing Law and Dispute Resolution */}
      <LegalSection
        id="governing-law"
        number="15"
        title="Governing Law and Dispute Resolution"
      >
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the Federal Republic of Nigeria, without regard to its conflict of
          law provisions. Any dispute arising out of or in connection with these
          Terms shall be subject to the exclusive jurisdiction of the courts of
          the Federal Republic of Nigeria. You agree to first attempt to resolve
          any dispute informally by contacting us at{" "}
          <span className="text-primary font-medium">hello@propreso.com</span>.
        </p>
      </LegalSection>

      {/* 16. Changes to These Terms */}
      <LegalSection
        id="changes"
        number="16"
        title="Changes to These Terms"
      >
        <p>
          We reserve the right to modify these Terms at any time. We will notify
          you of material changes by posting the updated Terms on propreso.com
          and updating the effective date above. Your continued use of the
          Service after such changes constitutes your acceptance of the revised
          Terms.
        </p>
      </LegalSection>

      {/* 17. Contact */}
      <LegalSection id="contact" number="17" title="Contact">
        <p>
          For questions about these Terms, please contact us at:
        </p>
        <div className="mt-4 bg-card border border-border rounded-xl p-5 space-y-1">
          <p className="font-heading font-semibold text-[14px] text-foreground">
            Chris Okafor (operating as Propreso)
          </p>
          <p>
            Email:{" "}
            <span className="text-primary font-medium">hello@propreso.com</span>
          </p>
          <p>
            Website:{" "}
            <span className="text-primary font-medium">propreso.com</span>
          </p>
        </div>
      </LegalSection>
    </LegalPageWrapper>
  );
}

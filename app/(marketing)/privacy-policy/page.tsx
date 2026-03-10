import type { Metadata } from "next";
import {
  LegalPageWrapper,
  LegalSection,
  LegalSubSection,
  LegalList,
} from "@/features/marketing/components/legal-page-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy — Propreso",
  description:
    "Learn how Propreso collects, uses, and protects your personal information.",
};

const TOC = [
  { id: "introduction", number: "1", title: "Introduction" },
  { id: "information-we-collect", number: "2", title: "Information We Collect" },
  { id: "how-we-use", number: "3", title: "How We Use Your Information" },
  { id: "ai-processing", number: "4", title: "AI Processing and Your Data" },
  { id: "third-party", number: "5", title: "Third-Party Service Providers" },
  { id: "data-retention", number: "6", title: "Data Retention" },
  { id: "data-security", number: "7", title: "Data Security" },
  { id: "international-transfers", number: "8", title: "International Data Transfers" },
  { id: "your-rights", number: "9", title: "Your Rights" },
  { id: "childrens-privacy", number: "10", title: "Children's Privacy" },
  { id: "changes", number: "11", title: "Changes to This Policy" },
  { id: "contact", number: "12", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageWrapper
      title="Privacy Policy"
      dateLabel="Last Updated"
      date="March 10, 2026"
      toc={TOC}
      sibling={{ href: "/terms-of-service", label: "Terms of Service" }}
    >
      {/* 1. Introduction */}
      <LegalSection id="introduction" number="1" title="Introduction">
        <p>
          This Privacy Policy explains how Chris Okafor, operating as Propreso
          (&ldquo;Propreso&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;), collects, uses, discloses, and protects
          information about you when you use propreso.com and related services.
          We are committed to protecting your privacy and handling your data
          responsibly.
        </p>
        <p>
          By using Propreso, you agree to the collection and use of information
          in accordance with this policy.
        </p>
      </LegalSection>

      {/* 2. Information We Collect */}
      <LegalSection
        id="information-we-collect"
        number="2"
        title="Information We Collect"
      >
        <LegalSubSection number="2.1" title="Information You Provide">
          <p>We collect information you directly provide when you:</p>
          <LegalList
            items={[
              <>
                <span className="text-foreground font-medium">
                  Create an account:
                </span>{" "}
                name, email address, and password;
              </>,
              <>
                <span className="text-foreground font-medium">
                  Complete your profile:
                </span>{" "}
                business name, freelance category, and other professional
                details;
              </>,
              <>
                <span className="text-foreground font-medium">
                  Create proposals:
                </span>{" "}
                proposal content, client names, project descriptions, and
                pricing information;
              </>,
              <>
                <span className="text-foreground font-medium">
                  Subscribe to a paid plan:
                </span>{" "}
                billing details processed and stored by Stripe — we do not store
                full card numbers;
              </>,
              <>
                <span className="text-foreground font-medium">Contact us:</span>{" "}
                any information included in your communications.
              </>,
            ]}
          />
        </LegalSubSection>

        <LegalSubSection number="2.2" title="Information Collected Automatically">
          <p>When you use the Service, we automatically collect:</p>
          <LegalList
            items={[
              <>
                <span className="text-foreground font-medium">Usage data:</span>{" "}
                pages visited, features used, clicks, and session duration;
              </>,
              <>
                <span className="text-foreground font-medium">
                  Device and browser information:
                </span>{" "}
                browser type, operating system, and screen resolution;
              </>,
              "IP address and approximate location (country/city level);",
              <>
                <span className="text-foreground font-medium">
                  Error and performance data:
                </span>{" "}
                crash reports and performance metrics.
              </>,
            ]}
          />
        </LegalSubSection>

        <LegalSubSection number="2.3" title="Cookies and Tracking Technologies">
          <p>
            We use cookies and similar technologies to maintain your session,
            remember your preferences, and understand how the Service is used.
            You may control cookie behaviour through your browser settings,
            though disabling cookies may affect functionality.
          </p>
        </LegalSubSection>
      </LegalSection>

      {/* 3. How We Use Your Information */}
      <LegalSection
        id="how-we-use"
        number="3"
        title="How We Use Your Information"
      >
        <p>We use the information we collect to:</p>
        <LegalList
          items={[
            "Provide, operate, and maintain the Service;",
            "Process payments and manage your subscription via Stripe;",
            "Generate AI-assisted proposal content using your inputs via OpenRouter;",
            "Send transactional emails (account confirmations, billing receipts, password resets);",
            "Monitor and improve Service performance and reliability;",
            "Diagnose technical issues and fix bugs;",
            "Analyse usage patterns to improve the product;",
            "Respond to your support enquiries;",
            "Comply with legal obligations.",
          ]}
        />
        <p className="mt-4">
          We do not sell your personal data to third parties. We do not use your
          data for behavioural advertising.
        </p>
      </LegalSection>

      {/* 4. AI Processing and Your Data */}
      <LegalSection
        id="ai-processing"
        number="4"
        title="AI Processing and Your Data"
      >
        <p>
          When you use Propreso&apos;s AI proposal generation features, relevant
          portions of your input (such as project descriptions, skills, and
          client context) are transmitted to OpenRouter, our AI inference
          provider, to generate proposal content.
        </p>
        <LegalList
          items={[
            "OpenRouter processes your data solely to return a response and does not use API-submitted data to train AI models;",
            "We do not use your proposal data to fine-tune or train any AI model;",
            "AI-generated outputs are associated with your account and stored in our database to deliver the Service.",
          ]}
        />
        <p className="mt-4">
          You should avoid including sensitive personal data (e.g. national ID
          numbers, financial account details) in proposal inputs beyond what is
          necessary for your proposal.
        </p>
      </LegalSection>

      {/* 5. Third-Party Service Providers */}
      <LegalSection
        id="third-party"
        number="5"
        title="Third-Party Service Providers"
      >
        <p>
          We share data with the following third-party providers strictly as
          necessary to deliver the Service:
        </p>

        <div className="mt-5 space-y-5">
          {[
            {
              name: "Stripe",
              desc: "Payment processing. Stripe stores your billing information under their own PCI-compliant infrastructure.",
              policy: "stripe.com/privacy",
            },
            {
              name: "Supabase",
              desc: "Database and authentication infrastructure. Your account and proposal data is stored in Supabase.",
              policy: "supabase.com/privacy",
            },
            {
              name: "OpenRouter",
              desc: "AI inference routing. Proposal generation inputs are sent to OpenRouter. They do not train on API data.",
              policy: "openrouter.ai/privacy",
            },
            {
              name: "PostHog",
              desc: "Product analytics. We use PostHog to understand how users interact with the Service. Data collected includes usage events and anonymised session data.",
              policy: "posthog.com/privacy",
            },
            {
              name: "Sentry",
              desc: "Error monitoring. Sentry captures application errors and performance data to help us identify and fix bugs. Error reports may include limited contextual data about your session.",
              policy: "sentry.io/privacy",
            },
          ].map(({ name, desc, policy }) => (
            <div
              key={name}
              className="flex gap-4 py-4 border-t border-border first:border-0 first:pt-0"
            >
              <div className="w-[88px] shrink-0">
                <span className="font-heading font-semibold text-[13.5px] text-foreground">
                  {name}
                </span>
              </div>
              <div className="text-[14px] space-y-1">
                <p>{desc}</p>
                <p className="text-muted-foreground text-[13px]">
                  Privacy policy:{" "}
                  <span className="text-primary font-medium">{policy}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </LegalSection>

      {/* 6. Data Retention */}
      <LegalSection id="data-retention" number="6" title="Data Retention">
        <p>
          We retain your personal data for as long as your account is active or
          as needed to provide the Service. If you delete your account:
        </p>
        <LegalList
          items={[
            "Your profile information and proposal data will be deleted within 30 days;",
            "Billing records may be retained for up to 7 years as required by applicable financial regulations;",
            "Anonymised, aggregated usage data may be retained indefinitely.",
          ]}
        />
      </LegalSection>

      {/* 7. Data Security */}
      <LegalSection id="data-security" number="7" title="Data Security">
        <p>
          We implement appropriate technical and organisational measures to
          protect your data against unauthorised access, alteration, disclosure,
          or destruction. These include encrypted data transmission
          (TLS/HTTPS), secure password hashing, and access controls. However,
          no method of internet transmission is 100% secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      {/* 8. International Data Transfers */}
      <LegalSection
        id="international-transfers"
        number="8"
        title="International Data Transfers"
      >
        <p>
          Propreso is operated from Nigeria. Our third-party service providers
          (Stripe, Supabase, OpenRouter, PostHog, Sentry) may store or process
          your data in other countries, including the United States and the
          European Union. By using the Service, you consent to the transfer of
          your data to these locations.
        </p>
      </LegalSection>

      {/* 9. Your Rights */}
      <LegalSection id="your-rights" number="9" title="Your Rights">
        <p>
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <LegalList
          items={[
            <>
              <span className="text-foreground font-medium">Access:</span>{" "}
              Request a copy of the personal data we hold about you;
            </>,
            <>
              <span className="text-foreground font-medium">Correction:</span>{" "}
              Request correction of inaccurate or incomplete data;
            </>,
            <>
              <span className="text-foreground font-medium">Deletion:</span>{" "}
              Request deletion of your personal data (subject to legal retention
              requirements);
            </>,
            <>
              <span className="text-foreground font-medium">Portability:</span>{" "}
              Request your data in a machine-readable format;
            </>,
            <>
              <span className="text-foreground font-medium">Objection:</span>{" "}
              Object to certain processing activities.
            </>,
          ]}
        />
        <p className="mt-4">
          To exercise any of these rights, contact us at{" "}
          <span className="text-primary font-medium">hello@propreso.com</span>.
          We will respond within 30 days.
        </p>
      </LegalSection>

      {/* 10. Children's Privacy */}
      <LegalSection
        id="childrens-privacy"
        number="10"
        title="Children's Privacy"
      >
        <p>
          The Service is not directed to individuals under the age of 18. We do
          not knowingly collect personal information from anyone under 18. If we
          become aware that a minor has provided us with personal data, we will
          take steps to delete such information promptly.
        </p>
      </LegalSection>

      {/* 11. Changes to This Policy */}
      <LegalSection
        id="changes"
        number="11"
        title="Changes to This Policy"
      >
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of material changes by posting the updated policy on
          propreso.com/privacy and updating the date at the top. Your continued
          use of the Service after changes are posted constitutes your
          acceptance of the revised policy.
        </p>
      </LegalSection>

      {/* 12. Contact Us */}
      <LegalSection id="contact" number="12" title="Contact Us">
        <p>
          If you have questions or concerns about this Privacy Policy or our
          data practices, please contact:
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

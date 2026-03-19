import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ContactConfirmationEmailProps {
  firstName: string;
}

export function ContactConfirmationEmail({
  firstName,
}: ContactConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerLabel}>PROPRESO</Text>
            <Text style={headerSub}>We got your message.</Text>
          </Section>

          {/* Body */}
          <Section style={content}>
            <Text style={greeting}>Hi {firstName},</Text>
            <Text style={paragraph}>
              Thanks for reaching out! We&apos;ve received your message and
              we&apos;ll get back to you within{" "}
              <span style={highlight}>24 hours</span> — usually much faster.
            </Text>
            <Text style={paragraph}>
              While you wait, feel free to explore what Propreso can do for your
              freelance business on Upwork.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you submitted a contact form at{" "}
              <span style={footerBrand}>propreso.com</span>. This is an automated
              confirmation — please do not reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#FDF8F6",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  margin: 0,
  padding: "32px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  border: "1px solid #EDE7E4",
  maxWidth: "520px",
  margin: "0 auto",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  backgroundColor: "#C85438",
  padding: "28px 32px 24px",
};

const headerLabel: React.CSSProperties = {
  color: "rgba(255,255,255,0.55)",
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  margin: "0 0 4px",
  fontFamily: "'Courier New', monospace",
};

const headerSub: React.CSSProperties = {
  color: "#FFFFFF",
  fontSize: "20px",
  fontWeight: 700,
  margin: 0,
  letterSpacing: "-0.02em",
};

const content: React.CSSProperties = {
  padding: "28px 32px 24px",
};

const greeting: React.CSSProperties = {
  color: "#1A1412",
  fontSize: "15px",
  fontWeight: 600,
  margin: "0 0 14px",
};

const paragraph: React.CSSProperties = {
  color: "#5A4E4A",
  fontSize: "14px",
  lineHeight: "1.75",
  margin: "0 0 14px",
};

const highlight: React.CSSProperties = {
  color: "#C85438",
  fontWeight: 600,
};

const divider: React.CSSProperties = {
  borderColor: "#EDE7E4",
  margin: "0 32px",
};

const footer: React.CSSProperties = {
  padding: "18px 32px 24px",
};

const footerText: React.CSSProperties = {
  color: "#9C8E8A",
  fontSize: "11.5px",
  lineHeight: "1.65",
  margin: 0,
};

const footerBrand: React.CSSProperties = {
  color: "#C85438",
  fontWeight: 500,
};

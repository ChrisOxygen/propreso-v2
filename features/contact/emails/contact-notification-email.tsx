import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface ContactNotificationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactNotificationEmail({
  firstName,
  lastName,
  email,
  subject,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerLabel}>PROPRESO</Text>
            <Text style={headerSub}>New contact message</Text>
          </Section>

          {/* Meta row */}
          <Section style={metaSection}>
            <Row>
              <Column style={metaCol}>
                <Text style={metaKey}>From</Text>
                <Text style={metaValue}>
                  {firstName} {lastName}
                </Text>
              </Column>
              <Column style={metaCol}>
                <Text style={metaKey}>Email</Text>
                <Text style={metaValue}>{email}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={metaKey}>Subject</Text>
                <Text style={metaValue}>{subject}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={messageSection}>
            <Heading as="h3" style={messageHeading}>
              Message
            </Heading>
            <Text style={messageBody}>{message}</Text>
          </Section>

          <Hr style={divider} />

          {/* Reply CTA note */}
          <Section>
            <Text style={replyNote}>
              Reply directly to this email to respond to {firstName}.
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
  maxWidth: "560px",
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

const metaSection: React.CSSProperties = {
  padding: "24px 32px 0",
};

const metaCol: React.CSSProperties = {
  verticalAlign: "top",
  paddingRight: "24px",
};

const metaKey: React.CSSProperties = {
  color: "#9C8E8A",
  fontSize: "10.5px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  margin: "0 0 2px",
};

const metaValue: React.CSSProperties = {
  color: "#1A1412",
  fontSize: "13.5px",
  fontWeight: 600,
  margin: "0 0 16px",
};

const divider: React.CSSProperties = {
  borderColor: "#EDE7E4",
  margin: "0 32px",
};

const messageSection: React.CSSProperties = {
  padding: "24px 32px",
};

const messageHeading: React.CSSProperties = {
  color: "#5A4E4A",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 12px",
};

const messageBody: React.CSSProperties = {
  color: "#1A1412",
  fontSize: "14px",
  lineHeight: "1.75",
  margin: 0,
  whiteSpace: "pre-wrap",
};

const replyNote: React.CSSProperties = {
  color: "#9C8E8A",
  fontSize: "12.5px",
  textAlign: "center",
  padding: "0 32px 24px",
  margin: 0,
};

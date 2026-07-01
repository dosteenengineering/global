import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from "@react-email/components";
import { ReactElement } from "react";

export type ContactEnquiryEmailProps = {
  firstName: string;
  lastName: string;
  companyName?: string;
  role?: string;
  email: string;
  phone: string;
  projectLocation?: string;
  systemOfInterest?: string;
  projectBrief?: string;
};

export function ContactEnquiryEmail({
  firstName,
  lastName,
  companyName,
  role,
  email,
  phone,
  projectLocation,
  systemOfInterest,
  projectBrief,
}: ContactEnquiryEmailProps): ReactElement {
  return (
    <Html>
      <Head />
      <Preview>
        New contact enquiry from {firstName} {lastName}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerLabel}>CONTACT ENQUIRY</Text>
            <Text style={styles.headerTitle}>
              Someone wants to get in touch
            </Text>
          </Section>
          <Section style={styles.content}>
            <Field label="Name" value={`${firstName} ${lastName}`} />
            <Field label="Company" value={companyName || "—"} />
            <Field label="Role" value={role || "—"} />
            <Field label="Email" value={email} />
            <Field label="Phone" value={phone} />
            <Field label="Project Location" value={projectLocation || "—"} />
            <Field label="System of Interest" value={systemOfInterest || "—"} />
            <Field label="Project Brief" value={projectBrief || "—"} last />
          </Section>
          <Hr style={styles.hr} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Quad Dream. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <Row style={{ marginBottom: last ? 0 : 20 }}>
      <Column>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </Column>
    </Row>
  );
}

const styles = {
  body: {
    backgroundColor: "#f0f0f0",
    margin: 0,
    padding: "40px 0",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    maxWidth: "560px",
    margin: "0 auto",
    borderRadius: "12px",
    overflow: "hidden" as const,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  header: { backgroundColor: "#294596", padding: "36px 40px" },
  headerLabel: {
    color: "#76A7FF",
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    margin: "0 0 8px",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "600",
    margin: 0,
  },
  content: { padding: "36px 40px" },
  fieldLabel: {
    color: "#626262",
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    margin: "0 0 4px",
  },
  fieldValue: { color: "#161616", fontSize: "15px", margin: 0 },
  hr: { borderColor: "#C2C2C2", margin: "0 40px" },
  footer: { padding: "24px 40px" },
  footerText: {
    color: "#454545",
    fontSize: "12px",
    margin: 0,
    textAlign: "center" as const,
  },
};

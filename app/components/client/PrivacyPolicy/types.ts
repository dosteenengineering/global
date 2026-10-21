export type PrivacyItem = { type: "paragraph"; text: string } | { type: "subheading"; text: string } | { type: "list"; items: string[] };

export interface PrivacySection {
  title: string;
  items: PrivacyItem[];
}

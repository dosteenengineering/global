export const banner = {
  title: "FAQ",
  image: "/assets/images/projects/banner.jpg",
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqData = {
  title: string;
  contactText: string;
  contactHref: string;
  contactLabel: string;
  items: FaqItem[];
};

export const faqData: FaqData = {
  title: "Got Questions? We've Got Answers",
  contactText: "If you don't see your question here, feel free to ask it here",
  contactHref: "/contact",
  contactLabel: "Contact",
  items: [
    { id: 1, question: "What types of industrial door solutions do you offer?", answer: "We offer a wide range of industrial door solutions including high-speed doors, sectional doors, fire-rated doors, hangar doors, and clean room doors tailored to various industrial environments." },
    { id: 2, question: "Are your doors compliant with international safety and fire standards?", answer: "Yes. Our products are designed and manufactured in compliance with recognised international safety and fire standards. We work with certified global partners and ensure our solutions meet project-specific regulatory and civil defense requirements." },
    { id: 3, question: "Do you provide customized door solutions for specific project requirements?", answer: "Absolutely. We work closely with clients, consultants, and contractors to engineer customized door solutions that meet precise technical, aesthetic, and functional specifications." },
    { id: 4, question: "Which industries commonly use your products and systems?", answer: "Our solutions serve logistics and warehousing, food and beverage, pharmaceuticals, automotive, aviation, healthcare, and government and defense sectors." },
    { id: 5, question: "Do you offer installation and commissioning services?", answer: "Yes. Our trained technical teams handle full installation, commissioning, and handover for all door systems, ensuring compliance with manufacturer standards and project specifications." },
    { id: 6, question: "What safety features are included in your automated door systems?", answer: "Our automated systems include safety edges, photocell sensors, emergency stop functions, manual override options, and compliance with CE and EN safety directives." },
    { id: 7, question: "Can your door solutions be integrated with access control or building management systems?", answer: "Yes. Our doors can be seamlessly integrated with access control systems, BMS platforms, fire alarm panels, and other smart building infrastructure." },
    { id: 8, question: "What after-sales support and maintenance services do you provide?", answer: "We offer comprehensive after-sales support including preventive maintenance contracts, 24/7 emergency response, spare parts supply, and on-site technical assistance." },
    { id: 9, question: "How long does a typical installation project take?", answer: "Installation timelines vary by project scope and door type. Standard installations are completed within one to three days, while large-scale or complex projects may require longer scheduling coordinated with the main contractor." },
    { id: 10, question: "Do you offer warranties on your products and installations?", answer: "Yes. All our products come with manufacturer warranties, and our installations are backed by workmanship guarantees. Specific warranty terms are outlined in project contracts." },
  ],
};
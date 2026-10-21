export type TermsItem = { type: "paragraph"; text: string } | { type: "subheading"; text: string } | { type: "list"; items: string[] };

export interface TermsSection {
  title: string;
  items: TermsItem[];
}

export const termsLastUpdated = "21 October 2026"; // set the real publication date

export const termsSections: TermsSection[] = [
  {
    title: "1. Introduction and Acceptance",
    items: [
      { type: "paragraph", text: "These Terms and Conditions (“Terms”) govern your access to and use of www.dosteen.com, including its content, enquiry forms, downloadable materials and related online resources (collectively, the “Website”)." },
      { type: "paragraph", text: "They also set out general conditions for commercial engagements with Dosteen where expressly incorporated into a quotation, order acknowledgement, service agreement or other contract." },
      { type: "paragraph", text: "In these Terms, “Dosteen”, “we”, “us” and “our” refer to the relevant Dosteen legal entity responsible for the Website interaction, quotation, supply or service concerned. “You” and “your” refer to the person or organisation accessing the Website or engaging with us." },
      { type: "paragraph", text: "By using the Website, you agree to these Terms to the extent permitted by applicable law. If you do not agree, please discontinue use of the Website. If you act on behalf of an organisation, you confirm that you are authorised to do so." },
    ],
  },
  {
    title: "2. About Dosteen and the Contracting Entity",
    items: [
      {
        type: "paragraph",
        text: "Dosteen provides engineered building solutions for residential, commercial, industrial and government projects across the United Arab Emirates and the Sultanate of Oman. Its solutions and services include entrance systems, doors and shutters, fire and smoke protection, flood protection, docking equipment, parking systems, architectural shading, waste and linen chutes, installation and maintenance support.",
      },
      { type: "paragraph", text: "For UAE engagements contracted through Dosteen Doors Trading LLC, the company details are:" },
      {
        type: "list",
        items: ["Legal name: Dosteen Doors Trading LLC", "Trade licence number: 01268436", "Licensing authority: Dubai Economy and Tourism", "UAE Tax Registration Number: 104296452600003"],
      },
      { type: "paragraph", text: "The legal entity responsible for any particular order or service will be identified in the applicable quotation, order acknowledgement, invoice or signed agreement. For Oman engagements, the relevant Oman entity’s details will be stated in those documents." },
      { type: "paragraph", text: "References to the Dosteen brand or regional offices do not, by themselves, make another Dosteen entity a party to your contract." },
    ],
  },
  {
    title: "3. Use of the Website",
    items: [
      { type: "paragraph", text: "You may use the Website for legitimate purposes, including researching our solutions, reviewing technical information, submitting project enquiries and contacting our team." },
      { type: "paragraph", text: "You agree not to:" },
      {
        type: "list",
        items: [
          "Use the Website for unlawful, fraudulent or misleading purposes.",
          "Submit false information or misrepresent your identity, authority or project requirements.",
          "Attempt to gain unauthorised access to the Website, its servers or connected systems.",
          "Upload malicious software or interfere with the Website’s operation or security.",
          "Copy, scrape, reproduce or systematically extract Website content without our prior written permission, except as permitted by law.",
          "Submit material that infringes another party’s intellectual property, confidentiality or other rights.",
        ],
      },
      { type: "paragraph", text: "We may restrict or suspend access where reasonably necessary to protect the Website, investigate misuse or comply with legal requirements." },
    ],
  },
  {
    title: "4. Intellectual Property and Technical Resources",
    items: [
      { type: "paragraph", text: "Unless otherwise indicated, Website content—including text, photographs, illustrations, product information, drawings, layouts, logos, videos and downloadable resources—is owned by Dosteen or used with the permission of its licensors." },
      { type: "paragraph", text: "You may view, download and print reasonable extracts for internal project evaluation, subject to any conditions stated on the relevant material. You must retain ownership notices and must not present the content as your own." },
      { type: "paragraph", text: "You may not reproduce, modify, distribute, sell or publicly display Website content for other purposes without the relevant rights holder’s written permission." },
      { type: "paragraph", text: "BIM models, CAD files, CSI specifications and similar technical resources, where provided, are intended to assist project planning and coordination. Their availability does not transfer intellectual property rights or replace project-specific design verification, approved drawings or professional assessment." },
      { type: "paragraph", text: "Ownership and permitted use of project-specific designs, drawings and deliverables will be governed by the applicable agreement." },
    ],
  },
  {
    title: "5. Product Information, Specifications and Suitability",
    items: [
      { type: "paragraph", text: "Website descriptions, photographs, dimensions, finishes, performance information and technical resources are provided for general guidance. They do not constitute a binding offer or confirmation that a particular product is suitable for every application." },
      { type: "paragraph", text: "Product selection and performance may depend on factors including:" },
      {
        type: "list",
        items: [
          "Opening dimensions and structural conditions.",
          "Intended use and operating frequency.",
          "Environmental exposure, including heat, humidity, dust, salinity and water.",
          "Power supply, controls and integration requirements.",
          "Fire, life-safety, security and accessibility requirements.",
          "Installation conditions and ongoing maintenance.",
        ],
      },
      { type: "paragraph", text: "Any certification, rating, approval or compliance statement applies only to the product, configuration and conditions covered by the relevant supporting documentation. It should not be interpreted as applying to every Dosteen product or installation." },
      { type: "paragraph", text: "Final specifications, quantities, finishes, performance requirements and scope of work must be confirmed in the accepted quotation, approved technical submittals, drawings or signed agreement." },
    ],
  },
  {
    title: "6. Enquiries, Quotations and Contract Formation",
    items: [
      { type: "paragraph", text: "An enquiry submitted through the Website, by email, by telephone or through another communication channel is a request for information or a quotation. It does not constitute an accepted order." },
      { type: "paragraph", text: "Quotations remain valid for the period stated in the quotation and are subject to the assumptions, exclusions and conditions specified in it." },
      { type: "paragraph", text: "A binding contract is formed only when Dosteen accepts an order in writing or both parties execute an agreement. An automated enquiry acknowledgement does not constitute order acceptance." },
      { type: "paragraph", text: "Unless expressly accepted by Dosteen in writing, additional or conflicting terms contained in a customer’s purchase order do not amend the agreed terms." },
      { type: "paragraph", text: "Where documents conflict, the order of precedence stated in the signed agreement applies. If no order is specified, an express project-specific agreement takes precedence over these general Terms." },
    ],
  },
  {
    title: "7. Prices, Taxes and Payment",
    items: [
      { type: "paragraph", text: "Prices, currencies, payment milestones and accepted payment methods will be stated in the applicable quotation or agreement." },
      { type: "paragraph", text: "Whether VAT, customs duties, delivery, installation, testing, permits or other charges are included will be specified in the relevant commercial documents. Applicable taxes will be charged as required by law." },
      { type: "paragraph", text: "Any advance payment, progress payment, retention or credit arrangement must be agreed in writing. No standard payment schedule applies unless stated in the accepted quotation or agreement." },
      { type: "paragraph", text: "If an undisputed payment becomes overdue, Dosteen may, subject to the contract and applicable law, issue notice and suspend the affected work or deliveries until payment is received. Any resulting adjustment to programme or cost will be addressed under the contract." },
      { type: "paragraph", text: "Changes to scope, specifications, quantities, site conditions or delivery requirements may require a revised price and programme." },
    ],
  },
  {
    title: "8. Customer Responsibilities and Project Approvals",
    items: [
      { type: "paragraph", text: "You are responsible for providing accurate and timely information reasonably required to evaluate and perform the agreed scope." },
      { type: "paragraph", text: "Depending on the project, this may include:" },
      {
        type: "list",
        items: ["Site dimensions, drawings and operating requirements.", "Structural details and fixing provisions.", "Electrical supply and control requirements.", "Site access arrangements and working restrictions.", "Required approvals, permits and coordination information.", "Details of other contractors and connected building systems."],
      },
      { type: "paragraph", text: "Responsibility for surveys, design, authority approvals, civil works, electrical works, structural verification and system integration must be allocated in the project documents. These items are not included merely because they are necessary for the overall project." },
      { type: "paragraph", text: "Approval of drawings or samples confirms the matters shown in those documents but does not remove either party’s responsibilities under the contract or applicable law." },
    ],
  },
  {
    title: "9. Delivery, Installation, Risk and Handover",
    items: [
      { type: "paragraph", text: "Delivery and installation dates are estimates unless expressly agreed as binding contractual milestones." },
      { type: "paragraph", text: "The programme may depend on receipt of payments, approved drawings, manufacturing availability, site readiness, access, permits and other prerequisites identified in the agreement." },
      { type: "paragraph", text: "Where installation forms part of Dosteen’s scope, the customer must provide the agreed safe access, prepared openings, supporting works, utilities and working conditions." },
      {
        type: "paragraph",
        text: "Delivery terms, unloading responsibilities, storage arrangements, insurance, transfer of risk and transfer of ownership will be stated separately in the applicable contract. If an Incoterms® rule is used, its version and named place must be specified; ownership will be governed by the contract rather than the Incoterms® rule alone.",
      },
      { type: "paragraph", text: "Inspection, testing, commissioning, acceptance and handover procedures will follow the agreed project requirements. Any apparent damage, shortage or non-conformity should be reported promptly so it can be investigated." },
    ],
  },
  {
    title: "10. Variations, Cancellations and Returns",
    items: [
      { type: "paragraph", text: "Requests to change an accepted order must be submitted in writing. A variation becomes binding only when authorised representatives agree its scope and any effect on price, programme or performance." },
      { type: "paragraph", text: "Cancellation requests are subject to written agreement and applicable law. Any cancellation charges must reflect the contractual terms and may include committed materials, completed design, manufacturing, third-party costs and work already performed." },
      { type: "paragraph", text: "Custom-made or project-specific products are not returnable solely because the customer’s requirements have changed, unless otherwise agreed or required by law." },
      { type: "paragraph", text: "Nothing in this section limits rights relating to defective, non-conforming or incorrectly supplied products under the contract or applicable law." },
    ],
  },
  {
    title: "11. Warranty, Maintenance and Service Support",
    items: [
      { type: "paragraph", text: "Warranty periods, coverage, commencement dates and remedies will be stated in the relevant quotation, warranty document or agreement. These Terms do not create a separate fixed-duration warranty." },
      { type: "paragraph", text: "Subject to applicable law and the agreed warranty, coverage may depend on correct transport, storage, installation, operation and maintenance." },
      { type: "paragraph", text: "Warranty exclusions may apply to damage caused by misuse, impact, unauthorised alterations, unsuitable electrical supply, operation outside specified limits, inadequate maintenance or normal wear, but only to the extent stated in the applicable warranty and legally permitted." },
      { type: "paragraph", text: "Faults should be reported promptly, with reasonable access provided for inspection and corrective work. Unsafe equipment must not continue to be operated." },
      { type: "paragraph", text: "Annual maintenance contracts, call-out services and emergency support are governed by their agreed scope. Response times, service hours, spare parts, consumables and exclusions apply only as confirmed in the relevant service agreement." },
    ],
  },
  {
    title: "12. Website Availability, Third-Party Content and Liability",
    items: [
      { type: "paragraph", text: "We aim to keep Website information accurate and useful, but do not guarantee that it will always be complete, current, error-free or continuously available." },
      { type: "paragraph", text: "The Website may link to third-party websites or resources. Those services operate under their own terms and policies, and Dosteen is not responsible for content or activities outside its control." },
      { type: "paragraph", text: "Website information is not a substitute for a site assessment, approved engineering design or project-specific professional advice." },
      { type: "paragraph", text: "To the extent permitted by applicable law, Dosteen is not liable for indirect or consequential loss arising solely from use of, or inability to use, the Website." },
      { type: "paragraph", text: "Liability relating to products, installation, maintenance or other commercial services will be governed by the applicable contract and mandatory law. These Website Terms do not impose an additional financial liability cap on those engagements." },
      { type: "paragraph", text: "Nothing in these Terms excludes or limits liability, statutory warranties or consumer rights that cannot lawfully be excluded or limited." },
    ],
  },
  {
    title: "13. Confidentiality and Personal Information",
    items: [
      { type: "paragraph", text: "Confidential technical or commercial information exchanged for a project must be used only for the relevant evaluation or contractual purpose and protected against unauthorised disclosure." },
      { type: "paragraph", text: "These obligations do not apply to information that is lawfully public, independently developed, lawfully received without restriction or required to be disclosed by law. A separate confidentiality agreement, where signed, takes precedence." },
      { type: "paragraph", text: "Please do not submit sensitive drawings, access credentials or security-critical information through a general enquiry form unless an appropriate secure method has been agreed." },
      { type: "paragraph", text: "Personal information submitted through the Website or during an enquiry will be handled in accordance with applicable data protection requirements and Dosteen’s Privacy Policy, where published. These Terms do not replace a separate privacy notice." },
    ],
  },
  {
    title: "14. Legal Compliance and Events Beyond Reasonable Control",
    items: [
      { type: "paragraph", text: "Each party must comply with laws applicable to its activities, including relevant safety, anti-bribery, trade, customs and export requirements." },
      { type: "paragraph", text: "Neither party will be responsible for delay or failure caused by an event beyond its reasonable control to the extent recognised by the contract and applicable law. Such events may include natural disasters, severe weather, fire, war, government restrictions or major transport and utility disruptions." },
      { type: "paragraph", text: "The affected party must notify the other promptly and take reasonable steps to reduce the impact. Any extension, suspension or termination will be handled under the applicable agreement and law. Payment already due for completed work or delivered goods remains payable unless otherwise legally required." },
    ],
  },
  {
    title: "15. Governing Law and Dispute Resolution",
    items: [
      { type: "paragraph", text: "For commercial engagements, the governing law and dispute resolution procedure stated in the accepted quotation or signed agreement will apply, subject to mandatory law." },
      { type: "paragraph", text: "Unless otherwise agreed in writing:" },
      {
        type: "list",
        items: [
          "Contracts entered into by Dosteen Doors Trading LLC in the UAE will be governed by UAE law as applicable in the Emirate of Dubai, with disputes referred to the competent courts of Dubai.",
          "Contracts entered into by a Dosteen legal entity registered in Oman will be governed by the laws of the Sultanate of Oman, with disputes referred to the competent courts of Oman.",
        ],
      },
      { type: "paragraph", text: "The parties will first seek to resolve disputes through good-faith discussions." },
      { type: "paragraph", text: "For disputes relating solely to Website use, and not to a separate commercial contract, governing law and jurisdiction will be determined under applicable law." },
      { type: "paragraph", text: "Nothing in this section removes any mandatory consumer protection or right to bring proceedings before a court that has jurisdiction under applicable law." },
    ],
  },
  {
    title: "16. Changes, General Provisions and Contact",
    items: [
      { type: "paragraph", text: "We may update these Terms by publishing a revised version on this page. The updated Terms apply to Website use from the stated effective date." },
      { type: "paragraph", text: "Changes do not retrospectively amend an existing contract unless the parties agree or applicable law requires otherwise." },
      { type: "paragraph", text: "If a provision is found to be invalid or unenforceable, the remaining provisions will continue to apply to the extent legally permitted. A failure or delay in exercising a right does not, by itself, waive that right." },
      { type: "paragraph", text: "Formal contractual notices must be sent using the method and address specified in the relevant agreement." },
      { type: "paragraph", text: "For questions about these Terms, please contact:" },
      { type: "subheading", text: "United Arab Emirates" },
      { type: "paragraph", text: "Dosteen Doors Trading LLC\nP.O. Box 231002\nIndustrial Area 5, Al Qusais\nDubai, United Arab Emirates" },
      { type: "paragraph", text: "Telephone: +971 4 2582321\nEmail: info.dxb@dosteen.com" },
      { type: "subheading", text: "Sultanate of Oman" },
      { type: "paragraph", text: "Dosteen — Oman Office\nP.O. Box 739, Postal Code 119\nAl Amarat, Muscat\nSultanate of Oman" },
      { type: "paragraph", text: "Telephone: +968 24 876 600\nEmail: info.mct@dosteen.com" },
    ],
  },
];

import { ctaData } from "../Bim/data";

export const banner = {
  title: "Premium Residential Garage Doors Across UAE, Oman & MENA",
  description: "Designed to Impress, Safety You Can Count On",
  image: "/assets/images/csi-specifications/banner.jpg",
  imageAlt: "CSI MasterFormat Specifications for Building Systems — UAE & Oman",
};

export const garageDoorData = {
  sectionTitle: "DISCOVER THE RIGHT GARAGE DOOR FOR YOUR HOME",

  sectionDesc: "Every home is different. That’s why we offer a range of garage doors customized to your space, design, and usage needs in Dubai, Oman, and beyond.",

  doors: [
    {
      id: 1,
      menuTitle: "Sectional Overhead Doors",
      title: "Sectional Overhead Doors",
      image: "/assets/images/garage-doors/sectional-overhead-doors.jpg",
      idealFor: "Ideal For",
      heading: "Wide openings with lateral movement",
      points: ["Curved or straight tracks for flexible installation", "Optimized for both residential and commercial garages", "Smooth sliding mechanism for effortless access, Curved or straight tracks for flexible installation"],
    },

    {
      id: 2,
      menuTitle: "Oversized Doors (>6 Meters)",
      title: "Oversized Doors (>6 Meters)",
      image: "/assets/images/garage-doors/oversized-doors.webp",
      idealFor: "Ideal For",
      heading: "Large industrial and commercial applications",
      points: ["Designed for extra-wide openings", "Heavy-duty structure for long-term durability", "Suitable for warehouses and logistics facilities"],
    },

    {
      id: 3,
      menuTitle: "Cladded Doors",
      title: "Cladded Doors",
      image: "/assets/images/garage-doors/cladded-doors.webp",
      idealFor: "Ideal For",
      heading: "Premium architectural aesthetics",
      points: ["Custom cladding finishes available", "Blends seamlessly with building façade", "Modern and elegant appearance"],
    },

    {
      id: 4,
      menuTitle: "Vertical Bi-Fold / Tilt Doors",
      title: "Vertical Bi-Fold / Tilt Doors",
      image: "/assets/images/garage-doors/vertical-bi-fold-doors.webp",
      idealFor: "Ideal For",
      heading: "Space-saving vertical operation",
      points: ["Fast opening and closing operation", "Ideal for facilities with limited side room", "Robust and reliable performance"],
    },

    {
      id: 5,
      menuTitle: "Compact Doors",
      title: "Compact Doors",
      image: "/assets/images/garage-doors/compact-doors.webp",
      idealFor: "Ideal For",
      heading: "Applications with low headroom",
      points: ["Minimal ceiling track requirements", "Efficient use of available space", "Suitable for retrofit projects"],
    },

    {
      id: 6,
      menuTitle: "Side Sliding Doors (Curved & Straight)",
      title: "Side Sliding Doors (Curved & Straight)",
      image: "/assets/images/garage-doors/side-sliding-doors.webp",
      idealFor: "Ideal For",
      heading: "Wide openings with lateral movement",
      points: ["Available in curved and straight track systems", "Smooth and quiet sliding operation", "Perfect for customized garage layouts"],
    },

    {
      id: 7,
      menuTitle: "Custom Engineered Doors",
      title: "Custom Engineered Doors",
      image: "/assets/images/garage-doors/custom-engineered-doors.webp",
      idealFor: "Ideal For",
      heading: "Unique project requirements",
      points: ["Tailor-made dimensions and configurations", "Engineered for specialized applications", "High-performance and durable systems"],
    },
  ],
  ctaData: {
    title: "Don’t See the Right Fit? We Build to Your Spec.",
    description: "Non-standard sizes, custom finishes, bespoke automation — Dosteen engineers garage door solutions from scratch for any residential requirement.",
    buttonOneTitle: "Request custom quote",
    buttonOneLink: "/contact",
    buttonTwoTitle: "Speak to an engineer",
    buttonTwoLink: "/contact",
  },
};

export const whyChooseData = {
  sectionTitle: "Why Choose Dosteen Garage Doors?",
  sectionDesc: "Garage door performance that meets striking aesthetics for a perfect blend of strength, security and style.",
  items: [
    {
      id: 1,
      title: "Weather-resistant materials made for harsh climate conditions",
      icon: "/assets/images/garage-doors/icons/icon-1.svg",
      image: "/assets/images/garage-doors/why-choose-1.jpg",
    },
    {
      id: 2,
      title: "Ultra-quiet garage door motors for smooth daily use",
      icon: "/assets/images/garage-doors/icons/icon-2.svg",
      image: "/assets/images/garage-doors/why-choose-1.jpg",
    },
    {
      id: 3,
      title: "Long-term durability backed by warranty",
      icon: "/assets/images/garage-doors/icons/icon-3.svg",
      image: "/assets/images/garage-doors/why-choose-1.jpg",
    },
    {
      id: 4,
      title: "Safety sensors and anti-crush protection",
      icon: "/assets/images/garage-doors/icons/icon-4.svg",
      image: "/assets/images/garage-doors/why-choose-1.jpg",
    },
    {
      id: 5,
      title: "Visual appeal to elevate curb value",
      icon: "/assets/images/garage-doors/icons/icon-5.svg",
      image: "/assets/images/garage-doors/why-choose-1.jpg",
    },
    {
      id: 6,
      title: "Expert installation by trained technicians",
      icon: "/assets/images/garage-doors/icons/icon-6.svg",
      image: "/assets/images/garage-doors/why-choose-1.jpg",
    },
  ],
};

export type SolutionTab = {
  key: string;
  label: string;
  leftTitle: string;
  rightItems: string[];
};

export const solutionsData: {
  mainTitle: string;
  mainDescription: string;
  secondTitle: string;
  btnText: string;
  btnLink: string;
  backgroundImage: string;
  tabs: SolutionTab[];
} = {
  mainTitle: "SOLUTIONS",
  secondTitle: "Customization & Smart Automation",
  mainDescription: "We offer fully customizable garage door solutions with smart technology. All materials and components are manufactured in UAE and Oman, ensuring premium quality and compliance with local standards.",
  btnText: "Discuss your project",
  btnLink: "#",
  backgroundImage: "/assets/images/home/solution/solution-bg.jpg",

  tabs: [
    {
      key: "residential",
      label: "Customization Options",
      leftTitle: "Customization Options",
      rightItems: ["Choice of materials: Aluminum, steel, insulated panels", "Finishes: Woodgrain, matte, gloss, or textured", "Colors and pattern options", "Sizes customized to standard or oversized garages"],
    },
    {
      key: "Manual vs. Automatic",
      label: "Manual vs. Automatic",
      leftTitle: "Manual vs. Automatic",
      rightItems: ["Manual Operation", "Automatic Operation", "Smart Home Integration"],
    },
    {
      key: "Smart Garage Access",
      label: "Smart Garage Access",
      leftTitle: "Smart Garage Access",
      rightItems: ["Keyless Entry", "Mobile App Control", "Remote Monitoring", "Integration with Smart Home Systems"],
    },
    {
      key: "Built for Every Home",
      label: "Built for Every Home",
      leftTitle: "Built for Every Home",
      rightItems: ["Customizable Designs", "Durable Materials", "Energy Efficiency"],
    },
    {
      key: "After-Sales Support",
      label: "After-Sales Support",
      leftTitle: "After-Sales Support",
      rightItems: ["Comprehensive Warranty", "Responsive Customer Service", "Regular Maintenance Checks", "Technical Support"],
    },
  ],
};

export const garageDoorFaqData = {
  title: "Frequently Asked Question",
  items: [
    {
      id: "faq-1",
      question: "What type of garage doors are best for homes in UAE & Oman’s climate?",
      answer:
        "For the hot and humid climate of UAE and Oman, insulated sectional overhead doors are often the best choice. They provide excellent thermal performance, keeping garages cooler in summer and warmer in winter. Look for doors with high-quality insulation materials like polyurethane or polystyrene cores, and weather-resistant finishes to withstand the harsh sun and occasional sandstorms. Dosteen’s garage doors are designed with these factors in mind, ensuring durability and energy efficiency for homes in the region.",
    },
    {
      id: "faq-2",
      question: "How much does garage door installation cost in Dubai and Oman?",
      answer:
        " Pricing depends on size, design, and customization. Many competitors cut costs by mixing cheap components with a branded European motor, then market the door under the motor’s name. This creates a hidden risk for homeowners. A single-source manufacturer like Dosteen ensures every part of the system is engineered to work together for long-term reliability.",
    },
    {
      id: "faq-3",
      question: "Can I customize the color and finish?",
      answer:
        "Yes, Dosteen offers a wide range of customization options for garage doors in Dubai and Oman. You can choose from various colors, finishes, and materials to match your home's aesthetic. Whether you prefer a sleek modern look or a classic woodgrain finish, we can tailor the design to your preferences while ensuring durability and performance.",
    },
    {
      id: "faq-4",
      question: "Manual vs automatic garage doors – which is better?",
      answer:
        "Automatic garage doors are generally more convenient and secure than manual ones. They allow for keyless entry, remote control, and integration with smart home systems. However, manual doors can be a good option for smaller garages or if you prefer a simpler setup. Dosteen offers both options, so you can choose the one that best fits your needs and lifestyle.",
    },
    {
      id: "faq-5",
      question: "How often should I schedule garage door service?",
      answer: "Dosteen provides a comprehensive warranty for all our garage door products. The exact terms and duration of the warranty may vary depending on the specific model and components chosen. For detailed information about our warranty coverage, please contact our sales team or refer to the product documentation.",
    },
    {
      id: "faq-6",
      question: "Why are garage doors preferred over roller shutters for homes?",
      answer:
        "Garage doors are often preferred over roller shutters for residential use due to their superior aesthetics, insulation properties, and quieter operation. Garage doors can be customized with various materials, finishes, and designs to enhance the curb appeal of a home. They also provide better thermal insulation, helping to maintain a comfortable temperature inside the garage. Additionally, garage doors typically operate more quietly than roller shutters, making them a more attractive option for homeowners in UAE and Oman who value both style and functionality.",
    },
    {
      id: "faq-7",
      question: "What about after-sales support?",
      answer:
        "Dosteen offers comprehensive after-sales support for all our garage door products. Our team is dedicated to ensuring customer satisfaction and providing timely assistance with any questions or concerns you may have. Whether you need help with installation, maintenance, or troubleshooting, we're here to support you every step of the way.",
    },
  ],
};

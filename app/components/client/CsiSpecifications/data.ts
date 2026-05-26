
export const banner = {
  title: "CSI MasterFormat Specifications for Building Systems — UAE & Oman",
  description: "Dosteen provides CSI MasterFormat-ready specs for all supplied systems — with correct sections, three-part format, and UAE/Oman compliance built in.",
  image: "/assets/images/csi-specifications/banner.jpg",
  imageAlt: "CSI MasterFormat Specifications for Building Systems — UAE & Oman",
};

export const featuresList = {
  items: ["CSI MasterFormat 2018", "Three-Part Spec Format", "UAE & Oman Compliance", "ISO Certified", "Civil Defence Approved"],
};

export const MasterFormatData = {
  title: "What Is CSI MasterFormat",

  description: `
    
      CSI MasterFormat is the universal framework architects, consultants, and contractors use to organise construction specifications — assigning every building product and system a structured division and section number. Dosteen's specification documents follow MasterFormat 2018, the current edition used on UAE and Oman projects.
    
    
  `,
  subTitle: "CSI MasterFormat — The Essentials",
  listItems: [
    {
      title: "50 Division",
      description: "Covering every building product, material, and system from earthwork to electrical",
    },
    {
      title: "3-Part Format",
      description: "Every spec section has General, Products, and Execution — the universal language of construction",
    },
    {
      title: "2018 Edition",
      description: "Current edition used on UAE and Oman projects — Dosteen specifications follow this edition",
    },
  ],
};

export const threePartSpecData = {
  title: "The Three-Part Specification Format — What Dosteen Provides",

  items: [
    {
      id: 1,
      part: "Part 1",
      title: "General",
      shortDesc: "Scope, references, submittals, quality assurance",
      desc: "Covers the scope of the specification section, applicable standards and codes (e.g. BS EN, NFPA, UAE Fire and Life Safety Code), submittal requirements (shop drawings, product data, samples), and quality assurance requirements including Civil Defence approval documentation.",
    },
    {
      id: 2,
      part: "Part 2",
      title: "Products",
      shortDesc: "Materials, manufactured units, fabrication",
      desc: "Defines the specific product standards, materials, performance criteria, and fabrication requirements. For DOSTEEN systems this includes fire rating requirements, wind load data, operational specifications, finishes, hardware, and manufacturer qualifications — all to the UAE and Oman compliance standard.",
    },
    {
      id: 3,
      part: "Part 3",
      title: "Execution",
      shortDesc: "Installation, field quality control, closeout",
      desc: "Covers installation requirements, inspection procedures, field quality control, protection of installed works, and project closeout requirements — including Civil Defence commissioning documentation, as-built submissions, and maintenance manuals.",
    },
  ],
};

export const systemsData = {
  title: "Dosteen Systems — CSI MasterFormat Division Reference",

  tableData: [
    {
      id: 1,
      division: "08 — Openings",
      category: "Doors & specialty doors",
      sectionNumber: "08 33 23",
      sectionTitle: "Overhead Coiling Doors",
      system: "Roller Shutters · Industrial Sectional Doors",
    },
    {
      id: 2,
      division: "08 — Openings",
      category: "Doors & specialty doors",
      sectionNumber: "08 34 00",
      sectionTitle: "Special Function Doors",
      system: "Fire Curtains · Fire-Rated Roller Shutters · Smoke Curtains",
    },
    {
      id: 3,
      division: "08 — Openings",
      category: "Doors & specialty doors",
      sectionNumber: "08 11 13",
      sectionTitle: "Hollow Metal Doors & Frames",
      system: "Flood Barrier Doors · Force Entry Resistant Doors",
    },
    {
      id: 4,
      division: "10 — Specialties",
      category: "Sun control & partitions",
      sectionNumber: "10 71 13",
      sectionTitle: "Exterior Sun Control Devices",
      system: "Architectural Shading · Louvres · Facade Screens",
    },
    {
      id: 5,
      division: "10 — Specialties",
      category: "Sun control & partitions",
      sectionNumber: "10 22 13",
      sectionTitle: "Operable Partitions",
      system: "Moveable Partitions · Demountable Walls",
    },
    {
      id: 6,
      division: "11 — Equipment",
      category: "Loading dock & waste",
      sectionNumber: "11 16 00",
      sectionTitle: "Loading Dock Equipment",
      system: "Dock Levellers · Dock Lifts · Dock Shelters",
    },
    {
      id: 7,
      division: "11 — Equipment",
      category: "Loading dock & waste",
      sectionNumber: "11 82 00",
      sectionTitle: "Solid Waste Handling Equipment",
      system: "Waste Chutes · Garbage Chutes · Waste Compactors",
    },
    {
      id: 8,
      division: "28 — Electronic Safety",
      category: "Fire & access",
      sectionNumber: "28 31 00",
      sectionTitle: "Fire Detection & Alarm",
      system: "Fire Curtain & Smoke Curtain Activation Systems",
    },
  ],
};

export const downloadData = {
  sectionTitle: "DOWNLOAD DOSTEEN CSI SPECIFICATION SECTIONS",

  sections: [
    {
      id: 1,
      title: "Fire Curtains & Smoke Curtains",
      division: "Division 08",
      section: "08 34 00 Special Function Doors",
      icon: "/assets/icons/cs-spec/icon-1.svg",
      link: "#",
    },
    {
      id: 2,
      title: "Dock Levellers & Dock Equipment",
      division: "Division 11",
      section: "11 16 00 Loading Dock Equipment",
      icon: "/assets/icons/cs-spec/icon-4.svg",
      link: "#",
    },

    {
      id: 3,
      title: "Roller Shutters & Industrial Doors",
      division: "Division 08",
      section: "08 33 23 Overhead Coiling Doors",
      icon: "/assets/icons/cs-spec/icon-2.svg",
      link: "#",
    },
    {
      id: 4,
      title: "Waste Chutes & Compactors",
      division: "Division 11",
      section: "11 82 00 Solid Waste Handling Equipment",
      icon: "/assets/icons/cs-spec/icon-5.svg",
      link: "#",
    },
    {
      id: 5,
      title: "Flood Barriers",
      division: "Division 08",
      section: "08 11 13 Hollow Metal Doors & Frames",
      icon: "/assets/icons/cs-spec/icon-3.svg",
      link: "#",
    },

    {
      id: 6,
      title: "Architectural Shading",
      division: "Division 10",
      section: "10 71 13 Exterior Sun Control Devices",
      icon: "/assets/icons/cs-spec/icon-6.svg",
      link: "#",
    },
  ],
};

export interface UsesItem {
  id: string;
  label: string;
  description: string;
  image: string;
}

export const whoUsesSection = {
  title: "Who Uses Dosteen's CSI Specifications",
  description: "Dosteen's CSI specification documents are used at different stages of the project by different disciplines — each with a specific purpose.",
  items: [
    {
      id: "1",
      label: "Architects & Spec Writers",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta numquam autem, similique commodi assumenda neque incidunt fuga. Placeat magnam eveniet, dicta laborum quidem aperiam harum minus dolor perspiciatis quo nostrum!",
      image: "/assets/images/bim/banner.jpg",
    },
    {
      id: "2",
      label: "MEP Consultants",
      description: "Reference the specification when coordinating Dosteen's systems with MEP scope — confirming activation interfaces (fire curtains with fire alarm), access control head-ends, and utility connection requirements.",
      image: "/assets/images/csi-specifications/mep-cons.jpg",
    },
    {
      id: "3",
      label: "Procurement Managers",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta numquam autem, similique commodi assumenda neque incidunt fuga. Placeat magnam eveniet, dicta laborum quidem aperiam harum minus dolor perspiciatis quo nostrum!",
      image: "/assets/images/project-details/solutions/1.jpg",
    },
    {
      id: "4",
      label: "Developers & Project Owners",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta numquam autem, similique commodi assumenda neque incidunt fuga. Placeat magnam eveniet, dicta laborum quidem aperiam harum minus dolor perspiciatis quo nostrum!",
      image: "/assets/images/project-details/solutions/1.jpg",
    },
  ] satisfies UsesItem[],
};

export const specData = {
  title: "Dosteen Specifications — By the Numbers",
  stats: [
    {
      id: 1,
      value: "8+",
      label: "Systems with CSI Spec Documentation",
    },
    {
      id: 2,
      value: "3-Part",
      label: "Format — General, Products, Execution",
    },
    {
      id: 3,
      value: "2018",
      label: "MasterFormat Edition",
    },
    {
      id: 4,
      value: "UAE & Oman",
      label: "Compliance References Included",
    },
  ],
};

export const CsiFaqData = {
  title: "Frequently Asked Question",
  items: [
    {
      id: "faq-1",
      question: "Are Dosteen's CSI specifications ready to use directly in a project specification package?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta numquam autem, similique commodi assumenda neque incidunt fuga. Placeat magnam eveniet, dicta laborum quidem aperiam harum minus dolor perspiciatis quo nostrum!",
    },
    {
      id: "faq-2",
      question: "Which MasterFormat edition do Dosteen's specifications follow?",
      answer: "Dosteen's specifications follow the CSI MasterFormat 2018 Edition — the current edition in use on UAE and Oman projects. If your project uses an earlier edition (e.g. MasterFormat 2004 or the legacy 16-division format), contact our engineering team and we can provide the specification in the format required.",
    },
    {
      id: "faq-3",
      question: "Can Dosteen integrate with our project's existing BIM model?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta numquam autem, similique commodi assumenda neque incidunt fuga. Placeat magnam eveniet, dicta laborum quidem aperiam harum minus dolor perspiciatis quo nostrum!",
    },
    {
      id: "faq-4",
      question: "How does Dosteen handle clash detection?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta numquam autem, similique commodi assumenda neque incidunt fuga. Placeat magnam eveniet, dicta laborum quidem aperiam harum minus dolor perspiciatis quo nostrum!",
    },
  ],
};

export const ctaData = {
  title: "Need a CSI Specification for Your Project? We'll Have It Ready in 5 Days",
  description: "Share the system, project, and Civil Defence authority — Dosteen will deliver a project-ready CSI MasterFormat spec within 5 working days, free of charge.",
  buttons: [
    {
      text: "REQUEST A SPECIFICATION",
      href: "#",
    },
    {
      text: "DOWNLOAD ALL SPECS",
      href: "#",
    },
  ],
};
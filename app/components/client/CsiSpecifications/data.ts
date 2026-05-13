import { items } from "../recognitions/data";

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
    <p>
      CSI MasterFormat is the universal framework architects, consultants, and contractors use to organise construction specifications — assigning every building product and system a structured division and section number. Dosteen's specification documents follow MasterFormat 2018, the current edition used on UAE and Oman projects.
    </p>
    
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
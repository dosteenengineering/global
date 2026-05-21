export const banner = {
  title: "Resource",
  image: "/assets/images/projects/banner.jpg",
};

export const resourcesKnowledgeHubData = {
  sectionTitle: "RESOURCES & KNOWLEDGE HUB FOR BUILDING PROFESSIONALS",

  sectionDesc: "Technical documents, BIM files, product datasheets, installation guides, project references, and industry standards - for architects, consultants, contractors, and specifiers.",

  tabs: [
    {
      id: "technical-documents",
      label: "Technical Documents",
      icon: "/assets/images/resources/tab-icons/tab-1.svg",
      title: "Technical Documents & Product Datasheets",

      filters: ["ALL", "GARAGE DOORS", "FLOOD PROTECTION", "FIRE-RATED SYSTEM", "ENTRANCE SYSTEMS", "PARKING SYSTEMS", "SHADING SYSTEMS"],

      items: {
        "GARAGE DOORS": [
          {
            id: 1,
            type: "PDF",
            title: "Garage Door Motor Specification Sheet",
            desc: "Motor performance and installation details",
            tags: ["PDF", "ENGINEERS"],
            download: "#",
          },
          {
            id: 2,
            type: "DWG",
            title: "Garage Door Track Layout Drawing",
            desc: "Technical AutoCAD layout for garage doors",
            tags: ["DWG", "ARCHITECTS"],
            download: "#",
          },
        ],

        "FLOOD PROTECTION": [
          {
            id: 3,
            type: "PDF",
            title: "Flood Barrier Technical Manual",
            desc: "Barrier performance and water resistance data",
            tags: ["PDF", "CONSULTANTS"],
            download: "#",
          },
          {
            id: 4,
            type: "DWG",
            title: "Flood Gate CAD Details",
            desc: "Construction drawing for flood gate systems",
            tags: ["DWG", "ARCHITECTS"],
            download: "#",
          },
        ],

        "FIRE-RATED SYSTEM": [
          {
            id: 5,
            type: "PDF",
            title: "Fire Rated Shutter Certification",
            desc: "Fire resistance and compliance certificates",
            tags: ["PDF", "ENGINEERS"],
            download: "#",
          },
          {
            id: 6,
            type: "DWG",
            title: "Fire Door Assembly Drawing",
            desc: "Detailed assembly and section drawings",
            tags: ["DWG", "CONSULTANTS"],
            download: "#",
          },
        ],

        "ENTRANCE SYSTEMS": [
          {
            id: 7,
            type: "PDF",
            title: "Automatic Sliding Door Datasheet",
            desc: "Technical specifications and dimensions",
            tags: ["PDF", "ARCHITECTS"],
            download: "#",
          },
          {
            id: 8,
            type: "DWG",
            title: "Entrance System CAD Layout",
            desc: "Door clearance and installation drawing",
            tags: ["DWG", "ENGINEERS"],
            download: "#",
          },
        ],

        "PARKING SYSTEMS": [
          {
            id: 9,
            type: "PDF",
            title: "Parking Barrier Technical Guide",
            desc: "Barrier speed, motor, and usage specs",
            tags: ["PDF", "CONSULTANTS"],
            download: "#",
          },
          {
            id: 10,
            type: "DWG",
            title: "Parking System Foundation Drawing",
            desc: "Foundation and wiring details",
            tags: ["DWG", "ENGINEERS"],
            download: "#",
          },
        ],

        "SHADING SYSTEMS": [
          {
            id: 11,
            type: "PDF",
            title: "Pergola System Product Datasheet",
            desc: "Material specs and structural information",
            tags: ["PDF", "ARCHITECTS"],
            download: "#",
          },
          {
            id: 12,
            type: "DWG",
            title: "Shading Structure CAD File",
            desc: "2D technical layout for shading systems",
            tags: ["DWG", "CONSULTANTS"],
            download: "#",
          },
        ],
      },
    },

    {
      id: "bim-cad-files",
      label: "BIM & CAD Files",
      icon: "/assets/images/resources/tab-icons/tab-2.svg",
      title: "BIM Objects & CAD Downloads",
      description: "Download Dosteen product BIM objects for direct use in your project models. Available for Autodesk Revit, AutoCAD, and ArchiCAD. All objects are LOD 300 and carry product-accurate geometry and data properties.",

      button: {
        text: "REQUEST BIM OBJECT",
        link: "#",
      },

      filters: ["ALL", "REVIT (RVT)", "AUTOCAD (DWG)", "IFC"],

      items: {
        "AUTOCAD (DWG)": [
          {
            id: 1,
            type: "RVT",
            title: "Flood Barrier System — Product Specification",
            download: "#",
          },
        ],
        "REVIT (RVT)": [
          {
            id: 2,
            type: "RVT",
            title: "Sectional Overhead Door – Revit Family",
            download: "#",
          },
        ],
        IFC: [
          {
            id: 3,
            type: "DWG",
            title: "Entrance System – AutoCAD 2D/3D",
            download: "#",
          },
        ],
      },
    },

    {
      id: "videos-demos",
      label: "Videos & Demos",
      icon: "/assets/images/resources/tab-icons/tab-3.svg",
      title: "Product Videos, Installation Demos & Project Walkthroughs",

      items: [
        {
          id: 1,
          title: "How Sectional Overhead Doors Work",
          image: "/assets/images/resources/videos-demos/vdo-img-1.jpg",
          tag: "PRODUCT DEMO",
          duration: "3:42",
          videoLink: "#",
        },
        {
          id: 2,
          title: "Flood Barrier Installation Walkthrough",
          image: "/assets/images/resources/videos-demos/vdo-img-2.jpg",
          tag: "HOW-TO",
          duration: "6:15",
          videoLink: "#",
        },
        {
          id: 3,
          title: "Project Tour - Abu Dhabi Municipality",
          image: "/assets/images/resources/videos-demos/vdo-img-3.jpg",
          tag: "PROJECT TOUR",
          duration: "4:58",
          videoLink: "#",
        },
      ],
    },

    {
      id: "brochures-catalogues",
      label: "Brochures & catalogues",
      icon: "/assets/images/resources/tab-icons/tab-4.svg",
      title: "Product Brochures & Project Guides",

      items: [
        {
          id: 1,
          type: "PDF",
          title: "Residential Solutions Catalogue",
          tags: ["2025 EDITION"],
          download: "#",
        },
        {
          id: 2,
          type: "PDF",
          title: "Commercial Systems Catalogue",
          tags: ["2025 EDITION"],
          download: "#",
        },
        {
          id: 3,
          type: "PDF",
          title: "Flood Protection Guide",
          tags: ["TECHNICAL + PROJECT REFS"],
          download: "#",
        },
        {
          id: 4,
          type: "PDF",
          title: "Company Capability Statement",
          tags: ["CERTIFICATIONS", "TRACK RECORD"],
          download: "#",
        },
      ],
    },

    {
      id: "certifications-compliance",
      label: "Certifications & Compliance",
      icon: "/assets/images/resources/tab-icons/tab-5.svg",
      title: "Certifications, Standards & Compliance Documents",

      items: [
        {
          id: 1,
          type: "ISO",
          title: "ISO 9001:2015 Quality Management Certificate",
          desc: "Valid through [date] - Issued by [body]",
          download: "#",
        },
        {
          id: 2,
          type: "CE",
          title: "CE Marking-Flood Barrier Systems",
          desc: "EN 13564-Performance classification",
          download: "#",
        },
        {
          id: 3,
          type: "UAE",
          title: "Dubai Municipality Approval Documents",
          desc: "Product-specific approvals for UAE projects",
          download: "#",
        },
        {
          id: 4,
          type: "NBS",
          title: "NBS Specification Clauses",
          desc: "Pre-written spec text for architects",
          download: "#",
        },
      ],
    },

    {
      id: "installation-maintenance",
      label: "Installation & Maintenance",
      icon: "/assets/images/resources/tab-icons/tab-6.svg",
      title: "Installation & Maintenance",

      items: [
        {
          id: 1,
          type: "PDF",
          title: "Sectional Door- Installation Manual",
          desc: "Step-by-step with diagrams",
          download: "#",
        },
        {
          id: 2,
          type: "PDF",
          title: "Flood Barrier - O&M Manual",
          desc: "Operation, maintenance schedule, parts",
          download: "#",
        },
        {
          id: 3,
          type: "PDF",
          title: "Gate System-Wiring Diagram",
          desc: "Electrical connection guide",
          download: "#",
        },
      ],
    },
  ],
};

export type ResourceHubData = typeof resourcesKnowledgeHubData;
export type ResourceHubTab = ResourceHubData["tabs"][number];
type ResourceItems<T> = T extends { items: infer Items } ? (Items extends readonly (infer Item)[] ? Item : Items extends Record<string, readonly (infer Item)[]> ? Item : never) : never;
export type ResourceHubItem = ResourceItems<ResourceHubTab>;

export const industryGuidesData = {
  title: "Industry Guides, Standards & Technical Articles",

  items: [
    {
      id: 1,
      featured: true,
      audience: "For Consultants",
      type: "GUIDE",
      title: "Understanding Dubai Municipality Requirements for Flood Barriers",
      image: "/assets/images/resources/industry-guides/img-1.png",
      link: "#",
    },

    {
      id: 2,
      featured: true,
      audience: "For Architects",
      type: "STANDARDS",
      title: "UAE Civil Defence Code: Fire-Rated Door Requirements Explained",
      image: "/assets/images/resources/industry-guides/img-2.png",
      link: "#",
    },

    {
      id: 3,
      featured: true,
      audience: "For Specifiers",
      type: "CHECKLIST",
      title: "Specifying Garage Doors: A Checklist for UAE Consultants",
      image: "/assets/images/resources/industry-guides/img-3.jpg",
      link: "#",
    },
  ],
};

export const specificationToolsData = {
  title: "Specification Tools For Building Professionals",

  items: [
    {
      id: 1,
      title: "Flood Barrier Selector",
      desc: "Answer 4 questions, get the right flood barrier type for your project",
      buttonText: "LAUNCH TOOL",
      link: "#",
    },

    {
      id: 2,
      title: "Door Opening Size Guide",
      desc: "Enter your clear opening dimensions to find compatible door systems",
      buttonText: "LAUNCH TOOL",
      link: "#",
    },

    {
      id: 3,
      title: "Download Submission Pack",
      desc: "Select your project type and get a bundled submittal-ready document pack",
      buttonText: "LAUNCH TOOL",
      link: "#",
    },
  ],
};

export const newsLetterData = {
  title: "Stay updated when new resources are published",
  desc: "New datasheets, BIM updates, compliance guides and industry standards delivered to your inbox.",
  email: "dosteen@info.com",
};

export const ctaData = {
  title: "Can't find what you need?",
  description: "Our technical team can provide custom documentation, project-specific submittals, or help you select the right system for your building.",
  buttons: [
    {
      text: "Contact technical team",
      href: "#",
    },
    {
      text: "Request a custom pack",
      href: "#",
    },
  ],
};
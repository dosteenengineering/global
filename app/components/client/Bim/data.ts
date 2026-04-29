export const banner = {
  title: "BIM-Integrated Building Systems Engineering — UAE & Oman",
  description:
    "Dosteen delivers BIM-coordinated shop drawings, clash-free models, and Revit integrations—so your project hits site ready, not revised.",
  image: "/assets/images/bim/banner.jpg",
  imageAlt: "BIM-Integrated Building Systems Engineering — UAE & Oman",
};

export const AboutBimData = {
  title: "What BIM Means at Dosteen",

  description: `
    <p>
      BIM is not a deliverable Dosteen offers as an add-on. It is the engineering methodology our team uses to coordinate every building systems project — integrating our models with your MEP and structural teams to eliminate clashes before a single fixing is drilled into a wall.
    </p>
    <p><br /></p>
    <p>
      Dosteen's engineers work in Revit and AutoCAD to produce coordinated shop drawings, federated models, and installation-ready documentation for fire protection, flood barriers, entrance systems, docking solutions, parking systems, and industrial doors — across every project stage from design coordination to construction issue.
    </p>
  `,
  subTitle: "The Dosteen BIM Promise",
  subDescription:
    "We integrate our building systems models with your MEP and structural BIM environment before any installation begins — so clash errors are resolved in the model, not discovered on site.",
};

export const bimCapabilities = {
  title: "DOSTEEN'S BIM CAPABILITIES",

  capabilities: [
    {
      id: "shop-drawings",
      icon: "/assets/images/bim/aboutBim/1.svg",
      title: "BIM-Coordinated Shop Drawings",
      description:
        "Installation-ready shop drawings coordinated with the project's MEP and structural BIM model. Every bracket, fixing, and clearance zone modelled before drawings are issued.",
    },
    {
      id: "clash-detection",
      icon: "/assets/images/bim/aboutBim/2.svg",
      title: "Clash Detection & Resolution",
      description:
        "Full clash detection between Dosteen's model and the federated project model — interferences identified and resolved with MEP, structural, and plumbing elements before site works begin.",
    },
    {
      id: "revit-family",
      icon: "/assets/images/bim/aboutBim/3.svg",
      title: "Revit Family Creation",
      description:
        "Revit families created for all systems on a project — correctly parameterised for the required LOD, enabling accurate model placement and FM data at handover.",
    },
    {
      id: "federated-model",
      icon: "/assets/images/bim/aboutBim/4.svg",
      title: "Federated Model Integration",
      description:
        "Models delivered in IFC, RVT, and NWC formats — compatible with the project's BIM environment and seamlessly integrated into the federated model.",
    },
    {
      id: "construction-docs",
      icon: "/assets/images/bim/aboutBim/5.svg",
      title: "Construction Issue Documentation",
      description:
        "All BIM-derived documentation issued in the format required by the project's BIM Execution Plan and the main contractor's construction programme.",
    },
    {
      id: "as-built",
      icon: "/assets/images/bim/aboutBim/6.svg",
      title: "As-Built BIM Models",
      description:
        "As-built models reflecting the final installed position of all systems — supporting FM requirements, COBie data obligations, and Civil Defence record submissions.",
    },
  ],
};

export interface SoftwareTool {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const softwareToolsSection = {
  title: "SOFTWARE &\nTOOLS",
  description:
    "Dosteen's team works across major BIM platforms for seamless model exchange on UAE and Oman projects.",
  tools: [
    {
      id: "revit",
      icon: "/assets/images/bim/tools/1.svg",
      title: "Autodesk Revit",
      description:
        "BIM model authoring, Revit family creation, shop drawing production. Delivers .RVT and .IFC.",
    },
    {
      id: "autocad",
      icon: "/assets/images/bim/tools/2.svg",
      title: "AutoCAD",
      description:
        "2D shop drawings, fixing schedules, installation documentation. Delivers .DWG and .PDF.",
    },
    {
      id: "navisworks",
      icon: "/assets/images/bim/tools/3.svg",
      title: "Navisworks",
      description:
        "Clash detection, model federation, cloud-based coordination. Also supports IFC and COBie for FM handover.",
    },
  ] satisfies SoftwareTool[],
};


export interface BenefitItem {
  id: string;
  label: string;
  description: string;
  image: string;
}

export const whoBenefitsSection = {
  title: "WHO BENEFITS FROM DOSTEEN'S BIM CAPABILITY",
  items: [
    {
      id: "mep-consultants",
      label: "MEP Consultants",
      description:
        "Fully coordinated BIM models reduce design clashes before construction begins. Dosteen's Revit families integrate directly into the consultant's federated model, minimising RFIs and design queries on site.",
      image: "/assets/images/bim/banner.jpg",
    },
    {
      id: "main-contractors",
      label: "Main Contractors",
      description:
        "Clash-free building systems models reduce on-site rework and programme delays. Fixing schedules and installation sequences derived directly from the BIM model. Single contact for all systems BIM coordination.",
      image: "/assets/images/bim/benefits/2.jpg",
    },
    {
      id: "developers-fm",
      label: "Developers & FM Teams",
      description:
        "As-built BIM models delivered at handover support FM operations, COBie data obligations, and Civil Defence record submissions — reducing the cost and effort of post-handover documentation.",
      image: "/assets/images/project-details/solutions/1.jpg",
    },
  ] satisfies BenefitItem[],
};



export interface BimProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const bimProcessSection = {
  title: "THE DOSTEEN BIM\nPROCESS",
  steps: [
    {
      id: "bep-review",
      number: "01",
      title: "BEP Review",
      description:
        "We review the project's BIM Execution Plan at appointment — confirming LOD, file formats, coordination milestones, and naming conventions before any modelling begins.",
    },
    {
      id: "model-build",
      number: "02",
      title: "Model Build",
      description:
        "We build Revit families for all Dosteen systems on the project — correctly parameterised for the required LOD and verified against the specification.",
    },
    {
      id: "clash-detection",
      number: "03",
      title: "Clash Detection",
      description:
        "Dosteen's model is federated with the MEP and structural models. All clashes are identified, logged, and resolved before construction issue — no RFIs from Dosteen systems.",
    },
    {
      id: "issue-handover",
      number: "04",
      title: "Issue & Handover",
      description:
        "BIM-derived shop drawings and schedules are issued for construction. On completion, as-built models are delivered in the required format for FM and Civil Defence records.",
    },
  ] satisfies BimProcessStep[],
};


export const buildingSystemsData = {
  title: "Building Systems Dosteen Delivers with BIM Coordination",
  description:
    "We model, coordinate, and document all building systems within our product and installation scope, from Revit families to as-builts.",
  items: [
    {
      id: 1,
      icon: "/assets/images/building/1.svg",
      title: "Fire Protection",
      description:
        "Revit families, housing clearance modelling, fixing schedules, Civil Defence-compliant record models.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 2,
      icon: "/assets/images/building/2.svg",
      title: "Flood Barriers",
      description:
        "Threshold modelling, door frame and drainage integration, activation mechanism clearance zones.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 3,
      icon: "/assets/images/building/3.svg",
      title: "Entrance & Force Entry",
      description:
        "Door leaf, frame, and hardware modelling, access control coordination, structural opening confirmation.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 4,
      icon: "/assets/images/building/4.svg",
      title: "Docking Solutions",
      description:
        "Dock leveller pit modelling, loading platform levels, vehicle clearance envelopes, drainage coordination.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 5,
      icon: "/assets/images/building/5.svg",
      title: "Parking Systems",
      description:
        "Structural grid coordination, drive path modelling, MEP and access control integration.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 6,
      icon: "/assets/images/building/6.svg",
      title: "Industrial Doors",
      description:
        "Door leaf operation envelope modelling, guide rail coordination, overhead clearance checks.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 7,
      icon: "/assets/images/building/7.svg",
      title: "Architectural Shading",
      description:
        "Facade attachment modelling, bracket coordination with structural frame, shading geometry.",
      arrow: "/icons/arrow.svg",
    },
    {
      id: 8,
      icon: "/assets/images/building/8.svg",
      title: "Waste Management",
      description:
        "Chute shaft modelling, inlet door coordination, compactor room and ventilation integration.",
      arrow: "/icons/arrow.svg",
    },
  ],
};


export const bimEngineeringData = {
  title: "Dosteen BIM Engineering — By the Numbers",
  stats: [
    {
      id: 1,
      value: "20,000+",
      label: "Projects Delivered — UAE & Oman",
    },
    {
      id: 2,
      value: "8",
      label: "Building Systems BIM-Coordinated",
    },
    {
      id: 3,
      value: "20,000+",
      label: "BIM Software Platforms Supported",
    },
    {
      id: 4,
      value: "LOD 200–400",
      label: "Model Detail Levels Delivered",
    },
  ],
};

export const ctaData = {
  title: "Need BIM-Coordinated Building Systems for Your Project? Let's Talk.",
  description:
    "Join 20,000+ successful projects across UAE and Oman. From specification to maintenance, our engineering teams deliver.",
  buttons: [
    {
      text: "REQUEST A BIM PROPOSAL",
      href: "#",
    },
    {
      text: "SPEAK TO OUR TEAM",
      href: "#",
    },
  ],
};

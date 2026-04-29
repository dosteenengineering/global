export interface ProjectSpec {
  label: string;
  value: string;
}

export interface SystemProduct {
  key: string;
  value: string;
}

export interface Project {
  title: string;
  location: string;
  images: string[];
  specifications: ProjectSpec[];
  challenge: {
    heading: string;
    description: string;
  };
  dosteenSolution: {
    heading: string;
    description: string;
    images: string[];
  };
  systemsAndProducts: SystemProduct[];
  outcome: {
    heading: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    title: "EXPO 2020, DUBAI",
    location: "Dubai, UAE",
    images: [
      "/assets/images/project-details/1.jpg",
      "/assets/images/projects/2.jpg",
      "/assets/images/projects/1.jpg",
    ],
    specifications: [
      { label: "Sector", value: "Commercial" },
      { label: "Activity", value: "Dubai" },
      { label: "Status", value: "Completed" },
      { label: "Client", value: "Client Name" },
      { label: "Architect / Location", value: "Architect Name" },
      { label: "Main Contractor", value: "Contractor Name" },
    ],
    challenge: {
      heading: "The Challenge",
      description:
        "<p>Expo 2020 Dubai presented a Civil Defence compliance and large-scale programme challenge that required more than a standard building systems installation. The project required full Dubai Civil Defence approval across all fire-rated systems installed across multiple pavilions before any individual pavilion could receive its occupancy permit — with each pavilion operating to its own programme timeline and sign-off sequence.</p> <p><br></p> <p>The systems scope included fire curtains, roller shutters, and dock levellers across a large-format, multi-building site — each system category subject to different Civil Defence inspection requirements and sign-off procedures. Any delay in a single system's Civil Defence approval had the potential to hold an entire pavilion's occupancy — a direct commercial and programme risk for the main contractor and the event authority.</p>",
    },
    dosteenSolution: {
      heading: "The Dosteen Solution",
      description:
        "Dosteen's engineering team began with a full review of Za'abeel Tower's specification, programme, and Dubai Civil Defence compliance requirements. Fire curtains were selected from Dosteen's global partner range — chosen for their Dubai Civil Defence approval status, their low-profile 110mm housing compatible with the tower's ceiling void specification, and their proven deployment record across UAE commercial high-rise projects. Alternative products with larger housings were reviewed and rejected as they could not be accommodated without structural ceiling modifications.",
      images: [
        "/assets/images/project-details/solutions/1.jpg",
        "/assets/images/project-details/solutions/2.jpg",
        "/assets/images/project-details/1.jpg",
        "/assets/images/projects/2.jpg",
      ],
    },
    systemsAndProducts: [
      {
        key: "System Name",
        value: "Fire Curtains → /solutions/fire-protection",
      },
      {
        key: "Brand / Partner",
        value: "Brand Name",
      },
      {
        key: "Application on Project",
        value:
          "Installed across all fire compartment boundaries on floors 1–12 to provide compartmentalisation in the event of fire",
      },
      {
        key: "Quantity / Scale",
        value: "36 units across 12 floors",
      },
      {
        key: "Key Specification",
        value: "36 units across 12 floors",
      },
      {
        key: "Why Selected",
        value:
          "Selected for their Dubai Civil Defence approval status and compact housing profile, which was required by the project's ceiling void specification. Alternative products with larger housings could not be accommodated without structural modifications.",
      },
    ],
    outcome: {
      heading: "The Outcome",
      description:
        "Dosteen's engineering team began with a full review of Za'abeel Tower's specification, programme, and Dubai Civil Defence compliance requirements. Fire curtains were selected from Dosteen's global partner range — chosen for their Dubai Civil Defence approval status, their low-profile 110mm housing compatible with the tower's ceiling void specification, and their proven deployment record across UAE commercial high-rise projects. Alternative products with larger housings were reviewed and rejected as they could not be accommodated without structural ceiling modifications.",
    },
  },
];

export const featuredProjectsData = {
  title: "Related Case Studies",
  projects: [
    {
      id: 1,
      title: "Za'abeel Towers",
      location: "Dubai",
      category: "Residential",
      image: "/assets/images/services/commercial/featured-projects/1.jpg",
      slug: "zaabeel-towers",
    },
    {
      id: 2,
      title: "Al Mouj",
      location: "Dubai",
      category: "Commercial",
      image: "/assets/images/services/commercial/featured-projects/2.jpg",
      slug: "al-mouj",
    },
    {
      id: 3,
      title: "Expo 2020, Dubai",
      location: "Dubai",
      category: "Infrastructure",
      image: "/assets/images/services/commercial/featured-projects/3.jpg",
      slug: "expo-2020",
    },
  ],
};


export const ctaData = {
    title: "Let's Talk About Your Project.",
    description: "Dummy Content: Our engineering team is ready to review your project requirements, identify the most relevant case study references from our portfolio, and deliver a detailed engineering proposal — within 48 hours.",
    buttons: [
        {
            text: "REQUEST A QUOTE",
            href: "#",
        },
        {
            text: "SPEAK TO OUR TEAM",
            href: "#",
        },
    ],
}
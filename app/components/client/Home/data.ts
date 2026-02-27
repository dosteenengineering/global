//second Section
export interface SlideData {
  id: number;
  description: string;
  stat: string;
  statLabel: string;
}

export const slidesData: SlideData[] = [
  {
    id: 1,
    description:
      "Dosteen's story began over 25+ years ago, driven by a vision to create a safer and more secure environment through exceptional engineering. Since then, we've grown from a regional provider to a trusted partner for businesses and homeowners across Oman and the UAE.",
    stat: "20,000+",
    statLabel: "Projects Delivered",
  },
  {
    id: 2,
    description:
      "With a team of highly skilled engineers and technicians, we have consistently delivered cutting-edge security solutions tailored to the unique needs of every client. Our footprint spans across major cities and industries throughout the Middle East.",
    stat: "500+",
    statLabel: "Enterprise Clients",
  },
  {
    id: 3,
    description:
      "We continuously invest in the latest technologies to ensure our clients receive world-class protection. From smart surveillance to integrated access control systems, our solutions are built for tomorrow's challenges today.",
    stat: "15+",
    statLabel: "Years of Innovation",
  },
  {
    id: 4,
    description:
      "Our team brings together decades of hands-on experience in security engineering, project management, and client support. Every project is handled with precision, professionalism, and a commitment to exceeding expectations.",
    stat: "1,200+",
    statLabel: "Certified Experts",
  },
  {
    id: 5,
    description:
      "We believe in building long-term relationships with our clients. Our after-sales support, regular maintenance programs, and dedicated account teams ensure that your security investment continues to perform at its best for years to come.",
    stat: "98+",
    statLabel: "Client Retention Rate",
  },
];


//third Section
export type SolutionTab = {
  key: string;
  label: string;
  leftTitle: string;
  rightItems: string[];
};

export const solutionsData: {
  mainTitle: string;
  backgroundImage: string;
  tabs: SolutionTab[];
} = {
  mainTitle: "SOLUTIONS",
  backgroundImage: "/assets/images/home/solution/solution-bg.jpg",

  tabs: [
    {
      key: "residential",
      label: "Residential Systems",
      leftTitle: "Integrated Systems Designed for Modern Homes",
      rightItems: [
        "Garage Doors",
        "Architectural Shades",
        "Shutters",
        "Flood Barriers",
        "Garage & Linen Chutes",
        "Multi-Parking Solutions",
        "Bespoke Steel Gates",
        "Fly Mesh & Insect Screens",
        "Retractable Pool Covers",
      ],
    },
    {
      key: "commercial",
      label: "Commercial & Industrial Systems",
      leftTitle: "High Systems for Commercial Spaces",
      rightItems: [
        "Industrial Doors",
        "Loading Bay Systems",
        "Security Shutters",
        "Dock Levelers",
        "Fire Rated Doors",
        "Warehouse Automation",
      ],
    },
    {
      key: "defense",
      label: "Defense & Government",
      leftTitle: "Advanced Security Systems for Critical Infrastructure",
      rightItems: [
        "Blast Resistant Doors",
        "Perimeter Security Gates",
        "Ballistic Barriers",
        "High Security Bollards",
        "Military Hangar Doors",
      ],
    },
  ],
};


//fourth Section
export interface ServiceTab {
  key: string;
  label: string;
  image: string;
  description: string;
}

export interface ServicesData {
  title: string;
  topRightSvg: string;
  tabs: ServiceTab[];
}

export const servicesData: ServicesData = {
  title: "SERVICES",
  topRightSvg: "/assets/icons/bg-svg/top-right.svg",
  tabs: [
{
  key: "amc",
  label: "AMC",
  image: "/assets/images/home/service/export.svg",
  description:
    "Annual maintenance contracts ensuring reliable performance and system continuity.",
},
{
  key: "export",
  label: "Export",
  image: "/assets/images/home/service/export.svg",
  description:
    "Seamless export services delivering engineered solutions worldwide.",
},
{
  key: "instant-call",
  label: "Instant Call Service",
  image: "/assets/images/home/service/export.svg",
  description:
    "24/7 instant call services for immediate technical support and assistance.",
},

  ],
};
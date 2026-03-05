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
    description: "Annual maintenance contracts ensuring reliable performance and continuity.",
  },
  {
    key: "export",
    label: "Export",
    image: "/assets/images/home/service/export.svg",
    description: "Seamless export services delivering engineered solutions worldwide.",
  },
  {
    key: "instant-call",
    label: "Instant Call Service",
    image: "/assets/images/home/service/export.svg",
    description: "Round-the-clock call services for immediate technical support and help.",
  },
  
],
};

//fifth Section
export interface Industry {
  key: string;
  label: string;
  image: string;
}

export interface IndustriesData {
  title: string;
  industries: Industry[];
}

export const industriesData: IndustriesData = {
  title: "EXPERTISE ACROSS\nMULTIPLE INDUSTRIES\nWE SERVE",
  industries: [
    {
      key: "residential",
      label: "Residential",
      image: "/assets/images/home/industries/residential.jpg",
    },
    {
      key: "industrial",
      label: "Industrial",
      image: "/assets/images/home/industries/industrial.jpg",
    },
    {
      key: "hospitality",
      label: "Hospitality",
      image: "/assets/images/home/industries/hospitality.jpg",
    },
    {
      key: "healthcare",
      label: "Healthcare",
      image: "/assets/images/home/industries/healthcare.jpg",
    },
        {
      key: "hospitality1",
      label: "Hospitality",
      image: "/assets/images/home/industries/hospitality.jpg",
    },
    {
      key: "healthcare2",
      label: "Healthcare",
      image: "/assets/images/home/industries/healthcare.jpg",
    },
  ],
};

//sixth section
export const whyDosteenData = {
    heading: "WHY DOSTEEN",
slides: [
    // {
    //     icon: "/assets/images/home/why-dosteen/expertise.svg",
    //     title: "Transparency",
    //     description: "Engineered with integrity and strengthened by transparent partnerships.",
    // },
    {
        icon: "/assets/images/home/why-dosteen/experience.svg",
        title: "Experience",
        description: "Proven project experience across diverse industries and environments",
    },
    {
        icon: "/assets/images/home/why-dosteen/expertise.svg",
        title: "Expertise",
        description: "Deep technical knowledge and specialized skills for every challenge",
    },
    {
        icon: "/assets/images/home/why-dosteen/experience.svg",
        title: "Innovation",
        description: "Pioneering new approaches to meet tomorrow's engineering challenges",
    },
],
};

export type WhyDosteenSlide = (typeof whyDosteenData.slides)[number];

//seventh Section
export const bimData = {
  heading: "ADVANCED BIM CAPABILITIES",
  progressLabel: "CSI Specification Documentation",
  description:
    "Advanced BIM capabilities enabling accurate planning, seamless coordination, and efficient project execution.",
  videoSrc: "/assets/videos/bim-bg-vdo.mp4",
  arrowImage: "/assets/icons/arrow-right-top-big.svg",
};


//eighth Section    
export interface Project {
  key: string;
  name: string;
  location: string;
  client: string;
  image: string;
}

export interface FeaturedProjectsData {
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
  projects: Project[];
}

export const featuredProjectsData: FeaturedProjectsData = {
  title: "Featured Projects",
  viewAllLabel: "All Projects",
  viewAllHref: "/projects",
  projects: [
    {
      key: "project-1",
      name: "Project Name DummyContent",
      location: "Dubai",
      client: "Name Dummy",
      image: "/assets/images/home/featured-projects/fp1.jpg",
    },
    {
      key: "project-2",
      name: "Project Name Dummy Content",
      location: "Abu Dhabi",
      client: "Client Alpha",
      image: "/assets/images/home/featured-projects/fp2.jpg",
    },
    {
      key: "project-3",
      name: "Project Name Dummy Content",
      location: "Riyadh",
      client: "Client Beta",
      image: "/assets/images/home/featured-projects/fp3.jpg",
    },
    {
      key: "project-4",
      name: "Project Name Dummy Content",
      location: "London",
      client: "Client Gamma",
      image: "/assets/images/home/featured-projects/fp2.jpg",
    },
    {
      key: "project-5",
      name: "Project Name Dummy Content",
      location: "New York",
      client: "Client Delta",
      image: "/assets/images/home/featured-projects/fp1.jpg",
    },
  ],
};

//ninth Section
export interface ClientStory {
  key: string;
  quote: string;
  name: string;
  company: string;
  designation: string;
}

export interface ClientStoriesData {
  title: string;
  stories: ClientStory[];
}

export const clientStoriesData: ClientStoriesData = {
  title: "CLIENT STORIES",
  stories: [
    {
      key: "story-1",
      quote:
        "Dosteen delivered exceptional quality and professionalism throughout the project.",
      name: "Éric Perreault",
      company: "Company Name",
      designation: "Designation",
    },
    {
      key: "story-2",
      quote:
        "Working with the team was an absolute pleasure. They exceeded every expectation we had set.",
      name: "Sarah Mitchell",
      company: "Company Name",
      designation: "Designation",
    },
    {
      key: "story-3",
      quote:
        "From concept to completion, the attention to detail and dedication to excellence was unmatched.",
      name: "James Thornton",
      company: "Company Name",
      designation: "Designation",
    },
    
  ],
};


//tenth Section
export interface BlogPost {
  key: string;
  title: string;
  category: string;
  date: string;
  image: string;
  href: string;
}

export interface BlogsData {
  title: string;
  posts: BlogPost[];
}

export const blogsData: BlogsData = {
  title: "BLOGS",
  posts: [
    {
      key: "blog-1",
      title: "What Modern Engineering Demands from Today's Built Spaces",
      category: "General",
      date: "25-01-2026",
      image: "/assets/images/home/blogs/b1.jpg",
      href: "#",
    },
    {
      key: "blog-2",
      title: "What Modern Engineering Demands from Today's Built Spaces",
      category: "Technology",
      date: "25-01-2026",
      image: "/assets/images/home/blogs/b2.jpg",
      href: "#",
    },
    {
      key: "blog-3",
      title: "The Future of Sustainable Infrastructure in Urban Development",
      category: "Sustainability",
      date: "18-01-2026",
      image: "/assets/images/home/blogs/b1.jpg",
      href: "#",
    },
    {
      key: "blog-4",
      title: "How BIM is Transforming Construction Project Management",
      category: "Technology",
      date: "10-01-2026",
      image: "/assets/images/home/blogs/b2.jpg",
      href: "#",
    },
  ],
};


//eleventh Section
export interface TrustedClientsData {
  logos: string[];
}

export const trustedClientsData: TrustedClientsData = {
  logos: [
    "/assets/images/home/clients/1.svg",
    "/assets/images/home/clients/2.svg",
    "/assets/images/home/clients/3.svg",
    "/assets/images/home/clients/4.svg",
  ]
};

//twelfth Section
export const ctaData = {
  heading: "PLAN YOUR BUILDING SYSTEMS WITH DOSTEEN",
  actions: [
    {
      key: "quote",
      label: "REQUEST A QUOTE",
      href: "#",
    },
    {
      key: "team",
      label: "SPEAK TO OUR TEAM",
      href: "#",
    },
  ],
};
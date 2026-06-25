export interface Home {
  metaTitle: string;
  metaDescription: string;

  bannerSection: {
    desktopImage: string;
    mobileImage: string;
    imageAlt: string;
    title: string;
    buttonText: string;
    buttonLink: string;
  };

  secondSection: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    items: {
      number: string;
      value: string;
      image?: string;
      imageAlt?: string;
    }[];
  };

  thirdSection: {
    title: string;
    image:string;
  };

  fourthSection: {
    title: string;
    buttonText: string;
    buttonLink: string;
  };

  fifthSection: {
    title: string;
    items: {
      image: string;
      imageAlt?: string;
      title?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
    }[];
  };

  sixthSection: {
    title: string;
    items: {
      image: string;
      imageAlt: string;
      title: string;
    }[];
  };

  seventhSection: {
    title: string;
    items: {
      image: string;
      imageAlt?: string;
      title: string;
      description: string;
    }[];
  };

  eighthSection: {
    items: {
      title: string;
      description?: string;
      link: string;
      video?: string;
      image:string;
      type:string;
    }[];
  };

  ninethSection: {
    title: string;
  };

  tenthSection: {
    title: string;
    items: {
      name: string;
      message?: string;
      designation?: string;
    }[];
  };

  eleventhSection: {
    title: string;
  };

  twelthSection: {
    items: {
      image: string;
      imageAlt: string;
    }[];
  };

  lastSection: {
    title: string;
    items: {
      title: string;
      link: string;
    }[];
  };
}


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
      "Dosteen's story began over 25+ years ago, driven by a vision to create a safer and more secure environment through exceptional engineering. Since then, we've grown from a regional provider to a trusted partner for businesses and homeowners across \n Oman and the UAE.",
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
  rightItems: {label: string, link: string}[];
};

export const solutionsData: {
  mainTitle: string;
  secondTitle: string;
  btnText: string;
  btnLink: string;
  backgroundImage: string;
  tabs: SolutionTab[];
} = {
  mainTitle: "SOLUTIONS",
  secondTitle: "Need something built to spec? We also offer <span class='font-semibold'>custom solutions tailored</span> to your exact requirements.",
  btnText: "Discuss your project",
  btnLink: "/contact-us#contact-form",
  backgroundImage: "/assets/images/home/solution/solution-bg.jpg",

  tabs: [
    {
      key: "residential",
      label: "Residential Systems",
      leftTitle: "Integrated Systems Designed for Modern Homes",
      rightItems: [{label:"Garage Doors", link:"/solutions/residential/garage-doors"}, {label:"Multi-Parking Solutions", link:"/solutions/residential/multi-parking-solutions"}, {label:"Architectural Shades", link:"/solutions/residential/architectural-shades"}, {label:"Bespoke Steel Gates", link:"/solutions/residential/bespoke-steel-gates"}, {label:"Shutters", link:"/solutions/residential/shutters"}, {label:"Fly Mesh & Insect Screens", link:"/solutions/residential/fly-mesh-insect-screens"}, {label:"Flood Barriers", link:"/solutions/residential/flood-barriers"}, {label:"Retractable Pool Covers", link:"/solutions/residential/retractable-pool-covers"}, {label:"Garage & Linen Chutes", link:"/solutions/residential/garage-linen-chutes"}],
    },
    {
      key: "commercial",
      label: "Commercial & Industrial Systems",
      leftTitle: "High Systems for Commercial Spaces",
      rightItems: [{label:"Industrial Doors", link:"/solutions/commercial/industrial-doors"}, {label:"Loading Bay Systems", link:"/solutions/commercial/loading-bay-systems"}, {label:"Security Shutters", link:"/solutions/commercial/security-shutters"}, {label:"Dock Levelers", link:"/solutions/commercial/dock-levelers"}, {label:"Fire Rated Doors", link:"/solutions/commercial/fire-rated-doors"}, {label:"Warehouse Automation", link:"/solutions/commercial/warehouse-automation"}],
    },
    {
      key: "defense",
      label: "Defense & Government",
      leftTitle: "Advanced Security Systems for Critical Infrastructure",
      rightItems: [{label:"Blast Resistant Doors", link:"/solutions/defense/blast-resistant-doors"}, {label:"Perimeter Security Gates", link:"/solutions/defense/perimeter-security-gates"}, {label:"Ballistic Barriers", link:"/solutions/defense/ballistic-barriers"}, {label:"High Security Bollards", link:"/solutions/defense/high-security-bollards"}, {label:"Military Hangar Doors", link:"/solutions/defense/military-hangar-doors"}],
    },
  ],
};

//fourth Section
export interface ServiceTab {
  key: string;
  label: string;
  image: string;
  svgPaths?: { d: string; len: number; delay: number }[];
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
      svgPaths: [
        // Left box
        // Left box - fix these two paths
        {
          d: "M196.79 3.35571H3.35742V38.1879H196.79V3.35571Z",
          len: 600,
          delay: 0,
        },
        {
          d: "M14.1035 38.188V196.644H186.044V38.188H14.1035",
          len: 700,
          delay: 0.15,
        }, // ← added H14.1035 to close
        { d: "M17.1269 69.8657H186.045", len: 170, delay: 0.25 },
        { d: "M17.1269 101.544H186.045", len: 170, delay: 0.35 },
        { d: "M17.1269 133.289H186.045", len: 170, delay: 0.4 },
        { d: "M17.1269 164.967H186.045", len: 170, delay: 0.45 },
        // Right ship
        {
          d: "M476.194 196.644H583.657L626.642 121.476L529.925 67.7852L433.209 121.476L476.194 196.644Z",
          len: 500,
          delay: 0,
        },
        {
          d: "M465.447 101.543V46.3086H594.402V101.543",
          len: 300,
          delay: 0.15,
        },
        { d: "M486.939 46.3088V24.8323H572.91V46.3088", len: 200, delay: 0.25 },
        { d: "M519.18 24.8322V4.02686H540.672V24.8322", len: 100, delay: 0.35 },
        { d: "M529.926 69.8657V196.644", len: 130, delay: 0.45 },
        // Arrow
        {
          d: "M218.283 196.644L239.776 196.644L357.985 35.1677H433.209",
          len: 350,
          delay: 1.2,
        },
        { d: "M411 57.8523L433.231 35.5033L411 13.2886", len: 200, delay: 1.5 },
      ],
      description: "Annual maintenance contracts ensuring reliable performance and continuity.",
    },
    {
      key: "export",
      label: "Export",
      image: "/assets/images/home/service/service-img-1.svg",
      svgPaths: [
        // Left box
        // Left box - fix these two paths
        {
          d: "M196.79 3.35571H3.35742V38.1879H196.79V3.35571Z",
          len: 600,
          delay: 0,
        },
        {
          d: "M14.1035 38.188V196.644H186.044V38.188H14.1035",
          len: 700,
          delay: 0.15,
        }, // ← added H14.1035 to close
        { d: "M17.1269 69.8657H186.045", len: 170, delay: 0.25 },
        { d: "M17.1269 101.544H186.045", len: 170, delay: 0.35 },
        { d: "M17.1269 133.289H186.045", len: 170, delay: 0.4 },
        { d: "M17.1269 164.967H186.045", len: 170, delay: 0.45 },
        // Right ship
        {
          d: "M476.194 196.644H583.657L626.642 121.476L529.925 67.7852L433.209 121.476L476.194 196.644Z",
          len: 500,
          delay: 0,
        },
        {
          d: "M465.447 101.543V46.3086H594.402V101.543",
          len: 300,
          delay: 0.15,
        },
        { d: "M486.939 46.3088V24.8323H572.91V46.3088", len: 200, delay: 0.25 },
        { d: "M519.18 24.8322V4.02686H540.672V24.8322", len: 100, delay: 0.35 },
        { d: "M529.926 69.8657V196.644", len: 130, delay: 0.45 },
        // Arrow
        {
          d: "M218.283 196.644L239.776 196.644L357.985 35.1677H433.209",
          len: 350,
          delay: 1.2,
        },
        { d: "M411 57.8523L433.231 35.5033L411 13.2886", len: 200, delay: 1.5 },
      ],
      description: "Seamless export services delivering engineered solutions worldwide.",
    },
    {
      key: "instant-call",
      label: "Instant Call Service",
      image: "/assets/images/home/service/service-img-1.svg",
      svgPaths: [
        // Left box
        // Left box - fix these two paths
        {
          d: "M196.79 3.35571H3.35742V38.1879H196.79V3.35571Z",
          len: 600,
          delay: 0,
        },
        {
          d: "M14.1035 38.188V196.644H186.044V38.188H14.1035",
          len: 700,
          delay: 0.15,
        }, // ← added H14.1035 to close
        { d: "M17.1269 69.8657H186.045", len: 170, delay: 0.25 },
        { d: "M17.1269 101.544H186.045", len: 170, delay: 0.35 },
        { d: "M17.1269 133.289H186.045", len: 170, delay: 0.4 },
        { d: "M17.1269 164.967H186.045", len: 170, delay: 0.45 },
        // Right ship
        {
          d: "M476.194 196.644H583.657L626.642 121.476L529.925 67.7852L433.209 121.476L476.194 196.644Z",
          len: 500,
          delay: 0,
        },
        {
          d: "M465.447 101.543V46.3086H594.402V101.543",
          len: 300,
          delay: 0.15,
        },
        { d: "M486.939 46.3088V24.8323H572.91V46.3088", len: 200, delay: 0.25 },
        { d: "M519.18 24.8322V4.02686H540.672V24.8322", len: 100, delay: 0.35 },
        { d: "M529.926 69.8657V196.644", len: 130, delay: 0.45 },
        // Arrow
        {
          d: "M218.283 196.644L239.776 196.644L357.985 35.1677H433.209",
          len: 350,
          delay: 1.2,
        },
        { d: "M411 57.8523L433.231 35.5033L411 13.2886", len: 200, delay: 1.5 },
      ],
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
  title: "EXPERTISE ACROSS MULTIPLE INDUSTRIES WE SERVE",
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
      description:
        "Proven project experience across diverse industries and environments",
    },
    {
      icon: "/assets/images/home/why-dosteen/expertise.svg",
      title: "Expertise",
      description:
        "Deep technical knowledge and specialized skills for every challenge",
    },
    {
      icon: "/assets/images/home/why-dosteen/experience.svg",
      title: "Innovation",
      description:
        "Pioneering new approaches to meet tomorrow's engineering challenges",
    },
  ],
};

export type WhyDosteenSlide = (typeof whyDosteenData.slides)[number];

//seventh Section
export const bimData = [
  {
    heading: "ADVANCED BIM CAPABILITIES",
    description:
      "Advanced BIM capabilities enabling accurate planning, seamless coordination, and efficient project execution.",
    background: { type: "video" as const, src: "/assets/videos/bim-bg-vdo.mp4" },
    link: "/bim-capabilities",
  },
  {
    heading: "CSI SPECIFICATION DOCUMENTATION",
    description:
      "Comprehensive CSI spec documentation ensuring every project phase is clearly defined and contractually sound.",
    background: { type: "video" as const, src: "/assets/videos/bim-bg-vdo.mp4" },
    link: "/csi-specifications",
  },
];

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
  viewAllHref: "/case-studies",
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
      href: "/blog/what-modern-engineering-demands-from-todays-built-spaces",
    },
    {
      key: "blog-2",
      title: "What Modern Engineering Demands from Today's Built Spaces",
      category: "Technology",
      date: "25-01-2026",
      image: "/assets/images/home/blogs/b2.jpg",
      href: "/blog/what-modern-engineering-demands-from-todays-built-spaces",
    },
    {
      key: "blog-3",
      title: "The Future of Sustainable Infrastructure in Urban Development",
      category: "Sustainability",
      date: "18-01-2026",
      image: "/assets/images/home/blogs/b1.jpg",
      href: "/blog/the-future-of-sustainable-infrastructure-in-urban-development",
    },
    {
      key: "blog-4",
      title: "How BIM is Transforming Construction Project Management",
      category: "Technology",
      date: "10-01-2026",
      image: "/assets/images/home/blogs/b2.jpg",
      href: "/blog/how-bim-is-transforming-construction-project-management",
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
  ],
};

//twelfth Section
export const ctaData = {
  heading: "PLAN YOUR BUILDING SYSTEMS WITH DOSTEEN",
  actions: [
    {
      key: "quote",
      label: "REQUEST A QUOTE",
      href: "/contact-us#contact-form",
    },
    {
      key: "team",
      label: "SPEAK TO OUR TEAM",
      href: "/contact-us#contact-form",
    },
  ],
};

export const residentialData = {
  banner: {
    image: "/assets/images/services/1.jpg",
    title: "RESIDENTIAL DEVELOPMENTS",
    description:
      "Residential developments in the UAE and Oman demand building systems.",
  },
  second: {
    heading: "ENGINEERED FOR SAFE, STYLISH LIVING",
    description:
      "combine security, aesthetics, and long-term reliability. From automated garage doors and sectional overhead doors for private villas to fire-rated doors, flood barriers, and multi-parking \n systems for high-rise towers",
    leftImages: [
      "/assets/images/services/residential/1.jpg",
      "/assets/images/services/residential/2.jpg",
    ],
    rightImages: [
      "/assets/images/services/residential/3.jpg",
      "/assets/images/services/residential/4.jpg",
    ],
  },
};

export const dosteenSystemsData = {
  title: "DOSTEEN SYSTEMS",
  systems: [
    {
      id: 1,
      title: "Sectional garage doors (residential grade)",
      image: "/assets/images/services/residential/systems/1.jpg",
      description:
        "Sectional garage doors (residential grade) are designed to offer a perfect balance of durability, functionality, and modern aesthetics for everyday home use.",
      slug: "sectional-garage-doors",
    },
    {
      id: 2,
      title: "Architectural shading - pergolas, ouvres, awnings",
      image: "/assets/images/services/1.jpg",
      description:
        "Elegant shading solutions including pergolas, ouvres, and awnings that blend seamlessly with modern architectural design.",
      slug: "architectural-shading",
    },
    {
      id: 3,
      title: "Automated gate systems and barriers",
      image: "/assets/images/about/banner.jpg",
      description:
        "High-performance automated gate systems and barriers engineered for security, reliability, and smooth operation in any environment.",
      slug: "automated-gate-systems",
    },
    {
      id: 4,
      title: "Multi-level parking systems",
      image: "/assets/images/services/2.jpg",
      description:
        "Intelligent multi-level parking systems that maximize space efficiency in residential and commercial developments.",
      slug: "multi-level-parking",
    },
    {
      id: 5,
      title: "Fire-rated doors and fire curtains",
      image: "/assets/images/home/hero/heroBg.jpg",
      description:
        "Certified fire-rated doors and fire curtains providing critical passive fire protection for buildings of all types.",
      slug: "fire-rated-doors",
    },
    {
      id: 6,
      title: "Garbage chute systems",
      image: "/assets/images/home/blogs/b1.jpg",
      description:
        "Hygienic and efficient garbage chute systems built for high-rise residential and commercial properties.",
      slug: "garbage-chute-systems",
    },
    {
      id: 7,
      title: "Flood barriers for basement car parks",
      image: "/assets/images/home/blogs/b2.jpg",
      description:
        "Robust flood barrier systems specifically engineered to protect basement car parks and below-grade structures from water ingress.",
      slug: "flood-barriers",
    },
  ],
};

export const CtaData = {
  title: "Need something built to spec?",
  description:
    "We also offer custom solutions tailored to your exact requirements.",
  buttons: [
    {
      text: "Discuss your project",
      href: "#",
    },
  ],
};

export const whyTrustData = {
  title: "WHY INDUSTRY LEADERS TRUST DOSTEEN",
  stats: [
    {
      id: 1,
      value: "25+",
      title: "Years of Excellence",
      image: "/assets/images/services/residential/trust/1.jpg",
    },
    {
      id: 2,
      value: "20K+",
      title: "Projects Delivered",
      image: "/assets/images/services/residential/trust/2.jpg",
    },
    {
      id: 3,
      value: "20+",
      title: "Partners Global",
      image: "/assets/images/services/residential/trust/3.jpg",
    },
    {
      id: 4,
      value: "10+",
      title: "Countries Exports",
      image: "/assets/images/services/residential/trust/4.jpg",
    },
    {
      id: 5,
      value: "1500+",
      title: "Products at Al Mouj",
      image: "/assets/images/services/residential/trust/5.jpg",
    },
  ],
};


export interface Project {
  id: number;
  key: string;
  name: string;
  location: string;
  category: string;
  image: string;
  slug: string;
}

export const featuredProjectsData = {
  title: "FEATURED PROJECTS",
  viewAllLabel: "ALL PROJECTS",
  viewAllHref: "/projects",
  projects: [
    {
      id: 1,
      key: "al-mouj",
      name: "Al Mouj",
      location: "Dubai",
      category: "Commercial",
      image: "/assets/images/services/residential/featured-projects/1.jpg",
      slug: "al-mouj",
    },
    {
      id: 2,
      key: "zaabeel-towers",
      name: "Za'abeel Towers",
      location: "Dubai",
      category: "Residential",
      image: "/assets/images/services/residential/featured-projects/2.jpg",
      slug: "zaabeel-towers",
    },
    {
      id: 3,
      key: "expo-2020",
      name: "Expo 2020, Dubai",
      location: "Dubai",
      category: "Infrastructure",
      image: "/assets/images/services/residential/featured-projects/3.jpg",
      slug: "expo-2020",
    },
    // {
    //   id: 4,
    //   key: "downtown-residences",
    //   name: "Downtown Residences",
    //   location: "Abu Dhabi",
    //   category: "Residential",
    //   image: "/assets/images/services/residential/featured-projects/1.jpg",
    //   slug: "downtown-residences",
    // },
    // {
    //   id: 5,
    //   key: "marina-gate",
    //   name: "Marina Gate",
    //   location: "Dubai",
    //   category: "Mixed Use",
    //   image: "/assets/images/services/residential/featured-projects/2.jpg",
    //   slug: "marina-gate",
    // },
  ],
};
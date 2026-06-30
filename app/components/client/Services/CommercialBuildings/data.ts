export interface CommercialBuildingData {
  _id: string;
  __v?: number;

  metaTitle: string;
  metaDescription: string;

  image: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLink: string;
  slug: string;

  firstSection: {
    title: string;
    image: string;
    imageAlt: string;
    firstDescription: string;
    secondDescription: string;
  };

  systemSection: {
    title: string;
    items: {
      _id: string;
      __v: number;

      metaTitle: string;
      metaDescription: string;

      slug: string;
      createdAt: string;
      updatedAt: string;

      images: string[];

      firstSection: {
        title: string;
        shortTitle: string;
        subTitle: string;
        firstDescription: string;
        secondDescription: string;
        image: string;
        imageAlt: string;
        thumbnailImage: string;
      };

      secondSection: {
        title: string;
        description: string;
        items: {
          _id: string;
          image: string;
          imageAlt: string;
          title: string;
          buttonText: string;
          description: string;
        }[];
      };

      thirdSection: {
        title: string;
        description: string;
        items: {
          _id: string;
          title: string;
          link: string;
        }[];
      };

      fourthSection: {
        title: string;
        description: string;
        items: {
          _id: string;
          logo: string;
          logoAlt: string;
          image: string;
          imageAlt: string;
          title: string;
        }[];
      };

      fifthSection: {
        title: string;
        description: string;
        items: {
          _id: string;
          title: string;
          description: string;
          image: string;
          imageAlt: string;
        }[];
      };

      sixthSection: {
        title: string;
        items: {
          _id: string;
          clientName: string;
          designation: string;
          description: string;
        }[];
      };

      seventhSection: {
        title: string;
        items: {
          _id: string;
          question: string;
          answer: string;
        }[];
      };
    }[];
  };

  thirdSection: {
    description: string;
    buttonText:string;
    buttonLink:string;
  };
}

export const BannerData = {
  title: "Commercial Buildings",
  description:
    "From residential towers to airport terminals — Dosteen delivers ISO-certified building systems engineering across every sector in the UAE and Oman.",
  image: "/assets/images/services/banner.jpg",
  imageAlt: "Commercial Buildings",
};


export const DosteenSystemsData = {
  description:
    "Residential developments in the UAE and Oman demand building systems that combine security, aesthetics, and long-term reliability. From automated garage doors and sectional overhead doors for private villas to fire-rated doors, flood barriers, and multi-parking systems for high-rise towers — Dosteen engineers solutions that comply with Dubai Municipality and civil defence requirements while meeting the finish quality expected in premium residential projects.",
  title: "DOSTEEN SYSTEMS",
  systems: [
    {
      id: 1,
      title: "Garbage & Linen Chutes",
      image: "/assets/images/services/commercial/systems/1.jpg",
      slug: "#",
    },
    {
      id: 2,
      title: "Turnstiles Systems",
      image: "/assets/images/services/commercial/systems/2.jpg",
      slug: "#",
    },
    {
      id: 3,
      title: "Acoustic Partitions",
      image: "/assets/images/services/commercial/systems/3.jpg",
      slug: "#",
    },
    {
      id: 4,
      title: "Revolving Doors",
      image: "/assets/images/services/commercial/systems/4.jpg",
      slug: "#",
    },
    {
      id: 5,
      title: "Bespoke Steel Gates",
      image: "/assets/images/services/commercial/systems/5.jpg",
      slug: "#",
    },
    {
      id: 6,
      title: "Flood Barriers",
      image: "/assets/images/services/commercial/systems/6.jpg",
      slug: "#",
    },
    {
      id: 7,
      title: "Multi-Parking Solutions",
      image: "/assets/images/services/commercial/systems/7.jpg",
      slug: "#",
    },
    {
      id: 8,
      title: "Fire & Smoke Curtains",
      image: "/assets/images/services/commercial/systems/8.jpg",
      slug: "#",
    },
  ],
};

export const ProjectCtaData = {
    description: "<p>Need something built to spec? We also offer <span class='font-semibold'>custom solutions tailored</span> to your exact requirements.</p>",
    buttonText: "Discuss your project",
    buttonLink: "#",
}

export const featuredProjectsData = {
  title: "FEATURED PROJECTS",
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
    // {
    //   id: 4,
    //   title: "Downtown Residences",
    //   location: "Abu Dhabi",
    //   category: "Residential",
    //   image: "/assets/images/projects/downtown-residences.jpg",
    //   slug: "downtown-residences",
    // },
    // {
    //   id: 5,
    //   title: "Marina Gate",
    //   location: "Dubai",
    //   category: "Mixed Use",
    //   image: "/assets/images/projects/marina-gate.jpg",
    //   slug: "marina-gate",
    // },
  ],
};
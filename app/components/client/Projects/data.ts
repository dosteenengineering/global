export const banner = {
  title: "PROJECTS",
  image: "/assets/images/projects/banner.jpg",
};

export interface Project {
  image: string;
  title: string;
  location: string;
  category: string;
  scopes: string[];
  slug: string;
}

export const projectsData: Project[] = [
  {
    image: "/assets/images/projects/1.jpg",
    title: "Expo 2020, Dubai",
    location: "Dubai",
    category: "Infrastructure",
    scopes: ["Entrance Solutions", "Fire Protection Systems"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/2.jpg",
    title: "Zabeel Towers",
    location: "Dubai",
    category: "Commercial",
    scopes: ["Security Systems", "Access Control", "CCTV Solutions"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/3.jpg",
    title: "Al Mug",
    location: "Abu Dhabi",
    category: "Commercial",
    scopes: ["Entrance Solutions", "Barrier Systems"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/4.jpg",
    title: "Marina Heights",
    location: "Dubai Marina",
    category: "Residential",
    scopes: ["Smart Home Integration", "Access Control"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/5.jpg",
    title: "Palm Residences",
    location: "Palm Jumeirah",
    category: "Residential",
    scopes: ["Security Systems", "CCTV Solutions", "Intercom Systems"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/6.jpg",
    title: "DIFC Gate Building",
    location: "Dubai",
    category: "Commercial",
    scopes: ["Entrance Solutions", "Fire Protection Systems", "Access Control"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/7.jpg",
    title: "Yas Island Hub",
    location: "Abu Dhabi",
    category: "Hospitality",
    scopes: ["Barrier Systems", "Smart Parking"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/8.jpg",
    title: "Al Reem Island Tower",
    location: "Abu Dhabi",
    category: "Residential",
    scopes: ["Access Control", "Intercom Systems", "CCTV Solutions"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/4.jpg",
    title: "Sharjah City Centre",
    location: "Sharjah",
    category: "Retail",
    scopes: ["Entrance Solutions", "Security Systems"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/5.jpg",
    title: "Emirates Hills Villa Complex",
    location: "Dubai",
    category: "Residential",
    scopes: ["Smart Home Integration", "Fire Protection Systems", "Access Control"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/1.jpg",
    title: "Downtown Boulevard",
    location: "Dubai",
    category: "Mixed Use",
    scopes: ["Entrance Solutions", "Barrier Systems", "CCTV Solutions"],
    slug: "downtown-boulevard",
  },
  {
    image: "/assets/images/projects/2.jpg",
    title: "Jumeirah Golf Estates",
    location: "Dubai",
    category: "Residential",
    scopes: ["Smart Home Integration", "Security Systems"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/3.jpg",
    title: "Khalidiyah Mall",
    location: "Abu Dhabi",
    category: "Retail",
    scopes: ["Entrance Solutions", "Access Control"],
    slug: "khalidiyah-mall",
  },
  {
    image: "/assets/images/projects/6.jpg",
    title: "Festival City Arena",
    location: "Dubai",
    category: "Entertainment",
    scopes: ["Crowd Control Systems", "Security Systems", "CCTV Solutions"],
    slug: "#",
  },
  {
    image: "/assets/images/projects/7.jpg",
    title: "Corniche Medical Tower",
    location: "Abu Dhabi",
    category: "Healthcare",
    scopes: ["Entrance Solutions", "Fire Protection Systems"],
    slug: "#",
  },
];
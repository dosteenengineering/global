export const footerData = {
    logo: {
        src: "/assets/logos/logo-primary-full.png",
        alt: "Dosteen – Engineering Peace of Mind",
    },
    contact: {
        email: "info.mct@dosteen.com",
        phone: "+971 4 2582321",
    },
    socials: [
        { name: "instagram", href: "#", icon: "/assets/icons/footer/social/instagram.svg" },
        { name: "facebook", href: "#", icon: "/assets/icons/footer/social/facebook.svg" },
        { name: "linkedin", href: "#", icon: "/assets/icons/footer/social/linkedin.svg" },
        { name: "youtube", href: "#", icon: "/assets/icons/footer/social/youtube.svg" },
    ],
    navColumns: [
        {
            title: "Quick Links",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Why Dosteen", href: "#" },
                { label: "Projects", href: "/projects" },
                { label: "Case Studies", href: "#" },
                { label: "BIM", href: "/bim-capabilities" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact-us" },
                { label: "Request a Quote", href: "#" },
                { label: "Careers", href: "#" },
            ],
        },
        {
            title: "Residential Solutions",
            links: [
                { label: "Garage Solutions", href: "/solutions/residential-developments" },
                { label: "Architectural Shades", href: "/solutions/residential-developments" },
                { label: "Shutters", href: "/solutions/residential-developments" },
                { label: "Flood Barriers", href: "/solutions/residential-developments" },
                { label: "Garbage & Linen Chutes", href: "/solutions/residential-developments" },
                { label: "Multi Parking Solutions", href: "/solutions/residential-developments" },
                { label: "Bespoke Steel gates", href: "/solutions/residential-developments" },
                { label: "Fly Mesh & Insect Screens", href: "/solutions/residential-developments" },
                { label: "Retractable Pool Covers", href: "/solutions/residential-developments" },
            ],
        },
        {
            title: "Industrial & Commercial Solutions",
            links: [
                { label: "Docking Solutions", href: "/solutions/commercial-developments" },
                { label: "Sectional Overhead Doors", href: "/solutions/commercial-developments" },
                { label: "Garbage & Linen Chutes", href: "/solutions/commercial-developments" },
                { label: "Architectural Tensile Shades", href: "/solutions/commercial-developments" },
                { label: "Entrance Systems", href: "/solutions/commercial-developments" },
                { label: "Fire Protection", href: "/solutions/commercial-developments" },
                { label: "Flood Protection", href: "/solutions/commercial-developments" },
                { label: "Gate Systems", href: "/solutions/commercial-developments" },
                { label: "Forced Entry Solutions", href: "/solutions/commercial-developments" },
                { label: "Operable Partitions", href: "/solutions/commercial-developments" },
                { label: "Traffic Safety Solutions", href: "/solutions/commercial-developments" },
                { label: "Multi-Parking Solutions", href: "/solutions/commercial-developments" },
                { label: "Emergency Lighting Systems", href: "/solutions/commercial-developments" },
                { label: "Space Frame Structures", href: "/solutions/commercial-developments" },
            ],
        },
        {
            title: "Services",
            links: [
                { label: "AMC", href: "#" },
                { label: "Instant Call Service", href: "#" },
                { label: "Export", href: "#" },
            ],
        },
    ],
    solutionTypes: [
        "Garage Solutions",
        "Architectural Shades",
        "Shutters",
        "Flood Barriers",
        "Docking Solutions",
        "Entrance Systems",
        "Fire Protection",
        "Gate Systems",
        "AMC",
        "Other",
    ],
    certifications: [
        { src: "/assets/icons/footer/iso/f1.svg", alt: "TÜV NORD ISO 9001" },
        { src: "/assets/icons/footer/iso/f2.svg", alt: "TÜV NORD ISO 14001" },
        { src: "/assets/icons/footer/iso/f3.svg", alt: "TÜV NORD ISO 45001" },
        { src: "/assets/icons/footer/iso/f4.svg", alt: "Intertek 318" },
    ],
    bottomLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Sitemap", href: "#" },
    ],
};

export type FooterData = typeof footerData;


export const navItems = [
  {
    label: "ABOUT US",
    hasDropdown: true,
    href: "#",
    subItems: [
      { label: "Overview", href: "/about" },
      { label: "Why Dosteen", href: "#" },
      { label: "Partners & Clients", href: "/about/partners" },
      { label: "Awards & Certifications", href: "/about/recognitions" },
      { label: "FAQs", href: "/about/faq" },
    ],
  },
  {
    label: "SERVICES",
    hasDropdown: true,
    href: "#",
    subItems: [
      { label: "AMC", href: "#" },
      { label: "Instant Call Service", href: "#" },
      { label: "Export", href: "#" },
    ],
  },
  {
    label: "SOLUTIONS",
    hasDropdown: true,
    href: "#",
    subItems: [
      { label: "Overview", href: "/solutions" },
      { label: "Residential Solutions", href: "/solutions/residential-developments" },
      { label: "Industrial & Commercial Solution", href: "/solutions/commercial-developments" },
    ],
  },
  { label: "RESOURCE HUB", hasDropdown: false, href: "/resource" },
  { label: "PROJECTS", hasDropdown: false, href: "/projects" },
];

 export const menuItems = [
    { label: "BIM Capabilities", href: "/bim-capabilities" },
    { label: "CSI Specifications", href: "/csi-specifications" },
    { label: "Resources", href: "/resource" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
  ];
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
        { name: "instagram", href: "https://www.instagram.com/dosteen.engineering/", icon: "/assets/icons/footer/social/instagram.svg" },
        { name: "facebook", href: "https://www.facebook.com/dosteen.engineering", icon: "/assets/icons/footer/social/facebook.svg" },
        { name: "linkedin", href: "https://www.linkedin.com/company/dosteen-engineering/", icon: "/assets/icons/footer/social/linkedin.svg" },
        // { name: "youtube", href: "#", icon: "/assets/icons/footer/social/youtube.svg" },
    ],
    navColumns: [
        {
            title: "Quick Links",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Why Dosteen", href: "/about" },
                { label: "Projects", href: "/case-studies" },
                { label: "Case Studies", href: "#" },
                { label: "BIM", href: "/bim-capabilities" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact-us" },
                { label: "Request a Quote", href: "/contact-us#contact-form" },
                // { label: "Careers", href: "#" },
            ],
        },
        {
            title: "Residential Solutions",
            links: [
                { label: "Garage Solutions", href: "/solutions/residential-developments/garage-solutions" },
                { label: "Architectural Shades", href: "/solutions/residential-developments/architectural-shades" },
                { label: "Shutters", href: "/solutions/residential-developments/shutters" },
                { label: "Flood Barriers", href: "/solutions/residential-developments/flood-barriers" },
                { label: "Garbage & Linen Chutes", href: "/solutions/residential-developments/garbage-and-linen-chutes" },
                { label: "Multi Parking Solutions", href: "/solutions/residential-developments/multi-level-parking" },
                { label: "Bespoke Steel gates", href: "/solutions/residential-developments/bespoke-steel-gates" },
                { label: "Fly Mesh & Insect Screens", href: "/solutions/residential-developments/fly-mesh-and-insect-screens" },
                { label: "Retractable Pool Covers", href: "/solutions/residential-developments/retractable-pool-covers" },
            ],
        },
        {
            title: "Industrial & Commercial Solutions",
            links: [
                { label: "Docking Solutions", href: "/solutions/commercial-developments/docking-solutions" },
                { label: "Sectional Overhead Doors", href: "/solutions/commercial-developments/sectional-overhead-doors" },
                { label: "Garbage & Linen Chutes", href: "/solutions/commercial-developments/garbage-and-linen-chutes" },
                { label: "Architectural Tensile Shades", href: "/solutions/commercial-developments/architectural-tensile-shades" },
                { label: "Entrance Systems", href: "/solutions/commercial-developments/entrance-systems" },
                { label: "Fire Protection", href: "/solutions/commercial-developments/fire-protection" },
                { label: "Flood Protection", href: "/solutions/commercial-developments/flood-protection" },
                { label: "Gate Systems", href: "/solutions/commercial-developments/gate-systems" },
                { label: "Forced Entry Solutions", href: "/solutions/commercial-developments/forced-entry-solutions" },
                { label: "Operable Partitions", href: "/solutions/commercial-developments/operable-partitions" },
                { label: "Traffic Safety Solutions", href: "/solutions/commercial-developments/traffic-safety-solutions" },
                { label: "Multi-Parking Solutions", href: "/solutions/commercial-developments/multi-level-parking" },
                { label: "Emergency Lighting Systems", href: "/solutions/commercial-developments/emergency-lighting-systems" },
                { label: "Space Frame Structures", href: "/solutions/commercial-developments/space-frame-structures" },
            ],
        },
        // {
        //     title: "Services",
        //     links: [
        //         { label: "AMC", href: "#" },
        //         { label: "Instant Call Service", href: "#" },
        //         { label: "Export", href: "#" },
        //     ],
        // },
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
      { label: "Partners & Clients", href: "/about/partners" },
      { label: "Awards & Certifications", href: "/about/recognitions" },
      { label: "FAQs", href: "/about/faq" },
    ],
  },
//   {
//     label: "SERVICES",
//     hasDropdown: true,
//     href: "#",
//     subItems: [
//       { label: "AMC", href: "#" },
//       { label: "Instant Call Service", href: "#" },
//       { label: "Export", href: "#" },
//     ],
//   },
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
  { label: "CASE STUDIES", hasDropdown: false, href: "/case-studies" },
];

 export const menuItems = [
    { label: "BIM Capabilities", href: "/bim-capabilities" },
    { label: "CSI Specifications", href: "/csi-specifications" },
    { label: "Resources", href: "/resource" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
  ];
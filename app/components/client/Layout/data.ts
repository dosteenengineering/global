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
                { label: "About Us", href: "#" },
                { label: "Why Dosteen", href: "#" },
                { label: "Projects", href: "#" },
                { label: "Case Studies", href: "#" },
                { label: "BIM", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Request a Quote", href: "#" },
                { label: "Careers", href: "#" },
            ],
        },
        {
            title: "Residential Solutions",
            links: [
                { label: "Garage Solutions", href: "#" },
                { label: "Architectural Shades", href: "#" },
                { label: "Shutters", href: "#" },
                { label: "Flood Barriers", href: "#" },
                { label: "Garbage & Linen Chutes", href: "#" },
                { label: "Multi Parking Solutions", href: "#" },
                { label: "Bespoke Steel gates", href: "#" },
                { label: "Fly Mesh & Insect Screens", href: "#" },
                { label: "Retractable Pool Covers", href: "#" },
            ],
        },
        {
            title: "Industrial & Commercial Solutions",
            links: [
                { label: "Docking Solutions", href: "#" },
                { label: "Sectional Overhead Doors", href: "#" },
                { label: "Garbage & Linen Chutes", href: "#" },
                { label: "Architectural Tensile Shades", href: "#" },
                { label: "Entrance Systems", href: "#" },
                { label: "Fire Protection", href: "#" },
                { label: "Flood Protection", href: "#" },
                { label: "Gate Systems", href: "#" },
                { label: "Forced Entry Solutions", href: "#" },
                { label: "Operable Partitions", href: "#" },
                { label: "Traffic Safety Solutions", href: "#" },
                { label: "Multi-Parking Solutions", href: "#" },
                { label: "Emergency Lighting Systems", href: "#" },
                { label: "Space Frame Structures", href: "#" },
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
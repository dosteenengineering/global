import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  async redirects() {
    return [
      // --- General page redirects ---
      {
        source: "/commercial",
        destination: "/solutions/commercial",
        permanent: true,
      },
      {
        source: "/residential",
        destination: "/solutions/residential",
        permanent: true,
      },
      {
        source: "/projects-engineered",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/reach-us",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/book-online",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/copy-of-industrial",
        destination: "/solutions/industrial",
        permanent: true,
      },
      {
        source: "/copy-of-commerical-test",
        destination: "/solutions/commercial",
        permanent: true,
      },
      {
        source: "/copy-of-force-entry",
        destination: "/solutions/vault-doors",
        permanent: true,
      },
      {
        source: "/copy-of-made-in-oman",
        destination: "/",
        permanent: true,
      },
      {
        source: "/copy-of-residential",
        destination: "/solutions/architectural-shades",
        permanent: true,
      },
      {
        source: "/innovative-architectural-shading-systems-in-oman",
        destination: "/solutions/architectural-shades",
        permanent: true,
      },

      // --- /residential/* legacy paths ---
      {
        source: "/residential/shutters",
        destination: "/solutions/garage-doors",
        permanent: true,
      },
      {
        source: "/residential/architectural-shades",
        destination: "/solutions/architectural-shades",
        permanent: true,
      },
      {
        source: "/residential/garage-doors",
        destination: "/solutions/garage-doors",
        permanent: true,
      },
      {
        source: "/residential/garbage-linen-chutes",
        destination: "/solutions/garbage-linen-chutes",
        permanent: true,
      },
      {
        source: "/residential/retractable-pool-covers",
        destination: "/solutions/retractable-pool-covers",
        permanent: true,
      },
      {
        source: "/residential/flood-barriers-for-homes",
        destination: "/solutions/flood-barriers",
        permanent: true,
      },
      {
        source: "/residential/multi-parking-solutions",
        destination: "/solutions/multi-parking-systems",
        permanent: true,
      },
      {
        source: "/residential/bespoke-steel-gates",
        destination: "/solutions/bespoke-steel-gates",
        permanent: true,
      },
      {
        source: "/residential/fly-mesh-insect-screens",
        destination: "/solutions/fly-mesh-insect-screens",
        permanent: true,
      },
      {
        source: "/residential/copy-of-innovative-architectural-shad",
        destination: "/solutions/architectural-shades",
        permanent: true,
      },

      // --- /solutions/* single-segment legacy/slug redirects ---
      {
        source: "/solutions/government-facilities",
        destination: "/solutions/government-building-systems",
        permanent: true,
      },
      {
        source: "/solutions/government",
        destination: "/solutions/government-building-systems",
        permanent: true,
      },
      {
        source: "/solutions/industrial-facilities",
        destination: "/solutions/industrial-building-systems",
        permanent: true,
      },
      {
        source: "/solutions/commercial-buildings",
        destination: "/solutions/commercial-building-systems",
        permanent: true,
      },
      {
        source: "/solutions/residential-developments",
        destination: "/solutions/residential-building-systems",
        permanent: true,
      },
      {
        source: "/solutions/mantrap-security-doors",
        destination: "/solutions/mantrap-access-control",
        permanent: true,
      },
      {
        source: "/solutions/vault-door-solutions",
        destination: "/solutions/vault-doors",
        permanent: true,
      },
      {
        source: "/solutions/fire-protection-system",
        destination: "/solutions/fire-protection-systems",
        permanent: true,
      },
      {
        source: "/solutions/elegant-shutters-for-stylish-secure-living",
        destination: "/solutions/garage-doors",
        permanent: true,
      },
      {
        source: "/solutions/premium-residential-garage-doors-in-uae-oman",
        destination: "/solutions/garage-doors",
        permanent: true,
      },
      {
        source: "/solutions/retractable-pool-covers-for-year-round-protection",
        destination: "/solutions/retractable-pool-covers",
        permanent: true,
      },
      {
        source: "/solutions/insect-screens-fly-meshsolutions-for-healthy-living",
        destination: "/solutions/fly-mesh-insect-screens",
        permanent: true,
      },
      {
        source: "/solutions/garbage-linen-chutes-systems",
        destination: "/solutions/garbage-linen-chutes",
        permanent: true,
      },
      {
        source: "/solutions/space-saving-multi-parking-systems-for-homes-building",
        destination: "/solutions/multi-parking-systems",
        permanent: true,
      },
      {
        source: "/solutions/advanced-flood-barriers-for-homes-in-uae-oman",
        destination: "/solutions/flood-barriers",
        permanent: true,
      },
      {
        source: "/solutions/bespoke-steel-gates-for-youre-homes-in-uae-oman",
        destination: "/solutions/bespoke-steel-gates",
        permanent: true,
      },
      {
        source: "/solutions/security-shutters-for-government-high-security-facilities",
        destination: "/solutions/security-shutters",
        permanent: true,
      },
      {
        source: "/solutions/blast-doors-glass-windows-for-government-grade-protection",
        destination: "/solutions/blast-doors-windows",
        permanent: true,
      },

      // --- /solutions/<category>/<slug> specific overrides (must precede the wildcard below) ---
      {
        source: "/solutions/commercial/advanced-flood-barriers-for-homes-in-uae-oman",
        destination: "/solutions/flood-barriers",
        permanent: true,
      },
      {
        source: "/solutions/government/vault-door-solutions",
        destination: "/solutions/vault-doors",
        permanent: true,
      },
      {
        source: "/solutions/government/security-shutters-for-government-high-security-facilities",
        destination: "/solutions/security-shutters",
        permanent: true,
      },
      {
        source: "/solutions/government/mantrap-security-doors",
        destination: "/solutions/mantrap-access-control",
        permanent: true,
      },
      {
        source: "/solutions/residential/premium-residential-garage-doors-in-uae-oman",
        destination: "/solutions/garage-doors",
        permanent: true,
      },
      {
        source: "/solutions/commercial/bespoke-steel-gates-for-youre-homes-in-uae-oman",
        destination: "/solutions/bespoke-steel-gates",
        permanent: true,
      },

      // --- /blog/* legacy paths ---
      {
        source: "/blog/solutions/government/blast-doors-glass-windows-for-government-grade-protection",
        destination: "/solutions/blast-doors-windows",
        permanent: true,
      },

      // --- Wildcard fallback: MUST stay last so specific rules above take priority ---
      {
        source: "/solutions/:id/:service",
        destination: "/solutions/:service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
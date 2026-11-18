import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import InnerPageBanner from "@/app/components/common/InnerPageBanner";

export const metadata = {
  title: "Sitemap | Dosteen",
  description: "Browse the key pages and resources across the Dosteen website.",
};

const sitemapSections = [
  {
    number: "01",
    title: "Discover Dosteen",
    links: [
      { label: "Home", href: "/" },
      { label: "About Dosteen", href: "/about" },
      { label: "All Solutions", href: "/solutions" },
      { label: "Partners & Clients", href: "/about/partners" },
      { label: "Awards & Certifications", href: "/about/awards" },
      { label: "Frequently Asked Questions", href: "/about/faq" },
    ],
  },
  {
    number: "02",
    title: "Solutions",
    groups: [
      {
        title: "Solution overview",
        links: [
          { label: "All Solutions", href: "/solutions" },
          { label: "Residential Solutions", href: "/solutions/residential-developments" },
          { label: "Commercial Solutions", href: "/solutions/commercial-buildings" },
          { label: "Industrial Facilities", href: "/solutions/industrial-facilities" },
          { label: "Government Facilities", href: "/solutions/government-facilities" },
        ],
      },
      {
        title: "Residential",
        links: [
          { label: "Garage Doors", href: "/solutions/garage-doors" },
          { label: "Architectural Shades", href: "/solutions/architectural-shades" },
          { label: "Flood Barriers", href: "/solutions/flood-barriers" },
          { label: "Retractable Pool Covers", href: "/solutions/retractable-pool-covers" },
          { label: "Bespoke Steel Gates", href: "/solutions/bespoke-steel-gates" },
        ],
      },
      {
        title: "Commercial",
        links: [
          { label: "Docking Solutions", href: "/solutions/docking-solutions" },
          { label: "Fire Protection Systems", href: "/solutions/fire-protection-systems" },
          { label: "Entrance Systems", href: "/solutions/entrance-systems" },
          { label: "Security Shutters", href: "/solutions/security-shutters" },
          { label: "Multi-Parking Systems", href: "/solutions/multi-parking-systems" },
        ],
      },
      {
        title: "Industrial",
        links: [
          { label: "Industrial Facilities", href: "/solutions/industrial-building-systems" },
          { label: "Docking Solutions", href: "/solutions/commercial-developments/docking-solutions" },
          { label: "Sectional Overhead Doors", href: "/solutions/commercial-developments/sectional-overhead-doors" },
          { label: "Traffic Safety Solutions", href: "/solutions/commercial-developments/traffic-safety-solutions" },
          { label: "Space Frame Structures", href: "/solutions/commercial-developments/space-frame-structures" },
        ],
      },
      {
        title: "Government",
        links: [
          { label: "Government Buildings", href: "/solutions/government-building-systems" },
          { label: "Blast Doors & Windows", href: "/solutions/blast-doors-windows" },
          { label: "Vault Doors", href: "/solutions/vault-doors" },
          { label: "Mantrap Access Control", href: "/solutions/mantrap-access-control" },
          { label: "Security Shutters", href: "/solutions/security-shutters" },
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Projects & expertise",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Gallery", href: "/gallery" },
      { label: "BIM Capabilities", href: "/bim-capabilities" },
      { label: "CSI Specifications", href: "/csi-specifications" },
    ],
  },
  {
    number: "04",
    title: "Insights & resources",
    links: [
      { label: "Resource Hub", href: "/resource" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    number: "05",
    title: "Get in touch",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Partner Registration", href: "/vendor-registration" },
    ],
  },
  {
    number: "06",
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

type SitemapLink = { label: string; href: string };

function SitemapLinks({ links }: { links: SitemapLink[] }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-2 text-[15px] leading-6 text-[#596674] transition-colors hover:text-[#1b2b6b] sm:text-base"
          >
            <span>{link.label}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white pb-24 text-secondary md:pb-140">
      <InnerPageBanner
        title="Sitemap"
        description="Browse our key pages by topic, from engineered solutions and project work to resources and ways to get in touch."
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px] md:mb-[50px]"
      />

      <div className="">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sitemapSections.map((section) => (
            <section
              key={section.number}
              className={`rounded-2xl border border-[#e5e9ed] bg-white p-6 shadow-[0_12px_40px_rgba(16,32,44,0.035)] sm:p-8 ${
                section.groups ? "md:col-span-2 xl:col-span-3" : ""
              }`}
              aria-labelledby={`sitemap-section-${section.number}`}
            >
              <div className="flex items-start gap-4 border-b border-[#edf0f2] pb-5">
                <span className="pt-1 text-xs font-medium tracking-[0.12em] text-[#9aa4ae]">
                  {section.number}
                </span>
                <div>
                  <h2
                    id={`sitemap-section-${section.number}`}
                    className="font-poppins text-xl font-medium tracking-[-0.02em] sm:text-2xl"
                  >
                    {section.title}
                  </h2>
                </div>
              </div>

              {section.groups ? (
                <div className="grid gap-8 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                  {section.groups.map((group) => (
                    <div key={group.title}>
                      <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1b2b6b]">
                        {group.title}
                      </h3>
                      <SitemapLinks links={group.links} />
                    </div>
                  ))}
                </div>
              ) : (
                <SitemapLinks links={section.links ?? []} />
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

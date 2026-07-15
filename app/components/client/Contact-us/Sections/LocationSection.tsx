"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactData } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { useRef, useState } from "react";
import ContainerAnchor from "@/app/components/layout/ContainerAnchor";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";
import { useParallax } from "@/app/components/common/animations/useParallax";

import { useHashScroll } from "@/app/hooks/useHashScroll";



export default function LocationsSection({ data }: { data: ContactData['secondSection'] }) {
  useHashScroll(0); // match your header height
  const { image } = data;
  const locations = data.items.map((item) => ({
    country: item.title,
    locationUrl: item.map,
    ...item
  }))
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftInset = useGetContainerSpacing(containerRef);
  const { ref, parallaxY } = useParallax(20); // pass your lg (smallest) scale;

  // Group locations by country (for mobile tabs)
  const grouped = locations.reduce<Record<string, typeof locations>>(
    (acc, loc) => {
      if (!acc[loc.country]) acc[loc.country] = [];
      acc[loc.country].push(loc);
      return acc;
    },
    {}
  );

  const countries = Object.keys(grouped);
  const [activeCountry, setActiveCountry] = useState(countries[0]);
  const activeLocations = grouped[activeCountry] ?? [];

  return (
    <section>
      <ContainerAnchor ref={containerRef} />
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Left — hero image */}
        <div ref={ref} className="relative shrink-0 h-[199px] min-h-max md:h-[450px] lg:h-auto w-full lg:w-[35.94%] overflow-hidden" >
          <Image src={image} alt="Locations" fill className="object-cover h-full scale-[1.35] md:scale-[1.05] lg:scale-110 xl:scale-120" priority
            style={{ transform: ` translateY(${parallaxY}vh) scale(1.1)`, }} />
        </div>

        {/* Right — blue panel */}
        <div className="relative flex-1 py-12.5 md:py-140 3xl:py-150 ps-[15px] lg:ps-90" style={{ paddingRight: leftInset }} >
          <PrimaryNoise2 />

          {/* ── Mobile: Tab Buttons ── */}
          <div className="relative flex flex-wrap gap-[10px] mb-7.5 lg:mb-60 md:hidden">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={[
                  "h-7.5 md:h-[42px]  px-[9px] rounded-[50px] border text-[12px] uppercase transition-all duration-300 font-medium",
                  activeCountry === country
                    ? "bg-white/30 text-white border-white"
                    : "bg-transparent text-white border-white/40 hover:border-white",
                ]
                  .join(" ")}
              >
                {country}
              </button>
            ))}
          </div>

          {/* ── Mobile: Filtered Cards ── */}
          <div className="relative md:hidden inline-grid grid-cols-1 sm:grid-cols-2 gap-y-7.5 lg:gap-y-100 gap-x-120 w-full">
            {activeLocations.map((loc, idx) => (
              <Reveal key={`${activeCountry}-${idx}`} variants={moveUpV2} delayRange={idx * 0.2}>
                <LocationCard {...loc} showCountry={false} />
              </Reveal>
            ))}
          </div>

          {/* ── Desktop: Original Design (all cards with country heading) ── */}
          <div className="relative hidden md:inline-grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-[auto_auto] xl:gap-y-100 gap-x-5 xl:gap-x-120 3xl:gap-x-[131px] w-full">
            {locations.map((loc, idx) => (
              <Reveal key={idx} variants={moveUpV2} delayRange={idx * 0.2}>
                <LocationCard {...loc} showCountry={true} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

type LocationCardProps = {
  country: string;
  branch: string;
  address: string;
  phone: string;
  email: string;
  locationUrl: string;
  showCountry?: boolean;
};

function LocationCard({
  country,
  branch,
  address,
  phone,
  email,
  locationUrl,
  showCountry = true,
}: LocationCardProps) {
  return (
    <div className="flex flex-col 2xl:max-w-[427px] 3xl:min-w-[427px] text-white p-5 lg:p-0 bg-gradient-to-r from-[#022e9e3b] to-[#d4e6ff33] max-sm:backdrop-blur-sm lg:bg-none">
      {/* Country — desktop only */}
      {showCountry && (
        <h3 className="text-30 font-medium leading-[2.1666] tracking-[-0.02em] mb-[10px] xl:mb-20">
          {country}
        </h3>
      )}

      {/* Divider */}
      <div className="hidden lg:block w-full h-px bg-[#76A7FF] mb-40" />

      {/* Branch name */}
      <p className="font-semibold text-[18px] lg:text-19 leading-[1.52] tracking-[-0.02em] mb-5 lg:mb-0 border-b border-bdr-blue pb-2.5 lg:border-b-0 lg:pb-0">
        {branch}
      </p>

      {/* Address */}
      <p className="text-description mb-25 2xl:mb-[26px] whitespace-pre-line">
        {address}
      </p>

      {/* Phone */}
      <p className="font-semibold text-19 leading-[1.52] tracking-[-0.02em]">
        <span>T:</span>{" "}
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
          {phone}
        </a>
      </p>

      {/* Email */}
      <p className="font-semibold text-19 leading-[1.52] tracking-[-0.02em] mb-2.5 lg:mb-20">
        <span>E:</span>{" "}
        <a href={`mailto:${email}`} className="hover:underline">
          {email}
        </a>
      </p>

      {/* Location button */}
      <Link
        href={locationUrl}
        className="group overflow-hidden w-fit max-w-[138px] h-7.5 md:h-[42px] px-2.5 lg:pl-[26px] lg:pr-[16px] flex items-center gap-[10px] border border-white rounded-full text-white text-15 uppercase relative"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-secondary rounded-full scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
        />
        <span className="relative z-10 tracking-[2%] md:tracking-normal">
          Location
        </span>
        <Image
          src="/assets/icons/location-pin.svg"
          alt="location"
          width={11}
          height={16}
          className="relative z-10 h-[12px] md:h-[16px] w-[8px] md:w-[11px]"
        />
      </Link>
    </div>
  );
}
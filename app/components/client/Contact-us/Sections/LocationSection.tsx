"use client";

import Image from "next/image";
import Link from "next/link";
import { locationsData } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { useRef } from "react";
import ContainerAnchor from "@/app/components/layout/ContainerAnchor";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";
import { useParallax } from "@/app/components/common/animations/useParallax";

export default function LocationsSection() {
  const { image, locations } = locationsData;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftInset = useGetContainerSpacing(containerRef);
  const { ref, parallaxY } = useParallax(12);

  return (
    <section>
      <ContainerAnchor ref={containerRef} />
      <div className="flex min-h-screen">
        {/* Left — hero image, fixed 35.94% width */}
        <div
          ref={ref}
          className="relative hidden md:block shrink-0 w-[35.94%] overflow-hidden"
        >
          <Image
            src={image}
            alt="Locations"
            fill
            className="object-cover"
            priority
            style={{
              transform: `scale(${1.1}) translateY(${parallaxY}vh)`,
            }}
          />
        </div>
        {/* Right — blue panel */}
        <div
          className="relative flex-1 py-140 3xl:py-150 pl-90"
          style={{ paddingRight: leftInset }}
        >
          <PrimaryNoise2 />
          <div className="relative inline-grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-[auto_auto] gap-y-100 gap-x-120 3xl:gap-x-[131px]">
            {locations.map((loc, idx) => (
              <Reveal key={idx} variants={moveUpV2} delayRange={idx * 0.2}>
                <LocationCard {...loc} />
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
};

function LocationCard({
  country,
  branch,
  address,
  phone,
  email,
  locationUrl,
}: LocationCardProps) {
  return (
    <div className="flex flex-col 2xl:max-w-[427px] 3xl:min-w-[427px] text-white">
      {/* Country */}
      <h3 className="text-30 font-medium leading-[2.1666] tracking-[-0.02em] mb-[10px]">
        {country}
      </h3>

      {/* Divider */}
      <div className="w-full h-px bg-[#76A7FF] mb-40" />

      {/* Branch name */}
      <p className="font-semibold text-19 leading-[1.52] tracking-[-0.02em]">
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
      <p className="font-semibold text-19 leading-[1.52] tracking-[-0.02em] mb-20">
        <span>E:</span>{" "}
        <a href={`mailto:${email}`} className="hover:underline">
          {email}
        </a>
      </p>

      {/* Location button */}
      <Link
        href={locationUrl}
        className="group overflow-hidden w-fit max-w-[138px] h-[42px] pl-[26px] pr-[16px] flex items-center gap-[10px] border border-white rounded-full text-white text-15 uppercase relative"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-secondary rounded-full scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"
        />

        <span className="relative z-10">Location</span>

        <Image
          src="/assets/icons/location-pin.svg"
          alt="location"
          width={11}
          height={16}
          className="relative z-10 h-[16px] w-[11px]"
        />
      </Link>
    </div>
  );
}

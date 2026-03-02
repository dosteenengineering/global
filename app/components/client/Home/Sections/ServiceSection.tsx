"use client";

import { useState } from "react";
import Image from "next/image";
import { servicesData, ServiceTab } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";


export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string>(servicesData.tabs[1].key);

  const activeData =
    servicesData.tabs.find((tab) => tab.key === activeTab) ??
    servicesData.tabs[0];

  return (
    <section className="relative w-full overflow-hidden">
      <PrimaryNoise />

      <div className="absolute top-0 -right-80 w-[1062px] h-[513px] pointer-events-none">
        <Image
          src={servicesData.topRightSvg}
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 container py-140 3xl:py-150">
        <h2 className="text-90 leading-[1.11] text-white uppercase font-helvetica text-center">
          {servicesData.title}
        </h2>

        {/* Body: Left tabs + divider + Right content */}
        <div className="flex items-stretch gap-0 pt-20">
          {/* ── Left Vertical Line ── */}
          <div className="w-px bg-[#76A7FF] shrink-0" />

          {/* ── Tabs ── */}
          <div className="flex flex-col justify-start">
            {servicesData.tabs.map((tab: ServiceTab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="group flex items-center gap-9 pl-9 pr-[195px] text-left transition-all duration-300 cursor-pointer"
                >
                  {/* Arrow — takes up space always to prevent jump */}
                  <span
                    className={`transition-all duration-300 mb-[72px] ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    <Image src="/assets/icons/arrow-right.svg" alt="arrow" width={31} height={20} />
                  </span>

                  <span
                    className={`text-30 font-poppins leading-[1.33] font-[300] -tracking-[2%] transition-all duration-300 mb-[72px] min-w-[260px] 3xl:min-w-[285px] ${
                      isActive
                        ? "font-[600] text-white"
                        : "text-white/60"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Middle Vertical Line ── */}
          <div className="w-px bg-[#76A7FF] shrink-0" />

          {/* ── Right Content ── */}
          <div className="flex-1  pl-150 flex flex-col min-h-[400px]">
            {/* Image */}
            <div className="relative w-full h-[200px] mb-[70px]">
              <Image
                key={activeData.key}
                src={activeData.image}
                alt={activeData.label}
                height={200}
                width={630}
                className="object-contain object-left transition-opacity duration-300"
              />
            </div>

            {/* Description */}
            <p className="text-55 text-white leading-[1.18] font-[300] font-poppins -tracking-[2%] max-w-[855px] mb-[50px]">
              {activeData.description}
            </p>

            {/* CTA Button */}
            <div className="w-fit">
                <BorderButton text="Read More" iconColor="white" px="px-[35px]"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

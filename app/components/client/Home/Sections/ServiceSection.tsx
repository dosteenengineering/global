"use client";

import { useState } from "react";
import Image from "next/image";
import { servicesData, ServiceTab } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string>(servicesData.tabs[1].key);

  const activeData =
    servicesData.tabs.find((tab) => tab.key === activeTab) ??
    servicesData.tabs[0];

  return (
    <section className="relative w-full overflow-hidden">
      <PrimaryNoise />

      <div className="absolute -top-85 lg:top-0 -right-88 -lg:right-80 w-[1062px] h-[513px] pointer-events-none">
        <Image
          src={servicesData.topRightSvg}
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 container py-140 3xl:py-150">
        <h2 className="section-font-size leading-[1.11] text-white uppercase font-helvetica text-left lg:text-center 3xl:-ml-[67px]">
          {servicesData.title}
        </h2>

        {/* ===== Desktop (lg and up) ==== */}
        <div className="hidden lg:flex items-stretch gap-0 pt-16 2xl:pt-20">
          <div className="w-px bg-[#76A7FF] shrink-0" />

          <div className="flex flex-col justify-start">
            {servicesData.tabs.map((tab: ServiceTab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="group flex items-center gap-9 pl-9 pr-10 xl:pr-20 2xl:pr-150 3xl:pr-[195px] text-left transition-all duration-300 cursor-pointer"
                >
                  <span className={`transition-all duration-300 mb-14 2xl:mb-[72px] ${isActive ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                    <Image src="/assets/icons/arrow-right.svg" alt="arrow" width={31} height={20} />
                  </span>

                  <span className={`text-30 font-poppins leading-[1.33] font-[300] -tracking-[2%] transition-all duration-300 mb-14 2xl:mb-[72px] min-w-[260px] 2xl:min-w-[275px] 3xl:min-w-[285px] ${isActive ? "font-[600] text-white" : "text-white/60"}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-px bg-[#76A7FF] shrink-0" />

          <div className="flex-1 pl-20 2xl:pl-140 3xl:pl-150 flex flex-col min-h-[400px]">
            <div className="relative w-full h-[150px] xl:h-[200px] mb-[70px] 2xl:px-3">
              <Image
                key={activeData.key}
                src={activeData.image}
                alt={activeData.label}
                height={200}
                width={630}
                className="object-contain object-left transition-opacity duration-300 pointer-events-none"
              />
            </div>

            <p className="text-55 text-white leading-[1.18] font-[300] font-poppins -tracking-[2%] max-w-[855px] mb-[50px]">
              {activeData.description}
            </p>

            <div className="w-fit">
              <BorderButton text="Read More" iconColor="white" px="px-[35px]" />
            </div>
          </div>
        </div>

        {/* ===== Mobile / Tablet ======= */}
        <div className="lg:hidden pt-10 md:pt-12">
          {/* Horizontal Swiper */}
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            onSlideChange={(swiper) =>
              setActiveTab(servicesData.tabs[swiper.activeIndex].key)
            }
          >
            {servicesData.tabs.map((tab: ServiceTab) => {
              const isActive = tab.key === activeTab;
              return (
                <SwiperSlide key={tab.key} className="!w-fit">
                  <button
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left transition-all duration-300`}
                  >
                    <span className={`text-25 md:text-30 font-poppins leading-[1.33] -tracking-[2%] transition-all duration-300 ${isActive ? "font-[600] text-white" : "text-white/60"}`}>
                      {tab.label}
                    </span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="h-[1px] bg-[#76A7FF] my-4 md:my-6 md:mb-14" />

          {/* Active Content */}
          <div>
            <div className="relative w-full h-[180px] mb-2 md:mb-12">
              <Image
                key={activeData.key}
                src={activeData.image}
                alt={activeData.label}
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-[26px] lg:text-55 text-white leading-[1.18] font-[300] font-poppins -tracking-[2%] max-w-[680px] lg:max-w-[855px] mb-7 md:mb-12">
              {activeData.description}
            </p>

            <div className="w-fit">
              <BorderButton text="Read More" iconColor="white" px="px-[24px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

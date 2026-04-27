"use client";

import "swiper/css";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { WhyChooseData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";

function IconWrapper({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="relative flex-shrink-0 w-[100px] h-[100px]">
      <Image
        src="/assets/images/about/why-choose/card-bg-cricle.svg"
        alt=""
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[60px] h-[60px] relative">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex flex-col p-50 backdrop-blur-[20px] h-[481px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.2) 100%)",
      }}
    >
      <IconWrapper icon={icon} label={title} />
      <h3 className="text-white text-30 font-light leading-[1.333] tracking-[-0.02em] mt-30 mb-20">
        {title}
      </h3>
      <p className="text-white text-description">{description}</p>
    </div>
  );
}

const slideGroups = WhyChooseData.items.reduce<(typeof WhyChooseData.items)[]>(
  (acc, item, i) => {
    if (i % 2 === 0) acc.push([item]);
    else acc[acc.length - 1].push(item);
    return acc;
  },
  [],
);

export default function WhyChooseDosteen() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  function updateState(swiper: SwiperType) {
    setActiveIndex(swiper.activeIndex);
    setSlidesPerView(
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1,
    );
  }

  const dotCount = slideGroups.length - slidesPerView + 1;
  const showPagination = dotCount > 1;

  return (
    <section className="relative w-full select-none">
      <PrimaryNoise2 />

      <div className="absolute right-[-40%] top-[-18%] w-[900px] h-[900px] 3xl:w-[1280px] 3xl:h-[1280px] pointer-events-none">
        <Image
          src="/assets/images/about/why-choose/why-bg2.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 container py-[140px] 3xl:py-[150px] w-full">
        <SectionTitle
          text={WhyChooseData.title}
          className="section-heading text-white uppercase mb-50 max-w-[30ch]"
        />

        <div className="lg:pl-[25.3%] w-full">
          <p className="text-white font-light text-30 leading-[1.333] tracking-[-0.02em] mb-100 3xl:mb-[109px] max-w-[967px]">
            {WhyChooseData.description}
          </p>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateState(swiper);
          }}
          onSlideChange={(swiper) => updateState(swiper)}
          onBreakpoint={(swiper) => updateState(swiper)}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {slideGroups.map((group, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <div className="flex flex-col gap-20">
                {group.map((item) => (
                  <FeatureCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showPagination && (
          <div className="flex items-center justify-center gap-[10px] mt-10">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button type="button"
                key={i}
                onClick={() => swiperRef.current?.slideTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-[10px] h-[10px] rounded-full border border-white cursor-pointer transition-all duration-300 ${
                  i === activeIndex ? "bg-white" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
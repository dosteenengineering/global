"use client";
import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { AboutData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";
import StatNoise2 from "@/app/components/common/noise/StatNoise2";

function StatCard({
  icon,
  value,
  label,
  subLabel,
  noiseVariant,
}: {
  icon: string;
  value: string;
  label: string;
  subLabel: string;
  noiseVariant: 1 | 2;
}) {
  return (
    <div className="flex items-center py-[15px] md:py-25 px-[40px] md:px-50 gap-[55px] md:gap-200 3xl:gap-[296px]  relative flex-1 min-w-0 max-h-[148px]">
      {noiseVariant === 1 ? <StatNoise1 /> : <StatNoise2 />}

      {/* Icon */}
      <div className="relative shrink-0 h-[40px] w-[40px] md:h-[60px] md:w-[60px] 2xl:w-[70px] 2xl:h-[70px]">
        <Image src={icon} alt={label} fill className="object-contain" />
      </div>

      {/* Text */}
      <div>
        <div className="flex items-baseline gap-x-[5px] md:gap-x-[14px]">
          <div className="flex flex-row items-start">
            <span className="text-55 font-light text-black leading-[1.1818] tracking-[-0.02em]">
              {value.replace("+", "")}
            </span>
            {value.includes("+") && (
              <sup className="align-super text-[18px] md:text-[33px] leading-none relative top-[0px] md:top-[-2px] 2xl:top-[3px] 3xl:top-[5px] text-primary font-light font-poppins">
                +
              </sup>
            )}
          </div>
          <span className="text-[18px] md:text-30 leading-[1.333] font-light -tracking-[0.02em] text-black">
            {label}
          </span>
        </div>
        <p className="text-description text-paragraph mt-[6px] md:mt-[5px]">{subLabel}</p>
      </div>
    </div>
  );
}

// Group stats into pairs: [[stat1, stat2], [stat3, stat4]]
const slideGroups = AboutData.stats.reduce<(typeof AboutData.stats)[]>(
  (acc, stat, i) => {
    const groupSize = typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 2;
    if (i % groupSize === 0) acc.push([stat]);
    else acc[acc.length - 1].push(stat);
    return acc;
  },
  [],
);

export default function AboutDetails() {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute -top-43   lg:-top-68 left-[-131px] lg:left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[280px]  2xl:w-[500px] 3xl:w-[600px]"
        />
      </div>

      <div className="lg:pl-[15.3%] 3xl:pl-[21.3%] pt-70px md:pt-120 px-[15px] lg:px-0 container w-full">
        <SectionTitle
          text={AboutData.title}
          className="section-heading text-secondary uppercase mb-20px md:mb-50"
        />

        <div
          className="text-paragraph text-description"
          dangerouslySetInnerHTML={{ __html: AboutData.description }}
        />
      </div>

      {/* Stats Swiper */}
      <div className="mt-[20px] md:mt-100 w-full container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
          }}
          className="w-full"
        >
          {slideGroups.map((group, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              {/* 1 column, 2 stacked cards, 10px gap */}
              <div className="flex flex-col gap-[5px] md:gap-[10px]">
                {group.map((stat, cardIndex) => (
                  <StatCard
                    key={stat.id}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    subLabel={stat.subLabel}
                    noiseVariant={cardIndex === 0 ? 1 : 2}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

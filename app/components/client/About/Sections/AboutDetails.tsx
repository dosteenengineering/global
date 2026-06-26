"use client";
import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { AboutData, AboutPageData } from "../data";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";
import StatNoise2 from "@/app/components/common/noise/StatNoise2";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useRef } from "react";
import ContainerAnchor from "@/app/components/layout/ContainerAnchor";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { useState, useEffect } from "react";
import { useInView } from "framer-motion";

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const hasPlus = value.includes("+");
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // ms
    const increment = numeric / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, numeric]);

  // Format: if original had "K" keep it
  const hasK = value.toUpperCase().includes("K");
  const display = hasK ? `${count}K` : `${count}`;

  return (
    <div className="flex items-center py-[15px] md:py-25 px-[40px] md:px-50 gap-[55px]  lg:gap-200 3xl:gap-[296px]  relative flex-1 min-w-0 max-h-[148px]">
      {/* {noiseVariant === 1 ? <StatNoise1 /> : <StatNoise1 />} */}
      {isMobile ? <StatNoise1 /> : (noiseVariant === 1 ? <StatNoise1 /> : <StatNoise2 />)
      }
      {/* Icon */}
      <div className="relative shrink-0 h-[40px] w-[40px] md:h-[60px] md:w-[60px] 2xl:w-[70px] 2xl:h-[70px]">
        <Image src={icon} alt={label} fill className="object-contain" />
      </div>
      {/* Text */}
      <div>
        <div className="flex items-baseline gap-x-[5px] md:gap-x-[14px]">
          <div ref={ref} className="flex flex-row items-start">
            <span className="text-55 font-light text-black leading-[1.1818] tracking-[-0.02em]">
              {display}
            </span>
            {hasPlus && (
              <sup className="align-super text-[18px] md:text-[33px] leading-none relative top-[0px] md:top-[-2px] 2xl:top-[3px] 3xl:top-[5px] text-primary font-light font-poppins">
                +
              </sup>
            )}
          </div>
          <span className="text-[24px] md:text-30 leading-[1.333] font-light -tracking-[0.02em] text-black">
            {label}
          </span>
        </div>
        <p className="text-description text-paragraph mt-[6px] md:mt-[5px]">{subLabel}</p>
      </div>
    </div>
  );
}



export default function AboutDetails({ data }: { data: AboutPageData['secondSection'] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightInset = useGetContainerSpacing(containerRef);

  // Group stats into pairs: [[stat1, stat2], [stat3, stat4]]
  const slideGroups = data.items.reduce<(typeof data.items)[]>(
    (acc, stat, i) => {
      const groupSize = typeof window !== "undefined" && window.innerWidth < 1024 ? 4 : 2;
      if (i % groupSize === 0) acc.push([stat]);
      else acc[acc.length - 1].push(stat);
      return acc;
    },
    [],
  );

  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <ContainerAnchor ref={containerRef} />

      <div className="absolute -top-10 lg:-top-[-10%] xl:top-[-1.5%] 3xl:top-[-9.5%] left-[-131px] lg:left-[-3%] xl:left-[-22%] 3xl:left-[-19.2%] pointer-events-none">
        <Image src="/assets/icons/bg-svg/top-left-about-1.svg" alt="decorative lines" width={897} height={896} className="object-contain w-[280px] 2xl:w-[500px] 3xl:w-[897px] 3xl:h-[896px] 3xl:scale-120" />
      </div>

      <div
        className="ml-auto max-w-[1256px] pt-70 md:pt-120 3xl:pt-100 px-[15px] 2xl:px-0 w-full"
        style={{ marginRight: rightInset }}
      >
        {/* <SectionTitle text={AboutData.title} className="section-heading text-secondary uppercase mb-20px md:mb-50" /> */}
        <h2 className="section-heading-90 text-secondary uppercase mb-20 md:mb-50 ">
          {data.title}
        </h2>

        <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="text-paragraph text-description"
          dangerouslySetInnerHTML={{ __html: data.description }} />
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
              <motion.div variants={moveUp(0.5 + 0.1 * slideIndex)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="flex flex-col gap-[5px] md:gap-[10px]">
                {group.map((stat, cardIndex) => (
                  <StatCard
                    key={cardIndex}
                    icon={stat.image}
                    value={stat.number}
                    label={stat.value}
                    subLabel={stat.subValue}
                    noiseVariant={cardIndex === 0 ? 1 : 2}
                  />
                ))}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

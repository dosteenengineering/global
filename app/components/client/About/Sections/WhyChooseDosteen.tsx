"use client";

import "swiper/css";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { WhyChooseData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import NavButton from "@/app/components/common/NavigationButton"; 
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

function IconWrapper({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="relative flex-shrink-0 w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
      <Image
        src="/assets/images/about/why-choose/card-bg-cricle.svg"
        alt=""
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] relative">
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
      className="flex flex-col p-5 md:p-50 backdrop-blur-[20px] h-auto md:h-[481px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.2) 100%)",
      }}
    >
      <IconWrapper icon={icon} label={title} />
      <h3 className="text-white text-30 font-light leading-[1.333] tracking-[-0.02em] mt-5 md:mt-30 mb-[10px] md:mb-20">
        {title}
      </h3>
      <p className="text-white text-description !tracking-[2%]">{description}</p>
    </div>
  );
}

// const slideGroups = WhyChooseData.items.reduce<(typeof WhyChooseData.items)[]>(
//   (acc, item, i) => {
//     if (i % 2 === 0) acc.push([items]);
//     else acc[acc.length - 1].push(item);
//     return acc;
//   },
//   [],
// );

const slideGroups = WhyChooseData.items.reduce<(typeof WhyChooseData.items)[]>(
  (acc, items, i) => {
    const groupSize = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2;
    if (i % groupSize === 0) acc.push([items]);
    else acc[acc.length - 1].push(items);
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

  const total = slideGroups.length;
const counterPill = (
    <div className="flex items-center justify-center border border-primary text-white font-poppins font-[300] leading-[0.5] border-white rounded-full px-[16px] text-15 w-[55px] md:w-[78px] h-[26px] md:h-[31px] py-[3px]">
      <span className="font-[600]">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
  return (
    <section className="relative w-full select-none overflow-x-clip">
      <PrimaryNoise2 />

      <div className="absolute right-[-17%] top-[-8%] md:right-[-40%] md:top-[-18%] w-[52%] h-[327px] md:w-[900px] md:h-[900px] 3xl:w-[1280px] 3xl:h-[1280px] pointer-events-none">
        <Image
          src="/assets/images/about/why-choose/why-bg2.svg"
          alt=""
          fill
          className="object-contain hidden lg:block"
          priority
        />
         <Image
          src="/assets/images/about/cta/bg-right.svg"
          alt="" 
         fill
          className="object-contain lg:hidden w-[203px] h-[327px]"
          priority
        />
      </div>

      <div className="relative z-10 container py-12.5 md:py-[140px] 3xl:py-[150px] w-full">
        <SectionTitle
          text={WhyChooseData.title}
          className="section-heading text-white uppercase mb-50 max-w-[30ch]"
        />

        <div className="lg:pl-[25.3%] w-full">
          <p className="text-white font-light text-30 leading-[1.333] tracking-[-0.02em] mb-20px md:mb-100 3xl:mb-[109px] max-w-[967px] border-b border-white/20 md:border-0 pb-5 md:pb-0">
            {WhyChooseData.description}
          </p>
        </div>
   <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-[30px]"
          >
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {counterPill}
            </motion.div>
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-[10px] md:gap-[15px]"
            >
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slidePrev();
                }}
                direction="left"
                disabled={false}
                ariaLabel="Previous"
                borderColor="border-white"
                className=" icon-invert"
              />
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slideNext();
                }}
                direction="right"
                disabled={false}
                ariaLabel="Next"
                borderColor="border-white"
                className=" icon-invert"
              />
            </motion.div>
          </motion.div>
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

        {/* {showPagination && (
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
        )} */}
      </div>
    </section>
  );
}
"use client";

import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper"; 
import NavButton from "@/app/components/common/NavigationButton"; 

interface IDosteenSystemsProps {
  data: {
    description: string;
    title: string;
    systems: {
      id: number;
      title: string;
      image: string;
      slug: string;
    }[];
  };
}

function SystemCard({
  system,
}: {
  system: IDosteenSystemsProps["data"]["systems"][0];
}) {
  return (
    <Link href={`/${system.slug}`} className="group block">
      <div className="relative h-[322px] overflow-hidden">
        {/* Image */}
        <Image
          src={system.image}
          alt={system.title}
          fill
          className="object-cover"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Arrow — top right, visible on hover */}
        <div className="absolute top-30 right-30 opacity-0 -translate-x-20 translate-y-20 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
          <Image
            src="/assets/icons/arrow-right-top-small.svg"
            alt="arrow"
            width={100}
            height={100}
            className="w-15 h-15 object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <p className="mt-[10px] text-[18px] leading-[1.56] md:leading-[1.333] font-medium text-secondary group-hover:font-medium transition-all duration-300 tracking-[-0.02em]">
        {system.title}
      </p>

      
    </Link>
  );
}

export default function DosteenSystems({ data }: IDosteenSystemsProps) {
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
  
    const dotCount = data.systems.length - slidesPerView + 1;
    const showPagination = dotCount > 1;
  
    const total = data.systems.length;
  const counterPill = (
    <div className="flex items-center justify-center border   text-paragraph font-poppins font-[300] leading-[0.5] border-primary rounded-full px-[16px] text-15 w-[55px] md:w-[78px] h-[26px] md:h-[31px] py-[3px]">
      <span className="font-[600]">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
  return (
    <section className="bg-white w-full relative select-none overflow-hidden">
      <div className="absolute -top-49 lg:top-[-39%] left-[-131px] lg:left-[-0.9%] pointer-events-none h-full">
        <Image
          src="/assets/images/services/bg-common-service.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain 2xl:w-[430px] 3xl:w-[650px] h-full hidden lg:block"
        />
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[280px]  2xl:w-[500px] 3xl:w-[600px] lg:hidden"
        />
      </div>

      <div className="absolute top-[2%] lg:top-[-39%] left-[-131px] lg:left-[-0.9%] pointer-events-none h-full">
         
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[280px]  2xl:w-[500px] 3xl:w-[600px] lg:hidden"
        />
      </div>

      <div className="w-full px-[16px] lg:pl-[28.6%] pt-120">
        <div
          className="text-paragraph text-description max-w-[1110px] mb-60"
          dangerouslySetInnerHTML={{ __html: data.description }}
          suppressHydrationWarning
        />

        <div className="w-full h-px bg-[#c2c2c2] mb-140 3xl:mb-150" />

        <div className="px-[15px] lg:px-0 container w-full border-b lg:border-b-0 border-[#c2c2c2] pb-5 lg:pb-0 mb-5 lg:mb-50  ">
          <SectionTitle
            text={data.title}
            className="section-heading text-secondary uppercase  max-w-[1538px]"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container ">
      <div className="  w-full hidden md:grid grid-cols-3 3xl:grid-cols-4 gap-x-30 gap-y-80">
        {data.systems.map((system) => (
          <SystemCard key={system.id} system={system} />
        ))}
      </div>
        {/* ── MOBILE: Swiper slider (< 768px) ── */}
      <div className="md:hidden w-full"> 
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
                borderColor="border-[#161616]" 
              />
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slideNext();
                }}
                direction="right"
                disabled={false}
                ariaLabel="Next"
                borderColor="border-[#161616]" 
              />
            </motion.div>
          </motion.div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={20}
            className="w-full"
          >
            {data.systems.map((system) => (
              <SwiperSlide key={system.id}>
                <SystemCard system={system} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </div>

    </section>
  );
}

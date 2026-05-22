"use client";

import { useRef, useState } from "react";
import { threePartSpecData } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PartCard from "./PartCard";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import NavButton from "@/app/components/common/NavigationButton";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import "swiper/css";

export default function ThreePartSpec() {
  const { title } = threePartSpecData;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = threePartSpecData.items.length;

  return (
    <section className="w-full relative">
      <PrimaryNoise2 />
      <div className="relative container py-12.5 md:pt-140 3xl:pt-150 md:pb-120">
        <SectionTitle title={title} className="text-white uppercase mb-5 md:mb-80 section-heading border-b border-bdr-blue pb-5 md:pb-0 md:border-b-0" />

        {/* ── Mobile: Swiper ── */}
        <div className="md:hidden">
          {/* Counter + Nav */}
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-5 md:mb-[30px]"
          >
            {/* Capsule counter */}
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center border border-white/50 rounded-full px-[16px] text-15 w-[55px] h-[26px] py-[3px] font-poppins font-[300] leading-[0.5] text-white">
                <span className="font-[600]">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span>/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </div>
            </motion.div>

            {/* Nav buttons */}
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-[10px]"
            >
              <NavButton
                onClick={() => swiperRef.current?.slidePrev()}
                direction="left"
                disabled={false}
                ariaLabel="Previous"
                borderColor="border-white"
                className="icon-invert"
              />
              <NavButton
                onClick={() => swiperRef.current?.slideNext()}
                direction="right"
                disabled={false}
                ariaLabel="Next"
                borderColor="border-white"
                className="icon-invert"
              />
            </motion.div>
          </motion.div>

          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.activeIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="!overflow-visible"
          >
            {threePartSpecData.items.map((item, index) => (
              <SwiperSlide key={item.id}>
                <PartCard
                  part={item.part}
                  title={item.title}
                  shortDesc={item.shortDesc}
                  description={item.desc}
                  isEven={index % 2 !== 0}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Desktop: Original grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-30">
          {threePartSpecData.items.map((item, index) => (
            <PartCard
              key={item.id}
              part={item.part}
              title={item.title}
              shortDesc={item.shortDesc}
              description={item.desc}
              isEven={index % 2 !== 0}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
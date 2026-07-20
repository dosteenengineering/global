"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { featuredProjectsData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import ProjectCard from "@/app/components/common/ProjectCard";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import NavButton from "@/app/components/common/NavigationButton";
import { Project } from "../../../Projects/data";
import { Autoplay } from "swiper/modules";


export default function FeaturedProjects({data}:{data:Project[]}) {
  // const { title, projects } = featuredProjectsData;
  const projects = [...data]
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateDots = (swiper: SwiperType) => {
    const total = swiper.slides.length;
    const perView = Math.round(swiper.params.slidesPerView as number);
    const dots = Math.max(0, total - perView + 1);
    setDotCount(dots);
    setShowDots(dots > 1);
  };
  const updateState = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setTotalSlides(swiper.slides.length);
    setSlidesPerView(
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1
    );
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Hide nav if all slides fit in view
  const showNav = totalSlides > slidesPerView;
  return (
    <section className="w-full relative py-12.5 md:py-140 3xl:py-150">
      <PrimaryNoise2 />
      <div className="container">

        {/* Title */}
        <div className="flex items-center justify-between mb-50 border-b 2xl:border-b-0 border-bdr-blue pb-5 relative ">
          <SectionTitle title={"FEATURED CASE STUDIES"} className="section-heading-90 text-white" />

          {showNav && (
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
                disabled={isBeginning}
                ariaLabel="Previous"
                borderColor="border-white"
                className="icon-invert"
              />
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slideNext();
                }}
                direction="right"
                disabled={isEnd}
                ariaLabel="Next"
                borderColor="border-white"
                className="icon-invert"
              />
            </motion.div>
          )}
        </div>

        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateState(swiper);
          }}
          onSlideChange={(swiper) => updateState(swiper)}
          onBreakpoint={(swiper) => updateState(swiper)}
          spaceBetween={30}
          autoplay={{
            delay: 3000, // 3 seconds
            disableOnInteraction: false, // Continue autoplay after user interaction
            pauseOnMouseEnter: true, // Pause on hover (optional)
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="!h-auto flex flex-col ">
              {/* @ts-ignore */}
              <ProjectCard project={project} delay={0.12} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        {showDots && (
          <div className="flex items-center justify-center gap-[10px] mt-40">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => swiperRef.current?.slideTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-[10px] h-[10px] rounded-full border border-white cursor-pointer transition-all duration-300 ${i === activeIndex ? "bg-white" : "bg-transparent"
                  }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );

}
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

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  slug: string;
}

export default function FeaturedProjects() {
  const { title, projects } = featuredProjectsData;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);

  const updateDots = (swiper: SwiperType) => {
    const total = swiper.slides.length;
    const perView = Math.round(swiper.params.slidesPerView as number);
    const dots = Math.max(0, total - perView + 1);
    setDotCount(dots);
    setShowDots(dots > 1);
  };

  return (
    <section className="w-full relative py-12.5 md:py-140 3xl:py-150">
        <PrimaryNoise2 />
      <div className="container">

        {/* Title */}
        <SectionTitle title={title} className="section-heading text-white mb-50" />

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateDots(swiper);
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onBreakpoint={(swiper) => updateDots(swiper)}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768:  { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} />
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
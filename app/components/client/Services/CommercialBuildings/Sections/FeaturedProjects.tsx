"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { featuredProjectsData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  slug: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-12/12 overflow-hidden mb-30 3xl:mb-[32px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h3
        className="text-white text-30 font-light leading-[1.33] tracking-[-0.02em] mb-[15px]"
      >
        {project.title}
      </h3>

      {/* Location + Category */}
      <div className="flex items-center text-white font-light justify-between mb-[15px] pr-60 3xl:pr-[96px]">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/assets/icons/location-pin.svg"
            alt="location"
            width={20}
            height={20}
            className="object-contain w-[11px] h-[14px]"
          />
          {project.location}
        </div>
        <span className="text-description">
          {project.category}
        </span>
      </div>

      {/* Divider line */}
      <div className="w-full h-[2px] bg-[#c2c2c2]" />
    </div>
  );
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
    <section className="w-full relative py-140 3xl:py-150">
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
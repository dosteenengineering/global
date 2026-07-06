"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { AllProjectData, ProjectItemProps } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import ProjectCard from "@/app/components/common/ProjectCard";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import NavButton from "@/app/components/common/NavigationButton";
// import { Project } from "../../Projects/data";


export default function RelatedProjects({ data, currentProject, }:{data:AllProjectData, currentProject: ProjectItemProps}) {
  console.log(data)
  const title = "Related Case Studies";
  // const projects = data.projects;
  const projects = data.projects.filter((project) => project._id !== currentProject._id && project.firstSection.sector._id === currentProject.firstSection.sector._id);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

 const [showNav, setShowNav] = useState(false);

const updateDots = (swiper: SwiperType) => {
  const total = swiper.slides.length;
  const perView = Math.round(swiper.params.slidesPerView as number);
  const dots = Math.max(0, total - perView + 1);
  setDotCount(dots);
  setShowDots(dots > 1);
  setShowNav(dots > 1); // ← add this
}; 

  const updateState = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
 

  return (
    <section className="w-full pb-140 3xl:pb-200">
      <div className="container">
        {/* Title */}
            <div className="flex gap-2 justify-between items-center pb-5 md:pb-0 mb-5 md:mb-60   border-b border-bdr-gray md:border-0">
                <SectionTitle
                  title={title}
                  className="section-heading-90 text-secondary w-full "
                />
                {showNav && (
                  <motion.div
                    variants={moveUp(0.5)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex items-center gap-[10px] md:gap-[15px] "
                  >
                    <NavButton
                      onClick={() => { const s = swiperRef.current; if (s && !s.destroyed) s.slidePrev(); }}
                      direction="left"
                      disabled={isBeginning}
                      ariaLabel="Previous"
                      disableMode="dark"
                    />
                    <NavButton
                      onClick={() => { const s = swiperRef.current; if (s && !s.destroyed) s.slideNext(); }}
                      direction="right"
                      disabled={isEnd}
                      ariaLabel="Next"
                      disableMode="dark"
                    />
                  </motion.div>
                )}
            </div>
        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateDots(swiper);
            updateState(swiper);
          }}
          onSlideChange={(swiper) =>{
            updateState(swiper);
          }}
          onBreakpoint={(swiper) => {
             updateDots(swiper);
             updateState(swiper);
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard project={project} variant="dark" delay={index * 0.12} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        {/* {showDots && (
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
        )} */}
      </div>
    </section>
  );
}

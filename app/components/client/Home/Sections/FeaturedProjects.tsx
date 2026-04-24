"use client";

import { useRef, useCallback, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css/effect-creative";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

import { featuredProjectsData, Project } from "../data";
import NavButton from "@/app/components/common/NavigationButton";
import BorderButton from "@/app/components/common/BorderButton";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

function getInactiveProjects(
  projects: Project[],
  activeIndex: number,
  count: number,
): Project[] {
  const total = projects.length;
  return Array.from(
    { length: count },
    (_, i) => projects[(activeIndex + 1 + i) % total],
  );
}

function InactiveSlot({
  project,
  direction,
  changeCount,
}: {
  project: Project;
  direction: "left" | "right";
  changeCount: number;
}) {
  const prevProjectRef = useRef<Project>(project);
  const [displayed, setDisplayed] = useState<{
    prev: Project;
    next: Project;
    animating: boolean;
  }>({
    prev: project,
    next: project,
    animating: false,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    if (changeCount === 0) return;

    const prev = prevProjectRef.current;
    setDisplayed({ prev, next: project, animating: true });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      prevProjectRef.current = project;
      setDisplayed({ prev: project, next: project, animating: false });
    }, 620);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [changeCount]);

  const enterFrom = direction === "right" ? "100%" : "-100%";
  const exitTo = direction === "right" ? "-100%" : "100%";

  return (
    <div className="w-full sm:w-[calc(50%-8px)] 3xl:w-[369px] flex-shrink-0 cursor-pointer">
      <div className="relative min-h-[44px] mb-[31px] overflow-hidden">
        {displayed.animating && (
          <p
            className="absolute inset-x-0 top-0 text-30 font-poppins pr-5 font-[300] -tracking-[2%] text-paragraph leading-[1.33] slot-exit"
            style={{ ["--exit-to" as string]: exitTo }}
          >
            {displayed.prev.name}
          </p>
        )}
        <p
          className={`text-30 font-poppins pr-5 font-[300] text-paragraph -tracking-[2%] leading-[1.33]${displayed.animating ? " slot-enter" : ""}`}
          style={
            displayed.animating ? { ["--enter-from" as string]: enterFrom } : {}
          }
        >
          {displayed.next.name}
        </p>
      </div>

      <div className="relative w-full h-[160px] md:h-[214px] 3xl:h-[313px] overflow-hidden">
        {displayed.animating && (
          <div
            className="absolute inset-0 slot-exit"
            style={{ ["--exit-to" as string]: exitTo }}
          >
            <Image
              src={displayed.prev.image}
              alt={displayed.prev.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div
          className={`absolute inset-0${displayed.animating ? " slot-enter" : ""}`}
          style={
            displayed.animating ? { ["--enter-from" as string]: enterFrom } : {}
          }
        >
          <Image
            src={displayed.next.image}
            alt={displayed.next.name}
            fill
            className="object-cover"
            sizes="(min-width: 1920px) 369px, (min-width: 640px) calc(50vw - 8px), 100vw"
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjectsSection() {
  // ── Desktop swiper state ──
  const activeSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [changeCount, setChangeCount] = useState(0);
  const prevIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftInset = useGetContainerSpacing(containerRef);

  // ── Mobile swiper state ──
  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const projects = featuredProjectsData.projects;
  const inactiveProjects = getInactiveProjects(projects, activeIndex, 2);

  // Desktop handlers
  const handleActiveInit = useCallback((s: SwiperType) => {
    activeSwiperRef.current = s;
  }, []);

  const handleSlideChange = useCallback(
    (s: SwiperType) => {
      const newIndex = s.realIndex;
      const total = projects.length;
      const diff = (newIndex - prevIndexRef.current + total) % total;
      setDirection(diff <= total / 2 ? "right" : "left");
      setActiveIndex(newIndex);
      setChangeCount((c) => c + 1);
      prevIndexRef.current = newIndex;
    },
    [projects.length],
  );

  const slidePrev = useCallback(() => activeSwiperRef.current?.slidePrev(), []);
  const slideNext = useCallback(() => activeSwiperRef.current?.slideNext(), []);

  // Mobile handlers
  const handleMobileSlideChange = useCallback((s: SwiperType) => {
    setMobileActiveIndex(s.realIndex);
  }, []);

  const mobileSlidePrev = useCallback(
    () => mobileSwiperRef.current?.slidePrev(),
    [],
  );
  const mobileSlideNext = useCallback(
    () => mobileSwiperRef.current?.slideNext(),
    [],
  );

  return (
    <section className="w-full py-140 3xl:py-200 bg-white overflow-hidden">
      <div ref={containerRef} className="container">
        <SectionTitle text={featuredProjectsData.title} className="lg:text-center section-heading leading-[1.1] uppercase font-helvetica text-secondary mb-70" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Nav buttons right-aligned, under title */}
        <div className="flex items-center justify-between mb-8 container">
          <motion.div 
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex items-center gap-[12px]">
            <NavButton
              onClick={mobileSlidePrev}
              direction="left"
              disabled={false}
              ariaLabel="Previous project"
            />
            <NavButton
              onClick={mobileSlideNext}
              direction="right"
              disabled={false}
              ariaLabel="Next project"
            />
          </motion.div>

          {/* View all button */}
            <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}>
              <BorderButton
                href={featuredProjectsData.viewAllHref}
                text={featuredProjectsData.viewAllLabel}
                borderColor="black"
                textColor="black"
                px="md:px-[35px] px-[18px]"
                hoverBg="black"
              />
            </motion.div>
        </div>

        <motion.div 
        variants={moveUp(0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        style={{ paddingLeft: leftInset }}>
          <Swiper
            loop={true}
            modules={[Autoplay]}
            onSwiper={(s) => {
              mobileSwiperRef.current = s;
            }}
            onSlideChange={handleMobileSlideChange}
            slidesPerView={1.15}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.2,
              },
              950: {
                slidesPerView: 2.5,
              },
            }}
            spaceBetween={16}
            speed={600}
            allowTouchMove={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {projects.map((project: Project, idx: number) => {
              const isActive = idx === mobileActiveIndex;
              return (
                <SwiperSlide key={project.key}>
                  <div className="relative w-full h-[320px] md:h-[380px] cursor-pointer group overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                    {/* Overlay + details only on the currently active slide */}
                    <>
                      {/* Gradient */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 35.9%, rgba(0,0,0,0.85) 86.75%)",
                        }}
                      />
                      {/* Arrow */}
                      <div
                        className={`absolute top-4 right-4 z-10 transition-all duration-500 ${
                          isActive
                            ? "opacity-100 translate-x-0 translate-y-0"
                            : "opacity-0 translate-x-4 translate-y-4"
                        }`}
                      >
                        <Image
                          src="/assets/icons/arrow-right-top-big.svg"
                          alt="arrow"
                          width={71}
                          height={48}
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      {/* Content */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 px-6 pb-6 z-10 transition-opacity duration-500 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <p className="text-white font-poppins font-[300] text-[21px] leading-[1.33] -tracking-[2%] mb-4">
                          {project.name}
                        </p>
                        <div className="h-[1px] bg-white/30 mb-4" />
                        <div className="flex items-center gap-3 justify-between">
                          <span className="text-white leading-[1.52] text-[14px] sm:text-19 font-poppins font-[300] -tracking-[2%]">
                            Location: {project.location}
                          </span>
                          <span className="text-white leading-[1.52] text-[14px] sm:text-19 font-poppins font-[300] -tracking-[2%]">
                            Client: {project.client}
                          </span>
                        </div>
                      </div>
                    </>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-x-140 3xl:gap-x-200 container">
        {/* ───────── Row 1 Col 1 — ACTIVE SWIPER ───────── */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Swiper
            loop={true}
            modules={[Autoplay, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: {
                translate: ["-105%", "-105%", 0],
              },
              next: {
                translate: ["105%", "105%", 0],
              },
            }}
            onSwiper={handleActiveInit}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            spaceBetween={0}
            speed={700}
            allowTouchMove={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full h-[320px] md:h-[420px] xl:h-[549px] 3xl:h-[649px] max-w-[713px] cursor-pointer"
          >
            {projects.map((project: Project) => (
              <SwiperSlide key={project.key}>
                <div className="relative w-full h-[320px] md:h-[420px] xl:h-[549px] 3xl:h-[649px] max-w-[713px] cursor-pointer group">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 35.9%, rgba(0,0,0,0.85) 86.75%)",
                    }}
                  />
                  <div className="absolute top-9 right-9 z-10">
                    <Image
                      src="/assets/icons/arrow-right-top-big.svg"
                      alt="arrow"
                      width={71}
                      height={48}
                      className="-translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-50 pb-40 3xl:pb-[43px] z-10">
                    <p className="text-white font-poppins font-[300] text-30 leading-[1.33] -tracking-[2%] mb-20 2xl:mb-[22px]">
                      {project.name}
                    </p>
                    <div className="h-[1px] bg-white/30 mb-20 2xl:mb-[22px]" />
                    <div className="flex items-center gap-150 3xl:gap-[163px]">
                      <span className="text-white leading-[1.52] text-19 font-poppins font-[300] -tracking-[2%]">
                        Location: {project.location}
                      </span>
                      <span className="text-white leading-[1.52] text-19 font-poppins font-[300] -tracking-[2%]">
                        Client: {project.client}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* ───────── Row 1 Col 2 — NAV + INACTIVE STRIP ───────── */}
        <div className="flex flex-col justify-between mt-8 md:mt-0">
          {/* Nav */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-end gap-[15px]">
            <NavButton
              onClick={slidePrev}
              direction="left"
              disabled={false}
              ariaLabel="Previous project"
            />
            <NavButton
              onClick={slideNext}
              direction="right"
              disabled={false}
              ariaLabel="Next project"
            />
          </motion.div>

          {/* Inactive cards */}
          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-30 items-end">
            {inactiveProjects.map((project: Project, i: number) => (
              <InactiveSlot
                key={`slot-${i}`}
                project={project}
                direction={direction}
                changeCount={changeCount}
              />
            ))}
          </motion.div>
        </div>

        {/* ───────── Row 2 Col 1 — EMPTY ───────── */}
        <div />

        {/* ───────── Row 2 Col 2 — VIEW BUTTON ───────── */}
        <div className="mt-50 w-fit overflow-hidden">
          <motion.div
            variants={moveUp(0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}>
            <BorderButton
              href={featuredProjectsData.viewAllHref}
              text={featuredProjectsData.viewAllLabel}
              borderColor="black"
              textColor="black"
              px="px-30 3xl:px-[35px]"
              hoverBg="black"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

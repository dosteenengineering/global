"use client";

import { useRef, useCallback, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css/effect-creative";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import BorderButton from "@/app/components/common/BorderButton";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import NavButton from "@/app/components/common/NavigationButton";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { Project } from "../../../Projects/data";

// function getInactiveProjects(
//   projects: Project[],
//   activeIndex: number,
//   count: number,
// ): Project[] {
//   const total = projects.length;
//   return Array.from(
//     { length: count },
//     (_, i) => projects[(activeIndex + 1 + i) % total],
//   );
// }

function getInactiveProjects(
  projects: Project[],
  activeIndex: number,
  count: number,
): Project[] {
  const total = projects.length;
  const available = Math.min(count, total - 1); // never more than what's left
  return Array.from(
    { length: available },
    (_, i) => projects[(activeIndex + 1 + i) % total],
  );
}

function InactiveSlot({
  project,
  direction,
  changeCount,
  onClick,
  delay,
}: {
  project: Project;
  direction: "left" | "right";
  changeCount: number;
  onClick: () => void;
  delay: number;
}) {
  const prevProjectRef = useRef<Project>(project);
  const [displayed, setDisplayed] = useState<{
    prev: Project;
    next: Project;
    animating: boolean;
  }>({ prev: project, next: project, animating: false });
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
    <motion.div className="flex flex-col flex-1 min-w-0 cursor-pointer" onClick={onClick} variants={moveUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true }}  >
      {/* Image — fixed h-[313px], content animates */}
      <div className="relative w-full h-[280px] 3xl:h-[313px] overflow-hidden mb-20">
        {displayed.animating && (
          <div className="absolute inset-0 slot-exit" style={{ ["--exit-to" as string]: exitTo }} >
            <Image src={displayed.prev.thumbnail} alt={displayed.prev.thumbnailAlt} fill className="object-cover pointer-events-none" />
          </div>
        )}
        <div className={`absolute inset-0${displayed.animating ? " slot-enter" : ""}`} style={displayed.animating ? { ["--enter-from" as string]: enterFrom } : {}}>
          <Image src={displayed.next.thumbnail} alt={displayed.next.thumbnailAlt} fill className="object-cover pointer-events-none" />
        </div>
      </div>

      <div className="relative min-h-[36px] mb-[15px] overflow-hidden">
        {displayed.animating && (
          <p className="absolute inset-x-0 top-0 text-secondary text-30 font-light leading-[1.33] tracking-[-0.02em] slot-exit" style={{ ["--exit-to" as string]: exitTo }}>
            {displayed.prev.firstSection.title}
          </p>
        )}
        <p className={`text-secondary text-30 font-light leading-[1.33] tracking-[-0.02em]${displayed.animating ? " slot-enter" : ""}`}
          style={displayed.animating ? { ["--enter-from" as string]: enterFrom } : {}}>
          {displayed.next.firstSection.title}
        </p>
      </div>

      <div className="flex items-center justify-between mb-[15px] pr-40">
        <span className="flex items-center gap-[10px] text-description text-paragraph font-light">
          <Image src="/assets/icons/location-pin-gray.svg" alt="location" width={20} height={20} className="object-contain pointer-events-none w-[11px] h-[14px] -mt-1" />
          {displayed.next.firstSection.location.name}
        </span>
        <span className="text-description text-paragraph font-light">{displayed.next.firstSection.sector.name}</span>
      </div>
      <div className="w-full h-[2px] bg-[#c2c2c2]" />
    </motion.div>
  );
}

export default function FeaturedProjectsResidencial({ data }: {data:Project[]}) {
  const projects = [...data];

  const activeSwiperRef = useRef<SwiperType | null>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [changeCount, setChangeCount] = useState(0);
  const prevIndexRef = useRef(0);

  const enableNavigation = projects.length > 3;
  const inactiveProjects = getInactiveProjects(projects, activeIndex, 2);
  const mobileActiveProject = projects[mobileActiveIndex];

  const handleActiveInit = useCallback((s: SwiperType) => {
    activeSwiperRef.current = s;
  }, []);

  const handleSlideChange = useCallback((s: SwiperType) => {
    const newIndex = s.realIndex;
    const total = projects.length;
    const diff = (newIndex - prevIndexRef.current + total) % total;
    setDirection(diff <= total / 2 ? "right" : "left");
    setActiveIndex(newIndex);
    setChangeCount((c) => c + 1);
    prevIndexRef.current = newIndex;
  }, [projects.length]);

  const handleMouseEnter = useCallback(() => {
    activeSwiperRef.current?.autoplay.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    activeSwiperRef.current?.autoplay.start();
  }, []);

  return (
    <section className="w-full bg-white py-[70px] md:py-150 3xl:py-auto 3xl:pt-150 3xl:pb-200">
      <div className="container">
        <SectionTitle text={"FEATURED PROJECTS"} className="section-heading-90 text-secondary mb-50" />

        {/* ── Mobile layout ── */}
        <div className="md:hidden">
          {/* Top row: All Projects + Nav buttons */}
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-bdr-gray">
            <BorderButton
              text="All Projects"
              borderColor="black"
              textColor="black"
              iconColor="primary"
              hoverBg="black"
            />
            <div className="flex gap-[10px]">
              <NavButton
                onClick={() => mobileSwiperRef.current?.slidePrev()}
                direction="left"
                disabled={false}
                ariaLabel="Previous project"
              />
              <NavButton
                onClick={() => mobileSwiperRef.current?.slideNext()}
                direction="right"
                disabled={false}
                ariaLabel="Next project"
              />
            </div>
          </div>

          {/* Full-width swiper */}
          <Swiper
            loop
            modules={[Autoplay]}
            onSwiper={(s) => {
              mobileSwiperRef.current = s;
              setMobileActiveIndex(s.realIndex);
            }}
            onSlideChange={(s) => setMobileActiveIndex(s.realIndex)}
            slidesPerView={1}
            spaceBetween={0}
            speed={600}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full h-[383px] md:h-[280px] mb-5"
          >
            {projects.map((project,index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[383px] md:h-[280px]">
                  <Image
                    src={project.thumbnail}
                    alt={project.thumbnailAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.7) 100%)",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Project info below image */}
          <div className="">
            <p className="text-secondary text-[22px] font-light leading-[1.3] tracking-[-0.02em] mb-2.5">
              {mobileActiveProject?.firstSection.title}
            </p>
            <div className="flex items-center justify-between border-b pb-2.5 border-bdr-gray">
              <span className="flex items-center gap-[8px] text-paragraph font-light text-[13px]">
                <Image
                  src="/assets/icons/location-pin-gray.svg"
                  alt="location"
                  width={11}
                  height={14}
                  className="object-contain w-[11px] h-[14px] -mt-[2px]"
                />
                Location: {mobileActiveProject?.firstSection.location.name}
              </span>
              <span className="text-paragraph font-light text-[13px]">
                {mobileActiveProject?.firstSection.sector.name}
              </span>
            </div>
          </div>
        </div>

        {/* ── Desktop layout (unchanged) ── */}
        <div className="hidden md:flex gap-40 3xl:gap-50 items-stretch">
          {/* Left: big active swiper */}
          <div className="shrink-0 w-[45%]">
            {projects.length === 1 ? (
              <div
                className="relative w-full h-[549px] 3xl:h-[649px] group cursor-pointer"
              >
                <Image src={projects[0].thumbnail} alt={projects[0].thumbnailAlt} fill className="object-cover pointer-events-none" priority />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 38.14%, rgba(0,0,0,0.85) 89.52%)" }} />
                <div className="absolute bottom-0 left-0 right-0 px-40 pb-40 z-10">
                  <p className="text-white text-30 font-light leading-[1.33] tracking-[-0.02em] mb-20">{projects[0].firstSection.title}</p>
                  <div className="h-[1px] bg-white/30 mb-20" />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-[10px] text-white font-light">
                      <Image src="/assets/icons/location-pin.svg" alt="location" width={11} height={14} className="object-contain pointer-events-none w-[11px] h-[14px]" />
                      {projects[0].firstSection.location.name}
                    </span>
                    <span className="text-white text-paragraph font-light">{projects[0].firstSection.sector.name}</span>
                  </div>
                </div>
              </div>
            ) : (
              <Swiper
                loop
                modules={[Autoplay, EffectCreative]}
                effect="creative"
                creativeEffect={{
                  prev: { translate: ["-105%", "105%", 0] },
                  next: { translate: ["105%", "-105%", 0] },
                }}
                onSwiper={handleActiveInit}
                onSlideChange={handleSlideChange}
                slidesPerView={1}
                spaceBetween={0}
                speed={700}
                allowTouchMove
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full h-[549px] 3xl:h-[649px]"
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={index}>
                    <motion.div variants={moveUp(0.2 + index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
                      className="relative w-full h-[549px] 3xl:h-[649px] group cursor-pointer"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image src={project.thumbnail} alt={project.thumbnailAlt} fill className="object-cover pointer-events-none" priority />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 38.14%, rgba(0,0,0,0.85) 89.52%)" }} />
                      <div className="absolute bottom-0 left-0 right-0 px-40 pb-40 z-10">
                        <p className="text-white text-30 font-light leading-[1.33] tracking-[-0.02em] mb-20">{project.firstSection.title}</p>
                        <div className="h-[1px] bg-white/30 mb-20" />
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-[10px] text-white font-light">
                            <Image src="/assets/icons/location-pin.svg" alt="location" width={11} height={14} className="object-contain pointer-events-none w-[11px] h-[14px]" />
                            {project.firstSection.location.name}
                          </span>
                          <span className="text-white text-paragraph font-light">{project.firstSection.sector.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Right: nav + inactive slots + all projects btn */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="flex gap-40 3xl:gap-50 items-start flex-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {inactiveProjects.map((project, i) => {
                const projectIndex = projects.indexOf(project);
                return (
                  <InactiveSlot
                    key={`slot-${i}`}
                    project={project}
                    direction={direction}
                    changeCount={changeCount}
                    delay={0.2 + i * 0.1}
                    onClick={() =>
                      activeSwiperRef.current?.slideToLoop(projectIndex)
                    }
                  />
                );
              })}
            </div>

            <div className="mt-30 w-full flex justify-between">
              <BorderButton
                text="All Projects"
                borderColor="black"
                textColor="black"
                iconColor="primary"
                px="px-6 lg:px-[35px]"
                hoverBg="black"
                href="/case-studies"
              />
              {enableNavigation && (
                <div className="flex gap-[15px]">
                  <NavButton onClick={() => activeSwiperRef.current?.slidePrev()} direction="left" disabled={false} ariaLabel="Previous project" />
                  <NavButton onClick={() => activeSwiperRef.current?.slideNext()} direction="right" disabled={false} ariaLabel="Next project" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
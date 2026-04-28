"use client";

import { useRef, useCallback, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css/effect-creative";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { featuredProjectsData, type Project } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import NavButton from "@/app/components/common/NavigationButton";

// ── Helpers ──────────────────────────────────────────────
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

// ── Animated inactive slot (fixed frame, content slides in/out) ──
function InactiveSlot({
  project,
  direction,
  changeCount,
  onClick,
}: {
  project: Project;
  direction: "left" | "right";
  changeCount: number;
  onClick: () => void;
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
    <div
      className="flex flex-col flex-1 min-w-0 cursor-pointer"
      onClick={onClick}
    >
      {/* Image — fixed h-[313px], content animates */}
      <div className="relative w-full h-[280px] 3xl:h-[313px] overflow-hidden mb-20">
        {displayed.animating && (
          <div
            className="absolute inset-0 slot-exit"
            style={{ ["--exit-to" as string]: exitTo }}
          >
            <Image
              src={displayed.prev.image}
              alt={displayed.prev.name}
              fill
              className="object-cover pointer-events-none"
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
            className="object-cover pointer-events-none"
          />
        </div>
      </div>

      {/* Title */}
      <div className="relative min-h-[36px] mb-[15px] overflow-hidden">
        {displayed.animating && (
          <p
            className="absolute inset-x-0 top-0 text-secondary text-30 font-light leading-[1.33] tracking-[-0.02em] slot-exit"
            style={{ ["--exit-to" as string]: exitTo }}
          >
            {displayed.prev.name}
          </p>
        )}
        <p
          className={`text-secondary text-30 font-light leading-[1.33] tracking-[-0.02em]${displayed.animating ? " slot-enter" : ""}`}
          style={
            displayed.animating ? { ["--enter-from" as string]: enterFrom } : {}
          }
        >
          {displayed.next.name}
        </p>
      </div>

      {/* Location + Category */}
      <div className="flex items-center justify-between mb-[15px] pr-40">
        <span className="flex items-center gap-[10px] text-description text-paragraph font-light">
          <Image
            src="/assets/icons/location-pin-gray.svg"
            alt="location"
            width={20}
            height={20}
            className="object-contain pointer-events-none w-[11px] h-[14px]"
          />
          {displayed.next.location}
        </span>
        <span className="text-description text-paragraph font-light">
          {displayed.next.category}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-[#c2c2c2]" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────
export default function FeaturedProjectsResidencial() {
  const { title, projects } = featuredProjectsData;

  const activeSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [changeCount, setChangeCount] = useState(0);
  const prevIndexRef = useRef(0);

  // Only enable swiper when 3+ slides
  const enableSwiper = projects.length >= 3;
  const enableNavigation = projects.length > 3;
  const inactiveProjects = getInactiveProjects(projects, activeIndex, 2);

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

  const handleMouseEnter = useCallback(() => {
    activeSwiperRef.current?.autoplay.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    activeSwiperRef.current?.autoplay.start();
  }, []);

  return (
    <section className="w-full bg-white py-150 3xl:py-auto 3xl:pt-150 3xl:pb-200">
      <div className="container">
        {/* Title */}
        <SectionTitle
          text={title}
          className="section-heading text-secondary mb-50"
        />

        {/* Two-col layout */}
        <div className="flex gap-40 3xl:gap-50 items-stretch">
          {/* ── Left: big active swiper (fixed position, content swaps) ── */}
          <div className="shrink-0 w-[45%]">
            {enableSwiper ? (
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
                {projects.map((project) => (
                  <SwiperSlide key={project.key}>
                    <div
                      className="relative w-full h-[549px] 3xl:h-[649px] group cursor-pointer"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover pointer-events-none"
                        priority
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0) 38.14%, rgba(0, 0, 0, 0.85) 89.52%)",
                        }}
                      />
                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 px-40 pb-40 z-10">
                        <p className="text-white text-30 font-light leading-[1.33] tracking-[-0.02em] mb-20">
                          {project.name}
                        </p>
                        <div className="h-[1px] bg-white/30 mb-20" />
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-[10px] text-white font-light">
                            <Image
                              src="/assets/icons/location-pin.svg"
                              alt="location"
                              width={20}
                              height={20}
                              className="object-contain pointer-events-none w-[11px] h-[14px]"
                            />
                            {project.location}
                          </span>
                          <span className="text-white text-paragraph font-light">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              // Static single project when < 3 slides
              <div className="relative w-full h-[549px] 3xl:h-[649px]">
                <Image
                  src={projects[0].image}
                  alt={projects[0].name}
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
              </div>
            )}
          </div>

          {/* ── Right: nav + two inactive slots + all projects btn ── */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Two inactive slots side by side */}
            <div
              className="flex gap-40 3xl:gap-50 items-start flex-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {inactiveProjects.map((project, i) => {
                const projectIndex = projects.indexOf(project);
                return (
                  <InactiveSlot
                    key={`slot-${i}`}
                    project={project}
                    direction={direction}
                    changeCount={changeCount}
                    onClick={() =>
                      activeSwiperRef.current?.slideToLoop(projectIndex)
                    }
                  />
                );
              })}
            </div>

            {/* All projects button */}
            <div className="mt-30 w-full flex justify-between">
              <BorderButton
                text="All Projects"
                borderColor="black"
                textColor="black"
                iconColor="primary"
                px="px-6 lg:px-[35px]"
                hoverBg="black"
              />
              {enableNavigation && (
                <div className="flex gap-[15px]">
                  <NavButton
                    onClick={() => activeSwiperRef.current?.slidePrev()}
                    direction="left"
                    disabled={false}
                    ariaLabel="Previous project"
                  />
                  <NavButton
                    onClick={() => activeSwiperRef.current?.slideNext()}
                    direction="right"
                    disabled={false}
                    ariaLabel="Next project"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

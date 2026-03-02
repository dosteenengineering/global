"use client";

import {
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
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
  }, [changeCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const enterFrom = direction === "right" ? "100%" : "-100%";
  const exitTo = direction === "right" ? "-100%" : "100%";

  return (
    <div className="w-full sm:w-[calc(50%-8px)] 3xl:w-[369px] flex-shrink-0 cursor-pointer">
      {/* Text — slides inside fixed-height overflow-hidden container */}
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

      {/* Image — slides inside fixed-size overflow-hidden container */}
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
  const activeSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [changeCount, setChangeCount] = useState(0);
  const prevIndexRef = useRef(0);

  const projects = featuredProjectsData.projects;
  // Only 2 inactive cards visible
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

  const slidePrev = useCallback(() => activeSwiperRef.current?.slidePrev(), []);
  const slideNext = useCallback(() => activeSwiperRef.current?.slideNext(), []);

  return (
    <section className="w-full py-140 3xl:py-200 bg-white overflow-hidden container">
      <h2 className="text-center text-90 leading-[1.1] uppercase font-helvetica text-secondary mb-[70px]">
        {featuredProjectsData.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-140 3xl:gap-x-200">
        {/* ───────── Row 1 Col 1 — ACTIVE SWIPER ───────── */}
        <div>
          <Swiper
            loop={true}
            modules={[Autoplay, EffectCreative]}
            effect="creative"
            creativeEffect={{
              // ← add this block
              prev: {
                translate: ["-105%", "-105%", 0], // exits to top-left
              },
              next: {
                translate: ["105%", "105%", 0], // enters from bottom-right
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
              // pauseOnMouseEnter: true,
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
                  <div className="absolute bottom-0 left-0 right-0 px-12 pb-12 z-10">
                    <p className="text-white font-poppins font-[300] text-30 leading-[1.33] -tracking-[2%] mb-[22px]">
                      {project.name}
                    </p>
                    <div className="h-[1px] bg-white/30 mb-[22px]" />
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
        </div>

        {/* ───────── Row 1 Col 2 — NAV + INACTIVE STRIP ───────── */}
        <div className="flex flex-col justify-between mt-8 md:mt-0">
          {/* Nav */}
          <div className="flex items-center justify-end gap-[15px]">
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
          </div>

          {/* Inactive cards */}
          <div className="flex flex-col sm:flex-row gap-[16px] 3xl:gap-[30px] items-end">
            {inactiveProjects.map((project: Project, i: number) => (
              <InactiveSlot
                key={`slot-${i}`}
                project={project}
                direction={direction}
                changeCount={changeCount}
              />
            ))}
          </div>
        </div>

        {/* ───────── Row 2 Col 1 — EMPTY ───────── */}
        <div />

        {/* ───────── Row 2 Col 2 — VIEW BUTTON ───────── */}
        <div className="mt-[50px] w-fit">
          <BorderButton
            href={featuredProjectsData.viewAllHref}
            text={featuredProjectsData.viewAllLabel}
            borderColor="black"
            textColor="black"
            px="px-[35px]"
          />
        </div>
      </div>
    </section>
  );
}

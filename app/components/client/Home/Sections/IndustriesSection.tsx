"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

import { industriesData, Industry } from "../data";
import NavButton from "@/app/components/common/NavigationButton";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import ContainerAnchor from "@/app/components/layout/ContainerAnchor";

const SLIDE_WIDTH = 397;
const SPACE_BETWEEN = 10;

const getHeightByOffset = (offset: number): number => {
  const heights: Record<string, number> = {
    "-1": 273,
    "0": 507,
    "1": 406,
    "2": 273,
  };
  return heights[String(offset)] ?? 200;
};

const applyHeights = (swiper: SwiperType) => {
  const activeIdx = swiper.activeIndex;
  swiper.slides.forEach((slide, domIndex) => {
    const inner = slide.querySelector<HTMLElement>("[data-inner]");
    if (!inner) return;
    const offset = domIndex - activeIdx;
    inner.style.height = `${getHeightByOffset(offset)}px`;
  });
};

export default function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftInset = useGetContainerSpacing(containerRef);
  const industries = industriesData.industries;
  const total = industries.length;

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Track if swiper is ready to avoid operating on unmounted/destroyed instance
  const swiperReadyRef = useRef(false);

  // Intersection observer: only nudge once, safely, after swiper is ready
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let triggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        observer.disconnect();
        // Defer to next frame so swiper is guaranteed initialised
        requestAnimationFrame(() => {
          if (swiperReadyRef.current && swiperRef.current && !swiperRef.current.destroyed) {
            swiperRef.current.slideNext();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    swiper.slideToLoop(index);
    if (!swiper.autoplay?.running) swiper.autoplay?.start();
  }, []);

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    swiperReadyRef.current = true;
    applyHeights(swiper);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    applyHeights(swiper);
  }, []);

  // Stable callback wrapper for onSlideChangeTransitionStart
  const handleTransitionStart = useCallback((swiper: SwiperType) => {
    applyHeights(swiper);
  }, []);

  // Cleanup swiperReadyRef on unmount to prevent stale ref usage
  useEffect(() => {
    return () => {
      swiperReadyRef.current = false;
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <ContainerAnchor ref={containerRef} />
      <div style={{ paddingLeft: leftInset }} className="py-140 3xl:py-200">
        <div className="grid grid-cols-[215px_1fr] gap-x-[70px] mb-[70px] text-secondary">
          <div />
          <h2 className="text-90 leading-[1.111] uppercase font-helvetica max-w-[1129px]">
            {industriesData.title}
          </h2>
        </div>

        <div className="grid grid-cols-[215px_1fr] gap-x-[70px] items-start">
          <div className="flex flex-col justify-start flex-shrink-0">
            <div className="flex items-center gap-[15px] mb-[50px]">
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slidePrev();
                }}
                direction="left"
                disabled={false}
                ariaLabel="Previous"
              />
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slideNext();
                }}
                direction="right"
                disabled={false}
                ariaLabel="Next"
              />
            </div>
            <div className="w-full h-px bg-[#C2C2C2] mb-[30px]" />

            <div className="flex items-center border border-primary text-paragraph font-poppins font-[300] leading-[0.5] border-gray-300 rounded-full px-[16px] text-15 w-[78px] h-[31px] py-[3px]">
              <span className="font-[600]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
          </div>

          <div
            ref={swiperContainerRef}
            style={{ overflow: "visible", minWidth: 0 }}
          >
            {/* Render Swiper directly — no isMounted gate to avoid layout flash.
                suppressHydrationWarning on the wrapper prevents SSR/CSR mismatch noise. */}
            <div suppressHydrationWarning>
              <Swiper
                loop={true}
                initialSlide={1}
                modules={[Autoplay]}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                onSlideChangeTransitionStart={handleTransitionStart}
                slidesPerView="auto"
                spaceBetween={SPACE_BETWEEN}
                speed={500}
                allowTouchMove={true}
                watchSlidesProgress={true}
                slidesOffsetBefore={SLIDE_WIDTH + SPACE_BETWEEN}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                observer={true}
                observeParents={true}
                className="h-[569px]"
              >
                {industries.map((industry: Industry, index: number) => (
                  <SwiperSlide
                    key={industry.key}
                    style={{ width: `${SLIDE_WIDTH}px` }}
                  >
                    <div
                      data-inner
                      className="relative cursor-pointer"
                      style={{
                        width: `${SLIDE_WIDTH}px`,
                        height: `${getHeightByOffset(index - 1)}px`,
                        transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onClick={() => goTo(index)}
                    >
                      <Image
                        src={industry.image}
                        alt={industry.label}
                        fill
                        className="object-cover"
                        sizes="397px"
                        priority={index <= 2}
                      />
                    </div>
                    <div className="mt-[22px] text-30 leading-[1.33] text-paragraph font-poppins font-[300]">
                      {industry.label}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
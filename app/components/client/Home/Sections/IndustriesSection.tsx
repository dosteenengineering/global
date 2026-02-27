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
  const [isMounted, setIsMounted] = useState(false);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        swiperRef.current?.slideNext();
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const goTo = useCallback((index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.slideToLoop(index);
    if (!swiper.autoplay?.running) swiper.autoplay?.start();
  }, []);

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    applyHeights(swiper);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    applyHeights(swiper);
  }, []);

  return (
    <section ref={sectionRef}>
      <ContainerAnchor ref={containerRef} />
      <div style={{ paddingLeft: leftInset }} className="py-200">
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
                onClick={() => swiperRef.current?.slidePrev()}
                direction="left"
                disabled={false}
                ariaLabel="Previous"
              />
              <NavButton
                onClick={() => swiperRef.current?.slideNext()}
                direction="right"
                disabled={false}
                ariaLabel="Next"
              />
            </div>
            <div className="w-full h-px bg-[#C2C2C2] mb-[30px]" />

            <div className="flex items-center gap-1 border border-primary text-paragraph font-poppins font-[300] leading-[1.666] border-gray-300 rounded-full px-[17px] text-15 w-fit py-[3px]">
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
            {isMounted && (
              <Swiper
                loop={true}
                initialSlide={1}
                modules={[Autoplay]}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                onSlideChangeTransitionStart={applyHeights}
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
                className="3xl:h-[569px]"
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

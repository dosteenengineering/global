
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
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const SLIDE_WIDTH = 397;
const SPACE_BETWEEN = 10;

const SM_ACTIVE_HEIGHT = 330;
const LG_ACTIVE_HEIGHT = 507;
const SM_SCALE = SM_ACTIVE_HEIGHT / LG_ACTIVE_HEIGHT;

const BREAKPOINT_3XL = 1920;
const LG_RESPONSIVE_SCALE = 0.87;

const LG_HEIGHT_MAP: Record<string, number> = {
  "-1": 273,
  "0": 507,
  "1": 406,
  "2": 273,
};

const getHeightByOffset = (offset: number, scale = 1): number =>
  Math.round((LG_HEIGHT_MAP[String(offset)] ?? 200) * scale);

const getSmHeightByOffset = (offset: number): number =>
  Math.round(getHeightByOffset(offset) * SM_SCALE);

const applyHeights = (swiper: SwiperType, isLg: boolean, lgScale: number) => {
  const activeIdx = swiper.activeIndex;
  swiper.slides.forEach((slide, domIndex) => {
    const inner = slide.querySelector<HTMLElement>("[data-inner]");
    if (!inner) return;
    const offset = domIndex - activeIdx;
    const h = isLg
      ? getHeightByOffset(offset, lgScale)
      : getSmHeightByOffset(offset);
    inner.style.height = `${h}px`;
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
  const smContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperReadyRef = useRef(false);

  const isLgRef = useRef(true);
  const lgScaleRef = useRef(1);
  const [isLg, setIsLg] = useState(true);
  const [lgScale, setLgScale] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [smSlideWidth, setSmSlideWidth] = useState(310);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleResize = () => {
      const lg = window.innerWidth >= 1024;
      const scale = window.innerWidth >= BREAKPOINT_3XL ? 1 : LG_RESPONSIVE_SCALE;
      isLgRef.current = lg;
      lgScaleRef.current = scale;
      setIsLg(lg);
      setLgScale(scale);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Re-apply heights + update swiper when scale changes on lg
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed || !isLgRef.current) return;
    swiper.update();
    applyHeights(swiper, true, lgScaleRef.current);
  }, [lgScale]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let triggered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        observer.disconnect();
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
    applyHeights(swiper, isLgRef.current, lgScaleRef.current);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    applyHeights(swiper, isLgRef.current, lgScaleRef.current);
  }, []);

  const handleTransitionStart = useCallback((swiper: SwiperType) => {
    applyHeights(swiper, isLgRef.current, lgScaleRef.current);
  }, []);

  useEffect(() => {
    return () => { swiperReadyRef.current = false; };
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed || isLg) return;
    swiper.update();
    applyHeights(swiper, false, 1);
  }, [smSlideWidth, isLg]);

  const showLg = !mounted || isLg;

  // Both width and height scaled together for lg/xl/2xl
  const lgSlideWidth = Math.round(SLIDE_WIDTH * lgScale);
  const currentSlideWidth = showLg ? lgSlideWidth : smSlideWidth;

  const getInitialHeight = (index: number): number =>
    showLg
      ? getHeightByOffset(index - 1, lgScale)
      : getSmHeightByOffset(index - 1);

  const lgSwiperHeight = Math.round(getHeightByOffset(0, lgScale) + 62);
  const lgOffsetBefore = lgSlideWidth + SPACE_BETWEEN;

  const counterPill = (
    <div className="flex items-center border border-primary text-paragraph font-poppins font-[300] leading-[0.5] border-gray-300 rounded-full px-[16px] text-15 w-[78px] h-[31px] py-[3px]">
      <span className="font-[600]">{String(activeIndex + 1).padStart(2, "0")}</span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );

  const slideElements = industries.map((industry: Industry, index: number) => (
    <SwiperSlide key={industry.key} style={{ width: `${currentSlideWidth}px` }}>
      <div
        data-inner
        className="relative cursor-pointer"
        style={{
          width: `${currentSlideWidth}px`,
          height: `${getInitialHeight(index)}px`,
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={() => goTo(index)}
      >
        <Image
          src={industry.image}
          alt={industry.label}
          fill
          className="object-cover"
          sizes={showLg ? `${lgSlideWidth}px` : `${smSlideWidth}px`}
          priority={index <= 2}
        />
      </div>
      <div className="mt-4 lg:mt-[22px] ml-[15px] lg:ml-[28px] text-30 leading-[1.33] text-paragraph font-poppins font-[300]">
        {industry.label}
      </div>
    </SwiperSlide>
  ));

  return (
    <section className="overflow-hidden" ref={sectionRef}>
      <ContainerAnchor ref={containerRef} />

      {showLg ? (
        <div style={{ paddingLeft: leftInset }} className="py-140 3xl:py-200">
          <div className="grid grid-cols-[150px_1fr] 3xl:grid-cols-[215px_1fr] gap-x-15 3xl:gap-x-[70px] mb-10 xl:mb-14 3xl:mb-[70px] text-secondary">
            <div />
            <SectionTitle
            text={industriesData.title}
            className="section-font-size leading-[1.111] uppercase font-helvetica max-w-[1129px]"
             />
          </div>

          <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{once: true}} className="grid grid-cols-[150px_1fr] 3xl:grid-cols-[215px_1fr] gap-x-15 3xl:gap-x-[70px] items-start">
            <div className="flex flex-col justify-start flex-shrink-0">
              <div className="flex items-center gap-[15px] mb-10 3xl:mb-[50px]">
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
              <div className="w-full h-px bg-[#C2C2C2] mb-6 3xl:mb-[30px]" />
              {counterPill}
            </div>

            <div ref={swiperContainerRef} style={{ overflow: "visible", minWidth: 0 }}>
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
                  slidesOffsetBefore={lgOffsetBefore}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  observer={true}
                  observeParents={true}
                  style={{ height: `${lgSwiperHeight}px` }}
                >
                  {slideElements}
                </Swiper>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="py-140 container">
          <SectionTitle
            text={industriesData.title}
            className="section-font-size leading-[1.111] uppercase font-helvetica w-full mb-8 md:mb-10 text-secondary"
          />

          <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{once: true}} className="flex items-center justify-between mb-4 md:mb-8">
            <motion.div variants={moveUp(0.3)} initial="hidden" whileInView="show" viewport={{once: true}}>{counterPill}</motion.div>
            <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{once: true}} className="flex items-center gap-[15px]">
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
            </motion.div>
          </motion.div>

          <div className="w-full h-px bg-[#C2C2C2] mb-6 md:mb-8" />

          <div ref={smContainerRef} className="w-full">
            <div suppressHydrationWarning>
              <Swiper
                loop={true}
                initialSlide={1}
                modules={[Autoplay]}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                onSlideChangeTransitionStart={handleTransitionStart}
                slidesPerView="auto"
                centeredSlides={true}
                spaceBetween={SPACE_BETWEEN}
                speed={500}
                allowTouchMove={true}
                watchSlidesProgress={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                observer={true}
                observeParents={true}
                className="h-[380px] !overflow-visible"
              >
                {slideElements}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
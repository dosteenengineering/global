"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import { slidesData } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import Image from "next/image";
import Counter from "@/app/components/common/CounterAnimate";
import { moveUpVariant, labelVariant } from "@/app/components/motionVariants";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

const SLIDE_INTERVAL = 5000;
const DRAG_THRESHOLD = 40;

export default function AboutSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef      = useRef<SwiperType | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef   = useRef<number | null>(null);
  const startTimeRef   = useRef<number>(Date.now());
  const dragStartX     = useRef<number | null>(null);
  const isDragging     = useRef(false);

  const startProgress = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startTimeRef.current = Date.now();
    const tick = () => {
      const pct = Math.min(
        ((Date.now() - startTimeRef.current) / SLIDE_INTERVAL) * 100,
        100
      );
      if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
      if (pct < 100) animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const handleRealIndexChange = useCallback(
    (s: SwiperType) => {
      setActiveIndex(s.realIndex);
      startProgress();
    },
    [startProgress]
  );

  useEffect(() => {
    startProgress();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startProgress]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    // ignore clicks on interactive elements
    const tag = (e.target as HTMLElement).closest("a, button");
    if (tag) return;
    dragStartX.current = e.clientX;
    isDragging.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (isDragging.current && Math.abs(diff) > DRAG_THRESHOLD) {
      diff < 0
        ? swiperRef.current?.slideNext()
        : swiperRef.current?.slidePrev();
    }
    dragStartX.current = null;
    isDragging.current = false;
  }, []);

  const activeSlide = slidesData[activeIndex];

  return (
    <section
      className="bg-white w-full relative select-none"
      style={{ cursor: "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute -top-88 lg:-top-73 left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Invisible Swiper — sole autoplay clock */}
      <div
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ width: "1px", height: "1px", overflow: "hidden" }}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: SLIDE_INTERVAL, disableOnInteraction: false }}
          loop={true}
          speed={600}
          allowTouchMove={false}
          onSwiper={(s) => (swiperRef.current = s)}
          onRealIndexChange={handleRealIndexChange}
          style={{ width: "100px", height: "100px" }}
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div style={{ width: "100px", height: "100px" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="lg:ml-[29%] pt-120 px-[15px] lg:px-0 container">
        <SectionTitle 
        text="DELIVERING EXCELLENCE BEYOND BORDERS"
        className="font-helvetica section-font-size leading-[1.111] max-w-[400px] md:max-w-[560px] lg:max-w-[880px] xl:max-w-[880px]  3xl:max-w-[1049px] text-secondary uppercase"
        />
      </div>

      <div className="container mt-6 lg:mt-[30px]">
        <div className="flex flex-col lg:grid lg:grid-cols-[60%_40%]">
          <div className="hidden lg:block" />

          {/* Description */}
          <div className="lg:pb-6 3xl:pb-[70px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`desc-${activeIndex}`}
                variants={moveUpVariant(0.5)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-19 text-paragraph font-poppins font-[300] leading-[1.52] lg:max-w-[520px] min-h-[174px]"
              >
                <span className="font-[700]">{activeSlide.description.split(",")[0]},</span>
                {activeSlide.description.substring(activeSlide.description.indexOf(",") + 1)}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Pagination pill */}
          <div className="pt-6">
            <span className="border border-[#C2C2C2] text-paragraph text-15 leading-[0.5] py-[3px] max-w-[78px] h-[31px] flex items-center justify-center rounded-[15px]">
              <span className="font-bold">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-[#C2C2C2]">/</span>
              {String(slidesData.length).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden lg:block" />

          <div className="flex items-center lg:contents">
            <div className="flex-1 lg:flex lg:items-center">
              <div className="w-full h-[2px] bg-gray-200 overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-[#1853D6] will-change-[width]"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
            <div className="lg:flex lg:items-center">
              <BorderButton
                text="Know More Us"
                borderColor="black"
                textColor="black"
                iconColor="primary"
                px="px-6 lg:px-[35px]"
              />
            </div>
          </div>

          {/* Counter */}
          <div className="pb-140 3xl:pb-200 overflow-hidden" style={{ perspective: "800px" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`counter-${activeIndex}`}
                variants={moveUpVariant(0.5)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="pt-8 lg:pt-[45px]"
              >
                <Counter
                  value={activeSlide.stat}
                  totalTime={2.5}
                  start={0}
                  className="font-helvetica text-250 leading-[1] text-secondary"
                />
              </motion.div>
            </AnimatePresence>

              <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`label-${activeIndex}`}
                  variants={labelVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-30 font-poppins font-[300] leading-[1.33] text-paragraph -tracking-[2%]"
                >
                  {activeSlide.statLabel}
                </motion.p>
            </AnimatePresence>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
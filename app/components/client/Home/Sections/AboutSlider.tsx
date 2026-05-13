"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { slidesData } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import Image from "next/image";
import Counter from "@/app/components/common/CounterAnimate";
import { moveUp, slideVariant } from "@/app/components/motionVariants";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

const SLIDE_INTERVAL = 5000;
const DRAG_THRESHOLD = 40;

export default function AboutSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward

  const swiperRef = useRef<SwiperType | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const prevIndex = useRef(0);

  const startProgress = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startTimeRef.current = Date.now();
    const tick = () => {
      const pct = Math.min(
        ((Date.now() - startTimeRef.current) / SLIDE_INTERVAL) * 100,
        100,
      );
      if (progressBarRef.current)
        progressBarRef.current.style.width = `${pct}%`;
      if (pct < 100) animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const handleRealIndexChange = useCallback(
    (s: SwiperType) => {
      const next = s.realIndex;
      const total = slidesData.length;
      const prev = prevIndex.current;

      // Detect wrap-around: last→first is a forward loop, first→last is backward loop
      const isWrapForward = prev === total - 1 && next === 0;
      const isWrapBackward = prev === 0 && next === total - 1;
      const dir = isWrapForward
        ? 1
        : isWrapBackward
          ? -1
          : next > prev
            ? 1
            : -1;

      prevIndex.current = next;
      setDirection(dir);
      setActiveIndex(next);
      startProgress();
    },
    [startProgress],
  );

  useEffect(() => {
    startProgress();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startProgress]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const tag = (e.target as HTMLElement).closest("a, button");
      if (tag) return;
      dragStartX.current = e.clientX;
      isDragging.current = false;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (dragStartX.current === null) return;
      if (Math.abs(e.clientX - dragStartX.current) > 8)
        isDragging.current = true;
    },
    [],
  );

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
      <div className="absolute top-[-41%] md:-top-88 lg:-top-73 left-[-97px] md:left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain min-w-[280px] w-[53.14%] sm:w-[60%] lg:w-full h-full"
        />
      </div>

      <div className="overflow-hidden">
        {/* Invisible Swiper — autoplay clock */}
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
        <div className="lg:ml-[29%] pt-[70px] lg:pt-120 px-[15px] lg:px-0 container">
          <SectionTitle
            text="DELIVERING EXCELLENCE BEYOND BORDERS"
            className="section-heading max-w-[400px] md:max-w-[560px] lg:max-w-[880px] xl:max-w-[880px] 3xl:max-w-[1049px] text-secondary uppercase"
          />
        </div>
        <div className="container mt-[10px] md:mt-6 lg:mt-[30px]">
          <div className="flex flex-col lg:grid lg:grid-cols-[60%_40%]">
            <div className="hidden lg:block" />
            {/* Description */}
            {/* <div className="lg:pb-6 3xl:pb-[70px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.p
                  key={`desc-${activeIndex}`}
                  custom={direction}
                  variants={slideVariant(0.5)}
                  initial="enter"
                  animate="show"
                  exit="exit"
                  className="text-19 text-paragraph font-poppins font-[300] leading-[1.52] lg:max-w-[520px] min-h-[174px]"
                >
                  <span className="font-[700]">
                    {activeSlide.description.split(",")[0]},
                  </span>
                  {activeSlide.description.substring(
                    activeSlide.description.indexOf(",") + 1,
                  )}
                </motion.p>
              </AnimatePresence>
            </div> */}
            {/* Description */}
            <div className="lg:pb-6 3xl:pb-[70px] overflow-hidden">
              <motion.p
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-description !tracking-[0.02em] text-paragraph font-poppins font-light lg:max-w-[520px]"
              >
                <span className="font-[700]">
                  {slidesData[0].description.split(",")[0]},
                </span>
                {slidesData[0].description.substring(
                  slidesData[0].description.indexOf(",") + 1,
                )}
              </motion.p>
            </div>
            {/* Pagination pill */}
            <div className="pt-20 md:pt-6 -mb-[10px] md:mb-0">
              <span className="border border-[#C2C2C2] text-paragraph text-15 leading-[0.5] py-[3px] max-w-[55px] md:max-w-[78px] h-[26px] md:h-[31px] flex items-center justify-center rounded-[15px]">
                <span className="font-bold">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
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
                  hoverBg="black"
                  className="max-w-[215px]"
                />
              </div>
            </div>
            {/* Counter */}
            <div
              className="pb-140 3xl:pb-200 overflow-hidden"
              style={{ perspective: "800px" }}
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={`counter-${activeIndex}`}
                  custom={direction}
                  variants={slideVariant(0.5)}
                  initial="enter"
                  animate="show"
                  exit="exit"
                  className="pt-[30px] md:pt-8 lg:pt-[45px]"
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
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.p
                    key={`label-${activeIndex}`}
                    custom={direction}
                    variants={slideVariant(0.5)}
                    initial="enter"
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
      </div>
    </section>
  );
}

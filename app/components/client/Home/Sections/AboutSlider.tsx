"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { slidesData } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import Image from "next/image";
import Counter from "@/app/components/common/CounterAnimate";

const SLIDE_INTERVAL = 5000;

export default function AboutSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const topSwiperRef = useRef<SwiperType | null>(null);
  const bottomSwiperRef = useRef<SwiperType | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const syncSource = useRef<"top" | "bottom" | null>(null);

  const startProgress = () => {
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
  };

  useEffect(() => {
    startProgress();
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [activeIndex]);

  const handleTopRealIndexChange = (swiper: SwiperType) => {
    if (syncSource.current === "bottom") return;
    syncSource.current = "top";
    const idx = swiper.realIndex;
    setActiveIndex(idx);
    if (bottomSwiperRef.current && bottomSwiperRef.current.realIndex !== idx)
      bottomSwiperRef.current.slideToLoop(idx, 600);
    setTimeout(() => { syncSource.current = null; }, 700);
  };

  const handleBottomRealIndexChange = (swiper: SwiperType) => {
    if (syncSource.current === "top") return;
    syncSource.current = "bottom";
    const idx = swiper.realIndex;
    setActiveIndex(idx);
    if (topSwiperRef.current && topSwiperRef.current.realIndex !== idx)
      topSwiperRef.current.slideToLoop(idx, 600);
    setTimeout(() => { syncSource.current = null; }, 700);
  };

  const handleTouchEnd = (swiper: SwiperType) => {
    if (swiper.autoplay && !swiper.autoplay.running) swiper.autoplay.start();
  };

  return (
    <section className="bg-white w-full relative">
      <div className="absolute -top-88 lg:-top-73 left-0">
        <Image
          src="/assets/icons/bg-svg/top-left.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain"
        />
      </div>

      <div className="lg:ml-[29%] pt-120 px-[15px] lg:px-0">
        <h2 className="font-helvetica text-[34px] lg:text-90 leading-[1.111] max-w-[1049px] text-secondary uppercase">
          DELIVERING EXCELLENCE BEYOND BORDERS
        </h2>
      </div>

      <div className="container mt-6 lg:mt-[30px]">
        <div className="flex flex-col lg:grid lg:grid-cols-[60%_40%]">
          <div className="hidden lg:block" />

          {/* Description swiper */}
          <div className="lg:pb-[70px]">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: SLIDE_INTERVAL, disableOnInteraction: false }}
              loop={true}
              speed={600}
              onSwiper={(s) => (topSwiperRef.current = s)}
              onRealIndexChange={handleTopRealIndexChange}
              onTouchEnd={handleTouchEnd}
              className="w-full"
            >
              {slidesData.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <p className="text-19 text-paragraph font-poppins font-[300] leading-[1.52] lg:max-w-[520px]">
                    <span className="font-[700]">{slide.description.split(",")[0]},</span>
                    {slide.description.substring(slide.description.indexOf(",") + 1)}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Pagination pill — left col on desktop */}
          <div className="pt-6">
            <span className="border border-[#C2C2C2] text-paragraph text-15 leading-[0.5] py-[3px] max-w-[78px] h-[31px] flex items-center justify-center rounded-[15px]">
              <span className="font-bold">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-[#C2C2C2]">/</span>
              {String(slidesData.length).padStart(2, "0")}
            </span>
          </div>

          {/* Desktop: right-col spacer */}
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

          {/* Counter swiper — left col on desktop */}
          <div className="pb-140 3xl:pb-200">
            <Swiper
              loop={true}
              speed={600}
              allowTouchMove={true}
              onSwiper={(s) => (bottomSwiperRef.current = s)}
              onRealIndexChange={handleBottomRealIndexChange}
              onTouchEnd={handleTouchEnd}
              className="w-full"
            >
              {slidesData.map((slide, i) => (
                <SwiperSlide key={slide.id}>
                  <div className="pt-8 lg:pt-[45px]">
                    <Counter
                      key={`counter-${activeIndex === i ? activeIndex : `idle-${i}`}`}
                      value={slide.stat}
                      totalTime={2.5}
                      start={0}
                      className="font-helvetica text-250 leading-[1] text-secondary"
                    />
                  </div>
                  <p className="text-30 font-poppins font-[300] leading-[1.33] text-paragraph -tracking-[2%]">
                    {slide.statLabel}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}
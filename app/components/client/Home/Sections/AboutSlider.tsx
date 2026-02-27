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

export default function AboutSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const topSwiperRef = useRef<SwiperType | null>(null);
  const bottomSwiperRef = useRef<SwiperType | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTime = useRef<number>(Date.now());
  const syncSource = useRef<"top" | "bottom" | null>(null);
  const sliderInterval = 5000;

  const startProgress = () => {
    startTime.current = Date.now();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min((elapsed / sliderInterval) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeIndex]);

  const handleTopRealIndexChange = (swiper: SwiperType) => {
    if (syncSource.current === "bottom") return;
    syncSource.current = "top";

    const idx = swiper.realIndex;
    setActiveIndex(idx);
    setProgress(0);

    if (bottomSwiperRef.current && bottomSwiperRef.current.realIndex !== idx) {
      bottomSwiperRef.current.slideToLoop(idx, 600);
    }

    setTimeout(() => { syncSource.current = null; }, 700);
  };

  const handleBottomRealIndexChange = (swiper: SwiperType) => {
    if (syncSource.current === "top") return;
    syncSource.current = "bottom";

    const idx = swiper.realIndex;
    setActiveIndex(idx);
    setProgress(0);

    if (topSwiperRef.current && topSwiperRef.current.realIndex !== idx) {
      topSwiperRef.current.slideToLoop(idx, 600);
    }

    setTimeout(() => { syncSource.current = null; }, 700);
  };

  const handleTouchEnd = (swiper: SwiperType) => {
    if (swiper.autoplay && !swiper.autoplay.running) {
      swiper.autoplay.start();
    }
  };

  return (
    <section className="bg-white w-full relative">
      <div className="absolute -top-73 left-0 hidden lg:block">
        <Image
          src="/assets/icons/bg-svg/top-left.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain"
        />
      </div>

      <div className="ml-[29%] pt-120">
        <h2 className="font-helvetica text-90 leading-[1.111] max-w-[1049px] text-secondary uppercase">
          DELIVERING EXCELLENCE BEYOND BORDERS
        </h2>
      </div>

      <div className="container mt-[30px]">
        <div className="grid grid-cols-[60%_40%] gap-x-0">
          <div />
          <div className="pb-[70px]">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: sliderInterval, disableOnInteraction: false }}
              loop={true}
              speed={600}
              onSwiper={(swiper) => (topSwiperRef.current = swiper)}
              onRealIndexChange={handleTopRealIndexChange}
              onTouchEnd={handleTouchEnd}
              className="w-full"
            >
              {slidesData.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <p className="text-19 text-paragraph font-poppins font-[300] leading-[1.52] max-w-[520px]">
                    <span className="font-[700]">
                      {slide.description.split(",")[0]},
                    </span>
                    {slide.description.substring(
                      slide.description.indexOf(",") + 1,
                    )}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <span className="border border-[#C2C2C2] text-paragraph text-15 leading-[1.66] max-w-[78px] h-[31px] flex items-center justify-center rounded-[15px]">
              <span className="font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-[#C2C2C2]">/</span>
              {String(slidesData.length).padStart(2, "0")}
            </span>
          </div>
          <div />

          <div className="flex items-center pb-5">
            <div className="w-full h-[2px] bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#1853D6]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center">
            <BorderButton
              text="Know More Us"
              borderColor="black"
              textColor="black"
              iconColor="primary"
            />
          </div>

          <div className="pb-200">
            <Swiper
              loop={true}
              speed={600}
              allowTouchMove={true}
              onSwiper={(swiper) => (bottomSwiperRef.current = swiper)}
              onRealIndexChange={handleBottomRealIndexChange}
              onTouchEnd={handleTouchEnd}
              className="w-full"
            >
              {slidesData.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="pt-[45px]">
                    {activeIndex === bottomSwiperRef.current?.realIndex && (
  <Counter
    key={`counter-${activeIndex}`}
    value={slide.stat}
    totalTime={2.5}
    start={0}
    className="font-helvetica text-250 leading-[1] text-secondary"
  />
)}

                  </div>
                  <div className="">
                    <p className="text-30 font-poppins font-[300] leading-[1.33] text-paragraph -tracking-[2%]">
                      {slide.statLabel}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
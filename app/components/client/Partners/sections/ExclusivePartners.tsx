"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { useRef, useState, useEffect, useCallback } from "react";
import { ClientPageData } from "../data";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";

import "swiper/css";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const AUTOPLAY_DELAY = 3500;

const Partners = ({data}:{data:ClientPageData['thirdSection']}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftInset = useGetContainerSpacing(containerRef);
  const swiperRef = useRef<SwiperClass | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // const { title, subtitle, description, slides } = partnersData;
  const title = data.title
  const subtitle = data.subTitle
  const description = data.description
  const slides = data.items

  const getSlidesPerView = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return 1;
    const spv = swiper.params.slidesPerView;
    return typeof spv === "number" ? spv : 1;
  }, []);

  const ensureSlideVisible = useCallback(
    (index: number) => {
      const swiper = swiperRef.current;
      if (!swiper) return;
      const spv = Math.floor(getSlidesPerView());
      // also check if the slide right after active is visible
      const nextIndex = index + 1 < slides.length ? index + 1 : index;
      const startVisible = swiper.activeIndex;
      const endVisible = startVisible + spv - 1;

      if (index < startVisible || nextIndex > endVisible) {
        // slide so that active is at the start, but don't go past max
        const maxStart = slides.length - spv;
        swiper.slideTo(Math.min(index, maxStart));
      }
    },
    [getSlidesPerView, slides.length],
  );

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isHoveredRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        requestAnimationFrame(() => ensureSlideVisible(next));
        return next;
      });
    }, AUTOPLAY_DELAY);
  }, [slides.length, ensureSlideVisible]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, startAutoplay]);

  const handleMouseEnter = (index: number) => {
    isHoveredRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    startAutoplay();
  };

  return (
    <section className="py-12.5 md:py-100 lg:py-130 3xl:py-150 overflow-hidden relative">
      <SecondaryNoise />

      {/* HEADER */}
      <div ref={containerRef} className="relative container mb-50">
        <SectionTitle title={title} className="mb-50 section-heading " />
        <SectionDescription text={subtitle} className="!text-30 !leading-[1.334] -tracking-[0.02em] font-light mb-2.5 md:mb-30" />
        <SectionDescription text={description} className="text-description text-paragraph max-w-[90ch]" />
      </div>

      {/* SLIDER */}
      <Swiper spaceBetween={0} onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{ marginLeft: leftInset }}
        breakpoints={{ 0: { slidesPerView: 1.74 }, 640: { slidesPerView: 2.2 }, 768: { slidesPerView: 3.2 }, 1620: { slidesPerView: 4.275 }, }} className="!overflow-visible" >
        {slides.map((slide, index) => { 
          const isActive = index === activeIndex; const isLast = index === slides.length - 1;
          return (
            <SwiperSlide key={index}>
              <motion.div 
                variants={moveUp(index * 0.12)} 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`relative cursor-pointer select-none border-l border-y border-[#c2c2c2] min-h-[200px] md:min-h-[284px] ${isLast ? "border-r" : ""} transition-colors duration-700 ease-out`} 
              >
                <div className={`absolute inset-0 transition-opacity duration-700 ease-out will-change-[opacity] ${isActive ? "opacity-100" : "opacity-0" }`} >
                  <PrimaryNoise2 />
                </div>
                {/* CENTER: logo + title stacked, always centered as a group */}
                <div className="absolute 3xl:top-[-31px] inset-0 flex md:items-center justify-center">
                  <div className="relative mt-[27px] md:mt-0 flex flex-col items-center">
                    <div className={`relative w-auto 3xl:w-[258px] h-[55px] md:h-[70px] 3xl:h-[98px] transition-transform duration-700 ease-out
                       will-change-transform ${isActive ? "md:-translate-y-4" : "translate-y-0"}`}>
                      <Image src={slide.image} alt={slide.imageAlt} width={258} height={98} className={`object-cover h-full ${isActive ? "" : ""}`} />
                    </div>
                    <p className={`text-center max-[768px]:pt-4 max-[768px]:max-w-[80%] xl:absolute top-full mt-0 text-description text-white transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]
                    ${isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                    >
                      {slide.title}
                    </p>
                  </div>
                </div>

                {/* BOTTOM-LEFT: country — always visible, bordered box */}
                <div className="absolute bottom-0 left-0">
                  <p className={`text-[12px] md:text-15 xl:text-19 font-light text-center capitalize min-w-[113px] h-[23px] md:h-[35px] flex items-center justify-center tracking-widest px-[17.5px] border-t border-r transition-colors duration-700 ease-out 
                  ${isActive
                        ? "text-white border-white"
                        : "text-paragraph border-[#c2c2c2]"
                      }`}
                  >
                    {slide.location}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Partners;

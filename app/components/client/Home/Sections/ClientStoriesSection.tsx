"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { clientStoriesData, ClientStory } from "../data";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";
import { moveLeft, moveRight, moveUp } from "@/app/components/motionVariants";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

const SLIDE_DELAY = 5000;

export default function ClientStoriesSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const total = clientStoriesData.stories.length;
  const activeStory: ClientStory = clientStoriesData.stories[activeIndex];

  useEffect(() => {
    const id = setTimeout(() => {
      const next = (activeIndex + 1) % total;
      swiperRef.current?.slideToLoop(next);
      setActiveIndex(next);
      setProgressKey((k) => k + 1);
    }, SLIDE_DELAY);
    return () => clearTimeout(id);
  }, [activeIndex, progressKey]);

  const handleSwiper = useCallback((s: SwiperType) => {
    swiperRef.current = s;
  }, []);

  const handleSlideChange = useCallback((s: SwiperType) => {
    setActiveIndex(s.realIndex);
    setProgressKey((k) => k + 1);
  }, []);

  const goToSlide = useCallback((i: number) => {
    swiperRef.current?.slideToLoop(i);
    setActiveIndex(i);
    setProgressKey((k) => k + 1);
  }, []);

  return (
    <section className="w-full overflow-hidden relative">
      <PrimaryNoise />

      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex relative z-10 container min-h-screen flex-col pt-140">
        <SectionTitle
          title={clientStoriesData.title}
          className="text-white section-font-size leading-[1.11] font-helvetica uppercase mb-[82px]"
        />

        <div className="flex flex-row flex-1 gap-0 lg:pl-10 xl:pl-12 2xl:pl-14 3xl:pl-[65px]">
          {/* Opening quote icon */}
          <div className="flex-shrink-0 flex items-start mr-15 xl:mr-90 2xl:mr-110 3xl:mr-[113px] pointer-events-none overflow-hidden">
            <motion.div
            variants={moveRight(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >
              <Image
                src="/assets/images/home/client-stories/quote-open.svg"
                alt="quote open"
                width={120}
                height={120}
                className="object-contain opacity-10 w-[80px] h-[140px] md:w-[120px] md:h-[200px] 2xl:w-[160px] 2xl:h-[300px] 3xl:w-[233px] 3xl:h-[446px]"
              />
            </motion.div>
          </div>

          {/* Vertical divider */}
          <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-shrink-0 self-stretch w-px bg-[#76A7FF]" />

          {/* Main content col */}
          <div className="flex-1 flex flex-col min-w-0 pl-[30px]">
            <div className="flex flex-row flex-1 gap-0">
              {/* Counter pill */}
              <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex-shrink-0 pr-12 2xl:pr-[66px] -mt-3">
                <div className="rounded-full border flex justify-center items-center font-[300] border-white w-[78px] h-[31px]">
                  <span className="font-poppins text-15 leading-[1.66] text-white">
                    <span className="font-[600]">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span>/{String(total).padStart(2, "0")}</span>
                  </span>
                </div>
              </motion.div>

              {/* Lines + content */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Progress lines */}
                <div className="flex items-center flex-shrink-0 gap-[28px] 3xl:gap-[38px] mb-120 3xl:mb-[126px] relative z-20">
                  {clientStoriesData.stories.map((_, i) => (
                    <motion.button
                    variants={moveUp(i*0.18)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                      key={i}
                      onClick={() => goToSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="flex flex-1 items-center h-[12px] bg-transparent border-none outline-none p-0 m-0 cursor-pointer"
                    >
                      <span className="relative block w-full h-[2px] bg-white/30">
                        {i === activeIndex && (
                          <span className="absolute inset-0 flex items-center">
                            <motion.span
                              key={progressKey}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: SLIDE_DELAY / 1000,
                                ease: "linear",
                              }}
                              className="block h-[4px] bg-white flex-shrink-0"
                            />
                          </span>
                        )}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Content area */}
                <div className="flex-1 relative">
                  {/* Invisible Swiper — handles drag only, no autoplay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 z-10 cursor-grab"
                  >
                    <Swiper
                      loop={true}
                      onSwiper={handleSwiper}
                      onSlideChange={handleSlideChange}
                      slidesPerView={1}
                      speed={600}
                      allowTouchMove={true}
                      style={{ width: "100%", height: "100%" }}
                    >
                      {clientStoriesData.stories.map((story: ClientStory) => (
                        <SwiperSlide key={story.key}>
                          <div className="w-full h-full" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Visible content */}
                  <div className="flex flex-col justify-between h-full">
                    {/* Quote */}
                    <div className="overflow-hidden mb-200 3xl:mb-[215px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={`quote-${activeIndex}`}
                          variants={moveUp(0)}
                          initial="hidden"
                          animate="show"
                          exit={{
                            opacity: 0,
                            y: -24,
                            transition: { duration: 0.2, ease: "easeIn" },
                          }}
                          className="text-white text-55 leading-[1.18] -tracking-[2%] max-w-[998px] font-poppins font-[300] min-h-[238px] 3xl:min-h-[208px]"
                        >
                          {activeStory.quote}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    {/* Author */}
                    <div className="overflow-hidden pb-140">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={`author-${activeIndex}`}
                          variants={moveUp(0.3)}
                          initial="hidden"
                          animate="show"
                          exit={{
                            opacity: 0,
                            y: -16,
                            transition: { duration: 0.18, ease: "easeIn" },
                          }}
                          className="flex flex-col gap-[8px] 3xl:gap-[15px] font-[300] text-white font-poppins -tracking-[2%]"
                        >
                          <p className="text-30 leading-[1.33]">
                            {activeStory.name}
                          </p>
                          <p className="text-19 leading-[1.52]">
                            {activeStory.company} – {activeStory.designation}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Closing quote — pinned bottom-right, static */}
                    <div className="absolute bottom-0 right-20 2xl:right-50 3xl:right-[285px] pb-90 overflow-hidden">
                      <motion.div
                      variants={moveLeft(0.4)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      >
                      <Image
                        src="/assets/images/home/client-stories/quote-close.svg"
                        alt="quote close"
                        width={112}
                        height={225}
                        className="opacity-10 w-[56px] h-[112px] md:w-[84px] md:h-[168px] 3xl:w-[112px] 3xl:h-[225px] object-contain"
                      />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative z-10 container pt-140 pb-[60px]">
        <SectionTitle
        title={clientStoriesData.title}
        className="text-white section-font-size leading-[1.11] font-helvetica uppercase mb-8 md:mb-10"
        />

        {/* Progress bars — full width */}
        <div className="flex items-center gap-[16px] mb-5 md:mb-8 relative z-20">
          {clientStoriesData.stories.map((_, i) => (
            <motion.button
            variants={moveUp(i * 0.11)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex flex-1 items-center h-[12px] bg-transparent border-none outline-none p-0 m-0 cursor-pointer"
            >
              <span className="relative block w-full h-[2px] bg-white/30">
                {i === activeIndex && (
                  <span className="absolute inset-0 flex items-center">
                    <motion.span
                      key={progressKey}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: SLIDE_DELAY / 1000,
                        ease: "linear",
                      }}
                      className="block h-[4px] bg-white flex-shrink-0"
                    />
                  </span>
                )}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Pagination pill — left aligned */}
        <motion.div
        variants={moveUp(0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-10 md:mb-12">
          <div className="rounded-full border flex justify-center items-center font-[300] border-white w-[78px] h-[31px]">
            <span className="font-poppins text-15 leading-[1.66] text-white">
              <span className="font-[600]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/{String(total).padStart(2, "0")}</span>
            </span>
          </div>
        </motion.div>

        {/* Invisible Swiper — handles drag only, no autoplay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 z-10 cursor-grab pointer-events-none"
          style={{ pointerEvents: "auto" }}
        >
          <Swiper
            loop={true}
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            speed={600}
            allowTouchMove={true}
            style={{ width: "100%", height: "100%" }}
          >
            {clientStoriesData.stories.map((story: ClientStory) => (
              <SwiperSlide key={story.key}>
                <div className="w-full h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Quote / description */}
        <div className="overflow-hidden mb-14 md:mb-15 h-[120px] md:h-[165px] max-w-[400px] md:max-w-[700px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`mobile-quote-${activeIndex}`}
              variants={moveUp(0)}
              initial="hidden"
              animate="show"
              exit={{
                opacity: 0,
                y: -24,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              className="text-white text-30 md:text-55 leading-[1.33] -tracking-[2%] font-poppins font-[300]"
            >
              {activeStory.quote}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Author row: name + designation left, close quote right */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`mobile-author-${activeIndex}`}
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              exit={{
                opacity: 0,
                y: -16,
                transition: { duration: 0.18, ease: "easeIn" },
              }}
              className="flex items-end justify-between gap-4"
            >
              <div className="flex flex-col gap-[6px] font-[300] text-white font-poppins -tracking-[2%]">
                <p className="text-25 leading-[1.33]">{activeStory.name}</p>
                <p className="text-19 leading-[1.52]">
                  {activeStory.company} – {activeStory.designation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Close quote */}
        <div className="flex-shrink-0 pr-10 absolute bottom-[10%] right-0 overflow-hidden">
          <motion.div
          variants={moveLeft(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          >
            <Image
              src="/assets/images/home/client-stories/quote-close.svg"
              alt="quote close"
              width={56}
              height={112}
              className="opacity-10 w-[45px] h-[90px] object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
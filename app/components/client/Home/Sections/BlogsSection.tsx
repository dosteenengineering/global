"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { blogsData, BlogPost } from "../data";
import NavButton from "@/app/components/common/NavigationButton";
import SecondaryNoise from "@/app/components/common/SecondaryNoise";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "@/app/components/motionVariants";

const SLIDE_GAP = 80;

export default function BlogsSection() {
  // ── Desktop swiper ──
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [swiperHeight, setSwiperHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftInset = useGetContainerSpacing(containerRef);

  // ── Mobile swiper ──
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  const handleSwiper = useCallback((s: SwiperType) => {
    swiperRef.current = s;
  }, []);
  const slidePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const slideNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const mobileSlidePrev = useCallback(
    () => mobileSwiperRef.current?.slidePrev(),
    [],
  );
  const mobileSlideNext = useCallback(
    () => mobileSwiperRef.current?.slideNext(),
    [],
  );

  useEffect(() => {
    if (!slideRef.current) return;
    const measure = () => {
      if (slideRef.current)
        setSwiperHeight(slideRef.current.offsetHeight * 2 + SLIDE_GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="w-full relative overflow-hidden">
      <SecondaryNoise />

      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative container py-140 3xl:py-150">
        <div className="grid grid-cols-[auto_1fr]">
          {/* Row 1 */}
          <div />

          {/* Row 1 */}
          <SectionTitle
          title={blogsData.title}
          className="text-secondary font-helvetica font-bold uppercase section-font-size leading-[1.111] mb-12 2xl:mb-14 3x:mb-[70px]"
          />

          {/* Row 2 */}
          <div className="flex flex-col gap-[15px] items-start px-90 3xl:px-[112px]">
            <motion.div variants={moveRight(0.2)} initial="hidden" whileInView="show" viewport={{once: true}}>
              <NavButton
                onClick={slidePrev}
                direction="up"
                disabled={false}
                ariaLabel="Previous blog"
              />
            </motion.div>
            <motion.div variants={moveRight(0.35)} initial="hidden" whileInView="show" viewport={{once: true}}>
            <NavButton
              onClick={slideNext}
              direction="down"
              disabled={false}
              ariaLabel="Next blog"
            />
            </motion.div>
          </div>

          {/* Row 2 */}
          <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{once: true}}
            className="overflow-hidden"
            style={{ height: swiperHeight || "auto" }}
          >
            <Swiper
              direction="vertical"
              loop={true}
              modules={[Autoplay]}
              onSwiper={handleSwiper}
              slidesPerView="auto"
              spaceBetween={SLIDE_GAP}
              speed={700}
              allowTouchMove={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              style={{ height: "100%" }}
            >
              {blogsData.posts.map((post: BlogPost, i: number) => (
                <SwiperSlide key={post.key} style={{ height: "auto" }}>
                  {/* Divider line sits in the gap above this slide (hidden on first) */}
                  <div
                    className="absolute left-0 right-0 border-t border-[#CCCCCC] group"
                    style={{ top: -(SLIDE_GAP / 2) }}
                  />
                  <Link
                    ref={
                      i === 0
                        ? (slideRef as React.Ref<HTMLAnchorElement>)
                        : undefined
                    }
                    href={post.href}
                    className="flex flex-row items-stretch gap-[62px] group"
                  >
                    {/* Image — no padding, aligns flush to top */}
                    <div className="flex-shrink-0 relative w-[350px] h-[220px] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.06] transition-transform duration-450"
                      />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 flex flex-col justify-between py-5">
                      <p className="text-30 text-paragraph font-[300] font-poppins -tracking-[2%] leading-[1.33] max-w-[537px] group-hover:text-secondary transition-colors duration-300">
                        {post.title}
                      </p>
                      <div className="flex items-center justify-between gap-5 text-paragraph font-poppins font-[300] text-19 leading-[1.52] max-w-[537px]">
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 self-start w-[60px] h-[50px] pt-2">
                      <Image
                        src="/assets/icons/button-arrow-top-right.svg"
                        alt="arrow"
                        width={32}
                        height={32}
                        className="w-[28px] h-[28px] 3xl:w-[32px] 3xl:h-[32px] group-hover:rotate-45 transition-all duration-300 shrink-0"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative py-140">
        <div
          ref={containerRef}
          className="container flex items-center justify-between mb-10 md:mb-12"
        >
          <h2
            className="text-secondary font-helvetica font-bold uppercase section-font-size leading-[1.111] w-full"
          >
            {blogsData.title}
          </h2>
          {/* Nav buttons — left aligned */}
          <div className="flex items-center gap-[15px]">
            <NavButton
              onClick={mobileSlidePrev}
              direction="left"
              disabled={false}
              ariaLabel="Previous blog"
            />
            <NavButton
              onClick={mobileSlideNext}
              direction="right"
              disabled={false}
              ariaLabel="Next blog"
            />
          </div>
        </div>

        {/* Horizontal swiper */}
        <div style={{ paddingLeft: leftInset }}>
          <Swiper
            loop={true}
            modules={[Autoplay]}
            onSwiper={(s) => {
              mobileSwiperRef.current = s;
            }}
            slidesPerView={1.2}
            breakpoints={{
              500: { slidesPerView: 1.4 },
              680: { slidesPerView: 1.75 },
            }}
            spaceBetween={16}
            speed={600}
            allowTouchMove={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            className="w-full"
          >
            {blogsData.posts.map((post: BlogPost) => (
              <SwiperSlide key={post.key}>
                <Link href={post.href} className="block group">
                  {/* Image with arrow inside top-right */}
                  <div className="relative w-full h-[220px] overflow-hidden mb-3">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    {/* Arrow — top-right inside image */}
                    <div className="absolute top-4 right-4 z-10">
                      <Image
                        src="/assets/icons/button-arrow-top-right.svg"
                        alt="arrow"
                        width={28}
                        height={28}
                        className="w-[28px] h-[28px] group-hover:rotate-45 transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* Title */}
                  <p className="text-25 text-paragraph font-[300] font-poppins -tracking-[2%] leading-[1.33] mb-5">
                    {post.title}
                  </p>
                  {/* Category left, date right */}
                  <div className="flex items-center justify-between gap-4 text-paragraph font-poppins font-[300] text-19 leading-[1.52]">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

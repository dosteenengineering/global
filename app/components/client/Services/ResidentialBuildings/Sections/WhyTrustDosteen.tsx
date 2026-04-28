"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { whyTrustData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

const cardGradient = `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), linear-gradient(180deg, rgba(41,69,150,0) 0%, rgba(41,69,150,0.3) 100%)`;

interface StatCard {
  id: number;
  value: string;
  title: string;
  image: string;
}

function StatCard({ card }: { card: StatCard }) {
  return (
    <div className="relative h-[514px] overflow-hidden cursor-pointer group">
      {/* Image */}
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: cardGradient }} />

      {/* Text — bottom left */}
      <div className="absolute bottom-0 left-0 p-30 z-10">
        <div className="flex items-start mb-[5px]">
          <span className="text-55 font-light text-white leading-[1.1818] tracking-[-0.02em]">
            {card.value.replace("+", "")}
          </span>
          {card.value.includes("+") && (
            <span className="text-[33px] leading-none relative 2xl:top-[3px] 3xl:top-[5px] text-white font-light font-poppins">
              +
            </span>
          )}
        </div>
        <p className="text-white text-description">
          {card.title}
        </p>
      </div>
    </div>
  );
}

export default function WhyTrustDosteen() {
  const { title, stats } = whyTrustData;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);

  return (
    <section className="w-full bg-white pt-140 3xl:pt-200">
      <div className="container">
        <div className="border-b-2 border-[#c2c2c2] pb-140 3xl:pb-150">
          {/* Title */}
          <SectionTitle
            title={title}
            className="mb-50 section-heading text-secondary max-w-[24ch]"
          />
          {/* Swiper */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              const total = swiper.slides.length;
              const perView = Math.round(swiper.params.slidesPerView as number);
              const dots = Math.max(0, total - perView + 1);
              setDotCount(dots);
              setShowDots(dots > 1);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onBreakpoint={(swiper) => {
              const total = swiper.slides.length;
              const perView = Math.round(swiper.params.slidesPerView as number);
              const dots = Math.max(0, total - perView + 1);
              setDotCount(dots);
              setShowDots(dots > 1);
            }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
              1792: { slidesPerView: 5 },
            }}
            className="w-full"
          >
            {stats.map((card) => (
              <SwiperSlide key={card.id}>
                <StatCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Pagination dots — only when not all cards visible */}
          {showDots && (
            <div className="flex items-center justify-center gap-[10px] mt-40">
              {Array.from({ length: dotCount }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-[10px] h-[10px] rounded-full border border-secondary cursor-pointer transition-all duration-300 ${
                    i === activeIndex ? "bg-secondary" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

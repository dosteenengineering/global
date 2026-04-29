"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";

interface SolutionSliderProps {
  images: string[];
}

export default function SolutionSlider({ images }: SolutionSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={images.length > 2}
        speed={800}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 30 },
        }}
        className="w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="overflow-hidden w-full relative h-[480px] 3xl:h-[680px]">
              <Image
                src={src}
                alt={`Solution image ${i + 1}`}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
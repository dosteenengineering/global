"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { Project } from "../data";

import "swiper/css";
import "swiper/css/effect-fade";
import NavButton from "@/app/components/common/NavigationButton";

export default function ProjectImageSlider({ project }: { project: Project }) {

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full h-[600px] 3xl:h-[740px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={project.images.length > 1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full"
      >
        {project.images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={i === 0 ? project.title : `${project.title} image ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {project.images.length > 1 && (
        <div className="absolute top-1/2 -translate-y-1/2 z-20 flex w-full justify-between px-30">
          <NavButton
            borderColor="border-white/20"
            bgColor="bg-white/50"
            hoverBgColor="bg-primary"
            direction="left"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <NavButton
            borderColor="border-white/20"
            bgColor="bg-white/50"
            hoverBgColor="bg-primary"
            direction="right"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      )}
    </div>
  );
}

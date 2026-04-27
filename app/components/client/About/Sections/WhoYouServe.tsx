"use client";
import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { WhoWeServeData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

function ServeCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col group">
      {/* Icon row */}
      <div className="pb-40 relative">
        {/* Base line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#c2c2c2]" />

        {/* Animated line */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

        {/* Icon */}
        <div className="w-15 h-15 relative">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
      </div>

      {/* Label */}
      <p className="text-25 md:text-30 font-light text-secondary leading-[1.333] tracking-[-0.02em] mt-30">
        {label}
      </p>
    </div>
  );
}

export default function WhoYouServe() {
  return (
    <section className="relative w-full select-none py-140 3xl:py-150">
      <SecondaryNoise />
      <div className="container w-full">
        <SectionTitle
          text={WhoWeServeData.title}
          className="section-heading text-secondary uppercase mb-80"
        />

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1550: {
              slidesPerView: 5,
            },
          }}
          className="w-full [&_.swiper-slide]:3xl:!w-[320px]"
        >
          {WhoWeServeData.items.map((item) => (
            <SwiperSlide key={item.id}>
              <ServeCard icon={item.icon} label={item.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

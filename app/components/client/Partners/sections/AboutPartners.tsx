"use client";
import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { aboutPartners } from "../data";

export default function AboutPartners() {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute -top-88 lg:-top-71 left-[-4.8%] pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain 2xl:w-[500px] 3xl:w-[600px] rotate-8"
        />
      </div>

      <div className="lg:pl-[17%] 3xl:pl-[23.1%] pt-120 px-[20px] lg:px-0 container w-full">
        <SectionTitle
          text={aboutPartners.title}
          className="text-secondary font-light text-30 leading-[1.33] -tracking-[0.02em] mb-40 max-w-[1207px]"
        />

        <div
          className="text-paragraph text-description max-w-[1252px]"
          dangerouslySetInnerHTML={{ __html: aboutPartners.description }}
        />
      </div>
    </section>
  );
}

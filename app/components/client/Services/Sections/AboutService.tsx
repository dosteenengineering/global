"use client";

import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { aboutServicesData } from "../data";

export default function AboutDetails() {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute top-[-10.5%] left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain 2xl:w-[430px] 3xl:w-[600px]"
        />
      </div>

      <div className="pt-120 px-[15px] lg:px-0 container w-full">
        <SectionTitle
          text={aboutServicesData.title}
          className="section-heading text-secondary uppercase mb-80 max-w-[1538px]"
        />

        <div className="w-full pl-[24.3%]">
            <div
              className="text-paragraph text-description max-w-[1110px]"
              dangerouslySetInnerHTML={{ __html: aboutServicesData.description }}
            />
        </div>
      </div>
    </section>
  );
}

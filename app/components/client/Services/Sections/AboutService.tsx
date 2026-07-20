"use client";

import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { IndustriesPageData } from "../data";

export default function AboutDetails({data}:{data:IndustriesPageData['secondSection']}) {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute -top-43 md:top-0 xl:top-[-8%] 2xl:top-[-5%] 3xl:top-[-10.5%]  left-[-131px] md:left-[-20%] xl:left-[-24.5%] 3xl:left-[-24.5%] pointer-events-none  ">
        <Image src="/assets/shapes/shape-1a.svg" alt="decorative lines" 
        width={1000} height={1000} className="object-contain w-[280px] md:h-[400px] md:w-auto xl:h-[700px] xl:w-auto 2xl:h-[750px] 2xl:w-auto 3xl:w-auto 3xl:h-auto" />
      </div>

      <div className="pt-[70px] md:pt-120 px-[15px]  container w-full">
        <SectionTitle text={data.title} className="section-heading-90 text-secondary uppercase mb-5 md:mb-5 lg:mb-80 max-w-[33ch]" />

        {/* <div className="w-full lg:pl-[24.3%]"> */}
        <div className="w-fit lg:pl-[24.3%] ml-auto 3xl:mr-[141px]">
          <SectionDescription text={data.description} className="text-paragraph text-description max-w-[1110px]" as="div" />
        </div>
      </div>
    </section>
  );
}

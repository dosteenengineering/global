"use client";
import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { AboutBimData } from "../data";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";

export default function AboutBim() {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute -top-88 lg:-top-61 left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain 2xl:w-[500px] 3xl:w-[600px]"
        />
      </div>

      <div className="lg:pl-[15.3%] 3xl:pl-[21.3%] pt-120 px-[15px] lg:px-0 container w-full">
        <SectionTitle
          text={AboutBimData.title}
          className="section-heading text-secondary uppercase mb-50"
        />

        <div
          className="text-paragraph text-description mb-100"
          dangerouslySetInnerHTML={{ __html: AboutBimData.description }}
        />

        <div className="px-70 pb-70 pt-60 relative">
          <StatNoise1 />
          <div className="flex flex-col gap-y-40">
            <h2 className="text-55 leading-[1.18181] tracking-[-0.02em] text-secondary font-light">
              {AboutBimData.subTitle}
            </h2>
            <div
              className="text-30 leading-[1.33] tracking-[-0.02em] text-secondary max-w-[1112px] font-light"
              dangerouslySetInnerHTML={{
                __html: AboutBimData.subDescription,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

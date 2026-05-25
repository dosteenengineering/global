"use client";
import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { AboutBimData } from "../data";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

export default function AboutBim() {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute w-[436px] lg:w-full top-[-24%] lg:-top-61 left-[-21%] lg:left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[250px] 2xl:w-[500px] 3xl:w-[600px]"
        />
      </div>

      <div className="lg:pl-[15.3%] 3xl:pl-[21.3%] pt-12.5 md:pt-120 px-[15px] lg:px-0 container w-full">
        <SectionTitle
          text={AboutBimData.title}
          className="section-heading text-secondary uppercase mb-50"
        />

        <SectionDescription
          as="div"
          dangerouslySetInnerHTML={{
            __html: AboutBimData.description.join("<br /><br />"),
          }}
          className="text-paragraph text-description mb-7.5 md:mb-100 max-w-[105ch]"
        />

        <div className="px-5 md:px-70 py-7.5 md:pb-70 md:pt-60 relative">
          <StatNoise1 />
          <div className="flex flex-col gap-y-2.5 md:gap-y-40">
     
            <SectionTitle
              as="h2"
              text={AboutBimData.subTitle}
              className="text-55 leading-[1.18181] tracking-[-0.02em] text-secondary font-light max-w-full"
            />
            {/* <div
              className="text-30 leading-[1.33] tracking-[-0.02em] text-paragraph max-w-[1112px] font-light"
              dangerouslySetInnerHTML={{
                __html: AboutBimData.subDescription,
              }}
            /> */}
            <SectionDescription
              as="p"
              dangerouslySetInnerHTML={{
                __html: AboutBimData.subDescription,
              }}
              className="!text-30 leading-[1.33] tracking-[-0.02em] text-paragraph max-w-[1112px] font-light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

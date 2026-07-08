"use client";
import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { AboutBimData, Capability } from "../data";
import StatNoise5 from "@/app/components/common/noise/StatNoise5";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

export default function AboutBim({ secondSection, thirdSection }: { secondSection: Capability['secondSection'], thirdSection: Capability['thirdSection'] }) {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      {/* <div className="absolute w-[436px] lg:w-full top-[-24%] lg:-top-61 3xl:top-0 left-[-21%] lg:left-0 3xl:left-[10%] pointer-events-none">
        <Image
          src="/assets/shapes/shape-1a.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[250px] 2xl:w-[500px] 3xl:w-[600px]"
        />
      </div> */}
      <div className="absolute -top-10 lg:-top-[-10%] lg:top-[-5%] lg:left-[-15%] xl:top-[-7.5%] 3xl:top-[-9%] left-[-131px] lg:left-[-3%] xl:left-[-20%] 3xl:left-[-19.1%] pointer-events-none">
        <Image src="/assets/icons/bg-svg/top-left-about-1.svg" alt="decorative lines" width={897} height={896} 
        className="object-contain w-[280px] lg:w-[400px] xl:h-auto xl:w-[650px] 3xl:w-[897px] 3xl:h-[896px] 3xl:scale-120" />
      </div>
      <div className="container w-full">
        <div className="ml-auto lg:max-w-[85%] xl:max-w-[80%] 3xl:max-w-[1252px] pt-12.5 md:pt-120">
          <SectionTitle text={secondSection.title} className="section-heading-90 text-secondary uppercase mb-50 max-w-[18ch]" />
          <SectionDescription as="div" dangerouslySetInnerHTML={{ __html: secondSection.description }} className="text-paragraph text-description mb-7.5 md:mb-100 max-w-[106.7ch]" />
          <div className="px-5 md:px-70 py-7.5 md:pb-70 md:pt-60 relative">
            <StatNoise5 />
            <div className="flex flex-col gap-y-2.5 md:gap-y-40">

              <SectionTitle
                text={thirdSection.title}
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
                  __html: thirdSection.description,
                }}
                className="!text-30 !leading-[1.33] tracking-[-0.02em] text-paragraph max-w-[1112px] font-light"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

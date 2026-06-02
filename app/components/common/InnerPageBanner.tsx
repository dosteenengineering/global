"use client";

import Image from "next/image";
import BannerNoise from "./noise/BannerNoise";
import { motion } from "framer-motion";
import { useParallax } from "./animations/useParallax";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "./animations/SectionDescription";
interface InnerPageBannerProps {
  title: string;
  titleMaxWidth?: string;
  description?: string;
  descriptionMaxWidth?: string;
  image?: string;
  imageAlt?: string;
  publishedDate?: string;
}

export default function InnerPageBanner({
  title,
  titleMaxWidth = "",
  description,
  descriptionMaxWidth = "",
  image,
  imageAlt = "Banner image",
  publishedDate,
}: InnerPageBannerProps) {
  const { ref, parallaxY } = useParallax(10);
  return (
    <div className="w-full">
      {/* 1. Gradient block — standalone, no content */}
      <div className="w-full h-[154px] lg:h-[250px] 3xl:h-[286px] relative">
        <BannerNoise />
      </div>

      {/* 2. Content — line, title, description */}
      <div className="container">
        <div className="w-full mb-[70px] xl:mb-80 3xl:mb-[65px]">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="h-px w-full bg-[#c2c2c2] origin-center" />
        </div>

        {/* <h1 className={`text-secondary ${description ? "mb-[20px] md:mb-30" : "mb-0"} hero-heading leading-[100%] ${titleMaxWidth}`}>
          {title}
        </h1> */}
        
        <SectionTitle text={title} className={`text-secondary ${description ? "mb-[20px] md:!mb-40 3xl:!mb-[45px]" : "mb-0"} hero-heading !leading-[100%] ${titleMaxWidth}`} />
        {description && (
          // <p className={`text-secondary mb-[50px] md:mb-120  text-30 tracking-[-0.02em] leading-[1.333] font-light ${descriptionMaxWidth}`}>
          //   {description}
          // </p>
          <SectionDescription text={description} className={`${descriptionMaxWidth} text-secondary mb-[50px] md:mb-120  text-30 tracking-[-0.02em] leading-[2.333]  md:leading-[1.333] font-light !text-30 `}/>
        )}
      </div>

      {
        publishedDate && (
         <div className="container pt-50 3xl:pt-[65px]">
            <h4 className={`text-paragraph font-light w-fit text-19 mb-10 xl:mb-[33px] tracking-[-0.02em]`}>Published &nbsp;&nbsp;<span className="font-bold">{publishedDate}</span></h4>
         </div>
        )
      }
      {/* 3. Image */}
      {image && (
        <div ref={ref} className="relative w-full h-[224px] md:h-[450px] xl:h-[650px] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center-top lg:object-top-left"
            style={{
              transform: `scale(${1.05}) translateY(${parallaxY}vh)`,
            }}
            priority
          />
        </div>
      )}
    </div>
  );
}

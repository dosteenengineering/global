"use client";
import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "./animations/SectionTitle";
import { SectionDescription } from "./animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";
import { useState, useEffect } from "react";

const getActionHref = (link: string) => {
  const trimmedLink = link.trim();

  if (trimmedLink.startsWith("tel:")) {
    return trimmedLink;
  }

  const isPhoneNumber = /^\+?[\d\s().-]+$/.test(trimmedLink);

  if (!isPhoneNumber) {
    return trimmedLink;
  }

  return `tel:${trimmedLink.replace(/[^\d+]/g, "")}`;
};

export default function CtaSection({ title, titleWidth, description, descriptionWidth, items }: { title: string, titleWidth?: string, description: string, descriptionWidth?: string, items: { buttonText: string, buttonLink: string }[] }) {



  return (
    <section className="relative w-full select-none overflow-hidden">
      <PrimaryNoise2 />

      {/* Decorative lines — right side */}
      <div className="absolute z-10 right-[-9%] top-[24%] md:right-0 md:top-[49%] -translate-y-1/2 w-[52%] h-[327px] md:w-[42%] md:h-[90%] pointer-events-none">
        <Image src="/assets/images/about/cta/bg-right.svg" alt="" fill className="object-contain object-right" />
      </div>

      <div className="relative z-10 container py-12.5 md:py-140   3xl:py-150 w-full">
        {/* Title */}
        {/* <h2 className={`section-heading text-white uppercase whitespace-pre-line mb-5 md:mb-20 3xl:mb-[26px] ${titleWidth}`}>
          {title}
        </h2> */}
        <SectionTitle text={title} className={`section-heading-90 text-white uppercase whitespace-pre-line mb-5 md:mb-20 2xl:mb-[26px] 3xl:mb-[26px] 
          ${titleWidth}`} />

        {/* Divider */}
        <div className="w-full border-t border-bdr-blue mb-[30px] md:mb-80 3xl:mb-100" />

        {/* Description */}
        {/* <p className={`text-white text-30 leading-[1.333] font-light tracking-[-0.02em] mb-[30px] md:mb-50 ${descriptionWidth}`}>
          {description}
        </p> */}
        <SectionDescription text={description} className={`max-w-[70ch] text-white !text-30 !leading-[1.333] !font-light tracking-[-0.02em] mb-[30px] md:mb-50 ${descriptionWidth}`} />
        {/* Buttons */}
        <div className="flex flex-wrap gap-5 md:gap-[10px]">
          {items.map((btn, index) => (
            <motion.div variants={moveUp(0.2 * index)} initial="hidden" whileInView="show" key={index}
              viewport={{ once: true, amount: 0.4 }}>
              {/* <BorderButton key={btn.buttonText} text={btn.buttonText} iconColor="white" px="px-[24px] md:px-30 3xl:px-[35px]" href={btn.buttonLink} hoverBg="white" className="w-fit" /> */}
              <BorderButton key={btn.buttonText} text={btn.buttonText} iconColor="white" px="px-[24px] md:px-30 3xl:px-[35px]" href={getActionHref(btn.buttonLink)} hoverBg="white" className="w-fit" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
"use client";

import { useState } from "react";
import Image from "next/image";
import { whoBenefitsSection, BenefitItem, Capability } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { AboutPageData } from "../../About/data";


type BenefitsProps = {
  data: {
    title: string;
    description?: string;
    items: {
      _id: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }[];
  };
  showSecondaryNoise?: boolean;
};

function AccordionItem({
  item,
  isActive,
  onSelect,
  delay,
}: {
  item: AboutPageData['sixthSection']['items'][0];
  isActive: boolean;
  onSelect: () => void;
  delay: number;
}) {
  return (
    <motion.div
      variants={moveUp(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex cursor-pointer gap-0 group ${isActive ? "py-5 lg:py-7 xl:py-50" : "py-5 lg:py-7 xl:py-40"}`}
      onClick={onSelect}
    >
      <div
        className={`relative ${isActive ? "w-[3px] mr-40" : ""} shrink-0 transition-all duration-300 ease-in-out hidden lg:block`}
      >
        <div
          className={`absolute left-0 top-0 w-full bg-primary transition-all duration-500 ease-in-out ${isActive ? "h-full" : "h-0"
            }`}
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-1 justify-between">
          <p className={`text-30  leading-[1.333] tracking-[-0.02em] transition-all duration-300 ${isActive ? "font-[500] lg:font-light" : "font-light"}`}>
            {item.title}
          </p>

          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`lg:hidden transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
            <path d="M16.5999 7.45825L11.1666 12.8916C10.5249 13.5333 9.4749 13.5333 8.83324 12.8916L3.3999 7.45825" stroke="#161616" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>


        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "opacity-100 mt-2.5 md:mt-20" : "max-h-0 opacity-0"
            }`}
        >
          <p className="text-paragraph text-19 leading-[1.67] lg:leading-[1.53] font-light max-w-[calc(100%-20px)] lg:max-w-[59ch] tracking-[-2%]">
            {item.description}
          </p>

          {/* Mobile image — shown below description, hidden on lg+ */}
          <div className="block lg:hidden mt-[5px] md:mt-5 relative w-full aspect-[12.1/6] lg:aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Benefits({
  data,
  showSecondaryNoise = true,
}: BenefitsProps) {
  // const { title, description, items } = data;
  const title = data?.title
  const description = data?.description
  const items = data?.items || []
  const [activeId, setActiveId] = useState<string>(
    items[1]?._id ?? items[0]?._id ?? ""
  );
  // const [titleParts] = useState<string[]>(title.split('\n')); 

  return (
    <section className="relative w-full py-12.5  md:py-140 3xl:py-200">
      {showSecondaryNoise && <SecondaryNoise />}
      <div className="container relative">
        <SectionTitle className={`section-heading-90 max-w-[70ch] whitespace-pre-line mb-5 lg:mb-50 `}
          title={title} as="h2" />
        {description && (
          <>
            {/* <p className="text-19 leading-[1.3333333333] text-paragraph max-w-[130ch] font-light mb-80">
              {description}
            </p> */}
            <SectionDescription text={description} className="text-19 leading-[1.3333333333] text-paragraph max-w-[130ch] font-light mb-80" />
          </>
        )}

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[624px_auto] gap-80 3xl:gap-[89px] items-start ${description ? "" : "mt-7.5 md:mt-50"
            }`}
        >
          <div className="  shrink-0 xl:mt-[10px] border-t lg:border-0 border-bdr-gray">
            <div className="flex flex-col divide-y divide-[#c2c2c2]">
              {items.map((item, index) => (
                <AccordionItem
                  key={item._id}
                  item={item}
                  isActive={activeId === item._id}
                  onSelect={() => setActiveId(item._id)}
                  delay={index * 0.12}
                />
              ))}
            </div>
          </div>

          <motion.div variants={moveUp(0.3)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="hidden lg:flex flex-1 min-w-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-[3/3] 3xl:aspect-[4/3] max-h-[650px] lg:max-h-full 3xl:max-h-[650px] overflow-hidden">
              {items.map((item) => (
                <div
                  key={item._id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeId === item._id ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <Image src={item.image} alt={item.imageAlt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

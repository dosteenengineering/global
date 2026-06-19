"use client";
import { useState } from "react";
import Image from "next/image";
import {IndustriesPageData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

export default function IndustriesWeServe({data}:{data:IndustriesPageData['thirdSection']}) {

  const [activeId, setActiveId] = useState(1);
  // Mobile accordion: track which item is open (null = all closed) 
  const [openId, setOpenId] = useState<number | null>(1);
  const active = data.items.find((i,idx) => idx === activeId)!;

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <section className="relative w-full select-none overflow-hidden">
      <PrimaryNoise2 />

      {/* Decorative lines */}
      <div className="absolute z-30 left-0 2xl:left-[-8%] 3xl:left-0  bottom-[-36%] 2xl:bottom-[-41%] 3xl:bottom-[-39%] w-[420px] h-full pointer-events-none">
        <Image src="/assets/images/services/bg-lines.svg" alt="" fill className="object-contain object-left hidden lg:block" />
      </div>

      <div className="container py-12.5 md:py-140 3xl:py-150 w-full z-20">
        {/* Title */}
        <SectionTitle text={data.title} className="section-heading-90 text-white uppercase mb-7.5 md:mb-30 xl:mb-30 " />

        {/* Divider */}
        <div className="relative z-10 w-full h-px bg-[#76A7FF] mb-80 3xl:mb-80 hidden lg:block" />

        {/* Body: left list + right detail */}
        <div className="flex flex-col lg:flex-row gap-150  3xl:gap-[206px]">
          {/* ── MOBILE: Accordion ── */}
          <div className="flex flex-col lg:hidden w-full">
            {data.items.map((item,idx) => {
              const isOpen = idx === openId;
              const detail = data.items.find((i,index) => index === idx)!;

              return (
                <div key={idx} className="relative first:border-t border-b border-bdr-blue py-5">
                  {/* Accordion header */}
                  <button type="button" onClick={() => toggleAccordion(idx)} className={` group relative flex items-center justify-between text-left w-full transition-all duration-300 cursor-pointer`} >
                    {/* Hover bg */}
                    {!isOpen && (
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50.96%, rgba(255,255,255,0) 100%)",
                        }}
                      />
                    )}

                    <span className={`relative z-10 text-[18px] leading-[1.55] tracking-[-0.02em] transition-all duration-300 ${isOpen ? "text-white font-medium" : "text-white font-light"}`}>
                      {item.title}
                    </span>

                    {/* Chevron icon */}
                    <span className={`relative z-10 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6 7.45825L11.1667 12.8916C10.525 13.5333 9.47502 13.5333 8.83336 12.8916L3.40002 7.45825" stroke="white" stroke-width="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {/* Accordion body */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col z-10 text-white pt-5">
                      <p className="text-description text-white mb-30">{detail.description}</p>
                      <div className="relative w-full h-[269px] mb-30">
                        <Image src={detail.image} alt={detail.title} fill className="object-cover transition-all duration-500" />
                      </div>
                      <BorderButton text={"Read More"} iconColor="white" px="px-[23px] md:px-30" href={detail.buttonLink} hoverBg="white" className="w-fit" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── DESKTOP: Original side-by-side layout ── */}
          {/* Left — industry list */}
          <div className="shrink-0 hidden lg:flex flex-col w-[334px] relative border-t border-bdr-blue ">
            {data.items.map((item, index) => {
              const isActive = index === activeId;
              return (
                <motion.div variants={moveUp(0.1 * index)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeInOut" }}>
                  <button
                    type="button"
                    key={index}
                    onClick={() => setActiveId(index)}
                    className={`group relative flex items-center justify-between text-left w-full   border-b border-bdr-blue transition-all duration-300 cursor-pointer ${isActive ? "px-20" : ""
                      }`}
                    style={
                      isActive
                        ? {
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50.96%, rgba(255,255,255,0) 100%)",
                        }
                        : {}
                    }
                  >
                    {/* Hover bg */}
                    {!isActive && (
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50.96%, rgba(255,255,255,0) 100%)",
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 text-19 leading-[2.5263] tracking-[-0.02em] transition-all duration-300 ${isActive
                        ? "text-white font-medium"
                        : "text-white font-light"
                        }`}
                    >
                      {item.title}
                    </span>

                    {/* Arrow — only visible on active or hover */}
                    <span
                      className={`relative z-10 shrink-0 transition-all duration-300 ${isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-50"
                        }`}
                    >
                      <Image src="/assets/icons/arrow-right.svg" alt="Arrow Right" width={50} height={40} className="object-contain w-[26px] h-[17px]" />
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right — active industry detail */}
          <motion.div
            key={activeId}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 hidden lg:flex flex-col z-10 text-white"
          >
            <motion.h2
              variants={moveUp(0.1)}
              className="text-55 leading-[1.1818] mb-30 font-light tracking-[-0.02em]"
            >
              {active.title}
            </motion.h2>
            <motion.p
              variants={moveUp(0.2)}
              className="text-description text-white mb-50"
            >
              {active.description}
            </motion.p>

            {/* Image */}
            <motion.div
              variants={moveUp(0.3)}
              className="relative w-full h-[482px] mb-50"
            >
              <Image src={active.image} alt={active.title} fill className="object-cover transition-all duration-500" />
            </motion.div>

            <motion.div variants={moveUp(0.4)}>
              <BorderButton text={"Read More"} iconColor="white" px="px-30 3xl:px-[35px]" href={active.buttonLink} hoverBg="white" className="w-fit" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

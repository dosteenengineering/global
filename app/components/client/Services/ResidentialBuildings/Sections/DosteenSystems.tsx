"use client";

import { useState } from "react";
import Image from "next/image";
import { dosteenSystemsData } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "@/app/components/motionVariants";

const activeGradient =
  "linear-gradient(90deg, rgba(41, 69, 150, 0.2) 0%, rgba(41, 69, 150, 0) 100%)";

export default function DosteenSystems() {
  const { title, systems } = dosteenSystemsData;
  const [activeId, setActiveId] = useState(systems[0].id);

  const activeSystem = systems.find((s) => s.id === activeId)!;

  return (
    <section className="w-full bg-white relative py-140 3xl:py-150">
      <SecondaryNoise />
      <div className="container">
        {/* Title */}
        <SectionTitle title={title} delay={0.2} className="section-heading text-secondary uppercase mb-50" />
        {/* Two col layout */}
        <div className="flex gap-60 3xl:gap-[68px]">
          {/* Left col — 46.85% width, full-height border-right */}
          <div className="shrink-0 border-r-2 border-[#c2c2c2] self-stretch relative" style={{ width: "47%" }} >
            {systems.map((system,index) => {
              const isActive = system.id === activeId;
              return (
                <div
                  key={system.id}
                  onClick={() => setActiveId(system.id)}
                  className={`relative flex items-center gap-20 cursor-pointer border-t-2 border-[#c2c2c2] last:border-b-2 group transition-all duration-300 ${isActive ? "pl-20" : ""}`}
                  style={{
                    background: isActive ? activeGradient : "transparent",
                  }}
                >
                  <motion.span variants={moveRight(0.6+index*0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className={`py-30 3xl:py-[31px] text-secondary text-30 leading-[1.333] font-light tracking-[-0.02em] transition-colors duration-300 max-w-[35ch]`}
                  >
                    {system.title}
                  </motion.span>

                  {/* Arrow — visible on active or hover */}
                  <div
                    className={`shrink-0 transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {/* Primary circle with arrow icon */}
                    <div className="w-[51px] h-[51px] rounded-full bg-primary flex items-center justify-center">
                      <Image src="/assets/icons/arrow-right-white-small.svg" alt="arrow" width={20} height={20} className="object-contain invert brightness-0 w-auto h-[22px]" />
                    </div>
                  </div>

                  {/* Hover gradient — only for inactive items */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: activeGradient }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right col — remaining width */}
          <div className="flex-1 min-w-0 relative">
            <div key={activeSystem.id} className="flex flex-col h-full">
              {/* Title */}
              <motion.h3 variants={moveRight(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-secondary leading-[1.1818] font-light tracking-[-0.02em] mb-20 text-55 max-w-[21ch]">
                {activeSystem.title}
              </motion.h3>

              {/* Image */}
              <motion.div variants={moveRight(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mb-20 overflow-hidden w-full h-[441px]" >
                <Image src={activeSystem.image} alt={activeSystem.title} fill className="object-cover" />
                <div className="absolute inset-0" style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)"}} />
              </motion.div>

              {/* Description */}
              <motion.p variants={moveRight(0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-description text-paragraph leading-[1.6] mb-70 3xl:mb-[72px]">
                {activeSystem.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={moveRight(0.8)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <BorderButton
                text="View System"
                borderColor="black"
                textColor="black"
                iconColor="primary"
                hoverBg="black"
                className="w-fit"
              />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { dosteenSystemsData } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import { AnimatePresence, motion } from "framer-motion";
import { moveRight, moveUp } from "@/app/components/motionVariants";
import { useRef } from "react";

const activeGradient =
  "linear-gradient(90deg, rgba(41, 69, 150, 0.2) 0%, rgba(41, 69, 150, 0) 100%)";

export default function DosteenSystems() {
  const { title, systems } = dosteenSystemsData;
  const [activeId, setActiveId] = useState(systems[0].id);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(
    systems[0].id,
  );
  const accordionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // const [openUpward, setOpenUpward] = useState<number | null>(null);

  const activeSystem = systems.find((s) => s.id === activeId)!;

  // const toggleAccordion = (id: number) => {
  //   setOpenAccordionId((prev) => (prev === id ? null : id));
  // };

  const toggleAccordion = (id: number) => {
    const isClosing = openAccordionId === id;

    setOpenAccordionId(isClosing ? null : id);

    if (!isClosing) {
      setTimeout(() => {
        const accordion = accordionRefs.current[id];

        if (!accordion) return;

        const rect = accordion.getBoundingClientRect();

        // If the opened accordion extends below the viewport
        if (rect.bottom > window.innerHeight) {
          accordion.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 350); // same as Framer Motion duration
    }
  };

  return (
    <section className="w-full bg-white relative py-140 3xl:py-150">
      <SecondaryNoise />
      <div className="container">
        <SectionTitle
          title={title}
          className="section-heading-90 text-secondary uppercase mb-50"
        />

        {/* ── Mobile: Accordion ── */}
        <div className="md:hidden relative">
          {systems.map((system) => {
            const isOpen = openAccordionId === system.id;

            return (
              <div
                key={system.id}
                ref={(el) => {
                  accordionRefs.current[system.id] = el;
                }}
                className="border-t-2 border-[#c2c2c2] last:border-b-2"
              >
                {/* Trigger */}
                <button
                  type="button"
                  onClick={(e) => toggleAccordion(system.id)}
                  className="w-full flex justify-between gap-4 py-5 text-left transition-all duration-300"
                >
                  <span
                    className={`text-[18px] leading-[1.56] text-secondary tracking-[-0.02em] transition-all duration-300 ${
                      isOpen ? "  font-[500]" : "font-light"
                    }`}
                  >
                    {system.title}
                  </span>
                  <span
                    className={`shrink-0 flex pt-2.5 justify-center   transition-all duration-300 `}
                  >
                    {isOpen ? (
                      <svg
                        width="16"
                        height="8"
                        viewBox="0 0 16 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="object-contain rotate-180  "
                      >
                        <path
                          d="M14.2 1L8.76667 6.43333C8.125 7.075 7.075 7.075 6.43333 6.43333L1 1"
                          stroke="#161616"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="8"
                        viewBox="0 0 16 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.2 1L8.76667 6.43333C8.125 7.075 7.075 7.075 6.43333 6.43333L1 1"
                          stroke="#161616"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={system.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5">
                        <div className="relative mb-5 overflow-hidden w-full h-[225px]">
                          <Image
                            src={system.image}
                            alt={system.title}
                            fill
                            className="object-cover"
                          />

                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                            }}
                          />
                        </div>

                        <p className="text-description text-paragraph leading-[1.6] mb-30">
                          {system.description}
                        </p>

                        <BorderButton
                          text="View System"
                          borderColor="black"
                          textColor="black"
                          iconColor="primary"
                          hoverBg="black"
                          className="w-fit px-[27px]"
                          href={system.slug}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Desktop: Original two-col layout ── */}
        <div className="hidden md:flex gap-60 3xl:gap-[68px]">
          {/* Left col */}
          <div
            className="shrink-0 border-r-2 border-[#c2c2c2] self-stretch relative pb-100"
            style={{ width: "47%" }}
          >
            {systems.map((system, index) => {
              const isActive = system.id === activeId;
              return (
                <div
                  key={system.id}
                  onClick={() => setActiveId(system.id)}
                  className={`group hover:pl-2 md:pe-3 3xl:pe-0 hover:3xl:pl-20 relative flex items-center gap-20 cursor-pointer transition-all duration-300 border-t-2 first:border-t-2 hover:first:border-t-transparent  border-[#c2c2c2] last:border-b-2 group transition-all duration-300 
                    ${isActive ? "pl-2 3xl:pl-20 first:border-t-transparent" : ""}`}
                  style={{
                    background: isActive ? activeGradient : "transparent",
                  }}
                >
                  <motion.span
                    variants={moveRight(index * 0.06)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className={`py-30 3xl:py-[29px] text-secondary text-30 leading-[1.333] font-light tracking-[-0.02em] transition-colors duration-300 max-w-[35ch]`}
                  >
                    {system.title}
                  </motion.span>

                  <div
                    className={`shrink-0 transition-opacity duration-300 group-hover:opacity-100 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="w-[51px] h-[51px] rounded-full bg-primary border-1 border-[#76A7FF] flex items-center justify-center">
                      <Image
                        src="/assets/icons/arrow-right-white-small.svg"
                        alt="arrow"
                        width={20}
                        height={20}
                        className="object-contain invert brightness-0 w-auto h-[22px]"
                      />
                    </div>
                  </div>

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

          {/* Right col */}
          <div className="flex-1 min-w-0 relative">
            <div key={activeSystem.id} className="flex flex-col h-full">
              {/* Title */}
              <motion.h3
                variants={moveRight(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-secondary leading-[1.1818] font-light tracking-[-0.02em] mb-20 text-55 max-w-[21ch]"
              >
                {activeSystem.title}
              </motion.h3>

              {/* Image */}
              <motion.div
                variants={moveRight(0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative mb-20 overflow-hidden w-full h-[441px]"
              >
                <Image
                  src={activeSystem.image}
                  alt={activeSystem.title}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
                  }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={moveRight(0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-description text-paragraph leading-[1.6] mb-70 3xl:mb-[72px]"
              >
                {activeSystem.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                variants={moveRight(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <BorderButton
                  text="View System"
                  borderColor="black"
                  textColor="black"
                  iconColor="primary"
                  hoverBg="black"
                  className="w-fit"
                  px="px-6 2xl:px-[35.5px]"
                  href={activeSystem.slug}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

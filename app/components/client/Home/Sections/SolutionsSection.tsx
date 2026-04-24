"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { solutionsData, SolutionTab } from "../data";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp, moveUpVariant } from "@/app/components/motionVariants";
import BorderButton from "@/app/components/common/BorderButton";

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState<string | null>(
    solutionsData.tabs[0].key,
  );
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const activeIndex = solutionsData.tabs.findIndex(
      (t) => t.key === activeTab,
    );
    const activeButton = buttonRefs.current[activeIndex];
    const container = tabsContainerRef.current;

    if (activeButton && container) {
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: buttonRect.left - containerRect.left,
      });
    }
  }, [activeTab]);

  const activeData = solutionsData.tabs.find((tab) => tab.key === activeTab);

  return (
    <section className="relative w-full lg:min-h-screen text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${solutionsData.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full pt-140 3xl:pt-150 overflow-hidden">
        <div className="container">
          <SectionTitle
            text={solutionsData.mainTitle}
            className="text-left lg:text-center section-heading uppercase"
          />
          {/* ================= DESKTOP ================= */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={moveUp(0.2)}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="mt-18 3xl:mt-[109px]">
              <div ref={tabsContainerRef} className="relative">
                <div className="flex gap-80 text-25 xl:text-30 leading-[1.33] font-[300] font-poppins -tracking-[2%] overflow-hidden">
                  {solutionsData.tabs.map((tab: SolutionTab, index: number) => (
                    <button
                      key={tab.key}
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-0 pb-[13px] transition-colors duration-300 relative ${activeTab === tab.key ? "text-white" : "text-white/60"}`}
                    >
                      <span className="block font-[600] invisible h-0 overflow-hidden">
                        {tab.label}
                      </span>
                      <span
                        className={`${activeTab === tab.key ? "font-[600]" : "font-[300]"} transition-all duration-300`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="absolute left-0 right-0 bottom-0 h-px bg-white/35" />
                <div
                  className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300"
                  style={{
                    width: indicatorStyle.width,
                    left: indicatorStyle.left,
                  }}
                />
              </div>
            </div>
            <div className="mt-[76px]" />
            {activeData && (
              <div className="flex w-full">
                <div className="pr-12 2xl:pr-15 mt-120 3xl:mt-[203px] pb-200 3xl:pb-[204px]">
                  <motion.h3
                    key={activeTab}
                    initial="hidden"
                    whileInView="show"
                    variants={moveUpVariant(1.5)}
                    viewport={{ once: true }}
                    className="text-[36px] 2xl:text-55 leading-[1.18] font-poppins -tracking-[2%] max-w-[370px] 2xl:max-w-[509px] font-light"
                  >
                    {activeData.leftTitle}
                  </motion.h3>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  variants={moveUpVariant(0.2)}
                  viewport={{ once: true }}
                  className="w-px bg-white/35"
                />
                <div className="ml-15 2xl:ml-auto 3xl:mr-15 mt-120 3xl:mt-[203px]">
                  <div className="grid grid-cols-2 gap-x-6 2xl:gap-x-20 3xl:gap-x-[100px] text-19 font-[300] leading-[2.63] font-poppins -tracking-[2%] text-white">
                    {activeData.rightItems.map((item, index) => (
                      <motion.div
                        key={`${activeTab}-${index}`}
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(index * 0.15)}
                        viewport={{ once: true }}
                        className="group cursor-pointer flex items-center w-fit transition-colors duration-300"
                      >
                        <span className="transition-all duration-300 group-hover:font-[600]">
                          {item}
                        </span>
                        <FiArrowRight
                          size={28}
                          className="ml-2 opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          {/* ================= MOBILE ACCORDION ================= */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={moveUp(0.2)}
            viewport={{ once: true }}
            className="lg:hidden mt-10 md:mt-12 space-y-6"
          >
            {solutionsData.tabs.map((tab: SolutionTab, index: number) => {
              const isOpen = activeTab === tab.key;
              return (
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(index * 0.14)}
                  viewport={{ once: true }}
                  key={tab.key}
                  className="border-b border-white/50 pb-4"
                >
                  {/* Accordion trigger */}
                  <button
                    onClick={() => setActiveTab(isOpen ? null : tab.key)}
                    className="w-full flex justify-between items-start text-25 leading-[1.33] font-poppins -tracking-[2%] text-left"
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="show"
                      variants={moveUp(index * 0.14)}
                      viewport={{ once: true }}
                      className="overflow-hidden flex justify-between items-center w-full"
                    >
                      <span
                        className={
                          isOpen
                            ? "font-[600] text-white"
                            : "font-[300] text-white/60 transition-all duration-300"
                        }
                      >
                        {tab.label}
                      </span>
                      <FiArrowRight
                        size={24}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                      />
                    </motion.div>
                  </button>
                  {/* Accordion body */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"} overflow-hidden`}
                  >
                    <div className="overflow-hidden">
                      {/* Left title */}
                      <h3 className="text-30 leading-[1.33] font-poppins -tracking-[2%] font-light mb-4">
                        {tab.leftTitle}
                      </h3>

                      {/* Right items */}
                      <div className="space-y-2 text-19 font-[300] leading-[2.63] font-poppins -tracking-[2%]">
                        {tab.rightItems.map((item: string, index: number) => (
                          <motion.div
                            key={`${activeTab}-${index}`}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(index * 0.06)}
                            viewport={{ once: true }}
                            className="flex items-center gap-2"
                          >
                            <FiArrowRight size={20} />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <div className="bg-primary/50 backdrop-blur-[20px] w-full h-fit mt-40 lg:mt-0">
          <div className="container flex flex-col lg:flex-row gap-40 not-last:lg:gap-0 lg:items-center py-50 3xl:py-[56px] text-30 leading-[1.33] font-poppins -tracking-[2%]">
            <span className="max-w-[997px]" dangerouslySetInnerHTML={{ __html: solutionsData.secondTitle }} />
            <BorderButton
              text={solutionsData.btnText}
              iconColor="white"
              px="px-30 3xl:px-[35px]"
              href={solutionsData.btnLink}
              hoverBg="white"
              className="w-fit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

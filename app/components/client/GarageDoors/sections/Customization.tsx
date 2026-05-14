"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { solutionsData, SolutionTab } from "../data";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp, moveUpVariant } from "@/app/components/motionVariants";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

export default function Customization() {
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
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="relative w-full lg:min-h-screen overflow-hidden">
      <SecondaryNoise/>

      <div className="relative z-10 w-full pt-12 md:pt-140 3xl:pt-150 overflow-hidden">
        <div className="container">
          <SectionTitle text={solutionsData.mainTitle} className="text-left section-heading uppercase" />
          <p className="text-30 font-light leading-[1.333] font-poppins -tracking-[2%] max-w-[60ch] mt-6">
            {solutionsData.mainDescription}
          </p>
          {/* ================= DESKTOP ================= */}
          <motion.div initial="hidden" whileInView="show" variants={moveUp(0.2)} viewport={{ once: true }} className="hidden lg:block" >
            <div className="mt-18 3xl:mt-[109px]">
              <div ref={tabsContainerRef} className="relative">
                <div className="flex gap-80 text-19 leading-[2.631578947368421] font-[300] font-poppins -tracking-[2%] overflow-hidden">
                  {solutionsData.tabs.map((tab: SolutionTab, index: number) => (
                    <button key={tab.key} ref={(el) => { buttonRefs.current[index] = el; }} onClick={() => setActiveTab(tab.key)}
                      className={`px-0 pb-[13px] transition-colors duration-300 relative ${activeTab === tab.key ? "text-paragraph" : "text-paragraph"}`}
                    >
                      <span className="block font-[600] invisible h-0 overflow-hidden"> {tab.label}</span>
                      <span className={`${activeTab === tab.key ? "font-[600]" : "font-[300]"} transition-all duration-300`} >
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="absolute left-0 right-0 bottom-0 h-px bg-bdr-gray" />
                <div className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300" style={{ width: indicatorStyle.width, left: indicatorStyle.left, }} />
              </div>
            </div>
            <div className="mt-[76px]" />
            {activeData && (
              <div className="grid grid-cols-[1fr_2.5fr] 3xl:grid-cols-[478px_auto]">
                <div className=" pt-50 pb-200 3xl:pb-[204px] border-r border-bdr-gray">
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
                {/* <motion.div initial="hidden" whileInView="show" variants={moveUpVariant(0.2)} viewport={{ once: true }} className="w-px bg-bdr-gray" /> */}
                <div className="ml-15 2xl:ml-100 3xl:ml-[150px] pt-50">
                  <div className="w-full text-19 font-[300] leading-[1.789473684210526] font-poppins -tracking-[2%] ">
                    {activeData.rightItems.map((item, index) => (
                      <motion.ul
                        key={`${activeTab}-${index}`}
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(index * 0.15)}
                        viewport={{ once: true }}
                        className="group cursor-pointer flex items-center w-fit transition-colors duration-300"
                      >
                        <li className="transition-all duration-300 text-paragraph group-hover:text-secondary flex items-center gap-x-2">
                          <span className="w-[5px] h-[5px] bg-primary block"></span><span>{item}</span>
                        </li>
                        
                      </motion.ul>
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
            className="lg:hidden mb-12 mt-[30px] md:mt-12"
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
                  className="border-b first:border-t border-white/50"
                >
                  {/* Accordion trigger */}
                  <button
                    onClick={() => setActiveTab(isOpen ? null : tab.key)}
                    className="w-full flex justify-between items-start text-30 leading-[1.33] font-poppins -tracking-[2%] text-left py-[10px]"
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
                            : "font-[300] text-white transition-all duration-300"
                        }
                      >
                        {tab.label}
                      </span>
                      
                      <div    className={`transition-transform duration-300 ${isOpen ? "" : "-rotate-90"}`}> 
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6 7.45825L11.1667 12.8916C10.525 13.5333 9.47502 13.5333 8.83336 12.8916L3.40002 7.45825" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>  
                      </div>
                    </motion.div>
                  </button>
                  {/* Accordion body */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pt-20" : "grid-rows-[0fr] opacity-0"} overflow-hidden border-t border-white/50`}
                  >
                    <div className="overflow-hidden">
                      {/* Left title */}
                      <h3 className="text-55 leading-[1.456] md:leading-[1.33] font-poppins -tracking-[2%] font-light mb-20">
                        {tab.leftTitle}
                      </h3>

                      {/* Right items */}
                     <div className="grid grid-cols-2 gap-y-2 text-19 font-[300] leading-[2.63] font-poppins -tracking-[2%] pb-8">
                        {tab.rightItems.map((item: string, index: number) => (
                          <motion.div
                            key={`${activeTab}-${index}`}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(index * 0.06)}
                            viewport={{ once: true }}
                            className="flex items-center"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onTouchStart={() => setHoveredIndex(index)}
                            onTouchEnd={() => setHoveredIndex(null)}
                          >
                            <span className={`transition-all duration-300   ${
                                hoveredIndex === index ? "font-[700]" : ""
                              }`}  >{item}</span>
                            <FiArrowRight
                              size={20}
                              className={` transition-all duration-300 ${
                                hoveredIndex === index ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-1"
                              }`}
                            />
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
  
      </div>
    </section>
  );
}

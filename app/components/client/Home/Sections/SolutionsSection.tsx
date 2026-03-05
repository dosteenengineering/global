"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { solutionsData } from "../data";
import { FiArrowRight } from "react-icons/fi";

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState<string | null>(solutionsData.tabs[0].key);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const activeIndex = solutionsData.tabs.findIndex((t) => t.key === activeTab);
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
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${solutionsData.backgroundImage})` }} />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full container py-140 3xl:py-150 overflow-hidden">
        <h2 className="text-left lg:text-center section-font-size leading-[1.111] font-helvetica uppercase">
          {solutionsData.mainTitle}
        </h2>

        {/* ================= DESKTOP (NO CHANGES) ================= */}
        <div className="hidden lg:block">
          {/* Tabs */}
          <div className="mt-18 3xl:mt-[109px]">
            <div ref={tabsContainerRef} className="relative">
              <div className="flex gap-15 2xl:gap-20 text-25 xl:text-30 leading-[1.33] font-[300] font-poppins -tracking-[2%]">
                {solutionsData.tabs.map((tab: any, index: number) => (
                  <button
                    key={tab.key}
                    ref={(el) => { buttonRefs.current[index] = el; }}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-0 pb-[13px] transition-all duration-300 relative ${activeTab === tab.key ? "text-white" : "text-white/60"}`}
                  >
                    <span className="block font-[600] invisible h-0 overflow-hidden">{tab.label}</span>
                    <span className={`${activeTab === tab.key ? "font-[600]" : "font-[300]"}`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-px bg-white/35" />
              <div className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300" style={{ width: indicatorStyle.width, left: indicatorStyle.left }} />
            </div>
          </div>

          <div className="mt-[76px]" />

          {activeData && (
            <div className="flex w-full">
              <div className="pr-12 2xl:pr-15 mt-30 3xl:mt-[203px] mb-25 3xl:mb-[167px]">
                <h3 className="text-[36px] 2xl:text-55 leading-[1.18] font-poppins -tracking-[2%] max-w-[370px] 2xl:max-w-[509px] font-light">
                  {activeData.leftTitle}
                </h3>
              </div>

              <div className="w-px bg-white/35" />

              <div className="ml-15 2xl:ml-auto 3xl:mr-15 mt-30 3xl:mt-[203px]">
                <div className="grid grid-cols-2 gap-x-6 2xl:gap-x-20 3xl:gap-x-[100px] text-19 font-[300] leading-[2.63] font-poppins -tracking-[2%] text-white">
                  {activeData.rightItems.map((item, index) => (
                    <div key={index} className="group cursor-pointer flex items-center w-fit transition-all duration-300">
                      <span className="transition-all duration-300 group-hover:font-[600]">{item}</span>
                      <FiArrowRight size={28} className="ml-2 opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= MOBILE ACCORDION (BELOW LG) ================= */}
        <div className="lg:hidden mt-10 md:mt-12 space-y-6">
          {solutionsData.tabs.map((tab: any) => {
            const isOpen = activeTab === tab.key;

            return (
              <div key={tab.key} className="border-b border-white/50 pb-4">
                <button
                  onClick={() => setActiveTab(isOpen ? null : tab.key)}
                  className="w-full flex justify-between items-start text-30 leading-[1.33] font-poppins -tracking-[2%] text-left"
                >
                  <span className={isOpen ? "font-[600] text-white" : "font-[300] text-white/60 transition-all duration-300"}>
                    {tab.label}
                  </span>
                  <FiArrowRight size={24} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                </button>

                <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"} overflow-hidden`}>
                  <div className="overflow-hidden">
                    <div className="space-y-2 text-19 font-[300] leading-[2.63] font-poppins -tracking-[2%]">
                      {tab.rightItems.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiArrowRight size={20} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

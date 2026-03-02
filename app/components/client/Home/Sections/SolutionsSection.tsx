"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { solutionsData } from "../data";
import { FiArrowRight } from "react-icons/fi";

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(solutionsData.tabs[0].key);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

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

  const activeData = solutionsData.tabs.find((tab) => tab.key === activeTab)!;

  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${solutionsData.backgroundImage})` }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full container py-140 3xl:py-150 overflow-hidden">
        {/* Main Title */}
        <h2 className="text-center text-90 leading-[1.111] font-helvetica uppercase">
          {solutionsData.mainTitle}
        </h2>

        {/* Tabs */}
        <div className="mt-18 3xl:mt-[109px]">
          <div ref={tabsContainerRef} className="relative">
            {/* Tabs */}
            <div className="flex gap-20 text-30 leading-[1.33] font-[300] font-poppins -tracking-[2%]">
              {solutionsData.tabs.map((tab: any, index: number) => (
                <button
                  key={tab.key}
                  ref={(el) => { buttonRefs.current[index] = el; }}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-0 pb-[13px] transition-all duration-300 relative ${
                    activeTab === tab.key ? "text-white" : "text-white/60"
                  }`}
                >
                  {/* Hidden bold text to reserve space and prevent layout shift */}
                  <span
                    className="block font-[600] invisible h-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    {tab.label}
                  </span>
                  {/* Visible text */}
                  <span
                    className={`block ${activeTab === tab.key ? "font-[600]" : "font-[300]"}`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Base Line */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-white/35" />

            {/* Active Line */}
            <div
              className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300"
              style={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
              }}
            />
          </div>
        </div>

        {/* Gap */}
        <div className="mt-[76px]" />

        {/* Split Section */}
        <div className="flex w-full">
          {/* Left 30% */}
          <div className="pr-15 mt-[203px] mb-[167px]">
            <h3 className="text-55 leading-[1.18] font-poppins -tracking-[2%] max-w-[500px] font-light">
              {activeData.leftTitle}
            </h3>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-white/35" />

          {/* Right 70% */}
          <div className="ml-auto 3xl:mr-20 mt-[203px]">
            <div className="grid grid-cols-2 gap-x-20 3xl:gap-x-[100px] text-19 font-[300] leading-[2.63] font-poppins -tracking-[2%] text-white">
              {activeData.rightItems.map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer flex items-center w-fit transition-all duration-300"
                >
                  <span className="transition-all duration-300 group-hover:font-[600]">
                    {item}
                  </span>

                  <FiArrowRight
                    size={28}
                    className="ml-2 opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

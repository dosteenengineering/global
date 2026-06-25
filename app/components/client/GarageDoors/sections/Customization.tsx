"use client";

import { useState, useRef, useEffect } from "react";
import { IndividualSystemData, SolutionTab } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp, moveUpVariant } from "@/app/components/motionVariants";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export default function Customization({ data }: { data: IndividualSystemData['fifthSection'] }) {
  const [activeTab, setActiveTab] = useState<string | null>(
    data.items[0].title,
  );

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const updateIndicator = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const activeIndex = data.items.findIndex(
      (t) => t.title === activeTabRef.current,
    );

    const slide = swiper.slides[activeIndex] as HTMLElement;
    if (!slide) return;
    const btn = slide.querySelector("button") as HTMLElement;
    if (!btn) return;

    // slide.offsetLeft = position within swiper wrapper (no transform)
    // swiper.translate = current drag offset (negative)
    // btn.offsetLeft = button position within the slide
    const left = slide.offsetLeft + btn.offsetLeft + (swiper.translate ?? 0);

    setIndicatorStyle({
      width: btn.offsetWidth,
      left,
    });
  };

  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
    setTimeout(() => updateIndicator(), 0);
  }, [activeTab]);

  const activeData = data.items.find((tab) => tab.title === activeTab);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="relative w-full lg:min-h-screen overflow-hidden">
      <SecondaryNoise />

      <div className="relative z-10 w-full pt-12.5 md:pt-140 3xl:pt-150 overflow-hidden">
        <div className="container">
          <SectionTitle
            text={data.title}
            className="text-left section-heading-90 uppercase max-w-[23ch] "
          />
          {/* <p className="text-30 font-light leading-[1.333] font-poppins -tracking-[2%] max-w-[65ch] mt-5 md:mt-6">
            {solutionsData.mainDescription}
          </p> */}
          <SectionDescription
            text={data.description}
            className="!text-30 font-light leading-none font-poppins -tracking-[2%] max-w-[65ch] mt-5 md:mt-6 !leading-[1.333333333333333]"
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
              <div ref={tabsContainerRef} className="relative overflow-hidden">
                <Swiper
                  modules={[FreeMode]}
                  freeMode={{ enabled: true, sticky: false }}
                  slidesPerView="auto"
                  spaceBetween={0}
                  onTouchStart={() => {
                    isDraggingRef.current = true;
                  }}
                  onTouchEnd={() => {
                    isDraggingRef.current = false;
                  }}
                  onSwiper={(s) => {
                    swiperRef.current = s;
                    setTimeout(() => updateIndicator(), 0);
                  }}
                  onSetTranslate={() => updateIndicator()}
                  className="!overflow-visible"
                >
                  {data.items.map((tab, index: number) => (
                    <SwiperSlide key={index} className="!w-auto">
                      <button
                        onClick={() => {
                          setActiveTab(tab.title);
                          const swiper = swiperRef.current;
                          if (!swiper) return;

                          const slide = swiper.slides[index] as HTMLElement;
                          const translate = swiper.translate ?? 0;

                          const slideLeft = slide.offsetLeft + translate;
                          const slideRight = slideLeft + slide.offsetWidth;

                          const isVisible =
                            slideLeft >= 0 && slideRight <= swiper.width;

                          if (!isVisible) {
                            swiper.setTranslate(
                              Math.min(
                                0,
                                -(
                                  slide.offsetLeft -
                                  (swiper.width / 2 - slide.offsetWidth / 2)
                                ),
                              ),
                            );
                            swiper.updateProgress();
                          }
                        }}
                        className={`px-0 pb-[13px] mr-10 lg:mr-60 3xl:mr-80 text-19 2xl:leading-[2.631578947368421] font-poppins -tracking-[2%] group transition-colors duration-300 relative cursor-pointer ${activeTab === tab.title ? "text-secondary" : "text-paragraph"} hover:!text-secondary`}
                      >
                        <span className="block font-semibold invisible h-0 overflow-hidden">
                          {tab.title}
                        </span>
                        <span
                          className={`${activeTab === tab.title ? "font-semibold" : "font-light"} transition-all duration-300`}
                        >
                          {tab.title}
                        </span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute left-0 right-0 bottom-0 h-px bg-bdr-gray" />
                <div
                  className="absolute bottom-0 h-[4px] bg-primary"
                  style={{
                    width: indicatorStyle.width,
                    left: indicatorStyle.left,
                    transition: isDraggingRef.current ? "none" : "all 300ms",
                  }}
                />
              </div>
            </div>
            <div className="mt-50" />
            {activeData && (
              <div className="grid grid-cols-[1.2fr_2.5fr] 2xl:grid-cols-[478px_auto] pb-150">
                <div className=" pt-50 pb-50 3xl:pb-[126px] border-r border-bdr-gray">
                  <motion.h3
                    key={activeTab}
                    initial="hidden"
                    whileInView="show"
                    variants={moveUpVariant(1.5)}
                    viewport={{ once: true }}
                    className="text-[36px] 2xl:text-55 leading-[1.18] font-poppins -tracking-[2%] max-w-[370px] 2xl:max-w-[509px] font-light pr-2"
                  >
                    {activeData.title}
                  </motion.h3>
                </div>
                {/* <motion.div initial="hidden" whileInView="show" variants={moveUpVariant(0.2)} viewport={{ once: true }} className="w-px bg-bdr-gray" /> */}
                <div className="ml-15 2xl:ml-100 3xl:ml-[150px] pt-50">
                  <div dangerouslySetInnerHTML={{__html:activeData.description}} 
                  className="w-full text-19 font-light leading-[1.789473684210526] font-poppins -tracking-[2%] customization-section-system">
                    {/* {activeData.rightItems.map((item, index) => (
                      <motion.ul
                        key={`${activeTab}-${index}`}
                        initial="hidden"
                        whileInView="show"
                        variants={moveUp(index * 0.15)}
                        viewport={{ once: true }}
                        className="group cursor-pointer flex items-center w-fit transition-colors duration-300"
                      >
                        <li className="transition-all duration-300 text-paragraph group-hover:text-secondary flex items-center gap-x-2">
                          <span className="w-[5px] h-[5px] bg-primary block"></span>
                          <span>{item}</span>
                        </li>
                      </motion.ul>
                    ))} */}
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
            {data.items.map((tab, index: number) => {
              const isOpen = activeTab === tab.title;
              return (
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(index * 0.14)}
                  viewport={{ once: true }}
                  key={index}
                  className="border-b first:border-t border-bdr-gray"
                >
                  {/* Accordion trigger */}
                  <button
                    onClick={() => setActiveTab(isOpen ? null : tab.title)}
                    className="w-full flex justify-between items-start text-30 leading-[1.33] font-poppins -tracking-[2%] text-left py-5 md:py-[10px]"
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
                            ? "font-[500] text-secondary"
                            : "font-light text-paragraph transition-all duration-300"
                        }
                      >
                        {tab.title}
                      </span>

                      <div
                        className={`transition-transform duration-300 ${isOpen ? "" : "-rotate-90"}`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.6 7.45825L11.1667 12.8916C10.525 13.5333 9.47502 13.5333 8.83336 12.8916L3.40002 7.45825"
                            stroke="black"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </button>
                  {/* Accordion body */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr] opacity-0"} overflow-hidden `}
                  >
                    <div className="overflow-hidden">
                      {/* Left title */}
                      <h3
                        className={`text-55 leading-[1.456] md:leading-[1.33] font-poppins -tracking-[2%] font-light mb-20 ${isOpen ? "hidden " : "block"}`}
                      >
                        {tab.title}
                      </h3>

                      {/* Right items */}

                      <div dangerouslySetInnerHTML={{__html:tab.description}} className="w-full text-19 font-light leading-[1.789473684210526] font-poppins -tracking-[2%] customization-section-system-mobile">
                        {/* {tab.rightItems.map((item, index) => (
                          <motion.ul
                            key={`${activeTab}-${index}`}
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(index * 0.15)}
                            viewport={{ once: true }}
                            className="group cursor-pointer flex items-center w-fit transition-colors duration-300"
                          >
                            <li className="transition-all duration-300 text-paragraph group-hover:text-secondary flex items-center gap-x-2 mb-[5px]">
                              <span className="w-[5px] h-[5px] bg-primary block"></span>
                              <span>{item}</span>
                            </li>
                          </motion.ul>
                        ))} */}
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

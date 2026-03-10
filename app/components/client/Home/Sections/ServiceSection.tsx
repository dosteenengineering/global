"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, ServiceTab } from "../data";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { moveUp } from "@/app/components/motionVariants";
import { useInView } from "framer-motion";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string>(servicesData.tabs[1].key);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeData =
    servicesData.tabs.find((tab) => tab.key === activeTab) ??
    servicesData.tabs[0];

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <PrimaryNoise />

      <div className="absolute -top-85 lg:top-0 -right-88 -lg:right-80 w-[1062px] h-[513px] pointer-events-none">
        <Image
          src={servicesData.topRightSvg}
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 container py-140 3xl:py-150">
        <SectionTitle
          text={servicesData.title}
          className="section-font-size leading-[1.11] text-white uppercase font-helvetica text-left lg:text-center 3xl:-ml-[67px]"
        />

        {/* ===== Desktop (lg and up) ==== */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={moveUp(0.2)}
          viewport={{ once: true }}
          className="hidden lg:flex items-stretch gap-0 pt-16 2xl:pt-20"
        >
          <div className="w-px bg-[#76A7FF] shrink-0" />

          <div className="flex flex-col justify-start">
            {servicesData.tabs.map((tab: ServiceTab, index: number) => {
              const isActive = tab.key === activeTab;
              return (
                <motion.button
                  key={tab.key}
                  initial="hidden"
                  whileInView="show"
                  variants={moveUp(index * 0.4)}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab(tab.key)}
                  className="group flex items-center gap-9 pl-9 pr-10 xl:pr-20 2xl:pr-150 3xl:pr-[195px] text-left cursor-pointer"
                >
                  {/* Arrow — space always reserved, fills in on active */}
                  <span
                    className="mb-14 2xl:mb-[72px] w-[31px] shrink-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          key="arrow"
                          initial={{ width: 0 }}
                          animate={{ width: 31 }}
                          exit={{ width: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="block overflow-hidden"
                          style={{ width: 0 }}
                        >
                          <Image
                            src="/assets/icons/arrow-right.svg"
                            alt="arrow"
                            width={31}
                            height={20}
                            className="block"
                            style={{ minWidth: 31 }}
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>

                  <span
                    className={`text-30 font-poppins leading-[1.33] font-[300] -tracking-[2%] transition-all duration-300 mb-14 2xl:mb-[72px] min-w-[260px] 2xl:min-w-[275px] 3xl:min-w-[285px] ${isActive ? "font-[600] text-white" : "text-white/60"} transition-all duration-300`}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="w-px bg-[#76A7FF] shrink-0" />

          <div className="flex-1 pl-20 2xl:pl-140 3xl:pl-150 flex flex-col min-h-[400px]">
            <div className="relative w-full h-[150px] xl:h-[200px] mb-[70px] 2xl:px-3">
              <Image
                key={activeData.key}
                src={activeData.image}
                alt={activeData.label}
                height={200}
                width={630}
                className="object-contain object-left transition-opacity duration-300 pointer-events-none"
              />
            </div>

            <SectionTitle
            key={activeTab}
              text={activeData.description}
              className="text-55 text-white leading-[1.18] font-[300] font-poppins -tracking-[2%] max-w-[855px]"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              variants={moveUp(0.7)}
              viewport={{ once: true }}
              className="w-fit mt-[50px] xl:mb-10 2xl:mb-[50px]  3xl:mb-[71px]"
            >
              <BorderButton text="Read More" iconColor="white" px="px-[35px]" hoverBg="white" />
            </motion.div>
          </div>
        </motion.div>

        {/* ===== Mobile / Tablet ======= */}
        <div className="lg:hidden pt-10 md:pt-12">
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            onSlideChange={(swiper) =>
              setActiveTab(servicesData.tabs[swiper.activeIndex].key)
            }
          >
            {servicesData.tabs.map((tab: ServiceTab, index: number) => {
              const isActive = tab.key === activeTab;
              return (
                <SwiperSlide key={tab.key} className="!w-fit">
                  <motion.button
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    variants={moveUp(index * 0.15)}
                    onClick={() => setActiveTab(tab.key)}
                    className="w-full text-left"
                  >
                    <span
                      className={`text-25 md:text-30 font-poppins leading-[1.33] -tracking-[2%] transition-all duration-300 ${isActive ? "font-[600] text-white" : "text-white/60"}`}
                    >
                      {tab.label}
                    </span>
                  </motion.button>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="h-[1px] bg-[#76A7FF] my-4 md:my-6 md:mb-14" />

          <div>
            <div className="relative w-full h-[180px] mb-2 md:mb-12">
              <Image
                key={activeData.key}
                src={activeData.image}
                alt={activeData.label}
                fill
                className="object-contain object-left"
              />
            </div>

            <SectionTitle
            key={activeTab}
              text={activeData.description}
              className="text-[26px] lg:text-55 text-white leading-[1.18] font-[300] font-poppins -tracking-[2%] max-w-[680px] lg:max-w-[855px]"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              variants={moveUp(0.6)}
              viewport={{ once: true }}
              className="w-fit mt-7 md:mt-12"
            >
              <BorderButton text="Read More" iconColor="white" px="px-[24px]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import NavButton from "@/app/components/common/NavigationButton";
import "swiper/css";


type SystemRow = {
  id: number;
  division: string;
  category: string;
  sectionNumber: string;
  sectionTitle: string;
  system: string;
};

type Props = {
  data: {
    title: string;
    tableData: SystemRow[];
  };
};

const Systems = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [rightSpace, setRightSpace] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = data.tableData.length;

  useEffect(() => {
    const updateSpacing = () => {
      if (containerRef.current) {
        const leftGap = containerRef.current.getBoundingClientRect().left;
        setRightSpace(leftGap);
      }
    };
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);
 const isMobile =  typeof window !== "undefined" && window.innerWidth < 1024;
  return (
    <section className="bg-white w-full relative select-none overflow-hidden py-[70px] md:pb-140 3xl:pb-[206px] md:pt-100 xl:pt-200">
      <div ref={containerRef} className="container px-[16px] mx-auto" />
      <div className="absolute top-2 xl:top-[8%] left-[-131px]  3xl:-left-1 pointer-events-none lg:rotate-10 3xl:rotate-0">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[280px] 2xl:w-[500px] 3xl:w-[600px]"
        />
      </div>

     

         <motion.div   className="lg:max-w-[1076px] 3xl:max-w-[1252px] lg:ml-auto px-[16px] 2xl:px-0"variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={isMobile ? undefined : { marginRight: `${rightSpace + 16}px` }} >
        <SectionTitle
          text={data.title}
          className="section-heading-90 text-secondary uppercase mb-50"
        />

        {/* ── Mobile: Swiper ── */}
        <div className="md:hidden border-t border-bdr-gray pt-5">
          {/* Counter + Nav */}
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-[24px]"
          >
            {/* Capsule counter */}
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center border border-primary rounded-full px-[16px] text-15 w-[55px] h-[26px] py-[3px] font-poppins font-[300] leading-[0.5] text-secondary">
                <span className="font-[600]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span>/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </div>
            </motion.div>

            {/* Nav buttons */}
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-[10px]"
            >
              <NavButton
                onClick={() => swiperRef.current?.slidePrev()}
                direction="left"
                disabled={false}
                ariaLabel="Previous"
                borderColor="border-[#161616]"
              />
              <NavButton
                onClick={() => swiperRef.current?.slideNext()}
                direction="right"
                disabled={false}
                ariaLabel="Next"
                borderColor="border-[#161616]"
              />
            </motion.div>
          </motion.div>

          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.activeIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
             
          >
            {data.tableData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="border border-[#D9D9D9] overflow-hidden">
                  {/* Division */}
                  <div className="border-b border-[#D9D9D9] p-[15px] ">
                    <p className="text-[12px] leading-[1.67] tracking-[0.08em] text-primary font-light mb-2.5">
                      Division
                    </p>
                    <h3 className="text-[18px] leading-[1.56] font-light text-secondary">
                      {item.division}
                    </h3>
                    <p className="mt-[2px] text-[12px] tracking-[2%] leading-[1.67] font-light text-[#7B7B7B]">
                      {item.category}
                    </p>
                  </div>

                  {/* Section */}
                  <div className="border-b border-[#D9D9D9] p-[15px]">
                    <p className="text-[12px] leading-[1.67] tracking-[0.08em] text-primary font-light mb-2.5">
                      Section Number & Title
                    </p>
                    <h3 className="text-[18px] leading-[1.56] font-light text-secondary">
                      {item.sectionNumber}
                    </h3>
                    <p className="mt-[2px] text-[12px] tracking-[2%] leading-[1.67] font-light text-[#7B7B7B]">
                      {item.sectionTitle}
                    </p>
                  </div>

                  {/* System */}
                  <div className="p-[15px]">
                    <p className="text-[12px] leading-[1.67] tracking-[0.08em] text-primary font-light mb-2.5">
                      Dosteen System
                    </p>
                    <p className="text-[12px] tracking-[2%] leading-[1.67] font-light text-[#7B7B7B]">
                      {item.system}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Desktop: Original table ── */}
        <div className="hidden md:block">
          <table className="w-full border-collapse border border-[#D9D9D9]">
            <thead>
              <tr className="bg-[linear-gradient(270deg,rgba(24,83,214,0.05)_7.21%,rgba(24,83,214,0.16)_29.81%,rgba(2,46,158,0.05)_76.92%)]">
                <th className="w-[33.33%] border-r border-b border-[#D9D9D9] px-2 md:px-30 py-[16px] xl:py-[26px] text-left text-19 md:text-30 font-light text-primary leading-[1.333333333333333]">
                  Division
                </th>
                <th className="w-[33.33%] border-r border-b border-[#D9D9D9] px-2 md:px-30 py-[16px] xl:py-[26px] text-left text-19 md:text-30 font-light text-primary leading-[1.333333333333333]">
                  Section Number & Title
                </th>
                <th className="w-[33.33%] border-b border-[#D9D9D9] px-2 md:px-30 py-[16px] xl:py-[26px] text-left text-19 md:text-30 font-light text-primary leading-[1.333333333333333]">
                  Dosteen System
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tableData.map((item) => (
                <tr key={item.id} className="bg-white border-b border-[#D9D9D9] last:border-b-0">
                  <td className="border-r border-[#D9D9D9] px-2 py-2 md:p-30 align-top">
                    <h3 className="text-[14px] md:text-30 leading-[1.333333333333333] font-light text-secondary tracking-[2%] md:tracking-[-2%]">
                      {item.division}
                    </h3>
                    <p className="mt-[10px] text-19 leading-[1.526315789473684] font-light text-paragraph tracking-[2%] md:tracking-[-2%]">
                      {item.category}
                    </p>
                  </td>
                  <td className="border-r border-[#D9D9D9] px-2 py-2 md:p-30 align-top">
                    <h3 className="text-[18px] md:text-30 leading-[1.333333333333333] font-light text-secondary tracking-[2%] md:tracking-[-2%]">
                      {item.sectionNumber}
                    </h3>
                    <p className="mt-[10px] text-19 leading-[1.526315789473684] font-light text-paragraph tracking-[2%] md:tracking-[-2%]">
                      {item.sectionTitle}
                    </p>
                  </td>
                  <td className="px-2 py-2 md:p-30 align-top">
                    <p className="text-19 leading-[1.526315789473684] font-light text-paragraph tracking-[2%] md:tracking-[-2%]">
                      {item.system}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     </motion.div>
    </section>
  );
};

export default Systems;
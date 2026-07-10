"use client";

import { useRef, useState } from "react";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import NavButton from "@/app/components/common/NavigationButton";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import "swiper/css";
import Image, { StaticImageData } from "next/image";

interface GuidesArticlesProps {
  data: {
    title: string;
    items: {
      id: number;
      featured: boolean;
      audience: string;
      type: string;
      title: string;
      image: string | StaticImageData;
      link: string;
    }[];
  };
}

const imageHeightClasses = [
  "2xl:h-[450px] 3xl:h-[579px]",
  "2xl:h-[350px] 3xl:h-[458px]",
  "2xl:h-[250px] 3xl:h-[297px]",
];


const GuidesArticles = ({ data }: GuidesArticlesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const links = "#"
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  function updateState(swiper: SwiperType) {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setSlidesPerView(
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1,
    );
  }
  return (
    <section className="relative overflow-hidden py-12.5 md:py-120 md:py-140 2xl:py-150">
      <PrimaryNoise2 />
      <div className="container">
        <div className="flex justify-between mb-50 md:mb-60 border-b border-bdr-blue pb-5 md:pb-0 md:border-b-0 relative z-[1]">
          <SectionTitle text={data.title} className="text-left section-heading-90 !text-90 uppercase text-white max-w-[28ch] !leading-[1.1]" />
          <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <BorderButton
              text="View All"
              href={links}
              className="hidden md:inline-flex xl:px-35"
              iconColor="white"
              hoverBg="white"
            />
          </motion.div>
        </div>

        {/* ── Mobile / Tablet: Swiper ── */}
        <div className="xl:hidden">
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-[30px]"
          >
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <BorderButton
                text="View All"
                href={links}
                className=" inline-flex md:hidden xl:px-35"
                iconColor="white"
                hoverBg="white"
              />
            </motion.div>
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-[10px] md:gap-[15px]"
            >
              {
                activeIndex > 0 && (
                  <>
                  <NavButton
                    onClick={() => {
                      const s = swiperRef.current;
                      if (s && !s.destroyed) s.slidePrev();
                    }}
                    direction="left"
                    disabled={isBeginning}
                    ariaLabel="Previous"
                    borderColor="border-white"
                    className=" icon-invert"
                  />
                  <NavButton
                    onClick={() => {
                      const s = swiperRef.current;
                      if (s && !s.destroyed) s.slideNext();
                    }}
                    direction="right"
                    disabled={isEnd}
                    ariaLabel="Next"
                    borderColor="border-white"
                    className="icon-invert"
                  />
                  </>
                )
              }
            </motion.div>
          </motion.div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateState(swiper);
            }}
            onSlideChange={(swiper) => updateState(swiper)}
            onBreakpoint={(swiper) => updateState(swiper)}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              767: { slidesPerView: 2 },
            }}
            style={{ alignItems: "stretch" }}
            className=" [&_.swiper-wrapper]:items-stretch"
          >
            {data.items.map((item, index) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <div className="border-x  md:border-x-0 px-5 md:px-0 md:border-b md:pb-4 border-bdr-blue flex flex-col h-full text-white">
                  <div className="flex justify-between items-center mb-[15px] md:mb-5 mt-auto">
                    <span className="text-19 leading-[1.526315789473684] font-light text-white -tracking-[0.02em]">
                      {item.audience}
                    </span>
                    <button className="text-white border rounded-full border-white text-15 leading-[1.666666666666667] px-2.5 md:px-[18px] py-[4px] lg:py-0">
                      {item.type}
                    </button>
                  </div>
                  <h3 className="text-30 leading-[1.333333333333333] font-light -tracking-[0.02em] text-white mb-[15px] md:mb-5 ">
                    {item.title}
                  </h3>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover h-[194px] sm:h-[300px] md:h-[300px] mt-auto"
                    width={500}
                    height={300}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Desktop: Original grid ── */}
        <div className="hidden xl:grid xl:grid-cols-3 3xl:grid-cols-[705.74px_566.99px_auto] text-white relative z-2 gap-y-5 items-end">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="border-b pb-4 xl:pb-0 xl:border-b-0 xl:border-l border-bdr-blue px-0 xl:px-[20px] first:xl:pt-30 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-5 xl:mb-10 mt-auto">
                <motion.span variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-19 leading-[1.526315789473684] font-light text-white -tracking-[0.02em]">
                  {item.audience}
                </motion.span>
                <motion.button variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-white/80 border rounded-full border-white/60 font-light text-15 leading-[1.666666666666667] px-[18px] xl:py-[3px]">
                  {item.type}
                </motion.button>
              </div>
              <motion.h3 variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className={`text-30 leading-[1.333333333333333] font-light -tracking-[0.02em] text-white mb-5 xl:mb-50 whitespace-pre-line ${index === 1 ? "" : ""
                }`}>
                {item.title}
              </motion.h3>
              <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover h-[200px] md:h-[300px] lg:h-[350px] ${imageHeightClasses[index] ?? imageHeightClasses[0]}`}
                  width={500}
                  height={500}
                />
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GuidesArticles;

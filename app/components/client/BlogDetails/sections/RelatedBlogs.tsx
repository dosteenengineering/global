"use client";

import { useRef, useState } from "react";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import NavButton from "@/app/components/common/NavigationButton"; 
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import "swiper/css";

interface GuidesArticlesProps {
  data: {
    title: string;
    items: {
      id: number;
      featured: boolean;
      audience: string;
      type: string;
      title: string;
      image: string;
      link: string;
    }[];
  };
}

const imageHeightClasses = [
  "xl:h-[350px] 2xl:h-[450px] 3xl:h-[579px]",
  "xl:h-[250px] 2xl:h-[350px] 3xl:h-[458px]",
  "xl:h-[200px] 2xl:h-[250px] 3xl:h-[336.88px]",
];
  
const GuidesArticles = ({ data }: GuidesArticlesProps) => {
  const links = "#"
  const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);
    function updateState(swiper: SwiperType) {
    setActiveIndex(swiper.activeIndex);
    setSlidesPerView(
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1,
    );
  }
  return (
    <section className="relative overflow-hidden pt-12.5 pb-12.5 md:pt-120 md:pb-200 ">
      <div className="container">
        <div className="flex justify-between mb-50 md:mb-60 border-b border-bdr-blue pb-5 md:pb-0 md:border-b-0 relative z-[1]">
          <SectionTitle
            text={data.title}
            className="text-left section-heading-90 uppercase text-secondary max-w-[28ch]"
          />
          {/* <BorderButton
            text="View All"
            href={links}
            className="hidden md:inline-flex xl:px-35"
            iconColor="white"
            hoverBg="white"
          /> */}
          <BorderButton
            text="View All"
            href={links}
            className="h-fit xl:px-35"
            iconColor="primary"
            hoverBg="black"
            textColor="black"
            borderColor="black"
          />
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
              <NavButton
                onClick={() => {
                  const s = swiperRef.current;
                  if (s && !s.destroyed) s.slidePrev();
                }}
                direction="left"
                disabled={false}
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
                disabled={false}
                ariaLabel="Next"
                borderColor="border-white"
                className=" icon-invert"
              />
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
                <div className="border-x  md:border-x-0 px-5 md:px-0 md:border-b md:pb-4 border-bdr-blue flex flex-col h-full text-secondary">
                  <div className="flex justify-between items-center mb-[15px] md:mb-5 mt-auto">
                    <span className="text-19 leading-[1.526315789473684] font-light text-secondary -tracking-[0.02em]">
                      {item.audience}
                    </span>
                    <button className="text-secondary border rounded-full border-secondary text-15 leading-[1.666666666666667] px-2.5 md:px-[18px] py-[4px] lg:py-0">
                      {item.type}
                    </button>
                  </div>
                  <h3 className="text-30 leading-[1.333333333333333] font-light -tracking-[0.02em] text-secondary mb-[15px] md:mb-5">
                    {item.title}
                  </h3>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover h-[194px] sm:h-[300px] md:h-[300px] mt-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Desktop: Original grid ── */}
        <div className="hidden xl:grid xl:grid-cols-3 3xl:grid-cols-[705.74px_566.99px_auto] text-secondary relative z-2 gap-y-5 items-end">
          {data.items.map((item, index) => (
            <motion.div variants={moveUp(0.2*index)} initial="hidden" whileInView="show" viewport={{once:true}}
              key={item.id}
              className="border-b pb-4 xl:pb-0 md:border-b-0 xl:border-l border-bdr-gray px-0 xl:px-[20px] xl:first:pt-30 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-5 xl:mb-10 mt-auto">
                <span className="text-19 leading-[1.526315789473684] font-light text-paragraph -tracking-[0.02em]">
                  {item.audience}
                </span>
                <button className="text-paragraph border font-light rounded-full border-bdr-gray text-15 leading-[1.666666666666667] px-[18px] uppercase">
                  {item.type}
                </button>
              </div>
              <h3 className="text-30 leading-[1.333333333333333] font-light -tracking-[0.02em] text-secondary mb-5 xl:mb-50">
                {item.title}
              </h3>
              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover h-[200px] md:h-[300px] lg:h-[350px] ${imageHeightClasses[index] ?? imageHeightClasses[0]}`}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GuidesArticles;
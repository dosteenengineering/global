"use client";

import { useRef, useState } from "react";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import StatNoise3 from "@/app/components/common/noise/StatNoise3";
import NavButton from "@/app/components/common/NavigationButton";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import "swiper/css";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

interface WhyChooseProps {
  data: {
    sectionTitle: string;
    sectionDesc: string;
    items: {
      id: number;
      title: string;
      icon: string;
      image: string;
    }[];
  };
}

function Card({ item }: { item: WhyChooseProps["data"]["items"][0] }) {
  return (
    <div className="group bg-white/10 relative overflow-hidden h-[300px] 2xl:h-[416px] p-5 md:p-40 3xl:p-50 cursor-pointer">
      <div className="relative z-[5] w-full h-full flex flex-col justify-between">
        <div className="w-100 h-100 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-white/2 group-hover:to-white/20 flex items-center justify-center mb-6 group-hover:backdrop-blur-[20px] transition-all duration-300 ease-in-out">
          <img
            src="/assets/images/garage-doors/grd-stroke.svg"
            className="w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100"
            alt=""
          />
          <img
            src={item.icon}
            alt={item.title}
            width="64px"
            height="64px"
            className="w-16 h-16 group-hover:invert-1 group-hover:brightness-1000 transition-all duration-300 ease-in-out"
          />
        </div>
        <h3 className="text-30 leading-[1.333333333333333] text-[#161616] group-hover:text-white font-light">
          {item.title}
        </h3>
      </div>
      <Image
        src={item.image}
        alt={item.title}
        width={1000}
        height={1000}
        className="absolute bottom-0 left-0 translate-y-full group-hover:translate-0 w-full h-full object-cover z-[-1] transition-all duration-700 ease-in-out"
      />
      <div
        className="absolute bottom-0 left-0 z-2 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: "url(/assets/noise/mono-2.png)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "contain",
        }}
      />
      <div className="absolute inset-0 h-full w-full z-1">
        <StatNoise3 />
      </div>
    </div>
  );
}

const WhyChoose = ({ data }: WhyChooseProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = data.items.length;

  return (
    <section className="relative py-[70px] md:py-100 lg:py-150 3xl:py-200 overflow-hidden">
      <div className="container">
        <SectionTitle
          title={data.sectionTitle}
          className="section-heading max-w-[1290px] mb-50 uppercase"
        />
        <div className="max-w-[967px] 3xl:mr-[285px] ml-auto">
          {/* <p className="text-24 lg:text-30 leading-[1.333333333333333] font-light tracking-[-0.02em] mb-50">
            {data.sectionDesc}
          </p> */}
          <SectionDescription text={data.sectionDesc} className="!text-24 lg:!text-30 !leading-[1.333333333333333] font-light 
          tracking-[-0.02em] !mb-100" />
        </div>

        {/* ── Mobile: Swiper ── */}
        <div className="md:hidden border-t border-bdr-gray pt-5">
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-5"
          >
            {/* Counter pill */}
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center border border-primary rounded-full px-[16px] text-15 w-[55px] h-[26px] py-[3px] font-poppins font-[300] leading-[0.5]">
                <span className="font-[600]">{String(activeIndex + 1).padStart(2, "0")}</span>
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
            className="!overflow-visible"
          >
            {data.items.map((item) => (
              <SwiperSlide key={item.id}>
                <Card item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Tablet & Desktop: Original grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-30">
          {data.items.map((item,index) => (
            <motion.div variants={moveUp(index*0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card key={item.id} item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
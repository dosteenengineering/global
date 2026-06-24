"use client";

import "swiper/css";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { AboutPageData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import NavButton from "@/app/components/common/NavigationButton";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

function IconWrapper({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="relative flex-shrink-0 w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
      <Image
        src="/assets/images/about/why-choose/card-bg-cricle.svg"
        alt=""
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] relative">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={moveUp(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-col p-5 md:p-50 backdrop-blur-[20px] h-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.2) 100%)",
      }}
    >
      <IconWrapper icon={icon} label={title} />
      <h3 className="text-white text-30 font-light leading-[1.333] tracking-[-0.02em] mt-5 md:mt-30 mb-[10px] md:mb-20">
        {title}
      </h3>
      <p className="text-white text-description !leading-[1.68] md:!leading-[1.54] !tracking-[2%]">
        {description}
      </p>
    </motion.div>
  );
}

export default function WhyChooseDosteen({
  data,
}: {
  data: AboutPageData["fourthSection"];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Group items into pairs for mobile swiper slides
  const slideGroups = data.items.reduce<(typeof data.items)[]>(
    (acc, item, i) => {
      if (i % 2 === 0) acc.push([item]);
      else acc[acc.length - 1].push(item);
      return acc;
    },
    []
  );

  function updateState(swiper: SwiperType) {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }

  const total = slideGroups.length;

  const counterPill = (
    <div className="flex items-center justify-center border border-primary text-white font-poppins font-light leading-[0.5] border-white rounded-full px-[16px] text-15 w-[55px] md:w-[78px] h-[26px] md:h-[31px] py-[3px]">
      <span className="font-semibold">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );

  return (
    <section className="relative w-full select-none overflow-x-clip">
      <PrimaryNoise2 />

      <div className="absolute right-[-17%] top-[-8%] md:right-[-39.9%] md:top-[-18%] w-[52%] h-[327px] md:w-[900px] md:h-[900px] 3xl:w-[1280px] 3xl:h-[1280px] pointer-events-none">
        <Image
          src="/assets/images/about/why-choose/why-bg2.svg"
          alt=""
          fill
          className="object-contain hidden lg:block"
          priority
        />
        <Image
          src="/assets/images/about/cta/bg-right.svg"
          alt=""
          fill
          className="object-contain lg:hidden w-[203px] h-[327px]"
          priority
        />
      </div>

      <div className="relative z-10 container py-12.5 md:py-[140px] 3xl:py-[150px] w-full">
        <SectionTitle
          text={data.title}
          className="section-heading-90 text-white uppercase mb-50 3xl:mb-[70px] max-w-[27ch]"
        />

        <div className="lg:pl-[25.3%] w-full mb-100 3xl:mb-[109px]">
          <SectionDescription
            text={data.description}
            delay={0.5}
            className="!leading-[1.555] md:!leading-[1.35] text-white font-light !text-30 tracking-[-0.02em] mb-5 md:mb-100 3xl:mb-[109px] xl:max-w-[967px] border-b border-white/20 md:border-0 pb-5 md:pb-0"
          />
        </div>

        {/* ── Mobile Swiper (hidden on lg+) ── */}
        <div className="lg:hidden">
          <motion.div
            variants={moveUp(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-[30px]"
          >
            <motion.div variants={moveUp(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {counterPill}
            </motion.div>
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
                disabled={isBeginning}
                ariaLabel="Previous"
                borderColor="border-white"
                className="icon-invert"
              />
              <NavButton
                onClick={() => swiperRef.current?.slideNext()}
                direction="right"
                disabled={isEnd}
                ariaLabel="Next"
                borderColor="border-white"
                className="icon-invert"
              />
            </motion.div>
          </motion.div>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateState(swiper);
            }}
            onSlideChange={updateState}
            slidesPerView={1}
            spaceBetween={20}
            className="w-full"
            wrapperClass="!items-stretch"
          >
            {slideGroups.map((group, slideIndex) => (
              <SwiperSlide key={slideIndex} className="!h-auto">
                {/* Two cards side by side inside each slide using a mini grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
                  {group.map((item, index) => (
                    <FeatureCard
                      key={index}
                      icon={item.image}
                      title={item.title}
                      description={item.description}
                      delay={0.5 + slideIndex * 0.1}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Desktop Grid (hidden below lg) ── */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {data.items.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.image}
              title={item.title}
              description={item.description}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
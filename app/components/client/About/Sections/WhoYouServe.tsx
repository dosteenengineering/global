"use client";
import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { AboutPageData, WhoWeServeData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

function ServeCard({ icon, label,delay }: { icon: string; label: string,delay:number }) {
  return (
    <motion.div variants={moveUp(delay)} initial="hidden" whileInView="show" viewport={{once:true, amount:0.4}} className="flex flex-col group">
      {/* Icon row */}
      <div className="pb-[10px] md:pb-40 relative">
        {/* Base line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#c2c2c2]" />

        {/* Animated line */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

        {/* Icon */}
        <div className="w-[43px] h-[40px] md:w-15 md:h-15 relative">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
      </div>

      {/* Label */}
      <p className="relative text-[18px] md:text-30 font-light text-secondary leading-[1.556] md:leading-[1.333] tracking-[-0.02em] mt-[10px] md:mt-30">
        {label}
      </p>
    </motion.div>
  );
}

export default function WhoYouServe({data}:{data:AboutPageData['thirdSection']}) {
  return (
    <section className="relative w-full select-none py-12.5 md:py-140">
      <SecondaryNoise />
      <div className="container w-full">
        <SectionTitle
          text={data.title}
          className="section-heading-90 text-secondary uppercase mb-[30px] md:mb-80"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-[35px] md:gap-x-5">
          {data.items.map((item,index) => (
            <div key={index}>
              <ServeCard delay={0.5+index*0.1} icon={item.image} label={item.title} />
            </div>
          ))}
        </div>
         
        {/* <Swiper
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1550: {
              slidesPerView: 5,spaceBetween: 20
            },
          }}
          className="w-full [&_.swiper-slide]:3xl:!w-[320px]"
        >
          {WhoWeServeData.items.map((item) => (
            <SwiperSlide key={item.id}>
              <ServeCard icon={item.icon} label={item.label} />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </section>
  );
}

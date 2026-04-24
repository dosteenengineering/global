"use client"

import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import TitleReveal from "@/app/components/common/animations/HeroTitleReveal";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

export default function Hero() {
  return (
    <section className="relative h-[70vh] lg:h-[92vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/home/hero/herobg.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="container relative z-10 flex h-full items-end py-140 3xl:pb-[130px]">
        <div className="max-w-[964px]">
          {/* Title */}
          <TitleReveal
            text="Where Engineering Meets Assurance"
            className="text-[#FFFBFB] max-w-[380px] md:max-w-[520px] hero-heading lg:max-w-[800px] xl:max-w-[800px] 3xl:max-w-none font-[700] uppercase font-helvetica leading-[1.22] lg:leading-[1.1]"
          />

          {/* Button */}
          <motion.div 
          variants={moveUp(2)}
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          className="mt-[50px] w-fit">
            <BorderButton
              text="Request a Quote"
              borderColor="white"
              textColor="white"
              iconColor="primary"
              px="px-4 2xl:px-6"
              hoverBg="white"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

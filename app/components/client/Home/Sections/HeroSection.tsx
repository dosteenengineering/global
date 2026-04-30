"use client"

import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import TitleReveal from "@/app/components/common/animations/HeroTitleReveal";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

export default function Hero() {
  return (
    <section className="relative h-[85vh] lg:h-[92vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/home/hero/herobg.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover hidden md:block"
      />

      <Image
        src="/assets/images/home/hero/herobg-mobile.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-top md:hidden"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="container relative z-10 flex h-full items-end py-[80px] md:py-140 3xl:pb-[130px]">
        <div className="max-w-[964px]">
          {/* Title */}
          <TitleReveal
            text="Where Engineering Meets Assurance"
            className="text-[#FFFBFB] max-w-[380px] md:max-w-[520px] hero-heading lg:max-w-[800px] xl:max-w-[800px] 3xl:max-w-none font-bold uppercase font-helvetica"
          />

          {/* Button */}
          <motion.div 
          variants={moveUp(2)}
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          className="mt-20 sm:mt-50 w-fit">
            <BorderButton
              text="Request a Quote"
              borderColor="white"
              textColor="white"
              iconColor="primary"
              hoverBg="white"
              className="max-w-[201px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

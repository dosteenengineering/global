"use client";
import Image from "next/image";
import { ValuesData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

function ValueCard({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
    variants={moveUp(delay)}
    initial="hidden"
    whileInView="show"
    viewport={{once:true}}
    className="flex flex-col gap-[10px] md:gap-4 2xl:gap-30 border-b border-bdr-gray last:border-b-0 pb-5 last:pb-0 md:border-b-0 md:pb-0">
      <h3 className="text-55 xl:text-[32px] 3xl:text-55 font-light leading-[1.334] md:leading-[1.1818] text-secondary ">
        {title}
      </h3>
      <p className="text-description !leading-[1.68] md:!leading-[1.54] text-paragraph max-w-[540px]">
        {description}
      </p>
    </motion.div>
  );
}

export default function OurValues() {
  return (
    <section className="bg-white w-full select-none overflow-hidden relative">
      <div className="absolute -top-13 left-0 pointer-events-none hidden lg:block">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={634}
          height={500}
          className="object-contain w-[320px] sm:w-[380px] md:w-[440px] lg:w-[500px] xl:w-[450px] 2xl:w-[500px] 3xl:w-[634px]"
        />
      </div>
      <div className="container pt-[70px] md:pt-100 pb-140 3xl:pb-200 w-full">
        <div className="flex flex-col lg:flex-row gap-[30px] md:gap-80 3xl:gap-120">
          {/* Left — sticky title */}
          <div className="shrink-0">
            <SectionTitle
              text={ValuesData.title}
              className="section-heading-90 text-secondary uppercase"
            />
          </div>

          {/* Right — 2-col grid of value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] gap-x-60 xl:gap-x-[40px] 3xl:gap-x-[125px] gap-y-5 md:gap-y-40 3xl:gap-y-80">
            {ValuesData.items.map((item, index) => (
              <ValueCard
                key={item.id}
                title={item.title}
                description={item.description}
                delay={index * 0.1 + 0.2} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
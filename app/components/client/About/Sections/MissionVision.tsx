"use client";
import Image from "next/image";
import { AboutPageData } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

function Card({
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
    viewport={{once:true}}
    className="relative flex flex-col gap-8 p-5 md:p-60 3xl:pb-[63px] w-full h-full lg:h-fit">
      <SecondaryNoise />
      <div className="relative z-10 flex flex-col ">
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] relative mb-7.5 xl:mb-100">
          <Image src={icon} alt={title} fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-[10px] md:gap-20">
          <h2 className="section-heading-90">
            {title}
          </h2>
          <p className="text-description text-paragraph !leading-[1.68] md:!leading-[1.54]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MissionVision({data}:{data:AboutPageData['fifthSection']}) {
  // const { mission, vision } = MissionVisionData;

  return (
    <section className="bg-white w-full select-none">
      <div className="container w-fullborder-[#c2c2c2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-30 border-b border-[#c2c2c2] py-140 3xl:py-200 ">
          <div className="h-full">
              <Card
                icon={data.items[0].image}
                title={data.items[0].title}
                description={data.items[0].description}
                delay={0.5}
              />
          </div>
          <div className="lg:pt-100">
              <Card
                icon={data.items[1].image}
                title={data.items[1].title}
                description={data.items[1].description}
                delay={0.8}
              />
          </div>
        </div>
      </div>
    </section>
  );
}

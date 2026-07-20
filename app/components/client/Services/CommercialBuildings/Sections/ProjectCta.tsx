
"use client";
import BorderButton from "@/app/components/common/BorderButton";
import { ProjectCtaData } from "../data";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";
import { motion } from "framer-motion";
import { moveRight } from "@/app/components/motionVariants";

interface CtaProps {
    description: string;
    buttonText:string;
    buttonLink:string;
}

const ProjectCta = ({data}:{data:CtaProps}) => {
  console.log(`link:`,data.buttonLink)
  return (
    <motion.section variants={moveRight(0.2)} initial="hidden" whileInView={"show"} className="pt-[30px] md:pt-80 pb-140 3xl:pb-200">
      <div className="container w-full">
        <div className="flex lg:items-center items-start flex-col lg:flex-row gap-x-5 gap-y-5 md:gap-y-[40px] lg:justify-between p-5 md:p-60 relative">
          <StatNoise1 />
          <p
            className="text-30 leading-[1.33] tracking-[-0.02em] text-secondary max-w-[80ch] font-normal"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <BorderButton
            text={data.buttonText}
            borderColor="black"
            textColor="black"
            iconColor="primary"
            px="px-8 lg:px-[35px]"
            hoverBg="black"
            className="z-10 min-w-max"
            href={`${data.buttonLink}`}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectCta;

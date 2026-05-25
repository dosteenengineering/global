"use client"
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

interface dataProps {
  descMaxWidth?: string;
  data: {
    title: string;
    stats: {
      id: number;
      value: string;
      label: string;
    }[];
  };
}

export default function BimEngineeringData({ data, descMaxWidth }: dataProps) {
  const { title, stats } = data;

  return (
    <section className="w-full relative">
      <SecondaryNoise />
      <div className="container py-12.5 md:py-140 3xl:py-150 relative">
        {/* Title */}
        <SectionTitle
          title={title}
          className="section-heading text-secondary mb-50 max-w-[27ch]"
        />

        {/* Stats box */}
        <div className="lg:px-80 py-50 3xl:py-[56px] relative">
          <div className="lg:block hidden">
            <StatNoise1 />
          </div>
          {/* <div className="relative z-10 flex flex-wrap gap-70 3xl:gap-[76px]"> */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-[346px_346px_346px_auto] gap-2.5 lg:gap-5 3xl:gap-[37px]">
            {stats.map((stat,index) => (
              <motion.div variants={moveUp(index*0.2*index)} initial="hidden" whileInView={"show"} viewport={{ once: true }} className="relative">
                <div className="lg:hidden"> <StatNoise1 /></div>
                <div key={stat.id} className="flex flex-col w-full p-5">
                  <span className="text-55 leading-[1.1818] text-primary mb-[5px] font-light">
                    {stat.value}
                  </span>
                  <span className={`text-paragraph text-description ${descMaxWidth} `}>
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef } from "react";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const BannerBottom = ({firstDescription,secondDescription}:{firstDescription:string,secondDescription:string}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightInset = useGetContainerSpacing(containerRef);

  return (
    <section className="relative pt-12.5 md:pt-120 pb-[70px] md:pb-200 overflow-hidden">
      <div ref={containerRef} className="container" />

      <div
        className="ml-auto xl:max-w-[70%]  3xl:max-w-[1252px] px-[16px] 2xl:px-0"
        style={{ marginRight: rightInset }}
      >
        <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} 
         className="text-30 leading-[1.33] font-light tracking-[-0.02em] mb-5 md:mb-40 3xl:pr-5">
          {firstDescription}
        </motion.p>
        <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
         className="text-description text-paragraph ">
          {secondDescription}
        </motion.p>
      </div>
    </section>
  );
};

export default BannerBottom;

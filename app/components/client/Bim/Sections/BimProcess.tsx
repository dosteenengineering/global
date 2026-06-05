"use client"
import Image from "next/image";
import { bimProcessSection, BimProcessStep } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp, zoomIn } from "@/app/components/motionVariants";

function ProcessStep({
  step,
  isLast,
  delay,
}: {
  step: BimProcessStep;
  isLast: boolean;
  delay: number;
}) {
  return (
    <div className="flex gap-[21px] md:gap-50">
      {/* Left: circle + connector line */}
      <div className="flex flex-col items-center shrink-0">
        {/* Circle */}
        <motion.div variants={zoomIn(delay)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative z-[2] w-12.5 h-12.5 md:w-[90px] md:h-[90px] 3xl:w-[100px] 3xl:h-[100px] shrink-0 backdrop-blur-sm rounded-full">
          <Image
            src="/assets/images/about/why-choose/card-bg-cricle.svg"
            alt=""
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center ">
            <span className="text-white font-light text-30 leading-[1.333] tracking-[-0.02em] md:hidden">
              {step.number.toString().replace(/^0+/, '')}
            </span>
            <span className="text-white font-light text-30 leading-[1.333] tracking-[-0.02em] hidden md:block">
              {step.number}
            </span>
          </div>
        </motion.div>

        {/* Connector line */}
        <div className="w-px bg-[#76A7FF] flex-1" />
      </div>

      {/* Right: title + description */}
      <motion.div variants={moveUp(delay + 0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className={`${isLast ? "pb-0" : "pb-80"}`}>
        <h3 className="text-white text-30 mb-2.5 md:mb-20 font-light leading-[1.33] tracking-[-0.02em]">
          {step.title}
        </h3>
        <p className="text-white text-description max-w-[58ch]">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function BimProcess() {
  const { title, steps } = bimProcessSection;

  return (
    <section className="w-full py-12.5 md:py-120 3xl:py-[150px] relative">
      <div className="absolute left-0 top-10 3xl:-top-[3%] z-10 hidden lg:block">
        <Image
          src="/assets/images/bim/process/bg-lines.svg"
          alt="bg-svg"
          width={700}
          height={700}
          className="object-cover h-full w-[75%] 3xl:w-full"
        />
      </div>
      <div className="absolute z-[2] w-[436px] lg:w-full top-[-20%] lg:-top-61 left-[-31%] lg:left-0 pointer-events-none lg:hidden">
        <Image
          src="/assets/images/bim/process/bg-lines.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain w-[250px] 2xl:w-[500px] 3xl:w-[600px]"
        />
      </div>
      <PrimaryNoise2 />
      <div className="relative container max-w-[660px] 3xl:max-w-[870px] w-full">
        <div className="flex flex-col items-start">
          {/* Title */}
          <SectionTitle
            title={title}
            className="section-heading-90 text-white mb-7.5 md:mb-50 min-w-[17ch] max-w-[17ch]"
          />

          {/* Steps */}
          <div className="w-full flex flex-col items-start justify-center">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.id}
                step={step}
                isLast={i === steps.length - 1}
                delay={i * 0.12}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { bimProcessSection, BimProcessStep } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

function ProcessStep({
  step,
  isLast,
}: {
  step: BimProcessStep;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-50">
      {/* Left: circle + connector line */}
      <div className="flex flex-col items-center shrink-0">
        {/* Circle */}
        <div className="relative w-[90px] h-[90px] 3xl:w-[100px] 3xl:h-[100px] shrink-0">
          <Image
            src="/assets/images/about/why-choose/card-bg-cricle.svg"
            alt=""
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-light text-30 leading-[1.333] tracking-[-0.02em]">
              {step.number}
            </span>
          </div>
        </div>

        {/* Connector line */}
        <div className="w-px bg-[#76A7FF] flex-1" />
      </div>

      {/* Right: title + description */}
      <div className={`${isLast ? "pb-0" : "pb-80"}`}>
        <h3 className="text-white text-30 mb-20 font-light leading-[1.33] tracking-[-0.02em]">
          {step.title}
        </h3>
        <p className="text-white text-description max-w-[58ch]">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function BimProcess() {
  const { title, steps } = bimProcessSection;

  return (
    <section className="w-full py-120 3xl:py-[140px] relative">
      <div className="absolute left-0 top-10 3xl:-top-[3%] z-10">
        <Image
          src="/assets/images/bim/process/bg-lines.svg"
          alt="bg-svg"
          width={700}
          height={700}
          className="object-cover h-full w-[75%] 3xl:w-full"
        />
      </div>
      <PrimaryNoise2 />
      <div className="relative container max-w-[660px] 3xl:max-w-[870px] w-full">
        <div className="flex flex-col items-start">
          {/* Title */}
          <SectionTitle
            title={title}
            className="section-heading text-white mb-50 max-w-[17ch]"
          />

          {/* Steps */}
          <div className="w-full flex flex-col items-start justify-center">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.id}
                step={step}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

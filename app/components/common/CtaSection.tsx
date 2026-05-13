"use client";
import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";

export default function CtaSection({title, titleWidth, description, descriptionWidth, buttons}: {title: string, titleWidth?: string, description: string, descriptionWidth?: string, buttons: {text: string, href: string}[]}) {
  return (
    <section className="relative w-full select-none overflow-hidden">
      <PrimaryNoise2 />

      {/* Decorative lines — right side */}
      <div className="absolute z-10 right-0 top-1/2 -translate-y-1/2 w-[42%] h-[90%] pointer-events-none">
        <Image
          src="/assets/images/about/cta/bg-right.svg"
          alt=""
          fill
          className="object-contain object-right"
        />
      </div>

      <div className="relative z-10 container py-[50px] md:py-140 3xl:py-150 w-full">
        {/* Title */}
        <h2 className={`section-heading text-white uppercase whitespace-pre-line mb-20 3xl:mb-[26px] ${titleWidth}`}>
          {title}
        </h2>

        {/* Divider */}
        <div className="w-full border-t border-[#76A7FF] mb-[30px] md:mb-80 3xl:mb-100" />

        {/* Description */}
        <p className={`text-white text-30 leading-[1.333] font-light tracking-[-0.02em] mb-[30px] md:mb-50 ${descriptionWidth}`}>
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 md:gap-[10px]">
          {buttons.map((btn) => (
            <BorderButton
              key={btn.text}
              text={btn.text}
              iconColor="white"
              px="px-30 3xl:px-[35px]"
              href={btn.href}
              hoverBg="white"
              className="w-fit"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import { whoBenefitsSection, BenefitItem } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

type BenefitsData = {
  title: string;
  description?: string;
  items: BenefitItem[];
};

type BenefitsProps = {
  data?: BenefitsData;
  showSecondaryNoise?: boolean;
};

function AccordionItem({
  item,
  isActive,
  onSelect,
}: {
  item: BenefitItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`flex cursor-pointer gap-0 group ${isActive ? "py-50" : "py-40"}`}
      onClick={onSelect}
    >
      <div
        className={`relative ${isActive ? "w-[3px] mr-40" : ""} shrink-0 transition-all duration-300 ease-in-out`}
      >
        <div
          className={`absolute left-0 top-0 w-full bg-primary transition-all duration-500 ease-in-out ${
            isActive ? "h-full" : "h-0"
          }`}
        />
      </div>

      <div className="flex-1">
        <p className="text-30 font-light leading-[1.333] tracking-[-0.02em] transition-all duration-300">
          {item.label}
        </p>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isActive ? "opacity-100 mt-20" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-paragraph text-[14px] leading-[1.75] font-light max-w-[480px]">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Benefits({
  data = whoBenefitsSection,
  showSecondaryNoise = true,
}: BenefitsProps) {
  const { title, description, items } = data;
  const [activeId, setActiveId] = useState<string>(
    items[1]?.id ?? items[0]?.id ?? ""
  );

  return (
    <section className="relative w-full py-140 3xl:py-150">
      {showSecondaryNoise && <SecondaryNoise />}
      <div className="container relative">
        <SectionTitle
          className="section-heading max-w-[30ch] mb-30"
          title={title}
        />

        {description && (
          <p className="text-19 leading-[1.3333333333] text-paragraph max-w-6xl font-light mb-80">
            {description}
          </p>
        )}

        <div
          className={`flex gap-80 3xl:gap-[89px] items-start ${
            description ? "" : "mt-50"
          }`}
        >
          <div className="w-[624px] shrink-0 mt-[10px]">
            <div className="flex flex-col divide-y divide-[#c2c2c2]">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onSelect={() => setActiveId(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="relative w-full aspect-[4/3] max-h-[650px] overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeId === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

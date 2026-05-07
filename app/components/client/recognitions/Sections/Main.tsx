"use client";

import { useState } from "react";
import Image from "next/image";
import { items, type Category } from "../data";
import AwardsNoise from "@/app/components/common/noise/AwardsNoise";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";

const categories: { label: string; value: Category }[] = [
  { label: "Certifications", value: "certifications" },
  { label: "Awards", value: "awards" },
];

export default function Main() {
  const [active, setActive] = useState<Category>("certifications");

  const filtered = items.filter((item) => item.category === active);

  return (
    <section className="w-full relative">
      <div className="absolute right-0 top-[-34%] 3xl:top-[-33.2%]">
        <Image
          src="/assets/images/recognitions/bg-lines.svg"
          alt="bg-svg"
          width={900}
          height={900}
          className="object-contain pointer-events-none w-full h-[930px] 3xl:h-full"
        />
      </div>
      <div className="container mt-80 mb-140 3xl:mb-200">
        {/* Category Tabs */}
        <div className="flex gap-[10px] mb-50">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-[35px] py-[14px] 2xl:h-[54px] rounded-[50px] border text-15 leading-[1.73] text-secondary font-normal uppercase transition-all duration-200
                  ${
                    active === cat.value
                      ? "border-primary bg-primary/10"
                      : "border-[#454545]"
                  }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-3 gap-x-20 3xl:gap-x-[25px] gap-y-50 ">
          {filtered.map((item, itemIdx) => (
            <Reveal
              key={item.id}
              variants={moveUpV2}
              delayRange={itemIdx * 0.12}
            >
              <AwardCard image={item.image} title={item.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-full overflow-hidden pt-100 pb-70 border-b border-[#c2c2c2]">
        <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-500 ease-in-out pointer-events-none z-10">
          <AwardsNoise />
        </div>

        <div className="relative h-[220px] 3xl:h-[300px] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Title */}
      <p className="text-center text-30 leading-[1.333] text-secondary font-light mt-30 3xl:mt-[32px]">
        {title}
      </p>
    </div>
  );
}

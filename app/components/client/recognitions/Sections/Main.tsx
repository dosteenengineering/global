"use client";

import { useState } from "react";
import Image from "next/image";
import { items, type Category } from "../data";

const categories: { label: string; value: Category }[] = [
  { label: "Certifications", value: "certifications" },
  { label: "Awards", value: "awards" },
];

export default function Main() {
  const [active, setActive] = useState<Category>("certifications");

  const filtered = items.filter((item) => item.category === active);

  return (
    <section className="w-full">
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
          {filtered.map((item) => (
            <AwardCard key={item.id} image={item.image} title={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="flex flex-col items-center group">
      {/* Image container with 100px padding on all sides */}
      <div className="relative w-full overflow-hidden pt-100 pb-70 border-b border-[#c2c2c2]">
        {/* Hover gradient overlay — grows from bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-500 ease-in-out pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(24, 83, 214, 0) 0%, rgba(2, 46, 158, 0.1) 100%)",
          }}
        />

        {/* Trophy / cert image */}
        <div className="relative h-[300px] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <p
        className="text-center text-30 leading-[1.333] text-secondary font-light mt-30 3xl:mt-[32px]"
      >
        {title}
      </p>
    </div>
  );
}

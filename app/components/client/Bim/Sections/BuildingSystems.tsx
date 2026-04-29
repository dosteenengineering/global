"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { buildingSystemsData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import Image from "next/image";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

type Item = (typeof buildingSystemsData.items)[0];

interface CellProps {
  item: Item;
  isTopRow: boolean;
  isFirstSlide: boolean;
  fixedHeight?: number;
  onRef: (el: HTMLDivElement | null) => void;
}

function Cell({ item, isTopRow, isFirstSlide, fixedHeight, onRef }: CellProps) {
  return (
    <div
      ref={onRef}
      style={fixedHeight != null ? { height: fixedHeight } : undefined}
      className={[
        "flex flex-col p-10 group",
        "border-r border-b border-[#c2c2c2]",
        isTopRow ? "border-t border-[#c2c2c2]" : "",
        isFirstSlide ? "border-l border-[#c2c2c2]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-[50px]">
        <Image
          src={item.icon}
          alt="icon"
          aria-hidden="true"
          width={100}
          height={100}
          className="object-contain w-10 h-10 2xl:w-12 2xl:h-12 3xl:w-15 3xl:h-15 group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <h3 className="text-30 leading-[1.333] text-secondary font-light mb-[20px]">
        {item.title}
      </h3>

      <p className="text-paragraph text-description mb-30">
        {item.description}
      </p>

      <div className="mt-auto">
        <Image
          src="/assets/icons/arrow-right-top-primary-26.svg"
          alt={`Go to ${item.title}`}
          width={40}
          height={40}
          className="object-contain w-[26px] h-[26px] translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300"
        />
      </div>
    </div>
  );
}

export default function BuildingSystems() {
  const { title, description, items } = buildingSystemsData;
  const pairs = chunk(items, 2) as [Item, Item | undefined][];

  const [rowHeights, setRowHeights] = useState<[number, number] | null>(null);

  const topRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function measure() {
      [...topRefs.current, ...bottomRefs.current].forEach((el) => {
        if (el) el.style.height = "";
      });

      let maxTop = 0;
      let maxBottom = 0;

      topRefs.current.forEach((el) => {
        if (!el) return;
        const h = el.getBoundingClientRect().height;
        if (h > maxTop) maxTop = h;
      });

      bottomRefs.current.forEach((el) => {
        if (!el) return;
        const h = el.getBoundingClientRect().height;
        if (h > maxBottom) maxBottom = h;
      });

      if (maxTop > 0) setRowHeights([maxTop, maxBottom]);
    }

    const t = setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="container py-140 3xl:py-200">
        <div className="mb-12">
          <SectionTitle
            title={title}
            className="section-heading text-secondary mb-30"
          />
          <p className="text-30 leading-[1.333] text-paragraph max-w-[1395px] font-light mb-80">
            {description}
          </p>
        </div>

        <div className="w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1400: { slidesPerView: 3 },
              1536: { slidesPerView: 4 },
            }}
            className="!overflow-hidden !px-[1px]"
          >
            {pairs.map((pair, idx) => {
              const [top, bottom] = pair;
              return (
                <SwiperSlide key={idx} className="!h-auto">
                  <div className="flex flex-col">
                    {top && (
                      <Cell
                        item={top}
                        isTopRow={true}
                        isFirstSlide={idx === 0}
                        fixedHeight={rowHeights?.[0]}
                        onRef={(el) => {
                          topRefs.current[idx] = el;
                        }}
                      />
                    )}
                    {bottom && (
                      <Cell
                        item={bottom}
                        isTopRow={false}
                        isFirstSlide={idx === 0}
                        fixedHeight={rowHeights?.[1]}
                        onRef={(el) => {
                          bottomRefs.current[idx] = el;
                        }}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

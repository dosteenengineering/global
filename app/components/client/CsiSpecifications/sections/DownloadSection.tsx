"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { downloadData } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import BorderButton from "@/app/components/common/BorderButton";

type DownloadItem = (typeof downloadData.sections)[0];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

interface CellProps {
  item: DownloadItem;
  isTopRow: boolean;
  isFirstSlide: boolean;
  fixedHeight?: number;
  onRef: (el: HTMLAnchorElement | null) => void;
}

function Cell({ item, isTopRow, isFirstSlide, fixedHeight, onRef }: CellProps) {
  return (
    <a
      ref={onRef}
      href={item.link}
      style={fixedHeight != null ? { height: fixedHeight } : undefined}
      className={[ "group flex flex-col  p-6 transition-colors duration-300 hover:bg-[#F3F5FB] p-50", "border-r border-b border-[#c2c2c2]",
        isTopRow ? "border-t border-[#c2c2c2]" : "",
        isFirstSlide ? "border-l border-[#c2c2c2]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-50">
        <Image src={item.icon} alt="icon" aria-hidden="true" width={100} height={100}
          className="h-10 w-10 object-contain transition-all duration-300 group-hover:scale-110 2xl:h-12 2xl:w-12 3xl:h-15 3xl:w-15"
          onError={(event) => {
            event.currentTarget.src = "/assets/icons/circle-check.svg";
          }}
        />
      </div>

      <div>
        <h3 className="mb-[20px] text-30 font-light leading-[1.333] text-secondary">
          {item.title}
        </h3>
        <p className="mb-3 text-19 text-paragraph leading-[1.526315789473684] ">
          <span className="font-semibold">Division: </span><span className="">{item.division}</span>
        </p>
        <p className="text-paragraph text-description mb-30">
          <span className="font-semibold">Section: </span><span className="">{item.section}</span>
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4">
        {/* CTA Button */}
        <BorderButton text="Download Specification" borderColor="black" textColor="black" iconColor="primary" hoverBg="black" className="w-fit" />
      </div>
    </a>
  );
}

export default function DownloadSection() {
  const pairs = chunk(downloadData.sections, 2) as [
    DownloadItem,
    DownloadItem | undefined,
  ][];

  const [rowHeights, setRowHeights] = useState<[number, number] | null>(null);

  const topRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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
    <section className="relative w-full bg-white">
      <SecondaryNoise />
      <div className="container relative z-10 py-140 3xl:py-150">
        <SectionTitle text={downloadData.sectionTitle} className="section-heading mb-50 text-secondary uppercase" />
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            watchOverflow={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="download-section-swiper !overflow-hidden !px-[1px] !pb-14 [&_.swiper-pagination-bullet-active]:!bg-primary [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!bg-primary/40 [&_.swiper-pagination-bullet]:!opacity-100"
          >
            {pairs.map((pair, idx) => {
              const [top, bottom] = pair;
              return (
                <SwiperSlide key={top.id} className="!h-auto">
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

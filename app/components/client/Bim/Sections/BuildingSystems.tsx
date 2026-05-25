"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { buildingSystemsData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import Image from "next/image";
import NavButton from "@/app/components/common/NavigationButton";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import type { Swiper as SwiperType } from "swiper";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

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
  delay?: number;
}

function Cell({ item, isTopRow, isFirstSlide, fixedHeight, onRef, delay = 0 }: CellProps) {
  return (
    <motion.div
      variants={moveUp(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      ref={onRef}
      style={fixedHeight != null ? { height: fixedHeight } : undefined}
      className={[
        "flex flex-col p-5 md:p-10 group",
        "border-r border-b border-[#c2c2c2]",
        isTopRow ? "border-t border-[#c2c2c2]" : "",
        isFirstSlide ? "border-l border-[#c2c2c2]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-7.5 md:mb-50">
        <div className="flex items-center gap-1 justify-between">
          <Image
            src={item.icon}
            alt="icon"
            aria-hidden="true"
            width={100}
            height={100}
            className="object-contain w-10 h-10 2xl:w-12 2xl:h-12 3xl:w-15 3xl:h-15 group-hover:scale-110 transition-all duration-300"
          />
          <div className="  lg:hidden">
            <Image
              src="/assets/icons/arrow-right-top-primary-26.svg"
              alt={`Go to ${item.title}`}
              width={40}
              height={40}
              className="object-contain w-5 h-5 lg:w-[26px] lg:h-[26px] translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <h3 className="text-30 leading-[1.333] text-secondary font-light mb-2.5 md:mb-[20px]">
        {item.title}
      </h3>

      <p className="text-paragraph text-description lg:mb-30">
        {item.description}
      </p>

      <div className="mt-auto hidden lg:block">
        <Image
          src="/assets/icons/arrow-right-top-primary-26.svg"
          alt={`Go to ${item.title}`}
          width={40}
          height={40}
          className="object-contain w-[26px] h-[26px] translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300"
        />
      </div>
    </motion.div>
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
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const total = items.length;
  const counterPill = (
    <div className="flex items-center justify-center border   text-paragraph font-poppins font-[300] leading-[0.5] border-primary rounded-full px-[16px] text-15 w-[55px] md:w-[78px] h-[26px] md:h-[31px] py-[3px]">
      <span className="font-[600]">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
  return (
    <section className="w-full bg-white">
      <div className="container py-140 3xl:py-200">
        <div className="md:mb-12">
          <SectionTitle
            title={title}
            className="section-heading text-secondary mb-30"
          />
          {/* <p className="text-30 leading-[1.333] text-paragraph max-w-[1395px] font-light mb-5 md:mb-80 border-b border-bdr-gray pb-5">
            {description}
          </p> */}
          <SectionDescription text={description} className="!text-30 leading-[1.333] text-paragraph max-w-[1395px] font-light mb-5 md:mb-80 " />
        </div>

        <div className="w-full">
          {/* ── Desktop: paired rows ── */}
          <div className="hidden md:block">
            <Swiper
              spaceBetween={0}
              slidesPerView={2}
              breakpoints={{
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
                          delay={(idx % 4) * 0.1}
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
                          delay={(idx % 4) * 0.1 + 0.08}
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

          {/* ── Mobile: one item per slide ── */}
          <div className="md:hidden">
            <div className=" w-full">
              <motion.div
                variants={moveUp(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-center justify-between mb-[30px]"
              >
                <motion.div
                  variants={moveUp(0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {counterPill}
                </motion.div>
                <motion.div
                  variants={moveUp(0.5)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-center gap-[10px] md:gap-[15px]"
                >
                  <NavButton
                    onClick={() => {
                      const s = swiperRef.current;
                      if (s && !s.destroyed) s.slidePrev();
                    }}
                    direction="left"
                    disabled={false}
                    ariaLabel="Previous"
                    borderColor="border-[#161616]"
                  />
                  <NavButton
                    onClick={() => {
                      const s = swiperRef.current;
                      if (s && !s.destroyed) s.slideNext();
                    }}
                    direction="right"
                    disabled={false}
                    ariaLabel="Next"
                    borderColor="border-[#161616]"
                  />
                </motion.div>
              </motion.div>
            </div>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              className="!overflow-hidden !px-[1px]"
            >
              {items.map((item, idx) => (
                <SwiperSlide key={idx} className="!h-auto">
                  <Cell
                    item={item}
                    isTopRow={true}
                    isFirstSlide={idx === 0}
                    delay={(idx % 4) * 0.1}
                    onRef={() => { }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

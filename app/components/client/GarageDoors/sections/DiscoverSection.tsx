"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryNoise from "@/app/components/common/noise/PrimaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import { moveUp } from "@/app/components/motionVariants";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { useLenis } from "@/app/components/LenisProvider";
import { IndividualSystemData } from "../data";

interface DoorItem {
  id: number;
  menuTitle: string;
  title: string;
  image: string;
  idealFor: string;
  heading: string;
  points: string[];
}

interface DiscoverSectionProps {
  data: {
    sectionTitle: string;
    sectionDesc: string;
    doors: DoorItem[];
    ctaData?: {
      title: string;
      description: string;
      buttonOneTitle: string;
      buttonOneLink: string;
      buttonTwoTitle: string;
      buttonTwoLink: string;
    };
  };
}

function DoorContent({ door }: { door: IndividualSystemData['secondSection']['items'][0] }) {
  const [imageSrc, setImageSrc] = useState(door.image);

  return (
    <article className="pr-0 xl:pr-4">
      <h3 className="hidden xl:block text-40 lg:text-55 text-white leading-[1.181818181818182] font-light tracking-[-0.02em] mb-40 lg:mb-50">
        {door.title}
      </h3>
      {/* <div className="relative w-full aspect-[8/6] xl:aspect-[2.08/1] mb-5 xl:mb-40 overflow-hidden bg-white/10"> */}
      <div className="relative w-full h-[300px] max-h-[482px] 2xl:h-[482px] mb-5 xl:mb-40 2xl:mb-50 overflow-hidden bg-white/10 max-w-[1002px]">
        <Image
          src={imageSrc}
          alt={door.title}
          fill
          sizes="(min-width: 1280px) 920px, 100vw"
          className="object-cover "
          onError={() =>
            setImageSrc("/assets/images/garage-doors/garage-doors.jpg")
          }
        />
      </div>
      {
        door.buttonText && (
          <p className="w-fit font-light py-[5px] md:py-1 xl:py-[10px] text-19 leading-[1.526315789473684]  text-white mb-30">
            <span className="font-medium">Ideal for :</span> {door.buttonText}
          </p>
        )
      }
      {/* <h4 className="text-30 text-white leading-[1.333333333333333] font-light tracking-[-0.02em] mb-30">
        {door.title}
      </h4> */}
      <div dangerouslySetInnerHTML={{ __html: door.description }} className="indi-system-points">

      </div>
      {/* <ul className="space-y-2 xl:space-y-6 xl:pb-50 3xl:pb-[97px]">
        {door.points.map((point) => (
          <li
            key={point}
            className="relative pl-5 text-19 text-white/90 leading-[1.526315789473684] font-light"
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[5px] w-[5px] bg-white" />
            {point}
          </li>
        ))}
      </ul> */}
    </article>
  );
}

const DiscoverSection = ({ data }: { data: IndividualSystemData['secondSection'] }) => {
  const [activeId, setActiveId] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  // Mobile accordion — can open/close independently
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(0);

  const activeDoor = data.items.find((_, index) => index === activeId) ?? data.items[0];

  const toggleAccordion = (id: number) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  return (
    // <section className="relative py-12.5 md:py-100 lg:py-150">
    <section className="relative py-12.5 md:py-100 lg:py-150">
      <PrimaryNoise />
      <div className="container relative z-10">
        <SectionTitle
          title={data.title}
          className="section-heading-90 text-white mb-50 uppercase "
        />

        <div className="max-w-[967px] 3xl:mr-[285px] ml-auto">
          {/* <p className="text-24 lg:text-30 text-white leading-[1.333333333333333] font-light tracking-[-0.02em] mb-7.5 md:mb-50 max-w-[52.5ch]">
            {data.sectionDesc}
          </p> */}
          <SectionDescription
            text={data.description}
            className="text-30 text-white
           !leading-[1.33] font-light tracking-[-0.02em] mb-7.5 md:mb-50  whitespace-pre-line"
          />
        </div>

        <div className="border-t border-bdr-blue xl:pt-40 lg:pt-50">
          {/* ── Mobile: Accordion ── */}
          <div className="xl:hidden space-y-0">
            {data.items.map((door, index) => {
              const isOpen = openAccordionId === index;
              return (
                <div key={index} className="border-b border-bdr-blue">
                  {/* Accordion trigger */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between gap-4 py-[18px] text-left"
                  >
                    <span
                      className={`text-[18px] leading-[1.58] xl:text-19 tracking-[-0.02em] text-white transition-all duration-300 ${isOpen ? "font-[500]" : "font-light"
                        }`}
                    >
                      {door.title}
                    </span>
                    <span
                      className={`shrink-0 flex items-center justify-center   transition-all duration-300  `}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                          }`}
                      >
                        <path
                          d="M16.5999 7.45825L11.1666 12.8916C10.5249 13.5333 9.4749 13.5333 8.83324 12.8916L3.3999 7.45825"
                          stroke="white"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Accordion content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={door.title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5  ">
                          <DoorContent door={door} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ── Desktop: Original sidebar + content ── */}
          <div className="hidden xl:grid grid-cols-1 items-start xl:grid-cols-[400px_minmax(0,1fr)] 3xl:grid-cols-[484px_minmax(0,1fr)]">
            <aside className="xl:sticky xl:top-5 xl:self-start xl:border-r xl:border-bdr-blue xl:pt-40">
              <div className="pb-0 xl:pr-70">
                <nav className="flex flex-wrap gap-3 overflow-x-auto pb-6 xl:block xl:overflow-visible xl:pb-0">
                  {data.items.map((door, index) => {
                    const isActive = activeId === index;
                    return (
                      <motion.div
                        variants={moveUp(0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.2 }}
                        key={index}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveId(index);
                            if (contentRef.current) {
                              scrollTo(contentRef.current, {
                                offset: -100,
                                duration: 1.2,
                              });
                            }
                          }}
                          className={`group relative flex  min-w-fit w-full max-w-[98%] items-center overflow-hidden rounded-full px-4 py-[16px]  text-left transition-all duration-300 xl:w-full xl:rounded-none xl:px-0 cursor-pointer ${activeId === index ? "min-h-[82px] xl:py-0 my-2" : "xl:py-20"}`}
                        >
                          {/* ── Gradient: clipped by button's own border-radius via overflow-hidden ── */}
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-[clip-path] duration-500 ease-out
                            ${isActive
                                ? "[clip-path:inset(0_0%_0_0)]"
                                : "[clip-path:inset(0_100%_0_0)]"
                              }`}
                          />

                          {/* ── Label ── */}
                          <span
                            className={`relative text-19 text-white 2xl:pr-4 tracking-[-0.02em] transition-all duration-300 ${isActive
                                ? "font-light pl-3 3xl:pl-5 leading-[1.2] 3xl:pr-[75px]"
                                : "font-light leading-[1.2]"
                              }`}
                          >
                            {door.title}
                          </span>

                          {/* ── Arrow ── */}
                          <span
                            className={`relative h-5 w-5 xl:w-[50.42px] xl:h-[50.42px] shrink-0 flex items-center justify-center rounded-full bg-white transition-all duration-300 ${isActive
                                ? "opacity-100 translate-x-0 flex"
                                : "opacity-0 -translate-x-3 pointer-events-none hidden"
                              }`}
                          >
                            <Image
                              src="/assets/icons/arrow-right-primary.svg"
                              alt=""
                              aria-hidden="true"
                              width={15}
                              height={15}
                              className="h-2 w-2 md:h-auto md:w-auto"
                            />
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div ref={contentRef} className="pt-40 xl:pl-70 3xl:pl-[86px]">
              <AnimatePresence mode="wait">
                {activeDoor && (
                  <motion.div
                    key={activeDoor.title}
                    variants={moveUp(0.2)}
                    initial="hidden"
                    animate="show"
                    exit={{
                      opacity: 0,
                      y: -24,
                      transition: { duration: 0.25 },
                    }}
                  >
                    <DoorContent door={activeDoor} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* {data.ctaData && (
          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-7.5 md:mt-100 bg-gradient-to-r from-white/2 to-white/20 p-5 md:px-8 md:py-12 lg:px-50 lg:py-50 3xl:px-60 3xl:py-60 "
          >
            <h3 className="text-55 text-white leading-[1.181818181818182] font-light tracking-[-0.02em] mb-25">
              <span className="font-semibold">
                {data.ctaData.title.split("?")[0]}?
              </span>
              {data.ctaData.title.includes("?")
                ? data.ctaData.title.slice(data.ctaData.title.indexOf("?") + 1)
                : ""}
            </h3>
            <p className="text-30 text-white leading-[1.333333333333333] font-light max-w-[80ch] mb-7.5 md:mb-50">
              {data.ctaData.description}
            </p>
            <div className="flex flex-wrap gap-[10px]">
              <BorderButton
                text={data.ctaData.buttonOneTitle}
                href={data.ctaData.buttonOneLink}
                iconColor="white"
                px="px-6"
                className="min-w-[190px] xl:!px-35"
                hoverBg="white"
              />
              <BorderButton
                text={data.ctaData.buttonTwoTitle}
                href={data.ctaData.buttonTwoLink}
                iconColor="white"
                px="px-6"
                className="min-w-[190px] xl:!px-35"
                hoverBg="white"
              />
            </div>
          </motion.div>
        )} */}
      </div>
    </section>
  );
};

export default DiscoverSection;

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryNoise from "@/app/components/common/noise/PrimaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import { moveUpV2 } from "@/app/components/motionVariants";

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

function DoorContent({ door }: { door: DoorItem }) {
  const [imageSrc, setImageSrc] = useState(door.image);

  return (
    <article className="pr-4">
      <h3 className="text-40 lg:text-55 text-white leading-[1.181818181818182] font-light tracking-[-0.02em] mb-40 lg:mb-50">{door.title}</h3>
      <div className="relative w-full aspect-[2.08/1] mb-40 overflow-hidden bg-white/10">
        <Image src={imageSrc} alt={door.title} fill sizes="(min-width: 1280px) 920px, 100vw" className="object-cover" 
        onError={() => setImageSrc("/assets/images/garage-doors/garage-doors.jpg")} />
      </div>
      <p className="w-fit rounded-full border border-white/70 px-6 py-1 xl:py-[10px] xl:px-[29px] text-19 leading-[1.526315789473684] font-extralight text-white mb-30"> {door.idealFor} </p>
      <h4 className="text-30 text-white leading-[1.333333333333333] font-light tracking-[-0.02em] mb-30"> {door.heading} </h4>
      <ul className="space-y-2 xl:space-y-6">
        {door.points.map((point) => (
          <li key={point} className="relative pl-5 text-19 text-white/90 leading-[1.526315789473684] font-light" >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[5px] w-[5px] bg-white" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

const DiscoverSection = ({ data }: DiscoverSectionProps) => {
  const [activeId, setActiveId] = useState(data.doors[0]?.id ?? 0);
  const activeDoor = data.doors.find((door) => door.id === activeId) ?? data.doors[0];

  const handleMenuClick = (id: number) => {
    setActiveId(id);
  };

  return (
    <section className="relative py-100 lg:py-150">
      <PrimaryNoise />
      <div className="container relative z-10">
        <SectionTitle title={data.sectionTitle} className="section-heading text-white max-w-[1290px] mb-50 uppercase" />

        <div className="max-w-[967px] 3xl:mr-[285px] ml-auto">
          <p className="text-24 lg:text-30 text-white leading-[1.333333333333333] font-light tracking-[-0.02em] mb-50">
            {data.sectionDesc}
          </p>
        </div>

        <div className="border-t border-[#76A7FF] pt-40 lg:pt-50">
          <div className="grid grid-cols-1 items-start xl:grid-cols-[400px_minmax(0,1fr)] 3xl:grid-cols-[489px_minmax(0,1fr)]">
            <aside className="xl:sticky xl:top-24 xl:self-start xl:border-r xl:border-[#76A7FF]">
              <div className="pb-8 xl:pb-0 xl:pr-70">
                <nav className="flex gap-3 overflow-x-auto pb-6 xl:block xl:overflow-visible xl:pb-0">
                  {data.doors.map((door) => { const isActive = activeId === door.id;

                    return (
                      <button key={door.id} type="button" onClick={() => handleMenuClick(door.id)}
                        className={`group flex min-w-fit items-center justify-between gap-5 rounded-full px-4 py-3 text-left transition-colors duration-300 xl:mb-[15px] xl:w-full xl:rounded-none xl:px-0 ${
                          isActive ? "bg-gradient-to-r from-transparent from-0% via-51% to-100% via-white/20 to-transparent" : ""
                        }`}
                      >
                        <span className={`text-19 text-white leading-[2.526315789473684] tracking-[-0.02em] transition-colors duration-300 ${
                            isActive ? "font-[500]" : "font-light" }`} >
                          {door.menuTitle}
                        </span>

                        <span
                          className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white transition-all duration-300 xl:flex ${ isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100" }`} >
                          <Image src="/assets/icons/arrow-right-primary.svg" alt="" aria-hidden="true" width={15} height={15} className="h-[15px] 
                          w-[15px]" />
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div className="pt-40 xl:pt-0 xl:pl-70 3xl:pl-[86px]">
              <AnimatePresence mode="wait">
                {activeDoor && (
                  <motion.div key={activeDoor.id} variants={moveUpV2} initial="hidden" animate="show" exit={{ opacity: 0, y: -24, transition: { duration: 0.25 } }} >
                    <DoorContent door={activeDoor} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {data.ctaData && (
          <div className="mt-100 bg-gradient-to-r from-white/2 to-white/20 px-8 py-12 lg:px-50 lg:py-50 3xl:px-[55px] 3xl:py-[52px]">
            <h3 className="text-55 text-white leading-[1.181818181818182] font-light tracking-[-0.02em] mb-25">
              <span className="font-semibold">
                {data.ctaData.title.split("?")[0]}?
              </span>
              {data.ctaData.title.includes("?")
                ? data.ctaData.title.slice(data.ctaData.title.indexOf("?") + 1)
                : ""}
            </h3>

            <p className="text-30 text-white leading-[1.333333333333333] font-light max-w-[70ch] mb-50">
              {data.ctaData.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <BorderButton text={data.ctaData.buttonOneTitle} href={data.ctaData.buttonOneLink} px="px-6" className="min-w-[190px]" />
              <BorderButton text={data.ctaData.buttonTwoTitle} href={data.ctaData.buttonTwoLink} px="px-6" className="min-w-[190px]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverSection;

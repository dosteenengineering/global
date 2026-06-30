"use client";

import SectionTitle from "@/app/components/common/animations/SectionTitle";
import type { ResourceHubTab } from "../data";
import { useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useDownloadGate } from "../sections/DownloadGate";

type TechnicalDocumentsTabProps = {
  tab: ResourceHubTab;
};

type TechnicalDocumentItem = {
  id: number;
  type: string;
  title: string;
  desc: string;
  tags: string[];
  download: string;
};

type TechnicalDocumentItemsByFilter = Record<string, TechnicalDocumentItem[]>;

const getItemsByFilter = (
  items: ResourceHubTab["items"],
): TechnicalDocumentItemsByFilter => {
  return Array.isArray(items)
    ? {}
    : (items as unknown as TechnicalDocumentItemsByFilter);
};

const TechnicalDocumentsTab = ({ tab }: TechnicalDocumentsTabProps) => {
  const { openGate, gateElement } = useDownloadGate();
  const filters = Array.isArray(tab.filters) ? tab.filters : [];
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "ALL");
  const itemsByFilter = getItemsByFilter(tab.items);
  const filteredItems =
    activeFilter === "ALL"
      ? filters
          .filter((filter) => filter !== "ALL")
          .flatMap((filter) => itemsByFilter[filter] ?? [])
      : (itemsByFilter[activeFilter] ?? []);

  return (
    <div className="pt-30 md:pt-70 md:pt-120">
      {/* <h2 className="text-[24px] md:text-55 tracking-[-2%] md:tracking-normal   leading-[1.34] md:leading-[1.1] font-light text-secondary max-w-[30ch] mb-5">
        {tab.title}
      </h2> */}
      <SectionTitle
        title={tab.title}
        className="text-[24px] md:text-55 tracking-[-0.02em] leading-[1.34] md:leading-[1.1] font-light text-secondary max-w-[30ch] mb-5 translate-y-[2px]"
      />

      <div className="flex flex-wrap gap-[10px] mb-50">
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter;

          return (
            <motion.div
              key={filter}
              variants={moveUp(index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={` rounded-full border py-[14px] px-[9px] md:px-25 xl:px-35 text-15 leading-none xl:leading-[1.733333333333333] tracking-[-0.02em] cursor-pointer font-poppins  uppercase transition-all duration-300 ${isActive ? "border-primary bg-primary/10 text-secondary font-normal" : "border-md-gray text-paragraph hover:border-primary hover:text-primary font-light"}`}
              >
                {filter}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-30 gap-y-40">
        {filteredItems.map((item, index) => (
          <ResourceDownloadCard
            key={item.id}
            item={item}
            delay={0.06}
            onDownload={openGate}
          />
        ))}
      </div>
      {gateElement}
    </div>
  );
};

const ResourceDownloadCard = ({
  item,
  delay,
  onDownload,
}: {
  item: TechnicalDocumentItem;
  delay: number;
  onDownload: (url: string, title: string) => void;
}) => {
  const isDwg = item.type.toUpperCase() === "DWG";

  return (
    <motion.article
      variants={moveUp(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="h-[141px] md:h-auto bg-[#F4F4F4] px-2.5 md:px-25 md:px-40 py-[15px] md:py-6 md:py-35 grid grid-cols-[50px_1fr] items-center  sm:grid-cols-[78px_1fr] lg:grid-cols-[101px_1fr] gap-[14px] md:gap-5 xl:gap-10 "
    >
      <div
        className={`w-12.5 sm:w-[78px] lg:w-[101px] h-12.5 sm:h-[78px] lg:h-[101px] flex items-center justify-center text-24 xl:text-30 font-poppins font-[600] 
      ${isDwg ? "bg-[#1E702D1A] text-[#147C39]" : "bg-[#2563EB1A] text-[#2563EB]"}`}
      >
        {item.type}
      </div>

      <div className="flex min-w-0 flex-col gap-y-[5px] md:gap-y-2 xl:gap-y-[15px]">
        <h3 className="text-[18px] md:text-30 leading-[1.56] tracking-[-2%]  md:leading-[1.333333333333333] font-poppins font-light text-secondary line-clamp-2">
          {item.title}
        </h3>
        <p className="text-[12px] md:text-19 leading-[1.67] md:leading-[1.526315789473684] font-poppins font-light text-paragraph line-clamp-1">
          {item.desc}
        </p>
        <div className="mt-[6px] md:mt-auto flex flex-wrap items-center justify-between gap-2 lg:gap-20">
          <div className="flex flex-wrap gap-[5px] md:gap-[10px] ">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/5 px-2.5 min-w-[51px] md:min-w-[82px] md:px-[15.5px] py-[3.5px] md:py-[10px] flex items-center justify-center text-[12px] md:text-[15px] leading-none font-poppins font-normal text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onDownload(item.download, item.title)}
            className="group inline-flex items-center gap-2.5 md:gap-3 xl:gap-20 text-[12px] md:text-[15px] leading-none font-poppins font-light uppercase text-primary cursor-pointer"
          >
            <span className="uppercase font-normal leading-[1.67]">
              Download
            </span>
            <img
              src="/assets/icons/download.svg"
              width={"22px"}
              height={"20px"}
              alt="Download"
              className="object-contain w-[16px] h-auto xl:w-auto xl:h-auto transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default TechnicalDocumentsTab;

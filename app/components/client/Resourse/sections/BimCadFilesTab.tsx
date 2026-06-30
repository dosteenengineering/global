"use client";
import { useState } from "react";
import type { ResourceHubTab } from "../data";
import { Download } from "lucide-react";
import BorderButton from "@/app/components/common/BorderButton";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useDownloadGate } from "../sections/DownloadGate";

type BimCadFilesTabProps = {
  tab: ResourceHubTab;
};

type BimCadFilesItem = {
  id: number;
  type: string;
  title: string;
  desc?: string;
  tags?: string[];
  download: string;
};

type BimCadFilesItemsByFilter = Record<string, BimCadFilesItem[]>;

const getItemsByFilter = (
  items: ResourceHubTab["items"],
): BimCadFilesItemsByFilter => {
  return Array.isArray(items)
    ? {}
    : (items as unknown as BimCadFilesItemsByFilter);
};

const BimCadFilesTab = ({ tab }: BimCadFilesTabProps) => {
  const filters = Array.isArray(tab.filters) ? tab.filters : [];
  const button = "button" in tab ? tab.button : undefined;
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "ALL");
  const itemsByFilter = getItemsByFilter(tab.items);
  const filteredItems =
    activeFilter === "ALL"
      ? filters
          .filter((filter) => filter !== "ALL")
          .flatMap((filter) => itemsByFilter[filter] ?? [])
      : (itemsByFilter[activeFilter] ?? []);

  const { openGate, gateElement } = useDownloadGate();

  return (
    <div className="pt-[30px] md:pt-70 md:pt-100 xl:pt-120">
      <div className="flex justify-between flex-wrap">
        <div>
          {/* <h2 className="text-[24px] md:text-55 tracking-[-2%] md:tracking-normal   leading-[1.34] md:leading-[1.1] font-light text-secondary max-w-[30ch] mb-5">
            {tab.title}
          </h2> */}
          <SectionTitle
            text={tab.title}
            className="text-[24px] md:text-55 tracking-[-0.02em] leading-[1.34] md:leading-[1.1] font-light text-secondary !max-w-[30ch] mb-5 translate-y-[2px]"
          />

          {button && (
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              animate="show"
              viewport={{ once: false }}
            >
              <BorderButton
                text={button.text}
                href={button.link}
                borderColor="black"
                textColor="black"
                hoverBg="black"
                className="mb-50 w-fit lg:hidden px-[29px]"
              />
            </motion.div>
          )}
          {/* <p className="pt-2.5 md:pt-0 text-16 md:text-19 leading-[1.526315789473684] font-poppins font-light text-paragraph mb-40 max-w-[88ch]">
            {tab.description}
          </p> */}
          <SectionDescription
            text={tab.description}
            className="pt-2.5 md:pt-0 text-16 md:text-19 leading-[1.526315789473684] font-poppins font-light text-paragraph mb-40 max-w-[88ch]"
          />
        </div>
        <div className="hidden lg:block">
          {button && (
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              animate="show"
              viewport={{ once: false }}
            >
              <BorderButton
                text={button.text}
                href={button.link}
                borderColor="black"
                textColor="black"
                hoverBg="black"
                className="mb-50 w-fit "
              />
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-[10px] mb-7.5 md:mb-40">
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter;

          return (
            <motion.div
              variants={moveUp(0.4 + index * 0.1)}
              initial="hidden"
              animate="show"
              viewport={{ once: false }}
            >
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`h-7.5 md:h-50 rounded-full border px-[9px] md:px-25 2xl:px-[35px] text-15 leading-[1] tracking-[-2%] md:tracking-normal cursor-pointer font-poppins font-light uppercase transition-all duration-300 ${isActive ? "border-primary bg-primary/10 text-secondary" : "border-md-gray text-paragraph hover:border-primary hover:text-primary"}`}
              >
                {filter}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">
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
  item: BimCadFilesItem;
  delay: number;
  onDownload: (fileUrl: string, fileName: string) => void;
}) => {
  const isDwg = item.type.toUpperCase() === "DWG";
  const tags = item.tags ?? [];

  return (
    <motion.article
      variants={moveUp(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="h-[116px] md:h-auto  bg-[#F4F4F4] px-2.5 md:px-25 md:px-40 py-[15px] md:py-6 md:py-35 grid grid-cols-[50px_1fr] items-center  sm:grid-cols-[78px_1fr] lg:grid-cols-[101px_1fr] gap-[14px] md:gap-5 xl:gap-10 "
    >
      <div
        className={`w-12.5 sm:w-[78px] lg:w-[101px] h-12.5 sm:h-[78px] lg:h-[101px] flex items-center justify-center text-30 font-poppins font-[600] 
      ${isDwg ? "bg-[#1E702D1A] text-[#147C39]" : "bg-[#2563EB1A] text-[#2563EB]"}`}
      >
        {item.type}
      </div>

      <div className="flex min-w-0 flex-col 3xl:flex-row 3xl:items-end gap-2.5 md:gap-5">
        <h3 className="text-[18px] md:text-30 leading-[1.56] tracking-[-2%]   md:leading-[1.333333333333333] font-poppins font-light text-secondary line-clamp-2">
          {item.title}
        </h3>
        <div className="md:ml-auto w-fitt flex flex-wrap items-center justify-between gap-20">
          {/* <a href={item.download} className="group inline-flex items-center gap-2.5 md:gap-5 text-[12px] md:text-[15px] leading-none font-poppins font-light uppercase text-primary" >
            <span className="uppercase font-normal md:font-[300] leading-[1.67]">Download</span>
            <Download className="w-[16px] h-[15px] lg:w-[22px] lg:h-[20px]  transition-transform duration-300 group-hover:translate-y-1" strokeWidth={1.8} />

          </a> */}

          <button
            type="button"
            onClick={() => onDownload(item.download, item.title)}
            className="group inline-flex items-center gap-2.5 md:gap-5 text-[12px] md:text-[15px] leading-none font-poppins font-light uppercase text-primary cursor-pointer"
          >
            <span className="uppercase font-normal md:font-[300] leading-[1.67]">
              Download
            </span>
            <Download
              className="w-[16px] h-[15px] lg:w-[22px] lg:h-[20px] transition-transform duration-300 group-hover:translate-y-1"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default BimCadFilesTab;

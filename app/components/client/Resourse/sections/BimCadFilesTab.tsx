"use client";
import { useState } from "react";
import type { ResourceHubTab } from "../data";
import { Download } from "lucide-react";
import BorderButton from "@/app/components/common/BorderButton";
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

const getItemsByFilter = (items: ResourceHubTab["items"]): BimCadFilesItemsByFilter => {
  return Array.isArray(items) ? {} : (items as unknown as BimCadFilesItemsByFilter);
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
      : itemsByFilter[activeFilter] ?? [];
  return (
    <div className="pt-70 md:pt-100">
      <div className="flex justify-between">
        <div>
          <h2 className="text-[38px] md:text-55 leading-[1.1] font-light text-secondary max-w-[30ch] mb-5">
            {tab.title}
          </h2>
          <p className="text-16 md:text-19 leading-[1.526315789473684] font-poppins font-light text-paragraph mb-40 max-w-[88ch]">
            {tab.description}
          </p>
        </div>
        {button && (
          <BorderButton
            text={button.text}
            href={button.link}
            borderColor="black"
            textColor="black"
            hoverBg="black"
            className="mb-50 w-fit"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-[10px] mb-40">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)}
              className={`h-50 rounded-full border px-25 text-15 leading-[1] cursor-pointer font-poppins font-light uppercase transition-all duration-300 ${isActive ? "border-primary bg-primary/10 text-secondary" : "border-paragraph/60 text-paragraph hover:border-primary hover:text-primary"}`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">
        {filteredItems.map((item) => (
          <ResourceDownloadCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const ResourceDownloadCard = ({ item }: { item: BimCadFilesItem }) => {
  const isDwg = item.type.toUpperCase() === "DWG";
  const tags = item.tags ?? [];

  return (
    <article className="bg-[#F4F4F4] px-25 md:px-40 py-6 md:py-35 grid grid-cols-[78px_1fr] gap-5 xl:gap-10 ">
      <div className={`w-[78px] h-[78px] flex items-center justify-center text-24 font-poppins font-[600] 
      ${isDwg ? "bg-[#E3EFE8] text-[#147C39]" : "bg-[#E6EBFF] text-primary"}`}
      >
        {item.type}
      </div>

      <div className="flex min-w-0 gap-x-2 gap-y-3">
        <h3 className="text-24 md:text-30 leading-[1.333333333333333] font-poppins font-light text-secondary max-w-[25ch]">{item.title}</h3>
        <div className="ml-auto w-fitt flex flex-wrap items-center justify-between gap-20">
          <a href={item.download} className="group inline-flex items-center gap-3 text-13 leading-none font-poppins font-light uppercase text-primary" >
            <span className="uppercase">Download</span>
            <Download className=" transition-transform duration-300 group-hover:translate-y-1" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default BimCadFilesTab;

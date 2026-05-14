"use client";

import type { ResourceHubTab } from "../data";
import { Download } from "lucide-react";
import { useState } from "react";

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

const getItemsByFilter = (items: ResourceHubTab["items"]): TechnicalDocumentItemsByFilter => {
  return Array.isArray(items) ? {} : (items as unknown as TechnicalDocumentItemsByFilter);
};

const TechnicalDocumentsTab = ({ tab }: TechnicalDocumentsTabProps) => {
  const filters = Array.isArray(tab.filters) ? tab.filters : [];
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
      <h2 className="text-[38px] md:text-55 leading-[1.1] font-light text-secondary max-w-[30ch] mb-5">
        {tab.title}
      </h2>

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

const ResourceDownloadCard = ({ item }: { item: TechnicalDocumentItem }) => {
  const isDwg = item.type.toUpperCase() === "DWG";

  return (
    <article className="bg-[#F4F4F4] px-25 md:px-40 py-6 md:py-35 grid grid-cols-[78px_1fr] gap-5 xl:gap-10 min-h-[190px]">
      <div className={`w-[78px] h-[78px] flex items-center justify-center text-24 font-poppins font-[600] 
      ${ isDwg ? "bg-[#E3EFE8] text-[#147C39]" : "bg-[#E6EBFF] text-primary" }`}
      >
        {item.type}
      </div>

      <div className="flex min-w-0 flex-col gap-y-2 xl:gap-y-[15px]">
        <h3 className="text-24 md:text-30 leading-[1.333333333333333] font-poppins font-light text-secondary">{item.title}</h3>
        <p className="text-16 md:text-19 leading-[1.526315789473684] font-poppins font-light text-paragraph">{item.desc}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-20">
          <div className="flex flex-wrap gap-[10px]">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/5 px-[27.5px] py-[10px] flex items-center justify-center text-13 leading-none font-poppins font-light text-secondary" >
                {tag}
              </span>
            ))}
          </div>

          <a href={item.download} className="group inline-flex items-center gap-3 text-13 leading-none font-poppins font-light uppercase text-primary" >
            <span className="uppercase">Download</span>
            <Download className=" transition-transform duration-300 group-hover:translate-y-1" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default TechnicalDocumentsTab;

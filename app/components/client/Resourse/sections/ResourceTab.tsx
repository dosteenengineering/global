"use client";

import SectionTitle from "@/app/components/common/animations/SectionTitle";
import type { ResourceHubData, ResourceHubTab } from "../data";
import BimCadFilesTab from "./BimCadFilesTab";
import BrochuresCataloguesTab from "./BrochuresCataloguesTab";
import CertificationsComplianceTab from "./CertificationsComplianceTab";
import InstallationMaintenanceTab from "./InstallationMaintenanceTab";
import TechnicalDocumentsTab from "./TechnicalDocumentsTab";
import VideosDemosTab from "./VideosDemosTab";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ResourseTabProps {
  data: ResourceHubData;
}

const ResourseTab = ({ data }: ResourseTabProps) => {
  const [activeTab, setActiveTab] = useState(data.tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabsScrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
      const activeButton = buttonRefs.current[activeIndex];

      if (!activeButton) return;

      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab, data.tabs]);

  const currentTab = data.tabs.find((tab) => tab.id === activeTab) ?? data.tabs[0];

  const handleTabChange = (tab: ResourceHubTab) => {
    setActiveTab(tab.id);
  };

  useLayoutEffect(() => {
    const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
    const activeButton = buttonRefs.current[activeIndex];

    activeButton?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab, data.tabs]);

  const slideTabs = (direction: "prev" | "next") => {
    const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, data.tabs.length - 1)
        : Math.max(activeIndex - 1, 0);

    setActiveTab(data.tabs[nextIndex].id);
  };

  const renderTabContent = (tab: ResourceHubTab) => {
    switch (tab.id) {
      case "technical-documents":
        return <TechnicalDocumentsTab tab={tab} />;
      case "bim-cad-files":
        return <BimCadFilesTab tab={tab} />;
      case "videos-demos":
        return <VideosDemosTab tab={tab} />;
      case "brochures-catalogues":
        return <BrochuresCataloguesTab tab={tab} />;
      case "certifications-compliance":
        return <CertificationsComplianceTab tab={tab} />;
      case "installation-maintenance":
        return <InstallationMaintenanceTab tab={tab} />;
      default:
        return null;
    }
  };

  return (
    <section className="pt-120 pb-200 overflow-hidden">
      <div className="container">
        <div className="mb-50">
          <SectionTitle title={data.sectionTitle} className="section-heading max-w-[1290px] mb-5 uppercase" />
          <p className="text-description text-paragraph max-w-[75ch] font-light mb-50">{data.sectionDesc}</p>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous resource tabs"
            onClick={() => slideTabs("prev")}
            className="absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-bdr-gray bg-white text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary 3xl:hidden"
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>

          <div
            ref={tabsScrollerRef}
            className="overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={tabsContainerRef}
              className="relative flex min-w-max snap-x snap-mandatory items-center gap-5 px-10 sm:px-11 xl:gap-10 2xl:gap-[40px] 3xl:w-full 3xl:min-w-0 3xl:justify-between 3xl:px-0"
            >
              {data.tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} ref={(el) => { buttonRefs.current[index] = el; }} type="button" onClick={() => handleTabChange(tab)}
                    className="flex shrink-0 snap-center items-center gap-2 pb-20 text-left transition-colors duration-300"
                  >
                    <Image
                      src={tab.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 shrink-0 object-contain"
                    />
                    <span className={`text-19 leading-[1.526315789473684] text-secondary font-poppins transition-all duration-300 
                      ${isActive ? "font-medium " : "font-light"}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}

              <div className="absolute left-0 right-0 bottom-0 h-px bg-bdr-gray" />
              <div className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300" style={{ width: indicatorStyle.width, left: indicatorStyle.left }} />
            </div>
          </div>

          <button
            type="button"
            aria-label="Next resource tabs"
            onClick={() => slideTabs("next")}
            className="absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-bdr-gray bg-white text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary 3xl:hidden"
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>
        </div>

        {renderTabContent(currentTab)}
      </div>
    </section>
  );
};

export default ResourseTab;

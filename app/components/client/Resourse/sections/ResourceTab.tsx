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

interface ResourseTabProps {
  data: ResourceHubData;
}

const ResourseTab = ({ data }: ResourseTabProps) => {
  const [activeTab, setActiveTab] = useState(data.tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
      const activeButton = buttonRefs.current[activeIndex];
      const container = tabsContainerRef.current;

      if (!activeButton || !container) return;

      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: buttonRect.left - containerRect.left,
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

        <div ref={tabsContainerRef} className="relative">
          <div className="flex items-center 3xl:justify-between gap-5 xl:gap-10 2xl:gap-[40px] overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} ref={(el) => { buttonRefs.current[index] = el; }} type="button" onClick={() => handleTabChange(tab)}
                  className="shrink-0 flex items-center gap-2 pb-20 text-left transition-colors duration-300"
                >
                  <Image
                    src={tab.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 object-contain"
                  />
                  <span className={`text-19 leading-[1.526315789473684] text-secondary font-poppins transition-all duration-300 
                    ${isActive ? "font-medium " : "font-light" }`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-bdr-gray" />
          <div className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300" style={{ width: indicatorStyle.width, left: indicatorStyle.left }} />
        </div>

        {renderTabContent(currentTab)}
      </div>
    </section>
  );
};

export default ResourseTab;

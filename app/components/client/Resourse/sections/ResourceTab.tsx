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
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { motion } from "framer-motion";
import { fadeIn, moveDown, moveUp } from "@/app/components/motionVariants";

interface ResourseTabProps {
  data: ResourceHubData;
}

const ResourseTab = ({ data }: ResourseTabProps) => {
  const [activeTab, setActiveTab] = useState(data.tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabsScrollerRef = useRef<HTMLDivElement>(null);

  const activeTabData = data.tabs.find((tab) => tab.id === activeTab) ?? data.tabs[0];

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

  useLayoutEffect(() => {
    const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
    const activeButton = buttonRefs.current[activeIndex];
    activeButton?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab, data.tabs]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (tab: ResourceHubTab) => {
    setActiveTab(tab.id);
    setIsDropdownOpen(false);
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
    <section className="pt-[70px] md:pt-120 pb-200 overflow-hidden">
      <div className="container">
        <div className="mb-50">
          <SectionTitle
            title={data.sectionTitle}
            className="section-heading max-w-[1290px] mb-5 uppercase"
          />
          {/* <p className="text-description text-paragraph max-w-[75ch] font-light mb-50">
            {data.sectionDesc}
          </p> */}
          <SectionDescription text={data.sectionDesc} className="text-description text-paragraph max-w-[75ch] font-light mb-50" />
        </div>

        {/* ── Mobile: Custom Select ── */}
        <div ref={dropdownRef} className="relative md:hidden mb-50">
          {/* Trigger */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 border-y border-bdr-gray    py-[15px] bg-white text-secondary transition-colors duration-200 focus:outline-none focus:border-primary"
          >
            <div className="flex items-center gap-[10px]">
              <Image
                src={activeTabData.icon}
                alt=""
                width={24}
                height={24}
                className="w-[32px] h-[32px] md:h-6 md:w-6 shrink-0 object-contain"
              />
              <span className="text-[18px] md:text-15 font-poppins font-medium text-secondary">
                {activeTabData.label}
              </span>
            </div>

            <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}>
              <path d="M15.9858 0.5L8.22743 8.10624L0.5 0.525901" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </button>

          {/* Dropdown list */}
          {isDropdownOpen && (
            <div className="dropdown-animate [animation:var(--animate-dropdown-in)] absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-bdr-gray rounded-[8px] shadow-lg overflow-hidden">
              {data.tabs.map((tab, idx) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    style={{ animationDelay: `${idx * 30}ms` }}
                    className={`[animation:var(--animate-item-in)] w-full flex items-center gap-[10px] px-[16px] py-[12px] text-left transition-colors duration-200 border-b border-bdr-gray last:border-b-0 opacity-0 animate-[item-in_0.2s_cubic-bezier(0.25,1,0.5,1)_forwards] ${isActive
                      ? "bg-primary/5 text-primary"
                      : "bg-white text-secondary hover:bg-gray-50"
                      }`}
                  >
                    <Image
                      src={tab.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 shrink-0 object-contain"
                    />
                    <span className={`text-15 font-poppins ${isActive ? "font-medium" : "font-light"}`}>
                      {tab.label}
                    </span>
                    {isActive && (
                      <span className="ml-auto w-[4px] h-[18px] rounded-full bg-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Desktop: Scroll tabs ── */}
        <div className="relative hidden md:block">
          <button
            type="button"
            aria-label="Previous resource tabs"
            onClick={() => {
              const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
              const prevIndex = Math.max(activeIndex - 1, 0);
              setActiveTab(data.tabs[prevIndex].id);
            }}
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
                  <motion.div variants={fadeIn(0.12*index)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} key={tab.id}>
                  <button
                    ref={(el) => { buttonRefs.current[index] = el; }}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className="flex shrink-0 snap-center items-center gap-2 pb-20 text-left transition-colors duration-300"
                  >
                    <Image
                      src={tab.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 shrink-0 object-contain"
                    />
                    <span
                      className={`text-19 leading-[1.526315789473684] text-secondary font-poppins transition-all duration-300 ${isActive ? "font-medium" : "font-light"
                        }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                  </motion.div>
                );
              })}

              <div className="absolute left-0 right-0 bottom-0 h-px bg-bdr-gray" />
              <div
                className="absolute bottom-0 h-[4px] bg-primary transition-all duration-300"
                style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Next resource tabs"
            onClick={() => {
              const activeIndex = data.tabs.findIndex((tab) => tab.id === activeTab);
              const nextIndex = Math.min(activeIndex + 1, data.tabs.length - 1);
              setActiveTab(data.tabs[nextIndex].id);
            }}
            className="absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-bdr-gray bg-white text-secondary shadow-sm transition-colors hover:border-primary hover:text-primary 3xl:hidden"
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>
        </div>

        {renderTabContent(activeTabData)}
      </div>
    </section>
  );
};

export default ResourseTab;
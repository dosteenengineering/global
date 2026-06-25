"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { projectsData, Project } from "../data";
import ProjectEvenRowCard from "./ProjectEvenRowCard";
import Pagination from "@/app/components/common/Pagination";
import Image from "next/image";
import ProjectCard from "@/app/components/common/ProjectCard";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";
import { statusData } from "@/app/components/AdminProject/statusData";
import { Project } from "../data";

const ITEMS_PER_PAGE = 11;
const ALL_FILTER = "All";

const getUniqueOptions = (values: string[]) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

type FilterDropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const displayValue = value === ALL_FILTER ? label : value;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-fit">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-[10px] bg-transparent text-description text-paragraph outline-none cursor-pointer tracking-[-0.02em]"
        aria-expanded={open}
        aria-label={`Filter by ${label.toLowerCase()}`}
      >
        <span>{displayValue}</span>
        <Image
          src="/assets/icons/drop-down-primary-small-thick.svg"
          alt=""
          width={15}
          height={9}
          className={`transition-transform duration-300 w-auto h-auto ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 min-w-full overflow-hidden rounded-[8px] border border-bdr-gray bg-white shadow-lg">
          {options.map((option) => {
            const isActive = option === value;
            const optionLabel = option === ALL_FILTER ? label : option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-4 py-2 text-left text-description transition-colors duration-200 ${
                  isActive
                    ? "bg-primary/5 text-primary font-semibold"
                    : "text-paragraph hover:bg-bdr-gray/30 hover:text-secondary"
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProjectsListing({data}:{data:Project[]}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || ALL_FILTER;
  const activeLocation = searchParams.get("location") || ALL_FILTER;
  const activeStatus = searchParams.get("status") || ALL_FILTER;
  const projectsHeading =
    activeCategory === ALL_FILTER ? "All Projects" : `${activeCategory} Projects`;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const pageParam = Number(searchParams.get("page") || 1);
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const categories = useMemo(
    () => [
      ALL_FILTER,
      ...getUniqueOptions(data.map((project) => project.firstSection.sector.name)),
    ],
    [],
  );
  const locations = useMemo(
    () => [
      ALL_FILTER,
      ...getUniqueOptions(data.map((project) => project.firstSection.location.name)),
    ],
    [],
  );
  const statuses = useMemo(
    () => [
      ALL_FILTER,
      ...getUniqueOptions(statusData.map((project) => project.name)),
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    return data.filter((project) => {
      const categoryMatches =
        activeCategory === ALL_FILTER || project.firstSection.sector.name === activeCategory;
      const locationMatches =
        activeLocation === ALL_FILTER || project.firstSection.location.name === activeLocation;
      const statusMatches =
        activeStatus === ALL_FILTER || project.firstSection.status === activeStatus;

      return categoryMatches && locationMatches && statusMatches;
    });
  }, [activeCategory, activeLocation, activeStatus]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);

  const updateFilter = (
    key: "category" | "location" | "status",
    value: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === ALL_FILTER) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setIsFilterOpen(true);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("location");
    params.delete("status");
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
    setIsFilterOpen(false);
  };

  const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const pageProjects = filteredProjects.slice(start, start + ITEMS_PER_PAGE);

  const rows: { type: "grid" | "featured"; projects: Project[] }[] = [];
  let idx = 0;
  let rowIndex = 0;

  while (idx < pageProjects.length) {
    if (rowIndex % 2 === 0) {
      rows.push({ type: "grid", projects: pageProjects.slice(idx, idx + 3) });
      idx += 3;
    } else if (idx < pageProjects.length) {
      rows.push({ type: "featured", projects: [pageProjects[idx]] });
      idx += 1;
    }

    rowIndex++;
  }

  return (
    <section className="container pt-17.5 md:pt-120 pb-140 3xl:pb-200">
      <div className="relative z-50 flex flex-col mb-7.5 md:mb-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-30 3xl:gap-[36px] mb-5 md:mb-0">
            <span className="text-secondary md:text-paragraph text-55 leading-[1.1818] md:leading-[1.1818] font-light tracking-[-0.02em]">
              {projectsHeading}
            </span>
            <span className="text-primary text-55 leading-[1.1818] md:leading-[1.1818] font-light tracking-[-0.02em]">
              {filteredProjects.length}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFilter}
            className="flex items-center justify-between md:justify-start gap-4 border-y md:border-y-0 border-bdr-gray py-2.5 md:py-0 cursor-pointer group"
            aria-expanded={isFilterOpen}
          >
            <span className="text-secondary md:text-paragraph text-[18px] md:text-55 leading-[1.56] md:leading-[1.1818] font-light tracking-[-0.02em]">
              Filter
            </span>
            <Image src="/assets/icons/filterPlus.svg" alt="filter" width={50} height={50}
              className="w-5 h-5 lg:w-[38px] lg:h-[38px] group-hover:rotate-45 group-active:rotate-45 transition-transform duration-300"
            />
          </button>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${
            isFilterOpen
              ? "max-h-[260px] opacity-100 mt-7.5 md:mt-50 3xl:mt-80 overflow-visible"
              : "max-h-0 opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div
            className={`flex flex-col gap-7.5 lg:flex-row flex-wrap lg:justify-between transition-transform duration-500 ease-in-out 3xl:max-w-[1474px] ${
              isFilterOpen ? "translate-y-0" : "-translate-y-3"
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-x-5 3xl:gap-x-[26px]">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateFilter("category", category)}
                    className={`text-19 text-paragraph transition-colors duration-200 tracking-[-0.02em]  cursor-pointer ${
                      isActive
                        ? "font-bold"
                        : "hover:text-secondary"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-x-10 gap-y-5 md:gap-x-70 md:gap-y-5 3xl:gap-x-[150px] xl:gap-y-0">
              <FilterDropdown
                label="Location"
                options={locations}
                value={activeLocation}
                onChange={(value) => updateFilter("location", value)}
              />

              <FilterDropdown
                label="Status"
                options={statuses}
                value={activeStatus}
                onChange={(value) => updateFilter("status", value)}
              />
            </div>
          </div>
        </div>
      </div>

      {pageProjects.length > 0 ? (
        <div className="relative z-0 flex flex-col gap-100">
          {rows.map((row, ri) =>
            row.type === "grid" ? (
              <div
                key={`grid-${ri}`}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-y-0 gap-x-30"
              >
                {row.projects.map((p, i) => (
                  <Reveal key={i} variants={moveUpV2} delayRange={i * 0.12}>
                    <ProjectCard project={p} variant="dark" />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div key={`featured-${ri}`} className="w-full">
                <div className="lg:hidden grid grid-cols-1 gap-x-30">
                  <Reveal key={ri} variants={moveUpV2} delayRange={ri * 0.12}>
                    <ProjectCard project={row.projects[0]} variant="dark" />
                  </Reveal>
                </div>
                <div className="hidden lg:block">
                  <Reveal key={ri} variants={moveUpV2} delayRange={ri * 0.12}>
                    <ProjectEvenRowCard project={row.projects[0]} />
                  </Reveal>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="border-y border-bdr-gray py-10 md:py-60">
          <h3 className="text-secondary text-55 leading-[1.1818] font-light tracking-[-0.02em]">
            No projects found
          </h3>
          <p className="mt-2.5 text-description text-paragraph">
            Try changing the category, location, or status filter.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-120 w-full flex items-center justify-center">
          <Pagination currentPage={safeCurrentPage} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}

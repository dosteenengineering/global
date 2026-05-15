"use client";

import { useSearchParams } from "next/navigation";
import { projectsData, Project } from "../data";
import ProjectEvenRowCard from "./ProjectEvenRowCard";
import Pagination from "@/app/components/common/Pagination";
import Image from "next/image";
import ProjectCard from "@/app/components/common/ProjectCard";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";

const ITEMS_PER_PAGE = 11;

export default function ProjectsListing() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProjects = projectsData.slice(start, start + ITEMS_PER_PAGE);

  // Build rows: odd rows = grid (up to 3), even rows = featured (1)
  const rows: { type: "grid" | "featured"; projects: Project[] }[] = [];
  let idx = 0;
  let rowIndex = 0;

  while (idx < pageProjects.length) {
    if (rowIndex % 2 === 0) {
      // Odd row → grid, take up to 3
      rows.push({ type: "grid", projects: pageProjects.slice(idx, idx + 3) });
      idx += 3;
    } else {
      // Even row → featured single — only if ≥1 item remains
      if (idx < pageProjects.length) {
        rows.push({ type: "featured", projects: [pageProjects[idx]] });
        idx += 1;
      }
    }
    rowIndex++;
  }

  return (
    <section className="container pt-17.5 md:pt-120 pb-140 3xl:pb-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-80">
        <div className="flex items-center gap-2.5 md:gap-30 3xl:gap-[36px] mb-5 md:mb-0">
          <span className="text-secondary md:text-paragraph text-55 leading-[1.1818] md:leading-[1.1818] font-light tracking-[-0.02em]">
            All Projects
          </span>
          <span className="text-primary text-55 leading-[1.1818] md:leading-[1.1818] font-light tracking-[-0.02em]">
            {projectsData.length}
          </span>
        </div>
        <button className="flex items-center justify-between md:justify-start gap-4 border-y md:border-y-0 border-bdr-gray  py-2.5 md:py-0">
          <span className="text-secondary md:text-paragraph text-[18px] md:text-55 leading-[1.56] md:leading-[1.1818] font-light tracking-[-0.02em]">
            Filter
          </span>
          <Image
            src="/assets/icons/filterPlus.svg"
            alt="filter"
            width={50}
            height={50}
            className="w-5 h-5 lg:w-[38px] lg:h-[38px]"
          />
        </button>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-100">
        {rows.map((row, ri) =>
          row.type === "grid" ? (
            <div
              key={`grid-${ri}`}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-30"
            >
              {row.projects.map((p, i) => (
                <Reveal key={i} variants={moveUpV2} delayRange={i * 0.12}>
                  <ProjectCard project={p} variant="dark" />
                </Reveal>
              ))}
            </div>
          ) : (
            // Featured row: hidden below lg, shows as grid card instead
            <div key={`featured-${ri}`} className="w-full">
              {/* Below lg → render as a normal grid card in a 1-col grid */}
              <div className="lg:hidden grid grid-cols-1 gap-x-30">
                <Reveal key={ri} variants={moveUpV2} delayRange={ri * 0.12}>
                  <ProjectCard project={row.projects[0]} variant="dark" />
                </Reveal>
              </div>
              {/* lg+ → full featured layout */}
              <div className="hidden lg:block">
                <Reveal key={ri} variants={moveUpV2} delayRange={ri * 0.12}>
                  <ProjectEvenRowCard project={row.projects[0]} />
                </Reveal>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="mt-120 w-full flex items-center justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
}

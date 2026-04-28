"use client";

import { useSearchParams } from "next/navigation";
import { projectsData, Project } from "../data";
import GridCard from "./ProjectGridCard";
import ProjectEvenRowCard from "./ProjectEvenRowCard";
import Pagination from "@/app/components/common/Pagination";
import Image from "next/image";

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
    <section className="container pt-120 pb-140 3xl:pb-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-80">
        <div className="flex items-center gap-30 3xl:gap-[36px]">
          <span className="text-paragraph text-55 leading-[1.1818] font-light tracking-[-0.02em]">
            All Projects
          </span>
          <span className="text-primary text-55 leading-[1.1818] font-light tracking-[-0.02em]">
            {projectsData.length}
          </span>
        </div>
        <button className="flex items-center gap-4">
          <span className="text-paragraph text-55 leading-[1.1818] font-light tracking-[-0.02em]">
            Filter
          </span>
          <Image
            src="/assets/icons/filterPlus.svg"
            alt="filter"
            width={50}
            height={50}
            className="w-[38px] h-[38px]"
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
                <GridCard key={i} project={p} />
              ))}
            </div>
          ) : (
            // Featured row: hidden below lg, shows as grid card instead
            <div key={`featured-${ri}`} className="w-full">
              {/* Below lg → render as a normal grid card in a 1-col grid */}
              <div className="lg:hidden grid grid-cols-1 gap-x-30">
                <GridCard project={row.projects[0]} />
              </div>
              {/* lg+ → full featured layout */}
              <div className="hidden lg:block">
                <ProjectEvenRowCard project={row.projects[0]} />
              </div>
            </div>
          ),
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}

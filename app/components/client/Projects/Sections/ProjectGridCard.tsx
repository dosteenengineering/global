import { Project } from "../data";
import Image from "next/image";
import Link from "next/link";

// ── Grid Card (odd rows — 3-col grid) ──────────────────────────────────────
export default function GridCard({ project }: { project: Project }) {
  return (
    <Link href={`#`} className="group block">
      {/* Image */}
      <div className="relative w-full aspect-4/4 max-h-[540px] overflow-hidden mb-30 3xl:mb-[32px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover gradient overlay + arrow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-40 right-40 -translate-x-30 translate-y-30 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {/* <ArrowIcon className="text-white w-6 h-6" /> */}
          <Image
            src="/assets/icons/arrow-right-top-71.svg"
            alt="Arrow"
            width={80}
            height={80}
            className="w-auto h-[60px] 3xl:w-[71px] 3xl:h-[71px]"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-secondary text-30 font-light tracking-[-0.02em] leading-[1.333] mb-[15px]">
        {project.title}
      </h3>

      {/* Location + Category */}
      <div className="flex items-center justify-between mb-[15px] pr-70 3xl:pr-[73px]">
        <div className="flex items-center gap-[10px] text-description text-paragraph">
          <Image
            src="/assets/icons/location-pin-gray.svg"
            alt="location"
            width={20}
            height={20}
            className="object-contain w-[11px] h-[14px]"
          />
          {project.location}
        </div>
        <span className="text-description text-paragraph">
          {project.category}
        </span>
      </div>

      {/* Divider */}
      <div className="relative w-full h-[2px] bg-[#c2c2c2] overflow-hidden">
        <span className="absolute left-0 top-0 h-full w-full bg-primary scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>
    </Link>
  );
}

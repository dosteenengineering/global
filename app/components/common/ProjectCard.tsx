import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    title: string;
    location: string;
    category: string;
    image: string;
  };
  variant?: "dark" | "light";
}

export default function ProjectCard({
  project,
  variant = "light",
}: ProjectCardProps) {
  const isDark = variant === "dark";

  return (
    <Link href={`/projects/${project.title.toLowerCase().replace(" ", "-")}`}>
      <div className="flex flex-col group cursor-pointer">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden mb-30 3xl:mb-[32px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Arrow */}
          <div className="absolute top-40 right-40 -translate-x-30 translate-y-30 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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
        <h3
          className={`text-30 font-light tracking-[-0.02em] leading-[1.333] mb-[15px] ${
            isDark ? "text-secondary" : "text-white"
          }`}
        >
          {project.title}
        </h3>
        {/* Location + Category */}
        <div
          className={`flex items-center justify-between mb-[15px] pr-70 3xl:pr-80 ${
            isDark ? "text-paragraph" : "text-white font-light"
          }`}
        >
          <div className="flex items-center gap-[10px]">
            <Image
              src={
                isDark
                  ? "/assets/icons/location-pin-gray.svg"
                  : "/assets/icons/location-pin.svg"
              }
              alt="location"
              width={20}
              height={20}
              className="object-contain w-[11px] h-[14px] -mt-1"
            />
            <span className="text-description">{project.location}</span>
          </div>
          <span className="text-description">{project.category}</span>
        </div>
        {/* Divider */}
        {isDark ? (
          // Animated fill on hover
          <div className="relative w-full h-[2px] bg-[#c2c2c2] overflow-hidden">
            <span className="absolute left-0 top-0 h-full w-full bg-primary scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        ) : (
          // Animated fill on hover
          <div className="relative w-full h-[2px] bg-[#c2c2c2] overflow-hidden">
            <span className="absolute left-0 top-0 h-full w-full bg-white scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        )}
      </div>
    </Link>
  );
}

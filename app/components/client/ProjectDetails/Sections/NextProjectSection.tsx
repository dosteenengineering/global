import Link from "next/link";
import { Project } from "../data";
import Image from "next/image";


export default function NextProjectPanel({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.title.toLowerCase().replace(" ", "-")}`}
      className="group"
    >
      <div className="relative w-[150px] 3xl:w-[176px] h-[110px] 3xl:h-[128px] overflow-hidden">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover w-[176px] h-[128px] transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* "Next" label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-description text-white">
          <span>
            Next
          </span>
        </div>
      </div>
    </Link>
  );
}
import { Project } from "../data";
import Image from "next/image";
import Link from "next/link";

export default function ProjectEvenRowCard({ project }: { project: Project }) {
  return (
    <Link href={`#`} className="group flex items-stretch w-full">
      {/* Left: text content */}
      <div className="flex flex-col justify-between pt-100 flex-1 min-w-0">
        <div>
          {/* Title */}
          <h2 className="text-secondary text-55 leading-[1.18181] tracking-[-0.02em] font-light mb-[15px]">
            {project.title}
          </h2>

          {/* Location + Category */}
          <div className="flex items-center gap-80 3xl:gap-[86px] mb-150 pr-70 3xl:pr-[73px]">
            <div className="flex items-center gap-[10px] text-description text-paragraph">
              <Image
                src="/assets/icons/location-pin-gray.svg"
                alt="location"
                width={20}
                height={20}
                className="object-contain w-[11px] h-[14px] -mt-1"
              />
              {project.location}
            </div>
            <span className="text-description text-paragraph">
              {project.category}
            </span>
          </div>

          {/* Scopes */}
          <div>
            <p className="text-secondary font-light text-30 leading-[1.333] mb-20">
              Scope
            </p>
            <ul className="space-y-1.5">
              {project.scopes.map((scope, i) => (
                <li
                  key={i}
                  className="flex items-start gap-[10px] text-description text-paragraph"
                >
                  <span className="mt-[10px] w-[5px] h-[5px] shrink-0 bg-primary" />
                  {scope}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Arrow icon — translates on card hover */}
        <div className="mt-10">
          <Image
            src="/assets/icons/arrow-right-top-71-primary.svg"
            alt="Arrow"
            width={80}
            height={80}
            className="w-auto h-[60px] 3xl:w-[71px] 3xl:h-[71px] translate-x-0 translate-y-0 group-hover:translate-x-30 group-hover:-translate-y-30 transition-all duration-400"
          />
        </div>
      </div>

      {/* Right: image 855×855 */}
      <div className="relative w-[600px] h-[600px] 2xl:w-[740px] 2xl:h-[740px] 3xl:w-[855px] 3xl:h-[855px] shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={855}
          height={855}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05] pointer-events-none"
        />
      </div>
    </Link>
  );
}

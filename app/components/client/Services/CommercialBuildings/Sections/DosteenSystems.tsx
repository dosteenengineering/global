"use client";

import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

interface IDosteenSystemsProps {
  data: {
    description: string;
    title: string;
    systems: {
      id: number;
      title: string;
      image: string;
      slug: string;
    }[];
  };
}

function SystemCard({
  system,
}: {
  system: IDosteenSystemsProps["data"]["systems"][0];
}) {
  return (
    <Link href={`/${system.slug}`} className="group block">
      <div className="relative h-[455px] overflow-hidden">
        {/* Image */}
        <Image
          src={system.image}
          alt={system.title}
          fill
          className="object-cover"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Arrow — top right, visible on hover */}
        <div className="absolute top-30 right-30 opacity-0 -translate-x-20 translate-y-20 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
          <Image
            src="/assets/icons/arrow-right-top-small.svg"
            alt="arrow"
            width={100}
            height={100}
            className="w-15 h-15 object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <p className="my-30 text-30 leading-[1.333] font-light text-secondary group-hover:font-medium transition-all duration-300 tracking-[-0.02em]">
        {system.title}
      </p>

      {/* Animated line */}
      <div className="relative h-px bg-[#c2c2c2]">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
      </div>
    </Link>
  );
}

export default function DosteenSystems({ data }: IDosteenSystemsProps) {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden">
      <div className="absolute top-[-39%] left-[-0.9%] pointer-events-none h-full">
        <Image
          src="/assets/images/services/bg-common-service.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain 2xl:w-[430px] 3xl:w-[650px] h-full"
        />
      </div>

      <div className="w-full pl-[28.6%] pt-120">
        <div
          className="text-paragraph text-description max-w-[1110px] mb-60"
          dangerouslySetInnerHTML={{ __html: data.description }}
          suppressHydrationWarning
        />

        <div className="w-full h-px bg-[#c2c2c2] mb-140 3xl:mb-150" />

        <div className="px-[15px] lg:px-0 container w-full">
          <SectionTitle
            text={data.title}
            className="section-heading text-secondary uppercase mb-50 max-w-[1538px]"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container w-full grid grid-cols-3 3xl:grid-cols-4 gap-x-30 gap-y-80">
        {data.systems.map((system) => (
          <SystemCard key={system.id} system={system} />
        ))}
      </div>
    </section>
  );
}

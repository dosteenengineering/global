import Image from "next/image";
import { bimCapabilities } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

type BimCapability = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

function CapabilityCard({ item }: { item: BimCapability }) {
  return (
    <div className="flex gap-5 md:gap-40 3xl:gap-[43px] pt-7.5 pb-7.5 md:pt-50 md:pb-80 3xl:pb-100 ">
    <div className="relative flex-shrink-0 w-12.5 h-12.5 md:w-[90px] md:h-[90px] 3xl:w-[100px] 3xl:h-[100px] backdrop-blur-sm rounded-full">
      <Image
        src="/assets/images/about/why-choose/card-bg-cricle.svg"
        alt=""
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 md:w-[40px] md:h-[40px] 3xl:w-[50px] 3xl:h-[50px] relative">
          <Image src={item.icon} alt={item.title} fill className="object-contain" />
        </div>
      </div>
    </div>
      <div className="flex flex-col gap-2.5 md:gap-30 pt-[11px] md:pt-30">
      <h3 className="text-white text-30 leading-[1.333] tracking-[-0.02em] font-light">
        {item.title}
      </h3>
      <p className="text-white text-description font-light max-w-[641px]">
        {item.description}
      </p>
      </div>
    </div>
  );
}

export default function BimCapabilitiesStats() {
  const { title, capabilities } = bimCapabilities;
  const rows = [
    capabilities.slice(0, 2),
    capabilities.slice(2, 4),
    capabilities.slice(4, 6),
  ];

  return (
    <section className="w-full relative">
      <PrimaryNoise2 />
      <div className="relative container pt-12.5 md:pt-140 3xl:pt-150 pb-5 md:pb-120">
        {/* Title */}
        <SectionTitle
          title={title}
          className="text-white uppercase mb-7.5 md:mb-80 section-heading"
        />
        {/* Rows with horizontal dividers */}
        <div>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-70 3xl:gap-x-[76px]">
                {row.map((item) => (
                  <div key={item.id} className="border-t border-bdr-blue">
                    <CapabilityCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Single bottom border after last row */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-x-70 3xl:gap-x-[76px]">
            <div className="border-t border-bdr-blue" />
            <div className="border-t border-bdr-blue" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"
import Image from "next/image";
import { bimCapabilities, Capability } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";


function CapabilityCard({ item, delay }: { item: Capability['fourthSection']['items'][0]; delay: number }) {
  return (
    <motion.div variants={moveUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
      className="last-st flex flex-row md:flex-col lg:flex-row gap-x-5 md:gap-x-40 md:gap-y-0 3xl:gap-x-[43px] pt-7.5 pb-7.5 md:pt-50 md:pb-80 3xl:pb-100 ">
      <div className="relative flex-shrink-0 w-12.5 h-12.5 md:w-[60px] md:h-[70px] lg:w-[70px] lg:h-[90px] 3xl:w-[100px] 3xl:h-[100px] backdrop-blur-sm rounded-full">
        <Image
          src="/assets/images/about/why-choose/card-bg-cricle.svg"
          alt=""
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px] 3xl:w-[50px] 3xl:h-[50px] relative">
            <Image src={item.image} alt={item.imageAlt} fill className="object-contain" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-x-2.5 gap-y-2.5 md:gap-y-2 md:gap-x-30 pt-[11px] lg:pt-30">
        <h3 className="text-white text-30 leading-[1.333] tracking-[-0.02em] font-light">
          {item.title}
        </h3>
        <p className="text-white text-description font-light max-w-[641px]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function BimCapabilitiesStats({ data }: { data: Capability['fourthSection'] }) {
  const capabilities = data.items.map((item) => ({
    _id: item._id,
    image: item.image,
    imageAlt: item.imageAlt,
    title: item.title,
    description: item.description,
  }));

  const rows = [
    capabilities.slice(0, 2),
    capabilities.slice(2, 4),
    capabilities.slice(4, 6),
  ];

  return (
    <section className="w-full relative">
      <PrimaryNoise2 />
      <div className="relative container pt-12.5 md:pt-140 3xl:pt-150 pb-[50px] md:pb-120">
        {/* Title */}
        <SectionTitle
          title={data.title}
          className="text-white uppercase mb-7.5 md:mb-80 section-heading-90"
        />
        {/* Rows with horizontal dividers */}
        <div>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="gridlst">
              <div className="grid grid-cols-1  md:grid-cols-2 gap-x-70 3xl:gap-x-[70px] ">
                {row.map((item, index) => (
                  <div key={index} className="border-t border-bdr-blue">
                    <CapabilityCard item={item} delay={rowIndex * 0.12} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Single bottom border after last row */}
          {/* <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-x-70 3xl:gap-x-[70px]">
            <div className="border-t border-bdr-blue" />
            <div className="border-t border-bdr-blue" />
          </div> */}
        </div>
      </div>
    </section>
  );
}

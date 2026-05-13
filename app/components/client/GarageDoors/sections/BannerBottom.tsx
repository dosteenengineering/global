"use client";

import { useRef } from "react";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";

const BannerBottom = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightInset = useGetContainerSpacing(containerRef);

  return (
    <section className="relative pt-120 pb-200 overflow-hidden">
      <div ref={containerRef} className="container" />

      <div
        className="ml-auto max-w-[1252px] px-[16px] 2xl:px-0"
        style={{ marginRight: rightInset }}
      >
        <p className="text-30 leading-[1.33] font-light tracking-[-0.02em]  mb-40">
          In the demanding climates and architecturally refined neighborhoods of
          Oman, UAE, and the wider MENA region, a garage door should do more
          than just serve as a point of entry. It should enhance your home&apos;s
          aesthetics, offer reliable protection, and operate quietly and
          efficiently every time.
        </p>
        <p className="text-description text-paragraph ">
          Leveraging our global sourcing network and long-standing partnerships
          across 35+ countries, every garage door system is built using premium
          components that undergo rigorous quality checks and on-site
          inspections. This ensures superior durability, smarter automation, and
          long-term performance suited to the region&apos;s climate. Whether you&apos;re
          building new or upgrading your space, we combine world-class
          engineering with high-end design to deliver garage doors that truly
          stand out.
        </p>
      </div>
    </section>
  );
};

export default BannerBottom;

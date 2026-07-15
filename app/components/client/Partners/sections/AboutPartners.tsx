"use client";
import "swiper/css";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import {ClientPageData } from "../data";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import ContainerAnchor from "@/app/components/layout/ContainerAnchor";
import { useEffect, useRef, useState } from "react";


export default function AboutPartners({data}:{data:ClientPageData['secondSection']}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightInset = useGetContainerSpacing(containerRef);
  
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
  
    updateWidth();
    window.addEventListener("resize", updateWidth);
  
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-12.5 md:pb-140 3xl:pb-200">
      <ContainerAnchor ref={containerRef} />
      <div className="absolute top-[-36%] md:-top-[12%] lg:-top-21 xl:-top-[25%] 2xl:-top-[38%] 3xl:-top-[38%] left-[-23%] md:left-[-32.8%] lg:left-[-26%] xl:-left-[20%] 2xl:left-[-27%] 3xl:left-[-25.8%] pointer-events-none">
        <Image
          src="/assets/shapes/clients-shape-1.svg"
          alt="decorative lines"
          width={897}
          height={896}
          className="object-contain w-[280px] md:w-[450px] lg:w-[500px] xl:w-[520px] 2xl:w-[700px] 3xl:w-auto rotate-[20.53deg]"
        />
      </div>

      {/* <div style={{ marginInline: rightInset }}> */}
      <div className={`ml-auto pt-12.5 md:pt-120 md:max-w-[70vw] 2xl:max-w-[70vw] 3xl:max-w-[1252px]`} style={{
        marginRight: rightInset,
        marginLeft: width < 768 ? rightInset : undefined,
      }}>
          <SectionTitle text={data.title} className="text-secondary font-light text-30 leading-[1.33] -tracking-[0.02em] mb-5 md:mb-40 " />

          {/* <div
          className="text-paragraph text-description max-w-[1252px]"
          dangerouslySetInnerHTML={{ __html: aboutPartners.description }}
        /> */}
          <SectionDescription
            text={data.description}
            className="text-description text-paragraph max-w-[100ch]"
          />
        </div>
      {/* </div> */}
    </section>
  );
}

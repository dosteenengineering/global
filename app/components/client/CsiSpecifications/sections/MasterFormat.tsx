"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import ContainerAnchor from "@/app/components/layout/ContainerAnchor";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

interface Props {
  data: {
    title: string;
    description: string;
    subTitle: string;
    listItems: {
      title: string;
      description: string;
    }[];
  };
}

const Masterformat = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightInset = useGetContainerSpacing(containerRef);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1360);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200 pt-0 md:pt-50 xl:pt-0">
      <ContainerAnchor ref={containerRef} />

      <div className="absolute top-2 xl:top-0 -left-[23%] pointer-events-none hidden lg:block">
        <Image src="/assets/images/csi-specifications/shape-1.svg"
          alt="decorative lines" width={1000} height={1000} className="object-contain 2xl:w-[897px] 2xl:w-[896px]" />
      </div>

      {/* <div className="max-w-[1252px] ml-auto px-[15px] 2xl:px-0 w-full" style={{ marginRight: rightInset }} > */}
      <div
        className="container xl:max-w-[1252px] xl:ml-auto lg:px-[15px] 2xl:px-0 lg:w-full"
        style={{ marginRight: isLg ? rightInset : undefined }}

      >
        <SectionTitle text={data.title} className="section-heading text-secondary uppercase mb-50" />
        {/* <div className="text-paragraph text-description mb-7.5 md:mb-100" dangerouslySetInnerHTML={{ __html: data.description }} /> */}
        <SectionDescription text={data.description} 
          className="text-paragraph text-description mb-7.5 md:mb-100" />

        <div>
          {/* <h3 className="text-55 leading-[1.34] md:leading-[1.181818181818182] mb-50 font-light -tracking-[0.02em]">{data.subTitle}</h3> */}
          <SectionTitle text={data.subTitle} className="text-55 leading-[1.34] md:leading-[1.181818181818182] mb-50 font-light -tracking-[0.02em]" />
          <div>
            {
              data.listItems.map((item, index) => (
                <div key={index} className="first:border-t first:border-bdr-gray  border-b border-bdr-gray border-t-0">
                  <div className="grid grid-cols-[2.57fr_4fr] lg:grid-cols-[1.2fr_4fr] 3xl:grid-cols-[309px_auto]">
                    <div className="border-r border-bdr-gray py-[36px] lg:py-10 xl:py-15">
                      {/* <h3 className="tex-19 md:text-30 font-light">{item.title}</h3> */}
                      <SectionTitle text={item.title} className="tex-19 md:text-30 font-light" />
                    </div>
                    <div className="py-5 md:py-8 lg:py-10 xl:py-15 pl-5 lg:pl-10 xl:pl-15">
                      {/* <p className="text-paragraph text-description max-w-xl">{item.description}</p> */}
                      <SectionDescription text={item.description} className="text-paragraph text-description max-w-xl" delay={index*0.15} />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </section>
  );
}

export default Masterformat;

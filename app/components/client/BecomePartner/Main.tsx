"use client";

import { useRef } from "react";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import Image from "next/image";
import PrimaryNoise from "../../common/noise/PrimaryNoise";
import PartnerForm from "./PartnerForm";

const Main = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerInset = useGetContainerSpacing(containerRef);

  return (
    <section className="relative h-[100svh] overflow-hidden">
      <div className="absolute z-2 bottom-[-66%] left-[-21%] max-w-[948px] max-h-[949px] xl:w-[947px] xl:h-[948px] scale-125 rotate-[15deg]">
        <img
          src="./assets/images/become-a-partner/shape.svg"
          className="w-auto h-auto max-w-[948px] max-h-[949px] "
          alt=""
        />
      </div>
      <ContainerAnchor ref={containerRef} />
      <div className="grid h-full min-h-0 xl:grid-cols-[1.2fr_2fr] 2xl:grid-cols-[1.7fr_2fr] 3xl:grid-cols-[841px_auto]">
        <div
          style={{ paddingLeft: containerInset }}
          className="relative h-full min-h-0 overflow-hidden py-80 pr-5 md:pr-50 xl:pr-80 3xl:pr-[110px]"
        >
          <PrimaryNoise />
          <div className="relative z-2 h-full">
            <Image
              src={"/assets/logos/logo-white-full.png"}
              width={708}
              height={188}
              alt="logo"
              className="h-[61px] w-auto"
            />
            <div className="mt-50 mb-30 3xl:mt-140 3xl:mb-50">
              <h1 className="text-55 leading-[1.181818181818182] text-white font-light mb-20 -tracking-[0.02em]">
                Become a Dosteen Partner
              </h1>
              <p className="text-description text-white max-w-[40ch]">
                Join our approved supplier network and grow with engineering
                projects across the UAE & Oman.
              </p>
            </div>
            <div className="p-30 relative overflow-hidden">
              <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.02)_100%)]"></div>
              <p className="text-description text-white relative z-2">
                As part of our vendor verification process, Dosteen may request
                a factory visit to assess manufacturing standards, quality
                control practices, and overall production capabilities. This
                helps us ensure that all partners meet our quality and
                compliance criteria.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ paddingRight: containerInset }}
          data-lenis-prevent
          className="z-10 h-full min-h-0 overflow-y-auto overscroll-contain bg-white pl-5 md:pl-70 xl:pl-80 3xl:pl-[72px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <PartnerForm />
        </div>
      </div>
    </section>
  );
};

export default Main;

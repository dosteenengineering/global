import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ctaData } from "../data";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";

export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <PrimaryNoise />
      <div className="absolute left-0 -top-[50%] lg:-top-[60%] w-[70%] lg:w-[50%] h-[165%] pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/cta.svg"
          alt=""
          fill
          className="object-contain object-top-left"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-140 3xl:pb-150 flex flex-col gap-8 md:gap-10 lg:gap-[50px] items-center justify-center">
        {/* Heading */}
        <h2 className="text-white font-helvetica uppercase leading-[1.111] section-font-size text-center max-w-[1492px]">
          {ctaData.heading}
        </h2>

        {/* Actions row */}
        <div className="flex items-center h-[80px] md:h-[130px]">
          {ctaData.actions.map((action, i) => (
            <Fragment key={action.key}>
              {i === 1 && (
                <div
                  className="w-px self-stretch flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(118, 167, 255, 0) 0%, #76A7FF 49.52%, rgba(118, 167, 255, 0) 100%)",
                  }}
                />
              )}
              <Link
                href={action.href}
                className="group flex items-center gap-3 sm:gap-6 3xl:gap-[30px] px-6 lg:px-[45px] first:pl-0 last:pr-0"
              >
                <span className="text-white font-poppins font-[300] text-15 sm:text-19 md:text-30 leading-[1.52] -tracking-[2%] uppercase">
                  {action.label}
                </span>
                <Image
                  src="/assets/icons/arrow-right-top-big.svg"
                  alt=""
                  width={43}
                  height={43}
                  className="3xl:w-[43px] 3xl:h-[43px] md:w-[35px] md:h-[35px] w-[17px] h-[17px] group-hover:rotate-45 transition-all duration-300 pointer-events-none"
                />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

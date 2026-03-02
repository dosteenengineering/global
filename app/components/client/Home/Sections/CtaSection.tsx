import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ctaData } from "../data";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";

export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <PrimaryNoise />
<div className="absolute left-0 -top-[60%] w-[50%] h-[165%] pointer-events-none">
  <Image
    src="/assets/icons/bg-svg/cta.svg"
    alt=""
    fill
    className="object-contain object-top-left"
  />
</div>

      {/* Content */}
      <div className="relative z-10 container py-140 3xl:pb-150 flex flex-col gap-[50px] items-center justify-center">
        {/* Heading */}
        <h2 className="text-white font-helvetica uppercase leading-[1.111] text-70 3xl:text-90 text-center max-w-[1492px]">
          {ctaData.heading}
        </h2>

        {/* Actions row */}
        <div className="flex items-center h-[130px]">
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
                className="group flex items-center gap-6 3xl:gap-[30px] px-[45px] first:pl-0 last:pr-0"
              >
                <span className="text-white font-poppins font-[300] text-30 leading-[1.52] -tracking-[2%] uppercase">
                  {action.label}
                </span>
                <Image
                  src="/assets/icons/arrow-right-top-big.svg"
                  alt=""
                  width={43}
                  height={43}
                  className="3xl:w-[43px] 3xl:h-[43px] w-[35px] h-[35px] group-hover:rotate-45 transition-all duration-300"
                />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
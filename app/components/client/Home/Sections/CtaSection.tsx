"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ctaData } from "../data";
import PrimaryNoise from "@/app/components/common/noise/PrimaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <PrimaryNoise />
      <div className="absolute left-0 -top-[50%] lg:-top-[60%] w-[70%] lg:w-[50%] h-[165%] pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/cta-animated.svg"
          alt=""
          fill
          className="object-contain object-top-left"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-140 3xl:pb-150 flex flex-col gap-8 md:gap-10 lg:gap-[50px] items-center justify-center">
        {/* Heading */}
        <SectionTitle
          title={ctaData.heading}
          className="text-white section-heading text-center max-w-[1492px]"
        />

        {/* Actions row */}
        <div className="flex items-center h-[80px] md:h-[130px]">
          {ctaData.actions.map((action, i) => (
            <Fragment key={action.key}>
              {/* Divider between items — animates at delay 0.18 */}
              {i === 1 && (
                <div className="overflow-hidden self-stretch flex-shrink-0 w-px">
                  <motion.div
                    className="w-full h-full"
                    variants={moveUp(0.18)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.1, once: true }}
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(118, 167, 255, 0) 0%, #76A7FF 49.52%, rgba(118, 167, 255, 0) 100%)",
                    }}
                  />
                </div>
              )}

              <div className="self-stretch flex items-center">
                <motion.div
                  variants={moveUp(i * 0.18)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.1, once: true }}
                >
                  <Link
                    href={action.href}
                    className={`group flex items-center gap-3 sm:gap-30 px-6 lg:px-[45px] ${i === 0 ? "pl-0" : ""} ${i === ctaData.actions.length - 1 ? "pr-0" : ""}`}
                  >
                    <span className="text-white font-poppins font-light text-15 sm:text-19 md:text-30 leading-[1.52] -tracking-[2%] uppercase">
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
                </motion.div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

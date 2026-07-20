"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { Home } from "../data";
import PrimaryNoise from "@/app/components/common/noise/PrimaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";

const getActionHref = (link: string) => {
  const trimmedLink = link.trim();

  if (trimmedLink.startsWith("tel:")) {
    return trimmedLink;
  }

  const isPhoneNumber = /^\+?[\d\s().-]+$/.test(trimmedLink);

  if (!isPhoneNumber) {
    return trimmedLink;
  }

  return `tel:${trimmedLink.replace(/[^\d+]/g, "")}`;
};

export default function CtaSection({data}:{data:Home['lastSection']}) {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkScreen();

  window.addEventListener("resize", checkScreen);

  return () => window.removeEventListener("resize", checkScreen);
}, []);
  return (
    <section className="relative w-full overflow-hidden">
      <PrimaryNoise />
      <div className="hidden sm:block absolute left-0 -top-[50%] lg:-top-[60%] w-[70%] lg:w-[50%] h-[165%] pointer-events-none">
        <Image src="/assets/icons/bg-svg/cta-animated.svg" alt="" fill className="object-contain object-top-left" />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-12.5 md:py-140 3xl:pt-[146px] 3xl:pb-150 flex flex-col gap-[30px] md:gap-10 lg:gap-[50px] items-center justify-center">
        {/* Heading */}
        <SectionTitle
          title={data.title}
          className="text-white section-heading-90 text-center max-w-[1492px]"
        />

        {/* Actions row */}
        <div className="flex flex-col sm:flex-row items-center h-[80px] md:h-[130px]">
          {data.items.map((action, i) => (
            <Fragment key={i}>
              {/* Divider between items — animates at delay 0.18 */}
              {i === 1 && (
                <div className="overflow-hidden self-stretch flex-shrink-0 h-px w-full sm:h-full sm:w-px my-2 sm:my-0">
                  <motion.div
                    className="w-full h-full"
                    // variants={moveUp(0.18)}
                    // initial="hidden"
                    // whileInView="show"
                    // viewport={{ amount: 0.1, once: true }}
                 style={{
                      background: isMobile
                        ? "linear-gradient(90deg, rgba(118, 167, 255, 0) 0%, #76A7FF 49.52%, rgba(118, 167, 255, 0) 100%)"
                        : "linear-gradient(180deg, rgba(118, 167, 255, 0) 0%, #76A7FF 49.52%, rgba(118, 167, 255, 0) 100%)",
                    }}
                    
                  />
                </div>
              )}

              <div className="self-stretch flex items-center justify-center sm:justify-start">
                <motion.div
                  variants={moveUp(i * 0.18)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.1, once: true }}
                >
                  <Link
                    // href={getActionHref(action.link)}
                    href={action.link}
                    className={`group flex items-center gap-[10px] sm:gap-30 sm:px-6 lg:pe-[45px] lg:ps-[49px]
                       ${i === 0 ? "sm:pl-0" : ""} ${i === data.items.length - 1 ? "sm:pr-0" : ""}`}
                  >
                    <span className="text-white font-poppins font-light text-30 leading-[1.52] -tracking-[2%] uppercase">
                      {action.title}
                    </span>
                    <Image
                      src="/assets/icons/button-arrow-top-right.svg"
                      alt=""
                      width={43}
                      height={43}
                      className="3xl:w-[43px] 3xl:h-[43px] w-[18px] h-[18px] invert brightness-0 group-hover:rotate-45 transition-all duration-300 pointer-events-none"
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

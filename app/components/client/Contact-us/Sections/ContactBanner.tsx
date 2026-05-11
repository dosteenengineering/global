"use client";

import BannerNoise from "@/app/components/common/noise/BannerNoise";
import { motion } from "framer-motion";
import Image from "next/image";

interface ContactBannerProps {
  title: string;
  titleMaxWidth?: string;
  description?: string;
  descriptionMaxWidth?: string;
}

export default function ContactBanner({
  title,
  titleMaxWidth = "",
  description,
  descriptionMaxWidth = "max-w-[94%] 3xl:max-w-[1395px]",
}: ContactBannerProps) {
  return (
    <div className="w-full relative">
      <div className="absolute right-0 top-[14%] 3xl:top-[4%]">
        <Image
          src="/assets/images/recognitions/bg-lines.svg"
          alt="bg-svg"
          width={900}
          height={900}
          className="object-contain pointer-events-none w-full h-[600px] 3xl:h-full"
        />
      </div>
      {/* 1. Gradient block — standalone, no content */}
      <div className="w-full h-[250px] 3xl:h-[286px] relative">
        <BannerNoise />
      </div>

      {/* 2. Content — line, title, description */}
      <div className="container">
        <div className="w-full mb-80">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="h-px w-full bg-[#c2c2c2] origin-center"
          />
        </div>

        <h1
          className={`text-secondary mb-20 hero-heading leading-[100%] ${titleMaxWidth}`}
        >
          {title}
        </h1>

        {description && (
          <p
            className={`text-paragraph text-description mb-140 3xl:mb-150 ${descriptionMaxWidth}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

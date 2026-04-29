"use client";

import Image from "next/image";
import BannerNoise from "./noise/BannerNoise";
import { motion } from "framer-motion";
import { useParallax } from "./animations/useParallax";

interface InnerPageBannerProps {
  title: string;
  titleMaxWidth?: string;
  description?: string;
  descriptionMaxWidth?: string;
  image?: string;
  imageAlt?: string;
}

export default function InnerPageBanner({
  title,
  titleMaxWidth = "",
  description,
  descriptionMaxWidth = "max-w-xl",
  image,
  imageAlt = "Banner image",
}: InnerPageBannerProps) {
  const { ref, parallaxY } = useParallax(10);
  return (
    <div className="w-full">
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
          className={`text-secondary ${description ? "mb-30" : "mb-0"} hero-heading leading-[100%] ${titleMaxWidth}`}
        >
          {title}
        </h1>

        {description && (
          <p
            className={`text-secondary mb-120 text-30 tracking-[-0.02em] leading-[1.333] font-light ${descriptionMaxWidth}`}
          >
            {description}
          </p>
        )}
      </div>

      {/* 3. Image */}
      {image && (
        <div ref={ref} className="relative w-full h-[650px] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-top-left"
            style={{
              transform: `scale(${1.1}) translateY(${parallaxY}vh)`,
            }}
            priority
          />
        </div>
      )}
    </div>
  );
}

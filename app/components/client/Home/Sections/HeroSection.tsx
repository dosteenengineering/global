"use client";

import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import TitleReveal from "@/app/components/common/animations/HeroTitleReveal";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { useIntroComplete } from "@/app/context/IntroContext";
import { Home } from "../data";
// import { useLenis } from "@/app/components/LenisProvider";

export default function Hero({data, isMobile}:{data:Home['bannerSection'], isMobile:boolean}) {
  const introComplete = useIntroComplete();


  return (
    <section className="relative h-[85vh] lg:h-[100dvh] w-full overflow-hidden">
      {/* Background Image */}
      {/* <Image
        src={data.desktopImage}
        alt={data.imageAlt}
        fill
        priority
        className="object-cover hidden md:block"
      />

      <Image
        src={data.mobileImage}
        alt={data.imageAlt}
        fill
        priority
        className="object-cover object-top md:hidden"
      /> */}

      <Image
        src={isMobile ? data.mobileImage : data.desktopImage}
        alt={data.imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className={isMobile ? "object-cover object-top" : "object-cover"}
      />
   

    

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="container relative z-10 flex h-full items-end py-[80px] md:py-140 3xl:pb-[130px]">
        <div className="max-w-[964px]">
          {/* Title */}
          {introComplete && (
            <TitleReveal
              texts={data.items.map((item)=>item.title)}
              className="text-[#FFFBFB] max-w-[380px] md:max-w-[520px] banner-heading lg:max-w-[800px] xl:max-w-[800px] 3xl:max-w-none font-bold uppercase font-helvetica"
            />
          )}

          {/* Button */}
          {introComplete && (
            <motion.div
              variants={moveUp(2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-5 md:mt-50 w-fit"
            >
              <BorderButton
                text={data.buttonText}
                borderColor="white"
                textColor="white"
                iconColor="primary"
                hoverBg="white"
                className="!px-[24px] !py-[11.2px]"
                href={data.buttonLink}
                // onClick={handleContactClick}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

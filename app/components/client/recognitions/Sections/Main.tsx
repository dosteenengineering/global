"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award } from "../data";
import AwardsNoise from "@/app/components/common/noise/AwardsNoise";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUp, moveUpV2 } from "@/app/components/motionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import NavButton from "@/app/components/common/NavigationButton";

export default function Main({ data }: { data: Award[] }) {
  console.log(data)
  const categories = Array.from(
    new Map(
      data.map((award) => [
        award.category._id,
        {
          label: award.category.name,
          value: award.category._id,
        },
      ])
    ).values()
  );

  const [active, setActive] = useState<string>(categories[0]?.value ?? "");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = data.filter((item) => item.category._id === active);
  const selectedAward =
    selectedIndex === null ? null : filtered[selectedIndex] ?? null;

  const closeLightbox = () => setSelectedIndex(null);

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null || filtered.length === 0) return current;
      return current === 0 ? filtered.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null || filtered.length === 0) return current;
      return current === filtered.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (!selectedAward) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedAward, filtered.length]);

  return (
    <section className="w-full relative">
      <div className="absolute right-[-13%] lg:right-0 top-[-21.7%] lg:top-[-34%] 3xl:top-[-33.2%]">
        <Image
          src="/assets/images/recognitions/bg-lines.svg"
          alt="bg-svg"
          width={900}
          height={900}
          className="object-contain pointer-events-none w-full h-[280px] lg:h-[930px] 3xl:h-full"
        />
      </div>
      <div className="container mt-80  mb-140 3xl:mb-200">
        {/* Category Tabs */}
        <div className="flex gap-[10px] mb-50">
          {categories.map((cat, index) => (
            <motion.div key={index} variants={moveUp(index * 0.12)} initial="hidden" whileInView={"show"} viewport={{ once: true }}>
              <button
                onClick={() => {
                  setActive(cat.value);
                  closeLightbox();
                }}
                className={`cursor-pointer tracking-[-2%] md:tracking-normal py-[4px] px-2.5 md:py-[14px] md:px-[35px] 2xl:h-[54px] rounded-[50px] border text-15 
                  leading-[1.733333333333333] text-secondary font-normal uppercase transition-all duration-200
                  ${active === cat.value
                    ? "border-primary bg-primary/10"
                    : "border-[#454545]"
                  }`}
              >
                <span className="pb-1">{cat.label}</span>
              </button>
            </motion.div>
          ))}

        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-[32px] md:gap-x-20 3xl:gap-x-[25px] gap-y-10 md:gap-y-50 ">
          {filtered.map((item, itemIdx) => (
            <Reveal
              key={itemIdx}
              variants={moveUpV2}
              delayRange={itemIdx * 0.12}
            >
              <AwardCard
                image={item.image}
                title={item.title}
                imageAlt={item.imageAlt}
                onClick={() => setSelectedIndex(itemIdx)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-8 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-zoom-out"
            />

            <motion.div
              className="relative z-10 flex h-full max-h-[88vh] w-full max-w-[1180px] flex-col"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between gap-4 text-white">
                <p className="text-18 md:text-24 font-poppins font-light leading-tight">
                  {selectedAward.title}
                </p>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={closeLightbox}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 transition-colors hover:bg-white hover:text-secondary"
                >
                  <X size={22} strokeWidth={1.8} />
                </button>
              </div>

              <div className="relative min-h-0 flex-1 bg-transparent p-4 md:p-8">
                <Image
                  src={selectedAward.image}
                  alt={selectedAward.imageAlt || selectedAward.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 1180px"
                  className="object-contain p-4 md:p-8"
                />
              </div>

              {filtered.length > 1 && (
                <>
                  <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2 md:left-4">
                    <NavButton
                      onClick={showPrevious}
                      direction="left"
                      ariaLabel="Previous recognition"
                      borderColor="border-white"
                      bgColor="bg-black/50"
                    />
                  </div>
                  <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-4">
                    <NavButton
                      onClick={showNext}
                      direction="right"
                      ariaLabel="Next recognition"
                      borderColor="border-white"
                      bgColor="bg-black/50"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AwardCard({
  image,
  title,
  imageAlt,
  onClick,
}: {
  image: string;
  title: string;
  imageAlt: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`View ${title}`}
      onClick={onClick}
      className="flex w-full flex-col items-center group cursor-zoom-in text-left"
    >
      <div className="relative w-full overflow-hidden pt-[11px] lg:pt-100 pb-2.5 md:pb-70 border-b border-[#c2c2c2]">
        <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-500 ease-in-out pointer-events-none z-10">
          <AwardsNoise />
        </div>

        <div className="relative h-[100px] md:h-[220px] 3xl:h-[300px] w-full">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Title */}
      <p className="text-center text-30 leading-[1.333] text-secondary font-light mt-2.5 md:mt-30 3xl:mt-[32px] -tracking-[0.02em]">
        {title}
      </p>
    </button>
  );
}

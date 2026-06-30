"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import NavButton from "@/app/components/common/NavigationButton";

// ─── Types ───────────────────────────────────────────────────────────────────

export type LightboxImage = {
  src: string;
  alt: string;
};

interface GalleryLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
} as const;

const panelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    transition: { duration: 0.28, ease: "easeIn" },
  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function GalleryLightbox({
  images,
  initialIndex = 0,
  onClose,
}: GalleryLightboxProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!images.length) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        {/* Backdrop blur */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          key="lightbox-panel"
          className="relative z-10 w-full max-w-5xl flex flex-col gap-3 md:gap-4"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
              aria-label="Close lightbox"
            >
              <RiCloseLine size={22} />
            </button>
          </div>

          {/* Main swiper */}
          <div className="relative w-full">
            <Swiper
              modules={[Thumbs, Navigation, Keyboard]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              navigation={{
                prevEl: ".lb-prev",
                nextEl: ".lb-next",
              }}
              keyboard={{ enabled: true }}
              initialSlide={initialIndex}
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper;
              }}
              className="w-full rounded-xl overflow-hidden"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-[55vw] max-h-[520px] min-h-[220px] bg-black/30">
                    <Image
                      src={img.src}
                      alt={img.alt || `Image ${idx + 1}`}
                      fill
                      className="object-contain"
                      priority={idx === initialIndex}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                  <NavButton
                    onClick={() => mainSwiperRef.current?.slidePrev()}
                    direction="left"
                    ariaLabel="Previous"
                    borderColor="border-white"
                  />
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                  <NavButton
                    onClick={() => mainSwiperRef.current?.slideNext()}
                    direction="right"
                    ariaLabel="Next"
                    borderColor="border-white"
                  />
                </div>
              </>
            )}
          </div>

          {/* Thumbs swiper */}
          {images.length > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView="auto"
              spaceBetween={8}
              watchSlidesProgress
              className="w-full !px-1"
            >
              {images.map((img, idx) => (
                <SwiperSlide
                  key={idx}
                  className="!w-[68px] md:!w-[88px] cursor-pointer"
                >
                  <div className="relative w-full h-[52px] md:h-[64px] rounded-md overflow-hidden opacity-50 [.swiper-slide-thumb-active_&]:opacity-100 transition-opacity duration-200 ring-0 [.swiper-slide-thumb-active_&]:ring-2 ring-white">
                    <Image
                      src={img.src}
                      alt={img.alt || `Thumb ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

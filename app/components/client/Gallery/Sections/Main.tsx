"use client";

import { useState } from "react";
import GalleryLightbox, { LightboxImage } from "./GalleryLightBox";
import Image from "next/image";
import { GalleryData, galleryData } from "../data";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";

// Split flat items array into alternating rows of 3 and 2
function buildRows(items: GalleryData["secondSection"]["items"]) {
  const rows: { items: GalleryData["secondSection"]["items"]; isOdd: boolean }[] = [];
  let i = 0;
  let rowIndex = 0;

  while (i < items.length) {
    const isOdd = rowIndex % 2 === 0;
    const count = isOdd ? 3 : 2;
    rows.push({ items: items.slice(i, i + count), isOdd });
    i += count;
    rowIndex++;
  }
  return rows;
}

export default function Main({ data }: { data: GalleryData["secondSection"] }) {
  const items = data.items;
  const rows = buildRows(items);
  const [lightbox, setLightbox] = useState<{
    images: LightboxImage[];
    initialIndex: number;
  } | null>(null);

const openLightbox = (item: (typeof items)[0]) => {
  if (!item.images?.length) return;  // ← guard, no images = no lightbox
  setLightbox({ images: item.images, initialIndex: 0 });
};

  return (
    <>
      <section className="bg-white pt-7.5 md:pt-60 3xl:pt-[58px] pb-140 3xl:pb-200 relative">
        <div className="absolute right-0 top-[-7%] md:top-[-16%] xl:top-[-14.85%]">
          <Image
            src="/assets/images/gallery/bg-svg.svg"
            alt="bg-svg"
            width={900}
            height={900}
            className="object-contain pointer-events-none w-full h-[280px] md:h-[930px] 3xl:h-full"
          />
        </div>
        <div className="container">
          <div className="flex flex-col gap-80">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`grid gap-7.5 md:gap-30 ${
                  row.isOdd
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {row.items.map((item, itemIdx) => (
                  <Reveal
                    key={itemIdx}
                    variants={moveUpV2}
                    delayRange={itemIdx * 0.12}
                  >
                    <GalleryCard
                      item={item}
                      isOdd={row.isOdd}
                      onOpen={() => openLightbox(item)}
                    />
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {lightbox && (
        <GalleryLightbox
          images={lightbox.images}
          initialIndex={lightbox.initialIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

type GalleryItem = {
  image: string;
  imageAlt?: string;
  title: string;
  date: string;
  images?: { src: string; alt: string }[];
};

function GalleryCard({
  item,
  isOdd,
  onOpen,
}: {
  item: GalleryItem;
  isOdd: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* Image */}
<div
  onClick={item.images?.length ? onOpen : undefined}
  className={`relative w-full overflow-hidden group ${
    item.images?.length ? "cursor-pointer" : ""
  } ${
    isOdd
      ? "h-[248px] sm:h-[280px] md:h-[320px] 2xl:h-[350px] 3xl:h-[400px]"
      : "h-[248px] sm:h-[280px] md:h-[460px] 2xl:h-[500px] 3xl:h-[611px]"
  }`}
>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Meta */}
      <div className="mt-40 flex flex-col items-start gap-[5px] md:gap-[10px]">
        <span className="text-30 font-light tracking-[-0.02em] text-secondary leading-[1.33]">
          {item.title}
        </span>
        {item.date && <span className="text-description text-paragraph">
          {new Date(item.date)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-")}
        </span>}
      </div>
    </div>
  );
}

import Image from "next/image";
import { galleryData } from "../data";
import Reveal from "@/app/components/common/animations/RevealItemsOneByOne";
import { moveUpV2 } from "@/app/components/motionVariants";

// Split flat items array into alternating rows of 3 and 2
function buildRows(items: typeof galleryData.items) {
  const rows: { items: typeof galleryData.items; isOdd: boolean }[] = [];
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

export default function Main() {
  const { items } = galleryData;
  const rows = buildRows(items);

  return (
    <section className="bg-white pt-60 3xl:pt-[58px] pb-140 3xl:pb-200 relative">
      <div className="absolute right-0 top-[-16%]">
        <Image
          src="/assets/images/gallery/bg-svg.svg"
          alt="bg-svg"
          width={900}
          height={900}
          className="object-contain pointer-events-none w-full h-[930px] 3xl:h-full"
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-80">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid gap-30 ${
                row.isOdd
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {row.items.map((item, itemIdx) => (
                <Reveal key={itemIdx} variants={moveUpV2} delayRange={itemIdx * 0.12}>
                  <GalleryCard item={item} isOdd={row.isOdd} />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

type GalleryItem = {
  image: string;
  title: string;
  date: string;
};

function GalleryCard({ item, isOdd }: { item: GalleryItem; isOdd: boolean }) {
  return (
    <div className="flex flex-col">
      {/* Image */}
      <div
        className={`relative w-full overflow-hidden group ${
          isOdd
            ? "h-[220px] sm:h-[280px] md:h-[320px] 2xl:h-[350px] 3xl:h-[400px]"
            : "h-[260px] sm:h-[360px] md:h-[460px] 2xl:h-[500px] 3xl:h-[611px]"
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
      <div className="mt-40 flex flex-col items-start gap-[10px]">
        <span className="text-30 font-light tracking-[-0.02em] text-secondary leading-[1.33]">
          {item.title}
        </span>
        <span className="text-description text-paragraph">{item.date}</span>
      </div>
    </div>
  );
}

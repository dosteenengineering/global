"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IndustriesPageData, LowPolyItem } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import ImageHotspots, { Hotspot } from "@/app/components/common/ImageHotspots";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const toHotspot = (item: LowPolyItem, index: number, industrySlug: string): Hotspot => ({
  id: `hotspot-${index}-${item.systemSlug}`,
  title: item.title,
  href: `solutions/${industrySlug}/${item.systemSlug}`,
  marker: { x: Number(item.marker.x), y: Number(item.marker.y) },
  label: { x: Number(item.label.x), y: Number(item.label.y) },
  side: item.side,
});



// const industryHotspotsByTitle: Record<string, Hotspot[]> = {

//   // Paste each copied hotspot JSON array under the exact backend item.title.

//   "Industrial": [
//     {
//       "id": "hotspot-1783075798773",
//       "title": "Docking Solution",
//       "href": "solutions/industrial-facilities/docking-solutions",
//       "marker": {
//         "x": 38.421052631578945,
//         "y": 31.793142504118617
//       },
//       "label": {
//         "x": 21.49122807017544,
//         "y": 10.712218915343916
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783075822707",
//       "title": "Traffic safety Solutions",
//       "href": "solutions/industrial-facilities/traffic-safety-solutions",
//       "marker": {
//         "x": 48.333333333333336,
//         "y": 61.24131944444444
//       },
//       "label": {
//         "x": 18.333333333333332,
//         "y": 22.749255952380953
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783075850834",
//       "title": "Entrance Solutions",
//       "href": "solutions/industrial-facilities/entrance-systems",
//       "marker": {
//         "x": 29.122807017543863,
//         "y": 48.92658566721582
//       },
//       "label": {
//         "x": 20,
//         "y": 72.22015542328042
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783075867220",
//       "title": "Flood Barriers",
//       "href": "solutions/industrial-facilities/advanced-flood-barriers-for-homes-in-uae-oman",
//       "marker": {
//         "x": 27.982456140350877,
//         "y": 58.31703047775947
//       },
//       "label": {
//         "x": 16.140350877192983,
//         "y": 33.72809193121693
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783075923358",
//       "title": "Gate Systems",
//       "href": "solutions/industrial-facilities/automated-gate-systems",
//       "marker": {
//         "x": 39.21052631578947,
//         "y": 71.4966021416804
//       },
//       "label": {
//         "x": 21.052631578947366,
//         "y": 80.95031415343915
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783075972194",
//       "title": "Architectural Shades",
//       "href": "solutions/industrial-facilities/innovative-architectural-shading-systems-in-uae-oman",
//       "marker": {
//         "x": 60.78947368421053,
//         "y": 66.38951812191104
//       },
//       "label": {
//         "x": 79.12280701754386,
//         "y": 86.63814484126983
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783076000388",
//       "title": "Multi-Parking Solutions",
//       "href": "solutions/industrial-facilities/space-saving-multi-parking-systems-for-homes-building",
//       "marker": {
//         "x": 71.57894736842105,
//         "y": 56.479414682539684
//       },
//       "label": {
//         "x": 80.35087719298247,
//         "y": 74.33655753968253
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783076013438",
//       "title": "Fire Protection Solutions",
//       "href": "solutions/industrial-facilities/fire-protection-system",
//       "marker": {
//         "x": 58.94736842105262,
//         "y": 44.14899093904448
//       },
//       "label": {
//         "x": 81.05263157894737,
//         "y": 20.632853835978835
//       },
//       "side": "right"
//     }
//   ],

//   "Residential": [
//     {
//       "id": "hotspot-1783078947137",
//       "title": "Garbage & Linen Chutes",
//       "href":"solutions/residential-developments/efficient-garbage-linen-chutes-for-modern-buildings",
//       "marker": {
//         "x": 49.122807017543856,
//         "y": 39.41592261904761
//       },
//       "label": {
//         "x": 20.43859649122807,
//         "y": 12.960896164021163
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783078981323",
//       "title": "Garbage Doors",
//       "href": "solutions/residential-developments/premium-residential-garage-doors-in-uae-oman",
//       "marker": {
//         "x": 33.59649122807017,
//         "y": 48.7618410214168
//       },
//       "label": {
//         "x": 14.210526315789473,
//         "y": 23.410631613756614
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079001277",
//       "title": "Shutters",
//       "href": "solutions/residential-developments/elegant-shutters-for-stylish-secure-living",
//       "marker": {
//         "x": 34.29824561403509,
//         "y": 51.23301070840197
//       },
//       "label": {
//         "x": 13.333333333333334,
//         "y": 34.654017857142854
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079025580",
//       "title": "Flood Barriers",
//       "href":"solutions/residential-developments/advanced-flood-barriers-for-homes-in-uae-oman",
//       "marker": {
//         "x": 38.3,
//         "y": 64.2
//       },
//       "label": {
//         "x": 14.298245614035087,
//         "y": 79.23073743386243
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079043483",
//       "title": "Retractable Pool Covers",
//       "marker": {
//         "x": 58.42105263157895,
//         "y": 65.895284184514
//       },
//       "label": {
//         "x": 78.15789473684211,
//         "y": 83.33126653439153
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079055685",
//       "title": "Bespoke Steel Gates",
//       "href": "solutions/residential-developments/bespoke-steel-gates-for-youre-homes-in-uae-oman",
//       "marker": {
//         "x": 74.47368421052632,
//         "y": 56.34009472817133
//       },
//       "label": {
//         "x": 79.03508771929825,
//         "y": 74.86565806878306
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079069045",
//       "title": "Multi-Parking Solutions",
//       "href": "solutions/residential-developments/space-saving-multi-parking-systems-for-homes-building",
//       "marker": {
//         "x": 72.54385964912281,
//         "y": 41.183587314662276
//       },
//       "label": {
//         "x": 81.14035087719299,
//         "y": 31.214864417989418
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079083843",
//       "title": "Architectural Shades",
//       "href": "solutions/residential-developments/innovative-architectural-shading-systems-in-uae-oman",
//       "marker": {
//         "x": 55.17543859649123,
//         "y": 60.2939662273476
//       },
//       "label": {
//         "x": 81.9298245614035,
//         "y": 19.839203042328045
//       },
//       "side": "right"
//     }
//   ],

//   "Commercial": [
//     {
//       "id": "hotspot-1783079308586",
//       "title": "Garbage & Linen Chutes",
//       "href":"solutions/commercial-buildings/efficient-garbage-linen-chutes-for-modern-buildings",
//       "marker": {
//         "x": 49.29824561403508,
//         "y": 39.151372354497354
//       },
//       "label": {
//         "x": 19.473684210526315,
//         "y": 13.489996693121691
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079325281",
//       "title": "Revolving Doors",
//       "marker": {
//         "x": 45.26315789473684,
//         "y": 53.37469110378913
//       },
//       "label": {
//         "x": 16.140350877192983,
//         "y": 23.01380621693122
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079382964",
//       "title": "Turnstile System",
//       "marker": {
//         "x": 43.59649122807018,
//         "y": 64.08309308072488
//       },
//       "label": {
//         "x": 14.473684210526317,
//         "y": 34.654017857142854
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079400947",
//       "title": "Flood Barriers",
//       "href": "solutions/commercial-buildings/advanced-flood-barriers-for-homes-in-uae-oman",
//       "marker": {
//         "x": 33.50877192982456,
//         "y": 71.33185749588138
//       },
//       "label": {
//         "x": 19.210526315789473,
//         "y": 81.87624007936508
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079425540",
//       "title": "Bespoke Steel Gates",
//       "href": "solutions/commercial-buildings/bespoke-steel-gates-for-youre-homes-in-uae-oman",
//       "marker": {
//         "x": 58.50877192982457,
//         "y": 75.12098434925865
//       },
//       "label": {
//         "x": 75,
//         "y": 85.71221891534393
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079437604",
//       "title": "Multi-Parking Solutions",
//       "href": "solutions/commercial-buildings/space-saving-multi-parking-systems-for-homes-building",
//       "marker": {
//         "x": 72.45614035087719,
//         "y": 44.31373558484349
//       },
//       "label": {
//         "x": 82.45614035087719,
//         "y": 35.579943783068785
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079449936",
//       "title": "Fire and Smoke Curtains",
//       "href": "solutions/commercial-buildings/fire-protection-system",
//       "marker": {
//         "x": 59.64912280701754,
//         "y": 43.490012355848435
//       },
//       "label": {
//         "x": 80.17543859649123,
//         "y": 25.923859126984127
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079470191",
//       "title": "Acoustic Partitions",
//       "marker": {
//         "x": 59.561403508771924,
//         "y": 29.816206754530477
//       },
//       "label": {
//         "x": 80.17543859649123,
//         "y": 13.489996693121691
//       },
//       "side": "right"
//     }
//   ],
//   "Government": [
//     {
//       "id": "hotspot-1783079773906",
//       "title": "Blast Doors",
//       "marker": {
//         "x": 22.6,
//         "y": 28
//       },
//       "label": {
//         "x": 23.50877192982456,
//         "y": 10.712218915343916
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079794358",
//       "title": "Mantrap Access Control",
//       "marker": {
//         "x": 39.473684210526315,
//         "y": 63.91834843492587
//       },
//       "label": {
//         "x": 19.385964912280702,
//         "y": 54.495287698412696
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079816727",
//       "title": "Flood Barriers",
//       "marker": {
//         "x": 32.01754385964912,
//         "y": 64.5773270181219
//       },
//       "label": {
//         "x": 15.701754385964911,
//         "y": 69.83920304232805
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079825553",
//       "title": "Bespoke Steel Gates",
//       "marker": {
//         "x": 40,
//         "y": 72.48507001647447
//       },
//       "label": {
//         "x": 16.49122807017544,
//         "y": 81.61168981481481
//       },
//       "side": "left"
//     },
//     {
//       "id": "hotspot-1783079834443",
//       "title": "Architectural Shades",
//       "marker": {
//         "x": 57.19298245614035,
//         "y": 71.99083607907743
//       },
//       "label": {
//         "x": 76.40350877192984,
//         "y": 83.46354166666666
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079843377",
//       "title": "Vault Doors",
//       "marker": {
//         "x": 66.9298245614035,
//         "y": 51.39775535420099
//       },
//       "label": {
//         "x": 87.63157894736841,
//         "y": 37.960896164021165
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079852403",
//       "title": "Fire and Smoke Curtains",
//       "marker": {
//         "x": 61.66666666666667,
//         "y": 40.03037479406919
//       },
//       "label": {
//         "x": 80.43859649122807,
//         "y": 30.024388227513228
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783079949766",
//       "title": "Security Shutters",
//       "marker": {
//         "x": 47.280701754385966,
//         "y": 40.52460873146623
//       },
//       "label": {
//         "x": 65,
//         "y": 10.902695105820106
//       },
//       "side": "right"
//     },
//     {
//       "id": "hotspot-1783080262162",
//       "title": "Blast Doors & Windows",
//       "marker": {
//         "x": 54.736842105263165,
//         "y": 40.03037479406919
//       },
//       "label": {
//         "x": 80,
//         "y": 19.839203042328045
//       },
//       "side": "right"
//     }
//   ]

// };

// const normalizeHotspotKey = (value: string) =>
//   value
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "")
//     .trim();

export default function IndustriesWeServe({ data }: { data: IndustriesPageData['thirdSection'] }) {

  const [activeId, setActiveId] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   detailRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",

  //   });
  // }, [activeId]);

  const handleIndustryClick = (index: number) => {
    setActiveId(index);

    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };


  // Mobile accordion: track which item is open (null = all closed)
  const [openId, setOpenId] = useState<number | null>(0);
  const active = data.items.find((i, idx) => idx === activeId)!;
  const activeHotspots = active.lowPolySection.items.map((item, index) =>
    toHotspot(item, index, active.slug)
  );

  // Helper function to get hotspots for mobile items
  // const itemHotspots = item.systemSection.items.map(toHotspot);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <section className="relative w-full select-none  overflow-hidden lg:overflow-visible">
      <PrimaryNoise2 />

      {/* Decorative lines */}
      <div className="absolute z-30 left-0 2xl:left-[-8%] 3xl:left-0  bottom-[-36%] 2xl:bottom-[-41%] 3xl:bottom-[-39%] w-[420px] h-full pointer-events-none">
        <Image src="/assets/images/services/bg-lines.svg" alt="" fill className="object-contain object-left hidden lg:block" />
      </div>

      <div className="container py-12.5 md:py-140 3xl:py-150 w-full z-20">
        {/* Title */}
        <SectionTitle text={data.title} className="section-heading-90 text-white uppercase mb-7.5 md:mb-30 xl:mb-30 " />

        {/* Divider */}
        <div className="relative z-10 w-full h-px bg-[#76A7FF] mb-8 2mb-80 3xl:mb-80 hidden lg:block" />

        {/* Body: left list + right detail */}
        <div className="flex flex-col lg:flex-row gap-10 2xl:gap-50  3xl:gap-100">
          {/* ── MOBILE: Accordion ── */}
          <div className="flex flex-col lg:hidden w-full ">
            {data.items.map((item, idx) => {
              const isOpen = idx === openId;
              const detail = data.items.find((i, index) => index === idx)!;
              const itemHotspots = item.lowPolySection.items.map((hotspotItem, index) =>
                toHotspot(hotspotItem, index, item.slug)
              );

              return (
                <div key={idx} className="relative first:border-t border-b border-bdr-blue py-5">
                  {/* Accordion header */}
                  <button type="button" onClick={() => toggleAccordion(idx)}
                    className={` group relative flex items-center justify-between text-left w-full transition-all duration-300 cursor-pointer`} >
                    {/* Hover bg */}
                    {!isOpen && (
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50.96%, rgba(255,255,255,0) 100%)",
                        }}
                      />
                    )}

                    <span className={`relative z-10 text-[18px] leading-[1.55] tracking-[-0.02em] transition-all duration-300 ${isOpen ? "text-white font-medium" : "text-white font-light"}`}>
                      {item.title}
                    </span>

                    {/* Chevron icon */}
                    <span className={`relative z-10 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6 7.45825L11.1667 12.8916C10.525 13.5333 9.47502 13.5333 8.83336 12.8916L3.40002 7.45825" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {/* Accordion body */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col z-10 text-white pt-5">
                      <p className="text-description text-white mb-30">{detail.description}</p>
                      <div className="relative w-full h-auto mb-30">
                        <ImageHotspots
                          image={detail.image}
                          alt={detail.title}
                          hotspots={itemHotspots}
                          mobileMode={true}
                          imageClassName="object-contain !relative"
                        />
                      </div>
                      <BorderButton text={"Read More"} iconColor="white" px="px-[23px] md:px-30" href={detail.buttonLink} hoverBg="white" className="w-fit" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── DESKTOP: Original side-by-side layout ── */}
          {/* Left — industry list */}
          <div className="shrink-0 hidden lg:flex flex-col min-w-max 2xl:w-[300px] 3xl:w-[334px] border-t border-bdr-blue sticky top-10 self-start max-h-screen">
            {data.items.map((item, index) => {
              const isActive = index === activeId;
              return (
                <motion.div key={item._id ?? index} variants={moveUp(0.1 * index)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeInOut" }}>
                  <button
                    type="button"
                    onClick={() => handleIndustryClick(index)}
                    className={`group relative flex items-center justify-between text-left w-full border-b
                       border-[#76A7FF] transition-all duration-300 cursor-pointer ${isActive ? "px-1 2xl:px-[10px] 3xl:px-20" : ""}`}
                    style={
                      isActive
                        ? {
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50.96%, rgba(255,255,255,0) 100%)",
                        }
                        : {}
                    }
                  >
                    {/* Hover bg */}
                    {!isActive && (
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50.96%, rgba(255,255,255,0) 100%)",
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 text-base 2xl:text-19 leading-[2.5263] tracking-[-0.02em] transition-all duration-300 ${isActive
                        ? "text-white font-medium"
                        : "text-white font-light"
                        }`}
                    >
                      {item.title}
                    </span>

                    {/* Arrow — only visible on active or hover */}
                    <span
                      className={`relative z-10 shrink-0 transition-all duration-300 ${isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-50"
                        }`}
                    >
                      <Image src="/assets/icons/arrow-right.svg" alt="Arrow Right" width={50} height={40} className="object-contain w-[26px] h-[17px]" />
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right — active industry detail */}
          <motion.div
            key={activeId}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            ref={detailRef}
            className="flex-1 hidden lg:flex flex-col z-10 text-white"
          >
            <motion.h2
              variants={moveUp(0.1)}
              className="text-55 leading-[1.1818] mb-3 2xl:mb-30 font-light tracking-[-0.02em]"
            >
              {active.title}
            </motion.h2>


            {/* Image */}
            <motion.div
              variants={moveUp(0.3)}
              className="relative w-full h-auto mb-50 px-4"
            >
              <ImageHotspots
                image={active.image}
                alt={active.imageAlt || active.title}
                hotspots={activeHotspots}
                editMode={process.env.NEXT_PUBLIC_HOTSPOT_EDITOR === "true"}
                imageClassName="object-cover transition-all duration-500 !relative"
              />
            </motion.div>
            <motion.p
              variants={moveUp(0.2)}
              className="text-description text-white mb-5 2xl:mb-50"
            >
              {active.description}
            </motion.p>

            <motion.div variants={moveUp(0.4)}>
              <BorderButton text={"Read More"} iconColor="white" px="px-30 3xl:px-[35px]" href={active.buttonLink} hoverBg="white" className="w-fit" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

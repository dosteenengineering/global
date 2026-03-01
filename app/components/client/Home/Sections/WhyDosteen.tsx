"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { whyDosteenData } from "../data";
import PrimaryNoise from "@/app/components/common/PrimaryNoise";

// ─── constants ────────────────────────────────────────────────────────────────
const AUTOPLAY_MS = 4000;
const BEZIER = "800ms cubic-bezier(0.4, 0, 0.2, 1)";
const CIRCLE_MS = 800;
const CIRCLE_SM = 215;

const getLeft = (offset: number, n: number) => {
  if (offset === 0) return "0px";
  if (offset === 1) return `calc(100% - ${CIRCLE_SM}px)`;
  if (offset === n - 1) return `calc(0px - ${CIRCLE_SM}px - 80px)`;
  return "calc(100% + 80px)";
};

const useWatermark = (title: string) => {
  const [cur,     setCur]     = useState({ text: title, key: 0 });
  const [exiting, setExiting] = useState<{ text: string; key: number } | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(exitTimer.current);
    setExiting(c => ({ text: c?.text ?? title, key: c?.key ?? 0 }));
    setCur(p => ({ text: title, key: p.key + 1 }));
    exitTimer.current = setTimeout(() => setExiting(null), 700);
    return () => clearTimeout(exitTimer.current);
  }, [title]);

  return { cur, exiting };
};

// ─── component ────────────────────────────────────────────────────────────────
export default function WhyDosteen() {
  const { heading, slides } = whyDosteenData;
  const n = slides.length;

  const [active, setActive] = useState(0);
  const [contentReady, setContentReady] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const contentRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const advance = () => setActive((p) => (p + 1) % n);

  useEffect(() => {
    timerRef.current = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  useEffect(() => {
    setContentReady(-1);
    contentRef.current = setTimeout(() => setContentReady(active), CIRCLE_MS);
    return () => clearTimeout(contentRef.current);
  }, [active]);

  const wm = useWatermark(slides[active].title);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col select-none py-140 3xl:pb-150">
      <PrimaryNoise />

      {/* ── Heading + watermark ─────────────────────────────────────── */}
      <div className="relative container mx-auto">
        <h2 className="text-center text-white font-helvetica uppercase text-90 leading-[1.111]">
          {heading}
        </h2>

        <div
          className="absolute top-full mt-[85px] left-1/2 -translate-x-1/2 w-screen flex justify-center pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Exiting watermark — slides out to the left */}
          {wm.exiting && (
            <span
              key={`wm-exit-${wm.exiting.key}`}
              className="absolute font-helvetica uppercase whitespace-nowrap text-white leading-[100%] text-300 3xl:text-400"
              style={{ animation: "wmSlideOut 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
            >
              {wm.exiting.text}
            </span>
          )}
          {/* Entering watermark — slides in from the right, then drifts */}
          <span
            key={`wm-enter-${wm.cur.key}`}
            className="font-helvetica uppercase whitespace-nowrap text-white opacity-6 leading-[100%] text-300 3xl:text-400"
            style={{
              animation: `
                wmSlideIn  700ms cubic-bezier(0.4, 0, 0.2, 1) forwards,
                wmDrift    ${AUTOPLAY_MS}ms linear 700ms forwards
              `,
            }}
          >
            {wm.cur.text}
          </span>
        </div>
      </div>

      {/* ── Stage ───────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex items-center pt-[85px]">
        <div className="container mx-auto relative z-20 w-full">

          {/* Pagination pill */}
          <div className="absolute left-0" style={{ top: "calc(50% + 18px)" }}>
            <div className="flex items-center py-[3px] leading-tight h-[31px] w-[78px] justify-center text-15 font-[300] font-poppins text-white rounded-full border border-white/[0.28]">
              <span className="font-[600]">{String(active + 1).padStart(2, "0")}</span>
              <span>/{String(n).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Track — line lives here so top-1/2 is the exact circle center */}
          <div className="relative mx-28 h-[530px] 3xl:h-[720px]">

            <div
              className="absolute top-1/2 h-px pointer-events-none"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                background: "linear-gradient(90deg, rgba(118,167,255,0.05) 0%, #76A7FF 50%, rgba(118,167,255,0.05) 100%)",
              }}
            />

            {slides.map((slide, i) => {
              const offset = (i - active + n) % n;
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isVisible = isActive || isNext;
              const showDesc = isActive && contentReady === i;

              return (
                <div
                  key={i}
                  onClick={advance}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-full cursor-pointer overflow-hidden ${
                    isActive
                      ? "w-[530px] h-[530px] 2xl:w-[560px] 2xl:h-[560px] 3xl:w-[720px] 3xl:h-[720px]"
                      : "w-[215px] h-[215px] 2xl:w-[250px] 2xl:h-[250px] 3xl:w-[284px] 3xl:h-[284px]"
                  }`}
                  style={{
                    left: getLeft(offset, n),
                    opacity: isVisible ? 1 : 0,
                    zIndex: isActive ? 3 : isNext ? 2 : 1,
                    backdropFilter: "blur(7px)",
                    background: isActive
                      ? "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.2) 100%)"
                      : "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.1) 100%)",
                    transition: BEZIER,
                  }}
                >
                  <div className="w-full h-full rounded-full flex flex-col items-center justify-center">

                    {/* Icon */}
                    <div
                      className={`relative flex items-center justify-center shrink-0 ${
                        isActive
                          ? "mb-5 xl:mb-8 2xl:mb-12 3xl:mb-[70px]"
                          : "w-[40px] h-[40px] mb-[10px] 3xl:mb-[18px] 2xl:w-[52px] 2xl:h-[52px]"
                      }`}
                      style={{ opacity: isVisible ? 1 : 0, transition: BEZIER }}
                    >
                      <Image
                        src={slide.icon}
                        alt={slide.title}
                        width={42}
                        height={42}
                        className={`${
                          isActive
                            ? "w-[100px] h-[100px] xl:w-[120px] xl:h-[120px] 2xl:w-[130px] 2xl:h-[130px] 3xl:w-[150px] 3xl:h-[150px]"
                            : "w-[40px] h-[40px] 3xl:w-[52px] 3xl:h-[52px]"
                        }`}
                        style={{ transition: BEZIER }}
                      />
                    </div>

                    {/* Title */}
                    <p
                      className={`text-center font-[300] -tracking-[2%] font-poppins ${
                        isActive
                          ? "text-55 xl:mb-6 3xl:mb-[30px]"
                          : "mb-2 lg:mb-[10px] 3xl:mb-[18px] text-30"
                      }`}
                      style={{
                        color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
                        opacity: isVisible ? 1 : 0,
                        transition: BEZIER,
                      }}
                    >
                      {slide.title}
                    </p>

                    {/* Description — reserved space so icon+title never shift */}
                    <div
                      className={`${isActive ? "h-[120px]" : "h-0"}`}
                      style={{
                        transition: BEZIER,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className="text-center font-[300] -tracking-[2%] font-poppins text-25 3xl:text-30 leading-[1.33] max-w-[508px] px-18 text-white"
                        style={{
                          opacity: showDesc ? 1 : 0,
                          transform: showDesc ? "translateY(0)" : "translateY(10px)",
                          transition: "opacity 450ms ease, transform 150ms ease",
                        }}
                      >
                        {slide.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
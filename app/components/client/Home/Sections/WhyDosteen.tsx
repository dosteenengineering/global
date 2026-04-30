"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { whyDosteenData } from "../data";
import PrimaryNoise from "@/app/components/common/noise/PrimaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const AUTOPLAY_MS = 4000;
const BEZIER = "900ms cubic-bezier(0.4, 0, 0.2, 1)";
const CIRCLE_MS = 800;
const CIRCLE_SM = 215;
const DRAG_THRESHOLD = 40;

const getLeft = (offset: number, n: number, circleSm: number = CIRCLE_SM) => {
  if (offset === 0) return "0px";
if (offset === 1) return circleSm === 110
  ? `calc(100% - 78px)`
  : `calc(100% - ${circleSm}px)`;
  if (offset === n - 1) return `calc(0px - ${circleSm}px - 80px)`;
  return "calc(100% + 80px)";
};

// Pure function — safe to call inside .map()
const getSlideStyles = (isActive: boolean, w: number) => {
  const iconSize = isActive
    ? w < 640
      ? 50
      : w < 1024
        ? 72
        : w < 1280
          ? 100
          : w < 1536
            ? 120
            : w < 1920
              ? 130
              : 150
    : w < 640
      ? 22
      : w < 1024
        ? 30
        : w < 1920
          ? 40
          : 52;

  const iconMb = isActive
    ? w < 1024
      ? 16
      : w < 1280
        ? 20
        : w < 1536
          ? 32
          : w < 1920
            ? 48
            : 70
    : w < 640
      ? 5
      : w < 1024
        ? 8
        : w < 1920
          ? 10
          : 18;

  const titleMb = isActive
    ? w < 1024
      ? 12
      : w < 1280
        ? 12
        : w < 1536
          ? 24
          : 30
    : 16;

  const titleOpacity = isActive ? 1 : 0.5;

  return { iconSize, iconMb, titleMb, titleOpacity };
};

const useWatermark = (
  title: string,
  directionRef: React.MutableRefObject<"forward" | "backward">,
) => {
  const [exitingTitle, setExitingTitle] = useState<string | null>(null);
  const [enteringTitle, setEnteringTitle] = useState(title);
  const [animKey, setAnimKey] = useState(0);
  const [exitDir, setExitDir] = useState<"forward" | "backward">("forward");
  const prevTitleRef = useRef(title);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (title === prevTitleRef.current) return;
    clearTimeout(exitTimer.current);
    setExitDir(directionRef.current);
    setExitingTitle(prevTitleRef.current);
    setEnteringTitle(title);
    setAnimKey((k) => k + 1);
    prevTitleRef.current = title;
    exitTimer.current = setTimeout(() => setExitingTitle(null), 750);
    return () => clearTimeout(exitTimer.current);
  }, [title]); // eslint-disable-line react-hooks/exhaustive-deps

  return { exitingTitle, enteringTitle, animKey, exitDir };
};

export default function WhyDosteen() {
  const { heading, slides } = whyDosteenData;
  const n = slides.length;

  const [active, setActive] = useState(0);
  const [contentReady, setContentReady] = useState(0);
  const [circleSm, setCircleSm] = useState(CIRCLE_SM);
  const [windowWidth, setWindowWidth] = useState(1440);
  const slideDirRef = useRef<"forward" | "backward">("forward");

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const contentRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const isAnimating = useRef(false);

  const goTo = (index: number, dir: "forward" | "backward") => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    slideDirRef.current = dir;
    setActive(index);
    setTimeout(() => {
      isAnimating.current = false;
    }, CIRCLE_MS + 100);
  };

  const advance = () => goTo((active + 1) % n, "forward");
  const retreat = () => goTo((active - 1 + n) % n, "backward");

  useEffect(() => {
    timerRef.current = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [active]);

  useEffect(() => {
    setContentReady(-1);
    contentRef.current = setTimeout(() => setContentReady(active), CIRCLE_MS);
    return () => clearTimeout(contentRef.current);
  }, [active]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      if (w < 640) setCircleSm(110);
      else if (w < 1024) setCircleSm(155);
      else setCircleSm(CIRCLE_SM);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const wm = useWatermark(slides[active].title, slideDirRef);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    isDragging.current = false;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < DRAG_THRESHOLD) return;
    if (delta < 0) {
      clearTimeout(timerRef.current);
      advance();
    } else {
      clearTimeout(timerRef.current);
      retreat();
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    dragStartX.current = null;
  };

  const exitAnim =
    wm.exitDir === "forward"
      ? "wmExitLeft  750ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
      : "wmExitRight 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards";
  const enterAnim =
    wm.exitDir === "forward"
      ? `wmEnterRight 750ms cubic-bezier(0.4, 0, 0.2, 1) forwards, wmDrift ${AUTOPLAY_MS}ms linear 750ms forwards`
      : `wmEnterLeft  750ms cubic-bezier(0.4, 0, 0.2, 1) forwards, wmDrift ${AUTOPLAY_MS}ms linear 750ms forwards`;

  return (
    <section className="relative w-full lg:min-h-screen overflow-hidden flex flex-col select-none py-[50px] sm:py-140">
      <PrimaryNoise />

      <Image
        src="/assets/icons/bg-svg/why-dosteen-animated.svg"
        alt=""
        width={948}
        height={439}
        className="pointer-events-none absolute right-[-30%] md:right-[5%] lg:right-[12%] bottom-0 w-[400px] h-[110px] sm:w-[460px] sm:h-[200px] md:h-[160px] lg:w-[700px] lg:h-[300px] 3xl:w-[948px] 3xl:h-[430px]"
      />

      <div className="relative container">
        <div className="flex justify-between w-full">
          <SectionTitle
            text={heading}
            className="text-left md:text-center text-white font-helvetica uppercase section-heading leading-[1.111] w-full"
          />
          <div className="md:hidden">
            <div className="flex items-center py-[3px] leading-[0.5] h-[26px] w-[55px] justify-center text-15 font-light font-poppins text-white rounded-full border border-white">
              <span className="font-[600]">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span>/{String(n).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute top-full mt-[15px] sm:mt-80 3xl:mt-[85px] left-1/2 -translate-x-1/2 w-screen flex justify-center pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {wm.exitingTitle && (
            <span
              key={`wm-exit-${wm.animKey}`}
              className="absolute font-helvetica uppercase whitespace-nowrap text-white leading-[105%] text-[70px] sm:text-[150px] lg:text-300 3xl:text-400"
              style={{ animation: exitAnim }}
            >
              {wm.exitingTitle}
            </span>
          )}
          <span
            key={`wm-enter-${wm.animKey}`}
            className="font-helvetica uppercase whitespace-nowrap text-white opacity-6 leading-[105%] text-[70px] sm:text-[150px] lg:text-300 3xl:text-400"
            style={{ animation: enterAnim }}
          >
            {wm.enteringTitle}
          </span>
        </motion.div>
      </div>

      <div className="relative flex-1 flex items-center pt-[15px] sm:pt-80 3xl:pt-[85px]">
        <div className="container relative z-20 w-full">
          <div className="hidden md:block absolute left-[15px] bottom-[calc(0%-28px)] lg:top-[calc(50%+18px)]">
            <div className="flex items-center py-[3px] leading-[0.5] h-[24px] w-[58px] sm:h-[28px] sm:w-[70px] lg:h-[31px] lg:w-[78px] justify-center text-[10px] sm:text-[13px] lg:text-15 font-[300] font-poppins text-white rounded-full border border-white">
              <span className="font-[600]">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span>/{String(n).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Drag surface */}
          <div
            className="relative sm:mx-2 md:mx-10 lg:mx-30 xl:ml-38 xl:mr-30 3xl:ml-38 3xl:mr-56 h-[264px] sm:h-[380px] lg:h-[530px] 3xl:h-[720px] touch-pan-y cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className="absolute top-1/2 h-px pointer-events-none"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                background:
                  "linear-gradient(90deg, rgba(118,167,255,0.05) 0%, #76A7FF 50%, rgba(118,167,255,0.05) 100%)",
              }}
            />

            {/* Border rings — unchanged */}
            {slides.map((_, i) => {
              const offset = (i - active + n) % n;
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isVisible = isActive || isNext;

              return (
                <div
                  key={`border-${i}`}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none ${
                    isActive
                      ? "w-[263px] h-[263px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[470px] lg:h-[470px] 2xl:w-[560px] 2xl:h-[560px] 3xl:w-[720px] 3xl:h-[720px]"
                      : "w-[75.93px] h-[75.93px] sm:w-[155px] sm:h-[155px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] 2xl:w-[250px] 2xl:h-[250px] 3xl:w-[284px] 3xl:h-[284px]"
                  }`}
                  style={{
                    left: getLeft(offset, n, circleSm),
                    opacity: isVisible ? 1 : 0,
                    zIndex: isActive ? 3 : isNext ? 2 : 1,
                    transition: BEZIER,
                  }}
                >
                  <div
                    className="absolute -inset-[1px] pointer-events-none"
                    style={{
                      animation: isActive
                        ? "spinCW 3s linear infinite"
                        : "spinCCW 4s linear infinite",
                    }}
                  >
                    <Image
                      src={
                        isActive
                          ? "/assets/images/home/why-dosteen/big-circle.svg"
                          : "/assets/images/home/why-dosteen/small-circle.svg"
                      }
                      alt=""
                      fill
                      aria-hidden="true"
                      className="pointer-events-none"
                    />
                  </div>
                </div>
              );
            })}

            {/* Content circles — icon size, font size, bg gradient all via inline style → smooth transition */}
            {slides.map((slide, i) => {
              const offset = (i - active + n) % n;
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isVisible = isActive || isNext;
              const showDesc = isActive && contentReady === i;
              const s = getSlideStyles(isActive, windowWidth);

              return (
                <div
                  key={i}
                  className={`absolute top-1/2 -translate-y-1/2 rounded-full overflow-hidden ${
                    isActive
                      ? "w-[264px] h-[264px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[470px] lg:h-[470px] 2xl:w-[560px] 2xl:h-[560px] 3xl:w-[720px] 3xl:h-[720px]"
                      : "w-[76.93px] h-[76.93px] sm:w-[155px] sm:h-[155px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] 2xl:w-[250px] 2xl:h-[250px] 3xl:w-[284px] 3xl:h-[284px]"
                  }`}
                  style={{
                    left: getLeft(offset, n, circleSm),
                    opacity: isVisible ? 1 : 0,
                    zIndex: isActive ? 3 : isNext ? 2 : 1,
                    backdropFilter: "blur(7px)",
                    transition: BEZIER,
                  }}
                >
                  {/* Two gradient layers cross-faded — browsers can't transition gradient strings directly */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.2) 100%)",
                      opacity: isActive ? 1 : 0,
                      transition: BEZIER,
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.1) 100%)",
                      opacity: isActive ? 0 : 1,
                      transition: BEZIER,
                    }}
                  />
                  <div className="relative w-full h-full rounded-full flex flex-col items-center justify-center">
                    {/* Icon — width/height/marginBottom all interpolated */}
                    <div
                      className="relative flex items-center justify-center shrink-0 pointer-events-none"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        width: s.iconSize,
                        height: s.iconSize,
                        marginBottom: s.iconMb,
                        transition: BEZIER,
                      }}
                    >
                      <Image
                        src={slide.icon}
                        alt={slide.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Title — className for font size (preserves clamp vars), color/mb via style */}
                    <p
                      className={`text-center font-[300] -tracking-[2%] font-poppins ${
                        isActive
                          ? "text-[24px] lg:text-55"
                          : "text-[12px] sm:text-[17px] lg:text-30"
                      }`}
                      style={{
                        color: `rgba(255,255,255,${s.titleOpacity})`,
                        marginBottom: s.titleMb,
                        opacity: isVisible ? 1 : 0,
                        transition: BEZIER,
                      }}
                    >
                      {slide.title}
                    </p>

                    {/* Description — unchanged */}
                    <div
                      className={`${isActive ? "h-[56px] sm:h-[90px] lg:h-[120px]" : "h-0"}`}
                      style={{
                        transition: BEZIER,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        className="text-center font-[300] -tracking-[2%] font-poppins text-15 lg:text-25 3xl:text-30 leading-[1.33] max-w-[508px] px-6 lg:px-18 2xl:px-15 3xl:px-0 text-white"
                        style={{
                          opacity: showDesc ? 1 : 0,
                          transform: showDesc
                            ? "translateY(0)"
                            : "translateY(20px)",
                          transition:
                            "opacity 500ms ease, transform 300ms ease",
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

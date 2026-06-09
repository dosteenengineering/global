// "use client";

// import { useRef, useEffect, useState } from "react";
// import { bimData } from "../data";
// import Link from "next/link";
// import SectionTitle from "@/app/components/common/animations/SectionTitle";
// import { motion } from "framer-motion";
// import { moveUp } from "@/app/components/motionVariants";

// export default function BimSection() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const progressBarRef = useRef<HTMLDivElement>(null);
//   const rafRef = useRef<number | null>(null);
//   const [videoReady, setVideoReady] = useState(false);
//   const [arrowHovered, setArrowHovered] = useState(false);

//   useEffect(() => {
//     const video = videoRef.current;
//     const bar = progressBarRef.current;
//     if (!video || !bar) return;

//     const tick = () => {
//       if (video.duration) {
//         bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
//       }
//       rafRef.current = requestAnimationFrame(tick);
//     };

//     const onCanPlay = () => setVideoReady(true);
//     const onPlay = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(tick);
//     };
//     const onPause = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };

//     video.addEventListener("canplay", onCanPlay);
//     video.addEventListener("play", onPlay);
//     video.addEventListener("pause", onPause);

//     if (video.readyState >= 3) setVideoReady(true);
//     if (!video.paused) onPlay();

//     return () => {
//       video.removeEventListener("canplay", onCanPlay);
//       video.removeEventListener("play", onPlay);
//       video.removeEventListener("pause", onPause);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   return (
//     <section className="relative   lg:h-auto lg:min-h-screen w-full overflow-hidden bg-black">
//       <video
//         ref={videoRef}
//         src={bimData.videoSrc}
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//         className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
//         style={{ opacity: videoReady ? 1 : 0 }}
//       />

//       <div
//         className="absolute inset-0 z-[1]"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.5) 100%)",
//         }}
//       />

//       <div className="container relative z-10 h-full flex flex-col  py-[105px] lg:py-140 3xl:pt-[177px]">
//         <SectionTitle
//           text={bimData.heading}
//           className="text-white section-heading-90 max-w-[22ch] mb-[30px] md:mb-40 lg:mb-[28px]"
//         />

//         <motion.div
//           variants={moveUp(0.2)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.5 }}
//           className="flex items-start md:items-center gap-[10px] md:gap-[35px] mb-[50px] md:mb-120 3xl:mb-[133px] flex-col md:flex-row"
//         >
//           <div className="w-full md:flex-1 h-[2px] bg-white/35 relative">
//             <div
//               ref={progressBarRef}
//               className="absolute inset-0 top-1/2 -translate-y-1/2 bg-primary h-[4px] origin-left will-change-transform"
//               style={{ transform: "scaleX(0)" }}
//             />
//           </div>
//           <span className="text-white/60 text-19 leading-[1.67] md:leading-[1.52] font-light font-poppins -tracking-[2%]">
//             {bimData.progressLabel}
//           </span>
//         </motion.div>

        
//           <motion.p
//             variants={moveUp(0.4)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.5 }}
//             className="text-white text-30 leading-[1.33] font-poppins font-light-tracking-[2%] sm:ml-[calc(50%_-_100px)] md:ml-[calc(50%_-_130px)] max-w-[540px] mb-[66px] md:mb-80 2xl:mb-[82px]"
//           >
//             {bimData.description}
//           </motion.p>

//         <motion.div
//           variants={moveUp(0.6)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.5 }}
//         >
//           <Link href={"#"} target="_blank">
//             <div
//               className="relative 3xl:w-[150px] 3xl:h-[150px] xl:w-[110px] xl:h-[110px] lg:w-[100px] lg:h-[100px] md:w-[70px] md:h-[70px] w-[80px] h-[80px] hover:cursor-pointer hover:translate-y-[-12px] hover:translate-x-[12px] transition-all duration-300 overflow-hidden"
//               onMouseEnter={() => setArrowHovered(true)}
//               onMouseLeave={() => setArrowHovered(false)}
//             >
//               {/* Inline SVG — white strokes by default */}
//               <svg
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 150 150"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0"
//               >
//                 <path d="M10.0469 10.0659H139.947V139.936" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M139.959 10.0659L10.6797 139.936" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>

//               {/* Primary color SVG — wipes in left to right on hover */}
//               <svg
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 150 150"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute inset-0"
//                 style={{
//                   clipPath: arrowHovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
//                   transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//                 }}
//               >
//                 <path d="M10.0469 10.0659H139.947V139.936" stroke="#294596" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M139.959 10.0659L10.6797 139.936" stroke="#294596" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </div>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { bimData } from "../data";
import Link from "next/link";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const SLIDE_DURATION = 6000; // ms

type Slide = (typeof bimData)[number];

/* ─── Background (video or image) ─────────────────────────────────── */
function SlideBackground({
  slide,
  active,
}: {
  slide: Slide;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={slide.heading}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {slide.background.type === "video" ? (
            <video
              ref={videoRef}
              src={slide.background.src}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.background.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Arrow button ─────────────────────────────────────────────────── */
function ArrowLink({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} target="_blank">
      <div
        className="relative 3xl:w-[150px] 3xl:h-[150px] xl:w-[110px] xl:h-[110px] lg:w-[100px] lg:h-[100px] md:w-[70px] md:h-[70px] w-[80px] h-[80px] hover:cursor-pointer hover:translate-y-[-12px] hover:translate-x-[12px] transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* white */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <path d="M10.0469 10.0659H139.947V139.936" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M139.959 10.0659L10.6797 139.936" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* primary colour wipe */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          style={{
            clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <path d="M10.0469 10.0659H139.947V139.936" stroke="#294596" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M139.959 10.0659L10.6797 139.936" stroke="#294596" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

/* ─── Main section ─────────────────────────────────────────────────── */
export default function BimSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // 0–1

  const startRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const total = bimData.length;
  const next = (current + 1) % total;

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  /* timer loop */
  useEffect(() => {
    const tick = (now: number) => {
      if (!pausedRef.current) {
        const elapsed = now - startRef.current;
        const p = Math.min(elapsed / SLIDE_DURATION, 1);
        setProgress(p);
        if (p >= 1) {
          setCurrent((c) => {
            const n = (c + 1) % total;
            startRef.current = performance.now();
            setProgress(0);
            return n;
          });
        }
      } else {
        startRef.current = performance.now() - progress * SLIDE_DURATION;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const slide = bimData[current];
  const nextSlide = bimData[next];

  return (
    <section className="relative lg:h-auto lg:min-h-screen w-full overflow-hidden bg-black">
      {/* backgrounds — render all, only active is visible */}
      {bimData.map((s, i) => (
        <SlideBackground key={i} slide={s} active={i === current} />
      ))}

      {/* overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="container relative z-10 h-full flex flex-col py-[105px] lg:py-140 3xl:pt-[177px]">
        {/* heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`heading-${current}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <SectionTitle
              text={slide.heading}
              className="text-white section-heading-90 max-w-[22ch] mb-[30px] md:mb-40 lg:mb-[28px]"
            />
          </motion.div>
        </AnimatePresence>

        {/* progress bar + next-slide label */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex items-start md:items-center gap-[10px] md:gap-[35px] mb-[50px] md:mb-120 3xl:mb-[133px] flex-col md:flex-row"
        >
          <div
            className="w-full md:flex-1 h-[2px] bg-white/35 relative cursor-pointer"
            onClick={() => goTo(next)}
          >
            <div
              className="absolute inset-0 top-1/2 -translate-y-1/2 bg-primary h-[4px] origin-left will-change-transform"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          {/* next slide title shown as label */}
          <span
            className="text-white/60 text-19 leading-[1.67] md:leading-[1.52] min-w-[321px] font-light font-poppins -tracking-[2%] cursor-pointer hover:text-white/90 transition-colors duration-300"
            onClick={() => goTo(next)}
          >
            {nextSlide.heading}
          </span>
        </motion.div>

        {/* description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="text-white text-30 leading-[1.33] font-poppins font-light-tracking-[2%] sm:ml-[calc(50%_-_100px)] md:ml-[calc(50%_-_130px)] max-w-[540px] mb-[66px] md:mb-80 2xl:mb-[82px]"
          >
            {slide.description}
          </motion.p>
        </AnimatePresence>

        {/* arrow */}
        <motion.div
          variants={moveUp(0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <ArrowLink href={slide.link} />
        </motion.div>
      </div>
    </section>
  );
}
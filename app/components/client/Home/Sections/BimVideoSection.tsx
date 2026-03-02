"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { bimData } from "../data";

export default function BimSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar) return;

    const tick = () => {
      if (video.duration) {
        bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onCanPlay = () => setVideoReady(true);
    const onPlay = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    const onPause = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    // If already ready (cached)
    if (video.readyState >= 3) setVideoReady(true);
    if (!video.paused) onPlay();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video — hidden until ready to prevent flash */}
      <video
        ref={videoRef}
        src={bimData.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: videoReady ? 1 : 0 }}
      />

      {/* Overlay — always present so bg-black shows through while video loads */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="container relative z-10 h-full flex flex-col justify-center py-140 3xl:pt-[177px]">
        <h1 className="text-white text-90 leading-[1.111] font-helvetica max-w-[721px] mb-8 3xl:mb-[45px]">
          {bimData.heading}
        </h1>

        <div className="flex items-center gap-[35px] mb-120 3xl:mb-[145px]">
          <div className="flex-1 h-[2px] bg-white/35 relative">
            <div
              ref={progressBarRef}
              className="absolute inset-0 top-1/2 -translate-y-1/2 bg-primary h-[4px] origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="text-white/60 text-19 leading-[1.52] font-[300] font-poppins -tracking-[2%]">
            {bimData.progressLabel}
          </span>
        </div>

        <p className="text-white text-30 leading-[1.33] font-poppins font-[300] -tracking-[2%] ml-[calc(50%_-_130px)] max-w-[540px] mb-15 3xl:mb-[82px]">
          {bimData.description}
        </p>

        <div className="3xl:w-[150px] 3xl:h-[150px] w-[100px] h-[100px] hover:cursor-pointer hover:translate-y-[-15px] hover:translate-x-[15px] transition-all duration-300">
          <Image
            src={bimData.arrowImage}
            alt="Arrow"
            width={150}
            height={150}
          />
        </div>
      </div>
    </section>
  );
}
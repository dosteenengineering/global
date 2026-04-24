"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Bg() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1853D6 0%, #022E9E 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/assets/noise/primary-noise.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "250px",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
    </>
  );
}

export default function PrimaryNoise({ className = "" }) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const start = window.innerWidth >= 1024 ? "top 80%" : "top 65%";

      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el.closest("section") ?? el.parentElement,
            start,
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0" style={{ opacity: 0.9 }}>
        <Bg />
      </div>
      <div
        ref={revealRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <Bg />
      </div>
    </div>
  );
}

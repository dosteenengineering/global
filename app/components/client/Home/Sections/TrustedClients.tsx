"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { trustedClientsData } from "../data";
import { div } from "framer-motion/client";

const TrustedClients = () => {
  const { logos } = trustedClientsData;

  const isDesktopRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    isDesktopRef.current = window.innerWidth >= 1024;
    const duration = isDesktopRef.current ? 50 : 15;

    track.querySelectorAll("[data-clone='true']").forEach((n) => n.remove());

    const originalItems = Array.from(track.children) as HTMLElement[];

    const lastItem = originalItems[originalItems.length - 1];
    const singleSetWidth = lastItem.offsetLeft + lastItem.offsetWidth;

    const gapWidth =
      originalItems.length >= 2
        ? originalItems[1].offsetLeft - originalItems[0].offsetWidth
        : 0;

    const strideWidth = singleSetWidth + gapWidth;

    let totalClonedWidth = 0;
    while (totalClonedWidth < viewport.offsetWidth * 2.5) {
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.dataset.clone = "true";
        track.appendChild(clone);
      });
      totalClonedWidth += strideWidth;
    }

    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: -strideWidth,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(gsap.utils.wrap(-strideWidth, 0)),
      },
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, []);

  return (
    <section className="bg-white py-120 overflow-hidden">
      <div className="container">
        <div
          ref={viewportRef}
          onMouseEnter={() => {
            if (isDesktopRef.current) tweenRef.current?.pause();
          }}
          onMouseLeave={() => {
            if (isDesktopRef.current) tweenRef.current?.resume();
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-110 3xl:gap-[127px] pointer-events-none"
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center w-fit h-[50px] lg:h-[80px]"
              >
                <Image
                  src={logo}
                  alt=""
                  height={80}
                  width={0}
                  className="object-contain max-w-[160px] h-[50px] lg:h-[80px] w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { residentialData } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function ResidentialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerImageRef = useRef<HTMLDivElement>(null);
  const titleLine0Ref = useRef<HTMLHeadingElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const descWordsRef = useRef<HTMLSpanElement[]>([]);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const centerSlotRef = useRef<HTMLDivElement>(null);
  const leftImagesRef = useRef<HTMLDivElement>(null);
  const rightImagesRef = useRef<HTMLDivElement>(null);

  const { banner, second } = residentialData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto typewriter — fires independently of scroll, reverses on scroll back
      const typewriterTween = gsap.to(descWordsRef.current, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        duration: 0.18,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        onUpdate: (self) => {
          if (
            self.progress >= 0.22 &&
            self.direction === 1 &&
            typewriterTween.progress() === 0
          )
            typewriterTween.play();
          if (
            self.progress < 0.22 &&
            self.direction === -1 &&
            typewriterTween.progress() > 0
          )
            typewriterTween.reverse();
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=280%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Title rises to ~50vh
      tl.to(
        [titleLine0Ref.current, titleLine1Ref.current],
        { y: "-38vh", ease: "none", duration: 1 },
        0,
      );

      // X drift starts mid-rise — line 0 right, line 1 left
      tl.to(
        titleLine0Ref.current,
        { x: "30px", ease: "none", duration: 2 },
        0.5,
      );
      tl.to(
        titleLine1Ref.current,
        { x: "-30px", ease: "none", duration: 2 },
        0.5,
      );

      // Title continues up and fades
      tl.to(
        titleLine0Ref.current,
        { y: "-75vh", opacity: 0, ease: "none", duration: 1.2 },
        1,
      );
      tl.to(
        titleLine1Ref.current,
        { y: "-75vh", opacity: 0, ease: "none", duration: 1.2 },
        1,
      );

      // Description moves up and fades
      tl.to(
        descRef.current,
        { y: "-25vh", opacity: 0, ease: "none", duration: 1 },
        2.8,
      );

      // Banner scales down and moves to center slot
      tl.to(
        bannerImageRef.current,
        {
          width: "200px",
          height: "200px",
          x: () => {
            const slot = centerSlotRef.current;
            if (!slot) return 0;
            const { left, width } = slot.getBoundingClientRect();
            return left + width / 2 - window.innerWidth / 2;
          },
          y: () => {
            const slot = centerSlotRef.current;
            if (!slot) return 0;
            const { top, height } = slot.getBoundingClientRect();
            return top + height / 2 - window.innerHeight / 2;
          },
          ease: "power2.inOut",
          duration: 1.6,
          invalidateOnRefresh: true, // recalculates on every ScrollTrigger.refresh()
        },
        3.8,
      );

      // Side images parallax up
      tl.to(
        leftImagesRef.current,
        { y: "-120px", ease: "none", duration: 0.8 },
        5,
      );
      tl.to(
        rightImagesRef.current,
        { y: "-120px", ease: "none", duration: 0.8 },
        5,
      );
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const descWords = banner.description.split(" ");

  return (
    <div ref={containerRef} className="relative">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Banner image — shrinks and flies to center slot */}
        <div
          ref={bannerImageRef}
          className="absolute inset-0 w-full h-full overflow-hidden bg-white"
          style={{ margin: "auto", zIndex: 5 }}
        >
          <Image
            src={banner.image}
            alt="Residential Development"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.6) 100%);",
            }}
          />
        </div>

        {/* Title + Description — inside container, pinned to bottom */}
        <div className="flex justify-between w-full container h-full items-end pb-120 z-10">
          <div className="z-10">
            {banner.title.split(" ").map((line, i) => (
              <h1
                key={i}
                ref={i === 0 ? titleLine0Ref : titleLine1Ref}
                className="text-white section-heading will-change-transform"
              >
                {line}
              </h1>
            ))}
          </div>
          <div ref={descRef} className="z-10 will-change-transform">
            <p className="text-white text-30 leading-[1.33] font-light tracking-[-0.02em] max-w-[30ch]">
              {descWords.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) descWordsRef.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  {word}
                  {i < descWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Second section */}
        <div
          ref={secondSectionRef}
          className="absolute inset-0 z-0 flex items-center justify-center bg-white"
        >
          <div className="w-full flex items-center justify-between container">
            {/* Left images — 200px from section top, 200×200 each */}
            <div
              ref={leftImagesRef}
              className="flex flex-col gap-200 3xl:gap-[244px] will-change-transform"
            >
              {second.leftImages.map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden w-[180px] h-[180px] 3xl:w-[200px] 3xl:h-[200px]"
                >
                  <Image
                    src={src}
                    alt={`Left ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Center — invisible landing slot (244px from top via pt-[243px] on parent) + heading + description */}
            <div className="flex flex-col items-center justify-center flex-1">
              <div
                ref={centerSlotRef}
                className="w-[200px] h-[200px] shrink-0 mb-80"
              />
              <h2 className="section-heading text-secondary max-w-[40ch] text-center mb-20">
                {second.heading}
              </h2>
              <p className="text-center text-description text-paragraph max-w-[930px] whitespace-pre-line">
                {second.description}
              </p>
            </div>

            {/* Right images — 200px from section top, 200×200 each */}
            <div
              ref={rightImagesRef}
              className="flex flex-col gap-200 3xl:gap-[244px] will-change-transform"
            >
              {second.rightImages.map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden w-[180px] h-[180px] 3xl:w-[200px] 3xl:h-[200px]"
                >
                  <Image
                    src={src}
                    alt={`Right ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

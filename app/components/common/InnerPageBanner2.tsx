"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  title: string;
  image: string;
}

export default function InnerPageBanner2({ title, image }: Props) {
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleImageLoad = () => {
    const img = imgRef.current;
    const title = titleRef.current;
    if (!img || !title) return;

    tlRef.current?.kill();

    const tl = gsap.timeline();

    // Step 1: scale down 1.5 → 1.0 (initial zoom out)
    tl.fromTo(
      img,
      { scale: 1.5, opacity: 0 },
      {
        scale: 1.0,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
      },
    );

    // Step 2: title reveal 
    tl.fromTo(
      title,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      "<0.4",
    );

    tl.to(
      img,
      {
        scale: 1.08,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      "+=0",
    );

    tlRef.current = tl;
  };

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-[390px] md:h-[550px] overflow-hidden">
      <div ref={imgRef} style={{ opacity: 0 }} className="absolute inset-0">
        <Image
          src={image}
          alt="Banner"
          fill
          priority
          className="object-cover"
          onLoad={handleImageLoad}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)" }}
      />

      <div className="container relative h-full overflow-hidden">
        <h1
          ref={titleRef}
          style={{ opacity: 0 }}
          className="absolute text-white banner-heading leading-[1] uppercase bottom-[30px] md:bottom-70 3xl:bottom-[74px] pl-[15px]"
        >
          {title}
        </h1>
      </div>
    </section>
  );
}

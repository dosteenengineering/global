// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import type { Swiper as SwiperType } from "swiper";
// import "swiper/css";
// import { whyTrustData } from "../data";
// import SectionTitle from "@/app/components/common/animations/SectionTitle";

// const cardGradient = `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), linear-gradient(180deg, rgba(41,69,150,0) 0%, rgba(41,69,150,0.3) 100%)`;

// interface StatCard {
//   id: number;
//   value: string;
//   title: string;
//   image: string;
// }

// function StatCard({ card }: { card: StatCard }) {
//   return (
//     <div className="relative h-[430px] 3xl:h-[514px] overflow-hidden cursor-pointer group">
//       {/* Image */}
//       <Image
//         src={card.image}
//         alt={card.title}
//         fill
//         className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//       />

//       {/* Gradient overlay */}
//       <div className="absolute inset-0" style={{ background: cardGradient }} />

//       {/* Text — bottom left */}
//       <div className="absolute bottom-0 left-0 p-30 z-10">
//         <div className="flex items-start mb-[5px]">
//           <span className="text-55 font-light text-white leading-[1.1818] tracking-[-0.02em]">
//             {card.value.replace("+", "")}
//           </span>
//           {card.value.includes("+") && (
//             <span className="text-[33px] leading-none relative 2xl:top-[3px] 3xl:top-[5px] text-white font-light font-poppins">
//               +
//             </span>
//           )}
//         </div>
//         <p className="text-white text-description">
//           {card.title}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function WhyTrustDosteen() {
//   const { title, stats } = whyTrustData;
//   const swiperRef = useRef<SwiperType | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [dotCount, setDotCount] = useState(0);
//   const [showDots, setShowDots] = useState(false);

//   return (
//     <section className="w-full bg-white pt-140 3xl:pt-200">
//       <div className="container">
//         <div className="border-b-2 border-[#c2c2c2] pb-140 3xl:pb-150">
//           {/* Title */}
//           <SectionTitle
//             title={title}
//             className="mb-50 section-heading text-secondary max-w-[24ch]"
//           />
//           {/* Swiper */}
//           <Swiper
//             onSwiper={(swiper) => {
//               swiperRef.current = swiper;
//               const total = swiper.slides.length;
//               const perView = Math.round(swiper.params.slidesPerView as number);
//               const dots = Math.max(0, total - perView + 1);
//               setDotCount(dots);
//               setShowDots(dots > 1);
//             }}
//             onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//             onBreakpoint={(swiper) => {
//               const total = swiper.slides.length;
//               const perView = Math.round(swiper.params.slidesPerView as number);
//               const dots = Math.max(0, total - perView + 1);
//               setDotCount(dots);
//               setShowDots(dots > 1);
//             }}
//             spaceBetween={20}
//             slidesPerView={2}
//             breakpoints={{
//               1024: { slidesPerView: 3 },
//               1280: { slidesPerView: 4 },
//               1400: { slidesPerView: 5, spaceBetween: 17 },
//               1792: { slidesPerView: 5, spaceBetween: 20 },
//             }}
//             className="w-full"
//           >
//             {stats.map((card) => (
//               <SwiperSlide key={card.id}>
//                 <StatCard card={card} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           {/* Pagination dots — only when not all cards visible */}
//           {showDots && (
//             <div className="flex items-center justify-center gap-[10px] mt-40">
//               {Array.from({ length: dotCount }).map((_, i) => (
//                 <button
//                   type="button"
//                   key={i}
//                   onClick={() => swiperRef.current?.slideTo(i)}
//                   aria-label={`Go to slide ${i + 1}`}
//                   className={`w-[10px] h-[10px] rounded-full border border-secondary cursor-pointer transition-all duration-300 ${
//                     i === activeIndex ? "bg-secondary" : "bg-transparent"
//                   }`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { whyTrustData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardGradient = `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), linear-gradient(180deg, rgba(41,69,150,0) 0%, rgba(41,69,150,0.3) 100%)`;

interface StatCard {
  id: number;
  value: string;
  title: string;
  image: string;
}

function StatCard({
  card,
  cardRef,
}: {
  card: StatCard;
  cardRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={cardRef}
      className="relative h-[430px] 3xl:h-[514px] overflow-hidden cursor-pointer group"
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        // "is-active" class added/removed via JS — group-hover always works on top
        className="object-cover grayscale group-hover:grayscale-0 [.is-active_&]:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0" style={{ background: cardGradient }} />
      <div className="absolute bottom-0 left-0 p-40 z-10">
        <div className="flex items-start mb-[5px]">
          <span className="text-55 font-light text-white leading-[1.1818] tracking-[-0.02em]">
            {card.value.replace("+", "")}
          </span>
          {card.value.includes("+") && (
            <span className="text-[33px] leading-none relative 2xl:top-[3px] 3xl:top-[5px] text-white font-light font-poppins">
              +
            </span>
          )}
        </div>
        <p className="text-white text-description">{card.title}</p>
      </div>
    </div>
  );
}

export default function WhyTrustDosteen() {
  const { title, stats } = whyTrustData;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const swiperWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const spacer = spacerRef.current;
    if (!section || !spacer) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const scrollPerCard = window.innerHeight * 0.6;
    const totalScrollLength = scrollPerCard * cards.length;

    spacer.style.height = `${totalScrollLength}px`;

    gsap.set(cards, { clipPath: "inset(100% 0% 0% 0%)" });

    // Helper: set is-active only on the card currently animating in
    const setActiveCard = (progress: number) => {
      // progress 0→1 across the full timeline
      // each card occupies 1/cards.length of the timeline
      const step = 1 / cards.length;
      const currentIndex = Math.min(
        Math.floor(progress / step),
        cards.length - 1
      );

      cards.forEach((card, i) => {
        if (i === currentIndex) {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }
      });

      // Once fully done, remove all active states
      if (progress >= 1) {
        cards.forEach((card) => card.classList.remove("is-active"));
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "5% top",
        end: `+=${totalScrollLength}`,
        pin: true,
        pinSpacing: false,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => setActiveCard(self.progress),
      },
    });

    cards.forEach((_, i) => {
      tl.to(
        cards[i],
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          duration: 1,
        },
        i
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="w-full bg-white pt-140 3xl:pt-200">
        <div className="container">
          <div className="border-b-2 border-[#c2c2c2] pb-140 3xl:pb-150">
            <SectionTitle
              title={title}
              className="mb-50 section-heading text-secondary max-w-[24ch]"
            />

            <div ref={swiperWrapRef}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  const total = swiper.slides.length;
                  const perView = Math.round(
                    swiper.params.slidesPerView as number
                  );
                  const dots = Math.max(0, total - perView + 1);
                  setDotCount(dots);
                  setShowDots(dots > 1);
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                onBreakpoint={(swiper) => {
                  const total = swiper.slides.length;
                  const perView = Math.round(
                    swiper.params.slidesPerView as number
                  );
                  const dots = Math.max(0, total - perView + 1);
                  setDotCount(dots);
                  setShowDots(dots > 1);
                }}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                  1400: { slidesPerView: 5, spaceBetween: 17 },
                  1792: { slidesPerView: 5, spaceBetween: 20 },
                }}
                className="w-full"
              >
                {stats.map((card, i) => (
                  <SwiperSlide key={card.id}>
                    <StatCard
                      card={card}
                      cardRef={(el) => {
                        cardRefs.current[i] = el;
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {showDots && (
              <div className="flex items-center justify-center gap-[10px] mt-40">
                {Array.from({ length: dotCount }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => swiperRef.current?.slideTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`w-[10px] h-[10px] rounded-full border border-secondary cursor-pointer transition-all duration-300 ${
                      i === activeIndex ? "bg-secondary" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div ref={spacerRef} aria-hidden="true" />
    </>
  );
}
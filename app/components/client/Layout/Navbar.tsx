"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function Navbar() {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const pillTrackRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const menuIconRef = useRef<HTMLSpanElement>(null);
  const mobilePillRef = useRef<HTMLDivElement>(null);
  const mobileTextRef = useRef<HTMLSpanElement>(null);
  const mobileIconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -48 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
        0.08,
      );

      tl.fromTo(
        contactRef.current,
        { opacity: 0, y: -48 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
        0.2,
      );

      // Desktop pill expand
      tl.fromTo(
        pillTrackRef.current,
        { width: "1px", opacity: 1 },
        { width: "100%", duration: 0.8, ease: "power2.inOut" },
        0.32,
      );

      // Desktop MENU text
      tl.fromTo(
        menuTextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        1.2,
      );

      // Desktop hamburger icon
      tl.fromTo(
        menuIconRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        1.42,
      );

      // Mobile pill expand — same timing as desktop
      tl.fromTo(
        mobilePillRef.current,
        { width: "1px", opacity: 1 },
        { width: "100%", duration: 0.8, ease: "power2.inOut" },
        0.32,
      );

      // Mobile MENU text
      tl.fromTo(
        mobileTextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        1.2,
      );

      // Mobile hamburger icon
      tl.fromTo(
        mobileIconRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        1.42,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="absolute top-[20px] lg:top-[30px] left-0 w-full z-50">
      <div className="container relative flex items-center justify-between 3xl:px-5">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          data-nav-logo="true"
          className="flex justify-center items-center w-[160px] h-[40px] lg:w-[177px] lg:h-[47px]"
          style={{ opacity: 0 }}
        >
          <Image
            src="/assets/logos/logo-white-full.png"
            alt="Logo"
            width={177}
            height={47}
            className="pointer-events-none"
          />
        </Link>

        {/* <Link
  ref={logoRef}
  href="/"
  data-nav-logo="true"
  className="flex items-center gap-3 w-[160px] h-[40px] lg:w-[177px] lg:h-[47px]"
  style={{ opacity: 0 }}
>
  <Image
    src="/assets/logos/logo-white.svg"
    alt="Logo"
    width={42}
    height={47}
    className="h-full w-auto pointer-events-none"
  />
  <Image
    src="/assets/logos/logo-text.png"
    alt="Logo"
    width={119}
    height={33}
    className="h-[70%] w-auto pointer-events-none"
  />
</Link> */}

        {/* Desktop center pill */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <div className="min-w-[430px] 3xl:min-w-[540px] xl:min-h-[56px] flex items-center justify-center">
            <div
              ref={pillTrackRef}
              className="overflow-hidden rounded-[3px] w-full backdrop-blur-[5px]"
              style={{
                width: "1px",
                background:
                  "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
              }}
            >
              <button
                className="flex items-center justify-between gap-6 w-full py-[15px] px-5 xl:min-h-[56px]"
                style={{ whiteSpace: "nowrap" }}
              >
                <span
                  ref={menuTextRef}
                  className="text-15 uppercase font-[400] text-white tracking-wide"
                  style={{ opacity: 0 }}
                >
                  MENU
                </span>
                <span
                  ref={menuIconRef}
                  style={{ opacity: 0, display: "inline-flex", flexShrink: 0 }}
                >
                  <Image
                    src="/assets/icons/nav_menu.svg"
                    alt="Menu"
                    width={31}
                    height={10}
                    className="pointer-events-none"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right — Contact + mobile pill */}
        <div className="flex items-center gap-6">
          <Link
            ref={contactRef}
            href="/contact"
            className="hidden lg:block text-white text-19 leading-[1.368] uppercase font-[600]"
            style={{ opacity: 0 }}
          >
            CONTACT
          </Link>

          {/* Mobile pill */}
          <div className="lg:hidden" style={{ minWidth: "120px" }}>
            <div
              ref={mobilePillRef}
              className="overflow-hidden rounded-[3px] backdrop-blur-[5px]"
              style={{
                width: "1px",
                background:
                  "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
              }}
            >
              <button
                className="flex items-center justify-between gap-4 w-full py-[12px] px-4"
                style={{ whiteSpace: "nowrap", minHeight: "44px" }}
              >
                <span
                  ref={mobileTextRef}
                  className="text-14 uppercase font-[400] text-white"
                  style={{ opacity: 0 }}
                >
                  MENU
                </span>
                <span
                  ref={mobileIconRef}
                  style={{ opacity: 0, display: "inline-flex", flexShrink: 0 }}
                >
                  <Image
                    src="/assets/icons/nav_menu.svg"
                    alt="Menu"
                    width={26}
                    height={8}
                    className="pointer-events-none"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

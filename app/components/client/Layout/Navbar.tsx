"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function Navbar() {
  const logoRef = useRef<HTMLDivElement>(null);
  const navPillRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { label: "ABOUT US", hasDropdown: true, href: "/about" },
    { label: "SERVICES", hasDropdown: true, href: "/services" },
    { label: "SOLUTIONS", hasDropdown: true, href: "#" },
    { label: "RESOURCE HUB", hasDropdown: false, href: "#" },
    { label: "PROJECTS", hasDropdown: false, href: "/projects" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        navPillRef.current,
        { clipPath: "inset(0 100% 0 0 round 50px)" },
        {
          clipPath: "inset(0 0% 0 0 round 50px)",
          duration: 0.9,
          ease: "power3.out",
        },
        0.1,
      );

      // search icon
      tl.fromTo(
        searchRef.current,
        { opacity: 0, x: 28 },
        { opacity: 1, x: 0, duration: 0.5 },
        0.7,
      );

      // 2. Hamburger drops in
      tl.fromTo(
        hamburgerRef.current,
        { opacity: 0, y: -28 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.85,
      );

      // 3. Contact drops in
      tl.fromTo(
        contactRef.current,
        { opacity: 0, y: -28 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.7,
      );

      // 4. Logo fades up inside pill
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.7,
      );

      // 5. Nav items staggered one by one left → right
      tl.fromTo(
        navItemRefs.current.filter(Boolean),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.38, stagger: 0.08 },
        0.85,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="absolute top-[30px] md:top-[23px] left-0 w-full z-50">
      <div className="container flex items-center justify-between gap-4 w-full">
        <div
          ref={navPillRef}
          className="flex h-[62px] md:h-[70px] rounded-[50px] w-full max-w-[1127px]"
        >
          <div className="flex items-center justify-between rounded-[50px] border border-white/30 bg-white/8 glass-effect overflow-hidden w-full">
            {/* Logo */}
            <div
              ref={logoRef}
              className="shrink-0 pl-[17px] sm:pl-30 3xl:pl-[31px] pr-100"
              style={{ opacity: 0 }}
            >
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/assets/logos/logo-white-full.svg"
                  alt="Dosteen Logo"
                  width={300}
                  height={100}
                  className="3xl:w-[164px] h-[27.35px] w-[103px] sm:w-auto sm:h-[35px] md:h-[43px] object-contain pointer-events-none shrink-0"
                />
              </Link>
            </div>

            {/* Nav items */}
            <div className="hidden min-[1200px]:flex items-center flex-1 gap-40 pr-80 2xl:pr-100 3xl:pr-150">
              {navItems.map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => {
                    navItemRefs.current[i] = el;
                  }}
                  className="relative group"
                  style={{ opacity: 0 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-[7px] text-white whitespace-nowrap cursor-pointer"
                  >
                    <span className="text-15 leading-[1.733] uppercase">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <Image
                        src="/assets/icons/arrow-down-tip.svg"
                        alt=""
                        width={15}
                        height={10}
                        className="w-auto h-[7px] pointer-events-none"
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Search icon */}
            <button
              ref={searchRef}
              className="hidden md:flex shrink-0 cursor-pointer items-center justify-center w-[38px] h-[38px] md:w-[45.61px] md:h-[45.61px] rounded-full bg-white/8 border border-white/20 backdrop-blur-[10px] mr-[20.39px]"
            >
              <Image
                src="/assets/icons/search.svg"
                alt="Search"
                width={30}
                height={30}
                className="w-auto h-[15px] md:w-[20.64px] md:h-[20.64px] pointer-events-none"
              />
            </button>

            <div className="md:hidden rounded-full shrink-0 over pr-[15px]">
              <button
                className="cursor-pointer flex items-center justify-center group shrink-0"
                aria-label="Open menu"
              >
                <Image
                  src="/assets/icons/hamburger.svg"
                  alt="Hamburger"
                  width={30}
                  height={30}
                  className="w-[20px] h-[15px] pointer-events-none"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right group — Contact + Hamburger */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Contact pill */}
          <div className="rounded-[50px] overflow-hidden">
            <Link
              ref={contactRef}
              href="/contact"
              className="hidden min-[1400px]:flex group items-center gap-3 justify-center h-[70px] pr-[14.2px] pl-6 rounded-[50px] bg-white/8 border border-white/30 glass-effect"
              style={{ opacity: 0 }}
            >
              <span className="text-white text-15 leading-[1.733] uppercase">
                CONTACT
              </span>
              <Image
                src="/assets/icons/button-arrow-top-right.svg"
                alt=""
                width={14}
                height={14}
                className="pointer-events-none w-auto h-[18px] group-hover:rotate-45 transition-all duration-300 ease-in-out"
              />
            </Link>
          </div>

          {/* Hamburger pill */}
          <div className="rounded-full overflow-hidden">
            <button
              ref={hamburgerRef}
              className="cursor-pointer flex items-center justify-center group w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full bg-white/8 border border-white/30 glass-effect"
              aria-label="Open menu"
              style={{ opacity: 0 }}
            >
              <svg
                className="group-hover:scale-[1.08] transition-all duration-300 ease-in-out w-auto h-[17px] md:w-[31px] md:h-[21px]"
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="21"
                viewBox="0 0 31 21"
                fill="none"
              >
                <line y1="0.5" x2="31" y2="0.5" stroke="white" />
                <line y1="10.5" x2="31" y2="10.5" stroke="white" />
                <line y1="20.5" x2="31" y2="20.5" stroke="white" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

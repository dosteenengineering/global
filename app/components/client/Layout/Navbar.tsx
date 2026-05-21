"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import FullscreenMenu from "./FullscreenMenu";
import { useLenis } from "lenis/react";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldStartMenuInSearch, setShouldStartMenuInSearch] = useState(false);
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

  const menuItems = [
    { label: "BIM Capabilities", href: "/bim" },
    { label: "CSI Specifications", href: "/csi-specifications" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShouldStartMenuInSearch(false);
  };

  const openMenu = () => {
    setShouldStartMenuInSearch(false);
    setIsMenuOpen(true);
  };

  const openMenuSearch = () => {
    if (isMenuOpen && shouldStartMenuInSearch) {
      // Already open in search mode → close it
      // setIsMenuOpen(false);
      setShouldStartMenuInSearch(false);
    } else {
      // Open in search mode
      setShouldStartMenuInSearch(true);
      setIsMenuOpen(true);
    }
  };

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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  const lenis = useLenis();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isMenuOpen, lenis]);

  return (
    // <header className="absolute top-[30px] md:top-[23px] left-0 w-full z-[150]">
    <header className={`left-0 w-full z-[150] top-[30px] md:top-[23px] transition-all duration-500
    ${isSticky ? "fixed py-2" : "absolute "} `}
    >
      <div className="container relative z-[160] flex items-center justify-between gap-4 w-full">
        <div
          ref={navPillRef}
          className={`flex h-[62px] rounded-[50px] transition-all duration-500 ease-out md:h-[70px] ${isMenuOpen ? "w-full lg:max-w-[57.5%]" : "w-full max-w-[1127px]"
            }`}
        >
          <div
            className={`flex items-center justify-between w-full transition-all duration-500 ease-out 
              ${isMenuOpen
                ? "rounded-none border border-transparent overflow-visible bg-transparent"
                : "rounded-[50px] border border-white/30 glass-effect overflow-hidden"
              }
              ${isSticky ? "bg-black/50" : "bg-transparent"}
              `}
          >
            {/* Logo */}
            <div
              ref={logoRef}
              className={`shrink-0 pl-[17px] transition-all duration-500 ease-out  ${isMenuOpen ? "pr-0 3xl:pl-0" : "sm:pl-30 3xl:pl-[31px] pr-100"}`}
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
            <div
              className={`hidden min-[1200px]:flex items-center flex-1 overflow-hidden transition-all duration-200 ease-in-out 
                ${isMenuOpen
                ? "max-w-0 gap-0 pr-0 opacity-0 pointer-events-none"
                : "max-w-[760px] gap-40 pr-80 opacity-100 2xl:pr-100 3xl:pr-150"
                }`}
            >
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
              onClick={openMenuSearch}
              aria-label={isMenuOpen && shouldStartMenuInSearch ? "Close search" : "Open search"}
            >
              {/* Search icon */}
              <Image
                src="/assets/icons/search.svg"
                alt="Search"
                width={30}
                height={30}
                className={`absolute w-auto h-[15px] md:w-[20.64px] md:h-[20.64px] pointer-events-none
      transition-all duration-300 ease-in-out
      ${isMenuOpen && shouldStartMenuInSearch
                    ? "opacity-0 scale-50 rotate-90"
                    : "opacity-100 scale-100 rotate-0"
                  }`}
              />

              {/* Close icon */}
              <Image
                src="/assets/icons/close-icon.svg"
                alt="Close"
                width={30}
                height={30}
                className={`absolute w-auto h-[15px] md:w-[20.64px] md:h-[20.64px] pointer-events-none
      transition-all duration-300 ease-in-out
      ${isMenuOpen && shouldStartMenuInSearch
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-50 -rotate-90"
                  }`}
              />
            </button>

            <div className="md:hidden rounded-full shrink-0 over pr-[15px]">
              <button
                className="cursor-pointer flex items-center justify-center group shrink-0"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={isMenuOpen ? closeMenu : openMenu}
              >
                <svg className="h-[15px] w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 21" fill="none" >
                  <line className={`origin-center transition-transform duration-300 ${isMenuOpen ? "translate-y-[10px] rotate-45" : ""}`} y1="0.5" x2="31" y2="0.5" stroke="white" />
                  <line className={`transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} y1="10.5" x2="31" y2="10.5" stroke="white" />
                  <line className={`origin-center transition-transform duration-300 ${isMenuOpen ? "-translate-y-[10px] -rotate-45" : ""}`} y1="20.5" x2="31" y2="20.5" stroke="white" />
                </svg>
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
              className={`hidden min-[1400px]:flex group items-center gap-3 justify-center h-[70px] pr-[14.2px] pl-6 rounded-[50px]  border border-white/30 glass-effect group
                ${isMenuOpen && "bg-white/8"}
                 ${isSticky ? "bg-black/70" : "bg-white/8"}`}
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
                className={`pointer-events-none w-auto h-[18px] group-hover:rotate-45 transition-all duration-300 ease-in-out
                  ${isSticky && "brightness-0 invert"}
                   ${isMenuOpen && "brightness-0 invert"}`}
              />
            </Link>
          </div>

          {/* Hamburger pill */}
          <div className="rounded-full overflow-hidden">
            <button
              ref={hamburgerRef}
              className={`cursor-pointer flex items-center justify-center group w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full
               border border-white/30 glass-effect ${isMenuOpen && "bg-white/8"}
                ${isSticky ? "bg-black/70" : "bg-white/8"}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={isMenuOpen ? closeMenu : openMenu}
              style={{ opacity: 0 }}
            >
              <span className="relative block h-[21px] w-[31px] group-hover:scale-[1.08] transition-transform duration-300 ease-in-out">

                {/* Top line */}
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-white origin-center transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-y-[10px] rotate-45" : ""
                    }`}
                />

                {/* Middle line */}
                <span
                  className={`absolute left-0 top-[10px] h-[1.5px] w-full bg-white transition-all duration-200 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                />

                {/* Bottom line */}
                <span
                  className={`absolute left-0 top-[20px] h-[1.5px] w-full bg-white origin-center transition-all duration-300 ease-in-out ${isMenuOpen ? "-translate-y-[10px] -rotate-45" : ""
                    }`}
                />

              </span>
            </button>
          </div>
        </div>
      </div>
      <FullscreenMenu
        isOpen={isMenuOpen}
        startInSearch={shouldStartMenuInSearch}
        menuItems={menuItems}
        navItems={navItems.map((item) => ({ label: item.label, href: item.href }))}
        onClose={closeMenu}
      />
    </header>
  );
}

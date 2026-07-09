"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import FullscreenMenu from "./FullscreenMenu";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, menuItems } from "./data";
import { useIntroComplete } from "../../../context/IntroContext";

export default function Navbar({ solutionsRaw }: { solutionsRaw: any }) {
  const introComplete = useIntroComplete();

  const dynamicNavItems = useMemo(() => {
    return navItems.map((item) => {
      if (item.label !== "SOLUTIONS") return item;

      const apiSubItems =
        solutionsRaw?.thirdSection?.items?.map((s: any) => ({
          label: s.homeTitle?.trim(),
          href: s.buttonLink || `/solutions/${s.slug}`,
        })) ?? [];

      return {
        ...item,
        subItems: [{ label: "Overview", href: "/solutions" }, ...apiSubItems],
      };
    });
  }, [solutionsRaw]);

  console.log(`dynamicNavItems`, dynamicNavItems)

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldStartMenuInSearch, setShouldStartMenuInSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const logoRef = useRef<HTMLDivElement>(null);
  const navPillRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLButtonElement>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSearchExpanded(false);
    setSearchQuery("");
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
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        navPillRef.current,
        { clipPath: "inset(-3px 100% -3px -3px round 50px)" },
        {
          clipPath: "inset(-3px 0% -3px -3px round 50px)",
          duration: 0.9,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(navPillRef.current, { clipPath: "none" });
          },
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
  }, [introComplete]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const lenis = useLenis();
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuTransformDisabled, setIsMenuTransformDisabled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const threshold = 10; // Scroll distance threshold in pixels to prevent flickering

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // 1. Sticky background threshold (scrolled past 80px)
          setIsSticky(currentScrollY > 80);

          // 2. Visibility state with accumulated threshold to prevent jitter/flicker
          const diff = currentScrollY - lastScrollY;

          if (currentScrollY <= 80) {
            setIsVisible(true);
            lastScrollY = currentScrollY;
          } else if (Math.abs(diff) >= threshold) {
            if (currentScrollY > lastScrollY) {
              setIsVisible(false); // Scrolling down
            } else {
              setIsVisible(true); // Scrolling up
            }
            lastScrollY = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isMenuOpen, lenis]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isMenuOpen) {
      setIsMenuTransformDisabled(true);
    } else {
      // Delay re-enabling header transforms until the 800ms menu closing transition is complete
      timeoutId = setTimeout(() => {
        setIsMenuTransformDisabled(false);
      }, 850);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMenuOpen]);


  // Debounced API search
  useEffect(() => {
    const trimmed = searchQuery.trim();

    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        console.log("trimmed", trimmed)
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ searchQuery: trimmed }),
          signal: controller.signal,
        });

        const data = await res.json();

        if (data.success) {
          console.log("result", data.data)
          setSearchResults(data.data);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Search error:", error);
        }
      } finally {
        setIsSearching(false);
      }
    }, 300); // debounce delay

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery]);

  return (
    // <header className="absolute top-[30px] md:top-[23px] left-0 w-full z-[150]">
    <header
      className={`fixed left-0 w-full z-[150] top-[30px] md:top-[23px]
      ${!introComplete ? "invisible" : ""}
      ${isMenuTransformDisabled
          ? ""
          : "transition-transform duration-300 ease-out " +
          (isVisible
            ? "translate-y-0"
            : "-translate-y-[150%] pointer-events-none")
        }`}
    >
      <div className="container relative z-[160] flex items-center justify-between gap-4 w-full">
        <div
          ref={navPillRef}
          className={`flex h-[62px] rounded-[50px] transition-all duration-500 ease-out md:h-[70px] ${isMenuOpen
            ? "w-full lg:max-w-[57.5%]"
            : "w-full max-w-[1127px] bg-white/8 backdrop-blur-[2px]"
            }`}
        >
          <div
            className={`flex items-center justify-between w-full transition-all duration-500 ease-out 
              ${isMenuOpen
                ? "rounded-none border border-transparent overflow-visible bg-transparent"
                : "rounded-[50px] border border-white/30 glass-effect"
              }
              ${isSticky ? "bg-black/50" : "bg-transparent"}
              `}
          >
            {/* Logo */}
            <div
              ref={logoRef}
              className={`shrink-0 pl-[17px] transition-all duration-500 ease-out  ${isMenuOpen ? "pr-0 3xl:pl-0" : "sm:pl-30 3xl:pl-[31px] pr-50 3xl:pr-100"}`}
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
              className={`hidden min-[1300px]:flex items-center flex-1 overflow-visible transition-all duration-200 ease-in-out 
    ${isMenuOpen
                  ? "max-w-0 gap-0 pr-0 opacity-0 pointer-events-none"
                  : "max-w-[760px] gap-40 pr-80 opacity-100 2xl:pr-100 3xl:pr-150"
                }`}
            >
              {/* {navItems.map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => {
                    navItemRefs.current[i] = el;
                  }}
                  className="relative group"
                  style={{ opacity: 0 }}
                  onMouseEnter={() =>
                    item.hasDropdown && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
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
                        className={`w-auto h-[7px] pointer-events-none transition-transform duration-300 ease-out ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 w-full h-[25px]" />
                  )}

                  {item.hasDropdown && item.subItems && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{
                            clipPath: "inset(0% 0% 100% 0% round 16px)",
                          }}
                          animate={{
                            clipPath: "inset(0% 0% 0% 0% round 16px)",
                          }}
                          exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                          transition={{
                            duration: 0.38,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute top-[calc(100%+25px)] left-0 z-50 rounded-[16px] border border-white/15 bg-black/80 overflow-hidden"
                        >
                          <ul className="py-[10px] min-w-[280px]">
                            {item.subItems.map((sub, si) => (
                              <motion.li
                                key={sub.label}
                                initial={{ opacity: 0, y: -10, x: -2 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, y: -10, x: -2 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeOut",
                                  delay: si * 0.065,
                                }}
                              >
                                <Link
                                  href={sub.href}
                                  className="flex items-center px-[20px] py-[11px] text-white text-[14px] uppercase tracking-wide hover:bg-white/8 hover:translate-x-1 transition-all duration-300"
                                >
                                  {sub.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))} */}

              {dynamicNavItems.map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => {
                    navItemRefs.current[i] = el;
                  }}
                  className="relative group"
                  style={{ opacity: 0 }}
                  onMouseEnter={() =>
                    item.hasDropdown && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
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
                        className={`w-auto h-[7px] pointer-events-none transition-transform duration-300 ease-out ${openDropdown === item.label ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </Link>

                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 w-full h-[25px]" />
                  )}

                  {/* Dropdown */}
                  {item.hasDropdown && item.subItems && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{
                            clipPath: "inset(0% 0% 100% 0% round 16px)",
                          }}
                          animate={{
                            clipPath: "inset(0% 0% 0% 0% round 16px)",
                          }}
                          exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                          transition={{
                            duration: 0.38,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute top-[calc(100%+25px)] left-0 z-50 rounded-[16px] border border-white/15 bg-black/80 overflow-hidden"
                        >
                          <ul className="py-[10px] min-w-[280px]">
                            {item.subItems.map((sub, si) => (
                              <motion.li
                                key={sub.label}
                                initial={{ opacity: 0, y: -10, x: -2 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, y: -10, x: -2 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeOut",
                                  delay: si * 0.065,
                                }}
                              >
                                <Link
                                  href={sub.href}
                                  className="flex items-center px-[20px] py-[11px] text-white text-[14px] uppercase tracking-wide hover:bg-white/8 hover:translate-x-1 transition-all duration-300"
                                >
                                  {sub.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <motion.div
              className="relative hidden md:flex items-center mr-[20.39px] h-[45.61px] rounded-full border border-white/20 bg-white/8 backdrop-blur-[10px] overflow-hidden"
              initial={{ width: 45.61 }}
              animate={{
                width: isSearchExpanded ? 300 : 45.61,
                transition: isSearchExpanded
                  ? { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
                  : { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
              }}
            >
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className={`h-full bg-transparent ${isSearchExpanded ? "pl-5" : ""}  text-15 text-white outline-none placeholder:text-white/50 transition-all duration-300 ${isSearchExpanded
                  ? "w-full opacity-100"
                  : "w-0 opacity-0 pointer-events-none"
                  }`}
              />

              <button
                ref={searchRef}
                className="shrink-0 cursor-pointer flex items-center justify-center w-[45.61px] h-[45.61px] rounded-full"
                onClick={() => {
                  if (isSearchExpanded) {
                    setIsSearchExpanded(false);
                    setSearchQuery("");
                  } else {
                    setIsSearchExpanded(true);
                    setIsMenuOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 50);
                  }
                }}
                aria-label={isSearchExpanded ? "Close search" : "Open search"}
              >
                <Image
                  src="/assets/icons/search.svg"
                  alt="Search"
                  width={30}
                  height={30}
                  className={`absolute w-auto h-[15px] md:w-[20.64px] md:h-[20.64px] pointer-events-none transition-all duration-300 ease-in-out
        ${isSearchExpanded ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"}`}
                />
                <Image
                  src="/assets/icons/close-icon.svg"
                  alt="Close"
                  width={30}
                  height={30}
                  className={`absolute w-auto h-[15px] md:w-[20.64px] md:h-[20.64px] pointer-events-none transition-all duration-300 ease-in-out
        ${isSearchExpanded ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"}`}
                />
              </button>
            </motion.div>

            <div
              className={`${isMenuOpen ? "hidden" : ""} md:hidden flex items-center gap-[14px] shrink-0 pr-[15px]`}
            >

              <button
                className="cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Open search"
                onClick={openMenuSearch}
              >
                <Image
                  src="/assets/icons/search.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="w-auto h-[15px] pointer-events-none"
                />
              </button>
              <button
                className="cursor-pointer flex items-center justify-center group shrink-0"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={isMenuOpen ? closeMenu : openMenu}
              >
                <svg
                  className="h-[15px] w-[20px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31 21"
                  fill="none"
                >
                  <line
                    className={`origin-center transition-transform duration-300 ${isMenuOpen ? "translate-y-[10px] rotate-45" : ""}`}
                    y1="0.5"
                    x2="31"
                    y2="0.5"
                    stroke="white"
                  />
                  <line
                    className={`transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                    y1="10.5"
                    x2="31"
                    y2="10.5"
                    stroke="white"
                  />
                  <line
                    className={`origin-center transition-transform duration-300 ${isMenuOpen ? "-translate-y-[10px] -rotate-45" : ""}`}
                    y1="20.5"
                    x2="31"
                    y2="20.5"
                    stroke="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right group — Contact + Hamburger */}
        <div
          className={`${isMenuOpen ? "flex" : "hidden md:flex"} items-center gap-[10px] md:gap-[18.8px] shrink-0`}
        >
          {/* Contact pill */}
          <div className="rounded-[50px] backdrop-blur-[2px] xl:h-[62px] md:h-auto w-[122px] md:w-auto">
            <Link
              ref={contactRef}
              href="/contact-us"
              className={`${isMenuOpen ? "flex" : "hidden min-[1460px]:flex"} group items-center gap-3 justify-center h-[40px] md:h-[70px] md:pr-[14.2px] md:pl-[21px] rounded-[50px]  border border-white/30 glass-effect group
                ${isMenuOpen && "bg-white/8"}
                 ${isSticky ? "bg-black/70" : "bg-white/8"}`}
              style={{ opacity: 0 }}
              onClick={closeMenu}
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
          <div className="rounded-full backdrop-blur-[2px]">
            <button
              ref={hamburgerRef}
              className={`cursor-pointer flex items-center justify-center group w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full
               border border-white/30 glass-effect ${isMenuOpen && "bg-white/8"}
                ${isSticky ? "bg-black/70" : "bg-white/8"}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={isMenuOpen ? closeMenu : openMenu}
              style={{ opacity: 0 }}
            >
              <span className="relative block w-6 h-5 md:h-[21px] md:w-[31px] group-hover:scale-[1.08] transition-transform duration-300 ease-in-out">
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
        onSearchQueryChange={setSearchQuery}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
        menuItems={menuItems}
        navItems={dynamicNavItems.map((item) => ({
          label: item.label,
          href: item.href,
          subItems: item.subItems ?? [],
        }))}
        onClose={closeMenu}
      />
    </header>
  );
}

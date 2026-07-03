"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { footerData } from "./data";
import PrimaryNoise2 from "../../common/noise/PrimaryNoise2";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { moveLeft } from "../../motionVariants";

type MenuLink = {
  label: string;
  href: string;
  subItems?: MenuLink[];
};

type FullscreenMenuProps = {
  isOpen: boolean;
  startInSearch: boolean;
  searchQuery?: string;
  menuItems: MenuLink[];
  navItems: MenuLink[];
  onClose: () => void;
};

const MotionLink = motion.create(Link);

const navListVariants: Variants = {
  closed: {
    transition: {
      staggerChildren: 0,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.11,
    },
  },
};

const navLinkVariants: Variants = {
  closed: {
    opacity: 0,
    x: -42,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 0, // keep position, no reverse slide
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const FullscreenMenu = ({
  isOpen,
  startInSearch,
  searchQuery = "",
  menuItems,
  navItems,
  onClose,
}: FullscreenMenuProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<{
    label: string;
    href: string;
    items: MenuLink[];
  } | null>(null);
  const containerInset = useGetContainerSpacing(containerRef, 0);
  const trimmedSearchQuery = searchQuery.trim();
  const isSearchOpen = trimmedSearchQuery.length > 0;

  const searchableItems = [
    ...menuItems,
    ...navItems,
    { label: "Contact", href: "/contact-us" },
  ].filter((item) => item.href !== "#");

  const filteredSearchItems = trimmedSearchQuery
    ? searchableItems.filter((item) =>
        item.label.toLowerCase().includes(trimmedSearchQuery.toLowerCase()),
      )
    : [];

  const closeMenu = () => {
    // setHasExpandedSearch(false);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-primary text-white"
      initial={{ y: "-100%", visibility: "hidden" as const }}
      animate={
        isOpen
          ? {
              y: 0,
              visibility: "visible" as const,
              transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
            }
          : {
              y: "-100%",
              transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
              transitionEnd: { visibility: "hidden" as const },
            }
      }
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      aria-hidden={!isOpen}
    >
      <ContainerAnchor ref={containerRef} />
      <motion.div
        className="grid min-h-screen grid-cols-1 lg:grid-cols-[57.5%_42.5%]"
        initial={{ opacity: 0, y: 12 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={
          isOpen
            ? { duration: 0.35, delay: 0.18, ease: "easeOut" }
            : { duration: 0.18, ease: "easeIn" }
        }
      >
        <div
          style={{ paddingLeft: containerInset + 16 }}
          className="relative overflow-hidden pr-8 pb-7 pt-[117px] sm:pr-12 xl:pr-50 lg:pb-8 lg:pt-[140px] 3xl:pt-[200px]"
        >
          <PrimaryNoise2 />
          <div className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] hidden md:block ">
            {/* <div className="h-full w-full rounded-full border border-white/20" /> */}
            <img
              src="./assets/images/home/menu-shape.svg"
              className="absolute top-0 left-0"
              alt=""
            />
          </div>

          {/* Mobile nav — shown only below lg */}
          <div className="lg:hidden relative" style={{ minHeight: "60vh" }}>
            <div
              className="overflow-hidden relative"
              style={{ minHeight: "60vh" }}
            >
              {/* Main list */}
              <motion.div
                initial={false}
                animate={
                  activeSubMenu
                    ? { x: "-100%", opacity: 0 }
                    : { x: 0, opacity: 1 }
                }
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              >
                {(trimmedSearchQuery
                  ? filteredSearchItems
                  : [
                      ...navItems.map((item) => ({
                        ...item,
                        hasSub:
                          Array.isArray(item.subItems) &&
                          item.subItems.length > 0,
                      })),
                      ...menuItems.map((item) => ({
                        ...item,
                        hasSub: false,
                        subItems: [] as MenuLink[],
                      })),
                    ]
                ).map((item: any) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between py-3 text-white relative text-left group"
                    onClick={() => {
                      if (item.hasSub && item.subItems?.length > 0) {
                        setActiveSubMenu({
                          label: item.label,
                          href: item.href,
                          items: item.subItems,
                        });
                      } else {
                        closeMenu();
                      }
                    }}
                  >
                    <span className="text-[18px] leading-[1.555] font-light text-white group-hover:opacity-80 transition-opacity duration-300">
                      {item.label}
                    </span>
                    {item.hasSub && (
                      <Image
                        src="/assets/icons/menu-arow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 brightness-0 invert"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00]" />
                  </button>
                ))}
              </motion.div>

              {/* Sub-menu panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={activeSubMenu ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-x-0 top-0"
              >
                {/* Back button / title */}
                <button
                  className="flex items-center gap-3 py-3 mb-1 text-white relative w-full"
                  onClick={() => setActiveSubMenu(null)}
                >
                  <Image
                    src="/assets/icons/menu-arow.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 rotate-180 brightness-0 invert"
                  />
                  <span className="text-[20px] leading-[1.4] font-light text-white">
                    {activeSubMenu?.label}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00]" />
                </button>

                {/* Sub items */}
                <motion.div
                  key={activeSubMenu?.label ?? "empty"}
                  initial="closed"
                  animate={activeSubMenu ? "open" : "closed"}
                  variants={navListVariants}
                >
                  {activeSubMenu?.items.map((item) => (
                    <motion.div key={item.label} variants={navLinkVariants}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between py-3 text-white relative pl-7"
                      >
                        <span className="text-[17px] leading-[1.555] font-light text-white group-hover:opacity-80 transition-opacity duration-300">
                          {item.label}
                        </span>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00]" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.nav
            key={trimmedSearchQuery ? "search" : "menu"}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={navListVariants}
            className="relative z-1 hidden lg:block max-h-[75vh] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-lenis-prevent
          >
            {(isSearchOpen && trimmedSearchQuery
              ? filteredSearchItems
              : menuItems
            ).map((item, index) => (
              <MotionLink
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                variants={navLinkVariants}
                viewport={{ once: true }}
                className="group flex items-center py-4 text-white transition-colors md:py-5 xl:py-[25px] pl-3 lg:pl-5 xl:pl-10 2xl:pl-100 3xl:pl-[141px] relative group"
              >
                {/* <span className="mr-3 self-start pt-2 text-[11px] leading-none text-white/80">
                  {" "}
                  {String(index + 1).padStart(2, "0")}{" "}
                </span> */}
                <span className="text-[34px] font-light leading-[1.12] tracking-normal md:text-[44px] lg:text-[38px] xl:text-[44px] 3xl:text-[54px] opacity-75 group-hover:opacity-100 transition-all duration-300">
                  {item.label}
                </span>
                <Image
                  src="/assets/icons/menu-arow.svg"
                  alt=""
                  width={22.47}
                  height={22.47}
                  className="ml-50 h-5 w-5 xl:w-auto xl:h-auto opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00]" />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00] group-hover:from-white group-hover:w-full transition-all duration-300" />
              </MotionLink>
            ))}
            {isSearchOpen &&
              trimmedSearchQuery &&
              filteredSearchItems.length === 0 && (
                <p className="border-b border-white/25 py-5 text-[28px] font-light text-white/70 md:text-[38px]">
                  No results found
                </p>
              )}
          </motion.nav>
        </div>

        <div
          style={{ paddingRight: containerInset }}
          className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-end pl-10 lg:pl-12 2xl:pl-[72px]"
        >
          <Image
            src="/assets/images/home/menu-right-img.jpg"
            alt=""
            fill
            sizes="43vw"
            className="object-cover absolute w-full h-full top-0 left-0"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-1 mb-[96px] flex items-center gap-80 3xl:mb-100 px-[16px]">
            <div>
              <div className="mb-4 border-b border-white/25 pb-3">
                <MotionLink
                  variants={moveLeft(0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-center gap-3 text-15 text-white group"
                >
                  <Image
                    src="/assets/icons/footer/social/mail.svg"
                    alt=""
                    width={35}
                    height={28}
                    className="h-[22px] w-[22px] 2xl:h-auto 2xl:w-auto brightness-0 invert"
                  />
                  <span className="text-19 leading-[2.105263157894737] font-[500] group-hover:text-white/80  transition-all duration-300 ease-in-out">
                    {footerData.contact.email}
                  </span>
                </MotionLink>
              </div>
              <div className="flex items-center gap-8">
                <MotionLink
                  variants={moveLeft(0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  href={`tel:${footerData.contact.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 text-15 text-white"
                >
                  <Image
                    src="/assets/icons/footer/social/phone.svg"
                    alt=""
                    width={36}
                    height={35}
                    className="h-[22px] w-[22px] 2xl:h-auto 2xl:w-auto brightness-0 invert"
                  />
                  <span className="text-19 leading-[2.105263157894737] font-[500] group-hover:text-white/80  transition-all duration-300 ease-in-out">
                    {footerData.contact.phone}
                  </span>
                </MotionLink>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {footerData.socials.map((social, index) => (
                <MotionLink
                  variants={moveLeft(0.2 * index)}
                  initial="hidden"
                  whileInView={"show"}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="group flex h-8 w-8 2xl:w-[42px] 2xl:h-[42px] items-center justify-center rounded-full border border-white/35 hover:bg-primary transition-colors duration-300"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 brightness-0 invert group-hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                </MotionLink>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullscreenMenu;

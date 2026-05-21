"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { footerData } from "./data";
import PrimaryNoise2 from "../../common/noise/PrimaryNoise2";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useGetContainerSpacing } from "@/app/hooks/useGetContainerSpacing";
import { moveLeft, moveUp, moveUpV2 } from "../../motionVariants";

type MenuLink = {
  label: string;
  href: string;
};

type FullscreenMenuProps = {
  isOpen: boolean;
  startInSearch: boolean;
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
  menuItems,
  navItems,
  onClose,
}: FullscreenMenuProps) => {
  const [hasExpandedSearch, setHasExpandedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerInset = useGetContainerSpacing(containerRef, 0);
  const isSearchOpen = startInSearch || hasExpandedSearch;

  const searchableItems = [
    ...menuItems,
    ...navItems,
    { label: "Contact", href: "/contact-us" },
  ].filter((item) => item.href !== "#");

  const trimmedSearchQuery = searchQuery.trim();
  const filteredSearchItems = trimmedSearchQuery
    ? searchableItems.filter((item) =>
      item.label.toLowerCase().includes(trimmedSearchQuery.toLowerCase()),
    )
    : [];

  const closeMenu = () => {
    setHasExpandedSearch(false);
    setSearchQuery("");
    onClose();
  };

  return (
    // <div className={`fixed inset-0 z-[100] min-h-screen bg-primary text-white transition-all duration-700 ease-out ${
    //     isOpen ? "pointer-events-auto opacity-100 blur-0" : "pointer-events-none opacity-0 blur-3xl"
    //   }`}
    //   aria-hidden={!isOpen}
    // >
    <div className={`fixed inset-0 z-[100] bg-primary text-white transition-[clip-path,opacity]  
      
      ${isOpen
      ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] ease-[cubic-bezier(.77,0,.175,1)] duration-800"
            : "[clip-path:polygon(0_0,100%_0,100%_0,0_0)] duration-800"
          }`}
          aria-hidden={!isOpen}
    >


      <ContainerAnchor ref={containerRef} />
      <div className={`grid min-h-screen grid-cols-1 transition-transform duration-500 ease-out lg:grid-cols-[57.5%_42.5%] ${isOpen ? "translate-y-0" : "-translate-y-4"
        }`}
      >
        <div style={{ paddingLeft: containerInset + 32 }}
          className="relative overflow-hidden pr-6 pb-7 pt-[130px] sm:pr-10 xl:pr-50 lg:pb-8 lg:pt-[140px] 3xl:pt-[200px]"
        >
          <PrimaryNoise2 />
          <div className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] ">
            {/* <div className="h-full w-full rounded-full border border-white/20" /> */}
            <img src="./assets/images/home/menu-shape.svg" className="absolute top-0 left-0" alt="" />
          </div>

          <motion.nav
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={navListVariants}
            className="relative z-1 max-h-[75vh] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-lenis-prevent
          >
            {(isSearchOpen && trimmedSearchQuery ? filteredSearchItems : menuItems).map((item, index) => (
              <MotionLink
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                variants={navLinkVariants}
                viewport={{once:true}}
                className="group flex items-center py-4 text-white transition-colors md:py-5 xl:py-[25px] pl-3 lg:pl-5 xl:pl-10 2xl:pl-100 3xl:pl-[141px] relative group"
              >
                <span className="mr-3 self-start pt-2 text-[11px] leading-none text-white/80"> {String(index + 1).padStart(2, "0")} </span>
                <span className="text-[34px] font-light leading-[1.12] tracking-normal md:text-[44px] lg:text-[38px] xl:text-[44px] 3xl:text-[54px] opacity-75 group-hover:opacity-100 transition-all duration-300">
                  {item.label}
                </span>
                <Image src="/assets/icons/menu-arow.svg" alt="" width={22.47} height={22.47}
                  className="ml-50 h-5 w-5 xl:w-auto xl:h-auto opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00]" />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#76A7FF] to-[#76A7FF00] group-hover:from-white group-hover:w-full transition-all duration-300" />
              </MotionLink>
            ))}
            {isSearchOpen && trimmedSearchQuery && filteredSearchItems.length === 0 && (
              <p className="border-b border-white/25 py-5 text-[28px] font-light text-white/70 md:text-[38px]">
                No results found
              </p>
            )}
          </motion.nav>
        </div>

        <div style={{ paddingRight: containerInset }}
          className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-end pl-10 lg:pl-12 2xl:pl-[72px]"
        >
          <Image src="/assets/images/home/menu-right-img.jpg" alt="" fill sizes="43vw" className="object-cover absolute w-full h-full top-0 left-0" />
          <div className="absolute inset-0 bg-black/70" />
          <div className={`relative z-1 mb-10 flex h-12 max-w-[420px] items-center rounded-full border border-white/25 bg-white/10 px-5 origin-left
             ${isSearchOpen ? "opacity-100 scale-x-100 " : "opacity-0 scale-x-0 "} transition-all duration-200 ease-in`}>
            <button type="button" className="flex h-full shrink-0 items-center justify-center" aria-label="Search" onClick={() => setHasExpandedSearch(true)} >
              <Image src="/assets/icons/search.svg" alt="" width={20} height={20} className="h-5 w-5" />
            </button>
            <input
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
              className="ml-3 min-w-0 flex-1 bg-transparent text-15 text-white outline-none placeholder:text-white/60"
            />
          </div>
          <div className="relative z-1 mb-[96px] flex items-center gap-80 3xl:mb-100 px-[16px]">
            <div>
              <div className="mb-4 border-b border-white/25 pb-3">
                <MotionLink variants={moveLeft(0.2)} initial="hidden" whileInView={"show"} href={`mailto:${footerData.contact.email}`} className="flex items-center gap-3 text-15 text-white group">
                  <Image src="/assets/icons/footer/social/mail.svg" alt="" width={35} height={28} className="h-[22px] w-[22px] 2xl:h-auto 2xl:w-auto brightness-0 invert" />
                  <span className="text-19 leading-[2.105263157894737] font-[500] group-hover:text-white/80  transition-all duration-300 ease-in-out" >{footerData.contact.email}</span>
                </MotionLink>
              </div>
              <div className="flex items-center gap-8">
                <MotionLink variants={moveLeft(0.4)} initial="hidden" whileInView={"show"} href={`tel:${footerData.contact.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 text-15 text-white">
                  <Image src="/assets/icons/footer/social/phone.svg" alt="" width={36} height={35} className="h-[22px] w-[22px] 2xl:h-auto 2xl:w-auto brightness-0 invert" />
                  <span className="text-19 leading-[2.105263157894737] font-[500] group-hover:text-white/80  transition-all duration-300 ease-in-out" >{footerData.contact.phone}</span>
                </MotionLink>

              </div>
            </div>
            <div className="flex items-center gap-2">
              {footerData.socials.map((social,index) => (
                <MotionLink variants={moveLeft(0.2 * index)} initial="hidden" whileInView={"show"} whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeInOut", }} key={social.name} href={social.href} aria-label={social.name} className="group flex h-8 w-8 2xl:w-[42px] 2xl:h-[42px] items-center justify-center rounded-full border border-white/35 hover:bg-primary transition-colors duration-300" >
                  <Image src={social.icon} alt="" width={16} height={16} className="h-4 w-4 brightness-0 invert group-hover:scale-105 transition-all duration-300 ease-in-out" />
                </MotionLink>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FullscreenMenu;

"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="absolute top-[20px] lg:top-[30px] left-0 w-full z-50">
      <div className="container relative flex items-center justify-between 3xl:px-5">

        {/* Left - Logo */}
        <Link href="/" className="flex justify-center items-center w-[160px] h-[40px] lg:w-[177px] lg:h-[47px]">
          <Image
            src="/assets/logos/logo-white-full.png"
            alt="Logo"
            width={177}
            height={47}
            className="pointer-events-none"
          />
        </Link>

        {/* Center - Desktop Only */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <button
            style={{
              background:
                "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
            }}
            className="flex items-center justify-between gap-6 rounded-[3px] py-[15px] px-5 max-h-[56px] xl:min-h-[56px] min-w-[430px] 3xl:min-w-[540px]"
          >
            <span className="text-15 uppercase font-[400] text-white">
              MENU
            </span>
            <Image
              src="/assets/icons/nav_menu.svg"
              alt="Menu"
              width={31}
              height={10}
              className="pointer-events-none"
            />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Contact - Desktop Only */}
          <Link
            href="/contact"
            className="hidden lg:block text-white text-19 leading-[1.368] uppercase font-[600]"
          >
            CONTACT
          </Link>

          {/* Mobile Menu Button */}
          <button
            style={{
              background:
                "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
            }}
            className="lg:hidden flex items-center justify-between gap-4 rounded-[3px] py-[12px] px-4 min-w-[120px]"
          >
            <span className="text-14 uppercase font-[400] text-white">
              MENU
            </span>
            <Image
              src="/assets/icons/nav_menu.svg"
              alt="Menu"
              width={26}
              height={8}
            />
          </button>

        </div>
      </div>
    </header>
  );
}

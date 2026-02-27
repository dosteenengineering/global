"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="container relative flex items-center justify-between 3xl:px-5">
        {/* Left - Logo */}
        <div>
          <Link href="/" className="block py-[34px]">
            <Image
              src="/assets/logos/logo-white.png"
              alt="Logo"
              width={177}
              height={147}
            />
          </Link>
        </div>

        {/* Center - perfectly centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <button
            style={{
              background:
                "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
            }}
            className="flex items-center justify-between gap-6 rounded-[3px] py-[15px] px-5 max-h-[56px] min-w-[220px] 3xl:min-w-[540px]"
          >
            <span className="text-15 uppercase font-[400] text-white">MENU</span>
            <Image
              src="/assets/icons/nav_menu.svg"
              alt="Menu"
              width={31}
              height={10}
            />
          </button>
        </div>

        {/* Right - Contact */}
        <div>
          <Link
            href="/contact"
            className="text-white text-19 leading-[1.368] uppercase font-[600]"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </header>
  );
}

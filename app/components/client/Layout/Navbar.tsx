// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import gsap from "gsap";

// export default function Navbar() {
//   const logoRef = useRef<HTMLAnchorElement>(null);
//   const contactRef = useRef<HTMLAnchorElement>(null);
//   const pillTrackRef = useRef<HTMLDivElement>(null);
//   const menuTextRef = useRef<HTMLSpanElement>(null);
//   const menuIconRef = useRef<HTMLSpanElement>(null);
//   const mobilePillRef = useRef<HTMLDivElement>(null);
//   const mobileTextRef = useRef<HTMLSpanElement>(null);
//   const mobileIconRef = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline();

//       tl.fromTo(
//         logoRef.current,
//         { opacity: 0, y: -48 },
//         { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
//         0.08,
//       );

//       tl.fromTo(
//         contactRef.current,
//         { opacity: 0, y: -48 },
//         { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
//         0.2,
//       );

//       // Desktop pill expand
//       tl.fromTo(
//         pillTrackRef.current,
//         { width: "1px", opacity: 1 },
//         { width: "100%", duration: 0.8, ease: "power2.inOut" },
//         0.32,
//       );

//       // Desktop MENU text
//       tl.fromTo(
//         menuTextRef.current,
//         { opacity: 0, y: 10 },
//         { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
//         1.2,
//       );

//       // Desktop hamburger icon
//       tl.fromTo(
//         menuIconRef.current,
//         { opacity: 0, y: 10 },
//         { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
//         1.42,
//       );

//       // Mobile pill expand — same timing as desktop
//       tl.fromTo(
//         mobilePillRef.current,
//         { width: "1px", opacity: 1 },
//         { width: "100%", duration: 0.8, ease: "power2.inOut" },
//         0.32,
//       );

//       // Mobile MENU text
//       tl.fromTo(
//         mobileTextRef.current,
//         { opacity: 0, y: 10 },
//         { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
//         1.2,
//       );

//       // Mobile hamburger icon
//       tl.fromTo(
//         mobileIconRef.current,
//         { opacity: 0, y: 10 },
//         { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
//         1.42,
//       );
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <header className="absolute top-[20px] lg:top-[30px] left-0 w-full z-50">
//       <div className="container relative flex items-center justify-between 3xl:px-5">
//         {/* Logo */}
//         <Link
//           ref={logoRef}
//           href="/"
//           data-nav-logo="true"
//           className="flex justify-center items-center w-[160px] h-[40px] lg:w-[177px] lg:h-[47px]"
//           style={{ opacity: 0 }}
//         >
//           <Image
//             src="/assets/logos/logo-white-full.png"
//             alt="Logo"
//             width={177}
//             height={47}
//             className="pointer-events-none"
//           />
//         </Link>

//         {/* Desktop center pill */}
//         <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
//           <div className="min-w-[430px] 3xl:min-w-[540px] xl:min-h-[56px] flex items-center justify-center">
//             <div
//               ref={pillTrackRef}
//               className="overflow-hidden rounded-[3px] w-full backdrop-blur-[5px]"
//               style={{
//                 width: "1px",
//                 background:
//                   "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
//               }}
//             >
//               <button
//                 className="flex items-center justify-between gap-6 w-full py-[15px] px-5 xl:min-h-[56px]"
//                 style={{ whiteSpace: "nowrap" }}
//               >
//                 <span
//                   ref={menuTextRef}
//                   className="text-15 uppercase font-[400] text-white tracking-wide"
//                   style={{ opacity: 0 }}
//                 >
//                   MENU
//                 </span>
//                 <span
//                   ref={menuIconRef}
//                   style={{ opacity: 0, display: "inline-flex", flexShrink: 0 }}
//                 >
//                   <Image
//                     src="/assets/icons/nav_menu.svg"
//                     alt="Menu"
//                     width={31}
//                     height={10}
//                     className="pointer-events-none"
//                   />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right — Contact + mobile pill */}
//         <div className="flex items-center gap-6">
//           <Link
//             ref={contactRef}
//             href="/contact"
//             className="hidden lg:block text-white text-19 leading-[1.368] uppercase font-[600]"
//             style={{ opacity: 0 }}
//           >
//             CONTACT
//           </Link>

//           {/* Mobile pill */}
//           <div className="lg:hidden" style={{ minWidth: "120px" }}>
//             <div
//               ref={mobilePillRef}
//               className="overflow-hidden rounded-[3px] backdrop-blur-[5px]"
//               style={{
//                 width: "1px",
//                 background:
//                   "linear-gradient(270deg, rgba(24, 83, 214, 0.5) 0%, rgba(2, 46, 158, 0.5) 100%)",
//               }}
//             >
//               <button
//                 className="flex items-center justify-between gap-4 w-full py-[12px] px-4"
//                 style={{ whiteSpace: "nowrap", minHeight: "44px" }}
//               >
//                 <span
//                   ref={mobileTextRef}
//                   className="text-14 uppercase font-[400] text-white"
//                   style={{ opacity: 0 }}
//                 >
//                   MENU
//                 </span>
//                 <span
//                   ref={mobileIconRef}
//                   style={{ opacity: 0, display: "inline-flex", flexShrink: 0 }}
//                 >
//                   <Image
//                     src="/assets/icons/nav_menu.svg"
//                     alt="Menu"
//                     width={26}
//                     height={8}
//                     className="pointer-events-none"
//                   />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


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
    { label: "ABOUT US", hasDropdown: true },
    { label: "SERVICES", hasDropdown: true },
    { label: "SOLUTIONS", hasDropdown: true },
    { label: "RESOURCE HUB", hasDropdown: false },
    { label: "PROJECTS", hasDropdown: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Pill expands left → right (width 0 → 100%)
tl.fromTo(
  navPillRef.current,
  { width: 0, opacity: 1 },
  { width: "100%", duration: 1.5, ease: "power3.out" },
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
    <header className="absolute top-[23px] left-0 w-full z-50">
      <div className="container flex items-center justify-between gap-4">

        {/* Single combined pill: Logo + Nav items + Search */}
        {/* overflow-hidden on this wrapper is what clips the width animation */}
        <div
          ref={navPillRef}
          className="flex h-[60px] md:h-[70px] overflow-hidden"
          style={{ width: 0 }}
        >
          <div className="flex items-center rounded-full border border-white/20 bg-white/8 glass-effect overflow-hidden">

            {/* Logo */}
            <div
              ref={logoRef}
              className="shrink-0 pl-[30px] 3xl:pl-[31px] pr-100"
              style={{ opacity: 0 }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/logos/logo-white-full.png"
                  alt="Dosteen Logo"
                  width={300}
                  height={100}
                  className="w-auto 3xl:w-[164px] h-[35px] md:h-[43px] object-contain pointer-events-none"
                />
              </Link>
            </div>

            {/* Nav items */}
            <div className="hidden lg:flex items-center flex-1 gap-40 pr-80 2xl:pr-100 3xl:pr-150">
              {navItems.map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => { navItemRefs.current[i] = el; }}
                  className="relative group"
                  style={{ opacity: 0 }}
                >
                  <button className="flex items-center gap-[7px] text-white whitespace-nowrap cursor-pointer">
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
                  </button>
                </div>
              ))}
            </div>

            {/* Search icon */}
            <button ref={searchRef} className="shrink-0 cursor-pointer flex items-center justify-center w-[38px] h-[38px] md:w-[45.61px] md:h-[45.61px] rounded-full bg-white/8 border border-white/20 backdrop-blur-[10px] mr-[20.39px]">
              <Image
                src="/assets/icons/search.svg"
                alt="Search"
                width={30}
                height={30}
                className="w-auto h-[15px] md:w-[20.64px] md:h-[20.64px] pointer-events-none"
              />
            </button>

          </div>
        </div>

        {/* Right group — Contact + Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* Contact pill */}
          <Link
            ref={contactRef}
            href="/contact"
            className="hidden lg:flex group items-center gap-3 justify-center h-[70px] pr-[14.2px] pl-6 rounded-[50px] bg-white/8 border border-white/20 glass-effect"
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

          {/* Hamburger pill */}
          <button
            ref={hamburgerRef}
            className="cursor-pointer flex items-center justify-center group w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full bg-white/8 border border-white/20 glass-effect"
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
    </header>
  );
}
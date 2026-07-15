// hooks/useHashScroll.ts
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/app/components/LenisProvider"; // adjust path

export function useHashScroll(offset = 0) {
  const { scrollTo, ready } = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    console.log('[hashScroll] ready:', ready, 'pathname:', pathname, 'stashed:', (window as any).__initialHash, 'live hash:', window.location.hash);
    if (!ready) return;

    // read from the stashed value first, fallback to actual hash
    const hash = (window as any).__initialHash || window.location.hash;
    if (!hash) return;

    const raf = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) {
        scrollTo(el as HTMLElement, { offset, duration: 1.5 });
        window.history.pushState(null, "", hash);
        delete (window as any).__initialHash; // cleanup, one-time use
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [ready, pathname]);
}
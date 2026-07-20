// hooks/useHashScroll.ts
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/app/components/LenisProvider"; // adjust path

export function useHashScroll(offset = 0) {
  const { scrollTo } = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const hash = (window as any).__initialHash || window.location.hash;
    if (!hash) return;

    const raf = requestAnimationFrame(() => {
      const el = document.querySelector(hash);

      if (el) {
        scrollTo(el as HTMLElement, {
          offset,
          duration: 1.5,
        });

        delete (window as any).__initialHash;
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, offset, scrollTo]);
}
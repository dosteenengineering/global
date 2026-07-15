// hooks/useHashScroll.ts
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/app/components/LenisProvider"; // adjust path

export function useHashScroll(offset = -80) {
  const { scrollTo, ready } = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;

    const hash = window.location.hash;
    if (!hash) return;

    // wait one frame so the section has laid out/painted
    const raf = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) {
        scrollTo(el as HTMLElement, { offset, duration: 1.5 });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [ready, pathname]); // eslint-disable-line react-hooks/exhaustive-deps
}
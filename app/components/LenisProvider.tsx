"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ROUTES_WITHOUT_LENIS = ["/become-a-partner", "/partner-registration"];

const LenisProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (ROUTES_WITHOUT_LENIS.some((route) => pathname?.startsWith(route))) {
      return;
    }

    // Prevent browser from restoring scroll position on navigation
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;

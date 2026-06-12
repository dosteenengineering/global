"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, createContext, useContext } from "react";

const ROUTES_WITHOUT_LENIS = ["/become-a-partner", "/partner-registration"];

// ─── Context ──────────────────────────────────────────────────────────────────

type LenisContextType = {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
};

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

// ─── Provider ─────────────────────────────────────────────────────────────────

const LenisProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (ROUTES_WITHOUT_LENIS.some((route) => pathname?.startsWith(route))) {
      return;
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  const scrollTo: LenisContextType["scrollTo"] = (target, options = {}) => {
    const { offset = -80, duration = 1.5 } = options;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration });
    } else {
      // Fallback if Lenis isn't active on this route
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisProvider;
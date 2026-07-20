"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, createContext, useContext, useCallback } from "react";

const ROUTES_WITHOUT_LENIS = ["/vendor-registration", "/partner-registration"];

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

const scrollTo = useCallback<LenisContextType["scrollTo"]>(
  (target, options) => {
    lenisRef.current?.scrollTo(target as any, options);
  },
  [],
);

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisProvider;


// "use client";

// import Lenis from "lenis";
// import { usePathname } from "next/navigation";
// import { ReactNode, useEffect, useRef, useState, createContext, useContext, useCallback } from "react";

// const ROUTES_WITHOUT_LENIS = ["/vendor-registration", "/partner-registration"];

// type LenisContextType = {
//   scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
//   ready: boolean;
// };

// const LenisContext = createContext<LenisContextType>({
//   scrollTo: () => { },
//   ready: false,
// });

// export const useLenis = () => useContext(LenisContext);

// const LenisProvider = ({ children }: { children: ReactNode }) => {
//   const pathname = usePathname();
//   const lenisRef = useRef<Lenis | null>(null);
//   const [ready, setReady] = useState(false);

//   // 1. Create Lenis ONCE for the whole app lifetime
//   useEffect(() => {
//     if ("scrollRestoration" in history) {
//       history.scrollRestoration = "manual";
//     }

//     const lenis = new Lenis({
//       duration: 1.5,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       autoRaf: true,
//     });

//     lenisRef.current = lenis;
//     setReady(true);

//     return () => {
//       lenis.destroy();
//       lenisRef.current = null;
//       setReady(false);
//     };
//   }, []); // 👈 empty deps — no more destroy/recreate per route

//   // 2. Separately, just start/stop based on route — no teardown
//   useEffect(() => {
//     if (!lenisRef.current) return;

//     const shouldDisable = ROUTES_WITHOUT_LENIS.some((route) =>
//       pathname?.startsWith(route)
//     );

//     if (shouldDisable) {
//       lenisRef.current.stop();
//     } else {
//       lenisRef.current.start();
//     }
//   }, [pathname]);

//   // const scrollTo: LenisContextType["scrollTo"] = (target, options = {}) => {
//   //   const { offset = 0, duration = 1.5 } = options;
//   //   if (lenisRef.current) {
//   //     lenisRef.current.scrollTo(target, { offset, duration });
//   //   } else {
//   //     const el = typeof target === "string" ? document.querySelector(target) : target;
//   //     el?.scrollIntoView({ behavior: "smooth" });
//   //   }
//   // };

//   const scrollTo = useCallback<LenisContextType["scrollTo"]>(
//     (target, options) => {
//       lenisRef.current?.scrollTo(target as any, options);
//     },
//     [],
//   );

//   return (
//     <LenisContext.Provider value={{ scrollTo, ready }}>
//       {children}
//     </LenisContext.Provider>
//   );
// };

// export default LenisProvider;
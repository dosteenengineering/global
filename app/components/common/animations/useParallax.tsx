// import { useEffect, useRef, useState } from "react";

// export function useParallax(strength: number = 15) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [parallaxY, setParallaxY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!ref.current) return;
//       const rect = ref.current.getBoundingClientRect();
//       const viewportHeight = window.innerHeight;
//       const progress =
//         (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight;
//       const clamped = Math.max(-0.5, Math.min(0.5, progress));
//       setParallaxY(clamped * strength);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [strength]);

//   return { ref, parallaxY };
// }

import { useEffect, useRef, useState } from "react";

type Listener = () => void;

const listeners = new Set<Listener>();
let rafId: number | null = null;
let scrollAttached = false;

function runListeners() {
  rafId = null;
  listeners.forEach((fn) => fn());
}
function scheduleUpdate() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(runListeners);
}
function attachScrollListener() {
  if (scrollAttached) return;
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  scrollAttached = true;
}
function detachScrollListenerIfUnused() {
  if (listeners.size === 0 && scrollAttached) {
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    scrollAttached = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}

export function useParallax(strength: number = 15, scale?: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const strengthRef = useRef(strength);
  strengthRef.current = strength;
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;

      // unchanged default: measure from el itself, exactly like before
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress =
        (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight;
      const clamped = Math.max(-0.5, Math.min(0.5, progress));

      let offset = clamped * strengthRef.current;

      // NEW: only applies if `scale` was explicitly passed in
      if (scaleRef.current !== undefined) {
        const overflow = rect.height * (scaleRef.current - 1);
        const maxOffset = overflow / 2;
        offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
      }

      setParallaxY(offset);
    };

    listeners.add(update);
    attachScrollListener();
    update();

    return () => {
      listeners.delete(update);
      detachScrollListenerIfUnused();
    };
  }, []);

  return { ref, parallaxY };
}
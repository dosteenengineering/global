import { useEffect, useRef, useState } from "react";

export function useParallax(strength: number = 15) {
  const ref = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress =
        (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight;
      const clamped = Math.max(-0.5, Math.min(0.5, progress));
      setParallaxY(clamped * strength);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [strength]);

  return { ref, parallaxY };
}
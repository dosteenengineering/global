"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  trigger: string;
  className?: string;
}

export default function AnimatedServiceIcon({ src, trigger, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState("");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!src) return;
    fetch(src)
      .then((res) => res.text())
      .then(setSvgHtml)
      .catch(console.error);
  }, [src]);

  useEffect(() => {
    if (!svgHtml) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = svgHtml;
    const svg = container.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const paths = Array.from(svg.querySelectorAll("path"));
    if (!paths.length) return;

    // Sort left-to-right by X position
    const sorted = paths.sort(
      (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left
    );

    // Store lengths once
    const lengths = sorted.map((p) => p.getTotalLength());

    const DRAW_DURATION = 3000; // 3s to draw
    const HOLD_DURATION = 2000; // 2s hold fully drawn
    const CYCLE = DRAW_DURATION + HOLD_DURATION; // 5s total cycle
    const staggerStep = DRAW_DURATION / sorted.length;

    // Clear any running timers
    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const reset = () => {
      sorted.forEach((path, i) => {
        path.style.transition = "none";
        path.style.strokeDasharray = `${lengths[i]}`;
        path.style.strokeDashoffset = `${lengths[i]}`; // hidden
      });
    };

    const draw = () => {
      sorted.forEach((path, i) => {
        const delay = i * staggerStep;
        const duration = staggerStep * 1.5; // slight overlap

        const t = setTimeout(() => {
          path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
          path.style.strokeDashoffset = "0"; // fully drawn
        }, delay);

        timersRef.current.push(t);
      });
    };

    const startCycle = () => {
      clearTimers();
      reset();
      draw();

      // After draw(3s) + hold(2s) → reset and draw again
      const loopTimer = setTimeout(() => {
        startCycle(); // recurse → infinite loop
      }, CYCLE);

      timersRef.current.push(loopTimer);
    };

    

    startCycle();

    // Cleanup on unmount or re-trigger
    return () => clearTimers();

  }, [svgHtml, trigger]);

  return (
    <div
      ref={containerRef}
      className={className}
    />
  );
}
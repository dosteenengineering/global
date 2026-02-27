"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: string | number;
  start?: number;
  totalTime?: number;
  className?: string;
}

function parseValue(value: string | number): {
  num: number;
  prefix: string;
  suffix: string;
  formatted: boolean;
} {
  const str = String(value).trim();
  const prefixMatch = str.match(/^([^0-9]*)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  const suffixMatch = str.match(/([^0-9]+)$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";
  const middle = str.slice(prefix.length, suffix ? str.length - suffix.length : str.length);
  const formatted = middle.includes(",");
  const num = parseInt(middle.replace(/,/g, ""), 10) || 0;
  return { num, prefix, suffix, formatted };
}

function formatNumber(n: number, withCommas: boolean): string {
  if (withCommas) return n.toLocaleString("en-US");
  return String(n);
}

// Cubic ease-in-out: slow start, fast middle, gentle landing
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Smooth deceleration with a slight overshoot feel (no bounce, just weight)
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

// Blend of both: fast ramp up, long smooth deceleration tail
function smoothEase(t: number): number {
  // Use cubic ease-in for first 30%, outQuart for rest — gives weight + smooth stop
  if (t < 0.3) {
    const t2 = t / 0.3;
    return easeInOutCubic(t2) * 0.45;
  }
  const t2 = (t - 0.3) / 0.7;
  return 0.45 + easeOutQuart(t2) * 0.55;
}

export default function Counter({
  value,
  start = 0,
  totalTime = 2200,
  className = "",
}: CounterProps) {
  const { num: endNum, prefix, suffix, formatted } = parseValue(value);

  // Always start from a meaningful lower bound for visual richness
  // If explicit start=0 and endNum is large, begin from ~12% of end
  const effectiveStart = start === 0 && endNum > 100
    ? Math.floor(endNum * 0.12)
    : start;

  const [current, setCurrent] = useState(effectiveStart);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrent(effectiveStart);
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Small delay before starting — lets the component mount cleanly
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed = timestamp - startTimeRef.current;
        const rawProgress = Math.min(elapsed / totalTime, 1);
        const eased = smoothEase(rawProgress);
        const currentVal = Math.round(effectiveStart + (endNum - effectiveStart) * eased);

        setCurrent(currentVal);

        if (rawProgress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCurrent(endNum);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, 80);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [endNum, effectiveStart, totalTime]);

  const displayNumber = formatNumber(current, formatted);

  return (
    <span className={`flex items-baseline ${className}`}>
      {prefix && <span className="text-primary">{prefix}</span>}

      {displayNumber.split("").map((char, i) => {
        const isSpecial = char === "," || char === ".";
        return (
          <span key={i} className={isSpecial ? "text-primary" : ""}>
            {char}
          </span>
        );
      })}

      {suffix && <span className="text-primary">{suffix}</span>}
    </span>
  );
}
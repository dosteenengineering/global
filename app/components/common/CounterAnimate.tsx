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
  digits: number;
} {
  const str = String(value).trim();
  const prefixMatch = str.match(/^([^0-9]*)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  const suffixMatch = str.match(/([^0-9]+)$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";
  const middle = str.slice(prefix.length, suffix ? str.length - suffix.length : str.length);
  const formatted = middle.includes(",");
  const raw = middle.replace(/,/g, "");
  const num = parseInt(raw, 10) || 0;
  // Digit count of the final number (no commas)
  const digits = raw.length;
  return { num, prefix, suffix, formatted, digits };
}

function formatNumber(n: number, withCommas: boolean, minDigits: number): string {
  if (withCommas) {
    // Pad with leading zeros before applying locale formatting
    const str = String(n).padStart(minDigits, "0");
    // Re-parse to apply locale, then pad the first group if needed
    const localed = n.toLocaleString("en-US");
    // How many digits total in the final number?
    const finalDigits = String(n).length;
    const zerosNeeded = Math.max(0, minDigits - finalDigits);
    return "0".repeat(zerosNeeded) + localed;
  }
  return String(n).padStart(minDigits, "0");
}

// Fast start, long silky deceleration — like a slot machine winding down
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Slight ease-in then long ease-out for cinematic weight
function cinematicEase(t: number): number {
  if (t < 0.15) {
    // Accelerate in
    const t2 = t / 0.15;
    return (t2 * t2 * t2) * 0.18;
  }
  const t2 = (t - 0.15) / 0.85;
  return 0.18 + easeOutExpo(t2) * 0.82;
}

export default function Counter({
  value,
  start = 0,
  totalTime = 2.4,
  className = "",
}: CounterProps) {
  const { num: endNum, prefix, suffix, formatted, digits } = parseValue(value);

  const effectiveStart = start === 0 ? 0 : start;

  const [current, setCurrent] = useState(effectiveStart);
  // Track how many leading zeros to show (decreases as number grows)
  const rafRef       = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrent(effectiveStart);
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed     = timestamp - startTimeRef.current;
        const rawProgress = Math.min(elapsed / (totalTime * 1000), 1);
        const eased       = cinematicEase(rawProgress);
        const currentVal  = Math.round(effectiveStart + (endNum - effectiveStart) * eased);

        setCurrent(currentVal);

        if (rawProgress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCurrent(endNum);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, 120);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [endNum, effectiveStart, totalTime]);

  // Preserve digit count — if end is 4 digits, always show at least 4 chars
  const displayNumber = formatNumber(current, formatted, digits);

  return (
    <span className={`flex items-baseline ${className}`}>
      {prefix && <span className="text-primary">{prefix}</span>}

      {displayNumber.split("").map((char, i) => {
        const isSpecial = char === "," || char === ".";
        const isLeadingZero =
          char === "0" &&
          i < displayNumber.length - String(current).replace(/,/g, "").length;
        return (
          <span
            key={i}
            className={
              isSpecial || isLeadingZero
                ? "text-primary"
                : isSpecial
                  ? "text-secondary"
                  : ""
            }
          >
            {char}
          </span>
        );
      })}

      {suffix && <span className="text-primary">{suffix}</span>}
    </span>
  );
}
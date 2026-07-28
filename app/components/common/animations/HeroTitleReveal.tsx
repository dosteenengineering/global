"use client";
import { useEffect, useRef, useState, useMemo } from "react";

interface TitleRevealFillProps {
  text?: string;
  texts?: string[];
  className?: string;
  delay?: number;
  revealDur?: number;
  linePause?: number;
  fillDur?: number;
  fillOffset?: number;
  holdDur?: number;   // how long a fully revealed title stays before exiting
  exitDur?: number;   // duration of the exit transition
  loop?: boolean;     // cycle back to the first title after the last
}

export default function TitleRevealFill({
  text = "Where Engineering Meets Assurance",
  texts,
  className = "",
  delay = 60,
  revealDur = 750,
  linePause = 120,
  fillDur = 900,
  fillOffset = 80,
  holdDur = 2200,
  exitDur = 500,
  loop = true,
}: TitleRevealFillProps) {
  const measureRef = useRef<HTMLHeadingElement>(null);
  const [lineGroups, setLineGroups] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Fall back to a single-item array so single-title usage keeps working unchanged
  const items = useMemo(() => (texts && texts.length ? texts : [text]), [texts, text]);
  const activeText = items[index] ?? items[0];
  const words = activeText.toUpperCase().split(/\s+/).filter(Boolean);

  // Re-measure line wrapping whenever the active text changes
  useEffect(() => {
    setLineGroups(null); // force remeasure pass for the new text
  }, [index, items]);

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const spans = Array.from(
        measureRef.current.querySelectorAll<HTMLElement>("[data-word]"),
      );
      if (!spans.length) return;

      const groups: string[][] = [];
      let curTop: number | null = null;
      let curGroup: string[] = [];

      spans.forEach((span) => {
        const top = Math.round(span.getBoundingClientRect().top);
        if (curTop === null || Math.abs(top - curTop) > 4) {
          if (curGroup.length) groups.push(curGroup);
          curGroup = [span.dataset.word ?? ""];
          curTop = top;
        } else {
          curGroup.push(span.dataset.word ?? "");
        }
      });
      if (curGroup.length) groups.push(curGroup);
      setLineGroups(groups.map((g) => g.join(" ")));
    };

    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    const el = measureRef.current;
    if (el) ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [activeText]);

  const revealStart = (i: number) => delay + i * (revealDur * 0.5 + linePause);
  const fillStart = (i: number, total: number) =>
    i < total - 1
      ? revealStart(i + 1) + fillOffset
      : revealStart(i) + revealDur * 0.75;

  // Schedule hold -> exit -> advance to next title once entrance has fully played
  useEffect(() => {
    if (!lineGroups || items.length <= 1) return;

    const lastIndex = lineGroups.length - 1;
    const entranceEnd = fillStart(lastIndex, lineGroups.length) + fillDur;

    const exitTimer = setTimeout(() => setExiting(true), entranceEnd + holdDur);
    const advanceTimer = setTimeout(() => {
      setExiting(false);
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= items.length) return loop ? 0 : prev;
        return next;
      });
    }, entranceEnd + holdDur + exitDur);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(advanceTimer);
    };
  }, [lineGroups, items.length, holdDur, exitDur, loop, fillDur]);

  const css = (lineGroups ?? [])
    .map(
      (_, i) => `
    .trf-inner-${i} {
      display: block; opacity: 0; line-height: inherit;
      animation: trfUp ${revealDur}ms cubic-bezier(0.16,1,0.3,1) forwards;
      animation-delay: ${revealStart(i)}ms;
    }
    .trf-fill-${i} {
      position: absolute; inset: 0; display: block; line-height: inherit;
      color: #FFFBFB; clip-path: inset(0 100% 0 0);
      animation: trfWipe ${fillDur}ms cubic-bezier(0.65,0,0.35,1) forwards;
      animation-delay: ${fillStart(i, lineGroups?.length ?? 0)}ms;
    }
  `,
    )
    .join("\n");

  return (
    <>
      <style>{`
        @keyframes trfUp {
          from { transform: translateY(105%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes trfWipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        .trf-mask {
          display: block; overflow: hidden; line-height: inherit;  
          margin-bottom: -0.04em;
        }
        .trf-stroke {
          display: block; color: transparent;
          -webkit-text-stroke: 0.5px #FFFBFB;
          position: relative; line-height: 1.05;
        }
        .trf-fill-base {
          position: absolute; inset: 0; display: block; line-height: inherit;
        }
        .trf-exit-wrap {
          transition: opacity ${exitDur}ms ease, transform ${exitDur}ms ease;
        }
        .trf-exit-wrap.is-exiting {
          opacity: 0;
          transform: translateY(-14px);
        }
           @media (max-width: 768px) {
              .trf-stroke {
                line-height: 1.01;
              }
              .trf-mask {
                margin-bottom: 0;
              }
            }
        ${css}
      `}</style>

      {!lineGroups && (
        <h1
          ref={measureRef}
          className={className}
          aria-hidden="true"
          style={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}
        >
          {words.map((w, i) => (
            <span key={i} data-word={w} style={{ display: "inline" }}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
      )}

      {lineGroups && (
        <h1
          key={`title-${index}`}
          className={`${className} trf-exit-wrap ${exiting ? "is-exiting" : ""}`}
        >
          {lineGroups.map((line, i) => (
            <span key={i} className="trf-mask">
              <span className={`trf-inner-${i}`}>
                <span className="trf-stroke">
                  {line}
                  <span className={`trf-fill-base trf-fill-${i}`}>{line}</span>
                </span>
              </span>
            </span>
          ))}
        </h1>
      )}
    </>
  );
}
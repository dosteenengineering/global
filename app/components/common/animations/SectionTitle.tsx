"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  text?: string;
  title?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
  stagger?: number;
}

export default function SectionTitle({
  text,
  title,
  className = "",
  as: Tag   = "h1",
  delay     = 0.23,
  stagger   = 0.12,
}: SectionTitleProps) {
  const ref     = useRef<HTMLElement>(null);
  const content = text ?? title ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || !content) return;

    // Step 1: Element already has plain text content rendered (from JSX below).
    // Read its actual rendered width — guaranteed non-zero since text is in DOM.
    const elRect = el.getBoundingClientRect();

    // Step 2: Clone at exact same position & width for accurate line detection
    const clone = el.cloneNode(false) as HTMLElement;
    Object.assign(clone.style, {
      position:      "fixed",
      top:           `${elRect.top}px`,
      left:          `${elRect.left}px`,
      width:         `${elRect.width}px`,
      visibility:    "hidden",
      pointerEvents: "none",
      zIndex:        "-1",
      margin:        "0",
    });

    const words = content.split(" ").filter(Boolean);
    clone.innerHTML = words
      .map((w, i) => `<span data-i="${i}">${w}</span>${i < words.length - 1 ? " " : ""}`)
      .join("");

    document.body.appendChild(clone);

    const spans   = Array.from(clone.querySelectorAll<HTMLElement>("[data-i]"));
    const lineMap = new Map<number, string[]>();
    spans.forEach((s) => {
      const top = Math.round(s.getBoundingClientRect().top);
      if (!lineMap.has(top)) lineMap.set(top, []);
      lineMap.get(top)!.push(s.textContent ?? "");
    });
    const lines = Array.from(lineMap.values()).map((w) => w.join(" "));
    document.body.removeChild(clone);

    // Step 3: Rebuild with mask > inner per line
    el.innerHTML = "";
    const fragment = document.createDocumentFragment();
    lines.forEach((line) => {
      const mask = document.createElement("span");
      mask.style.cssText = "display:block; overflow:hidden; padding-bottom:0.08em; margin-bottom:-0.08em;";
      const inner = document.createElement("span");
      inner.style.cssText = "display:block;";
      inner.textContent = line;
      mask.appendChild(inner);
      fragment.appendChild(mask);
    });
    el.appendChild(fragment);

    // Step 4: GSAP — trigger when 20% of element is visible
    const inners = Array.from(el.querySelectorAll<HTMLElement>("span > span"));
    const fromY  = lines.length === 1 ? "160%" : "110%";
    gsap.set(inners, { y: fromY, opacity: 0 });

    const animate = () => {
      gsap.to(inners, {
        y:        0,
        opacity:  1,
        duration: lines.length === 1 ? 1.05 : 0.85,
        ease:     "power3.out",
        stagger,
        delay,
      });
    };

    const ctx = gsap.context(() => {
      const rect      = el.getBoundingClientRect();
      const visiblePx = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const already20 = visiblePx >= rect.height * 0.2;

      if (already20) {
        animate();
      } else {
        ScrollTrigger.create({
          trigger: el,
          start:   "top+=20% bottom",
          once:    true,
          onEnter: animate,
        });
      }
    });

    return () => ctx.revert();
  }, [content, delay, stagger]);

  // Render plain text first so element has real dimensions before useEffect runs
  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
    >
      {content}
    </Tag>
  );
}
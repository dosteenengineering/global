// "use client";

// interface SectionTitleProps {
//   text?: string;
//   title?: string;
//   className?: string;
//   as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
//   delay?: number;
// }

// export default function SectionTitle({
//   text,
//   title,
//   className = "",
//   as: Tag = "h2",
//   delay,
// }: SectionTitleProps) {
//   void delay;

//   return <Tag className={className}>{text ?? title ?? ""}</Tag>;
// }

// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface SectionTitleProps {
//   text?: string;
//   title?: string;
//   className?: string;
//   as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
//   delay?: number;
//   stagger?: number;
// }

// export default function SectionTitle({
//   text,
//   title,
//   className = "",
//   as: Tag   = "h1",
//   delay     = 0.23,
//   stagger   = 0.12,
// }: SectionTitleProps) {
//   const ref     = useRef<HTMLElement>(null);
//   const content = text ?? title ?? "";

//   useEffect(() => {
//     const el = ref.current;
//     if (!el || !content) return;

//     // Step 1: Element already has plain text content rendered (from JSX below).
//     // Read its actual rendered width — guaranteed non-zero since text is in DOM.
//     const elRect = el.getBoundingClientRect();

//     // Step 2: Clone at exact same position & width for accurate line detection
//     const clone = el.cloneNode(false) as HTMLElement;
//     Object.assign(clone.style, {
//       position:      "fixed",
//       top:           `${elRect.top}px`,
//       left:          `${elRect.left}px`,
//       width:         `${elRect.width}px`,
//       visibility:    "hidden",
//       pointerEvents: "none",
//       zIndex:        "-1",
//       margin:        "0",
//     });

//     const words = content.split(" ").filter(Boolean);
//     clone.innerHTML = words
//       .map((w, i) => `<span data-i="${i}">${w}</span>${i < words.length - 1 ? " " : ""}`)
//       .join("");

//     document.body.appendChild(clone);

//     const spans   = Array.from(clone.querySelectorAll<HTMLElement>("[data-i]"));
//     const lineMap = new Map<number, string[]>();
//     spans.forEach((s) => {
//       const top = Math.round(s.getBoundingClientRect().top);
//       if (!lineMap.has(top)) lineMap.set(top, []);
//       lineMap.get(top)!.push(s.textContent ?? "");
//     });
//     const lines = Array.from(lineMap.values()).map((w) => w.join(" "));
//     document.body.removeChild(clone);

//     // Step 3: Rebuild with mask > inner per line
//     el.innerHTML = "";
//     const fragment = document.createDocumentFragment();
//     lines.forEach((line) => {
//       const mask = document.createElement("span");
//       // mask.style.cssText = "display:block; overflow:hidden; padding-bottom:0.08em; margin-bottom:-0.08em;";
//          mask.style.cssText = `
//         display:block;
//         // overflow:hidden;
//         ${lines.length > 1 ? "padding-bottom:0.00277em; padding-top:1px; margin-bottom:-1.7px;" : ""}
//       `;
//       const inner = document.createElement("span");
//       inner.style.cssText = "display:block;";
//       inner.textContent = line;
//       mask.appendChild(inner);
//       fragment.appendChild(mask);
//     });
//     el.appendChild(fragment);

//     // Step 4: GSAP — trigger when 20% of element is visible
//     const inners = Array.from(el.querySelectorAll<HTMLElement>("span > span"));
//     const fromY  = lines.length === 1 ? "160%" : "110%";
//     gsap.set(inners, { y: fromY, opacity: 0 });

//     const animate = () => {
//       gsap.to(inners, {
//         y:        0,
//         opacity:  1,
//         duration: lines.length === 1 ? 1.05 : 0.85,
//         ease:     "power3.out",
//         stagger,
//         delay,
//       });
//     };

//     const ctx = gsap.context(() => {
//       const rect      = el.getBoundingClientRect();
//       const visiblePx = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
//       const already20 = visiblePx >= rect.height * 0.2;

//       if (already20) {
//         animate();
//       } else {
//         ScrollTrigger.create({
//           trigger: el,
//           start:   "top+=20% bottom",
//           once:    true,
//           onEnter: animate,
//         });
//       }
//     });

//     return () => ctx.revert();
//   }, [content, delay, stagger]);

//   // Render plain text first so element has real dimensions before useEffect runs
//   return (
//     <Tag
//       ref={ref as React.RefObject<HTMLHeadingElement>}
//       className={`relative  ${className}`}
//     >
//       {content}
//     </Tag>
//   );
// }





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
  as: Tag = "h1",
  delay = 0.23,
  stagger = 0.12,
}: SectionTitleProps) {
  const ref = useRef<HTMLElement>(null);
  const content = text ?? title ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el || !content) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

const run = () => {
  if (cancelled || !el.isConnected) return;

  const elRect = el.getBoundingClientRect();
  const computed = window.getComputedStyle(el);

  // Split on \n first — each segment is a forced line group
  const segments = content.split("\n").map((s) => s.trim()).filter(Boolean);

  const measureSegment = (text: string): string[] => {
    const clone = el.cloneNode(false) as HTMLElement;
    Object.assign(clone.style, {
      position: "absolute",
      top: "0", left: "0",
      visibility: "hidden",
      pointerEvents: "none",
      zIndex: "-1",
      margin: "0",
      boxSizing: computed.boxSizing,
      width: computed.boxSizing === "border-box" ? `${elRect.width}px` : computed.width,
      font: computed.font,
      letterSpacing: computed.letterSpacing,
      wordSpacing: computed.wordSpacing,
      textTransform: computed.textTransform,
      lineHeight: computed.lineHeight,
      whiteSpace: "normal",
    });

    const words = text.split(" ").filter(Boolean);
    clone.innerHTML = words
      .map((w, i) => `<span data-i="${i}">${w}</span>${i < words.length - 1 ? " " : ""}`)
      .join("");

    el.parentElement?.appendChild(clone);

    const spans = Array.from(clone.querySelectorAll<HTMLElement>("[data-i]"));
    const lineMap = new Map<number, string[]>();
    spans.forEach((s) => {
      const top = Math.round(s.getBoundingClientRect().top);
      if (!lineMap.has(top)) lineMap.set(top, []);
      lineMap.get(top)!.push(s.textContent ?? "");
    });

    clone.remove();
    return Array.from(lineMap.values()).map((w) => w.join(" "));
  };

  // Each \n segment measured independently, results concatenated
  const lines = segments.flatMap((seg) => measureSegment(seg));

      // clone.remove();

      // Step 3: Rebuild with mask > inner per line
      el.innerHTML = "";
      const fragment = document.createDocumentFragment();
      lines.forEach((line) => {
        const mask = document.createElement("span");
        mask.style.cssText = `
          display:block;
          ${lines.length > 1 ? "padding-bottom:0.00277em; padding-top:1px; margin-bottom:-1.7px;" : ""}
        `;
        const inner = document.createElement("span");
        inner.style.cssText = "display:block;";
        inner.textContent = line;
        mask.appendChild(inner);
        fragment.appendChild(mask);
      });
      el.appendChild(fragment);

      // Step 4: GSAP — trigger when 20% of element is visible
      const inners = Array.from(
        el.querySelectorAll<HTMLElement>("span > span"),
      );
      const fromY = lines.length === 1 ? "160%" : "110%";
      gsap.set(inners, { y: fromY, opacity: 0 });

      const animate = () => {
        gsap.to(inners, {
          y: 0,
          opacity: 1,
          duration: lines.length === 1 ? 1.05 : 0.85,
          ease: "power3.out",
          stagger,
          delay,
        });
      };

      ctx = gsap.context(() => {
        const rect = el.getBoundingClientRect();
        const visiblePx =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const already20 = visiblePx >= rect.height * 0.2;

        if (already20) {
          animate();
        } else {
          ScrollTrigger.create({
            trigger: el,
            start: "top+=20% bottom",
            once: true,
            onEnter: animate,
          });
        }
      });
    };

    // Step 0: wait for fonts so measured wrap points match final render.
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [content, delay, stagger]);

  // Render plain text first so element has real dimensions before useEffect runs
  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`relative ${className}`}
    >
      {content}
    </Tag>
  );
}

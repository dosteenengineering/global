"use client";

import { useEffect, useRef } from "react";

interface SectionDescriptionProps {
  text?: string;
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  as?: "p" | "span" | "div";
  delay?: number;
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const ensureStyles = () => {
  if (document.getElementById("sd-styles")) return;
  const s = document.createElement("style");
  s.id = "sd-styles";
  s.textContent = `
    .sd-line-wrap  { display: block; overflow: hidden; line-height: inherit; }
    .sd-line-inner { display: block; transform: translateY(105%); opacity: 0; }
    .sd-line-inner.in {
      animation: sd-up var(--dur) ${EASE} var(--del) forwards;
    }
    @keyframes sd-up {
      from { transform: translateY(105%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    .sd-rich-html {
      transform: translateY(20px);
      opacity: 0;
      transition: transform var(--dur) ${EASE} var(--del),
                  opacity   var(--dur) ${EASE} var(--del);
    }
    .sd-rich-html.in { transform: translateY(0); opacity: 1; }
  `;
  document.head.appendChild(s);
};

function triggerLines(el: HTMLElement) {
  el.querySelectorAll<HTMLElement>(".sd-line-inner").forEach((s) =>
    s.classList.add("in")
  );
}

function isInViewport(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < (window.innerHeight || document.documentElement.clientHeight);
}

function watchAndAnimate(el: HTMLElement, onVisible: () => void) {
  // Always fire after a safe timeout as an absolute fallback
  const fallback = setTimeout(() => {
    onVisible();
  }, 300);

  if (isInViewport(el)) {
    clearTimeout(fallback);
    // Small delay to let paint settle before animating
    setTimeout(onVisible, 50);
    return () => { };
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      clearTimeout(fallback);
      onVisible();
      observer.disconnect();
    },
    { threshold: 0.05 }
  );
  observer.observe(el);

  return () => {
    clearTimeout(fallback);
    observer.disconnect();
  };
}

export function SectionDescription({
  text,
  dangerouslySetInnerHTML,
  className = "",
  as: Tag = "p",
  delay = 0.4,
}: SectionDescriptionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureStyles();

    const htmlContent = dangerouslySetInnerHTML?.__html;
    const isHTML = htmlContent && /<[a-z][\s\S]*>/i.test(htmlContent);

    // ── Rich HTML path ──────────────────────────────────────────────────────
    if (isHTML) {
      el.innerHTML = htmlContent;
      el.classList.add("sd-rich-html");
      el.style.setProperty("--del", `${delay}s`);
      el.style.setProperty("--dur", "0.9s");

      const cleanup = watchAndAnimate(el, () => {
        requestAnimationFrame(() => el.classList.add("in"));
      });
      return cleanup;
    }

    // ── Plain text path ─────────────────────────────────────────────────────
    const plainText = text || htmlContent || "";
    if (!plainText) return;

    // const words = plainText.split(/\s+/).filter(Boolean);
    // const words = plainText
    //   .split(/\s+/)
    //   .filter(Boolean)
    //   .flatMap((word) =>
    //     word.includes("-")
    //       ? word.split("-").flatMap((part, i, arr) =>
    //         i < arr.length - 1 ? [part + "-"] : [part]
    //       )
    //       : [word]
    //   );

    // Tracks whether animation has already played (don't re-animate on resize)
    let hasAnimated = false;
    let animCleanup = () => { };
    let pendingRaf1 = 0;
    let pendingRaf2 = 0;

    let isBuilding = false;

    const buildLines = (skipAnimation = false) => {
      if (isBuilding) return;
      isBuilding = true;
      const words = plainText
        .split(/\s+/)
        .filter(Boolean)
        .flatMap((word) =>
          word.includes("-")
            ? word.split("-").flatMap((part, i, arr) =>
              i < arr.length - 1 ? [part + "-"] : [part]
            )
            : [word]
        );

      // Cancel any in-flight measurement
      cancelAnimationFrame(pendingRaf1);
      cancelAnimationFrame(pendingRaf2);

      // Phase 1: render words as invisible inline spans for layout measurement
      el.innerHTML = "";
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.style.cssText = "display:inline; visibility:hidden;";
        span.dataset.word = word;
        span.textContent = i < words.length - 1 ? word + " " : word;
        el.appendChild(span);
      });

      // Phase 2: measure after layout settles
      pendingRaf1 = requestAnimationFrame(() => {
        pendingRaf2 = requestAnimationFrame(() => {
          const spans = Array.from(el.children) as HTMLElement[];

          const lineMap = new Map<number, string[]>();
          spans.forEach((span) => {
            const top = Math.round(span.getBoundingClientRect().top);
            if (!lineMap.has(top)) lineMap.set(top, []);
            lineMap.get(top)!.push(span.dataset.word ?? "");
          });

          const lines = Array.from(lineMap.entries())
            .sort(([a], [b]) => a - b)
            // .map(([, ws]) => ws.join(" ").trimEnd());

            .map(([, ws]) => {
              return ws.reduce((acc, w, i) => {
                if (i === 0) return w;
                // if (acc.endsWith("-")) return acc + w;
                return acc + " " + w;
              }, "").trimEnd();
            });

          // Phase 3: rebuild as animated line wrappers
          el.innerHTML = "";
          lines.forEach((lineText, li) => {
            const wrap = document.createElement("span");
            wrap.className = "sd-line-wrap";

            const inner = document.createElement("span");
            inner.className = "sd-line-inner";
            inner.style.setProperty("--del", `${delay + li * 0.18}s`);
            inner.style.setProperty("--dur", "0.9s");
            inner.textContent = lineText;

            // On resize after animation already played: show lines immediately
            if (skipAnimation) inner.classList.add("in");

            wrap.appendChild(inner);
            el.appendChild(wrap);
          });

          // Phase 4: animate if not already done
          if (!skipAnimation) {
            animCleanup();
            animCleanup = watchAndAnimate(el, () => {
              requestAnimationFrame(() => {
                triggerLines(el);
                hasAnimated = true;
              });
            });
          }
          isBuilding = false; 
        });
      });
    };

    // Initial build
    buildLines(false);

    // Re-measure on container width change, debounced
    let resizeTimer = 0;
    let lastWidth = el.getBoundingClientRect().width;

    const resizeObserver = new ResizeObserver((entries) => {
      if (isBuilding) return;
      const newWidth = entries[0].contentRect.width;
      // Only re-measure if width actually changed (ignore height-only changes)
      if (Math.abs(newWidth - lastWidth) < 1) return;
      lastWidth = newWidth;

      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        // If animation already played, rebuild and show immediately (no re-animate)
        buildLines(hasAnimated);
      }, 100); // 100ms debounce — fast enough to feel instant
    });

    resizeObserver.observe(el);

    return () => {
      cancelAnimationFrame(pendingRaf1);
      cancelAnimationFrame(pendingRaf2);
      clearTimeout(resizeTimer);
      animCleanup();
      resizeObserver.disconnect();
      el.textContent = plainText;
    };
  }, [text, dangerouslySetInnerHTML, delay]);

  return (
    <Tag
      ref={
        ref as React.RefObject<
          HTMLParagraphElement & HTMLSpanElement & HTMLDivElement
        >
      }
      className={`text-description ${className}`}
    />
  );
}

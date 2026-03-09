// "use client";
// export default function TitleReveal({
//   text = "Where Engineering Meets Assurance",
//   className = "",
//   delay = 200,
//   stagger = 90,
// }) {
//   const words = text.split(" ");

//   return (
//     <>
//       <style>{`
//         @keyframes wordUp {
//           from {
//             transform: translateY(110%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0%);
//             opacity: 1;
//           }
//         }
//         .word-mask {
//           display: inline-block;
//           overflow: hidden;
//           vertical-align: bottom;
//           /* extra padding so descenders aren't clipped */
//           padding-bottom: 0.08em;
//           margin-bottom: -0.08em;
//         }
//         .word-inner {
//           display: inline-block;
//           opacity: 0;
//           animation: wordUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//       `}</style>

//       <h1 className={className}>
//         {words.map((word, i) => (
//           <span key={i} className="word-mask">
//             <span
//               className="word-inner"
//               style={{ animationDelay: `${delay + i * stagger}ms` }}
//             >
//               {word}
//             </span>
//             {/* space between words */}
//             {i < words.length - 1 && "\u00A0"}
//           </span>
//         ))}
//       </h1>
//     </>
//   );
// }





"use client";
import { useEffect, useRef, useState } from "react";

interface TitleRevealFillProps {
  text?: string;
  className?: string;
  delay?: number;
  revealDur?: number;
  linePause?: number;
  fillDur?: number;
  fillOffset?: number;
}

export default function TitleRevealFill({
  text       = "Where Engineering Meets Assurance",
  className  = "",
  delay      = 60,
  revealDur  = 750,
  linePause  = 120,
  fillDur    = 900,
  fillOffset = 80,
}: TitleRevealFillProps) {
  const measureRef = useRef<HTMLHeadingElement>(null);
  const [lineGroups, setLineGroups] = useState<string[] | null>(null);

  const words = text.toUpperCase().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const spans = Array.from(
        measureRef.current.querySelectorAll<HTMLElement>("[data-word]")
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
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [text]);

  const revealStart = (i: number) => delay + i * (revealDur * 0.5 + linePause);
  const fillStart = (i: number, total: number) =>
    i < total - 1
      ? revealStart(i + 1) + fillOffset
      : revealStart(i) + revealDur * 0.75;

  const css = (lineGroups ?? []).map((_, i) => `
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
  `).join("\n");

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
          padding-top: 0.01em;    margin-top: -0.18em;
          padding-bottom: 0.09em; margin-bottom: -0.09em;
        }
        .trf-stroke {
          display: block; color: transparent;
          -webkit-text-stroke: 0.5px #FFFBFB;
          position: relative; line-height: inherit;
        }
        .trf-fill-base {
          position: absolute; inset: 0; display: block; line-height: inherit;
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
              {w}{i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
      )}

      {lineGroups && (
        <h1 className={className}>
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





// "use client";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// interface TitleLogoRevealProps {
//   text?: string;
//   className?: string;
//   iconSrc?: string;
//   iconClassName?: string;
//   delay?: number;
//   strokeRevealDur?: number;
//   strokeStagger?: number;
//   moveDur?: number;
//   sweepDur?: number;
//   returnDur?: number;
//   navReadyDelay?: number;
// }

// export default function TitleLogoReveal({
//   text             = "",
//   className        = "",
//   iconSrc          = "/assets/logos/logo-white.svg",
//   iconClassName    = "w-[35px] h-[40px] 2xl:w-[41.58px] 2xl:h-[46.98px]",
//   delay            = 300,
//   strokeRevealDur  = 650,
//   strokeStagger    = 220,
//   moveDur          = 400,
//   sweepDur         = 860,
//   returnDur        = 700,
//   navReadyDelay    = 1050,
// }: TitleLogoRevealProps) {
//   const wrapRef    = useRef<HTMLDivElement>(null);   // position:relative container
//   const measureRef = useRef<HTMLHeadingElement>(null);
//   const linesRef   = useRef<HTMLHeadingElement>(null);
//   const iconRef    = useRef<HTMLSpanElement>(null);
//   const sizeRef    = useRef<HTMLSpanElement>(null);

//   const [lineGroups, setLineGroups] = useState<string[] | null>(null);
//   const [animReady,  setAnimReady]  = useState(false);
//   const [mounted,    setMounted]    = useState(false);
//   const [iconSize,   setIconSize]   = useState({ w: 44, h: 50 });

//   const words = text.toUpperCase().split(/\s+/).filter(Boolean);

//   useEffect(() => { setMounted(true); }, []);

//   useEffect(() => {
//     if (!sizeRef.current) return;
//     const el = sizeRef.current;
//     const read = () => {
//       const r = el.getBoundingClientRect();
//       if (r.width > 0) setIconSize({ w: r.width, h: r.height });
//     };
//     const raf = requestAnimationFrame(read);
//     const ro  = new ResizeObserver(read);
//     ro.observe(el);
//     return () => { cancelAnimationFrame(raf); ro.disconnect(); };
//   }, [mounted]);

//   useEffect(() => {
//     const measure = () => {
//       if (!measureRef.current) return;
//       const spans = Array.from(
//         measureRef.current.querySelectorAll<HTMLElement>("[data-word]")
//       );
//       if (!spans.length) return;
//       const groups: string[][]  = [];
//       let curTop: number | null = null;
//       let curGroup: string[]    = [];
//       spans.forEach((s) => {
//         const top = Math.round(s.getBoundingClientRect().top);
//         if (curTop === null || Math.abs(top - curTop) > 4) {
//           if (curGroup.length) groups.push(curGroup);
//           curGroup = [s.dataset.word ?? ""];
//           curTop   = top;
//         } else {
//           curGroup.push(s.dataset.word ?? "");
//         }
//       });
//       if (curGroup.length) groups.push(curGroup);
//       setLineGroups(groups.map((g) => g.join(" ")));
//     };
//     const raf = requestAnimationFrame(measure);
//     const ro  = new ResizeObserver(measure);
//     const el  = measureRef.current;
//     if (el) ro.observe(el);
//     return () => { cancelAnimationFrame(raf); ro.disconnect(); };
//   }, [text]);

//   useEffect(() => {
//     if (lineGroups) requestAnimationFrame(() => setAnimReady(true));
//   }, [lineGroups]);

//   useEffect(() => {
//     if (!animReady || !linesRef.current || !iconRef.current || !wrapRef.current) return;

//     const { w: iconW, h: iconH } = iconSize;
//     const icon     = iconRef.current;
//     const wrapEl   = wrapRef.current;

//     const EASE_REVEAL = "cubic-bezier(0.16, 1, 0.3, 1)";
//     const EASE_MOVE   = "cubic-bezier(0.4,  0, 0.2, 1)";
//     const EASE_SWEEP  = "cubic-bezier(0.37, 0, 0.63, 1)";
//     const EASE_RETURN = "cubic-bezier(0.16, 1, 0.3, 1)";

//     const strokeEls = Array.from(
//       linesRef.current.querySelectorAll<HTMLElement>("[data-stroke]")
//     );
//     const textSpans = Array.from(
//       linesRef.current.querySelectorAll<HTMLElement>("[data-text]")
//     );
//     const fillEls = Array.from(
//       linesRef.current.querySelectorAll<HTMLElement>("[data-fill]")
//     );
//     if (!textSpans.length) return;

//     // Convert viewport rect → coords relative to wrapEl (position:relative parent)
//     const toLocal = (el: HTMLElement) => {
//       const r    = el.getBoundingClientRect();
//       const base = wrapEl.getBoundingClientRect();
//       return {
//         top:    r.top    - base.top    + wrapEl.scrollTop,
//         left:   r.left   - base.left   + wrapEl.scrollLeft,
//         right:  r.right  - base.left   + wrapEl.scrollLeft,
//         height: r.height,
//         width:  r.width,
//       };
//     };

//     const textRects   = textSpans.map(toLocal);
//     const strokeRects = strokeEls.map(toLocal);

//     // Stroke lines animate immediately
//     strokeEls.forEach((el) => {
//       el.style.transition = "none";
//       el.style.opacity    = "0";
//       el.style.transform  = "translateY(55%)";
//     });
//     strokeEls.forEach((el, i) => {
//       setTimeout(() => {
//         el.style.transition = `opacity ${strokeRevealDur}ms ${EASE_REVEAL}, transform ${strokeRevealDur}ms ${EASE_REVEAL}`;
//         el.style.opacity    = "1";
//         el.style.transform  = "translateY(0)";
//       }, delay + i * strokeStagger);
//     });

//     // Wait for navbar GSAP to finish
//     const navTimer = setTimeout(() => {
//       const navLogoEl = document.querySelector<HTMLElement>("[data-nav-logo]");
//       if (!navLogoEl) return;

//       // Strip residual GSAP inline transform before reading
//       const inlineTransform = navLogoEl.style.transform;
//       navLogoEl.style.transform = "none";
//       const navVpRect = navLogoEl.getBoundingClientRect();
//       navLogoEl.style.transform = inlineTransform;

//       // Nav logo position in local (wrap-relative) coords
//       const base   = wrapEl.getBoundingClientRect();
//       const navX   = navVpRect.left - base.left + wrapEl.scrollLeft;
//       const navY   = navVpRect.top  - base.top  + wrapEl.scrollTop + navVpRect.height / 2 - iconH / 2;

//       // Place icon at nav logo, hidden
//       Object.assign(icon.style, {
//         width:      `${iconW}px`,
//         height:     `${iconH}px`,
//         left:       `${navX}px`,
//         top:        `${navY}px`,
//         opacity:    "0",
//         transition: "none",
//         transform:  "none",
//       });

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           // Fade in at nav logo position
//           icon.style.transition = `opacity 120ms ease`;
//           icon.style.opacity    = "1";

//           const iconStartAt = delay + strokeStagger;
//           const tOffset     = Math.max(0, iconStartAt - navReadyDelay);
//           let t             = tOffset + 140;

//           textRects.forEach((rect, i) => {
//             const sRect       = strokeRects[i];
//             const lineStartX  = rect.left  - iconW * 0.3;
//             const lineY       = sRect.top  + sRect.height / 2 - iconH / 2;
//             const lineEndX    = rect.right - iconW;
//             const rightClipPx = Math.max(0, sRect.right - rect.right);

//             setTimeout(() => {
//               icon.style.transition = `left ${moveDur}ms ${EASE_MOVE}, top ${moveDur}ms ${EASE_MOVE}`;
//               icon.style.left = `${lineStartX}px`;
//               icon.style.top  = `${lineY}px`;
//             }, t);
//             t += moveDur + 20;

//             setTimeout(() => {
//               icon.style.transition = `left ${sweepDur}ms ${EASE_SWEEP}, top 0ms`;
//               icon.style.left = `${lineEndX}px`;
//               const fill = fillEls[i];
//               if (fill) {
//                 fill.style.transition = `clip-path ${sweepDur}ms ${EASE_SWEEP}`;
//                 fill.style.clipPath   = `inset(0 ${rightClipPx}px 0 0)`;
//               }
//             }, t);
//             t += sweepDur + 40;
//           });

//           // Return to nav logo — re-compute local coords at fly-back time
//           setTimeout(() => {
//             const finalVp   = navLogoEl.getBoundingClientRect();
//             const finalBase = wrapEl.getBoundingClientRect();
//             const finalX    = finalVp.left - finalBase.left + wrapEl.scrollLeft;
//             const finalY    = finalVp.top  - finalBase.top  + wrapEl.scrollTop + finalVp.height / 2 - iconH / 2;

//             icon.style.transition = [
//               `left ${returnDur}ms ${EASE_RETURN}`,
//               `top ${returnDur}ms ${EASE_RETURN}`,
//               `opacity 180ms ease ${returnDur - 180}ms`,
//             ].join(", ");
//             icon.style.left    = `${finalX}px`;
//             icon.style.top     = `${finalY}px`;
//             icon.style.opacity = "0";
//           }, t);
//         });
//       });
//     }, navReadyDelay);

//     return () => clearTimeout(navTimer);

//   }, [animReady, iconSize, delay, strokeRevealDur, strokeStagger, moveDur, sweepDur, returnDur, navReadyDelay]);

//   return (
//     <>
//       <style>{`
//         .trl-mask {
//           display: block;
//           overflow: hidden;
//           line-height: inherit;
//           padding-top: 0.17em;
//           margin-top: -0.35em;
//           padding-bottom: 0.09em;
//           margin-bottom: -0.09em;
//         }
//         .trl-stroke {
//           display: block;
//           color: transparent;
//           -webkit-text-stroke: 0.5px #FFFBFB;
//           position: relative;
//           line-height: inherit;
//           opacity: 0;
//           transform: translateY(55%);
//           will-change: opacity, transform;
//         }
//         .trl-text-inner { display: inline; }
//         .trl-fill {
//           position: absolute;
//           inset: 0;
//           display: block;
//           color: #FFFBFB;
//           line-height: inherit;
//           clip-path: inset(0 100% 0 0);
//         }
//         .trl-fill-inner { display: inline; }
//       `}</style>

//       {/* Hidden sizer for responsive icon dimensions */}
//       {mounted && (
//         <span
//           ref={sizeRef}
//           className={iconClassName}
//           aria-hidden="true"
//           style={{
//             position:      "fixed",
//             top:           -9999,
//             left:          -9999,
//             visibility:    "hidden",
//             pointerEvents: "none",
//             display:       "block",
//           }}
//         />
//       )}

//       {/* position:relative wrapper — icon is absolute inside this, so it scrolls with content */}
//       <div ref={wrapRef} style={{ position: "relative" }}>

//         {/* Measurement pass */}
//         {!lineGroups && (
//           <h1
//             ref={measureRef}
//             className={className}
//             aria-hidden="true"
//             style={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}
//           >
//             {words.map((w, i) => (
//               <span key={i} data-word={w} style={{ display: "inline" }}>
//                 {w}{i < words.length - 1 ? " " : ""}
//               </span>
//             ))}
//           </h1>
//         )}

//         {/* Animated h1 */}
//         {lineGroups && (
//           <h1 className={className} ref={linesRef}>
//             {lineGroups.map((line, i) => (
//               <span key={i} className="trl-mask">
//                 <span className="trl-stroke" data-stroke={i}>
//                   <span className="trl-text-inner" data-text={i}>{line}</span>
//                   <span className="trl-fill" data-fill={i}>
//                     <span className="trl-fill-inner">{line}</span>
//                   </span>
//                 </span>
//               </span>
//             ))}
//           </h1>
//         )}

//         {/* Flying icon — position:absolute so it scrolls with the page */}
//         {mounted && (
//           <span
//             ref={iconRef}
//             style={{
//               position:      "absolute",
//               top:           0,
//               left:          0,
//               width:         iconSize.w,
//               height:        iconSize.h,
//               zIndex:        50,
//               opacity:       0,
//               pointerEvents: "none",
//               willChange:    "left, top",
//             }}
//           >
//             <Image
//               src={iconSrc}
//               alt=""
//               width={iconSize.w}
//               height={iconSize.h}
//               style={{ width: "100%", height: "100%", objectFit: "contain" }}
//             />
//           </span>
//         )}
//       </div>
//     </>
//   );
// }






// 4
// "use client";
// import { useEffect, useRef, useState } from "react";

// interface TitleLogoRevealProps {
//   text?: string;
//   className?: string;
//   delay?: number;
//   strokeRevealDur?: number;
//   strokeStagger?: number;
//   moveDur?: number;
//   sweepDur?: number;
//   returnDur?: number;
//   navReadyDelay?: number;
//   /** Fraction of line height to offset icon below center. 0.3 = 30% of line height. Scales automatically across all screen sizes. */
//   iconOffsetY?: number;
// }

// export default function TitleLogoReveal({
//   text             = "",
//   className        = "",
//   delay            = 300,
//   strokeRevealDur  = 650,
//   strokeStagger    = 220,
//   moveDur          = 400,
//   sweepDur         = 860,
//   returnDur        = 650,
//   navReadyDelay    = 1050,
//   iconOffsetY      = 0.6,  // fraction of line height — 0.3 = 30% below center
// }: TitleLogoRevealProps) {
//   const wrapRef    = useRef<HTMLDivElement>(null);
//   const measureRef = useRef<HTMLHeadingElement>(null);
//   const linesRef   = useRef<HTMLHeadingElement>(null);

//   const [lineGroups, setLineGroups] = useState<string[] | null>(null);
//   const [animReady,  setAnimReady]  = useState(false);

//   const words = text.toUpperCase().split(/\s+/).filter(Boolean);

//   useEffect(() => {
//     const measure = () => {
//       if (!measureRef.current) return;
//       const spans = Array.from(
//         measureRef.current.querySelectorAll<HTMLElement>("[data-word]")
//       );
//       if (!spans.length) return;
//       const groups: string[][] = [];
//       let curTop: number | null = null;
//       let curGroup: string[]    = [];
//       spans.forEach((s) => {
//         const top = Math.round(s.getBoundingClientRect().top);
//         if (curTop === null || Math.abs(top - curTop) > 4) {
//           if (curGroup.length) groups.push(curGroup);
//           curGroup = [s.dataset.word ?? ""];
//           curTop   = top;
//         } else {
//           curGroup.push(s.dataset.word ?? "");
//         }
//       });
//       if (curGroup.length) groups.push(curGroup);
//       setLineGroups(groups.map((g) => g.join(" ")));
//     };
//     const raf = requestAnimationFrame(measure);
//     const ro  = new ResizeObserver(measure);
//     const el  = measureRef.current;
//     if (el) ro.observe(el);
//     return () => { cancelAnimationFrame(raf); ro.disconnect(); };
//   }, [text]);

//   useEffect(() => {
//     if (lineGroups) requestAnimationFrame(() => setAnimReady(true));
//   }, [lineGroups]);

//   useEffect(() => {
//     if (!animReady || !linesRef.current || !wrapRef.current) return;

//     const EASE_REVEAL = "cubic-bezier(0.16, 1, 0.3, 1)";
//     const EASE_MOVE   = "cubic-bezier(0.4,  0, 0.2, 1)";
//     const EASE_SWEEP  = "cubic-bezier(0.37, 0, 0.63, 1)";
//     const EASE_RETURN = "cubic-bezier(0.16, 1, 0.3, 1)";

//     const wrapEl    = wrapRef.current;
//     const strokeEls = Array.from(linesRef.current.querySelectorAll<HTMLElement>("[data-stroke]"));
//     const textSpans = Array.from(linesRef.current.querySelectorAll<HTMLElement>("[data-text]"));
//     const fillEls   = Array.from(linesRef.current.querySelectorAll<HTMLElement>("[data-fill]"));
//     if (!textSpans.length) return;

//     const toLocal = (el: HTMLElement) => {
//       const r    = el.getBoundingClientRect();
//       const base = wrapEl.getBoundingClientRect();
//       return {
//         top:    r.top    - base.top,
//         left:   r.left   - base.left,
//         right:  r.right  - base.left,
//         height: r.height,
//         width:  r.width,
//       };
//     };

//     strokeEls.forEach((el) => {
//       el.style.transition = "none";
//       el.style.opacity    = "0";
//       el.style.transform  = "translateY(55%)";
//     });
//     strokeEls.forEach((el, i) => {
//       setTimeout(() => {
//         el.style.transition = `opacity ${strokeRevealDur}ms ${EASE_REVEAL}, transform ${strokeRevealDur}ms ${EASE_REVEAL}`;
//         el.style.opacity    = "1";
//         el.style.transform  = "translateY(0)";
//       }, delay + i * strokeStagger);
//     });

//     const navTimer = setTimeout(() => {
//       const navLogoEl = document.querySelector<HTMLElement>("[data-nav-logo]");
//       if (!navLogoEl) return;
//       const logoImg = navLogoEl.querySelector<HTMLImageElement>("img");
//       if (!logoImg) return;

//       const logoVpRect = logoImg.getBoundingClientRect();
//       const logoW      = logoVpRect.width;
//       const logoH      = logoVpRect.height;
//       const wrapBase   = wrapEl.getBoundingClientRect();

//       const flyImg = document.createElement("img");
//       flyImg.src = logoImg.src;
//       flyImg.alt = "";
//       Object.assign(flyImg.style, {
//         position:      "absolute",
//         top:           `${logoVpRect.top - wrapBase.top}px`,
//         left:          `${logoVpRect.left - wrapBase.left}px`,
//         width:         `${logoW}px`,
//         height:        `${logoH}px`,
//         zIndex:        "2147483647",
//         pointerEvents: "none",
//         objectFit:     "contain",
//         transition:    "none",
//         transform:     "none",
//         opacity:       "1",
//       });
//       wrapEl.appendChild(flyImg);

//       logoImg.style.transition = "none";
//       logoImg.style.opacity    = "0";

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           const textRects   = textSpans.map(toLocal);
//           const strokeRects = strokeEls.map(toLocal);

//           const iconStartAt = delay + strokeStagger;
//           const tOffset     = Math.max(0, iconStartAt - navReadyDelay);
//           let t             = tOffset + 140;

//           textRects.forEach((rect, i) => {
//             const sRect = strokeRects[i];
//             // iconOffsetY is a fraction of line height (e.g. 0.3 = 30% of line height down from center)
//             // This scales naturally: small text on mobile → small offset, large text on 2xl → large offset
//             const lineY = sRect.top + sRect.height / 2 - logoH / 2 + sRect.height * iconOffsetY;
//             const lineStartX  = rect.left;
//             const lineEndX    = rect.right - logoW;
//             const rightClipPx = Math.max(0, sRect.right - rect.right);

//             setTimeout(() => {
//               flyImg.style.transition = `left ${moveDur}ms ${EASE_MOVE}, top ${moveDur}ms ${EASE_MOVE}`;
//               flyImg.style.left = `${lineStartX}px`;
//               flyImg.style.top  = `${lineY}px`;
//             }, t);
//             t += moveDur + 20;

//             setTimeout(() => {
//               flyImg.style.transition = `left ${sweepDur}ms ${EASE_SWEEP}`;
//               flyImg.style.left = `${lineEndX}px`;
//               const fill = fillEls[i];
//               if (fill) {
//                 fill.style.transition = `clip-path ${sweepDur}ms ${EASE_SWEEP}`;
//                 fill.style.clipPath   = `inset(0 ${rightClipPx}px 0 0)`;
//               }
//             }, t);
//             t += sweepDur + 40;
//           });

//           // Return — switch to fixed coords for pixel-perfect nav alignment
//           setTimeout(() => {
//             const flyRect = flyImg.getBoundingClientRect();
//             const navRect = logoImg.getBoundingClientRect();

//             // Switch absolute → fixed at current visual position (no jump)
//             Object.assign(flyImg.style, {
//               position:   "fixed",
//               transition: "none",
//               top:        `${flyRect.top}px`,
//               left:       `${flyRect.left}px`,
//             });

//             requestAnimationFrame(() => {
//               // Fly to nav logo
//               flyImg.style.transition = `left ${returnDur}ms ${EASE_RETURN}, top ${returnDur}ms ${EASE_RETURN}`;
//               flyImg.style.left = `${navRect.left}px`;
//               flyImg.style.top  = `${navRect.top}px`;

//               // When animation ends: show real logo instantly, remove fly clone
//               // No opacity transition — just a hard swap at arrival
//               setTimeout(() => {
//                 logoImg.style.transition = "none";
//                 logoImg.style.opacity    = "1";
//                 flyImg.remove();
//               }, returnDur);
//             });
//           }, t);
//         });
//       });
//     }, navReadyDelay);

//     return () => clearTimeout(navTimer);
//   }, [animReady, delay, strokeRevealDur, strokeStagger, moveDur, sweepDur, returnDur, navReadyDelay, iconOffsetY]);

//   return (
//     <>
//       <style>{`
//         .trl-mask {
//           display: block;
//           overflow: hidden;
//           line-height: inherit;
//           padding-top: 0.17em;
//           margin-top: -0.35em;
//           padding-bottom: 0.09em;
//           margin-bottom: -0.09em;
//         }
//         .trl-stroke {
//           display: block;
//           color: transparent;
//           -webkit-text-stroke: 0.5px #FFFBFB;
//           position: relative;
//           line-height: inherit;
//           opacity: 0;
//           transform: translateY(55%);
//           will-change: opacity, transform;
//         }
//         .trl-text-inner { display: inline; }
//         .trl-fill {
//           position: absolute;
//           inset: 0;
//           display: block;
//           color: #FFFBFB;
//           line-height: inherit;
//           clip-path: inset(0 100% 0 0);
//         }
//         .trl-fill-inner { display: inline; }
//       `}</style>

//       <div ref={wrapRef} style={{ position: "relative" }}>
//         {!lineGroups && (
//           <h1
//             ref={measureRef}
//             className={className}
//             aria-hidden="true"
//             style={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}
//           >
//             {words.map((w, i) => (
//               <span key={i} data-word={w} style={{ display: "inline" }}>
//                 {w}{i < words.length - 1 ? " " : ""}
//               </span>
//             ))}
//           </h1>
//         )}

//         {lineGroups && (
//           <h1 className={className} ref={linesRef}>
//             {lineGroups.map((line, i) => (
//               <span key={i} className="trl-mask">
//                 <span className="trl-stroke" data-stroke={i}>
//                   <span className="trl-text-inner" data-text={i}>{line}</span>
//                   <span className="trl-fill" data-fill={i}>
//                     <span className="trl-fill-inner">{line}</span>
//                   </span>
//                 </span>
//               </span>
//             ))}
//           </h1>
//         )}
//       </div>
//     </>
//   );
// }
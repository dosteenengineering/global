"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export interface Hotspot {
  id: string;
  title: string;
  href?: string;
  marker: {
    x: number;
    y: number;
  };
  label: {
    x: number;
    y: number;
  };
  side: "left" | "right";
}

interface ImageHotspotsProps {
  image: string;
  hotspots: Hotspot[];
  alt?: string;
  editMode?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}

type DragTarget = {
  id: string;
  target: "marker" | "label";
};

const LABEL_DOT_GAP_PERCENT = 1.8;

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

const getPercentPosition = (event: PointerEvent | ReactPointerEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  return {
    x: clampPercent(((event.clientX - rect.left) / rect.width) * 100),
    y: clampPercent(((event.clientY - rect.top) / rect.height) * 100),
  };
};

const getLabelDotPosition = (hotspot: Hotspot) => ({
  x: clampPercent(hotspot.side === "right" ? hotspot.label.x - LABEL_DOT_GAP_PERCENT : hotspot.label.x + LABEL_DOT_GAP_PERCENT),
  y: hotspot.label.y,
});

const getElbowX = (hotspot: Hotspot, labelDotX: number) => {
  const distance = Math.abs(labelDotX - hotspot.marker.x);
  const offset = Math.min(14, Math.max(4, distance * 0.35));

  return hotspot.side === "right"
    ? labelDotX - offset
    : labelDotX + offset;
};

export default function ImageHotspots({
  image,
  hotspots,
  alt = "",
  editMode = false,
  className = "",
  imageClassName = "object-contain",
  sizes = "(max-width: 1024px) 100vw, 70vw",
}: ImageHotspotsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Hotspot[]>(hotspots);
  const [dragTarget, setDragTarget] = useState<DragTarget | null>(null);

  const editorEnabled = useMemo(() => {
    return process.env.NODE_ENV === "development" && (editMode || process.env.NEXT_PUBLIC_HOTSPOT_EDITOR === "true");
  }, [editMode]);

  useEffect(() => {
    setItems(hotspots);
  }, [hotspots]);

  useEffect(() => {
    if (!editorEnabled) return;
    console.log(JSON.stringify(items, null, 2));
  }, [editorEnabled, items]);

  useEffect(() => {
    if (!editorEnabled || !dragTarget) return;

    const handlePointerMove = (event: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const position = getPercentPosition(event, container);

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === dragTarget.id
            ? {
                ...item,
                [dragTarget.target]: position,
              }
            : item
        )
      );
    };

    const handlePointerUp = () => setDragTarget(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragTarget, editorEnabled]);

  const handleAddHotspot = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!editorEnabled) return;

    const position = getPercentPosition(event, event.currentTarget);
    const side: Hotspot["side"] = position.x > 50 ? "right" : "left";
    const labelX = side === "right" ? clampPercent(position.x + 18) : clampPercent(position.x - 18);

    setItems((currentItems) => [
      ...currentItems,
      {
        id: `hotspot-${Date.now()}`,
        title: `Hotspot ${currentItems.length + 1}`,
        marker: position,
        label: {
          x: labelX,
          y: position.y,
        },
        side,
      },
    ]);
  };

  const handleCopyJson = async () => {
    const json = JSON.stringify(items, null, 2);

    try {
      await navigator.clipboard.writeText(json);
    } catch {
      console.log(json);
    }
  };

  return (
    <div className={`relative h-full w-full overflow-visible ${className}`}>
      <div
        ref={containerRef}
        className={`relative h-full w-full overflow-visible ${editorEnabled ? "cursor-crosshair" : ""}`}
        onPointerDown={handleAddHotspot}
      >
        <Image src={image} alt={alt} fill sizes={sizes} className={imageClassName} />

        <svg className="absolute inset-0 z-10 h-full w-full overflow-visible pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {items.map((hotspot) => {
            const labelDot = getLabelDotPosition(hotspot);

            return (
              <polyline
                key={hotspot.id}
                points={`${hotspot.marker.x},${hotspot.marker.y} ${getElbowX(hotspot, labelDot.x)},${labelDot.y} ${labelDot.x},${labelDot.y}`}
                fill="none"
                stroke="#4c4c4c"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </svg>

        {items.map((hotspot) => {
          const labelDot = getLabelDotPosition(hotspot);
          const labelClassName = `absolute z-20 flex min-h-[24px] min-w-[96px] items-center justify-center rounded-full cursor-pointer  border
                 border-[#1d2764]/70 bg-gradient-to-r from-[rgba(41,69,150,0.2)] to-[rgba(41,69,150,0.05)] hover:bg-[#294596] hover:text-white transition-all duration-300 px-4 py-[10px] text-center text-15 font-light
                  leading-[1] tracking-[-0.02em] text-[#25293a] shadow-[0_8px_18px_rgba(29,39,100,0.08)] backdrop-blur-sm ${hotspot.side === "left" ? "-translate-x-full" : ""} -translate-y-1/2 ${editorEnabled ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`;
          const labelStyle = { left: `${hotspot.label.x}%`, top: `${hotspot.label.y}%` };

          return (
          <div key={hotspot.id}>
            <button
              type="button"
              aria-label={hotspot.title}
              className={`absolute z-30 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#294596] shadow-[0_0_0_3px_rgba(30,87,255,0.16)] ${editorEnabled ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
              style={{ left: `${hotspot.marker.x}%`, top: `${hotspot.marker.y}%` }}
              onPointerDown={(event) => {
                if (!editorEnabled) return;
                event.stopPropagation();
                setDragTarget({ id: hotspot.id, target: "marker" });
              }}
            />

            <span
              className="pointer-events-none absolute z-30 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#294596]"
              style={{ left: `${labelDot.x}%`, top: `${labelDot.y}%` }}
              aria-hidden="true"
            />

            {hotspot.href && !editorEnabled ? (
              <Link href={hotspot.href} className={labelClassName} style={labelStyle}>
                {hotspot.title}
              </Link>
            ) : (
              <button
                type="button"
                className={labelClassName}
                style={labelStyle}
                onPointerDown={(event) => {
                  if (!editorEnabled) return;
                  event.stopPropagation();
                  setDragTarget({ id: hotspot.id, target: "label" });
                }}
              >
                {hotspot.title}
              </button>
            )}
          </div>
          );
        })}
      </div>

      {editorEnabled && (
        <button
          type="button"
          onClick={handleCopyJson}
          className="absolute right-3 top-3 z-40 rounded-full bg-[#1d2764] px-4 py-2 text-xs font-medium text-white shadow-lg"
        >
          Copy JSON
        </button>
      )}
    </div>
  );
}

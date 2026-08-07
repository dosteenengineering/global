"use client";

import { useRef } from "react";

interface ReferenceCountry {
  _id: string;
  title: string;
  xValue: number;
  yValue: number;
}

interface CountryMapPickerProps {
  xValue: string;
  yValue: string;
  onPick: (x: string, y: string) => void;
  existingCountries?: ReferenceCountry[];
  excludeId?: string;
}

export default function CountryMapPicker({
  xValue,
  yValue,
  onPick,
  existingCountries = [],
  excludeId,
}: CountryMapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2);
    onPick(x, y);
  };

  return (
    <div
      ref={mapRef}
      onClick={handleClick}
      className="relative w-full aspect-[1109.98/537] cursor-crosshair border border-black/10 rounded-md overflow-hidden bg-[#f5f5f5]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/about/map-section/map.svg"
        alt="world map"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {existingCountries
        .filter((c) => c._id !== excludeId)
        .map((c) => (
          <div
            key={c._id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none group"
            style={{ left: `${c.xValue}%`, top: `${c.yValue}%` }}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-black/30 ring-2 ring-white" />
          </div>
        ))}

      {xValue && yValue && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{ left: `${xValue}%`, top: `${yValue}%` }}
        >
          <div className="h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white shadow-lg" />
        </div>
      )}
    </div>
  );
}

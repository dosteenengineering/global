"use client";

import Image from "next/image";
import { useState } from "react";

type IconPosition = "left" | "right" | "top" | "bottom";

interface NavButtonProps {
  onClick: () => void;
  direction?: "left" | "right" | "up" | "down";
  iconPosition?: IconPosition;
  borderColor?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const directionRotation = {
  right: "rotate-0",
  down:  "rotate-90",
  left:  "rotate-180",
  up:    "-rotate-90",
};

// Fill slides in from the side the arrow points toward
const fillPosition: Record<string, { base: string; hidden: string; visible: string }> = {
  right: { base: "top-0 left-0 h-full",  hidden: "w-0",      visible: "w-full" },
  left:  { base: "top-0 right-0 h-full", hidden: "w-0",      visible: "w-full" },
  down:  { base: "top-0 left-0 w-full",  hidden: "h-0",      visible: "h-full" },
  up:    { base: "bottom-0 left-0 w-full", hidden: "h-0",    visible: "h-full" },
};

export default function NavButton({
  onClick,
  direction    = "right",
  iconPosition = "left",
  borderColor  = "#161616",
  disabled     = false,
  className    = "",
  ariaLabel,
}: NavButtonProps) {
  const [hovered, setHovered] = useState(false);

  const flexDirection: Record<IconPosition, string> = {
    left:   "flex-row",
    right:  "flex-row-reverse",
    top:    "flex-col",
    bottom: "flex-col-reverse",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{ borderColor }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative overflow-hidden
        flex items-center justify-center group
        ${flexDirection[iconPosition]}
        md:w-[46px] md:h-[46px] w-[40px] h-[40px] rounded-full border
        transition-colors duration-300
        ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {!disabled && (
        <span
          aria-hidden="true"
          className={`absolute rounded-full bg-secondary ${fillPosition[direction].base} ${hovered ? fillPosition[direction].visible : fillPosition[direction].hidden} transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        />
      )}

      <Image
        src="/assets/icons/arrow-right-primary.svg"
        alt={direction}
        width={17}
        height={17}
        className={`relative z-10 transition-all duration-300 md:w-[17px] md:h-[17px] w-[14px] h-[14px] pointer-events-none ${hovered ? "invert brightness-0" : ""} ${directionRotation[direction]}`}
      />
    </button>
  );
}
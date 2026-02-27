"use client";

import Image from "next/image";

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
  down: "rotate-90",
  left: "rotate-180",
  up: "-rotate-90",
};

export default function NavButton({
  onClick,
  direction = "right",
  iconPosition = "left",
  borderColor = "#161616",
  disabled = false,
  className = "",
  ariaLabel,
}: NavButtonProps) {
  const flexDirection: Record<IconPosition, string> = {
    left: "flex-row",
    right: "flex-row-reverse",
    top: "flex-col",
    bottom: "flex-col-reverse",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{ borderColor }}
      className={`
        flex items-center justify-center
        ${flexDirection[iconPosition]}
        w-[46px] h-[46px] rounded-full border
        transition-all duration-300
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-black/5 cursor-pointer"}
        ${className}
      `}
    >
      <Image
        src="/assets/icons/arrow-right-primary.svg"
        alt={direction}
        width={17}
        height={17}
        className={`transition-transform duration-300 ${directionRotation[direction]}`}
      />
    </button>
  );
}
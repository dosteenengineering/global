"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type BorderButtonProps = {
  text: string;
  href?: string;
  borderColor?: "white" | "black";
  textColor?: "white" | "black";
  iconColor?: "primary" | "white";
  hoverBg?: "white" | "black";
  px?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function BorderButton({
  text,
  href,
  borderColor = "white",
  textColor   = "white",
  iconColor   = "primary",
  hoverBg,
  px          = "px-6",
  className   = "",
  type,
  onClick,
}: BorderButtonProps) {
  const [hovered, setHovered] = useState(false);

  const borderClass = borderColor === "white" ? "border-white" : "border-[#454545]";
  const textClass   = textColor === "white" ? "text-white" : "text-secondary";
  const iconClass   = iconColor === "white" ? "invert brightness-0" : "";

  const fillBg =
    hoverBg === "white" ? "bg-white" :
    hoverBg === "black" ? "bg-[#161616]" : "";

  const sharedClass = `group relative overflow-hidden h-[40px] md:h-auto 2xl:h-[61px] flex items-center justify-center gap-3 border rounded-[50px] ${px} md:py-[17.5px] py-[14px] uppercase text-[14px] md:text-15 leading-[1.73] font-[400] cursor-pointer active:scale-95 transition-all duration-300 ${borderClass} ${textClass} ${className}`;

  const arrowSrc =
    hoverBg === "white" && hovered
      ? "/assets/icons/button-arrow-top-right-black.svg"
      : "/assets/icons/button-arrow-top-right.svg";

  const imgClass =
    hoverBg === "white" && hovered ? "" :
    hoverBg === "black" && hovered ? "invert brightness-0" :
    iconClass;

  // Text color flips when hovered (for white/black hoverBg)
  const textHoverClass =
    hoverBg === "white" && hovered ? "text-[#161616]" :
    hoverBg === "black" && hovered ? "text-white" :
    "";

  const content = (
    <>
      {/* Animated fill — slides in from left on hover */}
      {hoverBg && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${fillBg} rounded-[50px] origin-left transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${hovered ? "scale-x-100" : "scale-x-0"}`}
        />
      )}

      <span className={`relative z-10 text-[14px] md:text-15 leading-[1] max-w-[200px] font-dm-sans transition-colors duration-300 ${textHoverClass}`}>
        {text}
      </span>
      <Image
        src={arrowSrc}
        alt="arrow"
        width={18}
        height={18}
        className={`relative z-10 ${imgClass} transition-all duration-300 group-hover:rotate-45 w-[18px] h-[18px] sm:w-[18px] sm:h-[18px] pointer-events-none`}
      />
    </>
  );

  const events = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (type || onClick) {
    return (
      <button type={type ?? "button"} onClick={onClick} className={sharedClass} {...events}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href ?? "#"} className={sharedClass} {...events}>
      {content}
    </Link>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";

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
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

export default function BorderButton({
  text,
  href,
  borderColor = "white",
  textColor = "white",
  iconColor = "primary",
  hoverBg,
  px = "px-6",
  className = "",
  type,
  onClick,
  icon,
  iconPosition = "right",
}: BorderButtonProps) {
  const [hovered, setHovered] = useState(false);

  const borderClass = borderColor === "white" ? "border-white" : "border-[#454545]";
  const textClass = textColor === "white" ? "text-white" : "text-secondary";
  const iconClass = iconColor === "white" ? "invert brightness-0" : "";

  const fillBg =
    hoverBg === "white" ? "bg-white" :
      hoverBg === "black" ? "bg-[#161616]" : "";

  const sharedClass = `
    group relative overflow-hidden flex items-center justify-center gap-3
    border rounded-[50px] ${px} md:py-[18px] py-[8px]
    uppercase text-[14px] md:text-15 leading-[1.73] font-[400]
    cursor-pointer active:scale-95 transition-all duration-300
    touch-action-manipulation [-webkit-tap-highlight-color:transparent]
    select-none
    ${borderClass} ${textClass} ${className}
  `;

  const arrowSrc =
    hoverBg === "white" && hovered
      ? "/assets/icons/button-arrow-top-right-black.svg"
      : "/assets/icons/button-arrow-top-right.svg";

  const imgClass =
    hoverBg === "white" && hovered ? "" :
      hoverBg === "black" && hovered ? "invert brightness-0" :
        iconClass;

  const textHoverClass =
    hoverBg === "white" && hovered ? "!text-[#161616]" :
      hoverBg === "black" && hovered ? "!text-white" : "";

  const renderedIcon = icon ? (
    <span className={`relative z-10 text-primary transition-colors duration-300 ${textHoverClass}`}>
      {icon}
    </span>
  ) : (
    <Image
      src={arrowSrc} alt="" aria-hidden="true"
      width={18} height={18}
      className={`relative ${imgClass} transition-all duration-300 group-hover:rotate-45 w-[18px] h-[18px] sm:w-[16px] sm:h-[16px] pointer-events-none`}
    />
  );

  const content = (
    <>
      {hoverBg && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${fillBg} rounded-[50px] origin-left transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${hovered ? "scale-x-100" : "scale-x-0"}`}
        />
      )}
      {iconPosition === "left" && renderedIcon}
      <span className={`relative text-[14px] md:text-15 leading-[1] py-[4px] transition-colors duration-300 ${textHoverClass}`}>
        {text}
      </span>
      {iconPosition === "right" && renderedIcon}
    </>
  );

  // ✅ Use pointer events instead of mouse events
  const events = {
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
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
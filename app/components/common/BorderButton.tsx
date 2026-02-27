"use client";

import Image from "next/image";

type BorderButtonProps = {
  text: string;
  borderColor?: "white" | "black";
  textColor?: "white" | "black";
  iconColor?: "primary" | "white";
  px?: string;
  className?: string;
};

export default function BorderButton({
  text,
  borderColor = "white",
  textColor = "white",
  iconColor = "primary",
  px = "px-6",
  className = "",
}: BorderButtonProps) {

  const borderClass =
    borderColor === "white" ? "border-white" : "border-black";

  const textClass =
    textColor === "white" ? "text-white" : "text-black";

  const iconClass =
    iconColor === "white"
      ? "invert brightness-0"
      : "";

  return (
    <button
      className={`group h-[61px] flex items-center justify-center gap-3 border rounded-[50px] ${px} py-[17.5px] uppercase text-15 leading-[1.73] font-[400] transition-all duration-300 hover:bg-white/20 cursor-pointer ${borderClass} ${textClass} ${className}`}
    >
      <span className="text-15 leading-[1] max-w-[200px] font-dm-sans">
        {text}
      </span>

      <Image
        src="/assets/icons/button-arrow-top-right.svg"
        alt="arrow"
        width={18}
        height={18}
        className={`${iconClass} transition-all duration-300 group-hover:rotate-45`}
      />
    </button>
  );
}

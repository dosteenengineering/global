"use client";

import Image from "next/image";
import Link from "next/link";

type BorderButtonProps = {
    text: string;
    href?: string;
    borderColor?: "white" | "black";
    textColor?: "white" | "black";
    iconColor?: "primary" | "white";
    px?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
};

export default function BorderButton({
    text,
    href,
    borderColor = "white",
    textColor = "white",
    iconColor = "primary",
    px = "px-6",
    className = "",
    type,
    onClick,
}: BorderButtonProps) {
    const borderClass = borderColor === "white" ? "border-white" : "border-[#454545]";
    const textClass = textColor === "white" ? "text-white" : "text-secondary";
    const iconClass = iconColor === "white" ? "invert brightness-0" : "";

    const sharedClass = `group 2xl:h-[61px] flex items-center justify-center gap-3 border rounded-[50px] ${px} py-[17.5px] uppercase text-15 leading-[1.73] font-[400] transition-all duration-300 hover:bg-white/20 cursor-pointer ${borderClass} ${textClass} ${className}`;

    const content = (
        <>
            <span className="text-15 leading-[1] max-w-[200px] font-dm-sans">{text}</span>
            <Image
                src="/assets/icons/button-arrow-top-right.svg"
                alt="arrow"
                width={18}
                height={18}
                className={`${iconClass} transition-all duration-300 group-hover:rotate-45`}
            />
        </>
    );

    if (type || onClick) {
        return (
            <button type={type ?? "button"} onClick={onClick} className={sharedClass}>
                {content}
            </button>
        );
    }

    return (
        <Link href={href ?? "#"} className={sharedClass}>
            {content}
        </Link>
    );
}
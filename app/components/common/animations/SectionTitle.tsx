"use client";

interface SectionTitleProps {
  text?: string;
  title?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
}

export default function SectionTitle({
  text,
  title,
  className = "",
  as: Tag = "h2",
  delay,
}: SectionTitleProps) {
  void delay;

  return <Tag className={className}>{text ?? title ?? ""}</Tag>;
}

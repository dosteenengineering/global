import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  error?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full group cursor-pointer"
      onClick={() => setOpen((o) => !o)}
    >
      {/* Label — always fixed */}
      <span className="block text-description text-paragraph mb-[33px]">
        {label}
      </span>

      {/* Arrow — absolute, aligned to label baseline (top-0, h matches label line-height) */}
      <div className="absolute top-0 right-0 flex items-center">
        <Image
          src="/assets/icons/arrow-down-tip-gray.svg"
          alt="open dropdown"
          width={17}
          height={17}
          className={`transition-transform duration-300 h-[17px] w-[17px] ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Selected value — absolute, 1px below label */}
      <span className="absolute left-0 bottom-0 text-15 leading-[2.133] text-paragraph">
        {value}
      </span>

      {/* Bottom border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-[#c2c2c2]
        group-focus-within:bg-secondary transition-colors duration-300
        ${error ? "bg-red-400" : ""}`}
      />

      {open && (
        <ul className="absolute top-full left-0 right-0 z-50 bg-white border border-[#E0E0E0] shadow-md mt-1 rounded-sm">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-4 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors
                ${opt === value ? "font-semibold text-[#1A1A1A]" : "text-[#444]"}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="absolute -bottom-5 left-0 text-[12px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

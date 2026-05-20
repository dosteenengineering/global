"use client";

import {
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PartnerFormValues } from "./types";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface Props {
  options: string[];
  name: keyof PartnerFormValues;
  label: string;
  register: UseFormRegister<PartnerFormValues>;
  watch: UseFormWatch<PartnerFormValues>;
  errors: FieldErrors<PartnerFormValues>;
  required?: boolean;
  className?: string;
}

export const SelectInput = ({
  name,
  label,
  register,
  watch,
  errors,
  required = false,
  className = "",
  options,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const triggerRef = useRef<HTMLDivElement>(null);
  const [openUp, setOpenUp] = useState(false);

  // RHF value (persists between multi-step navigation)
  const watchedValue = watch(name);

  const selected =
    typeof watchedValue === "string"
      ? watchedValue
      : "";

  const error = errors[name]?.message;

  const registerField = register(
    name,
    required ? { required: "Required" } : undefined
  );

  const filtered = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  // Detect whether dropdown should open up/down
  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = 300;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setOpenUp(
      spaceBelow < dropdownHeight &&
      spaceAbove > spaceBelow
    );
  }, [open]);

  return (
    <label className={`block relative ${className}`}>
      {/* Label + Arrow */}
      <div className="flex justify-between">
        <span className="block text-15 leading-[1.5] text-paragraph">
          {label}
        </span>

        <img
          src="/assets/icons/drop-down-icon.svg"
          alt=""
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </div>

      {/* Trigger */}
      <div ref={triggerRef} className="relative mt-20">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="flex h-8 w-full items-center justify-between border-b border-[#CFCFCF] text-16 text-secondary"
        >
          <span className={selected ? "" : "text-secondary/40"}>
            {selected || `Select ${label}`}
          </span>
        </button>

        {/* RHF hidden input */}
        <input
          type="hidden"
          {...registerField}
          value={selected}
        />

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                clipPath: openUp
                  ? "inset(100% 0% 0% 0% round 16px)"
                  : "inset(0% 0% 100% 0% round 16px)",
              }}
              animate={{
                opacity: 1,
                clipPath:
                  "inset(0% 0% 0% 0% round 16px)",
              }}
              exit={{
                opacity: 0,
                clipPath: openUp
                  ? "inset(100% 0% 0% 0% round 16px)"
                  : "inset(0% 0% 100% 0% round 16px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                opacity: { duration: 0.3 },
              }}
              className={`absolute left-0 z-50 w-full overflow-hidden rounded-2xl border border-black/10 bg-white/50 backdrop-blur-md shadow-lg ${openUp
                  ? "bottom-[calc(100%+52px)]"
                  : "top-[calc(100%+8px)]"
                }`}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Search */}
              <div className="border-b border-black/5 px-4 py-3">
                <input
                  type="text"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-transparent p-0 text-[14px] text-secondary outline-none placeholder:text-secondary/40"
                />
              </div>

              {/* List */}
              <div
                data-lenis-prevent
                className="max-h-[220px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {filtered.length === 0 && (
                  <p className="px-5 py-3 text-[14px] text-secondary/40">
                    No results
                  </p>
                )}

                {filtered.map((option, i) => (
                  <div key={option}>
                    {i !== 0 && (
                      <div className="h-px w-full bg-black/5" />
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        registerField.onChange({
                          target: {
                            name,
                            value: option,
                          },
                        });

                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full px-5 py-3 text-left text-[14px] transition-colors duration-150 ${selected === option
                          ? "font-medium text-primary"
                          : "text-secondary hover:bg-black/5"
                        }`}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <span className="mt-2 block text-12 text-red-500">
          {String(error)}
        </span>
      )}
    </label>
  );
};

export default SelectInput;
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const spring = { type: "spring", stiffness: 220, damping: 30 } as const;

const AccordionItemComponent = ({
  item,
  isOpen,
  onToggle,
  isFirst,
}: AccordionItemProps) => {
  return (
    <div
      className={`border-b border-[#c2c2c2] ${isFirst ? "border-t border-[#c2c2c2]" : ""} `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        className={`flex w-full items-center cursor-pointer justify-between gap-4 text-left transition-all duration-300 ${isOpen ? "pt-50 3xl:pt-60 pb-30 pl-50" : "py-40 3xl:py-50"}`}
      >
        <span
          className={`text-30 leading-[1.33] font-light tracking-[-0.02em] max-w-[90%] 3xl:max-w-none ${isOpen ? "text-secondary" : "text-paragraph"}`}
        >
          {item.question}
        </span>

        <span className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <motion.path
              d="M12 0L12 24"
              stroke="#294596"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ scaleY: isOpen ? 0 : 1 }}
              transition={spring}
              style={{ transformOrigin: "center" }}
            />
            <path
              d="M24 12L0 12"
              stroke="#294596"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-body-${item.id}`}
            role="region"
            aria-labelledby={`accordion-trigger-${item.id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: spring, opacity: { duration: 0.25 } }}
            style={{ overflow: "hidden" }}
          >
            <p className={`text-description max-w-[86%] 3xl:max-w-[1203px] mb-60 ${isOpen ? "pl-50" : ""}`}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Accordion({
  items,
  allowMultiple = false,
}: AccordionProps) {
const [openIds, setOpenIds] = useState<Set<string | number>>(
  new Set([items[1]?.id])
);

  const toggle = (id: string | number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

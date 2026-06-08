"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

interface AccordionItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  staggerItems?: boolean;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
  delay?: number;
}

const spring = { type: "spring", stiffness: 220, damping: 30 } as const;

const AccordionItemComponent = ({
  item,
  isOpen,
  onToggle,
  isFirst,
  delay,
}: AccordionItemProps) => {
  const Wrapper = delay !== undefined ? motion.div : "div";

  return (
    <Wrapper
      {...(delay !== undefined
        ? {
            variants: moveUp(delay),
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, amount: 0.3 },
          }
        : {})}
      className={`border-b border-[#c2c2c2] ${isFirst ? "border-t border-[#c2c2c2]" : ""} `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        className={`flex w-full items-center cursor-pointer justify-between gap-4 text-left transition-all duration-300 ${isOpen ? "pt-5 lg:pt-50 3xl:pt-60 pb-2.5 md:pb-30 lg:pl-50" : "py-5 lg:py-40 3xl:pt-50 3xl:pb-[45px]"}`}
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
            className="w-5 h-5 lg:w-[24px] lg:h-[24px]"
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
            <p className={`text-description !text-paragraph max-w-[107ch] 3xl:max-w-[1203px] mb-5 md:mb-60 ${isOpen ? "lg:pl-50" : ""}`}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default function Accordion({
  items,
  allowMultiple = false,
  staggerItems = false,
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
          delay={staggerItems ? index * 0.12 : undefined}
        />
      ))}
    </div>
  );
}

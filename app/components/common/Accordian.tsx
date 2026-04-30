"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface AccordionItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open at once. Default: false */
  allowMultiple?: boolean;
}

// ── Icons ──────────────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="2"  y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// ── Single item ────────────────────────────────────────────────────────────
interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const AccordionItemComponent = ({
  item,
  isOpen,
  onToggle,
  isFirst,
  isLast,
}: AccordionItemProps) => {
  return (
    /*
     * Border logic:
     *   – Always draw a top border on the FIRST item.
     *   – Always draw a bottom border on every item.
     *   – Because a bottom border on item N and a top border on item N+1
     *     would double-up, we only add a top border on the very first item.
     *   Result: single line at the top of the list, single line between
     *   every pair, single line at the bottom — no doubles anywhere.
     */
    <div
      className={[
        "border-b border-gray-200",
        isFirst ? "border-t border-gray-200" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Trigger row */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        className={[
          "flex w-full items-center justify-between gap-4 text-left",
          "transition-colors duration-200",
          isOpen ? "py-[60px]" : "py-[50px]",
        ].join(" ")}
      >
        {/* Question — same line as icon, always */}
        <span
          className={[
            "text-base font-medium leading-snug tracking-[-0.01em]",
            isOpen ? "text-gray-900" : "text-gray-700",
          ].join(" ")}
        >
          {item.question}
        </span>

        {/* Icon: primary colour when closed, neutral when open */}
        <span
          className={[
            "transition-colors duration-200",
            isOpen ? "text-gray-500" : "text-[#2563EB]", // ← your primary colour
          ].join(" ")}
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      {/* Answer panel — animated with grid trick (no fixed max-height needed) */}
      <div
        id={`accordion-body-${item.id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${item.id}`}
        className={[
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          {/* gap-30 between question and answer = mt-[30px] on the inner div */}
          <p className="mt-[30px] pb-[60px] text-sm leading-relaxed text-gray-500">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Accordion ──────────────────────────────────────────────────────────────
export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string | number>>(new Set());

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
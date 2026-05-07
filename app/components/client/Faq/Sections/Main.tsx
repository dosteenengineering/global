"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { faqData } from "../data";
import Accordion from "@/app/components/common/Accordian";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import FaqCta from "./FaqCta";
import Pagination from "@/app/components/common/Pagination";

const ITEMS_PER_PAGE = 7;

export default function FaqSection() {
  const { title, items } = faqData;
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [search, items]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleSearch = (value: string) => {
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="pt-120 pb-140 3xl:pb-200 relative min-h-[2000px]">
      <div
        className={`absolute ${filtered.length > 0 ? "top-[33.5%]" : "top-[17.8%]"} bottom-0 left-[-8.3%] w-full max-w-[550px] 3xl:max-w-[793px] max-h-[1203px] z-0 pointer-events-none`}
      >
        <Image
          src="/assets/icons/faq-question.svg"
          alt="faq-question"
          fill
          className="object-contain object-top-left"
        />
      </div>

      <div className="container pl-[15.6%] z-20 relative">
        <div>
          <SectionTitle
            title={title}
            className={`section-heading ${filtered.length > 0 ? "mb-30" : "mb-140 3xl:mb-150"} max-w-[20ch]`}
          />
          {filtered.length > 0 && (
            <div className="mb-140 3xl:mb-150">
              <FaqCta />
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-20 mb-60">
          <div className="flex items-center gap-30 3xl:gap-[36px]">
            <span className="text-secondary text-55 leading-[1.1818] font-light tracking-[-0.02em]">
              All Questions
            </span>
            <span className="text-primary text-55 leading-[1.1818] font-light tracking-[-0.02em]">
              {items.length}
            </span>
          </div>
          <div className="flex items-center gap-80">
            <div className="flex items-center justify-between border border-[#c2c2c2] rounded-full h-[50px] min-w-[280px] 3xl:w-[330px] px-[17px]">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="text-15 text-secondary outline-none placeholder:text-paragraph w-[170px] 3xl:w-[200px]"
              />
              <Image
                src="/assets/icons/search-primary.png"
                alt="search"
                width={96}
                height={96}
                className="w-[24px] h-[24px]"
              />
            </div>
            <button className="flex items-center gap-4">
              <span className="text-paragraph text-55 leading-[1.1818] font-light tracking-[-0.02em]">
                Filter
              </span>
              <Image
                src="/assets/icons/filterPlus.svg"
                alt="filter"
                width={50}
                height={50}
                className="w-[38px] h-[38px]"
              />
            </button>
          </div>
        </div>

        {/* Accordion */}
        {paginated.length > 0 ? (
          <Accordion key={`${search}-${page}`} items={paginated} />
        ) : (
          <div className="flex flex-col">
            <div className="mb-70 mt-[10px]">
              <Image
                src="/assets/icons/search-faq.png"
                alt="No Results"
                width={500}
                height={500}
                className="w-auto h-[120px]"
              />
            </div>
            <h3 className="mb-20 3xl:mb-[24px] text-55 leading-[1.18181] tracking-[-0.02em] font-light text-secondary">
              No results found
            </h3>
            <p className="mb-60 text-30 leading-[1.333] tracking-[-0.02em] font-light text-secondary">
              If you don't see your question here, feel free to ask it here
            </p>
            <BorderButton
              href="/contact"
              text="Contact"
              borderColor="black"
              textColor="black"
              className="w-fit"
            />
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-80">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Accordion from "@/app/components/common/Accordian";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";
import FaqCta from "./FaqCta";
import Pagination from "@/app/components/common/Pagination";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { FaqData } from "../type";

const ITEMS_PER_PAGE = 7;
const DEBOUNCE_MS = 200;

export default function FaqSection({ data }: { data: FaqData }) {
  const { firstSection, secondSection } = data;
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const [inputValue, setInputValue] = useState(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPushedRef = useRef(search);

  useEffect(() => {
    // Only sync from the URL if this change didn't originate from our own debounce push
    // (e.g. it came from browser back/forward, or an external link)
    if (search !== lastPushedRef.current) {
      setInputValue(search);
      lastPushedRef.current = search;
    }
  }, [search]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const filtered = useMemo(() => {
    const { items } = secondSection;
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item: any) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [search, secondSection.items]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    .map((item: any) => ({ ...item, id: item._id ?? item.id }));

  const handleSearch = (value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value.trim()) params.set("q", value);
      params.set("page", "1");
      lastPushedRef.current = value; // NEW: record what we're about to push, before it lands
      router.push(`?${params.toString()}`, { scroll: false });
    }, DEBOUNCE_MS);
  };

  return (
    <section className="py-17.5 lg:pt-120 lg:pb-140 3xl:pb-200 relative ">
      <div
        className={`absolute hidden lg:block top-[33.5%] 3xl:top-[375px] ${filtered.length > 0 ? "" : "opacity-0"} transition-all duration-500 bottom-0 left-[-8.3%] w-full max-w-[550px] 3xl:max-w-[793px] max-h-[1203px] z-0 pointer-events-none`}
      >
        <Image
          src="/assets/icons/faq-question.svg"
          alt="faq-question"
          fill
          className="object-contain object-top-left "
        />
      </div>

      <div className="container lg:pl-[15.6%] z-20 relative">
        <div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionTitle
              title={firstSection.title}
              // className={`section-heading-90 ${filtered.length > 0 ? "mb-30" : "mb-140 3xl:mb-150"} max-w-[20ch]`}
              className={`section-heading-90 mb-30 max-w-[20ch]`}
            />
          </motion.div>
          {/* {filtered.length > 0 && ( */}
          <motion.div
            variants={moveUp(0.35)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className={`mb-140 3xl:mb-150 `}
          >
            <div className={`transition-all duration-300 `}>
              <FaqCta
                subTitle={firstSection.subTitle}
                btnText={firstSection.btnText}
                btnLink={firstSection.btnLink}
              />
            </div>
          </motion.div>
          {/* )} */}
        </div>

        {/* Toolbar */}
        <motion.div
          variants={moveUp(0.25)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-20 mb-60"
        >
          <div className="flex items-center gap-2.5 md:gap-30 3xl:gap-[36px]">
            <span className="text-secondary text-55 leading-[1.1818] font-light tracking-[-0.02em]">
              All Questions
            </span>
            {/* <span className="text-primary text-55 leading-[1.1818] font-light tracking-[-0.02em]">
              {secondSection.items.length}
            </span> */}
          </div>
          <div className="flex items-center gap-80">
            <div className="flex items-center justify-between border border-[#c2c2c2] rounded-full h-[38px] lg:h-[50px] min-w-[237px] lg:min-w-[280px] 3xl:w-[330px] px-[17px]">
              <input
                type="text"
                value={inputValue}
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
            {/* <button className="flex items-center gap-5 lg:gap-4">
              <span className="text-paragraph text-[18px] lg:text-55 leading-[1.1818] font-light tracking-[-0.02em]">
                Filter
              </span>
              <Image
                src="/assets/icons/filterPlus.svg"
                alt="filter"
                width={50}
                height={50}
                className="w-5 h-5 lg:w-[38px] lg:h-[38px]"
              />
            </button> */}
          </div>
        </motion.div>

        {/* Accordion */}
        {/* <div className="min-h-[7000px]"> */}
        {paginated.length > 0 ? (
          <Accordion key={`${search}-${page}`} items={paginated} staggerItems />
        ) : (
          <motion.div
            variants={moveUp(0.35)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col relative pb-[195px] lg-pb-0"
          >
            <div
              className={`absolute  lg:hidden  top-7.5  w-full  left-[-21%]  h-[353px] z-0 pointer-events-none`}
            >
              <Image
                src="/assets/icons/faq-question.svg"
                alt="faq-question"
                fill
                className="object-contain object-top-left"
              />
            </div>
            <div className="mb-7.5 lg:mb-70 border-t border-bdr-gray pt-7.5">
              <Image
                src="/assets/icons/search-faq.png"
                alt="No Results"
                width={500}
                height={500}
                className="w-auto h-[49px] lg:h-[120px]"
              />
            </div>
            <h3 className="mb-2.5 md:mb-20 3xl:mb-[24px] text-55 leading-[1.18181] tracking-[-0.02em] font-light text-secondary">
              No results found
            </h3>
            <p className="mb-5 md:mb-60 text-30 leading-[1.333] tracking-[-0.02em] font-light text-secondary">
              If you don&apos;t see your question here, feel free to ask it here
            </p>
            <BorderButton
              href="/contact-us"
              text="Contact"
              borderColor="black"
              textColor="black"
              className="w-fit"
            />
          </motion.div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 md:mt-80"
          >
            <Pagination currentPage={page} totalPages={totalPages} />
          </motion.div>
        )}
        {/* </div> */}
      </div>
    </section>
  );
}

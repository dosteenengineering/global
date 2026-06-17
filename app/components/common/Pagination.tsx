"use client";

import Image from "next/image";
import { useLenis } from "@/app/components/LenisProvider";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { scrollTo } = useLenis();

  const goToPage = (page: number) => {
    scrollTo(document.documentElement, { duration: 1.5, offset: 0 });
    setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`?${params.toString()}`);
    }, 1000);
  };

  const handlePrev = () => {
    goToPage(currentPage - 1);
  };

  const handleNext = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className="flex flex-row-reverse lg:flex-row justify-center lg:justify-start items-center gap-7.5 lg:gap-200 3xl:gap-[218px]">
      <div className="flex items-center gap-2.5 md:gap-[18px]">
        {currentPage > 1 ? (
          <button
            onClick={() => {
              handlePrev();
            }}
            className="flex items-center gap-[9px] cursor-pointer"
          >
            <span className="text-description text-paragraph">Previous</span>
            <span className="w-10 h-10 lg:w-12 lg:h-12 3xl:w-15 3xl:h-15 rounded-full border border-secondary flex items-center justify-center">
              <Image
                src="/assets/icons/arrow-right-primary.svg"
                alt="Previous"
                width={17}
                height={17}
                className="w-[11px] h-[11px] lg:w-auto lg:h-[24px] pointer-events-none rotate-180"
              />
            </span>
          </button>
        ) : (
          <span className="flex items-center gap-1.5 md:gap-3 text-secondary text-sm font-medium opacity-30 cursor-not-allowed">
            <span className="text-description text-paragraph">Previous</span>
            <span className="w-10 h-10 lg:w-12 lg:h-12 3xl:w-15 3xl:h-15 rounded-full border border-secondary flex items-center justify-center">
              <Image
                src="/assets/icons/arrow-right-primary.svg"
                alt="Previous"
                width={17}
                height={17}
                className="w-[11px] h-[11px] lg:w-auto lg:h-[24px] pointer-events-none rotate-180"
              />
            </span>
          </span>
        )}

        {currentPage < totalPages ? (
          <button
            onClick={() => {
              handleNext();
            }}
            className="flex items-center gap-[9px] cursor-pointer"
          >
            <span className="w-10 h-10 lg:w-12 lg:h-12 3xl:w-15 3xl:h-15 rounded-full border border-secondary flex items-center justify-center">
              <Image
                src="/assets/icons/arrow-right-primary.svg"
                alt="Next"
                width={17}
                height={17}
                className="w-[11px] h-[11px] lg:w-auto lg:h-[24px] pointer-events-none"
              />
            </span>
            <span className="text-description text-paragraph">Next</span>
          </button>
        ) : (
          <span className="flex items-center gap-3 text-secondary text-sm font-medium opacity-30 cursor-not-allowed">
            <span className="w-10 h-10 lg:w-12 lg:h-12 3xl:w-15 3xl:h-15 rounded-full border border-secondary flex items-center justify-center">
              <Image
                src="/assets/icons/arrow-right-primary.svg"
                alt="Next"
                width={17}
                height={17}
                className="w-[11px] h-[11px] lg:w-auto lg:h-[24px] pointer-events-none"
              />
            </span>
            <span className="text-description text-paragraph">Next</span>
          </span>
        )}
      </div>

      <div className="h-[26px] w-[55px] md:h-[31px] md:w-[78px] py-[3px] rounded-[16px] border border-primary text-paragraph flex items-center justify-center text-15 leading-[1.666]">
        <span className="font-semibold">
          {String(currentPage).padStart(2, "0")}/
        </span>
        <span className="font-light">
          {String(totalPages).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

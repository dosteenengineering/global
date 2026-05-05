"use client"

import Accordion from "@/app/components/common/Accordian";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import Image from "next/image";

interface FaqData {
  title: string;
  items: {
    id: string;
    question: string;
    answer: string;
  }[];
}

const Faq = ({ bimFaqData }: { bimFaqData: FaqData }) => {
  return (
    <section className="py-140 3xl:py-200 relative">
<div className="absolute top-80 3xl:top-[87px] bottom-70 3xl:bottom-[77px] left-[-7%] w-full max-w-[550px] 3xl:max-w-[793px] max-h-[1203px] z-0">
    <Image src="/assets/icons/faq-question.svg" alt="faq-question" fill className="object-contain object-top-left" />
</div>
      <div className="container">
          <div className="mb-80">
              <SectionTitle title={bimFaqData.title} className="section-heading max-w-[19ch]" />
          </div>
          <div className="max-w-[1050px] 3xl:max-w-[1395px] ml-auto">
              <Accordion items={bimFaqData.items} />
          </div>
      </div>
    </section>
  );
};

export default Faq;

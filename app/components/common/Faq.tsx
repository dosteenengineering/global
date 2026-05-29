"use client";

import Accordion from "@/app/components/common/Accordian";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";
import Image from "next/image";

interface FaqData {
  title: string;
  items: {
    id: string;
    question: string;
    answer: string;
  }[];
}

const Faq = ({ faqData }: { faqData: FaqData }) => {
  return (
    <section className="py-140 3xl:py-200 relative">
      <div className=" absolute top-80 3xl:top-[87px] bottom-70 3xl:bottom-[77px] left-[-7%] w-full max-w-[550px] 3xl:max-w-[793px] max-h-[1203px] z-0 hidden lg:block">
        <Image
          src="/assets/icons/faq-question.svg"
          alt="faq-question"
          fill
          className="object-contain object-top-left"
        />
      </div>
      <div className="container">
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-80"
        >
          <SectionTitle
            title={faqData.title}
            className="section-heading max-w-[19ch]"
          />
        </motion.div>
        <motion.div
          variants={moveUp(0.35)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-[1050px] 3xl:max-w-[1395px] ml-auto"
        >
          <Accordion items={faqData.items} />
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;

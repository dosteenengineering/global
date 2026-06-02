import BorderButton from "@/app/components/common/BorderButton";
import { faqData } from "../data";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import StatNoise4 from "@/app/components/common/noise/StatNoise4";

const FaqCta = () => {
  return (
    <section>
      <div className="w-fit">
        <div className="flex lg:items-center items-start flex-col lg:flex-row gap-5 md:gap-50 px-30 3xl:px-[32px] py-5 md:py-20 3xl:py-[24px] lg:justify-between relative">
          <StatNoise4 />
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-30 leading-[1.33] tracking-[-0.02em] text-paragraph max-w-[804px] font-light"
            dangerouslySetInnerHTML={{ __html: faqData.contactText }}
          />
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <BorderButton
              text={faqData.contactLabel}
              borderColor="black"
              textColor="black"
              iconColor="primary"
              hoverBg="black"
              href={faqData.contactHref}
              className="3xl:px-[35px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqCta;

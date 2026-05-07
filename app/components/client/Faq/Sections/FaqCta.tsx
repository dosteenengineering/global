import BorderButton from "@/app/components/common/BorderButton";
import { faqData } from "../data";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";

const FaqCta = () => {
  return (
    <section>
      <div className="w-fit">
        <div className="flex lg:items-center items-start flex-col lg:flex-row gap-50 px-30 3xl:px-[32px] py-20 3xl:py-[24px] lg:justify-between relative">
          <StatNoise1 />
          <div
            className="text-30 leading-[1.33] tracking-[-0.02em] text-paragraph max-w-[804px] font-light"
            dangerouslySetInnerHTML={{ __html: faqData.contactText }}
          />
          <BorderButton
            text={faqData.contactLabel}
            borderColor="black"
            textColor="black"
            iconColor="primary"
            hoverBg="black"
            href={faqData.contactHref}
          />
        </div>
      </div>
    </section>
  );
};

export default FaqCta;

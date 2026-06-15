import BorderButton from "@/app/components/common/BorderButton";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import Image from "next/image";

interface Props {
  data: {
    title: string;
    desc: string;
    email: string;
  };
}

const NewsLetter = ({ data }: Props) => {
  return (
    <section className="relative py-12.5 md:py-120 md:py-140 xl:py-150 overflow-hidden">
      <SecondaryNoise />
      <div className="container relative z-2">
        <SectionTitle
          text={data.title}
          className="text-left section-heading-90 uppercase mb-20"
        />
        {/* <p className="text-description text-paragraph max-w-[60ch] mb-7.5 md:mb-50">{data.desc}</p> */}
        <SectionDescription
          text={data.desc}
          className="text-description text-paragraph max-w-[60ch] mb-7.5 md:mb-50"
        />
              <div className="flex items-center w-full max-w-[477px] h-[50px] md:h-[60px] rounded-full border border-[#454545] overflow-visible pr-0">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 h-full bg-transparent px-20 3xl:px-[25px] text-15 leading-[2.133] text-secondary placeholder:text-paragraph placeholder:tracking-[-2%] placeholder:text-15 font-light font-poppins placeholder:font-light outline-none"
                />
                <button className="relative flex items-center gap-3 h-[calc(100%+2px)] -my-[1px] -mr-[1px] px-20 3xl:px-[27px] rounded-[50px] border border-primary text-secondary text-15 leading-[1.73333] uppercase group overflow-hidden">
                  <span className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[50px]" />
                  <span className="relative  group-hover:text-white transition-colors duration-300 ease-in-out">
                    Subscribe
                  </span>
                  <Image
                    src="/assets/icons/button-arrow-top-right.svg"
                    alt=""
                    width={25}
                    height={25}
                    className="relative  w-auto h-[18px] pointer-events-none group-hover:rotate-45 group-hover:invert group-hover:brightness-0 transition-transform duration-300 ease-in-out"
                  />
                </button>
              </div>
      </div>
    </section>
  );
};

export default NewsLetter;

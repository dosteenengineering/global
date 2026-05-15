import BorderButton from "@/app/components/common/BorderButton";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

interface Props {
  data:{
    title: string;
    desc: string;
    email: string;
  }
}

const NewsLetter = ({data}: Props) => {
  return ( 
    <section className="relative py-140 xl:py-150 overflow-hidden">
      <SecondaryNoise/>
      <div className="container relative z-2">
        <SectionTitle text={data.title} className="text-left section-heading uppercase mb-50" />
        <p className="text-description text-paragraph max-w-[60ch] mb-50">{data.desc}</p>
        <form className="flex w-full max-w-[478px] items-center overflow-hidden rounded-full border border-black/80">
          <input type="email" aria-label="Email address" placeholder="Enter Your Email"
            className="min-w-0 flex-1 bg-transparent px-6 py-4 text-16 text-black outline-none placeholder:text-black/55 md:px-25"
          />
          <BorderButton
            text="Subscribe"
            type="submit"
            borderColor="black"
            textColor="black"
            iconColor="primary"
            hoverBg="black"
            px="px-6 md:px-25"
            className="-ml-px shrink-0 border-[#3946B8]"
          />
        </form>
      </div>
    </section>
   );
}
 
export default NewsLetter;

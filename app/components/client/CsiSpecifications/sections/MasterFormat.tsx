import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

interface Props {
  data: {
    title: string;
    description: string;
    subTitle: string;
    listItems: {
      title: string;
      description: string;
    }[];
  };
}

const Masterformat = ({ data }: Props) => {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200">
      <div className="absolute top-2 xl:-top-8 -left-1 pointer-events-none">
        <Image src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines" width={600} height={500} className="object-contain 2xl:w-[500px] 3xl:w-[600px]" />
      </div>

      <div className="lg:pl-[15.3%] 3xl:pl-[21.3%] pt-100 px-[15px] lg:px-0 container w-full">
        <SectionTitle text={data.title} className="section-heading text-secondary uppercase mb-50" />
        <div className="text-paragraph text-description mb-100" dangerouslySetInnerHTML={{ __html: data.description }} />

        <div>
          <h2 className="text-55 leading-[1.181818181818182] mb-50">{data.subTitle}</h2>
          <div>
            {
              data.listItems.map((item, index) => (
                <div key={index} className="first:border-t first:border-bdr-gray  border-b border-bdr-gray border-t-0">
                  <div className="grid grid-cols-[1fr_4fr] ">
                    <div className="border-r border-bdr-gray py-8 lg:py-10 xl:py-15">
                      <h3 className="text-30">{item.title}</h3>
                    </div>
                    <div className="py-8 lg:py-10 xl:py-15 pl-8 lg:pl-10 xl:pl-15">
                      <p className="text-paragraph text-description max-w-xl">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </section>
  );
}

export default Masterformat;
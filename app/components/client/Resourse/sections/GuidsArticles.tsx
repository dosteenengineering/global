
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import BorderButton from "@/app/components/common/BorderButton";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";


interface GuidesArticlesProps {
  data: {
    title: string;
    items: {
      id: number;
      featured: boolean;
      audience: string;
      type: string;
      title: string;
      image: string;
      link: string;
    }[];
  };
}

const imageHeightClasses = [
  "3xl:h-[579px]",
  "3xl:h-[458px]",
  "3xl:h-[297px]",
];

const GuidesArticles = ({ data }: GuidesArticlesProps) => {
  return (
    <section className="relative overflow-hidden py-140 xl:py-150">
      <PrimaryNoise2 />
      <div className="container">
        <div className="flex justify-between mb-50 md:mb-100">
          <SectionTitle text={data.title}
            className="text-left section-heading uppercase text-white max-w-[28ch]" />
          <BorderButton text="View All" href="#" className="hidden md:inline-flex xl:px-35" iconColor="white" hoverBg="white" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 3xl:grid-cols-[705.74px_566.99px_auto] text-white relative z-2 items-end">
          {data.items.map((item, index) => (
            <div key={item.id} className="border-l border-[#76A7FF] px-1 xl:px-[20px] flex flex-col h-full">
              <div className="flex justify-between items-center mb-5 xl:mb-10 mt-auto">
                <span className="text-19 leading-[1.526315789473684] font-light text-white -tracking-[0.02em]">{item.audience}</span>
                <button className="text-white border rounded-full border-white text-15 leading-[1.666666666666667] px-[18px]">{item.type}</button>
              </div>
              <h3 className="text-30 leading-[1.333333333333333] font-light -tracking-[0.02em] text-white mb-5 xl:mb-50">{item.title}</h3>
              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover h-[200px] md:h-[300px] lg:h-[350px] ${imageHeightClasses[index] ?? imageHeightClasses[0]}`}
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default GuidesArticles;

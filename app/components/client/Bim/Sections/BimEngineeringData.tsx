import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { bimEngineeringData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";

interface dataProps {
  descMaxWidth?: string;
  data: {
    title: string;
    stats: {
      id: number;
      value: string;
      label: string;
    }[];
  };
}

export default function BimEngineeringData({ data, descMaxWidth }: dataProps) {
  const { title, stats } = data;

  return (
    <section className="w-full relative">
        <SecondaryNoise />
      <div className="container py-140 3xl:py-150 relative">
        {/* Title */}
        <SectionTitle
          title={title}
          className="section-heading text-secondary mb-50 max-w-[27ch]"
        />

        {/* Stats box */}
        <div className="px-80 py-50 3xl:py-[56px] relative">
            <StatNoise1 />
          {/* <div className="relative z-10 flex flex-wrap gap-70 3xl:gap-[76px]"> */}
          <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 3xl:grid-cols-[346px_346px_346px_auto] gap-5 3xl:gap-[37px]">
            {stats.map((stat) => ( 
              <div key={stat.id} className="flex flex-col w-full">
                <span className="text-55 leading-[1.1818] text-primary mb-[5px] font-light">
                  {stat.value}
                </span>
                <span className={`text-paragraph text-description ${descMaxWidth} `}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
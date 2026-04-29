import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { bimEngineeringData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";

export default function BimEngineeringData() {
  const { title, stats } = bimEngineeringData;

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
          <div className="relative z-10 flex flex-wrap gap-70 3xl:gap-[76px]">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col">
                <span className="text-55 leading-[1.1818] text-primary mb-[5px] font-light">
                  {stat.value}
                </span>
                <span className="text-paragraph text-description">
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
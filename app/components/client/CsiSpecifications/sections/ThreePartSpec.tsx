import { threePartSpecData } from "../data";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PartCard from "./PartCard";

export default function ThreePartSpec() {
  const { title } = threePartSpecData;

  return (
    <section className="w-full relative">
      <PrimaryNoise2 />
      <div className="relative container pt-140 3xl:pt-150 pb-120">
        {/* Title */}
        <SectionTitle title={title} className="text-white uppercase mb-80 section-heading" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-30">
          {threePartSpecData.items.map((item, index) => (
            <PartCard key={item.id} part={item.part} 
            title={item.title} shortDesc={item.shortDesc} description={item.desc} isEven={index % 2 !== 0} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

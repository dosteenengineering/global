
import { featuresList } from "../data";
import FeaturesCard from "./FeaturesCard";

interface Props {
 
    items: string[];
  
}

const FeaturesList = ({ items }: Props) => {
  return (
  <section className="pt-7.5 md:pt-120 pb-[70px] md:pb-100">
    <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-[10px] gap-y-[5px] md:gap-y-3">
          {
            items.map((feature, index) => (
              <FeaturesCard key={index} title={feature} />
            ))
          }
        </div>
    </div>
  </section>
  );
}

export default FeaturesList;
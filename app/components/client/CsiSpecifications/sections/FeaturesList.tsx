
import { featuresList } from "../data";
import FeaturesCard from "./FeaturesCard";

interface Props {
 
    items: string[];
  
}

const FeaturesList = ({ items }: Props) => {
  return (
  <section className="pt-16">
    <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-[10px] gap-y-3">
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
import InnerPageBanner from "../../common/InnerPageBanner";
import { banner, MasterFormatData } from "./data";
import FeaturesList from "./sections/FeaturesList";
import { featuresList } from "./data";
import MasterFormat from "./sections/MasterFormat";
import ThreePartSpec from "./sections/ThreePartSpec";

const Index = () => {
  return ( 
    <>
        <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...banner} />
        <FeaturesList items={featuresList.items} />
        <MasterFormat data={MasterFormatData} />
        <ThreePartSpec />
    </>
   );
}
 
export default Index;
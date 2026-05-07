import InnerPageBanner from "../../common/InnerPageBanner";
import { banner } from "./data";
import AboutPartners from "./sections/AboutPartners";
import ExclusivePartners from "./sections/ExclusivePartners";
import ValuedClients from "./sections/ValuedClients";


const Index = () => {
  return (
    <>
      <InnerPageBanner
        titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
        {...banner}
      />
      <AboutPartners />
      <ExclusivePartners />
      <ValuedClients />
    </>
  );
};

export default Index;

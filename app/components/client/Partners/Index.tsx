import InnerPageBanner from "../../common/InnerPageBanner";
import { banner, ctaData } from "./data";
import AboutPartners from "./sections/AboutPartners";
import ExclusivePartners from "./sections/ExclusivePartners";
import ValuedClients from "./sections/ValuedClients";
import CtaSection from "../../common/CtaSection";

const Index = () => { 
  return (
    <>
      <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...banner} />
      <AboutPartners />
      <ExclusivePartners />
      <ValuedClients />
      <CtaSection {...ctaData} descriptionWidth="max-w-[968px]" titleWidth="max-w-[34ch]"/>
    </>
  );
};

export default Index;

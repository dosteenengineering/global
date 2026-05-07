import InnerPageBanner from "../../common/InnerPageBanner";
import AboutBim from "./Sections/AboutBim";
import BimCapabilitiesStats from "./Sections/BimCapabilitiesStats";
import SoftwareTools from "./Sections/SoftwareTools";
import { banner, ctaData, BimFaqData  } from "./data";
import Benefits from "./Sections/Benefits";
import BimProcess from "./Sections/BimProcess";
import BuildingSystems from "./Sections/BuildingSystems";
import BimEngineeringData from "./Sections/BimEngineeringData";
import CtaSection from "../../common/CtaSection";
import Faq from "../../common/Faq";

const Index = () => {
  return (
    <>
      <InnerPageBanner
        titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
        {...banner}
      />
      <AboutBim />
      <BimCapabilitiesStats />
      <SoftwareTools />
      <Benefits />
      <BimProcess />
      <BuildingSystems />
      <BimEngineeringData />
      <Faq bimFaqData={BimFaqData} />
      <CtaSection {...ctaData} descriptionWidth="max-w-[968px]" titleWidth="max-w-[34ch]"/>
    </>
  );
};

export default Index;

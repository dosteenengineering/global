import InnerPageBanner from "../../common/InnerPageBanner";
import AboutBim from "./Sections/AboutBim";
import BimCapabilitiesStats from "./Sections/BimCapabilitiesStats";
import SoftwareTools from "./Sections/SoftwareTools";
import { banner, ctaData, BimFaqData, Capability } from "./data";
import Benefits from "./Sections/Benefits";
import BimProcess from "./Sections/BimProcess";
import BuildingSystems from "./Sections/BuildingSystems";
import { bimEngineeringData } from "./data";
import BimEngineeringData from "./Sections/BimEngineeringData";
import CtaSection from "../../common/CtaSection";
import Faq from "../../common/Faq";

const Index = ({ data }: { data: Capability }) => {
  return (
    <>
      <InnerPageBanner
        titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
        {...data.firstSection}
      />
      <AboutBim secondSection={data.secondSection} thirdSection={data.thirdSection} />
      <BimCapabilitiesStats data={data.fourthSection} />
      <SoftwareTools data={data.fifthSection} />
      <Benefits data={data.sixthSection}/>
      <BimProcess data={data.seventhSection} />
      <BuildingSystems data={data.eighthSection} />
      <BimEngineeringData data={data.ninethSection} />
      <Faq faqData={{
        title: data.tenthSection.title,
        items: data.tenthSection.items.map((item, index) => ({
          id: item._id ?? `faq-${index + 1}`,
          question: item.question,
          answer: item.answer,
        }))
      }} />
      <CtaSection {...data.lastSection} descriptionWidth="max-w-[968px]" titleWidth="max-w-[34ch]" />
    </>
  );
};

export default Index;

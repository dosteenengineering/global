import InnerPageBanner from "../../common/InnerPageBanner";
import { banner, ClientPageData, ctaData } from "./data";
import AboutPartners from "./sections/AboutPartners";
import ExclusivePartners from "./sections/ExclusivePartners";
import ValuedClients from "./sections/ValuedClients";
import CtaSection from "../../common/CtaSection";

const Index = ({data}:{data:ClientPageData}) => { 

  const valuedClientsData = {
  title: data.fourthSection.title,
  description: data.fourthSection.firstDescription,
  footnote: data.fourthSection.secondDescription,
  regions: data.fourthSection.items.map((region) => ({
    label: region.title,
    logos: region.subItems.map((item) => ({
      src: item.image,
      alt: item.imageAlt,
    })),
  })),
};

  return (
    <>
      <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...data.firstSection} />
      <AboutPartners data={data.secondSection}/>
      <ExclusivePartners data={data.thirdSection}/>
      <ValuedClients data={valuedClientsData}/>
      <CtaSection {...data.lastSection} descriptionWidth="max-w-[968px]" titleWidth="max-w-[34ch]"/>
    </>
  );
};

export default Index;

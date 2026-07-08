import InnerPageBanner from "../../common/InnerPageBanner";
import {
  banner,
  featuresList,
  MasterFormatData,
  systemsData,
  whoUsesSection,
  specData,
  CsiFaqData,
  ctaData,
  Csi,
} from "./data";
import FeaturesList from "./sections/FeaturesList";
import MasterFormat from "./sections/MasterFormat";
import ThreePartSpec from "./sections/ThreePartSpec";
import Systems from "./sections/Systems";
import DownloadSection from "./sections/DownloadSection";
import Benefits from "../Bim/Sections/Benefits";
import ComplianceSection from "./sections/ComplianceSection";
import BimEngineeringData from "../Bim/Sections/BimEngineeringData";
import Faq from "../../common/Faq";
import CtaSection from "../../common/CtaSection";

const Index = ({ data }: { data: Csi }) => {

  const MasterFormatData = {
    title: data.thirdSection.title,
    description: data.thirdSection.description,
    subTitle: data.thirdSection.itemTitle,
    listItems: data.thirdSection.items.map((item) => ({
      title: item.title,
      description: item.description,
    })),
  };

  const threePartSpecData = {
    title: data.fourthSection.title,
    items: data.fourthSection.items.map((item, index) => ({
      id: index + 1,
      part: "Part "+ (index+1),
      title: item.title,
      shortDesc: item.subTitle,
      desc: item.description,
    })),
  };

const systemsData = {
  title: data.fifthSection.title,
  columns: data.fifthSection.items.map((item) => ({
    title: item.title,
    items: item.subItems.map((subItem) => ({
      title: subItem.title,
      subTitle: subItem.subTitle,
    })),
  })),
};

const downloadData = {
  sectionTitle: data.sixthSection.title,
  sections: data.sixthSection.items.map((item, index) => ({
    id: index + 1,
    title: item.title,
    division: item.division,
    section: item.section,
    icon: item.image,
    link: item.file,
  })),
};

const whoUsesData = {
  title: data.seventhSection.title,
  description: data.seventhSection.description,
  items: data.seventhSection.items.map((item) => ({
    _id: item._id,
    title: item.title,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
  })),
};

  return (
    <>
      <InnerPageBanner
        titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
        {...data.firstSection}
      />
      <FeaturesList items={data.secondSection.items} />
      <MasterFormat data={MasterFormatData} />
      <ThreePartSpec threePartSpecData={threePartSpecData}/>
      <Systems data={systemsData} />
      <DownloadSection downloadData={downloadData}/>
      <Benefits data={whoUsesData} showSecondaryNoise={false} imgMaxHeight="3xl:max-h-[720]" />
      <ComplianceSection data={data.eighthSection}/>
      <BimEngineeringData data={data.ninethSection} descMaxWidth="max-w-[26ch]" />
      <Faq faqData={{
        title: data.tenthSection.title,
        items: data.tenthSection.items.map((item, index) => ({
          id: item._id ?? `faq-${index + 1}`,
          question: item.question,
          answer: item.answer,
        }))
      }} />
      <CtaSection
        {...data.lastSection}
        descriptionWidth="max-w-[968px]"
        titleWidth="max-w-[34ch]"
      />
    </>
  );
};

export default Index;

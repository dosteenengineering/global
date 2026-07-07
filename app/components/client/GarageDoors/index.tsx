import InnerPageBanner from "../../common/InnerPageBanner";
import {
  banner,
  garageDoorData,
  garageDoorFaqData,
  IndividualSystemData,
  whyChooseData,
} from "./data";
import BannerBottom from "./sections/BannerBottom";
import DiscoverSection from "./sections/DiscoverSection";
import WhyChoose from "./sections/WhyChoose";
import Customization from "./sections/Customization";
// import ClientStoriesSection from "../Home/Sections/ClientStoriesSection";
import Faq from "../../common/Faq";
const Index = ({ data }: { data: IndividualSystemData }) => {
  const clientStoriesData = {
    title: data?.sixthSection?.title?.toUpperCase(),
    stories: data?.sixthSection?.items?.map((item: any, index: number) => {
      const [company, designation] = item?.designation?.split(" - ");
      return {
        key: `story-${index + 1}`,
        quote: item?.description,
        name: item?.clientName,
        company: company?.trim() ?? "",
        designation: designation?.trim() ?? "",
      };
    }),
  };

  const garageDoorFaqData = {
    title: data?.seventhSection?.title?.toUpperCase(),
    items: data?.seventhSection?.items?.map((item: any, index: number) => ({
      id: `faq-${index + 1}`,
      question: item?.question,
      answer: item?.answer,
    })),
  };

  return (
    <>
      <InnerPageBanner
        titleMaxWidth="max-w-[30ch] xl:max-w-[25ch]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
        {...data?.firstSection}
        description={data?.firstSection?.subTitle}
      />
      <BannerBottom
        firstDescription={data?.firstSection?.firstDescription}
        secondDescription={data?.firstSection?.secondDescription}
      />
      <DiscoverSection data={data?.secondSection} />
      <WhyChoose data={data?.fourthSection} />
      <Customization data={data?.fifthSection} />
      {/* <ClientStoriesSection clientStoriesDataFromApi={clientStoriesData} /> */}
      <Faq faqData={garageDoorFaqData} />
    </>
  );
};

export default Index;

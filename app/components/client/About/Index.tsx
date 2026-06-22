import InnerPageBanner from "../../common/InnerPageBanner";
import AboutDetails from "./Sections/AboutDetails";
import MissionVision from "./Sections/MissionVision";
import WhoYouServe from "./Sections/WhoYouServe";
import WhyChooseDosteen from "./Sections/WhyChooseDosteen";
import OurValues from "./Sections/OurValues";
import CtaSection from "../../common/CtaSection";
import { AboutPageData } from "./data";
import ServingMap from "./Sections/ServingMap";

const Index = ({data}:{data:AboutPageData}) => {
  return (
    <>
      <InnerPageBanner
        {...data.firstSection}
        titleMaxWidth="max-w-[30ch] 3xl:max-w-[1563px]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
      />
      <AboutDetails data={data.secondSection}/>
      <WhoYouServe data={data.thirdSection}/>
      <WhyChooseDosteen data={data.fourthSection}/>
      <MissionVision data={data.fifthSection}/>
      <OurValues data={data.sixthSection}/>
      <ServingMap seventhSection={data.seventhSection} eighthSection={data.eighthSection}/>
      <CtaSection {...data.ninethSection} descriptionWidth="max-w-[968px]" />
    </>
  );
};

export default Index;

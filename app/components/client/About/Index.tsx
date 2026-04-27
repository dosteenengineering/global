import InnerPageBanner from "../../common/InnerPageBanner";
import AboutDetails from "./Sections/AboutDetails";
import MissionVision from "./Sections/MissionVision";
import WhoYouServe from "./Sections/WhoYouServe";
import WhyChooseDosteen from "./Sections/WhyChooseDosteen";
import OurValues from "./Sections/OurValues";
import CtaSection from "./Sections/CtaSection";
import { CtaData } from "./data";

const Index = () => {
  return (
    <>
      <InnerPageBanner
        title="25 Years of Building Systems Excellence Across UAE & Oman"
        titleMaxWidth="max-w-[1270px] 3xl:max-w-[1563px]"
        descriptionMaxWidth="max-w-[1395px]"
        description="Trusted provider of building systems, entrance solutions, fire protection, flood control, and access management — serving residential, commercial, and industrial clients since 1999."
        image="/assets/images/about/banner.jpg"
        imageAlt="About Us"
      />
      <AboutDetails />
      <WhoYouServe />
      <WhyChooseDosteen />
      <MissionVision />
      <OurValues />
      <CtaSection {...CtaData} descriptionWidth="max-w-[968px]" />
    </>
  );
};

export default Index;

import InnerPageBanner from "../../common/InnerPageBanner";
import { BannerData } from "./data";
import AboutService from "./Sections/AboutService";
import IndustriesWeServe from "./Sections/IndustriesWeServe";

const Index = () => {
  return (
    <>
      <InnerPageBanner
        title={BannerData.title}
        titleMaxWidth="max-w-[1270px] 3xl:max-w-[1563px]"
        descriptionMaxWidth="max-w-[1395px]"
        description={BannerData.description}
        image={BannerData.image}
        imageAlt={BannerData.imageAlt}
      />
      <AboutService />
      <IndustriesWeServe />
    </>
  );
};

export default Index;

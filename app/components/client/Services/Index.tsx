import InnerPageBanner from "../../common/InnerPageBanner";
import { BannerData, IndustriesPageData } from "./data";
import AboutService from "./Sections/AboutService";
import IndustriesWeServe from "./Sections/IndustriesWeServe";

const Index = ({data}:{data:IndustriesPageData}) => {

  console.log(data)
  return (
    <>
      <InnerPageBanner
        title={data.firstSection.title}
        titleMaxWidth="max-w-[1270px] 3xl:max-w-[1563px]"
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]"
        description={data.firstSection.description}
        image={data.firstSection.image}
        imageAlt={data.firstSection.imageAlt}
        bannerImgHeight="h-[224px] md:h-[450px] 2xl:h-[550px] 3xl:h-[785px]"
      />
      <AboutService data={data.secondSection}/>
      <IndustriesWeServe data={data.thirdSection}/>
    </>
  );
};

export default Index;

import InnerPageBanner from "../../common/InnerPageBanner";
import { banner, garageDoorData, garageDoorFaqData, whyChooseData } from "./data";
import BannerBottom from "./sections/BannerBottom";
import DiscoverSection from "./sections/DiscoverSection";
import WhyChoose from "./sections/WhyChoose";
import Customization from "./sections/Customization";
import ClientStoriesSection from "../Home/Sections/ClientStoriesSection";
import Faq from "../../common/Faq";
const Index = () => {
  return ( 
    <>
    <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...banner} />
    <BannerBottom/>
    <DiscoverSection data={garageDoorData} />
    <WhyChoose data={whyChooseData} />
    <Customization/>
    <ClientStoriesSection/>
    <Faq faqData={garageDoorFaqData} />
    </>
   );
}
 
export default Index;
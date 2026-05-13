import InnerPageBanner from "../../common/InnerPageBanner";
import { banner, garageDoorData } from "./data";
import BannerBottom from "./sections/BannerBottom";
import DiscoverSection from "./sections/DiscoverSection";
const Index = () => {
  return ( 
    <>
    <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...banner} />
    <BannerBottom/>
    <DiscoverSection data={garageDoorData} />
    </>
   );
}
 
export default Index;
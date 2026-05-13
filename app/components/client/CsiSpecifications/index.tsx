import InnerPageBanner from "../../common/InnerPageBanner";
import {
  banner,
  featuresList,
  MasterFormatData,
  systemsData,
  whoUsesSection,
} from "./data";
import FeaturesList from "./sections/FeaturesList";
import MasterFormat from "./sections/MasterFormat";
import ThreePartSpec from "./sections/ThreePartSpec";
import Systems from "./sections/Systems";
import DownloadSection from "./sections/DownloadSection";
import Benefits from "../Bim/Sections/Benefits";
const Index = () => {
  return (
    <>
      <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...banner} />
      <FeaturesList items={featuresList.items} />
      <MasterFormat data={MasterFormatData} />
      <ThreePartSpec />
      <Systems data={systemsData} />
      <DownloadSection />
      <Benefits data={whoUsesSection} showSecondaryNoise={false} />
    </>
  );
};

export default Index;

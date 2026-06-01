import InnerPageBanner from "@/app/components/common/InnerPageBanner";
import { BannerData, DosteenSystemsData } from "./data";
import DosteenSystems from "./Sections/DosteenSystems";
import ProjectCta from "./Sections/ProjectCta";
import FeaturedProjects from "./Sections/FeaturedProjects";

const DefaultServicePageIndex = () => {
  return (
    <>
      <InnerPageBanner {...BannerData} descriptionMaxWidth="max-w-none" />
      <DosteenSystems data={DosteenSystemsData} />
      <ProjectCta />
      <FeaturedProjects />
    </>
  );
};

export default DefaultServicePageIndex;
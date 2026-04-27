import InnerPageBanner from "@/app/components/common/InnerPageBanner";
import { BannerData, DosteenSystemsData } from "./data";
import DosteenSystems from "./Sections/DosteenSystems";
import ProjectCta from "./Sections/ProjectCta";

const DefaultServicePageIndex = () => {
  return (
    <>
      <InnerPageBanner {...BannerData} descriptionMaxWidth="max-w-[1395px]" />
      <DosteenSystems data={DosteenSystemsData} />
      <ProjectCta />
    </>
  );
};

export default DefaultServicePageIndex;
import InnerPageBanner from "@/app/components/common/InnerPageBanner";
import { BannerData, CommercialBuildingData } from "./data";
import DosteenSystems from "./Sections/DosteenSystems";
import ProjectCta from "./Sections/ProjectCta";
import { Project } from "../../Projects/data";
import FeaturedProjects from "./Sections/FeaturedProjects";

const DefaultServicePageIndex = ({ data, projectsData }: { data: CommercialBuildingData, projectsData: Project[] }) => {

  const DosteenSystemsData = {
    description: data.firstSection.secondDescription,
    title: data.systemSection.title,
    systems: data.systemSection.items.map((item, index) => ({
      id: index + 1,
      title: item.firstSection.title,
      image: item.firstSection.thumbnailImage || item.firstSection.image,
      slug: `/solutions/${data.slug}/${item.slug}`,
    })),
  };

  const featuredProjects = (projectsData ?? []).filter(
    (project) =>
      project.featuredServices?.some(
        (s) => (typeof s === "object" ? s._id : s).toString() === data._id?.toString()
      )
  );

  return (
    <>
      <InnerPageBanner {...data.firstSection} description={data.firstSection.firstDescription} descriptionMaxWidth="max-w-none" />
      <DosteenSystems data={DosteenSystemsData} />
      <ProjectCta data={data.thirdSection} />
      <FeaturedProjects data={featuredProjects} />
    </>
  );
};

export default DefaultServicePageIndex;
import CtaSection from "../../common/CtaSection";
import InnerPageBanner from "../../common/InnerPageBanner";
import Main from "./Sections/Main";
import RelatedProjects from "./Sections/RelatedProjects";
import { ProjectItemProps, AllProjectData } from "./data";

const Index = ({ data, allProjectData }: { data: ProjectItemProps, allProjectData: AllProjectData }) => {

  const isRelatedAvailable = allProjectData.projects.filter((project) => project._id !== data._id && project.firstSection.sector._id === data.firstSection.sector._id).length > 0

  return (
    <>
      <InnerPageBanner title={data.firstSection.title} />
      <Main data={data} nextProject={data} isRelatedAvailable={isRelatedAvailable}/>
      {
        isRelatedAvailable &&
        <RelatedProjects data={allProjectData} currentProject={data} />
      }
      <CtaSection
        {...allProjectData.lastSection}
        titleWidth="max-w-[22ch]"
        descriptionWidth="max-w-[70ch]"
      />
    </>
  );
};

export default Index;

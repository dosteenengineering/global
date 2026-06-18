import CtaSection from "../../common/CtaSection";
import InnerPageBanner from "../../common/InnerPageBanner";
import { Project } from "../Projects/data";
import Main from "./Sections/Main";
import RelatedProjects from "./Sections/RelatedProjects";
import { projects, ctaData, ProjectItemProps, AllProjectData } from "./data";

const Index = ({data,allProjectData}:{data:ProjectItemProps,allProjectData:AllProjectData}) => {

  return (
    <>
      <InnerPageBanner title={data.firstSection.title} />
      <Main data={data} nextProject={data} />
      <RelatedProjects data={allProjectData}/>
      <CtaSection
        {...allProjectData.lastSection}
        titleWidth="max-w-[22ch]"
        descriptionWidth="max-w-[70ch]"
      />
    </>
  );
};

export default Index;

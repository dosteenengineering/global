import CtaSection from "../../common/CtaSection";
import InnerPageBanner from "../../common/InnerPageBanner";
import Main from "./Sections/Main";
import RelatedProjects from "./Sections/RelatedProjects";
import {ProjectItemProps, AllProjectData } from "./data";

const Index = ({data,allProjectData}:{data:ProjectItemProps,allProjectData:AllProjectData}) => {



  return (
    <>
      <InnerPageBanner title={data.firstSection.title} />
      <Main data={data} nextProject={data} />
      <RelatedProjects data={allProjectData} currentProject={data} />
      <CtaSection
        {...allProjectData.lastSection}
        titleWidth="max-w-[22ch]"
        descriptionWidth="max-w-[70ch]"
      />
    </>
  );
};

export default Index;

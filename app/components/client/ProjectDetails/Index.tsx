import CtaSection from "../../common/CtaSection";
import InnerPageBanner from "../../common/InnerPageBanner";
import Main from "./Sections/Main";
import RelatedProjects from "./Sections/RelatedProjects";
import { projects, ctaData } from "./data";

const Index = () => {
  return (
    <>
      <InnerPageBanner title={projects[0].title} />
      <Main project={projects[0]} nextProject={projects[0]} />
      <RelatedProjects />
      <CtaSection {...ctaData} />
    </>
  );
};

export default Index;

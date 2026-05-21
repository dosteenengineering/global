
import InnerPageBanner2 from "../../common/InnerPageBanner2";
import { banner, industryGuidesData, newsLetterData, resourcesKnowledgeHubData, specificationToolsData, ctaData } from "./data";
import GuidesArticles from "./sections/GuidsArticles";
import NewsLetter from "./sections/NewsLetter";
import ResourseTab from "./sections/ResourceTab";
import SpecTools from "./sections/SpecTools";
import CtaSection from "../../common/CtaSection";
const Index = () => {
  return ( 
    <>
      <InnerPageBanner2 {...banner} />
      <ResourseTab data={resourcesKnowledgeHubData} />
      <GuidesArticles data={industryGuidesData} />
      <SpecTools data={specificationToolsData} />
      <NewsLetter data={newsLetterData} />
      <CtaSection {...ctaData} descriptionWidth="max-w-[70ch]" titleWidth="max-w-[20ch]"/>
    </>
   );
}
 
export default Index;
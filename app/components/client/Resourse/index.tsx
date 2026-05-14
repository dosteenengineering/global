
import InnerPageBanner2 from "../../common/InnerPageBanner2";
import { banner, resourcesKnowledgeHubData } from "./data";
import ResourseTab from "./sections/ResourceTab";
const Index = () => {
  return ( 
    <>
      <InnerPageBanner2 {...banner} />
      <ResourseTab data={resourcesKnowledgeHubData} />
    </>
   );
}
 
export default Index;
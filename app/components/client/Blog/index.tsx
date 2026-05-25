import InnerPageBanner2 from "../../common/InnerPageBanner2";
import BlogContent from "./BlogContent";
import { banner, blogs } from "./data";

const Index = () => {
  return ( 
    <>
    <InnerPageBanner2 {...banner} />
    <BlogContent data={blogs} />
    </>
   );
}
 
export default Index;

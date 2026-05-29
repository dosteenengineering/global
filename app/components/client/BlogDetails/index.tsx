import InnerPageBanner from "../../common/InnerPageBanner";
import { banner, RelatedArticlesData } from "./data";
import BlogContent from "./sections/BlogContent";
import RelatedBlogs from "./sections/RelatedBlogs";

const Index = () => {
  return ( 
    <>
        <InnerPageBanner titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" {...banner} />
        <BlogContent />
        <RelatedBlogs data={RelatedArticlesData} />
    </>
   );
}
 
export default Index;
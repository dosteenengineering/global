import InnerPageBanner from "../../common/InnerPageBanner";
import { AllBlogData, BlogItem } from "../Blog/data";
import { banner, RelatedArticlesData } from "./data";
import BlogContent from "./sections/BlogContent";
import RelatedBlogs from "./sections/RelatedBlogs";

const Index = ({data,allBlogData}:{data:BlogItem,allBlogData:AllBlogData}) => {

  return ( 
    <>
        <InnerPageBanner 
        titleMaxWidth="max-w-[30ch] 3xl:max-w-[1629px]" 
        descriptionMaxWidth="max-w-[94%] 3xl:max-w-[1395px]" 
        title={data.title}
        image={data.thumbnail}
        imageAlt={data.thumbnailAlt}
        publishedDate={data.date}
        />
        <BlogContent data={data}/>
        <RelatedBlogs data={allBlogData} />
    </>
   );
}
 
export default Index;
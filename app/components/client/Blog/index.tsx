import { Suspense } from "react";
import InnerPageBanner2 from "../../common/InnerPageBanner2";
import BlogContent from "./BlogContent";
import { AllBlogData, banner, blogs } from "./data";

const Index = ({data}:{data:AllBlogData}) => {
  return (
    <>
      <InnerPageBanner2 {...data.bannerSection} />
      <Suspense>
        <BlogContent data={data.blogs} />
      </Suspense>
    </>
  );
};

export default Index;

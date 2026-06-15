import { Suspense } from "react";
import InnerPageBanner2 from "../../common/InnerPageBanner2";
import BlogContent from "./BlogContent";
import { banner, blogs } from "./data";

const Index = () => {
  return (
    <>
      <InnerPageBanner2 {...banner} />
      <Suspense>
        <BlogContent data={blogs} />
      </Suspense>
    </>
  );
};

export default Index;

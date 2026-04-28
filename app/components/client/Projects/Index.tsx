import InnerPageBanner2 from "@/app/components/common/InnerPageBanner2";
import { banner } from "./data";
import ProjectsListing from "./Sections/ProjectsListing";
import { Suspense } from "react";

const Index = () => {
  return (
    <>
      <InnerPageBanner2 {...banner} />
      <Suspense fallback={<div className="h-screen bg-whtie" />}>
        <ProjectsListing />
      </Suspense>
    </>
  );
};

export default Index;

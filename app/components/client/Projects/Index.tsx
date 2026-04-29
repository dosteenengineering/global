import InnerPageBanner2 from "@/app/components/common/InnerPageBanner2";
import { banner, cta } from "./data";
import ProjectsListing from "./Sections/ProjectsListing";
import { Suspense } from "react";
import CtaSection from "../../common/CtaSection";

const Index = () => {
  return (
    <>
      <InnerPageBanner2 {...banner} />
      <Suspense fallback={<div className="h-screen bg-whtie" />}>
        <ProjectsListing />
      </Suspense>
      <CtaSection {...cta} />
    </>
  );
};

export default Index;

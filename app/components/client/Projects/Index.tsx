import InnerPageBanner2 from "@/app/components/common/InnerPageBanner2";
import { banner, cta } from "./data";
import ProjectsListing from "./Sections/ProjectsListing";
import { Suspense } from "react";
import CtaSection from "../../common/CtaSection";

const Index = ({data}:any) => {
  return (
    <>
      <InnerPageBanner2 {...data.bannerSection} />
      <Suspense fallback={<div className="h-screen bg-whtie" />}>
        <ProjectsListing data={[...data.projects]}/>
      </Suspense>
      <CtaSection {...data.lastSection} titleWidth="max-w-[22ch]" />
    </>
  );
};

export default Index;

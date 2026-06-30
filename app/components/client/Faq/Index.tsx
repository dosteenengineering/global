import InnerPageBanner2 from "@/app/components/common/InnerPageBanner2";
// import { banner } from "./data";
import FaqSection from "./Sections/Main";
import { Suspense } from "react";
import { FaqData } from "./type";

const Index = ({data}: {data: FaqData}) => {
  return (
    <>
      <InnerPageBanner2 {...data.bannerSection} />
      <Suspense fallback={<div className="h-screen bg-white" />}>
        <FaqSection data={data} />  
      </Suspense>
    </>
  );
};

export default Index;

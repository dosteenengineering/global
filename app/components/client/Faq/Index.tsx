import InnerPageBanner2 from "@/app/components/common/InnerPageBanner2";
import { banner } from "./data";
import FaqSection from "./Sections/Main";
import { Suspense } from "react";

const Index = () => {
  return (
    <>
      <InnerPageBanner2 {...banner} />
      <Suspense fallback={<div className="h-screen bg-white" />}>
        <FaqSection />  
      </Suspense>
    </>
  );
};

export default Index;

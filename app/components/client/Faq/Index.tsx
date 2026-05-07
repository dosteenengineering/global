import InnerPageBanner2 from "@/app/components/common/InnerPageBanner2";
import { banner } from "./data";
import FaqSection from "./Sections/Main";

const Index = () => {
  return (
    <>
      <InnerPageBanner2 {...banner} />
      <FaqSection />
    </>
  );
};

export default Index;

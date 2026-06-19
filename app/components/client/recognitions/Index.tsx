import InnerPageBanner from "../../common/InnerPageBanner";
import { AwardsPageData } from "./data";
import Main from "./Sections/Main";

const Index = ({data}:{data:AwardsPageData}) => {
  return (
    <>
      <InnerPageBanner
        title={data.firstSection.title}
        titleMaxWidth="max-w-[19ch]"
      />
      <Main data={data.awards}/>
    </>
  );
};

export default Index;

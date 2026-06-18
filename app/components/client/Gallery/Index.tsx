import InnerPageBanner from "../../common/InnerPageBanner";
import { GalleryData } from "./data";
import Main from "./Sections/Main";

const Index = ({data}:{data:GalleryData}) => {
  return (
    <>
      <InnerPageBanner title={data.firstSection.title} />
      <Main data={data.secondSection}/>
    </>
  );
};

export default Index;

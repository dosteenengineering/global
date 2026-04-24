import InnerPageBanner from "../../common/InnerPageBanner";
import AboutDetails from "./Sections/AboutDetails";

const Index = () => {
  return (
    <>
      <InnerPageBanner
        title="25 Years of Building Systems Excellence Across UAE & Oman"
        titleMaxWidth="max-w-[1270px] 3xl:max-w-[1563px]"
        descriptionMaxWidth="max-w-[1395px]"
        description="Trusted provider of building systems, entrance solutions, fire protection, flood control, and access management — serving residential, commercial, and industrial clients since 1999."
        image="/assets/images/about/banner.jpg"
        imageAlt="About Us"
      />
      <AboutDetails />
    </>
  );
};

export default Index;

import HeroSection from "./Sections/HeroSection";
import AboutSlider from "./Sections/AboutSlider";
import SolutionsSection from "./Sections/SolutionsSection";
import ServiceSection from "./Sections/ServiceSection";
import IndustriesSection from "./Sections/IndustriesSection";
import BimVideoSection from "./Sections/BimVideoSection";
import FeaturedProjects from "./Sections/FeaturedProjects";
import ClientStoriesSection from "./Sections/ClientStoriesSection";
import BlogsSection from "./Sections/BlogsSection";
import TrustedClients from "./Sections/TrustedClients";
import CtaSection from "./Sections/CtaSection";
import WhyDosteen from "./Sections/WhyDosteen";

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutSlider />
      <SolutionsSection />
      <ServiceSection />
      <IndustriesSection />
      <WhyDosteen />
      <BimVideoSection />
      <FeaturedProjects />
      <ClientStoriesSection />
      <BlogsSection />
      <TrustedClients />
      <CtaSection />
    </>
  );
};

export default Index;

import HeroSection from "./Sections/HeroSection";
import AboutSlider from "./Sections/AboutSlider";
import SolutionsSection from "./Sections/SolutionsSection";
import ServiceSection from "./Sections/ServiceSection";
// import IndustriesSection from "./Sections/IndustriesSection";
import BimVideoSection from "./Sections/BimVideoSection";
import FeaturedProjects from "./Sections/FeaturedProjects";
import ClientStoriesSection from "./Sections/ClientStoriesSection";
import BlogsSection from "./Sections/BlogsSection";
import TrustedClients from "./Sections/TrustedClients";
import CtaSection from "./Sections/CtaSection";
import WhyDosteen from "./Sections/WhyDosteen";
import { Home } from "./data";
import { IndustriesPageData } from "../Services/data";
import { AllProjectData } from "../ProjectDetails/data";
import { AllBlogData } from "../Blog/data";
import { ClientPageData } from "../Partners/data";


function transformToSolutionsData(apiData: IndustriesPageData, data: Home) {
  console.log(apiData,"solutionsData")

  const industries = apiData?.thirdSection?.items ?? [];

  const tabs = industries.map((industry: any) => {
    const systems = industry.systemSection?.items ?? [];

    const rightItems = systems.map((system: any) => ({
      label: system.firstSection?.shortTitle || system.firstSection?.title || "",
      link: `/solutions/${industry.slug}/${system.slug}`,
    }));

    return {
      key: industry.slug,
      label: industry.title,
      leftTitle:
        industry.homeTitle,
      image: industry.firstSection?.homeImage ?? "",
      rightItems,
    };
  });


  return {
    mainTitle: data?.thirdSection?.title,
    secondTitle: data?.fourthSection.title ?? "",
    btnText: data?.fourthSection.buttonText,
    btnLink: data?.fourthSection.buttonLink,
    backgroundImage: data?.thirdSection.image,
    tabs,
  };
}

const Index = ({ data, solutionsRaw, projectsData, blogsDataRaw, clientsData }: { data: Home, solutionsRaw: IndustriesPageData, projectsData: AllProjectData, blogsDataRaw: AllBlogData, clientsData:ClientPageData }) => {
   console.log(`show data`,data.ninethSection)
  const solutionsData = transformToSolutionsData(solutionsRaw, data);

  const clientStoriesData = {
    title: data.tenthSection.title.toUpperCase(),
    stories: data.tenthSection.items.map((item: any, index: number) => {
      const [company, designation] = item.designation.split(" - ");
      return {
        key: `story-${index + 1}`,
        quote: item.message,
        name: item.name,
        company: company?.trim() ?? "",
        designation: designation?.trim() ?? "",
      };
    }),
  };

  const servicesData = {
    title: data.fifthSection.title,
    topRightSvg: "/assets/icons/bg-svg/top-right.svg",
    tabs: data.fifthSection.items.map((item: any, index: number) => ({
      key: `service-${index}`,
      label: item.title ?? "",
      image: item.image ?? "",
      description: item.description ?? "",
      buttonText: item.buttonText ?? "",
      buttonLink: item.buttonLink ?? "",
      svgPaths: [], // static — keep hardcoded in ServiceSection per tab key
    })),
  }

  const featuredProjects = projectsData?.projects?.filter((item) => (item.featured))


  const blogsData = {
    title:"BLOGS",
    posts: blogsDataRaw.blogs.map((blog, index: number) => ({
      key: `blog-${index + 1}`,
      title: blog.title ?? "",
      category: blog.category?.name ?? blog.category ?? "",
      date: blog.date
        ? new Date(blog.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).replace(/\//g, "-")
        : "",
      image: blog.thumbnail ?? "",
      href: `/blog/${blog.slug}`,
    })),
  }

  // console.log(clientsData)

  return (
    <>
      <HeroSection data={data.bannerSection} />
      <AboutSlider data={data.secondSection} />
      <SolutionsSection solutionsData={solutionsData} />
      <ServiceSection servicesData={servicesData} />
      {/* <IndustriesSection data={data.sixthSection} /> */}
      <FeaturedProjects featuredProjectsData={featuredProjects} sectionTitle={data.ninethSection.title} />
      <WhyDosteen data={data.seventhSection} />
      <BimVideoSection data={data.eighthSection} />
      <ClientStoriesSection clientStoriesDataFromApi={clientStoriesData} />
      <BlogsSection blogsData={blogsData}/>
      <TrustedClients data={data.twelthSection} clientsData={clientsData}/>
      <CtaSection data={data.lastSection} />
    </>
  );
};

export default Index;

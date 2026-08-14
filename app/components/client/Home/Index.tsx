import { Suspense } from "react";
import HeroSection from "./Sections/HeroSection";
import AboutSlider from "./Sections/AboutSlider";
import SolutionsSection from "./Sections/SolutionsSection";
import ServiceSection from "./Sections/ServiceSection";
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
  const industries = apiData?.thirdSection?.items ?? [];

  const tabs = industries.map((industry: any) => {
    const systems = industry.systemSection?.items ?? [];
    const rightItems = systems.map((system: any) => ({
      label: system.firstSection?.shortTitle || system.firstSection?.title || "",
      link: `/solutions/${system.slug}`,
    }));

    return {
      key: industry.slug,
      label: industry.title,
      leftTitle: industry.homeTitle,
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

// --- Async wrapper components, one per lazy-loaded section ---

async function SolutionsSectionWrapper({ solutionsPromise, data }: { solutionsPromise: Promise<IndustriesPageData>; data: Home }) {
  const solutionsRaw = await solutionsPromise;
  const solutionsData = transformToSolutionsData(solutionsRaw, data);
  return <SolutionsSection solutionsData={solutionsData} />;
}

async function FeaturedProjectsWrapper({ projectsPromise, sectionTitle }: { projectsPromise: Promise<AllProjectData>; sectionTitle: string }) {
  const projectsData = await projectsPromise;
  const featuredProjects = projectsData?.projects?.filter((item) => item.featured);
  return <FeaturedProjects featuredProjectsData={featuredProjects} sectionTitle={sectionTitle} />;
}

async function BlogsSectionWrapper({ blogsPromise, title }: { blogsPromise: Promise<AllBlogData>; title: string }) {
  const blogsDataRaw = await blogsPromise;
  const blogsData = {
    title,
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
  };
  return <BlogsSection blogsData={blogsData} />;
}

async function TrustedClientsWrapper({ clientsPromise, data }: { clientsPromise: Promise<ClientPageData>; data: Home['twelthSection'] }) {
  const clientsData = await clientsPromise;
  return <TrustedClients data={data} clientsData={clientsData} />;
}

// --- Main component ---

const Index = ({
  data,
  solutionsPromise,
  projectsPromise,
  blogsPromise,
  clientsPromise,
  isMobile,
}: {
  data: Home;
  solutionsPromise: Promise<IndustriesPageData>;
  projectsPromise: Promise<AllProjectData>;
  blogsPromise: Promise<AllBlogData>;
  clientsPromise: Promise<ClientPageData>;
  isMobile: boolean;
}) => {
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
      svgPaths: [],
    })),
  };

  return (
    <>
      <HeroSection data={data.bannerSection} isMobile={isMobile} />
      <AboutSlider data={data.secondSection} />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <SolutionsSectionWrapper solutionsPromise={solutionsPromise} data={data} />
      </Suspense>

      <ServiceSection servicesData={servicesData} />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <FeaturedProjectsWrapper projectsPromise={projectsPromise} sectionTitle={data.ninethSection.title} />
      </Suspense>

      <WhyDosteen data={data.seventhSection} />
      <BimVideoSection data={data.eighthSection} />
      <ClientStoriesSection clientStoriesDataFromApi={clientStoriesData} />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <BlogsSectionWrapper blogsPromise={blogsPromise} title={data.eleventhSection.title} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <TrustedClientsWrapper clientsPromise={clientsPromise} data={data.twelthSection} />
      </Suspense>
      <CtaSection data={data.lastSection} />
    </>
  );
};

export default Index;
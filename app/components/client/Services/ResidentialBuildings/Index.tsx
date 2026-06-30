"use client";

import { useEffect } from "react";
import ResidentialHero from "./Sections/ResidentialHero";
import DosteenSystems from "./Sections/DosteenSystems";
import CtaSection from "../../../common/CtaSection";
import { CtaData, ResidentialDevelopmentData } from "./data";
import WhyTrustDosteen from "./Sections/WhyTrustDosteen";
import FeaturedProjectsResidencial from "./Sections/FeaturedProjectsResidencial";
import { Project } from "../../Projects/data";

const ResidentialPage = ({ data, projectsData }: { data: ResidentialDevelopmentData, projectsData: Project[] }) => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const dosteenSystemsData = {
    title: data.systemSection.title,
    systems: data.systemSection.items.map((item, index) => ({
      id: index + 1,
      title: item.firstSection.title,
      image: item.firstSection.thumbnailImage || item.firstSection.image,
      description: item.firstSection.firstDescription,
      slug: `/solutions/residential-developments/${item.slug}`,
    })),
  };

  const thirdSectionData = {
    title: data.thirdSection.title,
    description: data.thirdSection.description,
    items: [
      {
        buttonText: data.thirdSection.buttonText,
        buttonLink: data.thirdSection.buttonLink,
      },
    ],
  };

  const whyTrustData = {
    title: data.fourthSection.title,
    stats: data.fourthSection.items.map((item, index) => ({
      id: index + 1,
      value: item.number,
      title: item.value,
      image: item.image,
    })),
  };


  const featuredProjects = (projectsData ?? []).filter(
    (project) =>
      project.featuredServices?.some(
        (s) => (typeof s === "object" ? s._id : s).toString() === data._id?.toString()
      )
  );


  return (
    <>
      <ResidentialHero firstSection={data.firstSection} secondSection={data.secondSection} />
      <DosteenSystems data={dosteenSystemsData} />
      <CtaSection {...thirdSectionData} descriptionWidth="max-w-[662px]" titleWidth="max-w-[23ch]" />
      <WhyTrustDosteen data={whyTrustData} />
      <FeaturedProjectsResidencial data={featuredProjects}/>
    </>
  );
};

export default ResidentialPage;

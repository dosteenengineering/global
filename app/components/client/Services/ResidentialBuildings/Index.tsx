"use client";

import { useEffect } from "react";
import ResidentialHero from "./Sections/ResidentialHero";
import DosteenSystems from "./Sections/DosteenSystems";
import CtaSection from "../../../common/CtaSection";
import { CtaData } from "./data";
import WhyTrustDosteen from "./Sections/WhyTrustDosteen";
import FeaturedProjectsResidencial from "./Sections/FeaturedProjectsResidencial";

const ResidentialPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <ResidentialHero />
      <DosteenSystems />
      <CtaSection
        {...CtaData}
        descriptionWidth="max-w-[662px]"
        titleWidth="max-w-[23ch]"
      />
      <WhyTrustDosteen />
      <FeaturedProjectsResidencial />
    </>
  );
};

export default ResidentialPage;

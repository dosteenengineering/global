
import InnerPageBanner2 from "../../common/InnerPageBanner2";
import { DynamicResourceHubData, Resource } from "./data";
import GuidesArticles from "./sections/GuidsArticles";
import NewsLetter from "./sections/NewsLetter";
import ResourseTab from "./sections/ResourceTab";
import SpecTools from "./sections/SpecTools";
import CtaSection from "../../common/CtaSection";
import {typeToId,typeToLabel,inferFileType,inferBimType} from "@/lib/resourceEssentials"

const Index = ({data}:{data:Resource}) => {

  const industryGuidesData = {
  title: data.thirdSection.title,

  items: data.thirdSection.items.map((item, index) => ({
    id: index + 1,
    featured: true,
    audience: item.title,
    type: item.pillText,
    title: item.subTitle,
    image: item.image,
    link: "#", // replace with actual link field if available
  })),
};

  const specificationToolsData = {
  title: data.fourthSection.title,

  items: data.fourthSection.items.map((item, index) => ({
    id: index + 1,
    title: item.title,
    desc: item.description,
    buttonText: item.buttonText,
    link: item.buttonLink,
  })),
};


  const resourcesKnowledgeHubData = {
    sectionTitle: data.secondSection.title,
    sectionDesc: data.secondSection.description,
    tabs: data.secondSection.items.map((item) => {
      const base = {
        id: typeToId(item.type),
        label: typeToLabel(item.type),
        icon: item.image,
        title: item.title,
        ...(item.description && { description: item.description }),
        ...(item.buttonText && item.buttonLink && {
          button: { text: item.buttonText.toUpperCase(), link: item.buttonLink },
        }),
      };

      switch (item.type) {
        case "technicalDocuments": {
          const filters = ["ALL", ...item.columnItems.map((col) => col.title)];
          const items = Object.fromEntries(
            item.columnItems.map((col, _) => [
              col.title,
              col.subItems.map((sub, i) => ({
                id: i + 1,
                type: inferFileType(sub.tags),
                title: sub.title,
                desc: sub.subTitle || "",
                tags: sub.tags || [],
                download: sub.file || "#",
              })),
            ])
          );
          return { ...base, filters, items };
        }

        case "bimCadFiles": {
          const filters = ["ALL", ...item.columnItems.map((col) => col.title)];
          const items = Object.fromEntries(
            item.columnItems.map((col) => [
              col.title,
              col.subItems.map((sub, i) => ({
                id: i + 1,
                type: inferBimType(col.title),
                title: sub.title,
                download: sub.file || "#",
              })),
            ])
          );
          return { ...base, filters, items };
        }

        case "videosDemos":
          return {
            ...base,
            items: item.videoItems.map((vid, i) => ({
              id: i + 1,
              title: vid.title,
              image: vid.image || "",
              tag: vid.tags || "",
              duration: vid.duration,
              videoLink: vid.videoUrl || "#",
            })),
          };

        case "brochures":
          return {
            ...base,
            items: item.brochureItems.map((br, i) => ({
              id: i + 1,
              type: "PDF",
              title: br.title,
              tags: br.tags,
              download: br.file || "#",
            })),
          };

        case "certifications":
          return {
            ...base,
            items: item.certificationItems.map((cert, i) => ({
              id: i + 1,
              type: cert.badgeText || "CERT",
              title: cert.title,
              desc: cert.description || "",
              download: cert.file || "#",
            })),
          };

        case "installationMaintenance":
          return {
            ...base,
            items: item.installItems.map((inst, i) => ({
              id: i + 1,
              type: inst.fileType || "PDF",
              title: inst.title,
              desc: inst.description || "",
              download: inst.file || "#",
            })),
          };

        default:
          return base;
      }
    }),
  };


  return ( 
    <>
      <InnerPageBanner2 {...data.bannerSection} />
      <ResourseTab data={resourcesKnowledgeHubData as DynamicResourceHubData} />
      <GuidesArticles data={industryGuidesData} />
      <SpecTools data={specificationToolsData} />
      <NewsLetter data={data.fifthSection} />
      <CtaSection {...data.lastSection} descriptionWidth="max-w-[70ch]" titleWidth="max-w-[20ch]"/>
    </>
   );
}
 
export default Index;
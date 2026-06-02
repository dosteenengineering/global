import SectionTitle from "@/app/components/common/animations/SectionTitle";
import type { ResourceHubTab } from "../data";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
type CertificationsComplianceTabProps = {
  tab: ResourceHubTab;
};

type CertificationItem = {
  id: number;
  type: string;
  title: string;
  desc: string;
  download: string;
};

const getCertificationItems = (items: ResourceHubTab["items"]): CertificationItem[] => {
  return Array.isArray(items) ? (items as CertificationItem[]) : [];
};

const CertificationsComplianceTab = ({ tab }: CertificationsComplianceTabProps) => {
  const items = getCertificationItems(tab.items);

  return (
    <div className="pt-[30px] md:pt-70 md:pt-100 xl:pt-120">
      {/* <h2 className="text-[24px] md:text-55 tracking-[-2%]     leading-[1.34] md:leading-[1.181818181818182] font-light -tracking-[0.02em] max-w-[35ch] text-secondary mb-7.5 md:mb-50">
        {tab.title}
      </h2> */}
         <SectionTitle title={tab.title} 
            className="text-[24px] md:text-55 leading-[1.34] md:leading-[1.181818181818182] font-light  text-secondary mb-7.5 md:mb-50 max-w-[35ch]" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">
        {items.map((item,index) => (
          <ResourceDownloadCard key={item.id} item={item} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
};

const ResourceDownloadCard = ({ item, delay }: { item: CertificationItem, delay: number }) => {

  return (
    <motion.article
      variants={moveUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}  className="h-[141px] md:h-auto bg-[#F4F4F4] px-2.5 md:px-25 md:px-40 py-[15px] md:py-6 md:py-35 xl:py-[61px] grid grid-cols-[50px_1fr] items-center  sm:grid-cols-[78px_1fr] lg:grid-cols-[101px_1fr] gap-[14px] md:gap-5 xl:gap-10 ">
       <div className={`w-12.5 sm:w-[78px] lg:w-[101px] h-12.5 sm:h-[78px] lg:h-[101px] flex items-center justify-center text-30 font-poppins font-[600] bg-[#1E702D1A] text-[#1E702D]`} >
        {item.type}
      </div>

      <div className="flex flex-col min-w-0 w-full justify-between gap-y-[5px] md:gap-y-2 xl:gap-y-[15px]">
        <div>
          <h3 className="text-[18px] md:text-30 leading-[1.56] tracking-[-2%]  md:leading-[1.333333333333333] font-poppins font-light text-secondary line-clamp-2 ">{item.title}</h3>
         </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 md:gap-20 h-fit mt-auto">
             <p className="text-[12px] md:text-19 leading-[1.526315789473684] font-poppins font-light text-paragraph line-clamp-1 -tracking-[0.02em]">{item.desc}</p>
      
          <a href={item.download} className="group inline-flex items-center gap-2.5 md:gap-3 xl:gap-20 text-[12px] md:text-[15px] leading-none font-poppins font-light uppercase text-primary" >
            <span className="uppercase font-normal leading-[1.67]">Download</span>
            <img src="/assets/icons/download.svg" width={"22px"} height={"20px"} alt="Download" className="object-contain w-[22px] h-[20px] transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default CertificationsComplianceTab;

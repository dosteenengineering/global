import type { ResourceHubTab } from "../data";
import { Download } from "lucide-react";
type InstallationMaintenanceTabProps = {
  tab: ResourceHubTab;
};

type InstallationMaintenanceItem = {
  id: number;
  type: string;
  title: string;
  desc: string;
  download: string;
};

const getInstallationMaintenanceItems = (items: ResourceHubTab["items"]): InstallationMaintenanceItem[] => {
  return Array.isArray(items) ? (items as InstallationMaintenanceItem[]) : [];
};

const InstallationMaintenanceTab = ({ tab }: InstallationMaintenanceTabProps) => {
  const items = getInstallationMaintenanceItems(tab.items);

  return (
    <div className="pt-70 md:pt-100">
      <h2 className="text-[38px] md:text-55 leading-[1.181818181818182] font-light -tracking-[0.02em] max-w-[35ch] text-secondary mb-50">
        {tab.title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">
        {items.map((item) => (
          <ResourceDownloadCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

const ResourceDownloadCard = ({ item }: { item: InstallationMaintenanceItem }) => {
  const isDwg = item.type.toUpperCase() === "DWG";

  return (
    <article className="bg-[#F4F4F4] px-25 md:px-40 py-6 md:py-35 grid grid-cols-[78px_auto] xl:grid-cols-[101px_auto] gap-5 xl:gap-10 ">
      <div className={`w-50 h-50 xl:w-[101px] xl:h-[101px] flex items-center justify-center text-30 font-poppins font-[600] 
      ${isDwg ? "bg-[#E3EFE8] text-[#147C39]" : "bg-[#E6EBFF] text-[#2563EB]"}`}
      >
        {item.type}
      </div>

      <div className="flex min-w-0 w-full justify-between gap-y-2 xl:gap-y-[15px]">
        <div>
          <h3 className="text-24 md:text-30 leading-[1.333333333333333] font-poppins font-light text-secondary mb-2 md:mb-[15px]">{item.title}</h3>
          <p className="text-16 md:text-19 leading-[1.526315789473684] font-poppins font-light text-paragraph">{item.desc}</p>
        </div>
        <div className="w-fit h-fit mt-auto">
          <a href={item.download} className="group inline-flex items-center gap-3 text-13 leading-none font-poppins font-light uppercase text-primary" >
            <span className="uppercase">Download</span>
            <Download className=" transition-transform duration-300 group-hover:translate-y-1" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default InstallationMaintenanceTab;

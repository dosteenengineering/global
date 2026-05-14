import type { ResourceHubTab } from "../data";

type CertificationsComplianceTabProps = {
  tab: ResourceHubTab;
};

const CertificationsComplianceTab = ({ tab }: CertificationsComplianceTabProps) => {
  return (
    <div className="pt-70 md:pt-100">
      <h2 className="text-[38px] md:text-55 leading-[1.1] font-poppins font-light text-paragraph max-w-[760px] mb-30">
        {tab.title}
      </h2>

      <div className="bg-[#F4F4F4] px-25 md:px-40 py-40">
        <p className="text-19 md:text-24 leading-[1.45] font-poppins font-light text-paragraph">
          Certifications & Compliance content will be added here.
        </p>
      </div>
    </div>
  );
};

export default CertificationsComplianceTab;

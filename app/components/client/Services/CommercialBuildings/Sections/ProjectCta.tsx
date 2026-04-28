import BorderButton from "@/app/components/common/BorderButton";
import { ProjectCtaData } from "../data";
import StatNoise1 from "@/app/components/common/noise/StatNoise1";

const ProjectCta = () => {
  return (
    <section className="pt-80 pb-140 3xl:pb-200">
      <div className="container w-full">
        <div className="flex lg:items-center items-start flex-col lg:flex-row gap-y-[40px] lg:justify-between p-60 relative">
          <StatNoise1 />
          <div
            className="text-30 leading-[1.33] tracking-[-0.02em] text-secondary max-w-[908px] font-light"
            dangerouslySetInnerHTML={{ __html: ProjectCtaData.description }}
          />
          <BorderButton
            text="Know More Us"
            borderColor="black"
            textColor="black"
            iconColor="primary"
            px="px-6 lg:px-[35px]"
            hoverBg="black"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectCta;

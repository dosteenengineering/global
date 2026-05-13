import SectionTitle from "@/app/components/common/animations/SectionTitle";
import PrimaryNoise2 from "@/app/components/common/noise/PrimaryNoise2";
import Image from "next/image";

const ComplianceSection = () => {
  return (
    <section className="relative w-full select-none overflow-hidden">
      <PrimaryNoise2 />
       <div className="absolute z-10 -right-[29.5%] -top-[38.5%] w-[42%] h-[90%] xl:w-[1200px] xl:h-[1225px] pointer-events-none scale-[1.1] origin-top-right ">
        <div className="relative w-full h-full animate-rotate-swing">
          <Image src="/assets/images/csi-specifications/shape-2.svg" alt="" fill className="object-contain object-right" />
          </div>
        </div>
      <div className="container py-140 3xl:py-150 relative z-10">
        <SectionTitle title="UAE & Oman Compliance — Built Into Every Specification"
         className="section-heading text-white mb-50 max-w-[26ch]"  />
        {/* <h2 className={`section-heading text-white uppercase whitespace-pre-line mb-20 3xl:mb-[26px] max-w-[26ch]`}>
          UAE & Oman Compliance — Built Into Every Specification
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr] 3xl:grid-cols-[967px_auto] gap-80 items-center">
          <div>
            <Image src="/assets/images/csi-specifications/compliance.jpg" alt="UAE & Oman Compliance — Built Into Every Specification" width={800} height={600} className="w-full h-auto object-cover rounded-lg mb-30" />
          </div>
          <div>
            <p className="text-description text-white">All Dosteen CSI specifications include the applicable UAE and Oman regulatory references in Part 1 (General) — so your specification team does not need to research compliance separately. For UAE projects this covers the UAE Fire and Life Safety Code (MOI), Dubai Civil Defence (DCD) and Abu Dhabi Civil Defence (ACD) approval requirements, and relevant Dubai Municipality building regulations. For Oman projects, Royal Oman Police (ROP) Civil Defence requirements and Oman Municipality building</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComplianceSection;
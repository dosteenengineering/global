import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
const DownloadSection = () => {
  return ( 
    <section className="relative">
     <SecondaryNoise />
      <div className="container">
        <SectionTitle className="section-heading max-w-[30ch] mb-50" title={"Download Dosteen CSI Specification Sections"} />
      </div>
    </section>
   );
}
 
export default DownloadSection;
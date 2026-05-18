import SectionTitle from "@/app/components/common/animations/SectionTitle";
import StatNoise3 from "@/app/components/common/noise/StatNoise3";
import Image from "next/image";
interface WhyChooseProps {
  data: {
    sectionTitle: string;
    sectionDesc: string;
    items: {
      id: number;
      title: string;
      icon: string;
      image: string;
    }[];
  };
}
const WhyChoose = ({ data }: WhyChooseProps) => {
  return (
    <section className="relative py-100 lg:py-150 3xl:py-200 overflow-hidden">
      <div className="container">
        <SectionTitle title={data.sectionTitle} className="section-heading max-w-[1290px] mb-50 uppercase" />
        <div className="max-w-[967px] 3xl:mr-[285px] ml-auto">
          <p className="text-24 lg:text-30 leading-[1.333333333333333] font-light tracking-[-0.02em] mb-50">
            {data.sectionDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30">
          {data.items.map((item) => (
            <div key={item.id} className="group bg-white/10 relative overflow-hidden h-[300px] 2xl:h-[416px] p-40 3xl:p-50 cursor-pointer">
              <div className="relative z-[5] w-full h-full flex flex-col justify-between">
                <div className="w-100 h-100 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-white/2 group-hover:to-white/20 flex items-center justify-center mb-6 group-hover:backdrop-blur-[20px] transition-all duration-300 ease-in-out">
                  <img src="/assets/images/garage-doors/grd-stroke.svg" className="w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100" alt="" />
                  <img src={item.icon} alt={item.title} width={"64px"} height={"64px"} className="w-16 h-16 group-hover:invert-1 group-hover:brightness-1000 transition-all duration-300 ease-in-out" />
                </div>
                <h3 className="text-30 leading-[1.333333333333333] text-[#161616] group-hover:text-white font-light">{item.title}</h3>
              </div>
              <Image src={item.image} alt={item.title} width={1000} height={1000} className="absolute bottom-0 left-0 translate-y-full group-hover:translate-0 w-full h-full object-cover z-[-1] transition-all duration-700 ease-in-out" />
              <div className="absolute bottom-0 left-0 z-2 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                style={{
                  backgroundImage: "url(/assets/noise/mono-2.png)",
                  backgroundRepeat: "repeat-x",
                  backgroundSize: "contain",
              
                }}
              />
              <div className="absolute inset-0 h-full w-full z-1">
                <StatNoise3 />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
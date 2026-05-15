import BorderButton from "@/app/components/common/BorderButton";
import SectionTitle from "../../../common/animations/SectionTitle";
interface Props {
  data: {
    title: string;
    items:{
      id: number;
      title: string;
      desc: string;
      buttonText: string;
    }[];
  }
}
const SpecTools = ({ data }: Props) => {
  return ( 
    <section className="py-140 2xl:py-200">
      <div className="container">
        <SectionTitle text={data.title} className="text-left section-heading uppercase mb-50" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-30">
          {
            data.items.map(item => (
              <div key={item.id} className="border border-bdr-gray px-5 py-6 md:px-8 md:py-10 2xl:py-50 2xl:px-10 relative group overflow-hidden spec-card">
                {/* <img src={item.image} alt={item.title} className="w-full h-auto object-cover" /> */}
                <h3 className="text-30 leading-[1.333333333333333] font-light mb-3 xl:mb-4 2xl:mb-20 group-hover:text-white transition-all ease-in-out duration-700">{item.title}</h3>
                <p className="text-19 leading-[1.526315789473684] font-light text-paragraph mb-2 xl:mb-4 2xl:mb-30 group-hover:text-white transition-all ease-in-out duration-700">{item.desc}</p>
                <BorderButton text={item.buttonText} href="#" className="px-5 py-2 w-fit group-hover:text-white group-hover:border-white group-hover:[&_img]:brightness-0 group-hover:[&_img]:invert" textColor="black" borderColor="black" hoverBg="black" />
              </div>
            ))
          }
        </div>
      </div>
    </section>
   );
}
 
export default SpecTools;

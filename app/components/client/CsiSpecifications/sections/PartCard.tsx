
interface PartCardProps {
  part: string;
  title: string;
  shortDesc?: string;
  description: string;
  isEven?: boolean;
  index: number;
}

const PartCard = ({ part, title, shortDesc, description, isEven, index }: PartCardProps) => {
  return (
    <div className="relative overflow-hidden group-[crd]:">
      <div className={`absolute inset-0 z-0  ${isEven ? 'bg-gradient-to-t from-[#1853D6] to-[#022E9E]' : 'backdrop-blur-[20px] bg-gradient-to-r from-white/2 to-white/20'}`} ></div>
      <div className={`xl:pt-50 xl:pb-15 relative z-10 border border-white/30 first:pl-3 
       ${index === 0 ? "xl:px-50 rounded-tl-30 rounded-tr-30" : "xl:pl-60 xl:pr-40"} 
         ${isEven ? 'even:border-transparent bg-gradient-to-b from-[#1853D6] to-[#022E9E] xl:pl-60 xl:pr-40' : 'xl:px-50'}`}>
        <div className={`${!isEven && 'bg-white/8  absolute inset-0 z-0 '}`}></div>
        <div className="px-30 py-2 text-center rounded-pill border border-white text-white w-fit rounded-full">
          <p className="text-19 leading-[1.526315789473684] tracking-[0.02em]">{part}</p>
        </div>
        <div className="relative z-10">
          <h3 className="text-55 leading-[1.181818181818182] text-white font-light mt-60 mb-2 lg:mb-3 xl:mb-5">{title}</h3>
          <h4 className="text-30 text-white font-light">{shortDesc}</h4>
        </div>

      </div>
      <div className={`px-3 py-5  xl:py-15 relative z-10  ${index === 0 ? "xl:px-50 rounded-tl-30 rounded-tr-30" : "xl:pl-60 xl:pr-40"}`}>
        <p className="text-description text-white font-[200]">{description}</p>
      </div>
    </div>
  );
}

export default PartCard;
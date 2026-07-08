import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";

interface PartCardProps {
  part: string;
  title: string;
  shortDesc?: string;
  description: string;
  isEven?: boolean;
  index: number;
  delay?: number;
}

const PartCard = ({ part, title, shortDesc, description, isEven, index, delay }: PartCardProps) => {
  return (
    <motion.div variants={moveUp(delay)} initial="hidden" whileInView={"show"} viewport={{ once: true }} className="relative overflow-hidden group-[crd]:">
      <div className={`absolute inset-0 z-0  ${isEven ? 'bg-gradient-to-t from-[#1853D6] to-[#022E9E]' : 'backdrop-blur-[20px] bg-gradient-to-r from-white/2 to-white/20'}`} ></div>
      <div className={`pt-30 3xl:pt-50 pb-5 lg:pb-7.5 3xl:md:pb-15 relative z-10 border  first:pl-3 
       ${index === 0 ? "px-30 3xl:px-50 rounded-tl-30 rounded-tr-30" : "pl-40 lg:pl-7.5 3xl:pl-60 3xl:pr-40"} 
         ${isEven ? 'even:border-transparent bg-gradient-to-b from-[#1853D6] to-[#022E9E] pl-30 3xl:pl-60 pr-20 xl:pr-40' : 'px-30 3xl:px-50 border-white/20'}`}>
        <div className={`${!isEven && 'bg-white/8  absolute inset-0 z-0 '}`}></div>
        <div className="px-30 3xl:px-[28px]  py-2 3xl:py-[4.5px] text-center rounded-pill border border-white text-white w-fit rounded-full">
          <p className="text-19 leading-[1.526315789473684] tracking-[0.02em] font-light">{part}</p>
        </div>
        <div className="relative z-10">
          <h3 className="text-55 leading-[1.181818181818182] text-white font-light mt-7.5 xl:mt-5 3xl:mt-60 mb-2.5 md:mb-2 lg:mb-3 2xl:mb-5">{title}</h3>
          <h4 className="text-30 text-white font-light">{shortDesc}</h4>
        </div>

      </div>
      <div className={`px-3 py-5 py-30  3xl:py-15 relative z-10  ${index === 0 ? "px-30 3xl:px-50 rounded-tl-30 rounded-tr-30" : "pl-30 3xl:pl-60 pr-20 xl:pr-40"}`}>
        <p className="text-description text-white font-[200]">{description}</p>
      </div>
    </motion.div>
  );
}

export default PartCard;
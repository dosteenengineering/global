import StatNoise3 from "@/app/components/common/noise/StatNoise3";
interface Props {
  title: string;
}

const FeaturesCard = ({ title }: Props) => {
  return (
    <div className="relative p-5 xl:p-30">
      <StatNoise3 />
      <div className="flex gap-5 md:block items-center">
        <div className="w-[50px] h-[50px] md:w-50 md:h-50  bg-gradient-to-b from-[#1853D6] to-[#022E9E] flex items-center justify-center rounded-full mb-0 md:mb-2 xl:mb-[15px]">
      <img src="./assets/icons/circle-check.svg" alt="" />
      </div>
      <h3 className="text-30 font-light">{title}</h3>
      </div>
    </div>
  );
}

export default FeaturesCard;
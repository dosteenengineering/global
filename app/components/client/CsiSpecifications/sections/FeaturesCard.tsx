import StatNoise3 from "@/app/components/common/noise/StatNoise3";
interface Props {
  title: string;
}

const FeaturesCard = ({ title }: Props) => {
  return (
    <div className="relative p-4 xl:p-30">
      <StatNoise3 />
      <div className="w-50 h-50 bg-gradient-to-b from-[#1853D6] to-[#022E9E] flex items-center justify-center rounded-full mb-2">
      <img src="./assets/icons/circle-check.svg" alt="" />
      </div>
      <h3 className="text-30 font-light">{title}</h3>
    </div>
  );
}

export default FeaturesCard;
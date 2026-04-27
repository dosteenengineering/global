"use client";
import Image from "next/image";
import { MissionVisionData } from "../data";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

function Card({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative flex flex-col gap-8 p-60 3xl:pb-[63px] w-full">
      <SecondaryNoise />
      <div className="relative z-10 flex flex-col gap-8">
        <div className="w-[100px] h-[100px] relative mb-100">
          <Image src={icon} alt={title} fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-20">
          <h2 className="section-heading">
            {title}
          </h2>
          <p className="text-description text-paragraph">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MissionVision() {
  const { mission, vision } = MissionVisionData;

  return (
    <section className="bg-white w-full select-none">
      <div className="container w-fullborder-[#c2c2c2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 border-b border-[#c2c2c2] py-140 3xl:py-200 ">
          <div>
              <Card
                icon={mission.icon}
                title={mission.title}
                description={mission.description}
              />
          </div>
          <div className="pt-100">
              <Card
                icon={vision.icon}
                title={vision.title}
                description={vision.description}
              />
          </div>
        </div>
      </div>
    </section>
  );
}

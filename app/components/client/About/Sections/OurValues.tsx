"use client";
import Image from "next/image";
import { ValuesData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-30">
      <h3 className="text-55 leading-[1.1818] uppercase text-secondary">
        {title}
      </h3>
      <p className="text-description text-paragraph max-w-[540px]">
        {description}
      </p>
    </div>
  );
}

export default function OurValues() {
  return (
    <section className="bg-white w-full select-none overflow-hidden relative">
      <div className="absolute -top-13 left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={634}
          height={500}
          className="object-contain w-[320px] sm:w-[380px] md:w-[440px] lg:w-[500px] xl:w-[450px] 2xl:w-[500px] 3xl:w-[634px]"
        />
      </div>
      <div className="container pt-100 pb-140 3xl:pb-200 w-full">
        <div className="flex flex-col lg:flex-row gap-80 3xl:gap-120">
          {/* Left — sticky title */}
          <div className="shrink-0">
            <SectionTitle
              text={ValuesData.title}
              className="section-heading text-secondary uppercase"
            />
          </div>

          {/* Right — 2-col grid of value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] gap-x-60 3xl:gap-x-[125px] gap-y-60 3xl:gap-y-80">
            {ValuesData.items.map((item) => (
              <ValueCard
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

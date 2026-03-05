import Image from "next/image";
import BorderButton from "@/app/components/common/BorderButton";

export default function Hero() {
  return (
    <section className="relative h-[70vh] lg:h-[92vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/home/hero/herobg.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="container relative z-10 flex h-full items-end pb-150 3xl:pb-[130px]">
        <div className="max-w-[964px]">
          {/* Title */}
          <h1 className="text-[#FFFBFB] max-w-[380px] md:max-w-[520px] text-[36px] md:text-[50px] lg:text-[70px] xl:text-95 lg:max-w-[740px] xl:max-w-[864px] 2xl:max-w-[none] font-[700] uppercase font-helvetica leading-[1]">
            Where Engineering Meets Assurance
          </h1>

          {/* Button */}
          <div className="mt-[50px] w-fit">
            <BorderButton
              text="Request a Quote"
              borderColor="white"
              textColor="white"
              iconColor="primary"
              px="px-4 2xl:px-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

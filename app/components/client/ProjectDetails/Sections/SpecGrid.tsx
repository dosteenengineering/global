import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

export default function SpecGrid({
  specs,
}: {
  specs: { label: string; value: string }[];
}) {
  return (
    <div className="relative">
      <SecondaryNoise />
      <div className="relative px-4 pt-5 pb-[5px] md:p-50 grid grid-cols-2 sm:grid-cols-4 gap-y-[15px] md:gap-y-60 ">
        <div className="hidden lg:blockabsolute h-px bg-[#c2c2c2] top-1/2 -translate-y-1/2 left-50 right-50" />
        {specs.map(({ label, value }) => (
          <div key={label} className="text-paragraph tracking-[-0.02em] border-b border-bdr-gray last:border-b-0 [&:nth-last-child(2)]:border-b-0">
            <p className="text-15 leading-[1.666] font-light">{label}</p>
            <p className="text-[15px] lg:text-19 leading-[1.8668] md:leading-[1.5263] font-bold pb-[15px] md:pb-0">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

export default function SpecGrid({
  specs,
}: {
  specs: { label: string; value: string }[];
}) {
  return (
    <div className="relative">
      <SecondaryNoise />
      <div className="relative p-50 grid grid-cols-2 sm:grid-cols-4 gap-y-60">
        <div className="absolute h-px bg-[#c2c2c2] top-1/2 -translate-y-1/2 left-50 right-50" />
        {specs.map(({ label, value }) => (
          <div key={label} className="text-paragraph tracking-[-0.02em]">
            <p className="text-15 leading-[1.666] font-light">{label}</p>
            <p className="text-19 leading-[1.5263] font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

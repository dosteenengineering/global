import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";

export default function SystemsTable({
  rows,
}: {
  rows: { key: string; value: string }[];
}) {
  return (
    <div className="relative">
      <SecondaryNoise />
      <div className="relative overflow-hidden py-60 mx-70">
        <h3 className="text-55 text-secondary font-light tracking-[-0.02em] leading-[1.1818] mb-40">
          Systems &amp; Products
        </h3>
        <div className="divide-y divide-[#c2c2c2]">
          {rows.map(({ key, value }) => (
            <div
              key={key}
              className="grid grid-cols-[34%_66%] pb-30 pt-30 3xl:pb-[36px] 3xl:pt-[36px] first:pt-0 last:pb-0"
            >
              <span className="text-19 leading-[1.52] tracking-[0.02em] text-secondary font-medium max-w-[200px]">
                {key}
              </span>
              <span className="text-description text-paragraph">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

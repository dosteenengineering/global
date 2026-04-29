import Image from "next/image";
import { softwareToolsSection, SoftwareTool } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";

// ── Single tool row ───────────────────────────────────────────────────────────

function ToolRow({
  tool,
  isFirst,
  isLast,
  index,
}: {
  tool: SoftwareTool;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}) {
  return (
    <div
      className={`grid grid-cols-[233px_1px_1fr] border-[#c2c2c2]
        ${isFirst ? "border-t" : ""}
        border-b
      `}
    >
      {/* Left col — icons + label */}
      <div className="flex flex-col justify-center pl-30">
        <div>
          <Image
            src={tool.icon}
            alt="icon"
            width={150}
            height={150}
            className={`object-contain w-auto ${index === 2 ? "h-[129px]" : "h-[50px]"}`}
          />
        </div>
      </div>

      {/* Vertical divider */}
      <div className="bg-[#c2c2c2] self-stretch" />

      {/* Right col — title + description */}
      <div className="flex flex-col justify-center pl-50 py-60">
        <h3 className="text-secondary text-30 font-light leading-[1.333] mb-20 tracking-[-0.02em]">
          {tool.title}
        </h3>
        <p className="text-paragraph text-description">{tool.description}</p>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function SoftwareTools() {
  const { title, description, tools } = softwareToolsSection;

  return (
    <section className="w-full py-140 3xl:py-200 relative">
      <div className="absolute bottom-[-30.4%] left-0 pointer-events-none h-full">
        <Image
          src="/assets/images/bim/tools/bg-lines.svg"
          alt="decorative lines"
          width={1200}
          height={1200}
          className="object-cover w-full h-full 3xl:w-[640px]"
        />
      </div>
      <div className="container">
        <div className="flex gap-140 3xl:gap-[142px] items-start">
          {/* Left — title + description */}
          <div className="shrink-0 w-[40.65%]">
            <SectionTitle
              title={title}
              className="mb-50 max-w-[13ch] section-heading"
            />
            <p className="text-secondary text-30 leading-[1.333] font-light max-w-[40ch]">
              {description}
            </p>
          </div>

          {/* Right — tools table */}
          <div className="flex-1 min-w-0">
            {tools.map((tool, i) => (
              <ToolRow
                index={i}
                key={tool.id}
                tool={tool}
                isFirst={i === 0}
                isLast={i === tools.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

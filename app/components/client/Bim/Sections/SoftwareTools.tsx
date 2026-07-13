"use client"
import Image from "next/image";
import { softwareToolsSection, SoftwareTool, Capability } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { del } from "framer-motion/client";

// ── Single tool row ───────────────────────────────────────────────────────────

function ToolRow({
  tool,
  isFirst,
  isLast,
  index,
  delay,
}: {
  tool: Capability['fifthSection']['items'][0];
  isFirst: boolean;
  isLast: boolean;
  index: number;
  delay: number;
}) {
  return (
    <motion.div variants={moveUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true }}
      className={`grid grid-cols-[105px_1px_1fr] md:grid-cols-[233px_1px_1fr] border-[#c2c2c2]
        ${isFirst ? "border-t" : ""}
        border-b
      `}
    >
      {/* Left col — icons + label */}
      <div className="flex flex-col justify-center md:pl-30">
        <div>
          {
            tool.image && (
              <Image
                src={tool.image}
                alt={tool.imageAlt}
                width={150}
                height={150}
                className={`object-contain w-auto ${index === 2 ? "h-[74px] md:h-[129px]" : "h-[29px] md:h-[50px]"}`}
              />
            )
          }
        </div>
      </div>

      {/* Vertical divider */}
      <div className="bg-[#c2c2c2] self-stretch" />

      {/* Right col — title + description */}
      <div className="flex flex-col justify-center p-5 md:pl-50 md:py-60">
        <h3 className="text-secondary text-30 font-light leading-[1.333] mb-2.5 md:mb-20 tracking-[-0.02em]">
          {tool.title}
        </h3>
        <p className="text-paragraph text-description">{tool.description}</p>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function SoftwareTools({ data }: { data: Capability['fifthSection'] }) {
  // const { title, description, tools } = softwareToolsSection;

  const tools = data.items.map((item) => ({
    _id: item._id,
    image: item.image,
    imageAlt: item.imageAlt,
    title: item.title,
    description: item.description,
  }));

  return (
    <section className="w-full py-140 3xl:py-200 relative overflow-hidden">
      <div className="container h-full">
        <div className="absolute top-[-10%] left-[-38%] lg:top-[-10%] lg:left-auto lg:right-[-20%] xl:right-[-20%] xl:left-auto lg:top-unset lg:bottom-0 xl:top-[-5%] 2xl:top-auto 3xl:bottom-[-5%] left-[-10%] 2xl:left-[-10%] pointer-events-none z-50 w-auto h-[400px] lg:h-[600px] xl:w-[650px] aspect-square 2xl:h-[780px] 3xl:scale-150 pointer-events-none">
          <Image src="/assets/shapes/bim-shape-2.svg" alt="decorative lines" width={1200} height={1200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-wrap gap-7.5 lg:gap-140 3xl:gap-[142px] items-start h-full">
          {/* Left — title + description */}
          <div className="2xl:shrink-0 w-full 2xl:w-[40.65%] relative h-full ">
            <SectionTitle title={data.title} className="mb-[20px] sm:mb-5 2xl:mb-50 lg:max-w-[14ch] section-heading-90" />
            <SectionDescription text={data.description} className="text-secondary !text-30 !leading-[1.333] font-light max-w-[40ch]" />
          </div>

          {/* Right — tools table */}
          <div className="flex-1 w-full 2xl:min-w-0">
            {tools.map((tool, i) => (
              <ToolRow
                index={i}
                key={i}
                tool={tool}
                isFirst={i === 0}
                isLast={i === tools.length - 1}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

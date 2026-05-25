"use client";
import Image from "next/image";
import { valuedClientsData } from "../data";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";
import { motion } from "framer-motion";
import { fadeIn, moveUp, zoomIn } from "@/app/components/motionVariants";

const LOGO_STAGGER_COLUMNS = 6;
const LOGO_STAGGER_STEP = 0.08;

export default function ValuedClients() {
  const { title, description, footnote, regions } = valuedClientsData;

  return (
    <section className="py-140 3xl:py-200 relative overflow-hidden">
      <div className="absolute top-[-18%] right-[-35%] 3xl:top-[-19%] 3xl:right-[-38%] w-full h-full max-h-[900px] max-w-[900px] 3xl:max-h-[1200px] 3xl:max-w-[1200px] z-0">
        <Image
          src="/assets/images/partners/clients/bg-svg.svg"
          alt="faq-question"
          fill
          className="object-contain"
        />
      </div>
      <div className="container">
        {/* Header */}
        <SectionTitle title={title} className="section-heading mb-30" />
        <SectionDescription
          text={description}
          className="text-30 leading-[1.33] text-secondary tracking-[-0.02em] mb-80"
        />

        {/* Regions */}
        <div className="flex flex-col gap-y-80">
          {regions.map((region,index) => (
            <div key={region.label}>
              {/* Pill */}
              <motion.div variants={moveUp(index*0.12)} initial="hidden" whileInView={"show"} viewport={{ once: true }} className="flex items-center justify-center w-[115px] h-[50px] border border-primary rounded-full mb-30">
                <span className="text-30 text-secondary tracking-[-0.02em] leading-[1.33] font-light uppercase">
                  {region.label}
                </span>
              </motion.div>

              {/* Logo grid — 3 cols → 4 cols → 6 cols */}
              <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 border-t border-l border-[#c2c2c2]">
                {region.logos.map((logo, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-center border-b border-r border-[#c2c2c2] h-[185px] px-30"
                  >
                    <motion.div variants={zoomIn((i % LOGO_STAGGER_COLUMNS) * LOGO_STAGGER_STEP)} initial="hidden" whileInView={"show"} viewport={{ once: true }}>
                    <Image
                      src={logo.src}
                      alt=""
                      width={800}
                      height={400}
                      className="xl:h-[80px] 3xl:h-[100px] max-h-[100px] max-w-[200px] w-auto h-auto object-contain pointer-events-none"
                    />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="mt-80 text-30 leading-[1.33] tracking-[-0.02em] text-secondary font-light"
          dangerouslySetInnerHTML={{ __html: footnote }}
        />
      </div>
    </section>
  );
}

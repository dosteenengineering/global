"use client";
import "swiper/css";
import { motion } from "framer-motion";
import { slidesData } from "../data";
import Image from "next/image";
import { moveUp } from "@/app/components/motionVariants";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { SectionDescription } from "@/app/components/common/animations/SectionDescription";

export default function AboutDetails() {
  return (
    <section className="bg-white w-full relative select-none overflow-hidden">
      <div className="absolute -top-88 lg:-top-61 left-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={600}
          height={500}
          className="object-contain 2xl:w-[500px] 3xl:w-[600px]"
        />
      </div>

      <div className="lg:pl-[15.3%] 3xl:pl-[21.3%] pt-120 px-[15px] lg:px-0 container w-full">
        <SectionTitle
          text="Dosteen: A UAE & Oman Building Systems Engineering Company"
          className="section-heading text-secondary uppercase mb-50"
        />

        <SectionDescription
          text="Dosteen is a multi-discipline building systems engineering company headquartered in Dubai, UAE, with operations across Oman and the broader MENA region. 

Founded in 1999, Dosteen designs, supplies, and installs engineered solutions for access control, entrance systems, fire protection, flood management, parking systems, architectural shading, and industrial doors. Serving developers, contractors, facility managers, and government entities across residential, commercial, healthcare, and industrial sectors, Dosteen delivers projects with ISO-certified quality and BIM-integrated engineering."
          className="text-19 text-paragraph font-poppins font-light leading-[1.52] whitespace-pre-line break-words"
        />
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
interface Props {
  title: string;  
  image: string;
}


export default function InnerPageBanner2({ title, image }: Props) {
  return (
    <section className="relative w-full h-[390px] md:h-[550px] overflow-hidden">
      {/* Background image */}
      <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }} >
        <Image src={image} alt="Projects" fill priority className="object-cover" />
      </motion.div>

      {/* Black overlay gradient */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)" }} />

      {/* Container with title pinned to bottom-74px */}
      <div className="container relative h-full">
        <h1 className="absolute text-white banner-heading leading-[1] uppercase bottom-[30px] md:bottom-70 3xl:bottom-[74px] -translate-[15px] pl-[15px]">
          {title}
        </h1>
      </div>
    </section>
  );
}

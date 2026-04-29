"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Divider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <div ref={ref} className="relative h-[2px] w-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
        className="h-[2px] w-full bg-[#c2c2c2] origin-center"
      />
    </div>
  );
}

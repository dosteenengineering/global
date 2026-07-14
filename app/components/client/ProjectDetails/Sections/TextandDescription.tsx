import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";


const TextandDescription = ({
  title,
  description,
  delay = 0.2,
}: {
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <div>
      <SectionTitle
        className="text-55 leading-[1.1818] text-secondary font-light tracking-[-0.02em] mb-2.5 xl:mb-40"
        title={title}
      />
      <motion.div variants={moveUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <div
          className="text-19 leading-[1.52] font-light text-paragraph tracking-[0.02em]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.div>
    </div>
  );
};

export default TextandDescription;

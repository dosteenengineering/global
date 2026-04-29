import SectionTitle from "@/app/components/common/animations/SectionTitle";

const TextandDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <SectionTitle
        className="text-55 leading-[1.1818] text-secondary font-light tracking-[-0.02em] mb-40"
        title={title}
      />
      <div
        className="text-19 leading-[1.52] font-light text-paragraph tracking-[0.02em]"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default TextandDescription;

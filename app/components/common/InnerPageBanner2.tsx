import Image from "next/image";
interface Props {
  title: string;
  image: string;
}

export default function InnerPageBanner2({ title, image }: Props) {
  return (
    <section className="relative w-full h-[550px] overflow-hidden">
      {/* Background image */}
      <Image
        src={image}
        alt="Projects"
        fill
        priority
        className="object-cover"
      />

      {/* Black overlay gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)" }}
      />

      {/* Container with title pinned to bottom-74px */}
      <div className="container relative h-full">
        <h1 className="absolute text-white section-heading uppercase bottom-70 3xl:bottom-[74px]">
          {title}
        </h1>
      </div>
    </section>
  );
}

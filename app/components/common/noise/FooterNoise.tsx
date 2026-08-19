interface FooterNoiseProps {
  className?: string;
}

export default function FooterNoise({ className = "" }: FooterNoiseProps) {
  return (
    <>
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `url("/assets/noise/privacy-noise-optimized.webp")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />
    </>
  );
}
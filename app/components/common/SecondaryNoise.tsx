interface SecondaryNoiseProps {
  className?: string;
}

export default function SecondaryNoise({ className = "" }: SecondaryNoiseProps) {
  return (
    <>
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `url("/assets/noise/snoise.svg")`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px",
        }}
      />
    </>
  );
}
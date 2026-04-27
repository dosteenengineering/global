interface SecondaryNoiseProps {
  className?: string;
}

export default function SecondaryNoise({ className = "" }: SecondaryNoiseProps) {
  return (
    <>
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `url("/assets/noise/secondary-noise.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />
    </>
  );
}
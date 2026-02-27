interface PrimaryNoiseProps {
  className?: string;
}

export default function PrimaryNoise({ className = "" }: PrimaryNoiseProps) {
  return (
    <>
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `url("/assets/noise/pnoise1.svg")`,
          backgroundRepeat: "repeat",
          backgroundSize: "101px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#022E9E]/90" />
    </>
  );
}
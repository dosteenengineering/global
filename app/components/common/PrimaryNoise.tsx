export default function PrimaryNoise({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: "linear-gradient(180deg, #1853D6 0%, #022E9E 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/assets/noise/primary-noise.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "250px",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
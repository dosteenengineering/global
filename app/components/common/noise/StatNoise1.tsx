export default function StatNoise1() {
  return (
    <>
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(270deg, rgba(24, 83, 214, 0.05) 7.21%, rgba(24, 83, 214, 0.16) 29.81%, rgba(2, 46, 158, 0.05) 76.92%)",
        }}
      />
      <div
        className="absolute inset-0 z-2"
        style={{
          backgroundImage: "url(/assets/noise/banner-noise.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "201px",
          mixBlendMode: "multiply",
          opacity: 0.3,
        }}
      />
    </>
  );
}

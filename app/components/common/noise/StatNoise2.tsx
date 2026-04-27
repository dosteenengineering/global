export default function StatNoise2() {
  return (
    <>
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(270deg, rgba(2, 46, 158, 0.05) 23.08%, rgba(24, 83, 214, 0.16) 70.19%, rgba(24, 83, 214, 0.05) 92.79%)",
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

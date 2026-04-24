export default function BannerNoise() {
  return (
    <>
      <div
        className="absolute inset-0 z-1"
        style={{ background: "linear-gradient(180deg, rgba(24, 83, 230, 0.55) 14.42%, rgba(2, 46, 158, 0) 100%)" }}
      />
      <div className="absolute left-0 bottom-0 right-0 bg-linear-to-t from-white/70 to-transparent z-20 h-[40px] w-full" />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/assets/noise/banner-noise.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "150px",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
    </>
  );
}

import Link from "next/link";
import "./globals.css";
import BorderButton from "./components/common/BorderButton";
import Image from "next/image";
export const metadata = {
  title: "Page not found | Dosteen",
  description: "Engineering peace of mind",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white text-[#10202C] flex items-center font-[var(--font-dm-sans)]">

      <div
        aria-hidden
        className="grid-magnify pointer-events-none absolute inset-0 bg-[linear-gradient(#EAF1F4_1px,transparent_1px),linear-gradient(90deg,#EAF1F4_1px,transparent_1px)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_90%)] [-webkit-mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_90%)]"
        style={{
          backgroundSize: "40px 40px",
          animation:
            "lens-drift 26s cubic-bezier(0.45,0,0.15,1) infinite, grid-breathe 18s cubic-bezier(0.45,0,0.15,1) infinite",
        }}
      />
      <div className="absolute top-[-41%] md:-top-88 lg:-top-73 left-[-97px] md:left-0 lg:left-[-100px] xl:top-[-10%] xl:left-0 2xl:top-[-30%] 3xl:-top-73 3xl:left-0 pointer-events-none">
        <Image src="/assets/icons/bg-svg/top-left-animated.svg" alt="decorative lines" width={897} height={896}
          className="object-contain min-w-[280px] w-[53.14%] sm:w-[250px] xl:w-[300px] 2xl:w-[500px] 3xl:w-full h-full "
        />
      </div>
      <div className="absolute rotate-180 bottom-[-41%] md:-bottom-88 lg:-bottom-73 right-[-97px] md:right-0 lg:right-[-100px] xl:bottom-[-10%] xl:right-0 2xl:bottom-[-30%] 3xl:-bottom-73 3xl:right-0 pointer-events-none">
        <Image
          src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines"
          width={897}
          height={896}
          className="object-contain min-w-[280px] w-[53.14%] sm:w-[250px] xl:w-[300px] 2xl:w-[500px] 3xl:w-full h-full"
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10 flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-3 text-xs tracking-[0.22em] text-[#4B6B78] uppercase">
          <span className="inline-block h-px w-8 bg-[#B8C6CC]" />
          PAGE NOT FOUND
          <span className="inline-block h-px w-8 bg-[#B8C6CC]" />
        </div>

        <svg
          viewBox="0 0 600 250"
          className="w-full max-w-[520px] h-auto"
          role="img"
          aria-label="404 rendered as an engineering dimension drawing"
        >
          <text
            x="50%"
            y="215"
            textAnchor="middle"
            fontSize="260"
            fontWeight="600"
            fill="#294596"
            fontFamily="var(--font-poppins), sans-serif"
            className="focus-lock"
            style={{
              animation: "focus-lock 5s cubic-bezier(0.45,0,0.15,1) infinite",
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          >
            404
          </text>
        </svg>

        <div className="flex flex-col items-center gap-2">
          <svg
            viewBox="0 0 280 20"
            className="w-full max-w-[280px] h-auto"
            role="img"
            aria-label="Severed signal trace"
          >
            <line x1="10" y1="10" x2="90" y2="10" stroke="#c1c1c1" strokeWidth="2" />
            <line
              x1="110"
              y1="10"
              x2="190"
              y2="10"
              stroke="#cccccc"
              strokeWidth="2"
              strokeDasharray="2 6"
              className="dash-drift"
              style={{ animation: "dash-drift 4.5s linear infinite" }}
            />
            <circle cx="100" cy="10" r="3.5" fill="#c2c2c2" className="animate-pulse" />
          </svg>
        </div>

        <div className="container">
          <div className="flex flex-col items-center gap-6 ">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-[#10202C]">
              The Requested Page Could Not Be Found
            </h1>
            <p className="text-base text-[#4B6B78] leading-relaxed">
              The route you followed isn&apos;t part of the current build. It may
              have been moved, renamed, or never laid down in the first place.
              Everything else is holding steady.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <BorderButton
                text="Back to Home"
                href="/"
                textColor="black"
                className="bg-transparent border border-black"
                borderColor="black"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
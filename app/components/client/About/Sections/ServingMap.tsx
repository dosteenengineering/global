"use client"
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { servingMapData } from "../data";
import Image from "next/image";
import { useState } from "react";

const ServingMap = () => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const togglePlaceBox = (countryName: string) => {
    setActiveCountry((currentCountry) => currentCountry === countryName ? null : countryName);
  };

  return (
    <section className="relative overflow-hidden py-150">
      <SecondaryNoise />
      <div className="container">
        <SectionTitle text="Serving UAE, Oman & the MENA Region" className="section-heading text-secondary uppercase mb-50 max-w-[22ch]" />
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] 3xl:grid-cols-[auto_410px] relative z-2">
          <div>
            <div className="flex gap-[15px] mb-80">
              {/* <div className="bg-white/8 relative overflow-hidden z-10 rounded-full px-60 py-[13px]
               
  backdrop-blur-[5px]
  border-2 border-white/80
  shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]
  before:absolute before:inset-0 before:rounded-[28px] before:z-0
  before:bg-gradient-to-br before:from-white/80 before:to-transparent
  before:pointer-events-none
 
              "> */}
              <div className="relative overflow-hidden z-10 rounded-full px-60 py-[13px]">
                <div className="absolute inset-0 w-full h-full z-1">
                  <img src="./assets/images/about/map-section/glass-1.png" alt="" className="w-full h-full" />
                </div>
                <h3 className="text-55 leading-[1.181818181818182] font-light relative z-10">20 <span className="text-primary">+</span></h3>
                <p className="text-description relative z-1">Global Partners</p>
              </div>
              <div className="relative overflow-hidden rounded-full px-60 py-[13px]">
                <div className="absolute top-0 left-0 w-full h-full z-1">
                  <img src="./assets/images/about/map-section/glass-2.png" alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-55 leading-[1.181818181818182] font-light relative z-1">10 <span className="text-primary">+</span></h3>
                <p className="text-description relative z-1">Countries, Product Exported </p>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Image src="./assets/images/about/map-section/map.svg" width={1109.98} height={537} alt="world map" />
              {servingMapData.countries.map((country) => (
                <div
                  key={country.name}
                  className="absolute z-50 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${country.x}%`, top: `${country.y}%` }}
                >
                  <div className="relative h-[15px] w-[15px]">
                    <button
                      type="button"
                      aria-label={`Show ${country.name}`}
                      className="relative z-20 flex h-full w-full cursor-pointer items-center justify-center
                       [animation:map-point-scale_2.4s_ease-in-out_infinite] hover:animate-none"
                      onClick={() => togglePlaceBox(country.name)}
                    >
                      <img src="./assets/images/about/map-section/map-point.svg" alt="" className="block h-full w-full object-contain hover:scale-105" />
                    </button>
                    {activeCountry === country.name && (
                      <div className="absolute left-[-10px] top-1/2 z-10 flex h-[28px] -translate-y-1/2 items-center rounded-[0.5em] pl-[29px] pr-[13px] min-w-max  ">
                        <div className="absolute top-0 left-0 z-0 pointer-events-none w-full h-full overflow-hidden rounded-full
                        backdrop-blur-[9px] backdrop-saturate-[100%] bg-[rgba(0,0,0,0.15)] 
                        rounded-[12px] border border-[rgba(255,255,255,0.125)]">
                          {/* <img src="./assets/images/about/map-section/map-glass.png" alt="" className="w-full h-full  z-0" /> */}
                        </div>
                        <p className="text-white font-light relative z-1 leading-[1.5] text-description uppercase">{country.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <div className="mb-50">
                <h3 className="text-55 leading-[1.181818181818182] font-light text-primary">10 <span>+</span></h3>
                <h3 className="text-55 leading-[1.181818181818182] font-light text-black tracking-[-0.02em]">Countries, Global Partners</h3>
              </div>
              <div className="grid grid-cols-2">
                {servingMapData.countries.map((item) => (
                  <div key={item.name}>
                    <p className="text-19 tracking-[-0.02em] font-light text-paragraph leading-[2.105263157894737]">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-20 xl:top-100 3xl:top-[225px]">
        <img src="./assets/images/about/map-section/elipse.svg" className="w-50 xl:w-auto h-auto" alt="" />
      </div>
    </section>
  );
}

export default ServingMap;

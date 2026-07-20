"use client"
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import SecondaryNoise from "@/app/components/common/noise/SecondaryNoise";
import { AboutPageData } from "../data";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, moveLeft, moveRight, moveUp } from "@/app/components/motionVariants";

const ServingMap = ({ seventhSection, eighthSection }: { seventhSection: AboutPageData['seventhSection'], eighthSection: AboutPageData['eighthSection'] }) => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const togglePlaceBox = (countryName: string) => {
    setActiveCountry((currentCountry) => currentCountry === countryName ? null : countryName);
  };

  return (
    <section className="relative overflow-hidden py-12.5 md:py-150">
      <SecondaryNoise />
      <div className="container">
        <SectionTitle text={seventhSection.title} className="section-heading-90 text-secondary uppercase mb-7.5 md:mb-50 max-w-[22ch]" />
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] 3xl:grid-cols-[auto_410px] gap-5 relative z-2">
          <div>
            <div className="flex gap-[7px] md:gap-[15px] mb-80">
              {/* <div className="bg-white/8 relative overflow-hidden z-10 rounded-full px-60 py-[13px]
               
  backdrop-blur-[5px]
  border-2 border-white/80
  shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]
  before:absolute before:inset-0 before:rounded-[28px] before:z-0
  before:bg-gradient-to-br before:from-white/80 before:to-transparent
  before:pointer-events-none
 
              "> */}
              <motion.div
                variants={moveRight(0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative overflow-hidden z-10 rounded-full px-[22px] md:px-60 py-[13px] 3xl:py-[14px] min-w-[139px]">
                <div className="absolute inset-0 w-full h-full z-1">
                  <img src="./assets/images/about/map-section/glass-1.png" alt="" className="w-full h-full" />
                </div>
                
                <h3 className="text-55 leading-[1.181818181818182] font-light relative z-10">{seventhSection.items[0].number.replace("+", "")}{seventhSection.items[0].number.includes("+") && <span className="text-primary">+</span>}</h3>
                <p className="text-description !text-paragraph relative z-1 tracking-[2%]">{seventhSection.items[0].value}</p>
              </motion.div>
              <motion.div
                variants={moveRight(0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-full px-[21px] md:px-60 3xl:pl-[53px] 3xl:pr-[52px] py-[13px] xl:py-[14px]">
                <div className="absolute top-0 left-0 w-[101%] h-[101%] z-1">
                  <img src="./assets/images/about/map-section/glass-2-new.png" alt="" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-55 leading-[1.181818181818182] font-light relative z-10 max-xl:px-3">{seventhSection.items[1].number.replace("+", "")}{seventhSection.items[1].number.includes("+") && <span className="text-primary">+</span>}</h3>
                <p className="text-description !text-paragraph relative z-1 tracking-[2%] max-xl:px-3 max-xl:max-w-[25ch]">{seventhSection.items[1].value} </p>
              </motion.div>
            </div>
            <motion.div variants={fadeIn(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="relative aspect-[1109.98/537] w-full max-w-[1109.98px] overflow-visible">
              <Image
                src="/assets/images/about/map-section/map.svg"
                fill
                sizes="(max-width: 1279px) 100vw, 1110px"
                className="object-contain"
                alt="world map"
              />
              {eighthSection.items.map((country) => (
                <div
                  key={country.title}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${activeCountry === country.title ? "z-[100]" : "z-50"}`}
                  style={{ left: `${country.xValue}%`, top: `${country.yValue}%` }}
                >
                  <div className="relative h-[15px] w-[15px]">
                    <button
                      type="button"
                      aria-label={`Show ${country.title}`}
                      className="relative z-20 flex h-full w-full cursor-pointer items-center justify-center
                       [animation:map-point-scale_2.4s_ease-in-out_infinite] hover:animate-none"
                      onClick={() => togglePlaceBox(country.title)}
                    >
                      <img src="./assets/images/about/map-section/map-point.svg" alt="" className="block h-full w-full object-contain hover:scale-105" />
                    </button>
                    <AnimatePresence>
                      {activeCountry === country.title && (
                        <>
                          {/* Sibling 1: Static Glass Background (Fades in instantly with no delay or flicker) */}
                          <motion.div
                            initial={{ opacity: 0, y: "-50%" }}
                            animate={{ opacity: 1, y: "-50%" }}
                            exit={{ opacity: 0, y: "-50%" }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute left-[-10px] top-1/2 z-10 h-[28px] pointer-events-none
                            backdrop-blur-[9px] backdrop-saturate-[100%] bg-[rgba(20,20,20,0.45)] 
                            rounded-[12px] border border-[rgba(255,255,255,0.125)] pl-[29px] pr-[13px] min-w-max flex items-center justify-end text-right"
                          >
                            <span className="opacity-0 select-none font-light leading-[1.5] text-description uppercase w-fit ml-auto block">{country.title}</span>
                          </motion.div>

                          {/* Sibling 2: Growing Text Reveal Wrapper */}
                          <motion.div
                            initial={{ width: 0, opacity: 0, y: "-50%" }}
                            animate={{ width: "auto", opacity: 1, y: "-50%" }}
                            exit={{ width: 0, opacity: 0, y: "-50%" }}
                            transition={{ type: "spring", stiffness: 380, damping: 28 }}
                            className="absolute left-0 top-1/2 z-20 flex h-[28px] items-center overflow-hidden rounded-[12px] origin-left pointer-events-none justify-end"
                          >
                            <div className="flex h-full items-center pl-[23px] pr-[13px] min-w-max justify-end">
                              <p className="!text-[12px] md:!text-19 text-white font-light leading-[1.5] text-description !text-base uppercase text-right w-full">{country.title}</p>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div>
            <div className="border-t border-bdr-gray  xl:border-t-0 pt-7.5 md:pt-12 xl:pt-0 mt-7.5 md:mt-12 xl:mt-0">
              <div className="mb-50 flex gap-2 xl:block">
                <motion.h3
                  variants={moveUp(0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-55 leading-[1.181818181818182] font-medium text-primary"
                >
                  {eighthSection.title.replace(/[^0-9+]/g, "")}
                </motion.h3>
                <SectionTitle
                  text={eighthSection.title.replace(/[0-9]+\+?\s*/g, "")}
                  className="!text-55 leading-[1.181818181818182] font-light text-black tracking-[-0.02em]"
                />
              </div>
              <div className="grid grid-cols-2 max-lg:max-w-[50%]">
                {eighthSection.items.map((item, index) => (
                  <motion.div variants={moveUp(0.2 + index * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} key={item.title}>
                    <p className="text-19 tracking-[-0.02em] font-light text-paragraph leading-[1.65] md:leading-[2.105263157894737]">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-20 xl:top-100 3xl:top-[225px] hidden xl:block ">
        <img src="./assets/images/about/map-section/elipse.svg" className="xl:w-auto h-auto" alt="" />
      </div>
      <div className="absolute left-0 bottom-20  w-full 3xl:top-[225px]  xl:hidden ">
        <img src="./assets/images/about/map-section/elipse2.svg" className="w-full xl:w-auto h-auto" alt="" />
      </div>
    </section>
  );
}

export default ServingMap;

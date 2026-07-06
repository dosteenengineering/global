"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Project, ProjectItemProps } from "../data";
import ProjectImageSlider from "./ProjectImageSlider";
import NextProjectPanel from "./NextProjectSection";
import SpecGrid from "./SpecGrid";
import TextandDescription from "./TextandDescription";
import SolutionSlider from "./SolutionSlider";
import Divider from "./Divider";
import SystemsTable from "./SystemAndProducts";
import { statusData } from "@/app/components/AdminProject/statusData";

const STICKY_TOP = 50;
const THUMB_HEIGHT = 128;

export default function Main({
  data,
  nextProject,
}: {
  data: ProjectItemProps;
  nextProject: ProjectItemProps;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const panelAnchorRef = useRef<HTMLDivElement>(null);
  const [isContainer, setIsContainer] = useState(false);

  const [heroHeight, setHeroHeight] = useState(0);
  const [panelLeft, setPanelLeft] = useState(0);
  const [challengeOffsetTop, setChallengeOffsetTop] = useState(0);

  const specifications = [
    { label: "Sector", value: data.firstSection.sector.name },
    { label: "Location", value: data.firstSection.location.name },
    { label: "Status", value: statusData.find((item)=>item.value.toString() == data.firstSection.status)?.name || "" },
    { label: "Client", value: data.firstSection.client },
    { label: "Architect / Location", value:data.firstSection.consultant },
    { label: "Main Contractor", value: data.firstSection.contractor },
  ]
  // Measure hero height
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const update = () => setHeroHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure challenge section offset relative to anchor top
  useEffect(() => {
    const recalc = () => {
      const anchor = anchorRef.current;
      const challenge = challengeRef.current;
      if (!anchor || !challenge) return;
      const anchorY = anchor.getBoundingClientRect().top + window.scrollY;
      const challengeY = challenge.getBoundingClientRect().top + window.scrollY;
      setChallengeOffsetTop(challengeY - anchorY);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [heroHeight]); // re-run after heroHeight settles layout

  const measureLeft = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    setPanelLeft(el.getBoundingClientRect().left);
  }, []);

  useEffect(() => {
    measureLeft();
    window.addEventListener("resize", measureLeft);
    return () => window.removeEventListener("resize", measureLeft);
  }, [measureLeft, isContainer]); // 👈 re-measure when isContainer toggles

  // Scroll handler — next project panel only
  useEffect(() => {
    if (!heroHeight) return;
    let raf: number;

    const update = () => {
      const panel = panelRef.current;
      const anchor = anchorRef.current;
      const main = mainRef.current;
      if (!panel || !anchor || !main) return;

      const scrollY = window.scrollY;
      const anchorY = anchor.getBoundingClientRect().top + scrollY;
      const mainBottomY = main.getBoundingClientRect().bottom + scrollY;

      const naturalPanelTop = anchorY + heroHeight - THUMB_HEIGHT;
      const stickyTrigger = naturalPanelTop - STICKY_TOP;
      const unstickTrigger = mainBottomY - STICKY_TOP - THUMB_HEIGHT;

      if (scrollY < stickyTrigger) {
        panel.style.position = "absolute";
        panel.style.top = `${heroHeight - THUMB_HEIGHT}px`;
        panel.style.left = "0";
      } else if (scrollY < unstickTrigger) {
        panel.style.position = "fixed";
        panel.style.top = `${STICKY_TOP}px`;
        panel.style.left = `${panelLeft}px`;
      } else {
        panel.style.position = "absolute";
        panel.style.top = `${unstickTrigger - anchorY + STICKY_TOP}px`;
        panel.style.left = "0";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [heroHeight, panelLeft]);


  useEffect(() => {
    const handleResize = () => {
      setIsContainer(window.innerWidth > 767); // change 768 to your breakpoint
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-5 md:pt-100">
      <div ref={panelAnchorRef} className="container w-0 h-0 pointer-events-none" />

      <div className={isContainer ? "container" : ""}>
        <div className="flex gap-80 3xl:gap-[109px] items-start">
          {/* ── Left aside ──────────────────────────────────────── */}
          <aside className="hidden lg:block shrink-0 w-[150px] 3xl:w-[176px] self-stretch">
            <div ref={anchorRef} className="relative h-full">
              {/* Next project panel */}
              {heroHeight > 0 && (
                <div
                  ref={panelRef}
                  style={{
                    position: "absolute",
                    top: heroHeight - THUMB_HEIGHT,
                    left: 0,
                  }}
                >
                  <NextProjectPanel project={nextProject} />
                </div>
              )}

              {/* Decorative SVG — overflows left edge like Figma */}
              {challengeOffsetTop > 0 && (
                <div
                  className="pointer-events-none w-[550px] 3xl:w-[590px]"
                  style={{
                    position: "absolute",
                    top: challengeOffsetTop + 80,
                    left: -120, // bleeds left off the aside
                  }}
                >
                  <Image
                    src="/assets/icons/bg-svg/top-left-animated.svg"
                    alt=""
                    width={900}
                    height={900}
                    className="object-contain w-[900px]"
                  />
                </div>
              )}
            </div>
          </aside>

          {/* ── Right: main content ─────────────────────────────── */}
          <main ref={mainRef} className="flex-1 min-w-0">
            <div ref={heroRef} className="mb-20">
              <ProjectImageSlider project={data} />
            </div>

            <div className="mb-12.5 md:mb-80">
              <SpecGrid specs={specifications} />
            </div>
            <div className="container px-[16px] sm:px-0">
              {/* Challenge — ref for deco alignment */}
              <div ref={challengeRef} className="mb-7.5 md:mb-80">
                <TextandDescription
                  title={data.secondSection.title}
                  description={data.secondSection.description}
                />
              </div>

              <Divider />

              <div className="mt-7.5 mb-5 md:my-80">
                <TextandDescription
                  title={data.thirdSection.title}
                  description={data.thirdSection.description}
                  delay={0.3}
                />
              </div>

              <div className="mb-5 md:mb-80">
                <SolutionSlider images={data.thirdSection.items.map((item)=>item.image)} />
              </div>
            </div>
            <div className="mb-7.5 md:mb-80">
              <SystemsTable rows={data.fourthSection.items.map((item)=>({...item,key:item.title,value:item.description}))} />
            </div>

            <div className="container mb-[70px] md:mb-0">
              <div>
                <TextandDescription
                  title={data.fifthSection.title}
                  description={data.fifthSection.description}
                  delay={0.4}
                />
              </div>

              {/* <div className="md:hidden mt-10">
              <NextProjectPanel project={nextProject} />
            </div> */}
            </div>
          </main>
        </div>
      </div>

      <div className="container mt-140 3xl:mt-200 mb-120 hidden md:block">
        <Divider />
      </div>
    </div>
  );
}

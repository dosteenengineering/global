"use client";

import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const STICKY_TOP = 120;
const DESKTOP_BREAKPOINT = 1024;

const BlogContent = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const updateInfoPanelPosition = useCallback(() => {
    const section = sectionRef.current;
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!section || !anchor || !panel) return;

    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      panel.style.position = "";
      panel.style.top = "";
      panel.style.left = "";
      panel.style.width = "";
      return;
    }

    const scrollY = window.scrollY;
    const anchorRect = anchor.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const anchorY = anchorRect.top + scrollY;
    const sectionBottomY = sectionRect.bottom + scrollY;
    const panelHeight = panel.offsetHeight;
    const stickyStartY = anchorY - STICKY_TOP;
    const stickyEndY = sectionBottomY - STICKY_TOP - panelHeight;

    panel.style.width = `${anchorRect.width}px`;

    if (scrollY < stickyStartY) {
      panel.style.position = "absolute";
      panel.style.top = "0";
      panel.style.left = "0";
    } else if (scrollY < stickyEndY) {
      panel.style.position = "fixed";
      panel.style.top = `${STICKY_TOP}px`;
      panel.style.left = `${anchorRect.left}px`;
    } else {
      panel.style.position = "absolute";
      panel.style.top = `${sectionBottomY - anchorY - panelHeight}px`;
      panel.style.left = "0";
    }
  }, []);

  useEffect(() => {
    let raf = 0;

    const onUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateInfoPanelPosition);
    };

    window.addEventListener("scroll", onUpdate, { passive: true });
    window.addEventListener("resize", onUpdate);
    updateInfoPanelPosition();

    const resizeObserver = new ResizeObserver(onUpdate);
    if (sectionRef.current) resizeObserver.observe(sectionRef.current);
    if (panelRef.current) resizeObserver.observe(panelRef.current);

    return () => {
      window.removeEventListener("scroll", onUpdate);
      window.removeEventListener("resize", onUpdate);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [updateInfoPanelPosition]);

  return (
    <section ref={sectionRef} className="pt-120 pb-200 relative overflow-hidden border-b border-bdr-gray">
      <div className="absolute top-0 left-0 xl:left-[-14%] xl:top-[-98%] w-full h-full">
        <img src="/assets/images/blog/shape/details-shape-1.svg" alt="shape" className="w-full h-full 
        xl:w-[897px] xl:h-[896px] object-contain" />
      </div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] 3xl:grid-cols-[255px_auto] gap-5 3xl:gap-[173px]">
          <div ref={anchorRef} className="relative self-stretch">
            <div ref={panelRef} className="pb-30">
              <div className="border-y border-bdr-gray pt-[12px] pb-30">
                <h4 className="text-description text-paragraph">Published</h4>
                <h5 className="text-description text-paragraph !font-bold">22-02-2025</h5>
              </div>
              <div className="pt-[12px]">
                <h4 className="text-description text-paragraph !font-bold pb-[12px]">Share</h4>
                <ul>
                  <li>
                    <a href="#" className="text-description text-paragraph">Facebook</a>
                  </li>
                  <li>
                    <a href="#" className="text-description text-paragraph">LinkedIn</a>
                  </li>
                  <li>
                    <a href="#" className="text-description text-paragraph">X</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="border-b border-bdr-gray pb-60">
              <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-30 leading-[1.333333333333333] font-light mb-40">
                In today’s fast-paced industrial and commercial environments, facility safety is no longer limited to alarms, cameras, or access control systems. Physical infrastructure — particularly industrial door solutions — plays a crucial role in protecting people, assets, and operations.
              </motion.p>
              <motion.p variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-description text-paragraph">
                Advanced door systems are engineered not only for access and efficiency but also for risk mitigation, emergency response, and regulatory compliance. From warehouses and manufacturing plants to airports and commercial complexes, modern door technologies are transforming safety from a reactive measure into a proactive strategy.
              </motion.p>
            </div>
            <div className="pt-60">
              <motion.h2 variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-55 leading-[1.181818181818182] font-light text-secondary mb-30">The Evolving Role of Industrial Doors in Safety</motion.h2>
              <motion.p variants={moveUp(0.8)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-description text-paragraph mb-30">Traditionally, doors served a basic function — allowing entry and exit. However, modern facilities demand more complex performance:</motion.p>
              <ul className="text-description text-paragraph list-disc pl-[1em] py-30">
                <motion.li variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>Controlled access to sensitive areas</motion.li>
                <motion.li variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>Protection against fire, smoke, and environmental hazards</motion.li>
                <motion.li variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>Safe interaction between vehicles, equipment, and personnel</motion.li>
                <motion.li variants={moveUp(0.8)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>Integration with building management and security systems</motion.li>
              </ul>
              <motion.p variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-description text-paragraph mb-50">As a result, advanced industrial doors now operate as intelligent safety barriers rather than simple structural components.</motion.p>
              <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <Image src="/assets/images/blog/blog-d-1.jpg" width={1252} height={495} alt="" className="w-full max-h-[495px] mb-80" />
              </motion.div>
            </div>
            <div>
              <motion.h2 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="text-55 leading-[1.181818181818182] font-light text-secondary mb-50 tracking-[-0.02em]">
                Key Safety Features in Advanced Door Solutions</motion.h2>
              <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mb-40">
                <h3 className="text-30 leading-[1.333333333333333] font-light text-secondary mb-30">
                  1. Automated Obstacle Detection & Motion Safety
                </h3>
                <p className="text-description text-paragraph">
                  Modern doors incorporate multiple sensing technologies to prevent accidents:
                </p>
                <ul className="text-description text-paragraph list-disc pl-[1em] py-30">
                  <li>Infrared and radar motion detectors</li>
                  <li>Safety light curtains protecting door travel zones</li>
                  <li>Pressure-sensitive safety edges</li>
                  <li>Soft-start and soft-stop drive systems</li>
                </ul>
                <p className="text-description text-paragraph">
                  These features significantly reduce collision risks involving forklifts, vehicles, and pedestrians, particularly in high-traffic logistics environments.
                </p>
              </motion.div>
              <motion.div variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <h3 className="text-30 leading-[1.333333333333333] font-light text-secondary mb-30">
                  2. Fire & Smoke Containment Capabilities
                </h3>
                <p className="text-description text-paragraph">
                  Fire-rated doors and curtains are critical life-safety components that help:
                </p>
                <ul className="text-description text-paragraph list-disc pl-[1em] py-30">
                  <li>Compartmentalize fire zones</li>
                  <li>Slow flame and smoke spread</li>
                  <li>Protect evacuation routes</li>
                  <li>Enable firefighting operations</li>
                </ul>
                <p className="text-description text-paragraph">
                  Automated closure triggered by fire alarm systems ensures immediate response even without human intervention, improving survival and damage control outcomes.
                </p>
              </motion.div>
              <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex gap-30 w-full pt-30 pb-40">
                <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                  <Image src="/assets/images/blog/blog-1/blg-gallery-1.jpg" alt="Blog 1" width={400} height={300} className="w-full h-auto" />
                </motion.div>
                <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                  <Image src="/assets/images/blog/blog-1/blg-gallery-2.jpg" alt="Blog 2" width={400} height={300} className="w-full h-auto" />
                </motion.div>
              </motion.div>
              <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <h3 className="text-30 leading-[1.333333333333333] font-light text-secondary mb-30">
                  3. Fire & Smoke Containment Capabilities
                </h3>
                <p className="text-description text-paragraph">
                  Fire-rated doors and curtains are critical life-safety components that help:
                </p>
                <ul className="text-description text-paragraph list-disc pl-[1em] py-30">
                  <li>Compartmentalize fire zones</li>
                  <li>Slow flame and smoke spread</li>
                  <li>Protect evacuation routes</li>
                  <li>Enable firefighting operations</li>
                </ul>
                <p className="text-description text-paragraph">
                  Automated closure triggered by fire alarm systems ensures immediate response even without human intervention, improving survival and damage control outcomes.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogContent;

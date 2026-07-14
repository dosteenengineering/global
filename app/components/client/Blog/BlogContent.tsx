"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import BlogLatest from "./sections/BlogLatest";
import BlogList from "./sections/BlogList";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import { BlogItem } from "./data";

const STICKY_TOP = 120;
const DESKTOP_BREAKPOINT = 768;

interface Blog {
  id: number;
  title: string;
  date: string;
  desc: string;
  img: string;
  link: string;
  category: string;
  trending: boolean;
  mainDesc: string;
  galleryImgs: string[];
  subDesc1: string;
  subDesc2: string;
}

interface BlogContentProps {
  data: BlogItem[];
}

const BlogContent = ({ data }: BlogContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(data.map((blog) => blog.category.name))];
  const filteredBlogs =
    selectedCategory === "All"
      ? data
      : data.filter((blog) => blog.category.name === selectedCategory);
  const latestBlog = [...filteredBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  const listBlogs = latestBlog
    ? filteredBlogs.filter((blog) => blog.title !== latestBlog.title)
    : [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(pathname);
  };

  const updateCategoryPanelPosition = useCallback(() => {
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
      raf = requestAnimationFrame(updateCategoryPanelPosition);
    };

    window.addEventListener("scroll", onUpdate, { passive: true });
    window.addEventListener("resize", onUpdate);
    updateCategoryPanelPosition();

    const resizeObserver = new ResizeObserver(onUpdate);
    if (sectionRef.current) resizeObserver.observe(sectionRef.current);
    if (panelRef.current) resizeObserver.observe(panelRef.current);

    return () => {
      window.removeEventListener("scroll", onUpdate);
      window.removeEventListener("resize", onUpdate);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [updateCategoryPanelPosition, filteredBlogs.length, listBlogs.length]);

  return (
    <section ref={sectionRef} className="pt-[70px] md:pt-120 pb-200 relative">
      <div className="absolute top-[14%] left-[-25%] w-full h-full">
        <Image src="/assets/images/blog/shape/list-shape-1.svg" alt="" width={797} height={796} className="w-[50%] h-auto 3xl:w-auto" />
      </div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1.5fr] 3xl:grid-cols-[auto_1395px]">
          {/* <div ref={anchorRef} className="md:col-start-1 relative self-stretch md:w-[150px] 3xl:w-[176px] " >
            <div ref={panelRef} className="flex flex-col gap-y-1 text-left pb-5 xl:pt-100 xl:pb-50">
              {categories.map((category,index) => {
                const isActive = selectedCategory === category;
                return (
                  <motion.div variants={moveUp(index * 0.1)} initial="hidden" whileInView={"show"} viewport={{once:true,amount:0.3}} key={category}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`w-fit text-19 leading-[1.2] text-paragraph h-fit py-[3px] font-light flex items-center gap-x-2 group transition-all duration-100 ease-in-out cursor-pointer ${
                        isActive ? "!font-bold" : "hover:font-bold"
                      }`}
                    >
                      {category}
                      <span
                        className={`transition-all duration-400 linear ${
                          isActive
                            ? "opacity-100 translate-x-2"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-2"
                        }`}
                      >
                        <Image
                          src="/assets/icons/primary-right-arrow.svg"
                          alt="arrow"
                          width={25}
                          height={16}
                        />
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div> */}

          <div
            ref={anchorRef}
            className="relative self-stretch w-full lg:col-start-1 lg:w-[150px] 3xl:w-[176px] mb-[40px]"
          >
            {/* Mobile / Tablet: horizontal tab bar */}
            <div className="flex lg:hidden items-center gap-x-6 overflow-x-auto no-scrollbar border-b border-bdr-gray ">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`relative shrink-0 whitespace-nowrap pb-3 transition-all duration-100 ease-in-out cursor-pointer text-[12px] md:text-[20px] text-paragraph
                       ${isActive ? "font-bold" : "font-light "}`} >
                    {category}
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop: your existing vertical list, unchanged */}
            <div
              ref={panelRef}
              className="hidden lg:flex flex-col gap-y-1 text-left pb-5 xl:pt-100 xl:pb-50"
            >
              {categories.map((category, index) => {
                const isActive = selectedCategory === category;
                return (
                  <motion.div
                    variants={moveUp(index * 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.3 }}
                    key={category}
                  >
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`w-fit text-19 leading-[1.2] text-paragraph h-fit py-[3px] font-light flex items-center gap-x-2 group transition-all duration-100 ease-in-out cursor-pointer ${isActive ? "!font-bold" : "hover:font-bold"
                        }`}
                    >
                      {category}
                      <span
                        className={`transition-all duration-400 linear ${isActive
                            ? "opacity-100 translate-x-2"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-2"
                          }`}
                      >
                        <Image
                          src="/assets/icons/primary-right-arrow.svg"
                          alt="arrow"
                          width={25}
                          height={16}
                        />
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-start-2 z-10">
            <BlogLatest data={filteredBlogs} />
            <BlogList data={listBlogs} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;

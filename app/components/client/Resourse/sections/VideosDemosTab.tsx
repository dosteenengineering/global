"use client";

import { Clock, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ResourceHubTab } from "../data";

type VideosDemosTabProps = {
  tab: ResourceHubTab;
};

type VideosDemosItem = {
  id: number;
  type?: string;
  title: string;
  image: string;
  tag?: string;
  tags?: string[];
  duration: string;
  videoLink: string;
};

const getVideoItems = (items: ResourceHubTab["items"]): VideosDemosItem[] => {
  return Array.isArray(items) ? (items as VideosDemosItem[]) : [];
};

const getVideoUrl = (url: string) => {
  if (!url || url === "#") return "";
  return url;
};

const VideosDemosTab = ({ tab }: VideosDemosTabProps) => {
  const videos = getVideoItems(tab.items);

  const [activeVideo, setActiveVideo] = useState<VideosDemosItem | null>(null);

  const videoUrl = useMemo(() => {
    return getVideoUrl(activeVideo?.videoLink ?? "");
  }, [activeVideo]);

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <div className="pt-70 md:pt-100">
      <h2 className="text-[38px] md:text-55 leading-[1.1] font-light text-secondary max-w-[28ch] mb-50">
        {tab.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30">
        {videos.map((item) => {
          const label = item.tag ?? item.tags?.[0] ?? item.type;

          return (
            <button key={item.id} type="button" onClick={() => setActiveVideo(item)} className="group text-left" >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/70 transition-colors duration-300 group-hover:bg-black/45" />

                {/* PLAY BUTTON */}
                <div className="absolute cursor-pointer left-1/2 top-1/2 flex h-10 h-10 xl:w-[71px] xl:h-[71px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110">
                  <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.79091 6.48023L0 0V12.9605L9.79091 6.48023Z" fill="#1C1C1C" />
                  </svg>

                </div>
              </div>

              {/* CONTENT */}
              <div className="bg-[#F4F4F4] p-10">
                <h3 className="text-30 leading-[1.333333333333333] font-light text-secondary transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>

                <div className="mt-[15px] flex items-center gap-[10px] flex-wrap">
                  {label && (
                    <span className="rounded-full bg-primary/5 px-[18.5px] py-[5px] flex items-center justify-center text-15 
                    leading-[1.733333333333333] font-[400] text-secondary">
                      {label}
                    </span>
                  )}

                  <div className="flex items-center gap-1 rounded-full bg-primary/5 px-[22.5px] py-[5px] flex items-center justify-center text-15 leading-[1.733333333333333] font-[400] text-secondary">
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 px-20 py-30 backdrop-blur-sm"
          role="dialog" aria-modal="true" aria-label={activeVideo.title} onMouseDown={() => setActiveVideo(null)} >
          <div className="relative w-full max-w-[1100px] overflow-hidden bg-black" onMouseDown={(event) => event.stopPropagation()} >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-15 top-15 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary transition-all duration-300 hover:bg-primary hover:text-white"
              aria-label="Close video"
            >
              <X className="h-5 w-5" strokeWidth={1.8} />
            </button>

            {/* VIDEO */}
            <div className="aspect-video w-full bg-black">
              {videoUrl ? (
                <video key={videoUrl} className="h-full w-full" src={videoUrl} controls autoPlay playsInline />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#F4F4F4] px-25 text-center">
                  <p className="text-19 font-poppins font-light leading-[1.5] text-secondary">
                    Video will be available soon.
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="bg-white px-25 py-20">
              <h3 className="text-24 leading-[1.3] font-poppins font-light text-secondary">{activeVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosDemosTab;
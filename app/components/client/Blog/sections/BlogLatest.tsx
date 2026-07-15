"use client"
import { moveUp } from "@/app/components/motionVariants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BlogItem } from "../data";

// interface BlogListProps {
//   data: {
//     id: number;
//     title: string;
//     date: string;
//     desc: string;
//     img: string;
//     link: string;
//     category: string;
//     trending: boolean;
//     mainDesc: string;
//     galleryImgs: string[];
//     subDesc1: string;
//     subDesc2: string;
//   }[];
// }

const BlogLatest = ({ data }: { data: BlogItem[] }) => {
  const latestBlog = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  if (!latestBlog) return null;

  return (
    <div className="pb-100 3xl:pb-200 relative">
      <Link href={`/blog/${latestBlog.slug}`} className="absolute w-full h-full inset-0">  </Link>
      <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Image src={latestBlog.thumbnail} alt={latestBlog.thumbnailAlt} width={1395} height={651} className="w-full h-[350px] lg:h-[651px]" />
      </motion.div>

      <div className="flex flex-wrap gap-y-2 gap-x-4 justify-between pt-40">
        <motion.span variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-description text-paragraph order-1">{new Date(latestBlog.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '-')}
        </motion.span>
        <motion.h2 variants={moveUp(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-55 leading-[1.181818181818182] font-light text-heading lg:max-w-[30ch] order-3 lg:order-2">
          {latestBlog.title}</motion.h2>
        <motion.button variants={moveUp(0.6)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-description !text-15 leading-[1.666666666666667] text-paragraph h-fit py-[3px] px-2 xl:px-[18px] uppercase border border-bdr-gray rounded-full order-2 lg:order-3">{latestBlog.category.name}</motion.button>
      </div>
    </div>
  );
}

export default BlogLatest;

"use client"

import Pagination from "@/app/components/common/Pagination";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import { BlogItem } from "../data";

const ITEMS_PER_PAGE = 4;

interface BlogListProps {
  data: {
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
  }[];
}

const BlogList = ({ data }: { data: BlogItem[] }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const pageBlogs = data.slice(start, start + ITEMS_PER_PAGE);

  const MotionLink = motion(Link);

  return (
    <div>
      {
        pageBlogs.map((blog, index) => (
          <MotionLink variants={moveUp(0.2 * index)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} 
          href={`/blog/${blog.slug}`} key={index} className="grid md:grid-cols-[auto_1fr] 3xl:grid-cols-[513px_auto] gap-20 
          3xl:gap-[138px] py-40 border-b border-bdr-gray first:border-t first:border-bdr-gray">
            <div className="flex gap-7 md:gap-10 3xl:gap-5 justify-between flex-wrap">
              <span className="text-description text-paragraph">{new Date(blog.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }).replace(/\//g, '-')}</span>
              <div className="max-w-[350px] overflow-hidden">
                <Image src={blog.thumbnail} alt={blog.thumbnailAlt} width={513} height={300} className="h-[236px] object-cover" />
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-y-3">
              <h2 className="text-30 leading-[1.333333333333333] font-light max-w-[25ch]">{blog.title}</h2>
              <button className="text-description !text-15 leading-[1.666666666666667] text-paragraph h-fit py-[3px] px-4 xl:px-[18px] uppercase border border-bdr-gray rounded-full">{blog.category.name}</button>
            </div>
          </MotionLink>
        ))
      }
      {totalPages > 1 && (
        <div className="mt-80 w-full grid grid-cols-1 md:grid-cols-[auto_1.5fr] 3xl:grid-cols-[106px_auto] 3xl:gap-[57px]">
          <div className="col-start-2">
            <Pagination currentPage={safeCurrentPage} totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogList;

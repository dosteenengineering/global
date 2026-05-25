"use client"

import Pagination from "@/app/components/common/Pagination";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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

const BlogList = ({ data }: BlogListProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const pageBlogs = data.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      {
        pageBlogs.map((blog) => (
          <Link href={`/blog/${blog.title.toLowerCase().replace(/\s+/g, '-')}`} key={blog.id} className="grid grid-cols-1 3xl:grid-cols-[513px_auto] gap-20 3xl:gap-[138px] py-40 border-b border-bdr-gray first:border-t first:border-bdr-gray">
            <div className="flex gap-5 justify-between">
              <span className="text-description text-paragraph">{blog.date}</span>
              <div className="max-w-[350px] overflow-hidden">
                <Image src={blog.img} alt={blog.title} width={513} height={300} />
              </div>
            </div>
            <div className="flex justify-between ">
              <h2 className="text-30 leading-[1.333333333333333] font-light max-w-[25ch]">{blog.title}</h2>
              <button className="text-description text-15 leading-[1.666666666666667] text-paragraph h-fit py-[3px] px-1 xl:px-[18px] uppercase border border-bdr-gray rounded-full">{blog.category}</button>
            </div>
          </Link>
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

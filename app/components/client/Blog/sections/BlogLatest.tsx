"use client"
import Image from "next/image";
import Link from "next/link";

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

const BlogLatest = ({ data }: BlogListProps) => {
  const latestBlog = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  if (!latestBlog) return null;

  return ( 
    <div className="pb-200 relative">
      <Link href={`/blog/${latestBlog.title.toLowerCase().replace(/\s+/g, '-')}`} className="absolute w-full h-full inset-0">  </Link>
        <Image src={latestBlog.img} alt={latestBlog.title} width={1395} height={651} className="w-full max-h-[651px]" />
    
      <div className="flex justify-between  pt-40">
        <span className="text-description text-paragraph">{latestBlog.date}</span>
        <h2 className="text-55 leading-[1.181818181818182] font-light text-heading max-w-[25ch]">{latestBlog.title}</h2>
        <button className="text-description text-15 leading-[1.666666666666667] text-paragraph h-fit py-[3px] px-1 xl:px-[18px] uppercase border border-bdr-gray rounded-full">{latestBlog.category}</button>
      </div>
    </div>
   );
}
 
export default BlogLatest;

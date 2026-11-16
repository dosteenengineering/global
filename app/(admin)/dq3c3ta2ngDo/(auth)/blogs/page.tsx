"use client"

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdCategory, MdDelete, MdEdit, MdList, MdOpenInNew, MdVisibility, MdVisibilityOff, MdWeb } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminTabs, { useAdminTab } from "@/app/components/common/AdminTabs";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
// import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SeoFormValues } from "@/app/types/seo";
import SeoFields from "@/app/components/common/SeoFields";


interface BlogPageProps {
    seo: SeoFormValues;
    bannerSection: {
        image: string;
        imageAlt: string;
        title: string;
    };
}



const TAB_KEYS = ["list", "page", "category"] as const;

export default function Blogs() {
    return (
        <Suspense fallback={null}>
            <BlogsContent />
        </Suspense>
    );
}

function BlogsContent() {

    const [category, setCategory] = useState<string>("");
    const [blogList, setBlogList] = useState<{ _id: string, title: string, description: string, slug?: string, thumbnail?: string, thumbnailAlt?: string, category?: { _id: string, name: string } | null, isHidden?: boolean }[]>([]);
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);

    const [search, setSearch] = useState<string>("");
    const [isLoadingBlogs, setIsLoadingBlogs] = useState<boolean>(true);

    const router = useRouter();
    const [activeTab, setActiveTab] = useAdminTab(TAB_KEYS);

    const filteredBlogs = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return blogList;
        return blogList.filter((item) => item.title?.toLowerCase().includes(term));
    }, [blogList, search]);

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BlogPageProps>();

    const handleFetchBlogs = async () => {
        try {
            const response = await fetch("/api/admin/blog");
            if (response.ok) {
                const data = await response.json();
                setBlogList(data.data.blogs);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching blogs", error);
        } finally {
            setIsLoadingBlogs(false);
        }
    }

    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/blog/category", {
                method: "POST",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                setCategory("");
                toast.success(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error adding category", error);
        }
    }

    const handleFetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/blog/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching category", error);
        }
    }

    const handleEditCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/blog/category?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ name: category }),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleFetchCategory();
                setCategory("");
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error editing category", error);
        }
    }

    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/blog/category?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleFetchCategory();
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error deleting category", error);
        }
    }

    const handleToggleVisibility = async (id: string, isHidden: boolean) => {
        try {
            const response = await fetch(`/api/admin/blog/visibility?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isHidden }),
            });
            const data = await response.json();
            if (response.ok) {
                setBlogList((prev) => prev.map((item) => item._id === id ? { ...item, isHidden } : item));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error updating blog visibility", error);
        }
    }

    const handleDeleteBlog = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/blog?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleFetchBlogs();
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error deleting blog", error);
        }
    }

    const onSubmit = async (data: BlogPageProps) => {
        try {
            const response = await fetch(`/api/admin/blog`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in submitting blog details", error);
        }
    }

    const fetchBlogDetails = async () => {
        try {
            const response = await fetch("/api/admin/blog");
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);
                setValue("bannerSection", data.data.bannerSection);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching blog details", error);
        }
    }

    useEffect(() => {
        handleFetchBlogs();
        handleFetchCategory();
        fetchBlogDetails();
    }, [])

    return (
        <div className="flex flex-col gap-5">

            <AdminTabs
                activeTab={activeTab}
                onChange={setActiveTab}
                tabs={[
                    { key: "list", label: "Blog", icon: MdList, count: blogList.length },
                    { key: "page", label: "Page", icon: MdWeb },
                    { key: "category", label: "Category", icon: MdCategory, count: categoryList.length },
                ]}
            />

            {activeTab === "page" && (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <AdminItemContainer>
                    <Label className='' main>Banner Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='grid grid-cols-2 gap-2 relative pb-5'>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name={`bannerSection.image`}
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    {errors.bannerSection?.image && (
                                        <p className="text-red-500">{errors.bannerSection?.image.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`bannerSection.imageAlt`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.bannerSection?.imageAlt && <p className='text-red-500'>{errors.bannerSection?.imageAlt.message}</p>}
                                    </div>
                                </div>


                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Title</Label>
                                        <Input type='text' placeholder='Title' {...register(`bannerSection.title`, {
                                            required: "Value is required"
                                        })} />
                                        {errors.bannerSection?.title && <p className='text-red-500'>{errors.bannerSection?.title.message}</p>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>

                <SeoFields<BlogPageProps> control={control} register={register} errors={errors} />

                <div className='flex justify-center mt-5'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
            )}

            {activeTab === "category" && (
                <div className="flex flex-col gap-2 h-[80vh]">
                    <div className="h-full w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
                        <div className="flex justify-between border-b-2 border-black/20 pb-2">
                            <Label className="text-sm font-bold">Category</Label>
                            <Dialog>
                                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setCategory("")}>Add Category</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Category</DialogTitle>
                                        <DialogDescription>
                                            <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddCategory}>Save</DialogClose>
                                </DialogContent>

                            </Dialog>
                        </div>
                        <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
                            {categoryList.map((item) => (
                                <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                                    <div className="text-[16px]">
                                        {item.name}
                                    </div>
                                    <div className="flex gap-5">
                                        <Dialog>
                                            <DialogTrigger onClick={() => { setCategory(item.name) }}><MdEdit /></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Category</DialogTitle>
                                                    <DialogDescription>
                                                        <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} />
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditCategory(item._id)}>Save</DialogClose>
                                            </DialogContent>

                                        </Dialog>



                                        <Dialog>
                                            <DialogTrigger><MdDelete /></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex gap-2">
                                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteCategory(item._id)}>Yes</DialogClose>
                                                </div>

                                            </DialogContent>

                                        </Dialog>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}

            {activeTab === "list" && (
                <div className="h-[80vh] w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white flex flex-col">
                    <div className="flex justify-between items-center gap-4 border-b-2 border-black/20 pb-2">
                        <Label className="text-sm font-bold">Blogs</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="search"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-72"
                            />
                            <Button onClick={() => router.push("/dq3c3ta2ngDo/blogs/add")} className="text-white">Add Blog</Button>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 overflow-y-auto flex-1">
                        {isLoadingBlogs && Array.from({ length: 6 }).map((_, i) => (
                            <div key={`skeleton-${i}`} className="flex items-center gap-3 border border-black/10 p-2 rounded-md animate-pulse">
                                <div className="w-16 h-12 rounded-md bg-black/10 shrink-0" />
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="h-4 w-1/2 rounded bg-black/10" />
                                    <div className="h-3 w-20 rounded-full bg-black/10" />
                                </div>
                            </div>
                        ))}
                        {!isLoadingBlogs && filteredBlogs.length === 0 && (
                            <p className="text-center text-black/50 py-10">
                                {search.trim() ? "No blogs match your search." : "No blogs found."}
                            </p>
                        )}
                        {filteredBlogs.map((item) => (
                            <div className={`flex justify-between gap-4 border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300 ${item.isHidden ? "bg-black/[0.03]" : ""}`} key={item._id}>
                                <div className={`flex items-center gap-3 min-w-0 ${item.isHidden ? "opacity-50" : ""}`}>
                                    <div className="relative w-16 h-12 shrink-0 rounded-md overflow-hidden bg-black/5 border border-black/10">
                                        {item.thumbnail ? (
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.thumbnailAlt || item.title}
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-black/40">No image</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <div className="text-[16px] truncate">
                                            {item.title}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.category?.name && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-xs font-medium text-black/70">
                                                    {item.category.name}
                                                </span>
                                            )}
                                            {item.isHidden && (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                                                    <MdVisibilityOff className="text-[13px]" />
                                                    Hidden
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 shrink-0 items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleVisibility(item._id, !item.isHidden)}
                                        title={item.isHidden ? "Hidden — click to show on website" : "Visible — click to hide from website"}
                                        aria-label={item.isHidden ? "Show blog on website" : "Hide blog from website"}
                                        className={`cursor-pointer ${item.isHidden ? "text-red-600" : ""}`}
                                    >
                                        {item.isHidden ? <MdVisibilityOff /> : <MdVisibility />}
                                    </button>
                                    {item.slug && (
                                        <a href={`/blog/${item.slug}`} target="_blank" rel="noopener noreferrer" title="View on website" aria-label="View on website">
                                            <MdOpenInNew />
                                        </a>
                                    )}
                                    <MdEdit className="cursor-pointer" onClick={() => router.push(`/dq3c3ta2ngDo/blogs/edit/${item._id}`)} />

                                    <Dialog>
                                        <DialogTrigger><MdDelete /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex gap-2">
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteBlog(item._id)}>Yes</DialogClose>
                                            </div>

                                        </DialogContent>

                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

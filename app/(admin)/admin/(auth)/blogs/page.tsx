"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
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
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
// import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";


interface BlogPageProps {
    metaTitle: string;
    metaDescription: string;
    bannerSection: {
        image: string;
        imageAlt: string;
        title: string;
    };
}



export default function Blogs() {

    const [category, setCategory] = useState<string>("");
    const [blogList, setBlogList] = useState<{ _id: string, title: string, description: string }[]>([]);
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);

    const router = useRouter();

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
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
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

                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="flex flex-col gap-2 p-5">
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='' {...register("metaTitle")} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Description</Label>
                            <Input type='text' placeholder='' {...register("metaDescription")} />
                        </div>
                    </div>
                </AdminItemContainer>

                <div className='flex justify-center mt-5'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>


            <div className="h-screen grid grid-cols-2 gap-5">

                <div className="flex flex-col gap-2 h-screen">
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

                <div className="h-screen w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
                    <div className="flex justify-between border-b-2 border-black/20 pb-2">
                        <Label className="text-sm font-bold">Blogs</Label>
                        <Button onClick={() => router.push("/admin/blogs/add")} className="text-white">Add Blog</Button>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
                        {blogList.map((item) => (
                            <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                                <div className="text-[16px]">
                                    {item.title}
                                </div>
                                <div className="flex gap-5">
                                    <MdEdit onClick={() => router.push(`/admin/blogs/edit/${item._id}`)} />

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
            </div>
        </div>
    );
}

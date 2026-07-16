"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiAiGenerateText } from 'react-icons/ri'
import AdminItemContainer from '../common/AdminItemContainer'
import { toast } from 'sonner'
import TinyEditor from "@/app/components/TinyMce/TinyEditor";
import { Textarea } from '@/components/ui/textarea'
import { SeoFormValues } from '@/app/types/seo'
import SeoFields from '../common/SeoFields'



interface BlogFormProps {
    coverImage:string;
    coverImageAlt:string;
    title: string;
    category: string;
    content: string;
    thumbnail: string;
    thumbnailAlt: string;
    date: string;
    slug: string;
    seo: SeoFormValues;
}

const BlogForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [categoryList, setCategoryList] = useState<{ _id: string; name: string }[]>([]);

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<BlogFormProps>();


    const handleAddBlog = async (data: BlogFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/blog?id=${id}` : `/api/admin/blog`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push("/admin/blogs");
            }
        } catch (error) {
            console.log("Error in adding blog", error);
        }
    }

    const fetchBlogData = async () => {
        try {
            const response = await fetch(`/api/admin/blog?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setValue("title", data.data.title);
                setValue("coverImage", data.data.coverImage);
                setValue("coverImageAlt", data.data.coverImageAlt);
                setValue("category", data.data.category._id);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("content", data.data.content);
                setValue("slug", data.data.slug);
                const isoDate = new Date(data.data.date).toISOString().split("T")[0];
                setValue("date", isoDate);
                setValue("seo", data.data.seo);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    }


    const fetchCategory = async () => {
        try {
            const response = await fetch("/api/admin/blog/category");
            if (response.ok) {
                const data = await response.json();
                setCategoryList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching category", error);
        }
    }


    useEffect(() => {
        if (editMode) {
            fetchCategory().then(() => fetchBlogData());
        } else {
            fetchCategory();
        }
    }, []);

    useEffect(() => {
        if (watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, '-');
        setValue("slug", slug);
    }, [watch("slug")])

    const handleAutoGenerate = () => {
        const name = watch("title");
        if (!name) return;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setValue("slug", slug);
    };



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5 rounded-md' onSubmit={handleSubmit(handleAddBlog)}>

                <AdminItemContainer>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div>
                            <Label className=''>Title</Label>
                            <Input type='text' placeholder='Title' {...register("title", { required: "Title is required" })} />
                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                        </div>

                        <div className=' rounded-md flex flex-col gap-5'>
                            <div>
                                <Label className=''>Cover Image</Label>
                                <Controller
                                    name="coverImage"
                                    control={control}
                                    rules={{ required: "Cover Image is required" }}
                                    render={({ field }) => (
                                        <ImageUploader
                                            onChange={(url: string) => field.onChange(url)}
                                            value={field.value}
                                        />
                                    )}
                                />
                                {errors.coverImage && <p className='text-red-500'>{errors.coverImage.message}</p>}
                            </div>
                            <div>
                                <Label className=''>Cover Image Alt</Label>
                                <Input type='text' placeholder='Cover Image Alt' {...register("coverImageAlt", { required: "Cover Image Alt is required" })} />
                                {errors.coverImageAlt && <p className='text-red-500'>{errors.coverImageAlt.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className='flex gap-2 items-center mb-1'>
                                Slug
                                <div className='flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit' onClick={handleAutoGenerate}>
                                    <p>Auto Generate</p>
                                    <RiAiGenerateText />
                                </div>
                            </Label>
                            <Input type='text' placeholder='Slug' {...register("slug", {
                                required: "Slug is required", pattern: {
                                    value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                                    message: "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)"
                                }
                            })} />
                            {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className=''>Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue=""
                                    >

                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoryList.map((item, index) => (
                                                <SelectItem key={index} value={item._id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                        </div>

                        <div className='grid grid-cols-1 gap-2'>
                            <div>
                                <div>
                                    <Label className=''>Thumbnail</Label>
                                    <ImageUploader onChange={(url) => setValue("thumbnail", url)} value={watch("thumbnail")} />
                                    {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
                                </div>
                                <div>
                                    <Label className=''>Thumbnail Alt</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("thumbnailAlt")} />
                                </div>
                            </div>


                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className=''>Content</Label>
                            <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => {
                                return <TinyEditor setNewsContent={field.onChange} newsContent={field.value} />
                            }} />
                            {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
                        </div>

                        <div>
                            <Label className=''>Date</Label>
                            <Input type='date' placeholder='Date' max={new Date().toISOString().split("T")[0]} {...register("date", { required: "Date is required" })} />
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
                        </div>

                    </div>

                </AdminItemContainer>


                <SeoFields<BlogFormProps> control={control} register={register} errors={errors} />


                <div className='flex justify-center'>
                    <Button type='submit' className="cursor-pointer text-white w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default BlogForm
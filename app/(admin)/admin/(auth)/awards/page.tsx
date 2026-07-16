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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SeoFormValues } from "@/app/types/seo";
import SeoFields from "@/app/components/common/SeoFields";


interface AwardPageProps {
    seo: SeoFormValues;
    firstSection: {
        title: string;
    };
}


interface Award {
    _id: string;
    image: string;
    imageAlt: string;
    title: string;
    category: {
        name: string;
        _id: string;
    }
}



export default function Awards() {

    const [category, setCategory] = useState<string>("");
    const [awardList, setAwardList] = useState<Award[]>([]);
    const [categoryList, setCategoryList] = useState<{ _id: string, name: string }[]>([]);
    const [image, setImage] = useState("")
    const [imageAlt, setImageAlt] = useState("")
    const [title, setTitle] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("");

    const router = useRouter();

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AwardPageProps>();

    const handleFetchAwards = async () => {
        try {
            const response = await fetch("/api/admin/award");
            if (response.ok) {
                const data = await response.json();
                setAwardList(data.data.awards);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching awards", error);
        }
    }

    const handleAddCategory = async () => {
        try {
            const response = await fetch("/api/admin/award/category", {
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
            const response = await fetch("/api/admin/award/category");
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
            const response = await fetch(`/api/admin/award/category?id=${id}`, {
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
            const response = await fetch(`/api/admin/award/category?id=${id}`, {
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

    const handleAddAward = async () => {
        try {
            if (!image) {
                toast.error("Please upload an image");
                return;
            }

            if (!title.trim()) {
                toast.error("Please enter a title");
                return;
            }

            const response = await fetch("/api/admin/award", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image,
                    imageAlt,
                    title,
                    category: selectedCategory,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);

                setImage("");
                setImageAlt("");
                setTitle("");
                setSelectedCategory("");
                handleFetchAwards();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error adding award", error);
            toast.error("Something went wrong");
        }
    };


    const handleEditAward = async (id: string) => {
        try {
            if (!image) {
                toast.error("Please upload an image");
                return;
            }

            if (!title.trim()) {
                toast.error("Please enter a title");
                return;
            }

            if (!selectedCategory) {
                toast.error("Please select a category");
                return;
            }

            const response = await fetch(`/api/admin/award?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image,
                    imageAlt,
                    title,
                    category: selectedCategory,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);

                setImage("");
                setImageAlt("");
                setTitle("");
                setSelectedCategory("");

                handleFetchAwards();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error editing award", error);
            toast.error("Something went wrong");
        }
    };

    const handleDeleteAward = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/award?id=${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                handleFetchAwards();
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error deleting award", error);
        }
    }

    const onSubmit = async (data: AwardPageProps) => {
        try {
            const response = await fetch(`/api/admin/award`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in submitting award details", error);
        }
    }

    const fetchAwardDetails = async () => {
        try {
            const response = await fetch("/api/admin/award");
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);
                setValue("firstSection", data.data.firstSection);
                setAwardList(data.data.awards)
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching award details", error);
        }
    }

    useEffect(() => {
        // handleFetchAwards();
        handleFetchCategory();
        fetchAwardDetails();
    }, [])

    return (
        <div className="flex flex-col gap-5">

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <AdminItemContainer>
                    <Label className='' main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='grid grid-cols-2 gap-2 relative pb-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Title</Label>
                                        <Input type='text' placeholder='Title' {...register(`firstSection.title`, {
                                            required: "Title is required"
                                        })} />
                                        {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>

                <SeoFields<AwardPageProps> control={control} register={register} errors={errors} />

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
                        <Label className="text-sm font-bold">Awards</Label>
                        {/* <Button onClick={() => router.push("/admin/awards/add")} className="text-white">Add Award</Button> */}
                        <Dialog>
                            <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md">Add Award</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Award</DialogTitle>
                                </DialogHeader>

                                <div className="flex flex-col gap-4">
                                    {/* Image */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold">Image</Label>

                                        <ImageUploader
                                            value={image}
                                            onChange={setImage}
                                            recommendedDimension="Recommended: 60 x 50 (px)"
                                        />

                                    </div>

                                    {/* Alt Tag */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold">Alt Tag</Label>
                                        <Input
                                            type="text"
                                            placeholder="Alt Tag"
                                            value={imageAlt}
                                            onChange={(e) => setImageAlt(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold">Category</Label>

                                        <Select
                                            value={selectedCategory}
                                            onValueChange={setSelectedCategory}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {categoryList.map((category) => (
                                                    <SelectItem
                                                        key={category._id}
                                                        value={category._id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Title */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold">Title</Label>
                                        <Input
                                            type="text"
                                            placeholder="Award Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleAddAward()}>Save</DialogClose>
                                </div>
                            </DialogContent>

                        </Dialog>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
                        {awardList.map((item) => (
                            <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                                <div className="text-[16px]">
                                    {item.title}
                                </div>
                                <div className="flex gap-5">
                                    <Dialog>
                                        <DialogTrigger onClick={() => { setImage(item.image); setImageAlt(item.imageAlt); setTitle(item.title); setSelectedCategory(item.category?._id ?? ""); }}><MdEdit /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Award</DialogTitle>
                                            </DialogHeader>

                                            <div className="flex flex-col gap-4">
                                                {/* Image */}
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Image</Label>

                                                    <ImageUploader
                                                        value={image}
                                                        onChange={setImage}
                                                        recommendedDimension="Recommended: 60 x 50 (px)"
                                                    />

                                                </div>

                                                {/* Alt Tag */}
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Alt Tag</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Alt Tag"
                                                        value={imageAlt}
                                                        onChange={(e) => setImageAlt(e.target.value)}
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Category</Label>

                                                    <Select
                                                        value={selectedCategory}
                                                        onValueChange={setSelectedCategory}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            {categoryList.map((category) => (
                                                                <SelectItem
                                                                    key={category._id}
                                                                    value={category._id}
                                                                >
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Title */}
                                                <div className="flex flex-col gap-2">
                                                    <Label className="font-bold">Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Award Title"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </div>

                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditAward(item._id)}>Save</DialogClose>
                                            </div>
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
                                                <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteAward(item._id)}>Yes</DialogClose>
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

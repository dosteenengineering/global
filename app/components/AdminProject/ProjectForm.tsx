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
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image'
import { RiAiGenerateText } from 'react-icons/ri'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ImageCard from './ImageCard'
import { TbReorder } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import AdminItemContainer from '../common/AdminItemContainer'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { statusData } from './statusData'



interface ProjectFormProps {
    bannerSection: {
        image: string;
        imageAlt: string;
    };

    firstSection: {
        title: string;
        description: string;
        sector: string;
        location: string;
        status: string;
        client: string;
        consultant: string;
        contractor: string;
        coverImage: string;
        coverImageAlt: string;
    };

    secondSection: {
        title: string;
        description: string;
    };

    thirdSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
        }[];
    };

    fourthSection: {
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };

    scopeSection: {
        items: {
            title: string;
        }[];
    };

    fifthSection: {
        title: string;
        description: string;
    };

    images: string[];

    slug: string;

    thumbnail: string;
    thumbnailAlt: string;

    metaTitle: string;
    metaDescription: string;
}

const ProjectForm = ({ editMode }: { editMode?: boolean }) => {

    const router = useRouter();
    const { id } = useParams();

    const [sectorList, setSectorList] = useState<{ _id: string; name: string }[]>([]);
    const [locationList, setLocationList] = useState<{ _id: string; name: string }[]>([]);
    const [reorderMode, setReorderMode] = useState(false);

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<ProjectFormProps>();


    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
    });

    const { fields: scopeItems, append: scopeSectionAppend, remove: scopeSectionRemove } = useFieldArray({
        control,
        name: "scopeSection.items"
    });


    const handleAddProject = async (data: ProjectFormProps) => {
        try {
            const response = await fetch(editMode ? `/api/admin/project?id=${id}` : `/api/admin/project`, {
                method: editMode ? "PATCH" : "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                router.push("/admin/projects");
            }
        } catch (error) {
            console.log("Error in adding project", error);
        }
    }

    const fetchProjectData = async () => {
        try {
            const response = await fetch(`/api/admin/project?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setValue("bannerSection", data.data.bannerSection);
                setValue("firstSection", {
                    ...data.data.firstSection,
                    sector: data.data.firstSection.sector?._id || "",
                    location: data.data.firstSection.location?._id || "",
                });
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("scopeSection.items", data.data.scopeSection.items);
                setValue("thumbnail", data.data.thumbnail);
                setValue("thumbnailAlt", data.data.thumbnailAlt);
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("images", data.data.images);
                setValue("slug", data.data.slug);
                setImageUrls(data.data.images);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error in fetching blog data", error);
        }
    }


    const fetchLocation = async () => {
        try {
            const response = await fetch("/api/admin/project/location");
            if (response.ok) {
                const data = await response.json();
                setLocationList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching location", error);
        }
    }

    const fetchSector = async () => {
        try {
            const response = await fetch("/api/admin/project/sector");
            if (response.ok) {
                const data = await response.json();
                setSectorList(data.data);
            }
        } catch (error) {
            console.log("Error in fetching sector", error);
        }
    }


    useEffect(() => {
        if (editMode) {
            fetchLocation().then(() => fetchSector()).then(() => fetchProjectData());
        } else {
            fetchLocation().then(() => fetchSector());
        }
    }, []);

    useEffect(() => {
        if (watch("slug") === undefined) return;
        const slug = watch("slug").replace(/\s+/g, '-');
        setValue("slug", slug);
    }, [watch("slug")])

    const handleAutoGenerate = () => {
        const name = watch("firstSection.title");
        if (!name) return;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
        setValue("slug", slug);
    };



    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const handleImageUpload = async (uploadedUrl: string) => {
        setImageUrls((prev) => [...prev, uploadedUrl]);
        setValue("images", [...imageUrls, uploadedUrl]);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
        setValue(
            "images",
            imageUrls.filter((_, index) => index !== indexToRemove)
        );
    };


    const getTaskPos = (id: string) => imageUrls.findIndex((item: string) => (item == id))
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = getTaskPos(active.id as string);
        const newIndex = getTaskPos(over.id as string);

        const newPosition = arrayMove(imageUrls, oldIndex, newIndex);
        setImageUrls(newPosition);
        setValue("images", newPosition);

    };

    useEffect(() => {
        console.log(imageUrls);
    }, [imageUrls]);



    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5 rounded-md' onSubmit={handleSubmit(handleAddProject)}>

                <div className='flex flex-col gap-2 p-5 rounded-md bg-white shadow-md'>

                    <div>
                        <div className='flex justify-between items-center'>
                            <Label className="block text-sm">Images</Label>
                            <Button className="bg-green-600 text-white" type="button" onClick={() => setReorderMode(!reorderMode)}>{reorderMode ? <GiConfirmed /> : <TbReorder />}</Button>
                        </div>
                        <div className="mt-2">
                            <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} multiple={true} />
                        </div>

                        {reorderMode && <div className="mt-4 grid grid-cols-3 gap-4">
                            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                                <SortableContext items={imageUrls} strategy={verticalListSortingStrategy}>
                                    {imageUrls.map((url, index) => (
                                        <ImageCard key={url} url={url} index={index} handleRemoveImage={handleRemoveImage} id={url} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>}


                        {!reorderMode && <div className="mt-4 grid grid-cols-3 gap-4">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="relative h-40">
                                    <Image
                                        src={url}
                                        alt={`Uploaded image ${index + 1}`}
                                        className="h-full w-full object-cover rounded-lg"
                                        width={100}
                                        height={100}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>}
                    </div>



                </div>

                <AdminItemContainer>
                    <Label className='' main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div>
                            <Label className=''>Title</Label>
                            <Input type='text' placeholder='Title' {...register("firstSection.title", { required: "Title is required" })} />
                            {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection.title.message}</p>}
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
                            <Label className=''>Sector</Label>
                            <Controller
                                name="firstSection.sector"
                                control={control}
                                rules={{ required: "Sector is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue=""
                                    >

                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Sector" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sectorList.map((item, index) => (
                                                <SelectItem key={index} value={item._id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.firstSection?.sector && <p className="text-red-500">{errors.firstSection.sector.message}</p>}

                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label className=''>Location</Label>
                            <Controller
                                name="firstSection.location"
                                control={control}
                                rules={{ required: "Location is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue=""
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locationList.map((item, index) => (
                                                <SelectItem key={index} value={item._id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.firstSection?.location && <p className="text-red-500">{errors.firstSection.location.message}</p>}

                        </div>


                        <div className='flex flex-col gap-2'>
                            <Label className=''>Status</Label>
                            <Controller
                                name="firstSection.status"
                                control={control}
                                rules={{ required: "Status is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue=""
                                    >
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusData.map((item, index) => (
                                                <SelectItem key={index} value={item.value.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.firstSection?.status && <p className="text-red-500">{errors.firstSection.status.message}</p>}

                        </div>

                        <div>
                            <Label className=''>Client</Label>
                            <Input type='text' placeholder='Client' {...register("firstSection.client")} />
                        </div>

                        <div>
                            <Label className=''>Architect / Consultant</Label>
                            <Input type='text' placeholder='Client' {...register("firstSection.consultant")} />
                        </div>

                        <div>
                            <Label className=''>Contractor</Label>
                            <Input type='text' placeholder='Contractor' {...register("firstSection.contractor")} />
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
                                    {errors.thumbnailAlt && <p className='text-red-500'>{errors.thumbnailAlt.message}</p>}
                                </div>
                            </div>


                        </div>

                    </div>

                </AdminItemContainer>

                <AdminItemContainer>
                    <Label className='' main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div>
                            <Label className=''>Title</Label>
                            <Input type='text' placeholder='Title' {...register("secondSection.title", { required: "Title is required" })} />
                            {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection.title.message}</p>}
                        </div>
                        <div>
                            <Label className=''>Description</Label>
                            <Textarea placeholder='Description' {...register("secondSection.description", { required: "Description is required" })} />
                            {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection.description.message}</p>}
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='' main>Third Section</Label>
                    <div className='p-5 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>

                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>

                            <div>
                                <Label className=''>Description</Label>
                                <Textarea placeholder='Description' {...register("thirdSection.description", { required: "Description is required" })} />
                                {errors.thirdSection?.description && <p className='text-red-500'>{errors.thirdSection.description.message}</p>}
                            </div>

                        </div>


                        <div className='flex flex-col gap-2'>
                            <Label className=' font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-5'>


                                {thirdSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r border-black/20  pr-5 last:border-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className=' font-bold'>Image</Label>
                                            <Controller
                                                name={`thirdSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        isLogo
                                                    />
                                                )}
                                            />
                                            {errors.thirdSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.thirdSection?.items?.[index]?.image.message}</p>
                                            )}

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className=' font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`)} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}



                            </div>

                            <div className='flex justify-end'>
                                <Button type='button' className="" addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "" })}>Add Item</Button>
                            </div>

                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='' main>Fourth Section</Label>
                    <div className='p-5 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <Label className=' font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                                {fourthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20  pb-5'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className=' font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`, { required: "Title is required" })} />
                                                {errors.fourthSection?.items?.[index]?.title && (
                                                    <p className="text-red-500">{errors.fourthSection?.items?.[index]?.title.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label className=''>Description</Label>
                                            <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`, { required: "Description is required" })} />
                                            {errors.fourthSection?.items?.[index]?.description && (
                                                <p className="text-red-500">{errors.fourthSection?.items?.[index]?.description.message}</p>
                                            )}
                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => fourthSectionAppend({ title: "", description: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='' main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div>
                            <Label className=''>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fifthSection.title", { required: "Title is required" })} />
                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection.title.message}</p>}
                        </div>
                        <div>
                            <Label className=''>Description</Label>
                            <Textarea placeholder='Description' {...register("fifthSection.description", { required: "Description is required" })} />
                            {errors.fifthSection?.description && <p className='text-red-500'>{errors.fifthSection.description.message}</p>}
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='' main>Scope Section</Label>
                    <div className='p-5 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Label className=' font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                                {scopeItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20  pb-5'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => scopeSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className=' font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`scopeSection.items.${index}.title`, { required: "Title is required" })} />
                                                {errors.scopeSection?.items?.[index]?.title && (
                                                    <p className="text-red-500">{errors.scopeSection?.items?.[index]?.title.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => scopeSectionAppend({ title: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>


                    </div>
                </AdminItemContainer>



                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="flex flex-col gap-2 p-5">

                        <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
                            <div>
                                <Label>Title</Label>
                                <Input type="text" {...register("metaTitle")} />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input type="text" {...register("metaDescription")} />
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>


                <div className='flex justify-center w-full'>
                    <Button type='submit' className="cursor-pointer text-white w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ProjectForm
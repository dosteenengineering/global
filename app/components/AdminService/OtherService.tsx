"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ProductCard from './ProductCard';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SeoFormValues } from '@/app/types/seo';
import SeoFields from '../common/SeoFields';

interface IndividualServiceFormProps {
    type: string;

    seo: SeoFormValues;

    bannerSection: {
        image: string;
        imageAlt: string;
        title: string;
    };

    firstSection: {
        title: string;
        image: string;
        imageAlt: string;
        homeImage: string;
        homeImageAlt: string;
        firstDescription: string;
        secondDescription: string;
    };

    secondSection: {
        title: string;
        items: {
            logo: string;
            logoAlt: string;
            title: string;
        }[];
    };

    systemSection: {
        title: string;
        items: string[];
    };

    thirdSection: {
        description: string;
        buttonText: string;
        buttonLink: string;
    };

    lowPolySection: {
        items: {
            title: string;
            systemSlug: string;
            marker: { x: string; y: string };
            label: { x: string; y: string };
            side: "left" | "right";
        }[];
    };

    availableSystems?: {
        slug: string | number | readonly string[] | undefined;
        _id: string;
        firstSection: {
            title: string;
        };
    }[];
}

const IndividualService = () => {

    const { id } = useParams();


    const [systemData, setSystemData] = useState<{ _id: string, image: string, imageAlt: string, title: string, description: string, checked: boolean }[] | null>(null);


    const { register, handleSubmit, setValue, control, formState: { errors }, getValues, watch } = useForm<IndividualServiceFormProps>();


    const {
        fields: lowPolyItems,
        append: lowPolyAppend,
        remove: lowPolyRemove,
    } = useFieldArray({
        control,
        name: "lowPolySection.items",
    });

    const handleAddIndividualService = async (data: IndividualServiceFormProps) => {

        try {

            const response = await fetch(`/api/admin/service?id=${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding individual service", error);
        }
    }

    const fetchIndividualServiceData = async () => {
        try {
            const response = await fetch(`/api/admin/service?id=${id}`);

            const result = await response.json();

            if (response.ok) {
                const data = result.data;

                setValue("seo", data.seo);

                setValue("firstSection", {
                    title: data.firstSection?.title || "",
                    image: data.firstSection?.image || "",
                    imageAlt: data.firstSection?.imageAlt || "",
                    homeImage: data.firstSection?.homeImage || "",
                    homeImageAlt: data.firstSection?.homeImageAlt || "",
                    firstDescription:
                        data.firstSection?.firstDescription || "",
                    secondDescription:
                        data.firstSection?.secondDescription || "",
                });

                setValue("secondSection", {
                    title: data.secondSection?.title || "",
                    items: data.secondSection?.items || [],
                });

                setValue("systemSection", {
                    title: data.systemSection?.title || "",
                    items:
                        data.systemSection?.items?.map((item: any) =>
                            typeof item === "string" ? item : item._id
                        ) || [],
                });

                setValue("thirdSection", {
                    description: data.thirdSection?.description || "",
                    buttonText: data.thirdSection?.buttonText || "",
                    buttonLink: data.thirdSection?.buttonLink || "",
                });

                setValue("lowPolySection.items", data.lowPolySection.items)

            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log("Error in fetching individual service data", error);
        }
    };

    const fetchSystemData = async () => {
        try {
            const response = await fetch(`/api/admin/system`);

            if (response.ok) {
                const data = await response.json();

                setValue("availableSystems", data.data);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching systems", error);
        }
    };


    useEffect(() => {
        fetchIndividualServiceData().then(() => fetchSystemData());
    }, []);


    const availableSystems = watch("availableSystems") || [];

    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddIndividualService)}>
                <AdminItemContainer>
                    <Label main>First Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name="firstSection.image"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                recommendedDimension="Recommended: 637 x 508 (px)"
                                            />
                                        )}
                                    />
                                    {errors.firstSection?.image && (
                                        <p className="text-red-500">{errors.firstSection?.image.message}</p>
                                    )}
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("firstSection.imageAlt")} />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Home Image</Label>
                                    <Controller
                                        name="firstSection.homeImage"
                                        control={control}
                                        render={({ field }) => (
                                            <ImageUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                recommendedDimension="Recommended: 637 x 508 (px)"
                                            />
                                        )}
                                    />
                                    <Label className='font-bold'>Home Alt Tag</Label>
                                    <Input type='text' placeholder='Home Alt Tag' {...register("firstSection.homeImageAlt")} />
                                </div>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>


                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>First Description</Label>
                                <Controller name="firstSection.firstDescription" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Second Description</Label>
                                <Controller name="firstSection.secondDescription" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Systems Section</Label>

                    <div className="p-5 flex flex-col gap-5 rounded-md">

                        <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>

                            <Input
                                type="text"
                                placeholder="Title"
                                {...register("systemSection.title", {
                                    required: "Title is required",
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label className="font-bold">Select Systems</Label>

                            <Controller
                                control={control}
                                name="systemSection.items"
                                defaultValue={[]}
                                render={({ field }) => (
                                    <div className="grid grid-cols-2 gap-3">

                                        {availableSystems.map((system) => {
                                            const checked = field.value?.includes(system._id);

                                            return (
                                                <div
                                                    key={system._id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => {
                                                            if (checked) {
                                                                field.onChange(
                                                                    field.value.filter(
                                                                        (id: string) =>
                                                                            id !== system._id
                                                                    )
                                                                );
                                                            } else {
                                                                field.onChange([
                                                                    ...(field.value || []),
                                                                    system._id,
                                                                ]);
                                                            }
                                                        }}
                                                    />

                                                    <span>
                                                        {system.firstSection?.title}
                                                    </span>
                                                </div>
                                            );
                                        })}

                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='' main>Third Section</Label>
                    <div className='p-5  flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("thirdSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.thirdSection?.description && <p className='text-red-500'>{errors.thirdSection?.description.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("thirdSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("thirdSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Low Poly Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                {lowPolyItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-4 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => lowPolyRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>System</Label>
                                            <Controller
                                                control={control}
                                                name={`lowPolySection.items.${index}.systemSlug`}
                                                // rules={{ required: "System is required" }}
                                                render={({ field }) => (
                                                    <select className='border rounded-md p-2' {...field}>
                                                        <option value="">Select a system</option>
                                                        {availableSystems.map((system) => (
                                                            <option key={system._id} value={system.slug}>
                                                                {system.firstSection?.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {/* {errors.lowPolySection?.items?.[index]?.systemSlug && (
                                                <p className='text-red-500'>
                                                    {errors.lowPolySection.items[index]?.systemSlug?.message}
                                                </p>
                                            )} */}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input
                                                type='text'
                                                placeholder='Title'
                                                {...register(`lowPolySection.items.${index}.title`, {
                                                    required: "Title is required",
                                                })}
                                            />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Side</Label>
                                            <select
                                                className='border rounded-md p-2'
                                                {...register(`lowPolySection.items.${index}.side`)}
                                            >
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>
                                            </select>
                                        </div>

                                        <div /> {/* spacer to keep the grid aligned */}

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Marker X</Label>
                                            <Input type='text' {...register(`lowPolySection.items.${index}.marker.x`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Marker Y</Label>
                                            <Input type='text' {...register(`lowPolySection.items.${index}.marker.y`)} />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Label X</Label>
                                            <Input type='text' {...register(`lowPolySection.items.${index}.label.x`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Label Y</Label>
                                            <Input type='text' {...register(`lowPolySection.items.${index}.label.y`)} />
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button
                                    type='button'
                                    addItem
                                    onClick={() =>
                                        lowPolyAppend({
                                            title: "",
                                            systemSlug: "",
                                            marker: { x: "", y: "" },
                                            label: { x: "", y: "" },
                                            side: "left",
                                        })
                                    }
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>


                <SeoFields<IndividualServiceFormProps> control={control} register={register} errors={errors} />

                <div className='flex justify-center'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default IndividualService
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

interface IndividualServiceFormProps {
    metaTitle: string;
    metaDescription: string;

    firstSection: {
        title: string;
        image: string;
        imageAlt: string;
        description: string;
    };

    secondSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
        }[];
    };

    systemSection: {
        title: string;
        items: string[];
    };

    thirdSection: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };

    fourthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            number: string;
            value: string;
        }[];
    };

    availableSystems?: {
        _id: string;
        firstSection: {
            title: string;
        };
    }[];
}

const IndividualService = () => {

    const { id } = useParams();


    const [systemData, setSystemData] = useState<{ _id: string, image: string, imageAlt: string, title: string, description: string, checked: boolean }[] | null>(null);


    const { register, handleSubmit, setValue, control, formState: { errors }, getValues, watch,reset } = useForm<IndividualServiceFormProps>();

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
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

                reset({
                    metaTitle: data.metaTitle || "",
                    metaDescription: data.metaDescription || "",

                    firstSection: {
                        title: data.firstSection?.title || "",
                        image: data.firstSection?.image || "",
                        imageAlt: data.firstSection?.imageAlt || "",
                        description: data.firstSection?.description || "",
                    },

                    secondSection: {
                        title: data.secondSection?.title || "",
                        description: data.secondSection?.description || "",
                        items: data.secondSection?.items || [],
                    },

                    systemSection: {
                        title: data.systemSection?.title || "",
                        items:
                            data.systemSection?.items?.map((item: any) =>
                                typeof item === "string" ? item : item._id
                            ) || [],
                    },

                    thirdSection: {
                        title: data.thirdSection?.title || "",
                        description: data.thirdSection?.description || "",
                        buttonText: data.thirdSection?.buttonText || "",
                        buttonLink: data.thirdSection?.buttonLink || "",
                    },

                    fourthSection: {
                        title: data.fourthSection?.title || "",
                        items: data.fourthSection?.items || [],
                    },
                });
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
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("firstSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.firstSection?.title && <p className='text-red-500'>{errors.firstSection?.title.message}</p>}
                            </div>


                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="firstSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label className='' main>Second Section</Label>
                    <div className='p-5 flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className=' font-bold'>Description</Label>
                                <Textarea placeholder='Description' {...register("secondSection.description", {
                                    required: "Description is required"
                                })} />
                                {errors.secondSection?.description && <p className='text-red-500'>{errors.secondSection?.description.message}</p>}
                            </div>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <Label className=' font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-5'>


                                {secondSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r border-black/20  pr-5 last:border-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className=' font-bold'>Image</Label>
                                            <Controller
                                                name={`secondSection.items.${index}.image`}
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
                                            {errors.secondSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.secondSection?.items?.[index]?.image.message}</p>
                                            )}

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className=' font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`)} />
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end'>
                                <Button type='button' className="" addItem onClick={() => secondSectionAppend({ image: "", imageAlt: "" })}>Add Item</Button>
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

                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                    required: "Button Text is required"
                                })} />
                            </div>

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
                    <Label main>Fourth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

                        </div>


                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                                {fourthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`fourthSection.items.${index}.image`}
                                                    control={control}
                                                    
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 742 x 439 (px)"
                                                        />
                                                    )}
                                                />
                                                
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.imageAlt`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.fourthSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.imageAlt.message}</p>}
                                                </div>
                                            </div>


                                        </div>

                                        <div className='flex flex-col gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Number</Label>
                                                    <Input type='text' placeholder='Number' {...register(`fourthSection.items.${index}.number`, {
                                                        required: "Number is required"
                                                    })} />
                                                    {errors.fourthSection?.items?.[index]?.number && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.number.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Value</Label>
                                                    <Input type='text' placeholder='Value' {...register(`fourthSection.items.${index}.value`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.fourthSection?.items?.[index]?.value && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.value.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => fourthSectionAppend({ number: "", value: "", image: "", imageAlt: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>



                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className="p-5 flex flex-col gap-2">
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

                <div className='flex justify-center'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default IndividualService
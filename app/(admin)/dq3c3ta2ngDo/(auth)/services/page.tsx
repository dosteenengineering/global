"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiAiGenerateText, RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useRefetchServices } from '@/app/contexts/refetchServices';
import { SeoFormValues } from '@/app/types/seo';
import SeoFields from '@/app/components/common/SeoFields';

export interface ServiceFormProps {

    seo: SeoFormValues;
    firstSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    };
    secondSection: {
        title: string;
        description: string;
    };
    thirdSection: {
        title: string;
        items: {
            title: string;
            homeTitle:string;
            description: string;
            image: string;
            imageAlt: string;
            buttonLink: string;
            slug:string;
        }[];
    };
}

const ServicePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<ServiceFormProps>();

    const { refetchServices, setRefetchServices } = useRefetchServices();

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });



    const handleAddService = async (data: ServiceFormProps) => {
        try {
            const response = await fetch(`/api/admin/service`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setRefetchServices(!refetchServices);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding Service", error);
        }
    }

    const fetchServiceData = async () => {
        try {
            const response = await fetch(`/api/admin/service`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching Service data", error);
        }
    }

    const handleAutoGenerate = (index: number) => {
        const title = watch(`thirdSection.items.${index}.title`);

        if (!title) return;

        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        setValue(`thirdSection.items.${index}.slug`, slug);
    };


    useEffect(() => {
        fetchServiceData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddService)}>

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

                            {/* <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Highlight Text</Label>
                                <Input type='text' placeholder='Highlight Text' {...register("firstSection.highlightText", {
                                    required: "Highlight Text is required"
                                })} />
                                {errors.firstSection?.highlightText && <p className='text-red-500'>{errors.firstSection?.highlightText.message}</p>}
                            </div> */}

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
                    <Label main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("secondSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.secondSection?.title && <p className='text-red-500'>{errors.secondSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="secondSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Third Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md flex flex-col gap-2'>
                            {thirdSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-4 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Image</Label>
                                            <Controller
                                                name={`thirdSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Logo is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        recommendedDimension="Recommended: 60 x 50 (px)"
                                                    />
                                                )}
                                            />
                                            {errors.thirdSection?.items?.[index]?.image && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.image.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`)} />
                                        </div>

                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`)} />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title For Home (Solutions Section)</Label>
                                            <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.homeTitle`)} />
                                        </div>

                                        <div>
                                            <Label className="flex gap-2 items-center mb-1">
                                                Slug
                                                <div
                                                    className="flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit"
                                                    onClick={() => handleAutoGenerate(index)}
                                                >
                                                    <p>Auto Generate</p>
                                                    <RiAiGenerateText />
                                                </div>
                                            </Label>

                                            <Input
                                                type="text"
                                                placeholder="Slug"
                                                {...register(`thirdSection.items.${index}.slug`, {
                                                    onBlur: (e) => {
                                                        const slug = e.target.value
                                                            .toLowerCase()
                                                            .trim()
                                                            .replace(/[^a-z0-9]+/g, "-")
                                                            .replace(/^-+|-+$/g, "");

                                                        setValue(`thirdSection.items.${index}.slug`, slug);
                                                    },
                                                })}
                                            />

                                            {errors.thirdSection?.items?.[index]?.slug && (
                                                <p className="text-red-500">
                                                    {errors.thirdSection.items[index]?.slug?.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <Label className='font-bold'>Description</Label>
                                            <Controller name={`thirdSection.items.${index}.description`} control={control} render={({ field }) => {
                                                return <Textarea value={field.value} onChange={field.onChange} />
                                            }} />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Link</Label>
                                            <Input type='text' placeholder='Button Link' {...register(`thirdSection.items.${index}.buttonLink`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "", title: "", description: "", buttonLink: "",slug:"", homeTitle:"" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>


                <SeoFields<ServiceFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ServicePage
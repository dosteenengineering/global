"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useRefetchServices } from '@/app/contexts/refetchServices';

export interface ServiceFormProps {

    metaTitle: string;
    metaDescription: string;
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
            description: string;
            image: string;
            imageAlt: string;
            buttonLink: string;
        }[];
    };
}

const ServicePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ServiceFormProps>();

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
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
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

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`)} />
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
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "", title: "", description: "", buttonLink: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>SEO</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='' {...register("metaTitle")} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Description</Label>
                            <Input type='text' placeholder='' {...register("metaDescription")} />
                        </div>

                        {/* <div className='flex flex-col gap-2 w-1/2'>
                            <Label className='font-bold'>Og Type</Label>
                            <Controller
                                name={`ogType`}
                                control={control}

                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue="website"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="website">
                                                website
                                            </SelectItem>
                                            <SelectItem value="article">
                                                article
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                        </div> */}


                        {/* <div className='flex flex-col gap-2 w-1/2'>
                            <Label className='font-bold'>Og Image</Label>
                            <Controller
                                name={`ogImage`}
                                control={control}

                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        isLogo
                                    />
                                )}
                            />
                        </div> */}

                    </div>

                </AdminItemContainer>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ServicePage
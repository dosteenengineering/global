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
import { useRefetchSecondSection } from '@/app/contexts/refetchSecondSection';

export interface ResourceFormProps {
    metaTitle: string;
    metaDescription: string;

    bannerSection: {
        image: string;
        imageAlt: string;
        title: string;
    };

    secondSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };

    thirdSection: {
        title: string;
        buttonText: string;
        buttonLink: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            subTitle: string;
            pillText: string;
        }[];
    };

    fourthSection: {
        title: string;
        items: {
            title: string;
            description: string;
            buttonText: string;
            buttonLink: string;
        }[];
    };

    fifthSection: {
        title: string;
        description: string;
        buttonText: string;
    };

    lastSection: {
        title: string;
        description: string;
        items: {
            buttonText: string;
            buttonLink: string;
        }[];
    };
}

const ResourcePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ResourceFormProps>();

    const {refetchSecondSection,setRefetchSecondSection} = useRefetchSecondSection();

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: thirdSectionItems, append: thirdSectionAppend, remove: thirdSectionRemove } = useFieldArray({
        control,
        name: "thirdSection.items"
    });

    const { fields: fourthSectionItems, append: fourthSectionAppend, remove: fourthSectionRemove } = useFieldArray({
        control,
        name: "fourthSection.items"
    });


    const { fields: lastSectionItems, append: lastSectionAppend, remove: lastSectionRemove } = useFieldArray({
        control,
        name: "lastSection.items"
    });


    const handleAddResource = async (data: ResourceFormProps) => {
        try {
            const response = await fetch(`/api/admin/resource`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setRefetchSecondSection(!refetchSecondSection)
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding resource", error);
        }
    }


    const fetchResourceData = async () => {
        try {
            const response = await fetch(`/api/admin/resource`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("bannerSection", data.data.bannerSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection", data.data.fifthSection);
                setValue("lastSection", data.data.lastSection);
                setValue("lastSection.items", data.data.lastSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching resource data", error);
        }
    }



    useEffect(() => {
        fetchResourceData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddResource)}>

                <AdminItemContainer>
                    <Label main>Banner Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Image</Label>
                                    <Controller
                                        name="bannerSection.image"
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
                                    {errors.bannerSection?.image && (
                                        <p className="text-red-500">{errors.bannerSection?.image.message}</p>
                                    )}
                                    <Label className='font-bold'>Alt Tag</Label>
                                    <Input type='text' placeholder='Alt Tag' {...register("bannerSection.imageAlt")} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("bannerSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.bannerSection?.title && <p className='text-red-500'>{errors.bannerSection?.title.message}</p>}
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Second Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`secondSection.title`, {
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
                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-2'>
                            {secondSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r border-black/20 pr-2 last:border-r-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Image</Label>
                                        <Controller
                                            name={`secondSection.items.${index}.image`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    isLogo
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    recommendedDimension="Recommended: 30 x 35 (px)"
                                                />
                                            )}
                                        />
                                        {errors.secondSection?.items?.[index]?.image && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.image.message}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`)} />
                                    </div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`)} />
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => secondSectionAppend({ title: "",image:"",imageAlt:"" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Third Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`thirdSection.title`, {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Button Text</Label>
                            <Input type='text' placeholder='Button Text' {...register(`thirdSection.buttonText`, {
                                required: "Button Text is required"
                            })} />
                            {errors.thirdSection?.buttonText && <p className='text-red-500'>{errors.thirdSection?.buttonText.message}</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Button Link</Label>
                            <Input type='text' placeholder='Button Link' {...register(`thirdSection.buttonLink`, {
                                required: "Button Link is required"
                            })} />
                            {errors.thirdSection?.buttonLink && <p className='text-red-500'>{errors.thirdSection?.buttonLink.message}</p>}
                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-2'>
                            {thirdSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-r border-black/20 pr-2 last:border-r-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => thirdSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Image</Label>
                                        <Controller
                                            name={`thirdSection.items.${index}.image`}
                                            control={control}
                                            rules={{ required: "Image is required" }}
                                            render={({ field }) => (
                                                <ImageUploader
                                                    isLogo
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    recommendedDimension="Recommended: 30 x 35 (px)"
                                                />
                                            )}
                                        />
                                        {errors.thirdSection?.items?.[index]?.image && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.image.message}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Alt Tag</Label>
                                        <Input type='text' placeholder='Alt Tag' {...register(`thirdSection.items.${index}.imageAlt`)} />
                                    </div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`,{required:"Title is required"})} />
                                        </div>
                                        {errors.thirdSection?.items?.[index]?.title && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.title.message}</p>}
                                    </div>
                                    </div>
                                    <div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Pill Text</Label>
                                            <Input type='text' placeholder='Pill Text' {...register(`thirdSection.items.${index}.pillText`,{required:"Pill Text is required"})} />
                                        </div>
                                        {errors.thirdSection?.items?.[index]?.pillText && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.pillText.message}</p>}
                                    </div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Sub Title</Label>
                                            <Input type='text' placeholder='Sub Title' {...register(`thirdSection.items.${index}.subTitle`,{required:"Sub Title is required"})} />
                                        </div>
                                        {errors.thirdSection?.items?.[index]?.subTitle && <p className='text-red-500'>{errors.thirdSection?.items?.[index]?.subTitle.message}</p>}
                                    </div>
                                    </div>
                                
                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ image:"", imageAlt:"", title: "", subTitle:"", pillText:"" })}>Add Item</Button>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Fourth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`fourthSection.title`, {
                                required: "Title is required"
                            })} />
                            {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-2'>
                            {fourthSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-r border-black/20 pr-2 last:border-r-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`,{required:"Title is required"})} />
                                        </div>
                                        {errors.fourthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.title.message}</p>}
                                    </div>
                                    <div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Text</Label>
                                            <Input type='text' placeholder='Button Text' {...register(`fourthSection.items.${index}.buttonText`,{required:"Button Text is required"})} />
                                        </div>
                                        {errors.fourthSection?.items?.[index]?.buttonText && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.buttonText.message}</p>}
                                    </div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Link</Label>
                                            <Input type='text' placeholder='Button Link' {...register(`fourthSection.items.${index}.buttonLink`,{required:"Button Link is required"})} />
                                        </div>
                                        {errors.fourthSection?.items?.[index]?.buttonLink && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.buttonLink.message}</p>}
                                    </div>
                                    </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`,{required:"Description is required"})} />
                                        </div>
                                        {errors.fourthSection?.items?.[index]?.description && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.description.message}</p>}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => fourthSectionAppend({ title: "", description:"", buttonText:"", buttonLink:"" })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Fifth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`fifthSection.title`, {
                                required: "Title is required"
                            })} />
                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="fifthSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Button Text</Label>
                            <Input type='text' placeholder='Button Text' {...register(`fifthSection.buttonText`, {
                                required: "Button Text is required"
                            })} />
                            {errors.fifthSection?.buttonText && <p className='text-red-500'>{errors.fifthSection?.buttonText.message}</p>}
                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Last Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`lastSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.lastSection?.title && <p className='text-red-500'>{errors.lastSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="lastSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md'>
                            {lastSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => lastSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Text</Label>
                                            <Input type='text' placeholder='Button Text' {...register(`lastSection.items.${index}.buttonText`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Link</Label>
                                            <Input type='text' placeholder='Button Link' {...register(`lastSection.items.${index}.buttonLink`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => lastSectionAppend({ buttonText: "", buttonLink: "" })}>Add Item</Button>
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
                    </div>

                </AdminItemContainer>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ResourcePage
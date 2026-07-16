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
import { VideoUploader } from '@/components/ui/video-uploader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { image } from 'framer-motion/client';
import { SeoFormValues } from '@/app/types/seo';
import SeoFields from '@/app/components/common/SeoFields';

export interface HomeFormProps {
    seo: SeoFormValues;

    bannerSection: {
        image: string;
        imageAlt: string;
        title: string;
        buttonText: string;
        buttonLink: string;
        mobileImage: string;
        desktopImage: string;
    };

    secondSection: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        items: {
            number: string;
            value: string;
            image: string;
            imageAlt: string;
        }[];
    };

    thirdSection: {
        title: string;
        image: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
        }[];
    };

    fourthSection: {
        title: string;
        buttonText: string;
        buttonLink: string;
    };

    fifthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
            buttonText: string;
            buttonLink: string;
        }[];
    };

    sixthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };

    seventhSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };

    eighthSection: {
        items: {
            title: string;
            description: string;
            link: string;
            video: string;
            image: string;
            imageAlt: string;
            type: string;
        }[];
    };

    ninethSection: {
        title: string;
    };

    tenthSection: {
        title: string;
        items: {
            name: string;
            message: string;
            designation: string;
        }[];
    };

    eleventhSection: {
        title: string;
    };

    twelthSection: {
        items: {
            image: string;
            imageAlt: string;
        }[];
    };

    lastSection: {
        title: string;
        items: {
            title: string;
            link: string;
        }[];
    };
}

const HomePage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<HomeFormProps>();


    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const { fields: fifthSectionItems, append: fifthSectionAppend, remove: fifthSectionRemove } = useFieldArray({
        control,
        name: "fifthSection.items"
    });

    const { fields: sixthSectionItems, append: sixthSectionAppend, remove: sixthSectionRemove } = useFieldArray({
        control,
        name: "sixthSection.items"
    });

    const { fields: seventhSectionItems, append: seventhSectionAppend, remove: seventhSectionRemove } = useFieldArray({
        control,
        name: "seventhSection.items"
    });

    const { fields: eighthSectionItems, append: eighthSectionAppend, remove: eighthSectionRemove } = useFieldArray({
        control,
        name: "eighthSection.items"
    });

    const { fields: tenthSectionItems, append: tenthSectionAppend, remove: tenthSectionRemove } = useFieldArray({
        control,
        name: "tenthSection.items"
    });

    const { fields: twelthSectionItems, append: twelthSectionAppend, remove: twelthSectionRemove } = useFieldArray({
        control,
        name: "twelthSection.items"
    });

    const { fields: lastSectionItems, append: lastSectionAppend, remove: lastSectionRemove } = useFieldArray({
        control,
        name: "lastSection.items"
    });

    const handleAddHome = async (data: HomeFormProps) => {
        try {
            const response = await fetch(`/api/admin/home`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding home", error);
        }
    }

    const fetchHomeData = async () => {
        try {
            const response = await fetch(`/api/admin/home`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);
                setValue("bannerSection", data.data.bannerSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fifthSection", data.data.fifthSection);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("sixthSection", data.data.sixthSection);
                setValue("sixthSection.items", data.data.sixthSection.items);
                setValue("seventhSection", data.data.seventhSection);
                setValue("seventhSection.items", data.data.seventhSection.items);
                setValue("eighthSection", data.data.eighthSection);
                setValue("eighthSection.items", data.data.eighthSection.items);
                setValue("ninethSection", data.data.ninethSection);
                setValue("tenthSection", data.data.tenthSection);
                setValue("tenthSection.items", data.data.tenthSection.items);
                setValue("eleventhSection", data.data.eleventhSection);
                setValue("twelthSection", data.data.twelthSection);
                setValue("twelthSection.items", data.data.twelthSection.items);
                setValue("lastSection", data.data.lastSection);
                setValue("lastSection.items", data.data.lastSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching home data", error);
        }
    }



    useEffect(() => {
        fetchHomeData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddHome)}>


                <AdminItemContainer>
                    <Label main>Banner Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <Label className='font-bold'>Desktop Image</Label>
                                    <Controller
                                        name="bannerSection.desktopImage"
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
                                    {errors.bannerSection?.desktopImage && (
                                        <p className="text-red-500">{errors.bannerSection?.desktopImage.message}</p>
                                    )}

                                    <Label className='font-bold'>Mobile Image</Label>
                                    <Controller
                                        name="bannerSection.mobileImage"
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
                                    {errors.bannerSection?.mobileImage && (
                                        <p className="text-red-500">{errors.bannerSection?.mobileImage.message}</p>
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

                            {/* <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Highlight Text</Label>
                                <Input type='text' placeholder='Highlight Text' {...register("firstSection.highlightText", {
                                    required: "Highlight Text is required"
                                })} />
                                {errors.firstSection?.highlightText && <p className='text-red-500'>{errors.firstSection?.highlightText.message}</p>}
                            </div> */}


                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("bannerSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.bannerSection?.buttonText && <p className='text-red-500'>{errors.bannerSection?.buttonText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("bannerSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                                {errors.bannerSection?.buttonLink && <p className='text-red-500'>{errors.bannerSection?.buttonLink.message}</p>}
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

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("secondSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.secondSection?.buttonText && <p className='text-red-500'>{errors.secondSection?.buttonText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("secondSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                                {errors.secondSection?.buttonLink && <p className='text-red-500'>{errors.secondSection?.buttonLink.message}</p>}
                            </div>

                        </div>


                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md grid grid-cols-2 gap-5'>


                                {secondSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-r border-black/20 pr-5 last:border-r-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Number</Label>
                                                    <Input type='text' placeholder='Number' {...register(`secondSection.items.${index}.number`, {
                                                        required: "Number is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.number && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.number.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Value</Label>
                                                    <Input type='text' placeholder='Value' {...register(`secondSection.items.${index}.value`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.value && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.value.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => secondSectionAppend({ number: "", value: "", image: "", imageAlt: "" })}>Add Item</Button>
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

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Image</Label>
                            <Controller
                                name="thirdSection.image"
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
                            {errors.thirdSection?.image && (
                                <p className="text-red-500">{errors.thirdSection?.image.message}</p>
                            )}
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fourth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`fourthSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("fourthSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.fourthSection?.buttonText && <p className='text-red-500'>{errors.fourthSection?.buttonText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("fourthSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                                {errors.fourthSection?.buttonLink && <p className='text-red-500'>{errors.fourthSection?.buttonLink.message}</p>}
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`fifthSection.title`, {
                                required: "Title is required"
                            })} />
                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5'>


                                {fifthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => fifthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`fifthSection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Logo is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            isLogo
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 30 x 35 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors.fifthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.fifthSection?.items?.[index]?.image.message}</p>}
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`fifthSection.items.${index}.imageAlt`)} />
                                            </div>

                                        </div>

                                        <div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`fifthSection.items.${index}.title`)} />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Description</Label>
                                                <Textarea placeholder='Description' {...register(`fifthSection.items.${index}.description`)} />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Button Text</Label>
                                                <Input type='text' placeholder='Button Text' {...register(`fifthSection.items.${index}.buttonText`)} />
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Button Link</Label>
                                                <Input type='text' placeholder='Button Link' {...register(`fifthSection.items.${index}.buttonLink`)} />
                                            </div>

                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => fifthSectionAppend({ title: "", description: "", image: "", imageAlt: "", buttonText: "", buttonLink: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Sixth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`sixthSection.title`, {
                                required: "Title is required"
                            })} />
                            {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5'>


                                {sixthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => sixthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`sixthSection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Logo is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            isLogo
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 30 x 35 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors.sixthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.sixthSection?.items?.[index]?.image.message}</p>}
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`sixthSection.items.${index}.imageAlt`)} />
                                            </div>

                                        </div>

                                        <div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`sixthSection.items.${index}.title`)} />
                                            </div>
                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => sixthSectionAppend({ title: "", image: "", imageAlt: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Seventh Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register(`seventhSection.title`, {
                                required: "Title is required"
                            })} />
                            {errors.seventhSection?.title && <p className='text-red-500'>{errors.seventhSection?.title.message}</p>}
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5'>


                                {seventhSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => seventhSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`seventhSection.items.${index}.image`}
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
                                                {errors.seventhSection?.items?.[index]?.image && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.image.message}</p>}
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`seventhSection.items.${index}.imageAlt`)} />
                                            </div>

                                        </div>

                                        <div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`seventhSection.items.${index}.title`)} />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Description</Label>
                                                <Textarea placeholder='Description' {...register(`seventhSection.items.${index}.description`)} />
                                            </div>
                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => seventhSectionAppend({ title: "", description: "", image: "", imageAlt: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Eighth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                                {eighthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => eighthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`eighthSection.items.${index}.title`, {
                                                        required: "Title is required"
                                                    })} />
                                                    {errors.eighthSection?.items?.[index]?.title && (
                                                        <p className='text-red-500'>{errors.eighthSection?.items?.[index]?.title.message}</p>
                                                    )}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Description</Label>
                                                    <Textarea placeholder='Description' {...register(`eighthSection.items.${index}.description`)} />
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Link</Label>
                                                    <Input type='text' placeholder='Link' {...register(`eighthSection.items.${index}.link`)} />
                                                </div>

                                                {/* Media type selector */}
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Media Type</Label>
                                                    <Controller
                                                        name={`eighthSection.items.${index}.type`}
                                                        control={control}
                                                        defaultValue="video"
                                                        render={({ field }) => (
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Media Type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="video">Video</SelectItem>
                                                                    <SelectItem value="image">Image</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>

                                                {/* Conditional media uploader */}
                                                <Controller
                                                    name={`eighthSection.items.${index}.type`}
                                                    control={control}
                                                    render={({ field: typeField }) => (
                                                        <>
                                                            {typeField.value === "video" || !typeField.value ? (
                                                                <div className='flex flex-col gap-2'>
                                                                    <Label className='font-bold'>Video</Label>
                                                                    <Controller
                                                                        name={`eighthSection.items.${index}.video`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <VideoUploader
                                                                                value={field.value}
                                                                                onChange={field.onChange}
                                                                            />
                                                                        )}
                                                                    />
                                                                    {errors?.eighthSection?.items?.[index]?.video && (
                                                                        <p className="text-red-500">{errors.eighthSection.items[index]?.video?.message}</p>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className='flex flex-col gap-2'>
                                                                    <Label className='font-bold'>Image</Label>
                                                                    <Controller
                                                                        name={`eighthSection.items.${index}.image`}
                                                                        control={control}
                                                                        render={({ field }) => (
                                                                            <ImageUploader
                                                                                value={field.value}
                                                                                onChange={field.onChange}
                                                                                recommendedDimension="Recommended: 1280 x 720 (px)"
                                                                            />
                                                                        )}
                                                                    />
                                                                    {errors?.eighthSection?.items?.[index]?.image && (
                                                                        <p className="text-red-500">{errors.eighthSection.items[index]?.image?.message}</p>
                                                                    )}
                                                                    <Label className='font-bold'>Alt Tag</Label>
                                                                    <Input
                                                                        type='text'
                                                                        placeholder='Alt Tag'
                                                                        {...register(`eighthSection.items.${index}.imageAlt`)}
                                                                    />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => eighthSectionAppend({ title: "", description: "", link: "", video: "", type: "", image: "", imageAlt: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Nineth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`ninethSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.ninethSection?.title && <p className='text-red-500'>{errors.ninethSection?.title.message}</p>}
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Tenth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`tenthSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.tenthSection?.title && <p className='text-red-500'>{errors.tenthSection?.title.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                {tenthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => tenthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Name</Label>
                                                    <Input type='text' placeholder='Name' {...register(`tenthSection.items.${index}.name`, {
                                                        required: "Name is required"
                                                    })} />
                                                    {errors.tenthSection?.items?.[index]?.name && <p className='text-red-500'>{errors.tenthSection?.items?.[index]?.name.message}</p>}
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Message</Label>
                                                    <Textarea placeholder='Message' {...register(`tenthSection.items.${index}.message`)} />
                                                </div>

                                            </div>

                                            <div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Designation</Label>
                                                    <Input type='text' placeholder='Designation' {...register(`tenthSection.items.${index}.designation`)} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => tenthSectionAppend({ name: "", message: "", designation: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Eleventh Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`eleventhSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.eleventhSection?.title && <p className='text-red-500'>{errors.eleventhSection?.title.message}</p>}
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Twelth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5'>

                                {twelthSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => twelthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`twelthSection.items.${index}.image`}
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
                                                {errors.twelthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.twelthSection?.items?.[index]?.image.message}</p>}
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Alt Tag</Label>
                                                <Input type='text' placeholder='Alt Tag' {...register(`twelthSection.items.${index}.imageAlt`)} />
                                            </div>

                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => twelthSectionAppend({ image: "", imageAlt: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Last Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`lastSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.lastSection?.title && <p className='text-red-500'>{errors.lastSection?.title.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                {lastSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => lastSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Title</Label>
                                                    <Input type='text' placeholder='Title' {...register(`lastSection.items.${index}.title`, {
                                                        required: "Title is required"
                                                    })} />
                                                    {errors.lastSection?.items?.[index]?.title && <p className='text-red-500'>{errors.lastSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Link</Label>
                                                    <Input type='text' placeholder='Link' {...register(`lastSection.items.${index}.link`, {
                                                        required: "Link is required"
                                                    })} />
                                                    {errors.lastSection?.items?.[index]?.link && <p className='text-red-500'>{errors.lastSection?.items?.[index]?.link.message}</p>}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => lastSectionAppend({ title: "", link: "" })}>Add Item</Button>
                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <SeoFields<HomeFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default HomePage
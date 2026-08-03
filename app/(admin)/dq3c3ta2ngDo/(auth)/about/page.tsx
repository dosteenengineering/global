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
import SeoFields from '@/app/components/common/SeoFields';
import { SeoFormValues } from '@/app/types/seo';

export interface AboutFormProps {

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
        items: {
            image: string;
            imageAlt: string;
            number: string;
            value: string;
            subValue: string;
        }[]
    };
    thirdSection: {
        title: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
        }[];
    };
    fourthSection: {
        title: string;
        description: string;
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }[];
    };
    fifthSection: {
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    sixthSection: {
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    seventhSection: {
        title: string;
        image: string;
        imageAlt: string;
        items: {
            number: string;
            value: string;
        }[];
    };
    eighthSection: {
        title: string;
        items: {
            title: string;
            xValue: string;
            yValue: string;
        }[];
    };
    ninethSection: {
        title: string;
        description: string;
        items: {
            buttonText: string;
            buttonLink: string;
        }[];
    };
}

const AboutPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<AboutFormProps>();


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

    const { fields: ninethSectionItems, append: ninethSectionAppend, remove: ninethSectionRemove } = useFieldArray({
        control,
        name: "ninethSection.items"
    });


    const handleAddAbout = async (data: AboutFormProps) => {
        try {
            const response = await fetch(`/api/admin/about`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding about", error);
        }
    }

    const fetchAboutData = async () => {
        try {
            const response = await fetch(`/api/admin/about`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("fifthSection.items", data.data.fifthSection.items);
                setValue("sixthSection", data.data.sixthSection);
                setValue("sixthSection.items", data.data.sixthSection.items);
                setValue("seventhSection", data.data.seventhSection);
                setValue("seventhSection.items", data.data.seventhSection.items);
                setValue("eighthSection", data.data.eighthSection);
                setValue("eighthSection.items", data.data.eighthSection.items);
                setValue("ninethSection", data.data.ninethSection);
                setValue("ninethSection.items", data.data.ninethSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching about data", error);
        }
    }



    useEffect(() => {
        fetchAboutData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddAbout)}>


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


                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                                {secondSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Image</Label>
                                                <Controller
                                                    name={`secondSection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Image is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 742 x 439 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors.secondSection?.items?.[index]?.image && (
                                                    <p className="text-red-500">{errors.secondSection?.items?.[index]?.image.message}</p>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Alt Tag</Label>
                                                    <Input type='text' placeholder='Alt Tag' {...register(`secondSection.items.${index}.imageAlt`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.imageAlt.message}</p>}
                                                </div>
                                            </div>


                                        </div>

                                        <div className='flex flex-col gap-2'>

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

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Sub Value</Label>
                                                    <Input type='text' placeholder='Sub Value' {...register(`secondSection.items.${index}.subValue`, {
                                                        required: "Sub Value is required"
                                                    })} />
                                                    {errors.secondSection?.items?.[index]?.subValue && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.subValue.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => secondSectionAppend({ number: "", value: "", image: "", imageAlt: "", subValue: "" })}>Add Item</Button>
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
                                                        isLogo
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

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "", title: "" })}>Add Item</Button>
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
                                    required: "Value is required"
                                })} />
                                {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="fourthSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md'>
                            {fourthSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => fourthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Image</Label>
                                            <Controller
                                                name={`fourthSection.items.${index}.image`}
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
                                            {errors.fourthSection?.items?.[index]?.image && <p className='text-red-500'>{errors.fourthSection?.items?.[index]?.image.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Alt Tag</Label>
                                            <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.imageAlt`)} />
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`fourthSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`fourthSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => fourthSectionAppend({ image: "", imageAlt: "", title: "", description: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
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

                                        </div>

                                    </div>
                                ))}

                                <div className='flex justify-end'>
                                    <Button type='button' className="" addItem onClick={() => fifthSectionAppend({ title: "", description: "", image: "", imageAlt: "" })}>Add Item</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Sixth Section</Label>

                    <div className='p-5 rounded-md flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register(`sixthSection.title`, {
                                    required: "Title is required"
                                })} />
                                {errors.sixthSection?.title && <p className='text-red-500'>{errors.sixthSection?.title.message}</p>}
                            </div>
                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md'>
                            {sixthSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => sixthSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`sixthSection.items.${index}.title`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Description</Label>
                                            <Textarea placeholder='Description' {...register(`sixthSection.items.${index}.description`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => sixthSectionAppend({ title: "", description: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Seventh Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("seventhSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.seventhSection?.title && <p className='text-red-500'>{errors.seventhSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Image</Label>
                                <Controller
                                    name="seventhSection.image"
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
                                {errors.seventhSection?.image && (
                                    <p className="text-red-500">{errors.seventhSection?.image.message}</p>
                                )}
                                <Label className='font-bold'>Alt Tag</Label>
                                <Input type='text' placeholder='Alt Tag' {...register("seventhSection.imageAlt")} />
                            </div>

                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>


                                {seventhSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => seventhSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='grid grid-cols-2 gap-2'>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Number</Label>
                                                    <Input type='text' placeholder='Number' {...register(`seventhSection.items.${index}.number`, {
                                                        required: "Number is required"
                                                    })} />
                                                    {errors.seventhSection?.items?.[index]?.number && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.number.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Value</Label>
                                                    <Input type='text' placeholder='Value' {...register(`seventhSection.items.${index}.value`, {
                                                        required: "Value is required"
                                                    })} />
                                                    {errors.seventhSection?.items?.[index]?.value && <p className='text-red-500'>{errors.seventhSection?.items?.[index]?.value.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => seventhSectionAppend({ number: "", value: "" })}>Add Item</Button>
                            </div>
                        </div>


                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Eighth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("eighthSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.eighthSection?.title && <p className='text-red-500'>{errors.eighthSection?.title.message}</p>}
                            </div>
                        </div>

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
                                                    {errors.eighthSection?.items?.[index]?.title && <p className='text-red-500'>{errors.eighthSection?.items?.[index]?.title.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>X Value</Label>
                                                    <Input type='text' placeholder='X Value' {...register(`eighthSection.items.${index}.xValue`, {
                                                        required: "X Value is required"
                                                    })} />
                                                    {errors.eighthSection?.items?.[index]?.xValue && <p className='text-red-500'>{errors.eighthSection?.items?.[index]?.xValue.message}</p>}
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <Label className='font-bold'>Y Value</Label>
                                                    <Input type='text' placeholder='Y Value' {...register(`eighthSection.items.${index}.yValue`, {
                                                        required: "Y Value is required"
                                                    })} />
                                                    {errors.eighthSection?.items?.[index]?.yValue && <p className='text-red-500'>{errors.eighthSection?.items?.[index]?.yValue.message}</p>}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}



                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => eighthSectionAppend({ title: "", xValue: "", yValue: "" })}>Add Item</Button>
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

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="ninethSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                        <Label>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md'>
                            {ninethSectionItems.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => ninethSectionRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Text</Label>
                                            <Input type='text' placeholder='Button Text' {...register(`ninethSection.items.${index}.buttonText`)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Button Link</Label>
                                            <Input type='text' placeholder='Button Link' {...register(`ninethSection.items.${index}.buttonLink`)} />
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => ninethSectionAppend({ buttonText: "", buttonLink: "" })}>Add Item</Button>
                        </div>


                    </div>
                </AdminItemContainer>



                <SeoFields<AboutFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default AboutPage
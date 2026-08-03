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
import { SeoFormValues } from '@/app/types/seo';
import SeoFields from '@/app/components/common/SeoFields';

export interface ClientFormProps {
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
        subTitle: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            location: string;
        }[];
    };

    fourthSection: {
        title: string;
        firstDescription: string;
        secondDescription: string;
        items: {
            title: string;
            subItems: {
                image: string;
                imageAlt: string;
            }[];
        }[];
    };

    fifthSection: {
        title: string;
        description: string;
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
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };

    seventhSection: {
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };

    eighthSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };

    ninethSection: {
        title: string;
        items: {
            number: string;
            value: string;
        }[];
    };

    tenthSection: {
        title: string;
        items: {
            question: string;
            answer: string;
        }[];
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

const ClientPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors }, watch } = useForm<ClientFormProps>();


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


    const handleAddClient = async (data: ClientFormProps) => {
        try {
            const response = await fetch(`/api/admin/clients`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding clients", error);
        }
    }

    const fetchClientData = async () => {
        try {
            const response = await fetch(`/api/admin/clients`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);
                setValue("firstSection", data.data.firstSection);
                setValue("secondSection", data.data.secondSection);
                setValue("thirdSection", data.data.thirdSection);
                setValue("thirdSection.items", data.data.thirdSection.items);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fourthSection.items", data.data.fourthSection.items);
                setValue("lastSection", data.data.lastSection);
                setValue("lastSection.items", data.data.lastSection.items);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching clients data", error);
        }
    }


    const handleAddFile = (index: number) => {
        const currentFiles = watch(`fourthSection.items.${index}.subItems`) || [];
        setValue(`fourthSection.items.${index}.subItems`, [
            ...currentFiles,
            { image: "",imageAlt:"" },
        ]);
    };

    const handleRemoveFile = (index: number, fileIndex: number) => {
        const currentFiles = watch(`fourthSection.items.${index}.subItems`) || [];
        setValue(
            `fourthSection.items.${index}.subItems`,
            currentFiles.filter((_, i) => i !== fileIndex)
        );
    };



    useEffect(() => {
        fetchClientData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddClient)}>


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
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("thirdSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.thirdSection?.subTitle && <p className='text-red-500'>{errors.thirdSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="thirdSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <Label>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md'>
                                {thirdSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0'>
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

                                        </div>

                                        <div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Title</Label>
                                                <Input type='text' placeholder='Title' {...register(`thirdSection.items.${index}.title`)} />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='font-bold'>Location</Label>
                                                <Input type='text' placeholder='Location' {...register(`thirdSection.items.${index}.location`)} />
                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => thirdSectionAppend({ image: "", imageAlt: "", title: "", location: "" })}>Add Item</Button>
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Fourth Section</Label>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("fourthSection.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.fourthSection?.title && (
                                    <p className="text-red-500">
                                        {errors.fourthSection?.title.message}
                                    </p>
                                )}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>First Description</Label>
                                <Controller name="fourthSection.firstDescription" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Second Description</Label>
                                <Controller name="fourthSection.secondDescription" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {fourthSectionItems.map((field, index) => (
                                    <div key={field.id}>
                                        <div className="grid grid-cols-2 gap-2 relative border p-2 rounded-md">
                                            <div className="absolute top-2 right-2">
                                                <RiDeleteBinLine
                                                    onClick={() => fourthSectionRemove(index)}
                                                    className="cursor-pointer text-red-600"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        {...register(`fourthSection.items.${index}.title`, {
                                                            required: "Title is required",
                                                        })}
                                                    />
                                                    {errors.fourthSection?.items?.[index]?.title && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.fourthSection?.items?.[index]?.title
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Button
                                                        type="button"
                                                        className="w-full cursor-pointer text-white bg-green-400 text-[16px]"
                                                        onClick={() => {
                                                            handleAddFile(index);
                                                        }}
                                                    >
                                                        Add Client
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-5 gap-2 mt-5">
                                            {watch(`fourthSection.items.${index}.subItems`)?.map(
                                                (file, fileIndex) => (
                                                    <div
                                                        key={fileIndex}
                                                        className="grid grid-cols-1 gap-2 relative border p-2 rounded-md"
                                                    >
                                                        <div className="absolute top-2 right-2">
                                                            <RiDeleteBinLine
                                                                onClick={() =>
                                                                    handleRemoveFile(index, fileIndex)
                                                                }
                                                                className="cursor-pointer text-red-600"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col gap-2">

                                                            <div className="flex flex-col gap-2">
                                                                <div className='flex flex-col gap-1'>
                                                                    <Label className='font-bold'>Image</Label>
                                                                    <Controller
                                                                        name={`fourthSection.items.${index}.subItems.${fileIndex}.image`}
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
                                                                    {errors.fourthSection?.items?.[index]
                                                                        ?.subItems?.[fileIndex]?.image && (
                                                                        <p className="text-red-500">{
                                                                                    errors.fourthSection?.items?.[index]
                                                                                        ?.subItems?.[fileIndex]?.image.message
                                                                                }</p>
                                                                    )}
                                                                    <Label className='font-bold'>Alt Tag</Label>
                                                                    <Input type='text' placeholder='Alt Tag' {...register(`fourthSection.items.${index}.subItems.${fileIndex}.imageAlt`)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <Button
                                        type="button"
                                        className="w-full cursor-pointer text-white text-[16px]"
                                        onClick={() => {
                                            fourthSectionAppend({
                                                title: "",
                                                subItems: [],
                                            });
                                        }}
                                    >
                                        Add Location
                                    </Button>
                                </div>
                            </div>
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


                <SeoFields<ClientFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default ClientPage
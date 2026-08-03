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

export interface BecomeAPartnerFormProps {

    metaTitle: string;
    metaDescription: string;
    formSection: {
        title: string;
        description: string;
        subTitle:string;
    };
    thankyouSection: {
        title: string;
        description: string;
        buttonText:string;
        buttonLink:string;
    };
}

const BecomeAPartnerPage = () => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BecomeAPartnerFormProps>();


    const handleAddBecomeAPartner = async (data: BecomeAPartnerFormProps) => {
        try {
            const response = await fetch(`/api/admin/become-a-partner`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding data", error);
        }
    }

    const fetchBecomeAPartnerData = async () => {
        try {
            const response = await fetch(`/api/admin/become-a-partner`);
            if (response.ok) {
                const data = await response.json();
                setValue("metaTitle", data.data.metaTitle);
                setValue("metaDescription", data.data.metaDescription);
                setValue("formSection", data.data.formSection);
                setValue("thankyouSection", data.data.thankyouSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching data", error);
        }
    }



    useEffect(() => {
        fetchBecomeAPartnerData();
    }, []);


    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddBecomeAPartner)}>

                <AdminItemContainer>
                    <Label main>Form Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("formSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.formSection?.title && <p className='text-red-500'>{errors.formSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("formSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.formSection?.subTitle && <p className='text-red-500'>{errors.formSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="formSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                        </div>

                    </div>
                </AdminItemContainer>


                <AdminItemContainer>
                    <Label main>Thank You Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thankyouSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thankyouSection?.title && <p className='text-red-500'>{errors.thankyouSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="thankyouSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("thankyouSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.thankyouSection?.buttonText && <p className='text-red-500'>{errors.thankyouSection?.buttonText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("thankyouSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                                {errors.thankyouSection?.buttonLink && <p className='text-red-500'>{errors.thankyouSection?.buttonLink.message}</p>}
                            </div>

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

export default BecomeAPartnerPage
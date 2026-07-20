"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { SeoFormValues } from "@/app/types/seo";
import SeoFields from "@/app/components/common/SeoFields";

export interface BecomePartnerFormProps {
  seo: SeoFormValues;
  formSection: {
    title: string;
    subTitle: string;
    description: string;
  };
  thankyouSection: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

const BecomePartnerPage = () => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BecomePartnerFormProps>();

    const handleUpdate = async (data: BecomePartnerFormProps) => {
        try {
            const response = await fetch(`/api/admin/become-a-partner`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.log("Error in updating become-a-partner", error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/admin/become-a-partner`);
            if (response.ok) {
                const data = await response.json();
                setValue("seo", data.data.seo);

                setValue("formSection.title", data.data.formSection?.title);
                setValue("formSection.subTitle", data.data.formSection?.subTitle);
                setValue("formSection.description", data.data.formSection?.description);

                setValue("thankyouSection.title", data.data.thankyouSection?.title);
                setValue("thankyouSection.description", data.data.thankyouSection?.description);
                setValue("thankyouSection.buttonText", data.data.thankyouSection?.buttonText);
                setValue("thankyouSection.buttonLink", data.data.thankyouSection?.buttonLink);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching become-a-partner data", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleUpdate)}>

                

                {/* Form Section */}
                <AdminItemContainer>
                    <Label main>Form Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("formSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.formSection?.title && <p className='text-red-500'>{errors.formSection.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("formSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.formSection?.subTitle && <p className='text-red-500'>{errors.formSection.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="formSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.formSection?.description && <p className='text-red-500'>{errors.formSection.description.message}</p>}
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>

                {/* Thank You Section */}
                <AdminItemContainer>
                    <Label main>Thank You Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("thankyouSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.thankyouSection?.title && <p className='text-red-500'>{errors.thankyouSection.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="thankyouSection.description" control={control} rules={{ required: "Description is required" }} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                                {errors.thankyouSection?.description && <p className='text-red-500'>{errors.thankyouSection.description.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Text</Label>
                                <Input type='text' placeholder='Button Text' {...register("thankyouSection.buttonText", {
                                    required: "Button Text is required"
                                })} />
                                {errors.thankyouSection?.buttonText && <p className='text-red-500'>{errors.thankyouSection.buttonText.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Button Link</Label>
                                <Input type='text' placeholder='Button Link' {...register("thankyouSection.buttonLink", {
                                    required: "Button Link is required"
                                })} />
                                {errors.thankyouSection?.buttonLink && <p className='text-red-500'>{errors.thankyouSection.buttonLink.message}</p>}
                            </div>

                        </div>
                    </div>
                </AdminItemContainer>

                <SeoFields<BecomePartnerFormProps> control={control} register={register} errors={errors} />

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default BecomePartnerPage
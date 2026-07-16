// app/components/common/SeoFields.tsx
"use client"

import { Control, Controller, FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploader } from '@/components/ui/image-uploader'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { SeoFormValues, WithSeo } from "@/app/types/seo";

interface SeoFieldsProps<T extends WithSeo> {
    control: Control<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
}

export default function SeoFields<T extends WithSeo>({
    control,
    register,
    errors,
}: SeoFieldsProps<T>) {
    // errors.seo is typed loosely by RHF's generic inference, so we narrow it once here
    const seoErrors = errors.seo as FieldErrors<SeoFormValues> | undefined;

    return (
        <>
            <AdminItemContainer>
                <Label main>SEO</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Meta Title</Label>
                        <Input
                            type='text'
                            {...register("seo.metaTitle" as Path<T>)}
                        />
                        {/* {seoErrors?.metaTitle && <p className='text-red-500'>{seoErrors.metaTitle.message as string}</p>} */}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Meta Description</Label>
                        <Textarea
                            {...register("seo.metaDescription" as Path<T>)}
                        />
                        {/* {seoErrors?.metaDescription && <p className='text-red-500'>{seoErrors.metaDescription.message as string}</p>} */}
                    </div>
                </div>
            </AdminItemContainer>

            <AdminItemContainer>
                <Label main>Open Graph (Facebook, LinkedIn, WhatsApp)</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>OG Title</Label>
                        <Input
                            type='text'
                            placeholder='Falls back to Meta Title if empty'
                            {...register("seo.ogTitle" as Path<T>)}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>OG Description</Label>
                        <Textarea
                            placeholder='Falls back to Meta Description if empty'
                            {...register("seo.ogDescription" as Path<T>)}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-1/2'>
                        <Label className='font-bold'>OG Image</Label>
                        <Controller
                            name={"seo.ogImage" as Path<T>}
                            control={control}
                            //   rules={{ required: "OG Image is required" }}
                            render={({ field }) => (
                                <ImageUploader
                                    value={field.value as string}
                                    onChange={field.onChange}
                                    recommendedDimension="Recommended: 1200 x 630 (px)"
                                />
                            )}
                        />
                        {/* {seoErrors?.ogImage && <p className='text-red-500'>{seoErrors.ogImage.message as string}</p>} */}
                    </div>
                </div>
            </AdminItemContainer>

            <AdminItemContainer>
                <Label main>Twitter / X Card</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Twitter Title</Label>
                        <Input
                            type='text'
                            placeholder='Falls back to Meta Title if empty'
                            {...register("seo.twitterTitle" as Path<T>)}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Twitter Description</Label>
                        <Textarea
                            placeholder='Falls back to Meta Description if empty'
                            {...register("seo.twitterDescription" as Path<T>)}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-1/2'>
                        <Label className='font-bold'>Twitter Image</Label>
                        <Controller
                            name={"seo.twitterImage" as Path<T>}
                            control={control}
                            //   rules={{ required: "Twitter Image is required" }}
                            render={({ field }) => (
                                <ImageUploader
                                    value={field.value as string}
                                    onChange={field.onChange}
                                    recommendedDimension="Recommended: 1200 x 675 (px), 2:1 ratio"
                                />
                            )}
                        />
                        {/* {seoErrors?.twitterImage && <p className='text-red-500'>{seoErrors.twitterImage.message as string}</p>} */}
                    </div>
                </div>
            </AdminItemContainer>

            <AdminItemContainer>
                <Label main>Structured Data (JSON-LD)</Label>
                <div className='p-5 rounded-md flex flex-col gap-2'>
                    <Label className='font-bold'>Schema JSON</Label>
                    <Textarea
                        className="font-mono text-sm"
                        rows={12}
                        placeholder='{ "@context": "https://schema.org", "@type": "WebPage", ... }'
                        {...register("seo.schema" as Path<T>, {
                            validate: (value) => {
                                if (!value) return true; // optional field
                                try {
                                    JSON.parse(value as string);
                                    return true;
                                } catch {
                                    return "Must be valid JSON";
                                }
                            },
                        })}
                    />
                    {seoErrors?.schema && <p className='text-red-500'>{seoErrors.schema.message as string}</p>}
                </div>
            </AdminItemContainer>

        </>
    );
}
"use client"

import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/image-uploader'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import AdminItemContainer from "@/app/components/common/AdminItemContainer"
import { RiDeleteBinLine } from "react-icons/ri"
import { FileUploader } from "@/components/ui/file-uploader"
import { VideoUploader } from "@/components/ui/video-uploader"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Check } from "lucide-react"

const SECTION_TYPES = [
    { value: "technicalDocuments", label: "Technical Documents",image:"/assets/images/admin/type-1.jpg" },
    { value: "bimCadFiles", label: "BIM & CAD Files", image:"/assets/images/admin/type-2.jpg" },
    { value: "videosDemos", label: "Videos & Demos", image:"/assets/images/admin/type-3.jpg" },
    { value: "brochures", label: "Brochures & Catalogues", image:"/assets/images/admin/type-4.jpg" },
    { value: "certifications", label: "Certifications & Compliance", image:"/assets/images/admin/type-5.jpg" },
    { value: "installationMaintenance", label: "Installation & Maintenance", image:"/assets/images/admin/type-6.jpg" },
]


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export interface SecondSectionItemFormProps {
    type: string;

    technicalDocuments: {
        title: string;
        items: {
            title: string;
            subItems: {
                title: string;
                subTitle: string;
                tags: string;
                file: string;
            }[];
        }[];
    };

    bimCadFiles: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        items: {
            title: string;
            subItems: {
                title: string;
                // subTitle: string;
                file: string;
            }[];
        }[];
    };

    videosDemos: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            tags: string;
            videoUrl: string;
        }[];
    };

    brochures: {
        title: string;
        items: {
            fileType: string;
            title: string;
            tags: string;
            file: string;
        }[];
    };

    certifications: {
        title: string;
        items: {
            badgeText: string;
            title: string;
            description: string;
            file: string;
        }[];
    };

    installationMaintenance: {
        title: string;
        items: {
            fileType: string;
            title: string;
            description: string;
            file: string;
        }[];
    };
}

const SecondSectionItemPage = () => {

    const params = useParams();
    const id = params.id as string;

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, reset } = useForm<SecondSectionItemFormProps>({
        defaultValues: {
            type: "technicalDocuments",
            technicalDocuments: { title: "", items: [] },
            bimCadFiles: { title: "", description: "", buttonText: "", buttonLink: "", items: [] },
            videosDemos: { title: "", items: [] },
            brochures: { title: "", items: [] },
            certifications: { title: "", items: [] },
            installationMaintenance: { title: "", items: [] },
        },
        shouldUnregister: true,
    });

    const selectedType = watch("type");

const { fields: techDocFields, append: techDocAppend, remove: techDocRemove, replace: techDocReplace } = useFieldArray({ control, name: "technicalDocuments.items" });
const { fields: bimFields, append: bimAppend, remove: bimRemove, replace: bimReplace } = useFieldArray({ control, name: "bimCadFiles.items" });
const { fields: videoFields, append: videoAppend, remove: videoRemove, replace: videoReplace } = useFieldArray({ control, name: "videosDemos.items" });
const { fields: brochureFields, append: brochureAppend, remove: brochureRemove, replace: brochureReplace } = useFieldArray({ control, name: "brochures.items" });
const { fields: certificationFields, append: certificationAppend, remove: certificationRemove, replace: certificationReplace } = useFieldArray({ control, name: "certifications.items" });
const { fields: installFields, append: installAppend, remove: installRemove, replace: installReplace } = useFieldArray({ control, name: "installationMaintenance.items" });

    // Generic helpers for the "column + subItems" pattern (Technical Documents / BIM & CAD Files)
    const handleAddSubItem = (
        section: "technicalDocuments" | "bimCadFiles",
        index: number,
        template: Record<string, string>
    ) => {
        const path = `${section}.items.${index}.subItems` as const;
        const current = watch(path) || [];
        setValue(path, [...current, template] as never);
    };

    const handleRemoveSubItem = (
        section: "technicalDocuments" | "bimCadFiles",
        index: number,
        subIndex: number
    ) => {
        const path = `${section}.items.${index}.subItems` as const;
        const current = watch(path) || [];
        setValue(
            path,
            current.filter((_, i) => i !== subIndex) as never
        );
    };


useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
        try {
            const res = await fetch(`/api/admin/resource/second-section/item/${id}`);
            const { item } = await res.json();
            const type = item.type;

            setValue("type", type);

            if (type === "technicalDocuments") {
                setValue("technicalDocuments.title", item.title);
                techDocReplace(
                    (item.columnItems ?? []).map((col: any) => ({
                        title: col.title,
                        subItems: col.subItems ?? [],
                    }))
                );
            } else if (type === "bimCadFiles") {
                setValue("bimCadFiles.title", item.title);
                setValue("bimCadFiles.description", item.description ?? "");
                setValue("bimCadFiles.buttonText", item.buttonText ?? "");
                setValue("bimCadFiles.buttonLink", item.buttonLink ?? "");
                bimReplace(
                    (item.columnItems ?? []).map((col: any) => ({
                        title: col.title,
                        subItems: col.subItems ?? [],
                    }))
                );
            } else if (type === "videosDemos") {
                setValue("videosDemos.title", item.title);
                videoReplace(item.videoItems ?? []);
            } else if (type === "brochures") {
                setValue("brochures.title", item.title);
                brochureReplace(
                    (item.brochureItems ?? []).map((i: any) => ({
                        ...i,
                        tags: Array.isArray(i.tags) ? i.tags.join(", ") : i.tags,
                    }))
                );
            } else if (type === "certifications") {
                setValue("certifications.title", item.title);
                certificationReplace(item.certificationItems ?? []);
            } else if (type === "installationMaintenance") {
                setValue("installationMaintenance.title", item.title);
                installReplace(item.installItems ?? []);
            }
        } catch (error) {
            console.error("Error loading item", error);
        }
    };

    fetchItem();
}, [id, setValue, techDocReplace, bimReplace, videoReplace, brochureReplace, certificationReplace, installReplace]);

    const onSubmit = async (data: SecondSectionItemFormProps) => {
        try {
            let payload: Record<string, unknown> = { type: data.type };

            if (data.type === "technicalDocuments") {
                payload = {
                    ...payload,
                    ...data.technicalDocuments,
                    items: data.technicalDocuments.items.map((item) => ({
                        ...item,
                        subItems: item.subItems.map((sub) => ({
                            ...sub,
                            tags:
                                typeof sub.tags === "string"
                                    ? sub.tags.split(",").map((t) => t.trim()).filter(Boolean)
                                    : sub.tags,
                        })),
                    })),
                };
            } else if (data.type === "bimCadFiles") {
                payload = {
                    ...payload,
                    ...data.bimCadFiles,
                };
            } else if (data.type === "videosDemos") {
                payload = {
                    ...payload,
                    ...data.videosDemos,
                };
            } else if (data.type === "brochures") {
                payload = {
                    ...payload,
                    ...data.brochures,
                    items: data.brochures.items.map((item) => ({
                        ...item,
                        tags:
                            typeof item.tags === "string"
                                ? item.tags.split(",").map((t) => t.trim()).filter(Boolean)
                                : item.tags,
                    })),
                };
            } else if (data.type === "certifications") {
                payload = {
                    ...payload,
                    ...data.certifications,
                };
            } else if (data.type === "installationMaintenance") {
                payload = {
                    ...payload,
                    ...data.installationMaintenance,
                };
            }

            const response = await fetch(`/api/admin/resource/second-section/item/${id}`, {
                method: "PATCH",
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.log("Error adding item", error);
        }
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

            <div className='flex flex-col gap-2'>
    <Label className='font-bold'>Type</Label>
    <Controller
        name="type"
        control={control}
        rules={{ required: "Type is required" }}
        render={({ field }) => (
            <div
                role="radiogroup"
                aria-label="Type"
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
                {SECTION_TYPES.map((t) => {
                    const isSelected = field.value === t.value;
                    return (
                        <div
                            key={t.value}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onClick={() => field.onChange(t.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    field.onChange(t.value);
                                }
                            }}
                            className={`relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                isSelected
                                    ? "border-primary bg-primary/5"
                                    : "border-muted hover:border-muted-foreground/40"
                            }`}
                        >
                            {isSelected ? (
                                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground z-10">
                                    <Check className="h-3 w-3" />
                                </div>
                            ) : <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-transparent text-primary-foreground z-10 border-2">
                                    
                                </div>}
                            <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                                <Image
                                    src={t.image}
                                    alt={t.label}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-sm font-medium text-center">{t.label}</span>
                        </div>
                    );
                })}
            </div>
        )}
    />
    {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
</div>

            {/* Technical Documents */}
            {selectedType === "technicalDocuments" && (
                <AdminItemContainer>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("technicalDocuments.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.technicalDocuments?.title && (
                                    <p className="text-red-500">
                                        {errors.technicalDocuments.title.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {techDocFields.map((field, index) => (
                                    <div key={field.id}>
                                        <div className="grid grid-cols-2 gap-2 relative border p-2 rounded-md">
                                            <div className="absolute top-2 right-2">
                                                <RiDeleteBinLine
                                                    onClick={() => techDocRemove(index)}
                                                    className="cursor-pointer text-red-600"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        {...register(`technicalDocuments.items.${index}.title`, {
                                                            required: "Title is required",
                                                        })}
                                                    />
                                                    {errors?.technicalDocuments?.items?.[index]?.title && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.technicalDocuments.items[index]?.title
                                                                    ?.message
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Button
                                                        type="button"
                                                        className="w-full cursor-pointer text-white bg-green-400 text-[16px]"
                                                        onClick={() =>
                                                            handleAddSubItem("technicalDocuments", index, {
                                                                title: "",
                                                                subTitle: "",
                                                                tags: "",
                                                                file: "",
                                                            })
                                                        }
                                                    >
                                                        Add Item
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 mt-5">
                                            {watch(`technicalDocuments.items.${index}.subItems`)?.map(
                                                (file, fileIndex) => (
                                                    <div
                                                        key={fileIndex}
                                                        className="grid grid-cols-2 gap-2 relative border p-2 rounded-md"
                                                    >
                                                        <div className="absolute top-2 right-2">
                                                            <RiDeleteBinLine
                                                                onClick={() =>
                                                                    handleRemoveSubItem("technicalDocuments", index, fileIndex)
                                                                }
                                                                className="cursor-pointer text-red-600"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex flex-col gap-2">
                                                                    <Label className="font-bold">Title</Label>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Title"
                                                                        {...register(
                                                                            `technicalDocuments.items.${index}.subItems.${fileIndex}.title`,
                                                                            {
                                                                                required: "Title is required",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors?.technicalDocuments?.items?.[index]
                                                                        ?.subItems?.[fileIndex]?.title && (
                                                                            <p className="text-red-500">
                                                                                {
                                                                                    errors.technicalDocuments.items[index]
                                                                                        ?.subItems?.[fileIndex]?.title?.message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>

                                                                <div className="flex flex-col gap-2">
                                                                    <Label className="font-bold">Sub Title</Label>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Sub Title"
                                                                        {...register(
                                                                            `technicalDocuments.items.${index}.subItems.${fileIndex}.subTitle`,
                                                                            {
                                                                                required: "Sub Title is required",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors?.technicalDocuments?.items?.[index]
                                                                        ?.subItems?.[fileIndex]?.subTitle && (
                                                                            <p className="text-red-500">
                                                                                {
                                                                                    errors.technicalDocuments.items[index]
                                                                                        ?.subItems?.[fileIndex]?.subTitle?.message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>

                                                                <div className="flex flex-col gap-2">
                                                                    <Label className="font-bold">Tags</Label>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Tags"
                                                                        {...register(
                                                                            `technicalDocuments.items.${index}.subItems.${fileIndex}.tags`,
                                                                            {
                                                                                required: "Tags is required",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors?.technicalDocuments?.items?.[index]
                                                                        ?.subItems?.[fileIndex]?.tags && (
                                                                            <p className="text-red-500">
                                                                                {
                                                                                    errors.technicalDocuments.items[index]
                                                                                        ?.subItems?.[fileIndex]?.tags?.message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-col gap-2">
                                                                <Label className="font-bold">File</Label>
                                                                <Controller
                                                                    name={`technicalDocuments.items.${index}.subItems.${fileIndex}.file`}
                                                                    control={control}
                                                                    rules={{ required: "File is required" }}
                                                                    render={({ field }) => (
                                                                        <FileUploader
                                                                            value={field.value}
                                                                            onChange={(url: string) => {
                                                                                field.onChange(url);
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors?.technicalDocuments?.items?.[index]
                                                                    ?.subItems?.[fileIndex]?.file && (
                                                                        <p className="text-red-500">
                                                                            {
                                                                                errors.technicalDocuments.items[index]
                                                                                    ?.subItems?.[fileIndex]?.file?.message
                                                                            }
                                                                        </p>
                                                                    )}
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
                                        onClick={() =>
                                            techDocAppend({
                                                title: "",
                                                subItems: [],
                                            })
                                        }
                                    >
                                        Add Column
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>
            )}

            {/* BIM & CAD Files */}
            {selectedType === "bimCadFiles" && (
                <AdminItemContainer>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("bimCadFiles.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.bimCadFiles?.title && (
                                    <p className="text-red-500">
                                        {errors.bimCadFiles.title.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="bimCadFiles.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Button Text</Label>
                                <Input
                                    type="text"
                                    placeholder="Button Text"
                                    {...register("bimCadFiles.buttonText", {
                                        required: "Button Text is required",
                                    })}
                                />
                                {errors.bimCadFiles?.buttonText && (
                                    <p className="text-red-500">
                                        {errors.bimCadFiles.buttonText.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Button Link</Label>
                                <Input
                                    type="text"
                                    placeholder="Button Link"
                                    {...register("bimCadFiles.buttonLink", {
                                        required: "Button Link is required",
                                    })}
                                />
                                {errors.bimCadFiles?.buttonLink && (
                                    <p className="text-red-500">
                                        {errors.bimCadFiles.buttonLink.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {bimFields.map((field, index) => (
                                    <div key={field.id}>
                                        <div className="grid grid-cols-2 gap-2 relative border p-2 rounded-md">
                                            <div className="absolute top-2 right-2">
                                                <RiDeleteBinLine
                                                    onClick={() => bimRemove(index)}
                                                    className="cursor-pointer text-red-600"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        {...register(`bimCadFiles.items.${index}.title`, {
                                                            required: "Title is required",
                                                        })}
                                                    />
                                                    {errors?.bimCadFiles?.items?.[index]?.title && (
                                                        <p className="text-red-500">
                                                            {
                                                                errors.bimCadFiles.items[index]?.title
                                                                    ?.message
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Button
                                                        type="button"
                                                        className="w-full cursor-pointer text-white bg-green-400 text-[16px]"
                                                        onClick={() =>
                                                            handleAddSubItem("bimCadFiles", index, {
                                                                title: "",
                                                                subTitle: "",
                                                                file: "",
                                                            })
                                                        }
                                                    >
                                                        Add Item
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 mt-5">
                                            {watch(`bimCadFiles.items.${index}.subItems`)?.map(
                                                (file, fileIndex) => (
                                                    <div
                                                        key={fileIndex}
                                                        className="grid grid-cols-2 gap-2 relative border p-2 rounded-md"
                                                    >
                                                        <div className="absolute top-2 right-2">
                                                            <RiDeleteBinLine
                                                                onClick={() =>
                                                                    handleRemoveSubItem("bimCadFiles", index, fileIndex)
                                                                }
                                                                className="cursor-pointer text-red-600"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex flex-col gap-2">
                                                                    <Label className="font-bold">Title</Label>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Title"
                                                                        {...register(
                                                                            `bimCadFiles.items.${index}.subItems.${fileIndex}.title`,
                                                                            {
                                                                                required: "Title is required",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors?.bimCadFiles?.items?.[index]
                                                                        ?.subItems?.[fileIndex]?.title && (
                                                                            <p className="text-red-500">
                                                                                {
                                                                                    errors.bimCadFiles.items[index]
                                                                                        ?.subItems?.[fileIndex]?.title?.message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>

                                                                {/* <div className="flex flex-col gap-2">
                                                                    <Label className="font-bold">Sub Title</Label>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Sub Title"
                                                                        {...register(
                                                                            `bimCadFiles.items.${index}.subItems.${fileIndex}.subTitle`,
                                                                            {
                                                                                required: "Sub Title is required",
                                                                            }
                                                                        )}
                                                                    />
                                                                    {errors?.bimCadFiles?.items?.[index]
                                                                        ?.subItems?.[fileIndex]?.subTitle && (
                                                                            <p className="text-red-500">
                                                                                {
                                                                                    errors.bimCadFiles.items[index]
                                                                                        ?.subItems?.[fileIndex]?.subTitle?.message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div> */}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-col gap-2">
                                                                <Label className="font-bold">File</Label>
                                                                <Controller
                                                                    name={`bimCadFiles.items.${index}.subItems.${fileIndex}.file`}
                                                                    control={control}
                                                                    rules={{ required: "File is required" }}
                                                                    render={({ field }) => (
                                                                        <FileUploader
                                                                            value={field.value}
                                                                            onChange={(url: string) => {
                                                                                field.onChange(url);
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
                                                                {errors?.bimCadFiles?.items?.[index]
                                                                    ?.subItems?.[fileIndex]?.file && (
                                                                        <p className="text-red-500">
                                                                            {
                                                                                errors.bimCadFiles.items[index]
                                                                                    ?.subItems?.[fileIndex]?.file?.message
                                                                            }
                                                                        </p>
                                                                    )}
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
                                        onClick={() =>
                                            bimAppend({
                                                title: "",
                                                subItems: [],
                                            })
                                        }
                                    >
                                        Add Column
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>
            )}

            {/* Videos & Demos */}
            {selectedType === "videosDemos" && (
                <AdminItemContainer>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("videosDemos.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.videosDemos?.title && (
                                    <p className="text-red-500">{errors.videosDemos.title.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {videoFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border p-2 rounded-md"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => videoRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Thumbnail</Label>
                                                <Controller
                                                    name={`videosDemos.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Thumbnail is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            recommendedDimension="Recommended: 360 x 200 (px)"
                                                        />
                                                    )}
                                                />
                                                {errors?.videosDemos?.items?.[index]?.image && (
                                                    <p className="text-red-500">
                                                        {errors.videosDemos.items[index]?.image?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Thumbnail Alt</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Alt text"
                                                    {...register(`videosDemos.items.${index}.imageAlt`)}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Title</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    {...register(`videosDemos.items.${index}.title`, {
                                                        required: "Title is required",
                                                    })}
                                                />
                                                {errors?.videosDemos?.items?.[index]?.title && (
                                                    <p className="text-red-500">
                                                        {errors.videosDemos.items[index]?.title?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Tags</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Tags"
                                                    {...register(`videosDemos.items.${index}.tags`, {
                                                        required: "Tag is required",
                                                    })}
                                                />
                                                {errors?.videosDemos?.items?.[index]?.tags && (
                                                    <p className="text-red-500">
                                                        {errors.videosDemos.items[index]?.tags?.message}
                                                    </p>
                                                )}
                                            </div>


                                            <div className='flex flex-col gap-2'>
                                                <Label className=''>Video</Label>
                                                <Controller
                                                    name={`videosDemos.items.${index}.videoUrl`}
                                                    control={control}
                                                    rules={{ required: "Video is required" }}
                                                    render={({ field }) => (
                                                        <VideoUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                {errors?.videosDemos?.items?.[index]?.videoUrl && (
                                                    <p className="text-red-500">{errors.videosDemos.items[index]?.videoUrl?.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <Button
                                        type="button"
                                        className="w-full cursor-pointer text-white text-[16px]"
                                        onClick={() =>
                                            videoAppend({
                                                image: "",
                                                imageAlt: "",
                                                title: "",
                                                tags: "",
                                                videoUrl: "",
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>
            )}

            {/* Brochures & Catalogues */}
            {selectedType === "brochures" && (
                <AdminItemContainer>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("brochures.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.brochures?.title && (
                                    <p className="text-red-500">{errors.brochures.title.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {brochureFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border p-2 rounded-md"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => brochureRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Title</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    {...register(`brochures.items.${index}.title`, {
                                                        required: "Title is required",
                                                    })}
                                                />
                                                {errors?.brochures?.items?.[index]?.title && (
                                                    <p className="text-red-500">
                                                        {errors.brochures.items[index]?.title?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">File</Label>
                                                <Controller
                                                    name={`brochures.items.${index}.file`}
                                                    control={control}
                                                    rules={{ required: "File is required" }}
                                                    render={({ field }) => (
                                                        <FileUploader
                                                            value={field.value}
                                                            onChange={(url: string) => {
                                                                field.onChange(url);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors?.brochures?.items?.[index]?.file && (
                                                    <p className="text-red-500">
                                                        {errors.brochures.items[index]?.file?.message}
                                                    </p>
                                                )}
                                            </div>

                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Tags (comma separated)</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="e.g. 2025 EDITION, CERTIFICATIONS"
                                                    {...register(`brochures.items.${index}.tags`, {
                                                        required: "Tags is required",
                                                    })}
                                                />
                                                {errors?.brochures?.items?.[index]?.tags && (
                                                    <p className="text-red-500">
                                                        {errors.brochures.items[index]?.tags?.message}
                                                    </p>
                                                )}
                                            </div>


                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <Button
                                        type="button"
                                        className="w-full cursor-pointer text-white text-[16px]"
                                        onClick={() =>
                                            brochureAppend({
                                                fileType: "PDF",
                                                title: "",
                                                tags: "",
                                                file: "",
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>
            )}

            {/* Certifications & Compliance */}
            {selectedType === "certifications" && (
                <AdminItemContainer>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("certifications.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.certifications?.title && (
                                    <p className="text-red-500">{errors.certifications.title.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {certificationFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border p-2 rounded-md"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => certificationRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Badge Text (e.g. ISO, CE, UAE, NBS)</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="ISO"
                                                    {...register(`certifications.items.${index}.badgeText`, {
                                                        required: "Badge text is required",
                                                    })}
                                                />
                                                {errors?.certifications?.items?.[index]?.badgeText && (
                                                    <p className="text-red-500">
                                                        {errors.certifications.items[index]?.badgeText?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Title</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    {...register(`certifications.items.${index}.title`, {
                                                        required: "Title is required",
                                                    })}
                                                />
                                                {errors?.certifications?.items?.[index]?.title && (
                                                    <p className="text-red-500">
                                                        {errors.certifications.items[index]?.title?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Description</Label>
                                                <Textarea
                                                    placeholder="e.g. Valid through [date] - Issued by [body]"
                                                    {...register(`certifications.items.${index}.description`, {
                                                        required: "Description is required",
                                                    })}
                                                />
                                                {errors?.certifications?.items?.[index]?.description && (
                                                    <p className="text-red-500">
                                                        {errors.certifications.items[index]?.description?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">File</Label>
                                                <Controller
                                                    name={`certifications.items.${index}.file`}
                                                    control={control}
                                                    rules={{ required: "File is required" }}
                                                    render={({ field }) => (
                                                        <FileUploader
                                                            value={field.value}
                                                            onChange={(url: string) => {
                                                                field.onChange(url);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors?.certifications?.items?.[index]?.file && (
                                                    <p className="text-red-500">
                                                        {errors.certifications.items[index]?.file?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <Button
                                        type="button"
                                        className="w-full cursor-pointer text-white text-[16px]"
                                        onClick={() =>
                                            certificationAppend({
                                                badgeText: "",
                                                title: "",
                                                description: "",
                                                file: "",
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>
            )}

            {/* Installation & Maintenance */}
            {selectedType === "installationMaintenance" && (
                <AdminItemContainer>
                    <div className="p-5 rounded-md flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label className="font-bold">Title</Label>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...register("installationMaintenance.title", {
                                        required: "Title is required",
                                    })}
                                />
                                {errors.installationMaintenance?.title && (
                                    <p className="text-red-500">{errors.installationMaintenance.title.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="font-bold">Items</Label>
                            <div className="border p-2 rounded-md flex flex-col gap-5">
                                {installFields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-2 gap-2 relative border p-2 rounded-md"
                                    >
                                        <div className="absolute top-2 right-2">
                                            <RiDeleteBinLine
                                                onClick={() => installRemove(index)}
                                                className="cursor-pointer text-red-600"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Title</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    {...register(`installationMaintenance.items.${index}.title`, {
                                                        required: "Title is required",
                                                    })}
                                                />
                                                {errors?.installationMaintenance?.items?.[index]?.title && (
                                                    <p className="text-red-500">
                                                        {errors.installationMaintenance.items[index]?.title?.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">File</Label>
                                                <Controller
                                                    name={`installationMaintenance.items.${index}.file`}
                                                    control={control}
                                                    rules={{ required: "File is required" }}
                                                    render={({ field }) => (
                                                        <FileUploader
                                                            value={field.value}
                                                            onChange={(url: string) => {
                                                                field.onChange(url);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors?.installationMaintenance?.items?.[index]?.file && (
                                                    <p className="text-red-500">
                                                        {errors.installationMaintenance.items[index]?.file?.message}
                                                    </p>
                                                )}
                                            </div>

                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-bold">Description</Label>
                                                <Textarea
                                                    placeholder="e.g. Step-by-step with diagrams"
                                                    {...register(`installationMaintenance.items.${index}.description`, {
                                                        required: "Description is required",
                                                    })}
                                                />
                                                {errors?.installationMaintenance?.items?.[index]?.description && (
                                                    <p className="text-red-500">
                                                        {errors.installationMaintenance.items[index]?.description?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <Button
                                        type="button"
                                        className="w-full cursor-pointer text-white text-[16px]"
                                        onClick={() =>
                                            installAppend({
                                                fileType: "PDF",
                                                title: "",
                                                description: "",
                                                file: "",
                                            })
                                        }
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>
            )}

            <div className='flex'>
                <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
            </div>
        </form>
    )
}

export default SecondSectionItemPage
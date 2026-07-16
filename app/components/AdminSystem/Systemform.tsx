"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiAiGenerateText } from "react-icons/ri";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AdminItemContainer from "../common/AdminItemContainer";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import SeoFields from "../common/SeoFields";
import { SeoFormValues } from "@/app/types/seo";

interface SystemFormProps {
  seo: SeoFormValues;
  firstSection: {
    title: string;
    shortTitle: string;
    subTitle: string;
    firstDescription: string;
    secondDescription: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
    thumbnailImage: string;
    thumbnailImageAlt: string;
  };

  secondSection: {
    title: string;
    description: string;
    items: {
      image: string;
      imageAlt: string;
      title: string;
      buttonText: string;
      description: string;
    }[];
  };

  thirdSection: {
    title: string;
    description: string;
    items: {
      title: string;
      link: string;
    }[];
  };

  fourthSection: {
    title: string;
    description: string;
    items: {
      logo: string;
      logoAlt: string;
      image: string;
      imageAlt: string;
      title: string;
    }[];
  };

  fifthSection: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      image?: string;
      imageAlt?: string;
    }[];
  };

  sixthSection: {
    title: string;
    items: {
      clientName: string;
      designation: string;
      description: string;
    }[];
  };

  seventhSection: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };

  images: string[];

  slug: string;

  thumbnail: string;
  thumbnailAlt: string;
}

const SystemForm = ({ editMode }: { editMode?: boolean }) => {
  const router = useRouter();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SystemFormProps>();

  const {
    fields: secondSectionItems,
    append: secondSectionAppend,
    remove: secondSectionRemove,
  } = useFieldArray({
    control,
    name: "secondSection.items",
  });

  const {
    fields: thirdSectionItems,
    append: thirdSectionAppend,
    remove: thirdSectionRemove,
  } = useFieldArray({
    control,
    name: "thirdSection.items",
  });

  const {
    fields: fourthSectionItems,
    append: fourthSectionAppend,
    remove: fourthSectionRemove,
  } = useFieldArray({
    control,
    name: "fourthSection.items",
  });

  const {
    fields: fifthSectionItems,
    append: fifthSectionAppend,
    remove: fifthSectionRemove,
  } = useFieldArray({
    control,
    name: "fifthSection.items",
  });

  const {
    fields: sixthSectionItems,
    append: sixthSectionAppend,
    remove: sixthSectionRemove,
  } = useFieldArray({
    control,
    name: "sixthSection.items",
  });

  const {
    fields: seventhSectionItems,
    append: seventhSectionAppend,
    remove: seventhSectionRemove,
  } = useFieldArray({
    control,
    name: "seventhSection.items",
  });

  //   const handleAddSystem = async (data: SystemFormProps) => {
  //     try {
  //       const response = await fetch(
  //         editMode ? `/api/admin/system?id=${id}` : `/api/admin/system`,
  //         {
  //           method: editMode ? "PATCH" : "POST",
  //           body: JSON.stringify(data),
  //         },
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         toast.success(data.message);
  //         router.push("/admin/systems");
  //       }
  //     } catch (error) {
  //       console.log("Error in adding system", error);
  //     }
  //   };

  const handleAddSystem = async (data: SystemFormProps) => {
    try {
      const response = await fetch(
        editMode ? `/api/admin/system?id=${id}` : `/api/admin/system`,
        { method: editMode ? "PATCH" : "POST", body: JSON.stringify(data) },
      );
      const json = await response.json();
      if (response.ok) {
        toast.success(json.message);
        router.push("/admin/systems");
      } else {
        toast.error(json.message || "Something went wrong"); // surface the actual error
      }
    } catch (error) {
      console.log("Error in adding system", error);
      toast.error("Network error");
    }
  };

  const fetchSystemData = async () => {
    try {
      const response = await fetch(`/api/admin/system?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setValue("firstSection", {
          ...data.data.firstSection,
        });
        shortTitleTouched.current = !!data.data.firstSection?.shortTitle;
        setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
        setValue("thirdSection", data.data.thirdSection);
        setValue("thirdSection.items", data.data.thirdSection.items);
        setValue("fourthSection", data.data.fourthSection);
        setValue("fourthSection.items", data.data.fourthSection.items);
        setValue("fifthSection", data.data.fifthSection);
        setValue("fifthSection.items", data.data.fifthSection.items);
        setValue("sixthSection", data.data.sixthSection);
        setValue("sixthSection.items", data.data.sixthSection.items);
        setValue("seventhSection", data.data.seventhSection);
        setValue("seventhSection.items", data.data.seventhSection.items);
        setValue("seo", data.data.seo);
        setValue("slug", data.data.slug);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching blog data", error);
    }
  };

  useEffect(() => {
    if (editMode && id) {
      fetchSystemData();
    }
  }, []);

  const slugValue = watch("slug");
  useEffect(() => {
    if (!slugValue) return;
    const slug = slugValue.replace(/\s+/g, "-");
    if (slug !== slugValue) setValue("slug", slug);
  }, [slugValue]);

  const handleAutoGenerate = () => {
    const name = watch("firstSection.title");
    if (!name) return;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
    setValue("slug", slug);
  };

  const shortTitleTouched = useRef(false);
  const titleValue = watch("firstSection.title");

  useEffect(() => {
    if (!shortTitleTouched.current) {
      setValue("firstSection.shortTitle", titleValue);
    }
  }, [titleValue]);

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5 rounded-md"
        onSubmit={handleSubmit(handleAddSystem)}
      >
        <AdminItemContainer>
          <Label className="" main>
            First Section
          </Label>
          <div className="p-5 rounded-md flex flex-col gap-5">
            <div>
              <Label className="">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("firstSection.title", {
                  required: "Title is required",
                })}
              />
              {errors.firstSection?.title && (
                <p className="text-red-500">
                  {errors.firstSection.title.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Sub Title</Label>
              <Input
                type="text"
                placeholder="Sub Title"
                {...register("firstSection.subTitle", {
                  required: "Sub Title is required",
                })}
              />
              {errors.firstSection?.subTitle && (
                <p className="text-red-500">
                  {errors.firstSection.subTitle.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Short Title</Label>
              <Input
                type="text"
                placeholder="Short Title"
                {...register("firstSection.shortTitle")}
                onChange={(e) => {
                  shortTitleTouched.current = true;
                  setValue("firstSection.shortTitle", e.target.value);
                }}
              />
            </div>

            <div>
              <Label className="flex gap-2 items-center mb-1">
                Slug
                <div
                  className="flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit"
                  onClick={handleAutoGenerate}
                >
                  <p>Auto Generate</p>
                  <RiAiGenerateText />
                </div>
              </Label>
              <Input
                type="text"
                placeholder="Slug"
                {...register("slug", {
                  required: "Slug is required",
                  pattern: {
                    value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                    message:
                      "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                  },
                })}
              />
              {errors.slug && (
                <p className="text-red-500">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label className="">First Description</Label>
              <Textarea
                placeholder="First Description"
                {...register("firstSection.firstDescription", {
                  required: "Description is required",
                })}
              />
              {errors.firstSection?.firstDescription && (
                <p className="text-red-500">
                  {errors.firstSection.firstDescription.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Second Description</Label>
              <Textarea
                placeholder="Second Description"
                {...register("firstSection.secondDescription", {
                  required: "Description is required",
                })}
              />
              {errors.firstSection?.secondDescription && (
                <p className="text-red-500">
                  {errors.firstSection.secondDescription.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Short Description</Label>
              <Textarea
                placeholder="Short Description"
                {...register("firstSection.shortDescription")}
              />
              {errors.firstSection?.shortDescription && (
                <p className="text-red-500">
                  {errors.firstSection.shortDescription.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Image</Label>
                <Controller
                  name={`firstSection.image`}
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      isLogo
                      value={field.value}
                      onChange={field.onChange}
                      recommendedDimension="Recommended: 30 x 35 (px)"
                    />
                  )}
                />
                {/* {errors.firstSection?.image && <p className='text-red-500'>{errors.firstSection?.image.message}</p>} */}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register(`firstSection.imageAlt`)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Thumbnail Image</Label>
                <Controller
                  name={`firstSection.thumbnailImage`}
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      isLogo
                      value={field.value}
                      onChange={field.onChange}
                      recommendedDimension="Recommended: 30 x 35 (px)"
                    />
                  )}
                />
                {/* {errors.firstSection?.image && <p className='text-red-500'>{errors.firstSection?.image.message}</p>} */}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Thumbnail Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register(`firstSection.thumbnailImageAlt`)}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div>
              <Label className="">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("secondSection.title", {
                  required: "Title is required",
                })}
              />
              {errors.secondSection?.title && (
                <p className="text-red-500">
                  {errors.secondSection.title.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("secondSection.description", {
                  required: "Description is required",
                })}
              />
              {errors.secondSection?.description && (
                <p className="text-red-500">
                  {errors.secondSection.description.message}
                </p>
              )}
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5">
                {secondSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => secondSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Image</Label>
                        <Controller
                          name={`secondSection.items.${index}.image`}
                          control={control}
                          render={({ field }) => (
                            <ImageUploader
                              isLogo
                              value={field.value}
                              onChange={field.onChange}
                              recommendedDimension="Recommended: 30 x 35 (px)"
                            />
                          )}
                        />
                        {/* {errors.secondSection?.items?.[index]?.image && <p className='text-red-500'>{errors.secondSection?.items?.[index]?.image.message}</p>} */}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Alt Tag</Label>
                        <Input
                          type="text"
                          placeholder="Alt Tag"
                          {...register(`secondSection.items.${index}.imageAlt`)}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`secondSection.items.${index}.title`)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Button Text</Label>
                        <Input
                          type="text"
                          placeholder="Button Text"
                          {...register(
                            `secondSection.items.${index}.buttonText`,
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className=" font-bold">Description</Label>
                        <Controller
                          name={`secondSection.items.${index}.description`}
                          control={control}
                          rules={{ required: "Description is required" }}
                          render={({ field }) => {
                            return (
                              <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            );
                          }}
                        />
                        {errors.secondSection?.items?.[index]?.description && (
                          <p className="text-red-500">
                            {
                              errors.secondSection?.items?.[index]?.description
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className=""
                    addItem
                    onClick={() =>
                      secondSectionAppend({
                        title: "",
                        buttonText: "",
                        description: "",
                        image: "",
                        imageAlt: "",
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

        <AdminItemContainer>
          <Label className="" main>
            Third Section
          </Label>
          <div className="p-5 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("thirdSection.title", {
                    required: "Title is required",
                  })}
                />
                {errors.thirdSection?.title && (
                  <p className="text-red-500">
                    {errors.thirdSection?.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("thirdSection.description", {
                    required: "Description is required",
                  })}
                />
                {errors.thirdSection?.description && (
                  <p className="text-red-500">
                    {errors.thirdSection.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className=" font-bold">Items</Label>
              <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5">
                {thirdSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b border-black/20  pb-5"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => thirdSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className=" font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`thirdSection.items.${index}.title`)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className=" font-bold">Link</Label>
                        <Input
                          type="text"
                          placeholder="Link"
                          {...register(`thirdSection.items.${index}.link`)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className=""
                    addItem
                    onClick={() => thirdSectionAppend({ title: "", link: "" })}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label className="" main>
            Fourth Section
          </Label>
          <div className="p-5 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Title</Label>
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
              <div className="flex flex-col gap-1">
                <Label className=" font-bold">Description</Label>
                <Textarea
                  placeholder="Description"
                  {...register("fourthSection.description", {
                    required: "Description is required",
                  })}
                />
                {errors.fourthSection?.description && (
                  <p className="text-red-500">
                    {errors.fourthSection?.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className=" font-bold">Items</Label>
              <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5">
                {fourthSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b border-black/20  pb-5"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => fourthSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className=" font-bold">Logo</Label>
                      <Controller
                        name={`fourthSection.items.${index}.logo`}
                        control={control}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                            isLogo
                          />
                        )}
                      />
                      {/* {errors.fourthSection?.items?.[index]?.logo && (
                                                <p className="text-red-500">{errors.fourthSection?.items?.[index]?.logo.message}</p>
                                            )} */}

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className=" font-bold">Alt Tag</Label>
                          <Input
                            type="text"
                            placeholder="Alt Tag"
                            {...register(
                              `fourthSection.items.${index}.logoAlt`,
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className=" font-bold">Image</Label>
                      <Controller
                        name={`fourthSection.items.${index}.image`}
                        control={control}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                            isLogo
                          />
                        )}
                      />
                      {/* {errors.fourthSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.fourthSection?.items?.[index]?.image.message}</p>
                                            )} */}

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className=" font-bold">Alt Tag</Label>
                          <Input
                            type="text"
                            placeholder="Alt Tag"
                            {...register(
                              `fourthSection.items.${index}.imageAlt`,
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label className=" font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`fourthSection.items.${index}.title`)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className=""
                    addItem
                    onClick={() =>
                      fourthSectionAppend({
                        title: "",
                        logo: "",
                        logoAlt: "",
                        image: "",
                        imageAlt: "",
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

        <AdminItemContainer>
          <Label main>Fifth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div>
              <Label className="">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                {...register("fifthSection.title", {
                  required: "Title is required",
                })}
              />
              {errors.fifthSection?.title && (
                <p className="text-red-500">
                  {errors.fifthSection.title.message}
                </p>
              )}
            </div>

            <div>
              <Label className="">Description</Label>
              <Textarea
                placeholder="Description"
                {...register("fifthSection.description", {
                  required: "Description is required",
                })}
              />
              {errors.fifthSection?.description && (
                <p className="text-red-500">
                  {errors.fifthSection.description.message}
                </p>
              )}
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5 mt-0.5">
                {fifthSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b border-black/20 pb-2 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => fifthSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold">Title</Label>
                        <Input
                          type="text"
                          placeholder="Title"
                          {...register(`fifthSection.items.${index}.title`)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className=" font-bold">Description</Label>
                        <Controller
                          name={`fifthSection.items.${index}.description`}
                          control={control}
                          rules={{ required: "Description is required" }}
                          render={({ field }) => {
                            return (
                              <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            );
                          }}
                        />
                        {errors.fifthSection?.items?.[index]?.description && (
                          <p className="text-red-500">
                            {
                              errors.fifthSection?.items?.[index]?.description
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className=""
                    addItem
                    onClick={() =>
                      fifthSectionAppend({
                        title: "",
                        description: "",
                        image: "",
                        imageAlt: "",
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

        <AdminItemContainer>
          <Label main>Sixth Section</Label>

          <div className="p-5 rounded-md flex flex-col gap-4">
            {/* Main Heading */}
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                {...register("sixthSection.title", {
                  required: "Section title is required",
                })}
              />
              {errors.sixthSection?.title && (
                <p className="text-red-500">
                  {errors.sixthSection.title.message}
                </p>
              )}
            </div>

            {/* Testimonials */}
            <div>
              <Label className="font-bold">Testimonials</Label>

              <div className="border border-black/20 p-3 rounded-md flex flex-col gap-5 mt-1">
                {sixthSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative border-b border-black/10 pb-5 last:border-b-0"
                  >
                    {/* Delete */}
                    <div className="absolute top-1 right-2">
                      <RiDeleteBinLine
                        onClick={() => sixthSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Left */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label className="font-bold">Client Name</Label>
                          <Input
                            type="text"
                            {...register(
                              `sixthSection.items.${index}.clientName`,
                              {
                                required: "Client name is required",
                              },
                            )}
                          />
                          {errors.sixthSection?.items?.[index]?.clientName && (
                            <p className="text-red-500">
                              {
                                errors.sixthSection.items[index]?.clientName
                                  ?.message
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="font-bold">
                            Company / Designation
                          </Label>
                          <Input
                            type="text"
                            {...register(
                              `sixthSection.items.${index}.designation`,
                              {
                                required: "Designation is required",
                              },
                            )}
                          />
                          {errors.sixthSection?.items?.[index]?.designation && (
                            <p className="text-red-500">
                              {
                                errors.sixthSection.items[index]?.designation
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label className="font-bold">Testimonial</Label>

                          <Textarea
                            rows={6}
                            {...register(
                              `sixthSection.items.${index}.description`,
                              {
                                required: "Testimonial is required",
                              },
                            )}
                          />

                          {errors.sixthSection?.items?.[index]?.description && (
                            <p className="text-red-500">
                              {
                                errors.sixthSection.items[index]?.description
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Button */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      sixthSectionAppend({
                        clientName: "",
                        designation: "",
                        description: "",
                      })
                    }
                  >
                    Add Testimonial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Seventh Section</Label>

          <div className="p-5 rounded-md flex flex-col gap-4">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                {...register("seventhSection.title", {
                  required: "Section title is required",
                })}
              />

              {errors.seventhSection?.title && (
                <p className="text-red-500">
                  {errors.seventhSection.title.message}
                </p>
              )}
            </div>

            {/* FAQ Items */}
            <div>
              <Label className="font-bold">FAQ Items</Label>

              <div className="border border-black/20 p-3 rounded-md flex flex-col gap-5 mt-1">
                {seventhSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative border-b border-black/10 pb-5 last:border-b-0"
                  >
                    {/* Delete Button */}
                    <div className="absolute top-0 right-2">
                      <RiDeleteBinLine
                        onClick={() => seventhSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Question */}
                      <div>
                        <Label className="font-bold">Question</Label>

                        <Input
                          type="text"
                          {...register(
                            `seventhSection.items.${index}.question`,
                            {
                              required: "Question is required",
                            },
                          )}
                        />

                        {errors.seventhSection?.items?.[index]?.question && (
                          <p className="text-red-500">
                            {
                              errors.seventhSection.items[index]?.question
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      {/* Answer */}
                      <div>
                        <Label className="font-bold">Answer</Label>

                        <Textarea
                          rows={5}
                          {...register(`seventhSection.items.${index}.answer`, {
                            required: "Answer is required",
                          })}
                        />

                        {errors.seventhSection?.items?.[index]?.answer && (
                          <p className="text-red-500">
                            {
                              errors.seventhSection.items[index]?.answer
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add FAQ */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    addItem
                    onClick={() =>
                      seventhSectionAppend({
                        question: "",
                        answer: "",
                      })
                    }
                  >
                    Add FAQ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        {/* <AdminItemContainer>
          <Label main>SEO</Label>
          <div className="flex flex-col gap-2 p-5">
            <div className="mt-2 grid grid-cols-1 gap-2  h-fit">
              <div>
                <Label>Title</Label>
                <Input type="text" {...register("metaTitle")} />
              </div>
              <div>
                <Label>Description</Label>
                <Input type="text" {...register("metaDescription")} />
              </div>
            </div>
          </div>
        </AdminItemContainer> */}

        <SeoFields<SystemFormProps> control={control} register={register} errors={errors} />

        <div className="flex justify-center w-full">
          <Button type="submit" className="cursor-pointer text-white w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SystemForm;

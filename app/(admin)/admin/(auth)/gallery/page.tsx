"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import { GalleryItemRow } from "@/app/components/AdminGallery/GalleryItemRow";
import { SeoFormValues } from "@/app/types/seo";
import SeoFields from "@/app/components/common/SeoFields";

export interface GalleryFormProps {
  seo: SeoFormValues;
  firstSection: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  };
  secondSection: {
    items: {
      title: string;
      image: string;
      imageAlt: string;
      date: string;
      images: {
        src: string;
        alt: string;
      }[];
    }[];
  };
}

const GalleryPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GalleryFormProps>();

  const {
    fields: secondSectionItems,
    append: secondSectionAppend,
    remove: secondSectionRemove,
  } = useFieldArray({
    control,
    name: "secondSection.items",
  });

  const handleAddGallery = async (data: GalleryFormProps) => {
    try {
      const response = await fetch(`/api/admin/gallery`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding Gallery", error);
    }
  };

  const fetchGalleryData = async () => {
    try {
      const response = await fetch(`/api/admin/gallery`);
      if (response.ok) {
        const data = await response.json();
        setValue("seo", data.data.seo);
        setValue("firstSection", data.data.firstSection);
        // setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching Gallery data", error);
    }
  };

  console.log("secondSectionItems", secondSectionItems);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddGallery)}
      >
        <AdminItemContainer>
          <Label main>First Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("firstSection.title", {
                    required: "Title is required",
                  })}
                />
                {errors.firstSection?.title && (
                  <p className="text-red-500">
                    {errors.firstSection?.title.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>

          <div className="p-5 rounded-md flex flex-col gap-5">
            <Label>Items</Label>
            <div className="border border-black/20 p-2 rounded-md flex flex-col gap-2">
              {secondSectionItems.map((field, index) => (
                <GalleryItemRow
                  key={field.id}
                  index={index}
                  control={control}
                  register={register}
                  errors={errors}
                  onRemove={() => secondSectionRemove(index)}
                />
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <Button
                type="button"
                addItem
                onClick={() =>
                  secondSectionAppend({
                    image: "",
                    imageAlt: "",
                    title: "",
                    date: "",
                    images: [],
                  })
                }
              >
                Add Item
              </Button>
            </div>
          </div>
        </AdminItemContainer>

        <SeoFields<GalleryFormProps> control={control} register={register} errors={errors} />

        <div className="flex">
          <Button
            type="submit"
            className="cursor-pointer text-white text-[16px] w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GalleryPage;

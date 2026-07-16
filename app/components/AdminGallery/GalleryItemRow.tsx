// GalleryItemRow.tsx
"use client";

import { useFieldArray, Controller, Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
import { SeoFormValues } from "@/app/types/seo";

export interface GalleryFormProps {
  seo:SeoFormValues
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

export function GalleryItemRow({
  index,
  control,
  register,
  errors,
  onRemove,
}: {
  index: number;
  control: Control<GalleryFormProps>;
  register: any;
  errors: FieldErrors<GalleryFormProps>;
  onRemove: () => void;
}) {
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: `secondSection.items.${index}.images`,
  });

  return (
    <div className="relative border-b border-black/20 pb-4 last:border-b-0 flex flex-col gap-4">
      <div className="absolute top-2 right-2">
        <RiDeleteBinLine onClick={onRemove} className="cursor-pointer text-red-600" />
      </div>

      {/* Existing fields */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Thumbnail Image</Label>
          <Controller
            name={`secondSection.items.${index}.image`}
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <ImageUploader value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.secondSection?.items?.[index]?.image && (
            <p className="text-red-500">{errors.secondSection.items[index].image.message}</p>
          )}
          <Label className="font-bold">Alt Tag</Label>
          <Input {...register(`secondSection.items.${index}.imageAlt`)} placeholder="Alt Tag" />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-bold">Title</Label>
          <Input {...register(`secondSection.items.${index}.title`)} placeholder="Title" />
          <Label className="font-bold">Date</Label>
          <Input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...register(`secondSection.items.${index}.date`)}
          />
        </div>
      </div>

      {/* Nested images */}
      <div className="flex flex-col gap-2">
        <Label className="font-bold">Gallery Images</Label>
        <div className="border border-black/20 p-2 rounded-md gap-3 grid grid-cols-2">
          {imageFields.map((imgField, imgIdx) => (
            <div key={imgField.id} className="grid grid-cols-2 gap-2 border-b border-black/10 pb-3 last:border-b-0">
              <div className="flex flex-col gap-1">
                <Controller
                  name={`secondSection.items.${index}.images.${imgIdx}.src`}
                  control={control}
                  render={({ field }) => (
                    <ImageUploader value={field.value} onChange={field.onChange} />
                  )}
                />
                <Input
                  placeholder="Alt tag"
                  {...register(`secondSection.items.${index}.images.${imgIdx}.alt`)}
                />
              </div>
              <RiDeleteBinLine
                onClick={() => removeImage(imgIdx)}
                className="cursor-pointer text-red-600 mt-2 shrink-0"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-2">
            <Button type="button" addItem onClick={() => appendImage({ src: "", alt: "" })}>
              Add Images
            </Button>
        </div>
      </div>
    </div>
  );
}
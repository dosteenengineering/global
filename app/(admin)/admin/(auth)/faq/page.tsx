"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";
import { ImageUploader } from "@/components/ui/image-uploader";

export interface FaqFormProps {
  metaTitle: string;
  metaDescription: string;
  bannerSection: {
    image: string;
    imageAlt: string;
    title: string;
  };
  firstSection: {
    title: string;
    subTitle: string;
    btnText: string;
    btnLink: string;
  };
  secondSection: {
    items: {
      question: string;
      answer: string;
    }[];
  };
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FaqFormProps>();

  const {
    fields: secondSectionItems,
    append: secondSectionAppend,
    remove: secondSectionRemove,
  } = useFieldArray({
    control,
    name: "secondSection.items",
  });

  const handleAddContact = async (data: FaqFormProps) => {
    try {
      const response = await fetch(`/api/admin/faq`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in adding contact", error);
    }
  };

  const fetchContactData = async () => {
    try {
      const response = await fetch(`/api/admin/faq`);
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("bannerSection", data.data.bannerSection);
        setValue("firstSection", data.data.firstSection);
        setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching faq data", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddContact)}
      >
        <AdminItemContainer>
          <Label main>Banner Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image</Label>
                <Controller
                  name={`bannerSection.image`}
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.bannerSection?.image && (
                  <p className="text-red-500">
                    {errors.bannerSection?.image.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image Alt</Label>
                <Input
                  type="text"
                  placeholder="Image Alt"
                  {...register("bannerSection.imageAlt", {
                    required: "Image Alt is required",
                  })}
                />
                {errors.bannerSection?.imageAlt && (
                  <p className="text-red-500">
                    {errors.bannerSection?.imageAlt.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("bannerSection.title", {
                    required: "Title is required",
                  })}
                />
                {errors.bannerSection?.title && (
                  <p className="text-red-500">
                    {errors.bannerSection?.title.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AdminItemContainer>

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

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Sub Title</Label>
                <Input
                  type="text"
                  placeholder="Sub Title"
                  {...register("firstSection.subTitle")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Button Text</Label>
                <Input
                  type="text"
                  placeholder="Button Text"
                  {...register("firstSection.btnText")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="font-bold">Button Link</Label>
                <Input
                  type="text"
                  placeholder="Button Link"
                  {...register("firstSection.btnLink")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div>
              <Label className="font-bold">Items</Label>
              <div className="border border-black/20 p-2 rounded-md flex flex-col gap-5">
                {secondSectionItems.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0"
                  >
                    <div className="absolute top-2 right-2">
                      <RiDeleteBinLine
                        onClick={() => secondSectionRemove(index)}
                        className="cursor-pointer text-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Question</Label>
                          <Input
                            type="text"
                            placeholder="Question"
                            {...register(
                              `secondSection.items.${index}.question`,
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Answer</Label>
                          <Textarea
                            placeholder="Answer"
                            {...register(
                              `secondSection.items.${index}.answer`,
                              {
                                required: "Answer is required",
                              },
                            )}
                          />
                          {errors.secondSection?.items?.[index]?.answer && (
                            <p className="text-red-500">
                              {
                                errors.secondSection?.items?.[index]?.answer
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  addItem
                  onClick={() =>
                    secondSectionAppend({
                      question: "",
                      answer: "",
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>SEO</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Title</Label>
              <Input type="text" placeholder="" {...register("metaTitle")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Description</Label>
              <Input
                type="text"
                placeholder=""
                {...register("metaDescription")}
              />
            </div>
          </div>
        </AdminItemContainer>

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

export default ContactPage;

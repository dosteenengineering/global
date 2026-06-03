"use client"

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import ProjectCard from "./ProjectCard";
import { RiDeleteBinLine } from "react-icons/ri";


interface ProjectPageProps {
  metaTitle: string;
  metaDescription: string;
  bannerSection: {
    image: string;
    imageAlt: string;
    title: string;
  };
  firstSection: {
    title: string;
    description: string;
  },
  lastSection: {
    title: string;
    description: string;
    items:{
      buttonText:string;
      buttonLink:string;
    }[]
  };
}



export default function Projects() {

  const [sector, setSector] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [projectList, setProjectList] = useState<{ _id: string, firstSection: { title: string, description: string } }[]>([]);
  const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
  const [sectorList, setSectorList] = useState<{ _id: string, name: string }[]>([]);
  const [reorderMode, setReorderMode] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ProjectPageProps>();

  const { fields: lastSectionItems, append: lastSectionAppend, remove: lastSectionRemove } = useFieldArray({
    control,
    name: "lastSection.items"
  });

  const handleFetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/project");
      if (response.ok) {
        const data = await response.json();
        setProjectList(data.data.projects);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  }

  const handleAddSector = async () => {
    try {
      const response = await fetch("/api/admin/project/sector", {
        method: "POST",
        body: JSON.stringify({ name: sector }),
      });
      if (response.ok) {
        const data = await response.json();
        setSector("");
        toast.success(data.message);
        handleFetchSector();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding sector", error);
    }
  }

  const handleFetchSector = async () => {
    try {
      const response = await fetch("/api/admin/project/sector");
      if (response.ok) {
        const data = await response.json();
        setSectorList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching sector", error);
    }
  }

  const handleEditSector = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/project/sector?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: sector }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchSector();
        setSector("");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing sector", error);
    }
  }

  const handleDeleteSector = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/project/sector?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchSector();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting sector", error);
    }
  }


  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/project/location");
      if (response.ok) {
        const data = await response.json();
        setLocationList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching location", error);
    }
  }

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/admin/project/location", {
        method: "POST",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        setLocation("");
        toast.success(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding location", error);
    }
  }

  const handleEditLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/project/location?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: location }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing location", error);
    }
  }

  const handleDeleteLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/project/location?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchLocation();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting location", error);
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/project?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchProjects();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting project", error);
    }
  }

  const onSubmit = async (data: ProjectPageProps) => {
    try {
      const response = await fetch(`/api/admin/project`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in submitting project details", error);
    }
  }

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch("/api/admin/project");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("bannerSection", data.data.bannerSection);
        setValue("lastSection", data.data.lastSection);
        setValue("lastSection.items", data.data.lastSection.items);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching project details", error);
    }
  }


  const getProjectPos = (id: string) => projectList.findIndex((item) => item._id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = getProjectPos(active.id as string);
    const newIndex = getProjectPos(over.id as string);

    setProjectList((items) => arrayMove(items, oldIndex, newIndex));
  };

  const confirmProjectOrder = async () => {
    setReorderMode(false);

    const orderedIds = projectList.map((p) => p._id);

    const formData = new FormData();
    formData.append("projects", JSON.stringify(orderedIds));

    const res = await fetch("/api/admin/project/reorder", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
    }
  };

  useEffect(() => {
    handleFetchProjects();
    handleFetchSector();
    handleFetchLocation();
    fetchProjectDetails();
  }, [])

  return (
    <div className="flex flex-col gap-5">

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <AdminItemContainer>
          <Label className='' main>Banner Section</Label>
          <div className='p-5 rounded-md flex flex-col gap-5'>
            <div className='grid grid-cols-2 gap-2 relative pb-5'>

              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <Label className='font-bold'>Image</Label>
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
                    <p className="text-red-500">{errors.bannerSection?.image.message}</p>
                  )}
                </div>

                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Alt Tag</Label>
                    <Input type='text' placeholder='Alt Tag' {...register(`bannerSection.imageAlt`, {
                      required: "Value is required"
                    })} />
                    {errors.bannerSection?.imageAlt && <p className='text-red-500'>{errors.bannerSection?.imageAlt.message}</p>}
                  </div>
                </div>


              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Title</Label>
                    <Input type='text' placeholder='Title' {...register(`bannerSection.title`, {
                      required: "Value is required"
                    })} />
                    {errors.bannerSection?.title && <p className='text-red-500'>{errors.bannerSection?.title.message}</p>}
                  </div>
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

        <AdminItemContainer>
          <Label main>SEO</Label>
          <div className="p-5 flex flex-col gap-2">
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

        <div className='flex justify-center mt-5'>
          <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
        </div>

      </form>


      <div className="h-screen grid grid-cols-2 gap-5">

        <div className="flex flex-col gap-2 h-screen">
          <div className="h-1/2 w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 border-black/20 pb-2">
              <Label className="text-sm font-bold">Sector</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setSector("")}>Add Sector</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Sector</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Sector" value={sector} onChange={(e) => setSector(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddSector}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {sectorList.map((item) => (
                <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                  <div className="text-[16px]">
                    {item.name}
                  </div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger onClick={() => { setSector(item.name) }}><MdEdit /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Sector</DialogTitle>
                          <DialogDescription>
                            <Input type="text" placeholder="Sector Name" value={sector} onChange={(e) => setSector(e.target.value)} />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditSector(item._id)}>Save</DialogClose>
                      </DialogContent>

                    </Dialog>



                    <Dialog>
                      <DialogTrigger><MdDelete /></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteSector(item._id)}>Yes</DialogClose>
                        </div>

                      </DialogContent>

                    </Dialog>

                  </div>
                </div>
              ))}

            </div>
          </div>


          <div className="h-1/2 w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 border-black/20 pb-2">
              <Label className="text-sm font-bold">Location</Label>
              <Dialog>
                <DialogTrigger className="bg-black text-white px-2 py-1 rounded-md" onClick={() => setLocation("")}>Add Location</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                    <DialogDescription>
                      <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={handleAddLocation}>Save</DialogClose>
                </DialogContent>

              </Dialog>
            </div>
            <div className="h-full">

              <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
                {locationList.map((item) => (
                  <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                    <div className="text-[16px]">
                      {item.name}
                    </div>
                    <div className="flex gap-5">
                      <Dialog>
                        <DialogTrigger onClick={() => { setLocation(item.name) }}><MdEdit /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Location</DialogTitle>
                            <DialogDescription>
                              <Input type="text" placeholder="Location Name" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </DialogDescription>
                          </DialogHeader>
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleEditLocation(item._id)}>Save</DialogClose>
                        </DialogContent>

                      </Dialog>



                      <Dialog>
                        <DialogTrigger><MdDelete /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                            <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteLocation(item._id)}>Yes</DialogClose>
                          </div>

                        </DialogContent>

                      </Dialog>

                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

        <div className="h-screen w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 border-black/20 pb-2">
            <Label className="text-sm font-bold">Projects</Label>
            <div className="flex gap-2">
              <Button
                className={`text-white ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`}
                onClick={() => (reorderMode ? confirmProjectOrder() : setReorderMode(true))}
              >
                {reorderMode ? "Done" : "Reorder"}
              </Button>
              <Button onClick={() => router.push("/admin/projects/add")} className="text-white cursor-pointer">Add Project</Button>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">

            {reorderMode && (
              <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                  <SortableContext
                    items={projectList.map((p) => p._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {projectList.map((item) => (
                      <ProjectCard key={item._id} id={item._id} title={item.firstSection.title} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}

            {!reorderMode && projectList.map((item) => (
              <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                <div className="text-[16px]">
                  {item.firstSection.title}
                </div>
                <div className="flex gap-5">
                  <MdEdit onClick={() => router.push(`/admin/projects/edit/${item._id}`)} />

                  <Dialog>
                    <DialogTrigger><MdDelete /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteProject(item._id)}>Yes</DialogClose>
                      </div>

                    </DialogContent>

                  </Dialog>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
  );
}

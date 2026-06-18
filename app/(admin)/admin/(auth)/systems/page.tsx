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
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from '@/components/ui/image-uploader'
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


interface SystemPageProps {
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
    image: string;
    imageAlt: string;
    mainTitle: string;
    subTitle: string;
    buttonText: string;
  };
}



export default function Systems() {

  const [sector, setSector] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [systemList, setSystemList] = useState<{ _id: string, firstSection: { title: string, description: string } }[]>([]);
  const [locationList, setLocationList] = useState<{ _id: string, name: string }[]>([]);
  const [sectorList, setSectorList] = useState<{ _id: string, name: string }[]>([]);
  const [reorderMode, setReorderMode] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<SystemPageProps>();

  const handleFetchSystems = async () => {
    try {
      const response = await fetch("/api/admin/system");
      if (response.ok) {
        const data = await response.json();
        setSystemList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching systems", error);
    }
  }


  const handleFetchSector = async () => {
    try {
      const response = await fetch("/api/admin/system/sector");
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


  const handleFetchLocation = async () => {
    try {
      const response = await fetch("/api/admin/system/location");
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


  const handleDeleteSystem = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/system?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchSystems();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting system", error);
    }
  }


  const fetchSystemDetails = async () => {
    try {
      const response = await fetch("/api/admin/system");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("bannerSection", data.data.bannerSection);
        setValue("firstSection", data.data.firstSection);
        setValue("lastSection", data.data.lastSection);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching system details", error);
    }
  }


  useEffect(() => {
    handleFetchSystems();
    handleFetchSector();
    handleFetchLocation();
    fetchSystemDetails();
  }, [])

  return (
    <div className="flex flex-col gap-5">

      <div className="h-screen grid grid-cols-1 gap-5">

        <div className="h-screen w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 border-black/20 pb-2">
            <Label className="text-sm font-bold">Systems</Label>
            <div className="flex gap-2">
              <Button onClick={() => router.push("/admin/systems/add")} className="text-white cursor-pointer">Add System</Button>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">


            {!reorderMode && systemList.map((item) => (
              <div className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300" key={item._id}>
                <div className="text-[16px]">
                  {item.firstSection.title}
                </div>
                <div className="flex gap-5">
                  <MdEdit onClick={() => router.push(`/admin/systems/edit/${item._id}`)} />

                  <Dialog>
                    <DialogTrigger><MdDelete /></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">No</DialogClose>
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md" onClick={() => handleDeleteSystem(item._id)}>Yes</DialogClose>
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

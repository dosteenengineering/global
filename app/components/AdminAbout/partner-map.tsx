"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import CountryMapPicker from "./CountryMapPicker";

interface MapCategory {
  _id: string;
  title: string;
  count: string;
}

interface CountryMapItem {
  _id: string;
  title: string;
  xValue: number;
  yValue: number;
  category: { _id: string; title: string } | null;
}

export default function PartnerMap() {
  const [categoryList, setCategoryList] = useState<MapCategory[]>([]);
  const [countryList, setCountryList] = useState<CountryMapItem[]>([]);

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryCount, setCategoryCount] = useState("");

  const [countryTitle, setCountryTitle] = useState("");
  const [xValue, setXValue] = useState("");
  const [yValue, setYValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/map-category");
      const data = await response.json();
      if (response.ok) {
        setCategoryList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching map categories", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch("/api/admin/country-map");
      const data = await response.json();
      if (response.ok) {
        setCountryList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching country map", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCountries();
  }, []);

  const resetCountryForm = () => {
    setCountryTitle("");
    setXValue("");
    setYValue("");
    setSelectedCategory("");
  };

  const handleAddCategory = async () => {
    if (!categoryTitle.trim()) {
      toast.error("Please enter a category title");
      return;
    }
    try {
      const response = await fetch("/api/admin/map-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: categoryTitle, count: categoryCount }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setCategoryTitle("");
        setCategoryCount("");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding category", error);
    }
  };

  const handleEditCategory = async (id: string) => {
    if (!categoryTitle.trim()) {
      toast.error("Please enter a category title");
      return;
    }
    try {
      const response = await fetch(`/api/admin/map-category?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: categoryTitle, count: categoryCount }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setCategoryTitle("");
        setCategoryCount("");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing category", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/map-category?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting category", error);
    }
  };

  const handleAddCountry = async () => {
    if (!countryTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!xValue || !yValue) {
      toast.error("Click on the map to set position");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }
    try {
      const response = await fetch("/api/admin/country-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: countryTitle,
          xValue,
          yValue,
          category: selectedCategory,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        resetCountryForm();
        fetchCountries();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding country", error);
    }
  };

  const handleEditCountry = async (id: string) => {
    if (!countryTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!xValue || !yValue) {
      toast.error("Click on the map to set position");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }
    try {
      const response = await fetch(`/api/admin/country-map?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: countryTitle,
          xValue,
          yValue,
          category: selectedCategory,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        resetCountryForm();
        fetchCountries();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing country", error);
    }
  };

  const handleDeleteCountry = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/country-map?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchCountries();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting country", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="min-h-[500px] grid grid-cols-2 gap-5">
        {/* Categories */}
        <div className="flex flex-col gap-2">
          <div className="h-full w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 border-black/20 pb-2">
              <Label className="text-sm font-bold">Category</Label>
              <Dialog>
                <DialogTrigger
                  className="bg-black text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    setCategoryTitle("");
                    setCategoryCount("");
                  }}
                >
                  Add Category
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                      <Input
                        type="text"
                        placeholder="Category Name"
                        value={categoryTitle}
                        onChange={(e) => setCategoryTitle(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Category Count"
                        value={categoryCount}
                        className="mt-2"
                        onChange={(e) => setCategoryCount(e.target.value)}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose
                    className="bg-black text-white px-2 py-1 rounded-md"
                    onClick={handleAddCategory}
                  >
                    Save
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll">
              {categoryList.map((item) => (
                <div
                  className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  key={item._id}
                >
                  <div className="text-[16px]">{item.title}</div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => {
                          setCategoryTitle(item.title);
                          setCategoryCount(item.count);
                        }}
                      >
                        <MdEdit />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>
                            <Input
                              type="text"
                              placeholder="Category Name"
                              value={categoryTitle}
                              onChange={(e) => setCategoryTitle(e.target.value)}
                            />
                            <Input
                              type="text"
                              placeholder="Category Count"
                              value={categoryCount}
                              className="mt-2"
                              onChange={(e) => setCategoryCount(e.target.value)}
                            />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose
                          className="bg-black text-white px-2 py-1 rounded-md"
                          onClick={() => handleEditCategory(item._id)}
                        >
                          Save
                        </DialogClose>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger>
                        <MdDelete />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                            No
                          </DialogClose>
                          <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md"
                            onClick={() => handleDeleteCategory(item._id)}
                          >
                            Yes
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Countries */}
        <div className="w-full p-5 shadow-md border-black/20 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 border-black/20 pb-2">
            <Label className="text-sm font-bold">Countries</Label>
            <Dialog>
              <DialogTrigger
                className="bg-black text-white px-2 py-1 rounded-md"
                onClick={resetCountryForm}
              >
                Add Country
              </DialogTrigger>
              <DialogContent className="!max-w-[80vw] !w-[80vw] !h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Add Country</DialogTitle>
                </DialogHeader>

                <div className="flex flex-1 gap-5 overflow-hidden">
                  <div className="w-[280px] shrink-0 flex flex-col gap-4 overflow-y-auto pr-5">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Title</Label>
                      <Input
                        type="text"
                        placeholder="Country / Partner Title"
                        value={countryTitle}
                        onChange={(e) => setCountryTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Category</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryList.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">X Value</Label>
                      <Input
                        type="text"
                        value={xValue}
                        readOnly
                        placeholder="Click map"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Y Value</Label>
                      <Input
                        type="text"
                        value={yValue}
                        readOnly
                        placeholder="Click map"
                      />
                    </div>

                    <p className="text-xs text-black/50">
                      Click anywhere on the map to set position.
                    </p>

                    <DialogClose
                      className="bg-black text-white px-2 py-1 rounded-md cursor-pointer"
                      onClick={handleAddCountry}
                    >
                      Save
                    </DialogClose>
                  </div>

                  <div className="flex-1 overflow-auto flex items-center">
                    <CountryMapPicker
                      xValue={xValue}
                      yValue={yValue}
                      onPick={(x, y) => {
                        setXValue(x);
                        setYValue(y);
                      }}
                      existingCountries={countryList}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll">
            {countryList.map((item) => (
              <div
                className="flex justify-between border border-black/20 p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                key={item._id}
              >
                <div className="text-[16px]">
                  {item.title}
                  <span className="text-black/40 text-sm ml-2">
                    {item.category?.title ?? "No category"}
                  </span>
                </div>
                <div className="flex gap-5">
                  <Dialog>
                    <DialogTrigger
                      onClick={() => {
                        setCountryTitle(item.title);
                        setXValue(String(item.xValue));
                        setYValue(String(item.yValue));
                        setSelectedCategory(item.category?._id ?? "");
                      }}
                    >
                      <MdEdit />
                    </DialogTrigger>
                    <DialogContent className="!max-w-[80vw] !w-[80vw] !h-[80vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Edit Country</DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-1 gap-5 overflow-hidden">
                        <div className="w-[280px] shrink-0 flex flex-col gap-4 overflow-y-auto pr-5">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Title</Label>
                            <Input
                              type="text"
                              placeholder="Country / Partner Title"
                              value={countryTitle}
                              onChange={(e) => setCountryTitle(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Category</Label>
                            <Select
                              value={selectedCategory}
                              onValueChange={setSelectedCategory}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categoryList.map((category) => (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">X Value</Label>
                            <Input
                              type="text"
                              value={xValue}
                              readOnly
                              placeholder="Click map"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Y Value</Label>
                            <Input
                              type="text"
                              value={yValue}
                              readOnly
                              placeholder="Click map"
                            />
                          </div>

                          <p className="text-xs text-black/50">
                            Click anywhere on the map to update position.
                          </p>

                          <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md cursor-pointer"
                            onClick={() => handleEditCountry(item._id)}
                          >
                            Save
                          </DialogClose>
                        </div>

                        <div className="flex-1 overflow-auto flex items-center">
                          <CountryMapPicker
                            xValue={xValue}
                            yValue={yValue}
                            onPick={(x, y) => {
                              setXValue(x);
                              setYValue(y);
                            }}
                            existingCountries={countryList}
                            excludeId={item._id}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger>
                      <MdDelete />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                          No
                        </DialogClose>
                        <DialogClose
                          className="bg-black text-white px-2 py-1 rounded-md"
                          onClick={() => handleDeleteCountry(item._id)}
                        >
                          Yes
                        </DialogClose>
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

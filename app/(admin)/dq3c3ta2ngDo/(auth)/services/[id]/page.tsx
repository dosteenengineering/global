import React from "react";
import Residential from "@/app/components/AdminService/Residential";
import OtherService from "@/app/components/AdminService/OtherService";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    await connectDB();

    const service = await Service.findOne();

    if (!service) {
        notFound();
    }

    const items = service.thirdSection?.items || [];

    const serviceIndex = items.findIndex(
        (item: any) => item._id.toString() === id
    );

    if (serviceIndex === -1) {
        notFound();
    }

    const isFirstService = serviceIndex === 0;

    return isFirstService ? (
        <Residential />
    ) : (
        <OtherService />
    );
};

export default Page;
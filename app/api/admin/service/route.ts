import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Residential from "@/app/models/Residential";
import "@/app/models/System"


export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const id = request.nextUrl.searchParams.get("id");

        const service = await Service.findOne().populate(
            "thirdSection.items.systemSection.items"
        );

        if (!service) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        if (!id) {
            return NextResponse.json(
                {
                    data: service,
                    message: "Service fetched successfully",
                },
                { status: 200 }
            );
        }

        const itemIndex = service.thirdSection.items.findIndex(
            (item: any) => item._id.toString() === id
        );

        if (itemIndex === -1) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        // FIRST SERVICE
        if (itemIndex === 0) {
            const residential = await Residential.findOne().populate(
                "systemSection.items"
            );

            return NextResponse.json(
                {
                    data: residential,
                    type: "RESIDENTIAL",
                    message: "Residential service fetched successfully",
                },
                { status: 200 }
            );
        }

        // OTHER SERVICES
        return NextResponse.json(
            {
                data: service.thirdSection.items[itemIndex],
                type: "NORMAL",
                message: "Individual service fetched successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        const isAdmin = await verifyAdmin(request);

        if (!isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const id = request.nextUrl.searchParams.get("id");

        if (!id) {
            const service = await Service.findOneAndUpdate(
                {},
                body,
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

            return NextResponse.json(
                {
                    data: service,
                    message: "Service updated successfully",
                },
                { status: 200 }
            );
        }

        const service = await Service.findOne();

        if (!service) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        const itemIndex = service.thirdSection.items.findIndex(
            (item: any) => item._id.toString() === id
        );

        if (itemIndex === -1) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        // FIRST SERVICE
        if (itemIndex === 0) {
            const residential = await Residential.findOneAndUpdate(
                {},
                body,
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

            return NextResponse.json(
                {
                    data: residential,
                    type: "RESIDENTIAL",
                    message: "Residential service updated successfully",
                },
                { status: 200 }
            );
        }

        // OTHER SERVICES
        service.thirdSection.items[itemIndex] = {
            ...service.thirdSection.items[itemIndex].toObject(),
            ...body,
        };

        await service.save();

        return NextResponse.json(
            {
                data: service.thirdSection.items[itemIndex],
                type: "NORMAL",
                message: "Individual service updated successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
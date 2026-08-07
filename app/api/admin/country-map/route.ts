import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import CountryMap from "@/app/models/CountryMap";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const category = req.nextUrl.searchParams.get("category");
        const filter = category ? { category } : {};
        const countries = await CountryMap.find(filter).populate("category", "title").sort({ createdAt: 1 });
        return NextResponse.json({ success: true, data: countries }, { status: 200 });
    } catch (error) {
        console.log("Error fetching country map", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        if (!body.title?.trim()) {
            return NextResponse.json({ message: "Title is required" }, { status: 400 });
        }
        if (body.xValue === undefined || body.xValue === "" || body.yValue === undefined || body.yValue === "") {
            return NextResponse.json({ message: "X and Y values are required" }, { status: 400 });
        }
        if (!body.category) {
            return NextResponse.json({ message: "Category is required" }, { status: 400 });
        }

        const country = await CountryMap.create({
            title: body.title,
            xValue: body.xValue,
            yValue: body.yValue,
            category: body.category,
        });

        return NextResponse.json({ success: true, message: "Country added", data: country }, { status: 201 });
    } catch (error) {
        console.log("Error creating country map", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Id is required" }, { status: 400 });
        }

        await connectDB();
        const body = await req.json();

        if (!body.title?.trim()) {
            return NextResponse.json({ message: "Title is required" }, { status: 400 });
        }
        if (body.xValue === undefined || body.xValue === "" || body.yValue === undefined || body.yValue === "") {
            return NextResponse.json({ message: "X and Y values are required" }, { status: 400 });
        }
        if (!body.category) {
            return NextResponse.json({ message: "Category is required" }, { status: 400 });
        }

        const country = await CountryMap.findByIdAndUpdate(
            id,
            { title: body.title, xValue: body.xValue, yValue: body.yValue, category: body.category },
            { new: true }
        );

        if (!country) {
            return NextResponse.json({ message: "Country not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Country updated", data: country }, { status: 200 });
    } catch (error) {
        console.log("Error updating country map", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Id is required" }, { status: 400 });
        }

        await connectDB();
        const country = await CountryMap.findByIdAndDelete(id);
        if (!country) {
            return NextResponse.json({ message: "Country not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Country deleted" }, { status: 200 });
    } catch (error) {
        console.log("Error deleting country map", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
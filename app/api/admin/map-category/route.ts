import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import MapCategory from "@/app/models/MapCategory";
import CountryMap from "@/app/models/CountryMap";

export async function GET() {
    try {
        await connectDB();
        const categories = await MapCategory.find({}).sort({ createdAt: 1 });
        return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error) {
        console.log("Error fetching map categories", error);
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

        const category = await MapCategory.create({ title: body.title, count: body.count });
        return NextResponse.json({ success: true, message: "Category created", data: category }, { status: 201 });
    } catch (error) {
        console.log("Error creating map category", error);
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

        const category = await MapCategory.findByIdAndUpdate(id, { title: body.title, count: body.count }, { new: true });
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Category updated", data: category }, { status: 200 });
    } catch (error) {
        console.log("Error updating map category", error);
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

        // block delete if countries still reference this category — prevents orphaned/lost data
        const linkedCount = await CountryMap.countDocuments({ category: id });
        if (linkedCount > 0) {
            return NextResponse.json(
                { message: `Cannot delete — ${linkedCount} countr${linkedCount === 1 ? "y" : "ies"} still use this category` },
                { status: 400 }
            );
        }

        const category = await MapCategory.findByIdAndDelete(id);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Category deleted" }, { status: 200 });
    } catch (error) {
        console.log("Error deleting map category", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
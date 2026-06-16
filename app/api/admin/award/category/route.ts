import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import AwardCategory from "@/app/models/AwardCategory";

export async function GET() {
    try {
        await connectDB();
        const location = await AwardCategory.find({});
        if (!location) {
            return NextResponse.json({ message: "AwardCategory not found" }, { status: 404 });
        }
        return NextResponse.json({data:location,message:"AwardCategory fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const {name} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const location = await AwardCategory.create({name});
        if (!location) {
            return NextResponse.json({ message: "AwardCategory not found" }, { status: 404 });
        }
        return NextResponse.json({data:location,message:"AwardCategory created successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const {name} = await request.json();
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const location = await AwardCategory.findByIdAndUpdate(id,{name},{upsert:true,new:true});
        if (!location) {
            return NextResponse.json({ message: "AwardCategory not found" }, { status: 404 });
        }
        return NextResponse.json({data:location,message:"AwardCategory updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const location = await AwardCategory.findByIdAndDelete(id);
        if (!location) {
            return NextResponse.json({ message: "AwardCategory not found" }, { status: 404 });
        }
        return NextResponse.json({data:location,message:"AwardCategory deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

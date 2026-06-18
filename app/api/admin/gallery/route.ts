import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/app/models/Gallery";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const gallery = await Gallery.findOne({});
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        return NextResponse.json({data:gallery,message:"Gallery fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const gallery = await Gallery.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!gallery) {
            return NextResponse.json({ message: "Gallery not found" }, { status: 404 });
        }
        return NextResponse.json({data:gallery,message:"Gallery updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Capability from "@/app/models/Capability";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const about = await Capability.findOne({});
        if (!about) {
            return NextResponse.json({ message: "Capability not found" }, { status: 404 });
        }
        return NextResponse.json({data:about,message:"Capability fetched successfully"}, { status: 200 });
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
        const about = await Capability.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!about) {
            return NextResponse.json({ message: "Capability not found" }, { status: 404 });
        }
        return NextResponse.json({data:about,message:"Capability updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
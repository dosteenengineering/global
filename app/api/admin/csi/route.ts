import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Csi from "@/app/models/Csi";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const csi = await Csi.findOne({});
        if (!csi) {
            return NextResponse.json({ message: "Csi not found" }, { status: 404 });
        }
        return NextResponse.json({data:csi,message:"Csi fetched successfully"}, { status: 200 });
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
        const csi = await Csi.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!csi) {
            return NextResponse.json({ message: "Csi not found" }, { status: 404 });
        }
        return NextResponse.json({data:csi,message:"Csi updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
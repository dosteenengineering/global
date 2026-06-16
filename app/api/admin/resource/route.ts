import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resource from "@/app/models/Resource";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const resource = await Resource.findOne({});
        if (!resource) {
            return NextResponse.json({ message: "Resource not found" }, { status: 404 });
        }
        return NextResponse.json({data:resource,message:"Resource fetched successfully"}, { status: 200 });
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
        const resource = await Resource.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!resource) {
            return NextResponse.json({ message: "Resource not found" }, { status: 404 });
        }
        return NextResponse.json({data:resource,message:"Resource updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
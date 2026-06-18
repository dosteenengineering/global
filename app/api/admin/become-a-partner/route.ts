import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Partner from "@/app/models/Partner";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const partner = await Partner.findOne({});
        if (!partner) {
            return NextResponse.json({ message: "Partner not found" }, { status: 404 });
        }
        return NextResponse.json({data:partner,message:"Partner fetched successfully"}, { status: 200 });
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
        const partner = await Partner.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!partner) {
            return NextResponse.json({ message: "Partner not found" }, { status: 404 });
        }
        return NextResponse.json({data:partner,message:"Partner updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
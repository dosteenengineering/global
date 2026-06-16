import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Client from "@/app/models/Client";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const client = await Client.findOne({});
        if (!client) {
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({data:client,message:"Client fetched successfully"}, { status: 200 });
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
        const client = await Client.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!client) {
            return NextResponse.json({ message: "Client not found" }, { status: 404 });
        }
        return NextResponse.json({data:client,message:"Client updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
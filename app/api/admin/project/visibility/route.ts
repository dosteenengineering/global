import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import { verifyAdmin } from "@/lib/verifyAdmin";

// Toggle a single case study's visibility. Only `projects.$.isHidden` is written; no other field is touched.
export async function PATCH(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = request.nextUrl.searchParams.get("id");
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid case study id" }, { status: 400 });
        }

        const { isHidden } = await request.json();
        if (typeof isHidden !== "boolean") {
            return NextResponse.json({ message: "isHidden must be a boolean" }, { status: 400 });
        }

        await connectDB();
        const result = await Project.updateOne(
            { "projects._id": id },
            { $set: { "projects.$.isHidden": isHidden } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Case study not found" }, { status: 404 });
        }

        return NextResponse.json(
            { data: { _id: id, isHidden }, message: isHidden ? "Case study hidden from website" : "Case study visible on website" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

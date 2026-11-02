import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import { verifyAdmin } from "@/lib/verifyAdmin";

// Toggle a single blog's visibility. Only `blogs.$.isHidden` is written; no other field is touched.
export async function PATCH(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = request.nextUrl.searchParams.get("id");
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid blog id" }, { status: 400 });
        }

        const { isHidden } = await request.json();
        if (typeof isHidden !== "boolean") {
            return NextResponse.json({ message: "isHidden must be a boolean" }, { status: 400 });
        }

        await connectDB();
        const result = await Blog.updateOne(
            { "blogs._id": id },
            { $set: { "blogs.$.isHidden": isHidden } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(
            { data: { _id: id, isHidden }, message: isHidden ? "Blog hidden from website" : "Blog visible on website" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

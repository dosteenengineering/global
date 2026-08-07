import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Award from "@/app/models/Award";
import mongoose from "mongoose";
import type { Types } from "mongoose";

export async function POST(req: NextRequest) {
    const session = await mongoose.startSession();

    try {
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        session.startTransaction();

        const formData = await req.formData();
        const awards = formData.get("awards") as string;
        const orderedIds: string[] = JSON.parse(awards);

        const doc = await Award.findOne({}).session(session);
        if (!doc) {
            await session.abortTransaction();
            return NextResponse.json({ message: "Award document not found" }, { status: 404 });
        }

        const reordered = orderedIds
            .map((id) =>
                doc.awards.find(
                    (a: { _id: Types.ObjectId }) => a._id.toString() === id
                )
            )
            .filter(Boolean);

        // guard: bail if counts don't match instead of silently dropping items
        if (reordered.length !== doc.awards.length) {
            await session.abortTransaction();
            return NextResponse.json(
                { message: "Reorder count mismatch, aborted to prevent data loss" },
                { status: 400 }
            );
        }

        doc.awards = reordered;
        await doc.save({ session });

        await session.commitTransaction();

        return NextResponse.json(
            { success: true, message: "Awards reordered successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        await session.abortTransaction();
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        session.endSession();
    }
}
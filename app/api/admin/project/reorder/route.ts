import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Project from "@/app/models/Project";
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
        const projects = formData.get("projects") as string;
        const orderedIds: string[] = JSON.parse(projects);

        const doc = await Project.findOne({}).session(session);
        if (!doc) {
            return NextResponse.json({ message: "Project document not found" }, { status: 404 });
        }

        const reordered = orderedIds
            .map((id) =>
                doc.projects.find(
                    (p: { _id: Types.ObjectId }) => p._id.toString() === id
                )
            )
            .filter(Boolean);

        // Safety net against data loss: keep any case study missing from the submitted order, appended at the end
        const orderedSet = new Set(orderedIds);
        const missing = doc.projects.filter(
            (p: { _id: Types.ObjectId }) => !orderedSet.has(p._id.toString())
        );
        reordered.push(...missing);


        doc.projects = reordered;
        await doc.save({ session });

        await session.commitTransaction();

        return NextResponse.json(
            { success: true, message: "Projects reordered successfully" },
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

import { NextRequest, NextResponse } from "next/server";
import DownloadLead from "@/app/models/DownloadLead";
import connectDB from "@/lib/mongodb";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { ids } = body as { ids: string[] };

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { success: false, message: "'ids' must be a non-empty array" },
                { status: 400 },
            );
        }

        const result = await DownloadLead.deleteMany({ _id: { $in: ids } });

        return NextResponse.json({
            success: true,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.log("Error bulk deleting download leads", error);
        return NextResponse.json(
            { success: false, message: "Failed to bulk delete entries" },
            { status: 500 },
        );
    }
}
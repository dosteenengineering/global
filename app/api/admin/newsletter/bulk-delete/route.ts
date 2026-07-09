import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/app/models/Newsletter";

export async function DELETE(req: NextRequest) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No IDs provided." },
        { status: 400 }
      );
    }

    await dbConnect();
    await Newsletter.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error bulk deleting newsletter entries:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete entries." },
      { status: 500 }
    );
  }
}
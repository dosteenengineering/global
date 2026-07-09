import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/app/models/Newsletter";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    await Newsletter.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting newsletter entry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete entry." },
      { status: 500 }
    );
  }
}
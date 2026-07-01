import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FooterCallback from "@/app/models/FooterCallback";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await FooterCallback.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

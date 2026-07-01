import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactEnquiry from "@/app/models/ContactEnquiry";

export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json();
    if (!ids || !ids.length) {
      return NextResponse.json(
        { success: false, message: "No IDs provided" },
        { status: 400 },
      );
    }
    await connectDB();
    await ContactEnquiry.deleteMany({ _id: { $in: ids } });
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

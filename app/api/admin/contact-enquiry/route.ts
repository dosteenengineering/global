import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactEnquiry from "@/app/models/ContactEnquiry";

export async function GET() {
  try {
    await connectDB();
    const entries = await ContactEnquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: entries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

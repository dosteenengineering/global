import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DownloadLead from "@/app/models/DownloadLead";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, contactNumber, fileUrl, fileName } = body;

    if (!name || !email || !contactNumber || !fileUrl || !fileName) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    await DownloadLead.create({
      name,
      email,
      contactNumber,
      fileUrl,
      fileName,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Download lead error:", err);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 },
    );
  }
}

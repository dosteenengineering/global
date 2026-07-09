import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/app/models/Newsletter";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export async function GET() {
  try {
    await dbConnect();
    const entries = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    console.error("Error fetching newsletter entries:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch entries." },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "You're already subscribed." },
        { status: 409 }
      );
    }

    await Newsletter.create({ email });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
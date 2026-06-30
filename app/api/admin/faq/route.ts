import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Faq from "@/app/models/Faq";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  try {
    await connectDB();
    const faq = await Faq.findOne({});
    if (!faq) {
      return NextResponse.json({ message: "Faq not found" }, { status: 404 });
    }
    return NextResponse.json(
      { data: faq, message: "Faq fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const faq = await Faq.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    });
    if (!faq) {
      return NextResponse.json({ message: "Faq not found" }, { status: 404 });
    }
    return NextResponse.json(
      { data: faq, message: "Faq updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

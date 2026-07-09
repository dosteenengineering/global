// app/api/admin/partner/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Partner from "@/app/models/Vendor";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const entries = await Partner.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { data: entries, message: "Partners fetched successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
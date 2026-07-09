// app/api/admin/partner/bulk-delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Partner from "@/app/models/Partner";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No ids provided" }, { status: 400 });
    }

    await Partner.deleteMany({ _id: { $in: ids } });

    return NextResponse.json(
      { message: "Selected entries deleted successfully" },
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
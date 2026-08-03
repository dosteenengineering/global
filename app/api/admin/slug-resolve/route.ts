// app/api/admin/resolve/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import System from "@/app/models/System";
import "@/app/models/System"; // keep populate registration working

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ message: "slug is required" }, { status: 400 });
  }

  await connectDB();

  const [serviceDoc, systemDoc] = await Promise.all([
    Service.findOne()
      .populate("thirdSection.items.systemSection.items")
      .lean() as Promise<any>,
    System.findOne({ slug }).lean() as Promise<any>,
  ]);

  const solutionItem = serviceDoc?.thirdSection?.items?.find(
    (item: any) => item.slug === slug
  );

  if (solutionItem) {
    return NextResponse.json(
      { type: "solution", data: solutionItem },
      { status: 200 }
    );
  }

  if (systemDoc) {
    return NextResponse.json(
      { type: "service", data: systemDoc },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Not found" }, { status: 404 });
}
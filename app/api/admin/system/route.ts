import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import System from "@/app/models/System";
import { verifyAdmin } from "@/lib/verifyAdmin";

// GET SYSTEM
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Fetch single system if id or slug exists
    if (id) {
      const system = await System.findById(id).catch(() => null); // guard invalid ObjectId
      if (!system) {
        return NextResponse.json(
          { message: "System not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        { data: system, message: "System fetched successfully" },
        { status: 200 },
      );
    }

    const slug = searchParams.get("slug");

    if (slug) {
      const system = await System.findOne({ slug });

      if (!system) {
        return NextResponse.json(
          { message: "System not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { data: system, message: "System fetched successfully" },
        { status: 200 },
      );
    }

    // Fetch all systems
    const systems = await System.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        data: systems,
        message: "Systems fetched successfully",
      },
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

// ADD SYSTEM
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    await connectDB();

    const existingSystem = await System.findOne({
      slug: body.slug,
    });

    if (existingSystem) {
      return NextResponse.json(
        { message: "System with this slug already exists" },
        { status: 400 },
      );
    }

    const system = await System.create(body);

    return NextResponse.json(
      {
        data: system,
        message: "System created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("POST /system error:", error); // will show validation field in server logs
    return NextResponse.json(
      { message: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

// UPDATE SYSTEM
export async function PATCH(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "System ID is required" },
        { status: 400 },
      );
    }

    const body = await request.json();

    await connectDB();

    const existingSlug = await System.findOne({
      slug: body.slug,
      _id: { $ne: id },
    });

    if (existingSlug) {
      return NextResponse.json(
        { message: "System with this slug already exists" },
        { status: 400 },
      );
    }

    const updatedSystem = await System.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedSystem) {
      return NextResponse.json(
        { message: "System not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        data: updatedSystem,
        message: "System updated successfully",
      },
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

// DELETE SYSTEM
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "System ID is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const deletedSystem = await System.findByIdAndDelete(id);

    if (!deletedSystem) {
      return NextResponse.json(
        { message: "System not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "System deleted successfully",
      },
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

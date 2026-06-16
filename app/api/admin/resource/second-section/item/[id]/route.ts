import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resource from "@/app/models/Resource";


export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const resource = await Resource.findOne(
      { "secondSection.items._id": id },
      { "secondSection.items.$": 1 } // only return the matched item
    );

    if (!resource) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const item = resource.secondSection.items[0];

    return NextResponse.json({ item });
  } catch (error) {
    console.error("Error fetching item", error);
    return NextResponse.json({ message: "Error fetching item" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await params;

    const fieldsToUpdate: Record<string, unknown> = {
      "secondSection.items.$.type": body.type,
      "secondSection.items.$.title": body.title,
      "secondSection.items.$.description": body.description ?? "",
      "secondSection.items.$.buttonText": body.buttonText ?? "",
      "secondSection.items.$.buttonLink": body.buttonLink ?? "",
      "secondSection.items.$.columnItems": [],
      "secondSection.items.$.videoItems": [],
      "secondSection.items.$.brochureItems": [],
      "secondSection.items.$.certificationItems": [],
      "secondSection.items.$.installItems": [],
    };

    if (body.type === "technicalDocuments") {
      fieldsToUpdate["secondSection.items.$.columnItems"] = body.items;
    } else if (body.type === "bimCadFiles") {
      fieldsToUpdate["secondSection.items.$.columnItems"] = body.items;
    } else if (body.type === "videosDemos") {
      fieldsToUpdate["secondSection.items.$.videoItems"] = body.items;
    } else if (body.type === "brochures") {
      fieldsToUpdate["secondSection.items.$.brochureItems"] = body.items;
    } else if (body.type === "certifications") {
      fieldsToUpdate["secondSection.items.$.certificationItems"] = body.items;
    } else if (body.type === "installationMaintenance") {
      fieldsToUpdate["secondSection.items.$.installItems"] = body.items;
    }

    await Resource.findOneAndUpdate(
      { "secondSection.items._id": id },
      { $set: fieldsToUpdate },
      { new: true }
    );

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item", error);
    return NextResponse.json({ message: "Error updating item" }, { status: 500 });
  }
}
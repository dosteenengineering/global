import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Award from "@/app/models/Award";
import { verifyAdmin } from "@/lib/verifyAdmin";
import "@/app/models/AwardCategory";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const slug = request.nextUrl.searchParams.get("slug");
        if (id) {
            const award = await Award.findOne({}).populate("awards.category", "name _id");
            const foundAward = award.awards.find((award: { _id: string }) => award._id.toString() === id);
            if (!foundAward) {
                return NextResponse.json({ message: "Award not found" }, { status: 404 });
            }
            return NextResponse.json({ data: foundAward, message: "Award fetched successfully" }, { status: 200 });
        } else if (slug) {
            const award = await Award.findOne({}).populate("awards.category", "name _id");
            const foundAward = award.awards.find((award: { slug: string }) => award.slug === slug);
            if (!foundAward) {
                return NextResponse.json({ message: "Award not found" }, { status: 404 });
            }
            return NextResponse.json({ data: foundAward, message: "Award fetched successfully" }, { status: 200 });
        } else {
            const award = await Award.findOne({}).populate("awards.category", "name _id");
            if (!award) {
                return NextResponse.json({ message: "Award not found" }, { status: 404 });
            }
            return NextResponse.json({ data: award, message: "Award fetched successfully" }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        const id = request.nextUrl.searchParams.get("id");
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();

        const award = await Award.findOne({})
        if (id) {
            const foundAward = award.awards.find((award: { _id: string }) => award._id.toString() === id);
            if (!foundAward) {
                return NextResponse.json({ message: "Award not found" }, { status: 404 });
            }
            foundAward.title = body.title;
            foundAward.image = body.image;
            foundAward.imageAlt = body.imageAlt;
            foundAward.category = body.category;
            await award.save();
            return NextResponse.json({ data: award, message: "Award updated successfully" }, { status: 200 });
        }
        if (!award) {
            await Award.create({ ...body });
            return NextResponse.json({ data: award, message: "Award created successfully" }, { status: 200 });
        } else {
            await Award.findOneAndUpdate({}, body, { upsert: true, new: true });
            return NextResponse.json({ data: award, message: "Award updated successfully" }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const award = await Award.findOne({});
        award.awards.push(body);
        await award.save();
        return NextResponse.json({ data: award, message: "Award created successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const award = await Award.findOne({});
        if (!award) {
            return NextResponse.json({ message: "Award not found" }, { status: 404 });
        }
        award.awards = award.awards.filter((award: { _id: string }) => award._id.toString() !== id);
        await award.save();
        return NextResponse.json({ data: award, message: "Award deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



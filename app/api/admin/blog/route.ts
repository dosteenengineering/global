import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog";
import { verifyAdmin } from "@/lib/verifyAdmin";
import "@/app/models/Category";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const slug = request.nextUrl.searchParams.get("slug");
        if (id) {
            const blog = await Blog.findOne({}).populate("blogs.category", "name _id");
            const foundBlog = blog.blogs.find((blog: { _id: string }) => blog._id.toString() === id);
            if (!foundBlog) {
                return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ data: foundBlog, message: "Blog fetched successfully" }, { status: 200 });
        } else if (slug) {
            const blog = await Blog.findOne({}).populate("blogs.category", "name _id");
            const foundBlog = blog.blogs.find((blog: { slug: string }) => blog.slug === slug);
            if (!foundBlog) {
                return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ data: foundBlog, message: "Blog fetched successfully" }, { status: 200 });
        } else {
            const blog = await Blog.findOne({}).populate("blogs.category", "name _id");
            if (!blog) {
                return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ data: blog, message: "Blog fetched successfully" }, { status: 200 });
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

        const blog = await Blog.findOne({})
        if (id) {
            const foundBlog = blog.blogs.find((blog: { _id: string }) => blog._id.toString() === id);
            if (!foundBlog) {
                return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }
            foundBlog.title = body.title;
            foundBlog.coverImage = body.coverImage;
            foundBlog.coverImageAlt = body.coverImageAlt;
            foundBlog.category = body.category;
            foundBlog.thumbnail = body.thumbnail;
            foundBlog.thumbnailAlt = body.thumbnailAlt;
            foundBlog.content = body.content;
            foundBlog.slug = body.slug;
            foundBlog.date = body.date;
            foundBlog.seo = body.seo;
            await blog.save();
            return NextResponse.json({ data: blog, message: "Blog updated successfully" }, { status: 200 });
        }
        if (!blog) {
            await Blog.create({ ...body });
            return NextResponse.json({ data: blog, message: "Blog created successfully" }, { status: 200 });
        } else {
            await Blog.findOneAndUpdate({}, body, { upsert: true, new: true });
            return NextResponse.json({ data: blog, message: "Blog updated successfully" }, { status: 200 });
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
        const blog = await Blog.findOne({});
        blog.blogs.push(body);
        await blog.save();
        return NextResponse.json({ data: blog, message: "Blog created successfully" }, { status: 200 });
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
        const blog = await Blog.findOne({});
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        blog.blogs = blog.blogs.filter((blog: { _id: string }) => blog._id.toString() !== id);
        await blog.save();
        return NextResponse.json({ data: blog, message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



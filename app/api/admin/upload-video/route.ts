import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { freeSitePath, UploadRejectedError, videoUploadTokenOptions } from "@/lib/blobUpload";
import { verifyAdmin } from "@/lib/verifyAdmin";

// Videos are uploaded from the admin's browser straight to Blob (see lib/blobUpload.ts):
//   GET  ?name=<file name>  -> a free readable pathname, its site URL and content type
//   POST (sent by upload() from @vercel/blob/client) -> a one-time token for exactly that pathname
// No upload-completed callback is used, so every request here comes from a logged-in admin.

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const fileName = request.nextUrl.searchParams.get("name");
  if (!fileName) {
    return NextResponse.json({ error: "No file name" }, { status: 400 });
  }
  try {
    const target = await freeSitePath(fileName);
    if (target.folder !== "videos") {
      throw new UploadRejectedError("Only video files can be uploaded here.");
    }
    return NextResponse.json({ pathname: target.pathname, url: target.url, contentType: target.contentType });
  } catch (error) {
    if (error instanceof UploadRejectedError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error preparing video upload:", error);
    return NextResponse.json({ error: "Failed to prepare upload" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: (pathname) => videoUploadTokenOptions(pathname),
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UploadRejectedError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error issuing video upload token:", error);
    return NextResponse.json({ error: "Failed to start upload" }, { status: 500 });
  }
}

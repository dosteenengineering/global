import { NextRequest, NextResponse } from "next/server";
import { uploadSiteFile, UploadRejectedError } from "@/lib/blobUpload";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // The Blob folder (images, videos, documents) follows the file's extension.
    const url = await uploadSiteFile(file);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    if (error instanceof UploadRejectedError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

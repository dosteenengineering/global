import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DownloadLead from "@/app/models/DownloadLead";

function htmlResponse(title: string, message: string, status: number) {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="font-family: sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#f5f5f5; text-align:center; padding: 0 24px;">
    <div>
      <h1 style="color:#1B2B6B; font-weight:400;">${title}</h1>
      <p style="color:#555;">${message}</p>
    </div>
  </body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    await connectDB();
    const { token } = await params;

    if (!token) {
      return htmlResponse(
        "Invalid Link",
        "This download link is invalid.",
        400,
      );
    }

    // Atomically claim the token: only succeeds if it exists, is unused,
    // and hasn't expired. Prevents a race where the same link is opened
    // twice at once.
    const lead = await DownloadLead.findOneAndUpdate(
      {
        downloadToken: token,
        downloadTokenUsed: false,
        downloadTokenExpiresAt: { $gt: new Date() },
      },
      { $set: { downloadTokenUsed: true } },
      { new: false }, // return the doc as it was BEFORE the update
    );

    if (lead) {
      return NextResponse.redirect(lead.fileUrl, { status: 302 });
    }

    // Claim failed — figure out why, for a friendlier message.
    const existing = await DownloadLead.findOne({ downloadToken: token });

    if (!existing) {
      return htmlResponse(
        "Invalid Link",
        "This download link is invalid or does not exist.",
        404,
      );
    }
    if (existing.downloadTokenUsed) {
      return htmlResponse(
        "Link Already Used",
        "This download link has already been used. Each link can only be used once — please request the file again if you need it.",
        410,
      );
    }
    return htmlResponse(
      "Link Expired",
      "This download link has expired. Please request the file again.",
      410,
    );
  } catch (error) {
    console.error("Error consuming download token", error);
    return htmlResponse(
      "Something Went Wrong",
      "We couldn't process this download link. Please try again later.",
      500,
    );
  }
}
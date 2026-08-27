import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import DownloadLead from "@/app/models/DownloadLead";
import { verifyAdmin } from "@/lib/verifyAdmin";

// Adjust these two imports to match wherever your sendMail utility and
// email templates actually live (see sendContactEnquiryAction.ts for the
// existing pattern: sendMail<Props>({ to, subject, template, props })).
import { sendMail } from "@/lib/mail/sendMail";
import {
  DownloadApprovedEmail,
  DownloadApprovedEmailProps,
} from "@/lib/mail/templates/downloadApprovalEmail";

const TOKEN_TTL_DAYS = 7;

export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const entries = await DownloadLead.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { data: entries, message: "Leads fetched successfully" },
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

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, contactNumber, fileUrl, fileName } = body;

    if (!name || !email || !contactNumber || !fileUrl || !fileName) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    await DownloadLead.create({
      name,
      email,
      contactNumber,
      fileUrl,
      fileName,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Download lead error:", err);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");

    const deleted = await DownloadLead.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.log("Error deleting download lead", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete entry" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();

    if (typeof body.approved !== "boolean") {
      return NextResponse.json(
        { success: false, message: "'approved' must be a boolean" },
        { status: 400 },
      );
    }

    // Not approving (or revoking approval): just flip the flag and kill any
    // outstanding link so it can't be used after the fact.
    if (!body.approved) {
      const updated = await DownloadLead.findByIdAndUpdate(
        id,
        {
          approved: false,
          downloadToken: null,
          downloadTokenExpiresAt: null,
          downloadTokenUsed: false,
        },
        { new: true },
      );

      if (!updated) {
        return NextResponse.json(
          { success: false, message: "Entry not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, data: updated });
    }

    // Approving: generate a fresh single-use, expiring token and email it.
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(
      Date.now() + TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
    );

    const updated = await DownloadLead.findByIdAndUpdate(
      id,
      {
        approved: true,
        downloadToken: token,
        downloadTokenExpiresAt: expiresAt,
        downloadTokenUsed: false,
      },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 },
      );
    }

    const baseUrl =
      process.env.BASE_URL || req.nextUrl.origin;
    const downloadUrl = `${baseUrl}/api/download/${token}`;

    // try {
    //   await sendMail<DownloadApprovedEmailProps>({
    //     to: updated.email,
    //     subject: `Your download for "${updated.fileName}" is ready`,
    //     template: DownloadApprovedEmail,
    //     props: {
    //       name: updated.name,
    //       fileName: updated.fileName,
    //       downloadUrl,
    //       expiresInDays: TOKEN_TTL_DAYS,
    //     },
    //   });
    // } catch (mailError) {
    //   Approval + token creation already succeeded; don't fail the whole
    //   request just because the email failed to send. Surface it instead
    //   so the admin can retry/resend.
    //   console.error("Failed to send download approval email:", mailError);
    //   return NextResponse.json({
    //     success: true,
    //     data: updated,
    //     message:
    //       "Approved, but the notification email failed to send. Please resend manually.",
    //   });
    // }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.log("Error updating download lead", error);
    return NextResponse.json(
      { success: false, message: "Failed to update entry" },
      { status: 500 },
    );
  }
}
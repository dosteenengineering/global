"use server";

// import { sendMail } from "../sendMail";
// import {
//   FooterCallbackEmail,
//   FooterCallbackEmailProps,
// } from "../templates/FooterCallback";
import { FooterCallbackFormValues } from "../../validations/footerCallbackSchema";
import FooterCallback from "@/app/models/FooterCallback";
// import { getToEmail } from "../../services/getToMail.service";
import connectDB from "../../mongodb";

export async function sendFooterCallbackAction(data: FooterCallbackFormValues) {
  try {
    if (!data.email || !data.name || !data.contactNumber) {
      return { success: false, message: "Missing required fields" };
    }

    await connectDB();
    await FooterCallback.create(data);

    // const props: FooterCallbackEmailProps = {
    //   name: data.name,
    //   companyName: data.companyName || "",
    //   email: data.email,
    //   contactNumber: data.contactNumber,
    //   solutionType: data.solutionType || "",
    // };

    // const toEmail = await getToEmail("footer");
    // await sendMail<FooterCallbackEmailProps>({
    //   to: toEmail,
    //   subject: `New Call Back Request from ${data.name}`,
    //   template: FooterCallbackEmail,
    //   props,
    // });

    return { success: true, message: "Request submitted successfully" };
  } catch (error: any) {
    console.error("Footer Callback Action Error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}

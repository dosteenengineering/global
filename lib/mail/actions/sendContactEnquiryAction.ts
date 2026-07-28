// actions/sendContactEnquiryAction.ts
"use server";

// import { sendMail } from "../sendMail";
// import {
//   ContactEnquiryEmail,
//   ContactEnquiryEmailProps,
// } from "../templates/ContactEnquiry";
import { ContactEnquiryFormValues } from "../../validations/contactScheme";
import ContactEnquiry from "@/app/models/ContactEnquiry";
// import { getToEmail } from "../../services/getToMail.service";
import connectDB from "../../mongodb";

async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY_CHECKBOX || "",
        response: token,
      }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function sendContactEnquiryAction(
  data: ContactEnquiryFormValues,
  captchaValue: string,
) {
  try {
    if (!data.email || !data.firstName || !data.phone) {
      return { success: false, message: "Missing required fields" };
    }

    if (!captchaValue) {
      return { success: false, message: "Captcha verification is required." };
    }

    const isHuman = await verifyCaptcha(captchaValue);
    if (!isHuman) {
      return { success: false, message: "Captcha verification failed. Please try again." };
    }

    await connectDB();
    await ContactEnquiry.create(data);

    // const props: ContactEnquiryEmailProps = {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   companyName: data.companyName || "",
    //   role: data.role || "",
    //   email: data.email,
    //   phone: data.phone,
    //   projectLocation: data.projectLocation || "",
    //   systemOfInterest: data.systemOfInterest || "",
    //   projectBrief: data.projectBrief || "",
    // };

    // const toEmail = await getToEmail("contact");
    // await sendMail<ContactEnquiryEmailProps>({
    //   to: toEmail,
    //   subject: `New Contact Enquiry from ${data.firstName} ${data.lastName}`,
    //   template: ContactEnquiryEmail,
    //   props,
    // });

    return { success: true, message: "Enquiry submitted successfully" };
  } catch (error: any) {
    console.error("Contact Enquiry Action Error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}
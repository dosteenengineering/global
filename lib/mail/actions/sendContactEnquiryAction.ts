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

export async function sendContactEnquiryAction(data: ContactEnquiryFormValues) {
  try {
    if (!data.email || !data.firstName || !data.phone) {
      return { success: false, message: "Missing required fields" };
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

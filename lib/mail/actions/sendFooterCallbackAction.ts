"use server";

import { FooterCallbackFormValues } from "../../validations/footerCallbackSchema";
import FooterCallback from "@/app/models/FooterCallback";
import connectDB from "../../mongodb";

async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || "",
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

export async function sendFooterCallbackAction(
  data: FooterCallbackFormValues,
  captchaValue: string,
) {
  try {
    if (!data.email || !data.name || !data.contactNumber) {
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
    await FooterCallback.create(data);

    return { success: true, message: "Request submitted successfully" };
  } catch (error: any) {
    console.error("Footer Callback Action Error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}
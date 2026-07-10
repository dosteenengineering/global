"use server";

import Vendor from "@/app/models/Vendor";
import { uploadToDropbox } from "@/lib/connectDropbox";
import connectDB from "./mongodb";

export async function submitPartnerAction(formData: FormData) {
  try {
    const fields = {
      fullName: formData.get("fullName") as string,
      jobTitle: formData.get("jobTitle") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      companyLegalName: formData.get("companyLegalName") as string,
      tradeLicense: formData.get("tradeLicense") as string,
      vatNumber: formData.get("vatNumber") as string,
      yearOfEstablishment: formData.get("yearOfEstablishment") as string,
      companyAddress: formData.get("companyAddress") as string,
      countryCity: formData.get("countryCity") as string,
      companyEmail: formData.get("companyEmail") as string,
      companyPhone: formData.get("companyPhone") as string,
      website: formData.get("website") as string,
      businessType: formData.get("businessType") as string,
      productServices: formData.getAll("productServices") as string[],
      annualCapacity: formData.get("annualCapacity") as string,
      marketsServed: formData.getAll("marketsServed") as string[],
      minimumOrderQuantity: formData.get("minimumOrderQuantity") as string,
      minimumOrderQuantitySpecify: formData.get("minimumOrderQuantitySpecify") as string,
      relevantExperience: formData.get("relevantExperience") as string,
      keyCertifications: formData.get("keyCertifications") as string,
      pastProjects: formData.get("pastProjects") as string,
      paymentTermsPreference: formData.get("paymentTermsPreference") as string,
      termsAccepted: formData.get("termsAccepted") === "true",
    };

    const filterFiles = (files: File[]) =>
      files.filter((file) => file && file.size > 0);

    const brochure = filterFiles(formData.getAll("brochure") as File[]);
    const technicalSpecSheet = filterFiles(
      formData.getAll("technicalSpecSheet") as File[],
    );
    const uploadedDocuments = filterFiles(
      formData.getAll("uploadedDocuments") as File[],
    );

    const uploadFiles = async (files: File[], folder: string) => {
      return Promise.all(
        files.map(async (file) => {
          const path = `/uploads/${folder}/${Date.now()}-${file.name}`;
          return await uploadToDropbox(file, path);
        }),
      );
    };

    const [brochureUrls, technicalSpecSheetUrls, uploadedDocumentsUrls] =
      await Promise.all([
        uploadFiles(brochure, "partner-brochure"),
        uploadFiles(technicalSpecSheet, "partner-tech-specs"),
        uploadFiles(uploadedDocuments, "partner-docs"),
      ]);

    await connectDB()

    await Vendor.create({
      ...fields,
      brochure: brochureUrls,
      technicalSpecSheet: technicalSpecSheetUrls,
      uploadedDocuments: uploadedDocumentsUrls,
    });

    return {
      success: true,
      message: "Partner registration submitted successfully!",
    };
  } catch (error) {
    console.error("submitPartnerAction error:", error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Error submitting form. Please try again.";

    return {
      success: false,
      message,
    };
  }
}
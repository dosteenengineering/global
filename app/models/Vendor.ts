import mongoose, { Schema, models, model } from "mongoose";

const PartnerSchema = new Schema(
  {
    // Personal & Contact Information
    fullName: { type: String, required: true, trim: true },
    jobTitle: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },

    // Company Details
    companyLegalName: { type: String, required: true, trim: true },
    // tradeLicense: { type: String, required: true, trim: true },
    // vatNumber: { type: String, trim: true },
    yearOfEstablishment: { type: String, trim: true },
    companyAddress: { type: String, trim: true },
    countryCity: { type: String, trim: true },
    companyEmail: { type: String, trim: true, lowercase: true },
    companyPhone: { type: String, trim: true },
    website: { type: String, trim: true },

    // Business Type & Product Categories
    businessType: {
      type: String,
      enum: ["Manufacturer", "Distributor", "Subcontractor", "Importer"], // adjust to match your actual RadioGroup options
      default: "Manufacturer",
    },
    productServices: { type: String, default: "", trim:true },
    annualCapacity: { type: String, trim: true },
    marketsServed: { type: [String], default: [] },
    minimumOrderQuantity: { type: String, trim: true },
    minimumOrderQuantitySpecify: {type: String, trim: true},

    // Experience, Certifications & Documents
    relevantExperience: { type: String, trim: true },
    keyCertifications: { type: String, trim: true },
    pastProjects: { type: String, trim: true },
    brochure: { type: [String], default: [] }, // Dropbox URLs
    technicalSpecSheet: { type: [String], default: [] }, // Dropbox URLs
    uploadedDocuments: { type: [String], default: [] }, // Dropbox URLs
    paymentTermsPreference: { type: String, trim: true },

    // Consent
    termsAccepted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const Partner = models.Partner || model("Partner", PartnerSchema);

export default Partner;
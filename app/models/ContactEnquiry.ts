import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: { type: String },
    role: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projectLocation: { type: String },
    systemOfInterest: { type: String },
    projectBrief: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.ContactEnquiry ||
  mongoose.model("ContactEnquiry", contactEnquirySchema);

import mongoose from "mongoose";

const footerCallbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    solutionType: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.FooterCallback ||
  mongoose.model("FooterCallback", footerCallbackSchema);

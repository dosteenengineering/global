import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDownloadLead extends Document {
  name: string;
  email: string;
  contactNumber: string;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
}

const DownloadLeadSchema = new Schema<IDownloadLead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    contactNumber: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
  },
  { timestamps: true },
);

const DownloadLead: Model<IDownloadLead> =
  mongoose.models.DownloadLead ||
  mongoose.model<IDownloadLead>("DownloadLead", DownloadLeadSchema);

export default DownloadLead;

// models/schemas/seoSchema.ts
import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },

    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },

    twitterTitle: { type: String },
    twitterDescription: { type: String },
    twitterImage: { type: String },
    schema: { type: String },
  },
  { _id: false } // prevents Mongoose from generating a useless _id for this subdocument
);

export default seoSchema;
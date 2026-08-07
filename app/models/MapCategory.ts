import mongoose from "mongoose";

const mapCategorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        count: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.MapCategory || mongoose.model("MapCategory", mapCategorySchema);
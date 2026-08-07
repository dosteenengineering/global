import mongoose from "mongoose";

const countryMapSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        xValue: { type: Number, required: true },
        yValue: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "MapCategory" },
    },
    { timestamps: true }
);

export default mongoose.models.CountryMap || mongoose.model("CountryMap", countryMapSchema);
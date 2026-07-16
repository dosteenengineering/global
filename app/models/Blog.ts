import mongoose from "mongoose";
import seoSchema from "./Seo";

const blogSchema = new mongoose.Schema({
    seo: {
        type: seoSchema
    },
    bannerSection: {
        image: { type: String, required: true },
        imageAlt: { type: String },
        title: { type: String, required: true },
    },
    blogs: [{
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        thumbnailAlt: { type: String },
        coverImage: { type: String },
        coverImageAlt: { type: String },
        content: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
        date: { type: Date, required: true },
        slug: { type: String, required: true },
        seo:{
            type:seoSchema
        }
    }],
})

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
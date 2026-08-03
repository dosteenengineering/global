import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    headerScript: String,
    bodyScript: String,
    schema: String
})

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
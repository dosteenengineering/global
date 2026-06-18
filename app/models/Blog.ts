import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    bannerSection:{
                image:{type:String,required:true},
                imageAlt:{type:String},
                title:{type:String,required:true},
    },
    blogs:[{
        title:{type:String,required:true},
        thumbnail:{type:String,required:true},
        thumbnailAlt:{type:String},
        coverImage:{type:String},
        coverImageAlt:{type:String},
        content:{type:String,required:true},
        category:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Category"},
        date:{type:Date,required:true},
        slug:{type:String,required:true},
        metaTitle:{type:String},
        metaDescription:{type:String},
    }],
})

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
import mongoose from "mongoose";
import seoSchema from "./Seo";

const awardSchema = new mongoose.Schema({
    seo:{
        type:seoSchema
    },
    firstSection:{
                title:{type:String,required:true},
    },
    awards:[{
        title:{type:String,required:true},
        image:{type:String,required:true},
        imageAlt:{type:String},
        category:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"AwardCategory"},
    }],
})

export default mongoose.models.Award || mongoose.model("Award", awardSchema);
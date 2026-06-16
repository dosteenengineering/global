import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
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
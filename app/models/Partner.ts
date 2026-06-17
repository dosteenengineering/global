import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
    metaTitle:{type:String},
    metaDescription:{type:String},
    formSection:{
        title:{
            type:String
        },
        description:{
            type:String
        },
        subTitle:{
            type:String
        }
    },
    thankyouSection:{
        title:{
            type:String
        },
        description:{
            type:String
        },
        buttonText:{
            type:String
        },
        buttonLink:{
            type:String
        }
    }
})

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
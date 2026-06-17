import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    metaTitle:{type:String},
    metaDescription:{type:String},
    firstSection:{
        title:{
            type:String
        },
        description:{
            type:String
        },
    },
    secondSection:{
        image:{
            type:String
        },
        imageAlt:{
            type:String
        },
        items:{
            title:{
                type:String
            },
            phone:{
                type:String
            },
            branch:{
                type:String
            },
            email:{
                type:String
            },
            address:{
                type:String
            },
            map:{
                type:String
            }
        }
    },
    thirdSection:{
        title:{
            type:String
        }
    }
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
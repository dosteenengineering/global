import mongoose from "mongoose";
import seoSchema from "./Seo";

const partnerSchema = new mongoose.Schema({
    seo: {
        type: seoSchema
    },
    formSection: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        subTitle: {
            type: String
        }
    },
    thankyouSection: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        buttonText: {
            type: String
        },
        buttonLink: {
            type: String
        }
    }
})

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
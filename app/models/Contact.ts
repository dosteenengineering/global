import mongoose from "mongoose";
import seoSchema from "./Seo";

const contactSchema = new mongoose.Schema({
    seo: {
        type: seoSchema
    },
    firstSection: {
        title: {
            type: String
        },
        description: {
            type: String
        },
    },
    secondSection: {
        image: {
            type: String
        },
        imageAlt: {
            type: String
        },
        items: {
            title: {
                type: String
            },
            phone: {
                type: String
            },
            branch: {
                type: String
            },
            email: {
                type: String
            },
            address: {
                type: String
            },
            map: {
                type: String
            }
        }
    },
    thirdSection: {
        title: {
            type: String
        }
    }
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
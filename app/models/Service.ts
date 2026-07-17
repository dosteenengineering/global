import mongoose from "mongoose";
import seoSchema from "./Seo";

const serviceSchema = new mongoose.Schema({
    seo: {
        type: seoSchema,
    },
    firstSection: {
        image: { type: String, required: true },
        imageAlt: { type: String, required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
    },
    secondSection: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    thirdSection: {

        title: { type: String, required: true },
        items: [

            {
                seo: {
                    type: seoSchema,
                },
                image: { type: String, required: true },
                imageAlt: { type: String },
                title: { type: String, required: true },
                homeTitle: { type: String },
                description: { type: String, required: true },
                buttonLink: { type: String, required: true },
                slug: { type: String, required: true },
                metaTitle: String,
                metaDescription: String,

                firstSection: {
                    title: String,
                    image: String,
                    imageAlt: String,
                    homeImage: String,
                    homeImageAlt: String,
                    firstDescription: String,
                    secondDescription: String,
                    description: String
                },

                secondSection: {
                    title: String,
                    description: String,
                    items: [
                        {
                            image: String,
                            imageAlt: String,
                        },
                    ],
                },

                systemSection: {
                    title: String,

                    items: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "System",
                        },
                    ],
                },

                thirdSection: {
                    title: String,
                    description: String,
                    buttonText: String,
                    buttonLink: String,
                },

                fourthSection: {
                    title: String,
                    items: [
                        {
                            image: String,
                            imageAlt: String,
                            number: String,
                            value: String,
                        },
                    ],
                },

                lowPolySection:{
                    items:[
                        {
                            title:String,
                            systemSlug:String,
                            marker:{
                                x:String,
                                y:String
                            },
                            label:{
                                x:String,
                                y:String
                            },
                            side:String
                        }
                    ]
                }
            }
        ]
    }
})

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
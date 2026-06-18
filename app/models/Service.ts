import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
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
                image: { type: String, required: true },
                imageAlt: { type: String },
                title: { type: String, required: true },
                description: { type: String, required: true },
                buttonLink: { type: String, required: true },
                metaTitle: String,
                metaDescription: String,

                firstSection: {
                    title: String,
                    image: String,
                    imageAlt: String,
                    firstDescription: String,
                    secondDescription: String,
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
                    description: String,
                    buttonText: String,
                    buttonLink: String,
                },
            }
        ]
    }
})

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
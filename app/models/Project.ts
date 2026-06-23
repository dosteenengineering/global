import mongoose, { Schema } from "mongoose";

const projectItemSchema = new mongoose.Schema(
    {
        firstSection: {
            title: { type: String, required: true },
            sector: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Sector",
            },
            location: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Location",
            },
            status: { type: String, required: true },
            client: { type: String },
            consultant: { type: String },
            contractor: { type: String },
            coverImage: { type: String },
            coverImageAlt: { type: String },
        },

        secondSection: {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },

        thirdSection: {
            title: { type: String, required: true },
            description: { type: String, required: true },
            items: [
                {
                    image: { type: String, required: true },
                    imageAlt: { type: String },
                },
            ],
        },

        fourthSection: {
            title: { type: String, required: true },
            items: [
                {
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                },
            ],
        },

        fifthSection: {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },

        scopeSection: {
            items: [
                {
                    title: { type: String, required: true },
                },
            ],
        },

        featuredServices: [
            {
                type: Schema.Types.ObjectId,
                ref: "Service",
            },
        ],

        featured:{
            type:Boolean,
            default:false
        },

        images: [{ type: String }],

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        thumbnail: { type: String },
        thumbnailAlt: { type: String },

        metaTitle: { type: String },
        metaDescription: { type: String },
    },
    { _id: true }
);

const projectSchema = new mongoose.Schema(
    {
        metaTitle: {
            type: String,
        },

        metaDescription: {
            type: String,
        },

        bannerSection: {
            image: {
                type: String,
                required: true,
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true,
            },
        },

        projects: [projectItemSchema],

        lastSection: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            items: [
                {
                    buttonText: {
                        type: String,
                    },
                    buttonLink: {
                        type: String,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Project ||
    mongoose.model("Project", projectSchema);
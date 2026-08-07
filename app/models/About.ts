import mongoose from "mongoose";
import seoSchema from "./Seo";

const aboutSchema = new mongoose.Schema({
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
        items: [{
            image: { type: String, required: true },
            imageAlt: { type: String, required: true },
            number: { type: String, required: true },
            value: { type: String, required: true },
            subValue: { type: String, required: true },
        }]
    },
    thirdSection: {
        title: { type: String, required: true },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String },
                title: { type: String, required: true },
            }
        ]
    },
    fourthSection: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String },
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    fifthSection: {
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String },
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    sixthSection: {
        title: { type: String, required: true },
        items: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    seventhSection: {
        title: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        items: [
            {
                number: { type: String },
                value: { type: String },
            }
        ]
    },
    eighthSection: {
        title: { type: String },
        items: [
            {
                title: { type: String },
                xValue: { type: String },
                yValue: { type: String },
            }
        ]
    },
    ninethSection: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        items: [
            {
                buttonText: { type: String, required: true },
                buttonLink: { type: String, required: true },
            }
        ]
    }
})

export default mongoose.models.About || mongoose.model("About", aboutSchema);
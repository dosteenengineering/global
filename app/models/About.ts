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
        title: { type: String, required: true },
        image: { type: String, required: true },
        imageAlt: { type: String, required: true },
        items: [
            {
                number: { type: String, required: true },
                value: { type: String, required: true },
            }
        ]
    },
    eighthSection: {
        title: { type: String, required: true },
        items: [
            {
                title: { type: String, required: true },
                xValue: { type: String, required: true },
                yValue: { type: String, required: true },
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
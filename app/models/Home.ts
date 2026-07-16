import mongoose from "mongoose";
import seoSchema from "./Seo";

const homeSchema = new mongoose.Schema({
    seo: {
        type: seoSchema,
    },
    bannerSection: {
        desktopImage: { type: String, required: true },
        mobileImage: { type: String, required: true },
        imageAlt: { type: String },
        title: { type: String, required: true },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
    },
    secondSection: {
        title: { type: String, required: true },
        description: { type: String },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
        items: [{
            number: { type: String, required: true },
            value: { type: String, required: true },
            image: { type: String },
            imageAlt: { type: String },
        }]
    },
    thirdSection: {
        title: { type: String, required: true },
        image: { type: String, required: true },
    },
    fourthSection: {
        title: { type: String, required: true },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
    },
    fifthSection: {
        title: { type: String, required: true },
        items: [{
            image: { type: String, required: true },
            imageAlt: { type: String },
            title: { type: String },
            description: { type: String },
            buttonText: { type: String },
            buttonLink: { type: String },
        }]
    },
    sixthSection: {
        title: { type: String, required: true },
        items: [{
            image: { type: String, required: true },
            imageAlt: { type: String },
            title: { type: String },
        }]
    },
    seventhSection: {
        title: { type: String, required: true },
        items: [{
            image: { type: String, required: true },
            imageAlt: { type: String },
            title: { type: String },
            description: { type: String },
        }]
    },
    eighthSection: {
        items: [{
            title: { type: String, required: true },
            description: { type: String },
            link: { type: String },
            video: { type: String },
            image: { type: String },
            imageAlt: { type: String },
            type: { type: String },
        }]
    },
    ninethSection: {
        title: { type: String, required: true },
    },
    tenthSection: {
        title: { type: String, required: true },
        items: [{
            name: { type: String, required: true },
            message: { type: String },
            designation: { type: String },
        }]
    },
    eleventhSection: {
        title: { type: String, required: true },
    },
    twelthSection: {
        items: [{
            image: { type: String, required: true },
            imageAlt: { type: String },
        }]
    },
    lastSection: {
        title: { type: String, required: true },
        items: [{
            title: { type: String, required: true },
            link: { type: String, required: true },
        }]
    },
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);
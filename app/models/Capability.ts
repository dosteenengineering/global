import mongoose from "mongoose";

const capabilitiesSchema = new mongoose.Schema(
  {
    metaTitle: String,
    metaDescription: String,

    firstSection: {
      image: { type: String, required: true },
      imageAlt: String,
      title: { type: String, required: true },
      description: { type: String, required: true },
    },

    secondSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },

    thirdSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },

    fourthSection: {
      title: { type: String, required: true },
      items: [
        {
          image: { type: String, required: true },
          imageAlt: String,
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },

    fifthSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          image: { type: String, required: true },
          imageAlt: String,
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },

    sixthSection: {
      title: { type: String, required: true },
      items: [
        {
          image: { type: String, required: true },
          imageAlt: String,
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },

    seventhSection: {
      title: { type: String, required: true },
      items: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },

    eighthSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          image: { type: String, required: true },
          imageAlt: String,
          title: { type: String, required: true },
          description: { type: String, required: true },
          slug: { type: String},
        },
      ],
    },

    ninethSection: {
      title: { type: String, required: true },
      items: [
        {
          number: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },

    tenthSection: {
      title: { type: String, required: true },
      items: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },

    lastSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          buttonText: String,
          buttonLink: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Capability ||
  mongoose.model("Capability", capabilitiesSchema);
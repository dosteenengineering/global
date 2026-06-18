import mongoose from "mongoose";

const residentialSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,

  firstSection: {
    title: String,
    image: String,
    imageAlt: String,
    description: String,
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
});

export default mongoose.models.Residential ||
  mongoose.model("Residential", residentialSchema);
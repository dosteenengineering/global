import mongoose, { Schema } from "mongoose";
import seoSchema from "./Seo";

const GallerySchema = new Schema(
  {
    seo: {
      type: seoSchema
    },

    firstSection: {
      image: {
        type: String,
        default: "",
      },

      imageAlt: {
        type: String,
        default: "",
      },

      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },
    },

    secondSection: {
      items: [
        {
          _id: false,
          title: { type: String, default: "" },
          image: { type: String, default: "" },
          imageAlt: { type: String, default: "" },
          date: { type: String, default: "" },
          images: [
            {
              _id: false,
              src: { type: String, default: "" },
              alt: { type: String, default: "" },
            },
          ],
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);

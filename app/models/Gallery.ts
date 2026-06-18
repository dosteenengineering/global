import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema(
  {
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
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

          title: {
            type: String,
            default: "",
          },

          image: {
            type: String,
            default: "",
          },

          imageAlt: {
            type: String,
            default: "",
          },

          date: {
            type: String,
            default: "",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
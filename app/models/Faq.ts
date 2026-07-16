import mongoose, { Schema } from "mongoose";
import seoSchema from "./Seo";

const FaqSchema = new Schema(
  {
    seo: {
      type: seoSchema
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
    firstSection: {
      title: {
        type: String,
        default: "",
      },
      subTitle: {
        type: String,
        default: "",
      },
      btnText: {
        type: String,
        default: "",
      },
      btnLink: {
        type: String,
        default: "",
      },
    },

    secondSection: {
      items: [
        {
          question: {
            type: String,
            default: "",
          },
          answer: {
            type: String,
            default: "",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema);

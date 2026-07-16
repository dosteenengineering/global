import mongoose, { Schema } from "mongoose";
import seoSchema from "./Seo";

const ResourceSchema = new Schema(
  {
    seo:{
      type:seoSchema
    },

    bannerSection: {
      image: { type: String, default: "" },
      imageAlt: { type: String, default: "" },
      title: { type: String, default: "" },
    },

    secondSection: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      items: [
        {
          type: {
            type: String,
            enum: ["technicalDocuments", "bimCadFiles", "videosDemos", "brochures", "certifications", "installationMaintenance"],
            required: true,
          },
          title: { type: String, default: "" },
          image: { type: String, default: "" },
          imageAlt: { type: String, default: "" },
          description: { type: String, default: "" },
          buttonText: { type: String, default: "" },
          buttonLink: { type: String, default: "" },
          columnItems: [
            {
              title: { type: String, default: "" },
              subItems: [
                {
                  title: { type: String, default: "" },
                  subTitle: { type: String, default: "" },
                  tags: [{ type: String }],
                  file: { type: String, default: "" },
                },
              ],
            },
          ],
          videoItems: [
            {
              image: { type: String, default: "" },
              imageAlt: { type: String, default: "" },
              title: { type: String, default: "" },
              tags: { type: String, default: "" },
              videoUrl: { type: String, default: "" },
              duration: { type: String, default: "" },
            },
          ],
          brochureItems: [
            {
              // fileType: { type: String, default: "PDF" },
              title: { type: String, default: "" },
              tags: [{ type: String }],
              file: { type: String, default: "" },
            },
          ],
          certificationItems: [
            {
              badgeText: { type: String, default: "" },
              title: { type: String, default: "" },
              description: { type: String, default: "" },
              file: { type: String, default: "" },
            },
          ],
          installItems: [
            {
              fileType: { type: String, default: "PDF" },
              title: { type: String, default: "" },
              description: { type: String, default: "" },
              file: { type: String, default: "" },
            },
          ],
        },
      ],
    },

    thirdSection: {
      title: { type: String, default: "" },
      buttonText: { type: String, default: "" },
      buttonLink: { type: String, default: "" },
      items: [
        {
          _id: false,
          image: { type: String, default: "" },
          imageAlt: { type: String, default: "" },
          title: { type: String, default: "" },
          subTitle: { type: String, default: "" },
          pillText: { type: String, default: "" },
        },
      ],
    },

    fourthSection: {
      title: { type: String, default: "" },
      items: [
        {
          _id: false,
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          buttonText: { type: String, default: "" },
          buttonLink: { type: String, default: "" },
        },
      ],
    },

    fifthSection: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "" },
    },

    lastSection: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      items: [
        {
          _id: false,
          buttonText: { type: String, default: "" },
          buttonLink: { type: String, default: "" },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
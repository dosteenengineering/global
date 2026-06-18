import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema(
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
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
    },

    thirdSection: {
      title: {
        type: String,
        default: "",
      },
      subTitle: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      items: [
        {
          _id: false,
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
          location: {
            type: String,
            default: "",
          },
        },
      ],
    },

    fourthSection: {
      title: {
        type: String,
        default: "",
      },
      firstDescription: {
        type: String,
        default: "",
      },
      secondDescription: {
        type: String,
        default: "",
      },
      items: [
        {
          _id: false,
          title: {
            type: String,
            default: "",
          },
          subItems: [
            {
              _id: false,
              image: {
                type: String,
                default: "",
              },
              imageAlt: {
                type: String,
                default: "",
              },
            },
          ],
        },
      ],
    },
    lastSection: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      items: [
        {
          _id: false,
          buttonText: {
            type: String,
            default: "",
          },
          buttonLink: {
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

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);
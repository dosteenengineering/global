import mongoose, { Schema } from "mongoose";
import seoSchema from "./Seo";

const CsiSchema = new Schema(
  {
    seo:{
      type:seoSchema
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
        },
      ],
    },

    thirdSection: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      itemTitle: {
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
          description: {
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
      items: [
        {
          _id: false,
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
        },
      ],
    },

    fifthSection: {
      title: {
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
              title: {
                type: String,
                default: "",
              },
              subTitle: {
                type: String,
                default: "",
              },
            },
          ],
        },
      ],
    },

    sixthSection: {
      title: {
        type: String,
        default: "",
      },
      items: [
        {
          image: {
            type: String,
            default: "",
          },
          imageAlt: {
            type: String,
            default: "",
          },
          file: {
            type: String,
            default: "",
          },
          title: {
            type: String,
            default: "",
          },
          division: {
            type: String,
            default: "",
          },
          section: {
            type: String,
            default: "",
          },
        },
      ],
    },

    seventhSection: {
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
      ],
    },

    eighthSection: {
      title: {
        type: String,
        default: "",
      },
      description: {
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
    },

    ninethSection: {
      title: {
        type: String,
        default: "",
      },
      items: [
        {
          _id: false,
          number: {
            type: String,
            default: "",
          },
          value: {
            type: String,
            default: "",
          },
        },
      ],
    },

    tenthSection: {
      title: {
        type: String,
        default: "",
      },
      items: [
        {
          _id: false,
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

export default mongoose.models.Csi ||
  mongoose.model("Csi", CsiSchema);
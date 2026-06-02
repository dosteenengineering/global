import mongoose from "mongoose";

const systemSchema = new mongoose.Schema(
    {
        metaTitle: {
            type: String,
        },

        metaDescription: {
            type: String,
        },

        firstSection: {
            title: {
                type: String,
                required: true,
            },

            subTitle: {
                type: String,
                required: true,
            },

            firstDescription: {
                type: String,
                required: true,
            },

            secondDescription: {
                type: String,
                required: true,
            },

            shortDescription: {
                type: String,
            },

            image: {
                type: String,
                required: true,
            },

            imageAlt: {
                type: String,
            },
        },

        secondSection: {
            title: {
                type: String,
                required: true,
            },

            description: {
                type: String,
                required: true,
            },

            items: [
                {
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

                    buttonText: {
                        type: String,
                        required: true,
                    },

                    description: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },

        thirdSection: {
            title: {
                type: String,
                required: true,
            },

            description: {
                type: String,
                required: true,
            },

            items: [
                {
                    title: {
                        type: String,
                        required: true,
                    },

                    link: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },

        fourthSection: {
            title: {
                type: String,
                required: true,
            },

            description: {
                type: String,
                required: true,
            },

            items: [
                {
                    logo: {
                        type: String,
                        required: true,
                    },

                    logoAlt: {
                        type: String,
                    },

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
            ],
        },

        fifthSection: {
            title: {
                type: String,
                required: true,
            },

            description: {
                type: String,
                required: true,
            },

            items: [
                {
                    title: {
                        type: String,
                        required: true,
                    },

                    description: {
                        type: String,
                        required: true,
                    },

                    image: {
                        type: String,
                    },

                    imageAlt: {
                        type: String,
                    },
                },
            ],
        },

        sixthSection: {
            title: {
                type: String,
                required: true,
            },

            items: [
                {
                    clientName: {
                        type: String,
                        required: true,
                    },

                    designation: {
                        type: String,
                        required: true,
                    },

                    description: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },

        seventhSection: {
            title: {
                type: String,
                required: true,
            },

            items: [
                {
                    question: {
                        type: String,
                        required: true,
                    },

                    answer: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },

        images: [
            {
                type: String,
            },
        ],

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        thumbnail: {
            type: String,
        },

        thumbnailAlt: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.System ||
    mongoose.model("System", systemSchema);
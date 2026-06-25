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
                    },

                    imageAlt: {
                        type: String,
                    },

                    title: {
                        type: String,
                    },

                    buttonText: {
                        type: String,
                    },

                    description: {
                        type: String,
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
                    },

                    link: {
                        type: String,
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
                    },

                    logoAlt: {
                        type: String,
                    },

                    image: {
                        type: String,
                    },

                    imageAlt: {
                        type: String,
                    },

                    title: {
                        type: String,
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
                    },

                    description: {
                        type: String,
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
                    },

                    designation: {
                        type: String,
                    },

                    description: {
                        type: String,
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
                    },

                    answer: {
                        type: String,
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
import mongoose, { Schema, model, models } from "mongoose";

const BecomeAPartnerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BecomeAPartner =
  models.BecomeAPartner || model("BecomeAPartner", BecomeAPartnerSchema);

export default BecomeAPartner;
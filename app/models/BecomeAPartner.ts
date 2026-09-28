import mongoose, { Schema, model, models } from "mongoose";

const BecomeAPartnerSchema = new Schema(
  {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const BecomeAPartner =
  models.BecomeAPartner || model("BecomeAPartner", BecomeAPartnerSchema);

export default BecomeAPartner;
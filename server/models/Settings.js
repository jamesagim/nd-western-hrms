import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "ND Western HRMS",
    },

    companyEmail: {
      type: String,
      default: "",
    },

    companyPhone: {
      type: String,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
    },

    companyAddress: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    currency: {
      type: String,
      default: "₦",
    },

    timezone: {
      type: String,
      default: "Africa/Lagos",
    },

    dateFormat: {
      type: String,
      default: "DD/MM/YYYY",
    },

    theme: {
      type: String,
      enum: ["Light", "Dark"],
      default: "Light",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Settings",
  settingsSchema
);
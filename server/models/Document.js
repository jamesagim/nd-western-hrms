import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Resume",
        "Contract",
        "Offer Letter",
        "Certificate",
        "ID Card",
        "Passport",
        "Medical",
        "Other",
      ],
      default: "Other",
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: String,
      default: "HR",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Document",
  documentSchema
);
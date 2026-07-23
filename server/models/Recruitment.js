import mongoose from "mongoose";

const recruitmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    education: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Offered",
        "Hired",
        "Rejected",
      ],
      default: "Applied",
    },

    interviewDate: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Recruitment",
  recruitmentSchema
);
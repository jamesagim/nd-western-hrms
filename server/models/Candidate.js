import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: "",
    },

    position: {
      type: String,
      required: true,
    },

    department: {
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

    skills: {
      type: [String],
      default: [],
    },

    resume: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    stage: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interview",
        "Offer",
        "Hired",
        "Rejected",
      ],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Candidate",
  candidateSchema
);
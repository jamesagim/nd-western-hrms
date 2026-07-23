import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    // ===========================
    // Basic Information
    // ===========================

    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    // Full Name
    name: {
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

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dateOfBirth: {
      type: Date,
    },

    nationality: {
      type: String,
      default: "",
    },

    maritalStatus: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    // ===========================
    // Employment Information
    // ===========================

    department: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      default: "",
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Contract",
        "Intern",
      ],
      default: "Full Time",
    },

    manager: {
      type: String,
      default: "",
    },

    hireDate: {
      type: Date,
      default: Date.now,
    },

    officeLocation: {
      type: String,
      default: "",
    },

    salary: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Professional Information
    // ===========================

    education: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    // ===========================
    // Emergency Contact
    // ===========================

    emergencyName: {
      type: String,
      default: "",
    },

    emergencyRelationship: {
      type: String,
      default: "",
    },

    emergencyPhone: {
      type: String,
      default: "",
    },

    // ===========================
    // Social Links
    // ===========================

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    // ===========================
    // Status
    // ===========================

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Employee",
  employeeSchema
);
import Recruitment from "../models/Recruitment.js";
import Employee from "../models/Employee.js";

// Get all applicants
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Recruitment.find().sort({
      createdAt: -1,
    });

    res.json(applicants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create applicant
export const createApplicant = async (req, res) => {
  try {
    const applicant = await Recruitment.create(req.body);

    res.status(201).json(applicant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update applicant
export const updateApplicant = async (req, res) => {
  try {
    const applicant =
      await Recruitment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(applicant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete applicant
export const deleteApplicant = async (req, res) => {
  try {
    await Recruitment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Applicant Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Hire applicant
export const hireApplicant = async (req, res) => {
  try {
    const applicant =
      await Recruitment.findById(req.params.id);

    if (!applicant) {
      return res.status(404).json({
        message: "Applicant not found",
      });
    }

    // Prevent hiring twice
    if (applicant.status === "Hired") {
      return res.status(400).json({
        message: "Applicant already hired",
      });
    }

    // Create employee
    const employee = await Employee.create({
      name: applicant.fullName,
      email: applicant.email,
      phone: applicant.phone,

      department: applicant.position,

      status: "Active",
    });

    applicant.status = "Hired";

    await applicant.save();

    res.json({
      message: "Applicant hired successfully",
      employee,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
import Candidate from "../models/Candidate.js";
import Employee from "../models/Employee.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ============================
// GET ALL CANDIDATES
// ============================

export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({
      createdAt: -1,
    });

    res.json(candidates);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// GET ONE CANDIDATE
// ============================

export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.json(candidate);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// CREATE
// ============================

export const createCandidate = async (req, res) => {
  try {
    let photo = "";
    let resume = "";

    if (req.files?.photo?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.photo[0].path,
        {
          folder: "candidates/photos",
        }
      );

      photo = result.secure_url;

      fs.unlinkSync(req.files.photo[0].path);
    }

    if (req.files?.resume?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.resume[0].path,
        {
          resource_type: "raw",
          folder: "candidates/resumes",
        }
      );

      resume = result.secure_url;

      fs.unlinkSync(req.files.resume[0].path);
    }

    const candidate = await Candidate.create({
      ...req.body,
      photo,
      resume,
    });

    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

// ============================
// UPDATE
// ============================

export const updateCandidate = async (req, res) => {
  try {
    const candidate =
      await Candidate.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(candidate);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

// ============================
// DELETE
// ============================

export const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);

    res.json({
      message: "Candidate Deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// MOVE PIPELINE
// ============================

export const moveCandidate = async (req, res) => {
  try {
    const { stage } = req.body;

    const candidate =
      await Candidate.findByIdAndUpdate(
        req.params.id,
        { stage },
        {
          new: true,
        }
      );

    res.json(candidate);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// HIRE CANDIDATE
// ============================

export const hireCandidate = async (req, res) => {
  try {

    const candidate = await Candidate.findById(
      req.params.id
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    // Prevent duplicate employee
    const existingEmployee =
      await Employee.findOne({
        email: candidate.email,
      });

    if (existingEmployee) {
      return res.status(400).json({
        message: "This candidate has already been hired.",
      });
    }

    const employee = await Employee.create({

      firstName: candidate.firstName,

      lastName: candidate.lastName,

      name: `${candidate.firstName} ${candidate.lastName}`,

      email: candidate.email,

      phone: candidate.phone,

      department: candidate.department,

      jobTitle: candidate.position,

      education: candidate.education,

      skills: candidate.skills.join(", "),

      image: candidate.photo,

      hireDate: new Date(),

      status: "Active",

    });

    // Mark candidate as hired instead of deleting
    candidate.stage = "Hired";
    await candidate.save();

    res.status(201).json({

      message: "Candidate hired successfully.",

      employee,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: error.message,

    });

  }
};
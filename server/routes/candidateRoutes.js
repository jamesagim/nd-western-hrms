import express from "express";
import multer from "multer";

import {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  moveCandidate,
  hireCandidate,
} from "../controller/candidateController.js";

const router = express.Router();

// Store uploads temporarily
const upload = multer({
  dest: "uploads/",
});

// Upload fields
const uploadFields = upload.fields([
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "resume",
    maxCount: 1,
  },
]);

// ==========================
// Routes
// ==========================

// Get all candidates
router.get("/", getCandidates);

// Get one candidate
router.get("/:id", getCandidate);

// Create candidate
router.post("/", uploadFields, createCandidate);

// Update candidate
router.put("/:id", uploadFields, updateCandidate);

// Delete candidate
router.delete("/:id", deleteCandidate);

// Move candidate in pipeline
router.put("/:id/move", moveCandidate);

// Hire candidate
router.post("/:id/hire", hireCandidate);

export default router;
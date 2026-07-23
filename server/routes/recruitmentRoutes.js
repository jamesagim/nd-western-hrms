import express from "express";

import {
  getApplicants,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  hireApplicant,
} from "../controller/recruitmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get all applicants
router.get(
  "/",
  authMiddleware,
  getApplicants
);

// Create applicant
router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "HR",
    "Manager"
  ),
  createApplicant
);

// Update applicant
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "HR",
    "Manager"
  ),
  updateApplicant
);

// Hire applicant
router.put(
  "/hire/:id",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "HR",
    "Manager"
  ),
  hireApplicant
);

// Delete applicant
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteApplicant
);

export default router;
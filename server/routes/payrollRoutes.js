import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getPayroll,
  getSinglePayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
  markAsPaid,
} from "../controller/payrollController.js";

const router = express.Router();

// =====================================
// GET ALL PAYROLL
// =====================================

router.get(
  "/",
  authMiddleware,
  getPayroll
);

// =====================================
// GET SINGLE PAYROLL
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getSinglePayroll
);

// =====================================
// CREATE PAYROLL
// Admin & HR
// =====================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  createPayroll
);

// =====================================
// UPDATE PAYROLL
// Admin & HR
// =====================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  updatePayroll
);

// =====================================
// MARK AS PAID
// Admin & HR
// =====================================

router.put(
  "/paid/:id",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  markAsPaid
);

// =====================================
// DELETE PAYROLL
// Admin Only
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deletePayroll
);

export default router;
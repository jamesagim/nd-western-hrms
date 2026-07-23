import express from "express";

import {
  getPerformance,
  getSinglePerformance,
  createPerformance,
  updatePerformance,
  deletePerformance,
} from "../controller/performanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// =====================================
// GET ALL PERFORMANCE
// =====================================

router.get(
  "/",
  authMiddleware,
  getPerformance
);

// =====================================
// GET SINGLE PERFORMANCE
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getSinglePerformance
);

// =====================================
// CREATE PERFORMANCE
// =====================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  createPerformance
);

// =====================================
// UPDATE PERFORMANCE
// =====================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  updatePerformance
);

// =====================================
// DELETE PERFORMANCE
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deletePerformance
);

export default router;
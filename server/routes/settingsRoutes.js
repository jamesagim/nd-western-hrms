import express from "express";

import {
  getSettings,
  updateSettings,
} from "../controller/settingsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// ===========================
// GET SETTINGS
// ===========================

router.get(
  "/",
  authMiddleware,
  getSettings
);

// ===========================
// UPDATE SETTINGS
// ===========================

router.put(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  updateSettings
);

export default router;
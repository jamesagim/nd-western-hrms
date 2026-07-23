import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controller/documentController.js";

const router = express.Router();

// =====================================
// GET ALL DOCUMENTS
// =====================================

router.get(
  "/",
  authMiddleware,
  getDocuments
);

// =====================================
// GET SINGLE DOCUMENT
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getDocument
);

// =====================================
// CREATE DOCUMENT
// Admin & HR
// =====================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  createDocument
);

// =====================================
// UPDATE DOCUMENT
// Admin & HR
// =====================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "HR"),
  updateDocument
);

// =====================================
// DELETE DOCUMENT
// Admin Only
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteDocument
);

export default router;
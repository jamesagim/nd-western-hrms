import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getLeaves,
  getLeave,
  createLeave,
  updateLeaveStatus,
  deleteLeave,
} from "../controller/leaveController.js";


const router = express.Router();



// GET ALL LEAVES

router.get(
  "/",
  authMiddleware,
  getLeaves
);



// GET SINGLE LEAVE

router.get(
  "/:id",
  authMiddleware,
  getLeave
);



// CREATE LEAVE

router.post(
  "/",
  authMiddleware,
  createLeave
);



// APPROVE / REJECT

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "HR"
  ),
  updateLeaveStatus
);



// DELETE

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "Admin"
  ),
  deleteLeave
);



export default router;
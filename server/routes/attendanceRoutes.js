import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getAttendance,
  getSingleAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  clockIn,
  clockOut,
} from "../controller/attendanceController.js";


const router = express.Router();



// GET ALL ATTENDANCE

router.get(
  "/",
  authMiddleware,
  getAttendance
);




// GET SINGLE ATTENDANCE

router.get(
  "/:id",
  authMiddleware,
  getSingleAttendance
);





// CLOCK IN

router.post(
  "/clock-in",
  authMiddleware,
  clockIn
);





// CLOCK OUT

router.put(
  "/clock-out/:id",
  authMiddleware,
  clockOut
);






// ADMIN CREATE MANUAL ATTENDANCE

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin","HR"),
  createAttendance
);






// UPDATE

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin","HR"),
  updateAttendance
);






// DELETE

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteAttendance
);



export default router;
import express from "express";

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController.js";

import upload from "../middleware/upload.js";


const router = express.Router();



// ======================
// GET ALL EMPLOYEES
// ======================

router.get(
  "/",
  getEmployees
);




// ======================
// GET SINGLE EMPLOYEE
// ======================

router.get(
  "/:id",
  getEmployee
);




// ======================
// CREATE EMPLOYEE
// ======================

router.post(
  "/",
  upload.single("image"),
  createEmployee
);




// ======================
// UPDATE EMPLOYEE
// ======================

router.put(
  "/:id",
  upload.single("image"),
  updateEmployee
);




// ======================
// DELETE EMPLOYEE
// ======================

router.delete(
  "/:id",
  deleteEmployee
);



export default router;
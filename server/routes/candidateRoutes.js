import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import upload from "../middleware/upload.js";

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



// GET ALL CANDIDATES

router.get(
  "/",
  authMiddleware,
  getCandidates
);



// GET SINGLE CANDIDATE

router.get(
  "/:id",
  authMiddleware,
  getCandidate
);




// CREATE CANDIDATE

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin","HR"),

  upload.fields([
    {
      name:"photo",
      maxCount:1,
    },
    {
      name:"resume",
      maxCount:1,
    },
  ]),

  createCandidate
);




// UPDATE CANDIDATE

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin","HR"),
  updateCandidate
);




// DELETE CANDIDATE

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteCandidate
);




// MOVE PIPELINE

router.put(
  "/:id/move",
  authMiddleware,
  roleMiddleware("Admin","HR"),
  moveCandidate
);




// HIRE CANDIDATE

router.put(
  "/:id/hire",
  authMiddleware,
  roleMiddleware("Admin","HR"),
  hireCandidate
);



export default router;
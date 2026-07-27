import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


import {
getJobs,
getJob,
createJob,
updateJob,
deleteJob
}
from "../controller/jobController.js";


const router =
express.Router();



// GET ALL

router.get(
"/",
authMiddleware,
getJobs
);




// SINGLE

router.get(
"/:id",
authMiddleware,
getJob
);




// CREATE

router.post(
"/",
authMiddleware,
roleMiddleware("Admin","HR"),
createJob
);




// UPDATE

router.put(
"/:id",
authMiddleware,
roleMiddleware("Admin","HR"),
updateJob
);




// DELETE

router.delete(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
deleteJob
);



export default router;
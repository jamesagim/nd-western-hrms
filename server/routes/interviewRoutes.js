import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


import {

getInterviews,
getInterview,
createInterview,
updateInterview,
deleteInterview

}
from "../controller/interviewController.js";


const router =
express.Router();




// GET ALL

router.get(
"/",
authMiddleware,
getInterviews
);




// GET SINGLE

router.get(
"/:id",
authMiddleware,
getInterview
);




// CREATE

router.post(
"/",
authMiddleware,
roleMiddleware("Admin","HR"),
createInterview
);




// UPDATE

router.put(
"/:id",
authMiddleware,
roleMiddleware("Admin","HR"),
updateInterview
);




// DELETE

router.delete(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
deleteInterview
);



export default router;
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


import {

getUsers,
getSingleUser,
createUser,
updateUser,
deleteUser,

} from "../controller/userController.js";


const router = express.Router();




// GET ALL USERS

router.get(
"/",
authMiddleware,
roleMiddleware("Admin"),
getUsers
);




// GET SINGLE USER

router.get(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
getSingleUser
);





// CREATE USER

router.post(
"/",
authMiddleware,
roleMiddleware("Admin"),
createUser
);





// UPDATE USER

router.put(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
updateUser
);





// DELETE USER

router.delete(
"/:id",
authMiddleware,
roleMiddleware("Admin"),
deleteUser
);



export default router;
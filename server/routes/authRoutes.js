import express from "express";

import {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
} from "../controller/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// ==========================
// Logged-in User
// ==========================

// Get Logged-in Admin Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// Update Logged-in Admin Profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

// ==========================
// Admin Management
// Admin Only
// ==========================

// Get All Users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("Admin"),
  getUsers
);

// Update User
router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  updateUser
);

// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteUser
);

export default router;